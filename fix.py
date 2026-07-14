with open('src/components/Dashboard.tsx', 'r') as f:
    code = f.read()

import re

# We will completely replace the whole block from previewTab === 'visual' down to the end
pattern = r'\{\s*previewTab === \'visual\' \? \([\s\S]*'

repl = '''{previewTab === 'visual' ? (
                  <div className="p-4 md:p-8 flex justify-center">
                    {/* Simulated Client Window */}
                    {previewTracker.recipient.includes('gmail') ? (
                      <div className="w-full max-w-4xl bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-zinc-800 font-sans">
                        {/* Gmail Header */}
                        <div className="h-16 flex items-center px-4 border-b border-neutral-100 dark:border-zinc-800/80 bg-white dark:bg-[#1a1a1a]">
                          <div className="flex items-center gap-4 text-neutral-600 dark:text-zinc-400">
                            <Menu className="w-5 h-5" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="w-7 h-7 object-contain" referrerPolicy="no-referrer" />
                            <span className="text-xl font-medium text-neutral-600 dark:text-zinc-300 -ml-2">Gmail</span>
                          </div>
                          <div className="ml-8 flex-1 max-w-2xl bg-neutral-100 dark:bg-zinc-800/60 rounded-full h-12 flex items-center px-4">
                            <Search className="w-5 h-5 text-neutral-500 dark:text-zinc-400 mr-3" />
                            <span className="text-neutral-500 dark:text-zinc-400 text-base">Search mail</span>
                          </div>
                        </div>
                        {/* Gmail Body Area */}
                        <div className="flex h-[500px]">
                          {/* Sidebar Mock */}
                          <div className="w-64 p-4 hidden md:block space-y-2">
                            <div className="bg-[#c2e7ff] dark:bg-[#004a77] text-[#001d35] dark:text-[#c2e7ff] rounded-full px-4 py-3 flex items-center font-medium text-sm gap-4 cursor-pointer">
                              <Inbox className="w-4 h-4" /> Inbox
                            </div>
                            <div className="text-neutral-700 dark:text-zinc-300 rounded-full px-4 py-2 flex items-center font-medium text-sm gap-4 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/50">
                              <Star className="w-4 h-4" /> Starred
                            </div>
                            <div className="text-neutral-700 dark:text-zinc-300 rounded-full px-4 py-2 flex items-center font-medium text-sm gap-4 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/50">
                              <Clock className="w-4 h-4" /> Snoozed
                            </div>
                            <div className="text-neutral-700 dark:text-zinc-300 rounded-full px-4 py-2 flex items-center font-medium text-sm gap-4 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/50">
                              <Send className="w-4 h-4" /> Sent
                            </div>
                          </div>
                          {/* Email Content */}
                          <div className="flex-1 bg-white dark:bg-[#1a1a1a] p-6 overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                              <h2 className="text-[22px] font-normal text-neutral-900 dark:text-neutral-100">{previewTracker.title}</h2>
                              <div className="flex gap-4">
                                <Printer className="w-5 h-5 text-neutral-600 dark:text-zinc-400 cursor-pointer" />
                                <ExternalLink className="w-5 h-5 text-neutral-600 dark:text-zinc-400 cursor-pointer" />
                              </div>
                            </div>
                            <div className="flex items-start gap-3 mb-6">
                              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-medium">
                                {corporateEmail.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">{fullName}</span>
                                    <span className="text-xs text-neutral-500 dark:text-zinc-400 ml-2">&lt;{corporateEmail}&gt;</span>
                                  </div>
                                  <div className="text-xs text-neutral-500 dark:text-zinc-400">
                                    {new Date(previewTracker.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                                  </div>
                                </div>
                                <div className="text-xs text-neutral-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1">
                                  to me <ChevronDown className="w-3 h-3" />
                                </div>
                              </div>
                            </div>
                            
                            {/* The actual simulated content */}
                            <div className="text-sm text-[#202124] dark:text-[#e8eaed] space-y-4 max-w-3xl leading-relaxed ml-12">
                              <div dangerouslySetInnerHTML={{ __html: getTrackerHtmlBody(previewTracker) }} />
                            </div>
                            
                            {/* Secret pixel */}
                            <div className="mt-12 ml-12 p-3 bg-neutral-50 dark:bg-[#202124] border border-emerald-500/20 dark:border-emerald-500/10 rounded-lg flex items-start gap-3 relative overflow-hidden group max-w-lg">
                              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="mt-0.5">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              </div>
                              <div className="space-y-1">
                                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Secret pixel injected</div>
                                <code className="text-[10px] text-zinc-500 dark:text-zinc-400 break-all bg-white dark:bg-black px-2 py-0.5 rounded border border-neutral-200 dark:border-zinc-800 tracking-widest">
                                  ***********************************
                                </code>
                              </div>
                            </div>
                            
                            <div className="mt-8 ml-12 flex gap-2">
                              <button className="px-6 py-2 border border-neutral-300 dark:border-zinc-700 rounded-full text-sm font-medium text-neutral-700 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2">
                                <CornerUpLeft className="w-4 h-4" /> Reply
                              </button>
                              <button className="px-6 py-2 border border-neutral-300 dark:border-zinc-700 rounded-full text-sm font-medium text-neutral-700 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2">
                                <CornerUpRight className="w-4 h-4" /> Forward
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full max-w-4xl bg-white dark:bg-[#111111] rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-zinc-800 font-sans">
                        {/* Outlook Header */}
                        <div className="h-12 bg-[#0078d4] flex items-center px-4">
                          <div className="flex items-center gap-2">
                            <div className="text-white font-semibold text-[15px]">Outlook</div>
                          </div>
                          <div className="mx-auto max-w-xl w-full">
                            <div className="bg-white/20 hover:bg-white/30 transition-colors rounded h-8 flex items-center px-3 mx-4">
                              <Search className="w-4 h-4 text-white/90 mr-2" />
                              <span className="text-white/80 text-sm">Search</span>
                            </div>
                          </div>
                        </div>
                        {/* Outlook Toolbar */}
                        <div className="h-14 border-b border-neutral-200 dark:border-zinc-800 flex items-center px-4 gap-6 bg-white dark:bg-[#111111]">
                          <div className="flex items-center gap-2 cursor-pointer">
                            <CornerUpLeft className="w-4 h-4 text-neutral-700 dark:text-zinc-300" />
                            <span className="text-sm text-neutral-700 dark:text-zinc-300 font-medium">Reply</span>
                          </div>
                          <div className="flex items-center gap-2 cursor-pointer">
                            <CornerUpLeft className="w-4 h-4 text-neutral-700 dark:text-zinc-300 transform -scale-x-100" />
                            <span className="text-sm text-neutral-700 dark:text-zinc-300 font-medium">Reply all</span>
                          </div>
                          <div className="flex items-center gap-2 cursor-pointer">
                            <CornerUpRight className="w-4 h-4 text-neutral-700 dark:text-zinc-300" />
                            <span className="text-sm text-neutral-700 dark:text-zinc-300 font-medium">Forward</span>
                          </div>
                          <div className="h-6 w-px bg-neutral-300 dark:bg-zinc-700 mx-2" />
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Trash2 className="w-4 h-4 text-neutral-700 dark:text-zinc-300" />
                            <span className="text-sm text-neutral-700 dark:text-zinc-300 font-medium">Delete</span>
                          </div>
                        </div>
                        {/* Outlook Body Area */}
                        <div className="flex h-[500px]">
                          {/* Sidebar */}
                          <div className="w-56 p-2 hidden md:block border-r border-neutral-200 dark:border-zinc-800 bg-neutral-50 dark:bg-[#111111]">
                            <div className="bg-neutral-200/50 dark:bg-zinc-800/50 rounded-md px-3 py-2 flex items-center text-sm text-neutral-900 dark:text-zinc-100 font-medium cursor-pointer">
                              <ChevronRight className="w-4 h-4 mr-1" /> Inbox
                            </div>
                            <div className="rounded-md px-3 py-2 flex items-center text-sm text-neutral-700 dark:text-zinc-300 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/30">
                              <ChevronRight className="w-4 h-4 mr-1 opacity-0" /> Sent Items
                            </div>
                            <div className="rounded-md px-3 py-2 flex items-center text-sm text-neutral-700 dark:text-zinc-300 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/30">
                              <ChevronRight className="w-4 h-4 mr-1 opacity-0" /> Drafts
                            </div>
                            <div className="rounded-md px-3 py-2 flex items-center text-sm text-neutral-700 dark:text-zinc-300 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/30">
                              <ChevronRight className="w-4 h-4 mr-1 opacity-0" /> Deleted Items
                            </div>
                          </div>
                          {/* Email Content */}
                          <div className="flex-1 bg-white dark:bg-[#111111] p-6 overflow-y-auto">
                            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">{previewTracker.title}</h2>
                            <div className="flex items-center gap-3 mb-6">
                              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-700 dark:text-blue-400 text-lg font-medium">
                                {corporateEmail.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="font-bold text-[13px] text-neutral-900 dark:text-white">{fullName}</span>
                                    <span className="text-[13px] text-neutral-500 dark:text-zinc-400 ml-1">&lt;{corporateEmail}&gt;</span>
                                  </div>
                                  <div className="text-[12px] text-neutral-500 dark:text-zinc-400">
                                    {new Date(previewTracker.createdAt).toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
                                  </div>
                                </div>
                                <div className="text-[12px] text-neutral-500 dark:text-zinc-400 mt-0.5">
                                  To: {previewTracker.recipient}
                                </div>
                              </div>
                            </div>
                            
                            {/* The actual simulated content */}
                            <div className="text-[13px] text-[#333] dark:text-[#ccc] space-y-4 max-w-3xl leading-relaxed bg-white dark:bg-[#111111]">
                              <div dangerouslySetInnerHTML={{ __html: getTrackerHtmlBody(previewTracker) }} />
                            </div>
                            
                            {/* Secret pixel */}
                            <div className="mt-12 p-3 bg-neutral-50 dark:bg-[#1f1f1f] border border-emerald-500/20 dark:border-emerald-500/10 rounded-lg flex items-start gap-3 relative overflow-hidden group max-w-lg">
                              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="mt-0.5">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              </div>
                              <div className="space-y-1">
                                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Secret pixel injected</div>
                                <code className="text-[10px] text-zinc-500 dark:text-zinc-400 break-all bg-white dark:bg-[#111111] px-2 py-0.5 rounded border border-neutral-200 dark:border-zinc-800 tracking-widest">
                                  ***********************************
                                </code>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 md:p-6 h-full">
                    <div className="h-full bg-[#1e1e1e] rounded-xl overflow-hidden flex flex-col border border-zinc-800 relative">
                      <div className="px-4 py-2 bg-[#2d2d2d] border-b border-zinc-800 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        </div>
                        <div className="text-[10px] text-zinc-400 font-mono">email-template.html</div>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(`<img src="https://tracker.tickk.com/track/${previewTracker.id}" width="1" height="1" />`);
                            setCopiedHtmlCode(true);
                            setTimeout(() => setCopiedHtmlCode(false), 2000);
                          }}
                          className="text-[10px] bg-zinc-700 hover:bg-zinc-600 text-zinc-200 px-2 py-1 rounded transition-colors cursor-pointer flex items-center gap-1"
                        >
                          {copiedHtmlCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copiedHtmlCode ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <div className="flex-1 p-4 overflow-auto">
                        <pre className="text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre-wrap">
                          <code>{`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <p>Hi there,</p>
    <p>This is the simulated email content for ${previewTracker.title}.</p>
    <p>The tracking pixel is embedded below.</p>
    <br />
    <p>Best regards,<br />${fullName}</p>
    
    <!-- Tickk Tracking Pixel -->
    <img src="https://tracker.tickk.com/track/${previewTracker.id}" width="1" height="1" alt="" style="display:none;" />
  </body>
</html>`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}'''

new_code = re.sub(pattern, repl, code)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(new_code)
