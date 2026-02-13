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

def search_files_fast(search_term, search_dirs, file_types='docs', fuzzy=False):
    """Fast file search using fd and fzf."""
    all_results = []
    fd_cmd = get_fd_cmd()
    
    for search_dir in search_dirs:
        try:
            if fuzzy and FZF_AVAILABLE:
                if fd_cmd:
                    fd_proc = subprocess.Popen(
                        [fd_cmd, '--type', 'f', '--hidden', '--exclude', '.git', '.', search_dir],
                        stdout=subprocess.PIPE, text=True
                    )
                else:
                    fd_proc = subprocess.Popen(
                        ['find', search_dir, '-type', 'f', '-not', '-path', '*/.*'],
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
                cmd = [fd_cmd, '--type', 'f', '--hidden', '--exclude', '.git', search_term, search_dir]
                result = subprocess.run(cmd, capture_output=True, text=True)
                matched_paths = [line.strip() for line in result.stdout.split('\n') if line.strip()]
            else:
                find_cmd = ['find', search_dir, '-type', 'f', '-not', '-path', '*/.*']
                find_proc = subprocess.Popen(find_cmd, stdout=subprocess.PIPE, text=True)
                grep_proc = subprocess.Popen(
                    ['grep', '-i', search_term],
                    stdin=find_proc.stdout, stdout=subprocess.PIPE, text=True
                )
                find_proc.stdout.close()
                stdout, _ = grep_proc.communicate()
                matched_paths = [line.strip() for line in stdout.split('\n') if line.strip()]
            
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
                cmd = [fd_cmd, '--type', 'd', '--hidden', '--exclude', '.git', search_term, search_dir]
                result = subprocess.run(cmd, capture_output=True, text=True)
                matched_paths = [line.strip() for line in result.stdout.split('\n') if line.strip()]
            else:
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

class DirectoryPickerScreen(Screen):
    """Screen for searching and selecting directories."""
    
    def __init__(self, home_dir):
        super().__init__()
        self.home_dir = home_dir
        self.found_directories = []
        self.selected_indices = set()
    
    def compose(self) -> ComposeResult:
        yield Header()
        yield Label("Search for Directories", id="title")
        
        yield Input(placeholder="Enter search term...", id="search_input")
        
        yield Label("Search Mode:")
        yield RadioSet(
            RadioButton("Exact search", value=True, id="exact"),
            RadioButton("Fuzzy search", id="fuzzy"),
            id="search_mode"
        )
        
        yield Horizontal(
            Button("Search", id="search", variant="primary"),
            Button("Clear Results", id="clear", variant="warning"),
            id="search_buttons"
        )
        
        yield Label("Results (click to select/deselect):", id="results_label")
        yield ListView(id="results_list")
        
        yield Horizontal(
            Button("Add Selected to List", id="add_selected", variant="success"),
            Button("Back", id="back", variant="error"),
            id="action_buttons"
        )
        yield Footer()
    
    def on_mount(self):
        self.query_one("#search_input", Input).focus()
    
    def on_button_pressed(self, event):
        button_id = event.button.id
        
        if button_id == "search":
            search_input = self.query_one("#search_input", Input)
            search_term = search_input.value.strip()
            
            if not search_term:
                self.notify("Please enter a search term", severity="warning")
                return
            
            search_mode = self.query_one("#search_mode", RadioSet)
            fuzzy = search_mode.pressed_button and search_mode.pressed_button.id == "fuzzy"
            
            self.notify(f"Searching with {'fuzzy' if fuzzy else 'exact'} mode...")
            self.found_directories = search_folders_fast(search_term, [self.home_dir], fuzzy)
            
            results_list = self.query_one("#results_list", ListView)
            results_list.clear()
            self.selected_indices.clear()
            
            if self.found_directories:
                for i, d in enumerate(self.found_directories, 1):
                    results_list.append(ListItem(Label(f"{i}. {d}")))
                self.notify(f"Found {len(self.found_directories)} directories")
            else:
                results_list.append(ListItem(Label("No directories found.")))
        
        elif button_id == "clear":
            results_list = self.query_one("#results_list", ListView)
            results_list.clear()
            self.found_directories = []
            self.selected_indices.clear()
        
        elif button_id == "add_selected":
            selected_dirs = [self.found_directories[i] for i in sorted(self.selected_indices) if i < len(self.found_directories)]
            if selected_dirs:
                self.dismiss(selected_dirs)
            else:
                self.notify("No directories selected", severity="warning")
        
        elif button_id == "back":
            self.dismiss(None)
    
    def on_list_view_selected(self, event):
        index = event.list_view.index
        if index >= len(self.found_directories):
            return
        
        if index in self.selected_indices:
            self.selected_indices.remove(index)
            event.item.styles.background = ""
        else:
            self.selected_indices.add(index)
            event.item.styles.background = "green"

class FilePickerScreen(Screen):
    """Screen for searching and selecting files."""
    
    def __init__(self, search_dirs):
        super().__init__()
        self.search_dirs = search_dirs
        self.found_files = []
        self.selected_indices = set()
    
    def compose(self) -> ComposeResult:
        yield Header()
        yield Label("Search for Files", id="title")
        
        yield Input(placeholder="Enter search term...", id="search_input")
        
        yield Label("Search Mode:")
        yield RadioSet(
            RadioButton("Exact search", value=True, id="exact"),
            RadioButton("Fuzzy search", id="fuzzy"),
            id="search_mode"
        )
        
        yield Label("Search Type:")
        yield RadioSet(
            RadioButton("Files only", value=True, id="files_only"),
            RadioButton("Folders only", id="folders_only"),
            RadioButton("Folders + contents", id="folders_contents"),
            id="search_type"
        )
        
        yield Label("File Filter:")
        yield RadioSet(
            RadioButton("Documents only", value=True, id="docs_only"),
            RadioButton("All files", id="all_files"),
            id="file_type"
        )
        
        yield Horizontal(
            Button("Search", id="search", variant="primary"),
            Button("Clear Results", id="clear", variant="warning"),
            id="search_buttons"
        )
        
        yield Label("Results (click to select/deselect):", id="results_label")
        yield ListView(id="results_list")
        
        yield Horizontal(
            Button("Add Selected to List", id="add_selected", variant="success"),
            Button("Back", id="back", variant="error"),
            id="action_buttons"
        )
        yield Footer()
    
    def on_mount(self):
        self.query_one("#search_input", Input).focus()
    
    def on_button_pressed(self, event):
        button_id = event.button.id
        
        if button_id == "search":
            search_input = self.query_one("#search_input", Input)
            search_term = search_input.value.strip()
            
            if not search_term:
                self.notify("Please enter a search term", severity="warning")
                return
            
            if not self.search_dirs:
                self.notify("No directories selected! Add directories first.", severity="error")
                return
            
            search_mode = self.query_one("#search_mode", RadioSet)
            fuzzy = search_mode.pressed_button and search_mode.pressed_button.id == "fuzzy"
            
            search_type = self.query_one("#search_type", RadioSet)
            if search_type.pressed_button and search_type.pressed_button.id == "folders_only":
                mode = 'folders'
            elif search_type.pressed_button and search_type.pressed_button.id == "folders_contents":
                mode = 'folder_contents'
            else:
                mode = 'files'
            
            file_type = self.query_one("#file_type", RadioSet)
            file_types = 'docs' if (file_type.pressed_button and file_type.pressed_button.id == "docs_only") else 'all'
            
            self.notify(f"Searching with {'fuzzy' if fuzzy else 'exact'} mode...")
            
            if mode == 'folders':
                self.found_files = search_folders_fast(search_term, self.search_dirs, fuzzy)
            else:
                self.found_files = search_files_fast(search_term, self.search_dirs, file_types, fuzzy)
                
                if mode == 'folder_contents':
                    # Also find folders and get their contents
                    folders = search_folders_fast(search_term, self.search_dirs, fuzzy)
                    for folder in folders:
                        folder_files = get_all_files_in_dir(folder, file_types)
                        self.found_files.extend(folder_files)
                    # Remove duplicates
                    seen = set()
                    unique_results = []
                    for path in self.found_files:
                        if path not in seen:
                            seen.add(path)
                            unique_results.append(path)
                    self.found_files = sorted(unique_results)
            
            results_list = self.query_one("#results_list", ListView)
            results_list.clear()
            self.selected_indices.clear()
            
            if self.found_files:
                for i, f in enumerate(self.found_files, 1):
                    results_list.append(ListItem(Label(f"{i}. {f}")))
                self.notify(f"Found {len(self.found_files)} items")
            else:
                results_list.append(ListItem(Label("No files found.")))
        
        elif button_id == "clear":
            results_list = self.query_one("#results_list", ListView)
            results_list.clear()
            self.found_files = []
            self.selected_indices.clear()
        
        elif button_id == "add_selected":
            selected_files = [self.found_files[i] for i in sorted(self.selected_indices) if i < len(self.found_files)]
            if selected_files:
                self.dismiss(selected_files)
            else:
                self.notify("No files selected", severity="warning")
        
        elif button_id == "back":
            self.dismiss(None)
    
    def on_list_view_selected(self, event):
        index = event.list_view.index
        if index >= len(self.found_files):
            return
        
        if index in self.selected_indices:
            self.selected_indices.remove(index)
            event.item.styles.background = ""
        else:
            self.selected_indices.add(index)
            event.item.styles.background = "blue"

class MainScreen(Screen):
    """Main screen with lists and action buttons."""
    
    def __init__(self):
        super().__init__()
        self.home_dir = str(Path.home())
        self.selected_dirs = ['/home/shaul']
        self.selected_files = []
    
    def compose(self) -> ComposeResult:
        yield Header()
        yield Label("File Opener", id="title")
        
        yield Input(placeholder="Program to open files (e.g., vim, code, xdg-open)...", id="program_input")
        
        yield Horizontal(
            Input(placeholder="Type directory path and press Enter to add...", id="manual_dir_input"),
            id="manual_dir_row"
        )
        
        yield Horizontal(
            Input(placeholder="Type file path and press Enter to add...", id="manual_file_input"),
            id="manual_file_row"
        )
        
        yield Horizontal(
            Vertical(
                Label("Selected Directories", classes="section_title"),
                Label("Click to remove", classes="hint"),
                ListView(id="dirs_list"),
                Button("Pick Directories", id="pick_dirs", variant="primary"),
                classes="list_section"
            ),
            Vertical(
                Label("Selected Files", classes="section_title"),
                Label("Click to remove", classes="hint"),
                ListView(id="files_list"),
                Button("Pick Files", id="pick_files", variant="primary"),
                classes="list_section"
            ),
            id="lists_container"
        )
        
        yield Horizontal(
            Button("Open Selected Files", id="open_files", variant="success"),
            Button("Clear All", id="clear_all", variant="warning"),
            Button("Exit", id="exit", variant="error"),
            id="main_buttons"
        )
        yield Footer()
    
    def on_mount(self):
        self.update_dirs_list()
        self.update_files_list()
        
        # Show tool availability
        fd_cmd = get_fd_cmd()
        tools = []
        if fd_cmd:
            tools.append(fd_cmd)
        if FZF_AVAILABLE:
            tools.append("fzf")
        if tools:
            self.notify(f"Fast search enabled: {', '.join(tools)}")
        else:
            self.notify("Using fallback find/grep (install fd and fzf for speed)", severity="warning")
    
    def update_dirs_list(self):
        dirs_list = self.query_one("#dirs_list", ListView)
        dirs_list.clear()
        if self.selected_dirs:
            for i, d in enumerate(self.selected_dirs, 1):
                dirs_list.append(ListItem(Label(f"{i}. {d}")))
        else:
            dirs_list.append(ListItem(Label("No directories selected")))
    
    def update_files_list(self):
        files_list = self.query_one("#files_list", ListView)
        files_list.clear()
        if self.selected_files:
            for i, f in enumerate(self.selected_files, 1):
                files_list.append(ListItem(Label(f"{i}. {os.path.basename(f)}")))
        else:
            files_list.append(ListItem(Label("No files selected")))
    
    def on_input_submitted(self, event):
        """Handle Enter key in manual directory and file inputs."""
        if event.input.id == "manual_dir_input":
            dir_path = event.value.strip()
            if not dir_path:
                return
            
            # Expand home directory shortcut
            if dir_path.startswith("~"):
                dir_path = os.path.expanduser(dir_path)
            
            # Check if directory exists
            if not os.path.isdir(dir_path):
                self.notify(f"Not a valid directory: {dir_path}", severity="error")
                return
            
            # Check if already in list
            if dir_path in self.selected_dirs:
                self.notify(f"Directory already in list: {dir_path}", severity="warning")
                event.input.value = ""
                return
            
            # Add to list
            self.selected_dirs.append(dir_path)
            self.update_dirs_list()
            self.notify(f"Added: {dir_path}")
            event.input.value = ""
        
        elif event.input.id == "manual_file_input":
            file_path = event.value.strip()
            if not file_path:
                return
            
            # Expand home directory shortcut
            if file_path.startswith("~"):
                file_path = os.path.expanduser(file_path)
            
            # Check if file exists
            if not os.path.isfile(file_path):
                self.notify(f"Not a valid file: {file_path}", severity="error")
                return
            
            # Check if already in list
            if file_path in self.selected_files:
                self.notify(f"File already in list: {file_path}", severity="warning")
                event.input.value = ""
                return
            
            # Add to list
            self.selected_files.append(file_path)
            self.update_files_list()
            self.notify(f"Added: {os.path.basename(file_path)}")
            event.input.value = ""
    
    def on_button_pressed(self, event):
        button_id = event.button.id
        
        if button_id == "pick_dirs":
            self.app.push_screen(DirectoryPickerScreen(self.home_dir), self.on_dirs_picked)
        
        elif button_id == "pick_files":
            if not self.selected_dirs:
                self.notify("Please select directories first!", severity="error")
                return
            self.app.push_screen(FilePickerScreen(self.selected_dirs), self.on_files_picked)
        
        elif button_id == "open_files":
            if not self.selected_files:
                self.notify("No files selected!", severity="error")
                return
            
            program_input = self.query_one("#program_input", Input)
            program = program_input.value.strip()
            
            if not program:
                self.notify("Please enter a program to open files", severity="error")
                return
            
            try:
                subprocess.run(['which', program], capture_output=True, check=True)
            except subprocess.CalledProcessError:
                self.notify(f"Program '{program}' not found in PATH", severity="error")
                return
            
            opened = 0
            for file_path in self.selected_files:
                try:
                    subprocess.Popen([program, file_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                    opened += 1
                except Exception as e:
                    self.notify(f"Error opening {file_path}: {e}", severity="error")
            
            self.notify(f"Opened {opened} file(s) with {program}")
        
        elif button_id == "clear_all":
            self.selected_dirs = []
            self.selected_files = []
            self.update_dirs_list()
            self.update_files_list()
            self.notify("Cleared all selections")
        
        elif button_id == "exit":
            self.app.exit()
    
    def on_list_view_selected(self, event):
        """Handle clicking on list items to remove them."""
        list_view = event.list_view
        index = event.list_view.index
        
        if list_view.id == "dirs_list":
            if self.selected_dirs and index < len(self.selected_dirs):
                removed = self.selected_dirs.pop(index)
                self.update_dirs_list()
                self.notify(f"Removed: {removed}")
        
        elif list_view.id == "files_list":
            if self.selected_files and index < len(self.selected_files):
                removed = self.selected_files.pop(index)
                self.update_files_list()
                self.notify(f"Removed: {os.path.basename(removed)}")
    
    def on_dirs_picked(self, result):
        if result:
            for d in result:
                if d not in self.selected_dirs:
                    self.selected_dirs.append(d)
            self.update_dirs_list()
            self.notify(f"Added {len(result)} director{'y' if len(result) == 1 else 'ies'}")
    
    def on_files_picked(self, result):
        if result:
            for f in result:
                if f not in self.selected_files:
                    self.selected_files.append(f)
            self.update_files_list()
            self.notify(f"Added {len(result)} file{'s' if len(result) != 1 else ''}")

class FileOpenerApp(App):
    CSS = """
    Screen {
        align: center middle;
    }
    #title {
        text-align: center;
        text-style: bold;
        color: $text-accent;
        padding: 1;
    }
    #program_input {
        margin: 1 2;
        border: solid $warning;
    }
    #manual_dir_row {
        margin: 1 2;
        height: auto;
    }
    #manual_dir_input {
        width: 100%;
        border: solid $primary;
    }
    #lists_container {
        width: 100%;
        height: 25;
        margin: 1 0;
    }
    .list_section {
        width: 50%;
        height: 100%;
        border: solid $surface-lighten-1;
        padding: 1;
    }
    .section_title {
        text-style: bold;
        text-align: center;
    }
    .hint {
        text-style: italic;
        text-align: center;
        color: $text-muted;
    }
    ListView {
        height: 15;
        border: solid $surface-lighten-2;
        margin: 1 0;
    }
    #main_buttons {
        align: center middle;
        margin: 1 0;
    }
    #main_buttons > Button {
        margin: 0 1;
    }
    """
    
    def __init__(self):
        super().__init__()
    
    def on_mount(self):
        self.push_screen(MainScreen())

def main():
    app = FileOpenerApp()
    app.run()

if __name__ == "__main__":
    main()
