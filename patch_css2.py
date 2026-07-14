import re

with open("src/index.css", "r") as f:
    content = f.read()

content = content.replace("100% { transform: translateX(100%); }", "100% { transform: translateX(200%); }")

with open("src/index.css", "w") as f:
    f.write(content)
