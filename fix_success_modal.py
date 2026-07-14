import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

content = content.replace(
    '<Check className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />',
    '<Check className="w-10 h-10 text-emerald-500" />'
)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
