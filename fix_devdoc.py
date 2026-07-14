import re

with open('src/components/DeveloperDocumentation.tsx', 'r') as f:
    content = f.read()

# Update the main wrapper
content = content.replace(
    'className="space-y-8 animate-fadeIn max-w-5xl mx-auto"',
    'className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12"'
)

# Update the first card
content = content.replace(
    'className="bg-white dark:bg-[#0c0c0e] rounded-3xl p-8 lg:p-10 border border-neutral-200 dark:border-zinc-800 shadow-xl relative overflow-hidden"',
    'className="bg-white/10 dark:bg-[#111111]/60 backdrop-blur-3xl rounded-[22px] border border-neutral-200/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 lg:p-10 relative overflow-hidden"'
)

# Update the Python snippet container
content = content.replace(
    'className="bg-[#0f0f11] rounded-2xl border border-zinc-800/80 overflow-hidden shadow-2xl"',
    'className="bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl"'
)

# Update the manifesto container
content = content.replace(
    'className="bg-white/40 dark:bg-[#121215]/45 backdrop-blur-2xl border border-neutral-200/50 dark:border-zinc-800/60 rounded-3xl p-8 relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_40px_rgba(255,255,255,0.015)]"',
    'className="bg-white/10 dark:bg-[#111111]/60 backdrop-blur-3xl border border-neutral-200/50 dark:border-white/10 rounded-[22px] p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"'
)

with open('src/components/DeveloperDocumentation.tsx', 'w') as f:
    f.write(content)
