import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_str = r'''      {/\* BETA WELCOME MODAL \*/}'''

repl_str = r'''      {/* TICKET DETAILS MODAL */}
      <AnimatePresence>
        {selectedTicket && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white/80 dark:bg-[#090a0c]/80 backdrop-blur-3xl border border-neutral-200/50 dark:border-zinc-800/50 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-zinc-400 via-neutral-800 to-zinc-400 dark:from-zinc-600 dark:via-zinc-200 dark:to-zinc-600" />
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wider ${
                        selectedTicket.category === 'bug' ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                        : selectedTicket.category === 'feature' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                        : 'bg-zinc-500/10 text-zinc-500 border border-zinc-500/20'
                      }`}>
                        {selectedTicket.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wider flex items-center gap-1.5 ${
                        selectedTicket.status === 'submitted' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-500/20'
                        : selectedTicket.status === 'reviewed' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-500 border border-blue-500/20'
                        : 'bg-green-500/10 text-green-600 dark:text-green-500 border border-green-500/20'
                      }`}>
                        {selectedTicket.status}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">#{selectedTicket.id.substring(0, 8).toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-light font-display text-neutral-900 dark:text-white tracking-tight">{selectedTicket.subject}</h3>
                  </div>
                  <button onClick={() => setSelectedTicket(null)} className="p-2 hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400 dark:text-zinc-500 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200/50 dark:border-zinc-800/80 rounded-2xl p-5 mb-6">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-neutral-200 dark:border-zinc-800/80">
                    <div className="w-8 h-8 bg-neutral-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-xs font-medium text-neutral-600 dark:text-zinc-300">
                      {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-900 dark:text-zinc-100">{userEmail}</div>
                      <div className="text-[10px] text-zinc-500">{new Date(selectedTicket.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="text-sm text-neutral-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap font-sans">
                    {selectedTicket.message}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button onClick={() => setSelectedTicket(null)} className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-neutral-900 text-sm font-semibold rounded-xl transition-colors cursor-pointer">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BETA WELCOME MODAL */}'''

content = re.sub(find_str, repl_str, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
