with open('src/components/LandingPage.tsx', 'r') as f:
    content = f.read()

content = content.replace('Network\n  BadgeCheck,', 'Network,\n  BadgeCheck,')

with open('src/components/LandingPage.tsx', 'w') as f:
    f.write(content)
