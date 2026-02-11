#!/usr/bin/env python3
"""
Org mode file cleaner script.
Removes empty paragraphs and trims leading dashes/hyphens/spaces
while preserving Org headings and list items.
"""

import os
import re
import sys
from pathlib import Path


def is_org_heading(line):
    """Check if line is an Org heading (starts with one or more *)."""
    return line.startswith('*')


def is_org_list_item(line):
    """Check if line is an Org list item (starts with -, +, or numbered)."""
    stripped = line.lstrip()
    return (re.match(r'^[-+]\s', stripped) or 
            re.match(r'^\d+\.\s', stripped) or
            re.match(r'^[a-zA-Z]\.\s', stripped))


def trim_line(line):
    """Trim leading dashes, hyphens, and spaces while preserving Org structure."""
    if is_org_heading(line):
        return line
    elif is_org_list_item(line):
        return line
    else:
        return re.sub(r'^[-\s]+', '', line)


def is_empty_paragraph(line):
    """Check if line is empty or contains only whitespace."""
    return line.strip() == ''


def process_org_file(file_path):
    """Process a single Org file and return cleaned content."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except UnicodeDecodeError:
        try:
            with open(file_path, 'r', encoding='latin-1') as f:
                lines = f.readlines()
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            return None
    
    cleaned_lines = []
    
    for line in lines:
        if is_empty_paragraph(line):
            continue
        
        trimmed_line = trim_line(line.rstrip('\n\r'))
        cleaned_lines.append(trimmed_line + '\n')
    
    return cleaned_lines


def find_org_files(directory):
    """Find all .org files in directory and subdirectories."""
    org_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.org'):
                org_files.append(os.path.join(root, file))
    return org_files


def process_path(path):
    """Process a file or directory path."""
    path_obj = Path(path)
    
    if not path_obj.exists():
        print(f"Path does not exist: {path}")
        return False
    
    if path_obj.is_file():
        if not path.lower().endswith('.org'):
            print(f"Skipping non-Org file: {path}")
            return True
        
        print(f"Processing file: {path}")
        cleaned_content = process_org_file(path)
        if cleaned_content is not None:
            try:
                with open(path, 'w', encoding='utf-8') as f:
                    f.writelines(cleaned_content)
                print(f"Cleaned: {path}")
                return True
            except Exception as e:
                print(f"Error writing to {path}: {e}")
                return False
    
    elif path_obj.is_dir():
        print(f"Processing directory: {path}")
        org_files = find_org_files(path)
        if not org_files:
            print(f"No .org files found in {path}")
            return True
        
        success_count = 0
        for org_file in org_files:
            print(f"Processing: {org_file}")
            cleaned_content = process_org_file(org_file)
            if cleaned_content is not None:
                try:
                    with open(org_file, 'w', encoding='utf-8') as f:
                        f.writelines(cleaned_content)
                    print(f"Cleaned: {org_file}")
                    success_count += 1
                except Exception as e:
                    print(f"Error writing to {org_file}: {e}")
        
        print(f"Successfully processed {success_count}/{len(org_files)} files in {path}")
        return success_count > 0
    
    return False


def get_user_input():
    """Get file/folder paths from user interactively."""
    paths = []
    print("Org Mode File Cleaner")
    print("=" * 30)
    print("Enter file or folder paths to process (one per line).")
    print("Enter 'done' when finished, or press Ctrl+C to exit.")
    print()
    
    while True:
        try:
            user_input = input(f"Path {len(paths) + 1} (or 'done'): ").strip()
            
            if user_input.lower() in ['done', 'exit', 'quit']:
                break
            
            if user_input:
                paths.append(user_input)
            
        except KeyboardInterrupt:
            print("\nOperation cancelled.")
            sys.exit(0)
    
    return paths


def main():
    """Main function."""
    if len(sys.argv) > 1:
        paths = sys.argv[1:]
    else:
        paths = get_user_input()
    
    if not paths:
        print("No paths provided. Exiting.")
        return
    
    print(f"\nProcessing {len(paths)} path(s)...")
    print("-" * 30)
    
    success_count = 0
    for path in paths:
        if process_path(path):
            success_count += 1
        print()
    
    print("=" * 30)
    print(f"Completed: {success_count}/{len(paths)} path(s) processed successfully")


if __name__ == "__main__":
    main()