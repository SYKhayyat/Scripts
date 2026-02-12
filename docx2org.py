#!/usr/bin/env python3
"""
DOCX to Org Converter
Batch convert DOCX files to Org format using pandoc with interactive TUI.
"""

import os
import sys
import subprocess
import argparse
from pathlib import Path
from typing import List, Tuple, Optional
from dataclasses import dataclass
from enum import Enum


try:
    from tqdm import tqdm
    TQDM_AVAILABLE = True
except ImportError:
    TQDM_AVAILABLE = False
    print("Note: Install 'tqdm' for progress bars: pip install tqdm")


class ConflictResolution(Enum):
    OVERWRITE = "overwrite"
    OVERWRITE_ALL = "overwrite_all"
    SKIP = "skip"
    SKIP_ALL = "skip_all"
    APPEND = "append"
    APPEND_ALL = "append_all"


@dataclass
class ConversionTask:
    input_path: Path
    output_path: Path


class DocxToOrgConverter:
    def __init__(self):
        self.conflict_mode: Optional[ConflictResolution] = None
        self.tasks: List[ConversionTask] = []
        self.success_count = 0
        self.skip_count = 0
        self.error_count = 0
    
    def verify_pandoc(self) -> bool:
        """Check if pandoc is installed and accessible."""
        try:
            result = subprocess.run(
                ["pandoc", "--version"],
                capture_output=True,
                text=True,
                check=True
            )
            version_line = result.stdout.split('\n')[0]
            print(f"✓ Found: {version_line}")
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("✗ Error: pandoc is not installed or not in PATH")
            print("  Please install pandoc: https://pandoc.org/installing.html")
            return False
    
    def find_docx_files(self, path: Path, recursive: bool = False) -> List[Path]:
        """Find all DOCX files in the given path."""
        docx_files = []
        
        if path.is_file():
            if path.suffix.lower() == '.docx':
                docx_files.append(path)
        elif path.is_dir():
            if recursive:
                for file_path in path.rglob('*.docx'):
                    docx_files.append(file_path)
                for file_path in path.rglob('*.DOCX'):
                    if file_path not in docx_files:
                        docx_files.append(file_path)
            else:
                for file_path in path.glob('*.docx'):
                    docx_files.append(file_path)
                for file_path in path.glob('*.DOCX'):
                    if file_path not in docx_files:
                        docx_files.append(file_path)
        
        return sorted(docx_files)
    
    def get_output_path(self, input_path: Path) -> Path:
        """Generate output path with .org extension."""
        return input_path.with_suffix('.org')
    
    def resolve_conflict(self, output_path: Path) -> Tuple[Path, bool]:
        """
        Handle file conflicts based on user preference.
        Returns (final_output_path, should_process)
        """
        if not output_path.exists():
            return output_path, True
        
        # Use existing mode if set
        if self.conflict_mode == ConflictResolution.OVERWRITE_ALL:
            return output_path, True
        elif self.conflict_mode == ConflictResolution.SKIP_ALL:
            return output_path, False
        elif self.conflict_mode == ConflictResolution.APPEND_ALL:
            return self._get_append_path(output_path), True
        
        # Ask user
        print(f"\n⚠ File already exists: {output_path}")
        print("Options:")
        print("  [o] Overwrite this file")
        print("  [O] Overwrite all conflicts")
        print("  [s] Skip this file")
        print("  [S] Skip all conflicts")
        print("  [a] Append (1) to filename")
        print("  [A] Append (1) to all conflicts")
        
        while True:
            choice = input("Your choice [o/O/s/S/a/A]: ").strip().lower()
            
            if choice == 'o':
                return output_path, True
            elif choice == 'o':
                self.conflict_mode = ConflictResolution.OVERWRITE_ALL
                return output_path, True
            elif choice == 's':
                return output_path, False
            elif choice == 's':
                self.conflict_mode = ConflictResolution.SKIP_ALL
                return output_path, False
            elif choice == 'a':
                return self._get_append_path(output_path), True
            elif choice == 'a':
                self.conflict_mode = ConflictResolution.APPEND_ALL
                return self._get_append_path(output_path), True
            else:
                print("Invalid choice. Please enter o, O, s, S, a, or A")
    
    def _get_append_path(self, output_path: Path) -> Path:
        """Generate a new path with appended number to avoid conflict."""
        counter = 1
        while True:
            new_name = f"{output_path.stem} ({counter}){output_path.suffix}"
            new_path = output_path.parent / new_name
            if not new_path.exists():
                return new_path
            counter += 1
    
    def convert_file(self, input_path: Path, output_path: Path) -> bool:
        """Convert a single DOCX file to Org format using pandoc."""
        try:
            # Create output directory if it doesn't exist
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Run pandoc
            cmd = [
                'pandoc',
                '-s',  # standalone
                str(input_path),
                '-o', str(output_path)
            ]
            
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                check=True
            )
            
            return True
            
        except subprocess.CalledProcessError as e:
            print(f"  Error converting {input_path}: {e.stderr}")
            return False
        except Exception as e:
            print(f"  Error: {e}")
            return False
    
    def prepare_tasks(self, docx_files: List[Path]) -> None:
        """Prepare conversion tasks with conflict resolution."""
        print(f"\nPreparing {len(docx_files)} file(s)...")
        print("(Checking for conflicts...)\n")
        
        for docx_file in docx_files:
            output_path = self.get_output_path(docx_file)
            final_output, should_process = self.resolve_conflict(output_path)
            
            if should_process:
                self.tasks.append(ConversionTask(docx_file, final_output))
            else:
                self.skip_count += 1
        
        print(f"\n✓ Ready to convert: {len(self.tasks)} file(s)")
        if self.skip_count > 0:
            print(f"  Skipped: {self.skip_count} file(s)")
    
    def execute_conversion(self) -> None:
        """Execute all prepared conversion tasks."""
        if not self.tasks:
            print("\nNo files to convert.")
            return
        
        print(f"\nConverting {len(self.tasks)} file(s)...\n")
        
        # Use tqdm for progress bar if available
        iterator = tqdm(self.tasks, desc="Converting", unit="file") if TQDM_AVAILABLE else self.tasks
        
        for task in iterator:
            if not TQDM_AVAILABLE:
                print(f"  Converting: {task.input_path.name}")
            
            if self.convert_file(task.input_path, task.output_path):
                self.success_count += 1
            else:
                self.error_count += 1
        
        # Print summary
        print(f"\n{'='*50}")
        print("Conversion Summary:")
        print(f"  ✓ Success: {self.success_count}")
        print(f"  ⚠ Skipped: {self.skip_count}")
        print(f"  ✗ Errors:  {self.error_count}")
        print(f"{'='*50}")


def interactive_mode():
    """Run in interactive TUI mode."""
    print("="*50)
    print("DOCX to Org Converter")
    print("="*50)
    print()
    
    converter = DocxToOrgConverter()
    
    # Verify pandoc
    if not converter.verify_pandoc():
        sys.exit(1)
    
    print()
    
    # Get input path
    while True:
        input_path_str = input("Enter file or folder path: ").strip()
        if not input_path_str:
            print("Please enter a valid path.")
            continue
        
        input_path = Path(input_path_str).expanduser().resolve()
        
        if not input_path.exists():
            print(f"Path does not exist: {input_path}")
            continue
        
        break
    
    # Check if recursive
    recursive = False
    if input_path.is_dir():
        while True:
            recursive_str = input("Process subdirectories recursively? [y/N]: ").strip().lower()
            if recursive_str in ('y', 'yes'):
                recursive = True
                break
            elif recursive_str in ('', 'n', 'no'):
                recursive = False
                break
            else:
                print("Please enter 'y' or 'n'")
    
    # Find files
    print(f"\nScanning for DOCX files...")
    docx_files = converter.find_docx_files(input_path, recursive)
    
    if not docx_files:
        print(f"No DOCX files found in: {input_path}")
        sys.exit(0)
    
    print(f"Found {len(docx_files)} DOCX file(s)")
    
    # Show files if not too many
    if len(docx_files) <= 20:
        print("\nFiles to process:")
        for f in docx_files:
            print(f"  - {f}")
    else:
        print(f"\nFirst 10 files:")
        for f in docx_files[:10]:
            print(f"  - {f}")
        print(f"  ... and {len(docx_files) - 10} more")
    
    # Confirm
    print()
    while True:
        confirm = input("Proceed with conversion? [Y/n]: ").strip().lower()
        if confirm in ('', 'y', 'yes'):
            break
        elif confirm in ('n', 'no'):
            print("Cancelled.")
            sys.exit(0)
        else:
            print("Please enter 'y' or 'n'")
    
    # Prepare and execute
    converter.prepare_tasks(docx_files)
    converter.execute_conversion()


def main():
    parser = argparse.ArgumentParser(
        description="Convert DOCX files to Org format using pandoc",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s                    # Interactive mode
  %(prog)s file.docx          # Convert single file
  %(prog)s folder/ -r         # Convert folder recursively
        """
    )
    
    parser.add_argument(
        'path',
        nargs='?',
        help='File or folder to convert'
    )
    parser.add_argument(
        '-r', '--recursive',
        action='store_true',
        help='Process subdirectories recursively'
    )
    parser.add_argument(
        '--overwrite-all',
        action='store_true',
        help='Automatically overwrite existing files'
    )
    parser.add_argument(
        '--skip-all',
        action='store_true',
        help='Automatically skip existing files'
    )
    
    args = parser.parse_args()
    
    # Interactive mode
    if args.path is None:
        interactive_mode()
        return
    
    # Command-line mode
    input_path = Path(args.path).expanduser().resolve()
    
    if not input_path.exists():
        print(f"Error: Path does not exist: {input_path}")
        sys.exit(1)
    
    converter = DocxToOrgConverter()
    
    # Verify pandoc
    if not converter.verify_pandoc():
        sys.exit(1)
    
    # Set conflict mode from arguments
    if args.overwrite_all:
        converter.conflict_mode = ConflictResolution.OVERWRITE_ALL
    elif args.skip_all:
        converter.conflict_mode = ConflictResolution.SKIP_ALL
    
    # Find files
    docx_files = converter.find_docx_files(input_path, args.recursive)
    
    if not docx_files:
        print(f"No DOCX files found in: {input_path}")
        sys.exit(0)
    
    print(f"Found {len(docx_files)} DOCX file(s)")
    
    # Prepare and execute
    converter.prepare_tasks(docx_files)
    converter.execute_conversion()


if __name__ == '__main__':
    main()
