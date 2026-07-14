import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# 1. Add states for dropdown and filtering
states_old = """  const [apiKeySearch, setApiKeySearch] = useState("");
  const [apiKeyFilter, setApiKeyFilter] = useState("All permissions");"""

states_new = """  const [apiKeySearch, setApiKeySearch] = useState("");
  const [apiKeyFilter, setApiKeyFilter] = useState("All permissions");
  const [openKeyDropdown, setOpenKeyDropdown] = useState<string | null>(null);

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
    setOpenKeyDropdown(null);
  };

  const filteredApiKeys = apiKeys.filter(key => {
    const matchesSearch = key.name.toLowerCase().includes(apiKeySearch.toLowerCase()) || key.token.toLowerCase().includes(apiKeySearch.toLowerCase());
    const matchesFilter = apiKeyFilter === "All permissions" || key.permission === apiKeyFilter;
    return matchesSearch && matchesFilter;
  });
"""
content = content.replace(states_old, states_new)

# 2. Update the API keys loop
old_loop = """{apiKeys.map((key) => ("""
new_loop = """{filteredApiKeys.map((key) => ("""
content = content.replace(old_loop, new_loop)

# 3. Update the 3-dots button and add dropdown
old_td = """                              <td className="px-6 py-4 text-right">
                                <button className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                  <MoreHorizontal className="w-5 h-5" />
                                </button>
                              </td>"""

new_td = """                              <td className="px-6 py-4 text-right relative">
                                <button 
                                  onClick={() => setOpenKeyDropdown(openKeyDropdown === key.id ? null : key.id)}
                                  onBlur={() => setTimeout(() => setOpenKeyDropdown(null), 150)}
                                  className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors relative z-10"
                                >
                                  <MoreHorizontal className="w-5 h-5" />
                                </button>
                                {openKeyDropdown === key.id && (
                                  <div className="absolute right-6 top-10 w-48 rounded-xl bg-white/40 dark:bg-[#111111]/60 backdrop-blur-xl border border-white/40 dark:border-zinc-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-50 overflow-hidden p-1 animate-in fade-in slide-in-from-top-2">
                                    <button 
                                      onClick={() => {
                                        navigator.clipboard.writeText(key.token);
                                      }}
                                      className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                      <Copy className="w-4 h-4" /> Copy Token
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteKey(key.id)}
                                      className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2 mt-1"
                                    >
                                      <Trash2 className="w-4 h-4" /> Revoke Key
                                    </button>
                                  </div>
                                )}
                              </td>"""

content = content.replace(old_td, new_td)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
