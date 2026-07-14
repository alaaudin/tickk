import sys

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '<Vd className="w-4 h-4 text-neutral-500 pointer-events-none ml-2" />',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-neutral-500 pointer-events-none ml-2"><polyline points="6 9 12 15 18 9"></polyline></svg>'
)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
