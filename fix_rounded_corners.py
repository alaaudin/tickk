import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

old_thead = """                        <thead className="bg-neutral-50 dark:bg-zinc-900/40 text-neutral-500 dark:text-neutral-400 text-xs font-semibold">
                          <tr>
                            <th className="px-6 py-3 font-mono uppercase tracking-widest">Name</th>
                            <th className="px-6 py-3 font-mono uppercase tracking-widest">Token</th>
                            <th className="px-6 py-3 font-mono uppercase tracking-widest">Permission</th>
                            <th className="px-6 py-3 font-mono uppercase tracking-widest">Last used</th>
                            <th className="px-6 py-3 font-mono uppercase tracking-widest">Created</th>
                            <th className="px-6 py-3 text-right font-mono uppercase tracking-widest"></th>
                          </tr>
                        </thead>"""

new_thead = """                        <thead className="bg-neutral-50 dark:bg-zinc-900/40 text-neutral-500 dark:text-neutral-400 text-xs font-semibold">
                          <tr>
                            <th className="px-6 py-3 font-mono uppercase tracking-widest rounded-tl-xl">Name</th>
                            <th className="px-6 py-3 font-mono uppercase tracking-widest">Token</th>
                            <th className="px-6 py-3 font-mono uppercase tracking-widest">Permission</th>
                            <th className="px-6 py-3 font-mono uppercase tracking-widest">Last used</th>
                            <th className="px-6 py-3 font-mono uppercase tracking-widest">Created</th>
                            <th className="px-6 py-3 text-right font-mono uppercase tracking-widest rounded-tr-xl"></th>
                          </tr>
                        </thead>"""

content = content.replace(old_thead, new_thead)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
