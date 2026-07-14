import React, { useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import { Terminal, Play, Key, Check, Zap } from "lucide-react";

export default function DevMagicShowcase() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    let isMounted = true;
    
    const runAnimation = async () => {
      // Loop forever
      while (isMounted) {
        // --- RESET ---
        await animate("#cursor", { x: 100, y: 400, opacity: 0 }, { duration: 0 });
        await animate("#api-key-text", { opacity: 0 }, { duration: 0 });
        await animate("#log-row", { opacity: 0, y: 20 }, { duration: 0 });
        await animate("#boom-ring", { scale: 0, opacity: 0 }, { duration: 0 });
        await animate("#map-marker", { opacity: 0, scale: 0 }, { duration: 0 });
        await animate("#api-key-drawer", { scale: 1, borderColor: "rgba(39, 39, 42, 1)", boxShadow: "0px 0px 0px rgba(0,0,0,0)" }, { duration: 0 });
        await animate("#run-button", { scale: 1, backgroundColor: "rgba(255, 255, 255, 0.05)" }, { duration: 0 });
        await animate("#typing-cursor", { opacity: 1 }, { duration: 0 });

        // --- PHASE 1: Move to Drawer & Copy (0s -> 1.1s) ---
        await animate("#cursor", { opacity: 1 }, { duration: 0.2 });
        await animate("#cursor", { x: 401, y: 94 }, { duration: 0.5, ease: "easeInOut" });
        
        // Click action on drawer
        await animate("#cursor", { scale: 0.8 }, { duration: 0.1 });
        await animate("#api-key-drawer", { scale: 0.95, borderColor: "rgba(16, 185, 129, 0.5)", boxShadow: "0px 0px 20px rgba(16, 185, 129, 0.2)" }, { duration: 0.1 });
        await animate("#cursor", { scale: 1 }, { duration: 0.1 });
        await animate("#api-key-drawer", { scale: 1 }, { duration: 0.1 });
        
        // --- PHASE 2: Move to Editor & Paste (1.1s -> 2.0s) ---
        await animate("#cursor", { x: 243, y: 168 }, { duration: 0.5, ease: "easeInOut" });
        
        // Paste action
        await animate("#cursor", { scale: 0.8 }, { duration: 0.1 });
        await animate("#cursor", { scale: 1 }, { duration: 0.1 });
        
        // Key appears
        await animate("#api-key-text", { opacity: 1 }, { duration: 0.1 });
        await animate("#typing-cursor", { opacity: 0 }, { duration: 0.1 }); 

        // --- PHASE 3: Move to Run Button & Click (2.0s -> 2.6s) ---
        await animate("#cursor", { x: 430, y: 24 }, { duration: 0.4, ease: "easeInOut" });
        
        // Click action on run
        await animate("#cursor", { scale: 0.8 }, { duration: 0.1 });
        await animate("#run-button", { scale: 0.9, backgroundColor: "rgba(16, 185, 129, 0.2)" }, { duration: 0.1 });
        
        // --- BOOM FEEDBACK (Right Panel) (2.6s -> ...) ---
        // Fire Boom async so it doesn't block cursor resetting
        animate("#boom-ring", { scale: 4, opacity: [0, 1, 0] }, { duration: 1.0, ease: "easeOut" });
        animate("#log-row", { opacity: 1, y: 0 }, { type: "spring", stiffness: 300, damping: 20 });
        animate("#map-marker", { opacity: [0, 1, 0.8, 1], scale: [0, 1.2, 1, 1.1] }, { duration: 0.6 });

        // Finish run button click
        await animate("#cursor", { scale: 1 }, { duration: 0.1 });
        await animate("#run-button", { scale: 1, backgroundColor: "rgba(255, 255, 255, 0.05)" }, { duration: 0.1 });
        await animate("#cursor", { opacity: 0 }, { duration: 0.2 }); // Time: 3.0s

        // Wait 1.0s to complete 4 seconds total
        await new Promise(r => setTimeout(r, 1000));
      }
    };

    runAnimation();
    
    return () => { isMounted = false; };
  }, [animate]);

  return (
    <div className="bg-[#000000] w-full min-h-screen flex items-center justify-center p-4 lg:p-12 overflow-hidden font-sans">
      <div ref={scope} className="relative w-[1032px] h-[500px] flex gap-8 scale-[0.45] sm:scale-[0.65] md:scale-[0.85] lg:scale-100 origin-center shrink-0">
        
        {/* LEFT PANEL: VS Code */}
        <div className="w-[500px] h-[500px] bg-[#0A0A0B] rounded-xl border border-zinc-800 shadow-2xl relative flex flex-col overflow-hidden shrink-0">
          {/* Window Controls */}
          <div className="h-12 border-b border-zinc-800/80 bg-[#050505] flex items-center px-4 justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
              <Terminal className="w-3 h-3" /> cold_blast.py
            </div>
            <div 
              id="run-button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-mono"
            >
              <Play className="w-3 h-3 text-emerald-400" /> RUN
            </div>
          </div>
          
          {/* Code Editor */}
          <div className="p-6 font-mono text-[13px] leading-[28px] text-zinc-300 relative flex-1">
            <div className="text-emerald-400">import <span className="text-zinc-300">requests</span></div>
            <br />
            <div className="text-zinc-500 italic"># Initialize payload headers</div>
            <div className="text-blue-400">headers <span className="text-zinc-300">= {'{'}</span></div>
            <div className="pl-6">
              <span className="text-amber-300">"Authorization"</span>: <span className="text-amber-300">"Bearer </span>
              <span className="relative inline-flex items-center h-[28px]">
                <span id="api-key-text" className="text-emerald-400 bg-emerald-500/10 px-1 rounded inline-block">
                  tk_live_saqib_884px
                </span>
                <span id="typing-cursor" className="absolute left-0 w-2 h-4 bg-white animate-pulse" />
              </span>
              <span className="text-amber-300">"</span>
            </div>
            <div className="text-zinc-300">{'}'}</div>
            <br />
            <div className="text-zinc-500 italic"># Dispatching tracking pixel instantly...</div>
            <div><span className="text-blue-400">response</span> = requests.post(<span className="text-amber-300">"https://api.tickk.io/v1/track"</span>, headers=headers)</div>
          </div>

          {/* Floating API Key Drawer */}
          <div 
            id="api-key-drawer"
            className="absolute top-16 right-6 bg-[#111113] border border-zinc-800 rounded-lg p-3 shadow-2xl flex flex-col gap-2 z-10"
          >
            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest flex items-center gap-1.5">
              <Key className="w-3 h-3" /> Active Secret Key
            </div>
            <div className="bg-black border border-zinc-800 rounded px-3 py-1.5 text-xs font-mono text-emerald-400">
              tk_live_saqib_884px
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Telemetry Dashboard */}
        <div className="w-[500px] h-[500px] bg-[#0A0A0B] rounded-xl border border-zinc-800 shadow-[0_0_50px_rgba(16,185,129,0.03)] relative flex flex-col overflow-hidden shrink-0">
          {/* Header */}
          <div className="h-12 border-b border-zinc-800/80 bg-[#050505] flex items-center px-6 justify-between">
            <div className="text-sm font-display text-white tracking-wide flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-500" /> Live Telemetry
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LISTENING
            </div>
          </div>

          <div className="flex-1 p-6 flex flex-col gap-6 relative">
            {/* Abstract Map & BOOM Feedback */}
            <div className="relative w-full h-48 bg-[#050505] border border-zinc-800/50 rounded-xl overflow-hidden flex items-center justify-center">
              {/* Abstract Grid Map */}
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              
              {/* Boom Ring */}
              <div id="boom-ring" className="absolute w-16 h-16 rounded-full border-2 border-emerald-500/50 origin-center" />
              
              {/* Pixel Marker */}
              <div id="map-marker" className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-sm shadow-[0_0_20px_rgba(16,185,129,1)]" />
                <div className="bg-black/90 backdrop-blur border border-emerald-500/30 px-2 py-0.5 rounded text-[9px] font-mono text-emerald-400 uppercase tracking-widest shadow-2xl">
                  SECURE NODE
                </div>
              </div>
            </div>

            {/* Log Stream */}
            <div className="flex-1 border border-zinc-800/50 rounded-xl bg-[#050505] p-4 flex flex-col gap-3 overflow-hidden relative">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">
                Event Stream
              </div>
              
              <div className="flex flex-col gap-2">
                {/* Static old logs */}
                <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-600">
                  <span>[10:29:45]</span>
                  <span className="text-zinc-500">Node initialized and standing by...</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-600">
                  <span>[10:29:46]</span>
                  <span className="text-blue-500/50">Awaiting payload dispatch via POST</span>
                </div>

                {/* Dynamic Log Row */}
                <motion.div 
                  id="log-row"
                  className="flex items-center gap-3 text-[11px] font-mono bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded shadow-[0_0_15px_rgba(16,185,129,0.05)] mt-1"
                >
                  <span className="text-emerald-500/70">[10:30:15]</span>
                  <span className="text-emerald-400 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5" /> work@gmail.com - Delivered - Payload active
                  </span>
                </motion.div>
              </div>
              
              {/* Fade out gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Custom OS Cursor */}
        <motion.div 
          id="cursor"
          className="absolute z-50 w-6 h-6 pointer-events-none"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 3.5L18.5 13.5L12 14.5L15.5 21L12.5 22.5L9 16L4 20V3.5Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </motion.div>

      </div>
    </div>
  );
}
