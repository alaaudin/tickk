with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'Eye, PenLine, Copy, ChevronRight, Clock, MousePointerClick, Calendar, Smartphone, Share2',
    'Eye, PenLine, Copy, ChevronRight, Clock, MousePointerClick, Calendar, Smartphone, Share2, Sparkles'
)

with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(content)
