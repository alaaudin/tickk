with open("src/components/Dashboard.tsx", "r") as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if ".map(" in line:
        print(f"Line {idx+1}: {line.strip()}")
        # Print a few lines after
        for offset in range(1, 4):
            if idx + offset < len(lines):
                print(f"  + {lines[idx+offset].rstrip()}")
