with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '''      const newDispatch = {
        id: Date.now(),
        email: recipient,
        subject: subject || "No Subject",''',
    '''      const newDispatch = {
        id: Date.now(),
        email: recipient,
        subject: subject || "No Subject",
        body: body, // Ensure body is saved for quick reply context'''
)

with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(content)
