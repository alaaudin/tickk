import urllib.request
urls = {
  "yahoo": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Yahoo%21_logo_%282019%29.svg",
  "apple": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "apple_mail": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Mail_%28Apple%29.svg"
}
headers = {'User-Agent': 'Mozilla/5.0'}
for name, url in urls.items():
  try:
    req = urllib.request.Request(url, headers=headers)
    res = urllib.request.urlopen(req)
    data = res.read().decode('utf-8')
    with open(f"{name}.svg", "w") as f:
      f.write(data)
    print(f"{name} saved")
  except Exception as e:
    print(f"{name}: Failed - {e}")
