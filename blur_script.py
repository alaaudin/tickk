import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_empty_state = """                      {dbTrackers.filter(t => t.linkUrl).length === 0 && (
                        <div className="py-12 bg-white/40 dark:bg-zinc-900/20 rounded-2xl border border-neutral-200 dark:border-zinc-800/80 text-center text-zinc-500 italic font-normal text-xs font-sans">
                          No redirect links configured. Email Trackers with redirect links will automatically register telemetry trackers inside this workspace.
                        </div>
                      )}"""

replace_empty_state = """                      {dbTrackers.filter(t => t.linkUrl).length === 0 && (
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

if find_empty_state in content:
    content = content.replace(find_empty_state, replace_empty_state)
else:
    print("Could not find the empty state code block.")

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
