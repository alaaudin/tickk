import re

with open('src/components/LandingPage.tsx', 'r') as f:
    content = f.read()

# Revert Landing Cards
c1 = 'className="bg-gradient-to-b from-white/70 to-emerald-50/20 dark:from-[#121215]/70 dark:to-emerald-900/10 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-500/50 rounded-xl p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.05)] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"'
r1 = 'className="bg-white/70 dark:bg-[#121215]/70 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-800/80 rounded-xl p-8 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"'
content = content.replace(c1, r1)

c2 = 'className="bg-gradient-to-b from-white/80 to-amber-50/30 dark:from-[#16161b]/85 dark:to-amber-900/10 backdrop-blur-md border-2 border-amber-500/60 rounded-xl p-8 flex flex-col justify-between relative shadow-[0_0_25px_rgba(251,191,36,0.15)] dark:shadow-[0_0_25px_rgba(251,191,36,0.1)] hover:scale-[1.01] transition-all duration-300"'
r2 = 'className="bg-white/80 dark:bg-[#16161b]/85 backdrop-blur-md border-2 border-neutral-900 dark:border-neutral-400 rounded-xl p-8 flex flex-col justify-between relative shadow-[0_10px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(255,255,255,0.03)] hover:scale-[1.01] transition-all duration-300"'
content = content.replace(c2, r2)

with open('src/components/LandingPage.tsx', 'w') as f:
    f.write(content)
