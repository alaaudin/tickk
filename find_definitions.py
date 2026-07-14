import re

with open("dist/assets/index-D7lN7HVb.js", "r") as f:
    bundle = f.read()

# Let's search for assignments to zt
matches = re.findall(r'(?:var|const|let|,)\s*zt\s*=\s*([^;]+)', bundle)
for m in matches[:5]:
    print("Assign of zt:", m[:200])

# Let's also search for lucide-react or icons
# zt is probably the helper function that creates Lucide icons, e.g. createReactComponent or similar!
