with open("src/components/Dashboard.tsx", "r") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "Delivery Rate" in line or "Emails Opened" in line or "Links Clicked" in line or "delivery rate" in line.lower():
        print(f"Line {i+1}: {line.strip()}")
        start = max(0, i-5)
        end = min(len(lines), i+15)
        print("--- CONTEXT ---")
        for j in range(start, end):
            print(f"{j+1}: {lines[j].strip()}")
        print("================")
