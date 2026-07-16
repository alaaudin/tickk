import { ThemeToggle } from "./ThemeToggle";
import { useToast } from "./Toast";
import GlobalReachMap from "./GlobalReachMap";
import PrivacySettingsPanel from "./PrivacySettingsPanel";
import ManualEmailDispatch from "./ManualEmailDispatch";
import DeveloperDocumentation from "./DeveloperDocumentation";
import MobileSettingsPanel from "./MobileSettingsPanel";
import DomainConfiguration from "./DomainConfiguration";
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
import { CustomSelect } from "./CustomSelect";

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
  AlertTriangle,
  Building2,
  ArrowLeft,
  ArrowRight,
  Info,
  Layers,
  Globe,
  ShieldCheck,
  CircleCheckBig,
  Puzzle,
  Ellipsis
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell
} from "recharts";
import { Tracker, TrackerStats, OpenLog, Ticket, } from "../types";
import { QuickStartGuide } from "./QuickStartGuide";
import { NotificationSettingsPanel } from "./NotificationSettingsPanel";
import { MailSettingsPanel } from "./MailSettingsPanel";
import { AccountSettingsPanel } from "./AccountSettingsPanel";
import { SubscriptionSettingsPanel } from "./SubscriptionSettingsPanel";
import { TeamMembersSettingsPanel } from "./TeamMembersSettingsPanel";
import { TelemetryLiveAlerts, triggerTelemetryAlert } from "./TelemetryLiveAlerts";

// D3 Projection global state variables
let Jo: any, Zo: any, Qo: any, $N: any, GN: any, YN: any, WN: any;

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
  userId?: string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const RENDER_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://tickk-backend.onrender.com";

const mapBackendTracker = (raw: any): any => ({
  id: raw.id,
  userId: raw.user_id,
  recipient: raw.recipient,
  subject: raw.subject,
  linkUrl: raw.link_url || undefined,
  createdAt: raw.created_at,
  status: (raw.status || "unopened").toLowerCase() as 'opened' | 'unopened',
  openCount: raw.open_count || 0,
  clickCount: raw.click_count || 0,
  lastOpened: raw.updated_at && raw.open_count > 0 ? raw.updated_at : null,
  testSent: false,
  logs: raw.logs ? raw.logs.map((l: any) => ({
    id: l.id,
    timestamp: l.timestamp || l.created_at,
    ip: l.ip || "0.0.0.0",
    userAgent: l.user_agent || "Unknown",
    country: l.country || "Unknown",
    city: l.city || "Unknown",
    device: l.device || "Unknown",
    browser: l.browser || "Unknown",
    isSimulated: false,
    type: (l.type || "open") as 'open' | 'click',
  })) : [],
});

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

    html = "<!DOCTYPE html><html><head><meta charset='utf-8'><style>body { font-family: sans-serif; padding: 20px; background: #fafafa; color: #333; } .card { background: white; padding: 30px; border-radius: 8px; border: 1px solid #ddd; max-width: 600px; margin: 0 auto; } h1 { font-size: 20px; margin-bottom: 10px; color: #111; } p { font-size: 14px; line-height: 1.5; color: #555; } .btn { display: inline-block; background: #000; color: #fff !important; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px; font-weight: 500; }</style></head><body><div class='card'><h1>" + (tracker.subject || "Dispatch Signal") + "</h1><p>This email has been dispatched to " + tracker.recipient + ".</p>" + (tracker.linkUrl ? "<p>Please review the requested documents by clicking below:</p><a href='" + trackedLink + "' class='btn'>View Proposal</a>" : "") + "</div><img src='" + pixelUrl + "' width='1' height='1' style='display:none' referrerPolicy='no-referrer' /></body></html>";
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
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
};

// Custom Tag Assignments
const C5 = Clock;
const Mre = LogOut;
const S5 = BadgeCheck;
const L5 = CircleCheckBig;
const Cre = LifeBuoy;
const ZB = FileText;
const Dre = Link2;
const Ire = Key;
const Jre = PanelLeftOpen;
const En_Icon = Check;
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

// Icon Assignments from extract_icon_names.py
const AO = MessageSquare;
const Bd = X;
const Bk = ShieldCheck;
const Bre = Share2;
const Cne = Bell;
const Dre_Icon = Moon; // Suffix to avoid conflict with Dre (Link2)
const FD = ChevronUp;
const Fd = Eye;
const Fre = Shield;
const GD = Gift;
const HD = Download;
const Hre = Smartphone;
const IB = Terminal;
const Id = Copy;
const Ik = Send;
const Lre = Puzzle;
const MB = EyeOff;
const Om = Search;
const Ore = Printer;
const Pne = Building2;
const Qre = TrendingUp;
const RB = Network;
const Rk = MousePointerClick;
const SO = ExternalLink;
const TO = RefreshCw;
const Tg = ChevronRight;
const Ud = Activity;
const Vd = ChevronDown;
const Vne = Calendar;
const Wne = Ellipsis;
const Wre = Star;
const YD = Settings;
const _O = Inbox;
const _ne = ArrowLeft;
const _re = PanelLeftClose;
const wp = Lock;
const gp = Sparkles;
const kp = Mail;
const eae = User;
const d5 = Plus;
const nae = Users;
const xre = Menu;
const u5 = CornerUpRight;
const cre = LifeBuoy;
const f5 = Trash2;
const z0 = CornerUpLeft;
const jO = Minus;
const ire = Key;
const jre = PanelLeftOpen;
const zB = FileText;
const s5 = BadgeCheck;
const mre = LogOut;
const qD = CreditCard;
const dre = Link2;
const l5 = CircleCheckBig;
const c5 = Clock;
const en = Check;
const w6 = YahooLogo;
const qce = DiscordLogo;
const r6e = NotionLogo;

// Missing specific variables from bundle
const PY = CartesianGrid;
const Q2e = Tooltip;
const EN = Area;
const HY = XAxis;
const GY = YAxis;
const N6 = SalesforceLogo;
const D6 = AppleLogo;
const $ce = SlackLogo;
const Bce = HubspotLogo;
const Fce = SalesforceLogo;
const Uce = ZapierLogo;
const Hce = WebhookLogo;
const Qd = CreditCard;
const Y5 = AnimatedCounter;
const Ice = GlobalReachMap;


export default function Dashboard({
  token: e,
  onLogout: t,
  userEmail: n,
  userId: supabaseUserId,
  theme: r,
  toggleTheme: o,
}) {
  const { toast: s } = UB(),
    [c, u] = O.useState("overview"),
    [d, p] = O.useState("last_30_days"),
    [m, b] = O.useState("last_30_days"),
    v = () => {
      const F =
        `PREMIUM PERFORMANCE INTELLIGENCE REPORT
Date: ` +
        new Date().toLocaleDateString() +
        `

EXECUTIVE SUMMARY
-----------------
Account Status: Excellent (98/100)
Delivery Rate: 99.9%
Signal Open Ratio: 78.4%
Click Conversion: 42.1%

MESSAGING METRICS OVERVIEW
--------------------------
Total Dispatches: 1,240
Total Opens: 980
Total Clicks: 412

DEVICE DISTRIBUTION
-------------------
Desktop Outlook / Windows: 56%
Mobile AppleMail / iOS: 31%
Web Browser Chrome / Safari: 13%

END OF REPORT`,
        ye = new Blob([F], {
          type: "text/plain",
        }),
        Be = URL.createObjectURL(ye),
        pt = document.createElement("a");
      ((pt.href = Be),
        (pt.download = "performance_report.txt"),
        document.body.appendChild(pt),
        pt.click(),
        document.body.removeChild(pt),
        URL.revokeObjectURL(Be),
        s("Report Downloaded Successfully", "success"));
    },
    [g, w] = O.useState([]),
    [E, S] = O.useState([]);
  O.useEffect(() => {
    if (E.length > 0) {
      const F = setTimeout(() => {
        S((ye) => ye.slice(1));
      }, 5e3);
      return () => clearTimeout(F);
    }
  }, [E]);
  const k = Tr.useRef(null),
    [L, P] = O.useState(!0),
    [C, z] = O.useState(3);
  O.useEffect(() => {
    if (!L) return;
    const F = setInterval(() => {
      z((ye) => (ye > 0 ? ye - 1 : 0));
    }, 1e3);
    return () => clearInterval(F);
  }, [L]);
  const [R, Q] = O.useState("all"),
    [G, q] = O.useState("7d"),
    [activeOptimizeTip, setActiveOptimizeTip] = O.useState<string | null>(null),
    [W, I] = O.useState(!1),
    [B, ie] = O.useState(!1),
    [U, re] = O.useState(!1),
    [Z, fe] = O.useState(() => {
      if (typeof window < "u")
        try {
          return !localStorage.getItem("tickk_beta_welcome_seen");
        } catch {
          return !1;
        }
      return !1;
    }),
    [le, be] = O.useState(!1),
    [ue, $] = O.useState(!0),
    [V, X] = O.useState([]),
    [ee, de] = O.useState(null),
    [xe, ge] = O.useState(!1),
    [Te, ve] = O.useState(""),
    [Ae, Ee] = O.useState("general"),
    [Ne, Je] = O.useState(!1),
    [it, oe] = O.useState(""),
    [Qe, wt] = O.useState(!1),
    [Vt, nt] = O.useState(!1),
    [Xe, vt] = O.useState(() => {
      try {
        return localStorage.getItem("soundEnabled") !== "false";
      } catch {
        return !0;
      }
    }),
    [At, Mt] = O.useState(""),
    [Cn, En] = O.useState(""),
    [tn, kn] = O.useState(""),
    [fn, St] = O.useState(""),
    [an, jt] = O.useState(null),
    [cr, yn] = O.useState(null),
    [xt, sn] = O.useState(null),
    [Yn, _t] = O.useState(!1),
    [J, ke] = O.useState(!1),
    [$e, et] = O.useState("visual"),
    [rt, st] = O.useState({}),
    [ct, pn] = O.useState(null),
    [Tt, Qn] = O.useState(null),
    [Jn, qt] = O.useState("Saqib Memon"),
    [ba, Bi] = O.useState(501),
    [Wn, Lr] = O.useState(n),
    [Vr, Ta] = O.useState(""),
    [ga, cc] = O.useState(""),
    [ls, $r] = O.useState(""),
    [cs, ro] = O.useState(null),
    [ti, vi] = O.useState("tracking"),
    [uc, us] = O.useState("gmail"),
    [Co, Yc] = O.useState("smtp.gmail.com"),
    [Wc, Xc] = O.useState("587"),
    [Rp, id] = O.useState(n || "saqibmemon9884@gmail.com"),
    [ni, gl] = O.useState(!1),
    [Ca, od] = O.useState("idle"),
    [xi, Ms] = O.useState("monthly"),
    [dc, ds] = O.useState(!1),
    [Oo, yi] = O.useState(!1),
    [fs, hf] = O.useState(1e5),
    [wr, Kc] = O.useState(""),
    [ao, fc] = O.useState(null),
    [pc, Oa] = O.useState(null),
    [vl, ps] = O.useState(!0),
    [ia, Po] = O.useState(!1),
    [io, bf] = O.useState(""),
    [xl, Lo] = O.useState("Growth Core Access"),
    [yl, zs] = O.useState(!1),
    [Nl, Zc] = O.useState(!1),
    [gf, Ip] = O.useState("Saqib Memon"),
    [Rs, Ra] = O.useState("4000 1234 5678 9012"),
    [mc, Is] = O.useState("12/29"),
    [vf, Vo] = O.useState("123"),
    [Qt, wl] = O.useState(!1),
    [hc, xf] = O.useState(""),
    [oa, Bp] = O.useState("All"),
    [oo, so] = O.useState(!1),
    [Dr, Up] = O.useState({
      slack: "available",
      hubspot: "available",
      notion: "available",
      zapier: "available",
      webhooks: "available",
      discord: "available",
    }),
    [Mo, lo] = O.useState(null),
    [ms, yf] = O.useState({}),
    [Dl, bc] = O.useState(!1),
    [Qc, hs] = O.useState(null),
    [El, kl] = O.useState([
      {
        id: "key_1",
        name: "DEMO",
        token: "re_G6UoaCdn...",
        permission: "Full access",
        lastUsed: "No activity",
        createdAt: "just now",
      },
    ]),
    [sd, Bs] = O.useState(!1),
    [bs, gc] = O.useState(!1),
    [zo, Ro] = O.useState(""),
    [Io, ld] = O.useState("Full access"),
    [Jc, Sl] = O.useState(!1),
    [gs, co] = O.useState(null),
    [A, Y] = O.useState(!1),
    [pe, _e] = O.useState(!1),
    [Le, He] = O.useState(""),
    [Ke, bt] = O.useState("All permissions"),
    [yt, Yt] = O.useState(null),
    [nn, on] = O.useState(!1),
    Wr = (F) => {
      (kl(El.filter((ye) => ye.id !== F)), Yt(null));
    },
    er = El.filter((F) => {
      const ye =
        F.name.toLowerCase().includes(Le.toLowerCase()) ||
        F.token.toLowerCase().includes(Le.toLowerCase()),
        Be = Ke === "All permissions" || F.permission === Ke;
      return ye && Be;
    }),
    Xn = () =>
      "re_" +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15),
    mr = (F) => {
      (F.preventDefault(),
        zo &&
        (gc(!0),
          setTimeout(() => {
            const ye = Xn(),
              Be = {
                id: "key_" + Math.random().toString(36).substring(2, 9),
                name: zo,
                token: ye.substring(0, 11) + "...",
                permission: Io,
                lastUsed: "No activity",
                createdAt: "just now",
              };
            (kl([Be, ...El]),
              co({
                name: zo,
                token: ye,
              }),
              gc(!1),
              Bs(!1),
              Ro(""),
              Y(!1),
              Xe && Im());
          }, 1500)));
    },
    [br, Mr] = O.useState([
      {
        id: "mem_1",
        email: "saqibmemon9884@gmail.com",
        role: "admin",
        joinedAt: "2026-06-15",
      },
    ]),
    [Ia, vs] = O.useState(""),
    _l = (F, ye) => (
      <span className="inline-flex items-center gap-1.5">
        {F}
        {ye === "Telemetry Starter" && (
          <S5 className="w-4 h-4 text-white dark:text-[#050506] fill-zinc-400" />
        )}
        {ye === "Growth Core Access" && (
          <S5 className="w-4 h-4 text-white dark:text-[#050506] fill-emerald-500" />
        )}
        {ye === "Quantum Sentinel" && (
          <S5 className="w-4 h-4 text-white dark:text-[#050506] fill-amber-400" />
        )}
      </span>
    ),
    ri = (F) =>
      F === "Telemetry Starter" ? (
        <span className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200">
          {
            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#a1a1aa_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#71717a_50%,#18181b_100%)] opacity-80" />
          }
          {
            <span className="relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              {
                <span
                  className="absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(161,161,170,0.4),50%,transparent,75%,rgba(161,161,170,0.4),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(113,113,122,0.3),50%,transparent,75%,rgba(113,113,122,0.3),100%)] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundSize: "300% 100%",
                  }}
                />
              }
              {<span className="relative z-10">{F}</span>}
            </span>
          }
        </span>
      ) : F === "Growth Core Access" ? (
        <span className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-200">
          {
            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#10b981_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#059669_50%,#18181b_100%)] opacity-80" />
          }
          {
            <span className="relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              {
                <span
                  className="absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(16,185,129,0.4),50%,transparent,75%,rgba(16,185,129,0.4),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(5,150,105,0.3),50%,transparent,75%,rgba(5,150,105,0.3),100%)] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundSize: "300% 100%",
                  }}
                />
              }
              {<span className="relative z-10">{F}</span>}
            </span>
          }
        </span>
      ) : F === "Quantum Sentinel" ? (
        <span className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-200">
          {
            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#f59e0b_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#d97706_50%,#18181b_100%)] opacity-80" />
          }
          {
            <span className="relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              {
                <span
                  className="absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(245,158,11,0.4),50%,transparent,75%,rgba(245,158,11,0.4),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(217,119,6,0.3),50%,transparent,75%,rgba(217,119,6,0.3),100%)] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundSize: "300% 100%",
                  }}
                />
              }
              {<span className="relative z-10">{F}</span>}
            </span>
          }
        </span>
      ) : (
        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-neutral-200 text-neutral-900 shadow-sm">
          {F}
        </span>
      ),
    Us = [
      {
        id: "seed_1",
        userId: "system",
        recipient: "scott@icloud.com",
        subject: "Scott Williams Confidential Proposal",
        linkUrl: "https://example.com/proposal",
        createdAt: new Date(Date.now() - 420 * 1e3).toISOString(),
        status: "unopened",
        openCount: 0,
        clickCount: 0,
        lastOpened: null,
        testSent: !1,
        logs: [],
      },
      {
        id: "seed_2",
        userId: "system",
        recipient: "roya@outlook.com",
        subject: "Roya Listing Agreement Draft",
        linkUrl: "https://example.com/listing",
        createdAt: new Date(Date.now() - 720 * 1e3).toISOString(),
        status: "opened",
        openCount: 2,
        clickCount: 2,
        lastOpened: new Date(Date.now() - 600 * 1e3).toISOString(),
        testSent: !1,
        logs: [
          {
            id: "log_2_1",
            type: "open",
            ip: "39.42.12.88",
            userAgent: "Chrome / Windows",
            city: "Lahore",
            country: "PK",
            device: "Desktop",
            browser: "Chrome",
            isSimulated: !1,
            timestamp: new Date(Date.now() - 660 * 1e3).toISOString(),
          },
          {
            id: "log_2_2",
            type: "click",
            ip: "39.42.12.88",
            userAgent: "Chrome / Windows",
            city: "Lahore",
            country: "PK",
            device: "Desktop",
            browser: "Chrome",
            isSimulated: !1,
            timestamp: new Date(Date.now() - 600 * 1e3).toISOString(),
          },
        ],
      },
      {
        id: "seed_3",
        userId: "system",
        recipient: "laurie@yahoo.com",
        subject: "Laurie Ann Re Signature Request",
        linkUrl: "https://example.com/signature",
        createdAt: new Date(Date.now() - 960 * 1e3).toISOString(),
        status: "opened",
        openCount: 1,
        clickCount: 1,
        lastOpened: new Date(Date.now() - 960 * 1e3).toISOString(),
        testSent: !1,
        logs: [
          {
            id: "log_3_1",
            type: "open",
            ip: "162.210.192.4",
            userAgent: "Safari / macOS",
            city: "Des Moines",
            country: "US",
            device: "Desktop",
            browser: "Safari",
            isSimulated: !1,
            timestamp: new Date(Date.now() - 960 * 1e3).toISOString(),
          },
          {
            id: "log_3_2",
            type: "click",
            ip: "162.210.192.4",
            userAgent: "Safari / macOS",
            city: "Des Moines",
            country: "US",
            device: "Desktop",
            browser: "Safari",
            isSimulated: !1,
            timestamp: new Date(Date.now() - 960 * 1e3).toISOString(),
          },
        ],
      },
      {
        id: "seed_4",
        userId: "system",
        recipient: "karen@karenwilliams.com",
        subject: "Karen Williams Executive Summary",
        linkUrl: "https://example.com/summary",
        createdAt: new Date(Date.now() - 1200 * 1e3).toISOString(),
        status: "opened",
        openCount: 1,
        clickCount: 4,
        lastOpened: new Date(Date.now() - 1200 * 1e3).toISOString(),
        testSent: !1,
        logs: [
          {
            id: "log_4_1",
            type: "open",
            ip: "101.12.88.22",
            userAgent: "Chrome / iOS",
            city: "The Rocks",
            country: "AU",
            device: "Mobile",
            browser: "Chrome",
            isSimulated: !1,
            timestamp: new Date(Date.now() - 1200 * 1e3).toISOString(),
          },
          {
            id: "log_4_2",
            type: "click",
            ip: "101.12.88.22",
            userAgent: "Chrome / iOS",
            city: "The Rocks",
            country: "AU",
            device: "Mobile",
            browser: "Chrome",
            isSimulated: !1,
            timestamp: new Date(Date.now() - 1200 * 1e3).toISOString(),
          },
        ],
      },
      {
        id: "seed_5",
        userId: "system",
        recipient: "justin@justinfreeman.com",
        subject: "Justin Freeman Commercial Contract",
        linkUrl: "https://example.com/contract",
        createdAt: new Date(Date.now() - 1500 * 1e3).toISOString(),
        status: "unopened",
        openCount: 0,
        clickCount: 0,
        lastOpened: null,
        testSent: !1,
        logs: [],
      },
      {
        id: "seed_6",
        userId: "system",
        recipient: "jay@jaysherman.com",
        subject: "Jay Sherman Marketing Overview",
        linkUrl: "https://example.com/marketing",
        createdAt: new Date(Date.now() - 1740 * 1e3).toISOString(),
        status: "opened",
        openCount: 1,
        clickCount: 0,
        lastOpened: new Date(Date.now() - 1380 * 1e3).toISOString(),
        testSent: !1,
        logs: [
          {
            id: "log_6_1",
            type: "open",
            ip: "98.12.23.4",
            userAgent: "Outlook / Windows",
            city: "Rancho Palos Verdes",
            country: "US",
            device: "Desktop",
            browser: "Outlook",
            isSimulated: !1,
            timestamp: new Date(Date.now() - 1380 * 1e3).toISOString(),
          },
        ],
      },
      {
        id: "seed_7",
        userId: "system",
        recipient: "estrada.investments@gmail.com",
        subject: "Estrada Investments Portfolio Audit",
        linkUrl: "https://example.com/portfolio",
        createdAt: new Date(Date.now() - 1980 * 1e3).toISOString(),
        status: "unopened",
        openCount: 0,
        clickCount: 0,
        lastOpened: null,
        testSent: !1,
        logs: [],
      },
      {
        id: "seed_8",
        userId: "system",
        recipient: "doug@blgproperties.com",
        subject: "Doug Properties Partnership Agreement",
        linkUrl: "https://example.com/partnership",
        createdAt: new Date(Date.now() - 2220 * 1e3).toISOString(),
        status: "unopened",
        openCount: 0,
        clickCount: 0,
        lastOpened: null,
        testSent: !1,
        logs: [],
      },
      {
        id: "seed_9",
        userId: "system",
        recipient: "dede@mybizpro.com",
        subject: "Dede BizPro Consulting Brief",
        linkUrl: "https://example.com/consulting",
        createdAt: new Date(Date.now() - 2460 * 1e3).toISOString(),
        status: "unopened",
        openCount: 0,
        clickCount: 0,
        lastOpened: null,
        testSent: !1,
        logs: [],
      },
      {
        id: "seed_10",
        userId: "system",
        recipient: "crooney@lee-associates.com",
        subject:
          "Upgrading the fake chat widget on thedelrealgroup.com ($1.3B Pipeline Optimization) ��️",
        linkUrl: "https://example.com/chat-widget",
        createdAt: new Date(Date.now() - 2700 * 1e3).toISOString(),
        status: "opened",
        openCount: 2,
        clickCount: 4,
        lastOpened: new Date(Date.now() - 2580 * 1e3).toISOString(),
        testSent: !1,
        logs: [
          {
            id: "log_10_1",
            type: "open",
            ip: "128.21.43.2",
            userAgent: "Chrome / Windows",
            city: "San Francisco",
            country: "US",
            device: "Desktop",
            browser: "Chrome",
            isSimulated: !1,
            timestamp: new Date(Date.now() - 2640 * 1e3).toISOString(),
          },
          {
            id: "log_10_2",
            type: "click",
            ip: "128.21.43.2",
            userAgent: "Chrome / Windows",
            city: "San Francisco",
            country: "US",
            device: "Desktop",
            browser: "Chrome",
            isSimulated: !1,
            timestamp: new Date(Date.now() - 2580 * 1e3).toISOString(),
          },
        ],
      },
      {
        id: "seed_11",
        userId: "system",
        recipient: "chris.morrison@compass.com",
        subject: "Compass Listing Checklist",
        linkUrl: "https://example.com/checklist",
        createdAt: new Date(Date.now() - 2940 * 1e3).toISOString(),
        status: "opened",
        openCount: 0,
        clickCount: 2,
        lastOpened: new Date(Date.now() - 2880 * 1e3).toISOString(),
        testSent: !1,
        logs: [
          {
            id: "log_11_1",
            type: "click",
            ip: "39.42.12.88",
            userAgent: "Safari / macOS",
            city: "Lahore",
            country: "PK",
            device: "Desktop",
            browser: "Safari",
            isSimulated: !1,
            timestamp: new Date(Date.now() - 2880 * 1e3).toISOString(),
          },
        ],
      },
      {
        id: "seed_12",
        userId: "system",
        recipient: "carol@carolwolfe.com",
        subject: "Carol Wolfe Escrow Updates",
        linkUrl: "https://example.com/escrow",
        createdAt: new Date(Date.now() - 3120 * 1e3).toISOString(),
        status: "unopened",
        openCount: 0,
        clickCount: 0,
        lastOpened: null,
        testSent: !1,
        logs: [],
      },
      {
        id: "seed_13",
        userId: "system",
        recipient: "blaine.bush@sra-re.com",
        subject: "Blaine Bush Property Appraisal",
        linkUrl: "https://example.com/appraisal",
        createdAt: new Date(Date.now() - 3420 * 1e3).toISOString(),
        status: "opened",
        openCount: 1,
        clickCount: 1,
        lastOpened: new Date(Date.now() - 3360 * 1e3).toISOString(),
        testSent: !1,
        logs: [
          {
            id: "log_13_1",
            type: "open",
            ip: "192.112.4.99",
            userAgent: "Outlook / Windows",
            city: "Quincy",
            country: "US",
            device: "Desktop",
            browser: "Outlook",
            isSimulated: !1,
            timestamp: new Date(Date.now() - 3360 * 1e3).toISOString(),
          },
        ],
      },
      {
        id: "seed_14",
        userId: "system",
        recipient: "amy@widmerhomes.com",
        subject: "Amy Home Purchase Valuation",
        linkUrl: "https://example.com/valuation",
        createdAt: new Date(Date.now() - 3600 * 1e3).toISOString(),
        status: "unopened",
        openCount: 0,
        clickCount: 0,
        lastOpened: null,
        testSent: !1,
        logs: [],
      },
      {
        id: "seed_15",
        userId: "system",
        recipient: "alex@agrealty1.com",
        subject: "Alex Realty Commercial Lease",
        linkUrl: "https://example.com/lease",
        createdAt: new Date(Date.now() - 3600 * 1e3).toISOString(),
        status: "unopened",
        openCount: 0,
        clickCount: 0,
        lastOpened: null,
        testSent: !1,
        logs: [],
      },
      {
        id: "seed_16",
        userId: "system",
        recipient: "aaron@authoritypm.com",
        subject: "Aaron Authority Tenant Screening",
        linkUrl: "https://example.com/screening",
        createdAt: new Date(Date.now() - 3600 * 1e3).toISOString(),
        status: "opened",
        openCount: 1,
        clickCount: 0,
        lastOpened: new Date(Date.now() - 1620 * 1e3).toISOString(),
        testSent: !1,
        logs: [
          {
            id: "log_16_1",
            type: "open",
            ip: "74.12.8.9",
            userAgent: "AppleMail / iOS",
            city: "Mountain View",
            country: "US",
            device: "Mobile",
            browser: "AppleMail",
            isSimulated: !1,
            timestamp: new Date(Date.now() - 1620 * 1e3).toISOString(),
          },
        ],
      },
    ];
  O.useEffect(() => {
    if (g.length === 0 && !k.current) return;
    const F = new Set(),
      ye = [];
    if (
      (g.forEach((Be) => {
        Be.logs.forEach((pt) => {
          (F.add(pt.id),
            k.current &&
            !k.current.has(pt.id) &&
            pt.type === "open" &&
            ye.push({
              ...pt,
              trackerSubject: Be.subject,
              trackerRecipient: Be.recipient,
            }));
        });
      }),
        ye.length > 0 && k.current && (S((Be) => [...Be, ...ye]), Xe))
    )
      try {
        Im();
      } catch { }
    k.current = F;
  }, [g, Xe]);
  const gr = async () => {
    const uid = supabaseUserId;
    try {
      // Fetch from local auth endpoint (optional, may fail in dev)
      try {
        const F = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${e}`,
          },
        });
        if (F.ok) {
          const Be = await F.json();
          Be.user && Be.user.credits !== void 0 && Bi(Be.user.credits);
        }
      } catch (_authErr) {
        // Local auth not available, skip
      }
      // Fetch trackers from Render backend
      const renderRes = await fetch(`${RENDER_BACKEND_URL}/api/stats/${uid}`);
      if (renderRes.ok) {
        const rawData = await renderRes.json();
        const mapped = (Array.isArray(rawData) ? rawData : []).map(mapBackendTracker);

        // Prefetch logs for all trackers on mount
        const logsPromises = mapped.map(async (t) => {
          try {
            const res = await fetch(`${RENDER_BACKEND_URL}/api/logs/${t.id}`);
            if (res.ok) {
              const data = await res.json();
              if (data && data.length > 0) {
                return {
                  id: t.id,
                  logs: data.map((l: any) => ({
                    id: l.id,
                    timestamp: l.timestamp || l.created_at,
                    ip: l.ip || l.ip_address || "0.0.0.0",
                    userAgent: l.user_agent || "Unknown",
                    country: l.country || "Unknown",
                    city: l.city || "Unknown",
                    device: l.device || "Unknown",
                    browser: l.browser || "Unknown",
                    isSimulated: false,
                    type: l.type || "open",
                  }))
                };
              }
            }
          } catch (err) {
            console.error("Failed to prefetch logs", err);
          }
          return { id: t.id, logs: [] };
        });

        const resolvedLogs = await Promise.all(logsPromises);
        const finalMapped = mapped.map((t) => {
          const found = resolvedLogs.find(r => r.id === t.id);
          return found && found.logs.length > 0 ? { ...t, logs: found.logs } : t;
        });

        w(finalMapped);
      } else {
        // Fallback: try local /api/trackers
        const ye = await fetch("/api/trackers", {
          headers: {
            Authorization: `Bearer ${e}`,
          },
        });
        if (ye.ok) {
          const Be = await ye.json();
          w(Be);
        }
      }
    } catch (F) {
      console.error("Telemetry connection error:", F);
      // Last resort fallback to local
      try {
        const ye = await fetch("/api/trackers", {
          headers: { Authorization: `Bearer ${e}` },
        });
        if (ye.ok) { const Be = await ye.json(); w(Be); }
      } catch (_) { }
    } finally {
      P(!1);
    }
  };
  O.useEffect(() => {
    gr();
    const uid = supabaseUserId;
    const F = setInterval(() => {
      fetch(`${RENDER_BACKEND_URL}/api/stats/${uid}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((rawData) => {
          if (rawData) {
            const mapped = (Array.isArray(rawData) ? rawData : []).map(mapBackendTracker);
            w(prev => mapped.map(newTracker => {
              const oldTracker = prev.find(t => t.id === newTracker.id);
              return { ...newTracker, logs: newTracker.logs.length > 0 ? newTracker.logs : (oldTracker?.logs || []) };
            }));
          }
        })
        .catch(() => {
          // Fallback to local if render is down
          fetch("/api/trackers", {
            headers: { Authorization: `Bearer ${e}` },
          })
            .then((ye) => (ye.ok ? ye.json() : null))
            .then((ye) => { ye && w(ye); })
            .catch(() => { });
        });
    }, 8e3);
    return () => clearInterval(F);
  }, [e]);
  const $s = async (F = !1) => {
    F || nt(!0);
    try {
      const ye = await fetch("/api/tickets", {
        headers: {
          Authorization: `Bearer ${e}`,
        },
      });
      if (ye.ok) {
        const Be = await ye.json();
        if ((X(Be), ee)) {
          const pt = Be.find((mt) => mt.id === ee.id);
          pt && de(pt);
        }
      }
    } catch (ye) {
      console.error("Failed to fetch tickets:", ye);
    } finally {
      F || nt(!1);
    }
  };
  (O.useEffect(() => {
    c === "support" && $s();
  }, [c, e]),
    O.useEffect(() => {
      let F = null;
      return (
        c === "support" &&
        (F = setInterval(() => {
          $s(!0);
        }, 4e3)),
        () => {
          F && clearInterval(F);
        }
      );
    }, [c, e, ee == null ? void 0 : ee.id]));
  const Fs = async () => {
    (be(!0), await gr(), Xe && Im(), setTimeout(() => be(!1), 500));
  },
    uo = async (F) => {
      if ((F.preventDefault(), !(!Te.trim() || !it.trim()))) {
        wt(!0);
        try {
          const ye = await fetch("/api/tickets", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${e}`,
            },
            body: JSON.stringify({
              subject: Te,
              category: Ae,
              message: it,
            }),
          });
          if (ye.ok) {
            const Be = await ye.json();
            (X((pt) => [Be.ticket, ...pt]),
              ge(!1),
              ve(""),
              oe(""),
              Ee("bug"),
              Be.newCredits !== void 0 && Bi(Be.newCredits),
              s(
                "Your feedback has been received and you've earned 99 bonus credits!",
                "success",
              ),
              Xe && Im());
          }
        } catch (ye) {
          console.error("Failed to create ticket:", ye);
        } finally {
          wt(!1);
        }
      }
    },
    va = () => {
      try {
        const F = new Ut({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        }),
          ye = [15, 23, 42],
          Be = [16, 185, 129],
          pt = [30, 41, 59],
          mt = [100, 116, 139];
        (F.setFillColor(250, 250, 250),
          F.rect(0, 0, 210, 297, "F"),
          F.setDrawColor(226, 232, 240),
          F.setLineWidth(0.3),
          F.roundedRect(8, 8, 194, 281, 4, 4, "D"),
          F.setFillColor(15, 23, 42),
          F.rect(8, 8, 194, 4, "F"),
          F.setFont("helvetica", "bold"),
          F.setFontSize(22),
          F.setTextColor(15, 23, 42),
          F.text("TICKK", 16, 26),
          F.setFont("helvetica", "normal"),
          F.setFontSize(9),
          F.setTextColor(100, 116, 139),
          F.text("CONTINUOUS OUTBOUND TELEMETRY METRIC REPORT", 16, 32),
          F.setFont("helvetica", "normal"),
          F.setFontSize(8.5),
          F.setTextColor(100, 116, 139),
          F.text(`Generated: ${new Date().toLocaleString()}`, 134, 24),
          F.text(`Operator Auth: ${n}`, 134, 29),
          F.text("Platform Version: TICKK Core v4.0", 134, 34),
          F.setDrawColor(226, 232, 240),
          F.setLineWidth(0.5),
          F.line(16, 40, 194, 40),
          F.setFillColor(255, 255, 255),
          F.setDrawColor(226, 232, 240),
          F.roundedRect(16, 46, 178, 24, 2, 2, "FD"));
        const Wt = sa.length,
          tr = sa.reduce((Nt, vr) => Nt + vr.openCount, 0),
          Bn = sa.filter((Nt) => Nt.openCount > 0).length,
          bn = sa.reduce((Nt, vr) => Nt + vr.clickCount, 0);
        (F.setFont("helvetica", "bold"),
          F.setFontSize(8.5),
          F.setTextColor(100, 116, 139),
          F.text("MONITORED CHANNELS", 22, 53),
          F.text("CONFIRMED INTERACTED", 65, 53),
          F.text("RECIPIENT CLICKS", 112, 53),
          F.text("ACCUMULATED OPENS", 154, 53),
          F.setFont("helvetica", "bold"),
          F.setFontSize(15),
          F.setTextColor(15, 23, 42),
          F.text(String(Wt), 22, 62),
          F.text(String(Bn), 65, 62),
          F.text(String(bn), 112, 62),
          F.text(String(tr), 154, 62),
          F.setFont("helvetica", "bold"),
          F.setFontSize(11),
          F.setTextColor(15, 23, 42),
          F.text("OUTBOUND RECIPIENT TELEMETRY LEDGER", 16, 82),
          F.setFont("helvetica", "normal"),
          F.setFontSize(8.5),
          F.setTextColor(100, 116, 139),
          F.text(
            "Chronological overview of active invisible trackers and click pathways",
            16,
            86,
          ),
          F.setFillColor(15, 23, 42),
          F.rect(16, 91, 178, 8, "F"),
          F.setFont("helvetica", "bold"),
          F.setFontSize(8),
          F.setTextColor(255, 255, 255),
          F.text("RECIPIENT TARGET", 20, 96.5),
          F.text("SUBJECT CAMPAIGN", 68, 96.5),
          F.text("STATUS", 126, 96.5),
          F.text("DISPATCH DATE", 152, 96.5),
          F.text("OPENS / CLICKS", 176, 96.5));
        let Nn = 99;
        (F.setFont("helvetica", "normal"),
          F.setFontSize(8),
          sa.forEach((Nt, vr) => {
            (Nn > 265 &&
              (F.addPage(),
                F.setFillColor(250, 250, 250),
                F.rect(0, 0, 210, 297, "F"),
                F.setDrawColor(226, 232, 240),
                F.setLineWidth(0.3),
                F.roundedRect(8, 8, 194, 281, 4, 4, "D"),
                F.setFillColor(15, 23, 42),
                F.rect(8, 8, 194, 4, "F"),
                F.setFont("helvetica", "bold"),
                F.setFontSize(8),
                F.setTextColor(15, 23, 42),
                F.text("TICKK OUTBOUND MATRIX LEDGER - CONTINUED", 16, 18),
                F.line(16, 20, 194, 20),
                F.setFillColor(15, 23, 42),
                F.rect(16, 24, 178, 8, "F"),
                F.setTextColor(255, 255, 255),
                F.text("RECIPIENT TARGET", 20, 29.5),
                F.text("SUBJECT CAMPAIGN", 68, 29.5),
                F.text("STATUS", 126, 29.5),
                F.text("DISPATCH DATE", 152, 29.5),
                F.text("OPENS / CLICKS", 176, 29.5),
                (Nn = 32)),
              vr % 2 === 0
                ? F.setFillColor(255, 255, 255)
                : F.setFillColor(243, 244, 246),
              F.rect(16, Nn, 178, 11, "F"),
              F.setDrawColor(229, 231, 235),
              F.setLineWidth(0.2),
              F.line(16, Nn + 11, 194, Nn + 11),
              F.setTextColor(15, 23, 42));
            const Rr =
              Nt.recipient.length > 25
                ? Nt.recipient.substring(0, 22) + "..."
                : Nt.recipient,
              Na =
                Nt.subject.length > 28
                  ? Nt.subject.substring(0, 25) + "..."
                  : Nt.subject,
              Pn = Nt.openCount > 0 ? "Confirmed Open" : "Pending Open",
              Kn = new Date(Nt.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              or = `${Nt.openCount} opens / ${Nt.clickCount} clicks`;
            (F.text(Rr, 20, Nn + 7),
              F.text(Na, 68, Nn + 7),
              Nt.openCount > 0
                ? F.setTextColor(16, 185, 129)
                : F.setTextColor(245, 158, 11),
              F.text(Pn, 126, Nn + 7),
              F.setTextColor(100, 116, 139),
              F.text(Kn, 152, Nn + 7),
              F.text(or, 176, Nn + 7),
              (Nn += 11));
          }),
          F.setFont("helvetica", "italic"),
          F.setFontSize(7.5),
          F.setTextColor(148, 163, 184),
          F.text(
            "CONFIDENTIAL SECURITY PROTOCOLS ENFORCED - TICKK INTEL DEPLOYMENT",
            16,
            278,
          ),
          F.save(
            `TICKK_Telemetry_Report_${new Date().toISOString().split("T")[0]}.pdf`,
          ));
      } catch (F) {
        console.error("Failed to generate PDF Report", F);
      }
    },
    sa = [...g].filter((F) =>
      G === "30d"
        ? new Date(F.createdAt).getTime() >= Date.now() - 720 * 60 * 60 * 1e3
        : G === "7d"
          ? new Date(F.createdAt).getTime() >= Date.now() - 10080 * 60 * 1e3
          : G === "24h"
            ? new Date(F.createdAt).getTime() >= Date.now() - 1440 * 60 * 1e3
            : !0,
    ),
    eu = sa.filter((F) => {
      if (R === "all") return !0;
      const ye = F.recipient.toLowerCase();
      let Be = "gmail";
      return (
        ye.includes("outlook.com") || ye.includes("hotmail.com")
          ? (Be = "outlook")
          : ye.includes("yahoo.com") || ye.includes("aol.com")
            ? (Be = "yahoo")
            : (ye.includes("icloud.com") ||
              ye.includes("mac.com") ||
              ye.includes("me.com")) &&
            (Be = "apple"),
        Be === R
      );
    }),
    Ni = sa.length,
    Xr = sa.filter((F) => F.openCount > 0).length,
    fo = sa.filter((F) => F.openCount === 0).length,
    xc = Ni > 0 ? Math.round((Xr / Ni) * 100) : 0,
    tu = (F) => {
      st((ye) => ({
        ...ye,
        [F]: !ye[F],
      }));
      if (!rt[F]) {
        const trackerId = F.split('-open-')[0];
        fetch(`${RENDER_BACKEND_URL}/api/logs/${trackerId}`)
          .then((res) => (res.ok ? res.json() : []))
          .then((data) => {
            console.log("Raw logs from backend:", data);
            if (data && data.length > 0) {
              const mappedLogs = data.map((l: any) => ({
                id: l.id,
                timestamp: l.timestamp || l.created_at,
                ip: l.ip || l.ip_address || "0.0.0.0",
                userAgent: l.user_agent || "Unknown",
                country: l.country || "Unknown",
                city: l.city || "Unknown",
                device: l.device || "Unknown",
                browser: l.browser || "Unknown",
                isSimulated: false,
                type: l.type || "open",
              }));
              console.log("Mapped logs to insert into tracker:", mappedLogs);
              w((prev) =>
                prev.map((t) => {
                  if (t.id === trackerId) {
                    console.log("Found matching tracker, appending logs");
                    return { ...t, logs: mappedLogs };
                  }
                  return t;
                })
              );
            } else {
              console.log("No logs returned from backend for this tracker");
            }
          })
          .catch((err) => console.error("Failed to fetch logs", err));
      }
    },
    ai = (F) => {
      const Be = `<img src="${`${window.location.origin}/api/track/${F}/pixel.png`}" alt="" width="1" height="1" style="display:none" referrerPolicy="no-referrer" />`;
      (navigator.clipboard.writeText(Be),
        pn(F),
        s("Tracking pixel code copied to clipboard"),
        setTimeout(() => pn(null), 1500));
    },
    Ui = (F) => {
      const ye = [];
      if (F.logs && F.logs.length > 0) {
        const Be = [...F.logs].sort(
          (mt, Wt) =>
            new Date(mt.timestamp).getTime() - new Date(Wt.timestamp).getTime(),
        );
        let pt = 0;
        Be.forEach((mt, Wt) => {
          const tr = Wt === Be.length - 1,
            Bn = new Date(mt.timestamp).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            bn = mt.userAgent.includes("Chrome")
              ? "Chrome"
              : mt.userAgent.includes("Safari")
                ? "Safari"
                : mt.userAgent.includes("Outlook")
                  ? "Outlook"
                  : "Apple Mail",
            Nn = mt.userAgent.includes("Windows")
              ? "Windows"
              : mt.userAgent.includes("Mac")
                ? "macOS"
                : "iOS";
          mt.type === "open"
            ? (pt++,
              ye.push({
                label: `Open #${pt}${tr ? " (Latest)" : ""}`,
                details: `Accessed payload from ${bn} on ${Nn} (IP: ${mt.ip})`,
                time: Bn,
                type: "open",
              }))
            : ye.push({
              label: `Link Clicked!${tr ? " (Latest)" : ""}`,
              details: `Redirected to target URL from ${bn} on ${Nn} (IP: ${mt.ip})`,
              time: Bn,
              type: "click",
            });
        });
      } else
        (ye.push({
          label: "Open #1",
          details:
            "Accessed draft at 01:15 AM from Chrome on Windows (IP: 39.42.12.88)",
          time: "01:15 AM",
          type: "open",
        }),
          ye.push({
            label: "Open #2: Link Clicked!",
            details: "Redirected to target URL at 01:40 AM (IP: 39.42.12.88)",
            time: "01:40 AM",
            type: "click",
          }),
          ye.push({
            label: "Open #3 (Latest)",
            details: "Re-opened via Apple Mail app on iOS at 03:40 AM",
            time: "03:40 AM",
            type: "open",
          }));
      return ye;
    },
    yc = () => {
      const F = new Ut();
      (F.setFillColor(5, 5, 6),
        F.rect(0, 0, 210, 40, "F"),
        F.setTextColor(255, 255, 255),
        F.setFont("helvetica", "bold"),
        F.setFontSize(22),
        F.text("TICKK", 20, 25),
        F.setFont("helvetica", "normal"),
        F.setFontSize(10),
        F.setTextColor(150, 150, 150),
        F.text("PREMIUM TELEMETRY SERVICES", 55, 24),
        F.setFontSize(12),
        F.setTextColor(255, 255, 255),
        F.text("STATEMENT OF ACCOUNT", 140, 25),
        F.setTextColor(80, 80, 80),
        F.setFontSize(10),
        F.setFont("helvetica", "normal"),
        F.text(`Account Holder: ${Jn}`, 20, 55),
        F.text(`Corporate Email: ${Wn}`, 20, 61),
        F.text(`Statement Date: ${new Date().toLocaleDateString()}`, 130, 55),
        F.text("Currency: USD", 130, 61),
        F.setDrawColor(230, 230, 230),
        F.line(20, 70, 190, 70),
        F.setFont("helvetica", "bold"),
        F.setTextColor(100, 100, 100),
        F.text("Date", 20, 82),
        F.text("Transaction Reference ID", 50, 82),
        F.text("Value", 130, 82),
        F.text("Status", 165, 82),
        F.setDrawColor(210, 210, 210),
        F.line(20, 86, 190, 86));
      const ye = [
        {
          date: "Jul 11, 2026",
          ref: "TXN-908234-ADF",
          val: "$149.00 USD",
          status: "Paid",
        },
        {
          date: "Jun 11, 2026",
          ref: "TXN-874102-KSD",
          val: "$149.00 USD",
          status: "Paid",
        },
        {
          date: "May 11, 2026",
          ref: "TXN-794012-PQA",
          val: "$149.00 USD",
          status: "Paid",
        },
        {
          date: "Apr 11, 2026",
          ref: "TXN-712894-LMW",
          val: "$149.00 USD",
          status: "Processing",
        },
        {
          date: "Mar 11, 2026",
          ref: "TXN-623910-YTR",
          val: "$149.00 USD",
          status: "Overdue",
        },
      ];
      let Be = 96;
      (F.setFont("helvetica", "normal"),
        F.setTextColor(50, 50, 50),
        ye.forEach((pt) => {
          (F.text(pt.date, 20, Be),
            F.text(pt.ref, 50, Be),
            F.text(pt.val, 130, Be),
            pt.status === "Paid"
              ? F.setTextColor(16, 185, 129)
              : pt.status === "Processing"
                ? F.setTextColor(245, 158, 11)
                : F.setTextColor(239, 68, 68),
            F.text(pt.status, 165, Be),
            F.setTextColor(50, 50, 50),
            F.setDrawColor(245, 245, 245),
            F.line(20, Be + 4, 190, Be + 4),
            (Be += 12));
        }),
        (Be += 10),
        F.setFillColor(250, 250, 250),
        F.rect(20, Be, 170, 30, "F"),
        F.setFont("helvetica", "bold"),
        F.setTextColor(80, 80, 80),
        F.text("Summary", 25, Be + 10),
        F.setFont("helvetica", "normal"),
        F.text("Total Paid Volume:", 25, Be + 18),
        F.text("Active Account Node Status:", 25, Be + 25),
        F.setFont("helvetica", "bold"),
        F.text("$447.00 USD", 150, Be + 18),
        F.setTextColor(16, 185, 129),
        F.text("Enterprise Level", 145, Be + 25),
        F.setFont("helvetica", "normal"),
        F.setFontSize(8),
        F.setTextColor(160, 160, 160),
        F.text(
          "This is an electronically generated document. No signature is required.",
          20,
          280,
        ),
        F.text(
          "TICKK Inc. — 100 Pine Street, San Francisco, CA 94111 — billing@tickk.io",
          20,
          285,
        ),
        F.save(`TICKK_Statement_${Jn.replace(/\s+/g, "_")}.pdf`));
    },
    Nc = (F) => {
      const ye = new Ut();
      (ye.setFillColor(5, 5, 6),
        ye.rect(0, 0, 210, 45, "F"),
        ye.setTextColor(255, 255, 255),
        ye.setFont("helvetica", "bold"),
        ye.setFontSize(24),
        ye.text("TICKK", 25, 28),
        ye.setFont("helvetica", "normal"),
        ye.setFontSize(10),
        ye.setTextColor(150, 150, 150),
        ye.text("PREMIUM TELEMETRY SERVICES", 62, 27),
        ye.setFontSize(14),
        ye.setTextColor(255, 255, 255),
        ye.text("INVOICE RECEIPT", 145, 28),
        ye.setTextColor(60, 60, 60),
        ye.setFontSize(10),
        ye.setFont("helvetica", "bold"),
        ye.text("BILL TO:", 25, 65),
        ye.setFont("helvetica", "normal"),
        ye.text(Jn, 25, 72),
        ye.text(Wn, 25, 78),
        ye.setFont("helvetica", "bold"),
        ye.text("RECEIPT DETAILS:", 130, 65),
        ye.setFont("helvetica", "normal"),
        ye.text(`Receipt Date: ${F.date}`, 130, 72),
        ye.text(`Reference ID: ${F.ref}`, 130, 78),
        ye.text(`Payment Status: ${F.status}`, 130, 84),
        ye.setDrawColor(220, 220, 220),
        ye.line(25, 95, 185, 95),
        ye.setFont("helvetica", "bold"),
        ye.setTextColor(100, 100, 100),
        ye.text("Description", 25, 108),
        ye.text("Quantity", 120, 108),
        ye.text("Unit Price", 145, 108),
        ye.text("Amount", 170, 108),
        ye.line(25, 112, 185, 112),
        ye.setFont("helvetica", "normal"),
        ye.setTextColor(50, 50, 50),
        ye.text(
          "TICKK Growth Core Access Token - Monthly Subscription",
          25,
          125,
        ),
        ye.text("1", 125, 125),
        ye.text(F.val, 145, 125),
        ye.text(F.val, 170, 125),
        ye.line(25, 131, 185, 131),
        ye.setFont("helvetica", "bold"),
        ye.text("Subtotal:", 145, 145),
        ye.text("Tax (0%):", 145, 151),
        ye.text("Total Paid:", 145, 158),
        ye.setFont("helvetica", "normal"),
        ye.text(F.val, 170, 145),
        ye.text("$0.00 USD", 170, 151),
        ye.setFont("helvetica", "bold"),
        ye.setTextColor(16, 185, 129),
        ye.text(F.val, 170, 158),
        ye.setFillColor(248, 250, 252),
        ye.rect(25, 180, 160, 45, "F"),
        ye.setFont("helvetica", "bold"),
        ye.setTextColor(80, 80, 80),
        ye.text("Important Information", 32, 192),
        ye.setFont("helvetica", "normal"),
        ye.setFontSize(9),
        ye.setTextColor(110, 110, 110),
        ye.text(
          "Thank you for choosing TICKK! This receipt confirms that full payment was successfully",
          32,
          200,
        ),
        ye.text(
          "debited from your corporate payment configuration on file. No further action is required.",
          32,
          205,
        ),
        ye.text(
          "For custom SLA inquiries or limits, please drop us a note at enterprise@tickk.io",
          32,
          213,
        ),
        ye.setFontSize(8),
        ye.setTextColor(170, 170, 170),
        ye.text(
          "TICKK Inc. — 100 Pine Street, San Francisco, CA 94111",
          25,
          275,
        ),
        ye.save(`TICKK_Receipt_${F.ref}.pdf`));
    },
    qs = (F) => {
      const ye = ["th", "st", "nd", "rd"],
        Be = F % 100;
      return F + (ye[(Be - 20) % 10] || ye[Be] || ye[0]);
    },
    xa = (F) =>
      F ? (
        <span className="bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 px-2 py-0.5 rounded text-[9px] font-medium tracking-wider text-neutral-700 dark:text-zinc-300 inline-flex items-center gap-1 ml-2 font-mono">
          {<En_Icon className="w-3 h-3 text-emerald-500" />}
          {"LINK CLICKED"}
        </span>
      ) : (
        <span className="bg-neutral-100 dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800 px-2 py-0.5 rounded text-[9px] font-medium tracking-wider text-neutral-500 dark:text-zinc-500 inline-flex items-center gap-1 ml-2 font-mono">
          {<Bd className="w-3 h-3 text-neutral-400 dark:text-zinc-600" />}
          {"NO CLICK YET"}
        </span>
      ),
    ya = (() => {
      const F = [];
      [...g, ...Us].forEach((pt) => {
        if (pt.logs && pt.logs.length > 0)
          pt.logs.forEach((mt) => {
            let Wt = 1;
            if (mt.type === "open") {
              const bn = [...pt.logs]
                .filter((Nn) => Nn.type === "open")
                .sort(
                  (Nn, Nt) =>
                    new Date(Nn.timestamp).getTime() -
                    new Date(Nt.timestamp).getTime(),
                )
                .findIndex((Nn) => Nn.id === mt.id);
              bn !== -1 && (Wt = bn + 1);
            }
            const tr =
              pt.clickCount > 0 || pt.logs.some((Bn) => Bn.type === "click");
            const logTime = new Date(mt.timestamp).getTime();
            const diff = Date.now() - logTime;
            const mins = Math.floor(diff / 60000);
            let displayTimeAgo = "Just now";
            if (mins >= 1) {
              if (mins < 60) {
                displayTimeAgo = `${mins}m ago`;
              } else {
                const hrs = Math.floor(mins / 60);
                if (hrs < 24) {
                  displayTimeAgo = `${hrs}h ago`;
                } else {
                  displayTimeAgo = `${Math.floor(hrs / 24)}d ago`;
                }
              }
            }
            F.push({
              id: mt.id,
              recipient: pt.recipient,
              subject: pt.subject,
              type: mt.type,
              details:
                mt.type === "open"
                  ? `opened your email ${qs(Wt)} time`
                  : "clicked a link in your email",
              timeAgo: displayTimeAgo,
              timestamp: new Date(mt.timestamp),
              hasClick: tr,
              openIndex: Wt,
            });
          });
        else if (pt.openCount > 0) {
          const mt = pt.clickCount > 0;
          const logTime = new Date(pt.createdAt).getTime();
          const diff = Date.now() - logTime;
          const mins = Math.floor(diff / 60000);
          let displayTimeAgo = "1 hour ago";
          if (mins >= 1) {
            if (mins < 60) {
              displayTimeAgo = `${mins}m ago`;
            } else {
              const hrs = Math.floor(mins / 60);
              if (hrs < 24) {
                displayTimeAgo = `${hrs}h ago`;
              } else {
                displayTimeAgo = `${Math.floor(hrs / 24)}d ago`;
              }
            }
          }
          F.push({
            id: `synth-open-${pt.id}`,
            recipient: pt.recipient,
            subject: pt.subject,
            type: "open",
            details: "opened your email 1st time",
            timeAgo: displayTimeAgo,
            timestamp: new Date(pt.createdAt),
            hasClick: mt,
            openIndex: 1,
          });
        }
      });
      const ye = [
        {
          id: "seed_act_1",
          recipient: "daniel@thedelrealgroup.com",
          subject:
            "Upgrading the fake chat widget on thedelrealgroup.com ($1.3B Pipeline Optimization) ��️",
          type: "open",
          details: "opened your email 5th time",
          timeAgo: "2 hours ago",
          timestamp: new Date(Date.now() - 2 * 3600 * 1e3),
          hasClick: !0,
          openIndex: 5,
        },
        {
          id: "seed_act_2",
          recipient: "daniel@thedelrealgroup.com",
          subject:
            "Upgrading the fake chat widget on thedelrealgroup.com ($1.3B Pipeline Optimization) ��️",
          type: "open",
          details: "opened your email 4th time",
          timeAgo: "4 hours ago",
          timestamp: new Date(Date.now() - 4 * 3600 * 1e3),
          hasClick: !0,
          openIndex: 4,
        },
        {
          id: "seed_act_3",
          recipient: "one of the recipients",
          subject: "quick video for The Bowen Team (website leak?)",
          type: "open",
          details: "opened your email 15th time",
          timeAgo: "8 hours ago",
          timestamp: new Date(Date.now() - 8 * 3600 * 1e3),
          hasClick: !1,
          openIndex: 15,
        },
        {
          id: "seed_act_4",
          recipient: "one of the recipients",
          subject: "quick video for The Bowen Team (website leak?)",
          type: "open",
          details: "opened your email 14th time",
          timeAgo: "12 hours ago",
          timestamp: new Date(Date.now() - 12 * 3600 * 1e3),
          hasClick: !0,
          openIndex: 14,
        },
        {
          id: "seed_act_5",
          recipient: "saqibmemon9884@gmail.com",
          subject: "sasa",
          type: "open",
          details: "opened your email 1st time",
          timeAgo: "1.5 days ago",
          timestamp: new Date(Date.now() - 36 * 3600 * 1e3),
          hasClick: !1,
          openIndex: 1,
        },
      ];
      return [...F, ...ye].sort(
        (pt, mt) => mt.timestamp.getTime() - pt.timestamp.getTime(),
      );
    })().filter((F) => {
      if (
        (G === "30d" &&
          F.timestamp.getTime() < Date.now() - 720 * 60 * 60 * 1e3) ||
        (G === "7d" && F.timestamp.getTime() < Date.now() - 10080 * 60 * 1e3) ||
        (G === "24h" && F.timestamp.getTime() < Date.now() - 1440 * 60 * 1e3)
      )
        return !1;
      if (R === "all") return !0;
      const ye = F.recipient.toLowerCase();
      let Be = "gmail";
      return (
        ye.includes("outlook.com") || ye.includes("hotmail.com")
          ? (Be = "outlook")
          : ye.includes("yahoo.com") || ye.includes("aol.com")
            ? (Be = "yahoo")
            : (ye.includes("icloud.com") ||
              ye.includes("mac.com") ||
              ye.includes("me.com")) &&
            (Be = "apple"),
        Be === R
      );
    }),
    Al = () => {
      let F = 30,
        ye = (mt) => `Day ${mt + 1}`;
      if (m === "last_24_hours") ((F = 24), (ye = (mt) => `${mt}:00`));
      else if (m === "last_7_days") {
        F = 7;
        const mt = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        ye = (Wt) => mt[(new Date().getDay() - 6 + Wt + 7) % 7];
      } else if (m === "last_30_days")
        ((F = 30),
          (ye = (mt) => {
            const Wt = new Date();
            return (
              Wt.setDate(Wt.getDate() - 29 + mt),
              `${Wt.toLocaleString("default", {
                month: "short",
              })} ${Wt.getDate()}`
            );
          }));
      else if (m === "last_90_days")
        ((F = 12), (ye = (mt) => `Week ${mt + 1}`));
      else if (m === "last_year") {
        F = 12;
        const mt = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        ye = (Wt) => mt[(new Date().getMonth() - 11 + Wt + 12) % 12];
      }
      const Be = [];
      let pt = 10;
      for (let mt = 0; mt < F; mt++)
        if (((pt = Math.max(5, pt + (Math.random() * 8 - 3))), mt === F - 1))
          Be.push({
            name: ye(mt),
            dispatches: Ni || 15,
            opens: Xr || 8,
            clicks: 4,
          });
        else {
          const tr = Math.round(
            pt *
            (m === "last_year"
              ? 40
              : m === "last_90_days"
                ? 15
                : m === "last_24_hours"
                  ? 0.8
                  : 1.5),
          ),
            Bn = Math.round(tr * (0.5 + Math.random() * 0.4)),
            bn = Math.round(Bn * (0.2 + Math.random() * 0.5));
          Be.push({
            name: ye(mt),
            dispatches: tr,
            opens: Bn,
            clicks: bn,
          });
        }
      return Be;
    },
    xs = Tr.useMemo(() => Al(), [m, Ni, Xr]),
    Ba =
      "bg-white/80 dark:bg-zinc-900/30 backdrop-blur-xl border border-neutral-200/80 dark:border-zinc-800/60 rounded-xl p-6 shadow-md dark:shadow-xl transition-all duration-300 hover:scale-[1.01]",
    Bo =
      "bg-white/50 dark:bg-white/5 backdrop-blur-[60px] border border-white/80 dark:border-white/15 rounded-3xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
    wi = {
      hidden: {
        opacity: 1,
      },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.04,
          delayChildren: 0.02,
        },
      },
      exit: {
        opacity: 1,
        transition: {
          duration: 0.1,
        },
      },
    },
    Kt = {
      hidden: {
        opacity: 1,
        y: 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring" as const,
          stiffness: 100,
          damping: 15,
        },
      },
    },
    Nf = () => {
      fe(!1);
      try {
        localStorage.setItem("tickk_beta_welcome_seen", "true");
      } catch { }
      Xe && Im();
    };
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0c0c0e] dark:bg-gradient-to-b dark:from-[#0c0c0e] dark:via-[#09090b] dark:to-[#050506] text-neutral-800 dark:text-zinc-100 font-sans flex flex-col md:flex-row relative transition-colors duration-500 overflow-hidden">
      {
        <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
          {
            <Hi>
              {E.map((F) => (
                <Lt.div key={F.id}
                  initial={{
                    opacity: 0,
                    x: 50,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    scale: 0.95,
                  }}
                  className="pointer-events-auto bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-zinc-800 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-full px-4 py-3 flex items-center gap-4"
                >
                  {
                    <span className="inline-flex items-center px-2.5 py-1 bg-emerald-500/5 border border-emerald-500/20 text-neutral-900 dark:text-white text-[10px] font-normal rounded-full shrink-0">
                      {
                        <En_Icon
                          className="w-3.5 h-3.5 text-emerald-500 mr-1 shrink-0"
                          strokeWidth={3}
                        />
                      }
                      {<span>{"Confirmed"}</span>}
                    </span>
                  }
                  {
                    <div className="flex flex-col max-w-[150px] sm:max-w-[200px]">
                      {
                        <span className="text-xs font-medium text-neutral-900 dark:text-white truncate">
                          {F.trackerSubject}
                        </span>
                      }
                      {
                        <span className="text-[10px] text-zinc-500 truncate">
                          {F.trackerRecipient}
                        </span>
                      }
                    </div>
                  }
                  {
                    <button
                      onClick={() =>
                        S((ye) => ye.filter((Be) => Be.id !== F.id))
                      }
                      className="p-1 shrink-0 text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors ml-2"
                    >
                      {<Bd className="w-3.5 h-3.5" />}
                    </button>
                  }
                </Lt.div>
              ))}
            </Hi>
          }
        </div>
      }
      {
        <div className="absolute top-[-10%] left-[10%] w-[550px] h-[550px] bg-neutral-200/20 dark:bg-white/[0.01] rounded-full blur-[140px] pointer-events-none z-0" />
      }
      {
        <div className="absolute bottom-[-10%] right-[5%] w-[700px] h-[700px] bg-neutral-200/20 dark:bg-white/[0.01] rounded-full blur-[160px] pointer-events-none z-0" />
      }
      {
        <aside
          className={`border-b md:border-b-0 md:border-r border-neutral-200 dark:border-zinc-900 bg-white dark:bg-[#050506] flex flex-col shrink-0 justify-between transition-all duration-500 z-10 ${U ? "w-full md:w-20" : "w-full md:w-64"}`}
        >
          {
            <div className="flex flex-col">
              {
                <div
                  className={`p-6 border-b border-neutral-200 dark:border-zinc-900 flex ${U ? "flex-col items-center gap-6" : "items-center justify-between"} transition-all duration-500`}
                >
                  {!U && (
                    <span className="flex items-center gap-2 select-none overflow-hidden whitespace-nowrap">
                      {
                        <img
                          src="/logo.svg"
                          alt="Tickk"
                          className="h-4 dark:invert"
                        />
                      }
                    </span>
                  )}
                  {U && (
                    <span className="flex items-center justify-center select-none">
                      {
                        <img
                          src="/icon.svg"
                          alt="Tickk"
                          className="h-4 dark:invert opacity-90"
                        />
                      }
                    </span>
                  )}
                  {
                    <div
                      className={`flex items-center gap-2 ${U ? "flex-col" : ""}`}
                    >
                      {
                        <button
                          onClick={() => re(!U)}
                          className="p-1.5 text-zinc-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded transition-all cursor-pointer"
                          title={U ? "Expand Sidebar" : "Collapse Sidebar"}
                        >
                          {U ? (
                            <Jre className="w-4 h-4" />
                          ) : (
                            <_re className="w-4 h-4" />
                          )}
                        </button>
                      }
                      {!U && (
                        <button
                          onClick={Fs}
                          className={`p-1.5 hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded transition-all cursor-pointer ${le ? "animate-spin text-neutral-900 dark:text-white" : "text-zinc-500 hover:text-neutral-900 dark:hover:text-white"}`}
                          title="Sync telemetry data"
                        >
                          {<TO className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>
                  }
                </div>
              }
              {
                <nav className="p-4 space-y-1.5">
                  {[
                    {
                      id: "overview",
                      label: "Home / Overview",
                      icon: <Ud className="w-4 h-4" />,
                    },
                    {
                      id: "activity",
                      label: "Latest Activity",
                      icon: <IB className="w-4 h-4" />,
                    },
                    {
                      id: "tracking",
                      label: "Email Tracking",
                      icon: <Kp className="w-4 h-4" />,
                    },
                    {
                      id: "link_tracking",
                      label: "Link Tracking",
                      icon: <Dre className="w-4 h-4" />,
                    },
                    {
                      id: "manual_dispatch",
                      label: "Manual Email Dispatch",
                      icon: <Send className="w-4 h-4" />,
                    },
                    {
                      id: "performance",
                      label: "Performance Metrics",
                      icon: <Qre className="w-4 h-4" />,
                    },
                    {
                      id: "integrations",
                      label: "Integration Hub",
                      icon: <RB className="w-4 h-4" />,
                    },
                    {
                      id: "developer_documentation",
                      label: "Developer Docs",
                      icon: <IB className="w-4 h-4" />,
                    },
                    {
                      id: "api_keys",
                      label: "API Keys",
                      icon: <Ire className="w-4 h-4" />,
                    },
                    {
                      id: "account",
                      label: "Settings & account",
                      icon: <YD className="w-4 h-4" />,
                    },
                    {
                      id: "billing",
                      label: "Corporate Billing",
                      icon: <Qd className="w-4 h-4" />,
                    },
                    {
                      id: "pricing",
                      label: "Pricing & Plans (Premium)",
                      icon: <Gp className="w-4 h-4" />,
                    },
                    {
                      id: "support",
                      label: "Beta Feedback & Support",
                      icon: <Cre className="w-4 h-4" />,
                    },
                  ].map((F) => {
                    const ye = c === F.id;
                    return (
                      <button key={F.id}
                        id={`sidebar-tab-${F.id}`}
                        onClick={() => u(F.id)}
                        className={`group w-full ${U ? "px-0 justify-center py-3" : "px-4 py-2.5"} text-xs font-normal tracking-wide flex items-center gap-3 rounded-lg transition-all border cursor-pointer overflow-hidden relative ${ye ? "bg-neutral-100 dark:bg-zinc-900/40 text-neutral-900 dark:text-white border-neutral-200 dark:border-zinc-800/65 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]" : "text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:text-white dark:hover:bg-zinc-900/20 border-transparent"}`}
                        title={U ? F.label : void 0}
                      >
                        {
                          <span
                            style={{
                              transformStyle: "preserve-3d",
                            }}
                            className={`relative flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1 group-hover:scale-110 group-hover:rotate-[-4deg] group-hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] dark:group-hover:drop-shadow-[0_8px_16px_rgba(255,255,255,0.15)] hover:text-neutral-700 dark:hover:text-zinc-200 ${ye ? "text-neutral-900 dark:text-white scale-110" : "text-zinc-500"}`}
                          >
                            {F.icon}
                          </span>
                        }
                        {!U && (
                          <span className="truncate transition-opacity duration-300 relative z-10 group-hover:translate-x-0.5 transition-transform">
                            {F.label}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              }
            </div>
          }
          {
            <div className="p-4 border-t border-neutral-200 dark:border-zinc-900 bg-neutral-50/50 dark:bg-[#050506]/50">
              {
                <div className="flex items-center gap-2.5 mb-4">
                  {
                    <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex items-center justify-center text-xs text-neutral-900 dark:text-white font-mono font-normal uppercase">
                      {Jn.charAt(0)}
                    </div>
                  }
                  {
                    <div className="flex-1 min-w-0">
                      {
                        <p className="text-xs text-neutral-800 dark:text-zinc-300 truncate font-normal">
                          {_l(Jn, xl)}
                        </p>
                      }
                      {
                        <p className="text-[10px] text-neutral-500 dark:text-zinc-500 truncate font-normal">
                          {Wn}
                        </p>
                      }
                    </div>
                  }
                </div>
              }
              {
                <button
                  id="logout-btn"
                  onClick={t}
                  className="w-full py-2 text-xs font-normal text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded-lg border border-neutral-200 dark:border-zinc-800 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200"
                >
                  {<Mre className="w-3.5 h-3.5 text-zinc-500" />}
                  {"Sign Out"}
                </button>
              }
            </div>
          }
        </aside>
      }
      {
        <main className="flex-1 bg-transparent flex flex-col min-w-0 transition-colors duration-300 z-10">
          {
            <header className="px-8 py-5 border-b border-neutral-200/40 dark:border-zinc-900/40 bg-white/70 dark:bg-[#050506]/70 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {
                <div>
                  {
                    <div className="flex items-center gap-2">
                      {
                        <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-zinc-500 font-normal">
                          {
                            <img
                              src="/icon.svg"
                              alt="Tickk"
                              className="h-3 dark:invert opacity-50"
                            />
                          }
                          {" CONSOLE v4.0"}
                        </span>
                      }
                    </div>
                  }
                  {
                    <h2 className="text-sm font-normal text-neutral-900 dark:text-white tracking-tight mt-0.5">
                      {"Continuous Read Telemetry"}
                    </h2>
                  }
                </div>
              }
              {
                <div className="flex items-center gap-4 text-xs">
                  {(c === "tracking" || c === "link_tracking") && (
                    <div className="relative z-50">
                      {
                        <button
                          onClick={() => I(!W)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/40 dark:bg-zinc-900/40 hover:bg-white/60 dark:hover:bg-zinc-800/60 backdrop-blur-xl border border-neutral-200/50 dark:border-zinc-700/50 text-neutral-700 dark:text-zinc-300 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                        >
                          {
                            <span className="font-medium tracking-wide">
                              {G === "24h"
                                ? "Last 24h"
                                : G === "7d"
                                  ? "Last 7 Days"
                                  : "Last 30 Days"}
                            </span>
                          }
                          {
                            <svg
                              className={`w-3 h-3 transition-transform ${W ? "rotate-180" : ""}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              {
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              }
                            </svg>
                          }
                        </button>
                      }
                      {
                        <Hi>
                          {W && (
                            <Lt.div
                              initial={{
                                opacity: 0,
                                y: -5,
                                scale: 0.95,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                              }}
                              exit={{
                                opacity: 0,
                                y: -5,
                                scale: 0.95,
                              }}
                              transition={{
                                duration: 0.15,
                              }}
                              className="absolute right-0 mt-2 w-36 rounded-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-neutral-200/60 dark:border-zinc-700/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden"
                            >
                              {
                                <div className="p-1 flex flex-col gap-0.5">
                                  {["24h", "7d", "30d"].map((F) => (
                                    <button key={F}
                                      onClick={() => {
                                        (q(F), I(!1));
                                      }}
                                      className={`text-left px-3 py-2 text-xs rounded-lg transition-colors ${G === F ? "bg-neutral-100 dark:bg-zinc-800 text-neutral-900 dark:text-white font-medium" : "text-neutral-600 dark:text-zinc-400 hover:bg-neutral-50 dark:hover:bg-zinc-800/50 hover:text-neutral-900 dark:hover:text-white"}`}
                                    >
                                      {F === "24h"
                                        ? "Last 24h"
                                        : F === "7d"
                                          ? "Last 7 Days"
                                          : "Last 30 Days"}
                                    </button>
                                  ))}
                                </div>
                              }
                            </Lt.div>
                          )}
                        </Hi>
                      }
                    </div>
                  )}
                  {
                    <div className="hidden lg:flex relative items-center justify-center p-[1px] overflow-hidden rounded-full font-medium text-[11px] uppercase tracking-wider text-neutral-800 dark:text-zinc-200">
                      {
                        <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#ffffff_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#ffffff_50%,#18181b_100%)] opacity-80" />
                      }
                      {
                        <span className="relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                          {
                            <span
                              className="absolute inset-0 rounded-full animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.8),50%,transparent,75%,rgba(255,255,255,0.8),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.2),50%,transparent,75%,rgba(255,255,255,0.2),100%)] mix-blend-overlay pointer-events-none"
                              style={{
                                backgroundSize: "300% 100%",
                              }}
                            />
                          }
                          {
                            <span className="relative z-10">
                              {"Secure Session Active"}
                            </span>
                          }
                        </span>
                      }
                    </div>
                  }
                  {<T8 theme={r} toggleTheme={o} />}
                </div>
              }
            </header>
          }
          {
            <div className="p-8 overflow-y-auto flex-1 max-w-7xl w-full mx-auto space-y-8">
              {
                <Hi mode="wait">
                  {L ? (
                    <Lt.div
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="space-y-8"
                    >
                      {
                        <div className="flex flex-col items-center justify-center py-6">
                          {
                            <div className="flex items-center gap-3">
                              {
                                <div className="w-5 h-5 border-2 border-neutral-300 dark:border-zinc-700 border-t-neutral-900 dark:border-t-white rounded-full animate-spin" />
                              }
                              {
                                <span className="text-sm font-mono tracking-wider text-neutral-500 dark:text-zinc-400">
                                  {"Provisioning workspace in "}
                                  {C}
                                  {"s..."}
                                </span>
                              }
                            </div>
                          }
                        </div>
                      }
                      {
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          {[1, 2, 3, 4].map((F) => (
                            <div key={F} className="relative overflow-hidden bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-neutral-200/50 dark:border-zinc-800/50 p-6 rounded-2xl h-36 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                              {
                                <div className="flex justify-between items-start">
                                  {
                                    <div className="w-12 h-12 rounded-xl bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse relative overflow-hidden">
                                      {
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent" />
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="w-20 h-6 rounded-full bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse relative overflow-hidden">
                                      {
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent" />
                                      }
                                    </div>
                                  }
                                </div>
                              }
                              {
                                <div className="space-y-2.5 mt-auto">
                                  {
                                    <div className="w-3/4 h-8 rounded-lg bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse relative overflow-hidden">
                                      {
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent" />
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="w-1/2 h-4 rounded-md bg-neutral-200/40 dark:bg-zinc-800/40 animate-pulse relative overflow-hidden">
                                      {
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent" />
                                      }
                                    </div>
                                  }
                                </div>
                              }
                              {
                                <div className="absolute top-0 -left-[100%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent animate-[shimmer_2.5s_infinite] -skew-x-12 pointer-events-none" />
                              }
                            </div>
                          ))}
                        </div>
                      }
                      {
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {
                            <div className="lg:col-span-2 relative overflow-hidden bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-neutral-200/50 dark:border-zinc-800/50 rounded-3xl h-[450px] flex flex-col p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                              {
                                <div className="flex justify-between items-center mb-10">
                                  {
                                    <div className="space-y-3">
                                      {
                                        <div className="w-48 h-8 rounded-lg bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse relative overflow-hidden">
                                          {
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent" />
                                          }
                                        </div>
                                      }
                                      {
                                        <div className="w-64 h-4 rounded-md bg-neutral-200/40 dark:bg-zinc-800/40 animate-pulse relative overflow-hidden">
                                          {
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent" />
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="flex gap-2">
                                      {
                                        <div className="w-24 h-10 rounded-xl bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse" />
                                      }
                                      {
                                        <div className="w-10 h-10 rounded-xl bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse" />
                                      }
                                    </div>
                                  }
                                </div>
                              }
                              {
                                <div className="flex-1 relative flex items-end gap-2 px-2 pb-6 border-b border-neutral-200/50 dark:border-zinc-800/50">
                                  {
                                    <div className="absolute inset-0 flex flex-col justify-between pt-2 pb-6">
                                      {[1, 2, 3, 4, 5].map((F) => (
                                        <div key={F} className="w-full h-px bg-neutral-200/50 dark:bg-zinc-800/50" />
                                      ))}
                                    </div>
                                  }
                                  {Array.from({
                                    length: 24,
                                  }).map((F, ye) => (
                                    <div key={ye}
                                      className="flex-1 bg-neutral-200/40 dark:bg-zinc-800/40 rounded-t-md animate-pulse relative overflow-hidden z-10"
                                      style={{
                                        height: `${20 + Math.random() * 80}%`,
                                        animationDelay: `${ye * 0.05}s`,
                                      }}
                                    >
                                      {
                                        <div className="absolute inset-0 -translate-y-full animate-[shimmer_2s_infinite] bg-gradient-to-b from-transparent via-white/40 dark:via-white/10 to-transparent" />
                                      }
                                    </div>
                                  ))}
                                </div>
                              }
                              {
                                <div className="absolute top-0 -left-[100%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/30 dark:via-white/5 to-transparent animate-[shimmer_3s_infinite] -skew-x-12 pointer-events-none" />
                              }
                            </div>
                          }
                          {
                            <div className="relative overflow-hidden bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-neutral-200/50 dark:border-zinc-800/50 rounded-3xl h-[450px] flex flex-col p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                              {
                                <div className="w-40 h-8 rounded-lg bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse mb-8 relative overflow-hidden">
                                  {
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent" />
                                  }
                                </div>
                              }
                              {
                                <div className="flex-1 space-y-5">
                                  {[1, 2, 3, 4, 5].map((F) => (
                                    <div key={F} className="flex items-center gap-4">
                                      {
                                        <div className="w-12 h-12 rounded-full bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse shrink-0" />
                                      }
                                      {
                                        <div className="flex-1 space-y-2">
                                          {
                                            <div className="w-full h-4 rounded-md bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse" />
                                          }
                                          {
                                            <div className="w-2/3 h-3 rounded-md bg-neutral-200/40 dark:bg-zinc-800/40 animate-pulse" />
                                          }
                                        </div>
                                      }
                                    </div>
                                  ))}
                                </div>
                              }
                              {
                                <div className="absolute top-0 -left-[100%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent animate-[shimmer_2.5s_infinite] -skew-x-12 pointer-events-none" />
                              }
                            </div>
                          }
                        </div>
                      }
                    </Lt.div>
                  ) : (
                    <Lt.div
                      variants={wi}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-8"
                    >
                      {c === "overview" && (
                        <div className="space-y-8 animate-fadeIn">
                          {g.length === 0 && (
                            <QuickStartGuide
                              onNavigate={(tab) => {
                                if (tab === 'mail') {
                                  u("account");
                                  vi("gmail");
                                } else {
                                  u(tab);
                                }
                              }}
                              onGenerateKey={() => s("API Key Generated Successfully", "success")}
                              onFireTest={(email) => {
                                s("Outbound test signal fired successfully!", "success");
                                const newTracker = {
                                  id: `test_${Date.now()}`,
                                  userId: "system",
                                  recipient: email,
                                  subject: "Test Signal Envelope",
                                  linkUrl: "",
                                  createdAt: new Date().toISOString(),
                                  status: "opened",
                                  openCount: 1,
                                  clickCount: 0,
                                  lastOpened: new Date().toISOString(),
                                  testSent: true,
                                  logs: [{
                                    id: `log_test_${Date.now()}`,
                                    type: "open",
                                    city: "San Francisco",
                                    country: "US",
                                    device: "Desktop",
                                    browser: "Chrome",
                                    isSimulated: true,
                                    timestamp: new Date().toISOString(),
                                  }]
                                };
                                w((prev) => [newTracker, ...prev]);

                                setTimeout(() => {
                                  triggerTelemetryAlert({
                                    email,
                                    countryCode: "US",
                                    deviceInfo: "Accessed pricing page link via Safari on iOS"
                                  });
                                }, 800);
                              }}
                            />
                          )}
                          {
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              {
                                <div>
                                  {
                                    <h2 className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight">
                                      {"System Summary"}
                                    </h2>
                                  }
                                  {
                                    <p className="text-xs text-zinc-500 mt-1">
                                      {
                                        "Spacious, high-fidelity real-time delivery and interaction intelligence."
                                      }
                                    </p>
                                  }
                                </div>
                              }
                            </div>
                          }
                          {
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                              {
                                <Lt.div
                                  id="metric-dispatches"
                                  variants={Kt}
                                  className="relative overflow-hidden group bg-gradient-to-br from-white/95 via-zinc-50/50 to-neutral-100/80 dark:from-[#0f0f12] dark:via-[#0a0a0c] dark:to-[#030304] border border-neutral-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-md dark:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-neutral-300 dark:hover:border-zinc-700/80"
                                >
                                  {
                                    <div
                                      className="absolute inset-0 rounded-2xl animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.4),50%,transparent,75%,rgba(255,255,255,0.4),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.1),50%,transparent,75%,rgba(255,255,255,0.1),100%)] mix-blend-overlay pointer-events-none"
                                      style={{
                                        backgroundSize: "300% 100%",
                                      }}
                                    />
                                  }
                                  {
                                    <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-zinc-300/20 dark:bg-zinc-800/10 blur-xl pointer-events-none transition-transform duration-500 group-hover:scale-150" />
                                  }
                                  {
                                    <div className="flex items-center justify-between mb-4 relative z-10">
                                      {
                                        <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider font-display">
                                          {"Total Dispatches"}
                                        </span>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="flex items-baseline justify-between relative z-10 mt-1">
                                      {
                                        <span className="text-4xl font-extralight font-display text-neutral-900 dark:text-zinc-100 tracking-tight">
                                          {<Y5 value={Ni} />}
                                        </span>
                                      }
                                      {
                                        <div className="relative items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] uppercase tracking-wider text-neutral-800 dark:text-zinc-200">
                                          {
                                            <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#ffffff_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#ffffff_50%,#18181b_100%)] opacity-80" />
                                          }
                                          {
                                            <span className="relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                              {
                                                <span
                                                  className="absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.8),50%,transparent,75%,rgba(255,255,255,0.8),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.2),50%,transparent,75%,rgba(255,255,255,0.2),100%)] mix-blend-overlay pointer-events-none"
                                                  style={{
                                                    backgroundSize: "300% 100%",
                                                  }}
                                                />
                                              }
                                              {
                                                <span className="relative z-10">
                                                  {"Emails"}
                                                </span>
                                              }
                                            </span>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                </Lt.div>
                              }
                              {
                                <Lt.div
                                  id="metric-opens"
                                  variants={Kt}
                                  className="relative overflow-hidden group bg-gradient-to-br from-white/95 via-emerald-500/[0.01] to-neutral-100/80 dark:from-[#0f0f12] dark:via-[#0a0a0c] dark:to-[#030304] border border-neutral-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-md dark:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-neutral-300 dark:hover:border-zinc-700/80"
                                >
                                  {
                                    <div
                                      className="absolute inset-0 rounded-2xl animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(52,211,153,0.15),50%,transparent,75%,rgba(52,211,153,0.15),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(52,211,153,0.1),50%,transparent,75%,rgba(52,211,153,0.1),100%)] mix-blend-overlay pointer-events-none"
                                      style={{
                                        backgroundSize: "300% 100%",
                                      }}
                                    />
                                  }
                                  {
                                    <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-xl pointer-events-none transition-transform duration-500 group-hover:scale-150" />
                                  }
                                  {
                                    <div className="flex items-center justify-between mb-4 relative z-10">
                                      {
                                        <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider font-display">
                                          {"Confirmed Opens"}
                                        </span>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="flex items-baseline justify-between relative z-10 mt-1">
                                      {
                                        <span className="text-4xl font-extralight font-display text-emerald-600 dark:text-emerald-400 tracking-tight">
                                          {<Y5 value={Xr} />}
                                        </span>
                                      }
                                      {
                                        <div className="relative items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                                          {
                                            <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#34d399_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#10b981_50%,#18181b_100%)] opacity-80" />
                                          }
                                          {
                                            <span className="relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                              {
                                                <span
                                                  className="absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(52,211,153,0.4),50%,transparent,75%,rgba(52,211,153,0.4),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(16,185,129,0.3),50%,transparent,75%,rgba(16,185,129,0.3),100%)] mix-blend-overlay pointer-events-none"
                                                  style={{
                                                    backgroundSize: "300% 100%",
                                                  }}
                                                />
                                              }
                                              {
                                                <span className="relative z-10">
                                                  {"Verified"}
                                                </span>
                                              }
                                            </span>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                </Lt.div>
                              }
                              {
                                <Lt.div
                                  id="metric-pending"
                                  variants={Kt}
                                  className="relative overflow-hidden group bg-gradient-to-br from-white/95 via-amber-500/[0.01] to-neutral-100/80 dark:from-[#0f0f12] dark:via-[#0a0a0c] dark:to-[#030304] border border-neutral-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-md dark:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-neutral-300 dark:hover:border-zinc-700/80"
                                >
                                  {
                                    <div
                                      className="absolute inset-0 rounded-2xl animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(251,191,36,0.15),50%,transparent,75%,rgba(251,191,36,0.15),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(251,191,36,0.1),50%,transparent,75%,rgba(251,191,36,0.1),100%)] mix-blend-overlay pointer-events-none"
                                      style={{
                                        backgroundSize: "300% 100%",
                                      }}
                                    />
                                  }
                                  {
                                    <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-amber-500/10 dark:bg-amber-500/5 blur-xl pointer-events-none transition-transform duration-500 group-hover:scale-150" />
                                  }
                                  {
                                    <div className="flex items-center justify-between mb-4 relative z-10">
                                      {
                                        <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider font-display">
                                          {"Pending Delivery"}
                                        </span>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="flex items-baseline justify-between relative z-10 mt-1">
                                      {
                                        <span className="text-4xl font-extralight font-display text-amber-600 dark:text-amber-500 tracking-tight">
                                          {<Y5 value={fo} />}
                                        </span>
                                      }
                                      {
                                        <div className="relative items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-300">
                                          {
                                            <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#fbbf24_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#f59e0b_50%,#18181b_100%)] opacity-80" />
                                          }
                                          {
                                            <span className="relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                              {
                                                <span
                                                  className="absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(251,191,36,0.4),50%,transparent,75%,rgba(251,191,36,0.4),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(245,158,11,0.3),50%,transparent,75%,rgba(245,158,11,0.3),100%)] mix-blend-overlay pointer-events-none"
                                                  style={{
                                                    backgroundSize: "300% 100%",
                                                  }}
                                                />
                                              }
                                              {
                                                <span className="relative z-10">
                                                  {"Queued"}
                                                </span>
                                              }
                                            </span>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                </Lt.div>
                              }
                              {
                                <Lt.div
                                  id="metric-rate"
                                  variants={Kt}
                                  className="relative overflow-hidden group bg-gradient-to-br from-white/95 via-zinc-500/[0.01] to-neutral-100/80 dark:from-[#0f0f12] dark:via-[#0a0a0c] dark:to-[#030304] border border-neutral-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-md dark:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-neutral-300 dark:hover:border-zinc-700/80"
                                >
                                  {
                                    <div
                                      className="absolute inset-0 rounded-2xl animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(161,161,170,0.15),50%,transparent,75%,rgba(161,161,170,0.15),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(161,161,170,0.1),50%,transparent,75%,rgba(161,161,170,0.1),100%)] mix-blend-overlay pointer-events-none"
                                      style={{
                                        backgroundSize: "300% 100%",
                                      }}
                                    />
                                  }
                                  {
                                    <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-zinc-300/20 dark:bg-zinc-800/10 blur-xl pointer-events-none transition-transform duration-500 group-hover:scale-150" />
                                  }
                                  {
                                    <div className="flex items-center justify-between mb-4 relative z-10">
                                      {
                                        <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider font-display">
                                          {"Delivery Rate"}
                                        </span>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="flex items-baseline justify-between relative z-10 mt-1">
                                      {
                                        <span className="text-4xl font-extralight font-display text-neutral-900 dark:text-zinc-100 tracking-tight">
                                          {<Y5 value={xc} />}
                                          {"%"}
                                        </span>
                                      }
                                      {
                                        <div className="relative items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                                          {
                                            <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#a1a1aa_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#71717a_50%,#18181b_100%)] opacity-80" />
                                          }
                                          {
                                            <span className="relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                              {
                                                <span
                                                  className="absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(161,161,170,0.4),50%,transparent,75%,rgba(161,161,170,0.4),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(113,113,122,0.3),50%,transparent,75%,rgba(113,113,122,0.3),100%)] mix-blend-overlay pointer-events-none"
                                                  style={{
                                                    backgroundSize: "300% 100%",
                                                  }}
                                                />
                                              }
                                              {
                                                <span className="relative z-10">
                                                  {"Conversion"}
                                                </span>
                                              }
                                            </span>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                </Lt.div>
                              }
                            </div>
                          }
                          {
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                              {
                                <Lt.div
                                  variants={Kt}
                                  className={`lg:col-span-7 ${Ba}`}
                                >
                                  {
                                    <div className="flex justify-between items-center mb-6">
                                      {
                                        <h3 className="text-sm font-medium font-display text-neutral-900 dark:text-white">
                                          {"System Signal Feed"}
                                        </h3>
                                      }
                                      {
                                        <button
                                          onClick={() => u("activity")}
                                          className="text-xs text-zinc-500 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1"
                                        >
                                          {"Go to Stream "}
                                          {<Tg className="w-3 h-3" />}
                                        </button>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="space-y-4">
                                      {ya.slice(0, 3).map((F) => (
                                        <div key={F.id} className="py-3 border-b border-neutral-200 dark:border-zinc-900 last:border-0 flex items-center justify-between text-xs">
                                          {
                                            <div className="flex items-center gap-3">
                                              {
                                                <div className="p-2 rounded-full bg-neutral-100 dark:bg-zinc-900/80 border border-neutral-200 dark:border-zinc-800/40">
                                                  {F.type === "open" ? (
                                                    <Fd className="w-3.5 h-3.5 text-emerald-500 dark:text-neutral-900 dark:text-white" />
                                                  ) : (
                                                    <Rk className="w-3.5 h-3.5 text-emerald-600 dark:text-neutral-900 dark:text-white" />
                                                  )}
                                                </div>
                                              }
                                              {
                                                <div>
                                                  {
                                                    <div className="text-neutral-800 dark:text-zinc-300 font-normal flex flex-wrap items-center gap-1">
                                                      {
                                                        <span>
                                                          {F.recipient}{" "}
                                                          {
                                                            <span className="text-zinc-500">
                                                              {F.details}
                                                            </span>
                                                          }
                                                        </span>
                                                      }
                                                      {xa(!!F.hasClick)}
                                                    </div>
                                                  }
                                                  {
                                                    <div className="text-[11px] text-zinc-500 mt-0.5 max-w-sm truncate">
                                                      {F.subject}
                                                    </div>
                                                  }
                                                </div>
                                              }
                                            </div>
                                          }
                                          {
                                            <span className="text-[11px] text-zinc-500">
                                              {F.timeAgo}
                                            </span>
                                          }
                                        </div>
                                      ))}
                                    </div>
                                  }
                                </Lt.div>
                              }
                              {
                                <Lt.div
                                  variants={Kt}
                                  className={`lg:col-span-5 ${Ba} flex flex-col justify-between h-full min-h-[295px]`}
                                >
                                  {
                                    <div>
                                      {
                                        <h3 className="text-sm font-medium font-display text-neutral-900 dark:text-white mb-2">
                                          {"Configure Secure Watch"}
                                        </h3>
                                      }
                                      {
                                        <p className="text-xs text-zinc-500 leading-relaxed font-normal mb-6">
                                          {
                                            "Instantly register and inject silent tracking payloads into your active corporate correspondence."
                                          }
                                        </p>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="space-y-3">
                                      {
                                        <button
                                          onClick={() => u("tracking")}
                                          className="w-full py-3 bg-white hover:bg-zinc-200 text-black text-xs font-normal rounded-lg transition-colors flex items-center justify-center gap-2"
                                        >
                                          {<D5 className="w-4 h-4" />}
                                          {" Deploy Tracker Matrix"}
                                        </button>
                                      }
                                      {
                                        <div className="text-[10px] text-center text-zinc-600 font-mono">
                                          {
                                            "SECURE WORKSPACE PROTOCOLS COMPLIANT"
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                </Lt.div>
                              }
                            </div>
                          }
                          {
                            <Lt.div
                              variants={Kt}
                              className={`${Ba} overflow-hidden p-6 relative`}
                            >
                              {
                                <Ice
                                  logs={[...g, ...Us].flatMap((F) =>
                                    (F.logs || []).map((ye) => ({
                                      ...ye,
                                      trackerSubject: F.subject,
                                      trackerRecipient: F.recipient,
                                    })),
                                  )}
                                />
                              }
                            </Lt.div>
                          }
                        </div>
                      )}
                      {c === "activity" && (
                        <div className="space-y-8 animate-fadeIn">
                          {
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              {
                                <div>
                                  {
                                    <h2 className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight">
                                      {"Latest Activity Stream"}
                                    </h2>
                                  }
                                  {
                                    <p className="text-xs text-zinc-500 mt-1">
                                      {
                                        "Wide, ultra-minimalist chronological feed detailing absolute confirmed recipient opens and conversions."
                                      }
                                    </p>
                                  }
                                </div>
                              }
                              {
                                <div className="relative">
                                  {
                                    <div
                                      onClick={() => ie(!B)}
                                      className="appearance-none bg-neutral-50 dark:bg-zinc-950/50 backdrop-blur-md border border-neutral-200 dark:border-zinc-800 text-neutral-800 dark:text-zinc-300 text-xs px-4 py-2.5 pr-10 rounded-lg focus:outline-none transition-all cursor-pointer font-normal flex items-center gap-2 select-none"
                                    >
                                      {R === "all"
                                        ? "All Accounts"
                                        : R === "gmail"
                                          ? "work@gmail.com (Gmail)"
                                          : R === "outlook"
                                            ? "personal@outlook.com (Outlook)"
                                            : R === "yahoo"
                                              ? "contact@yahoo.com (Yahoo)"
                                              : "me@icloud.com (Apple)"}
                                      {
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                          {
                                            <Vd className="w-4 h-4 text-zinc-400" />
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                  {
                                    <Hi>
                                      {B && (
                                        <Lt.div
                                          initial={{
                                            opacity: 0,
                                            y: 5,
                                          }}
                                          animate={{
                                            opacity: 1,
                                            y: 0,
                                          }}
                                          exit={{
                                            opacity: 0,
                                            y: 5,
                                          }}
                                          transition={{
                                            duration: 0.15,
                                          }}
                                          className="absolute right-0 top-full mt-2 w-64 bg-white/30 dark:bg-[#111111]/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden ring-1 ring-black/5 dark:ring-white/5"
                                        >
                                          {
                                            <div className="p-1">
                                              {
                                                <button
                                                  onClick={() => {
                                                    (Q("all"), ie(!1));
                                                  }}
                                                  className="w-full text-left px-3 py-2 text-xs text-neutral-800 dark:text-white hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center justify-between group"
                                                >
                                                  {
                                                    <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-500 dark:from-white dark:to-neutral-400">
                                                      {
                                                        "All Accounts (Premium View)"
                                                      }
                                                    </span>
                                                  }
                                                  {
                                                    <Gp className="w-3.5 h-3.5 text-amber-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                  }
                                                </button>
                                              }
                                              {
                                                <button
                                                  onClick={() => {
                                                    (Q("gmail"), ie(!1));
                                                  }}
                                                  className="w-full text-left px-3 py-2 text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2"
                                                >
                                                  {
                                                    <Y6 className="w-3.5 h-3.5" />
                                                  }
                                                  {" work@gmail.com"}
                                                </button>
                                              }
                                              {
                                                <button
                                                  onClick={() => {
                                                    (Q("outlook"), ie(!1));
                                                  }}
                                                  className="w-full text-left px-3 py-2 text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2"
                                                >
                                                  {
                                                    <N6 className="w-3.5 h-3.5" />
                                                  }
                                                  {" personal@outlook.com"}
                                                </button>
                                              }
                                              {
                                                <button
                                                  onClick={() => {
                                                    (Q("yahoo"), ie(!1));
                                                  }}
                                                  className="w-full text-left px-3 py-2 text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2"
                                                >
                                                  {
                                                    <W6 className="w-3.5 h-3.5 text-[#6001D2]" />
                                                  }
                                                  {" contact@yahoo.com"}
                                                </button>
                                              }
                                              {
                                                <button
                                                  onClick={() => {
                                                    (Q("apple"), ie(!1));
                                                  }}
                                                  className="w-full text-left px-3 py-2 text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2"
                                                >
                                                  {
                                                    <D6 className="w-3.5 h-3.5 text-black dark:text-white" />
                                                  }
                                                  {" me@icloud.com"}
                                                </button>
                                              }
                                            </div>
                                          }
                                        </Lt.div>
                                      )}
                                    </Hi>
                                  }
                                  {
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                      {<Vd className="w-4 h-4 text-zinc-400" />}
                                    </div>
                                  }
                                </div>
                              }
                            </div>
                          }
                          {
                            <Lt.div
                              variants={Kt}
                              className={`${Ba} divide-y divide-neutral-200/60 dark:divide-zinc-900/60 p-0 overflow-hidden`}
                            >
                              {
                                <div className="p-6 border-b border-neutral-200 dark:border-zinc-900 flex items-center justify-between bg-neutral-50/50 dark:bg-zinc-950/20">
                                  {
                                    <span className="text-xs text-neutral-500 dark:text-zinc-400 font-medium">
                                      {"Continuous Timeline Activities"}
                                    </span>
                                  }
                                  {
                                    <span className="text-xs text-zinc-500 font-normal">
                                      {ya.length}
                                      {" events logged"}
                                    </span>
                                  }
                                </div>
                              }
                              {
                                <div className="p-6 space-y-0 divide-y divide-neutral-200 dark:divide-zinc-900/40">
                                  {ya.map((F) => (
                                    <div key={F.id} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-neutral-100/40 dark:hover:bg-zinc-900/10">
                                      {
                                        <div className="flex items-start gap-4">
                                          {
                                            <div className="p-2.5 rounded-full bg-neutral-100 dark:bg-zinc-900/80 border border-neutral-200 dark:border-zinc-800/50 shrink-0 mt-0.5">
                                              {F.type === "open" ? (
                                                <Fd className="w-4 h-4 text-neutral-900 dark:text-white" />
                                              ) : (
                                                <Rk className="w-4 h-4 text-neutral-900 dark:text-white" />
                                              )}
                                            </div>
                                          }
                                          {
                                            <div className="space-y-1">
                                              {
                                                <div className="text-sm font-normal text-neutral-800 dark:text-zinc-200 flex flex-wrap items-center gap-1">
                                                  {F.id.charCodeAt(
                                                    F.id.length - 1,
                                                  ) %
                                                    2 ===
                                                    0 ? (
                                                    <div className="p-1 bg-white dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800/50 w-6 h-6 inline-flex items-center justify-center rounded-md mr-3 shadow-sm">
                                                      {<A6e />}
                                                    </div>
                                                  ) : (
                                                    <div className="p-1 bg-white dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800/50 w-6 h-6 inline-flex items-center justify-center rounded-md mr-3 shadow-sm">
                                                      {<R6e />}
                                                    </div>
                                                  )}
                                                  {
                                                    <span>
                                                      {F.recipient}{" "}
                                                      {
                                                        <span className="text-zinc-500 font-normal">
                                                          {F.details}
                                                        </span>
                                                      }
                                                    </span>
                                                  }
                                                  {xa(!!F.hasClick)}
                                                </div>
                                              }
                                              {
                                                <div className="text-xs text-zinc-500 font-normal max-w-2xl leading-relaxed">
                                                  {F.subject}
                                                </div>
                                              }
                                            </div>
                                          }
                                        </div>
                                      }
                                      {
                                        <div className="text-xs text-zinc-500 text-right shrink-0 sm:self-center font-mono">
                                          {F.timeAgo}
                                        </div>
                                      }
                                    </div>
                                  ))}
                                  {ya.length === 0 && (
                                    <div className="py-12 text-center text-zinc-500 font-normal italic">
                                      {
                                        "No recent interaction activities detected."
                                      }
                                    </div>
                                  )}
                                </div>
                              }
                            </Lt.div>
                          }
                        </div>
                      )}
                      {c === "manual_dispatch" && (
                        <ManualEmailDispatch />
                      )}
                      {c === "tracking" && (
                        <div className="space-y-8 animate-fadeIn">
                          {
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              {
                                <div>
                                  {
                                    <h2 className="text-2xl font-semibold font-display text-neutral-900 dark:text-white tracking-tight">
                                      {"Email Tracking"}
                                    </h2>
                                  }
                                  {
                                    <p className="text-xs text-zinc-500 mt-1 font-normal">
                                      {
                                        "Set up a tracking pixel and link redirect to monitor when recipients open and click your emails."
                                      }
                                    </p>
                                  }
                                </div>
                              }
                              {
                                <div className="relative">
                                  {
                                    <div
                                      onClick={() => ie(!B)}
                                      className="appearance-none bg-neutral-50 dark:bg-zinc-950/50 backdrop-blur-md border border-neutral-200 dark:border-zinc-800 text-neutral-800 dark:text-zinc-300 text-xs px-4 py-2.5 pr-10 rounded-lg focus:outline-none transition-all cursor-pointer font-normal flex items-center gap-2 select-none"
                                    >
                                      {R === "all"
                                        ? "All Accounts"
                                        : R === "gmail"
                                          ? "work@gmail.com (Gmail)"
                                          : R === "outlook"
                                            ? "personal@outlook.com (Outlook)"
                                            : R === "yahoo"
                                              ? "contact@yahoo.com (Yahoo)"
                                              : "me@icloud.com (Apple)"}
                                      {
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                          {
                                            <Vd className="w-4 h-4 text-zinc-400" />
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                  {
                                    <Hi>
                                      {B && (
                                        <Lt.div
                                          initial={{
                                            opacity: 0,
                                            y: 5,
                                          }}
                                          animate={{
                                            opacity: 1,
                                            y: 0,
                                          }}
                                          exit={{
                                            opacity: 0,
                                            y: 5,
                                          }}
                                          transition={{
                                            duration: 0.15,
                                          }}
                                          className="absolute right-0 top-full mt-2 w-64 bg-white/30 dark:bg-[#111111]/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden ring-1 ring-black/5 dark:ring-white/5"
                                        >
                                          {
                                            <div className="p-1">
                                              {
                                                <button
                                                  onClick={() => {
                                                    (Q("all"), ie(!1));
                                                  }}
                                                  className="w-full text-left px-3 py-2 text-xs text-neutral-800 dark:text-white hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center justify-between group"
                                                >
                                                  {
                                                    <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-500 dark:from-white dark:to-neutral-400">
                                                      {
                                                        "All Accounts (Premium View)"
                                                      }
                                                    </span>
                                                  }
                                                  {
                                                    <Gp className="w-3.5 h-3.5 text-amber-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                  }
                                                </button>
                                              }
                                              {
                                                <button
                                                  onClick={() => {
                                                    (Q("gmail"), ie(!1));
                                                  }}
                                                  className="w-full text-left px-3 py-2 text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2"
                                                >
                                                  {
                                                    <Y6 className="w-3.5 h-3.5" />
                                                  }
                                                  {" work@gmail.com"}
                                                </button>
                                              }
                                              {
                                                <button
                                                  onClick={() => {
                                                    (Q("outlook"), ie(!1));
                                                  }}
                                                  className="w-full text-left px-3 py-2 text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2"
                                                >
                                                  {
                                                    <N6 className="w-3.5 h-3.5" />
                                                  }
                                                  {" personal@outlook.com"}
                                                </button>
                                              }
                                              {
                                                <button
                                                  onClick={() => {
                                                    (Q("yahoo"), ie(!1));
                                                  }}
                                                  className="w-full text-left px-3 py-2 text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2"
                                                >
                                                  {
                                                    <W6 className="w-3.5 h-3.5 text-[#6001D2]" />
                                                  }
                                                  {" contact@yahoo.com"}
                                                </button>
                                              }
                                              {
                                                <button
                                                  onClick={() => {
                                                    (Q("apple"), ie(!1));
                                                  }}
                                                  className="w-full text-left px-3 py-2 text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2"
                                                >
                                                  {
                                                    <D6 className="w-3.5 h-3.5 text-black dark:text-white" />
                                                  }
                                                  {" me@icloud.com"}
                                                </button>
                                              }
                                            </div>
                                          }
                                        </Lt.div>
                                      )}
                                    </Hi>
                                  }
                                </div>
                              }
                            </div>
                          }
                          {
                            <Lt.div
                              variants={Kt}
                              className="bg-white/40 dark:bg-zinc-900/40 border border-neutral-200/50 dark:border-zinc-800/50 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3"
                            >
                              {<Om className="w-4 h-4 text-zinc-400 ml-2" />}
                              {
                                <input
                                  type="text"
                                  placeholder="Advanced search by recipient, subject, or domain..."
                                  className="bg-transparent border-none focus:outline-none text-xs text-neutral-900 dark:text-white w-full placeholder:text-zinc-500 font-normal"
                                />
                              }
                              {
                                <button className="px-3 py-1.5 bg-neutral-900 dark:bg-zinc-100 text-white dark:text-neutral-900 text-[10px] font-medium rounded-lg whitespace-nowrap hover:bg-neutral-800 dark:hover:bg-white transition-colors">
                                  {"Search"}
                                </button>
                              }
                            </Lt.div>
                          }
                          {
                            <Lt.div
                              variants={Kt}
                              className="bg-white/80 dark:bg-zinc-900/20 border border-neutral-200 dark:border-zinc-800/60 rounded-xl overflow-hidden shadow-md dark:shadow-2xl"
                            >
                              {
                                <div className="p-6 border-b border-neutral-200 dark:border-zinc-900 bg-neutral-50/50 dark:bg-zinc-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  {
                                    <div>
                                      {
                                        <h3 className="text-sm font-medium font-display text-neutral-900 dark:text-white">
                                          {"Outbound Recipient Database"}
                                        </h3>
                                      }
                                      {
                                        <p className="text-xs text-zinc-500 mt-1 font-normal">
                                          {
                                            "Spacious real-time record ledger of active tracking sessions with zero developer clutter."
                                          }
                                        </p>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="flex items-center gap-3">
                                      {
                                        <button
                                          onClick={va}
                                          className="px-4 py-2 text-xs font-normal bg-neutral-900 hover:bg-black dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white rounded-lg border border-neutral-800 dark:border-zinc-700/80 shadow-sm flex items-center gap-2 cursor-pointer transition-all duration-200 active:scale-95 font-mono"
                                        >
                                          {
                                            <HD className="w-3.5 h-3.5 text-neutral-400 dark:text-zinc-300" />
                                          }
                                          {"EXPORT PDF REPORT"}
                                        </button>
                                      }
                                      {
                                        <div className="text-xs text-zinc-500 font-normal hidden sm:block">
                                          {"Showing "}
                                          {sa.length}
                                          {" tracked session"}
                                          {sa.length !== 1 ? "s" : ""}
                                        </div>
                                      }
                                    </div>
                                  }
                                </div>
                              }
                              {
                                <div className="overflow-x-auto">
                                  {
                                    <table className="w-full text-left border-collapse text-xs">
                                      {
                                        <thead>
                                          {
                                            <tr className="bg-neutral-100 dark:bg-zinc-950/40 text-zinc-500 text-[10px] uppercase border-b border-neutral-200 dark:border-zinc-900 font-normal tracking-wider">
                                              {
                                                <th className="px-6 py-5 font-normal tracking-wider">
                                                  {"Recipient Target"}
                                                </th>
                                              }
                                              {
                                                <th className="px-6 py-5 font-normal tracking-wider">
                                                  {"Status"}
                                                </th>
                                              }
                                              {
                                                <th className="px-6 py-5 font-normal tracking-wider">
                                                  {"Open Count"}
                                                </th>
                                              }
                                              {
                                                <th className="px-6 py-5 font-normal tracking-wider">
                                                  {"Dispatch Timestamp"}
                                                </th>
                                              }
                                              {
                                                <th className="px-6 py-5 font-normal tracking-wider">
                                                  {"Latest Open Confirmation"}
                                                </th>
                                              }
                                              {
                                                <th className="px-6 py-5 font-normal tracking-wider text-right">
                                                  {"Actions"}
                                                </th>
                                              }
                                            </tr>
                                          }
                                        </thead>
                                      }
                                      {
                                        <tbody className="divide-y divide-neutral-200 dark:divide-zinc-900/40">
                                          {(() => {
                                            const F = [];
                                            for (const ye of eu) {
                                              const Be = ye.logs
                                                .filter(
                                                  (pt) => pt.type === "open",
                                                )
                                                .sort(
                                                  (pt, mt) =>
                                                    new Date(
                                                      pt.timestamp,
                                                    ).getTime() -
                                                    new Date(
                                                      mt.timestamp,
                                                    ).getTime(),
                                                );
                                              Be.length === 0
                                                ? F.push({
                                                  ...ye,
                                                  displayOpenCount: 0,
                                                  rowId: ye.id,
                                                  specificOpenTime: null,
                                                })
                                                : Be.forEach((pt, mt) => {
                                                  F.push({
                                                    ...ye,
                                                    displayOpenCount: mt + 1,
                                                    rowId: `${ye.id}-open-${mt}`,
                                                    specificOpenTime:
                                                      pt.timestamp,
                                                  });
                                                });
                                            }
                                            return (
                                              F.sort((ye, Be) => {
                                                const pt = ye.specificOpenTime
                                                  ? new Date(
                                                    ye.specificOpenTime,
                                                  ).getTime()
                                                  : new Date(
                                                    ye.createdAt,
                                                  ).getTime();
                                                return (
                                                  (Be.specificOpenTime
                                                    ? new Date(
                                                      Be.specificOpenTime,
                                                    ).getTime()
                                                    : new Date(
                                                      Be.createdAt,
                                                    ).getTime()) - pt
                                                );
                                              }),
                                              F.map((ye) => {
                                                const Be = {
                                                  label:
                                                    ye.displayOpenCount > 0 ||
                                                      ye.status === "opened"
                                                      ? "Confirmed"
                                                      : "Pending",
                                                  badgeClass:
                                                    ye.displayOpenCount > 0 ||
                                                      ye.status === "opened"
                                                      ? "text-neutral-900 dark:text-white bg-emerald-500/5 border border-emerald-500/20"
                                                      : "text-amber-400 bg-amber-500/5 border border-amber-500/20",
                                                },
                                                  pt = !!rt[ye.rowId];
                                                Ui(ye);
                                                const mt =
                                                  new Date(
                                                    ye.createdAt,
                                                  ).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                      month: "short",
                                                      day: "numeric",
                                                    },
                                                  ) +
                                                  ", " +
                                                  new Date(
                                                    ye.createdAt,
                                                  ).toLocaleTimeString(
                                                    "en-US",
                                                    {
                                                      hour: "2-digit",
                                                      minute: "2-digit",
                                                    },
                                                  ),
                                                  Wt = ye.specificOpenTime
                                                    ? XR(ye.specificOpenTime)
                                                    : "Not Opened Yet";
                                                return (
                                                  <Tr.Fragment key={ye.rowId || ye.id}>
                                                    {
                                                      <tr
                                                        className={`border-b border-neutral-200/50 dark:border-zinc-900/50 transition-colors ${pt ? "bg-neutral-100/30 dark:bg-zinc-900/10 border-b-0" : "hover:bg-neutral-100/40 dark:hover:bg-zinc-900/10"}`}
                                                      >
                                                        {
                                                          <td className="px-6 py-6">
                                                            {
                                                              <div className="flex items-center gap-2">
                                                                {
                                                                  <div className="p-1 bg-white dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800/50 w-6 h-6 inline-flex items-center justify-center rounded-md shadow-sm">
                                                                    {uk(
                                                                      ye.recipient,
                                                                      "w-3.5 h-3.5",
                                                                    )}
                                                                  </div>
                                                                }
                                                                {
                                                                  <div className="text-neutral-800 dark:text-zinc-200 font-medium text-sm flex items-center gap-1.5">
                                                                    {
                                                                      ye.recipient
                                                                    }
                                                                    {ye.isManual && (
                                                                      <div className="group/icon relative inline-flex items-center justify-center shrink-0 cursor-default">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                                                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 font-sans">
                                                                          Sent manually using TICKK
                                                                        </div>
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                }
                                                              </div>
                                                            }
                                                            {
                                                              <div className="text-[11px] text-zinc-500 mt-1 font-normal tracking-tight">
                                                                {ye.subject}
                                                              </div>
                                                            }
                                                          </td>
                                                        }
                                                        {
                                                          <td className="px-6 py-6">
                                                            {
                                                              <span
                                                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-normal border ${Be.badgeClass}`}
                                                              >
                                                                {Be.label ===
                                                                  "Confirmed" ? (
                                                                  <En_Icon
                                                                    className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 mr-1"
                                                                    strokeWidth={
                                                                      3
                                                                    }
                                                                  />
                                                                ) : (
                                                                  <C5 className="w-3 h-3 text-amber-500 mr-1" />
                                                                )}
                                                                {Be.label}
                                                              </span>
                                                            }
                                                          </td>
                                                        }
                                                        {
                                                          <td className="px-6 py-6 text-neutral-600 dark:text-zinc-400 font-normal">
                                                            {
                                                              <div className="flex flex-col gap-1.5 justify-center">
                                                                {
                                                                  <div>
                                                                    {ye.displayOpenCount >
                                                                      0 ? (
                                                                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-50 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-850 rounded-lg text-[10px] font-mono text-neutral-800 dark:text-zinc-200 shadow-sm select-none whitespace-nowrap">
                                                                        {
                                                                          <span className="font-normal tracking-wide text-neutral-700 dark:text-zinc-300 whitespace-nowrap">
                                                                            {
                                                                              ye.displayOpenCount
                                                                            }
                                                                            {ye.displayOpenCount ===
                                                                              1
                                                                              ? "st"
                                                                              : ye.displayOpenCount ===
                                                                                2
                                                                                ? "nd"
                                                                                : ye.displayOpenCount ===
                                                                                  3
                                                                                  ? "rd"
                                                                                  : "th"}
                                                                            {
                                                                              " time!"
                                                                            }
                                                                          </span>
                                                                        }
                                                                        {ye.linkUrl ? (
                                                                          <React.Fragment>
                                                                            {
                                                                              <span className="h-3 w-[1px] bg-neutral-300 dark:bg-zinc-800" />
                                                                            }
                                                                            {ye.clickCount &&
                                                                              ye.clickCount >
                                                                              0 ? (
                                                                              <span className="inline-flex items-center gap-1 text-neutral-700 dark:text-zinc-300 font-normal whitespace-nowrap">
                                                                                {
                                                                                  <En_Icon
                                                                                    className="w-3.5 h-3.5 text-emerald-500"
                                                                                    strokeWidth={
                                                                                      3
                                                                                    }
                                                                                  />
                                                                                }
                                                                                {
                                                                                  "Link Clicked"
                                                                                }
                                                                              </span>
                                                                            ) : (
                                                                              <span className="inline-flex items-center gap-1 text-neutral-500 dark:text-zinc-400 font-normal whitespace-nowrap">
                                                                                {
                                                                                  <JO
                                                                                    className="w-3 h-3 text-neutral-400 dark:text-zinc-500"
                                                                                    strokeWidth={
                                                                                      2.5
                                                                                    }
                                                                                  />
                                                                                }
                                                                                {
                                                                                  "No Link Clicked"
                                                                                }
                                                                              </span>
                                                                            )}
                                                                          </React.Fragment>
                                                                        ) : (
                                                                          <React.Fragment>
                                                                            {
                                                                              <span className="h-3 w-[1px] bg-neutral-300 dark:bg-zinc-800" />
                                                                            }
                                                                            {
                                                                              <span className="inline-flex items-center gap-1 text-neutral-450 dark:text-zinc-500 font-normal whitespace-nowrap">
                                                                                {
                                                                                  <JO
                                                                                    className="w-3 h-3 text-neutral-400 dark:text-zinc-600"
                                                                                    strokeWidth={
                                                                                      2.5
                                                                                    }
                                                                                  />
                                                                                }
                                                                                {
                                                                                  "No Links Added"
                                                                                }
                                                                              </span>
                                                                            }
                                                                          </React.Fragment>
                                                                        )}
                                                                      </span>
                                                                    ) : (
                                                                      <span className="inline-flex items-center px-2.5 py-1.5 bg-neutral-100 dark:bg-zinc-900/40 border border-neutral-200/50 dark:border-zinc-800/40 rounded-lg text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                                                                        {
                                                                          "No Opens"
                                                                        }
                                                                      </span>
                                                                    )}
                                                                  </div>
                                                                }
                                                              </div>
                                                            }
                                                          </td>
                                                        }
                                                        {
                                                          <td className="px-6 py-6 text-neutral-600 dark:text-zinc-400 font-normal">
                                                            {mt}
                                                          </td>
                                                        }
                                                        {
                                                          <td className="px-6 py-6 text-neutral-500 dark:text-zinc-500 font-normal">
                                                            {Wt}
                                                          </td>
                                                        }
                                                        {
                                                          <td className="px-6 py-6 text-right whitespace-nowrap">
                                                            {
                                                              <div className="inline-flex items-center gap-3">
                                                                {
                                                                  <button
                                                                    onClick={() =>
                                                                      ai(ye.id)
                                                                    }
                                                                    className="p-2 text-zinc-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded-lg border border-neutral-200 dark:border-zinc-800/40 transition-all cursor-pointer"
                                                                    title="Copy Tracking Pixel Snippet"
                                                                  >
                                                                    {ct ===
                                                                      ye.id ? (
                                                                      <En_Icon className="w-3.5 h-3.5 text-emerald-500" />
                                                                    ) : (
                                                                      <Id className="w-3.5 h-3.5" />
                                                                    )}
                                                                  </button>
                                                                }
                                                                {
                                                                  <button
                                                                    onClick={() => {
                                                                      (sn(ye),
                                                                        _t(!0),
                                                                        et(
                                                                          "visual",
                                                                        ));
                                                                    }}
                                                                    className="p-2 text-zinc-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded-lg border border-neutral-200 dark:border-zinc-800/40 transition-all cursor-pointer"
                                                                    title="Preview Email HTML Content"
                                                                  >
                                                                    {
                                                                      <Fd className="w-3.5 h-3.5 text-emerald-600 dark:text-neutral-900 dark:text-white" />
                                                                    }
                                                                  </button>
                                                                }
                                                                {
                                                                  <button
                                                                    onClick={() =>
                                                                      tu(
                                                                        ye.rowId,
                                                                      )
                                                                    }
                                                                    className="px-3.5 py-1.5 text-xs font-normal border border-neutral-200 dark:border-zinc-800 hover:border-neutral-300 dark:hover:border-zinc-700 bg-neutral-100 dark:bg-zinc-900/40 hover:bg-neutral-200 dark:hover:bg-zinc-900/80 text-neutral-700 dark:text-zinc-300 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                                                                  >
                                                                    {
                                                                      <span>
                                                                        {
                                                                          "View Timeline"
                                                                        }
                                                                      </span>
                                                                    }
                                                                    {pt ? (
                                                                      <FD className="w-3.5 h-3.5 text-zinc-400" />
                                                                    ) : (
                                                                      <Vd className="w-3.5 h-3.5 text-zinc-400" />
                                                                    )}
                                                                  </button>
                                                                }
                                                              </div>
                                                            }
                                                          </td>
                                                        }
                                                      </tr>
                                                    }
                                                    {pt && (
                                                      <tr className="bg-neutral-100/30 dark:bg-zinc-900/10 border-b border-neutral-200/50 dark:border-zinc-900/50">
                                                        {
                                                          <td
                                                            colSpan={6}
                                                            className="px-6 pb-6 pt-1"
                                                          >
                                                            {
                                                              <Lt.div
                                                                initial="hidden"
                                                                animate="visible"
                                                                exit="exit"
                                                                variants={KR}
                                                                className="overflow-hidden"
                                                              >
                                                                {
                                                                  <div className="w-full mx-auto bg-white/20 dark:bg-black/20 backdrop-blur-2xl rounded-2xl border border-neutral-200/30 dark:border-zinc-800/40 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
                                                                    {
                                                                      <div className="relative bg-neutral-50/60 dark:bg-[#0d0d0f]/60 backdrop-blur-3xl p-6 md:p-8 rounded-[14px] border border-white/10 dark:border-zinc-900/30 space-y-6">
                                                                        {
                                                                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/40 dark:border-zinc-800/30 pb-4">
                                                                            {
                                                                              <div className="space-y-0.5">
                                                                                {
                                                                                  <div className="text-[10px] uppercase text-neutral-500 dark:text-zinc-400 tracking-[0.18em] font-bold font-mono flex items-center gap-2">
                                                                                    {
                                                                                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-zinc-500 animate-pulse" />
                                                                                    }
                                                                                    {
                                                                                      "TELEMETRY LIFECYCLE"
                                                                                    }
                                                                                  </div>
                                                                                }
                                                                                {
                                                                                  <h4 className="text-sm font-bold text-neutral-900 dark:text-zinc-100 flex items-center gap-2 tracking-tight">
                                                                                    {
                                                                                      <Ud className="w-4 h-4 text-neutral-500 dark:text-zinc-400" />
                                                                                    }
                                                                                    {
                                                                                      "Interaction Timeline Map"
                                                                                    }
                                                                                  </h4>
                                                                                }
                                                                              </div>
                                                                            }
                                                                            {
                                                                              <div className="flex flex-wrap gap-1.5">
                                                                                {
                                                                                  <span className="px-2.5 py-0.5 bg-neutral-200/40 dark:bg-zinc-900/50 border border-neutral-300/20 dark:border-zinc-800/40 rounded text-[10px] font-mono text-neutral-600 dark:text-zinc-300">
                                                                                    {
                                                                                      "TO: "
                                                                                    }
                                                                                    {
                                                                                      <span className="font-normal text-neutral-800 dark:text-zinc-100">
                                                                                        {
                                                                                          ye.recipient
                                                                                        }
                                                                                      </span>
                                                                                    }
                                                                                  </span>
                                                                                }
                                                                                {
                                                                                  <span className="px-2.5 py-0.5 bg-neutral-900/5 dark:bg-white/5 border border-neutral-200 dark:border-zinc-800/40 rounded text-[10px] font-mono text-neutral-800 dark:text-zinc-200 flex items-center gap-1">
                                                                                    {
                                                                                      <Kp className="w-3 h-3 text-neutral-500" />
                                                                                    }
                                                                                    {
                                                                                      "OPENS: "
                                                                                    }
                                                                                    {
                                                                                      <span className="font-normal">
                                                                                        {ye.displayOpenCount ||
                                                                                          0}
                                                                                      </span>
                                                                                    }
                                                                                  </span>
                                                                                }
                                                                                {ye.linkUrl && (
                                                                                  <span className="px-2.5 py-0.5 text-neutral-900 dark:text-white bg-emerald-500/5 border border-emerald-500/20 rounded-full text-[10px] font-mono flex items-center gap-1 shadow-sm">
                                                                                    {
                                                                                      <En_Icon
                                                                                        className="w-3.5 h-3.5 text-emerald-500"
                                                                                        strokeWidth={
                                                                                          3
                                                                                        }
                                                                                      />
                                                                                    }
                                                                                    {
                                                                                      "CLICKS: "
                                                                                    }
                                                                                    {
                                                                                      <span className="font-normal">
                                                                                        {ye.clickCount ||
                                                                                          0}
                                                                                      </span>
                                                                                    }
                                                                                  </span>
                                                                                )}
                                                                              </div>
                                                                            }
                                                                          </div>
                                                                        }
                                                                        {(() => {
                                                                          const tr =
                                                                            [
                                                                              ...(ye.logs ||
                                                                                []),
                                                                            ].sort(
                                                                              (
                                                                                Nt,
                                                                                vr,
                                                                              ) =>
                                                                                new Date(
                                                                                  Nt.timestamp,
                                                                                ).getTime() -
                                                                                new Date(
                                                                                  vr.timestamp,
                                                                                ).getTime(),
                                                                            );
                                                                          let Bn = 0,
                                                                            bn = 0;
                                                                          const Nn =
                                                                            {};
                                                                          return (
                                                                            tr.forEach(
                                                                              (
                                                                                Nt,
                                                                              ) => {
                                                                                Nt.type ===
                                                                                  "click"
                                                                                  ? (bn++,
                                                                                    (Nn[
                                                                                      Nt.id
                                                                                    ] =
                                                                                      `Click # ${String(bn).padStart(2, "0")}`))
                                                                                  : (Bn++,
                                                                                    (Nn[
                                                                                      Nt.id
                                                                                    ] =
                                                                                      `Open # ${String(Bn).padStart(2, "0")}`));
                                                                              },
                                                                            ),
                                                                            ye.logs &&
                                                                              ye
                                                                                .logs
                                                                                .length >
                                                                              0 ? (
                                                                              <div className="w-full rounded-xl border border-neutral-200/50 dark:border-zinc-900/60 bg-white/20 dark:bg-zinc-950/20 backdrop-blur-2xl">
                                                                                {
                                                                                  <table className="w-full text-left text-xs table-auto">
                                                                                    {
                                                                                      <thead>
                                                                                        {
                                                                                          <tr className="border-b border-neutral-200/50 dark:border-zinc-800/50 text-zinc-500 dark:text-zinc-400 bg-neutral-100/30 dark:bg-zinc-900/40 backdrop-blur-md">
                                                                                            {
                                                                                              <th className="px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider">
                                                                                                {
                                                                                                  "Sequence / ID"
                                                                                                }
                                                                                              </th>
                                                                                            }
                                                                                            {
                                                                                              <th className="px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider">
                                                                                                {
                                                                                                  "Action / Event"
                                                                                                }
                                                                                              </th>
                                                                                            }
                                                                                            {
                                                                                              <th className="px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider">
                                                                                                {
                                                                                                  "Timestamp"
                                                                                                }
                                                                                              </th>
                                                                                            }
                                                                                            {
                                                                                              <th className="px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider">
                                                                                                {
                                                                                                  "IP Address"
                                                                                                }
                                                                                              </th>
                                                                                            }
                                                                                            {
                                                                                              <th className="px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider">
                                                                                                {
                                                                                                  "Geographic Hub"
                                                                                                }
                                                                                              </th>
                                                                                            }
                                                                                            {
                                                                                              <th className="px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider">
                                                                                                {
                                                                                                  "Device & Browser"
                                                                                                }
                                                                                              </th>
                                                                                            }
                                                                                            {
                                                                                              <th className="px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider text-right">
                                                                                                {
                                                                                                  "Actions"
                                                                                                }
                                                                                              </th>
                                                                                            }
                                                                                          </tr>
                                                                                        }
                                                                                      </thead>
                                                                                    }
                                                                                    {
                                                                                      <tbody>
                                                                                        {ye.logs.map(
                                                                                          (
                                                                                            Nt,
                                                                                          ) => {
                                                                                            const vr =
                                                                                              Nt.type ===
                                                                                              "click",
                                                                                              Rr =
                                                                                                Nn[
                                                                                                Nt
                                                                                                  .id
                                                                                                ] ||
                                                                                                (vr
                                                                                                  ? "Click"
                                                                                                  : "Open");
                                                                                            return (
                                                                                              <tr key={Nt.id} className="border-b border-neutral-200/45 dark:border-zinc-800/35 hover:bg-neutral-50/40 dark:hover:bg-zinc-900/15 transition-colors">
                                                                                                {
                                                                                                  <td className="px-4 py-3.5">
                                                                                                    {
                                                                                                      <span className="font-mono text-[10px] text-neutral-500 dark:text-zinc-400 bg-neutral-100/60 dark:bg-zinc-900/50 border border-neutral-200/40 dark:border-zinc-800/40 px-2.5 py-1 rounded-md select-none">
                                                                                                        {
                                                                                                          Rr
                                                                                                        }
                                                                                                      </span>
                                                                                                    }
                                                                                                  </td>
                                                                                                }
                                                                                                {
                                                                                                  <td className="px-4 py-3.5">
                                                                                                    {vr ? (
                                                                                                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-emerald-500/20 bg-emerald-500/5 text-neutral-900 dark:text-white shadow-sm">
                                                                                                        {
                                                                                                          <En_Icon
                                                                                                            className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 mr-1"
                                                                                                            strokeWidth={
                                                                                                              3
                                                                                                            }
                                                                                                          />
                                                                                                        }
                                                                                                        {
                                                                                                          " Link Clicked"
                                                                                                        }
                                                                                                      </span>
                                                                                                    ) : (
                                                                                                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-neutral-200/80 dark:border-zinc-800 bg-neutral-100/50 dark:bg-white/5 text-neutral-900 dark:text-white shadow-sm">
                                                                                                        {
                                                                                                          <Kp className="w-3.5 h-3.5 text-neutral-400 dark:text-zinc-400 mr-1" />
                                                                                                        }
                                                                                                        {
                                                                                                          " Email Open"
                                                                                                        }
                                                                                                      </span>
                                                                                                    )}
                                                                                                  </td>
                                                                                                }
                                                                                                {
                                                                                                  <td className="px-4 py-3.5 font-mono text-[10.5px] text-neutral-800 dark:text-zinc-300">
                                                                                                    {
                                                                                                      <span>
                                                                                                        {new Date(
                                                                                                          Nt.timestamp,
                                                                                                        ).toLocaleTimeString(
                                                                                                          [],
                                                                                                          {
                                                                                                            hour: "2-digit",
                                                                                                            minute:
                                                                                                              "2-digit",
                                                                                                            second:
                                                                                                              "2-digit",
                                                                                                          },
                                                                                                        )}
                                                                                                      </span>
                                                                                                    }
                                                                                                    {
                                                                                                      <span className="text-neutral-400 dark:text-zinc-500 mx-1.5">
                                                                                                        {
                                                                                                          "•"
                                                                                                        }
                                                                                                      </span>
                                                                                                    }
                                                                                                    {
                                                                                                      <span className="text-neutral-500 dark:text-zinc-400">
                                                                                                        {new Date(
                                                                                                          Nt.timestamp,
                                                                                                        ).toLocaleDateString()}
                                                                                                      </span>
                                                                                                    }
                                                                                                  </td>
                                                                                                }
                                                                                                {
                                                                                                  <td className="px-4 py-3.5 font-mono text-[11px] text-neutral-700 dark:text-zinc-300 font-normal">
                                                                                                    {
                                                                                                      Nt.ip
                                                                                                    }
                                                                                                  </td>
                                                                                                }
                                                                                                {
                                                                                                  <td className="px-4 py-3.5 text-[11px] text-neutral-800 dark:text-zinc-300 font-normal">
                                                                                                    {
                                                                                                      <span>
                                                                                                        {Nt.city ||
                                                                                                          "Unknown"}
                                                                                                      </span>
                                                                                                    }
                                                                                                    {Nt.country && (
                                                                                                      <React.Fragment>
                                                                                                        {
                                                                                                          <span className="text-neutral-400 dark:text-zinc-500 mx-1">
                                                                                                            {
                                                                                                              "•"
                                                                                                            }
                                                                                                          </span>
                                                                                                        }
                                                                                                        {
                                                                                                          <span className="text-neutral-500 dark:text-zinc-400">
                                                                                                            {
                                                                                                              Nt.country
                                                                                                            }
                                                                                                          </span>
                                                                                                        }
                                                                                                      </React.Fragment>
                                                                                                    )}
                                                                                                  </td>
                                                                                                }
                                                                                                {
                                                                                                  <td className="px-4 py-3.5 text-[11px] text-neutral-800 dark:text-zinc-300 font-normal">
                                                                                                    {
                                                                                                      <span>
                                                                                                        {Nt.device ||
                                                                                                          "Desktop"}
                                                                                                      </span>
                                                                                                    }
                                                                                                    {
                                                                                                      <span className="text-neutral-400 dark:text-zinc-500 mx-1.5">
                                                                                                        {
                                                                                                          "•"
                                                                                                        }
                                                                                                      </span>
                                                                                                    }
                                                                                                    {
                                                                                                      <span className="text-neutral-500 dark:text-zinc-400">
                                                                                                        {Nt.browser ||
                                                                                                          "Unknown"}
                                                                                                      </span>
                                                                                                    }
                                                                                                  </td>
                                                                                                }
                                                                                                {
                                                                                                  <td className="px-4 py-3 text-right">
                                                                                                    {
                                                                                                      <div className="inline-flex items-center gap-1.5 justify-end">
                                                                                                        {
                                                                                                          <button
                                                                                                            onClick={() => {
                                                                                                              const Na = `[Telemetry Report] Target: ${ye.recipient} | Event: ${Rr} (${vr ? "Link Clicked" : "Email Opened"}) | Timestamp: ${new Date(Nt.timestamp).toLocaleString()} | IP: ${Nt.ip} | City: ${Nt.city || "Unknown"}, Country: ${Nt.country || "N/A"} | Environment: ${Nt.device || "Desktop"} (${Nt.browser || "Unknown"})`;
                                                                                                              (navigator.clipboard.writeText(
                                                                                                                Na,
                                                                                                              ),
                                                                                                                Qn(
                                                                                                                  Nt.id,
                                                                                                                ),
                                                                                                                s(
                                                                                                                  "Formatted event telemetry copied to clipboard",
                                                                                                                  "success",
                                                                                                                ),
                                                                                                                setTimeout(
                                                                                                                  () =>
                                                                                                                    Qn(
                                                                                                                      null,
                                                                                                                    ),
                                                                                                                  2e3,
                                                                                                                ));
                                                                                                            }}
                                                                                                            className="p-1 text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/50 rounded transition-all cursor-pointer"
                                                                                                            title="Copy event details"
                                                                                                          >
                                                                                                            {Tt ===
                                                                                                              Nt.id ? (
                                                                                                              <En_Icon
                                                                                                                className="w-3.5 h-3.5 text-emerald-500"
                                                                                                                strokeWidth={
                                                                                                                  2
                                                                                                                }
                                                                                                              />
                                                                                                            ) : (
                                                                                                              <Id className="w-3.5 h-3.5" />
                                                                                                            )}
                                                                                                          </button>
                                                                                                        }
                                                                                                        {
                                                                                                          <button
                                                                                                            onClick={() => {
                                                                                                              const Na = `${window.location.origin}/share/tracker/${ye.id}`,
                                                                                                                Pn = `[Telemetry Live Signal] ${ye.recipient} - ${Rr} at ${new Date(Nt.timestamp).toLocaleTimeString()}`;
                                                                                                              navigator.share
                                                                                                                ? navigator
                                                                                                                  .share(
                                                                                                                    {
                                                                                                                      title:
                                                                                                                        "Tickk Telemetry Update",
                                                                                                                      text: Pn,
                                                                                                                      url: Na,
                                                                                                                    },
                                                                                                                  )
                                                                                                                  .catch(
                                                                                                                    () => {
                                                                                                                      (navigator.clipboard.writeText(
                                                                                                                        `${Pn} - ${Na}`,
                                                                                                                      ),
                                                                                                                        Qn(
                                                                                                                          Nt.id +
                                                                                                                          "_share",
                                                                                                                        ),
                                                                                                                        setTimeout(
                                                                                                                          () =>
                                                                                                                            Qn(
                                                                                                                              null,
                                                                                                                            ),
                                                                                                                          2e3,
                                                                                                                        ));
                                                                                                                    },
                                                                                                                  )
                                                                                                                : (navigator.clipboard.writeText(
                                                                                                                  `${Pn} - ${Na}`,
                                                                                                                ),
                                                                                                                  Qn(
                                                                                                                    Nt.id +
                                                                                                                    "_share",
                                                                                                                  ),
                                                                                                                  s(
                                                                                                                    "Telemetry share link copied to clipboard",
                                                                                                                    "success",
                                                                                                                  ),
                                                                                                                  setTimeout(
                                                                                                                    () =>
                                                                                                                      Qn(
                                                                                                                        null,
                                                                                                                      ),
                                                                                                                    2e3,
                                                                                                                  ));
                                                                                                            }}
                                                                                                            className="p-1 text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/50 rounded transition-all cursor-pointer"
                                                                                                            title="Share event link"
                                                                                                          >
                                                                                                            {Tt ===
                                                                                                              Nt.id +
                                                                                                              "_share" ? (
                                                                                                              <En_Icon
                                                                                                                className="w-3.5 h-3.5 text-emerald-500"
                                                                                                                strokeWidth={
                                                                                                                  2
                                                                                                                }
                                                                                                              />
                                                                                                            ) : (
                                                                                                              <Bre className="w-3.5 h-3.5" />
                                                                                                            )}
                                                                                                          </button>
                                                                                                        }
                                                                                                      </div>
                                                                                                    }
                                                                                                  </td>
                                                                                                }
                                                                                              </tr>
                                                                                            );
                                                                                          },
                                                                                        )}
                                                                                      </tbody>
                                                                                    }
                                                                                  </table>
                                                                                }
                                                                              </div>
                                                                            ) : (
                                                                              <div className="py-8 text-center flex flex-col items-center justify-center bg-white/10 dark:bg-black/10 border border-neutral-200/20 dark:border-zinc-900/30 rounded-xl p-6">
                                                                                {
                                                                                  <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-zinc-900 border border-neutral-200/40 dark:border-zinc-800/40 flex items-center justify-center mb-2">
                                                                                    {
                                                                                      <Ud className="w-4 h-4 text-neutral-400" />
                                                                                    }
                                                                                  </div>
                                                                                }
                                                                                {
                                                                                  <p className="text-xs text-neutral-700 dark:text-zinc-300 font-normal">
                                                                                    {
                                                                                      "No telemetric records detected"
                                                                                    }
                                                                                  </p>
                                                                                }
                                                                                {
                                                                                  <p className="text-[11px] text-neutral-500 dark:text-zinc-500 max-w-sm mt-1 leading-relaxed">
                                                                                    {
                                                                                      "We are actively listening for target pixel payload requests on port 3000. Send a test email to trigger events."
                                                                                    }
                                                                                  </p>
                                                                                }
                                                                              </div>
                                                                            )
                                                                          );
                                                                        })()}
                                                                      </div>
                                                                    }
                                                                  </div>
                                                                }
                                                              </Lt.div>
                                                            }
                                                          </td>
                                                        }
                                                      </tr>
                                                    )}
                                                  </Tr.Fragment>
                                                );
                                              })
                                            );
                                          })()}
                                          {sa.length === 0 && (
                                            <tr>
                                              {
                                                <td
                                                  colSpan={5}
                                                  className="px-6 py-12 text-center text-zinc-500 font-normal italic"
                                                >
                                                  {
                                                    "No email trackers registered in your workspace. Use the form above to deploy your first outbound watch."
                                                  }
                                                </td>
                                              }
                                            </tr>
                                          )}
                                        </tbody>
                                      }
                                    </table>
                                  }
                                </div>
                              }
                            </Lt.div>
                          }
                        </div>
                      )}
                      {c === "link_tracking" && (
                        <div className="space-y-8 animate-fadeIn">
                          {
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              {
                                <div>
                                  {
                                    <h2 className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight">
                                      {"Direct Link Telemetry"}
                                    </h2>
                                  }
                                  {
                                    <p className="text-xs text-zinc-500 mt-1">
                                      {
                                        "Generate and monitor secure redirection links to see exactly when and where your links are clicked."
                                      }
                                    </p>
                                  }
                                </div>
                              }
                              {
                                <button
                                  onClick={() => ps(!vl)}
                                  className="self-start md:self-auto px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 text-neutral-800 dark:text-zinc-200 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                                >
                                  {vl
                                    ? "Hide Beginner's Guide"
                                    : "Show Beginner's Guide"}
                                </button>
                              }
                            </div>
                          }
                          {vl && (
                            <Lt.div
                              initial={{
                                opacity: 0,
                                y: -10,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              className="p-6 bg-blue-50/40 dark:bg-zinc-950/20 border border-blue-200/50 dark:border-zinc-900 rounded-2xl space-y-4"
                            >
                              {
                                <div className="flex items-center gap-2">
                                  {
                                    <span className="p-1.5 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400">
                                      {<Gp className="w-4 h-4 animate-pulse" />}
                                    </span>
                                  }
                                  {
                                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                                      {
                                        "Beginner's Guide: How Direct Link Redirection Works"
                                      }
                                    </h3>
                                  }
                                </div>
                              }
                              {
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                                  {
                                    <div className="space-y-1.5 p-3.5 bg-white/60 dark:bg-zinc-950/30 rounded-xl border border-neutral-200/50 dark:border-zinc-900/60">
                                      {
                                        <div className="w-5 h-5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-full flex items-center justify-center font-mono text-[10px] font-bold">
                                          {"1"}
                                        </div>
                                      }
                                      {
                                        <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                                          {"Create a Link"}
                                        </h4>
                                      }
                                      {
                                        <p className="text-[11px] text-zinc-500 leading-relaxed font-normal">
                                          {"Go to "}
                                          {
                                            <strong>
                                              {'"Send New Email"'}
                                            </strong>
                                          }
                                          {
                                            " tab, write down your recipient, and input a "
                                          }
                                          {
                                            <strong>
                                              {"Redirect Destination URL"}
                                            </strong>
                                          }
                                          {"."}
                                        </p>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="space-y-1.5 p-3.5 bg-white/60 dark:bg-zinc-950/30 rounded-xl border border-neutral-200/50 dark:border-zinc-900/60">
                                      {
                                        <div className="w-5 h-5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-full flex items-center justify-center font-mono text-[10px] font-bold">
                                          {"2"}
                                        </div>
                                      }
                                      {
                                        <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                                          {"Copy Redirection Link"}
                                        </h4>
                                      }
                                      {
                                        <p className="text-[11px] text-zinc-500 leading-relaxed font-normal">
                                          {
                                            "Look at your tracked link card below. Click "
                                          }
                                          {<strong>{"Copy Link"}</strong>}
                                          {
                                            " to copy our generated secure redirection link."
                                          }
                                        </p>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="space-y-1.5 p-3.5 bg-white/60 dark:bg-zinc-950/30 rounded-xl border border-neutral-200/50 dark:border-zinc-900/60">
                                      {
                                        <div className="w-5 h-5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-full flex items-center justify-center font-mono text-[10px] font-bold">
                                          {"3"}
                                        </div>
                                      }
                                      {
                                        <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                                          {"Insert in Email"}
                                        </h4>
                                      }
                                      {
                                        <p className="text-[11px] text-zinc-500 leading-relaxed font-normal">
                                          {
                                            'Paste this link as the hyperlink in your email (e.g. Gmail/Outlook) behind text like "Click here to view proposal".'
                                          }
                                        </p>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="space-y-1.5 p-3.5 bg-white/60 dark:bg-zinc-950/30 rounded-xl border border-neutral-200/50 dark:border-zinc-900/60">
                                      {
                                        <div className="w-5 h-5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-full flex items-center justify-center font-mono text-[10px] font-bold">
                                          {"4"}
                                        </div>
                                      }
                                      {
                                        <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                                          {"Watch Live Clicks"}
                                        </h4>
                                      }
                                      {
                                        <p className="text-[11px] text-zinc-500 leading-relaxed font-normal">
                                          {
                                            "When the recipient clicks your link, they are instantly redirected, and we log their browser details instantly!"
                                          }
                                        </p>
                                      }
                                    </div>
                                  }
                                </div>
                              }
                              {
                                <div className="p-3 bg-neutral-100/60 dark:bg-zinc-900/40 rounded-xl border border-neutral-200/40 dark:border-zinc-800/40 text-[11px] text-zinc-600 dark:text-zinc-400">
                                  {"�� "}
                                  {<strong>{"Pro Tip for Testing:"}</strong>}
                                  {
                                    " You do not need to send a real email to test this! Just click the "
                                  }
                                  {
                                    <strong>
                                      {'"⚡ Test Redirection (Simulate Click)"'}
                                    </strong>
                                  }
                                  {
                                    " button on any link card below. This acts exactly as if a real client clicked your link!"
                                  }
                                </div>
                              }
                            </Lt.div>
                          )}
                          {
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                              {
                                <div className="p-5 bg-white/70 dark:bg-zinc-950/45 backdrop-blur-md border border-neutral-200 dark:border-zinc-900 rounded-2xl flex flex-col justify-between">
                                  {
                                    <span className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-wider font-mono">
                                      {"Total Tracked Links"}
                                    </span>
                                  }
                                  {
                                    <div className="flex items-baseline gap-2 mt-2">
                                      {
                                        <span className="text-3xl font-bold font-display text-neutral-900 dark:text-white">
                                          {[...g, ...Us].filter((F) => F.linkUrl).length}
                                        </span>
                                      }
                                      {
                                        <span className="text-[10px] text-zinc-400 font-mono font-medium">
                                          {"Outbound redirects"}
                                        </span>
                                      }
                                    </div>
                                  }
                                </div>
                              }
                              {
                                <div className="p-5 bg-white/70 dark:bg-zinc-950/45 backdrop-blur-md border border-neutral-200 dark:border-zinc-900 rounded-2xl flex flex-col justify-between">
                                  {
                                    <span className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-wider font-mono">
                                      {"Total Link Clicks"}
                                    </span>
                                  }
                                  {
                                    <div className="flex items-baseline gap-2 mt-2">
                                      {
                                        <span className="text-3xl font-bold font-display text-emerald-600 dark:text-neutral-900 dark:text-white">
                                          {g
                                            .filter((F) => F.linkUrl)
                                            .reduce(
                                              (F, ye) =>
                                                F + (ye.clickCount || 0),
                                              0,
                                            )}
                                        </span>
                                      }
                                      {
                                        <span className="text-[10px] text-emerald-500 font-mono font-medium animate-pulse">
                                          {"● Live Signal feed"}
                                        </span>
                                      }
                                    </div>
                                  }
                                </div>
                              }
                              {
                                <div className="p-5 bg-white/70 dark:bg-zinc-950/45 backdrop-blur-md border border-neutral-200 dark:border-zinc-900 rounded-2xl flex flex-col justify-between">
                                  {
                                    <span className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-wider font-mono">
                                      {"Click-Through CTR"}
                                    </span>
                                  }
                                  {
                                    <div className="flex items-baseline gap-2 mt-2">
                                      {
                                        <span className="text-3xl font-bold font-display text-neutral-900 dark:text-white">
                                          {(() => {
                                            const F = g.filter(
                                              (Be) => Be.linkUrl,
                                            );
                                            return F.length === 0
                                              ? "0.0%"
                                              : `${((F.filter((Be) => Be.clickCount > 0).length / F.length) * 100).toFixed(1)}%`;
                                          })()}
                                        </span>
                                      }
                                      {
                                        <span className="text-[10px] text-zinc-400 font-mono font-medium">
                                          {"Conversion index"}
                                        </span>
                                      }
                                    </div>
                                  }
                                </div>
                              }
                              {
                                <div className="p-5 bg-white/70 dark:bg-zinc-950/45 backdrop-blur-md border border-neutral-200 dark:border-zinc-900 rounded-2xl flex flex-col justify-between">
                                  {
                                    <span className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-wider font-mono">
                                      {"Redirection Latency"}
                                    </span>
                                  }
                                  {
                                    <div className="flex items-baseline gap-2 mt-2">
                                      {
                                        <span className="text-3xl font-bold font-display text-emerald-500 dark:text-neutral-900 dark:text-white">
                                          {"< 0.08s"}
                                        </span>
                                      }
                                      {
                                        <span className="text-[10px] text-zinc-400 font-mono font-medium">
                                          {"Instant handshakes"}
                                        </span>
                                      }
                                    </div>
                                  }
                                </div>
                              }
                            </div>
                          }
                          {
                            <Lt.div
                              variants={Kt}
                              className="p-4 bg-white/70 dark:bg-zinc-950/45 backdrop-blur-md border border-neutral-200 dark:border-zinc-900 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
                            >
                              {
                                <div className="relative w-full sm:max-w-md">
                                  {
                                    <input
                                      type="text"
                                      value={wr}
                                      onChange={(F) => Kc(F.target.value)}
                                      placeholder="Search links by campaign or recipient..."
                                      className="w-full px-3.5 py-2 text-xs bg-neutral-50 dark:bg-[#050506] text-neutral-900 dark:text-white border border-neutral-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-neutral-300 dark:focus:border-zinc-700 transition-colors font-normal"
                                    />
                                  }
                                </div>
                              }
                              {
                                <button
                                  onClick={() => {
                                    u("tracking");
                                  }}
                                  className="w-full sm:w-auto px-4 py-2 bg-neutral-900 hover:bg-neutral-850 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-neutral-900 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  {<D5 className="w-3.5 h-3.5" />}
                                  {" Setup a New Tracked Link"}
                                </button>
                              }
                            </Lt.div>
                          }
                          {
                            <div className="bg-white dark:bg-[#09090b] text-neutral-900 dark:text-zinc-100 border border-neutral-200 dark:border-zinc-800/90 rounded-xl overflow-hidden shadow-md dark:shadow-2xl relative">
                              {
                                <div className="p-6 border-b border-neutral-200 dark:border-zinc-800 bg-neutral-50/50 dark:bg-[#0d0d11]/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  {
                                    <div>
                                      {
                                        <h3 className="text-sm font-semibold font-display text-neutral-900 dark:text-white">
                                          {"Active Redirection Database"}
                                        </h3>
                                      }
                                      {
                                        <p className="text-xs text-neutral-500 dark:text-zinc-400 mt-1 font-normal">
                                          {
                                            "Spacious real-time record ledger of active link redirection redirects and captured telemetry clicks."
                                          }
                                        </p>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="text-xs text-neutral-500 dark:text-zinc-400 font-normal bg-neutral-100 dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800 px-2.5 py-1 rounded-md">
                                      {"Showing "}
                                      {[...g, ...Us].filter((F) => F.linkUrl).length}
                                      {" redirect link"}
                                      {[...g, ...Us].filter((F) => F.linkUrl).length !== 1
                                        ? "s"
                                        : ""}
                                    </div>
                                  }
                                </div>
                              }
                              {
                                <div className="w-full overflow-hidden">
                                  {
                                    <table className="w-full text-left border-collapse text-xs">
                                      {
                                        <thead>
                                          {
                                            <tr className="bg-neutral-50/50 dark:bg-[#121216] text-neutral-500 dark:text-zinc-400 text-[10px] uppercase border-b border-neutral-200 dark:border-zinc-800 font-normal tracking-wider">
                                              {
                                                <th className="px-4 py-4 font-normal tracking-wider">
                                                  {"Recipient Target"}
                                                </th>
                                              }
                                              {
                                                <th className="px-4 py-4 font-normal tracking-wider">
                                                  {"Campaign/Subject"}
                                                </th>
                                              }
                                              {
                                                <th className="px-4 py-4 font-normal tracking-wider">
                                                  {"Destination URL"}
                                                </th>
                                              }
                                              {
                                                <th className="px-4 py-4 font-normal tracking-wider">
                                                  {"Clicks Captured"}
                                                </th>
                                              }
                                              {
                                                <th className="px-4 py-4 font-normal tracking-wider">
                                                  {"Dispatch Date"}
                                                </th>
                                              }
                                              {
                                                <th className="px-4 py-4 font-normal tracking-wider">
                                                  {"Latest Click Confirmation"}
                                                </th>
                                              }
                                              {
                                                <th className="px-4 py-4 font-normal tracking-wider text-right">
                                                  {"Actions"}
                                                </th>
                                              }
                                            </tr>
                                          }
                                        </thead>
                                      }
                                      {
                                        <tbody className="divide-y divide-neutral-200/50 dark:divide-zinc-850/40">
                                          {(() => {
                                            const F = [...g, ...Us].filter(
                                              (Be) =>
                                                Be.linkUrl &&
                                                (Be.subject
                                                  .toLowerCase()
                                                  .includes(
                                                    wr.toLowerCase(),
                                                  ) ||
                                                  Be.recipient
                                                    .toLowerCase()
                                                    .includes(
                                                      wr.toLowerCase(),
                                                    )),
                                            ),
                                              ye = [];
                                            for (const Be of F) {
                                              const pt = Be.logs
                                                .filter(
                                                  (mt) => mt.type === "click",
                                                )
                                                .sort(
                                                  (mt, Wt) =>
                                                    new Date(
                                                      mt.timestamp,
                                                    ).getTime() -
                                                    new Date(
                                                      Wt.timestamp,
                                                    ).getTime(),
                                                );
                                              pt.length === 0
                                                ? ye.push({
                                                  ...Be,
                                                  displayClickCount: 0,
                                                  rowId: Be.id,
                                                  specificClickTime: null,
                                                  specificLog: null,
                                                })
                                                : pt.forEach((mt, Wt) => {
                                                  ye.push({
                                                    ...Be,
                                                    displayClickCount: Wt + 1,
                                                    rowId: `${Be.id}-click-${Wt}`,
                                                    specificClickTime:
                                                      mt.timestamp,
                                                    specificLog: mt,
                                                  });
                                                });
                                            }
                                            return (
                                              ye.sort((Be, pt) => {
                                                const mt = Be.specificClickTime
                                                  ? new Date(
                                                    Be.specificClickTime,
                                                  ).getTime()
                                                  : new Date(
                                                    Be.createdAt,
                                                  ).getTime();
                                                return (
                                                  (pt.specificClickTime
                                                    ? new Date(
                                                      pt.specificClickTime,
                                                    ).getTime()
                                                    : new Date(
                                                      pt.createdAt,
                                                    ).getTime()) - mt
                                                );
                                              }),
                                              ye.map((Be) => {
                                                const pt = `${window.location.origin || "https://tickk.io"}/api/track/${Be.id}/click?url=${encodeURIComponent(Be.linkUrl || "")}`,
                                                  mt = ao === Be.rowId,
                                                  Wt =
                                                    new Date(
                                                      Be.createdAt,
                                                    ).toLocaleDateString(
                                                      "en-US",
                                                      {
                                                        month: "short",
                                                        day: "numeric",
                                                      },
                                                    ) +
                                                    ", " +
                                                    new Date(
                                                      Be.createdAt,
                                                    ).toLocaleTimeString(
                                                      "en-US",
                                                      {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                      },
                                                    ),
                                                  tr = Be.specificClickTime
                                                    ? XR(Be.specificClickTime)
                                                    : "Not Clicked Yet";
                                                return (
                                                  <Tr.Fragment key={Be.rowId || Be.id}>
                                                    {
                                                      <tr
                                                        className={`border-b border-neutral-200/50 dark:border-zinc-800/40 transition-colors ${mt ? "bg-neutral-50 dark:bg-zinc-950/40 border-b-0" : "hover:bg-neutral-50/50 dark:hover:bg-zinc-850/30"}`}
                                                      >
                                                        {
                                                          <td className="px-4 py-4 whitespace-nowrap">
                                                            {
                                                              <div className="flex items-center gap-2">
                                                                {
                                                                  <div className="p-1 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 w-6 h-6 inline-flex items-center justify-center rounded-md shadow-sm shrink-0">
                                                                    {uk(
                                                                      Be.recipient,
                                                                      "w-3.5 h-3.5",
                                                                    )}
                                                                  </div>
                                                                }
                                                                {
                                                                  <div
                                                                    className="text-neutral-900 dark:text-zinc-100 font-medium text-xs max-w-[150px] truncate flex items-center gap-1.5"
                                                                    title={
                                                                      Be.recipient
                                                                    }
                                                                  >
                                                                    <span className="truncate">{
                                                                      Be.recipient
                                                                    }</span>
                                                                    {Be.isManual && (
                                                                      <div className="group/icon relative inline-flex items-center justify-center shrink-0 cursor-default">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                                                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 font-sans">
                                                                          Sent manually using TICKK
                                                                        </div>
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                }
                                                              </div>
                                                            }
                                                          </td>
                                                        }
                                                        {
                                                          <td className="px-4 py-4 whitespace-nowrap">
                                                            {
                                                              <div className="flex items-center gap-1.5 max-w-[150px]">
                                                                <span
                                                                  className="text-neutral-700 dark:text-zinc-200 font-medium text-xs truncate"
                                                                  title={Be.subject}
                                                                >
                                                                  {Be.subject}
                                                                </span>
                                                              </div>
                                                            }
                                                          </td>
                                                        }
                                                        {
                                                          <td className="px-4 py-4 max-w-[180px] truncate">
                                                            {
                                                              <a
                                                                href={
                                                                  Be.linkUrl
                                                                }
                                                                target="_blank"
                                                                rel="referrer"
                                                                className="text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:underline inline-flex items-center gap-1 font-normal truncate max-w-full"
                                                                title={
                                                                  Be.linkUrl
                                                                }
                                                              >
                                                                {Be.linkUrl}{" "}
                                                                {
                                                                  <SO className="w-3 h-3 shrink-0" />
                                                                }
                                                              </a>
                                                            }
                                                          </td>
                                                        }
                                                        {
                                                          <td className="px-4 py-4 whitespace-nowrap">
                                                            {Be.displayClickCount >
                                                              0 ? (
                                                              <span className="inline-flex items-center px-2.5 py-1 bg-emerald-500/5 border border-emerald-500/20 text-neutral-900 dark:text-white text-[10px] font-normal rounded-lg shadow-sm">
                                                                {
                                                                  <En_Icon
                                                                    className="w-3.5 h-3.5 text-emerald-500 mr-1 shrink-0"
                                                                    strokeWidth={
                                                                      3
                                                                    }
                                                                  />
                                                                }
                                                                {
                                                                  <span>
                                                                    {
                                                                      "Confirmed "
                                                                    }
                                                                    {
                                                                      Be.displayClickCount
                                                                    }
                                                                    {Be.displayClickCount ===
                                                                      1
                                                                      ? "st"
                                                                      : Be.displayClickCount ===
                                                                        2
                                                                        ? "nd"
                                                                        : Be.displayClickCount ===
                                                                          3
                                                                          ? "rd"
                                                                          : "th"}
                                                                    {" Click!"}
                                                                  </span>
                                                                }
                                                              </span>
                                                            ) : (
                                                              <span className="inline-flex items-center px-2.5 py-1 bg-amber-500/5 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-normal rounded-lg">
                                                                {
                                                                  <C5 className="w-3 h-3 text-amber-500 mr-1 shrink-0" />
                                                                }
                                                                {
                                                                  <span>
                                                                    {
                                                                      "Pending Click"
                                                                    }
                                                                  </span>
                                                                }
                                                              </span>
                                                            )}
                                                          </td>
                                                        }
                                                        {
                                                          <td className="px-4 py-4 text-neutral-500 dark:text-zinc-400 font-normal text-xs whitespace-nowrap">
                                                            {Wt}
                                                          </td>
                                                        }
                                                        {
                                                          <td className="px-4 py-4 text-neutral-500 dark:text-zinc-400 font-normal text-xs whitespace-nowrap">
                                                            {tr}
                                                          </td>
                                                        }
                                                        {
                                                          <td className="px-4 py-4 text-right whitespace-nowrap">
                                                            {
                                                              <div className="inline-flex items-center gap-3">
                                                                {
                                                                  <button
                                                                    onClick={() => {
                                                                      (navigator.clipboard.writeText(
                                                                        pt,
                                                                      ),
                                                                        Oa(
                                                                          Be.rowId,
                                                                        ),
                                                                        setTimeout(
                                                                          () =>
                                                                            Oa(
                                                                              null,
                                                                            ),
                                                                          1500,
                                                                        ));
                                                                    }}
                                                                    className="p-1.5 text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded-lg border border-neutral-200 dark:border-zinc-800 transition-all cursor-pointer"
                                                                    title="Copy Redirection Link"
                                                                  >
                                                                    {pc ===
                                                                      Be.rowId ? (
                                                                      <En_Icon className="w-3 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                                                    ) : (
                                                                      <Id className="w-3 h-3.5" />
                                                                    )}
                                                                  </button>
                                                                }
                                                                {
                                                                  <button
                                                                    onClick={() =>
                                                                      fc(
                                                                        mt
                                                                          ? null
                                                                          : Be.rowId,
                                                                      )
                                                                    }
                                                                    className="px-2.5 py-1.5 text-xs font-normal border border-neutral-200 dark:border-zinc-850 hover:border-neutral-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-neutral-50 dark:hover:bg-zinc-800 text-neutral-700 dark:text-zinc-300 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1 shadow-sm"
                                                                  >
                                                                    {
                                                                      <span>
                                                                        {
                                                                          "View Timeline"
                                                                        }
                                                                      </span>
                                                                    }
                                                                    {mt ? (
                                                                      <FD className="w-3 h-3 text-neutral-400 dark:text-zinc-400" />
                                                                    ) : (
                                                                      <Vd className="w-3 h-3 text-neutral-400 dark:text-zinc-400" />
                                                                    )}
                                                                  </button>
                                                                }
                                                              </div>
                                                            }
                                                          </td>
                                                        }
                                                      </tr>
                                                    }
                                                    {mt && (
                                                      <tr className="bg-neutral-50/50 dark:bg-zinc-950/40 border-b border-neutral-200/50 dark:border-zinc-800/40">
                                                        {
                                                          <td
                                                            colSpan={7}
                                                            className="px-6 pb-6 pt-1"
                                                          >
                                                            {
                                                              <Lt.div
                                                                initial="hidden"
                                                                animate="visible"
                                                                exit="exit"
                                                                variants={KR}
                                                                className="overflow-hidden"
                                                              >
                                                                {
                                                                  <div className="bg-white/40 dark:bg-black/20 backdrop-blur-xl rounded-2xl border border-neutral-200/50 dark:border-zinc-800/20 p-6 space-y-4 relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                                                                    {
                                                                      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
                                                                    }
                                                                    {
                                                                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 blur-[80px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />
                                                                    }
                                                                    {
                                                                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/50 dark:border-zinc-800/40">
                                                                        {
                                                                          <h4 className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-zinc-400 font-mono flex items-center gap-2">
                                                                            {
                                                                              <Ud className="w-3.5 h-3.5 text-neutral-400 dark:text-zinc-400" />
                                                                            }
                                                                            {
                                                                              " Live Redirection Timelines"
                                                                            }
                                                                          </h4>
                                                                        }
                                                                        {
                                                                          <div className="flex items-center gap-3">
                                                                            {
                                                                              <span className="text-[10px] text-neutral-500 dark:text-zinc-400 font-mono">
                                                                                {
                                                                                  "Redirection Link:"
                                                                                }
                                                                              </span>
                                                                            }
                                                                            {
                                                                              <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-[#030303]/60 px-2.5 py-1 rounded border border-neutral-200 dark:border-zinc-850 max-w-xs sm:max-w-md">
                                                                                {
                                                                                  <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 truncate select-all">
                                                                                    {
                                                                                      pt
                                                                                    }
                                                                                  </span>
                                                                                }
                                                                                {
                                                                                  <button
                                                                                    onClick={() => {
                                                                                      (navigator.clipboard.writeText(
                                                                                        pt,
                                                                                      ),
                                                                                        Oa(
                                                                                          Be.rowId,
                                                                                        ),
                                                                                        setTimeout(
                                                                                          () =>
                                                                                            Oa(
                                                                                              null,
                                                                                            ),
                                                                                          1500,
                                                                                        ));
                                                                                    }}
                                                                                    className="text-neutral-400 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white p-0.5 rounded cursor-pointer transition-colors"
                                                                                    title="Copy link"
                                                                                  >
                                                                                    {pc ===
                                                                                      Be.rowId ? (
                                                                                      <En_Icon className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                                                                                    ) : (
                                                                                      <Id className="w-3.5 h-3.5" />
                                                                                    )}
                                                                                  </button>
                                                                                }
                                                                              </div>
                                                                            }
                                                                          </div>
                                                                        }
                                                                      </div>
                                                                    }
                                                                    {(() => {
                                                                      const Bn =
                                                                        Be.logs
                                                                          .filter(
                                                                            (
                                                                              bn,
                                                                            ) =>
                                                                              bn.type ===
                                                                              "click",
                                                                          )
                                                                          .sort(
                                                                            (
                                                                              bn,
                                                                              Nn,
                                                                            ) =>
                                                                              new Date(
                                                                                bn.timestamp,
                                                                              ).getTime() -
                                                                              new Date(
                                                                                Nn.timestamp,
                                                                              ).getTime(),
                                                                          );
                                                                      return Bn.length >
                                                                        0 ? (
                                                                        <div className="w-full rounded-xl border border-neutral-200/50 dark:border-zinc-800/45 bg-white/40 dark:bg-zinc-950/20 shadow-sm">
                                                                          {
                                                                            <table className="w-full text-left text-xs border-collapse table-auto">
                                                                              {
                                                                                <thead>
                                                                                  {
                                                                                    <tr className="border-b border-neutral-200/50 dark:border-zinc-800 text-neutral-500 dark:text-zinc-400 bg-neutral-100/30 dark:bg-zinc-900/30 backdrop-blur-md">
                                                                                      {
                                                                                        <th className="px-4 py-3 font-mono text-[9px] uppercase font-normal tracking-wider">
                                                                                          {
                                                                                            "Sequence / ID"
                                                                                          }
                                                                                        </th>
                                                                                      }
                                                                                      {
                                                                                        <th className="px-4 py-3 font-mono text-[9px] uppercase font-normal tracking-wider">
                                                                                          {
                                                                                            "Action / Event"
                                                                                          }
                                                                                        </th>
                                                                                      }
                                                                                      {
                                                                                        <th className="px-4 py-3 font-mono text-[9px] uppercase font-normal tracking-wider">
                                                                                          {
                                                                                            "Timestamp"
                                                                                          }
                                                                                        </th>
                                                                                      }
                                                                                      {
                                                                                        <th className="px-4 py-3 font-mono text-[9px] uppercase font-normal tracking-wider">
                                                                                          {
                                                                                            "IP Address"
                                                                                          }
                                                                                        </th>
                                                                                      }
                                                                                      {
                                                                                        <th className="px-4 py-3 font-mono text-[9px] uppercase font-normal tracking-wider">
                                                                                          {
                                                                                            "Geographic Hub"
                                                                                          }
                                                                                        </th>
                                                                                      }
                                                                                      {
                                                                                        <th className="px-4 py-3 font-mono text-[9px] uppercase font-normal tracking-wider">
                                                                                          {
                                                                                            "Device & Browser"
                                                                                          }
                                                                                        </th>
                                                                                      }
                                                                                    </tr>
                                                                                  }
                                                                                </thead>
                                                                              }
                                                                              {
                                                                                <tbody>
                                                                                  {Bn.map(
                                                                                    (
                                                                                      bn,
                                                                                      Nn,
                                                                                    ) => {
                                                                                      const Nt = `Click # ${String(Nn + 1).padStart(2, "0")}`;
                                                                                      return (
                                                                                        <tr key={bn.id || Nn} className="border-b border-neutral-100 dark:border-zinc-900 hover:bg-neutral-50/50 dark:hover:bg-zinc-900/40 transition-colors">
                                                                                          {
                                                                                            <td className="px-4 py-3.5">
                                                                                              {
                                                                                                <span className="font-mono text-[10px] text-neutral-500 dark:text-zinc-400 bg-neutral-100 dark:bg-zinc-900/40 border border-neutral-200 dark:border-zinc-800/60 px-2.5 py-1 rounded-md select-none">
                                                                                                  {
                                                                                                    Nt
                                                                                                  }
                                                                                                </span>
                                                                                              }
                                                                                            </td>
                                                                                          }
                                                                                          {
                                                                                            <td className="px-4 py-3.5">
                                                                                              {
                                                                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-emerald-500/20 dark:border-emerald-500/10 bg-emerald-500/10 dark:bg-emerald-500/5 text-neutral-900 dark:text-white shadow-sm">
                                                                                                  {
                                                                                                    <En_Icon
                                                                                                      className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 mr-1"
                                                                                                      strokeWidth={
                                                                                                        3
                                                                                                      }
                                                                                                    />
                                                                                                  }
                                                                                                  {
                                                                                                    " Link Clicked"
                                                                                                  }
                                                                                                </span>
                                                                                              }
                                                                                            </td>
                                                                                          }
                                                                                          {
                                                                                            <td className="px-4 py-3.5 font-mono text-[10.5px] text-neutral-700 dark:text-zinc-300">
                                                                                              {
                                                                                                <span>
                                                                                                  {new Date(
                                                                                                    bn.timestamp,
                                                                                                  ).toLocaleTimeString(
                                                                                                    [],
                                                                                                    {
                                                                                                      hour: "2-digit",
                                                                                                      minute:
                                                                                                        "2-digit",
                                                                                                      second:
                                                                                                        "2-digit",
                                                                                                    },
                                                                                                  )}
                                                                                                </span>
                                                                                              }
                                                                                              {
                                                                                                <span className="text-neutral-400 dark:text-zinc-650 mx-1.5">
                                                                                                  {
                                                                                                    "•"
                                                                                                  }
                                                                                                </span>
                                                                                              }
                                                                                              {
                                                                                                <span className="text-neutral-500 dark:text-zinc-400">
                                                                                                  {new Date(
                                                                                                    bn.timestamp,
                                                                                                  ).toLocaleDateString()}
                                                                                                </span>
                                                                                              }
                                                                                            </td>
                                                                                          }
                                                                                          {
                                                                                            <td className="px-4 py-3.5 font-mono text-[11px] text-neutral-700 dark:text-zinc-300 font-normal">
                                                                                              {
                                                                                                bn.ip
                                                                                              }
                                                                                            </td>
                                                                                          }
                                                                                          {
                                                                                            <td className="px-4 py-3.5 text-[11px] text-neutral-700 dark:text-zinc-300 font-normal">
                                                                                              {
                                                                                                <span>
                                                                                                  {bn.city ||
                                                                                                    "Unknown"}
                                                                                                </span>
                                                                                              }
                                                                                              {bn.country && (
                                                                                                <React.Fragment>
                                                                                                  {
                                                                                                    <span className="text-neutral-400 dark:text-zinc-500 mx-1">
                                                                                                      {
                                                                                                        "•"
                                                                                                      }
                                                                                                    </span>
                                                                                                  }
                                                                                                  {
                                                                                                    <span className="text-neutral-500 dark:text-zinc-400">
                                                                                                      {
                                                                                                        bn.country
                                                                                                      }
                                                                                                    </span>
                                                                                                  }
                                                                                                </React.Fragment>
                                                                                              )}
                                                                                            </td>
                                                                                          }
                                                                                          {
                                                                                            <td className="px-4 py-3.5 text-[11px] text-neutral-500 dark:text-zinc-400 font-normal">
                                                                                              {
                                                                                                <span>
                                                                                                  {bn.device ||
                                                                                                    "Desktop"}
                                                                                                </span>
                                                                                              }
                                                                                              {
                                                                                                <span className="text-neutral-400 dark:text-zinc-500 mx-1.5">
                                                                                                  {
                                                                                                    "•"
                                                                                                  }
                                                                                                </span>
                                                                                              }
                                                                                              {
                                                                                                <span className="text-neutral-500 dark:text-zinc-400">
                                                                                                  {bn.browser ||
                                                                                                    "Unknown"}
                                                                                                </span>
                                                                                              }
                                                                                            </td>
                                                                                          }
                                                                                        </tr>
                                                                                      );
                                                                                    },
                                                                                  )}
                                                                                </tbody>
                                                                              }
                                                                            </table>
                                                                          }
                                                                        </div>
                                                                      ) : (
                                                                        <div className="p-6 text-center text-zinc-500 italic font-normal text-xs font-sans">
                                                                          {
                                                                            "No click signals captured yet. Send the email and wait for clicks to register."
                                                                          }
                                                                        </div>
                                                                      );
                                                                    })()}
                                                                  </div>
                                                                }
                                                              </Lt.div>
                                                            }
                                                          </td>
                                                        }
                                                      </tr>
                                                    )}
                                                  </Tr.Fragment>
                                                );
                                              })
                                            );
                                          })()}
                                        </tbody>
                                      }
                                    </table>
                                  }
                                </div>
                              }
                              {[...g, ...Us].filter((F) => F.linkUrl).length === 0 && (
                                <div className="py-12 bg-white/40 dark:bg-zinc-900/20 rounded-b-2xl border-t border-neutral-200 dark:border-zinc-800/80 text-center text-zinc-500 italic font-normal text-xs font-sans">
                                  {
                                    "No redirect links configured. Email Trackers with redirect links will automatically register telemetry trackers inside this workspace."
                                  }
                                </div>
                              )}
                            </div>
                          }
                        </div>
                      )}
                      {c === "performance" && (
                        <div className="space-y-8 animate-fadeIn">
                          {
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                              {
                                <div>
                                  {
                                    <h2 className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight">
                                      {"Performance Intelligence"}
                                    </h2>
                                  }
                                  {
                                    <p className="text-xs text-zinc-500 mt-1">
                                      {
                                        "Detailed usage analytics mapping outbound correspondence against verification success rates."
                                      }
                                    </p>
                                  }
                                </div>
                              }
                              {
                                <button
                                  onClick={v}
                                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-[13px] rounded-xl hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_24px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5 active:translate-y-0 group"
                                >
                                  {
                                    <HD className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                  }
                                  {"Download Report"}
                                </button>
                              }
                            </div>
                          }
                          {
                            <Lt.div variants={Kt} className={Bo + " mb-8"}>
                              {
                                <div className="absolute top-0 right-0 p-5 flex gap-3">
                                  {
                                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider bg-black/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-200 font-bold px-3 py-1.5 rounded-full font-mono backdrop-blur-md border border-black/5 dark:border-white/10">
                                      {<L5 className="w-3 h-3" />}
                                      {" System Active"}
                                    </span>
                                  }
                                  {
                                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider bg-black/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-200 font-bold px-3 py-1.5 rounded-full font-mono backdrop-blur-md border border-black/5 dark:border-white/10">
                                      {<S5 className="w-3 h-3" />}
                                      {" Excellent Score"}
                                    </span>
                                  }
                                </div>
                              }
                              {
                                <div className="flex flex-col gap-6 pt-2">
                                  {
                                    <div className="flex items-center gap-4">
                                      {
                                        <div className="p-3 bg-black/5 dark:bg-white/10 rounded-2xl backdrop-blur-md border border-black/5 dark:border-white/10">
                                          {
                                            <Ud className="w-6 h-6 text-neutral-800 dark:text-neutral-200" />
                                          }
                                        </div>
                                      }
                                      {
                                        <div>
                                          {
                                            <span className="text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-mono">
                                              {"Performance Overview"}
                                            </span>
                                          }
                                          {
                                            <h3 className="text-2xl font-semibold font-display text-neutral-900 dark:text-white mt-1 tracking-tight">
                                              {
                                                "Your Detailed Performance Report"
                                              }
                                            </h3>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="p-6 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-2xl rounded-2xl border border-black/[0.05] dark:border-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                                      {
                                        <p className="text-[15px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                                          {
                                            "Your account is currently performing at an "
                                          }
                                          {
                                            <strong className="text-neutral-900 dark:text-white font-semibold">
                                              {
                                                "Excellent level (Score: 98/100)"
                                              }
                                            </strong>
                                          }
                                          {
                                            ". Your emails are successfully reaching the inbox with a "
                                          }
                                          {
                                            <span className="text-neutral-900 dark:text-white font-medium border-b border-neutral-300 dark:border-neutral-600">
                                              {"99.9% delivery rate"}
                                            </span>
                                          }
                                          {
                                            ", meaning they are bypassing spam filters effectively. People are engaging with your content—your "
                                          }
                                          {
                                            <strong className="text-neutral-900 dark:text-white font-semibold">
                                              {"open rate is 78.4%"}
                                            </strong>
                                          }
                                          {" and "}
                                          {
                                            <strong className="text-neutral-900 dark:text-white font-semibold">
                                              {"link click rate is 42.1%"}
                                            </strong>
                                          }
                                          {
                                            ". Overall, your sending reputation is flawless with zero blacklists or spam reports."
                                          }
                                        </p>
                                      }
                                    </div>
                                  }
                                  {
                                    <>
                                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                                        {
                                          /* Card 1: Delivery Rate */
                                          <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/30 bg-gradient-to-br from-zinc-500/[0.18] via-transparent to-neutral-400/[0.18] dark:from-zinc-500/[0.12] dark:via-transparent dark:to-neutral-400/[0.12] bg-[length:200%_200%] animate-gradient-slow p-5 space-y-3.5 flex flex-col justify-between transition-all hover:scale-[1.03] duration-300 shadow-sm hover:border-zinc-500/30 dark:hover:border-zinc-500/25">
                                            <div className="flex justify-between items-start">
                                              <span className="text-[10px] uppercase text-neutral-500 dark:text-neutral-400 font-mono tracking-widest">
                                                {"Delivery Rate"}
                                              </span>
                                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-emerald-500/20 bg-emerald-500/5 text-neutral-900 dark:text-white shadow-sm font-mono">
                                                <En_Icon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 mr-1 shrink-0" strokeWidth={3} />
                                                <span>{"Confirmed"}</span>
                                              </span>
                                            </div>
                                            <span className="text-4xl font-extralight font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 block">
                                              {"99.9%"}
                                            </span>
                                            <div className="w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                                              <div
                                                className="bg-zinc-900 dark:bg-white h-full rounded-full"
                                                style={{
                                                  width: "99.9%",
                                                }}
                                              />
                                            </div>
                                            <button
                                              onClick={() => setActiveOptimizeTip(activeOptimizeTip === "delivery" ? null : "delivery")}
                                              className="w-full text-[10px] text-zinc-400 hover:text-neutral-900 dark:hover:text-white flex items-center justify-between transition-colors pt-2 border-t border-black/[0.03] dark:border-white/[0.03] group"
                                            >
                                              <span className="flex items-center gap-1">
                                                <Info className="w-3 h-3 text-zinc-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
                                                <span>{"Analyze & Optimize"}</span>
                                              </span>
                                              <span className="opacity-0 group-hover/icon:opacity-100 transition-opacity text-[9px] font-mono font-medium">{"FIX →"}</span>
                                            </button>
                                          </div>
                                        }
                                        {
                                          /* Card 2: Emails Opened */
                                          <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/30 bg-gradient-to-br from-amber-500/[0.18] via-transparent to-yellow-500/[0.18] dark:from-amber-500/[0.12] dark:via-transparent dark:to-yellow-500/[0.12] bg-[length:200%_200%] animate-gradient-slow p-5 space-y-3.5 flex flex-col justify-between transition-all hover:scale-[1.03] duration-300 shadow-sm hover:border-amber-500/30 dark:hover:border-amber-500/25">
                                            <div className="flex justify-between items-start">
                                              <span className="text-[10px] uppercase text-neutral-500 dark:text-neutral-400 font-mono tracking-widest">
                                                {"Emails Opened"}
                                              </span>
                                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-amber-500/20 bg-amber-500/5 text-neutral-900 dark:text-white shadow-sm font-mono">
                                                <ShieldAlert className="w-3.5 h-3.5 text-amber-500 mr-1 shrink-0" strokeWidth={2.5} />
                                                <span>{"Awaiting Opens"}</span>
                                              </span>
                                            </div>
                                            <span className="text-4xl font-extralight font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 block">
                                              {"78.4%"}
                                            </span>
                                            <div className="w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                                              <div
                                                className="bg-amber-500 dark:bg-amber-400 h-full rounded-full"
                                                style={{
                                                  width: "78.4%",
                                                }}
                                              />
                                            </div>
                                            <button
                                              onClick={() => setActiveOptimizeTip(activeOptimizeTip === "opens" ? null : "opens")}
                                              className="w-full text-[10px] text-zinc-400 hover:text-neutral-900 dark:hover:text-white flex items-center justify-between transition-colors pt-2 border-t border-black/[0.03] dark:border-white/[0.03] group"
                                            >
                                              <span className="flex items-center gap-1">
                                                <Info className="w-3 h-3 text-zinc-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
                                                <span>{"Analyze & Optimize"}</span>
                                              </span>
                                              <span className="opacity-0 group-hover/icon:opacity-100 transition-opacity text-[9px] font-mono font-medium">{"FIX →"}</span>
                                            </button>
                                          </div>
                                        }
                                        {
                                          /* Card 3: Links Clicked */
                                          <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/30 bg-gradient-to-br from-red-500/[0.18] via-transparent to-rose-500/[0.18] dark:from-red-500/[0.12] dark:via-transparent dark:to-rose-500/[0.12] bg-[length:200%_200%] animate-gradient-slow p-5 space-y-3.5 flex flex-col justify-between transition-all hover:scale-[1.03] duration-300 shadow-sm hover:border-red-500/30 dark:hover:border-red-500/25">
                                            <div className="flex justify-between items-start">
                                              <span className="text-[10px] uppercase text-neutral-500 dark:text-neutral-400 font-mono tracking-widest">
                                                {"Links Clicked"}
                                              </span>
                                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-red-500/20 bg-red-500/5 text-neutral-900 dark:text-white shadow-sm font-mono">
                                                <AlertTriangle className="w-3.5 h-3.5 text-red-500 mr-1 shrink-0" strokeWidth={2.5} />
                                                <span>{"Awaiting Clicks"}</span>
                                              </span>
                                            </div>
                                            <span className="text-4xl font-extralight font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 block">
                                              {"42.1%"}
                                            </span>
                                            <div className="w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                                              <div
                                                className="bg-red-500 dark:bg-red-400 h-full rounded-full"
                                                style={{
                                                  width: "42.1%",
                                                }}
                                              />
                                            </div>
                                            <button
                                              onClick={() => setActiveOptimizeTip(activeOptimizeTip === "clicks" ? null : "clicks")}
                                              className="w-full text-[10px] text-zinc-400 hover:text-neutral-900 dark:hover:text-white flex items-center justify-between transition-colors pt-2 border-t border-black/[0.03] dark:border-white/[0.03] group"
                                            >
                                              <span className="flex items-center gap-1">
                                                <Info className="w-3 h-3 text-zinc-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
                                                <span>{"Analyze & Optimize"}</span>
                                              </span>
                                              <span className="opacity-0 group-hover/icon:opacity-100 transition-opacity text-[9px] font-mono font-medium">{"FIX →"}</span>
                                            </button>
                                          </div>
                                        }
                                        {
                                          /* Card 4: Reputation Score */
                                          <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/30 bg-gradient-to-br from-emerald-500/[0.18] via-transparent to-teal-500/[0.18] dark:from-emerald-500/[0.12] dark:via-transparent dark:to-teal-500/[0.12] bg-[length:200%_200%] animate-gradient-slow p-5 space-y-3.5 flex flex-col justify-between transition-all hover:scale-[1.03] duration-300 shadow-sm hover:border-emerald-500/30 dark:hover:border-emerald-500/25">
                                            <div className="flex justify-between items-start">
                                              <span className="text-[10px] uppercase text-neutral-500 dark:text-neutral-400 font-mono tracking-widest">
                                                {"Reputation Score"}
                                              </span>
                                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-emerald-500/20 bg-emerald-500/5 text-neutral-900 dark:text-white shadow-sm font-mono">
                                                <BadgeCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 mr-1 shrink-0" strokeWidth={2.5} />
                                                <span>{"Perfect"}</span>
                                              </span>
                                            </div>
                                            <span className="text-4xl font-extralight font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 block">
                                              {"98/100"}
                                            </span>
                                            <div className="w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                                              <div
                                                className="bg-emerald-500 dark:bg-emerald-400 h-full rounded-full"
                                                style={{
                                                  width: "98%",
                                                }}
                                              />
                                            </div>
                                            <button
                                              onClick={() => setActiveOptimizeTip(activeOptimizeTip === "reputation" ? null : "reputation")}
                                              className="w-full text-[10px] text-zinc-400 hover:text-neutral-900 dark:hover:text-white flex items-center justify-between transition-colors pt-2 border-t border-black/[0.03] dark:border-white/[0.03] group"
                                            >
                                              <span className="flex items-center gap-1">
                                                <Info className="w-3 h-3 text-zinc-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
                                                <span>{"Analyze & Optimize"}</span>
                                              </span>
                                              <span className="opacity-0 group-hover/icon:opacity-100 transition-opacity text-[9px] font-mono font-medium">{"FIX →"}</span>
                                            </button>
                                          </div>
                                        }
                                      </div>

                                      <Hi mode="wait">
                                        {activeOptimizeTip && (
                                          <Lt.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="mt-6 p-5 bg-white/80 dark:bg-zinc-950/85 backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.05] rounded-2xl shadow-xl relative overflow-hidden"
                                          >
                                            <div className="flex justify-between items-start mb-4">
                                              <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-900 dark:text-white flex items-center gap-2">
                                                <Info className="w-4 h-4 text-emerald-500" />
                                                <span>
                                                  {activeOptimizeTip === "delivery" && "Delivery Rate Optimization Guide"}
                                                  {activeOptimizeTip === "opens" && "Email Open Rate Optimization Guide"}
                                                  {activeOptimizeTip === "clicks" && "Link Click-Through Rate Optimization Guide"}
                                                  {activeOptimizeTip === "reputation" && "IP Reputation & Deliverability Guide"}
                                                </span>
                                              </h4>
                                              <button
                                                onClick={() => setActiveOptimizeTip(null)}
                                                className="text-xs text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors font-mono px-2 py-0.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                                              >
                                                {"[Close]"}
                                              </button>
                                            </div>

                                            <div className="text-xs text-neutral-600 dark:text-zinc-400 space-y-3 leading-relaxed">
                                              {activeOptimizeTip === "delivery" && (
                                                <>
                                                  <p>{"Your delivery rate is exceptional (99.9%). To maintain this perfect status, ensure your SPF, DKIM, and DMARC settings are fully aligned in your DNS registry."}</p>
                                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-black/5 dark:border-white/5 font-mono text-[10px]">
                                                    <div className="p-3 rounded-xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/[0.03] dark:border-white/[0.03]">
                                                      <span className="text-neutral-900 dark:text-white block font-semibold mb-1">{"SPF Record"}</span>
                                                      <code className="text-zinc-500 dark:text-zinc-400 block break-all">{"v=spf1 include:mx.yourserver.com ~all"}</code>
                                                    </div>
                                                    <div className="p-3 rounded-xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/[0.03] dark:border-white/[0.03]">
                                                      <span className="text-neutral-900 dark:text-white block font-semibold mb-1">{"DKIM Signature"}</span>
                                                      <code className="text-zinc-500 dark:text-zinc-400 block break-all">{"v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG..."}</code>
                                                    </div>
                                                  </div>
                                                </>
                                              )}
                                              {activeOptimizeTip === "opens" && (
                                                <>
                                                  <p>{"An open rate of 78.4% is highly active. To boost this further and resolve pending reads, consider testing dynamic subject lines and avoiding generic spam-trigger words like 'Urgent' or 'Free'."}</p>
                                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-black/5 dark:border-white/5 font-mono text-[10px]">
                                                    <div className="p-3 rounded-xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/[0.03] dark:border-white/[0.03]">
                                                      <span className="text-amber-500 block font-semibold mb-1">{"Recommended Actions"}</span>
                                                      <ul className="list-disc pl-4 space-y-1 text-zinc-500 dark:text-zinc-400">
                                                        <li>{"Personalize headers with dynamic recipient templates"}</li>
                                                        <li>{"Schedule delivery times to align with local workspace mornings"}</li>
                                                      </ul>
                                                    </div>
                                                    <div className="p-3 rounded-xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/[0.03] dark:border-white/[0.03]">
                                                      <span className="text-neutral-900 dark:text-white block font-semibold mb-1">{"Target Timezones"}</span>
                                                      <code className="text-zinc-500 dark:text-zinc-400 block">{"EST / GMT Workspace hours (9:30 AM optimal)"}</code>
                                                    </div>
                                                  </div>
                                                </>
                                              )}
                                              {activeOptimizeTip === "clicks" && (
                                                <>
                                                  <p>{"Your link click-through rate (42.1%) is currently awaiting user action. This can be significantly increased by improving CTA button visibility and making links look extremely clean and secure."}</p>
                                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-black/5 dark:border-white/5 font-mono text-[10px]">
                                                    <div className="p-3 rounded-xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/[0.03] dark:border-white/[0.03]">
                                                      <span className="text-red-500 block font-semibold mb-1">{"CTA Enhancements"}</span>
                                                      <ul className="list-disc pl-4 space-y-1 text-zinc-500 dark:text-zinc-400">
                                                        <li>{"Position main CTA buttons in the upper 50% of the email copy"}</li>
                                                        <li>{"Ensure all redirected URLs utilize HTTPS with certified SSL"}</li>
                                                      </ul>
                                                    </div>
                                                    <div className="p-3 rounded-xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/[0.03] dark:border-white/[0.03]">
                                                      <span className="text-neutral-900 dark:text-white block font-semibold mb-1">{"SSL Integrity"}</span>
                                                      <code className="text-zinc-500 dark:text-zinc-400 block">{"TLS 1.3 Certified / SHA-256 Signature verified"}</code>
                                                    </div>
                                                  </div>
                                                </>
                                              )}
                                              {activeOptimizeTip === "reputation" && (
                                                <>
                                                  <p>{"Your IP Reputation is near-perfect (98/100). To protect this status, continuously scrub your subscriber lists for bounced emails and implement double-opt-in subscription methods."}</p>
                                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-black/5 dark:border-white/5 font-mono text-[10px]">
                                                    <div className="p-3 rounded-xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/[0.03] dark:border-white/[0.03]">
                                                      <span className="text-indigo-500 block font-semibold mb-1">{"Deliverability Guidelines"}</span>
                                                      <ul className="list-disc pl-4 space-y-1 text-zinc-500 dark:text-zinc-400">
                                                        <li>{"Strictly filter out secondary disposable/temporary emails"}</li>
                                                        <li>{"Monitor RBL blacklist aggregators every 24 hours"}</li>
                                                      </ul>
                                                    </div>
                                                    <div className="p-3 rounded-xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/[0.03] dark:border-white/[0.03]">
                                                      <span className="text-neutral-900 dark:text-white block font-semibold mb-1">{"RBL Monitored Status"}</span>
                                                      <code className="text-emerald-500 block font-semibold">{"0/120 blacklists listed (Clean)"}</code>
                                                    </div>
                                                  </div>
                                                </>
                                              )}
                                            </div>
                                          </Lt.div>
                                        )}
                                      </Hi>
                                    </>
                                  }
                                </div>
                              }
                            </Lt.div>
                          }
                          {
                            <Lt.div variants={Kt} className={Bo}>
                              {
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                                  {
                                    <div>
                                      {
                                        <h3 className="text-xl font-semibold font-display text-neutral-900 dark:text-white tracking-tight">
                                          {"Interaction Analytics Over Time"}
                                        </h3>
                                      }
                                      {
                                        <span className="text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-mono mt-1 block">
                                          {"Trend Analysis"}
                                        </span>
                                      }
                                    </div>
                                  }
                                  {
                                    <CustomSelect
                                      value={m}
                                      onChange={(F) => b(F.target.value)}
                                      options={[
                                        { value: 'last_24_hours', label: 'Last 24 hours' },
                                        { value: 'last_7_days', label: 'Last 7 days' },
                                        { value: 'last_30_days', label: 'Last 30 days' },
                                        { value: 'last_90_days', label: 'Last 90 days' },
                                        { value: 'last_year', label: 'Last year' }
                                      ]}
                                      className="appearance-none w-full bg-black/5 dark:bg-white/5 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 rounded-xl px-4 py-2 pr-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer transition-all hover:bg-black/10 dark:hover:bg-white/10"
                                    />
                                  }
                                </div>
                              }
                              {
                                <div className="w-full h-80">
                                  {
                                    <Nbe width="100%" height="100%">
                                      {
                                        <E6e
                                          data={xs}
                                          margin={{
                                            top: 10,
                                            right: 10,
                                            left: -20,
                                            bottom: 0,
                                          }}
                                        >
                                          {
                                            <defs>
                                              {
                                                <linearGradient
                                                  id="colorDispatches"
                                                  x1="0"
                                                  y1="0"
                                                  x2="0"
                                                  y2="1"
                                                >
                                                  {
                                                    <stop
                                                      offset="5%"
                                                      stopColor={
                                                        r === "dark"
                                                          ? "#ffffff"
                                                          : "#000000"
                                                      }
                                                      stopOpacity={
                                                        r === "dark"
                                                          ? 0.08
                                                          : 0.05
                                                      }
                                                    />
                                                  }
                                                  {
                                                    <stop
                                                      offset="95%"
                                                      stopColor={
                                                        r === "dark"
                                                          ? "#ffffff"
                                                          : "#000000"
                                                      }
                                                      stopOpacity={0}
                                                    />
                                                  }
                                                </linearGradient>
                                              }
                                              {
                                                <linearGradient
                                                  id="colorOpens"
                                                  x1="0"
                                                  y1="0"
                                                  x2="0"
                                                  y2="1"
                                                >
                                                  {
                                                    <stop
                                                      offset="5%"
                                                      stopColor={
                                                        r === "dark"
                                                          ? "#d4d4d8"
                                                          : "#52525b"
                                                      }
                                                      stopOpacity={0.12}
                                                    />
                                                  }
                                                  {
                                                    <stop
                                                      offset="95%"
                                                      stopColor={
                                                        r === "dark"
                                                          ? "#d4d4d8"
                                                          : "#52525b"
                                                      }
                                                      stopOpacity={0}
                                                    />
                                                  }
                                                </linearGradient>
                                              }
                                              {
                                                <linearGradient
                                                  id="colorClicks"
                                                  x1="0"
                                                  y1="0"
                                                  x2="0"
                                                  y2="1"
                                                >
                                                  {
                                                    <stop
                                                      offset="5%"
                                                      stopColor={
                                                        r === "dark"
                                                          ? "#a1a1aa"
                                                          : "#71717a"
                                                      }
                                                      stopOpacity={0.2}
                                                    />
                                                  }
                                                  {
                                                    <stop
                                                      offset="95%"
                                                      stopColor={
                                                        r === "dark"
                                                          ? "#a1a1aa"
                                                          : "#71717a"
                                                      }
                                                      stopOpacity={0}
                                                    />
                                                  }
                                                </linearGradient>
                                              }
                                            </defs>
                                          }
                                          {
                                            <PY
                                              strokeDasharray="3 3"
                                              stroke={
                                                r === "dark"
                                                  ? "rgba(255,255,255,0.05)"
                                                  : "rgba(0,0,0,0.05)"
                                              }
                                            />
                                          }
                                          {
                                            <HY
                                              dataKey="name"
                                              stroke="#6b7280"
                                              fontSize={10}
                                              tickLine={!1}
                                            />
                                          }
                                          {
                                            <GY
                                              stroke="#6b7280"
                                              fontSize={10}
                                              tickLine={!1}
                                            />
                                          }
                                          {
                                            <Q2e
                                              contentStyle={{
                                                backgroundColor:
                                                  r === "dark"
                                                    ? "rgba(20, 20, 22, 0.8)"
                                                    : "rgba(255, 255, 255, 0.8)",
                                                border:
                                                  r === "dark"
                                                    ? "1px solid rgba(255, 255, 255, 0.1)"
                                                    : "1px solid rgba(0, 0, 0, 0.1)",
                                                borderRadius: "12px",
                                                fontSize: "11px",
                                                color:
                                                  r === "dark"
                                                    ? "#f4f4f5"
                                                    : "#111827",
                                                backdropFilter: "blur(20px)",
                                              }}
                                            />
                                          }
                                          {
                                            <EN
                                              type="monotone"
                                              dataKey="dispatches"
                                              stroke={
                                                r === "dark"
                                                  ? "#71717a"
                                                  : "#9ca3af"
                                              }
                                              fillOpacity={1}
                                              fill="url(#colorDispatches)"
                                              name="Dispatches"
                                              strokeWidth={1}
                                            />
                                          }
                                          {
                                            <EN
                                              type="monotone"
                                              dataKey="opens"
                                              stroke={
                                                r === "dark"
                                                  ? "#d4d4d8"
                                                  : "#52525b"
                                              }
                                              fillOpacity={1}
                                              fill="url(#colorOpens)"
                                              name="Confirmed Opens"
                                              strokeWidth={1.5}
                                            />
                                          }
                                          {
                                            <EN
                                              type="monotone"
                                              dataKey="clicks"
                                              stroke={
                                                r === "dark"
                                                  ? "#a1a1aa"
                                                  : "#3f3f46"
                                              }
                                              fillOpacity={1}
                                              fill="url(#colorClicks)"
                                              name="Link Clicks"
                                              strokeWidth={1.5}
                                            />
                                          }
                                        </E6e>
                                      }
                                    </Nbe>
                                  }
                                </div>
                              }
                            </Lt.div>
                          }
                          {
                            <Lt.div variants={Kt} className={Bo + " mb-6"}>
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                                <div>
                                  <h3 className="text-xl font-semibold font-display text-neutral-900 dark:text-white tracking-tight">
                                    Temporal Activity Heatmap
                                  </h3>
                                  <span className="text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-mono mt-1 block">
                                    Peak Engagement Windows
                                  </span>
                                </div>
                              </div>
                              <div className="w-full h-80 overflow-x-auto">
                                <div className="min-w-[600px] h-full">
                                  {(() => {
                                    const hours = ['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p'];
                                    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                                    const heatmapData = days.flatMap((day, x) =>
                                      hours.map((hour, y) => {
                                        let baseVal = 10;
                                        if (day !== 'Sat' && day !== 'Sun') {
                                          if (hour === '10a' || hour === '2p' || hour === '4p') baseVal = 70;
                                          else if (hour === '8a' || hour === '12p') baseVal = 40;
                                        }
                                        const noise = Math.floor(Math.random() * 20) - 10;
                                        return {
                                          day, hour,
                                          value: Math.max(0, Math.min(100, baseVal + noise))
                                        };
                                      })
                                    );
                                    return (
                                      <ResponsiveContainer width="100%" height="100%">
                                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                          <CartesianGrid strokeDasharray="3 3" stroke={r === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                                          <XAxis
                                            type="category"
                                            dataKey="hour"
                                            name="Hour"
                                            allowDuplicatedCategory={false}
                                            stroke="#6b7280"
                                            fontSize={10}
                                            tickLine={false}
                                          />
                                          <YAxis
                                            type="category"
                                            dataKey="day"
                                            name="Day"
                                            allowDuplicatedCategory={false}
                                            stroke="#6b7280"
                                            fontSize={10}
                                            tickLine={false}
                                            reversed
                                          />
                                          <ZAxis type="number" dataKey="value" range={[100, 100]} />
                                          <Tooltip
                                            cursor={{ strokeDasharray: '3 3' }}
                                            contentStyle={{
                                              backgroundColor: r === "dark" ? "rgba(20, 20, 22, 0.8)" : "rgba(255, 255, 255, 0.8)",
                                              border: r === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                                              borderRadius: "12px",
                                              fontSize: "11px",
                                              color: r === "dark" ? "#f4f4f5" : "#111827",
                                              backdropFilter: "blur(20px)",
                                            }}
                                            formatter={(value) => [`${value} interactions`, 'Activity Level']}
                                          />
                                          <Scatter data={heatmapData} shape={(props) => {
                                            const { cx, cy, payload } = props;
                                            const val = payload.value;
                                            const opacity = 0.1 + (val / 100) * 0.9;
                                            return (
                                              <rect
                                                x={cx - 15}
                                                y={cy - 10}
                                                width={30}
                                                height={20}
                                                rx={4}
                                                fill={r === "dark" ? "#ffffff" : "#000000"}
                                                fillOpacity={opacity}
                                                className="transition-all duration-300"
                                              />
                                            );
                                          }} />
                                        </ScatterChart>
                                      </ResponsiveContainer>
                                    );
                                  })()}
                                </div>
                              </div>
                            </Lt.div>
                          }
                          {
                            <Lt.div variants={Kt} className={Bo + " mb-6 mt-6"}>
                              {
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                                  {
                                    <div className="flex items-center gap-3">
                                      {
                                        <div className="p-2 bg-black/5 dark:bg-white/10 rounded-xl backdrop-blur-md border border-black/5 dark:border-white/10">
                                          {
                                            <Vne className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
                                          }
                                        </div>
                                      }
                                      {
                                        <div>
                                          {
                                            <span className="text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-mono">
                                              {"Activity Distribution"}
                                            </span>
                                          }
                                          {
                                            <h3 className="text-xl font-semibold font-display text-neutral-900 dark:text-white tracking-tight mt-0.5">
                                              {"When you sent your messages"}
                                            </h3>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                  {
                                    <CustomSelect
                                      value={d}
                                      onChange={(F) => p(F.target.value)}
                                      options={[
                                        { value: 'last_24_hours', label: 'Last 24 hours' },
                                        { value: 'last_7_days', label: 'Last 7 days' },
                                        { value: 'last_30_days', label: 'Last 30 days' },
                                        { value: 'last_90_days', label: 'Last 90 days' },
                                        { value: 'last_year', label: 'Last year' }
                                      ]}
                                      className="appearance-none w-full bg-black/5 dark:bg-white/5 backdrop-blur-3xl border border-neutral-200/50 dark:border-white/10 rounded-xl px-4 py-2 pr-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer transition-all hover:bg-black/10 dark:hover:bg-white/10"
                                    />
                                  }
                                </div>
                              }
                              {
                                <div className="relative flex flex-col gap-2.5 overflow-x-auto pb-6 pl-2 pt-16 -mt-16 -mb-4 scrollbar-hide">
                                  {
                                    <div className="flex gap-1.5 min-w-max ml-12 mb-1">
                                      {Array.from(
                                        {
                                          length: 24,
                                        },
                                        (F, ye) =>
                                          `${ye.toString().padStart(2, "0")}:00`,
                                      ).map((F) => (
                                        <div key={F} className="w-8 text-center text-[10px] font-medium text-neutral-500 dark:text-zinc-400">
                                          {F.split(":")[0]}
                                        </div>
                                      ))}
                                    </div>
                                  }
                                  {[
                                    {
                                      day: "Mon",
                                    },
                                    {
                                      day: "Tue",
                                    },
                                    {
                                      day: "Wed",
                                    },
                                    {
                                      day: "Thu",
                                    },
                                    {
                                      day: "Fri",
                                    },
                                    {
                                      day: "Sat",
                                    },
                                    {
                                      day: "Sun",
                                    },
                                  ].map((F, ye) => {
                                    const Be = (Wt, tr) => {
                                      let Bn =
                                        (Wt * 7 + tr * 13 + d.length * 3) %
                                        100;
                                      return d === "last_24_hours" && Wt !== 0
                                        ? 0
                                        : Bn > 85
                                          ? 3
                                          : Bn > 65
                                            ? 2
                                            : Bn > 40
                                              ? 1
                                              : 0;
                                    },
                                      pt = Array.from(
                                        {
                                          length: 24,
                                        },
                                        (Wt, tr) => Be(ye, tr),
                                      );
                                    if (d === "last_24_hours" && ye !== 0)
                                      return null;
                                    const mt =
                                      d === "last_24_hours" ? "Today" : F.day;
                                    return (
                                      <div key={F.day || ye} className="flex gap-1.5 items-center min-w-max">
                                        {
                                          <div className="w-10 text-[11px] font-medium text-neutral-500 dark:text-zinc-400 text-right pr-2 uppercase tracking-wider">
                                            {mt}
                                          </div>
                                        }
                                        {pt.map((Wt, tr) => {
                                          const Bn = `${tr.toString().padStart(2, "0")}:00`;
                                          let bn =
                                            "bg-black/[0.03] dark:bg-white/[0.03] border-black/[0.04] dark:border-white/[0.04]";
                                          return (
                                            Wt === 1 &&
                                            (bn =
                                              "bg-black/[0.12] dark:bg-white/[0.1] border-black/[0.08] dark:border-white/[0.08]"),
                                            Wt === 2 &&
                                            (bn =
                                              "bg-black/[0.25] dark:bg-white/[0.25] border-black/[0.15] dark:border-white/[0.15] shadow-[0_2px_10px_rgba(0,0,0,0.05)]"),
                                            Wt === 3 &&
                                            (bn =
                                              "bg-black/[0.45] dark:bg-white/[0.45] border-black/[0.25] dark:border-white/[0.25] shadow-[0_4px_15px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_15px_rgba(255,255,255,0.06)]"),
                                            (
                                              <div key={tr}
                                                className={`group relative w-8 h-6 rounded border transition-all duration-200 hover:scale-[1.25] hover:z-30 cursor-crosshair hover:shadow-lg hover:border-black/30 dark:hover:border-white/40 ${bn}`}
                                              >
                                                {
                                                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-2 bg-white/95 dark:bg-zinc-950/95 text-neutral-900 dark:text-white text-[10px] font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-[0_12px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] z-50 transform translate-y-1 group-hover:translate-y-0 backdrop-blur-3xl border border-neutral-200/50 dark:border-white/10">
                                                    {
                                                      <div className="flex flex-col items-center gap-1">
                                                        {
                                                          <span className="font-bold text-xs tracking-tight">
                                                            {Wt === 0
                                                              ? "No"
                                                              : Wt *
                                                              (d ===
                                                                "last_year"
                                                                ? 142
                                                                : d ===
                                                                  "last_30_days"
                                                                  ? 12
                                                                  : 3)}
                                                            {" messages"}
                                                          </span>
                                                        }
                                                        {
                                                          <span className="text-[9px] text-neutral-500 dark:text-neutral-400 font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">
                                                            {mt}
                                                            {" at "}
                                                            {Bn}
                                                          </span>
                                                        }
                                                      </div>
                                                    }
                                                  </div>
                                                }
                                              </div>
                                            )
                                          );
                                        })}
                                      </div>
                                    );
                                  })}
                                </div>
                              }
                            </Lt.div>
                          }
                          {
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {
                                <Lt.div variants={Kt} className={Bo}>
                                  {
                                    <h3 className="text-sm font-semibold font-display text-neutral-900 dark:text-white mb-4 tracking-tight">
                                      {"Device Distribution"}
                                    </h3>
                                  }
                                  {
                                    <div className="space-y-4 text-xs font-normal">
                                      {
                                        /* Row 1: Desktop Outlook */
                                        <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/30 backdrop-blur-xl p-4 space-y-3 transition-all hover:scale-[1.01] duration-300 shadow-sm hover:border-black/15 dark:hover:border-white/15">
                                          <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                              <span className="text-neutral-800 dark:text-zinc-300 font-semibold font-display text-[13px] tracking-tight">
                                                {"Desktop Outlook / Windows"}
                                              </span>
                                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-emerald-500/20 bg-emerald-500/5 text-neutral-900 dark:text-white shadow-sm font-mono">
                                                <En_Icon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 mr-1 shrink-0" strokeWidth={3} />
                                                <span>{"Confirmed"}</span>
                                              </span>
                                            </div>
                                            <span className="font-mono text-neutral-800 dark:text-zinc-300 font-semibold text-[13px]">
                                              {"56% (9)"}
                                            </span>
                                          </div>
                                          <div className="w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                                            <div
                                              className="bg-emerald-500 dark:bg-emerald-400 h-full rounded-full"
                                              style={{ width: "56%" }}
                                            />
                                          </div>
                                        </div>
                                      }
                                      {
                                        /* Row 2: Mobile AppleMail */
                                        <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/30 backdrop-blur-xl p-4 space-y-3 transition-all hover:scale-[1.01] duration-300 shadow-sm hover:border-black/15 dark:hover:border-white/15">
                                          <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                              <span className="text-neutral-800 dark:text-zinc-300 font-semibold font-display text-[13px] tracking-tight">
                                                {"Mobile AppleMail / iOS"}
                                              </span>
                                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-amber-500/20 bg-amber-500/5 text-neutral-900 dark:text-white shadow-sm font-mono">
                                                <ShieldAlert className="w-3.5 h-3.5 text-amber-500 mr-1 shrink-0" strokeWidth={2.5} />
                                                <span>{"Awaiting Opens"}</span>
                                              </span>
                                            </div>
                                            <span className="font-mono text-neutral-800 dark:text-zinc-300 font-semibold text-[13px]">
                                              {"31% (5)"}
                                            </span>
                                          </div>
                                          <div className="w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                                            <div
                                              className="bg-amber-500 dark:bg-amber-400 h-full rounded-full"
                                              style={{ width: "31%" }}
                                            />
                                          </div>
                                        </div>
                                      }
                                      {
                                        /* Row 3: Web Browser Chrome */
                                        <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/30 backdrop-blur-xl p-4 space-y-3 transition-all hover:scale-[1.01] duration-300 shadow-sm hover:border-black/15 dark:hover:border-white/15">
                                          <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                              <span className="text-neutral-800 dark:text-zinc-300 font-semibold font-display text-[13px] tracking-tight">
                                                {"Web Browser Chrome / Safari"}
                                              </span>
                                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-red-500/20 bg-red-500/5 text-neutral-900 dark:text-white shadow-sm font-mono">
                                                <AlertTriangle className="w-3.5 h-3.5 text-red-500 mr-1 shrink-0" strokeWidth={2.5} />
                                                <span>{"Awaiting Clicks"}</span>
                                              </span>
                                            </div>
                                            <span className="font-mono text-neutral-800 dark:text-zinc-300 font-semibold text-[13px]">
                                              {"13% (2)"}
                                            </span>
                                          </div>
                                          <div className="w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                                            <div
                                              className="bg-red-500 dark:bg-red-400 h-full rounded-full"
                                              style={{ width: "13%" }}
                                            />
                                          </div>
                                        </div>
                                      }
                                    </div>
                                  }
                                </Lt.div>
                              }
                              {
                                <Lt.div variants={Kt} className={Bo}>
                                  {
                                    <h3 className="text-sm font-semibold font-display text-neutral-900 dark:text-white mb-4 tracking-tight">
                                      {"System Verification Health"}
                                    </h3>
                                  }
                                  {
                                    <div className="space-y-4 text-xs">
                                      {
                                        /* Health item 1: Tracking Resolution */
                                        <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/30 backdrop-blur-xl p-4 flex items-start gap-4 transition-all hover:scale-[1.01] duration-300 shadow-sm hover:border-black/15 dark:hover:border-white/15">
                                          <div className="shrink-0 pt-0.5">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-emerald-500/20 bg-emerald-500/5 text-neutral-900 dark:text-white shadow-sm font-mono">
                                              <En_Icon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 mr-1 shrink-0" strokeWidth={3} />
                                              <span>{"Confirmed"}</span>
                                            </span>
                                          </div>
                                          <div>
                                            <p className="text-neutral-900 dark:text-white font-semibold font-display text-[13px] tracking-tight">
                                              {"Tracking Resolution 100%"}
                                            </p>
                                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed font-sans font-normal">
                                              {"Every silent 1x1 pixel successfully rendered across remote exchange servers without filtering flags."}
                                            </p>
                                          </div>
                                        </div>
                                      }
                                      {
                                        /* Health item 2: SMTP Callback */
                                        <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/30 backdrop-blur-xl p-4 flex items-start gap-4 transition-all hover:scale-[1.01] duration-300 shadow-sm hover:border-black/15 dark:hover:border-white/15">
                                          <div className="shrink-0 pt-0.5">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-amber-500/20 bg-amber-500/5 text-neutral-900 dark:text-white shadow-sm font-mono">
                                              <ShieldAlert className="w-3.5 h-3.5 text-amber-500 mr-1 shrink-0" strokeWidth={2.5} />
                                              <span>{"Awaiting Opens"}</span>
                                            </span>
                                          </div>
                                          <div>
                                            <p className="text-neutral-900 dark:text-white font-semibold font-display text-[13px] tracking-tight">
                                              {"Instant SMTP Callback"}
                                            </p>
                                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed font-sans font-normal">
                                              {"Average signal verification back-propagation completed within 180ms across global nodes."}
                                            </p>
                                          </div>
                                        </div>
                                      }
                                      {
                                        /* Health item 3: IP Reputation */
                                        <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/30 backdrop-blur-xl p-4 flex items-start gap-4 transition-all hover:scale-[1.01] duration-300 shadow-sm hover:border-black/15 dark:hover:border-white/15">
                                          <div className="shrink-0 pt-0.5">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-red-500/20 bg-red-500/5 text-neutral-900 dark:text-white shadow-sm font-mono">
                                              <AlertTriangle className="w-3.5 h-3.5 text-red-500 mr-1 shrink-0" strokeWidth={2.5} />
                                              <span>{"Awaiting Activity"}</span>
                                            </span>
                                          </div>
                                          <div>
                                            <p className="text-neutral-900 dark:text-white font-semibold font-display text-[13px] tracking-tight">
                                              {"IP Reputation Integrity"}
                                            </p>
                                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed font-sans font-normal">
                                              {"Zero blacklist occurrences on all monitored RBLs, spam filters bypassed successfully."}
                                            </p>
                                          </div>
                                        </div>
                                      }
                                    </div>
                                  }
                                </Lt.div>
                              }
                            </div>
                          }
                        </div>
                      )}
                      {c === "integrations" && (
                        <div className="animate-fadeIn max-w-7xl mx-auto space-y-8 relative z-10">
                          {
                            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 z-[-1]" />
                          }
                          {
                            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2 z-[-1]" />
                          }
                          {
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
                              {
                                <div>
                                  {
                                    <h2 className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight mb-2">
                                      {"Integration Hub"}
                                    </h2>
                                  }
                                  {
                                    <p className="text-sm text-neutral-500 dark:text-zinc-400">
                                      {
                                        "Connect CRM pipelines, webhook endpoints, and API bridges."
                                      }
                                    </p>
                                  }
                                </div>
                              }
                            </div>
                          }
                          {
                            <div className="relative group z-10">
                              {
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                  {
                                    <Om className="h-5 w-5 text-neutral-400 group-focus-within:text-neutral-600 dark:group-focus-within:text-zinc-200 transition-colors" />
                                  }
                                </div>
                              }
                              {
                                <input
                                  type="text"
                                  placeholder="Search integrations..."
                                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-black/20 backdrop-blur-3xl border border-neutral-200 dark:border-white/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400/20 dark:focus:ring-zinc-700/50 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-neutral-900 dark:text-white"
                                />
                              }
                            </div>
                          }
                          {
                            <div>
                              {
                                <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-zinc-400 mb-4">
                                  {"Recommended for you"}
                                </h3>
                              }
                              {
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                  {
                                    <div className="relative p-6 border border-neutral-200 dark:border-white/10 rounded-3xl bg-white dark:bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full overflow-hidden">
                                      {
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none z-0" />
                                      }
                                      {
                                        <div>
                                          {
                                            <div className="flex justify-between items-start mb-4">
                                              {
                                                <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900/50 border border-neutral-100 dark:border-zinc-800 flex items-center justify-center p-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                                  {
                                                    <$ce className="w-full h-full" />
                                                  }
                                                </div>
                                              }
                                              {
                                                <span
                                                  className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded border ${Dr.slack === "connected" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 border-emerald-200 dark:border-emerald-800/60" : "bg-neutral-50 dark:bg-zinc-900/50 text-neutral-500 border-neutral-200 dark:border-zinc-800"}`}
                                                >
                                                  {Dr.slack === "connected"
                                                    ? "Connected"
                                                    : "Available"}
                                                </span>
                                              }
                                            </div>
                                          }
                                          {
                                            <h4 className="font-semibold text-neutral-900 dark:text-white font-display text-lg">
                                              {"Slack"}
                                            </h4>
                                          }
                                          {
                                            <p className="text-xs text-neutral-500 dark:text-zinc-400 mt-2 leading-relaxed">
                                              {
                                                "Push real-time tracking notifications and alerts directly to your team's channels."
                                              }
                                            </p>
                                          }
                                        </div>
                                      }
                                      {
                                        <button
                                          disabled={Dr.slack === "connected"}
                                          onClick={() => {
                                            lo({
                                              id: "slack",
                                              name: "Slack",
                                              description:
                                                "Authenticate your Slack workspace to start receiving notifications for opened emails, clicked links, and pipeline changes.",
                                              fields: [
                                                {
                                                  id: "workspace_url",
                                                  label: "Slack Workspace URL",
                                                  type: "text",
                                                  placeholder:
                                                    "https://acme-corp.slack.com",
                                                },
                                              ],
                                            });
                                          }}
                                          className={`mt-6 relative z-10 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${Dr.slack === "connected" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 cursor-default" : "bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-700 text-neutral-700 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-800 shadow-sm cursor-pointer"} flex items-center justify-center gap-2`}
                                        >
                                          {Dr.slack === "connected" ? (
                                            <React.Fragment>
                                              {<En_Icon className="w-3.5 h-3.5" />}
                                              {" Connected"}
                                            </React.Fragment>
                                          ) : (
                                            <React.Fragment>
                                              {<Wp className="w-3.5 h-3.5" />}
                                              {" Add to Slack"}
                                            </React.Fragment>
                                          )}
                                        </button>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="relative p-6 border border-neutral-200 dark:border-white/10 rounded-3xl bg-white dark:bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full overflow-hidden">
                                      {
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none z-0" />
                                      }
                                      {
                                        <div>
                                          {
                                            <div className="flex justify-between items-start mb-4">
                                              {
                                                <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900/50 border border-neutral-100 dark:border-zinc-800 flex items-center justify-center p-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                                  {
                                                    <Bce className="w-full h-full" />
                                                  }
                                                </div>
                                              }
                                              {
                                                <span
                                                  className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded border ${Dr.hubspot === "connected" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 border-emerald-200 dark:border-emerald-800/60" : "bg-neutral-50 dark:bg-zinc-900/50 text-neutral-500 border-neutral-200 dark:border-zinc-800"}`}
                                                >
                                                  {Dr.hubspot === "connected"
                                                    ? "Connected"
                                                    : "Available"}
                                                </span>
                                              }
                                            </div>
                                          }
                                          {
                                            <h4 className="font-semibold text-neutral-900 dark:text-white font-display text-lg">
                                              {"HubSpot CRM"}
                                            </h4>
                                          }
                                          {
                                            <p className="text-xs text-neutral-500 dark:text-zinc-400 mt-2 leading-relaxed">
                                              {
                                                "Automate marketing workflows and sync telemetry data directly to lead records."
                                              }
                                            </p>
                                          }
                                        </div>
                                      }
                                      {
                                        <button
                                          disabled={Dr.hubspot === "connected"}
                                          onClick={() => {
                                            lo({
                                              id: "hubspot",
                                              name: "HubSpot CRM",
                                              description:
                                                "Connect HubSpot to automatically create and update contact records based on email tracking engagement.",
                                              fields: [
                                                {
                                                  id: "api_key",
                                                  label:
                                                    "HubSpot API / Private App Token",
                                                  type: "password",
                                                  placeholder: "pat-na1-...",
                                                },
                                              ],
                                            });
                                          }}
                                          className={`mt-6 relative z-10 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${Dr.hubspot === "connected" ? "bg-[#ff7a59]/10 text-[#ff7a59] border border-[#ff7a59]/20 cursor-default" : "bg-[#ff7a59] text-white hover:bg-[#ff7a59]/90 shadow-sm cursor-pointer"} flex items-center justify-center gap-2`}
                                        >
                                          {Dr.hubspot === "connected" ? (
                                            <React.Fragment>
                                              {<En_Icon className="w-3.5 h-3.5" />}
                                              {" Connected"}
                                            </React.Fragment>
                                          ) : (
                                            <React.Fragment>
                                              {<Wp className="w-3.5 h-3.5" />}
                                              {" Connect HubSpot"}
                                            </React.Fragment>
                                          )}
                                        </button>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="relative p-6 border border-neutral-200 dark:border-white/10 rounded-3xl bg-white dark:bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full overflow-hidden">
                                      {
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none z-0" />
                                      }
                                      {
                                        <div>
                                          {
                                            <div className="flex justify-between items-start mb-4">
                                              {
                                                <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900/50 border border-neutral-100 dark:border-zinc-800 flex items-center justify-center p-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                                  {
                                                    <Fce className="w-full h-full text-black dark:text-white" />
                                                  }
                                                </div>
                                              }
                                              {
                                                <span
                                                  className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded border ${Dr.notion === "connected" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 border-emerald-200 dark:border-emerald-800/60" : "bg-neutral-50 dark:bg-zinc-900/50 text-neutral-500 border-neutral-200 dark:border-zinc-800"}`}
                                                >
                                                  {Dr.notion === "connected"
                                                    ? "Connected"
                                                    : "Available"}
                                                </span>
                                              }
                                            </div>
                                          }
                                          {
                                            <h4 className="font-semibold text-neutral-900 dark:text-white font-display text-lg">
                                              {"Notion"}
                                            </h4>
                                          }
                                          {
                                            <p className="text-xs text-neutral-500 dark:text-zinc-400 mt-2 leading-relaxed">
                                              {
                                                "Automatically generate detailed tracking reports and databases within your workspace."
                                              }
                                            </p>
                                          }
                                        </div>
                                      }
                                      {
                                        <button
                                          disabled={Dr.notion === "connected"}
                                          onClick={() => {
                                            lo({
                                              id: "notion",
                                              name: "Notion",
                                              description:
                                                "Link your Notion workspace to seamlessly sync and log tracking data into your connected databases.",
                                              fields: [
                                                {
                                                  id: "secret",
                                                  label:
                                                    "Internal Integration Secret",
                                                  type: "password",
                                                  placeholder: "secret_...",
                                                },
                                              ],
                                            });
                                          }}
                                          className={`mt-6 relative z-10 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${Dr.notion === "connected" ? "bg-neutral-100 dark:bg-zinc-800 text-black dark:text-white border border-neutral-200 dark:border-zinc-700 cursor-default" : "bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm cursor-pointer"} flex items-center justify-center gap-2`}
                                        >
                                          {Dr.notion === "connected" ? (
                                            <React.Fragment>
                                              {<En_Icon className="w-3.5 h-3.5" />}
                                              {" Connected"}
                                            </React.Fragment>
                                          ) : (
                                            <React.Fragment>
                                              {<Wp className="w-3.5 h-3.5" />}
                                              {" Authorize Workspace"}
                                            </React.Fragment>
                                          )}
                                        </button>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="relative p-6 border border-neutral-200 dark:border-white/10 rounded-3xl bg-white dark:bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full overflow-hidden">
                                      {
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none z-0" />
                                      }
                                      {
                                        <div>
                                          {
                                            <div className="flex justify-between items-start mb-4">
                                              {
                                                <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900/50 border border-neutral-100 dark:border-zinc-800 flex items-center justify-center p-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                                  {
                                                    <Uce className="w-full h-full" />
                                                  }
                                                </div>
                                              }
                                              {
                                                <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded border bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-neutral-900 dark:border-zinc-100">
                                                  {"Configured"}
                                                </span>
                                              }
                                            </div>
                                          }
                                          {
                                            <h4 className="font-semibold text-neutral-900 dark:text-white font-display text-lg">
                                              {"Zapier / Make.com"}
                                            </h4>
                                          }
                                          {
                                            <p className="text-xs text-neutral-500 dark:text-zinc-400 mt-2 leading-relaxed">
                                              {
                                                "Connect to 5000+ apps. Use the secret token below to authenticate your API requests."
                                              }
                                            </p>
                                          }
                                        </div>
                                      }
                                      {
                                        <div className="mt-6 space-y-2">
                                          {
                                            <label className="text-[10px] uppercase tracking-widest font-semibold text-neutral-500">
                                              {"Tickk API Secret Token"}
                                            </label>
                                          }
                                          {
                                            <div className="flex items-center gap-2">
                                              {
                                                <input
                                                  type="text"
                                                  readOnly={!0}
                                                  value="tk_live_8f92j4f982j4f928"
                                                  className="flex-1 bg-neutral-100 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs font-mono text-neutral-600 dark:text-zinc-400 focus:outline-none"
                                                />
                                              }
                                              {
                                                <button
                                                  onClick={() => { }}
                                                  className="p-2 bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-zinc-700 transition-colors"
                                                >
                                                  {
                                                    <Id className="w-3.5 h-3.5 text-neutral-500" />
                                                  }
                                                </button>
                                              }
                                            </div>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="relative p-6 border border-neutral-200 dark:border-white/10 rounded-3xl bg-white dark:bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full overflow-hidden">
                                      {
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none z-0" />
                                      }
                                      {
                                        <div>
                                          {
                                            <div className="flex justify-between items-start mb-4">
                                              {
                                                <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900/50 border border-neutral-100 dark:border-zinc-800 flex items-center justify-center p-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                                  {
                                                    <Hce className="w-full h-full text-neutral-700 dark:text-zinc-300" />
                                                  }
                                                </div>
                                              }
                                              {
                                                <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded border bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-neutral-900 dark:border-zinc-100">
                                                  {"Configured"}
                                                </span>
                                              }
                                            </div>
                                          }
                                          {
                                            <h4 className="font-semibold text-neutral-900 dark:text-white font-display text-lg">
                                              {"Custom Webhooks"}
                                            </h4>
                                          }
                                          {
                                            <p className="text-xs text-neutral-500 dark:text-zinc-400 mt-2 leading-relaxed">
                                              {
                                                "Dispatch raw JSON payloads to any target endpoint upon email open or link click."
                                              }
                                            </p>
                                          }
                                        </div>
                                      }
                                      {
                                        <div className="mt-6 space-y-2">
                                          {
                                            <label className="text-[10px] uppercase tracking-widest font-semibold text-neutral-500">
                                              {"Target Endpoint URL"}
                                            </label>
                                          }
                                          {
                                            <div className="flex items-center gap-2">
                                              {
                                                <input
                                                  type="text"
                                                  placeholder="https://api.yourserver.com/webhook"
                                                  className="flex-1 bg-transparent border border-neutral-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs text-neutral-800 dark:text-zinc-200 focus:outline-none focus:border-neutral-400 dark:focus:border-zinc-500 transition-colors"
                                                />
                                              }
                                              {
                                                <button className="px-3 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
                                                  {"Save"}
                                                </button>
                                              }
                                            </div>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="relative p-6 border border-neutral-200 dark:border-white/10 rounded-3xl bg-white dark:bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full overflow-hidden">
                                      {
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none z-0" />
                                      }
                                      {
                                        <div>
                                          {
                                            <div className="flex justify-between items-start mb-4">
                                              {
                                                <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900/50 border border-neutral-100 dark:border-zinc-800 flex items-center justify-center p-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                                  {
                                                    <Qce className="w-full h-full" />
                                                  }
                                                </div>
                                              }
                                              {
                                                <span
                                                  className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded border ${Dr.discord === "connected" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 border-emerald-200 dark:border-emerald-800/60" : "bg-neutral-50 dark:bg-zinc-900/50 text-neutral-500 border-neutral-200 dark:border-zinc-800"}`}
                                                >
                                                  {Dr.discord === "connected"
                                                    ? "Connected"
                                                    : "Available"}
                                                </span>
                                              }
                                            </div>
                                          }
                                          {
                                            <h4 className="font-semibold text-neutral-900 dark:text-white font-display text-lg">
                                              {"Discord"}
                                            </h4>
                                          }
                                          {
                                            <p className="text-xs text-neutral-500 dark:text-zinc-400 mt-2 leading-relaxed">
                                              {
                                                "Broadcast rich embed notifications to your server when high-value links are clicked."
                                              }
                                            </p>
                                          }
                                        </div>
                                      }
                                      {
                                        <button
                                          disabled={Dr.discord === "connected"}
                                          onClick={() => {
                                            lo({
                                              id: "discord",
                                              name: "Discord",
                                              description:
                                                "Connect Discord to broadcast rich embed notifications to your server when high-value links are clicked.",
                                              fields: [
                                                {
                                                  id: "webhook_url",
                                                  label: "Discord Webhook URL",
                                                  type: "text",
                                                  placeholder:
                                                    "https://discord.com/api/webhooks/...",
                                                },
                                              ],
                                            });
                                          }}
                                          className={`mt-6 relative z-10 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${Dr.discord === "connected" ? "bg-[#5865F2]/10 text-[#5865F2] border border-[#5865F2]/20 cursor-default" : "bg-[#5865F2] text-white hover:bg-[#5865F2]/90 shadow-sm cursor-pointer"} flex items-center justify-center gap-2`}
                                        >
                                          {Dr.discord === "connected" ? (
                                            <React.Fragment>
                                              {<En_Icon className="w-3.5 h-3.5" />}
                                              {" Connected"}
                                            </React.Fragment>
                                          ) : (
                                            <React.Fragment>
                                              {<Wp className="w-3.5 h-3.5" />}
                                              {" Connect Discord"}
                                            </React.Fragment>
                                          )}
                                        </button>
                                      }
                                    </div>
                                  }
                                </div>
                              }
                            </div>
                          }
                        </div>
                      )}
                      {c === "account" && (
                        <div className="animate-fadeIn h-[calc(100vh-100px)] overflow-hidden flex flex-col lg:flex-row gap-8 bg-white dark:bg-[#111111] p-6 lg:p-8 rounded-2xl border border-neutral-200/60 dark:border-zinc-800/60 shadow-xl">
                          {
                            <div className="w-full lg:w-56 shrink-0 flex flex-col space-y-1 border-r border-neutral-100 dark:border-zinc-800/50 pr-4">
                              {
                                <div className="mb-6 px-3">
                                  {
                                    <h2 className="text-2xl font-light font-display text-neutral-900 dark:text-white tracking-tight">
                                      {"Settings"}
                                    </h2>
                                  }
                                </div>
                              }
                              {[
                                {
                                  id: "tracking",
                                  label: "Tracking",
                                  icon: <Ud className="w-4 h-4" />,
                                },
                                {
                                  id: "gmail",
                                  label: "Gmail / Mail",
                                  icon: <Kp className="w-4 h-4" />,
                                },
                                {
                                  id: "notifications",
                                  label: "Notifications",
                                  icon: <Cne className="w-4 h-4" />,
                                },
                                {
                                  id: "account",
                                  label: "Account",
                                  icon: <Eae className="w-4 h-4" />,
                                },
                                {
                                  id: "subscription",
                                  label: "Subscription",
                                  icon: <Qd className="w-4 h-4" />,
                                },
                                {
                                  id: "privacy",
                                  label: "Privacy & Security",
                                  icon: <Fre className="w-4 h-4" />,
                                },
                                {
                                  id: "team",
                                  label: "Team Members",
                                  icon: <Nae className="w-4 h-4" />,
                                },
                                {
                                  id: "mobile",
                                  label: "Mobile App",
                                  icon: <Hre className="w-4 h-4" />,
                                },
                                {
                                  id: "domains",
                                  label: "Custom Domains",
                                  icon: <Globe className="w-4 h-4" />,
                                },
                              ].map((F) => (
                                <button key={F.id}
                                  onClick={() => vi(F.id)}
                                  className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-[13px] transition-all font-display tracking-wide ${ti === F.id ? "bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md font-medium" : "text-neutral-500 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-900 hover:text-neutral-900 dark:hover:text-white font-normal"}`}
                                >
                                  {F.icon}
                                  {F.label}
                                </button>
                              ))}
                            </div>
                          }
                          {
                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
                              {ti === "tracking" && (
                                <div className="space-y-12 animate-fadeIn max-w-3xl">
                                  {
                                    <div>
                                      {
                                        <h3 className="text-2xl font-light font-display text-neutral-900 dark:text-white tracking-tight mb-2">
                                          {"Tracking Parameters"}
                                        </h3>
                                      }
                                      {
                                        <p className="text-xs text-neutral-500 dark:text-zinc-400">
                                          {
                                            "Configure core tracking behaviors, injection modes, and link redirection domains."
                                          }
                                        </p>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="space-y-6">
                                      {
                                        <h4 className="text-[11px] font-bold font-mono text-neutral-900 dark:text-zinc-300 border-b border-neutral-100 dark:border-zinc-800/60 pb-2 uppercase tracking-widest">
                                          {"Global Tracking Toggles"}
                                        </h4>
                                      }
                                      {
                                        <div className="flex items-start justify-between p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/30 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-zinc-800">
                                          {
                                            <div className="space-y-1">
                                              {
                                                <div className="text-sm font-medium font-display text-neutral-900 dark:text-white">
                                                  {
                                                    "Track outbound emails by default"
                                                  }
                                                </div>
                                              }
                                              {
                                                <div className="text-xs text-neutral-500 dark:text-zinc-500 font-sans">
                                                  {
                                                    "Automatically inject invisible telemetry pixels in all outgoing compositions"
                                                  }
                                                </div>
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in mt-1">
                                              {
                                                <input
                                                  type="checkbox"
                                                  defaultChecked={!0}
                                                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-[3px] border-neutral-900 dark:border-white appearance-none cursor-pointer transform translate-x-5 transition-transform"
                                                />
                                              }
                                              {
                                                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-neutral-900 dark:bg-white cursor-pointer" />
                                              }
                                            </div>
                                          }
                                        </div>
                                      }
                                      {
                                        <div className="flex items-start justify-between p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/30 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-zinc-800">
                                          {
                                            <div className="space-y-1">
                                              {
                                                <div className="flex items-center gap-3">
                                                  {
                                                    <div className="text-sm font-medium font-display text-neutral-900 dark:text-white">
                                                      {"Link Click Wrapping"}
                                                    </div>
                                                  }
                                                </div>
                                              }
                                              {
                                                <div className="text-xs text-neutral-500 dark:text-zinc-500 font-sans">
                                                  {
                                                    "Wrap external links to monitor click-through rates and recipient interaction time"
                                                  }
                                                </div>
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in mt-1">
                                              {
                                                <input
                                                  type="checkbox"
                                                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white dark:bg-zinc-800 border-[3px] border-neutral-300 dark:border-zinc-600 appearance-none cursor-pointer transition-transform"
                                                />
                                              }
                                              {
                                                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-neutral-300 dark:bg-zinc-600 cursor-pointer" />
                                              }
                                            </div>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="space-y-6 pt-4">
                                      {
                                        <h4 className="text-[11px] font-bold font-mono text-neutral-900 dark:text-zinc-300 border-b border-neutral-100 dark:border-zinc-800/60 pb-2 uppercase tracking-widest">
                                          {"Compliance & Signature"}
                                        </h4>
                                      }
                                      {
                                        <div className="flex items-start justify-between p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/30 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-zinc-800">
                                          {
                                            <div className="space-y-1">
                                              {
                                                <div className="flex items-center gap-3">
                                                  {
                                                    <div className="text-sm font-medium font-display text-neutral-900 dark:text-white">
                                                      {
                                                        "Auto-Append Unsubscribe Footer"
                                                      }
                                                    </div>
                                                  }
                                                </div>
                                              }
                                              {
                                                <div className="text-xs text-neutral-500 dark:text-zinc-500 font-sans">
                                                  {
                                                    "Appends a minimal, unstyled opt-out text block to ensure CAN-SPAM compliance"
                                                  }
                                                </div>
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in mt-1">
                                              {
                                                <input
                                                  type="checkbox"
                                                  defaultChecked={!0}
                                                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-[3px] border-neutral-900 dark:border-white appearance-none cursor-pointer transform translate-x-5 transition-transform"
                                                />
                                              }
                                              {
                                                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-neutral-900 dark:bg-white cursor-pointer" />
                                              }
                                            </div>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="space-y-6 pt-4">
                                      {
                                        <div>
                                          {
                                            <h4 className="text-[11px] font-bold font-mono text-neutral-900 dark:text-zinc-300 border-b border-neutral-100 dark:border-zinc-800/60 pb-2 mb-4 uppercase tracking-widest">
                                              {"Custom Tracking Domain (CTD)"}
                                            </h4>
                                          }
                                          {
                                            <p className="text-xs text-neutral-500 dark:text-zinc-400 leading-relaxed mb-6 font-sans">
                                              {
                                                "Provision a custom subdomain for your tracking pixels and wrapped links. This masks the telemetry engine under your corporate identity, dramatically improving inbox placement and bypassing aggressive ESP filtering."
                                              }
                                            </p>
                                          }
                                          {
                                            <div className="space-y-2 mb-6">
                                              {
                                                <label className="text-[11px] font-semibold text-neutral-700 dark:text-zinc-300 font-sans">
                                                  {"Active CTD Hostname"}
                                                </label>
                                              }
                                              {
                                                <div className="flex items-center gap-4">
                                                  {
                                                    <input
                                                      type="text"
                                                      placeholder="e.g. secure.yourdomain.com"
                                                      className="flex-1 bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-zinc-800 text-sm rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-900 dark:focus:border-zinc-400 transition-colors font-mono"
                                                    />
                                                  }
                                                  {
                                                    <button
                                                      onClick={() =>
                                                        s(
                                                          "Subdomain deployed successfully",
                                                          "success",
                                                        )
                                                      }
                                                      className="bg-neutral-900 dark:bg-zinc-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-white text-sm font-medium px-6 py-3 rounded-xl transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] font-display tracking-wide whitespace-nowrap cursor-pointer"
                                                    >
                                                      {"Deploy Subdomain"}
                                                    </button>
                                                  }
                                                </div>
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="bg-neutral-50 dark:bg-[#08080a] border border-neutral-200/80 dark:border-zinc-800/80 rounded-xl p-6 space-y-5 shadow-sm">
                                              {
                                                <div className="flex items-center justify-between">
                                                  {
                                                    <span className="text-sm font-semibold text-neutral-800 dark:text-zinc-200 font-display">
                                                      {
                                                        "DNS Configuration Manifesto"
                                                      }
                                                    </span>
                                                  }
                                                  {
                                                    <FD className="w-4 h-4 text-zinc-500" />
                                                  }
                                                </div>
                                              }
                                              {
                                                <div className="space-y-6 pt-2">
                                                  {
                                                    <div className="space-y-3">
                                                      {
                                                        <h5 className="text-[13px] font-semibold text-neutral-900 dark:text-white font-sans flex items-center gap-2">
                                                          {
                                                            <span className="w-5 h-5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black flex items-center justify-center text-[10px] font-bold">
                                                              {"1"}
                                                            </span>
                                                          }
                                                          {
                                                            "Establish CNAME Record"
                                                          }
                                                        </h5>
                                                      }
                                                      {
                                                        <p className="text-xs text-zinc-500 font-sans pl-7">
                                                          {
                                                            "Inject the following cryptographic linkage into your registrar's zone file (Cloudflare, AWS Route53, Namecheap):"
                                                          }
                                                        </p>
                                                      }
                                                      {
                                                        <div className="ml-7 overflow-hidden rounded-xl border border-neutral-200 dark:border-zinc-800 shadow-sm">
                                                          {
                                                            <table className="w-full text-left text-xs font-mono">
                                                              {
                                                                <thead className="bg-neutral-100 dark:bg-zinc-900 text-neutral-700 dark:text-zinc-300">
                                                                  {
                                                                    <tr>
                                                                      {
                                                                        <th className="px-5 py-3 border-b border-neutral-200 dark:border-zinc-800 font-semibold tracking-wider">
                                                                          {
                                                                            "Type"
                                                                          }
                                                                        </th>
                                                                      }
                                                                      {
                                                                        <th className="px-5 py-3 border-b border-neutral-200 dark:border-zinc-800 font-semibold tracking-wider">
                                                                          {
                                                                            "Host/Name"
                                                                          }
                                                                        </th>
                                                                      }
                                                                      {
                                                                        <th className="px-5 py-3 border-b border-neutral-200 dark:border-zinc-800 font-semibold tracking-wider">
                                                                          {
                                                                            "Target Value"
                                                                          }
                                                                        </th>
                                                                      }
                                                                    </tr>
                                                                  }
                                                                </thead>
                                                              }
                                                              {
                                                                <tbody className="bg-white dark:bg-[#111111] text-zinc-500">
                                                                  {
                                                                    <tr>
                                                                      {
                                                                        <td className="px-5 py-4 border-b border-neutral-100 dark:border-zinc-800/50">
                                                                          {
                                                                            "CNAME"
                                                                          }
                                                                        </td>
                                                                      }
                                                                      {
                                                                        <td className="px-5 py-4 border-b border-neutral-100 dark:border-zinc-800/50">
                                                                          {
                                                                            "secure"
                                                                          }
                                                                        </td>
                                                                      }
                                                                      {
                                                                        <td className="px-5 py-4 border-b border-neutral-100 dark:border-zinc-800/50 text-neutral-900 dark:text-zinc-300">
                                                                          {
                                                                            "ingress.tickk.io"
                                                                          }
                                                                        </td>
                                                                      }
                                                                    </tr>
                                                                  }
                                                                </tbody>
                                                              }
                                                            </table>
                                                          }
                                                        </div>
                                                      }
                                                    </div>
                                                  }
                                                </div>
                                              }
                                            </div>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                </div>
                              )}
                              {ti === "notifications" && (
                                <NotificationSettingsPanel toast={s} />
                              )}
                              {ti === "gmail" && (
                                <MailSettingsPanel toast={s} />
                              )}
                              {ti === "account" && (
                                <AccountSettingsPanel toast={s} />
                              )}
                              {ti === "subscription" && (
                                <SubscriptionSettingsPanel toast={s} />
                              )}
                              {ti === "team" && (
                                <TeamMembersSettingsPanel toast={s} />
                              )}
                              {ti === "privacy" && (
                                <PrivacySettingsPanel toast={s} />
                              )}
                              {ti === "mobile" && (
                                <MobileSettingsPanel toast={s} />
                              )}
                              {ti === "domains" && (
                                <DomainConfiguration />
                              )}
                            </div>
                          }
                        </div>
                      )}
                      {c === "developer_documentation" && (
                        <DeveloperDocumentation />
                      )}
                      {c === "api_keys" && (
                        <div className="animate-fadeIn max-w-7xl mx-auto space-y-8">
                          {
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                              {
                                <h2 className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight">
                                  {"API Keys"}
                                </h2>
                              }
                              {
                                <button
                                  onClick={() => Bs(!0)}
                                  className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm"
                                >
                                  {<D5 className="w-4 h-4" />}
                                  {" Create API key"}
                                </button>
                              }
                            </div>
                          }
                          {
                            <div className="flex flex-col md:flex-row gap-4 mb-6">
                              {
                                <div className="relative flex-1">
                                  {
                                    <Om className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                  }
                                  {
                                    <input
                                      type="text"
                                      placeholder="Search..."
                                      value={Le}
                                      onChange={(F) => He(F.target.value)}
                                      className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#111111] border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white"
                                    />
                                  }
                                </div>
                              }
                              {
                                <div className="relative">
                                  {
                                    <button
                                      onClick={() => on(!nn)}
                                      onBlur={() =>
                                        setTimeout(() => on(!1), 150)
                                      }
                                      className="px-4 py-2 bg-white dark:bg-[#111111] border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white flex items-center justify-between min-w-[150px]"
                                    >
                                      {Ke}
                                    </button>
                                  }
                                  {nn && (
                                    <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white/30 dark:bg-[#111111]/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden p-1 animate-in fade-in slide-in-from-top-2">
                                      {[
                                        "All permissions",
                                        "Full access",
                                        "Sending access",
                                      ].map((F) => (
                                        <button key={F}
                                          onClick={() => {
                                            (bt(F), on(!1));
                                          }}
                                          className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2"
                                        >
                                          {F}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              }
                            </div>
                          }
                          {
                            <div className="bg-white dark:bg-[#111111] border border-neutral-200 dark:border-zinc-800 rounded-xl overflow-visible shadow-sm">
                              {
                                <table className="w-full text-sm text-left">
                                  {
                                    <thead className="bg-neutral-50 dark:bg-zinc-900/40 text-neutral-500 dark:text-neutral-400 text-xs font-semibold">
                                      {
                                        <tr>
                                          {
                                            <th className="px-6 py-3 font-mono uppercase tracking-widest rounded-tl-xl">
                                              {"Name"}
                                            </th>
                                          }
                                          {
                                            <th className="px-6 py-3 font-mono uppercase tracking-widest">
                                              {"Token"}
                                            </th>
                                          }
                                          {
                                            <th className="px-6 py-3 font-mono uppercase tracking-widest">
                                              {"Permission"}
                                            </th>
                                          }
                                          {
                                            <th className="px-6 py-3 font-mono uppercase tracking-widest">
                                              {"Last used"}
                                            </th>
                                          }
                                          {
                                            <th className="px-6 py-3 font-mono uppercase tracking-widest">
                                              {"Created"}
                                            </th>
                                          }
                                          {
                                            <th className="px-6 py-3 text-right font-mono uppercase tracking-widest rounded-tr-xl" />
                                          }
                                        </tr>
                                      }
                                    </thead>
                                  }
                                  {
                                    <tbody className="divide-y divide-neutral-100 dark:divide-zinc-800">
                                      {er.map((F) => (
                                        <tr key={F.id || F.name} className="hover:bg-neutral-50/50 dark:hover:bg-zinc-900/20 transition-colors group relative z-0 hover:z-50">
                                          {
                                            <td className="px-6 py-4 flex items-center gap-3">
                                              {
                                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                                  {
                                                    <Wp className="w-4 h-4 text-emerald-500" />
                                                  }
                                                </div>
                                              }
                                              {
                                                <span className="font-semibold text-neutral-900 dark:text-white">
                                                  {F.name}
                                                </span>
                                              }
                                            </td>
                                          }
                                          {
                                            <td className="px-6 py-4">
                                              {
                                                <span className="px-2.5 py-1 bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 rounded-md font-mono text-xs text-neutral-600 dark:text-neutral-300">
                                                  {F.token}
                                                </span>
                                              }
                                            </td>
                                          }
                                          {
                                            <td className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">
                                              {F.permission}
                                            </td>
                                          }
                                          {
                                            <td className="px-6 py-4 text-neutral-500 dark:text-neutral-400">
                                              {F.lastUsed}
                                            </td>
                                          }
                                          {
                                            <td className="px-6 py-4 text-neutral-500 dark:text-neutral-400">
                                              {F.createdAt}
                                            </td>
                                          }
                                          {
                                            <td className="px-6 py-4 text-right relative">
                                              {
                                                <button
                                                  onClick={() =>
                                                    Yt(
                                                      yt === F.id ? null : F.id,
                                                    )
                                                  }
                                                  onBlur={() =>
                                                    setTimeout(
                                                      () => Yt(null),
                                                      150,
                                                    )
                                                  }
                                                  className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors relative z-10"
                                                >
                                                  {<Wne className="w-5 h-5" />}
                                                </button>
                                              }
                                              {yt === F.id && (
                                                <div className="absolute right-10 top-1/2 -translate-y-1/2 w-48 rounded-xl bg-white/80 dark:bg-[#1a1a1c]/90 backdrop-blur-3xl border border-neutral-200/80 dark:border-zinc-700/80 shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.7)] z-[999] overflow-hidden p-1 animate-in fade-in zoom-in-95">
                                                  {
                                                    <button
                                                      onClick={() => {
                                                        navigator.clipboard.writeText(
                                                          F.token,
                                                        );
                                                      }}
                                                      className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2"
                                                    >
                                                      {
                                                        <Id className="w-4 h-4" />
                                                      }
                                                      {" Copy Token"}
                                                    </button>
                                                  }
                                                  {
                                                    <button
                                                      onClick={() => Wr(F.id)}
                                                      className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2 mt-1"
                                                    >
                                                      {
                                                        <F5 className="w-4 h-4" />
                                                      }
                                                      {" Revoke Key"}
                                                    </button>
                                                  }
                                                </div>
                                              )}
                                            </td>
                                          }
                                        </tr>
                                      ))}
                                    </tbody>
                                  }
                                </table>
                              }
                            </div>
                          }
                        </div>
                      )}
                      {c === "billing" && (
                        <div className="space-y-12 animate-fadeIn">
                          {
                            <div>
                              {
                                <h2 className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight">
                                  {"Corporate Billing & Allocations"}
                                </h2>
                              }
                              {
                                <p className="text-xs text-zinc-500 mt-1">
                                  {
                                    "Monitor real-time subscription ledgers, request custom dispatch bumps, and secure commercial payment credentials."
                                  }
                                </p>
                              }
                            </div>
                          }
                          {
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                              {
                                <Lt.div
                                  variants={Kt}
                                  className="lg:col-span-5 bg-white dark:bg-zinc-900/30 backdrop-blur-xl border border-neutral-200 dark:border-zinc-800/60 rounded-2xl p-6 shadow-sm dark:shadow-xl relative overflow-hidden h-72 flex flex-col justify-between"
                                >
                                  {
                                    <div className="absolute inset-0 border border-emerald-500/10 rounded-2xl pointer-events-none" />
                                  }
                                  {
                                    <div className="space-y-2">
                                      {
                                        <span className="text-[9px] uppercase text-emerald-600 dark:text-neutral-900 dark:text-white bg-emerald-500/5 px-2.5 py-0.5 rounded border border-emerald-500/20 font-semibold inline-block tracking-wider">
                                          {"Active Corporate License"}
                                        </span>
                                      }
                                      {
                                        <h4 className="text-xl font-light font-display text-neutral-900 dark:text-white tracking-tight mt-1">
                                          {"Enterprise Audit Node"}
                                        </h4>
                                      }
                                      {
                                        <p className="text-[11px] text-zinc-500 leading-relaxed font-normal">
                                          {
                                            "Automated high-capacity MTA routes armed with complete dedicated IP configurations and unlimited verification hooks."
                                          }
                                        </p>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-zinc-900/80">
                                      {
                                        <div className="text-xs">
                                          {
                                            <span className="text-zinc-500 font-normal">
                                              {"Next Renewal"}
                                            </span>
                                          }
                                          {
                                            <p className="text-neutral-800 dark:text-zinc-300 font-semibold mt-0.5">
                                              {"August 11, 2026"}
                                            </p>
                                          }
                                        </div>
                                      }
                                      {
                                        <div className="text-right text-xs">
                                          {
                                            <span className="text-zinc-500 font-normal">
                                              {"Subscription Cost"}
                                            </span>
                                          }
                                          {
                                            <p className="text-emerald-600 dark:text-neutral-900 dark:text-white font-semibold mt-0.5">
                                              {"$149.00 / mo"}
                                            </p>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                </Lt.div>
                              }
                              {
                                <Lt.div
                                  variants={Kt}
                                  className="lg:col-span-7 space-y-6"
                                >
                                  {
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                                      {
                                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-[#111113] via-[#1f1f23] to-[#0c0c0e] border border-neutral-200/20 dark:border-zinc-800/80 p-6 text-white shadow-2xl flex flex-col justify-between min-h-[200px] group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                                          {
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.03),transparent)] opacity-80 pointer-events-none" />
                                          }
                                          {
                                            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:4px_4px] opacity-[0.15] pointer-events-none" />
                                          }
                                          {
                                            <div className="flex justify-between items-start relative z-10">
                                              {
                                                <div className="w-10 h-7 rounded bg-gradient-to-tr from-yellow-500/80 via-amber-200 to-yellow-600/90 border border-yellow-400/40 flex items-center justify-center overflow-hidden shadow-[0_2px_8px_rgba(234,179,8,0.2)]">
                                                  {
                                                    <div className="grid grid-cols-3 gap-0.5 w-full h-full p-1 opacity-60">
                                                      {
                                                        <div className="border-r border-b border-yellow-800/40" />
                                                      }
                                                      {
                                                        <div className="border-r border-b border-yellow-800/40" />
                                                      }
                                                      {
                                                        <div className="border-b border-yellow-800/40" />
                                                      }
                                                      {
                                                        <div className="border-r border-yellow-800/40" />
                                                      }
                                                      {
                                                        <div className="border-r border-yellow-800/40" />
                                                      }
                                                      {
                                                        <div className="border-yellow-800/40" />
                                                      }
                                                    </div>
                                                  }
                                                </div>
                                              }
                                              {(() => {
                                                const F = Rs.replace(/\D/g, ""),
                                                  ye = F.startsWith("4"),
                                                  Be = F.startsWith("5");
                                                return ye ? (
                                                  <div className="flex flex-col items-end">
                                                    {
                                                      <span className="text-xl font-black italic tracking-wide text-zinc-100 font-display select-none">
                                                        {"VISA"}
                                                      </span>
                                                    }
                                                    {
                                                      <span className="text-[7px] text-zinc-400 uppercase tracking-widest font-mono font-bold leading-none mt-0.5">
                                                        {"Gold Elite"}
                                                      </span>
                                                    }
                                                  </div>
                                                ) : Be ? (
                                                  <div className="flex flex-col items-end">
                                                    {
                                                      <div className="flex -space-x-1.5 items-center">
                                                        {
                                                          <div className="w-5 h-5 rounded-full bg-rose-500 opacity-90 shadow-sm" />
                                                        }
                                                        {
                                                          <div className="w-5 h-5 rounded-full bg-amber-500 opacity-90 mix-blend-screen shadow-sm" />
                                                        }
                                                      </div>
                                                    }
                                                    {
                                                      <span className="text-[7px] text-zinc-400 uppercase tracking-widest font-mono font-bold leading-none mt-1">
                                                        {"World Elite"}
                                                      </span>
                                                    }
                                                  </div>
                                                ) : (
                                                  <div className="flex flex-col items-end">
                                                    {
                                                      <span className="text-xs font-bold tracking-widest font-mono text-zinc-300 uppercase">
                                                        {"TIK PRIVATE"}
                                                      </span>
                                                    }
                                                    {
                                                      <span className="text-[7px] text-zinc-500 uppercase tracking-widest font-mono leading-none mt-0.5">
                                                        {"Corporate Master"}
                                                      </span>
                                                    }
                                                  </div>
                                                );
                                              })()}
                                            </div>
                                          }
                                          {
                                            <div className="space-y-1 my-4 relative z-10">
                                              {
                                                <div className="text-lg font-mono tracking-[0.22em] text-zinc-100 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                                                  {(() => {
                                                    const F = Rs.replace(
                                                      /\D/g,
                                                      "",
                                                    ),
                                                      ye =
                                                        F.substring(0, 4) ||
                                                        "••••",
                                                      Be =
                                                        F.substring(
                                                          F.length - 4,
                                                        ) || "••••";
                                                    return `${ye} **** **** ${Be}`;
                                                  })()}
                                                </div>
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="flex justify-between items-end relative z-10">
                                              {
                                                <div>
                                                  {
                                                    <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold">
                                                      {"CARDHOLDER"}
                                                    </span>
                                                  }
                                                  {
                                                    <p className="text-xs font-semibold font-sans text-zinc-200 uppercase tracking-wider">
                                                      {gf}
                                                    </p>
                                                  }
                                                </div>
                                              }
                                              {
                                                <div className="text-right">
                                                  {
                                                    <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold">
                                                      {"EXPIRES"}
                                                    </span>
                                                  }
                                                  {
                                                    <p className="text-xs font-mono text-zinc-200 font-semibold">
                                                      {mc}
                                                    </p>
                                                  }
                                                </div>
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="absolute -top-10 -left-10 w-36 h-36 bg-zinc-700/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-zinc-700/20 transition-all duration-700" />
                                          }
                                          {
                                            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-neutral-800/30 rounded-full blur-[40px] pointer-events-none" />
                                          }
                                        </div>
                                      }
                                      {
                                        <div
                                          className={`flex flex-col justify-between p-6 ${Ba} rounded-2xl`}
                                        >
                                          {
                                            <div className="space-y-2">
                                              {
                                                <h5 className="text-xs font-semibold font-display uppercase text-neutral-800 dark:text-zinc-300 tracking-wider flex items-center gap-2">
                                                  {
                                                    <Qd className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                                                  }
                                                  {"Payment Gateway"}
                                                </h5>
                                              }
                                              {
                                                <p className="text-[11px] text-zinc-500 leading-normal">
                                                  {
                                                    "Secure transactions are routed through an encrypted hardware ledger. Customize payment card details anytime."
                                                  }
                                                </p>
                                              }
                                            </div>
                                          }
                                          {
                                            <button
                                              onClick={() => {
                                                (Zc(!Nl), wl(!1));
                                              }}
                                              className="w-full mt-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-neutral-800 dark:border-zinc-800 text-xs font-medium text-white rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                                            >
                                              {<YD className="w-3.5 h-3.5" />}
                                              {Nl
                                                ? "Hide Secure Editor"
                                                : "Modify Vault Card"}
                                            </button>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                  {Nl && (
                                    <Lt.div
                                      initial={{
                                        opacity: 0,
                                        y: -10,
                                      }}
                                      animate={{
                                        opacity: 1,
                                        y: 0,
                                      }}
                                      className={`${Ba} p-6 space-y-4`}
                                    >
                                      {
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-800 dark:text-zinc-300">
                                          {"Update Secure Vault Card"}
                                        </h4>
                                      }
                                      {Qt && (
                                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-600 dark:text-neutral-900 dark:text-white flex items-center gap-2">
                                          {
                                            <En_Icon className="w-4 h-4 text-emerald-500 shrink-0" />
                                          }
                                          {
                                            "Secure database records synchronized successfully. Card updated."
                                          }
                                        </div>
                                      )}
                                      {
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                          {
                                            <div className="space-y-1.5">
                                              {
                                                <label className="text-zinc-500">
                                                  {"Cardholder Name"}
                                                </label>
                                              }
                                              {
                                                <input
                                                  type="text"
                                                  value={gf}
                                                  onChange={(F) =>
                                                    Ip(F.target.value)
                                                  }
                                                  className="w-full px-3 py-2 bg-neutral-100 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-lg text-neutral-950 dark:text-white"
                                                />
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="space-y-1.5">
                                              {
                                                <label className="text-zinc-500">
                                                  {"Card Number"}
                                                </label>
                                              }
                                              {
                                                <input
                                                  type="text"
                                                  value={Rs}
                                                  onChange={(F) =>
                                                    Ra(F.target.value)
                                                  }
                                                  placeholder="4000 1234 5678 9012"
                                                  className="w-full px-3 py-2 bg-neutral-100 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-lg text-neutral-950 dark:text-white font-mono"
                                                />
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="space-y-1.5">
                                              {
                                                <label className="text-zinc-500">
                                                  {"Expiry Date"}
                                                </label>
                                              }
                                              {
                                                <input
                                                  type="text"
                                                  value={mc}
                                                  onChange={(F) =>
                                                    Is(F.target.value)
                                                  }
                                                  placeholder="MM/YY"
                                                  className="w-full px-3 py-2 bg-neutral-100 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-lg text-neutral-950 dark:text-white font-mono"
                                                />
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="space-y-1.5">
                                              {
                                                <label className="text-zinc-500">
                                                  {"CVV Security Code"}
                                                </label>
                                              }
                                              {
                                                <input
                                                  type="password"
                                                  value={vf}
                                                  onChange={(F) =>
                                                    Vo(F.target.value)
                                                  }
                                                  placeholder="•••"
                                                  maxLength={4}
                                                  className="w-full px-3 py-2 bg-neutral-100 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-lg text-neutral-950 dark:text-white font-mono"
                                                />
                                              }
                                            </div>
                                          }
                                        </div>
                                      }
                                      {
                                        <button
                                          onClick={() => {
                                            (wl(!0),
                                              s(
                                                "Settings Updated Successfully",
                                              ),
                                              setTimeout(() => {
                                                (wl(!1), Zc(!1));
                                              }, 2500));
                                          }}
                                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
                                        >
                                          {"Save Secure Vault Credentials"}
                                        </button>
                                      }
                                    </Lt.div>
                                  )}
                                </Lt.div>
                              }
                            </div>
                          }
                          {
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                              {
                                <Lt.div
                                  variants={Kt}
                                  className="lg:col-span-5 bg-gradient-to-br from-white via-[#fbfbfb] to-[#f4f4f6] dark:from-[#0f0f12] dark:via-[#0a0a0c] dark:to-[#030304] border border-neutral-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-md dark:shadow-2xl h-80 flex flex-col justify-between relative overflow-hidden group"
                                >
                                  {
                                    <div className="absolute -top-12 -left-12 w-28 h-28 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                                  }
                                  {
                                    <div className="space-y-1 relative z-10">
                                      {
                                        <h4 className="text-xs font-semibold font-display uppercase text-neutral-800 dark:text-zinc-300 tracking-wider flex items-center gap-2">
                                          {
                                            <Ud className="w-3.5 h-3.5 text-emerald-500 dark:text-neutral-900 dark:text-white" />
                                          }
                                          {"Dynamic Live Quota Gauge"}
                                        </h4>
                                      }
                                      {
                                        <p className="text-[10px] text-zinc-500 dark:text-zinc-500 font-normal leading-normal">
                                          {
                                            "Real-time sliding visual monitoring index of dispatches registered against active server limits."
                                          }
                                        </p>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="grid grid-cols-12 gap-4 items-center my-2 relative z-10">
                                      {
                                        <div className="col-span-5 flex justify-center relative">
                                          {
                                            <svg
                                              className="w-24 h-24 transform -rotate-90"
                                              viewBox="0 0 100 100"
                                            >
                                              {
                                                <circle
                                                  cx="50"
                                                  cy="50"
                                                  r="40"
                                                  className="stroke-neutral-200/50 dark:stroke-zinc-800/80"
                                                  strokeWidth="8"
                                                  fill="transparent"
                                                />
                                              }
                                              {
                                                <Lt.circle
                                                  cx="50"
                                                  cy="50"
                                                  r="40"
                                                  stroke="url(#quotaGradient)"
                                                  strokeWidth="8"
                                                  fill="transparent"
                                                  strokeDasharray="251.2"
                                                  strokeDashoffset={
                                                    251.2 -
                                                    251.2 *
                                                    (Oo
                                                      ? 14240 / fs
                                                      : 14240 / 5e4)
                                                  }
                                                  strokeLinecap="round"
                                                  className="transition-all duration-1000 ease-out"
                                                />
                                              }
                                              {
                                                <defs>
                                                  {
                                                    <linearGradient
                                                      id="quotaGradient"
                                                      x1="0%"
                                                      y1="0%"
                                                      x2="100%"
                                                      y2="100%"
                                                    >
                                                      {
                                                        <stop
                                                          offset="0%"
                                                          stopColor="#10b981"
                                                        />
                                                      }
                                                      {
                                                        <stop
                                                          offset="100%"
                                                          stopColor="#06b6d4"
                                                        />
                                                      }
                                                    </linearGradient>
                                                  }
                                                </defs>
                                              }
                                            </svg>
                                          }
                                          {
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                              {
                                                <span className="text-lg font-light font-display text-neutral-900 dark:text-white leading-none">
                                                  {(
                                                    (Oo
                                                      ? 14240 / fs
                                                      : 14240 / 5e4) * 100
                                                  ).toFixed(1)}
                                                  {"%"}
                                                </span>
                                              }
                                              {
                                                <span className="text-[8px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-mono mt-1">
                                                  {"USED"}
                                                </span>
                                              }
                                            </div>
                                          }
                                        </div>
                                      }
                                      {
                                        <div className="col-span-7 space-y-3 font-mono text-xs">
                                          {
                                            <div>
                                              {
                                                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                                                  {"DISPATCHED VOLUME"}
                                                </span>
                                              }
                                              {
                                                <span className="text-sm font-semibold text-neutral-800 dark:text-zinc-200">
                                                  {"14,240 emails"}
                                                </span>
                                              }
                                            </div>
                                          }
                                          {
                                            <div>
                                              {
                                                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                                                  {"TOTAL QUOTA LIMIT"}
                                                </span>
                                              }
                                              {
                                                <span className="text-sm font-semibold text-emerald-600 dark:text-neutral-900 dark:text-white">
                                                  {ba}
                                                  {" limit"}
                                                </span>
                                              }
                                            </div>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="text-[10px] text-zinc-500 bg-neutral-100/60 dark:bg-zinc-950/40 p-3 rounded-xl border border-neutral-200/50 dark:border-zinc-900 relative z-10 text-center">
                                      {
                                        "Quota refreshes automatically in 30 days. Need higher bandwidth?"
                                      }{" "}
                                      {
                                        <button
                                          onClick={() => {
                                            (ds(!dc), yi(!1));
                                          }}
                                          className="text-emerald-600 dark:text-neutral-900 dark:text-white cursor-pointer font-semibold hover:underline"
                                        >
                                          {"Request Token Limit Bump"}
                                        </button>
                                      }
                                    </div>
                                  }
                                </Lt.div>
                              }
                              {
                                <Lt.div
                                  variants={Kt}
                                  className="lg:col-span-7 h-72 flex flex-col justify-between"
                                >
                                  {dc ? (
                                    <div
                                      className={`p-6 ${Ba} h-full flex flex-col justify-between`}
                                    >
                                      {
                                        <div className="space-y-1">
                                          {
                                            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-800 dark:text-zinc-300">
                                              {"Token Limit Configurator"}
                                            </h4>
                                          }
                                          {
                                            <p className="text-[11px] text-zinc-500">
                                              {
                                                "Drag to adjust the required high-capacity monthly limit."
                                              }
                                            </p>
                                          }
                                        </div>
                                      }
                                      {Oo ? (
                                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2 text-center my-auto">
                                          {
                                            <L5 className="w-6 h-6 text-emerald-500 mx-auto animate-bounce" />
                                          }
                                          {
                                            <h5 className="text-xs font-semibold text-neutral-900 dark:text-white">
                                              {"Limit Bump Transmitted"}
                                            </h5>
                                          }
                                          {
                                            <p className="text-[11px] text-zinc-500">
                                              {
                                                "Your request to increase quota to "
                                              }
                                              {
                                                <span className="font-bold text-emerald-500">
                                                  {fs.toLocaleString()}
                                                </span>
                                              }
                                              {
                                                " has been authorized. Limit updated!"
                                              }
                                            </p>
                                          }
                                        </div>
                                      ) : (
                                        <div className="space-y-6">
                                          {
                                            <div className="space-y-2">
                                              {
                                                <div className="flex justify-between text-xs">
                                                  {
                                                    <span className="text-zinc-500">
                                                      {"Desired Quota Limit"}
                                                    </span>
                                                  }
                                                  {
                                                    <span className="font-mono font-bold text-emerald-500">
                                                      {fs.toLocaleString()}
                                                      {" dispatches"}
                                                    </span>
                                                  }
                                                </div>
                                              }
                                              {
                                                <input
                                                  type="range"
                                                  min="50000"
                                                  max="500000"
                                                  step="25000"
                                                  value={fs}
                                                  onChange={(F) =>
                                                    hf(Number(F.target.value))
                                                  }
                                                  className="w-full accent-emerald-500 cursor-pointer"
                                                />
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="flex gap-3">
                                              {
                                                <button
                                                  onClick={() => {
                                                    yi(!0);
                                                  }}
                                                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-all"
                                                >
                                                  {"Deploy Limit Bump"}
                                                </button>
                                              }
                                              {
                                                <button
                                                  onClick={() => ds(!1)}
                                                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-neutral-800 dark:text-zinc-200 text-xs font-medium rounded-lg transition-all"
                                                >
                                                  {"Cancel"}
                                                </button>
                                              }
                                            </div>
                                          }
                                        </div>
                                      )}
                                      {
                                        <div className="text-[9px] text-zinc-500 font-mono tracking-wider">
                                          {
                                            "SECURE TRANSMISSION ENCRYPTED via SSH-SHA256"
                                          }
                                        </div>
                                      }
                                    </div>
                                  ) : (
                                    <div
                                      className={`p-6 ${Ba} h-full flex flex-col justify-center items-center text-center space-y-4`}
                                    >
                                      {
                                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                          {
                                            <Gp className="w-6 h-6 text-emerald-500" />
                                          }
                                        </div>
                                      }
                                      {
                                        <div className="space-y-1">
                                          {
                                            <h4 className="text-sm font-semibold font-display text-neutral-900 dark:text-white">
                                              {
                                                "Expand Server Capacities Instantly"
                                              }
                                            </h4>
                                          }
                                          {
                                            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                                              {
                                                "Seamlessly deploy extra bandwidth resources to your SMTP cluster by bumping the dispatch limits on-the-fly."
                                              }
                                            </p>
                                          }
                                        </div>
                                      }
                                      {
                                        <button
                                          onClick={() => ds(!0)}
                                          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-neutral-800 dark:border-zinc-800 text-xs font-medium text-white rounded-lg transition-colors cursor-pointer"
                                        >
                                          {"Launch Limit Bumper"}
                                        </button>
                                      }
                                    </div>
                                  )}
                                </Lt.div>
                              }
                            </div>
                          }
                          {
                            <Lt.div
                              variants={Kt}
                              className="bg-white dark:bg-zinc-900/20 border border-neutral-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm dark:shadow-xl"
                            >
                              {
                                <div className="p-6 border-b border-neutral-200 dark:border-zinc-900 bg-neutral-50 dark:bg-zinc-950/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                  {
                                    <div>
                                      {
                                        <h4 className="text-xs font-semibold font-display uppercase text-neutral-800 dark:text-zinc-400 tracking-wider">
                                          {"Historic Transaction Ledger"}
                                        </h4>
                                      }
                                      {
                                        <p className="text-[11px] text-zinc-500 mt-1">
                                          {
                                            "Audit and export cryptographically signed corporate statement invoices."
                                          }
                                        </p>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="flex flex-wrap items-center gap-3">
                                      {
                                        <input
                                          type="text"
                                          placeholder="Search Txn ID..."
                                          value={hc}
                                          onChange={(F) => xf(F.target.value)}
                                          className="px-3 py-1.5 text-xs bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-lg text-neutral-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 font-normal"
                                        />
                                      }
                                      {
                                        <div className="relative">
                                          {
                                            <button
                                              onClick={() => so(!oo)}
                                              onBlur={() =>
                                                setTimeout(() => so(!1), 150)
                                              }
                                              className="px-3 py-1.5 text-xs bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-lg text-neutral-950 dark:text-white cursor-pointer font-normal min-w-[120px] text-left"
                                            >
                                              {oa === "All"
                                                ? "All Invoices"
                                                : oa}
                                            </button>
                                          }
                                          {oo && (
                                            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white/30 dark:bg-[#111111]/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden p-1 animate-in fade-in slide-in-from-top-2">
                                              {[
                                                {
                                                  label: "All Invoices",
                                                  value: "All",
                                                },
                                                {
                                                  label: "Paid",
                                                  value: "Paid",
                                                },
                                                {
                                                  label: "Processing",
                                                  value: "Processing",
                                                },
                                                {
                                                  label: "Overdue",
                                                  value: "Overdue",
                                                },
                                              ].map((F) => (
                                                <button key={F.value}
                                                  onClick={() => {
                                                    (Bp(F.value), so(!1));
                                                  }}
                                                  className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2"
                                                >
                                                  {F.label}
                                                </button>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      }
                                      {
                                        <button
                                          onClick={yc}
                                          className="px-3.5 py-1.5 bg-neutral-950 hover:bg-neutral-900 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-semibold text-white border border-neutral-950 dark:border-zinc-800 rounded-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
                                        >
                                          {
                                            <ZB className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                                          }
                                          {"Statement PDF"}
                                        </button>
                                      }
                                    </div>
                                  }
                                </div>
                              }
                              {
                                <div className="overflow-x-auto">
                                  {
                                    <table className="w-full text-left border-collapse text-xs font-normal">
                                      {
                                        <thead>
                                          {
                                            <tr className="bg-neutral-100 dark:bg-zinc-950/40 text-zinc-500 text-[10px] uppercase border-b border-neutral-200 dark:border-zinc-900 tracking-wider">
                                              {
                                                <th className="px-6 py-4 font-normal">
                                                  {"Date"}
                                                </th>
                                              }
                                              {
                                                <th className="px-6 py-4 font-normal">
                                                  {"Transaction Reference ID"}
                                                </th>
                                              }
                                              {
                                                <th className="px-6 py-4 font-normal">
                                                  {"Value"}
                                                </th>
                                              }
                                              {
                                                <th className="px-6 py-4 font-normal">
                                                  {"Status"}
                                                </th>
                                              }
                                              {
                                                <th className="px-6 py-4 font-normal text-right">
                                                  {"Action"}
                                                </th>
                                              }
                                            </tr>
                                          }
                                        </thead>
                                      }
                                      {
                                        <tbody className="divide-y divide-neutral-200 dark:divide-zinc-900/40">
                                          {[
                                            {
                                              date: "Jul 11, 2026",
                                              ref: "TXN-908234-ADF",
                                              val: "$149.00 USD",
                                              status: "Paid",
                                            },
                                            {
                                              date: "Jun 11, 2026",
                                              ref: "TXN-874102-KSD",
                                              val: "$149.00 USD",
                                              status: "Paid",
                                            },
                                            {
                                              date: "May 11, 2026",
                                              ref: "TXN-794012-PQA",
                                              val: "$149.00 USD",
                                              status: "Paid",
                                            },
                                            {
                                              date: "Apr 11, 2026",
                                              ref: "TXN-712894-LMW",
                                              val: "$149.00 USD",
                                              status: "Processing",
                                            },
                                            {
                                              date: "Mar 11, 2026",
                                              ref: "TXN-623910-YTR",
                                              val: "$149.00 USD",
                                              status: "Overdue",
                                            },
                                          ]
                                            .filter((F) => {
                                              const ye = F.ref
                                                .toLowerCase()
                                                .includes(hc.toLowerCase()),
                                                Be =
                                                  oa === "All" ||
                                                  F.status === oa;
                                              return ye && Be;
                                            })
                                            .map((F, ye) => {
                                              let Be = "";
                                              return (
                                                F.status === "Paid"
                                                  ? (Be =
                                                    "text-emerald-600 dark:text-neutral-900 dark:text-white bg-emerald-500/5 border border-emerald-500/20")
                                                  : F.status === "Processing"
                                                    ? (Be =
                                                      "text-amber-600 dark:text-amber-400 bg-amber-500/5 border border-amber-500/20")
                                                    : (Be =
                                                      "text-rose-600 dark:text-rose-400 bg-rose-500/5 border border-rose-500/20"),
                                                (
                                                  <tr key={F.ref || ye} className="hover:bg-neutral-100/40 dark:hover:bg-zinc-900/10 transition-colors">
                                                    {
                                                      <td className="px-6 py-4.5 text-neutral-800 dark:text-zinc-300 font-medium">
                                                        {F.date}
                                                      </td>
                                                    }
                                                    {
                                                      <td className="px-6 py-4.5 font-mono text-neutral-600 dark:text-zinc-400">
                                                        {F.ref}
                                                      </td>
                                                    }
                                                    {
                                                      <td className="px-6 py-4.5 text-neutral-900 dark:text-zinc-300 font-semibold">
                                                        {F.val}
                                                      </td>
                                                    }
                                                    {
                                                      <td className="px-6 py-4.5">
                                                        {
                                                          <span
                                                            className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-normal border ${Be}`}
                                                          >
                                                            {
                                                              <span
                                                                className={`w-1.5 h-1.5 rounded-full mr-1.5 self-center ${F.status === "Paid" ? "bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" : F.status === "Processing" ? "bg-amber-500" : "bg-rose-500"}`}
                                                              />
                                                            }
                                                            {F.status}
                                                          </span>
                                                        }
                                                      </td>
                                                    }
                                                    {
                                                      <td className="px-6 py-4.5 text-right">
                                                        {
                                                          <button
                                                            onClick={() =>
                                                              Nc(F)
                                                            }
                                                            className="p-1.5 text-zinc-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded border border-neutral-200 dark:border-zinc-800 transition-all cursor-pointer"
                                                            title="Download invoice receipt PDF"
                                                          >
                                                            {
                                                              <HD className="w-3.5 h-3.5" />
                                                            }
                                                          </button>
                                                        }
                                                      </td>
                                                    }
                                                  </tr>
                                                )
                                              );
                                            })}
                                        </tbody>
                                      }
                                    </table>
                                  }
                                </div>
                              }
                            </Lt.div>
                          }
                        </div>
                      )}
                      {c === "pricing" && (
                        <div className="space-y-12 animate-fadeIn">
                          {
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                              {
                                <div>
                                  {
                                    <h2 className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight">
                                      {"Tickk Beta Pricing "}
                                      {
                                        <span className="px-2 py-0.5 ml-2 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 shadow-sm align-middle inline-block transform -translate-y-1">
                                          {"PREMIUM"}
                                        </span>
                                      }
                                    </h2>
                                  }
                                  {
                                    <p className="text-xs text-zinc-500 mt-1">
                                      {
                                        "Select the operational bandwidth that best matches your corporate sending frequency."
                                      }
                                    </p>
                                  }
                                </div>
                              }
                              {
                                <div className="relative p-1 bg-neutral-200/50 dark:bg-zinc-950/80 border border-neutral-300/40 dark:border-zinc-800/80 rounded-xl flex items-center select-none overflow-hidden self-start">
                                  {
                                    <button
                                      onClick={() => Ms("monthly")}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${xi === "monthly" ? "bg-white text-neutral-950 shadow-sm dark:bg-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"}`}
                                    >
                                      {"MONTHLY"}
                                    </button>
                                  }
                                  {
                                    <button
                                      onClick={() => Ms("annual")}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${xi === "annual" ? "bg-white text-neutral-950 shadow-sm dark:bg-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"}`}
                                    >
                                      {"ANNUAL"}
                                      {
                                        <span className="text-[8px] bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold px-1 py-0.5 rounded font-mono uppercase">
                                          {"SAVE 20%"}
                                        </span>
                                      }
                                    </button>
                                  }
                                </div>
                              }
                            </div>
                          }
                          {ue ? (
                            <Lt.div
                              initial={{
                                opacity: 0,
                                y: 15,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              className="p-8 bg-gradient-to-b from-zinc-100 to-zinc-200/50 dark:from-[#111111] dark:to-[#0a0a0a] border-2 border-zinc-300 dark:border-zinc-800 rounded-2xl relative overflow-hidden group shadow-[0_8px_32px_rgba(255,255,255,0.02)]"
                            >
                              {
                                <div className="absolute top-0 right-0 w-80 h-80 bg-zinc-400/5 rounded-full blur-[80px] pointer-events-none" />
                              }
                              {
                                <div className="max-w-3xl space-y-6">
                                  {
                                    <div className="flex items-center gap-3">
                                      {
                                        <div className="p-3 bg-zinc-200 dark:bg-zinc-800 rounded-2xl">
                                          {
                                            <Gp className="w-6 h-6 text-zinc-600 dark:text-zinc-300 animate-pulse" />
                                          }
                                        </div>
                                      }
                                      {
                                        <div>
                                          {
                                            <span className="text-[10px] uppercase tracking-widest text-zinc-800 dark:text-zinc-200 font-bold font-mono">
                                              {"BETA SUPPORTER TIER"}
                                            </span>
                                          }
                                          {
                                            <h3 className="text-xl font-bold font-display text-neutral-900 dark:text-white mt-0.5 font-sans">
                                              {"Beta Pro Access"}
                                            </h3>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="space-y-4">
                                      {
                                        <h4 className="text-lg font-light font-display text-zinc-800 dark:text-zinc-200 tracking-tight leading-relaxed">
                                          {
                                            '"You are operating with ultimate email intelligence. Your dedicated high-capacity proxy cluster is fully active, bypassing standard spam filters with near-zero latency."'
                                          }
                                        </h4>
                                      }
                                      {
                                        <p className="text-xs text-neutral-600 dark:text-zinc-400 leading-relaxed font-normal">
                                          {
                                            "Your smart decision to configure the "
                                          }
                                          {ri(xl)}
                                          {
                                            " grants you unthrottled access to premium features: instant webhook callbacks, custom white-label DNS routing, and "
                                          }
                                          {ba}
                                          {
                                            " tracked dispatches monthly. Your outbound communication is cryptographically protected and optimized for flawless corporate engagement."
                                          }
                                        </p>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                                      {
                                        <div>
                                          {
                                            <span className="text-[9px] uppercase text-zinc-500 font-mono block">
                                              {"Allocated Handshakes"}
                                            </span>
                                          }
                                          {
                                            <span className="text-base font-bold font-display text-neutral-900 dark:text-white">
                                              {ba}
                                              {" / mo"}
                                            </span>
                                          }
                                        </div>
                                      }
                                      {
                                        <div>
                                          {
                                            <span className="text-[9px] uppercase text-zinc-500 font-mono block">
                                              {"Active Routing Server"}
                                            </span>
                                          }
                                          {
                                            <span className="text-base font-bold font-display text-neutral-900 dark:text-white">
                                              {"Secure SMTP-Node"}
                                            </span>
                                          }
                                        </div>
                                      }
                                      {
                                        <div>
                                          {
                                            <span className="text-[9px] uppercase text-zinc-500 font-mono block">
                                              {"Custom Domain Verification"}
                                            </span>
                                          }
                                          {
                                            <span className="text-base font-bold font-display text-zinc-800 dark:text-zinc-300">
                                              {"Verified & Secure"}
                                            </span>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="pt-6 flex flex-wrap items-center gap-4">
                                      {
                                        <button
                                          onClick={() => {
                                            ($(!1), Xe && Im());
                                          }}
                                          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                                        >
                                          {"Manage License / View Packages"}
                                        </button>
                                      }
                                      {
                                        <span className="text-[10px] text-zinc-500 font-mono">
                                          {
                                            "* Click above to simulate cancel/inactive state to view packages."
                                          }
                                        </span>
                                      }
                                    </div>
                                  }
                                </div>
                              }
                            </Lt.div>
                          ) : (
                            <React.Fragment>
                              {
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                                  {
                                    <Lt.div
                                      variants={Kt}
                                      className="flex flex-col justify-between p-6 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-xl border border-neutral-200 dark:border-zinc-800/80 rounded-2xl relative overflow-hidden group"
                                    >
                                      {xl === "Telemetry Starter" && (
                                        <div className="absolute top-0 right-0 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold text-[8px] uppercase tracking-widest px-3.5 py-1.5 rounded-bl font-mono z-20">
                                          {"Currently Active"}
                                        </div>
                                      )}
                                      {
                                        <div className="space-y-4">
                                          {
                                            <div>
                                              {
                                                <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold font-mono">
                                                  {"Standard Pipeline"}
                                                </span>
                                              }
                                              {
                                                <div className="mt-1">
                                                  {ri("Telemetry Starter")}
                                                </div>
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="flex items-baseline gap-1">
                                              {
                                                <span className="text-3xl font-light font-display text-neutral-900 dark:text-white">
                                                  {"$0"}
                                                </span>
                                              }
                                              {
                                                <span className="text-zinc-500 text-xs font-mono">
                                                  {"/ month"}
                                                </span>
                                              }
                                            </div>
                                          }
                                          {
                                            <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                                              {
                                                "Perfect for developer sandboxes, telemetry logging diagnostics, and low-frequency system testing."
                                              }
                                            </p>
                                          }
                                          {
                                            <div className="pt-4 border-t border-neutral-200/60 dark:border-zinc-900/60 space-y-2.5">
                                              {
                                                <div className="flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-300 font-normal">
                                                  {
                                                    <En_Icon className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]" />
                                                  }
                                                  {
                                                    "1,000 tracked dispatches / mo"
                                                  }
                                                </div>
                                              }
                                              {
                                                <div className="flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-300 font-normal">
                                                  {
                                                    <En_Icon className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]" />
                                                  }
                                                  {
                                                    "Standard 1x1 invisible pixel"
                                                  }
                                                </div>
                                              }
                                              {
                                                <div className="flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-300 font-normal">
                                                  {
                                                    <En_Icon className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]" />
                                                  }
                                                  {
                                                    "7-day data retention window"
                                                  }
                                                </div>
                                              }
                                              {
                                                <div className="flex items-center gap-2.5 text-xs text-zinc-400 line-through font-normal">
                                                  {"Custom tracking domains"}
                                                </div>
                                              }
                                            </div>
                                          }
                                        </div>
                                      }
                                      {
                                        <button
                                          onClick={() => {
                                            (bf("Telemetry Starter"),
                                              Po(!0),
                                              zs(!1));
                                          }}
                                          className="w-full mt-8 py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-neutral-800 dark:text-zinc-300 text-xs font-semibold rounded-lg border border-neutral-200/50 dark:border-zinc-800 transition-colors cursor-pointer"
                                        >
                                          {"Select Free Tier"}
                                        </button>
                                      }
                                    </Lt.div>
                                  }
                                  {
                                    <Lt.div
                                      variants={Kt}
                                      className="flex flex-col justify-between p-6 bg-gradient-to-b from-neutral-100/90 to-neutral-200/40 dark:from-[#111113] dark:to-[#08080a] border-2 border-neutral-800 dark:border-zinc-700 shadow-xl rounded-2xl relative overflow-hidden group scale-[1.02] z-10"
                                    >
                                      {xl === "Growth Core Access" && (
                                        <div className="absolute top-0 right-0 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold text-[8px] uppercase tracking-widest px-3.5 py-1.5 rounded-bl font-mono z-20">
                                          {"Currently Active"}
                                        </div>
                                      )}
                                      {
                                        <div className="space-y-4">
                                          {
                                            <div>
                                              {
                                                <span className="text-[9px] uppercase tracking-wider text-neutral-800 dark:text-zinc-400 font-bold font-mono">
                                                  {"Standard Corporate Route"}
                                                </span>
                                              }
                                              {
                                                <div className="mt-1">
                                                  {ri("Growth Core Access")}
                                                </div>
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="flex items-baseline gap-1">
                                              {
                                                <span className="text-3xl font-bold font-display text-neutral-900 dark:text-white">
                                                  {xi === "monthly"
                                                    ? "$149"
                                                    : "$119"}
                                                </span>
                                              }
                                              {
                                                <span className="text-zinc-500 text-xs font-mono">
                                                  {"/ month "}
                                                  {xi === "annual" &&
                                                    "(billed annually)"}
                                                </span>
                                              }
                                            </div>
                                          }
                                          {
                                            <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                                              {
                                                "High-capacity pipelines geared toward executive correspondence logs and complete SMTP delivery proxies."
                                              }
                                            </p>
                                          }
                                          {
                                            <div className="pt-4 border-t border-neutral-200/60 dark:border-zinc-900/60 space-y-2.5">
                                              {
                                                <div className="flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-200 font-semibold">
                                                  {
                                                    <En_Icon className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]" />
                                                  }
                                                  {ba}
                                                  {" tracked dispatches / mo"}
                                                </div>
                                              }
                                              {
                                                <div className="flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-200 font-semibold">
                                                  {
                                                    <En_Icon className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]" />
                                                  }
                                                  {
                                                    "Active Recipient Link Proxy Wrapping"
                                                  }
                                                </div>
                                              }
                                              {
                                                <div className="flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-200 font-semibold">
                                                  {
                                                    <En_Icon className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]" />
                                                  }
                                                  {
                                                    "Instant Webhook callback feeds"
                                                  }
                                                </div>
                                              }
                                              {
                                                <div className="flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-200 font-semibold">
                                                  {
                                                    <En_Icon className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]" />
                                                  }
                                                  {
                                                    "Custom white-label tracking DNS"
                                                  }
                                                </div>
                                              }
                                            </div>
                                          }
                                        </div>
                                      }
                                      {
                                        <button
                                          disabled={!0}
                                          className="w-full mt-8 py-2.5 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-xs font-semibold rounded-lg border border-neutral-900 dark:border-zinc-200 shadow-md transition-colors cursor-not-allowed flex items-center justify-center gap-1.5 font-mono uppercase tracking-wider"
                                        >
                                          {
                                            <L5 className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                                          }
                                          {" Core Route Fully Active"}
                                        </button>
                                      }
                                    </Lt.div>
                                  }
                                  {
                                    <Lt.div
                                      variants={Kt}
                                      className="flex flex-col justify-between p-6 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-xl border border-neutral-200 dark:border-zinc-800/80 rounded-2xl relative overflow-hidden group"
                                    >
                                      {xl === "Quantum Sentinel" && (
                                        <div className="absolute top-0 right-0 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold text-[8px] uppercase tracking-widest px-3.5 py-1.5 rounded-bl font-mono z-20">
                                          {"Currently Active"}
                                        </div>
                                      )}
                                      {
                                        <div className="space-y-4">
                                          {
                                            <div>
                                              {
                                                <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold font-mono">
                                                  {"Unlimited Enterprise"}
                                                </span>
                                              }
                                              {
                                                <div className="mt-1">
                                                  {ri("Quantum Sentinel")}
                                                </div>
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="flex items-baseline gap-1">
                                              {
                                                <span className="text-3xl font-light font-display text-neutral-900 dark:text-white">
                                                  {xi === "monthly"
                                                    ? "$399"
                                                    : "$319"}
                                                </span>
                                              }
                                              {
                                                <span className="text-zinc-500 text-xs font-mono">
                                                  {"/ month "}
                                                  {xi === "annual" &&
                                                    "(billed annually)"}
                                                </span>
                                              }
                                            </div>
                                          }
                                          {
                                            <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                                              {
                                                "Ultra-secure isolated hardware configurations for massive bulk mailing infrastructures and custom IP rotation."
                                              }
                                            </p>
                                          }
                                          {
                                            <div className="pt-4 border-t border-neutral-200/60 dark:border-zinc-900/60 space-y-2.5">
                                              {
                                                <div className="flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-300 font-normal">
                                                  {
                                                    <En_Icon className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]" />
                                                  }
                                                  {
                                                    "Infinite tracked dispatches"
                                                  }
                                                </div>
                                              }
                                              {
                                                <div className="flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-300 font-normal">
                                                  {
                                                    <En_Icon className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]" />
                                                  }
                                                  {
                                                    "Dedicated isolated IP clusters"
                                                  }
                                                </div>
                                              }
                                              {
                                                <div className="flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-300 font-normal">
                                                  {
                                                    <En_Icon className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]" />
                                                  }
                                                  {
                                                    "Custom hardware SMTP server integration"
                                                  }
                                                </div>
                                              }
                                              {
                                                <div className="flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-300 font-normal">
                                                  {
                                                    <En_Icon className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]" />
                                                  }
                                                  {
                                                    "SLA backup & 24/7 dedicated lead engineer"
                                                  }
                                                </div>
                                              }
                                            </div>
                                          }
                                        </div>
                                      }
                                      {
                                        <button
                                          onClick={() => {
                                            (bf("Quantum Sentinel"),
                                              Po(!0),
                                              zs(!1));
                                          }}
                                          className="w-full mt-8 py-2.5 bg-neutral-950 hover:bg-neutral-900 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg border border-neutral-800 dark:border-zinc-800 transition-colors cursor-pointer"
                                        >
                                          {"Upgrade Enterprise Route"}
                                        </button>
                                      }
                                    </Lt.div>
                                  }
                                </div>
                              }
                              {
                                <div className="p-4 bg-neutral-50 dark:bg-zinc-950/40 rounded-xl border border-neutral-200 dark:border-zinc-900 text-center text-[11px] text-zinc-500 max-w-2xl mx-auto">
                                  {
                                    "All pipeline allocations are backed by a cryptographically secured 99.99% service-level agreement. Custom high-scale deployments can also be configured."
                                  }{" "}
                                  {
                                    <span className="text-neutral-800 dark:text-zinc-200 font-semibold cursor-pointer hover:underline">
                                      {"Contact Executive Operations"}
                                    </span>
                                  }
                                </div>
                              }
                            </React.Fragment>
                          )}
                          {
                            <Hi>
                              {ia && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                                  {
                                    <Lt.div
                                      initial={{
                                        opacity: 0,
                                        scale: 0.95,
                                      }}
                                      animate={{
                                        opacity: 1,
                                        scale: 1,
                                      }}
                                      exit={{
                                        opacity: 0,
                                        scale: 0.95,
                                      }}
                                      className="bg-white dark:bg-[#090a0c] border border-neutral-200 dark:border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative"
                                    >
                                      {
                                        <div className="p-6 border-b border-neutral-200 dark:border-zinc-900 flex justify-between items-center bg-neutral-50 dark:bg-zinc-950/20">
                                          {
                                            <h4 className="text-sm font-semibold font-display text-neutral-900 dark:text-white">
                                              {"Authorize Allocation Upgrade"}
                                            </h4>
                                          }
                                          {
                                            <button
                                              onClick={() => Po(!1)}
                                              className="p-1 rounded-lg hover:bg-neutral-200 dark:hover:bg-zinc-900 text-zinc-500 transition-colors cursor-pointer"
                                            >
                                              {<Bd className="w-4 h-4" />}
                                            </button>
                                          }
                                        </div>
                                      }
                                      {
                                        <div className="p-6 space-y-6">
                                          {yl ? (
                                            <div className="space-y-4 text-center py-4">
                                              {
                                                <div className="w-12 h-12 rounded-full bg-zinc-700/10 flex items-center justify-center mx-auto">
                                                  {
                                                    <L5 className="w-6 h-6 text-zinc-600 dark:text-zinc-300 animate-bounce" />
                                                  }
                                                </div>
                                              }
                                              {
                                                <div className="space-y-1">
                                                  {
                                                    <h5 className="text-sm font-semibold text-neutral-900 dark:text-white">
                                                      {
                                                        "Upgrade Authorized Successfully"
                                                      }
                                                    </h5>
                                                  }
                                                  {
                                                    <p className="text-xs text-zinc-500 max-w-xs mx-auto leading-relaxed font-normal">
                                                      {
                                                        "Your account license has been successfully updated to "
                                                      }
                                                      {
                                                        <span className="font-bold text-neutral-950 dark:text-white">
                                                          {ri(io)}
                                                        </span>
                                                      }
                                                      {
                                                        ". MTA cluster configuration updated."
                                                      }
                                                    </p>
                                                  }
                                                </div>
                                              }
                                              {
                                                <button
                                                  onClick={() => Po(!1)}
                                                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg cursor-pointer animate-pulse"
                                                >
                                                  {"Return to Console"}
                                                </button>
                                              }
                                            </div>
                                          ) : (
                                            <div className="space-y-4">
                                              {
                                                <div className="p-4 bg-neutral-50 dark:bg-zinc-950/45 border border-neutral-200 dark:border-zinc-900 rounded-xl space-y-1">
                                                  {
                                                    <span className="text-[10px] text-zinc-500 font-mono">
                                                      {"SELECTED ROUTE"}
                                                    </span>
                                                  }
                                                  {
                                                    <h5 className="text-sm font-semibold text-neutral-900 dark:text-white">
                                                      {ri(io)}
                                                    </h5>
                                                  }
                                                  {
                                                    <p className="text-xs text-zinc-600 dark:text-zinc-300 font-semibold mt-1">
                                                      {io ===
                                                        "Telemetry Starter"
                                                        ? "$0"
                                                        : io ===
                                                          "Quantum Sentinel"
                                                          ? xi === "monthly"
                                                            ? "$399/mo"
                                                            : "$319/mo"
                                                          : ""}
                                                    </p>
                                                  }
                                                </div>
                                              }
                                              {
                                                <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                                                  {
                                                    "By authorizing, you agree to immediately scale your active SMTP capabilities and charge the secure commercial card ending in "
                                                  }
                                                  {
                                                    <span className="font-mono text-neutral-900 dark:text-white">
                                                      {"9012"}
                                                    </span>
                                                  }
                                                  {"."}
                                                </p>
                                              }
                                              {
                                                <div className="pt-4 border-t border-neutral-200/60 dark:border-zinc-900/60 flex gap-3">
                                                  {
                                                    <button
                                                      onClick={() => {
                                                        (zs(!0),
                                                          $(!0),
                                                          Lo(io),
                                                          io ===
                                                          "Quantum Sentinel" &&
                                                          (hf(1e6), yi(!0)));
                                                      }}
                                                      className="flex-1 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-white dark:text-neutral-900 text-white text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
                                                    >
                                                      {"Confirm & Pay Securely"}
                                                    </button>
                                                  }
                                                  {
                                                    <button
                                                      onClick={() => Po(!1)}
                                                      className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-neutral-800 dark:text-zinc-200 text-xs font-medium rounded-lg cursor-pointer"
                                                    >
                                                      {"Cancel"}
                                                    </button>
                                                  }
                                                </div>
                                              }
                                            </div>
                                          )}
                                        </div>
                                      }
                                    </Lt.div>
                                  }
                                </div>
                              )}
                            </Hi>
                          }
                        </div>
                      )}
                      {c === "support" && (
                        <div className="space-y-6 animate-fadeIn h-full flex flex-col min-h-[600px] lg:min-h-[700px]">
                          {
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/55 dark:border-zinc-900/65">
                              {
                                <div>
                                  {
                                    <h2 className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
                                      {"Tickk "}
                                      {
                                        <span className="font-medium text-zinc-400">
                                          {"Beta Feedback"}
                                        </span>
                                      }
                                    </h2>
                                  }
                                  {
                                    <p className="text-xs text-zinc-500 mt-1">
                                      {
                                        "Report bugs and suggest features directly to our core developers."
                                      }
                                    </p>
                                  }
                                </div>
                              }
                              {
                                <button
                                  onClick={() => ge(!0)}
                                  className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-white dark:text-neutral-900 text-white text-xs font-semibold rounded-xl shadow-md shadow-neutral-900/10 hover:shadow-neutral-900/20 dark:shadow-white/10 dark:hover:shadow-white/20 transition-all cursor-pointer flex items-center gap-2 self-start sm:self-center"
                                >
                                  {<D5 className="w-4 h-4" />}
                                  {"Submit Feedback"}
                                </button>
                              }
                            </div>
                          }
                          {
                            <div className="p-4 rounded-2xl bg-neutral-100/50 dark:bg-zinc-900/40 border border-neutral-200/60 dark:border-zinc-800 flex items-center justify-between">
                              {
                                <div className="flex items-center gap-4">
                                  {
                                    <div className="p-3 bg-zinc-200 dark:bg-zinc-800 rounded-xl">
                                      {
                                        <GD className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                                      }
                                    </div>
                                  }
                                  {
                                    <div>
                                      {
                                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-zinc-100">
                                          {"Earn Free Tracking Credits"}
                                        </h4>
                                      }
                                      {
                                        <p className="text-xs text-zinc-500 mt-0.5">
                                          {
                                            "Beta users start with 501 free emails. Submit a useful bug report or feature request and we'll grant you an extra 99 credits instantly."
                                          }
                                        </p>
                                      }
                                    </div>
                                  }
                                </div>
                              }
                              {
                                <div className="text-right">
                                  {
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono block mb-1">
                                      {"YOUR CREDITS"}
                                    </span>
                                  }
                                  {
                                    <span className="text-xl font-bold font-display text-neutral-900 dark:text-white">
                                      {ba}
                                    </span>
                                  }
                                </div>
                              }
                            </div>
                          }
                          {
                            <div className="flex flex-col bg-white dark:bg-zinc-950/20 border border-neutral-200 dark:border-zinc-900 rounded-2xl overflow-hidden flex-1">
                              {
                                <div className="p-4 border-b border-neutral-200/50 dark:border-zinc-900/50 bg-neutral-50/50 dark:bg-zinc-950/40 flex items-center justify-between">
                                  {
                                    <span className="text-xs font-semibold tracking-wide text-neutral-500 dark:text-zinc-400 uppercase">
                                      {"Your Submissions"}
                                    </span>
                                  }
                                  {
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700">
                                      {V.length}
                                      {" Total"}
                                    </span>
                                  }
                                </div>
                              }
                              {Vt && V.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3">
                                  {
                                    <TO className="w-6 h-6 text-zinc-500 animate-spin" />
                                  }
                                  {
                                    <p className="text-xs text-zinc-400">
                                      {"Loading submissions..."}
                                    </p>
                                  }
                                </div>
                              ) : V.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                                  {
                                    <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 dark:text-zinc-600">
                                      {<AO className="w-6 h-6" />}
                                    </div>
                                  }
                                  {
                                    <div className="space-y-1">
                                      {
                                        <h5 className="text-sm font-semibold text-neutral-700 dark:text-zinc-300">
                                          {"No Feedback Yet"}
                                        </h5>
                                      }
                                      {
                                        <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
                                          {
                                            "Found a bug or have a feature idea? Let us know and help us shape the future of Tickk."
                                          }
                                        </p>
                                      }
                                    </div>
                                  }
                                </div>
                              ) : (
                                <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 dark:divide-zinc-900/60 scrollbar-thin p-2">
                                  {V.map((F) => (
                                    <div key={F.id} className="p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/40 transition-colors flex flex-col sm:flex-row gap-4 justify-between items-start">
                                      {
                                        <div className="space-y-2 max-w-2xl">
                                          {
                                            <div className="flex items-center gap-2 flex-wrap">
                                              {
                                                <span className="text-[10px] text-zinc-400 font-mono">
                                                  {"#"}
                                                  {F.id
                                                    .substring(4, 10)
                                                    .toUpperCase()}
                                                </span>
                                              }
                                              {
                                                <span
                                                  className={`px-1.5 py-0.5 rounded text-[9px] font-medium uppercase tracking-wider ${F.category === "bug" ? "bg-red-500/10 text-red-500 border border-red-500/20" : F.category === "feature" ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" : "bg-zinc-500/10 text-zinc-500 border border-zinc-500/20"}`}
                                                >
                                                  {F.category}
                                                </span>
                                              }
                                              {
                                                <span className="text-[10px] text-zinc-400 font-mono">
                                                  {"• "}
                                                  {new Date(
                                                    F.createdAt,
                                                  ).toLocaleDateString()}
                                                </span>
                                              }
                                            </div>
                                          }
                                          {
                                            <div>
                                              {
                                                <h4 className="text-sm font-semibold text-neutral-800 dark:text-zinc-200 leading-snug">
                                                  {F.subject}
                                                </h4>
                                              }
                                              {
                                                <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
                                                  {F.message}
                                                </p>
                                              }
                                            </div>
                                          }
                                        </div>
                                      }
                                      {
                                        <div className="shrink-0">
                                          {
                                            <span
                                              className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5 ${F.status === "submitted" ? "bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-500/20" : F.status === "reviewed" ? "bg-blue-500/10 text-blue-600 dark:text-blue-500 border border-blue-500/20" : "bg-green-500/10 text-green-600 dark:text-green-500 border border-green-500/20"}`}
                                            >
                                              {F.status === "submitted" && (
                                                <C5 className="w-3 h-3" />
                                              )}
                                              {F.status === "reviewed" && (
                                                <Fd className="w-3 h-3" />
                                              )}
                                              {F.status === "rewarded" && (
                                                <GD className="w-3 h-3" />
                                              )}
                                              {F.status}
                                            </span>
                                          }
                                        </div>
                                      }
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          }
                          {
                            <Hi>
                              {Z && !L && (
                                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                                  {
                                    <Lt.div
                                      initial={{
                                        opacity: 0,
                                        scale: 0.95,
                                        y: 20,
                                      }}
                                      animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: 0,
                                      }}
                                      exit={{
                                        opacity: 0,
                                        scale: 0.95,
                                        y: 20,
                                      }}
                                      className="bg-white dark:bg-[#090a0c] border border-neutral-200 dark:border-zinc-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative"
                                    >
                                      {
                                        <div className="h-1.5 w-full bg-gradient-to-r from-zinc-400 via-neutral-800 to-zinc-400 dark:from-zinc-600 dark:via-zinc-200 dark:to-zinc-600" />
                                      }
                                      {
                                        <div className="p-8 text-center space-y-6">
                                          {
                                            <div className="w-16 h-16 bg-neutral-100 dark:bg-zinc-900 rounded-2xl mx-auto flex items-center justify-center mb-2 shadow-inner border border-neutral-200/50 dark:border-zinc-800">
                                              {
                                                <GD className="w-8 h-8 text-neutral-900 dark:text-white animate-pulse" />
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="space-y-3">
                                              {
                                                <h3 className="text-2xl font-light font-display text-neutral-900 dark:text-white tracking-tight">
                                                  {"Welcome to the Beta!"}
                                                </h3>
                                              }
                                              {
                                                <p className="text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto">
                                                  {
                                                    "As an early adopter, your account has been pre-loaded with "
                                                  }
                                                  {
                                                    <span className="font-semibold text-neutral-900 dark:text-zinc-300">
                                                      {
                                                        "501 free email tracking credits"
                                                      }
                                                    </span>
                                                  }
                                                  {"."}
                                                </p>
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="relative overflow-hidden rounded-2xl p-[1px]">
                                              {
                                                <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#ffffff_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#ffffff_50%,#18181b_100%)] opacity-80" />
                                              }
                                              {
                                                <div className="relative z-10 p-4 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-2xl text-left flex items-start gap-3">
                                                  {
                                                    <span
                                                      className="absolute inset-0 rounded-2xl animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.8),50%,transparent,75%,rgba(255,255,255,0.8),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.2),50%,transparent,75%,rgba(255,255,255,0.2),100%)] mix-blend-overlay pointer-events-none"
                                                      style={{
                                                        backgroundSize:
                                                          "300% 100%",
                                                      }}
                                                    />
                                                  }
                                                  {
                                                    <div className="relative z-10 p-2 bg-white dark:bg-zinc-800 rounded-lg shrink-0 shadow-sm border border-neutral-200/50 dark:border-zinc-700">
                                                      {
                                                        <AO className="w-4 h-4 text-neutral-700 dark:text-zinc-300" />
                                                      }
                                                    </div>
                                                  }
                                                  {
                                                    <div className="relative z-10">
                                                      {
                                                        <h4 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-1">
                                                          {"Earn Bonus Credits"}
                                                        </h4>
                                                      }
                                                      {
                                                        <p className="text-[11px] text-zinc-500 leading-relaxed">
                                                          {
                                                            "Help us improve! Submit a quality bug report or feature request via the "
                                                          }
                                                          {
                                                            <strong>
                                                              {"Beta Feedback"}
                                                            </strong>
                                                          }
                                                          {
                                                            " tab, and we'll instantly reward your account with an extra "
                                                          }
                                                          {
                                                            <strong className="text-neutral-900 dark:text-zinc-300">
                                                              {"99 credits"}
                                                            </strong>
                                                          }
                                                          {"."}
                                                        </p>
                                                      }
                                                    </div>
                                                  }
                                                </div>
                                              }
                                            </div>
                                          }
                                          {
                                            <button
                                              onClick={Nf}
                                              className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-neutral-900 text-sm font-semibold rounded-xl transition-all shadow-md cursor-pointer"
                                            >
                                              {"Got it, let's go!"}
                                            </button>
                                          }
                                        </div>
                                      }
                                    </Lt.div>
                                  }
                                </div>
                              )}
                            </Hi>
                          }
                          {
                            <Hi>
                              {xe && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
                                  {
                                    <Lt.div
                                      initial={{
                                        opacity: 0,
                                        scale: 0.96,
                                        y: 10,
                                      }}
                                      animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: 0,
                                      }}
                                      exit={{
                                        opacity: 0,
                                        scale: 0.96,
                                        y: 10,
                                      }}
                                      className="bg-white dark:bg-[#090a0c] border border-neutral-200 dark:border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative"
                                    >
                                      {
                                        <div className="px-6 py-5 border-b border-neutral-200 dark:border-zinc-900 bg-neutral-50 dark:bg-zinc-950/20 flex justify-between items-center">
                                          {
                                            <div className="space-y-0.5">
                                              {
                                                <h4 className="text-sm font-semibold font-display text-neutral-900 dark:text-white uppercase tracking-wide">
                                                  {"Submit Feedback"}
                                                </h4>
                                              }
                                              {
                                                <p className="text-[10px] text-zinc-500 font-normal">
                                                  {
                                                    "Help us shape the future of Tickk during our beta."
                                                  }
                                                </p>
                                              }
                                            </div>
                                          }
                                          {
                                            <button
                                              onClick={() => ge(!1)}
                                              className="p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-zinc-900 text-zinc-500 transition-colors cursor-pointer"
                                            >
                                              {<Bd className="w-4 h-4" />}
                                            </button>
                                          }
                                        </div>
                                      }
                                      {
                                        <form
                                          onSubmit={uo}
                                          className="p-6 space-y-4"
                                        >
                                          {
                                            <div className="space-y-1.5">
                                              {
                                                <label className="text-[10px] font-semibold text-zinc-500 tracking-wider uppercase">
                                                  {"SUBJECT"}
                                                </label>
                                              }
                                              {
                                                <input
                                                  type="text"
                                                  value={Te}
                                                  onChange={(F) =>
                                                    ve(F.target.value)
                                                  }
                                                  placeholder="e.g., Tooltip is hard to read in dark mode"
                                                  required={!0}
                                                  className="w-full bg-neutral-50 dark:bg-zinc-950/50 border border-neutral-200 dark:border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-zinc-800 dark:border-zinc-200 transition-all font-normal"
                                                />
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="space-y-1.5 relative z-40">
                                              {
                                                <label className="text-[10px] font-semibold text-zinc-500 tracking-wider uppercase">
                                                  {"CATEGORY"}
                                                </label>
                                              }
                                              {
                                                <div className="relative">
                                                  {
                                                    <button
                                                      type="button"
                                                      onClick={() => Je(!Ne)}
                                                      className="w-full flex items-center justify-between bg-white/40 dark:bg-zinc-900/40 hover:bg-white/60 dark:hover:bg-zinc-800/60 backdrop-blur-xl border border-neutral-200/50 dark:border-zinc-700/50 rounded-xl px-4 py-2.5 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all font-normal shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] cursor-pointer"
                                                    >
                                                      {
                                                        <span>
                                                          {Ae === "bug"
                                                            ? "Bug Report"
                                                            : Ae === "feature"
                                                              ? "Feature Request"
                                                              : "General Feedback"}
                                                        </span>
                                                      }
                                                      {
                                                        <svg
                                                          className={`w-3.5 h-3.5 transition-transform ${Ne ? "rotate-180" : ""}`}
                                                          fill="none"
                                                          viewBox="0 0 24 24"
                                                          stroke="currentColor"
                                                        >
                                                          {
                                                            <path
                                                              strokeLinecap="round"
                                                              strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M19 9l-7 7-7-7"
                                                            />
                                                          }
                                                        </svg>
                                                      }
                                                    </button>
                                                  }
                                                  {
                                                    <Hi>
                                                      {Ne && (
                                                        <Lt.div
                                                          initial={{
                                                            opacity: 0,
                                                            y: -5,
                                                            scale: 0.95,
                                                          }}
                                                          animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                            scale: 1,
                                                          }}
                                                          exit={{
                                                            opacity: 0,
                                                            y: -5,
                                                            scale: 0.95,
                                                          }}
                                                          transition={{
                                                            duration: 0.15,
                                                          }}
                                                          className="absolute left-0 right-0 mt-2 z-50 rounded-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-neutral-200/60 dark:border-zinc-700/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden"
                                                        >
                                                          {
                                                            <div className="p-1 flex flex-col gap-0.5">
                                                              {[
                                                                "bug",
                                                                "feature",
                                                                "general",
                                                              ].map((F) => (
                                                                <button key={F}
                                                                  type="button"
                                                                  onClick={() => {
                                                                    (Ee(F),
                                                                      Je(!1));
                                                                  }}
                                                                  className={`text-left px-3 py-2.5 text-xs rounded-lg transition-colors ${Ae === F ? "bg-neutral-100 dark:bg-zinc-800 text-neutral-900 dark:text-white font-medium" : "text-neutral-600 dark:text-zinc-400 hover:bg-neutral-50 dark:hover:bg-zinc-800/50 hover:text-neutral-900 dark:hover:text-white"}`}
                                                                >
                                                                  {F === "bug"
                                                                    ? "Bug Report"
                                                                    : F ===
                                                                      "feature"
                                                                      ? "Feature Request"
                                                                      : "General Feedback"}
                                                                </button>
                                                              ))}
                                                            </div>
                                                          }
                                                        </Lt.div>
                                                      )}
                                                    </Hi>
                                                  }
                                                </div>
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="space-y-1.5">
                                              {
                                                <label className="text-[10px] font-semibold text-zinc-500 tracking-wider uppercase">
                                                  {"MESSAGE BODY"}
                                                </label>
                                              }
                                              {
                                                <textarea
                                                  value={it}
                                                  onChange={(F) =>
                                                    oe(F.target.value)
                                                  }
                                                  placeholder="Describe the bug or feature idea in detail..."
                                                  rows={4}
                                                  required={!0}
                                                  className="w-full bg-neutral-50 dark:bg-zinc-950/50 border border-neutral-200 dark:border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-zinc-800 dark:border-zinc-200 transition-all font-normal resize-none"
                                                />
                                              }
                                            </div>
                                          }
                                          {
                                            <div className="pt-4 border-t border-neutral-200/60 dark:border-zinc-900 flex gap-3 justify-end">
                                              {
                                                <button
                                                  type="button"
                                                  onClick={() => ge(!1)}
                                                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-neutral-700 dark:text-zinc-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                                                >
                                                  {"Cancel"}
                                                </button>
                                              }
                                              {
                                                <button
                                                  type="submit"
                                                  disabled={Qe}
                                                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-white dark:text-neutral-900 text-white disabled:opacity-50 text-xs font-semibold rounded-lg shadow-sm cursor-pointer transition-colors"
                                                >
                                                  {Qe
                                                    ? "Submitting..."
                                                    : "Submit Feedback"}
                                                </button>
                                              }
                                            </div>
                                          }
                                        </form>
                                      }
                                    </Lt.div>
                                  }
                                </div>
                              )}
                            </Hi>
                          }
                        </div>
                      )}
                    </Lt.div>
                  )}
                </Hi>
              }
            </div>
          }
        </main>
      }
      {
        <Hi>
          {Yn && xt && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              {
                <Lt.div
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  className="bg-white dark:bg-[#090a0c] border border-neutral-200 dark:border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative"
                >
                  {
                    <div className="p-4 border-b border-neutral-200 dark:border-zinc-900 flex justify-between items-center bg-neutral-50 dark:bg-zinc-950/20">
                      {
                        <div className="flex items-center gap-3">
                          {
                            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-zinc-900 flex items-center justify-center border border-neutral-200 dark:border-zinc-800">
                              {uk(xt.recipient, "w-4 h-4")}
                            </div>
                          }
                          {
                            <div>
                              {
                                <h4 className="text-sm font-semibold font-display text-neutral-900 dark:text-white">
                                  {"Email Client Preview"}
                                </h4>
                              }
                              {
                                <p className="text-[10px] text-zinc-500 font-normal">
                                  {"Viewing exactly as the recipient sees it"}
                                </p>
                              }
                            </div>
                          }
                        </div>
                      }
                      {
                        <div className="flex items-center gap-2">
                          {
                            <div className="flex bg-neutral-100 dark:bg-zinc-900 rounded-lg p-0.5 border border-neutral-200 dark:border-zinc-800/50">
                              {
                                <button
                                  onClick={() => et("visual")}
                                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${$e === "visual" ? "bg-white dark:bg-zinc-800 text-neutral-900 dark:text-white shadow-sm border border-neutral-200/50 dark:border-zinc-700/50" : "text-zinc-500 hover:text-neutral-700 dark:hover:text-zinc-300"}`}
                                >
                                  {"Visual"}
                                </button>
                              }
                              {
                                <button
                                  onClick={() => et("raw")}
                                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${$e === "raw" ? "bg-white dark:bg-zinc-800 text-neutral-900 dark:text-white shadow-sm border border-neutral-200/50 dark:border-zinc-700/50" : "text-zinc-500 hover:text-neutral-700 dark:hover:text-zinc-300"}`}
                                >
                                  {"Raw HTML"}
                                </button>
                              }
                            </div>
                          }
                          {
                            <button
                              onClick={() => _t(!1)}
                              className="p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-zinc-900 text-zinc-500 transition-colors cursor-pointer ml-2"
                            >
                              {<Bd className="w-4 h-4" />}
                            </button>
                          }
                        </div>
                      }
                    </div>
                  }
                  {
                    <div className="flex-1 overflow-auto bg-neutral-50 dark:bg-[#0a0a0c]">
                      {$e === "visual" ? (
                        <div className="p-4 md:p-8 flex justify-center">
                          {(() => {
                            const F = t6e(xt.recipient);
                            return F === "outlook" ? (
                              <div className="w-full max-w-4xl bg-white dark:bg-[#111111] rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-zinc-800 font-sans">
                                {
                                  <div className="h-12 bg-[#0078d4] flex items-center px-4">
                                    {
                                      <div className="flex items-center gap-2">
                                        {
                                          <div className="text-white font-semibold text-[15px]">
                                            {"Outlook"}
                                          </div>
                                        }
                                      </div>
                                    }
                                    {
                                      <div className="mx-auto max-w-xl w-full">
                                        {
                                          <div className="bg-white/20 hover:bg-white/30 transition-colors rounded h-8 flex items-center px-3 mx-4">
                                            {
                                              <Om className="w-4 h-4 text-white/90 mr-2" />
                                            }
                                            {
                                              <span className="text-white/80 text-sm">
                                                {"Search"}
                                              </span>
                                            }
                                          </div>
                                        }
                                      </div>
                                    }
                                  </div>
                                }
                                {
                                  <div className="h-14 border-b border-neutral-200 dark:border-zinc-800 flex items-center px-4 gap-6 bg-white dark:bg-[#111111]">
                                    {
                                      <div className="flex items-center gap-2 cursor-pointer">
                                        {
                                          <Z0 className="w-4 h-4 text-neutral-700 dark:text-zinc-300" />
                                        }
                                        {
                                          <span className="text-sm text-neutral-700 dark:text-zinc-300 font-medium">
                                            {"Reply"}
                                          </span>
                                        }
                                      </div>
                                    }
                                    {
                                      <div className="flex items-center gap-2 cursor-pointer">
                                        {
                                          <Z0 className="w-4 h-4 text-neutral-700 dark:text-zinc-300 transform -scale-x-100" />
                                        }
                                        {
                                          <span className="text-sm text-neutral-700 dark:text-zinc-300 font-medium">
                                            {"Reply all"}
                                          </span>
                                        }
                                      </div>
                                    }
                                    {
                                      <div className="flex items-center gap-2 cursor-pointer">
                                        {
                                          <U5 className="w-4 h-4 text-neutral-700 dark:text-zinc-300" />
                                        }
                                        {
                                          <span className="text-sm text-neutral-700 dark:text-zinc-300 font-medium">
                                            {"Forward"}
                                          </span>
                                        }
                                      </div>
                                    }
                                    {
                                      <div className="h-6 w-px bg-neutral-300 dark:bg-zinc-700 mx-2" />
                                    }
                                    {
                                      <div className="flex items-center gap-2 cursor-pointer">
                                        {
                                          <F5 className="w-4 h-4 text-neutral-700 dark:text-zinc-300" />
                                        }
                                        {
                                          <span className="text-sm text-neutral-700 dark:text-zinc-300 font-medium">
                                            {"Delete"}
                                          </span>
                                        }
                                      </div>
                                    }
                                  </div>
                                }
                                {
                                  <div className="flex h-[500px]">
                                    {
                                      <div className="w-56 p-2 hidden md:block border-r border-neutral-200 dark:border-zinc-800 bg-neutral-50 dark:bg-[#111111]">
                                        {
                                          <div className="bg-neutral-200/50 dark:bg-zinc-800/50 rounded-md px-3 py-2 flex items-center text-sm text-neutral-900 dark:text-zinc-100 font-medium cursor-pointer">
                                            {<Tg className="w-4 h-4 mr-1" />}
                                            {" Inbox"}
                                          </div>
                                        }
                                        {
                                          <div className="rounded-md px-3 py-2 flex items-center text-sm text-neutral-700 dark:text-zinc-300 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/30">
                                            {
                                              <Tg className="w-4 h-4 mr-1 opacity-0" />
                                            }
                                            {" Sent Items"}
                                          </div>
                                        }
                                        {
                                          <div className="rounded-md px-3 py-2 flex items-center text-sm text-neutral-700 dark:text-zinc-300 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/30">
                                            {
                                              <Tg className="w-4 h-4 mr-1 opacity-0" />
                                            }
                                            {" Drafts"}
                                          </div>
                                        }
                                        {
                                          <div className="rounded-md px-3 py-2 flex items-center text-sm text-neutral-700 dark:text-zinc-300 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/30">
                                            {
                                              <Tg className="w-4 h-4 mr-1 opacity-0" />
                                            }
                                            {" Deleted Items"}
                                          </div>
                                        }
                                      </div>
                                    }
                                    {
                                      <div className="flex-1 bg-white dark:bg-[#111111] p-6 overflow-y-auto">
                                        {
                                          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
                                            {xt.subject}
                                          </h2>
                                        }
                                        {
                                          <div className="flex items-center gap-3 mb-6">
                                            {
                                              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-700 dark:text-blue-400 text-lg font-medium">
                                                {Wn.charAt(0).toUpperCase()}
                                              </div>
                                            }
                                            {
                                              <div className="flex-1">
                                                {
                                                  <div className="flex items-center justify-between">
                                                    {
                                                      <div>
                                                        {
                                                          <span className="font-bold text-[13px] text-neutral-900 dark:text-white">
                                                            {Jn}
                                                          </span>
                                                        }
                                                        {
                                                          <span className="text-[13px] text-neutral-500 dark:text-zinc-400 ml-1">
                                                            {"<"}
                                                            {Wn}
                                                            {">"}
                                                          </span>
                                                        }
                                                      </div>
                                                    }
                                                    {
                                                      <div className="text-[12px] text-neutral-500 dark:text-zinc-400">
                                                        {new Date(
                                                          xt.createdAt,
                                                        ).toLocaleDateString(
                                                          "en-US",
                                                          {
                                                            weekday: "short",
                                                            month: "numeric",
                                                            day: "numeric",
                                                            year: "numeric",
                                                            hour: "numeric",
                                                            minute: "2-digit",
                                                          },
                                                        )}
                                                      </div>
                                                    }
                                                  </div>
                                                }
                                                {
                                                  <div className="text-[12px] text-neutral-500 dark:text-zinc-400 mt-0.5">
                                                    {"To: "}
                                                    {xt.recipient}
                                                  </div>
                                                }
                                              </div>
                                            }
                                          </div>
                                        }
                                        {
                                          <div className="text-[13px] text-[#333] dark:text-[#ccc] space-y-4 max-w-3xl leading-relaxed bg-white dark:bg-[#111111]">
                                            {
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html: W5(xt),
                                                }}
                                              />
                                            }
                                          </div>
                                        }
                                        {
                                          <div className="mt-12 p-5 bg-white dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-zinc-800/80 rounded-xl relative overflow-hidden max-w-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                                            {
                                              <div className="absolute top-0 left-0 w-1 h-full bg-neutral-800 dark:bg-zinc-500" />
                                            }
                                            {
                                              <div className="pl-3 space-y-3">
                                                {
                                                  <div className="flex items-center gap-2">
                                                    {
                                                      <div className="text-[10px] font-bold text-neutral-800 dark:text-zinc-300 uppercase tracking-widest font-mono">
                                                        {
                                                          "System Note: Tickk Telemetry"
                                                        }
                                                      </div>
                                                    }
                                                  </div>
                                                }
                                                {
                                                  <p className="text-[13px] text-neutral-600 dark:text-zinc-400 leading-relaxed font-sans">
                                                    {"The recipient "}
                                                    {
                                                      <strong>
                                                        {
                                                          "will not see this box"
                                                        }
                                                      </strong>
                                                    }
                                                    {
                                                      ". It represents the invisible 1x1 tracking pixel injected into your email. This transparent image secretly monitors opens and engagement, instantly firing a telemetry signal back to your Tickk dashboard without alerting the reader."
                                                    }
                                                  </p>
                                                }
                                                {
                                                  <div className="pt-2">
                                                    {
                                                      <code className="text-[11px] text-neutral-500 dark:text-zinc-500 font-mono bg-neutral-50 dark:bg-[#151518] border border-neutral-200/50 dark:border-zinc-800/50 px-3 py-2 rounded block truncate">
                                                        {
                                                          '<img src="********" width="1" height="1" alt="" />'
                                                        }
                                                      </code>
                                                    }
                                                  </div>
                                                }
                                              </div>
                                            }
                                          </div>
                                        }
                                      </div>
                                    }
                                  </div>
                                }
                              </div>
                            ) : F === "apple" ? (
                              <div className="w-full max-w-4xl bg-[#ECECEC] dark:bg-[#1E1E1E] rounded-xl overflow-hidden shadow-2xl border border-neutral-300 dark:border-zinc-700 font-sans">
                                {
                                  <div className="h-12 bg-gradient-to-b from-[#F5F5F5] to-[#E8E8E8] dark:from-[#323232] dark:to-[#2A2A2A] border-b border-neutral-300 dark:border-zinc-900 flex items-center justify-between px-4">
                                    {
                                      <div className="flex gap-2">
                                        {
                                          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                                        }
                                        {
                                          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                                        }
                                        {
                                          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                                        }
                                      </div>
                                    }
                                    {
                                      <div className="flex items-center gap-4 text-neutral-600 dark:text-zinc-400">
                                        {
                                          <div className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10">
                                            {<F5 className="w-4 h-4" />}
                                          </div>
                                        }
                                        {
                                          <div className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10">
                                            {<Z0 className="w-4 h-4" />}
                                          </div>
                                        }
                                        {
                                          <div className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10">
                                            {<U5 className="w-4 h-4" />}
                                          </div>
                                        }
                                      </div>
                                    }
                                    {
                                      <div className="w-48 bg-white/50 dark:bg-black/20 border border-neutral-300 dark:border-zinc-700 rounded-md h-7 flex items-center px-2">
                                        {
                                          <Om className="w-3 h-3 text-neutral-500 mr-2" />
                                        }
                                        {
                                          <span className="text-xs text-neutral-500">
                                            {"Search"}
                                          </span>
                                        }
                                      </div>
                                    }
                                  </div>
                                }
                                {
                                  <div className="flex h-[500px]">
                                    {
                                      <div className="w-48 bg-[#F2F2F7] dark:bg-[#282828] border-r border-neutral-200 dark:border-zinc-800 p-2 hidden md:block">
                                        {
                                          <div className="px-2 py-1 bg-blue-500 text-white rounded text-sm font-medium flex items-center gap-2">
                                            {<_O className="w-4 h-4" />}
                                            {" Inbox"}
                                          </div>
                                        }
                                        {
                                          <div className="px-2 py-1 text-neutral-700 dark:text-zinc-300 rounded text-sm font-medium flex items-center gap-2 mt-1">
                                            {<Ik className="w-4 h-4" />}
                                            {" Sent"}
                                          </div>
                                        }
                                      </div>
                                    }
                                    {
                                      <div className="flex-1 bg-white dark:bg-[#1E1E1E] p-8 overflow-y-auto">
                                        {
                                          <div className="flex justify-between items-start mb-6">
                                            {
                                              <div>
                                                {
                                                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                                                    {xt.subject}
                                                  </h2>
                                                }
                                                {
                                                  <div className="text-[13px]">
                                                    {
                                                      <span className="font-semibold text-neutral-900 dark:text-white">
                                                        {Jn}
                                                      </span>
                                                    }
                                                    {
                                                      <span className="text-neutral-500 dark:text-zinc-400">
                                                        {" <"}
                                                        {Wn}
                                                        {">"}
                                                      </span>
                                                    }
                                                  </div>
                                                }
                                                {
                                                  <div className="text-[12px] text-neutral-500 dark:text-zinc-400 mt-1">
                                                    {"To: "}
                                                    {xt.recipient}
                                                  </div>
                                                }
                                              </div>
                                            }
                                            {
                                              <div className="text-[12px] text-neutral-500 dark:text-zinc-400">
                                                {new Date(
                                                  xt.createdAt,
                                                ).toLocaleDateString("en-US", {
                                                  month: "long",
                                                  day: "numeric",
                                                  year: "numeric",
                                                })}
                                                {" at "}
                                                {new Date(
                                                  xt.createdAt,
                                                ).toLocaleTimeString("en-US", {
                                                  hour: "numeric",
                                                  minute: "2-digit",
                                                })}
                                              </div>
                                            }
                                          </div>
                                        }
                                        {
                                          <div className="w-full h-px bg-neutral-200 dark:bg-zinc-700/50 mb-6" />
                                        }
                                        {
                                          <div className="text-[14px] text-neutral-800 dark:text-zinc-200 space-y-4 max-w-3xl leading-relaxed font-sans">
                                            {
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html: W5(xt),
                                                }}
                                              />
                                            }
                                          </div>
                                        }
                                      </div>
                                    }
                                  </div>
                                }
                              </div>
                            ) : F === "yahoo" ? (
                              <div className="w-full max-w-4xl bg-[#f4f4f5] dark:bg-[#111111] rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-zinc-800 font-sans">
                                {
                                  <div className="h-14 bg-[#7e1fff] flex items-center justify-between px-6">
                                    {
                                      <div className="text-white font-bold text-xl tracking-tight">
                                        {"yahoo"}
                                        {
                                          <span className="font-light">
                                            {"!"}
                                          </span>
                                        }
                                        {"mail"}
                                      </div>
                                    }
                                    {
                                      <div className="flex-1 max-w-xl mx-8">
                                        {
                                          <div className="bg-white/20 rounded-sm h-9 flex items-center px-3 border border-white/10">
                                            {
                                              <span className="text-white/80 text-sm">
                                                {
                                                  "Find messages, documents, photos or people"
                                                }
                                              </span>
                                            }
                                            {
                                              <Om className="w-4 h-4 text-white/90 ml-auto" />
                                            }
                                          </div>
                                        }
                                      </div>
                                    }
                                    {
                                      <div className="flex gap-4">
                                        {
                                          <div className="w-8 h-8 rounded-full bg-white/20" />
                                        }
                                      </div>
                                    }
                                  </div>
                                }
                                {
                                  <div className="h-12 border-b border-neutral-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] flex items-center px-4 gap-4">
                                    {
                                      <div className="flex items-center gap-1 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800 p-1.5 rounded">
                                        {
                                          <Z0 className="w-4 h-4 text-neutral-600 dark:text-zinc-300" />
                                        }
                                        {
                                          <span className="text-[13px] text-neutral-600 dark:text-zinc-300 font-semibold">
                                            {"Reply"}
                                          </span>
                                        }
                                      </div>
                                    }
                                    {
                                      <div className="flex items-center gap-1 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800 p-1.5 rounded">
                                        {
                                          <Z0 className="w-4 h-4 text-neutral-600 dark:text-zinc-300 transform -scale-x-100" />
                                        }
                                        {
                                          <span className="text-[13px] text-neutral-600 dark:text-zinc-300 font-semibold">
                                            {"Reply all"}
                                          </span>
                                        }
                                      </div>
                                    }
                                    {
                                      <div className="flex items-center gap-1 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800 p-1.5 rounded">
                                        {
                                          <U5 className="w-4 h-4 text-neutral-600 dark:text-zinc-300" />
                                        }
                                        {
                                          <span className="text-[13px] text-neutral-600 dark:text-zinc-300 font-semibold">
                                            {"Forward"}
                                          </span>
                                        }
                                      </div>
                                    }
                                    {
                                      <div className="flex items-center gap-1 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800 p-1.5 rounded">
                                        {
                                          <F5 className="w-4 h-4 text-neutral-600 dark:text-zinc-300" />
                                        }
                                        {
                                          <span className="text-[13px] text-neutral-600 dark:text-zinc-300 font-semibold">
                                            {"Delete"}
                                          </span>
                                        }
                                      </div>
                                    }
                                  </div>
                                }
                                {
                                  <div className="flex h-[500px]">
                                    {
                                      <div className="w-52 bg-white dark:bg-[#1a1a1a] border-r border-neutral-200 dark:border-zinc-800 p-3 hidden md:block">
                                        {
                                          <button className="w-full bg-[#7e1fff] hover:bg-[#6001D2] text-white font-bold text-sm py-2 rounded-full mb-4">
                                            {"Compose"}
                                          </button>
                                        }
                                        {
                                          <div className="px-3 py-1.5 bg-[#7e1fff]/10 text-[#7e1fff] dark:text-[#a85aff] rounded font-semibold text-sm">
                                            {"Inbox"}
                                          </div>
                                        }
                                        {
                                          <div className="px-3 py-1.5 text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded font-medium text-sm mt-1">
                                            {"Unread"}
                                          </div>
                                        }
                                        {
                                          <div className="px-3 py-1.5 text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded font-medium text-sm mt-1">
                                            {"Starred"}
                                          </div>
                                        }
                                        {
                                          <div className="px-3 py-1.5 text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded font-medium text-sm mt-1">
                                            {"Sent"}
                                          </div>
                                        }
                                      </div>
                                    }
                                    {
                                      <div className="flex-1 bg-white dark:bg-[#111111] p-6 overflow-y-auto">
                                        {
                                          <h2 className="text-[22px] font-bold text-neutral-900 dark:text-white mb-6">
                                            {xt.subject}
                                          </h2>
                                        }
                                        {
                                          <div className="flex items-center justify-between mb-6">
                                            {
                                              <div className="flex items-center gap-3">
                                                {
                                                  <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-neutral-600 dark:text-zinc-300 text-lg">
                                                    {Wn.charAt(0).toUpperCase()}
                                                  </div>
                                                }
                                                {
                                                  <div>
                                                    {
                                                      <div className="font-bold text-[15px] text-neutral-900 dark:text-white">
                                                        {Jn}{" "}
                                                        {
                                                          <span className="font-normal text-neutral-500 dark:text-zinc-400 text-sm ml-1">
                                                            {"<"}
                                                            {Wn}
                                                            {">"}
                                                          </span>
                                                        }
                                                      </div>
                                                    }
                                                    {
                                                      <div className="text-[13px] text-neutral-500 dark:text-zinc-400">
                                                        {"To: "}
                                                        {xt.recipient}
                                                      </div>
                                                    }
                                                  </div>
                                                }
                                              </div>
                                            }
                                            {
                                              <div className="text-[13px] text-neutral-500 dark:text-zinc-400 font-medium">
                                                {new Date(
                                                  xt.createdAt,
                                                ).toLocaleDateString("en-US", {
                                                  weekday: "short",
                                                  month: "short",
                                                  day: "numeric",
                                                })}
                                                {" at "}
                                                {new Date(
                                                  xt.createdAt,
                                                ).toLocaleTimeString("en-US", {
                                                  hour: "numeric",
                                                  minute: "2-digit",
                                                })}
                                              </div>
                                            }
                                          </div>
                                        }
                                        {
                                          <div className="text-[15px] text-[#1d2226] dark:text-[#d9d9d9] space-y-4 max-w-3xl leading-relaxed">
                                            {
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html: W5(xt),
                                                }}
                                              />
                                            }
                                          </div>
                                        }
                                      </div>
                                    }
                                  </div>
                                }
                              </div>
                            ) : (
                              <div className="w-full max-w-4xl bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-zinc-800 font-sans">
                                {
                                  <div className="h-16 flex items-center px-4 border-b border-neutral-100 dark:border-zinc-800/80 bg-white dark:bg-[#1a1a1a]">
                                    {
                                      <div className="flex items-center gap-4 text-neutral-600 dark:text-zinc-400">
                                        {<Xre className="w-5 h-5" />}
                                        {
                                          <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
                                            alt="Gmail"
                                            className="w-7 h-7 object-contain"
                                            referrerPolicy="no-referrer"
                                          />
                                        }
                                        {
                                          <span className="text-xl font-medium text-neutral-600 dark:text-zinc-300 -ml-2">
                                            {"Gmail"}
                                          </span>
                                        }
                                      </div>
                                    }
                                    {
                                      <div className="ml-8 flex-1 max-w-2xl bg-neutral-100 dark:bg-zinc-800/60 rounded-full h-12 flex items-center px-4">
                                        {
                                          <Om className="w-5 h-5 text-neutral-500 dark:text-zinc-400 mr-3" />
                                        }
                                        {
                                          <span className="text-neutral-500 dark:text-zinc-400 text-base">
                                            {"Search mail"}
                                          </span>
                                        }
                                      </div>
                                    }
                                  </div>
                                }
                                {
                                  <div className="flex h-[500px]">
                                    {
                                      <div className="w-64 p-4 hidden md:block space-y-2">
                                        {
                                          <div className="bg-[#c2e7ff] dark:bg-[#004a77] text-[#001d35] dark:text-[#c2e7ff] rounded-full px-4 py-3 flex items-center font-medium text-sm gap-4 cursor-pointer">
                                            {<_O className="w-4 h-4" />}
                                            {" Inbox"}
                                          </div>
                                        }
                                        {
                                          <div className="text-neutral-700 dark:text-zinc-300 rounded-full px-4 py-2 flex items-center font-medium text-sm gap-4 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/50">
                                            {<Wre className="w-4 h-4" />}
                                            {" Starred"}
                                          </div>
                                        }
                                        {
                                          <div className="text-neutral-700 dark:text-zinc-300 rounded-full px-4 py-2 flex items-center font-medium text-sm gap-4 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/50">
                                            {<C5 className="w-4 h-4" />}
                                            {" Snoozed"}
                                          </div>
                                        }
                                        {
                                          <div className="text-neutral-700 dark:text-zinc-300 rounded-full px-4 py-2 flex items-center font-medium text-sm gap-4 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/50">
                                            {<Ik className="w-4 h-4" />}
                                            {" Sent"}
                                          </div>
                                        }
                                      </div>
                                    }
                                    {
                                      <div className="flex-1 bg-white dark:bg-[#1a1a1a] p-6 overflow-y-auto">
                                        {
                                          <div className="flex items-center justify-between mb-6">
                                            {
                                              <h2 className="text-[22px] font-normal text-neutral-900 dark:text-neutral-100">
                                                {xt.subject}
                                              </h2>
                                            }
                                            {
                                              <div className="flex gap-4">
                                                {
                                                  <Ore className="w-5 h-5 text-neutral-600 dark:text-zinc-400 cursor-pointer" />
                                                }
                                                {
                                                  <SO className="w-5 h-5 text-neutral-600 dark:text-zinc-400 cursor-pointer" />
                                                }
                                              </div>
                                            }
                                          </div>
                                        }
                                        {
                                          <div className="flex items-start gap-3 mb-6">
                                            {
                                              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-medium">
                                                {Wn.charAt(0).toUpperCase()}
                                              </div>
                                            }
                                            {
                                              <div className="flex-1">
                                                {
                                                  <div className="flex items-center justify-between">
                                                    {
                                                      <div>
                                                        {
                                                          <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                                                            {Jn}
                                                          </span>
                                                        }
                                                        {
                                                          <span className="text-xs text-neutral-500 dark:text-zinc-400 ml-2">
                                                            {"<"}
                                                            {Wn}
                                                            {">"}
                                                          </span>
                                                        }
                                                      </div>
                                                    }
                                                    {
                                                      <div className="text-xs text-neutral-500 dark:text-zinc-400">
                                                        {new Date(
                                                          xt.createdAt,
                                                        ).toLocaleDateString(
                                                          "en-US",
                                                          {
                                                            month: "short",
                                                            day: "numeric",
                                                            hour: "numeric",
                                                            minute: "2-digit",
                                                          },
                                                        )}
                                                      </div>
                                                    }
                                                  </div>
                                                }
                                                {
                                                  <div className="text-xs text-neutral-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1">
                                                    {"to me "}
                                                    {<Vd className="w-3 h-3" />}
                                                  </div>
                                                }
                                              </div>
                                            }
                                          </div>
                                        }
                                        {
                                          <div className="text-sm text-[#202124] dark:text-[#e8eaed] space-y-4 max-w-3xl leading-relaxed ml-12">
                                            {
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html: W5(xt),
                                                }}
                                              />
                                            }
                                          </div>
                                        }
                                        {
                                          <div className="mt-12 ml-12 p-5 bg-white dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-zinc-800/80 rounded-xl relative overflow-hidden max-w-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                                            {
                                              <div className="absolute top-0 left-0 w-1 h-full bg-neutral-800 dark:bg-zinc-500" />
                                            }
                                            {
                                              <div className="pl-3 space-y-3">
                                                {
                                                  <div className="flex items-center gap-2">
                                                    {
                                                      <div className="text-[10px] font-bold text-neutral-800 dark:text-zinc-300 uppercase tracking-widest font-mono">
                                                        {
                                                          "System Note: Tickk Telemetry"
                                                        }
                                                      </div>
                                                    }
                                                  </div>
                                                }
                                                {
                                                  <p className="text-[13px] text-neutral-600 dark:text-zinc-400 leading-relaxed font-sans">
                                                    {"The recipient "}
                                                    {
                                                      <strong>
                                                        {
                                                          "will not see this box"
                                                        }
                                                      </strong>
                                                    }
                                                    {
                                                      ". It represents the invisible 1x1 tracking pixel injected into your email. This transparent image secretly monitors opens and engagement, instantly firing a telemetry signal back to your Tickk dashboard without alerting the reader."
                                                    }
                                                  </p>
                                                }
                                                {
                                                  <div className="pt-2">
                                                    {
                                                      <code className="text-[11px] text-neutral-500 dark:text-zinc-500 font-mono bg-neutral-50 dark:bg-[#151518] border border-neutral-200/50 dark:border-zinc-800/50 px-3 py-2 rounded block truncate">
                                                        {
                                                          '<img src="********" width="1" height="1" alt="" />'
                                                        }
                                                      </code>
                                                    }
                                                  </div>
                                                }
                                              </div>
                                            }
                                          </div>
                                        }
                                        {
                                          <div className="mt-8 ml-12 flex gap-2">
                                            {
                                              <button className="px-6 py-2 border border-neutral-300 dark:border-zinc-700 rounded-full text-sm font-medium text-neutral-700 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2">
                                                {<Z0 className="w-4 h-4" />}
                                                {" Reply"}
                                              </button>
                                            }
                                            {
                                              <button className="px-6 py-2 border border-neutral-300 dark:border-zinc-700 rounded-full text-sm font-medium text-neutral-700 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2">
                                                {<U5 className="w-4 h-4" />}
                                                {" Forward"}
                                              </button>
                                            }
                                          </div>
                                        }
                                      </div>
                                    }
                                  </div>
                                }
                              </div>
                            );
                          })()}
                        </div>
                      ) : (
                        <div className="p-4 md:p-6 h-full">
                          {
                            <div className="h-full bg-[#1e1e1e] rounded-xl overflow-hidden flex flex-col border border-zinc-800 relative">
                              {
                                <div className="px-4 py-2 bg-[#2d2d2d] border-b border-zinc-800 flex justify-between items-center">
                                  {
                                    <div className="flex items-center gap-2">
                                      {
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                      }
                                      {
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                      }
                                      {
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                      }
                                    </div>
                                  }
                                  {
                                    <div className="text-[10px] text-zinc-400 font-mono">
                                      {"email-template.html"}
                                    </div>
                                  }
                                  {
                                    <button
                                      onClick={() => {
                                        (navigator.clipboard.writeText(
                                          `<img src="https://tracker.tickk.com/track/${xt.id}" width="1" height="1" />`,
                                        ),
                                          ke(!0),
                                          setTimeout(() => ke(!1), 2e3));
                                      }}
                                      className="text-[10px] bg-zinc-700 hover:bg-zinc-600 text-zinc-200 px-2 py-1 rounded transition-colors cursor-pointer flex items-center gap-1"
                                    >
                                      {J ? (
                                        <En_Icon className="w-3 h-3 text-emerald-500" />
                                      ) : (
                                        <Id className="w-3 h-3" />
                                      )}
                                      {J ? "Copied" : "Copy"}
                                    </button>
                                  }
                                </div>
                              }
                              {
                                <div className="flex-1 p-4 overflow-auto">
                                  {
                                    <pre className="text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre-wrap">
                                      {
                                        <code>{`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <p>Hi there,</p>
    <p>This is the simulated email content for ${xt.subject}.</p>
    <p>The tracking pixel is embedded below.</p>
    <br />
    <p>Best regards,<br />${Jn}</p>
    
    <!-- Tickk Tracking Pixel -->
    <img src="https://tracker.tickk.com/track/${xt.id}" width="1" height="1" alt="" style="display:none;" />
  </body>
</html>`}</code>
                                      }
                                    </pre>
                                  }
                                </div>
                              }
                            </div>
                          }
                        </div>
                      )}
                    </div>
                  }
                </Lt.div>
              }
            </div>
          )}
        </Hi>
      }
      {
        <Hi>
          {sd && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              {
                <Lt.div
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                  }}
                  className="bg-white dark:bg-[#090a0c] border border-neutral-200 dark:border-zinc-800 rounded-3xl w-full max-w-md overflow-visible shadow-2xl relative"
                >
                  {
                    <div className="flex justify-between items-center p-6 border-b border-neutral-200 dark:border-zinc-900">
                      {
                        <h3 className="text-xl font-medium font-display text-neutral-900 dark:text-white">
                          {"Create API Key"}
                        </h3>
                      }
                      {
                        <button
                          disabled={bs}
                          onClick={() => Bs(!1)}
                          className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                        >
                          {<Bd className="w-5 h-5" />}
                        </button>
                      }
                    </div>
                  }
                  {
                    <form onSubmit={mr} className="p-6 space-y-6">
                      {
                        <div className="space-y-2">
                          {
                            <label className="text-sm font-medium text-neutral-900 dark:text-white block">
                              {"Name"}
                            </label>
                          }
                          {
                            <input
                              type="text"
                              required={!0}
                              disabled={bs}
                              placeholder="e.g. Production Environment"
                              value={zo}
                              onChange={(F) => Ro(F.target.value)}
                              className="w-full px-4 py-2 bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white disabled:opacity-50"
                            />
                          }
                        </div>
                      }
                      {
                        <div className="space-y-2 relative">
                          {
                            <label className="text-sm font-medium text-neutral-900 dark:text-white block">
                              {"Permission"}
                            </label>
                          }
                          {
                            <div className="relative">
                              {
                                <button
                                  type="button"
                                  disabled={bs}
                                  onClick={() => Sl(!Jc)}
                                  onBlur={() => setTimeout(() => Sl(!1), 150)}
                                  className="w-full px-4 py-2 bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white text-left flex justify-between items-center disabled:opacity-50 cursor-pointer"
                                >
                                  {Io}
                                  {<Vd className="w-4 h-4 text-neutral-500" />}
                                </button>
                              }
                              {Jc && (
                                <div className="absolute left-0 top-full mt-2 w-full rounded-xl bg-white/30 dark:bg-[#111111]/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden p-1 animate-in fade-in slide-in-from-top-2">
                                  {["Full access", "Sending access"].map(
                                    (F) => (
                                      <button key={F}
                                        type="button"
                                        onClick={() => {
                                          (ld(F), Sl(!1));
                                        }}
                                        className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors cursor-pointer"
                                      >
                                        {F}
                                      </button>
                                    ),
                                  )}
                                </div>
                              )}
                            </div>
                          }
                        </div>
                      }
                      {
                        <div className="pt-2 flex justify-end gap-3">
                          {
                            <button
                              type="button"
                              disabled={bs}
                              onClick={() => Bs(!1)}
                              className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              {"Cancel"}
                            </button>
                          }
                          {
                            <button
                              type="submit"
                              disabled={bs}
                              className="relative px-6 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm font-semibold rounded-lg transition-all shadow-sm disabled:opacity-80 flex items-center justify-center min-w-[130px] overflow-hidden cursor-pointer"
                            >
                              {bs ? (
                                <span className="flex items-center gap-2">
                                  {
                                    <span className="w-4 h-4 border-2 border-neutral-900 border-t-transparent dark:border-white dark:border-t-transparent rounded-full animate-spin" />
                                  }
                                  {"Generating"}
                                </span>
                              ) : (
                                "Create API Key"
                              )}
                            </button>
                          }
                        </div>
                      }
                    </form>
                  }
                </Lt.div>
              }
            </div>
          )}
        </Hi>
      }
      {
        <Hi>
          {gs && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              {
                <Lt.div
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                  }}
                  className="bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-zinc-800 rounded-[24px] w-full max-w-[500px] overflow-hidden shadow-2xl relative"
                >
                  {
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 dark:from-emerald-600 dark:via-teal-500 dark:to-emerald-600" />
                  }
                  {
                    <div className="flex justify-between items-center p-6 pb-4">
                      {
                        <h3 className="text-[17px] font-semibold font-sans text-neutral-900 dark:text-white tracking-tight">
                          {"View API Key"}
                        </h3>
                      }
                      {
                        <button
                          onClick={() => co(null)}
                          className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors bg-transparent rounded-md hover:bg-neutral-100 dark:hover:bg-zinc-800/50 cursor-pointer"
                        >
                          {<Bd className="w-5 h-5" />}
                        </button>
                      }
                    </div>
                  }
                  {
                    <div className="px-6 pb-6 space-y-6">
                      {
                        <div className="flex items-center gap-3 p-4 bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/20 rounded-xl text-emerald-800 dark:text-emerald-400">
                          {
                            <div className="w-5 h-5 shrink-0 rounded-full border border-current flex items-center justify-center font-bold text-xs italic">
                              {"i"}
                            </div>
                          }
                          {
                            <p className="text-[13px] tracking-wide">
                              {"You can only see this key once. "}
                              {<strong>{"Store it safely."}</strong>}
                            </p>
                          }
                        </div>
                      }
                      {
                        <div className="space-y-2">
                          {
                            <label className="text-[13px] font-medium text-neutral-700 dark:text-zinc-400 block">
                              {"API Key"}
                            </label>
                          }
                          {
                            <div className="relative group">
                              {
                                <input
                                  type={A ? "text" : "password"}
                                  readOnly={!0}
                                  value={gs.token}
                                  className="w-full pl-4 pr-[70px] py-3.5 bg-neutral-50 dark:bg-[#151518] border border-neutral-200 dark:border-zinc-800 rounded-xl text-[14px] font-mono text-neutral-900 dark:text-white outline-none focus:border-neutral-400 dark:focus:border-zinc-600 transition-colors shadow-sm"
                                />
                              }
                              {
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                                  {
                                    <button
                                      onClick={() => Y(!A)}
                                      className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                                      title={A ? "Hide key" : "Show key"}
                                    >
                                      {A ? (
                                        <MB className="w-4 h-4" />
                                      ) : (
                                        <Fd className="w-4 h-4" />
                                      )}
                                    </button>
                                  }
                                  {
                                    <button
                                      onClick={() => {
                                        (navigator.clipboard.writeText(
                                          gs.token,
                                        ),
                                          _e(!0),
                                          setTimeout(() => _e(!1), 2e3));
                                      }}
                                      className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                                      title="Copy key"
                                    >
                                      {pe ? (
                                        <En_Icon className="w-4 h-4 text-emerald-500" />
                                      ) : (
                                        <Id className="w-4 h-4" />
                                      )}
                                    </button>
                                  }
                                </div>
                              }
                            </div>
                          }
                        </div>
                      }
                      {
                        <div className="pt-2">
                          {
                            <button
                              onClick={() => co(null)}
                              className="w-auto px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-neutral-900 text-[14px] font-semibold rounded-lg transition-all shadow-sm cursor-pointer"
                            >
                              {"Done"}
                            </button>
                          }
                        </div>
                      }
                    </div>
                  }
                </Lt.div>
              }
            </div>
          )}
        </Hi>
      }
      {
        <Hi>
          {Mo && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
              {
                <Lt.div
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                  }}
                  className="bg-white dark:bg-[#0c0c0e] backdrop-blur-3xl border border-neutral-200 dark:border-zinc-800 rounded-[24px] w-full max-w-[500px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative"
                >
                  {
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />
                  }
                  {
                    <div className="relative z-10">
                      {
                        <div className="flex justify-between items-center p-6 pb-4">
                          {
                            <h3 className="text-xl font-semibold font-display text-neutral-900 dark:text-white tracking-tight">
                              {"Connect "}
                              {Mo.name}
                            </h3>
                          }
                          {
                            <button
                              type="button"
                              onClick={() => lo(null)}
                              className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors bg-neutral-100 dark:bg-black/20 rounded-full hover:bg-neutral-200 dark:hover:bg-white/10 cursor-pointer"
                            >
                              {<Bd className="w-5 h-5" />}
                            </button>
                          }
                        </div>
                      }
                      {
                        <form
                          onSubmit={(F) => {
                            (F.preventDefault(),
                              bc(!0),
                              setTimeout(() => {
                                (bc(!1),
                                  lo(null),
                                  hs(Mo.id),
                                  Up((ye) => ({
                                    ...ye,
                                    [Mo.id]: "connected",
                                  })));
                                try {
                                  Xe && Im();
                                } catch { }
                              }, 2e3));
                          }}
                          className="px-6 pb-6 space-y-6"
                        >
                          {
                            <div className="space-y-2">
                              {
                                <p className="text-sm text-neutral-600 dark:text-zinc-400">
                                  {Mo.description}
                                </p>
                              }
                            </div>
                          }
                          {
                            <div className="space-y-4">
                              {Mo.fields.map((F) => (
                                <div key={F.id} className="space-y-2">
                                  {
                                    <label className="text-[13px] font-medium text-neutral-700 dark:text-zinc-300 block">
                                      {F.label}
                                    </label>
                                  }
                                  {
                                    <input
                                      type={F.type}
                                      placeholder={F.placeholder}
                                      required={!0}
                                      value={ms[F.id] || ""}
                                      onChange={(ye) =>
                                        yf((Be) => ({
                                          ...Be,
                                          [F.id]: ye.target.value,
                                        }))
                                      }
                                      className="w-full px-4 py-3 bg-white dark:bg-black/40 border border-neutral-200 dark:border-zinc-800/50 rounded-xl text-sm font-sans text-neutral-900 dark:text-white outline-none focus:border-neutral-400 dark:focus:border-zinc-600 transition-colors shadow-inner"
                                    />
                                  }
                                </div>
                              ))}
                            </div>
                          }
                          {
                            <div className="pt-4 flex justify-end gap-3">
                              {
                                <button
                                  type="button"
                                  disabled={Dl}
                                  onClick={() => lo(null)}
                                  className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-zinc-300 hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                  {"Cancel"}
                                </button>
                              }
                              {
                                <button
                                  type="submit"
                                  disabled={Dl}
                                  className="relative px-6 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm font-semibold rounded-xl transition-all shadow-lg disabled:opacity-80 flex items-center justify-center min-w-[140px] overflow-hidden cursor-pointer"
                                >
                                  {Dl ? (
                                    <span className="flex items-center gap-2">
                                      {
                                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                      }
                                      {"Verifying"}
                                    </span>
                                  ) : (
                                    "Connect & Verify"
                                  )}
                                </button>
                              }
                            </div>
                          }
                        </form>
                      }
                    </div>
                  }
                </Lt.div>
              }
            </div>
          )}
        </Hi>
      }
      {
        <Hi>
          {Qc && (
            <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
              {
                <Lt.div
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                  }}
                  className="bg-white/40 dark:bg-black/30 backdrop-blur-3xl border border-white/50 dark:border-white/10 rounded-[24px] w-full max-w-[400px] overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.2)] dark:shadow-[0_16px_64px_rgba(0,0,0,0.6)] relative"
                >
                  {
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent dark:from-emerald-500/5 dark:to-transparent pointer-events-none" />
                  }
                  {
                    <div className="relative z-10 flex flex-col items-center justify-center p-10 text-center space-y-6">
                      {
                        <div className="w-20 h-20 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-2 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                          {<En_Icon className="w-10 h-10 text-emerald-500" />}
                        </div>
                      }
                      {
                        <div>
                          {
                            <h3 className="text-2xl font-bold font-display text-neutral-900 dark:text-white tracking-tight mb-2">
                              {"Connected Successfully"}
                            </h3>
                          }
                          {
                            <p className="text-sm text-neutral-600 dark:text-zinc-400">
                              {
                                "Your integration is now active and ready to sync telemetry data."
                              }
                            </p>
                          }
                        </div>
                      }
                      {
                        <button
                          onClick={() => hs(null)}
                          className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm font-semibold rounded-xl transition-all shadow-lg mt-4 cursor-pointer"
                        >
                          {"Continue"}
                        </button>
                      }
                    </div>
                  }
                </Lt.div>
              }
            </div>
          )}
        </Hi>
      }
    </div>
  );
}
