with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_str = 'className="bg-white dark:bg-[#090a0c] border border-neutral-200 dark:border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative"'
repl_str = 'className="bg-white/90 dark:bg-[#090a0c]/80 backdrop-blur-3xl border border-neutral-200/50 dark:border-zinc-800/50 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative"'

content = content.replace(find_str, repl_str)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
