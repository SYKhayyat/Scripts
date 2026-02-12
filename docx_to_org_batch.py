#!/usr/bin/env python3
"""
Interactive Batch DOCX to Org Converter
"""

import os
import sys
import subprocess
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

def find_docx_files(directory):
    """Find all .docx files in directory recursively"""
    docx_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.docx'):
                docx_files.append(os.path.join(root, file))
    return docx_files

def convert_single_file(input_file, output_file, overwrite=False):
    """Convert single file using the main converter"""
    try:
        # Check if output exists and handle conflicts
        if os.path.exists(output_file) and not overwrite:
            # Add numeric suffix
            base, ext = os.path.splitext(output_file)
            counter = 1
            while os.path.exists(f"{base}_{counter}{ext}"):
                counter += 1
            output_file = f"{base}_{counter}{ext}"
        
        # Run the conversion
        cmd = ["python3", "docx_to_org_simple.py", input_file, output_file]
        if overwrite:
            cmd.append("--overwrite")
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            return True, f"✅ Converted: {input_file} → {output_file}"
        else:
            return False, f"❌ Failed: {input_file} - {result.stderr}"
    
    except Exception as e:
        return False, f"❌ Error: {input_file} - {str(e)}"

def process_batch_files(file_pairs, max_workers=4, overwrite=False):
    """Process multiple files in parallel"""
    start_time = time.time()
    results = {"success": 0, "failed": 0}
    
    print(f"\n🔄 Processing {len(file_pairs)} files with {max_workers} workers...")
    
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        # Submit all tasks
        future_to_file = {
            executor.submit(convert_single_file, input_file, output_file, overwrite): (input_file, output_file)
            for input_file, output_file in file_pairs
        }
        
        # Process completed tasks
        for i, future in enumerate(as_completed(future_to_file), 1):
            try:
                success, message = future.result()
                if success:
                    results["success"] += 1
                else:
                    results["failed"] += 1
                print(f"[{i}/{len(file_pairs)}] {message}")
            except Exception as e:
                results["failed"] += 1
                input_file, _ = future_to_file[future]
                print(f"[{i}/{len(file_pairs)}] ❌ Error with {input_file}: {str(e)}")
    
    elapsed = time.time() - start_time
    print(f"\n✅ Batch processing completed in {elapsed:.1f} seconds")
    print(f"📊 Results: {results['success']} successful, {results['failed']} failed")
    
    return results

def print_help():
    """Print usage help"""
    print("Batch DOCX to Org Converter")
    print("")
    print("Usage: python3 docx_to_org_batch.py [options] <input1> [input2] ...")
    print("       python3 docx_to_org_batch.py --interactive")
    print("")
    print("Arguments:")
    print("  input1, input2, ...  DOCX files or directories to convert")
    print("")
    print("Options:")
    print("  -i, --interactive    Run in interactive mode (default if no args)")
    print("  -o, --overwrite       Overwrite existing files without asking")
    print("  -w, --workers <num>   Number of parallel workers (default: 4)")
    print("  -d, --output-dir <dir> Output directory (default: same as input)")
    print("  -h, --help           Show this help message")
    print("")
    print("Examples:")
    print("  python3 docx_to_org_batch.py --interactive")
    print("  python3 docx_to_org_batch.py file1.docx file2.docx")
    print("  python3 docx_to_org_batch.py folder/ -o -w 8")
    print("  python3 docx_to_org_batch.py folder1/ folder2/ -d output/")
    print("")
    print("Interactive Mode Features:")
    print("  📁 Add/remove files and directories")
    print("  ⚙️  Configure output settings")
    print("  📊 Preview conversion summary")
    print("  🚀 Start conversion with confirmation")

def get_interactive_input():
    """Get input paths interactively from user"""
    input_paths = []
    
    print("🎯 Interactive Batch DOCX to Org Converter")
    print("=" * 50)
    print("Add files or directories to convert (supports drag & drop)")
    print("Enter 'done' when finished, 'help' for commands")
    print()
    
    while True:
        try:
            user_input = input(f"[{len(input_paths)} files] Enter path: ").strip()
        except (EOFError, KeyboardInterrupt):
            return None
            
        if user_input.lower() in ['done', 'd', 'finish', '']:
            if input_paths:
                break
            else:
                print("⚠️  Please add at least one file or directory")
                continue
        elif user_input.lower() in ['help', 'h', '?']:
            print("\n📖 Available commands:")
            print("  help    - Show this help")
            print("  list    - Show current files")
            print("  clear   - Clear all files")
            print("  remove  - Remove last file")
            print("  done    - Start conversion")
            print("  quit    - Exit program")
            continue
        elif user_input.lower() in ['list', 'ls', 'l']:
            if input_paths:
                print(f"\n📋 Current files ({len(input_paths)}):")
                for i, path in enumerate(input_paths, 1):
                    if os.path.exists(path):
                        if os.path.isfile(path):
                            size = os.path.getsize(path) / 1024
                            print(f"  {i}. 📄 {path} ({size:.1f} KB)")
                        else:
                            file_count = len(find_docx_files(path))
                            print(f"  {i}. 📁 {path} ({file_count} .docx files)")
                    else:
                        print(f"  {i}. ❌ {path} (not found)")
                print()
            else:
                print("📋 No files added yet")
            continue
        elif user_input.lower() in ['clear', 'cls']:
            input_paths = []
            print("🗑️  Cleared all files")
            continue
        elif user_input.lower() in ['remove', 'rm', 'del']:
            if input_paths:
                removed = input_paths.pop()
                print(f"🗑️  Removed: {removed}")
            else:
                print("⚠️  No files to remove")
            continue
        elif user_input.lower() in ['quit', 'exit', 'q']:
            print("👋 Goodbye!")
            return None
        else:
            # Treat as file/directory path
            if os.path.exists(user_input):
                input_paths.append(user_input)
                if os.path.isfile(user_input):
                    print(f"✅ Added file: {user_input}")
                elif os.path.isdir(user_input):
                    docx_count = len(find_docx_files(user_input))
                    if docx_count > 0:
                        print(f"✅ Added directory: {user_input} ({docx_count} .docx files)")
                    else:
                        print(f"⚠️  Added directory: {user_input} (no .docx files found)")
            else:
                print(f"❌ Path not found: {user_input}")
                print("💡 Try dragging a file/folder into this terminal")
    
    return input_paths

def get_interactive_settings():
    """Get conversion settings interactively"""
    print("\n⚙️  Conversion Settings")
    print("=" * 30)
    
    settings = {
        'output_dir': None,
        'max_workers': 4,
        'overwrite': False
    }
    
    # Output directory
    while True:
        try:
            output_dir = input("📁 Output directory (leave blank for same location): ").strip()
        except (EOFError, KeyboardInterrupt):
            return None
        if not output_dir:
            break
        elif os.path.isdir(output_dir):
            settings['output_dir'] = output_dir
            break
        else:
            try:
                os.makedirs(output_dir, exist_ok=True)
                settings['output_dir'] = output_dir
                print(f"✅ Created directory: {output_dir}")
                break
            except Exception as e:
                print(f"❌ Invalid directory: {e}")
    
    # Worker count
    while True:
        try:
            workers = input("⚡ Number of parallel workers (1-16, default 4): ").strip()
            if not workers:
                break
            workers = int(workers)
            if 1 <= workers <= 16:
                settings['max_workers'] = workers
                break
            else:
                print("⚠️  Please enter a number between 1 and 16")
        except ValueError:
            print("⚠️  Please enter a valid number")
        except (EOFError, KeyboardInterrupt):
            return None
    
    # Conflict resolution
    while True:
        try:
            conflict = input("⚠️  File conflict resolution [o]verwrite, [s]uffix (default): ").strip().lower()
        except (EOFError, KeyboardInterrupt):
            return None
        if not conflict or conflict in ['s', 'suffix', '']:
            settings['overwrite'] = False
            break
        elif conflict in ['o', 'overwrite']:
            settings['overwrite'] = True
            break
        else:
            print("⚠️  Please enter 'o' for overwrite or 's' for suffix")
    
    return settings

def confirm_conversion(file_pairs, settings):
    """Show summary and get confirmation"""
    print("\n📊 Conversion Summary")
    print("=" * 30)
    print(f"📁 Files to process: {len(file_pairs)}")
    print(f"⚡ Parallel workers: {settings['max_workers']}")
    print(f"📂 Output directory: {settings['output_dir'] or 'Same as input'}")
    print(f"⚠️  Conflict mode: {'Overwrite' if settings['overwrite'] else 'Add suffix'}")
    
    if len(file_pairs) <= 5:
        print("\n📋 Files to convert:")
        for i, (input_file, output_file) in enumerate(file_pairs, 1):
            print(f"  {i}. {input_file} → {output_file}")
    
    while True:
        try:
            confirm = input("\n🚀 Start conversion? [Y/n/s]: ").strip().lower()
        except (EOFError, KeyboardInterrupt):
            return False
        if confirm in ['', 'y', 'yes']:
            return True
        elif confirm in ['n', 'no']:
            return False
        elif confirm in ['s', 'settings']:
            return 'settings'
        else:
            print("⚠️  Please enter Y (yes), N (no), or S (settings)")

def main():
    # Check if command line arguments provided (non-interactive mode)
    if len(sys.argv) > 1:
        if sys.argv[1] in ['-h', '--help']:
            print_help()
            return
        elif sys.argv[1] in ['-i', '--interactive']:
            # Continue to interactive mode
            pass
        else:
            # Original CLI mode
            args = sys.argv[1:]
            input_paths = []
            output_dir = None
            max_workers = 4
            overwrite = False
            
            i = 0
            while i < len(args):
                arg = args[i]
                
                if arg in ['-o', '--overwrite']:
                    overwrite = True
                elif arg in ['-w', '--workers']:
                    if i + 1 < len(args):
                        try:
                            max_workers = int(args[i + 1])
                            i += 1
                        except ValueError:
                            print("Error: --workers requires a number")
                            return
                elif arg in ['-d', '--output-dir']:
                    if i + 1 < len(args):
                        output_dir = args[i + 1]
                        i += 1
                else:
                    input_paths.append(arg)
                
                i += 1
            
            if not input_paths:
                print("Error: No input paths specified")
                return
            
            # Collect all files
            all_file_pairs = []
            for input_path in input_paths:
                if not os.path.exists(input_path):
                    print(f"⚠️  Path not found: {input_path}")
                    continue
                    
                if os.path.isfile(input_path) and input_path.lower().endswith('.docx'):
                    if output_dir:
                        filename = os.path.basename(input_path).replace('.docx', '.org')
                        output_file = os.path.join(output_dir, filename)
                    else:
                        output_file = input_path.replace('.docx', '.org')
                    all_file_pairs.append((input_path, output_file))
                    
                elif os.path.isdir(input_path):
                    docx_files = find_docx_files(input_path)
                    if not docx_files:
                        print(f"⚠️  No .docx files found in {input_path}")
                        continue
                        
                    print(f"📁 Found {len(docx_files)} files in {input_path}")
                    for docx_file in docx_files:
                        if output_dir:
                            rel_path = os.path.relpath(docx_file, input_path)
                            output_file = os.path.join(output_dir, rel_path.replace('.docx', '.org'))
                        else:
                            output_file = docx_file.replace('.docx', '.org')
                        all_file_pairs.append((docx_file, output_file))
            
            if not all_file_pairs:
                print("❌ No files to process")
                return
            
            process_batch_files(all_file_pairs, max_workers, overwrite)
            return
    
    # Interactive mode
    try:
        print("🎯 Welcome to Interactive Batch DOCX to Org Converter!")
        
        # Get input files
        input_paths = get_interactive_input()
        if input_paths is None:
            return
        
        # Collect all files to process
        all_file_pairs = []
        for input_path in input_paths:
            if os.path.isfile(input_path) and input_path.lower().endswith('.docx'):
                all_file_pairs.append((input_path, input_path.replace('.docx', '.org')))
            elif os.path.isdir(input_path):
                docx_files = find_docx_files(input_path)
                for docx_file in docx_files:
                    all_file_pairs.append((docx_file, docx_file.replace('.docx', '.org')))
        
        if not all_file_pairs:
            print("❌ No .docx files found to process")
            return
        
        while True:
            # Get settings
            settings = get_interactive_settings()
            if settings is None:
                return
            
            # Apply settings to file pairs
            adjusted_file_pairs = []
            for input_file, default_output in all_file_pairs:
                if settings['output_dir']:
                    filename = os.path.basename(default_output)
                    output_file = os.path.join(settings['output_dir'], filename)
                    adjusted_file_pairs.append((input_file, output_file))
                else:
                    adjusted_file_pairs.append((input_file, default_output))
            
            # Confirm conversion
            result = confirm_conversion(adjusted_file_pairs, settings)
            if result is True:
                print("\n🚀 Starting conversion...")
                process_batch_files(adjusted_file_pairs, settings['max_workers'], settings['overwrite'])
                break
            elif result is False:
                print("❌ Conversion cancelled")
                break
            elif result == 'settings':
                # Loop back to settings
                continue
    
    except (EOFError, KeyboardInterrupt):
        print("\n👋 Goodbye!")
        return

if __name__ == "__main__":
    main()