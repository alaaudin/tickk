import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# 1. Add state variable
state_find = r'  const \[activeTab, setActiveTab\] = useState<TabType>\("overview"\);'
state_repl = r'''  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isLiveDataEnabled, setIsLiveDataEnabled] = useState(false);'''
content = content.replace(state_find, state_repl)

# 2. Add useEffect
effect_find = r'''  useEffect\(\(\) => \{
    fetchData\(\);
  \}, \[token\]\);'''
effect_repl = r'''  useEffect(() => {
    fetchData();
  }, [token]);

  // Live Data Auto-Refresh
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLiveDataEnabled) {
      interval = setInterval(() => {
        fetchData();
      }, 5000); // 5 seconds interval
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLiveDataEnabled, token]);'''
content = re.sub(effect_find, effect_repl, content)

# 3. Add toggle UI in header
header_find = r'''          <div className="flex items-center gap-4 text-xs">
            \{\/\* Active session indicator \*\/\}
            <span className="hidden lg:flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-zinc-900\/30 border border-neutral-200 dark:border-zinc-800\/50 text-neutral-600 dark:text-zinc-400 rounded-full font-normal">'''
header_repl = r'''          <div className="flex items-center gap-4 text-xs">
            {/* Live Data Premium Toggle */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#111] border border-neutral-200 dark:border-zinc-800 rounded-full shadow-sm">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={isLiveDataEnabled}
                  onChange={() => setIsLiveDataEnabled(!isLiveDataEnabled)}
                />
                <div 
                  className={`w-7 h-4 rounded-full transition-colors duration-300 cursor-pointer ${isLiveDataEnabled ? 'bg-emerald-500' : 'bg-neutral-200 dark:bg-zinc-800'}`}
                  onClick={() => setIsLiveDataEnabled(!isLiveDataEnabled)}
                >
                  <div className={`w-3 h-3 bg-white rounded-full shadow-sm absolute top-0.5 transition-transform duration-300 ${isLiveDataEnabled ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold font-mono text-neutral-600 dark:text-zinc-400 flex items-center gap-1.5">
                <Activity className={`w-3 h-3 ${isLiveDataEnabled ? 'text-emerald-500 animate-pulse' : 'text-neutral-400 dark:text-zinc-500'}`} />
                Live Data <span className="px-1.5 py-0.5 bg-gradient-to-r from-amber-200 to-yellow-400 dark:from-amber-500 dark:to-yellow-600 text-amber-900 dark:text-amber-50 text-[8px] rounded border border-amber-300/50 dark:border-amber-500/50 ml-1 shadow-inner font-black">PRO</span>
              </span>
            </div>

            {/* Active session indicator */}
            <span className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-zinc-900/30 border border-neutral-200 dark:border-zinc-800/50 text-neutral-600 dark:text-zinc-400 rounded-full font-normal">'''
content = re.sub(header_find, header_repl, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
