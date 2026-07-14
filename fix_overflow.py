import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

old_wrapper = '<div className="bg-white dark:bg-[#111111] border border-neutral-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">'
new_wrapper = '<div className="bg-white dark:bg-[#111111] border border-neutral-200 dark:border-zinc-800 rounded-xl overflow-visible shadow-sm">'
content = content.replace(old_wrapper, new_wrapper)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
