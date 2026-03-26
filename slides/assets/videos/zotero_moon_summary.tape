# VHS documentation
# https://github.com/charmbracelet/vhs#installation

Output zotero_moon_summary.mp4

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

# Ask OpenCode to use Zotero collection and summarize
Sleep 1s
Type "Look in the Zotero collection llm_sensitive for the 2024 paper by Moon and give a 1-sentence summary of it."
Enter

# Let the model work
Sleep 100s
