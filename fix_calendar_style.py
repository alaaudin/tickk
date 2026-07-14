with open('src/components/CustomDateTimePicker.tsx', 'r') as f:
    content = f.read()

# Make the wrapper popover more premium
content = content.replace(
    'bg-white/40 dark:bg-zinc-900/40 backdrop-blur-[40px]',
    'bg-white/70 dark:bg-[#090a0c]/60 backdrop-blur-[40px]'
)

# Header buttons
content = content.replace(
    'bg-white/30 dark:bg-black/30 hover:bg-white/60 dark:hover:bg-black/50',
    'bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10'
)

# Time picker inner background
content = content.replace(
    'bg-white/30 dark:bg-black/30 p-1.5 rounded-xl border border-white/20 dark:border-zinc-800/50',
    'bg-white/50 dark:bg-black/40 p-1.5 rounded-xl border border-white/40 dark:border-white/5'
)

with open('src/components/CustomDateTimePicker.tsx', 'w') as f:
    f.write(content)
