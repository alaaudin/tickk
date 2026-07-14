with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

# Replace overflow-x-auto on the wrapper
content = content.replace(
    '<div className="w-full overflow-x-auto rounded-xl border border-neutral-200/50 dark:border-zinc-900/60 bg-white/20 dark:bg-zinc-950/20 backdrop-blur-2xl">',
    '<div className="w-full rounded-xl border border-neutral-200/50 dark:border-zinc-900/60 bg-white/20 dark:bg-zinc-950/20 backdrop-blur-2xl">'
)

# Remove whitespace-nowrap from td
content = content.replace('className="px-4 py-3.5 whitespace-nowrap"', 'className="px-4 py-3.5"')
content = content.replace('className="px-4 py-3.5 font-mono text-[10.5px] text-neutral-700 dark:text-zinc-300 whitespace-nowrap"', 'className="px-4 py-3.5 font-mono text-[10.5px] text-neutral-700 dark:text-zinc-300"')

with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(content)
print("Done")
