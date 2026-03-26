# VHS documentation
# https://github.com/charmbracelet/vhs#installation

Output d2b5_tmux_2x2_opencode.mp4

Require tmux
Require opencode

Set Shell "zsh"
Set FontSize 24
Set Width 1800
Set Height 1000
Set TypingSpeed 120ms

# Build a 2x2 tmux grid in four different dirs
Type "tmux new-session -d -s d2b5 -c ~/Documents/dev/ws_genai_eb"
Enter
Sleep 1s

Type "tmux split-window -h -t d2b5:0 -c ~/Documents/dev/ws_genai_eb/slides"
Enter
Sleep 1s

Type "tmux split-window -v -t d2b5:0.0 -c ~/Documents/dev/ws_genai_eb/resources"
Enter
Sleep 1s

Type "tmux split-window -v -t d2b5:0.1 -c ~/Documents/dev/ws_genai_eb/website"
Enter
Sleep 1s

# Start OpenCode in each pane
Type "tmux send-keys -t d2b5:0.0 'opencode' C-m"
Enter
Type "tmux send-keys -t d2b5:0.1 'opencode' C-m"
Enter
Type "tmux send-keys -t d2b5:0.2 'opencode' C-m"
Enter
Type "tmux send-keys -t d2b5:0.3 'opencode' C-m"
Enter
Sleep 6s

# Send one scoped prompt per pane (different directory context)
Type "tmux send-keys -t d2b5:0.0 'Summarize what this repository root is for in one sentence.' C-m"
Enter
Type "tmux send-keys -t d2b5:0.1 'List slide block files in this folder and suggest one edit.' C-m"
Enter
Type "tmux send-keys -t d2b5:0.2 'Inspect resources here and name 3 useful anchors for Day 2.' C-m"
Enter
Type "tmux send-keys -t d2b5:0.3 'List docs pages and propose one workflow page improvement.' C-m"
Enter

# Attach to show all panes live
Type "tmux attach -t d2b5"
Enter
Sleep 30s
