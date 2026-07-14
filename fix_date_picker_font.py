with open('src/components/CustomDateTimePicker.tsx', 'r') as f:
    content = f.read()

content = content.replace("font-['Outfit']", 'font-outfit')

with open('src/components/CustomDateTimePicker.tsx', 'w') as f:
    f.write(content)
