import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# Replace apiKeyFilter state to include the dropdown state
states_old = """  const [apiKeySearch, setApiKeySearch] = useState("");
  const [apiKeyFilter, setApiKeyFilter] = useState("All permissions");
  const [openKeyDropdown, setOpenKeyDropdown] = useState<string | null>(null);"""
states_new = """  const [apiKeySearch, setApiKeySearch] = useState("");
  const [apiKeyFilter, setApiKeyFilter] = useState("All permissions");
  const [openKeyDropdown, setOpenKeyDropdown] = useState<string | null>(null);
  const [isApiKeyFilterOpen, setIsApiKeyFilterOpen] = useState(false);"""
content = content.replace(states_old, states_new)

# Replace the select for API keys with a custom dropdown
old_select = """                      <select
                        value={apiKeyFilter}
                        onChange={(e) => setApiKeyFilter(e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-[#111111] border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white"
                      >
                        <option>All permissions</option>
                        <option>Full access</option>
                        <option>Sending access</option>
                      </select>"""

new_select = """                      <div className="relative">
                        <button
                          onClick={() => setIsApiKeyFilterOpen(!isApiKeyFilterOpen)}
                          onBlur={() => setTimeout(() => setIsApiKeyFilterOpen(false), 150)}
                          className="px-4 py-2 bg-white dark:bg-[#111111] border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white flex items-center justify-between min-w-[150px]"
                        >
                          {apiKeyFilter}
                        </button>
                        {isApiKeyFilterOpen && (
                          <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white/30 dark:bg-[#111111]/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden p-1 animate-in fade-in slide-in-from-top-2">
                            {["All permissions", "Full access", "Sending access"].map((opt) => (
                              <button
                                key={opt}
                                onClick={() => { setApiKeyFilter(opt); setIsApiKeyFilterOpen(false); }}
                                className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2"
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
