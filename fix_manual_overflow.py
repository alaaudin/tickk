with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

# Replace overflow-hidden on the main card (line 129 approx)
content = content.replace(
    'className="bg-white/40 dark:bg-[#121215]/45 backdrop-blur-2xl border border-neutral-200/50 dark:border-zinc-800/60 rounded-3xl p-8 relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_40px_rgba(255,255,255,0.015)]"',
    'className="bg-white/40 dark:bg-[#121215]/45 backdrop-blur-2xl border border-neutral-200/50 dark:border-zinc-800/60 rounded-3xl p-8 relative shadow-[0_20px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_40px_rgba(255,255,255,0.015)]"'
)

# Replace overflow-hidden on the AnimatePresence for the date picker (line 248 approx)
content = content.replace(
    '''                          exit={{ opacity: 0, width: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"''',
    '''                          exit={{ opacity: 0, width: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="relative"'''
)

with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(content)
print("Done")
