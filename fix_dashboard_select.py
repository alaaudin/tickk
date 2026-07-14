import sys

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('function CustomSelect({', '// function removed')

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
