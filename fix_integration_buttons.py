import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# Fix Slack
content = content.replace(
    '''                              <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded border bg-neutral-50 dark:bg-zinc-900/50 text-neutral-500 border-neutral-200 dark:border-zinc-800">
                                Available
                              </span>''',
    '''                              <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded border ${integrationsStatus.slack === 'connected' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 border-emerald-200 dark:border-emerald-800/60' : 'bg-neutral-50 dark:bg-zinc-900/50 text-neutral-500 border-neutral-200 dark:border-zinc-800'}`}>
                                {integrationsStatus.slack === 'connected' ? 'Connected' : 'Available'}
                              </span>'''
)

content = content.replace(
    '''                          <button className="mt-6 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-700 text-neutral-700 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-800 shadow-sm flex items-center justify-center gap-2">
                            <Lock className="w-3.5 h-3.5" /> Add to Slack
                          </button>''',
    '''                          <button 
                            disabled={integrationsStatus.slack === 'connected'}
                            onClick={() => {
                              setIntegrationModalOpen({
                                id: 'slack',
                                name: 'Slack',
                                description: 'Authenticate your Slack workspace to start receiving notifications for opened emails, clicked links, and pipeline changes.',
                                fields: [
                                  { id: 'workspace_url', label: 'Slack Workspace URL', type: 'text', placeholder: 'https://acme-corp.slack.com' }
                                ]
                              });
                            }}
                            className={`mt-6 relative z-10 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${integrationsStatus.slack === 'connected' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 cursor-default' : 'bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-700 text-neutral-700 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-800 shadow-sm cursor-pointer'} flex items-center justify-center gap-2`}>
                            {integrationsStatus.slack === 'connected' ? <><Check className="w-3.5 h-3.5" /> Connected</> : <><Lock className="w-3.5 h-3.5" /> Add to Slack</>}
                          </button>'''
)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
