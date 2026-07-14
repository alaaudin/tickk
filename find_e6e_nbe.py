import re

with open("dist/assets/index-D7lN7HVb.js", "r") as f:
    bundle = f.read()

for name in ['PY', 'Q2e', 'EN', 'Ice', 'Jo']:
    # Let's search for: name = ... or const name = ... or function name
    # To find their declarations
    idx = bundle.find(f"{name}=")
    if idx == -1:
        idx = bundle.find(f"{name} =")
    if idx != -1:
        print(f"Found {name} assignment at index {idx}:")
        print(bundle[max(0, idx-100):idx+300])
    else:
        # Check if declared as function
        f_idx = bundle.find(f"function {name}")
        if f_idx != -1:
            print(f"Found function {name} at index {f_idx}:")
            print(bundle[max(0, f_idx-100):f_idx+300])
        else:
            print(f"Could not find any declaration for {name}")
