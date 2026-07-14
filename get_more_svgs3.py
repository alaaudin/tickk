import urllib.request
urls = {
  "yahoo": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/yahoo.svg",
  "apple": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/apple.svg"
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
