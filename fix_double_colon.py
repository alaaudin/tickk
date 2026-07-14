with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '                                    ) : (\n                                    ) : (',
    '                                    ) : ('
)

with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(content)
