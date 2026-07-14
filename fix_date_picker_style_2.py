with open('src/components/CustomDateTimePicker.tsx', 'r') as f:
    content = f.read()

# Make the popover background even more premium
content = content.replace(
    'bg-white/70 dark:bg-[#090a0c]/60 backdrop-blur-[40px]',
    'bg-white/50 dark:bg-[#000000]/40 backdrop-blur-[64px] border-white/60 dark:border-white/10'
)

# the button to open
content = content.replace(
    'bg-white/10 dark:bg-black/20 backdrop-blur-md',
    'bg-white/20 dark:bg-white/5 backdrop-blur-2xl'
)

with open('src/components/CustomDateTimePicker.tsx', 'w') as f:
    f.write(content)
