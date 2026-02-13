#!/usr/bin/env python3
import os
import sys
import subprocess
import shutil
from pathlib import Path
from textual.app import App, ComposeResult
from textual.containers import Vertical, Horizontal, Grid
from textual.widgets import Input, Button, Label, Static, ListView, ListItem, Header, Footer, Checkbox, RadioButton, RadioSet
from textual.reactive import reactive
from textual.screen import Screen
import re

# Check available tools
FD_AVAILABLE = shutil.which('fd') or shutil.which('fdfind')
FZF_AVAILABLE = shutil.which('fzf')

def get_fd_cmd():
    """Get the fd command name (fd or fdfind)."""
    if shutil.which('fd'):
        return 'fd'
    elif shutil.which('fdfind'):
        return 'fdfind'
    return None

# Common document file extensions
DOC_EXTENSIONS = [
    'txt', 'doc', 'docx', 'pdf', 'odt', 'ods', 'odp', 'rtf', 'xls', 'xlsx', 'ppt', 'pptx', 
    'md', 'csv', 'html', 'htm', 'epub', 'mobi', 'tex', 'log', 'json', 'xml', 'yaml', 'yml', 'org'
]

# Backup file suffixes to include
BACKUP_SUFFIXES = ['~', '.bak', '.backup']

def is_document_file(file_path):
    """Check if file is a document file including backups."""
    file_lower = file_path.lower()
    is_doc = any(file_lower.endswith(f'.{ext.lower()}') for ext in DOC_EXTENSIONS)
    is_backup = False
    for suffix in BACKUP_SUFFIXES:
        if file_lower.endswith(suffix.lower()):
            base_path = file_path[:-len(suffix)]
            base_lower = base_path.lower()
            if any(base_lower.endswith(f'.{ext.lower()}') for ext in DOC_EXTENSIONS):
                is_backup = True
                break
    return is_doc or is_backup

def get_all_files_in_dir(dir_path, file_types='docs'):
    """Get all files recursively in a directory."""
    files = []
    try:
        for root, dirs, filenames in os.walk(dir_path):
            dirs[:] = [d for d in dirs if not d.startswith('.')]
            for filename in filenames:
                if not filename.startswith('.'):
                    full_path = os.path.join(root, filename)
                    if file_types == 'all' or is_document_file(full_path):
                        files.append(full_path)
    except Exception:
        pass
    return files

def search_files_fast(search_term, search_dirs, file_types='docs', fuzzy=False):
    """Fast file search using fd and fzf."""
    all_results = []
    fd_cmd = get_fd_cmd()
    
    for search_dir in search_dirs:
        try:
            if fuzzy and FZF_AVAILABLE:
                # Use fd to list files, pipe to fzf for fuzzy matching
                if fd_cmd:
                    # fd is faster than find
                    fd_proc = subprocess.Popen(
                        [fd_cmd, '--type', 'f', '--hidden', '--exclude', '.git', '.', search_dir],
                        stdout=subprocess.PIPE, text=True
                    )
                else:
                    # Fallback to find
                    fd_proc = subprocess.Popen(
                        ['find', search_dir, '-type', 'f', '-not', '-path', '*/.*'],
                        stdout=subprocess.PIPE, text=True
                    )
                
                # Pipe to fzf for fuzzy filtering
                fzf_proc = subprocess.Popen(
                    ['fzf', '--filter', search_term, '-i'],
                    stdin=fd_proc.stdout, stdout=subprocess.PIPE, text=True
                )
                fd_proc.stdout.close()
                stdout, _ = fzf_proc.communicate()
                matched_paths = [line.strip() for line in stdout.split('\n') if line.strip()]
                
            elif fd_cmd:
                # Use fd for exact substring search
                cmd = [fd_cmd, '--type', 'f', '--hidden', '--exclude', '.git', search_term, search_dir]
                result = subprocess.run(cmd, capture_output=True, text=True)
                matched_paths = [line.strip() for line in result.stdout.split('\n') if line.strip()]
            else:
                # Fallback to find + grep
                find_cmd = ['find', search_dir, '-type', 'f', '-not', '-path', '*/.*']
                find_proc = subprocess.Popen(find_cmd, stdout=subprocess.PIPE, text=True)
                grep_proc = subprocess.Popen(
                    ['grep', '-i', search_term],
                    stdin=find_proc.stdout, stdout=subprocess.PIPE, text=True
                )
                find_proc.stdout.close()
                stdout, _ = grep_proc.communicate()
                matched_paths = [line.strip() for line in stdout.split('\n') if line.strip()]
            
            # Filter by file type
            for path in matched_paths:
                if os.path.isfile(path):
                    if file_types == 'all' or is_document_file(path):
                        all_results.append(path)
                        
        except Exception:
            continue
    
    return sorted(list(set(all_results)))

def search_folders_fast(search_term, search_dirs, fuzzy=False):
    """Fast folder search using fd and fzf."""
    all_results = []
    fd_cmd = get_fd_cmd()
    
    for search_dir in search_dirs:
        try:
            if fuzzy and FZF_AVAILABLE:
                # Use fd to list directories, pipe to fzf
                if fd_cmd:
                    fd_proc = subprocess.Popen(
                        [fd_cmd, '--type', 'd', '--hidden', '--exclude', '.git', '.', search_dir],
                        stdout=subprocess.PIPE, text=True
                    )
                else:
                    fd_proc = subprocess.Popen(
                        ['find', search_dir, '-type', 'd', '-not', '-path', '*/.*'],
                        stdout=subprocess.PIPE, text=True
                    )
                
                fzf_proc = subprocess.Popen(
                    ['fzf', '--filter', search_term, '-i'],
                    stdin=fd_proc.stdout, stdout=subprocess.PIPE, text=True
                )
                fd_proc.stdout.close()
                stdout, _ = fzf_proc.communicate()
                matched_paths = [line.strip() for line in stdout.split('\n') if line.strip()]
                
            elif fd_cmd:
                # Use fd for exact search
                cmd = [fd_cmd, '--type', 'd', '--hidden', '--exclude', '.git', search_term, search_dir]
                result = subprocess.run(cmd, capture_output=True, text=True)
                matched_paths = [line.strip() for line in result.stdout.split('\n') if line.strip()]
            else:
                # Fallback to find + grep
                find_cmd = ['find', search_dir, '-type', 'd', '-not', '-path', '*/.*']
                find_proc = subprocess.Popen(find_cmd, stdout=subprocess.PIPE, text=True)
                grep_proc = subprocess.Popen(
                    ['grep', '-i', search_term],
                    stdin=find_proc.stdout, stdout=subprocess.PIPE, text=True
                )
                find_proc.stdout.close()
                stdout, _ = grep_proc.communicate()
                matched_paths = [line.strip() for line in stdout.split('\n') if line.strip()]
            
            all_results.extend(matched_paths)
            
        except Exception:
            continue
    
    return sorted(list(set(all_results)))

def search_directories(search_term, home_dir, fuzzy=False):
    """Search for directories to add to search list."""
    return search_folders_fast(search_term, [home_dir], fuzzy)

def search_with_grep_multiple_dirs(search_term, search_dirs, search_mode='files', file_types='docs', fuzzy=False):
    """Search files in multiple directories with different search modes."""
    all_results = []
    matched_folders = []
    
    if search_mode == 'folders':
        return search_folders_fast(search_term, search_dirs, fuzzy)
    
    # For files or folder_contents mode
    all_results = search_files_fast(search_term, search_dirs, file_types, fuzzy)
    
    # If folder_contents mode, also get folders and their contents
    if search_mode == 'folder_contents':
        matched_folders = search_folders_fast(search_term, search_dirs, fuzzy)
        if matched_folders:
            for folder in matched_folders:
                folder_files = get_all_files_in_dir(folder, file_types)
                all_results.extend(folder_files)
            # Remove duplicates
            seen = set()
            unique_results = []
            for path in all_results:
                if path not in seen:
                    seen.add(path)
                    unique_results.append(path)
            return sorted(unique_results)
    
    return all_results

class DirectorySelectScreen(Screen):
    def __init__(self, search_term, home_dir, fuzzy=False, current_selected=None):
        super().__init__()
        self.search_term = search_term
        self.home_dir = home_dir
        self.fuzzy = fuzzy
        self.directories = []
        self.selected_indices = set()
        self.current_selected = current_selected or []
    
    def compose(self) -> ComposeResult:
        yield Header()
        search_type = "FUZZY" if self.fuzzy else "EXACT"
        count = len(self.current_selected)
        yield Label(f"Select directories ({search_type} search) - Currently {count} selected:", id="title")
        yield ListView(id="dir_list")
        yield Label("Click items to select multiple directories, then confirm.", id="instruction")
        yield Horizontal(
            Button("Add Selected", id="add_selected", variant="success"),
            Button("Clear Selection", id="clear", variant="warning"),
            Button("Back", id="back", variant="error"),
            id="buttons"
        )
        yield Footer()
    
    def on_mount(self):
        self.directories = search_directories(self.search_term, self.home_dir, self.fuzzy)
        dir_list = self.query_one("#dir_list", ListView)
        if self.directories:
            for i, d in enumerate(self.directories, 1):
                item = ListItem(Label(f"{i}. {d}"))
                if d in self.current_selected:
                    item.styles.background = "green"
                    self.selected_indices.add(i-1)
                dir_list.append(item)
        else:
            dir_list.append(ListItem(Label("No directories found.")))
    
    def on_list_view_selected(self, event):
        index = event.list_view.index
        if index >= len(self.directories):
            return
            
        if index in self.selected_indices:
            self.selected_indices.remove(index)
            event.item.styles.background = ""
        else:
            self.selected_indices.add(index)
            event.item.styles.background = "green"
    
    def on_button_pressed(self, event):
        if event.button.id == "add_selected":
            selected_dirs = [self.directories[i] for i in sorted(self.selected_indices) if i < len(self.directories)]
            all_selected = list(set(self.current_selected + selected_dirs))
            self.dismiss(all_selected)
        elif event.button.id == "clear":
            self.selected_indices.clear()
            dir_list = self.query_one("#dir_list", ListView)
            for item in dir_list.children:
                item.styles.background = ""
        elif event.button.id == "back":
            self.dismiss(None)

class FileSelectScreen(Screen):
    def __init__(self, files, program):
        super().__init__()
        self.files = files
        self.program = program
        self.selected_indices = set()
    
    def compose(self) -> ComposeResult:
        yield Header()
        yield Label(f"Select files to open with '{self.program}' (click to toggle selection):", id="title")
        yield ListView(id="file_list")
        yield Horizontal(
            Button("Open Selected", id="open", variant="success"),
            Button("Back", id="back", variant="error"),
            id="buttons"
        )
        yield Footer()
    
    def on_mount(self):
        file_list = self.query_one("#file_list", ListView)
        for i, f in enumerate(self.files, 1):
            file_list.append(ListItem(Label(f"{i}. {f}")))
    
    def on_list_view_selected(self, event):
        index = event.list_view.index
        if index in self.selected_indices:
            self.selected_indices.remove(index)
            event.item.styles.background = ""
        else:
            self.selected_indices.add(index)
            event.item.styles.background = "blue"
    
    def on_button_pressed(self, event):
        if event.button.id == "open":
            selected_files = [self.files[i] for i in sorted(self.selected_indices)]
            if selected_files:
                self.app.open_files(self.program, selected_files)
                self.dismiss(True)
        elif event.button.id == "back":
            self.dismiss(None)

class FileOpenerApp(App):
    CSS = """
    Screen {
        align: center middle;
    }
    #main_container {
        width: 95;
        height: auto;
        border: thick $background 80%;
        padding: 1;
    }
    #title {
        text-align: center;
        text-style: bold;
        color: $text-accent;
        padding: 1;
    }
    #instruction {
        text-align: center;
        text-style: italic;
        color: $text-muted;
    }
    .section {
        border: solid $surface-lighten-1;
        padding: 1;
        margin: 1 0;
    }
    .section_title {
        text-style: bold;
        text-align: center;
        color: $text-accent;
        margin-bottom: 1;
    }
    Input {
        margin: 1 0;
        height: 3;
    }
    .search_mode_label {
        text-style: bold;
        margin-right: 1;
    }
    RadioSet {
        height: auto;
    }
    Button {
        margin: 1 0;
        width: 100%;
    }
    #current_dirs_label {
        color: $text-success;
        text-style: italic;
        text-align: center;
        margin: 1 0;
    }
    #dir_count_label {
        color: $text-warning;
        text-align: center;
        margin: 1 0;
    }
    ListView {
        height: 15;
        border: solid $surface-lighten-2;
        margin: 1 0;
    }
    #exit_btn {
        margin-top: 2;
    }
    #search_columns {
        width: 100%;
        height: auto;
    }
    #search_columns > Vertical {
        width: 45;
        margin: 0 1;
    }
    #buttons {
        align: center middle;
    }
    #buttons > Button {
        width: auto;
        margin: 0 1;
    }
    """
    
    def __init__(self):
        super().__init__()
        self.program = ""
        self.home_dir = str(Path.home())
        self.selected_dirs = [self.home_dir]
        
        # Show tool availability
        self.fd_available = get_fd_cmd() is not None
        self.fzf_available = shutil.which('fzf') is not None
    
    def on_mount(self):
        self.update_dirs_label()
        # Show which tools are available
        tools = []
        if self.fd_available:
            tools.append("fd")
        if self.fzf_available:
            tools.append("fzf")
        if tools:
            self.notify(f"Using fast search tools: {', '.join(tools)}")
        else:
            self.notify("Using fallback find/grep (install fd and fzf for faster search)", severity="warning")
    
    def update_dirs_label(self):
        count_label = self.query_one("#dir_count_label", Label)
        dirs_label = self.query_one("#current_dirs_label", Label)
        count = len(self.selected_dirs)
        count_label.update(f"{count} director{'y' if count == 1 else 'ies'} selected")
        if count == 0:
            dirs_label.update("No directories selected")
        elif count == 1:
            dirs_label.update(f"Search in: {self.selected_dirs[0]}")
        else:
            dirs_label.update(f"Search in: {self.selected_dirs[0]} + {count - 1} more")
    
    def compose(self) -> ComposeResult:
        yield Header()
        yield Vertical(
            Label("File Opener TUI", id="title"),
            
            Input(placeholder="Program to open files (e.g., vim, code)...", id="program_input"),
            
            Horizontal(
                Vertical(
                    Label("Directory Search", classes="section_title"),
                    Input(placeholder="Enter directory path or search term...", id="dir_input"),
                    Label("Search Mode:", classes="search_mode_label"),
                    RadioSet(
                        RadioButton("Exact search", value=True, id="dir_exact"),
                        RadioButton("Fuzzy search", id="dir_fuzzy"),
                        id="dir_search_mode"
                    ),
                    Horizontal(
                        Button("Add Directories", id="search_dir", variant="primary"),
                        Button("Clear All", id="clear_dirs", variant="warning"),
                        id="dir_buttons"
                    ),
                    Label("0 directories selected", id="dir_count_label"),
                    Label("Search in:", id="current_dirs_label"),
                    classes="section"
                ),
                
                Vertical(
                    Label("File Search", classes="section_title"),
                    Input(placeholder="Enter file search term...", id="search_input"),
                    Label("Search Mode:", classes="search_mode_label"),
                    RadioSet(
                        RadioButton("Exact search", value=True, id="file_exact"),
                        RadioButton("Fuzzy search", id="file_fuzzy"),
                        id="file_search_mode"
                    ),
                    Label("Search Type:", classes="search_mode_label"),
                    RadioSet(
                        RadioButton("Files only", value=True, id="search_files_only"),
                        RadioButton("Folders only", id="search_folders_only"),
                        RadioButton("Folders + contents", id="search_folder_contents"),
                        id="search_type"
                    ),
                    Label("File Filter:", classes="search_mode_label"),
                    RadioSet(
                        RadioButton("Documents only", value=True, id="docs_only"),
                        RadioButton("All files", id="all_files"),
                        id="file_type"
                    ),
                    Button("Search", id="search_files", variant="primary"),
                    classes="section"
                ),
                id="search_columns"
            ),
            
            Button("Exit", id="exit", variant="error"),
            id="main_container"
        )
        yield Footer()
    
    def get_program(self):
        program_input = self.query_one("#program_input", Input)
        program = program_input.value.strip()
        
        if not program:
            self.notify("Please enter a program to open files.", severity="error")
            return None
        
        try:
            subprocess.run(['which', program], capture_output=True, check=True)
            return program
        except subprocess.CalledProcessError:
            self.notify(f"Program '{program}' not found in PATH.", severity="error")
            return None
    
    def on_button_pressed(self, event):
        button_id = event.button.id
        
        if button_id == "search_dir":
            dir_input = self.query_one("#dir_input", Input)
            search_term = dir_input.value.strip()
            
            if not search_term:
                if self.home_dir not in self.selected_dirs:
                    self.selected_dirs.append(self.home_dir)
                    self.update_dirs_label()
                    self.notify(f"Added home directory: {self.home_dir}")
                else:
                    self.notify("Home directory already selected")
            elif os.path.isdir(search_term):
                if search_term not in self.selected_dirs:
                    self.selected_dirs.append(search_term)
                    self.update_dirs_label()
                    self.notify(f"Added directory: {search_term}")
                else:
                    self.notify("Directory already selected")
            else:
                dir_search_mode = self.query_one("#dir_search_mode", RadioSet)
                selected_mode = dir_search_mode.pressed_button
                fuzzy = selected_mode and selected_mode.id == "dir_fuzzy"
                
                self.push_screen(DirectorySelectScreen(search_term, self.home_dir, fuzzy, self.selected_dirs), self.on_directories_selected)
        
        elif button_id == "clear_dirs":
            self.selected_dirs = []
            self.update_dirs_label()
            self.notify("Cleared all directories")
        
        elif button_id == "search_files":
            if not self.selected_dirs:
                self.notify("Please select at least one directory to search in.", severity="error")
                return
            
            program = self.get_program()
            if not program:
                return
            
            search_input = self.query_one("#search_input", Input)
            search_term = search_input.value.strip()
            
            if not search_term:
                self.notify("Please enter a search term.", severity="warning")
                return
            
            file_search_mode = self.query_one("#file_search_mode", RadioSet)
            selected_mode = file_search_mode.pressed_button
            fuzzy = selected_mode and selected_mode.id == "file_fuzzy"
            
            search_type_radio = self.query_one("#search_type", RadioSet)
            selected_search_type = search_type_radio.pressed_button
            if selected_search_type and selected_search_type.id == "search_folders_only":
                search_mode = 'folders'
            elif selected_search_type and selected_search_type.id == "search_folder_contents":
                search_mode = 'folder_contents'
            else:
                search_mode = 'files'
            
            file_type_radio = self.query_one("#file_type", RadioSet)
            selected_type = file_type_radio.pressed_button
            file_types = 'docs' if selected_type and selected_type.id == "docs_only" else 'all'
            
            files = search_with_grep_multiple_dirs(search_term, self.selected_dirs, search_mode, file_types, fuzzy)
            
            if files:
                self.push_screen(FileSelectScreen(files, program), self.on_file_selection_done)
            else:
                search_type_str = "fuzzy" if fuzzy else "exact"
                self.notify(f"No matches found for {search_type_str} search.", severity="warning")
        
        elif button_id == "exit":
            self.exit()
    
    def on_directories_selected(self, result):
        if result is not None:
            self.selected_dirs = result
            self.update_dirs_label()
            count = len(self.selected_dirs)
            self.notify(f"Now searching in {count} director{'y' if count == 1 else 'ies'}")
    
    def on_file_selection_done(self, result):
        pass
    
    def open_files(self, program, files):
        for file_path in files:
            try:
                subprocess.Popen([program, file_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                self.notify(f"Opened: {os.path.basename(file_path)}")
            except Exception as e:
                self.notify(f"Error opening {file_path}: {e}", severity="error")

def main():
    app = FileOpenerApp()
    app.run()

if __name__ == "__main__":
    main()
