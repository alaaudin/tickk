import re

with open("src/components/GlobalReachMap.tsx", "r") as f:
    content = f.read()

# Replace the data generator
gen_find = r'''const generateRandomCoordinates = \(count: number\) => \{
  const coords = \[\];
  for \(let i = 0; i < count; i\+\+\) \{
    // Bias towards North America, Europe, Asia
    const regions = \[
      \[-\(Math\.random\(\) \* 60 \+ 60\), Math\.random\(\) \* 30 \+ 20\], // NA
      \[Math\.random\(\) \* 30 - 10, Math\.random\(\) \* 20 \+ 40\], // Europe
      \[Math\.random\(\) \* 60 \+ 60, Math\.random\(\) \* 30 \+ 10\], // Asia
      \[Math\.random\(\) \* 40 - 60, -\(Math\.random\(\) \* 30 \+ 10\)\], // SA
      \[Math\.random\(\) \* 40 \+ 10, -\(Math\.random\(\) \* 30 \+ 0\)\], // Africa
      \[Math\.random\(\) \* 40 \+ 110, -\(Math\.random\(\) \* 30 \+ 10\)\] // AUS
    \];
    coords\.push\(regions\[Math\.floor\(Math\.random\(\) \* regions\.length\)\]\);
  \}
  return coords;
\};'''

gen_repl = r'''const generateRandomCoordinates = (count: number) => {
  const coords = [];
  for (let i = 0; i < count; i++) {
    // Bias towards North America, Europe, Asia
    const regions = [
      { coord: [-(Math.random() * 60 + 60), Math.random() * 30 + 20], region: "North America", action: "Link Clicked" }, // NA
      { coord: [Math.random() * 30 - 10, Math.random() * 20 + 40], region: "Europe", action: "Document Opened" }, // Europe
      { coord: [Math.random() * 60 + 60, Math.random() * 30 + 10], region: "Asia", action: "Payload Executed" }, // Asia
      { coord: [Math.random() * 40 - 60, -(Math.random() * 30 + 10)], region: "South America", action: "Tracker Ping" }, // SA
      { coord: [Math.random() * 40 + 10, -(Math.random() * 30 + 0)], region: "Africa", action: "Data Sync" }, // Africa
      { coord: [Math.random() * 40 + 110, -(Math.random() * 30 + 10)], region: "Oceania", action: "Session Initiated" } // AUS
    ];
    coords.push(regions[Math.floor(Math.random() * regions.length)]);
  }
  return coords;
};'''

content = re.sub(gen_find, gen_repl, content)

# Tooltip state
state_find = r'''const \[tooltip, setTooltip\] = useState<\{ x: number, y: number, text: string \} \| null>\(null\);'''
state_repl = r'''const [tooltip, setTooltip] = useState<{ x: number, y: number, text: string, region: string, action: string } | null>(null);'''
content = re.sub(state_find, state_repl, content)

# Map URL
url_find = r'''const geoUrl = "https://unpkg\.com/world-atlas@2\.0\.2/countries-110m\.json";'''
url_repl = r'''const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";'''
content = re.sub(url_find, url_repl, content)

# Map and Tooltip
map_find = r'''          \{markers\.map\(\(coord, i\) => \([\s\S]*?\}\)'''
map_repl = r'''          {markers.map((data: any, i) => (
            <Marker key={i} coordinates={data.coord as [number, number]}>
              <circle 
                r={6} 
                fill="transparent"
                onMouseEnter={(e) => {
                  setTooltip({ x: e.clientX, y: e.clientY, text: 'Active Data Stream', region: data.region, action: data.action });
                }}
                onMouseMove={(e) => {
                  setTooltip({ x: e.clientX, y: e.clientY, text: 'Active Data Stream', region: data.region, action: data.action });
                }}
                onMouseLeave={() => setTooltip(null)}
                className="cursor-pointer"
              />
              <circle r={2.5} fill="#10b981" className="animate-pulse pointer-events-none" style={{ animationDelay: `${Math.random() * 2}s` }} />
              <circle r={8} fill="#10b981" opacity={0.2} className="animate-ping pointer-events-none" style={{ animationDelay: `${Math.random() * 2}s`, animationDuration: '3s' }} />
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {tooltip && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed z-[9999] pointer-events-none transform -translate-x-1/2 -translate-y-[120%] pb-3 animate-in fade-in zoom-in duration-200"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/20 dark:border-zinc-500/20 bg-white/10 dark:bg-zinc-900/40 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-4 min-w-[200px]">
            {/* Glassmorphic Shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/20 dark:from-white/0 dark:to-white/5 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent" />
            
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 dark:border-zinc-700/50 pb-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-bold font-mono text-neutral-800 dark:text-zinc-200">
                    Live Event
                  </span>
                </div>
                <span className="px-1.5 py-0.5 bg-gradient-to-r from-amber-200/80 to-yellow-400/80 dark:from-amber-500/80 dark:to-yellow-600/80 text-amber-900 dark:text-amber-50 text-[8px] rounded border border-amber-300/50 dark:border-amber-500/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] font-black uppercase tracking-wider backdrop-blur-md">
                  PREMIUM
                </span>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 dark:text-zinc-400 font-medium">Region</span>
                  <span className="text-neutral-900 dark:text-white font-mono">{tooltip.region}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 dark:text-zinc-400 font-medium">Activity</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{tooltip.action}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 dark:text-zinc-400 font-medium">Latency</span>
                  <span className="text-neutral-900 dark:text-white font-mono">{Math.floor(Math.random() * 40 + 10)}ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}'''

content = re.sub(map_find, map_repl, content)

with open("src/components/GlobalReachMap.tsx", "w") as f:
    f.write(content)
