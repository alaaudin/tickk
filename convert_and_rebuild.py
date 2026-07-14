import re

# Read restored code
with open("Dashboard_restored.tsx", "r") as f:
    restored_code = f.read()

custom_tags = ['c5', 'a6e', 'mre', 's5', 'w6', 'l5', 'cre', 'zB', 'y6', 'e6e', 'dre', 'ire', 'jre', 'en', 't8', 'f5', 'z0', 'qD', 'u5', 'jO', 'gp', 'kp', 'eae', 'qce', 'r6e', 'd5', 'nbe', 'nae', 'xre', 'hi', 'wp', 'f', 'lt']

# Capitalize custom tag occurrences in JSX
pattern = r'(</?)([a-zA-Z0-9_]+)'
def replacer(match):
    prefix = match.group(1)
    tag_name = match.group(2)
    if tag_name in custom_tags:
        if tag_name == 'zB':
            return prefix + 'ZB'
        return prefix + tag_name.capitalize()
    return match.group(0)

converted_code = re.sub(pattern, replacer, restored_code)

header_and_helpers = """import { ThemeToggle } from "./ThemeToggle";
import { useToast } from "./Toast";
import GlobalReachMap from "./GlobalReachMap";
import {
  GmailLogo,
  OutlookLogo,
  SalesforceLogo,
  HubspotLogo,
  ZapierLogo,
  SlackLogo,
  YahooLogo,
  AppleLogo, NotionLogo, DiscordLogo, WebhookLogo,
} from "./OfficialLogos";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";
import { 
  Bell,
  Monitor,
  Smartphone,
  Users,
  Network,
  Mail,
  MailOpen, 
  Eye, 
  Plus, 
  Copy, 
  Check, 
  X,
  Minus,
  Settings, 
  LogOut, 
  RefreshCw, 
  CheckCircle, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  CreditCard, 
  Lock, 
  Shield, 
  Key, 
  Download,
  Terminal,
  Activity,
  User,
  ExternalLink,
  ChevronRight,
  MousePointerClick,
  TrendingUp,
  FileText,
  AlertCircle,
  Sun,
  Moon,
  Sparkles,
  Volume2,
  VolumeX,
  Link2,
  Award,
  LifeBuoy,
  Send,
  MessageSquare,
  Inbox,
  Gift,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Star,
  Printer,
  CornerUpLeft,
  CornerUpRight,
  Trash2,
  BadgeCheck,
  MoreHorizontal,
  EyeOff,
  Share2,
  Calendar,
  ShieldAlert,
  AlertTriangle
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";
import { Tracker, TrackerStats, OpenLog, Ticket, } from "../types";

function AnimatedCounter({ value, duration = 1500 }: { value: number, duration?: number }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(value * easeOut));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <>{count}</>;
}

interface DashboardProps {
  token: string;
  onLogout: () => void;
  userEmail: string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const getProviderLogo = (email: string, className = "w-full h-full") => {
  const emailLower = email.toLowerCase();
  if (emailLower.includes("outlook.com") || emailLower.includes("hotmail.com") || emailLower.includes("live.com")) return <OutlookLogo className={className} />;
  if (emailLower.includes("yahoo.com") || emailLower.includes("aol.com")) return <YahooLogo className={`${className} text-[#6001D2]`} />;
  if (emailLower.includes("icloud.com") || emailLower.includes("mac.com") || emailLower.includes("me.com")) return <AppleLogo className={`${className} text-black dark:text-white`} />;
  return <GmailLogo className={className} />;
};

const getEmailProvider = (email: string) => {
  const emailLower = email.toLowerCase();
  if (emailLower.includes("outlook.com") || emailLower.includes("hotmail.com") || emailLower.includes("live.com")) return "outlook";
  if (emailLower.includes("yahoo.com") || emailLower.includes("aol.com")) return "yahoo";
  if (emailLower.includes("icloud.com") || emailLower.includes("mac.com") || emailLower.includes("me.com")) return "apple";
  return "gmail";
};

const playSuccessChime = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    console.error("Audio failed", e);
  }
};

const generateDefaultHtmlBody = (subject: string, recipient: string, linkUrl?: string, trackerId?: string) => {
  const origin = window.location.origin || "https://tickk.io";
  const pixelUrl = trackerId ? origin + "/api/track/" + trackerId + "/pixel.png" : "";
  const trackedLink = linkUrl ? origin + "/api/track/" + trackerId + "/click?url=" + encodeURIComponent(linkUrl) : "#";

  return "<!DOCTYPE html><html><head><meta charset='utf-8'><style>body { font-family: sans-serif; padding: 20px; background: #fafafa; color: #333; } .card { background: white; padding: 30px; border-radius: 8px; border: 1px solid #ddd; max-width: 600px; margin: 0 auto; } h1 { font-size: 20px; margin-bottom: 10px; color: #111; } p { font-size: 14px; line-height: 1.5; color: #555; } .btn { display: inline-block; background: #000; color: #fff !important; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px; font-weight: 500; }</style></head><body><div class='card'><h1>" + subject + "</h1><p>This email has been dispatched to " + recipient + ".</p>" + (linkUrl ? "<p>Please review the requested documents by clicking below:</p><a href='" + trackedLink + "' class='btn'>View Proposal</a>" : "") + "</div><img src='" + pixelUrl + "' width='1' height='1' style='display:none' referrerPolicy='no-referrer' /></body></html>";
};

const getTrackerHtmlBody = (tracker: Tracker) => {
  if (!tracker) return "";
  
  let html = tracker.htmlBody;
  if (!html) {
    const origin = window.location.origin || "https://tickk.io";
    const pixelUrl = origin + "/api/track/" + tracker.id + "/pixel.png";
    const trackedLink = tracker.linkUrl ? origin + "/api/track/" + tracker.id + "/click?url=" + encodeURIComponent(tracker.linkUrl) : "#";
    
    html = "<!DOCTYPE html><html><head><meta charset='utf-8'><style>body { font-family: sans-serif; padding: 20px; background: #fafafa; color: #333; } .card { background: white; padding: 30px; border-radius: 8px; border: 1px solid #ddd; max-width: 600px; margin: 0 auto; } h1 { font-size: 20px; margin-bottom: 10px; color: #111; } p { font-size: 14px; line-height: 1.5; color: #555; } .btn { display: inline-block; background: #000; color: #fff !important; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px; font-weight: 500; }</style></head><body><div class='card'><h1>" + (tracker.title || "Dispatch Signal") + "</h1><p>This email has been dispatched to " + tracker.recipient + ".</p>" + (tracker.linkUrl ? "<p>Please review the requested documents by clicking below:</p><a href='" + trackedLink + "' class='btn'>View Proposal</a>" : "") + "</div><img src='" + pixelUrl + "' width='1' height='1' style='display:none' referrerPolicy='no-referrer' /></body></html>";
  } else {
    const origin = window.location.origin || "https://tickk.io";
    const pixelUrl = origin + "/api/track/" + tracker.id + "/pixel.png";
    const pixelTag = "<img src='" + pixelUrl + "' width='1' height='1' style='display:none' referrerPolicy='no-referrer' />";
    if (!html.includes("pixel.png") && !html.includes(tracker.id)) {
      html += pixelTag;
    }
  }
  return html;
};

// Aliases for the restored component
const O = React;
const Tr = React;
const UB = useToast;
const Ut = jsPDF;
const Im = playSuccessChime;
const uk = getProviderLogo;
const t6e = getEmailProvider;
const W5 = getTrackerHtmlBody;
const XR = (time: string | number | Date) => {
  return new Date(time).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
};
const KR = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

// Component Tag Mappings
const C5 = Clock;
const Mre = LogOut;
const S5 = BadgeCheck;
const L5 = CircleCheckBig;
const Cre = LifeBuoy;
const ZB = FileText;
const Dre = Link2;
const Ire = Key;
const Jre = PanelLeftOpen;
const En = Check;
const F5 = Trash2;
const Z0 = CornerUpLeft;
const QD = CreditCard;
const U5 = CornerUpRight;
const JO = Minus;
const Gp = Sparkles;
const Kp = Mail;
const Eae = User;
const D5 = Plus;
const Nae = Users;
const Xre = Menu;
const Hi = AnimatePresence;
const Wp = Lock;
const Lt = motion;
const F = React;
const T8 = ThemeToggle;
const E6e = AreaChart;
const Nbe = ResponsiveContainer;
const Qce = DiscordLogo;
const R6e = () => <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="w-3.5 h-3.5 object-contain" referrerPolicy="no-referrer" />;
const A6e = () => <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Microsoft_Outlook_Icon_%282025%E2%80%93present%29.svg" alt="Outlook" className="w-3.5 h-3.5 object-contain" referrerPolicy="no-referrer" />;
const Y6 = GmailLogo;
const W6 = YahooLogo;
const R6e_tag = R6e;
const A6e_tag = A6e;
"""

# Replace the signature 'function i6e({' with 'export default function Dashboard({'
converted_code = converted_code.replace("function i6e({", "export default function Dashboard({")

final_code = header_and_helpers + "\n\n" + converted_code

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(final_code)

print("Dashboard.tsx successfully converted and written!")
