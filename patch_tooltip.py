import re

with open("src/components/GlobalReachMap.tsx", "r") as f:
    content = f.read()

find = r'''            <span className="text-\[10px\] uppercase tracking-widest font-bold font-mono text-neutral-700 dark:text-zinc-300 flex items-center">
              \{tooltip\.text\}
            <\/span>'''

repl = r'''            <span className="text-[10px] uppercase tracking-widest font-bold font-mono text-neutral-700 dark:text-zinc-300 flex items-center">
              {tooltip.text}
              <span className="ml-1.5 px-1.5 py-0.5 bg-gradient-to-r from-amber-200/80 to-yellow-400/80 dark:from-amber-500/80 dark:to-yellow-600/80 text-amber-900 dark:text-amber-50 text-[8px] rounded border border-amber-300/50 dark:border-amber-500/50 shadow-inner font-black backdrop-blur-md">PREMIUM</span>
            </span>'''

content = re.sub(find, repl, content)

with open("src/components/GlobalReachMap.tsx", "w") as f:
    f.write(content)
