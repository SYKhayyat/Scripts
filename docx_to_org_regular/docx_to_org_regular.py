#!/usr/bin/env python3
import argparse
import subprocess
from pathlib import Path
import sys
import os


from typing import Optional, Dict


LUA_FILTER = """
function Para(elem)
  if #elem.content == 0 then
    return {}
  end
  return elem
end

function Pandoc(doc)
  return doc
end
"""


def convert_docx_to_org(input_path: Path, output_path: Optional[Path] = None, state: Optional[Dict] = None):
    """Convert a DOCX file to org mode using pandoc.
    
    Args:
        input_path: Path to the input DOCX file
        output_path: Path to the output org file (optional)
        state: State dict for handling existing files
    """
    input_path = Path(input_path)
    if not input_path.exists():
        print(f"Error: Input file '{input_path}' does not exist.", file=sys.stderr)
        return False
    
    if output_path is None:
        output_path = input_path.with_suffix('.org')
    else:
        output_path = Path(output_path)
    
    if output_path.exists():
        mode = (state or {}).get('mode', 'ask')
        if mode == 'oa':
            pass
        elif mode == 'sa':
            print(f"Skipping: {output_path}")
            return True
        elif mode == 'aa':
            output_path = output_path.with_name(f"{output_path.stem} (1).org")
        else:
            choice = input(f"Conflict: {output_path} exists. [o]verwrite, [s]kip, [a]ppend (1), [oa] Overwrite all, [sa] Skip all, [aa] Append all? ").lower()
            if choice == 'oa':
                if state:
                    state['mode'] = 'oa'
            elif choice == 'sa':
                if state:
                    state['mode'] = 'sa'
                print(f"Skipping: {output_path}")
                return True
            elif choice == 'aa':
                if state:
                    state['mode'] = 'aa'
                output_path = output_path.with_name(f"{output_path.stem} (1).org")
            elif choice == 'a':
                output_path = output_path.with_name(f"{output_path.stem} (1).org")
            elif choice != 'o':
                print(f"Skipping: {output_path}")
                return True
    
    import tempfile
    with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.lua') as f:
        f.write(LUA_FILTER)
        lua_path = f.name
    
    try:
        cmd = [
            'pandoc',
            '-s',
            '--wrap=none',
            str(input_path),
            '--lua-filter', lua_path,
            '-t', 'org',
            '-o', str(output_path)
        ]
        
        if os.environ.get('DEBUG'):
            print(f"Running: {' '.join(cmd)}", file=sys.stderr)
        
        subprocess.run(cmd, check=True, capture_output=True, text=True)
        print(f"Converted: {input_path} -> {output_path}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error converting {input_path}: {e}", file=sys.stderr)
        if e.stderr:
            print(f"stderr: {e.stderr}", file=sys.stderr)
        return False
    finally:
        Path(lua_path).unlink(missing_ok=True)


def batch_convert(input_paths, output_dir: Optional[Path] = None, state: Optional[Dict] = None):
    """Convert multiple DOCX files to org mode.
    
    Args:
        input_paths: List of input file paths (files or directories)
        output_dir: Output directory (optional)
        state: State dict for handling existing files
    """
    files_to_convert = []
    
    for input_path in input_paths:
        input_path = Path(input_path)
        if input_path.is_file():
            if input_path.suffix.lower() == '.docx':
                files_to_convert.append(input_path)
        elif input_path.is_dir():
            files_to_convert.extend(input_path.rglob('*.docx'))
    
    if not files_to_convert:
        print("No .docx files found.")
        return
    
    print(f"Found {len(files_to_convert)} file(s) to convert.")
    
    for docx_file in files_to_convert:
        if output_dir:
            out_path = Path(output_dir) / f"{docx_file.stem}.org"
        else:
            out_path = docx_file.with_suffix('.org')
        
        convert_docx_to_org(docx_file, out_path, state)


def main():
    parser = argparse.ArgumentParser(
        description='Convert DOCX files to org mode using pandoc.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  %(prog)s document.docx
  %(prog)s document.docx -o output.org
  %(prog)s folder/
  %(prog)s folder/ -o output_dir/
  %(prog)s *.docx
        '''
    )
    parser.add_argument(
        'input',
        nargs='*',
        help='Input DOCX file(s) or directory containing DOCX files (if empty, reads from stdin)'
    )
    parser.add_argument(
        '-o', '--output',
        help='Output file or directory (default: same as input with .org extension)'
    )
    parser.add_argument(
        '-f', '--force',
        action='store_true',
        help='Overwrite existing output files'
    )
    parser.add_argument(
        '-v', '--verbose',
        action='store_true',
        help='Verbose output'
    )
    
    args = parser.parse_args()
    
    input_paths = args.input
    
    if not input_paths:
        path_str = input("Enter file or folder path: ").strip('"\'')
        input_paths = [path_str]
    
    state = {'mode': 'ask'} if not args.force else {'mode': 'oa'}
    
    if len(input_paths) == 1 and not Path(input_paths[0]).is_dir() and args.output:
        output_path = Path(args.output)
        if not convert_docx_to_org(Path(input_paths[0]), output_path, state):
            sys.exit(1)
    else:
        output_dir = Path(args.output) if args.output else None
        batch_convert(input_paths, output_dir, state)


if __name__ == '__main__':
    main()
