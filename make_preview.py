import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# Add getEmailProvider
get_email_provider = """
const getEmailProvider = (email: string) => {
  const emailLower = email.toLowerCase();
  if (emailLower.includes("outlook.com") || emailLower.includes("hotmail.com") || emailLower.includes("live.com")) return "outlook";
  if (emailLower.includes("yahoo.com") || emailLower.includes("aol.com")) return "yahoo";
  if (emailLower.includes("icloud.com") || emailLower.includes("mac.com") || emailLower.includes("me.com")) return "apple";
  return "gmail";
};
"""
content = content.replace('const generateDefaultHtmlBody', get_email_provider + '\nconst generateDefaultHtmlBody')

# Let's replace the visual part of the preview modal
# Find the start of the simulated client window
# `                    {/* Simulated Client Window */}`
# `                    {previewTracker.id.charCodeAt(previewTracker.id.length - 1) % 2 === 0 ? (`

import re
start_token = "{/* Simulated Client Window */}"
end_token = "                  </div>\n                ) : ("

start_idx = content.find(start_token)
end_idx = content.find(end_token, start_idx)

if start_idx != -1 and end_idx != -1:
    original_window = content[start_idx:end_idx]
    
    # We will just parse the outlook and gmail parts and wrap them
    # But it's easier to just construct the whole thing.
    # We will copy the Outlook and Gmail parts from the original code.

    # Find Outlook Header
    outlook_start = original_window.find('<div className="w-full max-w-4xl bg-white dark:bg-[#111111] rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-zinc-800 font-sans">')
    outlook_end = original_window.find('                    ) : (')
    outlook_html = original_window[outlook_start:outlook_end]

    gmail_start = original_window.find('<div className="w-full max-w-4xl bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-zinc-800 font-sans">')
    gmail_end = original_window.rfind('                      </div>\n                    )}')
    gmail_html = original_window[gmail_start:gmail_end + 34] # add the closing div tags

    apple_html = """
                      <div className="w-full max-w-4xl bg-[#ECECEC] dark:bg-[#1E1E1E] rounded-xl overflow-hidden shadow-2xl border border-neutral-300 dark:border-zinc-700 font-sans">
                        {/* Apple Header */}
                        <div className="h-12 bg-gradient-to-b from-[#F5F5F5] to-[#E8E8E8] dark:from-[#323232] dark:to-[#2A2A2A] border-b border-neutral-300 dark:border-zinc-900 flex items-center justify-between px-4">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                          </div>
                          <div className="flex items-center gap-4 text-neutral-600 dark:text-zinc-400">
                            <div className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10"><Trash2 className="w-4 h-4" /></div>
                            <div className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10"><CornerUpLeft className="w-4 h-4" /></div>
                            <div className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10"><CornerUpRight className="w-4 h-4" /></div>
                          </div>
                          <div className="w-48 bg-white/50 dark:bg-black/20 border border-neutral-300 dark:border-zinc-700 rounded-md h-7 flex items-center px-2">
                            <Search className="w-3 h-3 text-neutral-500 mr-2" />
                            <span className="text-xs text-neutral-500">Search</span>
                          </div>
                        </div>
                        {/* Apple Body Area */}
                        <div className="flex h-[500px]">
                          {/* Sidebar Mock */}
                          <div className="w-48 bg-[#F2F2F7] dark:bg-[#282828] border-r border-neutral-200 dark:border-zinc-800 p-2 hidden md:block">
                            <div className="px-2 py-1 bg-blue-500 text-white rounded text-sm font-medium flex items-center gap-2">
                              <Inbox className="w-4 h-4" /> Inbox
                            </div>
                            <div className="px-2 py-1 text-neutral-700 dark:text-zinc-300 rounded text-sm font-medium flex items-center gap-2 mt-1">
                              <Send className="w-4 h-4" /> Sent
                            </div>
                          </div>
                          {/* Email Content */}
                          <div className="flex-1 bg-white dark:bg-[#1E1E1E] p-8 overflow-y-auto">
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{previewTracker.title}</h2>
                                <div className="text-[13px]">
                                  <span className="font-semibold text-neutral-900 dark:text-white">{fullName}</span> 
                                  <span className="text-neutral-500 dark:text-zinc-400"> &lt;{corporateEmail}&gt;</span>
                                </div>
                                <div className="text-[12px] text-neutral-500 dark:text-zinc-400 mt-1">To: {previewTracker.recipient}</div>
                              </div>
                              <div className="text-[12px] text-neutral-500 dark:text-zinc-400">
                                {new Date(previewTracker.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} at {new Date(previewTracker.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                              </div>
                            </div>
                            <div className="w-full h-px bg-neutral-200 dark:bg-zinc-700/50 mb-6"></div>
                            
                            <div className="text-[14px] text-neutral-800 dark:text-zinc-200 space-y-4 max-w-3xl leading-relaxed font-sans">
                              <div dangerouslySetInnerHTML={{ __html: getTrackerHtmlBody(previewTracker) }} />
                            </div>
                          </div>
                        </div>
                      </div>
"""

    yahoo_html = """
                      <div className="w-full max-w-4xl bg-[#f4f4f5] dark:bg-[#111111] rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-zinc-800 font-sans">
                        {/* Yahoo Header */}
                        <div className="h-14 bg-[#7e1fff] flex items-center justify-between px-6">
                          <div className="text-white font-bold text-xl tracking-tight">yahoo<span className="font-light">!</span>mail</div>
                          <div className="flex-1 max-w-xl mx-8">
                            <div className="bg-white/20 rounded-sm h-9 flex items-center px-3 border border-white/10">
                              <span className="text-white/80 text-sm">Find messages, documents, photos or people</span>
                              <Search className="w-4 h-4 text-white/90 ml-auto" />
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-white/20"></div>
                          </div>
                        </div>
                        {/* Yahoo Toolbar */}
                        <div className="h-12 border-b border-neutral-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] flex items-center px-4 gap-4">
                          <div className="flex items-center gap-1 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800 p-1.5 rounded">
                            <CornerUpLeft className="w-4 h-4 text-neutral-600 dark:text-zinc-300" />
                            <span className="text-[13px] text-neutral-600 dark:text-zinc-300 font-semibold">Reply</span>
                          </div>
                          <div className="flex items-center gap-1 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800 p-1.5 rounded">
                            <CornerUpLeft className="w-4 h-4 text-neutral-600 dark:text-zinc-300 transform -scale-x-100" />
                            <span className="text-[13px] text-neutral-600 dark:text-zinc-300 font-semibold">Reply all</span>
                          </div>
                          <div className="flex items-center gap-1 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800 p-1.5 rounded">
                            <CornerUpRight className="w-4 h-4 text-neutral-600 dark:text-zinc-300" />
                            <span className="text-[13px] text-neutral-600 dark:text-zinc-300 font-semibold">Forward</span>
                          </div>
                          <div className="flex items-center gap-1 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800 p-1.5 rounded">
                            <Trash2 className="w-4 h-4 text-neutral-600 dark:text-zinc-300" />
                            <span className="text-[13px] text-neutral-600 dark:text-zinc-300 font-semibold">Delete</span>
                          </div>
                        </div>
                        {/* Yahoo Body Area */}
                        <div className="flex h-[500px]">
                          {/* Sidebar Mock */}
                          <div className="w-52 bg-white dark:bg-[#1a1a1a] border-r border-neutral-200 dark:border-zinc-800 p-3 hidden md:block">
                            <button className="w-full bg-[#7e1fff] hover:bg-[#6001D2] text-white font-bold text-sm py-2 rounded-full mb-4">Compose</button>
                            <div className="px-3 py-1.5 bg-[#7e1fff]/10 text-[#7e1fff] dark:text-[#a85aff] rounded font-semibold text-sm">Inbox</div>
                            <div className="px-3 py-1.5 text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded font-medium text-sm mt-1">Unread</div>
                            <div className="px-3 py-1.5 text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded font-medium text-sm mt-1">Starred</div>
                            <div className="px-3 py-1.5 text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded font-medium text-sm mt-1">Sent</div>
                          </div>
                          {/* Email Content */}
                          <div className="flex-1 bg-white dark:bg-[#111111] p-6 overflow-y-auto">
                            <h2 className="text-[22px] font-bold text-neutral-900 dark:text-white mb-6">{previewTracker.title}</h2>
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-neutral-600 dark:text-zinc-300 text-lg">
                                  {corporateEmail.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-bold text-[15px] text-neutral-900 dark:text-white">{fullName} <span className="font-normal text-neutral-500 dark:text-zinc-400 text-sm ml-1">&lt;{corporateEmail}&gt;</span></div>
                                  <div className="text-[13px] text-neutral-500 dark:text-zinc-400">To: {previewTracker.recipient}</div>
                                </div>
                              </div>
                              <div className="text-[13px] text-neutral-500 dark:text-zinc-400 font-medium">
                                {new Date(previewTracker.createdAt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} at {new Date(previewTracker.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                              </div>
                            </div>
                            
                            <div className="text-[15px] text-[#1d2226] dark:text-[#d9d9d9] space-y-4 max-w-3xl leading-relaxed">
                              <div dangerouslySetInnerHTML={{ __html: getTrackerHtmlBody(previewTracker) }} />
                            </div>
                          </div>
                        </div>
                      </div>
"""

    
    new_window = f"""
                    {{/* Simulated Client Window */}}
                    {{(() => {{
                      const emailProvider = getEmailProvider(previewTracker.recipient);
                      if (emailProvider === 'outlook') return (
{outlook_html}
                      );
                      if (emailProvider === 'apple') return (
{apple_html}
                      );
                      if (emailProvider === 'yahoo') return (
{yahoo_html}
                      );
                      return (
{gmail_html}
                      );
                    }})()}}
"""
    
    content = content[:start_idx] + new_window + content[end_idx:]

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
