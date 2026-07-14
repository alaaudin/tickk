import urllib.request, json
url = "https://raw.githubusercontent.com/devicons/devicon/master/devicon.json"
try:
  req = urllib.request.Request(url)
  res = urllib.request.urlopen(req)
  data = json.loads(res.read().decode('utf-8'))
  for item in data:
    if 'hub' in item['name'].lower() or 'out' in item['name'].lower():
      print(item['name'])
except Exception as e:
  print(e)
