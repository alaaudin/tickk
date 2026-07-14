import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# Fix Hubspot
content = re.sub(
    r'(<HubspotLogo className="w-full h-full" />\n\s*</div>\n\s*<span className={`px-2\.5 py-1 text-\[9px\] font-bold uppercase tracking-widest rounded border \$\{)integrationsStatus\.slack( === \'connected\' \? \'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 border-emerald-200 dark:border-emerald-800/60\' : \'bg-neutral-50 dark:bg-zinc-900/50 text-neutral-500 border-neutral-200 dark:border-zinc-800\'\}`}>\n\s*\{)integrationsStatus\.slack( === \'connected\' \? \'Connected\' : \'Available\'\})',
    r'\g<1>integrationsStatus.hubspot\g<2>integrationsStatus.hubspot\g<3>',
    content
)

content = content.replace(
    '''<button className="mt-6 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors bg-[#ff7a59] text-white hover:bg-[#ff7a59]/90 shadow-sm flex items-center justify-center gap-2">
                            <Lock className="w-3.5 h-3.5" /> Connect HubSpot
                          </button>''',
    '''<button 
                            disabled={integrationsStatus.hubspot === 'connected'}
                            onClick={() => {
                              setIntegrationModalOpen({
                                id: 'hubspot',
                                name: 'HubSpot CRM',
                                description: 'Connect HubSpot to automatically create and update contact records based on email tracking engagement.',
                                fields: [
                                  { id: 'api_key', label: 'HubSpot API / Private App Token', type: 'password', placeholder: 'pat-na1-...' }
                                ]
                              });
                            }}
                            className={`mt-6 relative z-10 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${integrationsStatus.hubspot === 'connected' ? 'bg-[#ff7a59]/10 text-[#ff7a59] border border-[#ff7a59]/20 cursor-default' : 'bg-[#ff7a59] text-white hover:bg-[#ff7a59]/90 shadow-sm cursor-pointer'} flex items-center justify-center gap-2`}>
                            {integrationsStatus.hubspot === 'connected' ? <><Check className="w-3.5 h-3.5" /> Connected</> : <><Lock className="w-3.5 h-3.5" /> Connect HubSpot</>}
                          </button>'''
)

# Fix Notion
content = re.sub(
    r'(<NotionLogo className="w-full h-full text-black dark:text-white" />\n\s*</div>\n\s*<span className={`px-2\.5 py-1 text-\[9px\] font-bold uppercase tracking-widest rounded border \$\{)integrationsStatus\.slack( === \'connected\' \? \'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 border-emerald-200 dark:border-emerald-800/60\' : \'bg-neutral-50 dark:bg-zinc-900/50 text-neutral-500 border-neutral-200 dark:border-zinc-800\'\}`}>\n\s*\{)integrationsStatus\.slack( === \'connected\' \? \'Connected\' : \'Available\'\})',
    r'\g<1>integrationsStatus.notion\g<2>integrationsStatus.notion\g<3>',
    content
)

content = content.replace(
    '''<button className="mt-6 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm flex items-center justify-center gap-2">
                            <Lock className="w-3.5 h-3.5" /> Authorize Workspace
                          </button>''',
    '''<button 
                            disabled={integrationsStatus.notion === 'connected'}
                            onClick={() => {
                              setIntegrationModalOpen({
                                id: 'notion',
                                name: 'Notion',
                                description: 'Link your Notion workspace to seamlessly sync and log tracking data into your connected databases.',
                                fields: [
                                  { id: 'secret', label: 'Internal Integration Secret', type: 'password', placeholder: 'secret_...' }
                                ]
                              });
                            }}
                            className={`mt-6 relative z-10 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${integrationsStatus.notion === 'connected' ? 'bg-neutral-100 dark:bg-zinc-800 text-black dark:text-white border border-neutral-200 dark:border-zinc-700 cursor-default' : 'bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm cursor-pointer'} flex items-center justify-center gap-2`}>
                            {integrationsStatus.notion === 'connected' ? <><Check className="w-3.5 h-3.5" /> Connected</> : <><Lock className="w-3.5 h-3.5" /> Authorize Workspace</>}
                          </button>'''
)

# Fix Discord (it doesn't have an explicit button replacement, but we need to fix its badge)
content = re.sub(
    r'(<DiscordLogo className="w-full h-full" />\n\s*</div>\n\s*<span className={`px-2\.5 py-1 text-\[9px\] font-bold uppercase tracking-widest rounded border \$\{)integrationsStatus\.slack( === \'connected\' \? \'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 border-emerald-200 dark:border-emerald-800/60\' : \'bg-neutral-50 dark:bg-zinc-900/50 text-neutral-500 border-neutral-200 dark:border-zinc-800\'\}`}>\n\s*\{)integrationsStatus\.slack( === \'connected\' \? \'Connected\' : \'Available\'\})',
    r'\g<1>integrationsStatus.discord\g<2>integrationsStatus.discord\g<3>',
    content
)

# Ensure integrationsStatus object has discord
content = content.replace(
    '''  const [integrationsStatus, setIntegrationsStatus] = useState<Record<string, 'available' | 'connecting' | 'connected'>>({
    slack: 'available',
    hubspot: 'available',
    notion: 'available',
    zapier: 'configured',
    webhooks: 'available'
  });''',
    '''  const [integrationsStatus, setIntegrationsStatus] = useState<Record<string, 'available' | 'connecting' | 'connected'>>({
    slack: 'available',
    hubspot: 'available',
    notion: 'available',
    zapier: 'configured',
    webhooks: 'available',
    discord: 'available'
  });'''
)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
