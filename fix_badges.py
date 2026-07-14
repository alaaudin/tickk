import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

old_func = """  const renderLinkClickBadge = (hasClick: boolean) => {
    if (hasClick) {
      return (
        <span className="bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded text-[9px] font-semibold tracking-wider text-emerald-700 dark:text-neutral-900 dark:text-white inline-flex items-center gap-1 ml-2 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          LINK CLICKED
        </span>
      );
    } else {
      return (
        <span className="bg-neutral-100 dark:bg-zinc-800/60 border border-neutral-200 dark:border-zinc-700/50 px-2 py-0.5 rounded text-[9px] font-medium tracking-wider text-neutral-500 dark:text-zinc-400 inline-flex items-center gap-1 ml-2 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-zinc-500" />
          NO CLICK YET
        </span>
      );
    }
  };"""

new_func = """  const renderLinkClickBadge = (hasClick: boolean) => {
    if (hasClick) {
      return (
        <span className="bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 px-2 py-0.5 rounded text-[9px] font-semibold tracking-wider text-neutral-900 dark:text-white inline-flex items-center gap-1 ml-2 font-mono">
          <Check className="w-3 h-3 text-emerald-500" />
          LINK CLICKED
        </span>
      );
    } else {
      return (
        <span className="bg-neutral-100 dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800 px-2 py-0.5 rounded text-[9px] font-medium tracking-wider text-neutral-500 dark:text-zinc-500 inline-flex items-center gap-1 ml-2 font-mono">
          <X className="w-3 h-3 text-neutral-400 dark:text-zinc-600" />
          NO CLICK YET
        </span>
      );
    }
  };"""

content = content.replace(old_func, new_func)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
