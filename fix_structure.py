with open('src/components/Dashboard.tsx', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if line.strip() == ")}":
        # check around it
        start = max(0, i - 3)
        end = min(len(lines), i + 4)
        print(f"Match at line {i+1}:")
        for j in range(start, end):
            print(f"{j+1}: {lines[j].strip()}")
        print("-" * 40)
