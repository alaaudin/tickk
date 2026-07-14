import re

with open("src/components/GlobalReachMap.tsx", "r") as f:
    content = f.read()

# Import Sphere and Graticule
import_find = "import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';"
import_repl = "import { ComposableMap, Geographies, Geography, Marker, Sphere, Graticule } from 'react-simple-maps';\nimport { useEffect } from 'react';"
content = content.replace(import_find, import_repl)

# Setup rotation state
state_find = r'''  const \[tooltip, setTooltip\] = useState<\{ x: number, y: number, text: string, region: string, action: string \} \| null>\(null\);'''
state_repl = r'''  const [tooltip, setTooltip] = useState<{ x: number, y: number, text: string, region: string, action: string } | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const rotate = () => {
      setRotation((prev) => (prev + 0.1) % 360);
      animationFrameId = requestAnimationFrame(rotate);
    };
    animationFrameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);'''
content = re.sub(state_find, state_repl, content)

# Map updates
map_find = r'''        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 100,
            center: \[0, 20\]
          }}
          className="w-full h-full opacity-80"
        >
          <Geographies geography=\{geoUrl\}>'''

map_repl = r'''        <ComposableMap
          projection="geoOrthographic"
          projectionConfig={{
            scale: 120,
            rotate: [-rotation, 0, 0]
          }}
          className="w-full h-full opacity-90 drop-shadow-2xl"
        >
          <Sphere stroke="currentColor" strokeWidth={0.5} className="text-neutral-200 dark:text-zinc-800" fill="transparent" id="sphere" />
          <Graticule stroke="currentColor" strokeWidth={0.5} className="text-neutral-100 dark:text-zinc-800/50" />
          <Geographies geography={geoUrl}>'''
content = re.sub(map_find, map_repl, content)

# Remove PREMIUM badge
premium_find = r'''                <span className="px-1\.5 py-0\.5 bg-gradient-to-r from-amber-200/80 to-yellow-400/80 dark:from-amber-500/80 dark:to-yellow-600/80 text-amber-900 dark:text-amber-50 text-\[8px\] rounded border border-amber-300/50 dark:border-amber-500/50 shadow-inner font-black uppercase tracking-wider backdrop-blur-md">
                  PREMIUM
                </span>'''
premium_repl = ""
content = re.sub(premium_find, premium_repl, content)

# Premium Blur class update
blur_find = r'''className="relative overflow-hidden rounded-2xl border border-white/20 dark:border-zinc-500/20 bg-white/10 dark:bg-zinc-900/40 backdrop-blur-xl shadow-\[0_8px_32px_rgba\(0,0,0,0\.12\)\] p-4 min-w-\[200px\] animate-in fade-in zoom-in duration-200"'''
blur_repl = r'''className="relative overflow-hidden rounded-2xl border border-white/40 dark:border-white/10 bg-white/40 dark:bg-black/50 backdrop-blur-3xl shadow-2xl p-4 min-w-[220px] animate-in fade-in zoom-in duration-200"'''
content = re.sub(blur_find, blur_repl, content)

with open("src/components/GlobalReachMap.tsx", "w") as f:
    f.write(content)

