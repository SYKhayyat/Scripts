// ========== ADVANCED FEATURES MODULE ==========

const { invoke } = window.__TAURI__.tauri;

// ========== NOTES SYSTEM ==========
class NotesManager {
    constructor() {
        this.currentVerseId = null;
    }

    async addNote(verseId, content, tags = []) {
        try {
            const note = await invoke('add_note', {
                verseId,
                content,
                tags
            });
            showToast('Note saved!');
            return note;
        } catch (error) {
            showToast('Error saving note: ' + error, 3000);
            throw error;
        }
    }

    async getNotes(verseId) {
        try {
            return await invoke('get_notes', { verseId });
        } catch (error) {
            console.error('Error loading notes:', error);
            return [];
        }
    }

    async deleteNote(noteId) {
        try {
            await invoke('delete_note', { noteId });
            showToast('Note deleted');
        } catch (error) {
            showToast('Error deleting note: ' + error, 3000);
        }
    }

    showNoteDialog(verseId, verseText) {
        const dialog = document.createElement('div');
        dialog.className = 'note-dialog modal active';
        dialog.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>📝 Add Note</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="note-verse-preview">${escapeHtml(verseText)}</p>
                    <textarea id="noteContent" placeholder="Your note..." rows="6"></textarea>
                    <input type="text" id="noteTags" placeholder="Tags (comma separated)">
                    <button id="saveNoteBtn" class="action-btn">Save Note</button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);

        dialog.querySelector('.modal-close').onclick = () => dialog.remove();
        dialog.querySelector('#saveNoteBtn').onclick = async () => {
            const content = document.getElementById('noteContent').value;
            const tagsStr = document.getElementById('noteTags').value;
            const tags = tagsStr.split(',').map(t => t.trim()).filter(t => t);

            if (content) {
                await this.addNote(verseId, content, tags);
                dialog.remove();
                this.refreshNoteIndicators();
            }
        };
    }

    async refreshNoteIndicators() {
        const verses = document.querySelectorAll('.verse-block');
        for (const verse of verses) {
            const verseId = verse.dataset.verse;
            const notes = await this.getNotes(verseId);

            let indicator = verse.querySelector('.note-indicator');
            if (notes.length > 0) {
                if (!indicator) {
                    indicator = document.createElement('span');
                    indicator.className = 'note-indicator';
                    indicator.title = `${notes.length} note(s)`;
                    indicator.textContent = '📝';
                    verse.querySelector('.verse-number').appendChild(indicator);
                }
                indicator.onclick = (e) => {
                    e.stopPropagation();
                    this.showNotesForVerse(verseId, notes);
                };
            }
        }
    }

    showNotesForVerse(verseId, notes) {
        const dialog = document.createElement('div');
        dialog.className = 'notes-view-dialog modal active';
        dialog.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>📝 Notes</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${notes.map(note => `
                        <div class="note-item" data-note-id="${note.id}">
                            <div class="note-content">${escapeHtml(note.content)}</div>
                            <div class="note-meta">
                                ${note.tags.map(tag => `<span class="note-tag">${escapeHtml(tag)}</span>`).join('')}
                                <span class="note-time">${new Date(note.timestamp * 1000).toLocaleDateString()}</span>
                                <button class="note-delete" data-note-id="${note.id}">🗑️</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(dialog);

        dialog.querySelector('.modal-close').onclick = () => dialog.remove();
        dialog.querySelectorAll('.note-delete').forEach(btn => {
            btn.onclick = async () => {
                const noteId = btn.dataset.noteId;
                await this.deleteNote(noteId);
                dialog.remove();
                this.refreshNoteIndicators();
            };
        });
    }
}

// ========== WORKSPACE MANAGER ==========
class WorkspaceManager {
    constructor() {
        this.currentWorkspace = null;
        this.paneCount = 2;
    }

    async saveCurrentWorkspace(name) {
        const layout = {
            pane_count: this.paneCount,
            pane_sizes: this.getPaneSizes()
        };

        const texts = this.getCurrentTexts();

        try {
            const workspace = await invoke('save_workspace', {
                name,
                layout,
                texts
            });
            showToast('Workspace saved!');
            this.currentWorkspace = workspace;
            await this.refreshWorkspacesList();
        } catch (error) {
            showToast('Error saving workspace: ' + error, 3000);
        }
    }

    getPaneSizes() {
        const leftPane = document.getElementById('leftPane');
        const rightPane = document.getElementById('rightPane');

        if (!leftPane || !rightPane) return [50, 50];

        const leftWidth = leftPane.offsetWidth;
        const totalWidth = leftPane.parentElement.offsetWidth;
        const leftPercent = (leftWidth / totalWidth) * 100;

        return [leftPercent, 100 - leftPercent];
    }

    getCurrentTexts() {
        const texts = [];
        if (currentText) texts.push(currentText.title);
        return texts;
    }

    async loadWorkspace(workspaceId) {
        try {
            const workspace = await invoke('load_workspace', { workspaceId });

            this.paneCount = workspace.layout.pane_count;
            this.applyLayout(workspace.layout);

            for (const textTitle of workspace.texts) {
                searchInput.value = textTitle;
                await performSearch();
            }

            this.currentWorkspace = workspace;
            showToast(`Loaded workspace: ${workspace.name}`);
        } catch (error) {
            showToast('Error loading workspace: ' + error, 3000);
        }
    }

    applyLayout(layout) {
        const leftPane = document.getElementById('leftPane');
        const rightPane = document.getElementById('rightPane');

        if (layout.pane_sizes.length >= 2) {
            leftPane.style.flex = `0 0 ${layout.pane_sizes[0]}%`;
            rightPane.style.flex = `0 0 ${layout.pane_sizes[1]}%`;
        }
    }

    async refreshWorkspacesList() {
        try {
            const workspaces = await invoke('get_workspaces');
            const container = document.getElementById('workspacesList');

            if (!container) return;

            if (workspaces.length === 0) {
                container.innerHTML = '<p class="empty-state">No saved workspaces</p>';
                return;
            }

            container.innerHTML = workspaces.map(ws => `
                <div class="workspace-item">
                    <div class="workspace-name">${escapeHtml(ws.name)}</div>
                    <div class="workspace-meta">
                        ${ws.texts.length} text(s) · ${new Date(ws.timestamp * 1000).toLocaleDateString()}
                    </div>
                    <div class="workspace-actions">
                        <button onclick="workspaceManager.loadWorkspace('${ws.id}')">Load</button>
                        <button onclick="workspaceManager.deleteWorkspace('${ws.id}')">Delete</button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading workspaces:', error);
        }
    }

    async deleteWorkspace(workspaceId) {
        if (!confirm('Delete this workspace?')) return;

        try {
            await invoke('delete_workspace', { workspaceId });
            showToast('Workspace deleted');
            await this.refreshWorkspacesList();
        } catch (error) {
            showToast('Error deleting workspace: ' + error, 3000);
        }
    }

    showSaveDialog() {
        const dialog = document.createElement('div');
        dialog.className = 'workspace-dialog modal active';
        dialog.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>💾 Save Workspace</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <input type="text" id="workspaceName" placeholder="Workspace name..." />
                    <button id="saveWorkspaceBtn" class="action-btn">Save</button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);

        dialog.querySelector('.modal-close').onclick = () => dialog.remove();
        document.getElementById('saveWorkspaceBtn').onclick = async () => {
            const name = document.getElementById('workspaceName').value;
            if (name) {
                await this.saveCurrentWorkspace(name);
                dialog.remove();
            }
        };
    }
}

// ========== GEMATRIA CALCULATOR ==========
class GematriaCalculator {
    async calculate(word) {
        try {
            const result = await invoke('calculate_word_gematria', { word });
            this.showResult(result);
        } catch (error) {
            showToast('Error calculating gematria: ' + error, 3000);
        }
    }

    showResult(entry) {
        const dialog = document.createElement('div');
        dialog.className = 'gematria-dialog modal active';
        dialog.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>🔢 Gematria Calculator</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="gematria-result">
                        <div class="gematria-word">${escapeHtml(entry.word)}</div>
                        <div class="gematria-value">${entry.gematria}</div>
                        <div class="gematria-meta">
                            <p><strong>Transliteration:</strong> ${escapeHtml(entry.transliteration)}</p>
                            <p><strong>Root:</strong> ${escapeHtml(entry.root)}</p>
                            <p><strong>Definition:</strong> ${escapeHtml(entry.definition)}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);
        dialog.querySelector('.modal-close').onclick = () => dialog.remove();
    }

    showCalculator() {
        const dialog = document.createElement('div');
        dialog.className = 'gematria-calc-dialog modal active';
        dialog.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>🔢 Gematria Calculator</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <input type="text" id="gematriaInput" placeholder="Enter Hebrew word..." dir="rtl" />
                    <button id="calcGematriaBtn" class="action-btn">Calculate</button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);

        dialog.querySelector('.modal-close').onclick = () => dialog.remove();
        document.getElementById('calcGematriaBtn').onclick = async () => {
            const word = document.getElementById('gematriaInput').value;
            if (word) {
                dialog.remove();
                await this.calculate(word);
            }
        };

        document.getElementById('gematriaInput').addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const word = e.target.value;
                if (word) {
                    dialog.remove();
                    await this.calculate(word);
                }
            }
        });
    }
}

// ========== STUDY SESSION TRACKER ==========
class StudySessionTracker {
    constructor() {
        this.sessionStartTime = null;
        this.studiedTexts = [];
        this.notesCreated = 0;
        this.timerInterval = null;
    }

    async startSession() {
        try {
            this.sessionStartTime = await invoke('start_study_session');
            this.studiedTexts = [];
            this.notesCreated = 0;

            this.showTimer();
            showToast('Study session started!');
        } catch (error) {
            showToast('Error starting session: ' + error, 3000);
        }
    }

    showTimer() {
        let timerEl = document.getElementById('studyTimer');
        if (!timerEl) {
            timerEl = document.createElement('div');
            timerEl.id = 'studyTimer';
            timerEl.className = 'study-timer';
            document.body.appendChild(timerEl);
        }

        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() / 1000) - this.sessionStartTime);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            timerEl.textContent = `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    trackText(textTitle) {
        if (!this.studiedTexts.includes(textTitle)) {
            this.studiedTexts.push(textTitle);
        }
    }

    incrementNoteCount() {
        this.notesCreated++;
    }

    async endSession() {
        if (!this.sessionStartTime) {
            showToast('No active session');
            return;
        }

        try {
            const session = await invoke('end_study_session', {
                startTime: this.sessionStartTime,
                textsStudied: this.studiedTexts,
                notesCount: this.notesCreated
            });

            clearInterval(this.timerInterval);
            document.getElementById('studyTimer')?.remove();

            this.showSessionSummary(session);
            this.sessionStartTime = null;
        } catch (error) {
            showToast('Error ending session: ' + error, 3000);
        }
    }

    showSessionSummary(session) {
        const dialog = document.createElement('div');
        dialog.className = 'session-summary-dialog modal active';
        dialog.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>📊 Study Session Complete</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="session-stats">
                        <div class="stat">
                            <div class="stat-value">${session.duration_minutes}</div>
                            <div class="stat-label">Minutes</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${session.texts_studied.length}</div>
                            <div class="stat-label">Texts</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${session.notes_count}</div>
                            <div class="stat-label">Notes</div>
                        </div>
                    </div>
                    <button class="action-btn" onclick="studyTracker.showStats()">View All Stats</button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);
        dialog.querySelector('.modal-close').onclick = () => dialog.remove();
    }

    async showStats() {
        try {
            const stats = await invoke('get_study_stats');

            const dialog = document.createElement('div');
            dialog.className = 'study-stats-dialog modal active';
            dialog.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>📊 Study Statistics</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="stats-grid">
                            <div class="stat-card">
                                <h3>${stats.total_sessions || 0}</h3>
                                <p>Total Sessions</p>
                            </div>
                            <div class="stat-card">
                                <h3>${stats.total_minutes || 0}</h3>
                                <p>Minutes Studied</p>
                            </div>
                            <div class="stat-card">
                                <h3>${stats.total_texts || 0}</h3>
                                <p>Texts Studied</p>
                            </div>
                            <div class="stat-card">
                                <h3>${Math.round((stats.total_minutes || 0) / 60)}</h3>
                                <p>Hours</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(dialog);
            dialog.querySelector('.modal-close').onclick = () => dialog.remove();
        } catch (error) {
            showToast('Error loading stats: ' + error, 3000);
        }
    }
}

// ========== TEXT-TO-SPEECH ==========
class TextToSpeech {
    constructor() {
        this.synth = window.speechSynthesis;
        this.speaking = false;
    }

    speak(text, lang = 'he-IL') {
        if (this.speaking) {
            this.stop();
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.8;

        utterance.onend = () => {
            this.speaking = false;
            this.updateButton();
        };

        this.synth.speak(utterance);
        this.speaking = true;
        this.updateButton();
    }

    stop() {
        this.synth.cancel();
        this.speaking = false;
        this.updateButton();
    }

    updateButton() {
        const btn = document.getElementById('ttsBtn');
        if (btn) {
            btn.textContent = this.speaking ? '⏸️' : '🔊';
            btn.title = this.speaking ? 'Stop reading' : 'Read aloud';
        }
    }

    speakCurrentText() {
        if (!currentText) return;

        const hebrewText = currentText.body.split('\n\n')[0];
        this.speak(hebrewText);
    }
}

// ========== EXPORT FUNCTIONALITY ==========
function exportText() {
    if (!currentText) return;

    const format = prompt('Export format:\n1 - Plain Text\n2 - Markdown\n3 - HTML', '1');

    let content = '';
    let filename = '';
    let mimeType = '';

    switch(format) {
        case '1':
            content = formatPlainText(currentText);
            filename = `${currentText.title}.txt`;
            mimeType = 'text/plain';
            break;
        case '2':
            content = formatMarkdown(currentText);
            filename = `${currentText.title}.md`;
            mimeType = 'text/markdown';
            break;
        case '3':
            content = formatHTML(currentText);
            filename = `${currentText.title}.html`;
            mimeType = 'text/html';
            break;
        default:
            return;
    }

    downloadFile(content, filename, mimeType);
}

function formatPlainText(text) {
    return `${text.title}\n${'='.repeat(text.title.length)}\n\n${text.body}\n\n---\nExported from Otzaria`;
}

function formatMarkdown(text) {
    return `# ${text.title}\n\n${text.body}\n\n---\n*Exported from Otzaria*`;
}

function formatHTML(text) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${escapeHtml(text.title)}</title>
    <style>
        body { font-family: 'Frank Ruehl Libre', serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.8; }
        h1 { border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        .hebrew { direction: rtl; text-align: right; }
    </style>
</head>
<body>
    <h1>${escapeHtml(text.title)}</h1>
    <div class="hebrew">${escapeHtml(text.body)}</div>
    <hr>
    <p><em>Exported from Otzaria</em></p>
</body>
</html>`;
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Exported: ' + filename);
}

function copyWithFormatting(text) {
    const citation = currentText ? `\n\n[${currentText.title}]` : '';
    const fullText = text + citation;

    navigator.clipboard.writeText(fullText).then(() => {
        showToast('Copied to clipboard!');
    });
}

// ========== ADVANCED SEARCH ==========
class AdvancedSearch {
    showAdvancedDialog() {
        const dialog = document.createElement('div');
        dialog.className = 'advanced-search-dialog modal active';
        dialog.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>🔍 Advanced Search</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="search-help">
                        <h3>Search Operators:</h3>
                        <ul>
                            <li><code>word1 AND word2</code> - Both words must appear</li>
                            <li><code>word1 OR word2</code> - Either word appears</li>
                            <li><code>NOT word</code> - Exclude word</li>
                            <li><code>"exact phrase"</code> - Exact phrase match</li>
                            <li><code>word*</code> - Wildcard (matches word, words, etc.)</li>
                        </ul>
                        <h3>Examples:</h3>
                        <ul>
                            <li><code>light AND darkness</code></li>
                            <li><code>"in the beginning"</code></li>
                            <li><code>Moses NOT Egypt</code></li>
                            <li><code>אור* </code> (all words starting with אור)</li>
                        </ul>
                    </div>
                    <button class="action-btn" onclick="this.parentElement.parentElement.parentElement.remove()">Close</button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);
    }
}

// ========== HELP OVERLAY ==========
function showKeyboardShortcuts() {
    const shortcuts = `
        <div class="help-overlay">
            <h2>⌨️ Keyboard Shortcuts</h2>
            <table>
                <tr><td><kbd>Ctrl/Cmd</kbd> + <kbd>K</kbd></td><td>Focus search</td></tr>
                <tr><td><kbd>Ctrl/Cmd</kbd> + <kbd>B</kbd></td><td>Bookmarks</td></tr>
                <tr><td><kbd>Ctrl/Cmd</kbd> + <kbd>H</kbd></td><td>History</td></tr>
                <tr><td><kbd>Ctrl/Cmd</kbd> + <kbd>L</kbd></td><td>Library</td></tr>
                <tr><td><kbd>Ctrl/Cmd</kbd> + <kbd>D</kbd></td><td>Bookmark current</td></tr>
                <tr><td><kbd>Ctrl/Cmd</kbd> + <kbd>E</kbd></td><td>Export</td></tr>
                <tr><td><kbd>Ctrl/Cmd</kbd> + <kbd>,</kbd></td><td>Settings</td></tr>
                <tr><td><kbd>Esc</kbd></td><td>Close/Back</td></tr>
            </table>
            <button onclick="this.parentElement.remove()">Close</button>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', shortcuts);
}

// ========== INITIALIZE FEATURES ==========
const notesManager = new NotesManager();
const workspaceManager = new WorkspaceManager();
const gematriaCalculator = new GematriaCalculator();
const studyTracker = new StudySessionTracker();
const textToSpeech = new TextToSpeech();
const advancedSearch = new AdvancedSearch();

// Make functions available globally
window.notesManager = notesManager;
window.workspaceManager = workspaceManager;
window.gematriaCalculator = gematriaCalculator;
window.studyTracker = studyTracker;
window.textToSpeech = textToSpeech;
window.advancedSearch = advancedSearch;
window.exportText = exportText;
window.showKeyboardShortcuts = showKeyboardShortcuts;

// Add help button to toolbar on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const helpBtn = document.createElement('button');
        helpBtn.innerHTML = '❓';
        helpBtn.title = 'Keyboard shortcuts';
        helpBtn.onclick = showKeyboardShortcuts;
        document.querySelector('.toolbar-actions').appendChild(helpBtn);

        const exportBtn = document.createElement('button');
        exportBtn.innerHTML = '📤';
        exportBtn.title = 'Export';
        exportBtn.onclick = exportText;
        document.querySelector('.toolbar-actions').appendChild(exportBtn);
    }, 100);
});

console.log('🚀 Otzaria advanced features loaded!');
