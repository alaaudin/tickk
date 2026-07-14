import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_str = 'className="w-full bg-neutral-50 dark:bg-zinc-950/50 border border-neutral-200 dark:border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-zinc-800 dark:border-zinc-200 transition-all font-normal flex items-center justify-between cursor-pointer"'
repl_str = 'className="w-full bg-white/50 dark:bg-zinc-900/30 backdrop-blur-md border border-neutral-200/50 dark:border-zinc-800/50 rounded-xl px-4 py-3 text-xs text-neutral-900 dark:text-white hover:bg-white/80 dark:hover:bg-zinc-900/50 transition-all font-normal flex items-center justify-between cursor-pointer shadow-sm"'

content = content.replace(find_str, repl_str)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
