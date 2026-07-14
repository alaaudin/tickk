import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# 1. Remove Pro Tip
pro_tip = """                        <div className="p-3 bg-neutral-100/60 dark:bg-zinc-900/40 rounded-xl border border-neutral-200/40 dark:border-zinc-800/40 text-[11px] text-zinc-600 dark:text-zinc-400">
                          💡 <strong>Pro Tip for Testing:</strong> You do not need to send a real email to test this! Just click the <strong>"⚡ Test Redirection (Simulate Click)"</strong> button on any link card below. This acts exactly as if a real client clicked your link!
                        </div>"""
content = content.replace(pro_tip, "")

# 2. Remove Simulate Click Button
simulate_btn = """                                <button 
                                  onClick={() => simulateLinkClick(tracker.id)}
                                  className="px-3.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-600 dark:text-neutral-900 dark:text-white text-xs font-semibold rounded-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
                                  title="Perform mock click operation to trigger telemetry feeds and premium success chime."
                                >
                                  ⚡ Test Redirection (Simulate Click)
                                </button>"""
content = content.replace(simulate_btn, "")

# 3. Replace Simulate click empty state text
old_empty_text = """No click signals captured yet. Send the email and wait or click "⚡ Test Redirection (Simulate Click)" above to verify routing feedback."""
new_empty_text = """No telemetry signals captured yet. Dispatch your correspondence and monitor this space for real-time routing feedback."""
content = content.replace(old_empty_text, new_empty_text)

# 4. Replace locked state with premium glassmorphism empty state
locked_block = """                      {dbTrackers.filter(t => t.linkUrl).length === 0 && (
                        <div className="relative rounded-2xl border border-neutral-200 dark:border-zinc-800/80 overflow-hidden select-none">
                          <div className="blur-sm opacity-60 pointer-events-none space-y-4 p-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="bg-white/70 dark:bg-zinc-950/45 p-6 rounded-2xl border border-neutral-200 dark:border-zinc-900 flex justify-between items-center">
                                  <div className="space-y-2">
                                    <div className="h-4 w-48 bg-neutral-300 dark:bg-zinc-700 rounded animate-pulse"></div>
                                    <div className="h-3 w-32 bg-neutral-200 dark:bg-zinc-800 rounded animate-pulse"></div>
                                  </div>
                                  <div className="h-10 w-32 bg-neutral-300 dark:bg-zinc-700 rounded-lg animate-pulse"></div>
                                </div>
                            ))}
                          </div>
                          
                          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/10 dark:bg-black/10 backdrop-blur-[2px]">
                            <div className="bg-white/90 dark:bg-zinc-900/90 p-6 rounded-2xl shadow-xl border border-neutral-200 dark:border-zinc-800 flex flex-col items-center text-center max-w-sm mx-4">
                              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-4">
                                <Lock className="w-6 h-6" />
                              </div>
                              <h3 className="text-lg font-display font-semibold text-neutral-900 dark:text-white mb-2">Premium Link Tracking</h3>
                              <p className="text-xs text-zinc-500 mb-6">Upgrade your plan to unlock advanced link tracking, deep analytics, and real-time redirection telemetry.</p>
                              <button onClick={() => setActiveTab("pricing")} className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2">
                                <Sparkles className="w-4 h-4" /> View Premium Plans
                              </button>
                            </div>
                          </div>
                        </div>
                      )}"""

premium_empty_block = """                      {dbTrackers.filter(t => t.linkUrl).length === 0 && (
                        <div className="relative rounded-3xl border border-neutral-200/50 dark:border-white/10 overflow-hidden bg-gradient-to-br from-white/40 to-white/10 dark:from-white/5 dark:to-transparent backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                          
                          <div className="relative z-10 p-12 flex flex-col items-center text-center">
                            <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-tr from-neutral-200 to-white dark:from-white/10 dark:to-white/5 p-[1px] shadow-lg">
                              <div className="w-full h-full rounded-2xl bg-white dark:bg-zinc-950 flex items-center justify-center">
                                <Activity className="w-8 h-8 text-neutral-800 dark:text-white opacity-80" />
                              </div>
                            </div>
                            <h3 className="text-2xl font-display font-light text-neutral-900 dark:text-white mb-3 tracking-tight">Awaiting Telemetry Sync</h3>
                            <p className="text-sm text-neutral-500 dark:text-zinc-400 max-w-md leading-relaxed">
                              Your active command center is online. Dispatch your tracking links and monitor this sector for high-fidelity redirection data and real-time geographic routing.
                            </p>
                            
                            <div className="mt-8 flex gap-4">
                              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100/50 dark:bg-white/5 border border-neutral-200/50 dark:border-white/10">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-xs font-mono font-medium text-neutral-600 dark:text-zinc-300">SYSTEM ONLINE</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Decorative subtle background shapes */}
                          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
                          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
                        </div>
                      )}"""

content = content.replace(locked_block, premium_empty_block)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)

