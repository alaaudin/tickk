import re

with open("server.ts", "r") as f:
    content = f.read()

content = content.replace("// saveDatabase(); // Let's avoid constant writes for recovered users", "saveDatabase();")

with open("server.ts", "w") as f:
    f.write(content)
