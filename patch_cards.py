import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find = r'transition-all duration-300 hover:scale-\[1.02\] hover:border-neutral-300 dark:hover:border-zinc-700/80'
repl = r'transition-all duration-300 hover-3d-loop hover:border-neutral-300 dark:hover:border-zinc-700/80'
content = content.replace(find, repl)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
