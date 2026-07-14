const fs = require('fs');
let file = 'src/components/Dashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update Top Badges in Performance Section
content = content.replace(
  /<div className="absolute top-0 right-0 p-5 flex gap-3">[\s\S]*?<\/div>/,
  `<div className="absolute top-0 right-0 p-5 flex gap-3">
  <span className="inline-flex items-center px-2.5 py-1 bg-emerald-500/5 border border-emerald-500/20 text-neutral-900 dark:text-white text-[10px] font-bold uppercase tracking-wider rounded-full shrink-0">
    <Check className="w-3.5 h-3.5 text-emerald-500 mr-1 shrink-0" /> System Active
  </span>
  <span className="inline-flex items-center px-2.5 py-1 bg-emerald-500/5 border border-emerald-500/20 text-neutral-900 dark:text-white text-[10px] font-bold uppercase tracking-wider rounded-full shrink-0">
    <Check className="w-3.5 h-3.5 text-emerald-500 mr-1 shrink-0" /> Excellent Score
  </span>
</div>`
);

// 2. Update Verification Health Items
const oldVerificationRegex = /<span className="flex items-center gap-1\.5 text-\[10px\] uppercase tracking-wider bg-black\/5 dark:bg-white\/10 text-neutral-900 dark:text-white font-bold px-2\.5 py-1 rounded border border-black\/10 dark:border-white\/20">[\s\S]*?<Check className="w-3 h-3 stroke-\[3\]" \/> Confirmed[\s\S]*?<\/span>/g;

content = content.replace(oldVerificationRegex, 
  `<span className="inline-flex items-center px-2.5 py-1 bg-emerald-500/5 border border-emerald-500/20 text-neutral-900 dark:text-white text-[10px] font-bold uppercase tracking-wider rounded-full shrink-0">
    <Check className="w-3.5 h-3.5 text-emerald-500 mr-1 shrink-0" /> Confirmed
  </span>`
);

// 3. Ultra Premium Smooth Heatmap (Removing DOM tooltips completely and replacing with title attribute)
const heatmapCellRegex = /<div[\s\S]*?className=\{\`group relative w-8 h-6 rounded border transition-all duration-200 hover:scale-\[1\.25\] hover:z-30 cursor-crosshair hover:shadow-lg hover:border-black\/30 dark:hover:border-white\/40 \$\{blockStyle\}\`\}[\s\S]*?>[\s\S]*?<div className="absolute bottom-full[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>/g;

content = content.replace(heatmapCellRegex, 
  `<div
     key={hourIdx}
     title={\`\${value === 0 ? 'No' : value * (heatmapFilter === 'last_year' ? 142 : heatmapFilter === 'last_30_days' ? 12 : 3)} messages\\n\${displayDay} at \${hourLabel}\`}
     className={\`w-8 h-6 rounded border transition-colors duration-150 cursor-crosshair hover:border-black/30 dark:hover:border-white/40 hover:bg-black/10 dark:hover:bg-white/20 \${blockStyle}\`}
   ></div>`
);

// 4. Update Premium Glassmorphism Class
const premiumGlassRegex = /const premiumGlassmorphismClass = ".*?";/;
const newPremiumGlass = 'const premiumGlassmorphismClass = "bg-white/60 dark:bg-white/10 backdrop-blur-3xl border border-white/90 dark:border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]";';
content = content.replace(premiumGlassRegex, newPremiumGlass);

fs.writeFileSync(file, content);
console.log("Patched performance section successfully!");
