# 🎨 Curls & Contemplation - Build & Preview System

Professional visual preview and build system for creating publication-ready EPUB and PDF files.

## 🚀 Quick Start

### 1. **Visual Preview** (Live Now!)

Your preview server is already running! Open in your browser:

```
http://127.0.0.1:8080/preview-index.html
```

**Features:**
- ✅ Click any file card to preview with full styling
- ✅ Search files by name or number
- ✅ Filter by type (Frontmatter, Chapters, Quotes, Backmatter)
- ✅ Beautiful visual navigation
- ✅ Real-time preview in new tabs

### 2. **Build EPUB** (One Command)

```bash
./build-epub.sh
```

This will:
- ✓ Create professional EPUB3 file
- ✓ Include all 60 XHTML files
- ✓ Embed all fonts and images
- ✓ Add proper metadata (ISBN, author, etc.)
- ✓ Validate the output
- ✓ Generate: `output/Curls-and-Contemplation-v1.0.0.epub`

### 3. **Build PDF** (One Command)

```bash
./build-pdf.sh
```

This will:
- ✓ Convert EPUB to print-ready PDF
- ✓ Optimize for letter-size paper
- ✓ Embed all fonts
- ✓ Add table of contents
- ✓ Generate: `output/Curls-and-Contemplation-v1.0.0.pdf`

---

## 📂 Project Structure

```
Mom/
├── READY/                          # Source files (validated ✓)
│   ├── xhtml/                      # 60 XHTML files
│   │   ├── styles/                 # 3 CSS files
│   │   └── *.xhtml                 # All content files
│   ├── images/                     # 33 images
│   └── fonts/                      # 6 WOFF2 fonts
│
├── build-epub.sh                   # EPUB builder script ⚡
├── build-pdf.sh                    # PDF builder script ⚡
├── preview-index.html              # Visual navigation
│
└── output/                         # Generated files
    ├── *.epub                      # EPUB3 output
    └── *.pdf                       # PDF output
```

---

## 🎯 Complete Workflow

### Option A: Quick Build (Recommended)

```bash
# 1. Build both formats
./build-epub.sh && ./build-pdf.sh

# 2. Files are ready in output/ folder!
```

### Option B: Visual Preview First

```bash
# 1. Preview all files visually
open http://127.0.0.1:8080/preview-index.html

# 2. Click through files, make any edits in VS Code

# 3. Build when ready
./build-epub.sh && ./build-pdf.sh
```

---

## 🔧 Installation Requirements

### Already Installed ✓
- Python 3 (for preview server)
- xmllint (for validation)
- zip (for EPUB packaging)

### Optional Tools

#### For EPUB Validation
```bash
sudo apt-get install epubcheck
```

#### For PDF Conversion (choose one)
```bash
# Option 1: Calibre (Recommended)
sudo apt-get install calibre

# Option 2: Pandoc
sudo apt-get install pandoc texlive-xetex
```

---

## 📖 Preview Server Commands

```bash
# Start preview server (already running)
cd READY && python3 -m http.server 8080

# Stop preview server
# Find process: ps aux | grep "python3 -m http.server"
# Kill process: kill <PID>

# Access preview
http://127.0.0.1:8080/preview-index.html
```

---

## 🎨 Visual Preview Features

### Search & Filter
- **Search Box**: Type file name or number (e.g., "Chapter IX" or "19")
- **Filter Buttons**:
  - All Files
  - Frontmatter (7 files)
  - Chapters (16 + 16 quotes)
  - Backmatter (17 files)

### File Navigation
- Click any card to open in new tab
- Full styling with CSS, fonts, and images
- Navigate between files using in-page links
- Color-coded by type

---

## ✅ Pre-Build Checklist

Your files are **already validated and ready**! But if you make changes:

```bash
# Validate all XHTML files
for file in READY/xhtml/*.xhtml; do
    xmllint --noout "$file" && echo "✓ $(basename "$file")"
done

# Check CSS links
grep -r "href.*css" READY/xhtml/*.xhtml

# Check image links
grep -r "src=" READY/xhtml/*.xhtml
```

---

## 🎯 Post-Build Testing

### Test EPUB
```bash
# With Calibre
ebook-viewer output/Curls-and-Contemplation-v1.0.0.epub

# With online validator
https://www.epubcheck.com/
```

### Test PDF
```bash
# Open in default viewer
xdg-open output/Curls-and-Contemplation-v1.0.0.pdf

# Or
evince output/Curls-and-Contemplation-v1.0.0.pdf
```

---

## 📚 Distribution Checklist

Before publishing:

- [ ] Preview all files visually at http://127.0.0.1:8080/preview-index.html
- [ ] Build EPUB with `./build-epub.sh`
- [ ] Validate EPUB (automatic if epubcheck installed)
- [ ] Test EPUB in Calibre or Apple Books
- [ ] Build PDF with `./build-pdf.sh`
- [ ] Review PDF for formatting
- [ ] Check file sizes are reasonable
- [ ] Files ready in `output/` folder!

---

## 🎨 Making Visual Edits

### Live Preview Workflow

1. **Open preview**: http://127.0.0.1:8080/preview-index.html
2. **Browse files** visually
3. **Edit in VS Code** if changes needed
4. **Refresh browser** to see changes
5. **Rebuild** when satisfied

### Common Edits
- **CSS**: `READY/xhtml/styles/style.css`
- **Content**: Any `.xhtml` file in `READY/xhtml/`
- **Images**: Check `READY/images/`
- **Fonts**: Check `READY/fonts/`

---

## 🌟 Build Script Features

### EPUB Builder (`build-epub.sh`)
✓ Professional EPUB3 format
✓ Proper metadata (ISBN, author, publisher)
✓ Semantic navigation
✓ Accessibility features
✓ Embedded fonts (6 WOFF2 files)
✓ All images included (33 files)
✓ Auto-validation
✓ Beautiful progress output

### PDF Builder (`build-pdf.sh`)
✓ Letter-size (8.5" × 11")
✓ Print-optimized margins
✓ Embedded fonts
✓ Table of contents
✓ Page numbers
✓ Professional formatting

---

## 🔥 Quick Commands Reference

```bash
# Visual Preview
open http://127.0.0.1:8080/preview-index.html

# Build EPUB
./build-epub.sh

# Build PDF
./build-pdf.sh

# Build Both
./build-epub.sh && ./build-pdf.sh

# View EPUB
ebook-viewer output/*.epub

# View PDF
xdg-open output/*.pdf

# Validate XHTML
xmllint --noout READY/xhtml/*.xhtml

# Check output size
du -h output/*
```

---

## 🎯 Your Files Are Ready!

✅ **60 XHTML files** - Validated
✅ **3 CSS files** - Linked correctly
✅ **6 Fonts** - Embedded
✅ **33 Images** - Referenced properly
✅ **Build scripts** - Ready to run
✅ **Preview server** - Running now

### Next Step: Build Your Book!

```bash
./build-epub.sh
```

That's it! Your professional EPUB will be in the `output/` folder. 🎉

---

## 💡 Tips for Best Results

1. **Always preview before building** - Catch issues early
2. **Test EPUB in multiple readers** - Calibre, Apple Books, Adobe Digital Editions
3. **Check PDF on different devices** - Screen vs print preview
4. **Keep source files backed up** - READY folder is your master
5. **Version your builds** - Script automatically versions output files

---

## 🆘 Troubleshooting

### Preview server not working?
```bash
cd READY
python3 -m http.server 8080 --bind 127.0.0.1
```

### EPUB build fails?
- Check all XHTML files validate: `xmllint --noout READY/xhtml/*.xhtml`
- Ensure zip is installed: `which zip`

### PDF build fails?
- Install Calibre: `sudo apt-get install calibre`
- Or Pandoc: `sudo apt-get install pandoc`

### Images not showing?
- Check paths in XHTML: should be `../images/filename`
- Verify images exist: `ls READY/images/`

---

## 📖 Resources

- **EPUB3 Spec**: https://www.w3.org/TR/epub-33/
- **Calibre Manual**: https://manual.calibre-ebook.com/
- **EPUB Validator**: https://www.epubcheck.com/

---

**Ready to build your bestseller? Start with:**
```bash
./build-epub.sh
```

🎨 **Curls & Contemplation** - Built with ❤️ for hairstyling professionals
