import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# 1. Add states
api_states = """  const [apiKeys, setApiKeys] = useState([
    { id: "key_1", name: "DEMO", token: "re_G6UoaCdn...", permission: "Full access", lastUsed: "No activity", createdAt: "just now" }
  ]);
  const [isCreateKeyModalOpen, setIsCreateKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyPermission, setNewKeyPermission] = useState("Full access");
  const [createdKey, setCreatedKey] = useState<{name: string, token: string} | null>(null);
  const [showKeyVisible, setShowKeyVisible] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);
  const [apiKeySearch, setApiKeySearch] = useState("");
  const [apiKeyFilter, setApiKeyFilter] = useState("All permissions");

  const generateApiKey = () => {
    return "re_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleCreateApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    const newToken = generateApiKey();
    const newKey = {
      id: "key_" + Math.random().toString(36).substring(2, 9),
      name: newKeyName,
      token: newToken.substring(0, 11) + "...",
      permission: newKeyPermission,
      lastUsed: "No activity",
      createdAt: "just now"
    };
    setApiKeys([newKey, ...apiKeys]);
    setCreatedKey({ name: newKeyName, token: newToken });
    setIsCreateKeyModalOpen(false);
    setNewKeyName("");
  };
"""
content = content.replace('  // Team Members States', api_states + '\n  // Team Members States')

# 2. Add API Keys to Navigation
nav_items = '            { id: "integrations", label: "Integration Hub", icon: <Network className="w-4 h-4" /> },'
new_nav_items = '            { id: "integrations", label: "Integration Hub", icon: <Network className="w-4 h-4" /> },\n              { id: "api_keys", label: "API Keys", icon: <Key className="w-4 h-4" /> },'
content = content.replace(nav_items, new_nav_items)

# 3. Add API Keys View
api_view = """                {/* API KEYS VIEW */}
                {activeTab === "api_keys" && (
                  <div className="animate-fadeIn max-w-7xl mx-auto space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                      <h2 className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight">
                        API Keys <span className="px-2 py-0.5 ml-2 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 align-middle inline-block transform -translate-y-1">PREMIUM</span>
                      </h2>
                      <button 
                        onClick={() => setIsCreateKeyModalOpen(true)}
                        className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm"
                      >
                        <Plus className="w-4 h-4" /> Create API key
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="text"
                          placeholder="Search..."
                          value={apiKeySearch}
                          onChange={(e) => setApiKeySearch(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#111111] border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white"
                        />
                      </div>
                      <select
                        value={apiKeyFilter}
                        onChange={(e) => setApiKeyFilter(e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-[#111111] border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white"
                      >
                        <option>All permissions</option>
                        <option>Full access</option>
                        <option>Sending access</option>
                      </select>
                    </div>

                    <div className="bg-white dark:bg-[#111111] border border-neutral-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-neutral-50 dark:bg-zinc-900/40 text-neutral-500 dark:text-neutral-400 text-xs font-semibold">
                          <tr>
                            <th className="px-6 py-3 font-mono uppercase tracking-widest">Name</th>
                            <th className="px-6 py-3 font-mono uppercase tracking-widest">Token</th>
                            <th className="px-6 py-3 font-mono uppercase tracking-widest">Permission</th>
                            <th className="px-6 py-3 font-mono uppercase tracking-widest">Last used</th>
                            <th className="px-6 py-3 font-mono uppercase tracking-widest">Created</th>
                            <th className="px-6 py-3 text-right font-mono uppercase tracking-widest"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-zinc-800">
                          {apiKeys.map((key) => (
                            <tr key={key.id} className="hover:bg-neutral-50/50 dark:hover:bg-zinc-900/20 transition-colors">
                              <td className="px-6 py-4 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                  <Lock className="w-4 h-4 text-emerald-500" />
                                </div>
                                <span className="font-semibold text-neutral-900 dark:text-white">{key.name}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-2.5 py-1 bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 rounded-md font-mono text-xs text-neutral-600 dark:text-neutral-300">
                                  {key.token}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">{key.permission}</td>
                              <td className="px-6 py-4 text-neutral-500 dark:text-neutral-400">{key.lastUsed}</td>
                              <td className="px-6 py-4 text-neutral-500 dark:text-neutral-400">{key.createdAt}</td>
                              <td className="px-6 py-4 text-right">
                                <button className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                  <MoreHorizontal className="w-5 h-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
"""
content = content.replace('}{/* VIEW 6: CORPORATE BILLING & LEDGERS */}', '}\n' + api_view + '{/* VIEW 6: CORPORATE BILLING & LEDGERS */}')

# 4. Add modals to the end of the file (before final closing tag)
# The file likely has a main wrapper. Let's find `<div className="flex h-screen overflow-hidden...` and then find the corresponding closing.
# Easier: Just replace `{/* Support Drawer */}` and put our modals before it.
modals = """
      {/* Create API Key Modal */}
      {isCreateKeyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm" onClick={() => setIsCreateKeyModalOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-md bg-white dark:bg-[#111111] rounded-2xl shadow-2xl border border-neutral-200 dark:border-zinc-800 overflow-hidden"
          >
            <div className="p-6 border-b border-neutral-200 dark:border-zinc-800 flex justify-between items-center">
              <h3 className="text-xl font-display font-medium text-neutral-900 dark:text-white">Create API Key</h3>
              <button onClick={() => setIsCreateKeyModalOpen(false)} className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateApiKey} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">Name</label>
                <input 
                  type="text" 
                  value={newKeyName}
                  onChange={e => setNewKeyName(e.target.value)}
                  placeholder="e.g. Production Key"
                  className="w-full px-4 py-2 bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">Permission</label>
                <select 
                  value={newKeyPermission}
                  onChange={e => setNewKeyPermission(e.target.value)}
                  className="w-full px-4 py-2 bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white"
                >
                  <option>Full access</option>
                  <option>Sending access</option>
                </select>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold rounded-lg text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm">
                  Create Key
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* View Created API Key Modal */}
      {createdKey && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm" onClick={() => { setCreatedKey(null); setKeyCopied(false); setShowKeyVisible(false); }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-lg bg-white dark:bg-[#111111] rounded-2xl shadow-2xl border border-neutral-200 dark:border-zinc-800 overflow-hidden"
          >
            <div className="p-6 border-b border-neutral-200 dark:border-zinc-800 flex justify-between items-center">
              <h3 className="text-xl font-display font-medium text-neutral-900 dark:text-white">View API Key</h3>
              <button onClick={() => { setCreatedKey(null); setKeyCopied(false); setShowKeyVisible(false); }} className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  You can only see this key once. <strong>Store it safely.</strong>
                </p>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">API Key</label>
                <div className="relative flex items-center bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-lg p-1">
                  <input 
                    type={showKeyVisible ? "text" : "password"} 
                    value={createdKey.token}
                    readOnly
                    className="w-full bg-transparent border-none px-3 py-2 text-sm font-mono text-neutral-900 dark:text-white focus:outline-none"
                  />
                  <div className="flex items-center gap-1 pr-2">
                    <button onClick={() => setShowKeyVisible(!showKeyVisible)} className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors rounded-md hover:bg-neutral-200 dark:hover:bg-zinc-800">
                      {showKeyVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={() => { navigator.clipboard.writeText(createdKey.token); setKeyCopied(true); setTimeout(() => setKeyCopied(false), 2000); }} className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors rounded-md hover:bg-neutral-200 dark:hover:bg-zinc-800">
                      {keyCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <button onClick={() => { setCreatedKey(null); setKeyCopied(false); setShowKeyVisible(false); }} className="px-5 py-2.5 bg-neutral-100 dark:bg-zinc-800 text-neutral-900 dark:text-white font-semibold rounded-lg text-sm hover:bg-neutral-200 dark:hover:bg-zinc-700 transition-colors shadow-sm">
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
"""
content = content.replace('{/* Support Drawer */}', modals + '\n      {/* Support Drawer */}')

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
