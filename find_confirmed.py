with open("src/components/Dashboard.tsx", "r") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "Confirmed" in line or "confirmed" in line:
        print(f"Line {i+1}: {line.strip()}")
        # Print a few lines around it
        start = max(0, i-2)
        end = min(len(lines), i+8)
        print("--- CONTEXT ---")
        for j in range(start, end):
            print(f"{j+1}: {lines[j].strip()}")
        print("================")
