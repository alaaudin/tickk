import sys

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

target = 'className="group relative inline-flex items-center justify-center"'
replacement = 'className="group/icon relative inline-flex items-center justify-center"'

c1 = content.replace(target, replacement)

target2 = 'opacity-0 group-hover:opacity-100 transition-opacity'
replacement2 = 'opacity-0 group-hover/icon:opacity-100 transition-opacity'

c2 = c1.replace(target2, replacement2)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(c2)
print("Done")
