import sys

with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

old_button = """                  <button
                    onClick={handleDispatch}
                    disabled={!isPayloadReady || status === 'dispatching'}
                    className="flex items-center gap-2 bg-neutral-900 hover:bg-black disabled:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:disabled:bg-neutral-400 text-white dark:text-black px-6 py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg"
                  >
                    <span>{status === 'dispatching' ? 'Encrypting Payload...' : 'Send Dispatch'}</span>
                    <Send className={`w-4 h-4 ${status === 'dispatching' ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'}`} />
                  </button>"""

new_button = """                  <div className="flex items-center gap-2">
                    <AnimatePresence>
                      {isScheduling && (
                        <motion.div
                          initial={{ opacity: 0, width: 0, scale: 0.95 }}
                          animate={{ opacity: 1, width: "auto", scale: 1 }}
                          exit={{ opacity: 0, width: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <input
                            type="datetime-local"
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                            className="bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-neutral-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 w-[200px]"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <button
                      onClick={() => {
                        if (isScheduling && !scheduleDate) {
                          // Allow toggling off if they haven't picked a date, but we can just toggle unconditionally
                          setIsScheduling(!isScheduling);
                          setScheduleDate("");
                        } else {
                          setIsScheduling(!isScheduling);
                        }
                      }}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                        isScheduling || scheduleDate 
                          ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10' 
                          : 'border-neutral-200 dark:border-zinc-800 text-neutral-500 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-900'
                      }`}
                      title="Schedule Dispatch"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleDispatch}
                      disabled={!isPayloadReady || status === 'dispatching'}
                      className="flex items-center gap-2 bg-neutral-900 hover:bg-black disabled:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:disabled:bg-neutral-400 text-white dark:text-black px-6 py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg"
                    >
                      <span>
                        {status === 'dispatching' 
                          ? 'Encrypting Payload...' 
                          : (isScheduling && scheduleDate ? 'Schedule Dispatch' : 'Send Dispatch')}
                      </span>
                      <Send className={`w-4 h-4 ${status === 'dispatching' ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'}`} />
                    </button>
                  </div>"""

if old_button in content:
    content = content.replace(old_button, new_button)
    with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
        f.write(content)
    print("Success")
else:
    print("Failed to find button block")

