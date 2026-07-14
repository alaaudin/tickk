import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# Enhance Account Dropdown (isAccountDropdownOpen)
old_acc_dropdown = 'className="absolute right-0 top-full mt-2 w-64 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-neutral-200/50 dark:border-zinc-800/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden ring-1 ring-black/5 dark:ring-white/5"'
new_acc_dropdown = 'className="absolute right-0 top-full mt-2 w-64 bg-white/30 dark:bg-[#111111]/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden ring-1 ring-black/5 dark:ring-white/5"'
content = content.replace(old_acc_dropdown, new_acc_dropdown)

# Enhance API Keys 3-dots Dropdown (openKeyDropdown)
old_key_dropdown = 'className="absolute right-6 top-10 w-48 rounded-xl bg-white/40 dark:bg-[#111111]/60 backdrop-blur-xl border border-white/40 dark:border-zinc-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-50 overflow-hidden p-1 animate-in fade-in slide-in-from-top-2"'
new_key_dropdown = 'className="absolute right-6 top-10 w-48 rounded-xl bg-white/30 dark:bg-[#111111]/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden p-1 animate-in fade-in slide-in-from-top-2"'
content = content.replace(old_key_dropdown, new_key_dropdown)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
