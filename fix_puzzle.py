with open('src/components/LandingPage.tsx', 'r') as f:
    code = f.read()

code = code.replace('import { \n  Puzzle,motion, AnimatePresence } from "motion/react";', 'import { motion, AnimatePresence } from "motion/react";')

if 'Puzzle' not in code.split('lucide-react"')[0]:
    code = code.replace('import { \n  Mail,', 'import { \n  Puzzle,\n  Mail,')

with open('src/components/LandingPage.tsx', 'w') as f:
    f.write(code)
