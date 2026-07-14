import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# 1. Update Sidebar Animation (White/Grey, 3D effect)
old_span = '<span className={`relative flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.15] group-hover:rotate-[6deg] group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:text-amber-500 dark:group-hover:text-amber-400 ${isActive ? "text-neutral-900 dark:text-white scale-110" : "text-zinc-500"}`}>'
new_span = '<span style={{ transformStyle: "preserve-3d" }} className={`relative flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1 group-hover:scale-110 group-hover:rotate-[-4deg] group-hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] dark:group-hover:drop-shadow-[0_8px_16px_rgba(255,255,255,0.15)] hover:text-neutral-700 dark:hover:text-zinc-200 ${isActive ? "text-neutral-900 dark:text-white scale-110" : "text-zinc-500"}`}>'
content = content.replace(old_span, new_span)

# 2. Add isCreatingKey state
state_block = """  const [isCreateKeyModalOpen, setIsCreateKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyPermission, setNewKeyPermission] = useState("Full access");
  const [isNewKeyPermissionOpen, setIsNewKeyPermissionOpen] = useState(false);
  const [createdKey, setCreatedKey] = useState<{name: string, token: string} | null>(null);
  const [showKeyVisible, setShowKeyVisible] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);"""

new_state_block = """  const [isCreateKeyModalOpen, setIsCreateKeyModalOpen] = useState(false);
  const [isCreatingKey, setIsCreatingKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyPermission, setNewKeyPermission] = useState("Full access");
  const [isNewKeyPermissionOpen, setIsNewKeyPermissionOpen] = useState(false);
  const [createdKey, setCreatedKey] = useState<{name: string, token: string} | null>(null);
  const [showKeyVisible, setShowKeyVisible] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);"""
content = content.replace(state_block, new_state_block)

# 3. Update handleCreateApiKey logic
old_handle_create = """  const handleCreateApiKey = (e: React.FormEvent) => {
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
  };"""

new_handle_create = """  const handleCreateApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    setIsCreatingKey(true);
    
    // Simulate Premium Key Generation Process
    setTimeout(() => {
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
      setIsCreatingKey(false);
      setIsCreateKeyModalOpen(false);
      setNewKeyName("");
      setShowKeyVisible(false);
      if (soundEnabled) playSuccessChime();
    }, 1500);
  };"""
content = content.replace(old_handle_create, new_handle_create)

# 4. Update the modals (Fix dropdown z-index and Premium UI for modals)
# Replace the old modal block entirely
old_modals_start = "{/* Create API Key Modal */}"
old_modals_end = " {/* BETA WELCOME MODAL */}"

import sys
start_idx = content.find(old_modals_start)
end_idx = content.find(old_modals_end)
if start_idx == -1 or end_idx == -1:
    print("Could not find modals block")
    sys.exit(1)

new_modals = """{/* Create API Key Modal */}
      <AnimatePresence>
        {isCreateKeyModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#090a0c] border border-neutral-200 dark:border-zinc-800 rounded-3xl w-full max-w-md overflow-visible shadow-2xl relative"
            >
              <div className="flex justify-between items-center p-6 border-b border-neutral-200 dark:border-zinc-900">
                <h3 className="text-xl font-medium font-display text-neutral-900 dark:text-white">Create API Key</h3>
                <button disabled={isCreatingKey} onClick={() => setIsCreateKeyModalOpen(false)} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreateApiKey} className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-900 dark:text-white block">Name</label>
                  <input
                    type="text"
                    required
                    disabled={isCreatingKey}
                    placeholder="e.g. Production Environment"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2 relative">
                  <label className="text-sm font-medium text-neutral-900 dark:text-white block">Permission</label>
                  <div className="relative">
                    <button
                      type="button"
                      disabled={isCreatingKey}
                      onClick={() => setIsNewKeyPermissionOpen(!isNewKeyPermissionOpen)}
                      onBlur={() => setTimeout(() => setIsNewKeyPermissionOpen(false), 150)}
                      className="w-full px-4 py-2 bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white text-left flex justify-between items-center disabled:opacity-50"
                    >
                      {newKeyPermission}
                      <ChevronDown className="w-4 h-4 text-neutral-500" />
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
                  </div>
                </div>
                <div className="pt-2 flex justify-end gap-3">
                  <button type="button" disabled={isCreatingKey} onClick={() => setIsCreateKeyModalOpen(false)} className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-50">
                    Cancel
                  </button>
                  <button type="submit" disabled={isCreatingKey} className="relative px-6 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm font-semibold rounded-lg transition-all shadow-sm disabled:opacity-80 flex items-center justify-center min-w-[130px] overflow-hidden">
                    {isCreatingKey ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-neutral-900 border-t-transparent dark:border-white dark:border-t-transparent rounded-full animate-spin" />
                        Generating
                      </span>
                    ) : (
                      "Create API Key"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Created API Key Modal - PREMIUM */}
      <AnimatePresence>
        {createdKey && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-zinc-800 rounded-[24px] w-full max-w-[500px] overflow-hidden shadow-2xl relative"
            >
              {/* Premium Top Gradient Border Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 dark:from-emerald-600 dark:via-teal-500 dark:to-emerald-600" />
              
              <div className="flex justify-between items-center p-6 pb-4">
                <h3 className="text-[17px] font-semibold font-sans text-neutral-900 dark:text-white tracking-tight">View API Key</h3>
                <button onClick={() => setCreatedKey(null)} className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors bg-transparent rounded-md hover:bg-neutral-100 dark:hover:bg-zinc-800/50">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="px-6 pb-6 space-y-6">
                {/* Premium Info Banner (Replaces standard blue) */}
                <div className="flex items-center gap-3 p-4 bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/20 rounded-xl text-emerald-800 dark:text-emerald-400">
                  <div className="w-5 h-5 shrink-0 rounded-full border border-current flex items-center justify-center font-bold text-xs italic">i</div>
                  <p className="text-[13px] tracking-wide">You can only see this key once. <strong>Store it safely.</strong></p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-neutral-700 dark:text-zinc-400 block">API Key</label>
                  <div className="relative group">
                    <input
                      type={showKeyVisible ? "text" : "password"}
                      readOnly
                      value={createdKey.token}
                      className="w-full pl-4 pr-[70px] py-3.5 bg-neutral-50 dark:bg-[#151518] border border-neutral-200 dark:border-zinc-800 rounded-xl text-[14px] font-mono text-neutral-900 dark:text-white outline-none focus:border-neutral-400 dark:focus:border-zinc-600 transition-colors shadow-sm"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                      <button 
                        onClick={() => setShowKeyVisible(!showKeyVisible)}
                        className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        title={showKeyVisible ? "Hide key" : "Show key"}
                      >
                        {showKeyVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(createdKey.token);
                          setKeyCopied(true);
                          setTimeout(() => setKeyCopied(false), 2000);
                        }}
                        className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        title="Copy key"
                      >
                        {keyCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button onClick={() => setCreatedKey(null)} className="w-auto px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-neutral-900 text-[14px] font-semibold rounded-lg transition-all shadow-sm">
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

"""

content = content[:start_idx] + new_modals + content[end_idx:]

# 5. Fix the Dropdown for API Keys being hidden/clipped. 
# It currently has: <td className="px-6 py-4 text-right relative">
# Let's fix the dropdown z-index and position
old_key_dropdown = """                                <button 
                                  onClick={() => setOpenKeyDropdown(openKeyDropdown === key.id ? null : key.id)}
                                  onBlur={() => setTimeout(() => setOpenKeyDropdown(null), 150)}
                                  className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors relative z-10"
                                >
                                  <MoreHorizontal className="w-5 h-5" />
                                </button>
                                {openKeyDropdown === key.id && (
                                  <div className="absolute right-6 top-10 w-48 rounded-xl bg-white/30 dark:bg-[#111111]/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden p-1 animate-in fade-in slide-in-from-top-2">"""

new_key_dropdown = """                                <button 
                                  onClick={() => setOpenKeyDropdown(openKeyDropdown === key.id ? null : key.id)}
                                  onBlur={() => setTimeout(() => setOpenKeyDropdown(null), 150)}
                                  className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors relative z-10"
                                >
                                  <MoreHorizontal className="w-5 h-5" />
                                </button>
                                {openKeyDropdown === key.id && (
                                  <div className="absolute right-10 top-1/2 -translate-y-1/2 w-48 rounded-xl bg-white/80 dark:bg-[#1a1a1c]/90 backdrop-blur-3xl border border-neutral-200/80 dark:border-zinc-700/80 shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.7)] z-[999] overflow-hidden p-1 animate-in fade-in zoom-in-95">"""

content = content.replace(old_key_dropdown, new_key_dropdown)

# Ensure the tr doesn't cause clipping
old_tr = '<tr key={key.id} className="hover:bg-neutral-50/50 dark:hover:bg-zinc-900/20 transition-colors">'
new_tr = '<tr key={key.id} className="hover:bg-neutral-50/50 dark:hover:bg-zinc-900/20 transition-colors group relative z-0 hover:z-50">'
content = content.replace(old_tr, new_tr)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)

