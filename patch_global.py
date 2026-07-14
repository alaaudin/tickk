import re

with open("src/components/GlobalReachMap.tsx", "r") as f:
    content = f.read()

state_find = r'''  const \[rotation, setRotation\] = useState\(0\);

  useEffect\(\(\) => \{
    let animationFrameId: number;
    const rotate = \(\) => \{
      setRotation\(\(prev\) => \(prev \+ 0\.1\) % 360\);
      animationFrameId = requestAnimationFrame\(rotate\);
    \};
    animationFrameId = requestAnimationFrame\(rotate\);
    return \(\) => cancelAnimationFrame\(animationFrameId\);
  \}, \[\]\);'''

state_repl = r'''  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    const rotateMap = () => {
      if (!isDragging) {
        setRotation((prev) => [(prev[0] + 0.1) % 360, prev[1], prev[2]]);
      }
      animationFrameId = requestAnimationFrame(rotateMap);
    };
    animationFrameId = requestAnimationFrame(rotateMap);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDragging && dragStart) {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - dragStart.x;
      const dy = clientY - dragStart.y;
      setRotation((prev) => [(prev[0] + dx * 0.5) % 360, (prev[1] - dy * 0.5) % 360, prev[2]]);
      setDragStart({ x: clientX, y: clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };'''

content = re.sub(state_find, state_repl, content)

map_find = r'''<div className="w-full h-\[300px\] flex items-center justify-center bg-neutral-50/50 dark:bg-zinc-900/20">
        <ComposableMap
          projection="geoOrthographic"
          projectionConfig=\{\{
            scale: 120,
            rotate: \[-rotation, 0, 0\]
          \}\}
          className="w-full h-full opacity-90 drop-shadow-2xl"
        >'''

map_repl = r'''<div 
          className="w-full h-[550px] flex items-center justify-center bg-neutral-50/50 dark:bg-zinc-900/20 cursor-grab active:cursor-grabbing overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
        <ComposableMap
          projection="geoOrthographic"
          projectionConfig={{
            scale: 230,
            rotate: [-rotation[0], -rotation[1], rotation[2]]
          }}
          className="w-full h-full opacity-90 drop-shadow-2xl"
        >'''

content = re.sub(map_find, map_repl, content)

with open("src/components/GlobalReachMap.tsx", "w") as f:
    f.write(content)

