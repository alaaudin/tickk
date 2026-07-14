import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  className?: string;
}

export function ThemeToggle({ theme, toggleTheme, className = "" }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleTheme}
      className={`relative w-[68px] h-[34px] bg-neutral-200/50 dark:bg-zinc-800/40 backdrop-blur-xl rounded-full p-1 cursor-pointer transition-all duration-300 border border-neutral-300/50 dark:border-zinc-700/50 active:scale-95 flex items-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.05),_0_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),_0_2px_8px_rgba(0,0,0,0.4)] group ${className}`}
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/30 to-white/10 dark:from-zinc-700/30 dark:to-zinc-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <motion.div
        layout
        className="w-[26px] h-[26px] rounded-full bg-white dark:bg-[#121215] shadow-[0_4px_12px_rgba(0,0,0,0.15),_0_1px_2px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.6),_inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center border border-neutral-100 dark:border-neutral-800 relative overflow-hidden z-10"
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          marginLeft: theme === 'light' ? '0' : 'auto'
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'light' ? (
            <motion.div
              key="sun"
              initial={{ y: -10, rotate: -90, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              exit={{ y: 10, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Sparkles className="w-3.5 h-3.5 text-neutral-800 fill-neutral-800" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: 10, rotate: 90, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              exit={{ y: -10, rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Moon className="w-3.5 h-3.5 text-zinc-200 fill-zinc-200" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
