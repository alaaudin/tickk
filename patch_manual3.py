import sys

with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

target = """const trackingData = [
    { id: 1, email: "sarah.jenkins@gmail.com", subject: "Q3 Board Deck - Final", sent: "2h ago", opens: 3, clicks: 1, provider: "gmail", device: "desktop" },
    { id: 2, email: "michael.chen@outlook.com", subject: "Vendor Agreement Revised", sent: "5h ago", opens: 1, clicks: 0, provider: "outlook", device: "mobile" },
    { id: 3, email: "alex.williams@yahoo.com", subject: "Following up on yesterday", sent: "1d ago", opens: 0, clicks: 0, provider: "yahoo", device: "unknown" },
    { id: 4, email: "j.doe@icloud.com", subject: "Your private invitation", sent: "2d ago", opens: 5, clicks: 2, provider: "apple", device: "mobile" }
  ];"""

replacement = """const trackingData = [
    { id: 1, email: "sarah.jenkins@gmail.com", subject: "Q3 Board Deck - Final", sent: "2h ago", opens: 3, clicks: 1, provider: "gmail", device: "desktop", isManual: true },
    { id: 2, email: "michael.chen@outlook.com", subject: "Vendor Agreement Revised", sent: "5h ago", opens: 1, clicks: 0, provider: "outlook", device: "mobile", isManual: true },
    { id: 3, email: "alex.williams@yahoo.com", subject: "Following up on yesterday", sent: "1d ago", opens: 0, clicks: 0, provider: "yahoo", device: "unknown", isManual: true },
    { id: 4, email: "j.doe@icloud.com", subject: "Your private invitation", sent: "2d ago", opens: 5, clicks: 2, provider: "apple", device: "mobile", isManual: true }
  ];"""

c1 = content.replace(target, replacement)

with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(c1)
print("Done")
