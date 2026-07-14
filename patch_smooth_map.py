import re

with open("src/components/GlobalReachMap.tsx", "r") as f:
    content = f.read()

# 1. Switch back to 110m for extreme smoothness
url_find = r'''const geoUrl = "https://unpkg\.com/world-atlas@2\.0\.2/countries-50m\.json";'''
url_repl = r'''const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";'''
content = re.sub(url_find, url_repl, content)

# 2. Make backgrounds transparent to match the homepage
wrap1_find = r'''<div className="flex flex-col bg-white dark:bg-\[#111111\] rounded-2xl border border-neutral-200/60 dark:border-zinc-800/60 shadow-xl overflow-hidden relative">'''
wrap1_repl = r'''<div className="flex flex-col bg-transparent overflow-hidden relative">'''
content = re.sub(wrap1_find, wrap1_repl, content)

wrap2_find = r'''className="w-full h-\[550px\] flex items-center justify-center bg-neutral-50/50 dark:bg-zinc-900/20 cursor-grab active:cursor-grabbing overflow-hidden"'''
wrap2_repl = r'''className="w-full h-[550px] flex items-center justify-center bg-transparent cursor-grab active:cursor-grabbing overflow-hidden"'''
content = re.sub(wrap2_find, wrap2_repl, content)

# 3. Increase rotation speed on drag for better responsiveness
drag_find = r'''setRotation\(\(prev\) => \[\(prev\[0\] \+ dx \* 0\.5\) % 360, \(prev\[1\] - dy \* 0\.5\) % 360, prev\[2\]\]\);'''
drag_repl = r'''setRotation((prev) => [(prev[0] + dx * 0.8) % 360, (prev[1] - dy * 0.8) % 360, prev[2]]);'''
content = re.sub(drag_find, drag_repl, content)

# 4. Make sphere and graticule blend better with the transparent background
sphere_find = r'''<Sphere stroke="currentColor" strokeWidth=\{0\.5\} className="text-neutral-200 dark:text-zinc-800" fill="transparent" id="sphere" />
          <Graticule stroke="currentColor" strokeWidth=\{0\.5\} className="text-neutral-100 dark:text-zinc-800/50" />'''
sphere_repl = r'''<Sphere stroke="currentColor" strokeWidth={0.5} className="text-neutral-200 dark:text-zinc-800/50" fill="transparent" id="sphere" />
          <Graticule stroke="currentColor" strokeWidth={0.5} className="text-neutral-100 dark:text-zinc-800/30" />'''
content = re.sub(sphere_find, sphere_repl, content)

with open("src/components/GlobalReachMap.tsx", "w") as f:
    f.write(content)

