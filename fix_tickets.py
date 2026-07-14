import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_str = r'''                            <div key={t.id} className="p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/40 transition-colors flex flex-col sm:flex-row gap-4 justify-between items-start">'''

repl_str = r'''                            <div key={t.id} onClick={() => setSelectedTicket(t)} className="p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/40 transition-colors flex flex-col sm:flex-row gap-4 justify-between items-start cursor-pointer border border-transparent hover:border-neutral-200 dark:hover:border-zinc-800/80">'''

content = re.sub(find_str, repl_str, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
