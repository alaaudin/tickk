import re

with open("src/components/GlobalReachMap.tsx", "r") as f:
    content = f.read()

# 1. Fix the animation lag by memoizing the random delays
gen_find = r'''const generateRandomCoordinates = \(count: number\) => \{
  const coords = \[\];
  for \(let i = 0; i < count; i\+\+\) \{
    // Bias towards North America, Europe, Asia
    const regions = \[
      \{ coord: \[-\(Math\.random\(\) \* 60 \+ 60\), Math\.random\(\) \* 30 \+ 20\], region: "North America", action: "Link Clicked" \}, // NA
      \{ coord: \[Math\.random\(\) \* 30 - 10, Math\.random\(\) \* 20 \+ 40\], region: "Europe", action: "Document Opened" \}, // Europe
      \{ coord: \[Math\.random\(\) \* 60 \+ 60, Math\.random\(\) \* 30 \+ 10\], region: "Asia", action: "Payload Executed" \}, // Asia
      \{ coord: \[Math\.random\(\) \* 40 - 60, -\(Math\.random\(\) \* 30 \+ 10\)\], region: "South America", action: "Tracker Ping" \}, // SA
      \{ coord: \[Math\.random\(\) \* 40 \+ 10, -\(Math\.random\(\) \* 30 \+ 0\)\], region: "Africa", action: "Data Sync" \}, // Africa
      \{ coord: \[Math\.random\(\) \* 40 \+ 110, -\(Math\.random\(\) \* 30 \+ 10\)\], region: "Oceania", action: "Session Initiated" \} // AUS
    \];
    coords\.push\(regions\[Math\.floor\(Math\.random\(\) \* regions\.length\)\]\);
  \}
  return coords;
\};'''

gen_repl = r'''const generateRandomCoordinates = (count: number) => {
  const coords = [];
  for (let i = 0; i < count; i++) {
    const regions = [
      { coord: [-(Math.random() * 60 + 60), Math.random() * 30 + 20], region: "North America", action: "Link Clicked" }, // NA
      { coord: [Math.random() * 30 - 10, Math.random() * 20 + 40], region: "Europe", action: "Document Opened" }, // Europe
      { coord: [Math.random() * 60 + 60, Math.random() * 30 + 10], region: "Asia", action: "Payload Executed" }, // Asia
      { coord: [Math.random() * 40 - 60, -(Math.random() * 30 + 10)], region: "South America", action: "Tracker Ping" }, // SA
      { coord: [Math.random() * 40 + 10, -(Math.random() * 30 + 0)], region: "Africa", action: "Data Sync" }, // Africa
      { coord: [Math.random() * 40 + 110, -(Math.random() * 30 + 10)], region: "Oceania", action: "Session Initiated" } // AUS
    ];
    const selected = regions[Math.floor(Math.random() * regions.length)];
    coords.push({
      ...selected,
      delay1: `${Math.random() * 2}s`,
      delay2: `${Math.random() * 2}s`
    });
  }
  return coords;
};'''

content = re.sub(gen_find, gen_repl, content)

# 2. Use the stable delays in the Marker rendering
marker_find = r'''<circle r=\{2\.5\} fill="#10b981" className="animate-pulse pointer-events-none" style=\{\{ animationDelay: `\$\{Math\.random\(\) \* 2\}s` \}\} \/>
              <circle r=\{8\} fill="#10b981" opacity=\{0\.2\} className="animate-ping pointer-events-none" style=\{\{ animationDelay: `\$\{Math\.random\(\) \* 2\}s`, animationDuration: '3s' \}\} \/>'''

marker_repl = r'''<circle r={2.5} fill="#10b981" className="animate-pulse pointer-events-none" style={{ animationDelay: data.delay1 }} />
              <circle r={8} fill="#10b981" opacity={0.2} className="animate-ping pointer-events-none" style={{ animationDelay: data.delay2, animationDuration: '3s' }} />'''

content = re.sub(marker_find, marker_repl, content)


# 3. Reduce height and add a glow to replace the expensive drop-shadow
height_find = r'''className="w-full h-\[700px\] flex items-center justify-center bg-transparent cursor-grab active:cursor-grabbing overflow-hidden"'''
height_repl = r'''className="w-full h-[450px] flex items-center justify-center bg-transparent cursor-grab active:cursor-grabbing overflow-hidden relative"'''

content = re.sub(height_find, height_repl, content)

# 4. Remove heavy drop-shadow from SVG and adjust scale
map_find = r'''<ComposableMap
          projection="geoOrthographic"
          projectionConfig=\{\{
            scale: 320,
            rotate: \[-rotation\[0\], -rotation\[1\], rotation\[2\]\]
          \}\}
          className="w-full h-full opacity-90 drop-shadow-2xl"
        >'''

map_repl = r'''<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[300px] h-[300px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[80px]"></div>
        </div>
        <ComposableMap
          projection="geoOrthographic"
          projectionConfig={{
            scale: 220,
            rotate: [-rotation[0], -rotation[1], rotation[2]]
          }}
          className="w-full h-full opacity-90"
        >'''

content = re.sub(map_find, map_repl, content)

with open("src/components/GlobalReachMap.tsx", "w") as f:
    f.write(content)
