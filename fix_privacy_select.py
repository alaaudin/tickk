import sys

with open('src/components/PrivacySettingsPanel.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'import React, { useState } from "react";',
    'import React, { useState } from "react";\nimport { CustomSelect } from "./CustomSelect";'
)

old_select = """<select
              value={retention}
              onChange={(e) => setRetention(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-zinc-800 text-sm rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-900 dark:focus:border-zinc-400 transition-colors font-sans appearance-none cursor-pointer"
            >
              <option value="30">30 Days (Compliant Clean)</option>
              <option value="90">90 Days (Enterprise Default)</option>
              <option value="180">180 Days (Extended Review)</option>
              <option value="365">365 Days (Full Cycle Archive)</option>
              <option value="0">Indefinite (Unlimited Storage)</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400">
              <ChevronDown className="w-4 h-4" />
            </div>"""

new_select = """<CustomSelect
              value={retention}
              onChange={(e) => setRetention(e.target.value)}
              options={[
                { value: "30", label: "30 Days (Compliant Clean)" },
                { value: "90", label: "90 Days (Enterprise Default)" },
                { value: "180", label: "180 Days (Extended Review)" },
                { value: "365", label: "365 Days (Full Cycle Archive)" },
                { value: "0", label: "Indefinite (Unlimited Storage)" }
              ]}
              className="w-full bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-zinc-800 text-sm rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-900 dark:focus:border-zinc-400 transition-colors font-sans appearance-none cursor-pointer"
            />"""

content = content.replace(old_select, new_select)

with open('src/components/PrivacySettingsPanel.tsx', 'w') as f:
    f.write(content)
print("Done")
