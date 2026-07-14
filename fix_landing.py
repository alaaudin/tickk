with open('src/components/LandingPage.tsx', 'r') as f:
    code = f.read()

code = code.replace(
    'uppercase">BROWSER EXTENSION</span>',
    'uppercase">PREMIUM EXTENSION</span>'
)

with open('src/components/LandingPage.tsx', 'w') as f:
    f.write(code)
