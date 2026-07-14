import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

custom_dropdown = """
const TicketCategoryDropdown = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = [
    { id: 'bug', label: 'Bug Report', icon: <X className="w-4 h-4 text-red-500" /> },
    { id: 'feature', label: 'Feature Request', icon: <Sparkles className="w-4 h-4 text-blue-500" /> },
    { id: 'general', label: 'General Feedback', icon: <MessageSquare className="w-4 h-4 text-zinc-500" /> }
  ];
  
  const selected = categories.find(c => c.id === value) || categories[0];

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-neutral-50 dark:bg-zinc-950/50 border border-neutral-200 dark:border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-zinc-800 dark:border-zinc-200 transition-all font-normal flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {selected.icon}
          <span>{selected.label}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            className="absolute top-full left-0 w-full mt-2 bg-white/80 dark:bg-[#090a0c]/80 backdrop-blur-xl border border-neutral-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-2xl z-[100] py-1"
          >
            {categories.map((c) => (
              <div 
                key={c.id}
                onClick={() => { onChange(c.id); setIsOpen(false); }}
                className={`flex items-center gap-2 px-4 py-3 text-xs cursor-pointer transition-colors ${value === c.id ? 'bg-neutral-100 dark:bg-zinc-900/60 font-medium' : 'hover:bg-neutral-50 dark:hover:bg-zinc-900/40 text-neutral-700 dark:text-zinc-300'}`}
              >
                {c.icon}
                <span>{c.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Dashboard"""

content = content.replace("export default function Dashboard", custom_dropdown)

# Now replace the select block
find_select = r'''                              <div className="space-y-1.5">
                                <label className="text-\[10px\] font-semibold text-zinc-500 tracking-wider uppercase">CATEGORY</label>
                                <select
                                  value={ticketCategory}
                                  onChange={(e) => setTicketCategory(e.target.value as any)}
                                  className="w-full bg-neutral-50 dark:bg-zinc-950/50 border border-neutral-200 dark:border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-zinc-800 dark:border-zinc-200 transition-all font-normal"
                                >
                                  <option value="bug">Bug Report</option>
                                  <option value="feature">Feature Request</option>
                                  <option value="general">General Feedback</option>
                                </select>
                              </div>'''

repl_select = r'''                              <div className="space-y-1.5">
                                <label className="text-[10px] font-semibold text-zinc-500 tracking-wider uppercase">CATEGORY</label>
                                <TicketCategoryDropdown 
                                  value={ticketCategory} 
                                  onChange={(val) => setTicketCategory(val as any)} 
                                />
                              </div>'''

content = re.sub(find_select, repl_select, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
