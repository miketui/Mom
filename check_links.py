import os
import re
from xml.etree import ElementTree

def check_links(root_dir):
    # Map of file path -> set of IDs in that file
    file_ids = {}
    
    # First pass: collect all files and their IDs
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if not filename.endswith('.xhtml'):
                continue
            
            filepath = os.path.join(dirpath, filename)
            try:
                # Use robust parsing (ignoring namespaces for simplicity or handling them)
                # Since these are XHTML, they might have namespaces.
                # We'll read as string and use regex for IDs to be safer/faster for "well-formed" check
                # or use ElementTree with namespace handling.
                # Let's use simple regex for ID collection to avoid XML parsing errors on entities
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                ids = set(re.findall(r'\bid=[\"\"]([^\"\"]+)[\"\"]', content))
                file_ids[os.path.abspath(filepath)] = ids
            except Exception as e:
                print(f"Error reading {filepath}: {e}")

    # Second pass: check links
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if not filename.endswith('.xhtml'):
                continue
                
            source_path = os.path.abspath(os.path.join(dirpath, filename))
            
            with open(source_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find all hrefs
            # simplistic regex for href extraction
            hrefs = re.findall(r'href=[\"\"]([^\"\"]+)[\"\"]', content)
            
            for href in hrefs:
                if href.startswith('http') or href.startswith('mailto:'):
                    continue
                
                # Split anchor
                if '#' in href:
                    target_file, anchor = href.split('#', 1)
                else:
                    target_file, anchor = href, None
                
                # Resolve target file
                if target_file == '':
                    # Internal link
                    target_path = source_path
                else:
                    # Relative link
                    target_path = os.path.abspath(os.path.join(os.path.dirname(source_path), target_file))
                
                # Check file existence (only for .xhtml targets)
                if target_file and (target_file.endswith('.css') or target_file.endswith('.png') or target_file.endswith('.jpeg') or target_file.endswith('.jpg') or target_file.endswith('.svg')):
                     if not os.path.exists(target_path):
                         print(f"[BROKEN FILE] {filename} -> {href} (File not found)")
                     continue

                if not target_path.endswith('.xhtml'):
                    # Skip non-xhtml checks for now, or check existence
                    if not os.path.exists(target_path):
                         print(f"[BROKEN FILE] {filename} -> {href} (File not found)")
                    continue

                if target_path not in file_ids:
                    print(f"[BROKEN FILE] {filename} -> {href} (Target file {target_file} not found)")
                    continue
                
                # Check anchor
                if anchor:
                    if anchor not in file_ids[target_path]:
                         print(f"[BROKEN ANCHOR] {filename} -> {href} (Anchor #{anchor} not found in {os.path.basename(target_path)})")

print("Checking links in Book/OEBPS/xhtml/ ...")
check_links("Book/OEBPS/xhtml/")
