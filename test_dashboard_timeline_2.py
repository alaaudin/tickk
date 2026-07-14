with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('className="px-4 py-3.5 font-mono text-[10.5px] text-neutral-800 dark:text-zinc-300 whitespace-nowrap"', 'className="px-4 py-3.5 font-mono text-[10.5px] text-neutral-800 dark:text-zinc-300"')
content = content.replace('className="px-4 py-3.5 font-mono text-[11px] text-neutral-700 dark:text-zinc-300 font-normal whitespace-nowrap"', 'className="px-4 py-3.5 font-mono text-[11px] text-neutral-700 dark:text-zinc-300 font-normal"')
content = content.replace('className="px-4 py-3.5 font-mono text-[10.5px] text-neutral-700 dark:text-zinc-300 whitespace-nowrap"', 'className="px-4 py-3.5 font-mono text-[10.5px] text-neutral-700 dark:text-zinc-300"')
content = content.replace('className="px-4 py-3.5 whitespace-nowrap"', 'className="px-4 py-3.5"')


with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
