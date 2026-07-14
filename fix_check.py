with open('src/components/Dashboard.tsx', 'r') as f:
    d_content = f.read()

d_content = d_content.replace('<Check className="w-4 h-4 shrink-0" />', '<Check className="w-4 h-4 text-emerald-500 shrink-0" />')

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(d_content)
