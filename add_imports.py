with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('} from "lucide-react";', '  MoreHorizontal,\n  EyeOff,\n} from "lucide-react";')

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
