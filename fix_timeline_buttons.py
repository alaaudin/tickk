with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'Eye, PenLine, Copy, ChevronRight, Clock, MousePointerClick, Calendar, Smartphone',
    'Eye, PenLine, Copy, ChevronRight, Clock, MousePointerClick, Calendar, Smartphone, Share2'
)

new_header = '''                                      <div className="flex flex-wrap gap-1.5 items-center">
                                        <button 
                                          title="Copy Timeline Data"
                                          onClick={() => {
                                            navigator.clipboard.writeText(JSON.stringify(item.logs, null, 2));
                                            // You might want to use a toast here instead of alert in real code, but for now this works or we can just swallow it.
                                          }}
                                          className="p-1.5 bg-white dark:bg-zinc-900/50 hover:bg-neutral-100 dark:hover:bg-zinc-800 border border-neutral-200 dark:border-zinc-800/50 rounded-md text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                                        >
                                          <Copy className="w-3.5 h-3.5" />
                                        </button>
                                        <button 
                                          title="Share Timeline"
                                          onClick={() => {
                                            if (navigator.share) {
                                                navigator.share({
                                                    title: 'Interaction Timeline',
                                                    text: 'Check out this interaction timeline.',
                                                    url: window.location.href,
                                                }).catch(console.error);
                                            }
                                          }}
                                          className="p-1.5 bg-white dark:bg-zinc-900/50 hover:bg-neutral-100 dark:hover:bg-zinc-800 border border-neutral-200 dark:border-zinc-800/50 rounded-md text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors mr-1"
                                        >
                                          <Share2 className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="px-2.5 py-0.5 bg-neutral-200/40 dark:bg-zinc-900/50 border border-neutral-300/20 dark:border-zinc-800/40 rounded text-[10px] font-mono text-neutral-600 dark:text-zinc-300">
                                          TO: <span className="font-normal text-neutral-800 dark:text-zinc-100">{item.email}</span>
                                        </span>
                                      </div>'''

old_header = '''                                      <div className="flex flex-wrap gap-1.5">
                                        <span className="px-2.5 py-0.5 bg-neutral-200/40 dark:bg-zinc-900/50 border border-neutral-300/20 dark:border-zinc-800/40 rounded text-[10px] font-mono text-neutral-600 dark:text-zinc-300">
                                          TO: <span className="font-normal text-neutral-800 dark:text-zinc-100">{item.email}</span>
                                        </span>
                                      </div>'''

content = content.replace(old_header, new_header)

with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(content)

print("Buttons added")
