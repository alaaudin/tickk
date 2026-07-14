with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

bad_block = """                                      </div>
                                    {/* AI Quick Reply Section */}
                                    <div className="mt-4 p-5 bg-[#0c0c0e]/70 backdrop-blur-2xl border border-white/10 rounded-xl relative overflow-hidden shadow-sm">
                                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                      <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-3">
                                          <h4 className="text-xs font-semibold font-mono text-neutral-300 flex items-center gap-2 tracking-widest uppercase">
                                            <Sparkles className="w-4 h-4 text-white" />
                                            AI Assistant Context-Aware Reply
                                          </h4>
                                        </div>
                                        
                                        {!aiReplies[item.id as number] ? (
                                          <div className="flex items-center gap-3">
                                            <p className="text-xs text-neutral-400 font-sans flex-1">
                                              Generate a personalized follow-up response based on this recipient's engagement timeline.
                                            </p>
                                            <button 
                                              onClick={() => generateQuickReply(item)}
                                              disabled={generatingReply === item.id}
                                              className="px-4 py-2 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-2 font-mono uppercase tracking-wider whitespace-nowrap shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                            >
                                              {generatingReply === item.id ? (
                                                <span className="flex items-center gap-2">
                                                  <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                                  Synthesizing...
                                                </span>
                                              ) : (
                                                <>
                                                  <Sparkles className="w-3.5 h-3.5" />
                                                  Generate Draft
                                                </>
                                              )}
                                            </button>
                                          </div>
                                        ) : (
                                          <div className="space-y-3">
                                            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-sm text-neutral-200 font-sans leading-relaxed">
                                              {aiReplies[item.id as number]}
                                            </div>
                                            <div className="flex items-center gap-2 justify-end">
                                              <button 
                                                onClick={() => {
                                                  navigator.clipboard.writeText(aiReplies[item.id as number]);
                                                }}
                                                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold rounded-md transition-colors flex items-center gap-2 font-mono uppercase tracking-wider"
                                              >
                                                <Copy className="w-3 h-3" />
                                                Copy Draft
                                              </button>
                                              <button 
                                                onClick={() => {
                                                  window.location.href = `mailto:${item.email}?subject=Re: ${item.subject}&body=${encodeURIComponent(aiReplies[item.id as number])}`;
                                                }}
                                                className="px-3 py-1.5 bg-white text-black hover:bg-neutral-200 text-[11px] font-semibold rounded-md transition-colors flex items-center gap-2 font-mono uppercase tracking-wider"
                                              >
                                                <Send className="w-3 h-3" />
                                                Open in Mail
                                              </button>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>"""

good_block = """                                      </div>
                                    ) : ("""

if bad_block in content:
    content = content.replace(bad_block, good_block)
    print("Replaced back to original ternary.")
else:
    print("Block not found!")

with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(content)
