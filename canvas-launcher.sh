#!/bin/bash
#
# Claude Canvas Launcher
# Convenience script for launching Claude Canvas in tmux
#

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

CANVAS_DIR="/tmp/claude-canvas"
SESSION_NAME="canvas"

# Print colored message
print_msg() {
    local color=$1
    shift
    echo -e "${color}$@${NC}"
}

# Check prerequisites
check_prereqs() {
    if ! command -v tmux &> /dev/null; then
        print_msg "$RED" "❌ Error: tmux is not installed"
        exit 1
    fi

    if ! command -v bun &> /dev/null; then
        print_msg "$RED" "❌ Error: bun is not installed"
        exit 1
    fi

    if [ ! -d "$CANVAS_DIR" ]; then
        print_msg "$RED" "❌ Error: Claude Canvas not found at $CANVAS_DIR"
        print_msg "$YELLOW" "Please run the installation first"
        exit 1
    fi
}

# Show help
show_help() {
    cat << EOF
${GREEN}Claude Canvas Launcher${NC}

${BLUE}Usage:${NC}
  ./canvas-launcher.sh <command> [canvas-type]

${BLUE}Commands:${NC}
  launch <type>     Launch a specific canvas type in tmux
  list              List available canvas types
  status            Check tmux session status
  attach            Attach to existing canvas session
  kill              Kill the canvas tmux session
  help              Show this help message

${BLUE}Available Canvas Types:${NC}
  calendar          Calendar management interface
  document          Document editing/viewing
  flight            Flight booking interface
  flight-tracker    Flight tracking display
  system            System resource monitoring
  weather           Weather information display

${BLUE}Examples:${NC}
  ./canvas-launcher.sh launch calendar
  ./canvas-launcher.sh launch system
  ./canvas-launcher.sh attach
  ./canvas-launcher.sh list

${YELLOW}Note:${NC} Canvas will open in a split tmux pane
EOF
}

# List available canvas types
list_canvases() {
    print_msg "$GREEN" "📋 Available Canvas Types:"
    echo ""
    if [ -d "$CANVAS_DIR/canvas/src/canvases" ]; then
        cd "$CANVAS_DIR/canvas/src/canvases"
        for canvas in *.tsx; do
            name="${canvas%.tsx}"
            if [ "$name" != "index" ]; then
                print_msg "$BLUE" "  • $name"
            fi
        done
    fi
}

# Check session status
check_status() {
    if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
        print_msg "$GREEN" "✓ Canvas session '$SESSION_NAME' is running"
        tmux list-panes -t "$SESSION_NAME" -F "  Pane #{pane_index}: #{pane_current_command}"
    else
        print_msg "$YELLOW" "⚠ No canvas session running"
    fi
}

# Launch canvas
launch_canvas() {
    local canvas_type=$1

    if [ -z "$canvas_type" ]; then
        print_msg "$RED" "❌ Error: Please specify a canvas type"
        echo ""
        list_canvases
        exit 1
    fi

    # Check if session exists
    if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
        print_msg "$YELLOW" "⚠ Session '$SESSION_NAME' already exists"
        read -p "Kill existing session and create new one? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            tmux kill-session -t "$SESSION_NAME"
        else
            print_msg "$BLUE" "Use './canvas-launcher.sh attach' to join existing session"
            exit 0
        fi
    fi

    print_msg "$GREEN" "🚀 Launching Claude Canvas with $canvas_type..."

    # Create new tmux session with canvas
    tmux new-session -d -s "$SESSION_NAME" -c "$CANVAS_DIR"
    tmux send-keys -t "$SESSION_NAME" "cd $CANVAS_DIR && bun run canvas/src/cli.ts spawn $canvas_type" C-m

    print_msg "$GREEN" "✓ Canvas launched successfully!"
    print_msg "$BLUE" "📌 Attaching to session..."
    sleep 1

    # Attach to the session
    tmux attach-session -t "$SESSION_NAME"
}

# Attach to existing session
attach_session() {
    if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
        print_msg "$GREEN" "🔗 Attaching to canvas session..."
        tmux attach-session -t "$SESSION_NAME"
    else
        print_msg "$RED" "❌ No canvas session found"
        print_msg "$YELLOW" "Use './canvas-launcher.sh launch <type>' to start a new session"
    fi
}

# Kill session
kill_session() {
    if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
        tmux kill-session -t "$SESSION_NAME"
        print_msg "$GREEN" "✓ Canvas session killed"
    else
        print_msg "$YELLOW" "⚠ No canvas session to kill"
    fi
}

# Main script
main() {
    check_prereqs

    case "${1:-help}" in
        launch)
            launch_canvas "$2"
            ;;
        list)
            list_canvases
            ;;
        status)
            check_status
            ;;
        attach)
            attach_session
            ;;
        kill)
            kill_session
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_msg "$RED" "❌ Unknown command: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

main "$@"
