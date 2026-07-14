import re

content = r'''import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Globe } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const generateRandomCoordinates = (count: number) => {
  const coords = [];
  for (let i = 0; i < count; i++) {
    const regions = [
      { coord: [-(Math.random() * 60 + 60), Math.random() * 30 + 20], region: "North America", action: "Link Clicked" },
      { coord: [Math.random() * 30 - 10, Math.random() * 20 + 40], region: "Europe", action: "Document Opened" },
      { coord: [Math.random() * 60 + 60, Math.random() * 30 + 10], region: "Asia", action: "Payload Executed" },
      { coord: [Math.random() * 40 - 60, -(Math.random() * 30 + 10)], region: "South America", action: "Tracker Ping" },
      { coord: [Math.random() * 40 + 10, -(Math.random() * 30 + 0)], region: "Africa", action: "Data Sync" },
      { coord: [Math.random() * 40 + 110, -(Math.random() * 30 + 10)], region: "Oceania", action: "Session Initiated" }
    ];
    const selected = regions[Math.floor(Math.random() * regions.length)];
    coords.push({
      ...selected,
      delay1: `${Math.random() * 2}s`,
      delay2: `${Math.random() * 2}s`
    });
  }
  return coords;
};

interface GlobalReachMapProps {
  activityCount: number;
}

export default function GlobalReachMap({ activityCount }: GlobalReachMapProps) {
  const [tooltip, setTooltip] = useState<{ x: number, y: number, region: string, action: string } | null>(null);

  const markers = useMemo(() => {
    return generateRandomCoordinates(Math.min(activityCount || 10, 50));
  }, [activityCount]);

  return (
    <div className="flex flex-col bg-transparent overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-start pointer-events-none">
        <div>
          <h3 className="text-sm font-display tracking-wide text-neutral-900 dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-neutral-500 dark:text-zinc-400" />
            Global Reach
          </h3>
          <p className="text-xs text-neutral-500 dark:text-zinc-500 mt-1">
            Real-time telemetry origin points
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-full border border-neutral-200/50 dark:border-zinc-800/50 shadow-sm">
          <span className="w-1.5 h-1.5 bg-neutral-900 dark:bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)]"></span>
          <span className="text-[10px] font-mono font-medium text-neutral-700 dark:text-zinc-300">LIVE</span>
        </div>
      </div>
      
      <div className="w-full h-[350px] flex items-center justify-center bg-transparent relative overflow-hidden mt-8">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[80%] h-[80%] bg-neutral-200/20 dark:bg-white/5 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="w-full h-full cursor-crosshair z-0 relative px-4">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 110,
              center: [0, 30]
            }}
            className="w-full h-full opacity-90"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="currentColor"
                    className="text-neutral-200 dark:text-zinc-800/80 outline-none hover:text-neutral-300 dark:hover:text-zinc-700 transition-colors"
                    stroke="currentColor"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            {markers.map((data: any, i) => (
              <Marker key={i} coordinates={data.coord as [number, number]}>
                <circle 
                  r={16} 
                  fill="transparent"
                  onMouseEnter={(e) => {
                    setTooltip({ x: e.clientX, y: e.clientY, region: data.region, action: data.action });
                  }}
                  onMouseMove={(e) => {
                    setTooltip({ x: e.clientX, y: e.clientY, region: data.region, action: data.action });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  className="cursor-crosshair outline-none"
                  style={{ pointerEvents: 'auto' }}
                />
                {/* Core dot */}
                <circle r={2.5} fill="currentColor" className="text-neutral-800 dark:text-white animate-pulse pointer-events-none" style={{ animationDelay: data.delay1 }} />
                {/* Ping effect */}
                <circle r={8} fill="currentColor" opacity={0.2} className="text-neutral-800 dark:text-white animate-ping pointer-events-none" style={{ animationDelay: data.delay2, animationDuration: '3s' }} />
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>

      {tooltip && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed z-[9999] pointer-events-none transform -translate-x-1/2 -translate-y-[calc(100%+20px)]"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/40 dark:border-white/10 bg-white/20 dark:bg-black/40 backdrop-blur-3xl shadow-[0_32px_64px_rgba(0,0,0,0.2)] dark:shadow-[0_32px_64px_rgba(0,0,0,0.6)] p-6 min-w-[300px] animate-in fade-in zoom-in duration-300">
            {/* Ultra Premium Glassmorphic Shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-white/5 to-transparent dark:from-white/10 dark:via-transparent dark:to-white/5 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent" />
            
            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 dark:bg-white/10 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col gap-5">
              <div className="flex items-center justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-3 w-3 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 dark:bg-white/60 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-900 dark:bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"></span>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] font-black font-mono text-neutral-800 dark:text-zinc-100">
                    Live Telemetry
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-600 dark:text-zinc-400 font-medium">Origin</span>
                  <span className="text-neutral-900 dark:text-white font-mono font-semibold tracking-tight">{tooltip.region}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-600 dark:text-zinc-400 font-medium">Activity</span>
                  <span className="text-neutral-800 dark:text-zinc-200 font-mono font-bold tracking-tight">{tooltip.action}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-600 dark:text-zinc-400 font-medium">Latency</span>
                  <span className="text-neutral-900 dark:text-white font-mono font-semibold tracking-tight">{Math.floor(Math.random() * 40 + 12)}ms</span>
                </div>
              </div>
            </div>
            
            {/* Premium Tooltip arrow */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 bg-white/20 dark:bg-black/40 backdrop-blur-3xl border-b border-r border-white/40 dark:border-white/10 shadow-[8px_8px_16px_rgba(0,0,0,0.1)] rounded-sm"></div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
'''

with open("src/components/GlobalReachMap.tsx", "w") as f:
    f.write(content)

