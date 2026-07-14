import sys

with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

old_no_opens = """                              ) : (
                                <span className="inline-flex items-center px-2.5 py-1.5 bg-neutral-100 dark:bg-zinc-900/40 border border-neutral-200/50 dark:border-zinc-800/40 rounded-lg text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                                  No Opens
                                </span>
                              )}"""

new_no_opens = """                              ) : (
                                <span className="inline-flex items-center px-2.5 py-1.5 bg-neutral-100 dark:bg-zinc-900/40 border border-neutral-200/50 dark:border-zinc-800/40 rounded-lg text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                                  {item.status === 'scheduled' ? 'Not Dispatched' : 'No Opens'}
                                </span>
                              )}"""

if old_no_opens in content:
    content = content.replace(old_no_opens, new_no_opens)
    with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
        f.write(content)
    print("Success")
else:
    print("Failed to find no opens cell")
