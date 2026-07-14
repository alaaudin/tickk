with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

idx = content.find("Interaction Timeline Map")
start_str = '<table'
end_str = '</table>'
idx2 = content.find(start_str, idx)
end = content.find(end_str, idx2)
print(content[idx2:end+len(end_str)])
