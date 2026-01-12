# Book XHTML Viewer Guide

A comprehensive system for viewing your Book XHTML files with full styling, fonts, and images.

## Overview

This setup includes two viewing options:
1. **Web-based Viewer** - Full visual rendering with CSS, fonts, and images
2. **Canvas Integration** - Terminal UI for file navigation and launching the web viewer

## Quick Start

### Option 1: Direct Web Viewer (Recommended for Visual Preview)

```bash
# Start the web server
./launch-book-viewer.sh

# Server will start at http://localhost:3456
# Browser will open automatically (if available)
```

### Option 2: Canvas Integration (Terminal UI + Web Viewer)

```bash
# Launch the canvas in tmux
./canvas-launcher.sh launch book-viewer

# From the canvas interface:
# - Press S to start the web server
# - Use arrow keys to navigate chapters
# - Press O to open selected chapter in browser
```

## Features

### Web Viewer Features

- 📖 **Complete Book Navigation** - Browse all 46 chapters
- 🎨 **Full Styling** - All CSS, fonts, and images render properly
- 🔍 **Chapter Preview** - Side-by-side navigation and content
- ⏭️ **Next/Previous** - Easy chapter navigation buttons
- 📱 **Responsive** - Works on desktop and mobile browsers

### Canvas Features

- 🖥️ **Terminal UI** - Browse chapters in your terminal
- 🚀 **One-Key Launch** - Press 'S' to start/stop server
- 🔗 **Direct Opening** - Press 'O' to open chapter in browser
- ⌨️ **Keyboard Navigation** - Arrow keys, shortcuts
- 📊 **Live Status** - See server status and chapter count

## File Structure

Your book content is organized as follows:

```
Book/OEBPS/
├── xhtml/          # 46 XHTML chapter files
│   ├── 1-TitlePage.xhtml
│   ├── 2-Copyright.xhtml
│   ├── ...
│   └── 46-Acknowledgments.xhtml
├── style/          # CSS stylesheets
│   ├── style.css   # Main styles (Teal & Gold theme)
│   ├── fonts.css   # Font definitions
│   └── print.css   # Print-specific styles
├── fonts/          # Web fonts
│   ├── CinzelDecorative.woff2
│   ├── Montserrat-Bold.woff2
│   ├── Montserrat-Regular.woff2
│   └── librebaskerville-*.woff2
└── images/         # All book images
    ├── cover.png
    ├── chapter-*-quote.jpeg
    └── *.svg decorative elements
```

## Usage Guide

### Using the Web Viewer

#### Start the Server

```bash
./launch-book-viewer.sh
```

This will:
1. Start the Bun server on port 3456
2. Serve your book files with proper MIME types
3. Attempt to open your default browser
4. Display the server URL

#### Navigate the Book

1. **Home Page** - Shows all chapters in a list
2. **Click any chapter** - Opens the viewer with navigation sidebar
3. **Use Previous/Next buttons** - Navigate between chapters
4. **Click Home** - Return to chapter list

#### Stop the Server

```bash
# Press Ctrl+C in the terminal, or run:
./stop-book-viewer.sh
```

### Using the Canvas Integration

#### Launch Canvas

```bash
# Start tmux session with canvas
./canvas-launcher.sh launch book-viewer
```

#### Canvas Controls

| Key | Action |
|-----|--------|
| `↑` / `↓` | Navigate through chapters |
| `S` | Start/Stop web server |
| `O` | Open selected chapter in browser (requires server running) |
| `Q` or `Ctrl+C` | Quit (auto-stops server) |

#### Workflow

1. Launch canvas: `./canvas-launcher.sh launch book-viewer`
2. Press `S` to start the web server
3. Use arrow keys to select a chapter
4. Press `O` to open it in your browser
5. Browser shows the chapter with full styling
6. Press `Q` to quit (server stops automatically)

## Configuration

### Port Configuration

Default port: `3456`

To change the port, edit these files:
- `book-viewer-server.ts` - Change `PORT` constant
- `launch-book-viewer.sh` - Change `PORT` variable
- `stop-book-viewer.sh` - Change `PORT` variable

### Browser Selection

The launcher tries to open browsers in this order:
1. `xdg-open` (Linux)
2. `open` (macOS)

To use a specific browser:
```bash
# Start server without auto-opening browser
bun run book-viewer-server.ts

# Then manually open your preferred browser to:
http://localhost:3456
```

## Styling Details

Your book uses the **ACISS Design System**:

### Colors
- **Teal Primary**: `#2B9999` (Main theme color)
- **Gold Accent**: `#C9A961` (Highlights and accents)
- **Neutrals**: Various shades for text and backgrounds

### Fonts
- **Display**: Cinzel Decorative (Titles, headers)
- **Body**: Libre Baskerville (Main content)
- **Sans**: Montserrat (UI elements, headers)

### Design Features
- Decorative corner elements
- Custom chapter frames
- Quote images for each chapter
- SVG ornaments and dividers
- Responsive typography

## Troubleshooting

### Server Won't Start

**Issue**: Port already in use

```bash
# Check what's using port 3456
lsof -i :3456

# Kill the process
./stop-book-viewer.sh

# Try again
./launch-book-viewer.sh
```

### Browser Doesn't Open

**Issue**: No browser found

```bash
# Manually open browser to:
http://localhost:3456
```

### Canvas Shows "Server STOPPED"

**Issue**: Server not running

- Press `S` in the canvas to start the server
- Wait 2-3 seconds for startup
- Status will change to "● RUNNING"

### Images Not Loading

**Issue**: Incorrect file paths

- Ensure you're in the project root directory
- Check that `Book/OEBPS/images/` exists
- Verify image files are present

### Styling Not Applied

**Issue**: CSS files not loading

- Check `Book/OEBPS/style/` directory exists
- Verify CSS files are present
- Check browser console for 404 errors

## Advanced Usage

### Running Server in Background

```bash
# Start server in background
bun run book-viewer-server.ts &

# Save PID
echo $! > /tmp/book-viewer.pid

# Later, kill it
kill $(cat /tmp/book-viewer.pid)
```

### Viewing Specific Chapter

```bash
# Direct URL to a chapter
http://localhost:3456/view/10-chapter-ii-refining-your-creative-toolkit.xhtml
```

### API Endpoints

The server provides these endpoints:

| Endpoint | Description |
|----------|-------------|
| `/` | Home page with chapter list |
| `/view/<filename>` | Viewer page for specific chapter |
| `/xhtml/<filename>` | Raw XHTML file |
| `/style/<file>` | CSS files |
| `/fonts/<file>` | Font files |
| `/images/<file>` | Image files |

## Integration with Claude Code

When working with Claude Code CLI, you can ask Claude to:

```
"Show me chapter 5 in the book viewer"
"Open the book viewer canvas"
"View the book content"
```

Claude can then launch the canvas and help navigate your book content.

## Tips & Best Practices

1. **Keep Server Running** - Start once, browse multiple chapters
2. **Use Canvas for Quick Preview** - Great for finding specific chapters
3. **Use Web Viewer for Reading** - Better experience with full styling
4. **Bookmark Chapters** - Browser bookmarks work for direct access
5. **Split Screen** - View canvas and browser side-by-side in tmux

## Keyboard Shortcuts Summary

### Canvas (Terminal)
- `↑/↓` - Navigate chapters
- `S` - Toggle server
- `O` - Open in browser
- `Q` - Quit

### Web Viewer (Browser)
- Click "Previous" / "Next" - Chapter navigation
- Click chapter in sidebar - Jump to chapter
- `Ctrl+F` - Search within page
- Browser back/forward - Navigation history

## System Requirements

- **Bun** v1.3.5+ (for server)
- **tmux** v3.4+ (for canvas, optional)
- **Modern browser** (Chrome, Firefox, Safari, Edge)
- **Linux or macOS** (Windows via WSL)

## Files Reference

| File | Purpose |
|------|---------|
| `book-viewer-server.ts` | Main web server |
| `launch-book-viewer.sh` | Server launcher script |
| `stop-book-viewer.sh` | Server stop script |
| `/tmp/claude-canvas/canvas/src/canvases/book-viewer.tsx` | Canvas component |
| `canvas-launcher.sh` | Canvas launcher (updated) |

## Support

If you encounter issues:

1. Check that all files are in place
2. Verify Bun and tmux are installed
3. Ensure port 3456 is available
4. Check file permissions (scripts should be executable)
5. Review server output for errors

## Next Steps

- [ ] Explore all 46 chapters
- [ ] Bookmark favorite chapters
- [ ] Try both viewing methods
- [ ] Customize port if needed
- [ ] Share viewer URL on local network (optional)

---

**Enjoy browsing your beautiful book! 📚✨**
