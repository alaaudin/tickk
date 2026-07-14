import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

content = content.replace("EyeOff,\n , UserPlus", "EyeOff, UserPlus")
content = content.replace(", UserPlus} from", "UserPlus} from")
content = content.replace("EyeOff,\n  , UserPlus", "EyeOff, UserPlus")

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
