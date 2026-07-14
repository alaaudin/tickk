import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# 1. Update the vertical line
find_line = r'bg-gradient-to-b from-emerald-500 via-cyan-400 to-neutral-200 dark:to-zinc-800'
repl_line = r'bg-neutral-200 dark:bg-zinc-800'
content = content.replace(find_line, repl_line)

# 2. Update the event node
find_node = r'''                                                  <div className="absolute left-\[-22px\] top-\[5px\] flex items-center justify-center">
                                                    <span className="relative flex h-3 w-3">
                                                      \{item\.type === 'open' \? \(
                                                        <>
                                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-\[0_0_15px_rgba\(16,185,129,0\.8\)\]" />
                                                        </>
                                                      \) : \(
                                                        <>
                                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                                                          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 shadow-\[0_0_15px_rgba\(6,182,212,0\.8\)\]" />
                                                        </>
                                                      \)\}
                                                    </span>
                                                  </div>'''
repl_node = r'''                                                  <div className="absolute left-[-26px] top-[1px] flex items-center justify-center bg-white dark:bg-[#050505] p-1 rounded-full border border-neutral-200 dark:border-zinc-800">
                                                    {item.type === 'click' ? (
                                                      <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
                                                    ) : (
                                                      <Eye className="w-3.5 h-3.5 text-neutral-400 dark:text-zinc-500" />
                                                    )}
                                                  </div>'''
content = re.sub(find_node, repl_node, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
