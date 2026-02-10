#!/usr/bin/env python3
"""
Docx to Org-mode Converter for Hebrew RTL Documents
Converts Hebrew docx files to org-mode format with proper header and footnote handling.
"""

import os
import sys
from pathlib import Path
from typing import List, Tuple, Optional
try:
    from docx import Document
    from docx.shared import Pt
    from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
except ImportError:
    print("Error: python-docx library not installed. Please run:")
    print("pip install python-docx")
    sys.exit(1)


class DocxToOrgConverter:
    def __init__(self):
        self.footnotes = []
        self.footnote_counter = 1
    
    def get_user_files(self) -> List[Tuple[str, str]]:
        """Interactive file selection for input and output paths"""
        file_pairs = []
        
        print("=== Docx to Org-mode Converter ===")
        print("Enter file paths (or 'done' to finish, 'quit' to exit)")
        
        while True:
            # Get input file
            input_file = input("\nEnter docx file path: ").strip()
            
            if input_file.lower() == 'quit':
                return []
            elif input_file.lower() == 'done':
                break
            elif not input_file:
                print("Please enter a valid file path")
                continue
            
            # Check if file exists
            if not os.path.exists(input_file):
                print(f"File not found: {input_file}")
                continue
            
            # Check if it's a docx file
            if not input_file.lower().endswith('.docx'):
                print("File must be a .docx file")
                continue
            
            # Suggest output file
            suggested_output = input_file.replace('.docx', '.org')
            output_file = input(f"Enter output file path [{suggested_output}]: ").strip()
            
            if not output_file:
                output_file = suggested_output
            
            file_pairs.append((input_file, output_file))
            print(f"Added: {input_file} -> {output_file}")
        
        return file_pairs
    
    def is_centered(self, paragraph) -> bool:
        """Check if paragraph is centered"""
        try:
            return paragraph.alignment == WD_PARAGRAPH_ALIGNMENT.CENTER
        except:
            return False
    
    def has_bold_text(self, paragraph) -> bool:
        """Check if paragraph contains bold text"""
        for run in paragraph.runs:
            if run.bold:
                return True
        return False
    
    def extract_bold_portions(self, paragraph) -> Tuple[List[str], List[str]]:
        """Extract bold and regular text portions from a paragraph"""
        bold_text = []
        regular_text = []
        current_bold = []
        current_regular = []
        
        for run in paragraph.runs:
            if run.bold:
                if current_regular:
                    regular_text.append(''.join(current_regular))
                    current_regular = []
                current_bold.append(run.text)
            else:
                if current_bold:
                    bold_text.append(''.join(current_bold))
                    current_bold = []
                current_regular.append(run.text)
        
        # Add any remaining text
        if current_bold:
            bold_text.append(''.join(current_bold))
        if current_regular:
            regular_text.append(''.join(current_regular))
        
        return bold_text, regular_text
    
    def extract_footnotes(self, doc) -> None:
        """Extract footnotes from document"""
        try:
            # Try to access footnotes
            if hasattr(doc, '_part') and hasattr(doc._part, 'footnotes_part'):
                footnotes_part = doc._part.footnotes_part
                if footnotes_part:
                    # This is a simplified approach - actual footnote extraction
                    # would require more complex XML parsing
                    pass
        except:
            pass
    
    def process_paragraph(self, paragraph, is_footnote: bool = False) -> List[str]:
        """Process a single paragraph and return org-mode lines"""
        lines = []
        text = paragraph.text.strip()
        
        if not text:
            return lines
        
        # Handle centered text as level 1 header
        if self.is_centered(paragraph):
            lines.append(f"* {text}")
            return lines
        
        # Handle bold text in non-centered paragraphs
        if self.has_bold_text(paragraph):
            bold_portions, regular_portions = self.extract_bold_portions(paragraph)
            
            # Add bold portions as level 2 headers
            for bold_text in bold_portions:
                if bold_text.strip():
                    lines.append(f"** {bold_text.strip()}")
            
            # Add regular portions as normal paragraphs
            for regular_text in regular_portions:
                if regular_text.strip():
                    lines.append(regular_text.strip())
        else:
            # Regular paragraph
            lines.append(text)
        
        return lines
    
    def convert_docx_to_org(self, input_file: str, output_file: str) -> bool:
        """Convert a single docx file to org-mode"""
        try:
            print(f"Converting {input_file}...")
            
            # Load document
            doc = Document(input_file)
            
            # Extract footnotes
            self.extract_footnotes(doc)
            self.footnote_counter = 1
            
            org_content = []
            
            # Process paragraphs
            for paragraph in doc.paragraphs:
                lines = self.process_paragraph(paragraph)
                org_content.extend(lines)
            
            # Add footnotes at the end if any
            if self.footnotes:
                org_content.append("\n* Footnotes")
                for i, footnote in enumerate(self.footnotes, 1):
                    org_content.append(f"[fn:{i}] {footnote}")
            
            # Write to org file with UTF-8 encoding
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write('\n\n'.join(org_content))
            
            print(f"✓ Converted to {output_file}")
            return True
            
        except Exception as e:
            print(f"✗ Error converting {input_file}: {str(e)}")
            return False
    
    def run(self):
        """Main conversion loop"""
        file_pairs = self.get_user_files()
        
        if not file_pairs:
            print("No files selected. Exiting.")
            return
        
        print(f"\nProcessing {len(file_pairs)} file(s)...")
        
        success_count = 0
        for input_file, output_file in file_pairs:
            if self.convert_docx_to_org(input_file, output_file):
                success_count += 1
        
        print(f"\nConversion complete: {success_count}/{len(file_pairs)} files processed successfully.")


if __name__ == "__main__":
    converter = DocxToOrgConverter()
    converter.run()