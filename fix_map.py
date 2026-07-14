import re

with open("src/components/GlobalReachMap.tsx", "r") as f:
    content = f.read()

find_str = r'''        \{/\* Premium Vertical Fades \*/\}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/80 dark:from-\[#09090b\] dark:via-\[#09090b\]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 dark:from-\[#09090b\] dark:via-\[#09090b\]/80 to-transparent z-10 pointer-events-none" />

        <div className="w-full h-full cursor-crosshair z-0 relative px-4">'''

repl_str = r'''        <div 
          className="w-full h-full cursor-crosshair z-0 relative px-4"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
          }}
        >'''

content = re.sub(find_str, repl_str, content)

with open("src/components/GlobalReachMap.tsx", "w") as f:
    f.write(content)
