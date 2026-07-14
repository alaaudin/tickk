import sys

with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'provider: "gmail",\n    email:',
    'provider: "gmail",\n    isManual: true,\n    email:'
)
content = content.replace(
    'provider: "outlook",\n    email:',
    'provider: "outlook",\n    isManual: true,\n    email:'
)

with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(content)
print("Done")
