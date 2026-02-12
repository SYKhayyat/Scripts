#!/usr/bin/env python3
import os
import sys
import subprocess
from pathlib import Path

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

def ask_yes_no(question):
    while True:
        response = input(question + " (y/n): ").strip().lower()
        if response in ['y', 'yes']: return True
        elif response in ['n', 'no']: return False
        else: print("Please enter 'y' or 'n'")

def get_file_type_preference():
    while True:
        response = input("Search for document types or all? (docs/all): ").strip().lower()
        if response in ['docs', 'document', 'documents']: return 'docs'
        elif response in ['all', 'everything']: return 'all'
        else: print("Please enter 'docs' or 'all'")

def select_paths(paths, prompt_message="Enter numbers (e.g., 1,3) or 'back':"):
    while True:
        selection = input(prompt_message).strip()
        if selection.lower() == 'back': return None
        if not selection: continue
        selected_paths = []
        try:
            nums = [num.strip() for num in selection.split(',')]
            for num_str in nums:
                if num_str.isdigit():
                    num = int(num_str)
                    if 1 <= num <= len(paths):
                        selected_paths.append(paths[num - 1])
            return selected_paths if selected_paths else None
        except ValueError:
            print("Invalid selection format")

def open_files(program, files):
    print(f"Opening {len(files)} file(s) with {program}...")
    for file_path in files:
        try:
            subprocess.Popen([program, file_path])
        except Exception as e:
            print(f"Error opening {file_path}: {e}")
    return True

def search_with_grep(search_term, search_dir, search_paths=False, file_types='docs'):
    """Exact substring search (non-fuzzy)."""
    try:
        # Using exact substring instead of fuzzy join
        find_cmd = ['find', search_dir, '-path', '*/.*', '-prune', '-o', '-print']
        find_proc = subprocess.Popen(find_cmd, stdout=subprocess.PIPE, text=True)
        
        # Grep for the literal search term (case-insensitive)
        grep_proc = subprocess.Popen(['grep', '-i', search_term], stdin=find_proc.stdout, stdout=subprocess.PIPE, text=True)
        find_proc.stdout.close()
        
        stdout, _ = grep_proc.communicate()
        found_paths = [line.strip() for line in stdout.split('\n') if line.strip()]
        
        results = []
        for path in found_paths:
            if os.path.isfile(path):
                if file_types == 'all' or is_document_file(path):
                    results.append(path)
            elif search_paths and os.path.isdir(path):
                results.append(path)
        return sorted(list(set(results)))
    except Exception as e:
        print(f"Search error: {e}")
        return []

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 file_opener.py <program_name>")
        sys.exit(1)
        
    program = sys.argv[1]
    home_dir = str(Path.home())

    while True:
        search_dir_input = input(f"\nEnter directory path or name to search folders [default: {home_dir}]: ").strip()
        
        if search_dir_input.lower() == 'done':
            break
        
        if not search_dir_input or search_dir_input.lower() == 'home':
            search_dir = home_dir
        elif os.path.isdir(search_dir_input):
            search_dir = search_dir_input
        else:
            # Exact Directory Search (matches substring of the path)
            print(f"Searching for directories containing '{search_dir_input}'...")
            find_cmd = ['find', home_dir, '-type', 'd', '-path', '*/.*', '-prune', '-o', '-type', 'd', '-print']
            find_proc = subprocess.Popen(find_cmd, stdout=subprocess.PIPE, text=True)
            
            # Changed to literal search (-F) or standard substring search
            grep_proc = subprocess.Popen(['grep', '-i', search_dir_input], stdin=find_proc.stdout, stdout=subprocess.PIPE, text=True)
            find_proc.stdout.close()
            
            stdout, _ = grep_proc.communicate()
            found_dirs = sorted([line.strip() for line in stdout.split('\n') if line.strip()])

            if not found_dirs:
                print("No directories found.")
                continue

            for i, d in enumerate(found_dirs, 1):
                print(f"{i}. {d}")
            
            selection = select_paths(found_dirs, "Select a directory number or 'back':")
            if not selection:
                continue
            search_dir = selection[0]

        search_term = input(f"Search files in {search_dir}: ").strip()
        if not search_term:
            continue

        search_paths = ask_yes_no("Include folder names in search?")
        file_types = get_file_type_preference()

        found_files = search_with_grep(search_term, search_dir, search_paths, file_types)

        if not found_files:
            print("No matches found.")
            continue

        for i, f in enumerate(found_files, 1):
            print(f"{i}. {f}")

        selected = select_paths(found_files)
        if selected:
            open_files(program, selected)

if __name__ == "__main__":
    main()
