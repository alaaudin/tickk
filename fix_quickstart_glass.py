import re

with open('src/components/QuickStartGuide.tsx', 'r') as f:
    content = f.read()

# Update the main container background classes
content = content.replace(
    'bg-[#0a0a0c]/80 backdrop-blur-3xl rounded-[22px] border border-white/5',
    'bg-white/10 dark:bg-[#111111]/60 backdrop-blur-3xl rounded-[22px] border border-neutral-200/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
)

with open('src/components/QuickStartGuide.tsx', 'w') as f:
    f.write(content)
