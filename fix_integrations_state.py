import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

state_additions = """
  // Integrations State
  const [integrationsStatus, setIntegrationsStatus] = useState<Record<string, 'available' | 'connecting' | 'connected'>>({
    slack: 'available',
    hubspot: 'available',
    notion: 'available',
    zapier: 'configured',
    webhooks: 'available'
  });
  
  const [integrationModalOpen, setIntegrationModalOpen] = useState<{ id: string, name: string, description: string, fields: {id: string, label: string, type: string, placeholder: string}[] } | null>(null);
  const [integrationFormData, setIntegrationFormData] = useState<Record<string, string>>({});
  const [isIntegrationVerifying, setIsIntegrationVerifying] = useState(false);
  const [integrationSuccess, setIntegrationSuccess] = useState<string | null>(null);
"""

content = content.replace(
    '  const [apiKeys, setApiKeys] = useState([',
    state_additions + '\n  const [apiKeys, setApiKeys] = useState(['
)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
