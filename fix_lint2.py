import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

content = content.replace('previewTracker.title', 'previewTracker.subject')

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)

with open("src/components/OfficialLogos.tsx", "r") as f:
    content = f.read()

# Fix OfficialLogos SVG errors
content = re.sub(r'xmlns:[a-zA-Z]+="[^"]*"', '', content)
content = re.sub(r'<metadata>[\s\S]*?</metadata>', '', content)
content = content.replace('enableBackground', 'enablebackground')

with open("src/components/OfficialLogos.tsx", "w") as f:
    f.write(content)

