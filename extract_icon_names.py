import re

with open("dist/assets/index-D7lN7HVb.js", "r") as f:
    bundle = f.read()

# Let's find all patterns like name = zt("icon-name" or name=zt("icon-name"
# e.g., c5 = zt("check", or similar
# zt can be called, let's write a flexible regex:
matches = re.findall(r'([a-zA-Z0-9_]{2,10})\s*=\s*zt\(\s*"([^"]+)"', bundle)

mapping = {}
for var_name, icon_name in matches:
    # Convert icon-name (kebab-case) to PascalCase
    pascal = "".join([part.capitalize() for part in icon_name.split("-")])
    mapping[var_name] = pascal

print("Icon Mapping found:")
for k, v in sorted(mapping.items()):
    print(f"const {k} = {v};")
