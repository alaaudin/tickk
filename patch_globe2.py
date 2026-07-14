import re

with open("src/components/GlobalReachMap.tsx", "r") as f:
    content = f.read()

# Add isHovered state
state_find = r'''  const \[isDragging, setIsDragging\] = useState\(false\);
  const \[dragStart, setDragStart\] = useState<\{ x: number, y: number \} \| null>\(null\);'''
state_repl = r'''  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);'''
content = re.sub(state_find, state_repl, content)

# Use isHovered
effect_find = r'''  useEffect\(\(\) => \{
    let animationFrameId: number;
    const rotateMap = \(\) => \{
      if \(!isDragging\) \{
        setRotation\(\(prev\) => \[\(prev\[0\] \+ 0\.1\) % 360, prev\[1\], prev\[2\]\]\);
      \}
      animationFrameId = requestAnimationFrame\(rotateMap\);
    \};
    animationFrameId = requestAnimationFrame\(rotateMap\);
    return \(\) => cancelAnimationFrame\(animationFrameId\);
  \}, \[isDragging\]\);'''
effect_repl = r'''  useEffect(() => {
    let animationFrameId: number;
    const rotateMap = () => {
      if (!isDragging && !isHovered) {
        setRotation((prev) => [(prev[0] + 0.1) % 360, prev[1], prev[2]]);
      }
      animationFrameId = requestAnimationFrame(rotateMap);
    };
    animationFrameId = requestAnimationFrame(rotateMap);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, isHovered]);'''
content = re.sub(effect_find, effect_repl, content)

# Tooltip enhancements
tooltip_find = r'''      \{tooltip && typeof window !== 'undefined' && createPortal\(
        <div 
          className="fixed z-\[9999\] pointer-events-none transform -translate-x-1/2 -translate-y-full pb-4"
          style=\{\{ left: tooltip\.x, top: tooltip\.y \}\}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/40 dark:border-white/10 bg-white/40 dark:bg-black/50 backdrop-blur-3xl shadow-2xl p-4 min-w-\[220px\] animate-in fade-in zoom-in duration-200">
            \{\/\* Glassmorphic Shine \*\/\}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/20 dark:from-white/0 dark:to-white/5 pointer-events-none" \/>
            <div className="absolute top-0 left-0 right-0 h-\[1px\] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent" \/>
                        
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 dark:border-zinc-700/50 pb-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"><\/span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-\[0_0_8px_rgba\(16,185,129,0\.5\)\]"><\/span>
                  <\/span>
                  <span className="text-\[10px\] uppercase tracking-widest font-bold font-mono text-neutral-800 dark:text-zinc-200">
                    Live Event
                  <\/span>
                <\/div>
              <\/div>
                            
              <div className="flex flex-col gap-1\.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 dark:text-zinc-400 font-medium">Region<\/span>
                  <span className="text-neutral-900 dark:text-white font-mono">\{tooltip\.region\}<\/span>
                <\/div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 dark:text-zinc-400 font-medium">Activity<\/span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">\{tooltip\.action\}<\/span>
                <\/div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 dark:text-zinc-400 font-medium">Latency<\/span>
                  <span className="text-neutral-900 dark:text-white font-mono">\{Math\.floor\(Math\.random\(\) \* 30 \+ 10\)\}ms<\/span>
                <\/div>
              <\/div>
            <\/div>
          <\/div>
        <\/div>,
        document\.body
      \)\}'''

tooltip_repl = r'''      {tooltip && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed z-[9999] pointer-events-none transform -translate-x-1/2 -translate-y-[calc(100%+16px)]"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-5 min-w-[260px] animate-in fade-in zoom-in duration-200">
            {/* Glassmorphic Shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/5 to-transparent dark:from-white/10 dark:via-white/0 dark:to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent" />
            
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                  </span>
                  <span className="text-[11px] uppercase tracking-widest font-black font-mono text-neutral-800 dark:text-zinc-100">
                    Active Data Stream
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-neutral-500 dark:text-zinc-400 font-medium">Origin Region</span>
                  <span className="text-neutral-900 dark:text-white font-mono font-medium">{tooltip.region}</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-neutral-500 dark:text-zinc-400 font-medium">Protocol</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{tooltip.action}</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-neutral-500 dark:text-zinc-400 font-medium">Network Latency</span>
                  <span className="text-neutral-900 dark:text-white font-mono font-medium">{Math.floor(Math.random() * 40 + 12)}ms</span>
                </div>
              </div>
            </div>
            
            {/* Tooltip arrow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border-b border-r border-white/60 dark:border-white/10 shadow-[4px_4px_8px_rgba(0,0,0,0.05)]"></div>
          </div>
        </div>,
        document.body
      )}'''
content = re.sub(tooltip_find, tooltip_repl, content)

# Map hover pausing
map_hover_find = r'''onMouseLeave=\{handleMouseUp\}'''
map_hover_repl = r'''onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); handleMouseUp(); }}'''
content = re.sub(map_hover_find, map_hover_repl, content)

with open("src/components/GlobalReachMap.tsx", "w") as f:
    f.write(content)

