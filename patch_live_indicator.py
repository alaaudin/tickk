import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# Change initial state to true
content = content.replace('const [isLiveDataEnabled, setIsLiveDataEnabled] = useState(false);', 'const [isLiveDataEnabled, setIsLiveDataEnabled] = useState(true);')

find = r'''            \{\/\* Live Data Premium Toggle \*\/\}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1\.5 bg-white dark:bg-\[#111\] border border-neutral-200 dark:border-zinc-800 rounded-full shadow-sm">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked=\{isLiveDataEnabled\}
                  onChange=\{\(\) => setIsLiveDataEnabled\(!isLiveDataEnabled\)\}
                \/>
                <div 
                  className=\{\`w-7 h-4 rounded-full transition-colors duration-300 cursor-pointer \$\{isLiveDataEnabled \? 'bg-emerald-500' : 'bg-neutral-200 dark:bg-zinc-800'\}\`\}
                  onClick=\{\(\) => setIsLiveDataEnabled\(!isLiveDataEnabled\)\}
                >
                  <div className=\{\`w-3 h-3 bg-white rounded-full shadow-sm absolute top-0\.5 transition-transform duration-300 \$\{isLiveDataEnabled \? 'translate-x-3\.5' : 'translate-x-0\.5'\}\`\} \/>
                <\/div>
              <\/div>
              <span className="text-\[10px\] uppercase tracking-widest font-bold font-mono text-neutral-600 dark:text-zinc-400 flex items-center gap-1\.5">
                <Activity className=\{\`w-3 h-3 \$\{isLiveDataEnabled \? 'text-emerald-500 animate-pulse' : 'text-neutral-400 dark:text-zinc-500'\}\`\} \/>
                Live Data <span className="px-1\.5 py-0\.5 bg-gradient-to-r from-amber-200 to-yellow-400 dark:from-amber-500 dark:to-yellow-600 text-amber-900 dark:text-amber-50 text-\[8px\] rounded border border-amber-300\/50 dark:border-amber-500\/50 ml-1 shadow-inner font-black">PRO<\/span>
              <\/span>
            <\/div>'''

repl = r'''            {/* Live Data Premium Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/40 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold font-mono text-neutral-800 dark:text-zinc-200 flex items-center gap-1.5">
                Live Data Fetching
                <span className="px-1.5 py-0.5 bg-gradient-to-r from-amber-200/80 to-yellow-400/80 dark:from-amber-500/80 dark:to-yellow-600/80 text-amber-900 dark:text-amber-50 text-[8px] rounded border border-amber-300/50 dark:border-amber-500/50 ml-0.5 shadow-inner font-black backdrop-blur-md">PREMIUM</span>
              </span>
            </div>'''

content = re.sub(find, repl, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
