import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# Fix AnimationType
content = content.replace('type: "spring"', 'type: "spring" as const')
content = content.replace('type: "tween"', 'type: "tween" as const')

# Fix Tracker title -> subject (probably)
# Wait, let's look at the lines
import subprocess
out = subprocess.getoutput("grep -n '\.title' src/components/Dashboard.tsx")
print("Title matches in Dashboard:", out)

