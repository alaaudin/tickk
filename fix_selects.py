import sys

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

custom_select = """
function CustomSelect({ value, onChange, options, className }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectRef = React.useRef(null);
  
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value) || options[0];

  return (
    <div className="relative group min-w-[140px]" ref={selectRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={className + " flex items-center justify-between text-left"}
      >
        <span>{selectedOption.label}</span>
        <Vd className="w-4 h-4 text-neutral-500 pointer-events-none ml-2" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 bg-white/30 dark:bg-[#111111]/40 backdrop-blur-3xl border border-white/50 dark:border-zinc-700/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden ring-1 ring-black/5 dark:ring-white/5"
          >
            <div className="p-1">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange({ target: { value: opt.value } });
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                    value === opt.value
                      ? "bg-neutral-100 dark:bg-zinc-800 text-neutral-900 dark:text-white font-medium"
                      : "text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  {opt.label}
                  {value === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
"""

content = content.replace(
    'import React, { useState, useEffect } from "react";',
    'import React, { useState, useEffect } from "react";\n' + custom_select
)

# First select replacement
old_select_1 = """<div className="relative group min-w-[140px]">
                                      {
                                        <select
                                          value={m}
                                          onChange={(F) => b(F.target.value)}
                                          className="appearance-none w-full bg-black/5 dark:bg-white/5 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 rounded-xl px-4 py-2 pr-10 text-xs font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer transition-all hover:bg-black/10 dark:hover:bg-white/10"
                                        >
                                          {
                                            <option value="last_24_hours">
                                              {"Last 24 hours"}
                                            </option>
                                          }
                                          {
                                            <option value="last_7_days">
                                              {"Last 7 days"}
                                            </option>
                                          }
                                          {
                                            <option value="last_30_days">
                                              {"Last 30 days"}
                                            </option>
                                          }
                                          {
                                            <option value="last_90_days">
                                              {"Last 90 days"}
                                            </option>
                                          }
                                          {
                                            <option value="last_year">
                                              {"Last year"}
                                            </option>
                                          }
                                        </select>
                                      }
                                      {
                                        <Vd className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                      }
                                    </div>"""

new_select_1 = """<CustomSelect
                                      value={m}
                                      onChange={(F) => b(F.target.value)}
                                      options={[
                                        { value: 'last_24_hours', label: 'Last 24 hours' },
                                        { value: 'last_7_days', label: 'Last 7 days' },
                                        { value: 'last_30_days', label: 'Last 30 days' },
                                        { value: 'last_90_days', label: 'Last 90 days' },
                                        { value: 'last_year', label: 'Last year' }
                                      ]}
                                      className="appearance-none w-full bg-black/5 dark:bg-white/5 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 rounded-xl px-4 py-2 pr-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer transition-all hover:bg-black/10 dark:hover:bg-white/10"
                                    />"""

content = content.replace(old_select_1, new_select_1)

# Second select replacement
old_select_2 = """<div className="relative group min-w-[140px]">
                                      {
                                        <select
                                          value={d}
                                          onChange={(F) => p(F.target.value)}
                                          className="appearance-none w-full bg-black/5 dark:bg-white/5 backdrop-blur-3xl border border-neutral-200/50 dark:border-white/10 rounded-xl px-4 py-2 pr-10 text-xs font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer transition-all hover:bg-black/10 dark:hover:bg-white/10"
                                        >
                                          {
                                            <option value="last_24_hours">
                                              {"Last 24 hours"}
                                            </option>
                                          }
                                          {
                                            <option value="last_7_days">
                                              {"Last 7 days"}
                                            </option>
                                          }
                                          {
                                            <option value="last_30_days">
                                              {"Last 30 days"}
                                            </option>
                                          }
                                          {
                                            <option value="last_90_days">
                                              {"Last 90 days"}
                                            </option>
                                          }
                                          {
                                            <option value="last_year">
                                              {"Last year"}
                                            </option>
                                          }
                                        </select>
                                      }
                                      {
                                        <Vd className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                      }
                                    </div>"""

new_select_2 = """<CustomSelect
                                      value={d}
                                      onChange={(F) => p(F.target.value)}
                                      options={[
                                        { value: 'last_24_hours', label: 'Last 24 hours' },
                                        { value: 'last_7_days', label: 'Last 7 days' },
                                        { value: 'last_30_days', label: 'Last 30 days' },
                                        { value: 'last_90_days', label: 'Last 90 days' },
                                        { value: 'last_year', label: 'Last year' }
                                      ]}
                                      className="appearance-none w-full bg-black/5 dark:bg-white/5 backdrop-blur-3xl border border-neutral-200/50 dark:border-white/10 rounded-xl px-4 py-2 pr-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer transition-all hover:bg-black/10 dark:hover:bg-white/10"
                                    />"""

content = content.replace(old_select_2, new_select_2)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
