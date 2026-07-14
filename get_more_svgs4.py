import urllib.request, json
url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg"
try:
  req = urllib.request.Request(url)
  res = urllib.request.urlopen(req)
  with open("apple.svg", "w") as f:
    f.write(res.read().decode('utf-8'))
  print("apple saved")
except Exception as e:
  print("apple: ", e)

# Yahoo from svgl or walkxcode
url_yahoo = "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/yahoo.svg"
try:
  req = urllib.request.Request(url_yahoo)
  res = urllib.request.urlopen(req)
  with open("yahoo.svg", "w") as f:
    f.write(res.read().decode('utf-8'))
  print("yahoo saved")
except Exception as e:
  print("yahoo: ", e)
