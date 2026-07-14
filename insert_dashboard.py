with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'import { Tracker, TrackerStats, OpenLog, Ticket, } from "../types";',
    'import { Tracker, TrackerStats, OpenLog, Ticket, } from "../types";\nimport { QuickStartGuide } from "./QuickStartGuide";'
)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
