import sys

with open('src/types.ts', 'r') as f:
    content = f.read()

content = content.replace(
    'logs: OpenLog[];',
    'logs: OpenLog[];\n  isManual?: boolean;'
)

with open('src/types.ts', 'w') as f:
    f.write(content)
print("Done")
