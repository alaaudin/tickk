import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# Regular expression to remove the simulateLinkClick function block
pattern = r"  const simulateLinkClick = \(trackerId: string\) => \{[\s\S]*?        \};\n      \}\n      return tracker;\n    \}\)\);\n  \};\n"
content = re.sub(pattern, "", content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
