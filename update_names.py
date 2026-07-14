with open('src/components/Dashboard.tsx', 'r') as f:
    lines = f.readlines()

def replace_line(line_num, old, new):
    idx = line_num - 1
    lines[idx] = lines[idx].replace(old, new)

replace_line(1710, '{fullName}', '{renderNameWithBadge(fullName, activePlan)}')
replace_line(3273, '{fullName}', '{renderNameWithBadge(fullName, activePlan)}')
replace_line(3453, '{fullName}', '{renderNameWithBadge(fullName, activePlan)}')

with open('src/components/Dashboard.tsx', 'w') as f:
    f.writelines(lines)
