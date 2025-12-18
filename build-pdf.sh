#!/bin/bash
################################################################################
# PDF Build Script for "Curls & Contemplation"
# Creates a professional, print-ready PDF from EPUB
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
VERSION="1.0.0"
EPUB_FILE="output/Curls-and-Contemplation-v${VERSION}.epub"
PDF_FILE="output/Curls-and-Contemplation-v${VERSION}.pdf"

print_header() {
    echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${CYAN}          PDF Builder - Curls & Contemplation                 ${PURPLE}║${NC}"
    echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_step() {
    echo -e "${BLUE}▶${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_header

# Check if EPUB exists
if [ ! -f "$EPUB_FILE" ]; then
    print_error "EPUB file not found: $EPUB_FILE"
    echo -e "${YELLOW}Run ./build-epub.sh first to create the EPUB${NC}"
    exit 1
fi

print_success "Found EPUB file: $EPUB_FILE"

# Check for conversion tools
if command -v ebook-convert &> /dev/null; then
    CONVERTER="calibre"
    print_success "Using Calibre's ebook-convert"
elif command -v pandoc &> /dev/null; then
    CONVERTER="pandoc"
    print_success "Using Pandoc"
else
    print_error "No conversion tool found!"
    echo ""
    echo -e "${YELLOW}Please install one of the following:${NC}"
    echo -e "  ${CYAN}Calibre:${NC}  sudo apt-get install calibre"
    echo -e "  ${CYAN}Pandoc:${NC}   sudo apt-get install pandoc"
    exit 1
fi

# Convert to PDF
print_step "Converting EPUB to PDF..."

if [ "$CONVERTER" = "calibre" ]; then
    ebook-convert "$EPUB_FILE" "$PDF_FILE" \
        --paper-size letter \
        --pdf-page-numbers \
        --chapter "//*[name()='h1' or name()='h2']" \
        --level1-toc "//*[name()='h1']" \
        --level2-toc "//*[name()='h2']" \
        --pdf-serif-family "Libre Baskerville" \
        --pdf-sans-family "Montserrat" \
        --pdf-default-font-size 11 \
        --pdf-mono-font-size 10 \
        --margin-left 72 \
        --margin-right 72 \
        --margin-top 72 \
        --margin-bottom 72 \
        --preserve-cover-aspect-ratio \
        --embed-all-fonts \
        --pdf-add-toc
else
    # Pandoc conversion
    pandoc "$EPUB_FILE" \
        -o "$PDF_FILE" \
        --pdf-engine=xelatex \
        -V geometry:margin=1in \
        -V papersize:letter \
        --toc \
        --toc-depth=2
fi

if [ -f "$PDF_FILE" ]; then
    print_success "PDF created successfully!"

    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║              PDF BUILD COMPLETED!                            ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${CYAN}📄 PDF Details:${NC}"
    echo -e "   File: ${GREEN}$PDF_FILE${NC}"
    echo -e "   Size: $(du -h "$PDF_FILE" | cut -f1)"
    echo ""
    echo -e "${CYAN}🎯 Next Steps:${NC}"
    echo -e "   1. Open PDF:  ${YELLOW}xdg-open \"$PDF_FILE\"${NC}"
    echo -e "   2. Both files are ready for distribution!"
    echo ""
else
    print_error "PDF conversion failed"
    exit 1
fi
