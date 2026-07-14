import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find = r'<span className="bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 px-2 py-0\.5 rounded text-\[9px\] font-semibold tracking-wider text-neutral-900 dark:text-white inline-flex items-center gap-1 ml-2 font-mono">'
repl = r'<span className="bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 px-2 py-0.5 rounded text-[9px] font-semibold tracking-wider text-neutral-900 dark:text-white inline-flex items-center gap-1 ml-2 font-mono shadow-none">'
content = re.sub(find, repl, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
