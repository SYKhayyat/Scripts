#!/usr/bin/env python3
import os
import subprocess
import argparse
from pathlib import Path

def convert_file(input_path, output_path, mode="ask"):
    """Converts a single docx file to org using pandoc."""
    if output_path.exists():
        if mode == "skip":
            print(f"Skipping: {output_path}")
            return
        elif mode == "append":
            # Simple append (1) logic
            stem = output_path.stem
            output_path = output_path.with_name(f"{stem} (1).org")
            print(f"Appending: {output_path}")
        elif mode == "ask":
            choice = input(f"Conflict: {output_path} exists. [o]verwrite, [s]kip, [a]ppend (1), [O]verwrite all, [S]kip all? ").lower()
            if choice == 'o': pass # Proceed to overwrite
            elif choice == 's': return # Skip
            elif choice == 'a': 
                output_path = output_path.with_name(f"{output_path.stem} (1).org")
            elif choice == 'O': mode = "overwrite_all"
            elif choice == 'S': return "skip_all"
            else: return # Default skip

    try:
        subprocess.run(["pandoc", "-s", str(input_path), "-o", str(output_path)], check=True)
        print(f"Converted: {input_path} -> {output_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error converting {input_path}: {e}")

def batch_process(path, output_dir=None):
    path = Path(path)
    if path.is_file():
        files = [path]
    else:
        files = list(path.rglob("*.docx"))

    if not files:
        print("No .docx files found.")
        return

    print(f"Found {len(files)} files to convert.")
    
    # Simple global mode for this session
    mode = "ask" 

    for docx_file in files:
        if output_dir:
            out_path = Path(output_dir) / f"{docx_file.stem}.org"
        else:
            out_path = docx_file.with_suffix(".org")
        
        result = convert_file(docx_file, out_path, mode)
        if result == "skip_all": mode = "skip"

if __name__ == "__main__":
    path = input("Enter file or folder path: ").strip('"')
    batch_process(path)
