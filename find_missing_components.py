import re

with open("dist/assets/index-D7lN7HVb.js", "r") as f:
    bundle = f.read()

components = ['e6e', 'nbe', 'a6e', 'w6', 'y6', 'qce', 'r6e']

for comp in components:
    # Let's search for: var comp = ... or comp = ...
    # Since these are O.forwardRef or functions, let's extract their complete definition!
    # Usually they look like: var e6e=O.forwardRef(...) or function e6e(...)
    # Let's search for patterns starting with the component name followed by = and ending before another top-level var or function.
    pattern = r'(?:var|const|let)\s*' + comp + r'\s*=\s*([^;]+);'
    match = re.search(pattern, bundle)
    if match:
        print(f"--- Definition of {comp} ---")
        print(match.group(0))
    else:
        # Try function pattern
        func_pattern = r'function\s+' + comp + r'\s*\([^\)]*\)\s*\{[^\}]+\}'
        f_match = re.search(func_pattern, bundle)
        if f_match:
            print(f"--- Func definition of {comp} ---")
            print(f_match.group(0))
        else:
            # Let's search for a looser pattern
            loose_pattern = comp + r'\s*=\s*O\.forwardRef\([\s\S]+?\);'
            l_match = re.search(loose_pattern, bundle)
            if l_match:
                print(f"--- Loose definition of {comp} ---")
                print(l_match.group(0))
            else:
                print(f"Could not find definition for {comp}")
