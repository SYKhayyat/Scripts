#!/usr/bin/env python3
"""
Simple Docx to Org-mode Converter
"""

import os
import sys
from docx import Document
import xml.etree.ElementTree as ET

def convert_docx_to_org(input_file, output_file, overwrite=False):
    """Convert docx file to org-mode format"""
    try:
        if os.path.exists(output_file) and not overwrite:
            return False, "Output file exists"
        
        doc = Document(input_file)
        
        # Extract footnotes
        footnotes = []
        try:
            if hasattr(doc, '_part') and hasattr(doc._part, 'package'):
                for rel in doc._part.rels.values():
                    if hasattr(rel, 'reltype'):
                        if rel.reltype == 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes':
                            footnotes_part = rel.target_part
                            if footnotes_part:
                                footnotes_xml = footnotes_part.blob
                                root = ET.fromstring(footnotes_xml)
                                ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
                                
                                for footnote in root.findall('.//w:footnote', ns):
                                    footnote_id = footnote.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}id')
                                    if footnote_id and footnote_id != '0':
                                        text_parts = []
                                        for text_elem in footnote.findall('.//w:t', ns):
                                            if text_elem.text:
                                                text_parts.append(text_elem.text)
                                        if text_parts:
                                            footnotes.append(f"[fn:{footnote_id}] {''.join(text_parts)}")
        except Exception:
            pass  # Footnotes extraction failed, continue without them
        
        # Process paragraphs
        org_content = []
        for paragraph in doc.paragraphs:
            text = paragraph.text.strip()
            if text:
                # Check for headers
                style_name = paragraph.style.name.lower() if paragraph.style else ""
                if 'heading 1' in style_name:
                    org_content.append(f"* {text}")
                elif 'heading 2' in style_name:
                    org_content.append(f"** {text}")
                elif 'heading 3' in style_name:
                    org_content.append(f"*** {text}")
                else:
                    # Regular paragraph
                    org_content.append(text)
        
        # Add footnotes if any
        if footnotes:
            org_content.append("")
            org_content.append("* Footnotes")
            org_content.extend(footnotes)
        
        # Create output directory if needed
        output_dir = os.path.dirname(output_file)
        if output_dir and not os.path.exists(output_dir):
            os.makedirs(output_dir, exist_ok=True)
        
        # Write file
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('\n\n'.join(org_content))
        
        return True, "Success"
        
    except Exception as e:
        return False, str(e)

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 docx_to_org_simple.py input.docx output.org [--overwrite]")
        return
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    overwrite = len(sys.argv) > 3 and sys.argv[3] == "--overwrite"
    
    success, message = convert_docx_to_org(input_file, output_file, overwrite)
    
    if success:
        print(f"✅ Converted {input_file} to {output_file}")
    else:
        print(f"❌ Failed to convert {input_file}: {message}")

if __name__ == "__main__":
    main()