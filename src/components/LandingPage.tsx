import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { DeveloperTerminalAnimation } from "./DeveloperTerminalAnimation";
import { 
  Puzzle,
  FileText,
  Mail, 
  Eye, 
  MapPin, 
  MousePointerClick, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Sparkles, 
  ArrowUpRight,
  Globe,
  Settings,
  Lock,
  Activity,
  Layers,
  Sparkle,
  Link2,
  Laptop,
  Smartphone,
  Tablet,
  Chrome,
  Compass,
  Shield,
  Cpu,
  HelpCircle,
  Network,
  BadgeCheck,
  Copy,
  Send,
  BellRing,
  Server,
} from "lucide-react";

// Interactive icon animation variants
const cardVariants = {
  rest: {},
  hover: {}
};




const PHRASES = [
  "Quietly engineered.",
  "Silent read receipts.",
  "Global telemetry.",
  "Zero-click logging.",
  "Actionable signals.",
  "Invisible tracking.",
  "Encrypted streams.",
  "Boardroom analytics.",
  "Real-time IP routing.",
  "Executive oversight.",
  "Precision mapping.",
  "Bypass firewalls.",
  "Sub-second latency.",
  "Threat intelligence.",
  "Enterprise reports.",
  "Recipient profiling.",
  "Link wrapping.",
  "Engagement tracking.",
  "Seamless integration.",
  "Unobtrusive capture.",
  "C-suite insights.",
  "Military security.",
  "Geographic tracking.",
  "Instant verification.",
  "Frictionless setup.",
  "Unparalleled insight.",
  "Behavioral data.",
  "Stealth monitoring.",
  "Total transparency.",
  "Empower outreach.",
  "Strategic advantage.",
  "Data decisions.",
  "Know when they open.",
  "Know when they click.",
  "Know when they engage.",
  "Master your inbox.",
  "Elevate outreach.",
  "Precision telemetry.",
  "Silent data capture.",
  "Uncompromising vision.",
  "Actionable intel.",
  "Insight analytics.",
  "Seamless tracking.",
  "Effortless setup.",
  "Executive dashboard.",
  "Real-time updates.",
  "Total precision.",
  "Ultimate control.",
  "Superior intel.",
  "Total visibility.",
  "Absolute certainty."
];

function TypewriterEffect() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    let typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && text === currentPhrase) {
      typingSpeed = 2500; // Wait before deleting
      const timeout = setTimeout(() => setIsDeleting(true), typingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      const nextIndex = (phraseIndex + 1) % PHRASES.length;
      setPhraseIndex(nextIndex);
      // Wait before typing next
      const timeout = setTimeout(() => {}, 500); 
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setText((prev) => 
        isDeleting 
          ? currentPhrase.substring(0, prev.length - 1)
          : currentPhrase.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <span className="text-neutral-400 dark:text-neutral-500 inline-flex items-center whitespace-nowrap">
      {text}
      <span className="w-[2px] h-[0.85em] bg-neutral-400 dark:bg-neutral-500 ml-[2px] animate-pulse"></span>
    </span>
  );
}

interface LandingPageProps {
  onNavigateToAuth: (mode: 'login' | 'signup') => void;
  onQuickStart: (email: string) => void;
  onNavigateToLegal?: (view: 'privacy' | 'terms') => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function LandingPage({ onNavigateToAuth, onQuickStart, onNavigateToLegal, theme, toggleTheme }: LandingPageProps) {
  // Simulator State
  const [subject, setSubject] = useState("Confidential Partnership Proposal");
  const [recipient, setRecipient] = useState("board@apple.com");
  const [simState, setSimState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [simStep, setSimStep] = useState(0);
  const [simLogs, setSimLogs] = useState<{
    id: string;
    time: string;
    level: 'INFO' | 'WARN' | 'CRITICAL';
    module: string;
    text: string;
  }[]>([]);
  const [quickEmail, setQuickEmail] = useState("");

  const handleGenerateSim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !recipient) return;
    setSimState('running');
    setSimStep(1);
    
    const now = new Date().toISOString().split('T')[1].slice(0, 8);
    setSimLogs([
      { 
        id: "1", 
        time: now, 
        level: 'INFO',
        module: 'COMPILER',
        text: `Injected 1x1 tracking pixel. Target: ${recipient}, Subject: "${subject}"`
      }
    ]);
  };

  useEffect(() => {
    if (simState !== 'running') return;

    const sequence = [
      {
        delay: 1500,
        level: 'INFO' as const,
        module: 'SMTP_GATEWAY',
        text: `Dispatched payload to MTA relay. Destination: ${recipient}`,
        step: 2
      },
      {
        delay: 3500,
        level: 'WARN' as const,
        module: 'LISTENER_NODE',
        text: `Delivery confirmed by upstream MX. Awaiting pixel callback sequence...`,
        step: 3
      },
      {
        delay: 6000,
        level: 'CRITICAL' as const,
        module: 'TELEMETRY_HIT',
        text: `Open event detected. IP: 188.42.12.99, LOC: London, UK, UA: Outlook/Windows.`,
        step: 4
      },
      {
        delay: 8500,
        level: 'WARN' as const,
        module: 'ANOMALY_DETECTOR',
        text: `VPN signature identified. IP: 194.154.20.11, ASN: Corporate Datacenter.`,
        step: 4
      },
      {
        delay: 11000,
        level: 'CRITICAL' as const,
        module: 'REDIRECT_HOOK',
        text: `Link click registered. Redirecting to destination. Device: Mobile/Chrome. (IP: 188.42.12.99)`,
        step: 5
      },
      {
        delay: 13000,
        level: 'WARN' as const,
        module: 'SHIELD_PROXY',
        text: `Recipient mail-shield proxy scanned tracking headers. Pixel delivery filtered.`,
        step: 6
      }
    ];

    const timers: NodeJS.Timeout[] = [];
    sequence.forEach((item) => {
      const t = setTimeout(() => {
        const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
        setSimLogs(prev => [
          { 
            id: String(Date.now() + Math.random()), 
            time: timestamp,
            level: item.level,
            module: item.module,
            text: item.text
          },
          ...prev
        ]);
        setSimStep(item.step);
        if (item.step === 6) {
          setSimState('completed');
        }
      }, item.delay);
      timers.push(t);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [simState, recipient, subject]);

  const handleSimulateOpenManual = () => {
    if (simStep < 3) return;
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
    const rand = Math.random();
    let text = "";
    let level: 'INFO' | 'WARN' | 'CRITICAL' = 'CRITICAL';
    let module = 'TELEMETRY_HIT';

    if (rand < 0.4) {
      text = `Open event detected. IP: 188.42.12.99, LOC: London, UK, UA: Outlook/Windows.`;
      level = 'CRITICAL';
    } else if (rand < 0.7) {
      text = `VPN signature identified. IP: 194.154.20.11, ASN: Corporate Datacenter.`;
      level = 'WARN';
      module = 'ANOMALY_DETECTOR';
    } else {
      text = `Recipient mail-shield proxy scanned tracking headers. Pixel delivery filtered.`;
      level = 'WARN';
      module = 'SHIELD_PROXY';
    }

    setSimLogs(prev => [
      {
        id: String(Date.now() + Math.random()),
        time: timestamp,
        level,
        module,
        text
      },
      ...prev
    ]);
    setSimStep(4);
  };

  const handleSimulateClickManual = () => {
    if (simStep < 3) return;
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
    
    setSimLogs(prev => [
      {
        id: String(Date.now() + Math.random()),
        time: timestamp,
        level: 'CRITICAL',
        module: 'REDIRECT_HOOK',
        text: `Link click registered. Redirecting to destination. Device: Mobile/Chrome. (IP: 188.42.12.99)`
      },
      ...prev
    ]);
    setSimStep(5);
  };

  const handleResetSim = () => {
    setSimState('idle');
    setSimStep(0);
    setSubject("Confidential Partnership Proposal");
    setRecipient("board@apple.com");
    setSimLogs([]);
  };

  return (
    <div className="bg-transparent text-[#111115] dark:text-neutral-200 min-h-screen flex flex-col font-sans transition-colors duration-300">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-[#fafafa]/80 dark:bg-[#0c0c0e]/80 backdrop-blur-md border-b border-[#e5e5e5] dark:border-[#1e1e22] px-6 lg:px-16 py-4 flex items-center justify-between transition-colors duration-300">
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2 select-none">
            <img src="/logo.svg" alt="Tickk" className="h-4 dark:invert" />
          </span>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400 font-medium">
            <a href="#features" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Features</a>
            <a href="#simulator" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Sandbox</a>
            <a href="#pricing" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Pricing</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          <button 
            onClick={() => onNavigateToAuth('login')}
            className="text-sm font-medium hover:text-neutral-900 dark:hover:text-white text-neutral-600 dark:text-neutral-400 transition-colors cursor-pointer px-3 py-1.5"
          >
            Sign In
          </button>
          <button 
            onClick={() => onNavigateToAuth('signup')}
            className="text-sm font-medium bg-neutral-900 dark:bg-neutral-850 hover:bg-black dark:hover:bg-neutral-750 text-white transition-all cursor-pointer px-4 py-2 rounded-lg border border-neutral-950 dark:border-neutral-750 shadow-sm"
          >
            Sign Up Free
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-16 pt-16 pb-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* EXTREME PREMIUM GLASSMORPHIC BLUR ANIMATION */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 flex items-center justify-center">
          <motion.div 
            animate={{ 
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] -top-1/4 -right-1/4 opacity-40 dark:opacity-30 mix-blend-normal"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-neutral-300 via-neutral-100 to-transparent dark:from-zinc-800/80 dark:via-zinc-900/40 dark:to-transparent rounded-full blur-[120px] transform scale-x-125 rotate-45" />
          </motion.div>
          
          <motion.div 
            animate={{ 
              rotate: [360, 270, 180, 90, 0],
              scale: [1, 1.2, 1, 1.2, 1]
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[60vw] max-w-[600px] h-[60vw] max-h-[600px] top-1/4 -left-1/4 opacity-30 dark:opacity-20 mix-blend-normal"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 via-neutral-200 to-transparent dark:from-zinc-700/50 dark:via-zinc-800/30 dark:to-transparent rounded-full blur-[100px] transform scale-y-125 -rotate-45" />
          </motion.div>
          
          {/* Central subtle highlight */}
          <div className="absolute w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/40 dark:bg-zinc-800/20 rounded-full blur-[150px] pointer-events-none" />
        </div>

        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-800 dark:text-neutral-300 font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
            <span>Introducing Tickk v2.4 • Silent Telemetry Proxy</span>
          </div>
          
          <h1 className="font-display font-light tracking-tight text-neutral-900 dark:text-white subpixel-antialiased text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
            <span className="bg-gradient-to-r from-neutral-950 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent">Premium email intelligence.</span><br />
            <TypewriterEffect />
          </h1>
          
          <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed max-w-xl mb-8 font-sans">
            An executive-tier email tracking platform. Inject silent telemetry, log global geolocation metrics, and map real-time click pathways without bloat. Perfect for corporate founders, legal counsel, and elite sales desks.
          </p>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (quickEmail) onQuickStart(quickEmail);
            }}
            className="w-full max-w-md flex flex-col sm:flex-row gap-2 mb-4"
          >
            <input 
              type="email" 
              placeholder="Enter your work email..."
              required
              value={quickEmail}
              onChange={(e) => setQuickEmail(e.target.value)}
              className="flex-1 px-4 py-3 text-sm bg-white dark:bg-[#121215] border border-neutral-200 dark:border-neutral-800 text-[#111115] dark:text-white rounded-lg focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:ring-1 focus:ring-neutral-900/10 transition-all"
            />
            <button 
              type="submit"
              className="px-5 py-3 text-sm bg-neutral-900 dark:bg-neutral-850 hover:bg-black dark:hover:bg-neutral-750 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer border border-neutral-950 dark:border-neutral-750 shadow-sm"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          
          <p className="text-xs text-neutral-400 dark:text-neutral-500 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-200" />
            No credit card required. 100% GDPR Compliant silent pixel tracking.
          </p>
        </div>

        {/* Live Visual Board Mockup */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <div className="relative w-full max-w-md bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-neutral-200/50 dark:border-zinc-800/80 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300">

            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4 mb-4 relative z-10">
              <span className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-neutral-400 dark:text-neutral-500"><img src="/icon.svg" alt="Tickk" className="h-2.5 dark:invert opacity-50" /> CONSOLE</span>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <div className="w-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                <div className="w-2 h-2 rounded-full bg-neutral-400" />
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <div>
                <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Total Sent Tracker Volume</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased">24,812</span>
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700">+14.2%</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Real-Time Open Rate</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased">89.4%</span>
                  <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Avg. 14 min open lag</span>
                </div>
              </div>

              {/* Graphical Line Mimic */}
              <div className="h-28 bg-white/20 dark:bg-zinc-900/30 border border-neutral-200/50 dark:border-zinc-800/50 rounded-lg flex items-end p-2 gap-1.5 relative overflow-visible group transition-all duration-500 hover:shadow-[0_0_24px_rgba(10,10,10,0.08)] dark:hover:shadow-[0_0_24px_rgba(255,255,255,0.06)] hover:border-neutral-300/80 dark:hover:border-zinc-700/80 cursor-pointer">
                {/* Glow behind the chart */}
                <div className="absolute inset-0 bg-neutral-50/0 dark:bg-white/0 group-hover:bg-neutral-900/5 dark:group-hover:bg-white/5 transition-colors duration-500 pointer-events-none rounded-lg" />
                
                {/* Hover Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none z-20">
                  <div className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-[10px] font-medium font-mono px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap flex flex-col items-center">
                    <span>LATEST PING: 24,812</span>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-neutral-900 dark:border-t-white" />
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-30 pointer-events-none">
                  <div className="border-t border-neutral-200 dark:border-neutral-800 w-full" />
                  <div className="border-t border-neutral-200 dark:border-neutral-800 w-full" />
                  <div className="border-t border-neutral-200 dark:border-neutral-800 w-full" />
                </div>
                {/* Visual waves */}
                <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded group-hover:bg-neutral-300 dark:group-hover:bg-neutral-700 transition-colors duration-300" style={{ height: "45%" }} />
                <div className="w-full bg-neutral-300 dark:bg-neutral-700 rounded group-hover:bg-neutral-400 dark:group-hover:bg-neutral-600 transition-colors duration-300" style={{ height: "60%" }} />
                <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded group-hover:bg-neutral-300 dark:group-hover:bg-neutral-700 transition-colors duration-300" style={{ height: "50%" }} />
                <div className="w-full bg-neutral-300 dark:bg-neutral-700 rounded group-hover:bg-neutral-400 dark:group-hover:bg-neutral-600 transition-colors duration-300" style={{ height: "85%" }} />
                <div className="w-full bg-neutral-400 dark:bg-neutral-600 rounded group-hover:bg-neutral-500 dark:group-hover:bg-neutral-500 transition-colors duration-300" style={{ height: "70%" }} />
                <div className="w-full bg-neutral-800 dark:bg-neutral-300 rounded shadow-sm animate-pulse group-hover:bg-neutral-900 dark:group-hover:bg-white transition-colors duration-300" style={{ height: "95%" }} />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                <span>SYSTEM STATUS</span>
                <span className="text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-pulse shadow-sm" />
                  STABLE • SECURE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Section */}
      <section id="simulator" className="py-20 bg-transparent border-y border-neutral-200/40 dark:border-neutral-800/60 px-6 lg:px-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">Interactive Sandbox</span>
            <h2 className="font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased text-3xl mt-2 mb-4">
              <span className="bg-gradient-to-r from-neutral-950 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent">
                Try simulated live tracking instantly
              </span>
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              Enter your own mock data below. When you compile the tracker, Tickk's telemetry loop will execute step-by-step automatically, displaying actual recipient client opens and click metrics in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step 1: Creator Form */}
            <div className="lg:col-span-5 bg-white/5 dark:bg-white/[0.02] backdrop-blur-[60px] border border-white/20 dark:border-white/10 rounded-[23px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 relative overflow-hidden">
              {/* Ambient Glows */}
              

              <h3 className="text-sm font-semibold tracking-wide uppercase text-neutral-500 dark:text-neutral-400 mb-4 flex items-center gap-2 relative z-10">
                <span className="w-5 h-5 rounded-full bg-white/20 dark:bg-white/10 flex items-center justify-center text-[10px] text-neutral-800 dark:text-zinc-200 border border-white/30 dark:border-white/10 font-mono shadow-sm">1</span>
                Configure Mockup Tracker
              </h3>

              <form onSubmit={handleGenerateSim} className="space-y-4 relative z-10">
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1 drop-shadow-sm">Email Subject Line</label>
                  <input 
                    type="text"
                    disabled={simState !== 'idle'}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-neutral-300/50 dark:border-white/10 rounded focus:outline-none focus:border-neutral-500 dark:focus:border-white/30 focus:ring-1 focus:ring-neutral-900/10 disabled:opacity-50 text-neutral-900 dark:text-white transition-all shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1 drop-shadow-sm">Recipient Address</label>
                  <input 
                    type="email"
                    disabled={simState !== 'idle'}
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-neutral-300/50 dark:border-white/10 rounded focus:outline-none focus:border-neutral-500 dark:focus:border-white/30 focus:ring-1 focus:ring-neutral-900/10 disabled:opacity-50 text-neutral-900 dark:text-white transition-all shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1 drop-shadow-sm">Destination URL Click Track (Optional)</label>
                  <input 
                    type="text"
                    disabled
                    value="https://tickk.io/proposals/9882a"
                    className="w-full px-3 py-2 text-sm bg-black/5 dark:bg-black/40 text-neutral-500 dark:text-neutral-500 border border-neutral-300/30 dark:border-white/5 rounded cursor-not-allowed shadow-inner"
                  />
                </div>

                {simState === 'idle' ? (
                  <button 
                    type="submit"
                    className="w-full py-2.5 bg-neutral-900/90 dark:bg-white/10 hover:bg-black dark:hover:bg-white/20 text-white text-sm font-semibold rounded transition-all flex items-center justify-center gap-2 cursor-pointer border border-neutral-800 dark:border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.1)] backdrop-blur-md"
                  >
                    Compile Silent Pixel Tracker
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    type="button"
                    onClick={handleResetSim}
                    className="w-full py-2.5 bg-white/50 dark:bg-black/30 border border-neutral-300/50 dark:border-white/10 text-neutral-800 dark:text-white hover:bg-white/80 dark:hover:bg-white/10 text-sm font-medium rounded transition-all cursor-pointer backdrop-blur-md shadow-sm"
                  >
                    Reset & Build New Simulation
                  </button>
                )}
              </form>
            </div>

            {/* Step 2: Live Simulator Controller */}
            <div className="lg:col-span-7 space-y-6">
              {/* Virtual Email Sandbox Client */}
              <div className="bg-white/5 dark:bg-white/[0.02] backdrop-blur-[60px] border border-white/20 dark:border-white/10 rounded-[23px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 relative">
                {/* Ambient Glows */}
                

                <div className="bg-white/30 dark:bg-black/20 backdrop-blur-sm px-4 py-2 flex items-center justify-between border-b border-white/20 dark:border-white/10 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                  </div>
                  <span className="text-xs font-sans font-light tracking-tighter text-neutral-800 dark:text-neutral-300 subpixel-antialiased drop-shadow-sm">RECIPIENT INBOX (Cupertino Sandbox)</span>
                  <div className="w-12" />
                </div>

                <div className="p-6 relative z-10">
                  {simStep === 0 ? (
                    <div className="h-48 flex flex-col items-center justify-center text-center">
                      <Mail className="w-8 h-8 text-neutral-400 dark:text-neutral-600 mb-2 drop-shadow-sm" />
                      <p className="text-neutral-500 dark:text-neutral-400 text-sm">Please compile the Mail Tracker on the left to initiate the automated live telemetry stream.</p>
                    </div>
                  ) : (
                    <div>
                      {/* Email Header mock */}
                      <div className="border-b border-neutral-200/50 dark:border-white/10 pb-4 mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-neutral-500 dark:text-neutral-500 font-sans font-normal">To:</span>
                          <span className="font-sans font-normal tracking-normal text-neutral-800 dark:text-zinc-200 leading-relaxed font-mono truncate max-w-[150px]">{recipient}</span>
                        </div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-neutral-500 dark:text-neutral-500 font-sans font-normal">From:</span>
                          <span className="font-sans font-normal tracking-normal text-neutral-800 dark:text-zinc-200 leading-relaxed">saqibmemon9884@gmail.com</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-neutral-500 dark:text-neutral-500 font-sans font-normal">Subject:</span>
                          <span className="font-sans font-normal tracking-normal text-neutral-900 dark:text-white leading-relaxed font-semibold">{subject}</span>
                        </div>
                      </div>

                      {/* Email Body mock */}
                      <div className="bg-white/40 dark:bg-black/20 backdrop-blur-sm border border-neutral-200/50 dark:border-white/5 rounded-lg p-4 mb-4 relative transition-all duration-300 shadow-inner">
                        <p className="text-xs text-neutral-800 dark:text-neutral-300 leading-relaxed mb-3">
                          Hi there, <br /><br />
                          Please review the latest Q3 partnership proposal details attached below. Let me know if the pricing matches your expectations.
                        </p>
                        
                        <div className="flex items-center gap-2 p-2 border border-neutral-300/50 dark:border-neutral-700/50 rounded bg-white/50 dark:bg-neutral-800/50 max-w-[200px] cursor-pointer hover:bg-white dark:hover:bg-neutral-700 transition-colors shadow-sm">
                          <FileText className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                          <div className="flex flex-col">
                            <span className="text-[10px] font-semibold text-neutral-800 dark:text-white">Q3_Proposal.pdf</span>
                            <span className="text-[9px] text-neutral-500">1.2 MB</span>
                          </div>
                        </div>

                        {/* Visual Tracker Indicator for UI sake */}
                        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-40">
                          <Eye className="w-3 h-3 text-emerald-500" />
                          <span className="text-[8px] font-mono text-emerald-600 dark:text-emerald-400">TRACKER ARMED</span>
                        </div>
                      </div>


                    </div>
                  )}
                </div>
              </div>

              {/* Premium Activity Feed */}
              <div className="bg-white/5 dark:bg-white/[0.02] backdrop-blur-[60px] border border-white/20 dark:border-white/10 rounded-[23px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 relative">
                {/* Ambient Glows */}
                

                <div className="bg-white/30 dark:bg-black/40 backdrop-blur-sm px-5 py-3 border-b border-white/20 dark:border-white/10 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 relative z-10">
                  <span className="flex items-center gap-2 font-sans font-medium tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased text-[11px] uppercase drop-shadow-sm">
                    <Activity className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                    SYSTEM TELEMETRY FEED
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-300 font-mono text-[9px] uppercase tracking-widest bg-white/50 dark:bg-white/10 px-2 py-0.5 rounded border border-neutral-300/50 dark:border-white/5 shadow-inner">REALTIME STREAM</span>
                </div>
                
                <div className="p-4 space-y-1.5 max-h-[360px] min-h-[360px] overflow-y-auto scrollbar-thin relative z-10 font-mono text-[11px] md:text-xs">
                  {simLogs.length === 0 ? (
                    <div className="text-neutral-500 flex flex-col items-center justify-center h-full py-16 text-center font-mono text-xs gap-2">
                      <Terminal className="w-6 h-6 text-neutral-400 dark:text-neutral-600 animate-pulse" />
                      Waiting to receive compilation parameters...
                    </div>
                  ) : (
                    <AnimatePresence initial={false}>
                      {simLogs.map((log) => {
                        return (
                           <motion.div 
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex flex-wrap items-start gap-1.5 leading-relaxed bg-white/20 dark:bg-black/20 p-1.5 rounded hover:bg-white/40 dark:hover:bg-black/40 transition-colors"
                          >
                            <span className="text-neutral-500 dark:text-zinc-500 shrink-0">[{log.time}]</span>
                            <span className="shrink-0 font-semibold text-neutral-600 dark:text-zinc-400">[{log.level}]</span>
                            <span className="shrink-0 text-neutral-500 dark:text-zinc-500">[{log.module}]</span>
                            <span className="text-neutral-800 dark:text-zinc-300 break-words flex-1">
                              {log.text}
                            </span>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase inline-flex items-center justify-center gap-2">THE PROCESS</span>
          <h2 className="font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased text-3xl mt-2 mb-4">
            <span className="bg-gradient-to-r from-neutral-950 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent">
              How Email Tracking Works
            </span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            An incredibly simple yet powerful 3-step execution protocol. Zero technical overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <motion.div 
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={cardVariants}
            className="p-8 bg-white/40 dark:bg-[#121215]/45 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/60 rounded-xl relative hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_30px_rgba(255,255,255,0.015)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 flex items-center justify-center mb-6 relative overflow-hidden" style={{ perspective: "1000px" }}>
              <motion.div
                animate={{
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-[-50%] border-[1px] border-dashed border-neutral-300 dark:border-neutral-700 rounded-full opacity-30"
              />
              <motion.div
                animate={{
                  scale: [1, 1.1, 1, 0.9, 1],
                  rotateZ: [0, -5, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-neutral-900 dark:text-white relative z-10"
              >
                <Send className="w-6 h-6" strokeWidth={1.5} />
              </motion.div>
            </div>
            <h3 className="font-display font-medium text-lg text-neutral-900 dark:text-white mb-3">1. Invisible Injection</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed relative z-10">
              Compose and send your email just as you normally would. Beneath the surface, Tickk automatically binds a weightless, cryptographic 1x1 tracking pixel to your payload.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={cardVariants}
            className="p-8 bg-white/40 dark:bg-[#121215]/45 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/60 rounded-xl relative hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_30px_rgba(255,255,255,0.015)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 flex items-center justify-center mb-6 relative overflow-hidden flex-col" style={{ perspective: "1000px" }}>
              <motion.div
                animate={{
                  scale: [0, 2],
                  opacity: [0.8, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute inset-0 m-auto w-8 h-8 border border-neutral-400 dark:border-neutral-500 rounded-full"
              />
              <motion.div
                animate={{
                  scaleY: [1, 1, 0.1, 1, 1],
                  scaleX: [1, 1.1, 1.2, 1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.45, 0.5, 0.55, 1]
                }}
                className="text-neutral-900 dark:text-white relative z-10"
              >
                <Eye className="w-6 h-6" strokeWidth={1.5} />
              </motion.div>
            </div>
            <h3 className="font-display font-medium text-lg text-neutral-900 dark:text-white mb-3">2. The Silent Trigger</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed relative z-10">
              The exact moment your recipient opens the email or clicks a protected link, the stealth pixel fires. Their experience remains entirely native and uninterrupted.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={cardVariants}
            className="p-8 bg-white/40 dark:bg-[#121215]/45 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/60 rounded-xl relative hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_30px_rgba(255,255,255,0.015)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 flex items-center justify-center mb-6 relative overflow-hidden" style={{ perspective: "1000px" }}>
              <motion.div
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  rotateZ: [0, 180, 360],
                  borderWidth: ["1px", "2px", "1px"]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute w-10 h-10 border-neutral-300 dark:border-neutral-600 rounded-lg top-[8px] left-[8px] z-0"
              />
              <motion.div
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-neutral-900 dark:text-white relative z-10 drop-shadow-md"
              >
                <Activity className="w-6 h-6" strokeWidth={1.5} />
              </motion.div>
            </div>
            <h3 className="font-display font-medium text-lg text-neutral-900 dark:text-white mb-3">3. Omniscient Insights</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed relative z-10">
              You are instantly notified. Track precisely when they opened it, exactly how many times it was viewed, and their exact geographic location with zero latency.
            </p>
          </motion.div>
        </div>
        <div className="flex justify-center mt-12 mb-10">
          <button 
            onClick={() => onNavigateToAuth('signup')}
            className="relative items-center justify-center p-[1px] overflow-hidden rounded-full font-medium text-[11px] uppercase tracking-wider text-neutral-800 dark:text-zinc-200 hover:scale-[1.02] transition-transform duration-300 group shadow-[0_0_50px_rgba(255,255,255,0.1)] dark:shadow-[0_0_50px_rgba(255,255,255,0.02)] inline-flex cursor-pointer"
          >
            {/* Animated glowing border effect */}
            <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#ffffff_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#ffffff_50%,#18181b_100%)] opacity-80" />
            
            {/* Inner core */}
            <span className="relative z-10 flex items-center gap-2 px-8 py-3 rounded-full bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              {/* Premium sweeping white shade loop */}
              <span className="absolute inset-0 rounded-full animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.8),50%,transparent,75%,rgba(255,255,255,0.8),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.2),50%,transparent,75%,rgba(255,255,255,0.2),100%)] mix-blend-overlay pointer-events-none" style={{ backgroundSize: '300% 100%' }} />
              
              <span className="relative z-10 font-bold tracking-widest text-xs flex items-center">
                START TRACKING SECURELY <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </span>
          </button>
        </div>
      </section>

      {/* Corporate Features Section */}
      <section id="features" className="py-20 px-6 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">Executive Features</span>
          <h2 className="font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased text-3xl mt-2 mb-4">
            <span className="bg-gradient-to-r from-neutral-950 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent">
              Zero bloat. Absolute technical performance.
            </span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Tickk bypasses bloated analytics tools and concentrates purely on pristine data, low latency, and absolute stealth integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Stealth 1x1 Pixel */}
          <motion.div 
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={cardVariants}
            className="p-8 bg-white/40 dark:bg-[#121215]/45 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/60 rounded-xl relative hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_30px_rgba(255,255,255,0.015)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group"
          >
            <div className="w-14 h-14 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 flex items-center justify-center mb-6 relative overflow-hidden" style={{ perspective: "1000px" }}>
              <motion.div
                animate={{
                  rotateZ: [0, 45, 90, 135, 180, 225, 270, 315, 360],
                  scale: [1, 1.2, 0.9, 1.2, 0.9, 1.2, 0.9, 1.2, 1],
                  rotateY: [0, 10, -10, 10, -10, 10, -10, 10, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-[-50%] border-[0.5px] border-dashed border-neutral-300 dark:border-neutral-700 rounded-full opacity-20"
              />
              <motion.div
                animate={{
                  scaleY: [1, 1, 1, 0.1, 1, 1, 1],
                  scaleX: [1, 1, 1.1, 1.2, 1.1, 1, 1],
                  rotateZ: [0, 5, -5, 0],
                  filter: ['drop-shadow(0 0 2px rgba(167, 139, 250, 0))', 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.6))', 'drop-shadow(0 0 2px rgba(167, 139, 250, 0))']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.4, 0.45, 0.5, 0.55, 0.6, 1]
                }}
                className="text-neutral-900 dark:text-white relative z-10"
              >
                <Eye className="w-6 h-6" strokeWidth={1.5} />
              </motion.div>
            </div>
            <h3 className="font-display font-medium text-lg text-neutral-900 dark:text-white mb-2">Stealth 1x1 Pixel</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
              Invisible transparent GIF injection allows zero recipient friction, fully bypassing heavy analytics blocker shields with absolute high-speed delivery.
            </p>
          </motion.div>

          {/* Card 2: Geographic Fingerprinting */}
          <motion.div 
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={cardVariants}
            className="p-8 bg-white/40 dark:bg-[#121215]/45 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/60 rounded-xl relative hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_30px_rgba(255,255,255,0.015)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 flex items-center justify-center mb-6 relative overflow-hidden flex-col" style={{ perspective: "1000px" }}>
              <motion.div
                animate={{
                  rotateX: [60, 60],
                  scale: [0.5, 2],
                  opacity: [0.8, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute inset-0 m-auto w-10 h-10 border border-emerald-400 dark:border-emerald-500 rounded-full"
              />
              <motion.div
                animate={{
                  y: [0, -8, 0, -3, 0],
                  rotateY: [0, 180, 360],
                  scale: [1, 1.1, 0.9, 1.05, 1],
                  filter: ['drop-shadow(0 0 2px rgba(52, 211, 153, 0))', 'drop-shadow(0 4px 6px rgba(52, 211, 153, 0.4))', 'drop-shadow(0 0 2px rgba(52, 211, 153, 0))']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.5, 0.75, 1]
                }}
                className="text-neutral-900 dark:text-white relative z-10 origin-bottom"
              >
                <MapPin className="w-6 h-6" strokeWidth={1.5} />
              </motion.div>
            </div>
            <h3 className="font-display font-medium text-lg text-neutral-900 dark:text-white mb-2">Geographic Fingerprinting</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
              Detect recipient country, city, browser type, and current client application instantly using isolated premium network packet resolution.
            </p>
          </motion.div>

          {/* Card 3: Trackable Redirection Links */}
          <motion.div 
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={cardVariants}
            className="p-8 bg-white/40 dark:bg-[#121215]/45 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/60 rounded-xl relative hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_30px_rgba(255,255,255,0.015)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 flex items-center justify-center mb-6 relative overflow-hidden" style={{ perspective: "1000px" }}>
              <motion.div
                animate={{
                  scale: [0, 0, 1.5, 0],
                  opacity: [0, 0, 0.8, 0],
                  borderWidth: ["1px", "2px", "0px", "0px"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  times: [0, 0.4, 0.5, 0.75]
                }}
                className="absolute w-6 h-6 border-cyan-400 dark:border-cyan-500 rounded-full top-[14px] left-[14px] z-0"
              />
              <motion.div
                animate={{
                  x: [16, 16, 0, -2, 0, 16],
                  y: [16, 16, 0, -2, 0, 16],
                  scale: [1, 1, 1, 0.85, 1, 1],
                  rotateZ: [0, -15, 0, 0, 0, 0],
                  filter: ['drop-shadow(0 0 2px rgba(34, 211, 238, 0))', 'drop-shadow(0 4px 6px rgba(34, 211, 238, 0.4))', 'drop-shadow(0 0 2px rgba(34, 211, 238, 0))']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.25, 0.4, 0.45, 0.5, 1]
                }}
                className="text-neutral-900 dark:text-white relative z-10 drop-shadow-md"
              >
                <MousePointerClick className="w-6 h-6" strokeWidth={1.5} />
              </motion.div>
            </div>
            <h3 className="font-display font-medium text-lg text-neutral-900 dark:text-white mb-2">Trackable Links</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
              Wrap outbound payload URLs in cryptographic redirect gates. Capture deep click insights without modifying the end-user destination experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Extra Features Section (Added as requested) */}
      <section className="py-20 bg-transparent border-t border-neutral-200/40 dark:border-neutral-800/60 px-6 lg:px-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">Advanced Telemetry Suite</span>
            <h2 className="font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased text-3xl mt-2 mb-4">
              <span className="bg-gradient-to-r from-neutral-950 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent">
                Designed for enterprise security operations
              </span>
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              Take complete control over your outgoing email pipeline with administrative tools, custom networks, and white-label delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 4: White-Label Domains */}
            <motion.div 
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardVariants}
              className="p-8 bg-white/40 dark:bg-[#121215]/45 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/60 rounded-xl relative hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_30px_rgba(255,255,255,0.015)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-neutral-100/80 dark:bg-neutral-900/80 flex items-center justify-center mb-6 relative overflow-hidden">
                {/* Orbit track ring around the domain */}
                <div className="absolute w-7 h-7 rounded-full border border-dashed border-neutral-300 dark:border-neutral-800/80 pointer-events-none opacity-50" />
                
                {/* Revolving Custom Subdomain link node */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute w-7 h-7 pointer-events-none"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.2 h-1.2 rounded-full bg-neutral-800 dark:bg-neutral-300" />
                </motion.div>

                {/* Central Earth Globe rotating slowly */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="text-neutral-900 dark:text-white relative z-10"
                >
                  <Globe className="w-5 h-5" />
                </motion.div>
              </div>
              <h4 className="font-semibold text-sm text-neutral-900 dark:text-white mb-1.5">White-Label Domains</h4>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">
                Mask tracking links behind your private subdomain (e.g. `links.yourfirm.com`) to preserve domain reputation and pass security checks.
              </p>
            </motion.div>

            {/* Card 5: Instant Webhooks */}
            <motion.div 
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardVariants}
              className="p-8 bg-white/40 dark:bg-[#121215]/45 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/60 rounded-xl relative hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_30px_rgba(255,255,255,0.015)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-neutral-100/80 dark:bg-neutral-900/80 flex items-center justify-center mb-6 relative overflow-hidden">
                {/* Clean horizontal transfer line (no full-box flash) */}
                <div className="absolute w-8 h-px bg-neutral-200 dark:bg-neutral-800/80 top-1/2 left-2 pointer-events-none" />
                
                {/* High-speed webhook data packet dot */}
                <motion.div
                  animate={{
                    x: [-12, 12],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.8, 1]
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-neutral-800 dark:bg-neutral-200 z-10"
                  style={{ top: "calc(50% - 3px)", left: "50%" }}
                />

                {/* Webhook Zap trigger icon with responsive scale-blink */}
                <motion.div
                  animate={{
                    scale: [1, 1, 1.25, 1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.45, 0.5, 0.55, 1]
                  }}
                  className="text-neutral-900 dark:text-white relative z-20"
                >
                  <Zap className="w-5 h-5 fill-current opacity-90" />
                </motion.div>
              </div>
              <h4 className="font-semibold text-sm text-neutral-900 dark:text-white mb-1.5">Instant Webhooks</h4>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">
                Stream real-time JSON payloads directly to your endpoint, Slack, or Discord whenever an email is read or link clicked.
              </p>
            </motion.div>

            {/* Card 6: SAML & Okta SSO */}
            <motion.div 
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardVariants}
              className="p-8 bg-white/40 dark:bg-[#121215]/45 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/60 rounded-xl relative hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_30px_rgba(255,255,255,0.015)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-neutral-100/80 dark:bg-neutral-900/80 flex items-center justify-center mb-6 relative overflow-hidden">
                {/* Lock rotating/securing loop (no background flash) */}
                <motion.div
                  animate={{
                    y: [0, 2, 0, 0],
                    rotate: [0, -12, 0, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.35, 0.5, 1]
                  }}
                  className="text-neutral-900 dark:text-white relative z-10"
                >
                  <Lock className="w-5 h-5" />
                </motion.div>
              </div>
              <h4 className="font-semibold text-sm text-neutral-900 dark:text-white mb-1.5">SAML & Okta SSO</h4>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">
                Federated login with Google Workspace, Microsoft Azure, and Okta. Guarantee secure team onboarding and dynamic workspace roles.
              </p>
            </motion.div>

            {/* Card 7: Permission Matrix */}
            <motion.div 
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardVariants}
              className="p-8 bg-white/40 dark:bg-[#121215]/45 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/60 rounded-xl relative hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_30px_rgba(255,255,255,0.015)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-neutral-100/80 dark:bg-neutral-900/80 flex items-center justify-center mb-6 relative overflow-hidden">
                {/* 3D vertical accordion layer breathing (no background flash) */}
                <motion.div
                  animate={{
                    scaleY: [1, 0.85, 1.1, 1],
                    y: [0, -2, 1, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-neutral-900 dark:text-white relative z-10"
                >
                  <Layers className="w-5 h-5" />
                </motion.div>
              </div>
              <h4 className="font-semibold text-sm text-neutral-900 dark:text-white mb-1.5">Permission Matrix</h4>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">
                Fine-grain workspace access controls. Assign granular access matrices (Admins, Authors, Viewers) to protect legal log storage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Unified Multi-Provider Node Cluster Section */}
      <section className="py-24 bg-transparent border-t border-neutral-200/40 dark:border-neutral-800/60 px-6 lg:px-16 transition-colors duration-300 relative overflow-hidden">
        {/* Elite Glassmorphism Glow Layer */}
        <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
          <div className="absolute w-[100vw] h-[100vw] sm:w-[60vw] sm:h-[60vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-neutral-300/30 via-transparent to-neutral-400/20 dark:from-zinc-800/30 dark:via-transparent dark:to-zinc-700/20 rounded-full blur-[140px] pointer-events-none" />
        </div>
        
        <div className="max-w-7xl mx-auto w-full">
          <div className="bg-white/30 dark:bg-zinc-950/40 backdrop-blur-3xl border border-neutral-200/50 dark:border-zinc-800/60 rounded-3xl p-10 lg:p-16 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_rgba(255,255,255,0.02)]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-neutral-50/10 dark:from-white/5 dark:via-transparent dark:to-zinc-900/10 pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="flex flex-col items-start text-left space-y-6">
                <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-800 dark:text-neutral-400 uppercase inline-flex items-center gap-2">
                  <Network className="w-3.5 h-3.5" /> UNIFIED MULTI-PROVIDER NODE CLUSTER
                </span>
                
                <h2 className="font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased text-3xl sm:text-4xl md:text-5xl leading-[1.1]">
                  <span className="bg-gradient-to-br from-neutral-900 via-neutral-600 to-neutral-500 dark:from-white dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
                    Seamlessly orchestrate your entire outbound telemetry.
                  </span>
                </h2>
                
                <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed max-w-lg font-sans">
                  Consolidate your tracking footprint effortlessly. Bind disparate exchange pathways—from Gmail, Outlook, Yahoo, and Custom SMTP relays—into a singular, pristine executive dashboard. Toggle between institutional pathways without losing a single tracking frame.
                </p>
                
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur shadow-sm border border-neutral-200/50 dark:border-zinc-800/60">
                    <Chrome className="w-4 h-4 text-neutral-700 dark:text-zinc-300" />
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur shadow-sm border border-neutral-200/50 dark:border-zinc-800/60">
                    <Mail className="w-4 h-4 text-neutral-700 dark:text-zinc-300" />
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur shadow-sm border border-neutral-200/50 dark:border-zinc-800/60">
                    <Server className="w-4 h-4 text-neutral-700 dark:text-zinc-300" />
                  </div>
                  <span className="text-xs font-mono font-medium text-neutral-500 ml-2">UNIVERSAL COMPATIBILITY</span>
                </div>
              </div>
              
              {/* Glass Mockup Graphic */}
              <div className="w-full relative h-[320px] rounded-2xl border border-neutral-200/40 dark:border-zinc-800/50 bg-neutral-100/30 dark:bg-black/20 backdrop-blur-xl overflow-hidden shadow-inner flex items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] dark:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer-bg_6s_ease-in-out_infinite]" />
                
                <div className="relative z-10 w-3/4 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-xl border border-neutral-200/50 dark:border-zinc-800/50 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-3 mb-4 border-b border-neutral-200/50 dark:border-zinc-800/50 pb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-neutral-600 dark:text-zinc-400">NODE CLUSTER ACTIVE</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-neutral-50/50 dark:bg-black/30 p-2.5 rounded border border-neutral-200/30 dark:border-zinc-800/30">
                      <span className="text-xs font-medium text-neutral-800 dark:text-zinc-200 flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center"><Mail className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" /></div> Exchange Alpha</span>
                      <span className="text-[10px] font-mono text-neutral-500">ROUTING</span>
                    </div>
                    <div className="flex items-center justify-between bg-neutral-50/50 dark:bg-black/30 p-2.5 rounded border border-neutral-200/30 dark:border-zinc-800/30">
                      <span className="text-xs font-medium text-neutral-800 dark:text-zinc-200 flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center"><Mail className="w-2.5 h-2.5 text-orange-600 dark:text-orange-400" /></div> Exchange Beta</span>
                      <span className="text-[10px] font-mono text-neutral-500">ROUTING</span>
                    </div>
                    <div className="flex items-center justify-between bg-neutral-50/50 dark:bg-black/30 p-2.5 rounded border border-neutral-200/30 dark:border-zinc-800/30 opacity-60">
                      <span className="text-xs font-medium text-neutral-800 dark:text-zinc-200 flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-neutral-500/20 flex items-center justify-center"><Server className="w-2.5 h-2.5 text-neutral-600 dark:text-neutral-400" /></div> SMTP Core</span>
                      <span className="text-[10px] font-mono text-neutral-500">STANDBY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Extension Download Section */}
      <section className="py-24 bg-transparent border-t border-neutral-200/40 dark:border-neutral-800/60 px-6 lg:px-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto w-full">
          <div className="bg-white/40 dark:bg-[#121215]/45 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/60 rounded-2xl p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_40px_rgba(255,255,255,0.015)]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-900/5 dark:via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="flex-1 space-y-6 relative z-10">
              <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-800 dark:text-neutral-400 uppercase">PREMIUM EXTENSION</span>
              <h2 className="font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased text-3xl sm:text-4xl">
                <span className="bg-gradient-to-r from-neutral-950 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent">
                  Track directly from your inbox
                </span>
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-lg leading-relaxed">
                Install our official Chrome Extension to inject tracking pixels seamlessly from Gmail, Outlook, or Yahoo Mail without ever leaving your composer.
              </p>
              
              <div className="pt-2">
                <a 
                  href="#"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-neutral-900 hover:bg-black dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-black text-sm font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg shadow-sm border border-neutral-950 dark:border-neutral-200 group"
                >
                  <Puzzle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Download for Chrome</span>
                </a>
              </div>
            </div>

            <div className="w-full md:w-[400px] aspect-video bg-neutral-100/50 dark:bg-[#1a1a1e]/50 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden relative shadow-inner flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 dark:opacity-40 flex items-center justify-center">
                 <div className="w-64 h-64 bg-neutral-400 dark:bg-neutral-500 rounded-full blur-[80px]" />
              </div>
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 bg-white dark:bg-[#202024] p-4 rounded-lg border border-neutral-200/60 dark:border-neutral-700/60 shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded bg-[#ea4335]/10 dark:bg-[#ea4335]/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#ea4335]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-neutral-900 dark:text-white mb-0.5">Tickk Extension</div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400">Ready to inject tracking</div>
                </div>
                <div className="ml-4 w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
                  <Check className="w-3 h-3 text-emerald-500" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer API Section */}
      <section className="py-24 bg-transparent border-t border-neutral-200/40 dark:border-neutral-800/60 px-6 lg:px-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start text-left space-y-6">
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-800 dark:text-neutral-400 uppercase inline-flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" /> DEVELOPER API
            </span>
            <h2 className="font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased text-3xl sm:text-4xl leading-[1.1]">
              <span className="bg-gradient-to-r from-neutral-950 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent">
                Integrate tracking flows with two lines of code.
              </span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed max-w-lg font-sans">
              Inject silent tracking pixel generation directly into your application backends. Authenticate your API key and receive absolute real-time stream callbacks instantly. Complete enterprise-grade intelligence without the overhead.
            </p>
          </div>
          <div className="w-full relative">
            <DeveloperTerminalAnimation />
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section id="pricing" className="py-24 bg-transparent border-y border-neutral-200/40 dark:border-neutral-800/60 px-6 lg:px-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase inline-flex items-center justify-center gap-2">PRICING TIERS</span>
            <h2 className="font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased text-3xl sm:text-4xl mt-3 mb-4">
              <span className="bg-gradient-to-r from-neutral-950 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent">
                Simple pricing for elite organizations
              </span>
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              Start free today and upgrade as your corporate volume expands. Clear, predictable billing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {/* Hobby Tier */}
            <div className="bg-white/70 dark:bg-[#121215]/70 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-800/80 rounded-xl p-8 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div>
                                <div className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200">
                  <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#a1a1aa_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#71717a_50%,#18181b_100%)] opacity-80" />
                  <span className="relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <span className="absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(161,161,170,0.4),50%,transparent,75%,rgba(161,161,170,0.4),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(113,113,122,0.3),50%,transparent,75%,rgba(113,113,122,0.3),100%)] mix-blend-overlay pointer-events-none" style={{ backgroundSize: '300% 100%' }} />
                    <span className="relative z-10">STARTER</span>
                  </span>
                </div>
                <div className="flex items-baseline mt-4 mb-6">
                  <span className="text-2xl font-sans font-light tracking-tighter text-neutral-400 dark:text-neutral-500 mr-0.5">$</span>
                  <span className="text-5xl font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased">0</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs font-sans ml-2">/ forever</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed mb-6">Perfect for individual freelancers looking to test basic pixel tracking.</p>
                
                <ul className="space-y-4 text-xs text-neutral-600 dark:text-neutral-400 mb-8 border-t border-neutral-100 dark:border-neutral-800 pt-6">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                    <span>Up to 15 active tracked emails</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                    <span>Standard transparent tracking pixel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                    <span>24-hour activity log duration</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigateToAuth('signup')}
                className="w-full py-2.5 bg-neutral-100 dark:bg-neutral-800/60 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-neutral-200 dark:border-neutral-700/50"
            >
              Get Started Free
            </button>
          </div>

          {/* Growth Tier (Most Popular) */}
          <div className="bg-white/80 dark:bg-[#16161b]/85 backdrop-blur-md border-2 border-neutral-900 dark:border-neutral-400 rounded-xl p-8 flex flex-col justify-between relative shadow-[0_10px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(255,255,255,0.03)] hover:scale-[1.01] transition-all duration-300">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-neutral-900 dark:bg-neutral-200 text-white dark:text-black text-[9px] font-mono font-bold tracking-widest uppercase rounded-full border border-neutral-900 dark:border-neutral-300 shadow-sm">
              Most Popular
            </div>
            <div>
                              <div className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-200">
                  <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#d1fae5_0%,#10b981_50%,#d1fae5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#064e3b_0%,#059669_50%,#064e3b_100%)] opacity-80" />
                  <span className="relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <span className="absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(16,185,129,0.3),50%,transparent,75%,rgba(16,185,129,0.3),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(5,150,105,0.3),50%,transparent,75%,rgba(5,150,105,0.3),100%)] mix-blend-overlay pointer-events-none" style={{ backgroundSize: '300% 100%' }} />
                    <span className="relative z-10">GROWTH</span>
                  </span>
                </div>
                <div className="flex items-baseline mt-4 mb-6">
                  <span className="text-2xl font-sans font-light tracking-tighter text-neutral-500 dark:text-neutral-400 mr-0.5">$</span>
                  <span className="text-5xl font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased">29</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs font-sans ml-2">/ month</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed mb-6">For expanding teams requiring real-time updates and permanent stats storage.</p>
                
                <ul className="space-y-4 text-xs text-neutral-600 dark:text-neutral-400 mb-8 border-t border-neutral-200 dark:border-neutral-800 pt-6">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                    <span className="font-semibold text-neutral-900 dark:text-zinc-200">Unlimited active mail trackers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                    <span>Full Geolocation and Device analytics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                    <span>Trackable click redirects (URL integration)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                    <span>Instant API access and Webhook triggers</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigateToAuth('signup')}
                className="w-full py-2.5 bg-neutral-900 dark:bg-neutral-850 hover:bg-black dark:hover:bg-neutral-750 text-white hover:opacity-95 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-neutral-950 dark:border-neutral-750 shadow-sm"
              >
                Join Growth Tier
              </button>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-white/70 dark:bg-[#121215]/70 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-800/80 rounded-xl p-8 flex flex-col justify-between hover:border-neutral-500/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] group">
              <div>
                                <div className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-200">
                  <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fef3c7_0%,#f59e0b_50%,#fef3c7_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#451a03_0%,#d97706_50%,#451a03_100%)] opacity-80" />
                  <span className="relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <span className="absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(245,158,11,0.3),50%,transparent,75%,rgba(245,158,11,0.3),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(217,119,6,0.3),50%,transparent,75%,rgba(217,119,6,0.3),100%)] mix-blend-overlay pointer-events-none" style={{ backgroundSize: '300% 100%' }} />
                    <span className="relative z-10">ENTERPRISE</span>
                  </span>
                </div>
                <div className="flex items-baseline mt-4 mb-6">
                  <span className="text-2xl font-sans font-light tracking-tighter text-neutral-400 dark:text-neutral-500 mr-0.5">$</span>
                  <span className="text-5xl font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased">149</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs font-sans ml-2">/ month</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed mb-6">For major security teams, law firms, and multi-tenant enterprise platforms.</p>
                
                <ul className="space-y-4 text-xs text-neutral-600 dark:text-neutral-400 mb-8 border-t border-neutral-100 dark:border-neutral-800 pt-6">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                    <span>Custom domain pixel masking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                    <span>Priority SSO and SAML authentication</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                    <span>Whitelabel client portals & dedicated servers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                    <span>Dedicated SLAs & custom webhooks setup</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigateToAuth('signup')}
                className="w-full py-2.5 bg-neutral-100 dark:bg-neutral-800/60 hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-black text-neutral-800 dark:text-white text-xs font-semibold rounded-lg transition-all cursor-pointer border border-neutral-200 dark:border-neutral-700/50 shadow-sm"
              >
                Contact Sales Office
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EXTREME PREMIUM FOOTER */}
      <footer className="relative mt-20 pt-20 pb-10 overflow-hidden border-t border-neutral-200/50 dark:border-zinc-800/80">
        {/* Ambient Footer Glow */}
        <div className="absolute inset-0 bg-neutral-50 dark:bg-[#050506] -z-20"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[300px] bg-neutral-300/30 dark:bg-zinc-800/30 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        {/* Top Border Gradient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-neutral-400 dark:via-zinc-500 to-transparent opacity-50" />

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 relative z-10">
            
            {/* Brand Column */}
            <div className="lg:col-span-4 flex flex-col items-start text-left">
              <span className="flex items-center gap-3 select-none mb-4">
                <img src="/logo.svg" alt="Tickk" className="h-5 dark:invert" />
              </span>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-6 font-sans max-w-xs">
                The apex tier of email intelligence. Silent telemetry, absolute read receipts, and geographic tracking engineered for the boardroom.
              </p>
              
              {/* Trust Badges */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/60 dark:bg-zinc-900/50 backdrop-blur-sm border border-neutral-200 dark:border-zinc-800 text-[10px] font-medium text-neutral-600 dark:text-neutral-400 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" /> GDPR Ready
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/60 dark:bg-zinc-900/50 backdrop-blur-sm border border-neutral-200 dark:border-zinc-800 text-[10px] font-medium text-neutral-600 dark:text-neutral-400 shadow-sm">
                  <Lock className="w-3.5 h-3.5" /> SOC-2 Type II
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div className="flex flex-col gap-4 text-left">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">Platform</h4>
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Telemetry Engine</a>
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Pixel Injection</a>
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Link Cloaking</a>
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Global Routing</a>
              </div>
              <div className="flex flex-col gap-4 text-left">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">Solutions</h4>
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Executive Suites</a>
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Legal Counsel</a>
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Venture Capital</a>
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Elite Sales</a>
              </div>
              <div className="flex flex-col gap-4 text-left">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">Resources</h4>
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Documentation</a>
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">API Reference</a>
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">System Status</a>
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Change Log</a>
              </div>
              <div className="flex flex-col gap-4 text-left">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">Company</h4>
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">About Us</a>
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Security</a>
                <button onClick={() => onNavigateToLegal?.('privacy')} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors text-left">Privacy Policy</button>
                <button onClick={() => onNavigateToLegal?.('terms')} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors text-left">Terms of Service</button>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-neutral-200/50 dark:border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-4">
              <span>© {new Date().getFullYear()} TICKK Intelligence. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-6">
               <a href="#" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"><Globe className="w-4 h-4" /></a>
               <a href="#" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"><Network className="w-4 h-4" /></a>
               <a href="#" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"><Mail className="w-4 h-4" /></a>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono tracking-wider shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              CORE SYSTEMS ONLINE
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
