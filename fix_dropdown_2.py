import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

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

