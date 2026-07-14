import os

svgs = ["gmail", "outlook", "salesforce", "hubspot", "zapier", "slack"]

out = 'import React from "react";\n\n'

for name in svgs:
    with open(f"{name}.svg", "r") as f:
        svg = f.read()
    
    # Strip <?xml ... ?> and other doctypes
    import re
    svg = re.sub(r'<\?xml.*?\?>', '', svg)
    svg = re.sub(r'<!DOCTYPE.*?>', '', svg, flags=re.DOTALL)
    svg = re.sub(r'<!--.*?-->', '', svg, flags=re.DOTALL)
    
    # Simple regex to replace some svg attributes that conflict with JSX
    svg = svg.replace('xmlns:cc="http://creativecommons.org/ns#"', '')
    svg = svg.replace('xmlns:dc="http://purl.org/dc/elements/1.1/"', '')
    svg = svg.replace('xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"', '')
    svg = svg.replace('xmlns:svg="http://www.w3.org/2000/svg"', '')
    svg = svg.replace('xmlns:xlink="http://www.w3.org/1999/xlink"', '')
    
    # Fix camelCase props in JSX
    svg = svg.replace('xml:space="preserve"', '')
    svg = svg.replace('clip-rule', 'clipRule')
    svg = svg.replace('fill-rule', 'fillRule')
    svg = svg.replace('fill-opacity', 'fillOpacity')
    svg = svg.replace('stroke-width', 'strokeWidth')
    svg = svg.replace('stroke-linecap', 'strokeLinecap')
    svg = svg.replace('stroke-linejoin', 'strokeLinejoin')
    svg = svg.replace('stroke-miterlimit', 'strokeMiterlimit')
    svg = svg.replace('enable-background', 'enableBackground')
    svg = svg.replace('stop-color', 'stopColor')
    svg = svg.replace('stop-opacity', 'stopOpacity')
    
    # Make it a component
    svg = re.sub(r'<svg(.*?)>', r'<svg\1 className={className}>', svg, count=1)
    
    comp_name = name.capitalize() + "Logo"
    
    out += f'export const {comp_name} = ({{ className }}: {{ className?: string }}) => (\n  {svg.strip()}\n);\n\n'

with open("src/components/OfficialLogos.tsx", "w") as f:
    f.write(out)
