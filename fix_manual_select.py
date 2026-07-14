import sys

with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

if 'import { CustomSelect }' not in content:
    content = content.replace(
        'import React, { useState } from "react";',
        'import React, { useState } from "react";\nimport { CustomSelect } from "./CustomSelect";'
    )

old_select = """<select 
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="bg-transparent text-xs text-neutral-600 dark:text-zinc-300 focus:outline-none cursor-pointer py-1 px-2 hover:bg-neutral-200/50 dark:hover:bg-zinc-800/50 rounded transition-colors border-none"
                    >
                      <option value="font-sans" className="font-sans">Inter (Sans)</option>
                      <option value="font-display" className="font-display">Space Grotesk (Display)</option>
                      <option value="font-serif" className="font-serif">Playfair Display (Serif)</option>
                      <option value="font-mono" className="font-mono">JetBrains Mono (Mono)</option>
                      <option value="font-outfit" className="font-outfit">Outfit (Sans)</option>
                    </select>"""

new_select = """<CustomSelect
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      options={[
                        { value: "font-sans", label: "Inter (Sans)", className: "font-sans" },
                        { value: "font-display", label: "Space Grotesk (Display)", className: "font-display" },
                        { value: "font-serif", label: "Playfair Display (Serif)", className: "font-serif" },
                        { value: "font-mono", label: "JetBrains Mono (Mono)", className: "font-mono" },
                        { value: "font-outfit", label: "Outfit (Sans)", className: "font-outfit" }
                      ]}
                      className="bg-transparent text-xs text-neutral-600 dark:text-zinc-300 focus:outline-none cursor-pointer py-1 px-2 hover:bg-neutral-200/50 dark:hover:bg-zinc-800/50 rounded transition-colors border-none"
                    />"""

content = content.replace(old_select, new_select)

with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(content)
print("Done")
