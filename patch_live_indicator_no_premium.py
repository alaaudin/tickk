import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find = r'''            \{\/\* Live Data Fetching Indicator \*\/\}
            <div className="relative overflow-hidden hidden sm:flex items-center gap-2 px-4 py-1\.5 rounded-full border border-neutral-300\/60 dark:border-zinc-700\/60 bg-neutral-200\/50 dark:bg-zinc-800\/50 backdrop-blur-xl shadow-sm group">
              <Activity className="relative z-10 w-3\.5 h-3\.5 text-neutral-600 dark:text-zinc-300 animate-pulse" \/>
              <span className="relative z-10 text-\[10px\] uppercase tracking-widest font-bold font-mono text-neutral-800 dark:text-zinc-200 flex items-center gap-1\.5">
                Live Data Fetching
              <\/span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white\/80 dark:via-white\/20 to-transparent animate-\[shimmer_2\.5s_infinite_ease-in-out\]"><\/span>
            <\/div>'''

repl = r'''            {/* Live Data Fetching Indicator */}
            <div className="relative overflow-hidden hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-300/40 dark:border-zinc-700/50 bg-neutral-200/40 dark:bg-zinc-800/40 backdrop-blur-xl shadow-sm group">
              <Activity className="relative z-10 w-3.5 h-3.5 text-neutral-500 dark:text-zinc-400 animate-pulse" />
              <span className="relative z-10 text-[10px] uppercase tracking-widest font-bold font-mono text-neutral-700 dark:text-zinc-300 flex items-center">
                Live Data Fetching
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 dark:via-white/20 to-transparent animate-[shimmer_2s_infinite_ease-in-out]"></span>
            </div>'''

content = re.sub(find, repl, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
