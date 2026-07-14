import re

with open("src/components/GlobalReachMap.tsx", "r") as f:
    content = f.read()

# 1. Replace state with ref
r_state_find = r'''  const \[{ r \}, setR\] = useState\(\{ r: 0 \}\);'''
r_state_repl = r'''  const r = useRef(0);'''
content = re.sub(r_state_find, r_state_repl, content)

# 2. Update dependencies
effect_dep_find = r'''  \}, \[markers, r\]\);'''
effect_dep_repl = r'''  }, [markers]);'''
content = re.sub(effect_dep_find, effect_dep_repl, content)

# 3. Update onRender
render_find = r'''        state\.phi = phi \+ r;'''
render_repl = r'''        state.phi = phi + r.current;'''
content = re.sub(render_find, render_repl, content)

# 4. Update pointer move
pointer_move_find = r'''                setR\(\(prev\) => \(\{ r: prev\.r \+ delta / 200 \}\)\);'''
pointer_move_repl = r'''                r.current += delta / 200;'''
content = re.sub(pointer_move_find, pointer_move_repl, content)

# 5. Make earth dark
dark_earth_find = r'''      baseColor: isDark \? \[0\.3, 0\.3, 0\.3\] : \[0\.95, 0\.95, 0\.95\],'''
dark_earth_repl = r'''      baseColor: [0.1, 0.1, 0.1],'''
content = re.sub(dark_earth_find, dark_earth_repl, content)

# 6. Make glow white
glow_color_find = r'''      glowColor: isDark \? \[0\.1, 0\.1, 0\.1\] : \[0\.9, 0\.9, 0\.9\],'''
glow_color_repl = r'''      glowColor: [1, 1, 1],'''
content = re.sub(glow_color_find, glow_color_repl, content)

# 7. Change background blur div to light white
blur_find = r'''<div className="w-\[300px\] h-\[300px\] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-\[80px\]"><\/div>'''
blur_repl = r'''<div className="w-[300px] h-[300px] bg-white/20 dark:bg-white/10 rounded-full blur-[80px]"></div>'''
content = re.sub(blur_find, blur_repl, content)

with open("src/components/GlobalReachMap.tsx", "w") as f:
    f.write(content)

