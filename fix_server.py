import re

with open("server.ts", "r") as f:
    content = f.read()

pattern_open = r"// 7\. Simulated open via click inside App Dashboard\napp\.post\(\"/api/links/:id/simulate-open\"[\s\S]*?res\.json\(tracker\);\n}\);\n"
content = re.sub(pattern_open, "", content)

pattern_click = r"// 8\. Simulated link click via click inside App Dashboard\napp\.post\(\"/api/links/:id/simulate-click\"[\s\S]*?res\.json\(tracker\);\n}\);\n"
content = re.sub(pattern_click, "", content)

with open("server.ts", "w") as f:
    f.write(content)

