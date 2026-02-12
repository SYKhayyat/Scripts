#!/usr/bin/env python3

import os
import sys
import subprocess
from pathlib import Path

# Common document file extensions
DOC_EXTENSIONS = [
    'txt', 'doc', 'docx', 'pdf', 'odt', 'ods', 'odp', 'rtf',
    'xls', 'xlsx', 'ppt', 'pptx', 'md', 'csv', 'html', 'htm',
    'epub', 'mobi', 'tex', 'log', 'json', 'xml', 'yaml', 'yml',
    'org'
]

# Backup file suffixes to include
BACKUP_SUFFIXES = ['~', '.bak', '.backup']

def search_files(search_term, search_dir, search_paths=False, folders_only=False, file_types='docs'):
    """Search for files containing the search term using fd."""
    try:
        found_files = []
        
        if search_paths:
            if folders_only:
                # Search for files with matching names
                cmd_files = ['fd', '-i', search_term, search_dir, '--type', 'f']
                result_files = subprocess.run(cmd_files, capture_output=True, text=True, check=True)
                files = [line.strip() for line in result_files.stdout.split('\n') if line.strip()]
                
                # Search for directories with matching names
                cmd_dirs = ['fd', '-i', search_term, search_dir, '--type', 'd']
                result_dirs = subprocess.run(cmd_dirs, capture_output=True, text=True, check=True)
                dirs = [line.strip() for line in result_dirs.stdout.split('\n') if line.strip()]
                
                # Filter files based on file type preference
                if file_types == 'docs':
                    for file_path in files:
                        if is_document_file(file_path):
                            found_files.append(file_path)
                else:  # all files
                    found_files.extend(files)
                
                # Add directories (always included when searching paths)
                found_files.extend(dirs)
                
            else:
                # Search for anything where search term appears in the full path
                cmd = ['fd', '-i', search_term, search_dir]
                result = subprocess.run(cmd, capture_output=True, text=True, check=True)
                all_paths = [line.strip() for line in result.stdout.split('\n') if line.strip()]
                
                for path in all_paths:
                    if os.path.isfile(path):
                        if file_types == 'docs':
                            if is_document_file(path):
                                found_files.append(path)
                        else:  # all files
                            found_files.append(path)
                    else:
                        found_files.append(path)
        else:
            # Original behavior - search only file names
            cmd = ['fd', '-i', search_term, search_dir, '--type', 'f']
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            all_files = [line.strip() for line in result.stdout.split('\n') if line.strip()]
            
            # Filter based on file type preference
            if file_types == 'docs':
                for file_path in all_files:
                    if is_document_file(file_path):
                        found_files.append(file_path)
            else:  # all files
                found_files.extend(all_files)
        
        return found_files
        
    except subprocess.CalledProcessError as e:
        if e.returncode == 1:  # No results found
            return []
        else:
            print(f"Error running fd: {e}")
            return []
    except FileNotFoundError:
        print("Error: fd command not found. Please install fd (find).")
        return []

def is_document_file(file_path):
    """Check if file is a document file including backups."""
    file_lower = file_path.lower()
    
    # Check if it's a document file
    is_doc = any(file_lower.endswith(f'.{ext.lower()}') for ext in DOC_EXTENSIONS)
    
    # Check if it's a backup of a document file
    is_backup = False
    for suffix in BACKUP_SUFFIXES:
        if file_lower.endswith(suffix.lower()):
            # Remove backup suffix and check if base is a document
            base_path = file_path[:-len(suffix)]
            base_lower = base_path.lower()
            if any(base_lower.endswith(f'.{ext.lower()}') for ext in DOC_EXTENSIONS):
                is_backup = True
                break
    
    return is_doc or is_backup

def ask_yes_no(question):
    """Ask a yes/no question and return True for yes, False for no."""
    while True:
        response = input(question + " (y/n): ").strip().lower()
        if response in ['y', 'yes']:
            return True
        elif response in ['n', 'no']:
            return False
        else:
            print("Please enter 'y' or 'n'")

def get_file_type_preference():
    """Ask user what type of files to search for."""
    while True:
        response = input("Search for document types (pdf, docx, odt, txt, org, etc.) or all file types? (docs/all): ").strip().lower()
        if response in ['docs', 'document', 'documents']:
            return 'docs'
        elif response in ['all', 'everything']:
            return 'all'
        else:
            print("Please enter 'docs' or 'all'")

def select_files(files):
    """Let user select files by number."""
    while True:
        selection = input("Enter file numbers to open (comma-separated, e.g., 1,3,5) or 'back': ").strip()
        
        if selection.lower() == 'back':
            return None
        
        if not selection:
            print("Please enter a selection")
            continue
        
        # Parse selection
        selected_files = []
        valid = True
        
        try:
            nums = [num.strip() for num in selection.split(',')]
            for num_str in nums:
                if num_str.isdigit():
                    num = int(num_str)
                    if 1 <= num <= len(files):
                        selected_files.append(files[num - 1])
                    else:
                        print(f"Invalid selection: {num} (must be 1-{len(files)})")
                        valid = False
                        break
                else:
                    print(f"Invalid selection: {num_str}")
                    valid = False
                    break
            
            if valid and selected_files:
                return selected_files
            elif valid:
                print("No valid files selected")
        except ValueError:
            print("Invalid selection format")

def open_files(program, files):
    """Open files with the specified program."""
    print(f"Opening {len(files)} file(s) with {program}...")
    for file_path in files:
        print(f"  Opening: {file_path}")
        try:
            # Open file in background
            subprocess.Popen([program, file_path])
        except FileNotFoundError:
            print(f"Error: Program '{program}' not found")
            return False
        except Exception as e:
            print(f"Error opening {file_path}: {e}")
    
    return True

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 file_opener_copy.py <program_name>")
        print("Example: python3 file_opener_copy.py libreoffice")
        sys.exit(1)
    
    program = sys.argv[1]
    home_dir = str(Path.home())
    
    print(f"Interactive file opener with program: {program}")
    print("Type 'done' to exit")
    print()
    
    while True:
        # Get search directory
        search_dir_input = input(f"Enter search directory [default: {home_dir}]: ").strip()
        search_dir = search_dir_input if search_dir_input else home_dir
        
        if not os.path.isdir(search_dir):
            print(f"Directory '{search_dir}' does not exist")
            continue
        
        # Get search term
        search_term = input("Enter file name to search for (or 'done' to exit): ").strip()
        
        if search_term.lower() == 'done':
            print("Goodbye!")
            break
        
        if not search_term:
            print("Please enter a search term")
            continue
        
        # Ask about search scope
        search_paths = ask_yes_no("Should I search the path as well?")
        
        search_path_contents = False
        if search_paths:
            search_path_contents = ask_yes_no("Do you want to display just the folders found, or also everything contained in those folders?")
            if not search_path_contents:
                print("Will display files with matching names and folders with matching names")
            else:
                print("Will display everything where the search string appears in any part of the pathname")
        
        # Ask about file types
        file_types = get_file_type_preference()
        
        # Search for files
        print(f"Searching for '{search_term}' in '{search_dir}'...")
        folders_only = search_paths and not search_path_contents
        found_files = search_files(search_term, search_dir, search_paths, folders_only, file_types)
        
        # Sort results for consistent ordering
        found_files.sort()
        
        if not found_files:
            print(f"No files found matching '{search_term}'")
            print()
            continue
        
        # Display results
        print(f"Found {len(found_files)} file(s):")
        for i, file_path in enumerate(found_files, 1):
            print(f"  {i}. {file_path}")
        
        # Selection loop
        while True:
            selected_files = select_files(found_files)
            
            if selected_files is None:  # User chose 'back'
                break
            
            # Open selected files
            if open_files(program, selected_files):
                print()
                break
            else:
                print("Failed to open some files. Try again.")
        
        print()

if __name__ == "__main__":
    main()