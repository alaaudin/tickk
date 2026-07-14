import re

# Read restored code
with open("Dashboard_restored.tsx", "r") as f:
    code = f.read()

# Find all opening tags like <tag or <tag.sub
tags = re.findall(r'<([a-zA-Z0-9_\.]+)', code)

standard_html = {
    'div', 'span', 'p', 'button', 'input', 'label', 'tr', 'td', 'th', 'thead', 
    'tbody', 'table', 'form', 'svg', 'path', 'rect', 'circle', 'h1', 'h2', 'h3', 
    'h4', 'h5', 'h6', 'a', 'img', 'pre', 'code', 'option', 'select', 'textarea', 
    'strong', 'ul', 'ol', 'li', 'br', 'hr', 'iframe', 'canvas', 'g', 'defs', 'linearGradient',
    'stop', 'polyline', 'polygon', 'ellipse', 'line', 'text', 'nav', 'header', 'footer',
    'section', 'aside', 'main', 'style', 'head', 'body', 'html', 'meta', 'link', 'title'
}

custom_lowercase = set()
for tag in tags:
    # If it contains a dot, check the first part
    base_tag = tag.split('.')[0]
    if base_tag[0].islower():
        if base_tag not in standard_html:
            custom_lowercase.add(tag)

print("Custom lowercase tags found:", custom_lowercase)
