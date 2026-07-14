import re

with open("src/components/Dashboard.tsx", "r") as f:
    code = f.read()

# Let's find all .map( occurrences and extract their context
# We want to check if they have a key attribute or if there is a potential missing key.
pattern = r'\.map\s*\(\s*(\([^)]*\)|[a-zA-Z0-9_]+)\s*=>'
matches = list(re.finditer(pattern, code))

print(f"Found {len(matches)} .map( occurrences.")

for i, match in enumerate(matches):
    start = max(0, match.start() - 100)
    end = min(len(code), match.end() + 500)
    print(f"--- MATCH {i+1} (index {match.start()}) ---")
    print(code[match.start():end])
    print("="*40)
