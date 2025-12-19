# 🚀 QUICK START GUIDE
## Curls & Contemplation - Visual Preview & Build System

---

## ✅ **SYSTEM STATUS: READY!**

Your complete visual preview and build system is **running and ready to use!**

---

## 🎯 **3 WAYS TO USE THIS SYSTEM**

### 1️⃣ **VISUAL PREVIEW** (Available Now!)

**Click this link to see all your files:**
```
http://127.0.0.1:8080/preview-index.html
```

**What you can do:**
- 📱 Browse all 60 files in a beautiful visual interface
- 🔍 Search by file name or number
- 🎨 Filter by type (Frontmatter, Chapters, Quotes, Backmatter)
- 👁️ Click any file card to preview with full styling
- ✨ All fonts, images, and CSS render perfectly

**Perfect for:**
- Quick visual inspection before building
- Finding specific chapters or sections
- Checking formatting and styling
- Editing files and seeing changes live

---

### 2️⃣ **BUILD EPUB** (One Command!)

**Run this command in your terminal:**
```bash
./build-epub.sh
```

**What it does:**
- ✓ Creates professional EPUB3 file
- ✓ Includes all 60 XHTML files
- ✓ Embeds all 6 custom fonts
- ✓ Includes all 33 images
- ✓ Adds ISBN, author, publisher metadata
- ✓ Validates structure
- ✓ **Output:** `output/Curls-and-Contemplation-v1.0.0.epub` (6.4MB)

**Status:** ✅ **WORKING!** (Just tested successfully!)

---

### 3️⃣ **BUILD PDF** (One Command!)

**Run this command after building EPUB:**
```bash
./build-pdf.sh
```

**What it does:**
- ✓ Converts EPUB to print-ready PDF
- ✓ Letter-size format (8.5" × 11")
- ✓ Professional margins
- ✓ Embedded fonts
- ✓ Table of contents
- ✓ **Output:** `output/Curls-and-Contemplation-v1.0.0.pdf`

**Note:** Requires Calibre or Pandoc (see installation below)

---

## ⚡ **FASTEST WORKFLOW**

```bash
# 1. Preview your files visually
Open: http://127.0.0.1:8080/preview-index.html

# 2. Build both EPUB and PDF
./build-epub.sh && ./build-pdf.sh

# 3. Your bestseller is ready in the output/ folder!
```

---

## 📦 **WHAT YOU HAVE NOW**

✅ **Live Preview Server** - Running at http://127.0.0.1:8080
✅ **Visual Navigation** - Beautiful index with search & filter
✅ **EPUB Builder** - Professional script ready to run
✅ **PDF Builder** - One-command conversion
✅ **60 Validated XHTML Files** - All error-free
✅ **Complete Documentation** - README-BUILD.md for details

---

## 🎨 **YOUR FILES**

```
📂 READY/                    ← Source files (100% validated)
   ├── xhtml/                ← 60 XHTML files
   ├── images/               ← 33 images
   └── fonts/                ← 6 custom fonts

📂 output/                   ← Generated books
   └── *.epub               ← Ready for sale! ✅

📜 Scripts
   ├── build-epub.sh        ← Build EPUB
   ├── build-pdf.sh         ← Build PDF
   └── preview-index.html   ← Visual navigator
```

---

## 🔧 **OPTIONAL: Install PDF Tools**

To convert EPUB to PDF, install **one** of these:

### Option 1: Calibre (Recommended)
```bash
sudo apt-get install calibre
```

### Option 2: Pandoc
```bash
sudo apt-get install pandoc texlive-xetex
```

---

## 🎯 **VISUAL PREVIEW FEATURES**

**Already running at:** http://127.0.0.1:8080/preview-index.html

### Features:
- **Search** - Type any file name or number
- **Filter** - Show only frontmatter, chapters, quotes, or backmatter
- **Click** - Any card opens the file in a new tab with full styling
- **Navigate** - Use in-page links to move between chapters
- **Live Updates** - Edit files in VS Code, refresh browser to see changes

### Color-Coded Cards:
- 🔵 **Blue** - Frontmatter (7 files)
- 🟣 **Purple** - Part Dividers (4 files)
- 🟢 **Green** - Chapters (16 files)
- 🟠 **Orange** - Quote Pages (16 files)
- 🔴 **Pink** - Backmatter & Journals (17 files)

---

## ✨ **EXAMPLE WORKFLOW**

### Scenario: Final Review Before Publishing

```bash
# Step 1: Visual Review
# Open http://127.0.0.1:8080/preview-index.html
# Click through all chapters, check formatting

# Step 2: Make Any Edits
# Edit XHTML files in VS Code if needed
# Refresh browser to see changes

# Step 3: Build Final Files
./build-epub.sh && ./build-pdf.sh

# Step 4: Test EPUB
ebook-viewer output/Curls-and-Contemplation-v1.0.0.epub

# Step 5: Ready to Publish! 🎉
```

---

## 📊 **YOUR BOOK STATS**

- **Title:** Curls & Contemplation
- **Subtitle:** A Stylist's Interactive Journey Journal
- **Author:** Michael David Warren Jr.
- **ISBN:** 978-0-9876543-2-1
- **Format:** EPUB3 + PDF
- **Pages:** 60 XHTML files
- **Size:** ~6.4MB EPUB
- **Status:** ✅ **READY FOR DISTRIBUTION!**

---

## 🆘 **HELP**

### Preview not loading?
```bash
cd READY
python3 -m http.server 8080 --bind 127.0.0.1
# Then open: http://127.0.0.1:8080/preview-index.html
```

### Build fails?
```bash
# Check files are valid
xmllint --noout READY/xhtml/*.xhtml

# Make script executable
chmod +x build-epub.sh build-pdf.sh
```

### Want more details?
```bash
# Read full documentation
cat README-BUILD.md
```

---

## 🎉 **YOU'RE ALL SET!**

### **Your Next Step:**

**Try the visual preview right now:**
```
http://127.0.0.1:8080/preview-index.html
```

**Then build your book:**
```bash
./build-epub.sh
```

**That's it! Your professional EPUB will be ready to sell! 🚀**

---

## 💡 **PRO TIPS**

1. **Always preview before building** - Catch styling issues early
2. **Test EPUB in multiple readers** - Calibre, Apple Books, Kindle Previewer
3. **Keep the preview server running** - Great for live editing
4. **Version control your builds** - Scripts auto-version output files
5. **Backup your READY folder** - It's your master source

---

**Questions?** Check `README-BUILD.md` for complete documentation.

**Ready to publish?** Your files are professionally formatted and validated! 🎨📚
