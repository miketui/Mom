#!/bin/bash
################################################################################
# Image Synchronization Script
# Copies images from READY/xhtml/images to Book/images/
################################################################################

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Directories
SOURCE_DIR="READY/xhtml/images"
DEST_DIR="Book/images"

echo -e "${BLUE}Image Synchronization Tool${NC}"
echo "================================"
echo ""

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${YELLOW}Error: Source directory $SOURCE_DIR not found${NC}"
    exit 1
fi

# Create destination directory if it doesn't exist
if [ ! -d "$DEST_DIR" ]; then
    echo -e "${BLUE}Creating destination directory: $DEST_DIR${NC}"
    mkdir -p "$DEST_DIR"
fi

# Copy images
echo -e "${BLUE}Copying images from $SOURCE_DIR to $DEST_DIR...${NC}"
cp -v "$SOURCE_DIR"/* "$DEST_DIR/"

# Count files
SOURCE_COUNT=$(ls -1 "$SOURCE_DIR" | wc -l)
DEST_COUNT=$(ls -1 "$DEST_DIR" | wc -l)

echo ""
echo -e "${GREEN}✓ Synchronization complete!${NC}"
echo ""
echo "Summary:"
echo "  Source files:      $SOURCE_COUNT"
echo "  Destination files: $DEST_COUNT"
echo ""
echo -e "${BLUE}Note:${NC} Book/images may contain additional files not present in READY/xhtml/images"
echo ""
