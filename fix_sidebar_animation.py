import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# Replace the icon wrapper span in the sidebar mapping
old_span = '<span className={`relative flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-[1.2] group-hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] group-hover:text-emerald-500 dark:group-hover:text-emerald-400 ${isActive ? "text-neutral-900 dark:text-white scale-110" : "text-zinc-500"}`}>'
new_span = '<span className={`relative flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.15] group-hover:rotate-[6deg] group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:text-amber-500 dark:group-hover:text-amber-400 ${isActive ? "text-neutral-900 dark:text-white scale-110" : "text-zinc-500"}`}>'
content = content.replace(old_span, new_span)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
