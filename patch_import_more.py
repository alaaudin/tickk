import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find = r'import \{([^}]+)\} from "lucide-react";'
def repl(m):
    imports = m.group(1)
    missing = []
    for icon in ["Shield", "Users", "CreditCard"]:
        if icon not in imports:
            missing.append(icon)
    if missing:
        return f'import {{{imports}, {", ".join(missing)}}} from "lucide-react";'
    return m.group(0)

content = re.sub(find, repl, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
