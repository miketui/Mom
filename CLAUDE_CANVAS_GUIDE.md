# Claude Canvas Setup Guide

This guide explains how to use Claude Canvas with this project.

## What is Claude Canvas?

Claude Canvas is a TUI (Text-based User Interface) toolkit that extends Claude Code with split-pane interactive interfaces. It allows you to see real-time visual feedback in terminal split panes while working with Claude.

## Prerequisites

- ✅ **Bun** v1.3.5+ (installed)
- ✅ **tmux** v3.4+ (installed)
- ✅ **Claude Canvas** (installed at `/tmp/claude-canvas`)

## Quick Start

### Using the Convenience Script

We've included a `canvas-launcher.sh` script for easy access:

```bash
# Launch a calendar interface
./canvas-launcher.sh launch calendar

# Launch system monitoring
./canvas-launcher.sh launch system

# Launch weather display
./canvas-launcher.sh launch weather
```

### Available Commands

```bash
./canvas-launcher.sh list              # List all available canvas types
./canvas-launcher.sh status            # Check if a session is running
./canvas-launcher.sh attach            # Attach to existing session
./canvas-launcher.sh kill              # Kill the canvas session
./canvas-launcher.sh help              # Show detailed help
```

## Available Canvas Types

| Canvas Type | Description |
|------------|-------------|
| `calendar` | Interactive calendar management interface |
| `document` | Document editing and viewing |
| `flight` | Flight booking interface |
| `flight-tracker` | Real-time flight tracking display |
| `system` | System resource monitoring (CPU, memory, etc.) |
| `weather` | Weather information and forecasts |

## Manual Usage (Without Script)

If you prefer to launch canvas manually:

```bash
# 1. Start a tmux session
tmux new-session -s my-canvas

# 2. Navigate to Claude Canvas
cd /tmp/claude-canvas

# 3. Spawn a canvas
bun run canvas/src/cli.ts spawn calendar
```

## Tmux Navigation

When inside a canvas session:

| Shortcut | Action |
|----------|--------|
| `Ctrl+b` then `%` | Split pane vertically |
| `Ctrl+b` then `"` | Split pane horizontally |
| `Ctrl+b` then `←` `→` `↑` `↓` | Navigate between panes |
| `Ctrl+b` then `d` | Detach from session (keeps running) |
| `Ctrl+b` then `x` | Close current pane |
| `Ctrl+b` then `z` | Zoom/unzoom current pane |

## Integration with Claude Code

Claude Canvas works seamlessly with Claude Code CLI. When you ask Claude to:
- Check your calendar
- Monitor system resources
- Book a flight
- Check the weather

Claude can spawn the appropriate canvas interface in a split pane and interact with it in real-time.

## Troubleshooting

### "No supported terminal detected"
- **Solution**: Make sure you're running inside a tmux session
- Run: `tmux new-session -s test` before launching canvas

### Canvas won't start
- **Solution**: Check that Bun and tmux are installed
- Run: `./canvas-launcher.sh status` to diagnose

### Session already exists
- **Solution**: Either attach to it or kill it
- Attach: `./canvas-launcher.sh attach`
- Kill: `./canvas-launcher.sh kill`

## Example Workflow

```bash
# 1. Launch system monitoring canvas
./canvas-launcher.sh launch system

# 2. You'll see:
#    - Left pane: Your terminal
#    - Right pane: Live system stats

# 3. Detach from session (keeps running in background)
# Press: Ctrl+b, then d

# 4. Later, reattach to the same session
./canvas-launcher.sh attach

# 5. When done, kill the session
./canvas-launcher.sh kill
```

## Advanced: Custom Canvas

To create your own canvas interface, check the examples at:
```
/tmp/claude-canvas/canvas/src/canvases/
```

Each `.tsx` file is a React-based terminal UI component using the Ink framework.

## Resources

- **Claude Canvas GitHub**: https://github.com/BEARLY-HODLING/claude-canvas
- **tmux Documentation**: https://github.com/tmux/tmux/wiki
- **Ink (React for CLI)**: https://github.com/vadimdemedes/ink

## Tips

1. **Persistent Sessions**: tmux sessions persist even if you close your terminal window
2. **Multiple Canvases**: Launch different canvas types in separate tmux sessions
3. **Scripting**: Use the launcher script in your own automation workflows
4. **Detach Often**: Don't kill sessions - detach and reattach as needed

---

**Note**: Claude Canvas is installed in `/tmp/claude-canvas` and will persist until you reboot or clean `/tmp`. For permanent installation, consider cloning it to a different location.
