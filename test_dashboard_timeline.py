with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# Replace max-w-4xl with w-full
content = content.replace(
    '<div className="max-w-4xl mx-auto bg-white/20 dark:bg-black/20 backdrop-blur-2xl rounded-2xl border border-neutral-200/30 dark:border-zinc-800/40 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">',
    '<div className="w-full mx-auto bg-white/20 dark:bg-black/20 backdrop-blur-2xl rounded-2xl border border-neutral-200/30 dark:border-zinc-800/40 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">'
)

# Replace overflow-x-auto on wrappers
content = content.replace(
    '<div className="w-full overflow-x-auto rounded-xl border border-neutral-200/50 dark:border-zinc-900/60 bg-white/20 dark:bg-zinc-950/20 backdrop-blur-2xl">',
    '<div className="w-full rounded-xl border border-neutral-200/50 dark:border-zinc-900/60 bg-white/20 dark:bg-zinc-950/20 backdrop-blur-2xl">'
)

content = content.replace(
    '<div className="w-full overflow-x-auto rounded-xl border border-neutral-200/50 dark:border-zinc-800/45 bg-white/40 dark:bg-zinc-950/20 shadow-sm">',
    '<div className="w-full rounded-xl border border-neutral-200/50 dark:border-zinc-800/45 bg-white/40 dark:bg-zinc-950/20 shadow-sm">'
)

# Remove whitespace-nowrap from td
content = content.replace('className="px-4 py-3.5 whitespace-nowrap"', 'className="px-4 py-3.5"')

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
