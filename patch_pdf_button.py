import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# Insert handleDownloadReport
handler_find = r'''  const dismissBetaWelcome = \(\) => \{'''
handler_repl = r'''  const handleDownloadReport = () => {
    const doc = new jsPDF();
    
    // Brand header
    doc.setFillColor(5, 5, 6);
    doc.rect(0, 0, 210, 45, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("TICKK", 25, 28);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("PREMIUM TELEMETRY SERVICES", 62, 27);
    
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text("Analytics Report", 145, 28);
    
    // Title
    doc.setTextColor(30, 30, 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Telemetry Overview", 25, 65);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(f"Generated on: {new Date().toLocaleDateString()}", 25, 72);
    
    // Metrics
    doc.setDrawColor(200, 200, 200);
    doc.line(25, 80, 185, 80);
    
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text(`Total Trackers: ${dbTrackers.length}`, 25, 95);
    doc.text(`Total Reads: ${dbTrackers.reduce((acc, t) => acc + (t.reads?.length || 0), 0)}`, 25, 105);
    doc.text(`Active Credits: ${userCredits}`, 25, 115);
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Tickk Console - Confidential Analytics", 105, 280, { align: "center" });
    
    doc.save(`TICKK_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const dismissBetaWelcome = () => {'''
content = re.sub(handler_find, handler_repl, content)

# Add Download Report button
header_find = r'''<span className="w-1\.5 h-1\.5 bg-emerald-500 rounded-full shadow-\[0_0_8px_rgba\(16,185,129,0\.5\)\] animate-pulse" \/>
              Secure Session Active
            <\/span>
            <ThemeToggle theme=\{theme\} toggleTheme=\{toggleTheme\} \/>'''
header_repl = r'''<span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              Secure Session Active
            </span>
            <button 
              onClick={handleDownloadReport}
              className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 text-neutral-600 dark:text-zinc-300 rounded-full hover:bg-neutral-50 dark:hover:bg-zinc-700/50 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-medium">Download PDF Report</span>
            </button>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />'''
content = re.sub(header_find, header_repl, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)

