import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find = r'<div className="animate-fadeIn h-\[calc\(100vh-100px\)\] overflow-hidden flex flex-col lg:flex-row gap-8 bg-white dark:bg-\[#111111\] p-6 lg:p-8 rounded-2xl border border-neutral-200/60 dark:border-zinc-800/60 shadow-xl">'
repl = r'<div className="animate-fadeIn h-[calc(100vh-100px)] overflow-hidden flex flex-col lg:flex-row gap-8">'

content = content.replace(find, repl)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
