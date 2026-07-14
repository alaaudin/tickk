import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# find import from lucide-react and add UserPlus
find = r'import \{([^}]+)\} from "lucide-react";'
def repl(m):
    imports = m.group(1)
    if "UserPlus" not in imports:
        return f'import {{{imports}, UserPlus}} from "lucide-react";'
    return m.group(0)

content = re.sub(find, repl, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
