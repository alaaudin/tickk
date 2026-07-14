with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_str = 'className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"'
repl_str = 'className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xl"'

content = content.replace(find_str, repl_str)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
