with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

start_str = '<table className="w-full text-left text-xs table-auto">'
end_str = '</table>'
idx = content.find(start_str)
end = content.find(end_str, idx)
print(content[idx:end+len(end_str)])
