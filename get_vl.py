import urllib.request
urls = {
  "outlook": "https://www.vectorlogo.zone/logos/microsoft_outlook/microsoft_outlook-icon.svg",
  "hubspot": "https://www.vectorlogo.zone/logos/hubspot/hubspot-icon.svg"
}
headers = {'User-Agent': 'Mozilla/5.0'}
for name, url in urls.items():
  try:
    req = urllib.request.Request(url, headers=headers)
    res = urllib.request.urlopen(req)
    print(f"--- {name} ---")
    print(res.read().decode('utf-8')[:300])
  except Exception as e:
    print(f"{name}: Failed - {e}")
