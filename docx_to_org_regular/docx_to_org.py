#!/usr/bin/env python3
import subprocess
from pathlib import Path
import tempfile

# Updated Lua filter to convert centered paragraphs to H1
LUA_FILTER = """
-- No header conversion - just pass through all content
function Pandoc(doc)
  return doc
end
"""

def convert_file(input_path, output_path, state):
    """Converts a docx to org with custom alignment/bolding rules."""
    if output_path.exists():
        if state['mode'] == 'oa':
            pass
        elif state['mode'] == 'sa':
            print(f"Skipping: {output_path}")
            return
        elif state['mode'] == 'aa':
            output_path = output_path.with_name(f"{output_path.stem} (1).org")
        else:
            choice = input(f"Conflict: {output_path} exists. [o]verwrite, [s]kip, [a]ppend (1), [oa] Overwrite all, [sa] Skip all, [aa] Append all? ").lower()
            if choice == 'oa':
                state['mode'] = 'oa'
            elif choice == 'sa':
                state['mode'] = 'sa'
                print(f"Skipping: {output_path}")
                return
            elif choice == 'aa':
                state['mode'] = 'aa'
                output_path = output_path.with_name(f"{output_path.stem} (1).org")
            elif choice == 'a':
                output_path = output_path.with_name(f"{output_path.stem} (1).org")
            elif choice != 'o':
                print(f"Skipping: {output_path}")
                return

    # Create temporary lua file
    with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.lua') as f:
        f.write(LUA_FILTER)
        lua_path = f.name
    
    try:
        # Run pandoc with the Lua filter
        cmd = [
            'pandoc',
            '-s',
            str(input_path),
            '--lua-filter', lua_path,
            '-o', str(output_path)
        ]
        subprocess.run(cmd, check=True)
        print(f"Converted: {input_path} -> {output_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error converting {input_path}: {e}")
    finally:
        Path(lua_path).unlink()  # Delete temp file

def batch_process(path, output_dir=None):
    path = Path(path)
    files = [path] if path.is_file() else list(path.rglob('*.docx'))
    
    if not files:
        print("No .docx files found.")
        return
        
    print(f"Found {len(files)} files to convert.")
    state = {'mode': 'ask'}
    for docx_file in files:
        out_path = Path(output_dir) / f"{docx_file.stem}.org" if output_dir else docx_file.with_suffix('.org')
        convert_file(docx_file, out_path, state)

if __name__ == '__main__':
    path_str = input("Enter file or folder path: ").strip('"\'')
    batch_process(path_str)
