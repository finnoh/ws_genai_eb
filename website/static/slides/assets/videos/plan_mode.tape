# VHS documentation
# https://github.com/charmbracelet/vhs#installation

Output plan_mode.mp4

Require opencode

Set Shell "zsh"
Set FontSize 28
Set Width 1600
Set Height 900
Set TypingSpeed 140ms

# Start OpenCode without showing setup command
Hide
Type "opencode"
Enter
Sleep 6s
Show

# Shift to plan mode
Sleep 1s
Tab
Enter
Sleep 1s

# Ask for a plan only
Type "Create a plan to write a Python module implementing ridge regression. Include module structure, function signatures, validation, tests, and usage example. Do not write code yet."
Enter

# Let the model work in plan mode
Sleep 40s

# Switch back to build mode
Tab
Enter
Sleep 1s

# Trigger execution
Type "go"
Enter
Sleep 4s
