import re

with open('src/components/DeveloperDocumentation.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'className="bg-[#0D0D0F] rounded-xl border border-zinc-800/80 overflow-hidden shadow-2xl"',
    'className="bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]"'
)

with open('src/components/DeveloperDocumentation.tsx', 'w') as f:
    f.write(content)
