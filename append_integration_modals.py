import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

modal_code = """
      {/* Premium Integration Modal */}
      <AnimatePresence>
        {integrationModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white/40 dark:bg-black/20 backdrop-blur-3xl border border-white/50 dark:border-white/10 rounded-[24px] w-full max-w-[500px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="flex justify-between items-center p-6 pb-4">
                  <h3 className="text-xl font-semibold font-display text-neutral-900 dark:text-white tracking-tight">Connect {integrationModalOpen.name}</h3>
                  <button onClick={() => setIntegrationModalOpen(null)} className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors bg-white/20 dark:bg-black/20 rounded-full hover:bg-white/50 dark:hover:bg-white/10 cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setIsIntegrationVerifying(true);
                  setTimeout(() => {
                    setIsIntegrationVerifying(false);
                    setIntegrationModalOpen(null);
                    setIntegrationSuccess(integrationModalOpen.id);
                    setIntegrationsStatus(prev => ({...prev, [integrationModalOpen.id]: 'connected'}));
                    try { if (soundEnabled) playSuccessChime(); } catch(e) {}
                  }, 2000);
                }} className="px-6 pb-6 space-y-6">
                  
                  <div className="space-y-2">
                    <p className="text-sm text-neutral-600 dark:text-zinc-400">
                      {integrationModalOpen.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {integrationModalOpen.fields.map(field => (
                      <div key={field.id} className="space-y-2">
                        <label className="text-[13px] font-medium text-neutral-700 dark:text-zinc-300 block">{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          required
                          value={integrationFormData[field.id] || ''}
                          onChange={(e) => setIntegrationFormData(prev => ({...prev, [field.id]: e.target.value}))}
                          className="w-full px-4 py-3 bg-white/60 dark:bg-black/40 border border-neutral-200/50 dark:border-zinc-800/50 rounded-xl text-sm font-sans text-neutral-900 dark:text-white outline-none focus:border-neutral-400 dark:focus:border-zinc-600 transition-colors shadow-inner"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 flex justify-end gap-3">
                    <button type="button" disabled={isIntegrationVerifying} onClick={() => setIntegrationModalOpen(null)} className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-zinc-300 hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-50 cursor-pointer">
                      Cancel
                    </button>
                    <button type="submit" disabled={isIntegrationVerifying} className="relative px-6 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm font-semibold rounded-xl transition-all shadow-lg disabled:opacity-80 flex items-center justify-center min-w-[140px] overflow-hidden cursor-pointer">
                      {isIntegrationVerifying ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Verifying
                        </span>
                      ) : (
                        "Connect & Verify"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Premium Integration Success Modal */}
      <AnimatePresence>
        {integrationSuccess && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white/40 dark:bg-black/30 backdrop-blur-3xl border border-white/50 dark:border-white/10 rounded-[24px] w-full max-w-[400px] overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.2)] dark:shadow-[0_16px_64px_rgba(0,0,0,0.6)] relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent dark:from-emerald-500/5 dark:to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center justify-center p-10 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-2 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                  <Check className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display text-neutral-900 dark:text-white tracking-tight mb-2">Connected Successfully</h3>
                  <p className="text-sm text-neutral-600 dark:text-zinc-400">Your integration is now active and ready to sync telemetry data.</p>
                </div>
                <button onClick={() => setIntegrationSuccess(null)} className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm font-semibold rounded-xl transition-all shadow-lg mt-4 cursor-pointer">
                  Continue
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
"""

content = content.replace(
    '    </div>\n  );\n}',
    modal_code + '    </div>\n  );\n}'
)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
