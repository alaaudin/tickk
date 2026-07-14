import sys

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

old_subject = """<span
                                                                className="text-neutral-700 dark:text-zinc-200 font-medium text-xs max-w-[150px] block truncate"
                                                                title={
                                                                  Be.subject
                                                                }
                                                              >
                                                                {Be.subject}
                                                              </span>"""

new_subject = """<div className="flex items-center gap-1.5 max-w-[150px]">
                                                                <span
                                                                  className="text-neutral-700 dark:text-zinc-200 font-medium text-xs truncate"
                                                                  title={Be.subject}
                                                                >
                                                                  {Be.subject}
                                                                </span>
                                                                {Be.isManual && (
                                                                  <div className="group/icon relative inline-flex items-center justify-center shrink-0 cursor-default">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                                                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                                                      Sent manually using TICKK
                                                                    </div>
                                                                  </div>
                                                                )}
                                                              </div>"""

content = content.replace(old_subject, new_subject)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
