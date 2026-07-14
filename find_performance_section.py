with open("src/components/Dashboard.tsx", "r") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "Performance" in line or "Device Distribution" in line or "System verification health" in line or "System Verification" in line:
        print(f"Line {i+1}: {line.strip()}")
        # Print a few lines before and after
        start = max(0, i-5)
        end = min(len(lines), i+20)
        print("--- CONTEXT ---")
        for j in range(start, end):
            print(f"{j+1}: {lines[j].strip()}")
        print("================")
