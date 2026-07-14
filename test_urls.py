import urllib.request
urls = {
  "gmail": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gmail/gmail-original.svg",
  "hubspot": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hubspot/hubspot-original.svg",
  "zapier": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zapier/zapier-original.svg",
}
headers = {'User-Agent': 'Mozilla/5.0'}
for name, url in urls.items():
  try:
    req = urllib.request.Request(url, headers=headers)
    urllib.request.urlopen(req)
    print(f"{name}: OK")
  except Exception as e:
    print(f"{name}: Failed - {e}")
