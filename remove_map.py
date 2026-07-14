import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# Pattern to find all GLOBAL REACH MAP WIDGET blocks
pattern = re.compile(r'\s*\{\/\* GLOBAL REACH MAP WIDGET \*\/\}\s*<div className="pt-4">\s*<GlobalReachMap[^\>]+>\s*<\/div>')

matches = list(pattern.finditer(content))

# We want to keep the first one (which is on the home page) and remove the rest
if len(matches) > 1:
    # Replace all but the first match with empty string
    new_content = content[:matches[1].start()]
    
    last_end = matches[1].end()
    for i in range(2, len(matches)):
        new_content += content[last_end:matches[i].start()]
        last_end = matches[i].end()
    
    new_content += content[last_end:]
    
    with open("src/components/Dashboard.tsx", "w") as f:
        f.write(new_content)
    print(f"Removed {len(matches) - 1} occurrences.")
else:
    print("Not enough matches found.")
