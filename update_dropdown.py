import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_dropdown = r'''const TicketCategoryDropdown = \(\{ value, onChange \}: \{ value: string, onChange: \(val: string\) => void \}\) => \{[\s\S]*?return \([\s\S]*?\</div\>\n  \);\n\};'''

repl_dropdown = '''const TicketCategoryDropdown = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = [
    { id: 'bug', label: 'Bug Report', icon: <X className="w-4 h-4 text-red-500" />, desc: "Something isn't working right" },
    { id: 'feature', label: 'Feature Request', icon: <Sparkles className="w-4 h-4 text-blue-500" />, desc: "Ideas to improve Tickk" },
    { id: 'general', label: 'General Feedback', icon: <MessageSquare className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />, desc: "Thoughts and suggestions" }
  ];
  
  const selected = categories.find(c => c.id === value) || categories[0];

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 rounded-2xl px-4 py-3.5 text-xs text-neutral-900 dark:text-white hover:bg-white/60 dark:hover:bg-black/30 transition-all font-normal flex items-center justify-between cursor-pointer shadow-sm group"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-white dark:bg-zinc-900 shadow-sm border border-neutral-100 dark:border-zinc-800">
            {selected.icon}
          </div>
          <span className="font-medium">{selected.label}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute top-full left-0 w-full mt-2 bg-white/70 dark:bg-[#090a0c]/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] z-[100] py-1.5"
          >
            {categories.map((c) => (
              <div 
                key={c.id}
                onClick={() => { onChange(c.id); setIsOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 border-l-2 ${value === c.id ? 'bg-black/5 dark:bg-white/10 border-neutral-900 dark:border-white' : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'}`}
              >
                <div className={`p-1.5 rounded-lg ${value === c.id ? 'bg-white dark:bg-black shadow-sm' : 'bg-transparent'}`}>
                  {c.icon}
                </div>
                <div className="flex flex-col">
                  <span className={`text-xs ${value === c.id ? 'font-semibold text-neutral-900 dark:text-white' : 'font-medium text-neutral-700 dark:text-zinc-300'}`}>{c.label}</span>
                  <span className="text-[10px] text-zinc-500 mt-0.5">{c.desc}</span>
                </div>
                {value === c.id && <Check className="w-3.5 h-3.5 ml-auto text-neutral-900 dark:text-white" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};'''

match = re.search(find_dropdown, content)
if match:
    content = content.replace(match.group(0), repl_dropdown)
    with open("src/components/Dashboard.tsx", "w") as f:
        f.write(content)
    print("Dropdown updated successfully!")
else:
    print("Could not find dropdown!")

