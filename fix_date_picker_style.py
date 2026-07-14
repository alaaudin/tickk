with open('src/components/CustomDateTimePicker.tsx', 'r') as f:
    content = f.read()

# Make sure options are styled properly
content = content.replace(
    'className="bg-white dark:bg-zinc-900"',
    'className="bg-white dark:bg-zinc-900 text-neutral-900 dark:text-white"'
)

with open('src/components/CustomDateTimePicker.tsx', 'w') as f:
    f.write(content)
