import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_str = 'className="absolute top-full left-0 w-full mt-2 bg-white/80 dark:bg-[#090a0c]/80 backdrop-blur-xl border border-neutral-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-2xl z-[100] py-1"'
repl_str = 'className="absolute top-full left-0 w-full mt-2 bg-white/90 dark:bg-[#090a0c]/80 backdrop-blur-3xl border border-neutral-200/50 dark:border-zinc-800/50 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] z-[100] py-1"'

content = content.replace(find_str, repl_str)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
