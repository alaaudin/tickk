import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# find "Interaction Timeline Map"
idx = content.find("Interaction Timeline Map")
if idx != -1:
    end = content.find("</table>", idx)
    print(content[idx:end+8])
