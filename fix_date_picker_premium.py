with open('src/components/CustomDateTimePicker.tsx', 'r') as f:
    content = f.read()

# 1. Fonts to Outfit
content = content.replace('font-sans', 'font-[\'Outfit\']')

# 2. Pure glassmorphism backdrop #0c0c0e with 70% opacity (approx #0c0c0eB3) and backdrop-blur of 16px
content = content.replace(
    'bg-white/50 dark:bg-[#000000]/40 backdrop-blur-[64px] border-white/60 dark:border-white/10',
    'bg-[#0c0c0e]/70 backdrop-blur-md border-white/20 dark:border-white/10'
)

# Replace all emerald-500 with white/neutral
content = content.replace('bg-emerald-500', 'bg-white dark:bg-white')
content = content.replace('text-emerald-500', 'text-white')
content = content.replace('shadow-emerald-500/30', 'shadow-white/20')
content = content.replace('emerald-500', 'white')

content = content.replace('text-emerald-600 dark:text-emerald-400', 'text-neutral-900 dark:text-white')
content = content.replace('emerald-600', 'white')
content = content.replace('emerald-400', 'white')
content = content.replace('emerald-500/30', 'white/20')

# Update focus rings
content = content.replace('focus:ring-emerald-500/50', 'focus:ring-white/50')

with open('src/components/CustomDateTimePicker.tsx', 'w') as f:
    f.write(content)
