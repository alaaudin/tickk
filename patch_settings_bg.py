import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find = r'h-\[calc\(100vh-100px\)\] overflow-hidden flex flex-col lg:flex-row gap-8 bg-white dark:bg-\[#111111\] p-6 lg:p-8 rounded-2xl border border-neutral-200/60 dark:border-zinc-800/60 shadow-xl'
repl = r'h-[calc(100vh-100px)] overflow-hidden flex flex-col lg:flex-row gap-8 bg-gradient-to-br from-white/95 via-zinc-50/50 to-neutral-100/80 dark:from-[#0f0f12] dark:via-[#0a0a0c] dark:to-[#030304] p-6 lg:p-8 rounded-2xl border border-neutral-200/80 dark:border-zinc-800/80 shadow-md dark:shadow-2xl transition-all duration-300'

content = content.replace(find, repl)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
