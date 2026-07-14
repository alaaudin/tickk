import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# Fix Discord
content = content.replace(
    '''                          <div className="mt-6 space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-[10px] uppercase tracking-widest font-semibold text-neutral-500">Active Integration</label>
                              <div className="w-8 h-4 rounded-full bg-neutral-200 dark:bg-zinc-800 relative cursor-pointer">
                                <div className="absolute left-1 top-1 w-2 h-2 rounded-full bg-white dark:bg-zinc-500 transition-all"></div>
                              </div>
                            </div>
                            <input type="text" placeholder="Discord Webhook URL" className="w-full bg-transparent border border-neutral-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs text-neutral-800 dark:text-zinc-200 focus:outline-none focus:border-[#5865F2] transition-colors" />
                          </div>''',
    '''<button 
                            disabled={integrationsStatus.discord === 'connected'}
                            onClick={() => {
                              setIntegrationModalOpen({
                                id: 'discord',
                                name: 'Discord',
                                description: 'Connect Discord to broadcast rich embed notifications to your server when high-value links are clicked.',
                                fields: [
                                  { id: 'webhook_url', label: 'Discord Webhook URL', type: 'text', placeholder: 'https://discord.com/api/webhooks/...' }
                                ]
                              });
                            }}
                            className={`mt-6 relative z-10 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${integrationsStatus.discord === 'connected' ? 'bg-[#5865F2]/10 text-[#5865F2] border border-[#5865F2]/20 cursor-default' : 'bg-[#5865F2] text-white hover:bg-[#5865F2]/90 shadow-sm cursor-pointer'} flex items-center justify-center gap-2`}>
                            {integrationsStatus.discord === 'connected' ? <><Check className="w-3.5 h-3.5" /> Connected</> : <><Lock className="w-3.5 h-3.5" /> Connect Discord</>}
                          </button>'''
)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
