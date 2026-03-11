use std::collections::HashMap;
use std::fs::{self, File};
use std::io::{Read, Write, BufReader};
use std::path::Path;
use std::sync::Mutex;
use tauri::State;
use tauri::menu::{Menu, MenuItem, Submenu};
use tantivy::collector::TopDocs;
use tantivy::query::QueryParser;
use tantivy::schema::*;
use tantivy::{Index, ReloadPolicy};
use serde::{Deserialize, Serialize};
use zip::ZipArchive;

#[derive(Serialize, Deserialize, Clone)]
struct SearchResult {
    title: String,
    body: String,
    book: String,
    category: String,
    score: f32,
}

#[derive(Serialize, Deserialize)]
struct TextWithCommentary {
    main_text: String,
    commentary: HashMap<String, String>,
    verses: Vec<Verse>,
    parallel_translations: Vec<Translation>,
}

#[derive(Serialize, Deserialize, Clone)]
struct Verse {
    number: String,
    text: String,
    references: Vec<String>,
    notes: Vec<Note>,
}

#[derive(Serialize, Deserialize, Clone)]
struct Translation {
    language: String,
    text: String,
}

#[derive(Serialize, Deserialize, Clone)]
struct Note {
    id: String,
    verse_id: String,
    content: String,
    timestamp: i64,
    tags: Vec<String>,
}

#[derive(Serialize, Deserialize, Clone)]
struct Workspace {
    id: String,
    name: String,
    layout: WorkspaceLayout,
    texts: Vec<String>,
    timestamp: i64,
}

#[derive(Serialize, Deserialize, Clone)]
struct WorkspaceLayout {
    pane_count: u8,
    pane_sizes: Vec<f32>,
}

#[derive(Serialize, Deserialize)]
struct DictionaryEntry {
    word: String,
    transliteration: String,
    definition: String,
    root: String,
    gematria: u32,
}

#[derive(Serialize, Deserialize)]
struct StudySession {
    start_time: i64,
    duration_minutes: u32,
    texts_studied: Vec<String>,
    notes_count: u32,
}

struct SearchEngine {
    index: Index,
    schema: Schema,
    notes: HashMap<String, Vec<Note>>,
    workspaces: Vec<Workspace>,
    study_sessions: Vec<StudySession>,
}

fn normalize_hebrew(text: &str) -> String {
    text.chars()
        .filter(|c| {
            let ch = *c as u32;
            !(ch >= 0x0591 && ch <= 0x05C7 ||
              ch >= 0x05A0 && ch <= 0x05AF ||
              ch >= 0x05C8 && ch <= 0x05CF ||
              ch == 0x05BD || ch == 0x05BF || ch == 0x05C0)
        })
        .collect()
}

fn calculate_gematria(text: &str) -> u32 {
    let gematria_map: HashMap<char, u32> = [
        ('א', 1), ('ב', 2), ('ג', 3), ('ד', 4), ('ה', 5),
        ('ו', 6), ('ז', 7), ('ח', 8), ('ט', 9), ('י', 10),
        ('כ', 20), ('ך', 20), ('ל', 30), ('מ', 40), ('ם', 40),
        ('נ', 50), ('ן', 50), ('ס', 60), ('ע', 70), ('פ', 80),
        ('ף', 80), ('צ', 90), ('ץ', 90), ('ק', 100), ('ר', 200),
        ('ש', 300), ('ת', 400),
    ].iter().cloned().collect();

    text.chars()
        .filter_map(|c| gematria_map.get(&c))
        .sum()
}

fn init_search_engine() -> SearchEngine {
    let mut schema_builder = Schema::builder();
    schema_builder.add_text_field("title", TEXT | STORED);
    schema_builder.add_text_field("body", TEXT | STORED);
    schema_builder.add_text_field("body_normalized", TEXT);
    schema_builder.add_text_field("book", STRING | STORED);
    schema_builder.add_text_field("category", STRING | STORED);
    schema_builder.add_text_field("type", STRING | STORED);
    schema_builder.add_text_field("language", STRING | STORED);

    let schema = schema_builder.build();

    let index_path = "./otzaria_index";
    let index = if Path::new(index_path).exists() {
        println!("Loading existing index from {}", index_path);
        Index::open_in_dir(index_path).expect("Failed to open index")
    } else {
        println!("Creating new index at {}", index_path);
        fs::create_dir_all(index_path).expect("Failed to create index directory");
        let idx = Index::create_in_dir(index_path, schema.clone())
            .expect("Failed to create index");
        idx
    };

    let library_path = "./library";
    if Path::new(library_path).exists() {
        println!("Found library folder, indexing texts...");
        index_library_files(&index, &schema, library_path);
    } else {
        println!("No library folder found. Creating sample data...");
        create_sample_data(&index, &schema);
    }

    let notes = load_notes();
    let workspaces = load_workspaces();
    let study_sessions = load_study_sessions();

    SearchEngine {
        index,
        schema,
        notes,
        workspaces,
        study_sessions,
    }
}

fn load_notes() -> HashMap<String, Vec<Note>> {
    let path = "./data/notes.json";
    if Path::new(path).exists() {
        if let Ok(content) = fs::read_to_string(path) {
            if let Ok(notes) = serde_json::from_str(&content) {
                return notes;
            }
        }
    }
    HashMap::new()
}

fn save_notes(notes: &HashMap<String, Vec<Note>>) {
    fs::create_dir_all("./data").ok();
    if let Ok(json) = serde_json::to_string_pretty(notes) {
        fs::write("./data/notes.json", json).ok();
    }
}

fn load_workspaces() -> Vec<Workspace> {
    let path = "./data/workspaces.json";
    if Path::new(path).exists() {
        if let Ok(content) = fs::read_to_string(path) {
            if let Ok(workspaces) = serde_json::from_str(&content) {
                return workspaces;
            }
        }
    }
    Vec::new()
}

fn save_workspaces(workspaces: &Vec<Workspace>) {
    fs::create_dir_all("./data").ok();
    if let Ok(json) = serde_json::to_string_pretty(workspaces) {
        fs::write("./data/workspaces.json", json).ok();
    }
}

fn load_study_sessions() -> Vec<StudySession> {
    let path = "./data/study_sessions.json";
    if Path::new(path).exists() {
        if let Ok(content) = fs::read_to_string(path) {
            if let Ok(sessions) = serde_json::from_str(&content) {
                return sessions;
            }
        }
    }
    Vec::new()
}

fn save_study_sessions(sessions: &Vec<StudySession>) {
    fs::create_dir_all("./data").ok();
    if let Ok(json) = serde_json::to_string_pretty(sessions) {
        fs::write("./data/study_sessions.json", json).ok();
    }
}

fn index_library_files(index: &Index, schema: &Schema, library_path: &str) {
    let mut index_writer = index.writer(100_000_000).expect("Failed to create index writer");

    let title = schema.get_field("title").unwrap();
    let body = schema.get_field("body").unwrap();
    let body_normalized = schema.get_field("body_normalized").unwrap();
    let book = schema.get_field("book").unwrap();
    let category = schema.get_field("category").unwrap();
    let type_field = schema.get_field("type").unwrap();
    let language = schema.get_field("language").unwrap();

    let mut total_docs = 0;

    for category_entry in fs::read_dir(library_path).expect("Failed to read library") {
        let category_entry = category_entry.unwrap();
        let category_path = category_entry.path();

        if !category_path.is_dir() {
            continue;
        }

        let category_name = category_path.file_name().unwrap().to_str().unwrap().to_string();

        for book_entry in fs::read_dir(&category_path).unwrap_or_else(|_| panic!("Failed to read category: {}", category_name)) {
            let book_entry = book_entry.unwrap();
            let book_path = book_entry.path();

            if book_path.is_dir() {
                let book_name = book_path.file_name().unwrap().to_str().unwrap().to_string();

                for file_entry in fs::read_dir(&book_path).unwrap() {
                    let file_entry = file_entry.unwrap();
                    let file_path = file_entry.path();

                    if let Some(ext) = file_path.extension() {
                        let ext_str = ext.to_str().unwrap_or("");
                        if ext_str == "txt" || ext_str == "json" {
                            let content = fs::read_to_string(&file_path).unwrap_or_default();

                            if content.is_empty() {
                                continue;
                            }

                            let chapter = file_path.file_stem().unwrap().to_str().unwrap();
                            let title_str = format!("{} - {}", book_name, chapter);

                            let normalized = normalize_hebrew(&content);
                            let text_type = if book_name.contains("Commentary") ||
                                              book_name.contains("Rashi") ||
                                              book_name.contains("Ramban") {
                                "commentary"
                            } else {
                                "text"
                            };

                            let lang = if content.chars().any(|c| ('\u{0590}'..='\u{05FF}').contains(&c)) {
                                "hebrew"
                            } else {
                                "english"
                            };

                            index_writer.add_document(doc!(
                                category => category_name.clone(),
                                book => book_name.clone(),
                                title => title_str,
                                body => content.clone(),
                                body_normalized => normalized,
                                type_field => text_type,
                                language => lang
                            )).unwrap();

                            total_docs += 1;
                        }
                    }
                }
            } else if let Some(ext) = book_path.extension() {
                let ext_str = ext.to_str().unwrap_or("");
                if ext_str == "txt" || ext_str == "json" {
                    let content = fs::read_to_string(&book_path).unwrap_or_default();

                    if content.is_empty() {
                        continue;
                    }

                    let book_name = book_path.file_stem().unwrap().to_str().unwrap();
                    let normalized = normalize_hebrew(&content);

                    let lang = if content.chars().any(|c| ('\u{0590}'..='\u{05FF}').contains(&c)) {
                        "hebrew"
                    } else {
                        "english"
                    };

                    index_writer.add_document(doc!(
                            category => category_name.clone(),
                            book => book_name.to_string(),
                            title => book_name.to_string(),
                            body => content,
                            body_normalized => normalized,
                            type_field => "text",
                            language => lang
                        )).unwrap();

                        total_docs += 1;
                    }
                }
            }
        }
    }

    index_writer.commit().expect("Failed to commit index");
    println!("Indexed {} documents", total_docs);
}

fn create_sample_data(index: &Index, schema: &Schema) {
    let mut index_writer = index.writer(50_000_000).unwrap();

    let title = schema.get_field("title").unwrap();
    let body = schema.get_field("body").unwrap();
    let body_normalized = schema.get_field("body_normalized").unwrap();
    let book = schema.get_field("book").unwrap();
    let category = schema.get_field("category").unwrap();
    let type_field = schema.get_field("type").unwrap();
    let language = schema.get_field("language").unwrap();

    let texts = vec![
        ("Torah", "Bereishit", "Bereishit 1:1", "text", "hebrew",
         "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ\n\nIn the beginning God created the heaven and the earth."),

        ("Torah", "Bereishit", "Bereishit 1:2", "text", "hebrew",
         "וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ וְחֹשֶׁךְ עַל־פְּנֵי תְהוֹם וְרוּחַ אֱלֹהִים מְרַחֶפֶת עַל־פְּנֵי הַמָּיִם\n\nAnd the earth was without form, and void; and darkness was upon the face of the deep."),

        ("Torah", "Bereishit", "Bereishit 1:3", "text", "hebrew",
         "וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר וַיְהִי־אוֹר\n\nAnd God said, Let there be light: and there was light."),

        ("Commentary", "Rashi on Bereishit", "Rashi on Bereishit 1:1", "commentary", "hebrew",
         "בראשית ברא - אמר רבי יצחק: לא היה צריך להתחיל את התורה אלא מהחודש הזה לכם (שמות יב א), שהיא מצוה ראשונה שנצטוו ישראל. ומה טעם פתח בבראשית? משום כח מעשיו הגיד לעמו לתת להם נחלת גויים (תהלים קיא ו)."),

        ("Commentary", "Rashi on Bereishit", "Rashi on Bereishit 1:3", "commentary", "hebrew",
         "יהי אור - אמר והיה, שאלו היה כתוב 'ויהי אור' הייתי אומר שרצה לברוא אור ולא נברא. לכך נאמר 'יהי אור' תחילה ואחר כך 'ויהי אור'."),

        ("Talmud", "Pirkei Avot", "Pirkei Avot 1:1", "text", "hebrew",
         "משֶׁה קִבֵּל תּוֹרָה מִסִּינַי וּמְסָרָהּ לִיהוֹשֻׁעַ וִיהוֹשֻׁעַ לִזְקֵנִים וּזְקֵנִים לִנְבִיאִים וּנְבִיאִים מְסָרוּהָ לְאַנְשֵׁי כְנֶסֶת הַגְּדוֹלָה\n\nMoses received the Torah from Sinai and transmitted it to Joshua."),

        ("Talmud", "Pirkei Avot", "Pirkei Avot 1:14", "text", "hebrew",
         "הוּא הָיָה אוֹמֵר אִם אֵין אֲנִי לִי מִי לִי וּכְשֶׁאֲנִי לְעַצְמִי מָה אֲנִי וְאִם לֹא עַכְשָׁיו אֵימָתַי\n\nIf I am not for myself, who will be for me? But if I am only for myself, what am I?"),
    ];

    for (cat, bk, ttl, text_type, lang, bd) in texts {
        let normalized = normalize_hebrew(bd);
        index_writer.add_document(doc!(
            category => cat,
            book => bk,
            title => ttl,
            body => bd,
            body_normalized => normalized,
            type_field => text_type,
            language => lang
        )).unwrap();
    }

    index_writer.commit().unwrap();
    println!("Created sample data with {} documents", texts.len());
}

#[tauri::command]
fn search_text(
    query: String,
    options: HashMap<String, String>,
    state: State<Mutex<SearchEngine>>
) -> Result<Vec<SearchResult>, String> {
    let engine = state.lock().unwrap();

    let reader = engine.index
        .reader_builder()
        .reload_policy(ReloadPolicy::OnCommit)
        .try_into()
        .map_err(|e| e.to_string())?;

    let searcher = reader.searcher();

    let title = engine.schema.get_field("title").unwrap();
    let body = engine.schema.get_field("body").unwrap();
    let body_normalized = engine.schema.get_field("body_normalized").unwrap();
    let book = engine.schema.get_field("book").unwrap();
    let category = engine.schema.get_field("category").unwrap();

    let query_parser = QueryParser::for_index(&engine.index, vec![title, body, body_normalized, book]);

    let mut search_query = query.clone();

    let normalized_query = normalize_hebrew(&query);
    if normalized_query != query {
        search_query = format!("({}) OR ({})", query, normalized_query);
    }

    let q = query_parser.parse_query(&search_query).map_err(|e| e.to_string())?;

    let limit = options.get("limit")
        .and_then(|l| l.parse::<usize>().ok())
        .unwrap_or(50);

    let top_docs = searcher.search(&q, &TopDocs::with_limit(limit))
        .map_err(|e| e.to_string())?;

    let mut results = Vec::new();
    for (score, doc_address) in top_docs {
        let retrieved_doc = searcher.doc(doc_address).map_err(|e| e.to_string())?;

        let result_title = retrieved_doc.get_first(title)
            .and_then(|v| v.as_text()).unwrap_or("").to_string();
        let result_body = retrieved_doc.get_first(body)
            .and_then(|v| v.as_text()).unwrap_or("").to_string();
        let result_book = retrieved_doc.get_first(book)
            .and_then(|v| v.as_text()).unwrap_or("").to_string();
        let result_category = retrieved_doc.get_first(category)
            .and_then(|v| v.as_text()).unwrap_or("").to_string();

        if let Some(filter_category) = options.get("category") {
            if filter_category != "all" && &result_category != filter_category {
                continue;
            }
        }

        results.push(SearchResult {
            title: result_title,
            body: result_body,
            book: result_book,
            category: result_category,
            score,
        });
    }

    Ok(results)
}

#[tauri::command]
fn get_text_with_commentary(
    text_title: String,
    state: State<Mutex<SearchEngine>>
) -> Result<TextWithCommentary, String> {
    let engine = state.lock().unwrap();

    let reader = engine.index
        .reader_builder()
        .reload_policy(ReloadPolicy::OnCommit)
        .try_into()
        .map_err(|e| e.to_string())?;

    let searcher = reader.searcher();

    let title = engine.schema.get_field("title").unwrap();
    let body = engine.schema.get_field("body").unwrap();
    let book = engine.schema.get_field("book").unwrap();

    let query_parser = QueryParser::for_index(&engine.index, vec![title]);
    let q = query_parser.parse_query(&text_title).map_err(|e| e.to_string())?;
    let top_docs = searcher.search(&q, &TopDocs::with_limit(10))
        .map_err(|e| e.to_string())?;

    if top_docs.is_empty() {
        return Err("Text not found".to_string());
    }

    let (_, doc_address) = top_docs[0];
    let main_doc = searcher.doc(doc_address).map_err(|e| e.to_string())?;

    let main_text = main_doc.get_first(body)
        .and_then(|v| v.as_text()).unwrap_or("").to_string();

    let verses = parse_verses(&main_text, &engine.notes);

    let book_name = main_doc.get_first(book)
        .and_then(|v| v.as_text()).unwrap_or("");

    let mut commentary = HashMap::new();

    for commentator in &["Rashi", "Ramban", "Ibn Ezra"] {
        let comm_query = format!("{} on {}", commentator, book_name);
        if let Ok(q) = query_parser.parse_query(&comm_query) {
            if let Ok(docs) = searcher.search(&q, &TopDocs::with_limit(5)) {
                for (_, addr) in docs {
                    if let Ok(doc) = searcher.doc(addr) {
                        if let Some(text) = doc.get_first(body).and_then(|v| v.as_text()) {
                            commentary.insert(commentator.to_lowercase(), text.to_string());
                            break;
                        }
                    }
                }
            }
        }
    }

    let parallel_translations = vec![
        Translation {
            language: "English".to_string(),
            text: extract_english_translation(&main_text),
        }
    ];

    Ok(TextWithCommentary {
        main_text,
        commentary,
        verses,
        parallel_translations,
    })
}

fn parse_verses(text: &str, notes: &HashMap<String, Vec<Note>>) -> Vec<Verse> {
    let lines: Vec<&str> = text.split('\n').filter(|l| !l.trim().is_empty()).collect();

    lines.iter().enumerate().map(|(i, line)| {
        let verse_id = format!("verse_{}", i);
        let verse_notes = notes.get(&verse_id).cloned().unwrap_or_default();
        let references = extract_references(line);

        Verse {
            number: (i + 1).to_string(),
            text: line.to_string(),
            references,
            notes: verse_notes,
        }
    }).collect()
}

fn extract_references(text: &str) -> Vec<String> {
    let mut refs = Vec::new();
    let books = vec!["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
                     "Bereishit", "Shemot", "Vayikra", "Bamidbar", "Devarim"];

    for book in books {
        if text.contains(book) {
            refs.push(format!("{} reference", book));
        }
    }

    refs
}

fn extract_english_translation(text: &str) -> String {
    text.lines()
        .filter(|l| !l.chars().any(|c| ('\u{0590}'..='\u{05FF}').contains(&c)))
        .collect::<Vec<_>>()
        .join("\n")
}

#[tauri::command]
fn add_note(
    verse_id: String,
    content: String,
    tags: Vec<String>,
    state: State<Mutex<SearchEngine>>
) -> Result<Note, String> {
    let mut engine = state.lock().unwrap();

    let note = Note {
        id: format!("note_{}", chrono::Utc::now().timestamp()),
        verse_id: verse_id.clone(),
        content,
        timestamp: chrono::Utc::now().timestamp(),
        tags,
    };

    engine.notes.entry(verse_id)
        .or_insert_with(Vec::new)
        .push(note.clone());

    save_notes(&engine.notes);

    Ok(note)
}

#[tauri::command]
fn get_notes(verse_id: String, state: State<Mutex<SearchEngine>>) -> Result<Vec<Note>, String> {
    let engine = state.lock().unwrap();
    Ok(engine.notes.get(&verse_id).cloned().unwrap_or_default())
}

#[tauri::command]
fn delete_note(note_id: String, state: State<Mutex<SearchEngine>>) -> Result<(), String> {
    let mut engine = state.lock().unwrap();

    for notes in engine.notes.values_mut() {
        notes.retain(|n| n.id != note_id);
    }

    save_notes(&engine.notes);
    Ok(())
}

#[tauri::command]
fn save_workspace(
    name: String,
    layout: WorkspaceLayout,
    texts: Vec<String>,
    state: State<Mutex<SearchEngine>>
) -> Result<Workspace, String> {
    let mut engine = state.lock().unwrap();

    let workspace = Workspace {
        id: format!("ws_{}", chrono::Utc::now().timestamp()),
        name,
        layout,
        texts,
        timestamp: chrono::Utc::now().timestamp(),
    };

    engine.workspaces.push(workspace.clone());
    save_workspaces(&engine.workspaces);

    Ok(workspace)
}

#[tauri::command]
fn get_workspaces(state: State<Mutex<SearchEngine>>) -> Result<Vec<Workspace>, String> {
    let engine = state.lock().unwrap();
    Ok(engine.workspaces.clone())
}

#[tauri::command]
fn load_workspace(workspace_id: String, state: State<Mutex<SearchEngine>>) -> Result<Workspace, String> {
    let engine = state.lock().unwrap();
    engine.workspaces.iter()
        .find(|w| w.id == workspace_id)
        .cloned()
        .ok_or_else(|| "Workspace not found".to_string())
}

#[tauri::command]
fn delete_workspace(workspace_id: String, state: State<Mutex<SearchEngine>>) -> Result<(), String> {
    let mut engine = state.lock().unwrap();
    engine.workspaces.retain(|w| w.id != workspace_id);
    save_workspaces(&engine.workspaces);
    Ok(())
}

#[tauri::command]
fn calculate_word_gematria(word: String) -> Result<DictionaryEntry, String> {
    let gematria = calculate_gematria(&word);
    let normalized = normalize_hebrew(&word);

    Ok(DictionaryEntry {
        word: word.clone(),
        transliteration: transliterate_hebrew(&normalized),
        definition: format!("Hebrew word with gematria value {}", gematria),
        root: extract_root(&normalized),
        gematria,
    })
}

fn transliterate_hebrew(text: &str) -> String {
    let trans_map: HashMap<char, &str> = [
        ('א', "a"), ('ב', "b"), ('ג', "g"), ('ד', "d"), ('ה', "h"),
        ('ו', "v"), ('ז', "z"), ('ח', "ch"), ('ט', "t"), ('י', "y"),
        ('כ', "k"), ('ך', "k"), ('ל', "l"), ('מ', "m"), ('ם', "m"),
        ('נ', "n"), ('ן', "n"), ('ס', "s"), ('ע', "a"), ('פ', "p"),
        ('ף', "f"), ('צ', "tz"), ('ץ', "tz"), ('ק', "k"), ('ר', "r"),
        ('ש', "sh"), ('ת', "t"),
    ].iter().cloned().collect();

    text.chars()
        .filter_map(|c| trans_map.get(&c).copied())
        .collect::<Vec<_>>()
        .join("")
}

fn extract_root(word: &str) -> String {
    let chars: Vec<char> = word.chars().collect();
    if chars.len() >= 3 {
        chars[0..3].iter().collect()
    } else {
        word.to_string()
    }
}

#[tauri::command]
fn start_study_session(state: State<Mutex<SearchEngine>>) -> Result<i64, String> {
    Ok(chrono::Utc::now().timestamp())
}

#[tauri::command]
fn end_study_session(
    start_time: i64,
    texts_studied: Vec<String>,
    notes_count: u32,
    state: State<Mutex<SearchEngine>>
) -> Result<StudySession, String> {
    let mut engine = state.lock().unwrap();

    let duration = (chrono::Utc::now().timestamp() - start_time) / 60;

    let session = StudySession {
        start_time,
        duration_minutes: duration as u32,
        texts_studied,
        notes_count,
    };

    engine.study_sessions.push(session.clone());
    save_study_sessions(&engine.study_sessions);

    Ok(session)
}

#[tauri::command]
fn get_study_stats(state: State<Mutex<SearchEngine>>) -> Result<HashMap<String, u32>, String> {
    let engine = state.lock().unwrap();

    let total_sessions = engine.study_sessions.len() as u32;
    let total_minutes: u32 = engine.study_sessions.iter()
        .map(|s| s.duration_minutes)
        .sum();
    let total_texts: u32 = engine.study_sessions.iter()
        .map(|s| s.texts_studied.len() as u32)
        .sum();

    let mut stats = HashMap::new();
    stats.insert("total_sessions".to_string(), total_sessions);
    stats.insert("total_minutes".to_string(), total_minutes);
    stats.insert("total_texts".to_string(), total_texts);

    Ok(stats)
}

#[tauri::command]
fn get_all_books(state: State<Mutex<SearchEngine>>) -> Result<Vec<String>, String> {
    Ok(vec![
        "Torah".to_string(),
        "Talmud".to_string(),
        "Mishna".to_string(),
    ])
}

#[tauri::command]
fn reindex_library(state: State<Mutex<SearchEngine>>) -> Result<String, String> {
    println!("Reindexing library...");
    let engine = state.lock().unwrap();

    let library_path = "./library";
    if Path::new(library_path).exists() {
        index_library_files(&engine.index, &engine.schema, library_path);
        Ok("Library reindexed successfully".to_string())
    } else {
        Err("Library folder not found".to_string())
    }
}

#[tauri::command]
fn download_library(state: State<Mutex<SearchEngine>>) -> Result<String, String> {
    println!("Downloading library from GitHub...");
    
    let zip_url = "https://github.com/zevisvei/otzaria-library/releases/download/latest/otzaria_files.zip";
    let temp_zip = "./temp_library.zip";
    let extract_path = "./library";

    let client = reqwest::blocking::Client::new();
    
    let response = client.get(zip_url)
        .send()
        .map_err(|e| format!("Failed to download: {}", e))?;

    if !response.status().is_success() {
        return Err(format!("Download failed with status: {}", response.status()));
    }

    let mut file = File::create(temp_zip)
        .map_err(|e| format!("Failed to create temp file: {}", e))?;
    
    let mut bytes = Vec::new();
    response.copy_to(&mut bytes).map_err(|e| format!("Failed to copy: {}", e))?;
    file.write_all(&bytes).map_err(|e| format!("Failed to write: {}", e))?;
    drop(file);

    println!("Extracting library...");

    if Path::new(extract_path).exists() {
        fs::remove_dir_all(extract_path).ok();
    }
    fs::create_dir_all(extract_path).map_err(|e| format!("Failed to create dir: {}", e))?;

    let file = File::open(temp_zip).map_err(|e| format!("Failed to open zip: {}", e))?;
    let reader = BufReader::new(file);
    let mut archive = ZipArchive::new(reader).map_err(|e| format!("Failed to read zip: {}", e))?;

    for i in 0..archive.len() {
        let mut file = archive.by_index(i).map_err(|e| format!("Failed to read entry: {}", e))?;
        let outpath = Path::new(extract_path).join(file.name());
        
        if file.name().ends_with('/') {
            fs::create_dir_all(&outpath).ok();
        } else {
            if let Some(p) = outpath.parent() {
                if !p.exists() {
                    fs::create_dir_all(p).ok();
                }
            }
            let mut outfile = File::create(&outpath).map_err(|e| format!("Failed to create: {}", e))?;
            std::io::copy(&mut file, &mut outfile).map_err(|e| format!("Failed to extract: {}", e))?;
        }
    }

    fs::remove_file(temp_zip).ok();

    println!("Reindexing library...");
    let engine = state.lock().unwrap();
    index_library_files(&engine.index, &engine.schema, extract_path);

    Ok("Library downloaded and indexed successfully!".to_string())
}

#[tauri::command]
fn get_library_status() -> Result<HashMap<String, String>, String> {
    let mut status = HashMap::new();
    
    let library_path = "./library";
    if Path::new(library_path).exists() {
        let count = count_files_in_dir(library_path);
        status.insert("exists".to_string(), "true".to_string());
        status.insert("files".to_string(), count.to_string());
    } else {
        status.insert("exists".to_string(), "false".to_string());
        status.insert("files".to_string(), "0".to_string());
    }
    
    Ok(status)
}

fn count_files_in_dir(dir: &str) -> usize {
    let mut count = 0;
    if let Ok(entries) = fs::read_dir(dir) {
        for entry in entries.flatten() {
            let path = entry.path();
            if path.is_dir() {
                count += count_files_in_dir(path.to_str().unwrap_or(""));
            } else if let Some(ext) = path.extension() {
                if ext == "txt" || ext == "json" || ext == "docx" || ext == "pdf" {
                    count += 1;
                }
            }
        }
    }
    count
}

fn read_docx_file_to_string(path: &Path) -> String {
    if let Ok(file) = File::open(path) {
        if let Ok(doc) = read_docx(file) {
            let mut text = String::new();
            for child in doc.document.children {
                match child {
                    docx_rs::DocumentChild::Paragraph(p) => {
                        for child in p.children {
                            if let docx_rs::ParagraphChild::Run(run) = child {
                                for child in run.children {
                                    if let docx_rs::RunChild::Text(t) = child {
                                        text.push_str(&t.text);
                                    }
                                }
                            }
                        }
                        text.push('\n');
                    }
                    _ => {}
                }
            }
            return text;
        }
    }
    String::new()
}

fn main() {
    let engine = Mutex::new(init_search_engine());

    let file_menu = Submenu::with_items("File", true, &[
        &MenuItem::with_id("download", "Download Library", true, None::<&str>),
        &MenuItem::with_id("reindex", "Reindex Library", true, None::<&str>),
        &MenuItem::with_id("quit", "Quit", true, None::<&str>),
    ]).unwrap();

    let edit_menu = Submenu::with_items("Edit", true, &[
        &MenuItem::with_id("copy", "Copy", true, None::<&str>),
        &MenuItem::with_id("select_all", "Select All", true, None::<&str>),
    ]).unwrap();

    let view_menu = Submenu::with_items("View", true, &[
        &MenuItem::with_id("toggle_fullscreen", "Toggle Fullscreen", true, None::<&str>),
        &MenuItem::with_id("zoom_in", "Zoom In", true, None::<&str>),
        &MenuItem::with_id("zoom_out", "Zoom Out", true, None::<&str>),
    ]).unwrap();

    let help_menu = Submenu::with_items("Help", true, &[
        &MenuItem::with_id("shortcuts", "Keyboard Shortcuts", true, None::<&str>),
        &MenuItem::with_id("about", "About Otzaria", true, None::<&str>),
    ]).unwrap();

    let menu = Menu::with_items(&[&file_menu, &edit_menu, &view_menu, &help_menu]).unwrap();

    tauri::Builder::default()
        .menu(menu)
        .manage(engine)
        .invoke_handler(tauri::generate_handler![
            search_text,
            get_text_with_commentary,
            add_note,
            get_notes,
            delete_note,
            save_workspace,
            get_workspaces,
            load_workspace,
            delete_workspace,
            calculate_word_gematria,
            start_study_session,
            end_study_session,
            get_study_stats,
            get_all_books,
            reindex_library,
            download_library,
            read_docx_file,
            get_library_status
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
