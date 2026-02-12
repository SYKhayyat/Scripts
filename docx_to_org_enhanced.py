#!/usr/bin/env python3
"""
"""
Enhanced Docx to Org-mode Converter
Preserves docx headings, converts inline formatting (*bold*, /italics/), maintains robust file handling.
Keeps lists, footnotes, and endnotes with proper references in text.
"""

import os
import sys
import re
from pathlib import Path
from typing import List, Tuple, Optional, Dict
import glob
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading
try:
    from docx import Document
    from docx.shared import Pt
    from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
    from docx.oxml.ns import qn
    from docx.enum.style import WD_STYLE_TYPE
except ImportError:
    print("Error: python-docx library not installed. Please run:")
    print("pip install python-docx")
    sys.exit(1)


class DocxToOrgEnhancedConverter:
    def __init__(self):
        self.footnotes = []
        self.footnote_counter = 1
        self.footnote_references = {}  # Maps original reference to footnote number
        self.list_depth_stack = []  # Track nested list levels
        self.list_item_counters = []  # Track numbering for ordered lists
        self.conflict_mode = "ask"  # Global conflict resolution mode
        self.batch_results = []  # Track batch processing results
        self.lock = threading.Lock()  # Thread safety for batch operations
    
    def find_docx_files_recursive(self, directory: str) -> List[str]:
        """Find all .docx files in directory recursively"""
        docx_files = []
        try:
            for root, dirs, files in os.walk(directory):
                for file in files:
                    if file.lower().endswith('.docx'):
                        docx_files.append(os.path.join(root, file))
        except Exception as e:
            print(f"Error scanning directory {directory}: {e}")
        return docx_files
    
    def resolve_conflict(self, output_file: str) -> bool:
        """Ask user how to resolve file conflict"""
        while True:
            choice = input(f"File '{output_file}' already exists. Overwrite? [y/n/skip] ").strip().lower()
            if choice in ['y', 'yes']:
                return True
            elif choice in ['n', 'no', 'skip']:
                return False
            else:
                print("Please enter 'y' for yes, 'n' for no, or 'skip'")
    
    def add_numeric_suffix(self, output_file: str) -> str:
        """Add numeric suffix to filename if file exists"""
        base_name = output_file
        suffix = 1
        
        while os.path.exists(base_name):
            # Remove existing suffix if any
            if suffix > 1:
                base_name = base_name.rstrip(f".{suffix-1}")
            
            new_name = f"{base_name}.{suffix}"
            base_name = new_name
            suffix += 1
        
        return base_name
    
    def get_user_files(self) -> List[Tuple[str, str]]:
        """Get input from user - can be file or folder"""
        inputs = []
        
        print("=== Complete Docx to Org-mode Converter (Footnotes + Lists + Batch) ===")
        print("Enter file or folder paths (or 'done' to finish, 'quit' to exit)")
        print("Folders will be scanned recursively for .docx files")
        
        while True:
            input_path = input("\nEnter docx file or folder path: ").strip()
            
            if input_path.lower() == 'quit':
                return []
            elif input_path.lower() == 'done':
                break
            elif not input_path:
                print("Please enter a valid path")
                continue
            
            # Check if path exists
            if not os.path.exists(input_path):
                print(f"Path not found: {input_path}")
                continue
            
            # Handle folder
            if os.path.isdir(input_path):
                docx_files = self.find_docx_files_recursive(input_path)
                if not docx_files:
                    print(f"No .docx files found in {input_path}")
                    continue
                
                print(f"Found {len(docx_files)} .docx files in {input_path}")
                confirm = input(f"Convert all {len(docx_files)} files? [y/n] ").strip().lower()
                if confirm in ['y', 'yes']:
                    for docx_file in docx_files:
                        output_file = docx_file.replace('.docx', '.org')
                        inputs.append((docx_file, output_file))
                else:
                    continue
            
            # Handle single file
            elif input_path.lower().endswith('.docx'):
                suggested_output = input_path.replace('.docx', '.org')
                output_file = input(f"Enter output file path [{suggested_output}]: ").strip()
                if not output_file:
                    output_file = suggested_output
                inputs.append((input_path, output_file))
            
            else:
                print("Path must be a .docx file or folder")
                continue
            
            print(f"Added: {len(inputs)} file(s) queued for conversion")
        
        return inputs
    

    def detect_heading_level(self, paragraph) -> int:
        """Detect heading level (0=not heading, 1-9=heading level) with Word/LibreOffice compatibility"""
        try:
            if not hasattr(paragraph, 'style') or not paragraph.style:
                return 0
            
            style_name = paragraph.style.name.lower()
            style_id = getattr(paragraph.style, 'style_id', ').lower()
            
            # Primary mapping for standard heading styles (Word and LibreOffice)
            heading_map = {
                'heading 1': 1, 'heading1': 1,
                'heading 2': 2, 'heading2': 2,
                'heading 3': 3, 'heading3': 3,
                'heading 4': 4, 'heading4': 4,
                'heading 5': 5, 'heading5': 5,
                'heading 6': 6, 'heading6': 6,
                'heading 7': 7, 'heading7': 7,
                'heading 8': 8, 'heading8': 8,
                'heading 9': 9, 'heading9': 9,
            }
            
            # Check style name first
            if style_name in heading_map:
                return heading_map[style_name]
            
            # Check style_id
            if style_id in heading_map:
                return heading_map[style_id]
            
            # Fallback: extract number from style name using regex
            import re
            match = re.search(r'headings*(d+)', style_name)
            if match:
                return int(match.group(1))
            
            # Additional fallback: check for title style
            if style_name in ['title', 'subtitle']:
                return 1  # Treat title as level 1 heading
            
        except Exception as e:
            print(f"Warning: Error detecting heading level: {e}")
        
        return 0  # Not a heading
    

    def get_run_formatting(self, run) -> dict:
        """Comprehensive formatting detection for text runs"""
        formatting = {'bold': False, 'italic': False, 'normal': True}
        
        try:
            # Check both direct and inherited formatting
            is_bold = False
            is_italic = False
            
            # Direct formatting
            if run.bold is True:
                is_bold = True
            if run.italic is True:
                is_italic = True
            
            # Font object formatting (inherited)
            if not is_bold and hasattr(run, 'font') and run.font.bold is True:
                is_bold = True
            if not is_italic and hasattr(run, 'font') and run.font.italic is True:
                is_italic = True
            
            # Character style formatting
            if not is_bold or not is_italic:
                if run.style and hasattr(run.style, 'font'):
                    if not is_bold and run.style.font.bold is True:
                        is_bold = True
                    if not is_italic and run.style.font.italic is True:
                        is_italic = True
            
            # Set formatting flags
            if is_bold and is_italic:
                formatting = {'bold': True, 'italic': True, 'normal': False}
            elif is_bold:
                formatting = {'bold': True, 'italic': False, 'normal': False}
            elif is_italic:
                formatting = {'bold': False, 'italic': True, 'normal': False}
            
        except Exception as e:
            print(f"Warning: Error detecting run formatting: {e}")
        
        return formatting
    
    
    def detect_list_type_and_level(self, paragraph) -> Tuple[Optional[str], int]:
        """Detect if paragraph is a list item and determine list type and level"""
        try:
            # Method 1: Check paragraph style
            if hasattr(paragraph, 'style') and paragraph.style:
                style_name = paragraph.style.name.lower()
                if 'list' in style_name:
                    # Determine list type from style name
                    if 'bullet' in style_name or 'unordered' in style_name:
                        # Try to get level from style XML
                        ilvl_elements = paragraph.style.element.xpath('.//w:ilvl')
                        level_val = ilvl_elements[0].get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '0') if ilvl_elements else 0
                        
                        # If XML level is 0, try fallback from style name
                        if level_val == 0:
                            # Fallback: try to extract from style name like "list bullet 2"
                            if style_name.endswith(' 2'):
                                level_val = 1
                            elif style_name.endswith(' 3'):
                                level_val = 2
                        return 'unordered', level_val
                    elif 'number' in style_name or 'ordered' in style_name:
                        # Try to get level from style XML
                        ilvl_elements = paragraph.style.element.xpath('.//w:ilvl')
                        level_val = ilvl_elements[0].get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '0') if ilvl_elements else 0
                        
                        # If XML level is 0, try fallback from style name
                        if level_val == 0:
                            # Fallback: try to extract from style name like "list number 2"
                            if style_name.endswith(' 2'):
                                level_val = 1
                            elif style_name.endswith(' 3'):
                                level_val = 2
                        return 'ordered', level_val
                        return 'ordered', level_val
            
            # Method 2: Check paragraph numbering properties
            if hasattr(paragraph, '_element'):
                element = paragraph._element
                # Look for numbering elements
                num_elements = element.xpath('.//w:numPr')
                if num_elements:
                    # Get indentation level
                    ilvl_elements = num_elements[0].xpath('.//w:ilvl')
                    level = ilvl_elements[0].get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '0') if ilvl_elements else 0
                    
                    # Get numbering ID to determine list type
                    num_id_elements = num_elements[0].xpath('.//w:numId')
                    if num_id_elements:
                        return 'ordered', int(level)
                    else:
                        return 'unordered', int(level)
            
            # Method 3: Check text patterns (fallback)
            text = paragraph.text.strip()
            if text:
                # Check for bullet patterns
                bullet_patterns = [
                    r'^[•·▪▫‣⁃]\s+',
                    r'^[o*+−-]\s+',
                    r'^[◦◉○●]\s+'
                ]
                
                for pattern in bullet_patterns:
                    if re.match(pattern, text):
                        return 'unordered', 0
                
                # Check for numbered patterns
                numbered_patterns = [
                    r'^\d+\.\s+',
                    r'^\d+\)\s+',
                    r'^[a-zA-Z]\.\s+',
                    r'^[a-zA-Z]\)\s+',
                    r'^[ivxlIVXL]+\.\s+',
                    r'^[IVXL]+\)\s+'
                ]
                
                for pattern in numbered_patterns:
                    if re.match(pattern, text):
                        return 'ordered', 0
                
                # Check for indented text (might be nested list)
                if text.startswith('    ') or text.startswith('\t'):
                    return 'unordered', 1
            
        except Exception as e:
            print(f"Warning: Error detecting list type: {e}")
        
        return None, 0
    
    def clean_list_text(self, text: str, list_type: str) -> str:
        """Remove list markers from text and clean it up"""
        text = text.strip()
        
        if list_type == 'unordered':
            # Remove common bullet markers
            bullet_patterns = [
                r'^[•·▪▫‣⁃]\s+',
                    r'^[o*+−-]\s+',
                    r'^[◦◉○●]\s+',
                    r'^[•]\s+'
            ]
            for pattern in bullet_patterns:
                text = re.sub(pattern, '', text)
        elif list_type == 'ordered':
            # Remove numbered markers
            numbered_patterns = [
                r'^\d+\.\s+',
                    r'^\d+\)\s+',
                    r'^\d+\)\s+',
                    r'^[a-zA-Z]\.\s+',
                    r'^[a-zA-Z]\)\s+',
                    r'^[ivxlIVXL]+\.\s+',
                    r'^[IVXL]+\.\s+'
                ]
            for pattern in numbered_patterns:
                    text = re.sub(pattern, '', text)
        
        return text.strip()
    
    def get_org_list_prefix(self, list_type: str, level: int, item_number: Optional[int] = None) -> str:
        """Get appropriate org-mode list prefix based on type and level"""
        indent = '  ' * level
        
        if list_type == 'unordered':
            # Alternate between -, +, and * at different levels
            bullets = ['-', '+', '*']
            bullet = bullets[level % len(bullets)]
            return f"{indent}{bullet} "
        elif list_type == 'ordered':
            # Org-mode uses 1., 2., 3. for ordered lists at all levels
            if item_number is None:
                item_number = 1
            return f"{indent}{item_number}. "
        
        return ''
    
    def extract_footnotes_from_xml(self, doc) -> None:
        """Extract footnotes from document XML"""
        try:
            # Method 1: Try to access footnotes through the document part
            if hasattr(doc, '_part'):
                document_part = doc._part
                
                # Try to get footnotes part
                try:
                    footnotes_part = document_part.package.part_related_by(
                        'http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes'
                    )
                    
                    if footnotes_part:
                        # Parse the footnotes XML
                        footnotes_xml = footnotes_part.blob
                        if footnotes_xml:
                            import xml.etree.ElementTree as ET
                            root = ET.fromstring(footnotes_xml)
                            
                            # Define namespace
                            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
                            
                            # Find all footnote elements
                            footnote_elements = root.findall('.//w:footnote', ns)
                            
                            for footnote in footnote_elements:
                                # Get footnote ID
                                footnote_id = footnote.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}id')
                                if footnote_id and footnote_id != '0':  # Skip separator/continuation notes
                                    # Extract footnote text
                                    footnote_text = self._extract_text_from_footnote_element(footnote)
                                    if footnote_text.strip():
                                        self.footnotes.append({
                                                    'id': footnote_id,
                                                    'text': footnote_text.strip()
                                        })
                except Exception as e:
                    print(f"Warning: Could not access footnotes part: {e}")
                
                # Try to get endnotes part
                try:
                    endnotes_part = document_part.package.part_related_by(
                        'http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes'
                    )
                    
                    if endnotes_part:
                        # Parse the endnotes XML
                        endnotes_xml = endnotes_part.blob
                        if endnotes_xml:
                            import xml.etree.ElementTree as ET
                            root = ET.fromstring(endnotes_xml)
                            
                            # Define namespace
                            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
                            
                            # Find all endnote elements
                            endnote_elements = root.findall('.//w:endnote', ns)
                            
                            for endnote in endnote_elements:
                                    # Get endnote ID
                                    endnote_id = endnote.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}id')
                                    if endnote_id and endnote_id != '0':  # Skip separator/continuation notes
                                        # Extract endnote text
                                        endnote_text = self._extract_text_from_footnote_element(endnote)
                                        if endnote_text.strip():
                                            self.footnotes.append({
                                                    'id': endnote_id,
                                                    'text': endnote_text.strip()
                                            })
                except Exception as e:
                    print(f"Warning: Could not access endnotes part: {e}")
            
            # Method 2: Try alternative approach using document relationships
            try:
                if hasattr(doc, '_part') and hasattr(doc._part, 'rels'):
                    # Look for footnotes relationship
                    for rel_id, rel in doc._part.rels.items():
                        if hasattr(rel, 'reltype') and rel.reltype == 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes':
                            footnotes_part = rel.target_part
                            if footnotes_part:
                                import xml.etree.ElementTree as ET
                                root = ET.fromstring(footnotes_part.blob)
                                
                                # Define namespace
                                ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
                                
                                # Find all footnote elements
                                footnote_elements = root.findall('.//w:footnote', ns)
                                
                                for footnote in footnote_elements:
                                    # Get footnote ID
                                    footnote_id = footnote.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}id')
                                    if footnote_id and footnote_id != '0': # Skip separator/continuation notes
                                        # Extract footnote text
                                        footnote_text = self._extract_text_from_footnote_element(footnote)
                                        if footnote_text.strip():
                                            self.footnotes.append({
                                                    'id': footnote_id,
                                                    'text': footnote_text.strip()
                                            })
                        # Check for endnotes
                        elif hasattr(rel, 'reltype') and rel.reltype == 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes'):
                            endnotes_part = rel.target_part
                            if endnotes_part:
                                import xml.etree.ElementTree as ET
                                endnotes_xml = endnotes_part.blob
                                root = ET.fromstring(endnotes_xml)
                                
                                # Define namespace
                                ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
                                
                                # Find all endnote elements
                                endnote_elements = root.findall('.//w:endnote', ns)
                                
                                for endnote in endnote_elements:
                                    # Get endnote ID
                                    endnote_id = endnote.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}id')
                                    if endnote_id and endnote_id != '0': # Skip separator/continuation notes
                                        # Extract endnote text
                                        endnote_text = self._extract_text_from_footnote_element(endnote)
                                        if endnote_text.strip():
                                            self.footnotes.append({
                                                    'id': endnote_id,
                                                    'text': endnote_text.strip()
                                            })
except Exception as e:
                    print(f"Warning: Could not extract footnotes from XML: {e}")
            
        except Exception as e:
            print(f"Warning: Could not extract footnotes from XML: {e}")
                    
        except Exception as e:
            print(f"Warning: Could not extract footnotes from XML: {e}")
    
    def _extract_text_from_footnote_element(self, footnote_element) -> str:
        """Extract text content from a footnote XML element"""
        try:
            text_parts = []
            # Get all text runs within the footnote
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            text_elements = footnote_element.findall('.//w:t', ns)
            for text_elem in text_elements:
                if text_elem.text:
                    text_parts.append(text_elem.text)
            return ''.join(text_parts)
        except:
            return ""
    
    def find_footnote_references_in_paragraph(self, paragraph) -> List[Tuple[str, str]]:
        """Find footnote references within a paragraph and return (original_text, replacement) pairs"""
        references = []
        
        try:
            # Check each run for footnote references
            for run_idx, run in enumerate(paragraph.runs):
                # Look for footnote reference elements in the run's XML
                if hasattr(run, 'element'):
                    run_xml = run.element
                    # Check for footnote reference elements
                    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
                    footnote_refs = run_xml.findall('.//w:footnoteReference', ns)
                    
                    for ref in footnote_refs:
                        ref_id = ref.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}id')
                        if ref_id:
                            # Find the corresponding footnote
                            footnote_num = None
                            for i, fn in enumerate(self.footnotes):
                                if fn['id'] == ref_id:
                                    footnote_num = i + 1
                                    break
                            
                            if footnote_num:
                                # Create replacement for the footnote reference
                                replacement = f"[fn:{footnote_num}]"
                                # We'll use the run index to identify where to place the reference
                                references.append((run_idx, replacement))
        except Exception as e:
            print(f"Warning: Error finding footnote references: {e}")
        
        return references
    
    def _process_text_with_footnotes(self, paragraph) -> str:
        """Process paragraph text and insert footnote references at appropriate positions"""
        footnote_refs = self.find_footnote_references_in_paragraph(paragraph)
        
        if not footnote_refs:
            return paragraph.text
        
        # Build text with footnote references
        result_parts = []
        processed_runs = set()
        
        for run_idx, run in enumerate(paragraph.runs):
            # Check if this run has a footnote reference
            run_footnotes = [ref for ref in footnote_refs if ref[0] == run_idx]
            
            if run_footnotes:
                # Add the run text followed by footnote references
                if run.text:
                    result_parts.append(run.text)
                for _, footnote_ref in run_footnotes:
                    result_parts.append(footnote_ref)
                processed_runs.add(run_idx)
            else:
                # Just add the run text
                if run.text and run_idx not in processed_runs:
                    result_parts.append(run.text)
        
        return ''.join(result_parts)
    
    def process_paragraph(self, paragraph) -> List[str]:
        """Process a single paragraph and return org-mode lines with footnote references and list support"""
        lines = []
        
        # Get the processed text with footnotes
        processed_text = self._process_text_with_footnotes(paragraph)
        
        if not processed_text.strip():
            return lines
        
        # Check if this is a list item
        list_type, level = self.detect_list_type_and_level(paragraph)
        
        if list_type:
            # Handle list item
            cleaned_text = self.clean_list_text(processed_text, list_type)
            
            # Update list depth stack
            while len(self.list_depth_stack) > level + 1:
                self.list_depth_stack.pop()
                self.list_item_counters.pop()
            
            while len(self.list_depth_stack) < level + 1:
                self.list_depth_stack.append(list_type)
                self.list_item_counters.append(1)
            
            # Get item number for ordered lists
            item_number = None
            if list_type == 'ordered':
                item_number = self.list_item_counters[level]
                self.list_item_counters[level] += 1
            else:
                # Reset ordered list counter when we encounter unordered list at same level
                if level < len(self.list_item_counters):
                    self.list_item_counters[level] = 1
            
            # Create org-mode list item
            prefix = self.get_org_list_prefix(list_type, level, item_number if list_type == 'ordered' else 1)
            lines.append(f"{prefix}{cleaned_text}")
            
        else:
            # Reset list stack when we encounter non-list content
            self.list_depth_stack = []
            self.list_item_counters = []
            
            # Handle centered text as level 1 header
            if self.is_centered(paragraph):
                lines.append(f"* {processed_text.strip()}")
                return lines
            
            # Handle bold text in non-centered paragraphs
            if self.has_bold_text(paragraph):
                # Use the enhanced method that preserves footnotes
                bold_portions, regular_portions = self.extract_bold_portions_with_footnotes(paragraph)
                
                # Add bold portions as level 2 headers
                for bold_text in bold_portions:
                    if bold_text.strip():
                        lines.append(f"** {bold_text.strip()}")
                
                # Add regular portions as normal paragraphs
                for regular_text in regular_portions:
                    if regular_text.strip():
                        lines.append(regular_text.strip())
            else:
                # Regular paragraph with footnote processing
                lines.append(processed_text.strip())
        
        return lines
    
    def convert_docx_to_org(self, input_file: str, output_file: str, check_conflicts: bool = True, conflict_mode: str = None) -> bool:
        """Convert a single docx file to org-mode with footnotes and lists"""
        try:
            # Check for conflicts if requested
            if check_conflicts and os.path.exists(output_file):
                if conflict_mode == "overwrite":
                    pass  # Just overwrite
                elif conflict_mode == "suffix":
                    output_file = self.add_numeric_suffix(output_file)
                elif conflict_mode == "ask":
                    if not self.resolve_conflict(output_file):
                        print(f"⏭ Skipped {input_path} (conflict resolved by user)")
                        return False
                else:
                    print(f"Unknown conflict mode: {conflict_mode}")
                    return self.resolve_conflict(output_file)
            
            print(f"Converting {input_file}...")
            
            # Reset all data
            self.footnotes = []
            self.footnote_counter = 1
            self.footnote_references = {}
            self.list_depth_stack = []
            self.list_item_counters = []
            
            # Load document
            doc = Document(input_file)
            
            # Extract footnotes first
            self.extract_footnotes_from_xml(doc)
            
            if self.footnotes:
                print(f"Found {len(self.footnotes)} footnotes")
            else:
                print("No footnotes found in document")
            
            org_content = []
            
            # Process paragraphs
            for paragraph in doc.paragraphs:
                lines = self.process_paragraph(paragraph)
                org_content.extend(lines)
            
            # Add footnotes at the end if any
            if self.footnotes:
                org_content.append("")
                org_content.append("* Footnotes")
                for i, footnote in enumerate(self.footnotes, 1):
                    org_content.append(f"[fn:{i}] {footnote['text']}")
            
            # Create output directory if it doesn't exist
            output_dir = os.path.dirname(output_file)
            if output_dir and not os.path.exists(output_dir):
                os.makedirs(output_dir, exist_ok=True)
            
            # Write to org file with UTF-8 encoding
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write('\n\n'.join(org_content))
            
            print(f"✓ Converted to {output_file}")
            return True
            
        except Exception as e:
            print(f"✗ Error converting {input_file}: {str(e)}")
            return False
    
    def convert_file_batch(self, input_file: str, output_file: str) -> Tuple[bool, str]:
        """Convert single file in batch mode, return success status and message"""
        try:
            if self.convert_docx_to_org(input_file, output_file):
                return True, f"✓ Converted: {input_file} → {output_file}"
            else:
                return False, f"✗ Failed: {input_file}"
        except Exception as e:
            return False, f"✗ Error with {input_file}: {str(e)}"
    
    def process_batch_files(self, file_pairs: List[Tuple[str, str]], max_workers: int = 4) -> Dict[str, int]:
        """Process multiple files in parallel with progress tracking"""
        start_time = time.time()
        results = {"success": 0, "failed": 0, "skipped": 0}
        
        print(f"\n🔄 Processing {len(file_pairs)} files...")
        
        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            # Submit all tasks
            future_to_file = {
                executor.submit(self.convert_file_batch, input_file, output_file): (input_file, output_file)
                for input_file, output_file in file_pairs
            }
            
            # Process completed tasks
            for i, future in enumerate(as_completed(future_to_file), 1):
                input_file, output_file = future_to_file[future]
                try:
                    success, message = future.result()
                    if success:
                        results["success"] += 1
                    else:
                        results["failed"] += 1
                    print(f"[{i}/{len(file_pairs)}] {message}")
                except Exception as e:
                    results["failed"] += 1
                    print(f"[{i}/{len(file_pairs)}] ✗ Error with {input_file}: {str(e)}")
        
        elapsed = time.time() - start_time
        print(f"\n✅ Batch processing completed in {elapsed:.1f} seconds")
        print(f"📊 Results: {results['success']} successful, {results['failed']} failed, {results['skipped']} skipped")
        
        return results
    
    def handle_batch_mode(self, input_paths: List[str], output_dir: Optional[str] = None):
        """Handle batch conversion of multiple files/directories"""
        all_file_pairs = []
        
        # Collect all files to process
        for input_path in input_paths:
            if not os.path.exists(input_path):
                print(f"⚠️  Path not found: {input_path}")
                continue
                
            if os.path.isfile(input_path) and input_path.lower().endswith('.docx'):
                # Single file
                if output_dir:
                    output_file = os.path.join(output_dir, os.path.basename(input_path).replace('.docx', '.org'))
                else:
                    output_file = input_path.replace('.docx', '.org')
                all_file_pairs.append((input_path, output_file))
                
            elif os.path.isdir(input_path):
                # Directory - find all docx files
                docx_files = self.find_docx_files_recursive(input_path)
                if not docx_files:
                    print(f"⚠️  No .docx files found in {input_path}")
                    continue
                    
                print(f"📁 Found {len(docx_files)} files in {input_path}")
                for docx_file in docx_files:
                    if output_dir:
                        # Preserve subdirectory structure
                        rel_path = os.path.relpath(docx_file, input_path)
                        output_file = os.path.join(output_dir, rel_path.replace('.docx', '.org'))
                    else:
                        output_file = docx_file.replace('.docx', '.org')
                    all_file_pairs.append((docx_file, output_file))
        
        if not all_file_pairs:
            print("❌ No files to process")
            return
            
        print(f"🎯 Ready to process {len(all_file_pairs)} files")
        if self.conflict_mode == "ask":
            confirm = input("Proceed with batch conversion? [y/N] ").strip().lower()
            if confirm not in ['y', 'yes']:
                print("❌ Batch conversion cancelled")
                return
        
        # Process all files
        self.process_batch_files(all_file_pairs)
    
    def handle_folder(self, folder_path: str):
        """Handle folder conversion (legacy method)"""
        docx_files = self.find_docx_files_recursive(folder_path)
        if not docx_files:
            print(f"No .docx files found in {folder_path}")
            return
            
        file_pairs = [(docx_file, docx_file.replace('.docx', '.org')) for docx_file in docx_files]
        self.process_batch_files(file_pairs)
    
def print_help(self):
        """Print usage help"""
        print("Usage: python3 docx_to_org_complete.py <input> [output] [options]")
        print("       python3 docx_to_org_complete.py --batch <file1> <file2> ... [options]")
        print("")
        print("Arguments:")
        print("  input     Docx file or folder path")
        print("  output    Output org file (only for single file input)")
        print("")
        print("Options:")
        print("  --batch, -b             Batch mode for multiple files/folders")
        print("  --output-dir, -d <dir>  Output directory for batch mode")
        print("  --overwrite-all, -o     Overwrite existing files without asking")
        print("  --add-suffix, -a        Add numeric suffix to existing files")
        print("  --workers, -w <num>     Number of parallel workers (default: 4)")
        print("  --help, -h              Show this help message")
        print("")
        print("Examples:")
        print("  python3 docx_to_org_complete.py file.docx output.org")
        print("  python3 docx_to_org_complete.py folder/ --overwrite-all")
        print("  python3 docx_to_org_complete.py --batch file1.docx file2.docx -d output/")
        print("  python3 docx_to_org_complete.py --batch folder1/ folder2/ -o -w 8")
    
    def get_file_conflict_mode(self, output_file: str) -> str:
        """Determine conflict mode for a specific file"""
        if os.path.exists(output_file):
            if self.conflict_mode == "suffix":
                return "suffix"  # Need to add suffix
            else:
                return "overwrite"  # Default to overwrite
        return "no_conflict"
    
    def get_user_files(self) -> List[Tuple[str, str]]:
        """Get input from user - can be file or folder"""
        inputs = []
        
        print("=== Complete Docx to Org-mode Converter (Footnotes + Lists + Batch) ===")
        print("Enter file or folder paths (or 'done' to finish, 'quit' to exit)")
        print("Folders will be scanned recursively for .docx files")
        
        while True:
            input_path = input("\nEnter docx file or folder path: ").strip()
            
            if input_path.lower() == 'quit':
                return []
            elif input_path.lower() == 'done':
                break
            elif not input_path:
                print("Please enter a valid path")
                continue
            
            # Check if path exists
            if not os.path.exists(input_path):
                print(f"Path not found: {input_path}")
                continue
            
            # Handle folder
            if os.path.isdir(input_path):
                docx_files = self.find_docx_files_recursive(input_path)
                if not docx_files:
                    print(f"No .docx files found in {input_path}")
                    continue
                
                print(f"Found {len(docx_files)} .docx files in {input_path}")
                confirm = input(f"Convert all {len(docx_files)} files? [y/n] ").strip().lower()
                if confirm in ['y', 'yes']:
                    for docx_file in docx_files:
                        output_file = docx_file.replace('.docx', '.org')
                        inputs.append((docx_file, output_file))
                else:
                    continue
            
            # Handle single file
            elif input_path.lower().endswith('.docx'):
                suggested_output = input_path.replace('.docx', '.org')
                output_file = input(f"Enter output file path [{suggested_output}]: ").strip()
                if not output_file:
                    output_file = suggested_output
                inputs.append((input_path, output_file))
            
            else:
                print("Path must be a .docx file or folder")
                continue
            
            print(f"Added: {len(inputs)} file(s) queued for conversion")
        
        return inputs
    
    def run(self):
        """Main conversion loop"""
        file_pairs = self.get_user_files()
        
        if not file_pairs:
            print("No files selected. Exiting.")
            return
        
        print(f"\nProcessing {len(file_pairs)} file(s)...")
        
        success_count = 0
        skip_count = 0
        for input_file, output_file in file_pairs:
            if self.convert_docx_to_org(input_file, output_file):
                success_count += 1
            else:
                skip_count += 1
        
def run(self):
        """Main entry point for the converter"""
        if len(sys.argv) < 2:
            self.print_help()
            return
        
        # Parse command line arguments
        args = sys.argv[1:]
        batch_mode = False
        input_paths = []
        output_dir = None
        max_workers = 4
        conflict_mode = "ask"
        
        i = 0
        while i < len(args):
            arg = args[i]
            
            if arg.lower() in ['--batch', '-b']:
                batch_mode = True
            elif arg.lower() in ['--output-dir', '-d']:
                if i + 1 < len(args):
                    output_dir = args[i + 1]
                    i += 1
                else:
                    print("Error: --output-dir requires a directory path")
                    return
            elif arg.lower() in ['--workers', '-w']:
                if i + 1 < len(args):
                    try:
                        max_workers = int(args[i + 1])
                        i += 1
                    except ValueError:
                        print("Error: --workers requires a number")
                        return
                else:
                    print("Error: --workers requires a number")
                    return
            elif arg.lower() in ['--overwrite-all', '-o']:
                conflict_mode = "overwrite"
            elif arg.lower() in ['--add-suffix', '-a']:
                conflict_mode = "suffix"
            elif arg.lower() in ['--help', '-h']:
                self.print_help()
                return
            else:
                # Assume it's an input path
                input_paths.append(arg)
            
            i += 1
        
        if not input_paths:
            print("Error: No input paths specified")
            self.print_help()
            return
        
        # Set conflict mode
        self.conflict_mode = conflict_mode
        
        # Handle batch mode
        if batch_mode:
            self.handle_batch_mode(input_paths, output_dir)
            return
        
        # Handle single file/folder mode (legacy)
        input_path = input_paths[0]
        
        if not os.path.exists(input_path):
            print(f"Path not found: {input_path}")
            return
        
        # Single file
        if os.path.isfile(input_path) and input_path.lower().endswith('.docx'):
            output_file = input_path.replace('.docx', '.org')
            if output_dir:
                output_file = os.path.join(output_dir, os.path.basename(output_file))
            
            if self.convert_docx_to_org(input_path, output_file):
                print(f"✅ Successfully converted {input_path} to {output_file}")
            else:
                print(f"❌ Failed to convert {input_path}")
        
        # Directory
        elif os.path.isdir(input_path):
            self.handle_folder(input_path)
        
        else:
            print(f"❌ Invalid input: {input_path} (must be .docx file or folder)")


if __name__ == "__main__":
    converter = DocxToOrgCompleteConverter()
    converter.run()