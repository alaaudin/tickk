with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'city: "Localhost"',
    'city: "San Francisco"'
)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
