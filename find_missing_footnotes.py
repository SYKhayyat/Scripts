#!/usr/bin/env python3
"""Debug script to find which paragraphs are missing footnote references"""

import sys
sys.path.append('/home/shaul/Scripts')
from docx_to_org_complete import DocxToOrgCompleteConverter
from docx import Document

def find_missing_footnotes(docx_file):
    print(f"=== Finding missing footnote references in {docx_file} ===")
    
    converter = DocxToOrgCompleteConverter()
    doc = Document(docx_file)
    
    # Extract footnotes
    converter.extract_footnotes_from_xml(doc)
    print(f"Found {len(converter.footnotes)} footnotes")
    
    # Check each paragraph
    for para_idx, paragraph in enumerate(doc.paragraphs):
        if paragraph.text.strip():
            refs = converter.find_footnote_references_in_paragraph(paragraph)
            has_bold = converter.has_bold_text(paragraph)
            
            if refs:
                ref_nums = [ref[1] for ref in refs]
                print(f"Paragraph {para_idx+1}: {ref_nums} (bold: {has_bold})")
                
                # Check if these are footnote 10, 11, 12
                for _, ref in refs:
                    if any(x in ref for x in ['[fn:10]', '[fn:11]', '[fn:12]']):
                        print(f"  -> Found {ref} in paragraph {para_idx+1}")
                        print(f"  -> Text preview: {paragraph.text[:100]}...")

if __name__ == "__main__":
    find_missing_footnotes("/home/shaul/Documents/siach_shai/b_typed/a_siach_shai/a_siach_shai/a_siach_shai_shas/a_siach_shai/f_taharos/nidda/nidda_39.docx")