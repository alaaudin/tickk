import sys

with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

old_status = """                        <td className="px-6 py-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-normal border ${item.opens > 0 ? 'text-neutral-900 dark:text-white bg-emerald-500/5 border-emerald-500/20' : 'text-amber-400 bg-amber-500/5 border-amber-500/20'}`}>
                            {item.opens > 0 ? 'Confirmed' : 'Pending'}
                          </span>
                        </td>"""

new_status = """                        <td className="px-6 py-6">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-normal border ${
                            item.status === 'scheduled' 
                              ? 'text-blue-600 dark:text-blue-400 bg-blue-500/5 border-blue-500/20' 
                              : item.opens > 0 
                                ? 'text-neutral-900 dark:text-white bg-emerald-500/5 border-emerald-500/20' 
                                : 'text-amber-500 dark:text-amber-400 bg-amber-500/5 border-amber-500/20'
                          }`}>
                            {item.status === 'scheduled' ? (
                              <React.Fragment>
                                <Clock className="w-3 h-3" />
                                Scheduled
                              </React.Fragment>
                            ) : item.opens > 0 ? (
                              'Confirmed'
                            ) : (
                              'Pending'
                            )}
                          </span>
                        </td>"""

if old_status in content:
    content = content.replace(old_status, new_status)
    with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
        f.write(content)
    print("Success")
else:
    print("Failed to find status cell")
