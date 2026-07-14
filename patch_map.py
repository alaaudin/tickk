import re

with open("src/components/GlobalReachMap.tsx", "r") as f:
    content = f.read()

# Increase height of map container
h_find = r'''<div className="w-full h-\[350px\] flex items-center justify-center bg-transparent relative overflow-hidden mt-8">'''
h_repl = r'''<div className="w-full h-[550px] flex items-center justify-center bg-transparent relative overflow-hidden mt-8">'''
content = re.sub(h_find, h_repl, content)

# Adjust scale for geoMercator to prevent clipping, maybe center differently or remove center.
scale_find = r'''            projectionConfig=\{\{
              scale: 110,
              center: \[0, 30\]
            \}\}'''
scale_repl = r'''            projectionConfig={{
              scale: 130,
              center: [0, 15]
            }}'''
content = re.sub(scale_find, scale_repl, content)

with open("src/components/GlobalReachMap.tsx", "w") as f:
    f.write(content)

