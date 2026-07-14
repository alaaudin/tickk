import re

with open("src/components/GlobalReachMap.tsx", "r") as f:
    content = f.read()

# Add useState and ActivityIcon
import_find = "import React, { useMemo } from 'react';"
import_repl = "import React, { useMemo, useState } from 'react';\nimport { createPortal } from 'react-dom';"
content = content.replace(import_find, import_repl)

globe_find = "import { Globe } from 'lucide-react';"
globe_repl = "import { Globe, Activity as ActivityIcon } from 'lucide-react';"
content = content.replace(globe_find, globe_repl)

# Inside component
comp_find = r'''  const markers = useMemo\(\(\) => \{
    return generateRandomCoordinates\(Math\.min\(activityCount \|\| 10, 50\)\);
  \}, \[activityCount\]\);'''

comp_repl = r'''  const markers = useMemo(() => {
    return generateRandomCoordinates(Math.min(activityCount || 10, 50));
  }, [activityCount]);

  const [tooltip, setTooltip] = useState<{ x: number, y: number, text: string } | null>(null);'''
content = re.sub(comp_find, comp_repl, content)

# Tooltip element
tooltip_repl = r'''          {markers.map((coord, i) => (
            <Marker key={i} coordinates={coord as [number, number]}>
              <circle 
                r={6} 
                fill="transparent"
                onMouseEnter={(e) => {
                  setTooltip({ x: e.clientX, y: e.clientY, text: 'Active Data Stream' });
                }}
                onMouseMove={(e) => {
                  setTooltip({ x: e.clientX, y: e.clientY, text: 'Active Data Stream' });
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
          className="fixed z-[9999] pointer-events-none transform -translate-x-1/2 -translate-y-full pb-3"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-neutral-300/40 dark:border-zinc-700/50 bg-neutral-200/40 dark:bg-zinc-800/40 backdrop-blur-xl shadow-sm">
            <ActivityIcon className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-bold font-mono text-neutral-700 dark:text-zinc-300 flex items-center">
              {tooltip.text}
            </span>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}'''

content = re.sub(r'''          \{markers\.map\(\(coord, i\) => \([\s\S]*?\}\)''', tooltip_repl, content)

with open("src/components/GlobalReachMap.tsx", "w") as f:
    f.write(content)
