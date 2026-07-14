import re

with open("src/components/GlobalReachMap.tsx", "r") as f:
    content = f.read()

h_find = r'''<div className="w-full h-\[450px\] flex items-center justify-center bg-transparent relative overflow-hidden">'''
h_repl = r'''<div className="w-full h-[350px] flex items-center justify-center bg-transparent relative overflow-hidden">'''
content = re.sub(h_find, h_repl, content)

w_find = r'''className="w-full max-w-\[450px\] aspect-square mx-auto cursor-grab active:cursor-grabbing z-0 relative"'''
w_repl = r'''className="w-full max-w-[350px] aspect-square mx-auto cursor-grab active:cursor-grabbing z-0 relative"'''
content = re.sub(w_find, w_repl, content)

with open("src/components/GlobalReachMap.tsx", "w") as f:
    f.write(content)
