import re

with open('src/components/LandingPage.tsx', 'r') as f:
    l_content = f.read()

l_content = l_content.replace('uppercase flex items-center justify-center gap-2">PRICING TIERS', 'uppercase inline-flex items-center justify-center gap-2">PRICING TIERS')

with open('src/components/LandingPage.tsx', 'w') as f:
    f.write(l_content)
