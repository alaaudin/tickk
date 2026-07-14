import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

target = """                          <tbody className="divide-y divide-neutral-200 dark:divide-zinc-900/40">
                            {filteredTrackers.map((tr) => {
                              const status = getTrackerStatus(tr);
                              const isExpanded = !!expandedTrackers[tr.id];
                              const timelineEvents = getDetailedTimelineEvents(tr);
                              const formattedSentTime = new Date(tr.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) + ", " + new Date(tr.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
                              
                              const latestOpenTime = tr.lastOpened ? getRelativeTime(tr.lastOpened) : "Not Opened Yet";
                              return (
                                <React.Fragment key={tr.id}>"""

replacement = """                          <tbody className="divide-y divide-neutral-200 dark:divide-zinc-900/40">
                            {(() => {
                              const flattenedTrackers = [];
                              for (const tr of filteredTrackers) {
                                const openLogs = tr.logs.filter(l => l.type === 'open').sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
                                if (openLogs.length === 0) {
                                  flattenedTrackers.push({ ...tr, displayOpenCount: 0, rowId: tr.id, specificOpenTime: null });
                                } else {
                                  openLogs.forEach((log, index) => {
                                    flattenedTrackers.push({
                                      ...tr,
                                      displayOpenCount: index + 1,
                                      rowId: `${tr.id}-open-${index}`,
                                      specificOpenTime: log.timestamp
                                    });
                                  });
                                }
                              }
                              // Sort descending by either specific open time or creation time
                              flattenedTrackers.sort((a, b) => {
                                const timeA = a.specificOpenTime ? new Date(a.specificOpenTime).getTime() : new Date(a.createdAt).getTime();
                                const timeB = b.specificOpenTime ? new Date(b.specificOpenTime).getTime() : new Date(b.createdAt).getTime();
                                return timeB - timeA;
                              });

                              return flattenedTrackers.map((tr) => {
                                const status = {
                                  label: tr.displayOpenCount > 0 ? "Confirmed" : (tr.status === 'opened' ? "Confirmed" : "Pending"),
                                  badgeClass: tr.displayOpenCount > 0 || tr.status === 'opened' 
                                    ? "text-neutral-900 dark:text-white bg-emerald-500/5 border border-emerald-500/20" 
                                    : "text-amber-400 bg-amber-500/5 border border-amber-500/20"
                                };
                                const isExpanded = !!expandedTrackers[tr.id];
                                const timelineEvents = getDetailedTimelineEvents(tr);
                                const formattedSentTime = new Date(tr.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) + ", " + new Date(tr.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
                                
                                const latestOpenTime = tr.specificOpenTime ? getRelativeTime(tr.specificOpenTime) : "Not Opened Yet";
                                return (
                                  <React.Fragment key={tr.rowId}>"""

idx = content.find('{filteredTrackers.map((tr) => {')
if idx != -1:
    idx_start = content.rfind('<tbody', 0, idx)
    idx_end = content.find('<React.Fragment key={tr.id}>', idx) + len('<React.Fragment key={tr.id}>')
    
    new_content = content[:idx_start] + replacement + content[idx_end:]
    
    # We also need to fix tr.openCount to tr.displayOpenCount in the rows!
    
    # We find the end of this map block, but it's easier to just string replace in the tbody.
    # Wait, the closing brace of the map needs to be closed for the IIFE.
    # The end of the tbody is:
    #                             })}
    #                           </tbody>
    # We'll replace `                             })}` with `                             }); })()}`
    
    # We also need to change `tr.openCount > 0` to `tr.displayOpenCount > 0` inside the row.
    idx_tbody_end = new_content.find('</tbody>', idx_start)
    tbody_content = new_content[idx_start:idx_tbody_end]
    tbody_content = tbody_content.replace('{tr.openCount > 0 ? (', '{tr.displayOpenCount > 0 ? (')
    tbody_content = tbody_content.replace('{tr.openCount}{tr.openCount === 1', '{tr.displayOpenCount}{tr.displayOpenCount === 1')
    tbody_content = tbody_content.replace('tr.openCount === 2', 'tr.displayOpenCount === 2')
    tbody_content = tbody_content.replace('tr.openCount === 3', 'tr.displayOpenCount === 3')
    
    tbody_content = tbody_content.replace('                            })}', '                            }); })()}')
    
    new_content = new_content[:idx_start] + tbody_content + new_content[idx_tbody_end:]
    
    with open('src/components/Dashboard.tsx', 'w') as f:
        f.write(new_content)
    print("Replaced!")
else:
    print("Not found")

