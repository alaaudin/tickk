import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# Replace newKeyPermission state to include dropdown state
states_old = """  const [newKeyPermission, setNewKeyPermission] = useState("Full access");
  const [createdKey, setCreatedKey] = useState<{name: string, token: string} | null>(null);"""
states_new = """  const [newKeyPermission, setNewKeyPermission] = useState("Full access");
  const [isNewKeyPermissionOpen, setIsNewKeyPermissionOpen] = useState(false);
  const [createdKey, setCreatedKey] = useState<{name: string, token: string} | null>(null);"""
content = content.replace(states_old, states_new)

old_select = """                <select 
                  value={newKeyPermission}
                  onChange={e => setNewKeyPermission(e.target.value)}
                  className="w-full px-4 py-2 bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white"
                >
                  <option>Full access</option>
                  <option>Sending access</option>
                </select>"""

new_select = """                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsNewKeyPermissionOpen(!isNewKeyPermissionOpen)}
                    onBlur={() => setTimeout(() => setIsNewKeyPermissionOpen(false), 150)}
                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white text-left"
                  >
                    {newKeyPermission}
                  </button>
                  {isNewKeyPermissionOpen && (
                    <div className="absolute left-0 top-full mt-2 w-full rounded-xl bg-white/30 dark:bg-[#111111]/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden p-1 animate-in fade-in slide-in-from-top-2">
                      {["Full access", "Sending access"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => { setNewKeyPermission(opt); setIsNewKeyPermissionOpen(false); }}
                          className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>"""
content = content.replace(old_select, new_select)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
