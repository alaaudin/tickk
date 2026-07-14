import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'EDITOR' | 'TRANSITION' | 'TELEMETRY';

export const DeveloperTerminalAnimation: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('EDITOR');
  const [typedText, setTypedText] = useState('');
  const [showPaste, setShowPaste] = useState(false);
  const [telemetryLines, setTelemetryLines] = useState<number>(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Main animation sequence
  useEffect(() => {
    let isMounted = true;

    const runSequence = async () => {
      while (isMounted) {
        // Reset to initial state
        setPhase('EDITOR');
        setTypedText('');
        setShowPaste(false);
        setTelemetryLines(0);

        await new Promise((r) => setTimeout(r, 1000));

        // Phase 1: Typing Python header line
        const textToType = "import requests\n\nheaders = {\n    '";
        for (let i = 0; i <= textToType.length; i++) {
          if (!isMounted) return;
          setTypedText(textToType.slice(0, i));
          await new Promise((r) => setTimeout(r, Math.random() * 30 + 40));
        }

        // Pause before pasting
        await new Promise((r) => setTimeout(r, 600));
        if (!isMounted) return;

        // Paste the glowing string
        setShowPaste(true);

        // The exact moment of "BOOOM" transition
        await new Promise((r) => setTimeout(r, 800));
        if (!isMounted) return;

        // Phase 2: BOOOM
        setPhase('TRANSITION');

        // Fast transition flash
        await new Promise((r) => setTimeout(r, 150));
        if (!isMounted) return;

        // Phase 3: Telemetry Stream
        setPhase('TELEMETRY');
        await new Promise((r) => setTimeout(r, 200));

        // Reveal telemetry lines with dynamic delays
        for (let i = 1; i <= 3; i++) {
          if (!isMounted) return;
          setTelemetryLines(i);
          await new Promise((r) => setTimeout(r, Math.random() * 300 + 400));
        }

        // Hold the final state before looping
        await new Promise((r) => setTimeout(r, 4500));
      }
    };

    runSequence();

    return () => {
      isMounted = false;
    };
  }, []);

  const telemetryData = [
    { text: "[CONNECTED] Tracking Pixel #7a2d initialized...", isHighlight: false },
    { text: "[EVENT] Email Opened by ceo@apple.com | Device: iOS Safari | Location: Cupertino, US", isHighlight: true },
    { text: "[EVENT] Link Clicked: 'View Proposal' | IP: 108.12.91.4 | Redirecting...", isHighlight: true }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden border border-[#1a1a1e] bg-black relative" style={{ boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)' }}>
      {/* Top window bar */}
      <div className="h-11 w-full border-b border-[#1a1a1e] flex items-center px-5 bg-black/80 backdrop-blur-md relative z-20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#2a2a2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#2a2a2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#2a2a2e]"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[#555555] text-xs font-mono tracking-widest uppercase">main.py  — Terminal</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 h-[260px] font-mono text-sm sm:text-base relative bg-black overflow-hidden">
        <AnimatePresence mode="wait">
          {/* Phase 1: Editor */}
          {phase === 'EDITOR' && (
            <motion.div
              key="editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.02 }}
              transition={{ duration: 0.15 }}
              className="h-full flex flex-col"
            >
              <div className="whitespace-pre text-[#888888] leading-relaxed">
                {typedText}
                {showPaste && (
                  <motion.span
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.1 }}
                    className="text-white font-bold"
                    style={{ textShadow: '0 0 15px rgba(255,255,255,0.6)' }}
                  >
                    Authorization': 'Bearer tk_live_9a8b7c6d5e...'{"\n}"}
                  </motion.span>
                )}
                {cursorVisible && (
                  <span className="inline-block w-[8px] h-[16px] sm:h-[18px] bg-white ml-1 translate-y-[3px]" />
                )}
              </div>
            </motion.div>
          )}

          {/* Phase 2: BOOOM Transition */}
          {phase === 'TRANSITION' && (
            <motion.div
              key="transition"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, backgroundColor: '#ffffff' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
              className="absolute inset-0 z-30 flex items-center justify-center"
            >
              <div className="text-black font-mono font-bold text-2xl tracking-[0.3em]">
                AUTHORIZED
              </div>
            </motion.div>
          )}

          {/* Phase 3: Live Telemetry */}
          {phase === 'TELEMETRY' && (
            <motion.div
              key="telemetry"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col gap-3"
            >
              {/* Telemetry Header */}
              <div className="text-[#555555] text-xs uppercase tracking-widest border-b border-[#1a1a1e] pb-3 mb-2 flex justify-between items-center">
                <span>Live Telemetry Feed</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                  <span className="text-white">STREAMING</span>
                </span>
              </div>

              {/* Telemetry Lines */}
              {telemetryData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: index < telemetryLines ? 1 : 0, x: index < telemetryLines ? 0 : -10 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-3 sm:gap-4 ${index < telemetryLines ? 'block' : 'hidden'}`}
                >
                  <span className="text-[#555555] shrink-0">
                    {new Date().toISOString().split('T')[1].slice(0, 12)}
                  </span>
                  <span className={item.isHighlight ? "text-white" : "text-[#888888]"}>
                    <span className="text-white font-bold mr-2">✓</span>
                    {item.text}
                  </span>
                </motion.div>
              ))}

              {/* Final blinking cursor for telemetry */}
              {telemetryLines === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: cursorVisible ? 1 : 0 }}
                  transition={{ duration: 0.1 }}
                  className="mt-2 ml-1 w-2 h-4 sm:h-5 bg-white"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle glassmorphic glow around the component */}
      <div className="absolute inset-0 border border-white/5 rounded-lg pointer-events-none z-10" />
    </div>
  );
};
