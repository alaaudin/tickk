with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

content = content.replace('"/api/track/${trackerId}/pixel.png"', '"/api/p/${trackerId}.png"')
content = content.replace('"/api/track/${trackerId}/click?url=${encodeURIComponent(linkUrl)}"', '"/api/click/${trackerId}"')
content = content.replace('"/api/track/${tracker.id}/click?url=${encodeURIComponent(tracker.linkUrl || "")}"', '"/api/click/${tracker.id}"')

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
