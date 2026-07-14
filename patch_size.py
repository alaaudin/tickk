import re

with open("src/components/GlobalReachMap.tsx", "r") as f:
    content = f.read()

size_find = r'''className="w-full h-\[550px\] flex items-center justify-center bg-transparent cursor-grab active:cursor-grabbing overflow-hidden"'''
size_repl = r'''className="w-full h-[700px] flex items-center justify-center bg-transparent cursor-grab active:cursor-grabbing overflow-hidden"'''
content = re.sub(size_find, size_repl, content)

scale_find = r'''          projectionConfig={{
            scale: 230,
            rotate: \[-rotation\[0\], -rotation\[1\], rotation\[2\]\]
          }}'''
scale_repl = r'''          projectionConfig={{
            scale: 320,
            rotate: [-rotation[0], -rotation[1], rotation[2]]
          }}'''
content = re.sub(scale_find, scale_repl, content)

with open("src/components/GlobalReachMap.tsx", "w") as f:
    f.write(content)

