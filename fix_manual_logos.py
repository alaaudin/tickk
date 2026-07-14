import sys

with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'className="w-5 h-5 grayscale opacity-60 dark:opacity-40"',
    'className="w-5 h-5"'
).replace(
    'className="w-5 h-5 text-current opacity-60 dark:opacity-40"',
    'className="w-5 h-5"'
)

with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(content)
print("Done")
