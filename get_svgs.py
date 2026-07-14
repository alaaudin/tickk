import urllib.request
urls = {
  "gmail": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
  "salesforce": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
  "zapier": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zapier_logo.svg",
  "slack": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"
}
headers = {'User-Agent': 'Mozilla/5.0'}
for name, url in urls.items():
  try:
    req = urllib.request.Request(url, headers=headers)
    res = urllib.request.urlopen(req)
    data = res.read().decode('utf-8')
    print(f"--- {name} ---")
    print(data[:500])
  except Exception as e:
    print(f"{name}: Failed - {e}")
