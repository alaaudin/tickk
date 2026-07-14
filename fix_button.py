import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_btn = r'''                                <button
                                  type="submit"
                                  disabled={isSubmittingTicket}
                                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-white dark:text-neutral-900 text-white disabled:opacity-50 text-xs font-semibold rounded-lg shadow-sm cursor-pointer transition-colors"
                                >
                                  {isSubmittingTicket \? "Submitting\.\.\." : "Submit Feedback"}
                                </button>'''

repl_btn = r'''                                <button
                                  type="submit"
                                  disabled={isSubmittingTicket}
                                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-white dark:text-neutral-900 text-white disabled:opacity-50 text-xs font-semibold rounded-lg shadow-sm cursor-pointer transition-colors min-w-[120px] flex justify-center"
                                >
                                  {isSubmittingTicket ? (
                                    <span className="flex items-center gap-2">
                                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                      Submitting...
                                    </span>
                                  ) : "Submit Feedback"}
                                </button>'''

content = re.sub(find_btn, repl_btn, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)

