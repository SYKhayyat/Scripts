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

def search_files(search_term, search_dir):
    """Search for files containing the search term using fd."""
    try:
        # Search for all files with the keyword
        cmd = ['fd', '-i', search_term, search_dir, '--type', 'f']
        
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        all_files = [line.strip() for line in result.stdout.split('\n') if line.strip()]
        
        # Filter for document files including backups
        found_files = []
        for file_path in all_files:
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
            
            if is_doc or is_backup:
                found_files.append(file_path)
        
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
        print("Usage: python3 file_opener.py <program_name>")
        print("Example: python3 file_opener.py libreoffice")
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
        
        # Search for files
        print(f"Searching for '{search_term}' in '{search_dir}'...")
        found_files = search_files(search_term, search_dir)
        
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