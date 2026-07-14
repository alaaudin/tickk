import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# Replace billingStatusFilter state to include dropdown state
states_old = """  const [billingStatusFilter, setBillingStatusFilter] = useState<'All' | 'Paid' | 'Processing' | 'Overdue'>('All');
  const [billingSearch, setBillingSearch] = useState('');"""
states_new = """  const [billingStatusFilter, setBillingStatusFilter] = useState<'All' | 'Paid' | 'Processing' | 'Overdue'>('All');
  const [billingSearch, setBillingSearch] = useState('');
  const [isBillingStatusDropdownOpen, setIsBillingStatusDropdownOpen] = useState(false);"""
content = content.replace(states_old, states_new)

# Replace the select for Billing
old_select = """                          <select
                            value={billingStatusFilter}
                            onChange={(e) => setBillingStatusFilter(e.target.value as any)}
                            className="px-3 py-1.5 text-xs bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-lg text-neutral-950 dark:text-white cursor-pointer font-normal"
                          >
                            <option value="All">All Invoices</option>
                            <option value="Paid">Paid</option>
                            <option value="Processing">Processing</option>
                            <option value="Overdue">Overdue</option>
                          </select>"""

new_select = """                          <div className="relative">
                            <button
                              onClick={() => setIsBillingStatusDropdownOpen(!isBillingStatusDropdownOpen)}
                              onBlur={() => setTimeout(() => setIsBillingStatusDropdownOpen(false), 150)}
                              className="px-3 py-1.5 text-xs bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-lg text-neutral-950 dark:text-white cursor-pointer font-normal min-w-[120px] text-left"
                            >
                              {billingStatusFilter === 'All' ? 'All Invoices' : billingStatusFilter}
                            </button>
                            {isBillingStatusDropdownOpen && (
                              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white/30 dark:bg-[#111111]/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden p-1 animate-in fade-in slide-in-from-top-2">
                                {[
                                  { label: 'All Invoices', value: 'All' },
                                  { label: 'Paid', value: 'Paid' },
                                  { label: 'Processing', value: 'Processing' },
                                  { label: 'Overdue', value: 'Overdue' }
                                ].map((opt) => (
                                  <button
                                    key={opt.value}
                                    onClick={() => { setBillingStatusFilter(opt.value as any); setIsBillingStatusDropdownOpen(false); }}
                                    className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2"
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>"""

content = content.replace(old_select, new_select)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
