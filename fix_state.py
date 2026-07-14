import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

state_find = r'const \[activeTab, setActiveTab\] = useState<TabType>\("overview"\);'
state_repl = r'''const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isLiveDataEnabled, setIsLiveDataEnabled] = useState(false);'''

content = re.sub(state_find, state_repl, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
