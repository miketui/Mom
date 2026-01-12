#!/bin/bash
#
# Stop Book XHTML Viewer Server
#

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_msg() {
    local color=$1
    shift
    echo -e "${color}$@${NC}"
}

PID_FILE="/tmp/book-viewer.pid"
PORT=3456

# Check if PID file exists
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null 2>&1; then
        kill $PID
        print_msg "$GREEN" "✅ Stopped server (PID: $PID)"
        rm -f "$PID_FILE"
    else
        print_msg "$YELLOW" "⚠️  Server not running (stale PID file)"
        rm -f "$PID_FILE"
    fi
fi

# Also kill any process on the port
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    lsof -ti:$PORT | xargs kill -9 2>/dev/null || true
    print_msg "$GREEN" "✅ Killed process on port $PORT"
else
    print_msg "$YELLOW" "ℹ️  No server running on port $PORT"
fi
