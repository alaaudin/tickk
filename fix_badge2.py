with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

target = """                                    {/* Status Pill */}
                                    <td className="px-6 py-6">
                                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-normal border ${status.badgeClass}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                          status.label === "Confirmed" 
                                            ? "bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" 
                                            : "bg-amber-500 animate-pulse"
                                        }`} />
                                        {status.label}
                                      </span>
                                    </td>
                                    {/* Dispatch Timestamp */}"""

# We'll use split/join or find to be exactly precise if there's minor differences.
idx = content.find("{/* Status Pill */}")
idx2 = content.find("{/* Dispatch Timestamp */}", idx)

if idx != -1 and idx2 != -1:
    new_content = content[:idx] + """{/* Status Pill */}
                                    <td className="px-6 py-6">
                                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-normal border ${status.badgeClass}`}>
                                        {status.label === "Confirmed" ? (
                                          <Check className="w-3.5 h-3.5 text-emerald-500 mr-1" strokeWidth={3} />
                                        ) : (
                                          <Clock className="w-3 h-3 text-amber-500 mr-1" />
                                        )}
                                        {status.label}
                                      </span>
                                    </td>
                                    {/* Open Count */}
                                    <td className="px-6 py-6 text-neutral-600 dark:text-zinc-400 font-normal">
                                      {tr.openCount > 0 ? (
                                        <span className="inline-flex items-center px-2 py-1 bg-neutral-100 dark:bg-zinc-900 rounded-md text-[10px] font-mono border border-neutral-200 dark:border-zinc-800 text-neutral-700 dark:text-zinc-300 shadow-sm">
                                          {tr.openCount}{tr.openCount === 1 ? 'st' : tr.openCount === 2 ? 'nd' : tr.openCount === 3 ? 'rd' : 'th'} time!
                                        </span>
                                      ) : (
                                        <span className="text-zinc-500">-</span>
                                      )}
                                    </td>
                                    """ + content[idx2:]
    with open('src/components/Dashboard.tsx', 'w') as f:
        f.write(new_content)
    print("Replaced by slicing!")
else:
    print("Not found")

