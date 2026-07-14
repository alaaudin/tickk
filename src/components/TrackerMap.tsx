import React, { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Globe, Compass, Activity } from "lucide-react";

interface GeoEvent {
  city: string;
  country: string;
  ip: string;
  timestamp: string;
  type: 'open' | 'click';
}

interface TrackerMapProps {
  events: GeoEvent[];
}

interface MapNode {
  city: string;
  country: string;
  x: number; // Percentage width
  y: number; // Percentage height
}

const MAP_NODES: { [key: string]: MapNode } = {
  "New York": { city: "New York", country: "United States", x: 28, y: 38 },
  "San Francisco": { city: "San Francisco", country: "United States", x: 15, y: 40 },
  "London": { city: "London", country: "United Kingdom", x: 47, y: 28 },
  "Paris": { city: "Paris", country: "France", x: 49, y: 32 },
  "Berlin": { city: "Berlin", country: "Germany", x: 52, y: 30 },
  "Tokyo": { city: "Tokyo", country: "Japan", x: 85, y: 42 },
  "Sydney": { city: "Sydney", country: "Australia", x: 90, y: 82 },
  "Toronto": { city: "Toronto", country: "Canada", x: 25, y: 35 },
  "Singapore": { city: "Singapore", country: "Singapore", x: 77, y: 62 },
  "Zurich": { city: "Zurich", country: "Switzerland", x: 50, y: 33 },
  "Stockholm": { city: "Stockholm", country: "Sweden", x: 53, y: 24 },
  "Melbourne": { city: "Melbourne", country: "Australia", x: 88, y: 85 },
  "Austin": { city: "Austin", country: "United States", x: 22, y: 45 },
};

export default function TrackerMap({ events }: TrackerMapProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Group events by city
  const cityStats = events.reduce((acc, ev) => {
    const key = ev.city;
    if (!acc[key]) {
      acc[key] = { count: 0, opens: 0, clicks: 0, lastEvent: ev };
    }
    acc[key].count += 1;
    if (ev.type === 'click') acc[key].clicks += 1;
    else acc[key].opens += 1;
    return acc;
  }, {} as { [key: string]: { count: number; opens: number; clicks: number; lastEvent: GeoEvent } });

  return (
    <div className="bg-white/70 dark:bg-[#121215]/70 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-800 rounded-xl p-6 shadow-sm overflow-hidden flex flex-col font-sans transition-colors duration-300">
      <div className="flex items-center justify-between mb-6 border-b border-neutral-100 dark:border-neutral-800 pb-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
            Global Open Coordinates
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Live tracking telemetry parsed from incoming email loads.</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-neutral-500">
            <span className="w-2.5 h-2.5 bg-black dark:bg-zinc-200 rounded-full" />
            Opens
          </span>
          <span className="flex items-center gap-1.5 text-neutral-500">
            <span className="w-2.5 h-2.5 bg-zinc-400 dark:bg-zinc-500 rounded-full" />
            Clicks
          </span>
        </div>
      </div>

      {/* SVG Container representing world grid */}
      <div className="relative aspect-[16/9] w-full bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-800/80 rounded-lg overflow-hidden select-none">
        {/* Absolute grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f22_1px,transparent_1px),linear-gradient(to_bottom,#1f1f22_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40 dark:opacity-20 pointer-events-none" />

        {/* Minimalist World Outlines - Rendered as geometric stylized dots */}
        <svg className="absolute inset-0 w-full h-full opacity-10 text-neutral-400" viewBox="0 0 1000 500" fill="currentColor">
          {/* North America */}
          <ellipse cx="250" cy="180" rx="120" ry="60" />
          <ellipse cx="180" cy="220" rx="90" ry="50" />
          {/* South America */}
          <ellipse cx="330" cy="350" rx="50" ry="100" />
          {/* Europe */}
          <ellipse cx="510" cy="150" rx="60" ry="40" />
          {/* Africa */}
          <ellipse cx="530" cy="300" rx="70" ry="90" />
          {/* Asia */}
          <ellipse cx="720" cy="190" rx="150" ry="80" />
          {/* Australia */}
          <ellipse cx="860" cy="400" rx="60" ry="45" />
        </svg>

        {/* Connection Lines (Lines from New York to other nodes to look like high-tech network paths) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {Object.keys(cityStats).map((city, idx) => {
            const node = MAP_NODES[city];
            const nyNode = MAP_NODES["New York"];
            if (!node || !nyNode || city === "New York") return null;
            return (
              <motion.line
                key={`line-${idx}`}
                x1={`${nyNode.x}%`}
                y1={`${nyNode.y}%`}
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke="#e5e5e5"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: idx * 0.1 }}
              />
            );
          })}
        </svg>

        {/* Interactive Coordinate Markers */}
        {Object.entries(MAP_NODES).map(([city, node]) => {
          const stat = cityStats[city];
          const hasActivity = !!stat;

          return (
            <div
              key={city}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              onMouseEnter={() => setHoveredNode(city)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {hasActivity ? (
                <div className="relative flex items-center justify-center cursor-pointer">
                  {/* Ping Animation */}
                  <span className={`absolute inline-flex h-6 w-6 rounded-full opacity-40 animate-ping ${
                    stat.clicks > 0 ? "bg-zinc-400 dark:bg-zinc-500" : "bg-black dark:bg-zinc-200"
                  }`} />
                  
                  {/* Outer circle */}
                  <div className={`relative w-3.5 h-3.5 rounded-full border-2 border-white dark:border-neutral-800 flex items-center justify-center shadow-sm ${
                    stat.clicks > 0 ? "bg-zinc-400 dark:bg-zinc-500" : "bg-black dark:bg-zinc-200"
                  }`}>
                    {/* Tiny inner center */}
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </div>
              ) : (
                <div className="w-2 h-2 bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-colors cursor-pointer" />
              )}

              {/* Hover Tooltip Card */}
              {hoveredNode === city && (
                <div className="absolute z-30 bottom-6 left-1/2 -translate-x-1/2 w-48 bg-black text-white rounded-lg p-3 shadow-xl text-xs flex flex-col gap-1.5 font-sans pointer-events-none">
                  <div className="font-semibold flex items-center justify-between border-b border-neutral-800 pb-1.5 mb-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {city}
                    </span>
                    <span className="text-neutral-500 text-[10px] uppercase font-mono">{node.country}</span>
                  </div>
                  {hasActivity ? (
                    <>
                      <div className="flex justify-between text-neutral-400">
                        <span>Total Records:</span>
                        <span className="font-mono text-white font-semibold">{stat.count} hits</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>Opens:</span>
                        <span className="font-mono text-white">{stat.opens}</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>Link Clicks:</span>
                        <span className="font-mono text-white font-bold">{stat.clicks}</span>
                      </div>
                      <div className="text-[10px] text-neutral-500 mt-1 border-t border-neutral-900 pt-1">
                        Latest IP: {stat.lastEvent.ip}
                      </div>
                    </>
                  ) : (
                    <span className="text-neutral-500 italic">No activity logs recorded.</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Grid of Active Nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {Object.entries(cityStats).slice(0, 4).map(([city, stat]) => (
          <div key={city} className="border border-neutral-100 dark:border-neutral-800/80 rounded p-3 bg-neutral-50 dark:bg-neutral-900/40 flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">{city}</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-lg font-mono font-bold text-neutral-900 dark:text-zinc-200">{stat.count} hits</span>
              <span className="text-[10px] text-neutral-400 font-medium">
                {Math.round((stat.opens / stat.count) * 100)}% Open
              </span>
            </div>
          </div>
        ))}
        {Object.keys(cityStats).length === 0 && (
          <div className="col-span-4 py-4 text-center text-xs text-neutral-400 italic">
            Waiting for mail opens to plot global geo-coordinates.
          </div>
        )}
      </div>
    </div>
  );
}
