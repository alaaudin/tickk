import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="pointer-events-auto overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-zinc-700/50 -z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-zinc-800/30 rounded-2xl -z-10" />
              
              <div className="min-w-[280px] max-w-sm px-4 py-3 flex items-start gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] rounded-2xl">
                <div className="mt-0.5 shrink-0">
                  {t.type === 'success' ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  ) : t.type === 'error' ? (
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                      <X className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-neutral-500/20 flex items-center justify-center border border-neutral-500/30">
                      <Info className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white font-sans tracking-wide">
                    {t.message}
                  </p>
                </div>
                <button
                  onClick={() => removeToast(t.id)}
                  className="shrink-0 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-neutral-400 dark:text-neutral-500 mt-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
