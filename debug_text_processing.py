#!/usr/bin/env python3
"""Debug script to see what happens during text processing"""

import sys
sys.path.append('/home/shaul/Scripts')
from docx_to_org_complete import DocxToOrgCompleteConverter
from docx import Document

def debug_text_processing(docx_file):
    print(f"=== Debugging text processing in {docx_file} ===")
    
    converter = DocxToOrgCompleteConverter()
    doc = Document(docx_file)
    
    # Extract footnotes
    converter.extract_footnotes_from_xml(doc)
    print(f"Found {len(converter.footnotes)} footnotes")
    
    # Process paragraphs and show what happens
    for para_idx, paragraph in enumerate(doc.paragraphs):
        if paragraph.text.strip():
            print(f"\n--- Paragraph {para_idx+1} ---")
            print(f"Original text: {paragraph.text[:100]}...")
            
            # Find footnote references
            refs = converter.find_footnote_references_in_paragraph(paragraph)
            print(f"Found references: {refs}")
            
            # Process with footnotes
            processed_text = converter._process_text_with_footnotes(paragraph)
            print(f"Processed text: {processed_text[:100]}...")
            
            # Check if they match
            if refs and "[fn:" not in processed_text:
                print("❌ ERROR: References found but not inserted!")
            elif not refs and "[fn:" in processed_text:
                print("❌ ERROR: References inserted but none found!")
            elif refs and "[fn:" in processed_text:
                print("✅ References successfully inserted")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        debug_text_processing(sys.argv[1])
    else:
        debug_text_processing("/home/shaul/Documents/siach_shai/b_typed/a_siach_shai/a_siach_shai/a_siach_shai_shas/a_siach_shai/f_taharos/nidda/nidda_beginning.docx")