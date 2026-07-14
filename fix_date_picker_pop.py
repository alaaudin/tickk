with open('src/components/CustomDateTimePicker.tsx', 'r') as f:
    content = f.read()

# Change popover direction from bottom-full (pops UP) to top-full (pops DOWN)
content = content.replace(
    'className="absolute bottom-full mb-3 left-0 z-50',
    'className="absolute top-full mt-3 left-0 z-50'
)

# And animate from negative Y instead of positive Y for the entrance
content = content.replace(
    'initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(4px)" }}',
    'initial={{ opacity: 0, y: -15, scale: 0.95, filter: "blur(4px)" }}'
)
content = content.replace(
    'exit={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(4px)" }}',
    'exit={{ opacity: 0, y: -15, scale: 0.95, filter: "blur(4px)" }}'
)

with open('src/components/CustomDateTimePicker.tsx', 'w') as f:
    f.write(content)
print("Done")
