import re

with open("src/components/GlobalReachMap.tsx", "r") as f:
    content = f.read()

op_find = r'''              contain: 'layout paint size',
              opacity: 0,
              transition: 'opacity 1s ease',
            \}\}'''
op_repl = r'''              contain: 'layout paint size',
              opacity: 1,
              transition: 'opacity 1s ease',
            }}'''
content = re.sub(op_find, op_repl, content)

with open("src/components/GlobalReachMap.tsx", "w") as f:
    f.write(content)
