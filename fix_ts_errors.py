import re

# 1. AuthPortal
with open("src/components/AuthPortal.tsx", "r") as f:
    content = f.read()

content = content.replace(
    'ref={(el) => codeInputs.current[idx] = el}',
    'ref={(el) => { codeInputs.current[idx] = el; }}'
)

with open("src/components/AuthPortal.tsx", "w") as f:
    f.write(content)

# 2. Dashboard
with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

content = content.replace(
    'type TabType = "overview" | "activity" | "tracking" | "link_tracking" | "performance" | "integrations" | "account" | "billing" | "pricing" | "support";',
    'type TabType = "overview" | "activity" | "tracking" | "link_tracking" | "performance" | "integrations" | "account" | "billing" | "pricing" | "support" | "api_keys";'
)

content = content.replace(
    'const [ticketCategory, setTicketCategory] = useState<Ticket[\'category\']>("technical");',
    'const [ticketCategory, setTicketCategory] = useState<Ticket[\'category\']>("bug");'
)

content = content.replace(
    "{activeSettingsTab === 'gmail' && (",
    "{activeSettingsTab === 'mail' && ("
)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)

