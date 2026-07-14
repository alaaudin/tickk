with open("src/components/Dashboard.tsx", "r") as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if "useState" in line:
        print(f"Line {idx+1}: {line.strip()}")
