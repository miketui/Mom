#!/bin/bash
#
# Book XHTML Viewer Launcher
# Starts the web server and optionally opens in browser
#

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

PORT=3456
URL="http://localhost:$PORT"

print_msg() {
    local color=$1
    shift
    echo -e "${color}$@${NC}"
}

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    print_msg "$YELLOW" "❌ Error: Bun is not installed"
    exit 1
fi

# Kill any existing server on the port
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    print_msg "$YELLOW" "⚠️  Port $PORT is in use, attempting to kill existing process..."
    lsof -ti:$PORT | xargs kill -9 2>/dev/null || true
    sleep 1
fi

print_msg "$GREEN" "🚀 Starting Book XHTML Viewer Server..."

# Start the server in the background
bun run book-viewer-server.ts &
SERVER_PID=$!

# Wait for server to be ready
sleep 2

# Check if server is running
if ! ps -p $SERVER_PID > /dev/null 2>&1; then
    print_msg "$YELLOW" "❌ Failed to start server"
    exit 1
fi

print_msg "$GREEN" "✅ Server started successfully (PID: $SERVER_PID)"
print_msg "$BLUE" "🌐 URL: $URL"

# Try to open in browser
if command -v xdg-open &> /dev/null; then
    xdg-open "$URL" 2>/dev/null &
    print_msg "$GREEN" "📖 Opening browser..."
elif command -v open &> /dev/null; then
    open "$URL" 2>/dev/null &
    print_msg "$GREEN" "📖 Opening browser..."
else
    print_msg "$YELLOW" "ℹ️  Please open your browser and navigate to: $URL"
fi

print_msg "$BLUE" "\nServer is running. Press Ctrl+C to stop.\n"

# Save PID to file for later cleanup
echo $SERVER_PID > /tmp/book-viewer.pid

# Wait for server process
wait $SERVER_PID
