import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function CustomSelect({ value, onChange, options, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => String(o.value) === String(value)) || options[0];

  return (
    <div className="relative group w-full" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={className + " flex items-center justify-between text-left"}
      >
        <span className={selectedOption.className || ""}>{selectedOption.label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-neutral-500 pointer-events-none ml-2 shrink-0">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full mt-2 min-w-full w-max max-w-[300px] bg-white/40 dark:bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-[100] overflow-hidden ring-1 ring-black/5 dark:ring-white/5"
          >
            <div className="p-1.5 flex flex-col gap-0.5">
              {options.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => {
                    onChange({ target: { value: opt.value } });
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 text-xs rounded-lg transition-all flex items-center justify-between ${
                    String(value) === String(opt.value)
                      ? "bg-black/5 dark:bg-white/10 text-neutral-900 dark:text-white font-medium"
                      : "text-neutral-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5"
                  } ${opt.className || ""}`}
                >
                  {opt.label}
                  {String(value) === String(opt.value) && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 shrink-0 ml-2 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
