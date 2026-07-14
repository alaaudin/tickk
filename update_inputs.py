import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_input = r'''className="w-full bg-white/50 dark:bg-zinc-900/30 backdrop-blur-md border border-neutral-200/50 dark:border-zinc-800/50 rounded-xl px-4 py-3 text-xs text-neutral-900 dark:text-white placeholder-zinc-500/70 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-zinc-600 transition-all font-normal shadow-sm"'''

repl_input = r'''className="w-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 rounded-2xl px-4 py-3.5 text-xs text-neutral-900 dark:text-white placeholder-zinc-500/70 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20 transition-all font-normal shadow-sm hover:bg-white/60 dark:hover:bg-black/30"'''

find_textarea = r'''className="w-full bg-white/50 dark:bg-zinc-900/30 backdrop-blur-md border border-neutral-200/50 dark:border-zinc-800/50 rounded-xl px-4 py-3 text-xs text-neutral-900 dark:text-white placeholder-zinc-500/70 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-zinc-600 transition-all font-normal resize-none shadow-sm"'''

repl_textarea = r'''className="w-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 rounded-2xl px-4 py-3.5 text-xs text-neutral-900 dark:text-white placeholder-zinc-500/70 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20 transition-all font-normal resize-none shadow-sm hover:bg-white/60 dark:hover:bg-black/30"'''

content = content.replace(find_input, repl_input)
content = content.replace(find_textarea, repl_textarea)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)

