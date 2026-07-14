import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find = r'''                      \{\/\* OTHER PLACEHOLDERS \(Privacy, Mobile\) \*\/\}
                      \{\['privacy', 'mobile'\].includes\(activeSettingsTab\) && \(
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-5 opacity-70 pt-24 max-w-md mx-auto">
                          <div className="w-16 h-16 bg-neutral-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-neutral-400 dark:text-zinc-500 shadow-inner">
                            <Settings className="w-8 h-8" />
                          </div>
                          <div>
                            <h3 className="text-xl font-light font-display text-neutral-900 dark:text-white capitalize tracking-tight mb-2">\{activeSettingsTab\} Parameters</h3>
                            <p className="text-\[13px\] text-zinc-500 leading-relaxed font-sans">This module is currently being provisioned for your enterprise workspace. Telemetry configuration will be unlocked shortly.</p>
                          </div>
                        </div>
                      \)\}'''

repl = r'''                      {/* Notifications View */}
                      {activeSettingsTab === 'notifications' && (
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-12 animate-fadeIn space-y-8">
                          <div>
                            <h2 className="text-2xl font-light font-display text-neutral-900 dark:text-white mb-2">Notification Preferences</h2>
                            <p className="text-sm text-zinc-500 font-sans">Manage how and when you receive alerts for tracking events.</p>
                          </div>
                          
                          <div className="space-y-6">
                            <div className="p-6 bg-white/50 dark:bg-black/20 border border-neutral-200/80 dark:border-zinc-800/80 rounded-2xl space-y-6 shadow-sm">
                              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-white/5 pb-3 font-display">Email Alerts</h3>
                              <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <div className="text-[13px] font-medium text-neutral-800 dark:text-zinc-200">First Open Alert</div>
                                    <div className="text-[11px] text-zinc-500">Notify me immediately the first time an email is opened.</div>
                                  </div>
                                  <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer flex items-center px-0.5 transition-colors shadow-inner"><div className="w-4 h-4 bg-white rounded-full translate-x-5 shadow-sm transition-transform"></div></div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <div className="text-[13px] font-medium text-neutral-800 dark:text-zinc-200">Link Clicks</div>
                                    <div className="text-[11px] text-zinc-500">Notify me when any tracked link is clicked.</div>
                                  </div>
                                  <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer flex items-center px-0.5 transition-colors shadow-inner"><div className="w-4 h-4 bg-white rounded-full translate-x-5 shadow-sm transition-transform"></div></div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <div className="text-[13px] font-medium text-neutral-800 dark:text-zinc-200">Daily Digest</div>
                                    <div className="text-[11px] text-zinc-500">Receive a daily summary of all tracking activity.</div>
                                  </div>
                                  <div className="w-10 h-5 bg-neutral-200 dark:bg-zinc-800 rounded-full relative cursor-pointer flex items-center px-0.5 transition-colors shadow-inner"><div className="w-4 h-4 bg-white dark:bg-zinc-400 rounded-full shadow-sm transition-transform"></div></div>
                                </div>
                              </div>
                            </div>
                            <div className="p-6 bg-white/50 dark:bg-black/20 border border-neutral-200/80 dark:border-zinc-800/80 rounded-2xl space-y-6 shadow-sm">
                              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-white/5 pb-3 font-display">Desktop & Webhook</h3>
                              <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <div className="text-[13px] font-medium text-neutral-800 dark:text-zinc-200">Browser Push Notifications</div>
                                    <div className="text-[11px] text-zinc-500">Receive native desktop alerts.</div>
                                  </div>
                                  <button className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-zinc-200 text-[11px] font-bold text-white dark:text-neutral-900 rounded-md transition-colors">Enable</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Subscription View */}
                      {activeSettingsTab === 'subscription' && (
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-12 animate-fadeIn space-y-8">
                          <div>
                            <h2 className="text-2xl font-light font-display text-neutral-900 dark:text-white mb-2">Subscription & Billing</h2>
                            <p className="text-sm text-zinc-500 font-sans">Manage your current plan and billing history.</p>
                          </div>
                          
                          <div className="p-6 bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-zinc-900/50 dark:via-zinc-900/30 dark:to-zinc-950/50 border border-neutral-200 dark:border-zinc-800/80 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6">
                              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold tracking-widest uppercase rounded-full border border-emerald-500/20 font-mono">Active</span>
                            </div>
                            <h3 className="text-sm font-semibold text-neutral-500 dark:text-zinc-400 uppercase tracking-widest font-mono mb-1">Current Plan</h3>
                            <div className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight mb-4">Beta Pro Access</div>
                            <div className="flex items-center gap-2 mb-6 text-sm text-neutral-700 dark:text-zinc-300">
                              <span className="font-bold">$0.00</span> / month (Early Adopter)
                            </div>
                            
                            <div className="space-y-3 border-t border-neutral-200 dark:border-zinc-800 pt-6">
                              <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-zinc-400">
                                <Check className="w-4 h-4 text-emerald-500" /> Unlimited Trackers
                              </div>
                              <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-zinc-400">
                                <Check className="w-4 h-4 text-emerald-500" /> Detailed Device Logs
                              </div>
                              <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-zinc-400">
                                <Check className="w-4 h-4 text-emerald-500" /> API Access (Standard)
                              </div>
                            </div>
                            <div className="mt-8">
                              <button onClick={() => setActiveTab('performance')} className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-neutral-900 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-md">Upgrade Plan</button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Privacy View */}
                      {activeSettingsTab === 'privacy' && (
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-12 animate-fadeIn space-y-8">
                          <div>
                            <h2 className="text-2xl font-light font-display text-neutral-900 dark:text-white mb-2">Privacy & Security</h2>
                            <p className="text-sm text-zinc-500 font-sans">Control how data is collected and your security preferences.</p>
                          </div>
                          
                          <div className="space-y-6">
                            <div className="p-6 bg-white/50 dark:bg-black/20 border border-neutral-200/80 dark:border-zinc-800/80 rounded-2xl space-y-6 shadow-sm">
                              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-white/5 pb-3 font-display">Data Collection</h3>
                              <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <div className="text-[13px] font-medium text-neutral-800 dark:text-zinc-200">Capture IP Addresses</div>
                                    <div className="text-[11px] text-zinc-500">Log recipient IP addresses to determine approximate location.</div>
                                  </div>
                                  <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer flex items-center px-0.5 transition-colors shadow-inner"><div className="w-4 h-4 bg-white rounded-full translate-x-5 shadow-sm transition-transform"></div></div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <div className="text-[13px] font-medium text-neutral-800 dark:text-zinc-200">Capture User Agent</div>
                                  </div>
                                  <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer flex items-center px-0.5 transition-colors shadow-inner"><div className="w-4 h-4 bg-white rounded-full translate-x-5 shadow-sm transition-transform"></div></div>
                                </div>
                              </div>
                            </div>

                            <div className="p-6 bg-white/50 dark:bg-black/20 border border-neutral-200/80 dark:border-zinc-800/80 rounded-2xl space-y-6 shadow-sm">
                              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-white/5 pb-3 font-display">Security</h3>
                              <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <div className="text-[13px] font-medium text-neutral-800 dark:text-zinc-200">Two-Factor Authentication</div>
                                    <div className="text-[11px] text-zinc-500">Add an extra layer of security to your account.</div>
                                  </div>
                                  <button className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-zinc-200 text-[11px] font-bold text-white dark:text-neutral-900 rounded-md transition-colors">Setup 2FA</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Team View */}
                      {activeSettingsTab === 'team' && (
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-12 animate-fadeIn space-y-8">
                          <div className="flex justify-between items-start">
                            <div>
                              <h2 className="text-2xl font-light font-display text-neutral-900 dark:text-white mb-2">Team Members</h2>
                              <p className="text-sm text-zinc-500 font-sans">Manage who has access to this workspace.</p>
                            </div>
                            <button className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-neutral-900 text-[11px] font-bold rounded-lg transition-colors cursor-pointer shadow-md flex items-center gap-2">
                              <UserPlus className="w-3.5 h-3.5" /> Invite Member
                            </button>
                          </div>
                          
                          <div className="bg-white/50 dark:bg-black/20 border border-neutral-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-4 border-b border-neutral-200/80 dark:border-zinc-800/80 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold border border-emerald-500/20">ME</div>
                                <div>
                                  <div className="text-sm font-medium text-neutral-900 dark:text-white">Admin User</div>
                                  <div className="text-xs text-zinc-500">razafragranceofficial@gmail.com</div>
                                </div>
                              </div>
                              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-zinc-400">Owner</span>
                            </div>
                            <div className="p-8 text-center text-zinc-500 dark:text-zinc-500 text-sm italic font-sans bg-neutral-50/50 dark:bg-zinc-900/20">
                              You are currently the only member in this workspace.
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Mobile App View */}
                      {activeSettingsTab === 'mobile' && (
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-12 animate-fadeIn space-y-8">
                          <div>
                            <h2 className="text-2xl font-light font-display text-neutral-900 dark:text-white mb-2">Mobile Application</h2>
                            <p className="text-sm text-zinc-500 font-sans">Connect your device for real-time push notifications.</p>
                          </div>
                          
                          <div className="p-8 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl flex flex-col md:flex-row items-center gap-8 shadow-sm">
                            <div className="w-32 h-32 bg-white dark:bg-zinc-900 p-2 rounded-xl shadow-md border border-neutral-200 dark:border-zinc-800 shrink-0">
                              <div className="w-full h-full border-2 border-dashed border-neutral-200 dark:border-zinc-800 rounded-lg flex items-center justify-center bg-neutral-50 dark:bg-zinc-950 flex-col gap-2">
                                <Smartphone className="w-6 h-6 text-neutral-400" />
                                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">QR CODE</span>
                              </div>
                            </div>
                            <div className="space-y-4 text-center md:text-left">
                              <h3 className="text-xl font-medium text-neutral-900 dark:text-white font-display">Download the Tickk Companion App</h3>
                              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                                Scan the QR code to download our iOS or Android app. Get instant push notifications the moment your emails are opened, right on your lock screen.
                              </p>
                              <div className="flex items-center gap-3 justify-center md:justify-start pt-2">
                                <button className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors shadow-md">App Store</button>
                                <button className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors shadow-md">Google Play</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}'''

content = re.sub(find, repl, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
