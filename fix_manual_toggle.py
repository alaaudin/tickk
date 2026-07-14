with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10'",
    "'border-neutral-400 dark:border-white text-neutral-900 dark:text-white bg-neutral-200/50 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 shadow-sm'"
)

with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(content)
