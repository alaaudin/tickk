with open("src/components/OfficialLogos.tsx", "r") as f:
    content = f.read()

content = content.replace("enablebackground", "enableBackground")

with open("src/components/OfficialLogos.tsx", "w") as f:
    f.write(content)

