import re

with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

old_tbody = """                                          <tbody className="divide-y divide-neutral-200/50 dark:divide-zinc-800/50">
                                            {item.logs.map((log, index) => (
                                              <tr key={log.id} className="hover:bg-white/40 dark:hover:bg-zinc-900/40 transition-colors">
                                                <td className="px-4 py-3">
                                                  <span className="font-mono text-[10px] text-neutral-500 dark:text-zinc-500">
                                                    #{String(index + 1).padStart(2, '0')}
                                                  </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono ${
                                                    log.type === 'click' 
                                                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                      : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                                  }`}>
                                                    {log.type === 'click' ? 'LINK_CLICK' : 'EMAIL_OPEN'}
                                                  </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                  <span className="font-mono text-[10px] text-neutral-700 dark:text-zinc-300">
                                                    {new Date(log.timestamp).toLocaleString()}
                                                  </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                  <span className="font-mono text-[10px] text-neutral-600 dark:text-zinc-400">
                                                    {log.ip}
                                                  </span>
                                                </td>
                                                <td className="px-4 py-3 text-neutral-600 dark:text-zinc-400">
                                                  {log.geo}
                                                </td>
                                                <td className="px-4 py-3 text-neutral-600 dark:text-zinc-400">
                                                  {log.device}
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>"""

new_tbody = """                                          <tbody className="divide-y divide-neutral-200/50 dark:divide-zinc-800/50">
                                            {item.logs.map((log, index) => {
                                              const isClick = log.type === 'click';
                                              const seqName = isClick ? `${item.logs.filter((l, i) => i <= index && l.type === 'click').length} Click` : `${item.logs.filter((l, i) => i <= index && l.type === 'open').length} Open`;
                                              
                                              return (
                                              <tr key={log.id} className="border-b border-neutral-200/45 dark:border-zinc-800/35 hover:bg-neutral-50/40 dark:hover:bg-zinc-900/15 transition-colors">
                                                <td className="px-4 py-3.5 whitespace-nowrap">
                                                  <span className="font-mono text-[10px] text-neutral-500 dark:text-zinc-400 bg-neutral-100/60 dark:bg-zinc-900/50 border border-neutral-200/40 dark:border-zinc-800/40 px-2.5 py-1 rounded-md select-none">
                                                    {seqName}
                                                  </span>
                                                </td>
                                                <td className="px-4 py-3.5 whitespace-nowrap">
                                                  {isClick ? (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-emerald-500/20 bg-emerald-500/5 text-neutral-900 dark:text-white shadow-sm">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 mr-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                                      Link Clicked
                                                    </span>
                                                  ) : (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-neutral-200/80 dark:border-zinc-800 bg-neutral-100/50 dark:bg-white/5 text-neutral-900 dark:text-white shadow-sm">
                                                      <Eye className="w-3.5 h-3.5 text-neutral-400 dark:text-zinc-400 mr-1" />
                                                      Email Open
                                                    </span>
                                                  )}
                                                </td>
                                                <td className="px-4 py-3.5 font-mono text-[10.5px] text-neutral-700 dark:text-zinc-300 whitespace-nowrap">
                                                  <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                                                  <span className="text-neutral-400 dark:text-zinc-650 mx-1.5">•</span>
                                                  <span className="text-neutral-500 dark:text-zinc-400">{new Date(log.timestamp).toLocaleDateString()}</span>
                                                </td>
                                                <td className="px-4 py-3.5 font-mono text-[10px] text-neutral-500 dark:text-zinc-400">
                                                  {log.ip || "Unknown"}
                                                </td>
                                                <td className="px-4 py-3.5 text-[11px] text-neutral-700 dark:text-zinc-300 font-normal">
                                                  {log.geo ? (
                                                    <React.Fragment>
                                                      <span>{log.geo.split(',')[0]}</span>
                                                      {log.geo.split(',')[1] && (
                                                        <React.Fragment>
                                                          <span className="text-neutral-400 dark:text-zinc-500 mx-1">•</span>
                                                          <span className="text-neutral-500 dark:text-zinc-400">{log.geo.split(',')[1].trim()}</span>
                                                        </React.Fragment>
                                                      )}
                                                    </React.Fragment>
                                                  ) : "Unknown"}
                                                </td>
                                                <td className="px-4 py-3.5 text-[11px] text-neutral-500 dark:text-zinc-400 font-normal">
                                                  {log.device ? (
                                                    <React.Fragment>
                                                      <span>{log.device.split('/')[1]?.trim() || "Desktop"}</span>
                                                      <span className="text-neutral-400 dark:text-zinc-500 mx-1.5">•</span>
                                                      <span className="text-neutral-500 dark:text-zinc-400">{log.device.split('/')[0]?.trim() || "Unknown"}</span>
                                                    </React.Fragment>
                                                  ) : (
                                                    <React.Fragment>
                                                      <span>Desktop</span>
                                                      <span className="text-neutral-400 dark:text-zinc-500 mx-1.5">•</span>
                                                      <span className="text-neutral-500 dark:text-zinc-400">Unknown</span>
                                                    </React.Fragment>
                                                  )}
                                                </td>
                                              </tr>
                                              );
                                            })}
                                          </tbody>"""

if old_tbody in content:
    content = content.replace(old_tbody, new_tbody)
    
    # Also fix the table head to remove the "Actions" column since it wasn't present here previously,
    # or if we want to copy the exact columns, let's make sure it matches.
    # The columns match.
    
    with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
        f.write(content)
    print("Success")
else:
    print("Failed")
