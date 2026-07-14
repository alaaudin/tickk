import sys

with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

old_table = """<table className="w-full text-left text-[13px] whitespace-nowrap">
                  <thead className="bg-neutral-50/50 dark:bg-zinc-950/50 text-neutral-500 dark:text-zinc-400 text-xs border-b border-neutral-200 dark:border-zinc-800/80">
                    <tr>
                      <th className="px-6 py-5 font-normal tracking-wider">Recipient Target</th>
                      <th className="px-6 py-5 font-normal tracking-wider">Status</th>
                      <th className="px-6 py-5 font-normal tracking-wider">Open Count</th>
                      <th className="px-6 py-5 font-normal tracking-wider">Dispatch Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-zinc-900/40">
                    {trackingData.map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-zinc-900/20 transition-colors group">
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-2">
                            <div className="p-1 bg-white dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800/50 w-6 h-6 inline-flex items-center justify-center rounded-md shadow-sm">
                              {renderProviderIcon(item.provider)}
                            </div>
                            <div className="text-neutral-800 dark:text-zinc-200 font-medium text-sm">{item.email}</div>
                          </div>
                          <div className="text-[11px] text-zinc-500 mt-1 font-normal tracking-tight flex items-center gap-1.5">
                            {item.subject}
                            <div className="group/icon relative inline-flex items-center justify-center" title="Sent manually using TICKK">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                Sent manually using TICKK
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-normal border ${item.opens > 0 ? 'text-neutral-900 dark:text-white bg-emerald-500/5 border-emerald-500/20' : 'text-amber-400 bg-amber-500/5 border-amber-500/20'}`}>
                            {item.opens > 0 ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 mr-1" strokeWidth={3} /> : <AlertTriangle className="w-3 h-3 text-amber-500 mr-1" />}
                            {item.opens > 0 ? 'Confirmed' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-6 text-neutral-600 dark:text-zinc-400 font-normal">
                          <div className="flex flex-col gap-1.5 justify-center">
                            <div>
                              {item.opens > 0 ? (
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-50 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-850 rounded-lg text-[10px] font-mono text-neutral-800 dark:text-zinc-200 shadow-sm select-none whitespace-nowrap">
                                  <span className="font-normal tracking-wide text-neutral-700 dark:text-zinc-300 whitespace-nowrap">
                                    {item.opens}{item.opens === 1 ? 'st' : item.opens === 2 ? 'nd' : item.opens === 3 ? 'rd' : 'th'} time!
                                  </span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-1.5 bg-neutral-100 dark:bg-zinc-900/40 border border-neutral-200/50 dark:border-zinc-800/40 rounded-lg text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                                  No Opens
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 text-neutral-500 dark:text-zinc-500 font-normal">
                          {item.sent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>"""

new_table = """<table className="w-full text-left text-[13px] whitespace-nowrap">
                  <thead className="bg-neutral-100 dark:bg-zinc-950/40 text-zinc-500 text-[10px] uppercase border-b border-neutral-200 dark:border-zinc-900 font-normal tracking-wider">
                    <tr>
                      <th className="px-6 py-5 font-normal tracking-wider">Recipient Target</th>
                      <th className="px-6 py-5 font-normal tracking-wider">Status</th>
                      <th className="px-6 py-5 font-normal tracking-wider">Open Count</th>
                      <th className="px-6 py-5 font-normal tracking-wider">Dispatch Timestamp</th>
                      <th className="px-6 py-5 font-normal tracking-wider">Latest Open Confirmation</th>
                      <th className="px-6 py-5 font-normal tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-zinc-900/40">
                    {trackingData.map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-zinc-850/30 transition-colors border-b border-neutral-200/50 dark:border-zinc-800/40 group">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="p-1 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 w-6 h-6 inline-flex items-center justify-center rounded-md shadow-sm shrink-0">
                              {renderProviderIcon(item.provider)}
                            </div>
                            <div className="text-neutral-900 dark:text-zinc-100 font-medium text-xs max-w-[150px] truncate" title={item.email}>{item.email}</div>
                          </div>
                          <div className="text-[11px] text-zinc-500 mt-1 font-normal tracking-tight flex items-center gap-1.5">
                            {item.subject}
                            <div className="group/icon relative inline-flex items-center justify-center shrink-0 cursor-default">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                Sent manually using TICKK
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-normal border ${item.opens > 0 ? 'text-neutral-900 dark:text-white bg-emerald-500/5 border-emerald-500/20' : 'text-amber-400 bg-amber-500/5 border-amber-500/20'}`}>
                            {item.opens > 0 ? 'Confirmed' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-6 text-neutral-600 dark:text-zinc-400 font-normal">
                          <div className="flex flex-col gap-1.5 justify-center">
                            <div>
                              {item.opens > 0 ? (
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-50 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-850 rounded-lg text-[10px] font-mono text-neutral-800 dark:text-zinc-200 shadow-sm select-none whitespace-nowrap">
                                  <span className="font-normal tracking-wide text-neutral-700 dark:text-zinc-300 whitespace-nowrap">
                                    {item.opens}{item.opens === 1 ? 'st' : item.opens === 2 ? 'nd' : item.opens === 3 ? 'rd' : 'th'} time!
                                  </span>
                                  <span className="h-3 w-[1px] bg-neutral-300 dark:bg-zinc-800" />
                                  {item.clicks && item.clicks > 0 ? (
                                    <span className="inline-flex items-center gap-1 text-neutral-700 dark:text-zinc-300 font-normal whitespace-nowrap">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                      Link Clicked
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-neutral-500 dark:text-zinc-400 font-normal whitespace-nowrap">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 dark:text-zinc-500"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                      No Link Clicked
                                    </span>
                                  )}
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-1.5 bg-neutral-100 dark:bg-zinc-900/40 border border-neutral-200/50 dark:border-zinc-800/40 rounded-lg text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                                  No Opens
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 text-neutral-600 dark:text-zinc-400 font-normal">
                          {item.sent}
                        </td>
                        <td className="px-6 py-6 text-neutral-500 dark:text-zinc-500 font-normal">
                          {item.opens > 0 ? "Just now" : "Not Clicked Yet"}
                        </td>
                        <td className="px-6 py-6 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-3">
                            <button className="p-2 text-zinc-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded-lg border border-neutral-200 dark:border-zinc-800/40 transition-all cursor-pointer" title="Copy Tracking Pixel Snippet">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-2 text-zinc-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded-lg border border-neutral-200 dark:border-zinc-800/40 transition-all cursor-pointer" title="Preview Email HTML Content">
                              <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-neutral-900 dark:text-white" />
                            </button>
                            <button className="px-3.5 py-1.5 text-xs font-normal border border-neutral-200 dark:border-zinc-800 hover:border-neutral-300 dark:hover:border-zinc-700 bg-neutral-100 dark:bg-zinc-900/40 hover:bg-neutral-200 dark:hover:bg-zinc-900/80 text-neutral-700 dark:text-zinc-300 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm">
                              <span>Details</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>"""

content = content.replace(old_table, new_table)

with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(content)
print("Done")
