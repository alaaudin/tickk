import urllib.request, json
url = "https://commons.wikimedia.org/w/api.php?action=query&titles=File:Microsoft_Office_Outlook_(2018%E2%80%93present).svg&prop=imageinfo&iiprop=url&format=json"
headers = {'User-Agent': 'Mozilla/5.0'}
try:
  req = urllib.request.Request(url, headers=headers)
  res = urllib.request.urlopen(req)
  data = json.loads(res.read().decode('utf-8'))
  pages = data['query']['pages']
  for page_id in pages:
    imageinfo = pages[page_id].get('imageinfo', [])
    if imageinfo:
      print(imageinfo[0]['url'])
      req_svg = urllib.request.Request(imageinfo[0]['url'], headers=headers)
      res_svg = urllib.request.urlopen(req_svg)
      with open("outlook.svg", "w") as f:
        f.write(res_svg.read().decode('utf-8'))
      print("outlook saved")
except Exception as e:
  print(e)
