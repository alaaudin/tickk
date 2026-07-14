import sys

with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

target = """            {trackingData.map((item) => (
              <div key={item.id} className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-zinc-800 rounded-2xl p-5 hover:border-neutral-300 dark:hover:border-zinc-700 transition-colors shadow-sm group cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-10 h-10 rounded-full bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex items-center justify-center shrink-0">
                      {renderProviderIcon(item.provider)}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-neutral-900 dark:text-white truncate max-w-xs sm:max-w-md">
                        {item.email}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-zinc-400 mt-0.5 truncate max-w-xs sm:max-w-md">
                        {item.subject}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 dark:text-zinc-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Sent {item.sent}</span>
                        </div>
                        {item.device === 'mobile' && (
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 dark:text-zinc-500">
                            <Smartphone className="w-3.5 h-3.5" />
                            <span>Mobile Read</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end sm:items-center">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-zinc-300">
                        <Eye className="w-4 h-4 text-blue-500" />
                        <span>{item.opens}</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 dark:text-zinc-500 uppercase mt-0.5 hidden sm:block">Opens</span>
                    </div>
                    <div className="flex flex-col items-end sm:items-center">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-zinc-300">
                        <MousePointerClick className="w-4 h-4 text-emerald-500" />
                        <span>{item.clicks}</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 dark:text-zinc-500 uppercase mt-0.5 hidden sm:block">Clicks</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}"""


replacement = """
            <div className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px] whitespace-nowrap">
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
                </table>
              </div>
            </div>
"""

content = content.replace(target, replacement)
with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(content)
print("Done")
