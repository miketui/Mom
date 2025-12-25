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

# Check if source directory has files and count them
SOURCE_COUNT="$(find "$SOURCE_DIR" -maxdepth 1 -type f | wc -l)"
if [ "$SOURCE_COUNT" -eq 0 ]; then
    echo -e "${YELLOW}Warning: No files found in $SOURCE_DIR${NC}"
    exit 0
fi

# Copy images (files only, not directories) - using xargs for better performance
echo -e "${BLUE}Copying images from $SOURCE_DIR to $DEST_DIR...${NC}"
find "$SOURCE_DIR" -maxdepth 1 -type f -print0 | xargs -0 -I {} cp -fv {} "$DEST_DIR/"

# Count destination files using find for reliability
DEST_COUNT="$(find "$DEST_DIR" -maxdepth 1 -type f | wc -l)"

echo ""
echo -e "${GREEN}✓ Synchronization complete!${NC}"
echo ""
echo "Summary:"
echo "  Source files:      $SOURCE_COUNT"
echo "  Destination files: $DEST_COUNT"
echo ""
echo -e "${BLUE}Note:${NC} Book/images may contain additional files not present in READY/xhtml/images"
