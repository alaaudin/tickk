import os

with open("server.ts", "r") as f:
    server_content = f.read()

server_content = server_content.replace('"/api/trackers"', '"/api/links"')
server_content = server_content.replace('"/api/trackers/:id"', '"/api/links/:id"')
server_content = server_content.replace('"/api/trackers/stats"', '"/api/links/stats"')
server_content = server_content.replace('"/api/trackers/:id/simulate-open"', '"/api/links/:id/simulate-open"')
server_content = server_content.replace('"/api/trackers/:id/simulate-click"', '"/api/links/:id/simulate-click"')
server_content = server_content.replace('"/api/track/:id"', '"/api/p/:id"')
server_content = server_content.replace('"/api/track/:id.png"', '"/api/p/:id.png"')

with open("server.ts", "w") as f:
    f.write(server_content)

with open("src/components/Dashboard.tsx", "r") as f:
    dash_content = f.read()

dash_content = dash_content.replace('"/api/trackers"', '"/api/links"')
dash_content = dash_content.replace('"/api/trackers/"', '"/api/links/"')

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(dash_content)

