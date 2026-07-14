import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# Add cache: 'no-cache' to fetch('/api/auth/me')
content = content.replace(
    'const authRes = await fetch("/api/auth/me", {',
    'const authRes = await fetch("/api/auth/me", {\n        cache: "no-store",'
)

# Add cache: 'no-cache' to fetch('/api/trackers')
content = content.replace(
    'const trackerRes = await fetch("/api/trackers", {',
    'const trackerRes = await fetch("/api/trackers", {\n        cache: "no-store",'
)

# Add cache: 'no-cache' to fetch('/api/tickets')
content = content.replace(
    'const res = await fetch("/api/tickets", {',
    'const res = await fetch("/api/tickets", {\n        cache: "no-store",'
)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
