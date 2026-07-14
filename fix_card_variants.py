import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

pattern = """  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };"""

replacement = """  const cardVariants: any = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };"""

content = content.replace(pattern, replacement)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)

