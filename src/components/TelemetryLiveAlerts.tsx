import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export type TelemetryAlert = {
  id: string;
  email: string;
  countryCode: string;
  deviceInfo: string;
  timestamp: number;
};

export const triggerTelemetryAlert = (alert: Omit<TelemetryAlert, 'id' | 'timestamp'>) => {
  const event = new CustomEvent('telemetry-alert', {
    detail: { ...alert, id: Math.random().toString(36).substr(2, 9), timestamp: Date.now() },
  });
  window.dispatchEvent(event);
};

export function TelemetryLiveAlerts() {
  const [alerts, setAlerts] = useState<TelemetryAlert[]>([]);

  useEffect(() => {
    const handleAlert = (e: Event) => {
      const customEvent = e as CustomEvent<TelemetryAlert>;
      setAlerts((prev) => [...prev, customEvent.detail]);
    };

    window.addEventListener('telemetry-alert', handleAlert);
    return () => window.removeEventListener('telemetry-alert', handleAlert);
  }, []);

  useEffect(() => {
    if (alerts.length === 0) return;

    const timer = setInterval(() => {
      const now = Date.now();
      setAlerts((prev) => prev.filter((alert) => now - alert.timestamp < 4000));
    }, 100);

    return () => clearInterval(timer);
  }, [alerts]);

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto flex items-start gap-3 bg-[#000000]/80 backdrop-blur-xl border border-white/[0.08] p-3.5 rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] min-w-[320px] max-w-[400px]"
          >
            <div className="mt-0.5 shrink-0 flex items-center justify-center w-6 h-6 bg-white/5 rounded-full border border-white/10 overflow-hidden shadow-sm">
               <img 
                 src={`https://flagcdn.com/16x12/${alert.countryCode.toLowerCase()}.png`} 
                 width="16" 
                 height="12" 
                 alt={alert.countryCode} 
                 className="object-cover"
                 style={{ imageRendering: 'pixelated' }}
               />
            </div>
            <div className="flex-1 min-w-0 pr-2 space-y-1">
              <p className="text-[13px] font-bold text-[#F5F5F0] truncate tracking-wide">
                {alert.email}
              </p>
              <p className="text-[11px] text-zinc-400 font-sans leading-snug">
                {alert.deviceInfo}
              </p>
            </div>
            <button
              onClick={() => removeAlert(alert.id)}
              className="shrink-0 p-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
