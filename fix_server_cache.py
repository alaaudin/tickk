import re

with open("server.ts", "r") as f:
    content = f.read()

find_html = r'''  app.get\("\*", \(req, res\) => \{
    res.sendFile\(path.join\(distPath, "index.html"\)\);
  \}\);'''

repl_html = r'''  app.get("*", (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    res.sendFile(path.join(distPath, "index.html"));
  });'''

content = re.sub(find_html, repl_html, content)

with open("server.ts", "w") as f:
    f.write(content)
