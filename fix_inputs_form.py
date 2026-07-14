import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_str_input = 'className="w-full bg-neutral-50 dark:bg-zinc-950/50 border border-neutral-200 dark:border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-zinc-800 dark:border-zinc-200 transition-all font-normal"'
repl_str_input = 'className="w-full bg-white/50 dark:bg-zinc-900/30 backdrop-blur-md border border-neutral-200/50 dark:border-zinc-800/50 rounded-xl px-4 py-3 text-xs text-neutral-900 dark:text-white placeholder-zinc-500/70 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-zinc-600 transition-all font-normal shadow-sm"'

find_str_textarea = 'className="w-full bg-neutral-50 dark:bg-zinc-950/50 border border-neutral-200 dark:border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-zinc-800 dark:border-zinc-200 transition-all font-normal resize-none"'
repl_str_textarea = 'className="w-full bg-white/50 dark:bg-zinc-900/30 backdrop-blur-md border border-neutral-200/50 dark:border-zinc-800/50 rounded-xl px-4 py-3 text-xs text-neutral-900 dark:text-white placeholder-zinc-500/70 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-zinc-600 transition-all font-normal resize-none shadow-sm"'


content = content.replace(find_str_input, repl_str_input)
content = content.replace(find_str_textarea, repl_str_textarea)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
