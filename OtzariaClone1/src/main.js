const { invoke } = window.__TAURI__.tauri;

// ========== STATE ==========
let currentText = null;
let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
let history = JSON.parse(localStorage.getItem('history') || '[]');
let settings = JSON.parse(localStorage.getItem('settings') || '{"theme":"light","fontSize":18,"hebrewFont":"frank","autoSaveHistory":true}');

// ========== ELEMENTS ==========
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsList = document.getElementById('resultsList');
const welcomeScreen = document.getElementById('welcomeScreen');
const dualPaneView = document.getElementById('dualPaneView');
const leftContent = document.getElementById('leftContent');
const rightContent = document.getElementById('rightContent');
const toolbarTitle = document.getElementById('toolbarTitle');
const closeBtn = document.getElementById('closeBtn');
const bookmarkBtn = document.getElementById('bookmarkBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const libraryTree = document.getElementById('libraryTree');
const bookmarksList = document.getElementById('bookmarksList');
const historyList = document.getElementById('historyList');

// ========== INITIALIZATION ==========
initApp();

function initApp() {
    applySettings();
    setupEventListeners();
    loadLibraryTree();
    renderBookmarks();
    renderHistory();
}

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
    // Search
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    // Tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchTab(tabName);
        });
    });

    // Toolbar
    closeBtn.addEventListener('click', closeTextView);
    bookmarkBtn.addEventListener('click', toggleBookmark);
    settingsBtn.addEventListener('click', () => settingsModal.classList.add('active'));

    document.getElementById('toggleNikudBtn').addEventListener('click', toggleNikud);
    document.getElementById('fontSizeUpBtn').addEventListener('click', () => adjustFontSize(2));
    document.getElementById('fontSizeDownBtn').addEventListener('click', () => adjustFontSize(-2));

    // Settings Modal
    document.querySelector('.modal-close').addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });

    document.getElementById('themeSelector').addEventListener('change', (e) => {
        settings.theme = e.target.value;
        saveSettings();
        applySettings();
    });

    document.getElementById('fontSizeSlider').addEventListener('input', (e) => {
        settings.fontSize = parseInt(e.target.value);
        document.getElementById('fontSizeDisplay').textContent = settings.fontSize + 'px';
        saveSettings();
        applySettings();
    });

    document.getElementById('hebrewFontSelector').addEventListener('change', (e) => {
        settings.hebrewFont = e.target.value;
        saveSettings();
        applySettings();
    });

    document.getElementById('autoSaveHistory').addEventListener('change', (e) => {
        settings.autoSaveHistory = e.target.checked;
        saveSettings();
    });

    document.getElementById('reindexBtn').addEventListener('click', reindexLibrary);
    document.getElementById('downloadLibraryBtn').addEventListener('click', downloadLibrary);

    // Pane divider resizing
    setupPaneResize();
}

// ========== TAB SWITCHING ==========
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));

    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

window.switchTab = switchTab;

// ========== SEARCH ==========
async function performSearch() {
    const query = searchInput.value.trim();

    if (!query) {
        resultsList.innerHTML = '<p style="opacity: 0.6; font-size: 13px; padding: 10px;">Enter a search term</p>';
        return;
    }

    resultsList.innerHTML = '<p style="opacity: 0.6; font-size: 13px; padding: 10px;">Searching...</p>';

    try {
        const results = await invoke('search_text', { query, options: {} });

        if (results.length === 0) {
            resultsList.innerHTML = '<p style="opacity: 0.6; font-size: 13px; padding: 10px;">No results found</p>';
            return;
        }

        resultsList.innerHTML = '';

        results.forEach(result => {
            const item = document.createElement('div');
            item.className = 'result-item';
            item.innerHTML = `
                <div class="result-title">${escapeHtml(result.title)}</div>
                <div class="result-preview">${escapeHtml(result.body.substring(0, 80))}...</div>
            `;

            item.addEventListener('click', () => displayText(result));
            resultsList.appendChild(item);
        });

    } catch (error) {
        resultsList.innerHTML = `<p style="color: #e74c3c; font-size: 13px; padding: 10px;">Error: ${error}</p>`;
    }
}

// ========== DISPLAY TEXT ==========
async function displayText(result) {
    currentText = result;

    welcomeScreen.style.display = 'none';
    dualPaneView.style.display = 'flex';

    toolbarTitle.textContent = result.title;
    leftContent.innerHTML = '<p class="loading">Loading text...</p>';
    rightContent.innerHTML = '<p class="loading">Loading commentary...</p>';

    try {
        const enhanced = await invoke('get_text_with_commentary', { textTitle: result.title });

        leftContent.innerHTML = formatVersesWithReferences(enhanced.verses);
        leftContent.className = 'pane-content hebrew';

        if (enhanced.commentary.rashi) {
            rightContent.innerHTML = formatCommentary('Rashi', enhanced.commentary.rashi);
            rightContent.className = 'pane-content hebrew';
        } else {
            rightContent.innerHTML = '<p class="empty-state">No commentary available for this text.<br><br>Try searching for "Rashi on [book name]" to find commentary.</p>';
        }

    } catch (error) {
        leftContent.innerHTML = formatText(result.body);
        leftContent.className = 'pane-content hebrew';
        rightContent.innerHTML = '<p class="empty-state">Commentary loading not available</p>';
    }

    if (settings.autoSaveHistory) {
        addToHistory(result);
    }

    updateBookmarkButton();
    setupVerseClickHandlers();
}

function closeTextView() {
    welcomeScreen.style.display = 'block';
    dualPaneView.style.display = 'none';
    currentText = null;
}

function formatText(text) {
    return text.split('\n\n')
        .filter(p => p.trim())
        .map(p => `<p>${escapeHtml(p)}</p>`)
        .join('');
}

function formatVersesWithReferences(verses) {
    if (!verses || verses.length === 0) {
        return '<p>No verses found</p>';
    }

    return verses.map(verse => {
        const refLinks = verse.references.map(ref =>
            `<a href="#" class="verse-ref" data-ref="${escapeHtml(ref)}">${escapeHtml(ref)}</a>`
        ).join(', ');

        const refSection = refLinks ? `<div class="verse-refs">${refLinks}</div>` : '';

        return `
            <div class="verse-block" data-verse="${escapeHtml(verse.number)}">
                <span class="verse-number">${escapeHtml(verse.number)}</span>
                <span class="verse-text">${escapeHtml(verse.text)}</span>
                ${refSection}
            </div>
        `;
    }).join('');
}

function formatCommentary(commentator, text) {
    return `
        <div class="commentary-header">
            <h4>${commentator}</h4>
        </div>
        <div class="commentary-body">
            ${formatText(text)}
        </div>
    `;
}

function setupVerseClickHandlers() {
    document.querySelectorAll('.verse-ref').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const ref = link.dataset.ref;
            searchInput.value = ref;
            await performSearch();
            switchTab('search');
        });
    });

    document.querySelectorAll('.verse-block').forEach(verse => {
        verse.addEventListener('dblclick', () => {
            verse.classList.toggle('highlighted');
        });
    });
}

// ========== LIBRARY TREE ==========
async function loadLibraryTree() {
    try {
        const books = await invoke('get_all_books');

        libraryTree.innerHTML = `
            <div class="tree-category">
                <div class="tree-category-title">📖 Torah</div>
                <div class="tree-books">
                    <div class="tree-book" data-book="Bereishit">Bereishit (Genesis)</div>
                    <div class="tree-book" data-book="Shemot">Shemot (Exodus)</div>
                    <div class="tree-book" data-book="Vayikra">Vayikra (Leviticus)</div>
                    <div class="tree-book" data-book="Bamidbar">Bamidbar (Numbers)</div>
                    <div class="tree-book" data-book="Devarim">Devarim (Deuteronomy)</div>
                </div>
            </div>
            <div class="tree-category">
                <div class="tree-category-title">📚 Talmud</div>
                <div class="tree-books">
                    <div class="tree-book" data-book="Pirkei Avot">Pirkei Avot</div>
                </div>
            </div>
        `;

        document.querySelectorAll('.tree-book').forEach(book => {
            book.addEventListener('click', () => {
                const bookName = book.dataset.book;
                searchForBook(bookName);
            });
        });

    } catch (error) {
        libraryTree.innerHTML = `<p class="empty-state">Error loading library: ${error}</p>`;
    }
}

async function searchForBook(bookName) {
    searchInput.value = bookName;
    switchTab('search');
    await performSearch();
}

// ========== BOOKMARKS ==========
function toggleBookmark() {
    if (!currentText) return;

    const index = bookmarks.findIndex(b => b.title === currentText.title);

    if (index >= 0) {
        bookmarks.splice(index, 1);
    } else {
        bookmarks.push({
            title: currentText.title,
            body: currentText.body,
            book: currentText.book,
            timestamp: Date.now()
        });
    }

    saveBookmarks();
    renderBookmarks();
    updateBookmarkButton();
}

function updateBookmarkButton() {
    if (!currentText) return;

    const isBookmarked = bookmarks.some(b => b.title === currentText.title);
    bookmarkBtn.style.color = isBookmarked ? '#f1c40f' : 'white';
}

function saveBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function renderBookmarks() {
    if (bookmarks.length === 0) {
        bookmarksList.innerHTML = '<p class="empty-state">No bookmarks yet</p>';
        return;
    }

    bookmarksList.innerHTML = '';
    bookmarks.forEach(bookmark => {
        const item = document.createElement('div');
        item.className = 'bookmark-item';
        item.innerHTML = `
            <div class="bookmark-title">${escapeHtml(bookmark.title)}</div>
            <div class="bookmark-preview">${escapeHtml(bookmark.body.substring(0, 60))}...</div>
        `;
        item.addEventListener('click', () => displayText(bookmark));
        bookmarksList.appendChild(item);
    });
}

// ========== HISTORY ==========
function addToHistory(result) {
    history = history.filter(h => h.title !== result.title);

    history.unshift({
        title: result.title,
        body: result.body,
        book: result.book,
        timestamp: Date.now()
    });

    history = history.slice(0, 50);

    localStorage.setItem('history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    if (history.length === 0) {
        historyList.innerHTML = '<p class="empty-state">No history yet</p>';
        return;
    }

    historyList.innerHTML = '';
    history.forEach(item => {
        const el = document.createElement('div');
        el.className = 'history-item';
        el.innerHTML = `
            <div class="history-title">${escapeHtml(item.title)}</div>
            <div class="result-preview">${escapeHtml(item.body.substring(0, 60))}...</div>
        `;
        el.addEventListener('click', () => displayText(item));
        historyList.appendChild(el);
    });
}

// ========== SETTINGS ==========
function applySettings() {
    document.body.className = settings.theme + '-theme';
    document.getElementById('themeSelector').value = settings.theme;

    document.documentElement.style.setProperty('--content-font-size', settings.fontSize + 'px');
    document.getElementById('fontSizeSlider').value = settings.fontSize;
    document.getElementById('fontSizeDisplay').textContent = settings.fontSize + 'px';

    const fontMap = {
        frank: 'Frank Ruehl Libre',
        david: 'David Libre',
        taamey: 'Taamey Frank CLM'
    };
    document.querySelectorAll('.pane-content.hebrew').forEach(el => {
        el.style.fontFamily = fontMap[settings.hebrewFont] + ', serif';
    });
    document.getElementById('hebrewFontSelector').value = settings.hebrewFont;

    document.getElementById('autoSaveHistory').checked = settings.autoSaveHistory;
}

function saveSettings() {
    localStorage.setItem('settings', JSON.stringify(settings));
}

function adjustFontSize(delta) {
    settings.fontSize = Math.max(12, Math.min(32, settings.fontSize + delta));
    saveSettings();
    applySettings();
}

function toggleNikud() {
    leftContent.classList.toggle('no-nikud');
    rightContent.classList.toggle('no-nikud');
}

async function reindexLibrary() {
    const btn = document.getElementById('reindexBtn');
    btn.textContent = '⏳ Reindexing...';
    btn.disabled = true;

    try {
        const result = await invoke('reindex_library');
        showToast(result);
        loadLibraryTree();
    } catch (error) {
        showToast('Error: ' + error);
    } finally {
        btn.textContent = '🔄 Reindex Library';
        btn.disabled = false;
    }
}

function downloadLibrary() {
    showToast('Download library from: python scripts/download_library.py');
    settingsModal.classList.remove('active');
}

// ========== PANE RESIZE ==========
function setupPaneResize() {
    const divider = document.getElementById('paneDivider');
    const leftPane = document.getElementById('leftPane');
    const rightPane = document.getElementById('rightPane');

    let isResizing = false;

    divider.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.body.style.cursor = 'col-resize';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;

        const container = document.querySelector('.panes');
        const containerRect = container.getBoundingClientRect();
        const percentage = ((e.clientX - containerRect.left) / containerRect.width) * 100;

        if (percentage > 20 && percentage < 80) {
            leftPane.style.flex = `0 0 ${percentage}%`;
            rightPane.style.flex = `0 0 ${100 - percentage}%`;
        }
    });

    document.addEventListener('mouseup', () => {
        isResizing = false;
        document.body.style.cursor = 'default';
    });
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        switchTab('bookmarks');
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        switchTab('history');
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        switchTab('library');
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        if (currentText) toggleBookmark();
    }

    if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault();
        settingsModal.classList.add('active');
    }

    if (e.key === 'Escape') {
        if (settingsModal.classList.contains('active')) {
            settingsModal.classList.remove('active');
        } else if (dualPaneView.style.display === 'flex') {
            closeTextView();
        }
    }
});

// ========== TOAST NOTIFICATIONS ==========
function showToast(message, duration = 2000) {
    document.querySelectorAll('.toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ========== UTILITIES ==========
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize
resultsList.innerHTML = '<p style="opacity: 0.6; font-size: 13px; padding: 10px;">Enter a search term to begin</p>';
