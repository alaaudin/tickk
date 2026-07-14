import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_empty_state = """                      {dbTrackers.filter(t => t.linkUrl).length === 0 && (
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

replace_empty_state = """                      {dbTrackers.filter(t => t.linkUrl).length === 0 && (
                        <div className="relative rounded-[2rem] border border-white/40 dark:border-white/10 bg-white/30 dark:bg-black/20 backdrop-blur-3xl overflow-hidden shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent dark:from-white/10 dark:via-transparent dark:to-black/40 pointer-events-none"></div>
                          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
                          
                          <div className="relative z-10 p-8 sm:p-12">
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                              <div className="flex-1 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-md shadow-sm">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                  <span className="text-[10px] font-mono font-medium tracking-widest text-neutral-700 dark:text-zinc-300 uppercase">System Ready & Standing By</span>
                                </div>
                                <h3 className="text-3xl sm:text-4xl font-display font-light text-neutral-900 dark:text-white tracking-tight leading-tight">
                                  Your telemetry <br/><span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-zinc-500">Command Center</span> is awaiting data.
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-zinc-400 max-w-md leading-relaxed font-normal">
                                  Generate your first tracking link above. We'll automatically build your analytics dashboard with real-time geographic routing, device intelligence, and engagement metrics the moment your first client clicks.
                                </p>
                              </div>
                              
                              <div className="flex-1 w-full max-w-md">
                                <div className="bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent dark:via-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                                  
                                  <div className="flex justify-between items-end mb-8">
                                    <div className="space-y-1">
                                      <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Simulated Analytics</p>
                                      <p className="text-2xl font-display font-medium text-neutral-900 dark:text-white">Global Reach</p>
                                    </div>
                                    <div className="flex gap-1.5">
                                      <div className="w-1 h-8 bg-emerald-500/20 rounded-full flex items-end"><div className="w-full h-1/3 bg-emerald-500 rounded-full"></div></div>
                                      <div className="w-1 h-8 bg-emerald-500/20 rounded-full flex items-end"><div className="w-full h-2/3 bg-emerald-500 rounded-full"></div></div>
                                      <div className="w-1 h-8 bg-emerald-500/20 rounded-full flex items-end"><div className="w-full h-full bg-emerald-500 rounded-full animate-pulse"></div></div>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/5">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-neutral-200/50 dark:bg-black/50 flex items-center justify-center text-xs">🇺🇸</div>
                                        <div className="space-y-0.5">
                                          <p className="text-xs font-medium text-neutral-900 dark:text-white">San Francisco, CA</p>
                                          <p className="text-[10px] text-zinc-500 font-mono">Chrome / macOS</p>
                                        </div>
                                      </div>
                                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">Just now</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/5 opacity-70">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-neutral-200/50 dark:bg-black/50 flex items-center justify-center text-xs">🇬🇧</div>
                                        <div className="space-y-0.5">
                                          <p className="text-xs font-medium text-neutral-900 dark:text-white">London, UK</p>
                                          <p className="text-[10px] text-zinc-500 font-mono">Safari / iOS</p>
                                        </div>
                                      </div>
                                      <span className="text-[10px] font-mono text-zinc-500">2m ago</span>
                                    </div>
                                  </div>
                                  
                                  <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-full blur-2xl"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}"""

if find_empty_state in content:
    content = content.replace(find_empty_state, replace_empty_state)
    print("Replaced successfully!")
else:
    print("Could not find empty state!")

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
