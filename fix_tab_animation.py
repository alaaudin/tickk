import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# Make sure icon wrap handles the premium animation with color change
# From text-zinc-500 to text-neutral-900 / white
old_icon_span = '<span className={`relative flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-[1.2] group-hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] ${isActive ? "text-neutral-900 dark:text-white scale-110" : "text-zinc-500"}`}>'
new_icon_span = '<span className={`relative flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-[1.2] group-hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] group-hover:text-emerald-500 dark:group-hover:text-emerald-400 ${isActive ? "text-neutral-900 dark:text-white scale-110" : "text-zinc-500"}`}>'
content = content.replace(old_icon_span, new_icon_span)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
