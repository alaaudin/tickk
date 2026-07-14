import re

with open("src/index.css", "r") as f:
    content = f.read()

find = r'''  @keyframes shimmer \{
    0% \{ transform: translateX\(-100%\); \}
    100% \{ transform: translateX\(200%\); \}
  \}'''

repl = r'''  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes shimmer-bg {
    0% { background-position: 200% center; }
    100% { background-position: -200% center; }
  }'''

content = re.sub(find, repl, content)

with open("src/index.css", "w") as f:
    f.write(content)

with open("src/components/Dashboard.tsx", "r") as f:
    dashboard = f.read()

# Make the wrapper use the background-position shimmer
# "animate-[shimmer_2.5s_infinite_linear]"
shimmer_span = r'''<span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 dark:via-white/20 to-transparent animate-\[shimmer_2\.5s_infinite_linear\]"><\/span>'''

# Replace with background size 200% 100% and shimmer-bg
new_shimmer_span = r'''<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-[shimmer-bg_2s_infinite_linear] bg-[length:200%_100%]"></span>'''

dashboard = re.sub(shimmer_span, new_shimmer_span, dashboard)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(dashboard)

