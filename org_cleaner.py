#!/usr/bin/env python3
"""
Org Mode File Cleaner
Removes empty paragraphs and/or leading dashes with spaces from org mode files.
Supports single files, multiple files, or recursive folder processing.
"""

import os
import sys
import re
import argparse
from pathlib import Path
from typing import List, Tuple, Set


class OrgModeCleaner:
    def __init__(self):
        self.remove_empty_paragraphs = False
        self.remove_dashes = False
        self.preview_mode = False
        self.recursive = True
        
    def find_org_files_recursive(self, directory: str) -> List[str]:
        """Find all .org files in directory recursively"""
        org_files = []
        try:
            for root, dirs, files in os.walk(directory):
                for file in files:
                    if file.lower().endswith('.org'):
                        org_files.append(os.path.join(root, file))
        except Exception as e:
            print(f"Error scanning directory {directory}: {e}")
        return org_files
    
    def get_user_input(self) -> List[str]:
        """Get input from user - can be file or folder, same format as docx_to_org_complete.py"""
        inputs = []
        
        print("=== Org Mode File Cleaner ===")
        print("Enter file or folder paths (or 'done' to finish, 'quit' to exit)")
        print("Folders will be scanned recursively for .org files")
        
        while True:
            try:
                input_path = input("\nEnter org file or folder path: ").strip()
                
                if input_path.lower() == 'quit':
                    return []
                elif input_path.lower() == 'done':
                    break
                elif not input_path:
                    print("Please enter a valid path")
                    continue
            except EOFError:
                print("Cannot read input in non-interactive mode. Use command line arguments instead.")
                return []
            except KeyboardInterrupt:
                print("\nOperation cancelled by user.")
                return []
            
            # Check if path exists
            if not os.path.exists(input_path):
                print(f"Path not found: {input_path}")
                continue
            
            # Handle folder
            if os.path.isdir(input_path):
                org_files = self.find_org_files_recursive(input_path)
                if not org_files:
                    print(f"No .org files found in {input_path}")
                    continue
                
                print(f"Found {len(org_files)} .org files in {input_path}")
                try:
                    confirm = input(f"Process all {len(org_files)} files? [y/n] ").strip().lower()
                    if confirm in ['y', 'yes']:
                        inputs.extend(org_files)
                    else:
                        continue
                except EOFError:
                    print("Cannot read input in non-interactive mode. Use command line arguments instead.")
                    return []
                except KeyboardInterrupt:
                    print("\nOperation cancelled by user.")
                    return []
            
            # Handle single file
            elif input_path.lower().endswith('.org'):
                inputs.append(input_path)
            
            else:
                print("Path must be a .org file or folder")
                continue
            
            print(f"Added: {len(inputs)} file(s) queued for processing")
        
        return inputs
    
    def ask_what_to_remove(self):
        """Ask user what they want to remove from files"""
        print("\nWhat do you want to remove?")
        print("1. Empty paragraphs only")
        print("2. Dashes at beginning of lines only") 
        print("3. Both empty paragraphs and dashes")
        
        while True:
            try:
                choice = input("Enter choice [1/2/3]: ").strip()
                if choice == '1':
                    self.remove_empty_paragraphs = True
                    self.remove_dashes = False
                    break
                elif choice == '2':
                    self.remove_empty_paragraphs = False
                    self.remove_dashes = True
                    break
                elif choice == '3':
                    self.remove_empty_paragraphs = True
                    self.remove_dashes = True
                    break
                else:
                    print("Please enter 1, 2, or 3")
            except EOFError:
                print("Cannot read input in non-interactive mode. Use command line arguments instead.")
                sys.exit(1)
            except KeyboardInterrupt:
                print("\nOperation cancelled by user.")
                sys.exit(1)
    
    def clean_org_content(self, content: str) -> Tuple[str, int]:
        """Clean org mode content and return cleaned content and number of changes made"""
        lines = content.splitlines()
        original_count = len(lines)
        changes_made = 0
        
        cleaned_lines = []
        i = 0
        while i < len(lines):
            line = lines[i]
            original_line = line
            
            # Remove dash followed by space at beginning of line
            if self.remove_dashes:
                if line.startswith('- '):
                    line = line[2:]
                    changes_made += 1
                elif line.startswith('-\t'):
                    line = line[2:]
                    changes_made += 1
            
            # Check if this is an empty paragraph (line with only whitespace)
            is_empty = not line.strip()
            
            if is_empty and self.remove_empty_paragraphs:
                # Skip this line (remove empty paragraph)
                changes_made += 1
                i += 1
                continue
            
            cleaned_lines.append(line)
            i += 1
        
        # Remove trailing empty lines but keep one if file ends with multiple
        while len(cleaned_lines) > 1 and not cleaned_lines[-1].strip():
            if len(cleaned_lines) > 1 and not cleaned_lines[-2].strip():
                cleaned_lines.pop()
                changes_made += 1
            else:
                break
        
        return '\n'.join(cleaned_lines), changes_made
    
    def process_file(self, file_path: str) -> bool:
        """Process a single org file"""
        try:
            print(f"\nProcessing {file_path}...")
            
            # Read original content
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            # Clean the content
            cleaned_content, changes = self.clean_org_content(original_content)
            
            if changes == 0:
                print(f"  No changes needed")
                return True
            
            print(f"  Made {changes} change(s)")
            
            # Show preview if requested
            if self.preview_mode:
                print("  Preview of changes:")
                original_lines = original_content.splitlines()
                cleaned_lines = cleaned_content.splitlines()
                
                for i, (orig, clean) in enumerate(zip(original_lines, cleaned_lines)):
                    if orig != clean:
                        print(f"    Line {i+1}: '{orig}' -> '{clean}'")
                
                if len(cleaned_lines) != len(original_lines):
                    print(f"    Line count changed from {len(original_lines)} to {len(cleaned_lines)}")
                
                try:
                    confirm = input("  Apply these changes? [y/n] ").strip().lower()
                    if confirm not in ['y', 'yes']:
                        print(f"  Skipped {file_path}")
                        return False
                except EOFError:
                    print("  Cannot read input in non-interactive mode. Skipping changes.")
                    return False
                except KeyboardInterrupt:
                    print("\n  Operation cancelled by user.")
                    return False
            
            # Write cleaned content back to file
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(cleaned_content)
            
            print(f"  ✓ Cleaned {file_path}")
            return True
            
        except Exception as e:
            print(f"  ✗ Error processing {file_path}: {str(e)}")
            return False
    
    def run_interactive(self):
        """Run in interactive mode"""
        print("=== Org Mode File Cleaner ===")
        
        # Ask what to remove
        self.ask_what_to_remove()
        
        # Ask about preview mode
        while True:
            try:
                preview_choice = input("Show preview before making changes? [y/n]: ").strip().lower()
                if preview_choice in ['y', 'yes', 'n', 'no']:
                    self.preview_mode = preview_choice in ['y', 'yes']
                    break
                else:
                    print("Please enter y or n")
            except EOFError:
                print("Cannot read input in non-interactive mode. Use command line arguments instead.")
                return
            except KeyboardInterrupt:
                print("\nOperation cancelled by user.")
                return
        
        # Get files to process
        files = self.get_user_input()
        
        if not files:
            print("No files selected. Exiting.")
            return
        
        print(f"\nProcessing {len(files)} file(s)...")
        
        success_count = 0
        for file_path in files:
            if self.process_file(file_path):
                success_count += 1
        
        print(f"\nProcessing complete: {success_count}/{len(files)} files processed successfully.")
    
    def run_command_line(self, args):
        """Run with command line arguments"""
        self.remove_empty_paragraphs = args.empty_paragraphs
        self.remove_dashes = args.dashes
        self.preview_mode = args.preview
        self.recursive = args.recursive
        
        if not args.empty_paragraphs and not args.dashes:
            print("Error: Must specify at least one of --empty-paragraphs or --dashes")
            return
        
        files = []
        
        # Handle input paths
        for path in args.paths:
            if not os.path.exists(path):
                print(f"Path not found: {path}")
                continue
            
            if os.path.isdir(path):
                if self.recursive:
                    org_files = self.find_org_files_recursive(path)
                else:
                    org_files = []
                    try:
                        for file in os.listdir(path):
                            if file.lower().endswith('.org'):
                                org_files.append(os.path.join(path, file))
                    except Exception as e:
                        print(f"Error scanning directory {path}: {e}")
                
                if org_files:
                    files.extend(org_files)
                    print(f"Found {len(org_files)} .org files in {path}")
                else:
                    print(f"No .org files found in {path}")
            
            elif path.lower().endswith('.org'):
                files.append(path)
            
            else:
                print(f"Skipping non-org file: {path}")
        
        if not files:
            print("No .org files found to process.")
            return
        
        print(f"Processing {len(files)} file(s)...")
        
        success_count = 0
        for file_path in files:
            if self.process_file(file_path):
                success_count += 1
        
        print(f"\nProcessing complete: {success_count}/{len(files)} files processed successfully.")


def main():
    cleaner = OrgModeCleaner()
    
    # Set up command line argument parsing
    parser = argparse.ArgumentParser(
        description='Clean org mode files by removing empty paragraphs and/or leading dashes',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --empty-paragraphs file.org
  %(prog)s --dashes --recursive folder/
  %(prog)s --empty-paragraphs --dashes --preview file1.org file2.org
  %(prog)s (interactive mode)
        """
    )
    
    parser.add_argument('paths', nargs='*', 
                       help='org files or folders to process')
    parser.add_argument('--empty-paragraphs', action='store_true',
                       help='Remove empty paragraphs')
    parser.add_argument('--dashes', action='store_true',
                       help='Remove dash followed by space at beginning of lines')
    parser.add_argument('--preview', action='store_true',
                       help='Show preview of changes before applying')
    parser.add_argument('--recursive', action='store_true', default=True,
                       help='Process directories recursively (default: True)')
    parser.add_argument('--no-recursive', dest='recursive', action='store_false',
                       help='Process directories non-recursively')
    
    args = parser.parse_args()
    
    # Always run interactive mode
    cleaner.run_interactive()


if __name__ == "__main__":
    main()