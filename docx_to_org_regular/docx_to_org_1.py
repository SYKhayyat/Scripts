#!/usr/bin/env python3
import subprocess
from pathlib import Path

def convert_file(input_path, output_path, state):
    """Converts a single docx file to org using pandoc with interactive conflict resolution."""
    if output_path.exists():
        # Apply sticky mode if already set (oa/sa/aa)
        if state['mode'] == "oa":
            pass # Proceed to overwrite
        elif state['mode'] == "sa":
            print(f"Skipping (All): {output_path}")
            return
        elif state['mode'] == "aa":
            # Append (1) logic
            output_path = output_path.with_name(f"{output_path.stem} (1).org")
            print(f"Appending (All): {output_path}")
        else:
            # Ask user for choice
            choice = input(f"Conflict: {output_path} exists. [o]verwrite, [s]kip, [a]ppend (1), [oa] Overwrite all, [sa] Skip all, [aa] Append all? ").lower()
            if choice == 'oa':
                state['mode'] = "oa"
            elif choice == 'sa':
                state['mode'] = "sa"
                print(f"Skipping: {output_path}")
                return
            elif choice == 'aa':
                state['mode'] = "aa"
                output_path = output_path.with_name(f"{output_path.stem} (1).org")
                print(f"Appending: {output_path}")
            elif choice == 'o':
                pass # Proceed
            elif choice == 'a':
                output_path = output_path.with_name(f"{output_path.stem} (1).org")
            else:
                print(f"Skipping: {output_path}")
                return # Default skip

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
    
    # State dictionary to persist mode between function calls
    state = {'mode': "ask"}

    for docx_file in files:
        if output_dir:
            out_path = Path(output_dir) / f"{docx_file.stem}.org"
        else:
            out_path = docx_file.with_suffix(".org")
        
        convert_file(docx_file, out_path, state)

if __name__ == "__main__":
    path = input("Enter file or folder path: ").strip('"')
    batch_process(path)
