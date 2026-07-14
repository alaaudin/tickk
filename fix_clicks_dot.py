import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

content = content.replace(
    '<div className={`w-2.5 h-2.5 rounded-full ${tracker.clickCount > 0 ? "bg-emerald-500 animate-ping" : "bg-zinc-300"}`} />',
    ''
)
content = content.replace(
    '<div className={`w-2.5 h-2.5 rounded-full ${tracker.clickCount > 0 ? "bg-emerald-500 opacity-80" : "bg-zinc-300"}`} />',
    ''
)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
