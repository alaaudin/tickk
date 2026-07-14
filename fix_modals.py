import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

modals = """
      {/* Create API Key Modal */}
      <AnimatePresence>
        {isCreateKeyModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#090a0c] border border-neutral-200 dark:border-zinc-800 rounded-3xl w-full max-w-md overflow-visible shadow-2xl relative"
            >
              <div className="flex justify-between items-center p-6 border-b border-neutral-200 dark:border-zinc-900">
                <h3 className="text-xl font-medium font-display text-neutral-900 dark:text-white">Create API Key</h3>
                <button onClick={() => setIsCreateKeyModalOpen(false)} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreateApiKey} className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-900 dark:text-white block">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Production Environment"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2 relative">
                  <label className="text-sm font-medium text-neutral-900 dark:text-white block">Permission</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsNewKeyPermissionOpen(!isNewKeyPermissionOpen)}
                      onBlur={() => setTimeout(() => setIsNewKeyPermissionOpen(false), 150)}
                      className="w-full px-4 py-2 bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white text-left flex justify-between items-center"
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
                  <button type="button" onClick={() => setIsCreateKeyModalOpen(false)} className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm font-semibold rounded-lg transition-all shadow-sm">
                    Create API Key
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Created API Key Modal */}
      <AnimatePresence>
        {createdKey && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#090a0c] border border-neutral-200 dark:border-zinc-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative"
            >
              <div className="flex justify-between items-center p-6 border-b border-neutral-200 dark:border-zinc-900">
                <h3 className="text-xl font-medium font-display text-neutral-900 dark:text-white">View API Key</h3>
                <button onClick={() => setCreatedKey(null)} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3 p-4 bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20 dark:border-amber-500/20 rounded-xl text-amber-700 dark:text-amber-500">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm">You can only see this key once. <strong>Store it safely.</strong></p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-900 dark:text-white block">API Key</label>
                  <div className="relative">
                    <input
                      type={showKeyVisible ? "text" : "password"}
                      readOnly
                      value={createdKey.token}
                      className="w-full pl-4 pr-20 py-3 bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-xl text-sm font-mono text-neutral-900 dark:text-white"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <button 
                        onClick={() => setShowKeyVisible(!showKeyVisible)}
                        className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
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
                        className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        title="Copy key"
                      >
                        {keyCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 flex justify-start">
                  <button onClick={() => setCreatedKey(null)} className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm font-semibold rounded-lg transition-all shadow-sm">
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
"""

content = content.replace("    </div>\n  );\n}", modals + "    </div>\n  );\n}")

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
