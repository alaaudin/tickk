import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

content = content.replace(
    'px-2 py-0.5 rounded text-[9px] font-semibold tracking-wider text-neutral-900 dark:text-white inline-flex items-center gap-1 font-mono shadow-sm"',
    'px-2 py-0.5 rounded text-[9px] font-semibold tracking-wider text-neutral-900 dark:text-white inline-flex items-center gap-1 font-mono shadow-none"'
)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
