# VHS documentation
# https://github.com/charmbracelet/vhs#installation

Output memory_policy_workflow.mp4

Require opencode

Set Shell "zsh"
Set FontSize 28
Set Width 1600
Set Height 900
Set TypingSpeed 140ms

Type "mkdir -p ~/memory-demo && cd ~/memory-demo"
Enter
Sleep 1s

Type "printf '# AGENTS.md\n\n## Memory policy\n- Load MEMORY.md at session start.\n- If user says remember this, append it to MEMORY.md.\n' > AGENTS.md"
Enter
Sleep 1s

Type "touch MEMORY.md"
Enter
Sleep 1s

Hide
Type "opencode"
Enter
Sleep 6s
Show

Type "Remember this: Team 3 prefers concise bullet feedback."
Enter
Sleep 20s

Type "Show what you stored in memory."
Enter
Sleep 20s
