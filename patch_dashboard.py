import sys

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

email_target = """                                                              <div className="text-[11px] text-zinc-500 mt-1 font-normal tracking-tight">
                                                                {ye.subject}
                                                              </div>"""

email_replacement = """                                                              <div className="text-[11px] text-zinc-500 mt-1 font-normal tracking-tight flex items-center gap-1.5">
                                                                {ye.subject}
                                                                {ye.isManual && (
                                                                  <div className="group relative inline-flex items-center justify-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                                                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                                                      Sent manually using TICKK
                                                                    </div>
                                                                  </div>
                                                                )}
                                                              </div>"""

link_target = """                                                              <div className="text-[11px] text-zinc-500 mt-1 font-normal tracking-tight">
                                                                {Be.subject}
                                                              </div>"""

link_replacement = """                                                              <div className="text-[11px] text-zinc-500 mt-1 font-normal tracking-tight flex items-center gap-1.5">
                                                                {Be.subject}
                                                                {Be.isManual && (
                                                                  <div className="group relative inline-flex items-center justify-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                                                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                                                      Sent manually using TICKK
                                                                    </div>
                                                                  </div>
                                                                )}
                                                              </div>"""


c1 = content.replace(email_target, email_replacement)
c2 = c1.replace(link_target, link_replacement)

if c2 == content:
    print("NO CHANGES MADE")
else:
    with open('src/components/Dashboard.tsx', 'w') as f:
        f.write(c2)
    print("Patched Dashboard")

