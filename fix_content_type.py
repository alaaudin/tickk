import re
with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# For api/links
old_links = """      const trackerRes = await fetch("/api/links", {
        cache: "no-store",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (trackerRes.ok) {
        const trackerData = await trackerRes.json();"""

new_links = """      const trackerRes = await fetch("/api/links", {
        cache: "no-store",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (trackerRes.ok) {
        const contentType = trackerRes.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const trackerData = await trackerRes.json();
          setDbTrackers(trackerData);
        } else {
          console.error("Expected JSON but received", contentType);
        }
"""
if old_links in content:
    content = content.replace(old_links, new_links)
    
# But wait, we also have setDbTrackers(trackerData) inside the old block... Let's use re instead
