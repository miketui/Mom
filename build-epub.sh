#!/bin/bash
################################################################################
# EPUB Build Script for "Curls & Contemplation"
# Creates a professional, validated EPUB3 file ready for distribution
################################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
BOOK_TITLE="Curls & Contemplation"
BOOK_SUBTITLE="A Stylist's Interactive Journey Journal"
AUTHOR="Michael David Warren Jr."
ISBN="978-0-9876543-2-1"
PUBLISHER="Self"
LANGUAGE="en"
VERSION="1.0.0"

# Directories
READY_DIR="READY"
BUILD_DIR="build"
EPUB_DIR="$BUILD_DIR/epub"
OUTPUT_DIR="output"

# Output filename
OUTPUT_FILE="$OUTPUT_DIR/Curls-and-Contemplation-v${VERSION}.epub"

################################################################################
# Functions
################################################################################

print_header() {
    echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${CYAN}          EPUB Builder - Curls & Contemplation                ${PURPLE}║${NC}"
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

################################################################################
# Main Build Process
################################################################################

print_header

# Step 1: Clean and create directories
print_step "Preparing build environment..."
rm -rf "$BUILD_DIR" "$OUTPUT_DIR"
mkdir -p "$EPUB_DIR/META-INF"
mkdir -p "$EPUB_DIR/OEBPS/xhtml"
mkdir -p "$EPUB_DIR/OEBPS/styles"
mkdir -p "$EPUB_DIR/OEBPS/images"
mkdir -p "$EPUB_DIR/OEBPS/fonts"
mkdir -p "$OUTPUT_DIR"
print_success "Build environment ready"

# Step 2: Create mimetype file (must be first, uncompressed)
print_step "Creating mimetype..."
echo -n "application/epub+zip" > "$EPUB_DIR/mimetype"
print_success "Mimetype created"

# Step 3: Create container.xml
print_step "Creating META-INF/container.xml..."
cat > "$EPUB_DIR/META-INF/container.xml" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>
EOF
print_success "container.xml created"

# Step 4: Copy content files
print_step "Copying XHTML files..."
cp "$READY_DIR"/xhtml/*.xhtml "$EPUB_DIR/OEBPS/xhtml/"
print_success "$(ls -1 $READY_DIR/xhtml/*.xhtml | wc -l) XHTML files copied"

print_step "Copying CSS files..."
cp "$READY_DIR"/xhtml/styles/*.css "$EPUB_DIR/OEBPS/styles/"
print_success "$(ls -1 $READY_DIR/xhtml/styles/*.css | wc -l) CSS files copied"

print_step "Copying images..."
cp "$READY_DIR"/images/* "$EPUB_DIR/OEBPS/images/"
print_success "$(ls -1 $READY_DIR/images/* | wc -l) image files copied"

print_step "Copying fonts..."
cp "$READY_DIR"/fonts/* "$EPUB_DIR/OEBPS/fonts/"
print_success "$(ls -1 $READY_DIR/fonts/* | wc -l) font files copied"

# Step 4b: Validate XHTML files before packaging
print_step "Validating XHTML files..."
VALIDATION_FAILED=0
if command -v xmllint &> /dev/null; then
    for file in "$READY_DIR"/xhtml/*.xhtml; do
        if ! xmllint --noout "$file" 2>/dev/null; then
            print_error "Validation failed: $(basename "$file")"
            VALIDATION_FAILED=1
        fi
    done
    if [ $VALIDATION_FAILED -eq 1 ]; then
        print_error "One or more XHTML files failed validation. Please fix before building."
        exit 1
    fi
    print_success "All XHTML files passed validation"
else
    print_warning "xmllint not found - skipping XHTML validation"
    print_warning "Install with: sudo apt-get install libxml2-utils"
fi

# Step 5: Create content.opf (package document)
print_step "Creating content.opf..."
cat > "$EPUB_DIR/OEBPS/content.opf" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid" xml:lang="en">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>Curls &amp; Contemplation</dc:title>
    <dc:creator id="creator">Michael David Warren Jr.</dc:creator>
    <dc:identifier id="bookid">urn:isbn:978-0-9876543-2-1</dc:identifier>
    <dc:language>en</dc:language>
    <dc:publisher>Self</dc:publisher>
    <dc:date>2025-01-01</dc:date>
    <dc:description>A comprehensive interactive journey journal for hairstylists, combining professional development, creative inspiration, and practical business strategies for building a thriving freelance career.</dc:description>
    <dc:subject>Hairstyling</dc:subject>
    <dc:subject>Beauty Industry</dc:subject>
    <dc:subject>Professional Development</dc:subject>
    <dc:subject>Freelance Business</dc:subject>
    <dc:subject>Self-Help</dc:subject>
    <meta property="dcterms:modified">2025-12-18T00:00:00Z</meta>
    <meta property="schema:accessMode">textual</meta>
    <meta property="schema:accessMode">visual</meta>
    <meta property="schema:accessModeSufficient">textual,visual</meta>
    <meta property="schema:accessibilityFeature">structuralNavigation</meta>
    <meta property="schema:accessibilityFeature">alternativeText</meta>
    <meta property="schema:accessibilityHazard">none</meta>
  </metadata>

  <manifest>
    <!-- Navigation -->
    <item id="toc" href="xhtml/3-TableOfContents.xhtml" media-type="application/xhtml+xml" properties="nav"/>

    <!-- CSS -->
    <item id="css-fonts" href="styles/fonts.css" media-type="text/css"/>
    <item id="css-style" href="styles/style.css" media-type="text/css"/>
    <item id="css-print" href="styles/print.css" media-type="text/css"/>

    <!-- Fonts -->
    <item id="font-cinzel" href="fonts/CinzelDecorative.woff2" media-type="font/woff2"/>
    <item id="font-mont-reg" href="fonts/Montserrat-Regular.woff2" media-type="font/woff2"/>
    <item id="font-mont-bold" href="fonts/Montserrat-Bold.woff2" media-type="font/woff2"/>
    <item id="font-libre-reg" href="fonts/librebaskerville-regular.woff2" media-type="font/woff2"/>
    <item id="font-libre-italic" href="fonts/librebaskerville-italic.woff2" media-type="font/woff2"/>
    <item id="font-libre-bold" href="fonts/librebaskerville-bold.woff2" media-type="font/woff2"/>

    <!-- Images -->
    <item id="img-cover" href="images/cover.png" media-type="image/png" properties="cover-image"/>
    <item id="img-michael" href="images/Michael.jpeg" media-type="image/jpeg"/>
    <item id="img-brush" href="images/brushstroke.svg" media-type="image/svg+xml"/>
    <item id="img-ch1-quote" href="images/chapter-i-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-ch2-quote" href="images/chapter-ii-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-ch3-quote" href="images/chapter-iii-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-ch4-quote" href="images/chapter-iv-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-ch5-quote" href="images/chapter-v-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-ch6-quote" href="images/chapter-vi-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-ch7-quote" href="images/chapter-vii-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-ch8-quote" href="images/chapter-viii-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-ch9-quote" href="images/chapter-ix-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-ch10-quote" href="images/chapter-x-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-ch11-quote" href="images/chapter-xi-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-ch12-quote" href="images/chapter-xii-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-ch13-quote" href="images/chapter-xiii-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-ch14-quote" href="images/chapter-xiv-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-ch15-quote" href="images/chapter-xv-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-ch16-quote" href="images/chapter-xvi-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-preface-quote" href="images/preface-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-conclusion-quote" href="images/conclusion-quote.jpeg" media-type="image/jpeg"/>
    <item id="img-chapter-frame" href="images/chapter-frame.svg" media-type="image/svg+xml"/>
    <item id="img-crown" href="images/crown-ornament.svg" media-type="image/svg+xml"/>
    <item id="img-decor-line" href="images/decorative-line.svg" media-type="image/svg+xml"/>
    <item id="img-endnote" href="images/endnote-marker.png" media-type="image/png"/>
    <item id="img-part-border" href="images/part-border.svg" media-type="image/svg+xml"/>
    <item id="img-quiz-check" href="images/quiz-checkbox.svg" media-type="image/svg+xml"/>
    <item id="img-quiz-checked" href="images/quiz-checkbox-checked.svg" media-type="image/svg+xml"/>
    <item id="img-quiz-unchecked" href="images/quiz-checkbox-unchecked.svg" media-type="image/svg+xml"/>
    <item id="img-quote-marks" href="images/quote-marks.svg" media-type="image/svg+xml"/>
    <item id="img-ruled-paper" href="images/ruled-paper.svg" media-type="image/svg+xml"/>
    <item id="img-toc-divider" href="images/toc-divider.svg" media-type="image/svg+xml"/>

    <!-- XHTML Content -->
    <item id="titlepage" href="xhtml/1-TitlePage.xhtml" media-type="application/xhtml+xml"/>
    <item id="copyright" href="xhtml/2-Copyright.xhtml" media-type="application/xhtml+xml"/>
    <item id="dedication" href="xhtml/4-Dedication.xhtml" media-type="application/xhtml+xml"/>
    <item id="selfassess1" href="xhtml/5-SelfAssessment.xhtml" media-type="application/xhtml+xml"/>
    <item id="affirmation" href="xhtml/6-AffirmationOdyssey.xhtml" media-type="application/xhtml+xml"/>
    <item id="preface" href="xhtml/7-Preface.xhtml" media-type="application/xhtml+xml"/>

    <item id="part1" href="xhtml/8-Part-I-Foundations-of-Creative-Hairstyling.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch1" href="xhtml/9-chapter-i-unveiling-your-creative-odyssey.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch1-quote" href="xhtml/9a-chapter-i-quote.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch2" href="xhtml/10-chapter-ii-refining-your-creative-toolkit.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch2-quote" href="xhtml/10a-chapter-ii-quote.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch3" href="xhtml/11-chapter-iii-reigniting-your-creative-fire.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch3-quote" href="xhtml/11a-chapter-iii-quote.xhtml" media-type="application/xhtml+xml"/>

    <item id="part2" href="xhtml/12-Part-II-Building-Your-Professional-Practice.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch4" href="xhtml/13-chapter-iv-the-art-of-networking-in-freelance-hairstyling.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch4-quote" href="xhtml/13a-chapter-iv-quote.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch5" href="xhtml/14-chapter-v-cultivating-creative-excellence-through-mentorship.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch5-quote" href="xhtml/14a-chapter-v-quote.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch6" href="xhtml/15-chapter-vi-mastering-the-business-of-hairstyling.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch6-quote" href="xhtml/15a-chapter-vi-quote.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch7" href="xhtml/16-chapter-vii-embracing-wellness-and-self-care.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch7-quote" href="xhtml/16a-chapter-vii-quote.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch8" href="xhtml/17-chapter-viii-advancing-skills-through-continuous-education.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch8-quote" href="xhtml/17a-chapter-viii-quote.xhtml" media-type="application/xhtml+xml"/>

    <item id="part3" href="xhtml/18-Part-III-Advanced-Business-Strategies.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch9" href="xhtml/19-chapter-ix-stepping-into-leadership.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch9-quote" href="xhtml/19a-chapter-ix-quote.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch10" href="xhtml/20-chapter-x-crafting-enduring-legacies.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch10-quote" href="xhtml/20a-chapter-x-quote.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch11" href="xhtml/21-chapter-xi-advanced-digital-strategies-for-freelance-hairstylists.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch11-quote" href="xhtml/21a-chapter-xi-quote.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch12" href="xhtml/22-chapter-xii-financial-wisdom-building-sustainable-ventures.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch12-quote" href="xhtml/22a-chapter-xii-quote.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch13" href="xhtml/23-chapter-xiii-embracing-ethics-and-sustainability-in-hairstyling.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch13-quote" href="xhtml/23a-chapter-xiii-quote.xhtml" media-type="application/xhtml+xml"/>

    <item id="part4" href="xhtml/24-Part-IV-Future-Focused-Growth.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch14" href="xhtml/25-chapter-xiv-the-impact-of-ai-on-the-beauty-industry.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch14-quote" href="xhtml/25a-chapter-xiv-quote.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch15" href="xhtml/26-chapter-xv-cultivating-resilience-and-well-being-in-hairstyling.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch15-quote" href="xhtml/26a-chapter-xv-quote.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch16" href="xhtml/27-chapter-xvi-tresses-and-textures-embracing-diversity-in-hairstyling.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch16-quote" href="xhtml/27a-chapter-xvi-quote.xhtml" media-type="application/xhtml+xml"/>

    <item id="conclusion" href="xhtml/28-Conclusion.xhtml" media-type="application/xhtml+xml"/>
    <item id="quizkey" href="xhtml/29-QuizKey.xhtml" media-type="application/xhtml+xml"/>
    <item id="selfassess2" href="xhtml/30-SelfAssessment.xhtml" media-type="application/xhtml+xml"/>
    <item id="affirmclose" href="xhtml/31-affirmations-close.xhtml" media-type="application/xhtml+xml"/>
    <item id="learning" href="xhtml/32-continued-learning-commitment.xhtml" media-type="application/xhtml+xml"/>
    <item id="ack" href="xhtml/33-Acknowledgments.xhtml" media-type="application/xhtml+xml"/>
    <item id="about" href="xhtml/34-AbouttheAuthor.xhtml" media-type="application/xhtml+xml"/>
    <item id="collective" href="xhtml/35-CurlsContempCollective.xhtml" media-type="application/xhtml+xml"/>
    <item id="journal-start" href="xhtml/36-JournalingStart.xhtml" media-type="application/xhtml+xml"/>
    <item id="journal-manifest" href="xhtml/37-ManifestingJournal.xhtml" media-type="application/xhtml+xml"/>
    <item id="journal-page" href="xhtml/38-journal-page.xhtml" media-type="application/xhtml+xml"/>
    <item id="journal-profdev" href="xhtml/39-professional-development.xhtml" media-type="application/xhtml+xml"/>
    <item id="journal-smart" href="xhtml/40-SMARTGoals.xhtml" media-type="application/xhtml+xml"/>
    <item id="journal-selfcare" href="xhtml/41-self-care-journal.xhtml" media-type="application/xhtml+xml"/>
    <item id="journal-vision" href="xhtml/42-VisionJournal.xhtml" media-type="application/xhtml+xml"/>
    <item id="journal-doodle" href="xhtml/43-DoodlePage.xhtml" media-type="application/xhtml+xml"/>
    <item id="biblio" href="xhtml/44-bibliography.xhtml" media-type="application/xhtml+xml"/>
  </manifest>

  <spine>
    <itemref idref="titlepage"/>
    <itemref idref="copyright"/>
    <itemref idref="toc"/>
    <itemref idref="dedication"/>
    <itemref idref="selfassess1"/>
    <itemref idref="affirmation"/>
    <itemref idref="preface"/>

    <itemref idref="part1"/>
    <itemref idref="ch1"/>
    <itemref idref="ch1-quote"/>
    <itemref idref="ch2"/>
    <itemref idref="ch2-quote"/>
    <itemref idref="ch3"/>
    <itemref idref="ch3-quote"/>

    <itemref idref="part2"/>
    <itemref idref="ch4"/>
    <itemref idref="ch4-quote"/>
    <itemref idref="ch5"/>
    <itemref idref="ch5-quote"/>
    <itemref idref="ch6"/>
    <itemref idref="ch6-quote"/>
    <itemref idref="ch7"/>
    <itemref idref="ch7-quote"/>
    <itemref idref="ch8"/>
    <itemref idref="ch8-quote"/>

    <itemref idref="part3"/>
    <itemref idref="ch9"/>
    <itemref idref="ch9-quote"/>
    <itemref idref="ch10"/>
    <itemref idref="ch10-quote"/>
    <itemref idref="ch11"/>
    <itemref idref="ch11-quote"/>
    <itemref idref="ch12"/>
    <itemref idref="ch12-quote"/>
    <itemref idref="ch13"/>
    <itemref idref="ch13-quote"/>

    <itemref idref="part4"/>
    <itemref idref="ch14"/>
    <itemref idref="ch14-quote"/>
    <itemref idref="ch15"/>
    <itemref idref="ch15-quote"/>
    <itemref idref="ch16"/>
    <itemref idref="ch16-quote"/>

    <itemref idref="conclusion"/>
    <itemref idref="quizkey"/>
    <itemref idref="selfassess2"/>
    <itemref idref="affirmclose"/>
    <itemref idref="learning"/>
    <itemref idref="ack"/>
    <itemref idref="about"/>
    <itemref idref="collective"/>
    <itemref idref="journal-start"/>
    <itemref idref="journal-manifest"/>
    <itemref idref="journal-page"/>
    <itemref idref="journal-profdev"/>
    <itemref idref="journal-smart"/>
    <itemref idref="journal-selfcare"/>
    <itemref idref="journal-vision"/>
    <itemref idref="journal-doodle"/>
    <itemref idref="biblio"/>
  </spine>

  <guide>
    <reference type="cover" title="Cover" href="xhtml/1-TitlePage.xhtml"/>
    <reference type="toc" title="Table of Contents" href="xhtml/3-TableOfContents.xhtml"/>
    <reference type="text" title="Beginning" href="xhtml/7-Preface.xhtml"/>
  </guide>
</package>
EOF
print_success "content.opf created"

# Step 6: Package EPUB
print_step "Packaging EPUB file..."
cd "$EPUB_DIR"

# Create EPUB zip (mimetype must be first and uncompressed)
zip -0Xq "../temp.epub" mimetype
zip -Xr9Dq "../temp.epub" META-INF OEBPS

cd ../..
mv "$BUILD_DIR/temp.epub" "$OUTPUT_FILE"

print_success "EPUB packaged successfully"

# Step 7: Validate EPUB (if epubcheck is available)
if command -v epubcheck &> /dev/null; then
    print_step "Validating EPUB with epubcheck..."
    if epubcheck "$OUTPUT_FILE"; then
        print_success "EPUB validation passed!"
    else
        print_warning "EPUB validation had warnings (this is often okay)"
    fi
else
    print_warning "epubcheck not found - skipping validation"
    print_warning "Install with: sudo apt-get install epubcheck"
fi

# Step 8: Summary
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║              BUILD COMPLETED SUCCESSFULLY!                   ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${CYAN}📚 EPUB Details:${NC}"
echo -e "   Title:    $BOOK_TITLE"
echo -e "   Subtitle: $BOOK_SUBTITLE"
echo -e "   Author:   $AUTHOR"
echo -e "   ISBN:     $ISBN"
echo -e "   Version:  $VERSION"
echo ""
echo -e "${CYAN}📦 Output File:${NC}"
echo -e "   ${GREEN}$OUTPUT_FILE${NC}"
echo -e "   Size: $(du -h "$OUTPUT_FILE" | cut -f1)"
echo ""
echo -e "${CYAN}📊 Statistics:${NC}"
echo -e "   XHTML files: $(ls -1 $EPUB_DIR/OEBPS/xhtml/*.xhtml 2>/dev/null | wc -l)"
echo -e "   Images:      $(ls -1 $EPUB_DIR/OEBPS/images/* 2>/dev/null | wc -l)"
echo -e "   Fonts:       $(ls -1 $EPUB_DIR/OEBPS/fonts/* 2>/dev/null | wc -l)"
echo -e "   CSS files:   $(ls -1 $EPUB_DIR/OEBPS/styles/*.css 2>/dev/null | wc -l)"
echo ""
echo -e "${CYAN}🎯 Next Steps:${NC}"
echo -e "   1. Test in Calibre:  ${YELLOW}ebook-viewer \"$OUTPUT_FILE\"${NC}"
echo -e "   2. Convert to PDF:   ${YELLOW}./build-pdf.sh${NC}"
echo -e "   3. Preview online:   Open http://127.0.0.1:8080/preview-index.html"
echo ""
