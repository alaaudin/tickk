import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# Make the outer container of the expanded area more premium
content = content.replace(
    '<div className="border-t border-neutral-200 dark:border-zinc-900 p-6 bg-neutral-50/50 dark:bg-zinc-950/20 space-y-4 animate-fadeIn">',
    '<div className="border-t border-neutral-200 dark:border-zinc-900/50 p-6 bg-gradient-to-b from-neutral-50/50 to-neutral-100/30 dark:from-zinc-950/40 dark:to-[#050505]/60 space-y-4 animate-fadeIn relative overflow-hidden">\n                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 dark:bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>\n                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/5 blur-[80px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2"></div>'
)

# Make the table container glassmorphism
content = content.replace(
    '<div className="relative group overflow-hidden rounded-xl border border-neutral-200/50 dark:border-zinc-900/60 bg-white dark:bg-zinc-950/40">',
    '<div className="relative group overflow-hidden rounded-2xl border border-white/40 dark:border-white/10 bg-white/30 dark:bg-black/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">'
)

# Make the table header more premium
content = content.replace(
    '<tr className="border-b border-neutral-200 dark:border-zinc-900 text-zinc-400 bg-neutral-50/50 dark:bg-[#070708]/30">',
    '<tr className="border-b border-neutral-200/50 dark:border-zinc-800/50 text-zinc-500 dark:text-zinc-400 bg-white/40 dark:bg-white/5 backdrop-blur-md">'
)

# Make the table rows more premium
content = content.replace(
    '<tr key={log.id} className="border-b border-neutral-100 dark:border-zinc-900/40 transition-colors">',
    '<tr key={log.id} className="border-b border-neutral-200/30 dark:border-zinc-800/30 transition-colors hover:bg-white/50 dark:hover:bg-white/5">'
)

# Make the empty state more premium
content = content.replace(
    '<div className="p-6 text-center text-zinc-500 italic font-normal text-xs font-sans border border-neutral-200/50 dark:border-zinc-900/60 rounded-xl bg-white dark:bg-zinc-950/40">',
    '<div className="p-8 text-center text-zinc-500 italic font-normal text-xs font-sans border border-white/40 dark:border-white/10 rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">'
)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
