import re

with open("src/components/GlobalReachMap.tsx", "r") as f:
    content = f.read()

find_str = r'''      <div className="w-full h-\[550px\] flex items-center justify-center bg-transparent relative overflow-hidden mt-8">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-\[80%\] h-\[80%\] bg-neutral-200/20 dark:bg-white/5 rounded-full blur-\[100px\]"><\/div>
        <\/div>'''

repl_str = r'''      <div className="w-full h-[550px] flex items-center justify-center bg-transparent relative overflow-hidden mt-8">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[80%] h-[80%] bg-neutral-200/20 dark:bg-white/5 rounded-full blur-[100px]"></div>
        </div>
        
        {/* Premium Vertical Fades */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/80 dark:from-[#09090b] dark:via-[#09090b]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 dark:from-[#09090b] dark:via-[#09090b]/80 to-transparent z-10 pointer-events-none" />
'''

content = re.sub(find_str, repl_str, content)

with open("src/components/GlobalReachMap.tsx", "w") as f:
    f.write(content)
