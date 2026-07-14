import sys

with open('server.ts', 'r') as f:
    content = f.read()

content = content.replace(
    'testSent: true,',
    'testSent: true,\n      isManual: i % 3 === 1,'
)

with open('server.ts', 'w') as f:
    f.write(content)
print("Done")
