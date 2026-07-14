with open('src/components/CustomDateTimePicker.tsx', 'r') as f:
    content = f.read()

# Replace font-mono with font-sans for dates
content = content.replace(
    'text-[13px] font-mono flex items-center',
    'text-[13px] font-sans flex items-center'
)

# replace font-mono for time selects
content = content.replace(
    'bg-transparent font-mono font-semibold rounded-lg',
    'bg-transparent font-sans font-semibold rounded-lg'
)

with open('src/components/CustomDateTimePicker.tsx', 'w') as f:
    f.write(content)
