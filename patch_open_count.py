import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find = r'''                                    \{\/\* Open Count \*\/\}
                                    <td className="px-6 py-6 text-neutral-600 dark:text-zinc-400 font-normal">
                                      \{tr\.displayOpenCount > 0 \? \(
                                        <span className="inline-flex items-center px-2 py-1 bg-neutral-100 dark:bg-zinc-900 rounded-md text-\[10px\] font-mono border border-neutral-200 dark:border-zinc-800 text-neutral-700 dark:text-zinc-300 shadow-sm">
                                          \{tr\.displayOpenCount\}\{tr\.displayOpenCount === 1 \? 'st' : tr\.displayOpenCount === 2 \? 'nd' : tr\.displayOpenCount === 3 \? 'rd' : 'th'\} time!
                                        </span>
                                      \) : \(
                                        <span className="text-zinc-500">-</span>
                                      \)\}
                                    </td>'''

repl = r'''                                    {/* Open Count */}
                                    <td className="px-6 py-6 text-neutral-600 dark:text-zinc-400 font-normal">
                                      {tr.displayOpenCount > 0 ? (
                                        <div className="flex flex-col items-start gap-1">
                                          <span className="inline-flex items-center px-2 py-1 bg-white dark:bg-[#09090b] rounded text-[10px] font-mono border border-neutral-200 dark:border-zinc-800 text-neutral-900 dark:text-white font-medium shadow-sm">
                                            {tr.displayOpenCount}{tr.displayOpenCount === 1 ? 'st' : tr.displayOpenCount === 2 ? 'nd' : tr.displayOpenCount === 3 ? 'rd' : 'th'} time!
                                          </span>
                                          {tr.clickCount > 0 && (
                                            <span className="bg-white dark:bg-[#050505] border border-neutral-200 dark:border-zinc-800 px-2 py-0.5 rounded text-[9px] font-semibold tracking-wider text-neutral-900 dark:text-white inline-flex items-center gap-1 font-mono shadow-sm">
                                              <Check className="w-3 h-3 text-emerald-500" />
                                              LINK CLICKED
                                            </span>
                                          )}
                                        </div>
                                      ) : (
                                        <span className="text-zinc-500">-</span>
                                      )}
                                    </td>'''

content = re.sub(find, repl, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
