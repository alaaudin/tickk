function i6e({
  token: e,
  onLogout: t,
  userEmail: n,
  theme: r,
  toggleTheme: o
}) {
  const {
      toast: s
    } = UB(),
    [c, u] = O.useState("overview"),
    [d, p] = O.useState("last_30_days"),
    [m, b] = O.useState("last_30_days"),
    v = () => {
      const F = `PREMIUM PERFORMANCE INTELLIGENCE REPORT
Date: ` + new Date().toLocaleDateString() + `

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
          type: "text/plain"
        }),
        Be = URL.createObjectURL(ye),
        pt = document.createElement("a");
      pt.href = Be, pt.download = "performance_report.txt", document.body.appendChild(pt), pt.click(), document.body.removeChild(pt), URL.revokeObjectURL(Be), s("Report Downloaded Successfully", "success");
    },
    [g, w] = O.useState([]),
    [E, S] = O.useState([]);
  O.useEffect(() => {
    if (E.length > 0) {
      const F = setTimeout(() => {
        S(ye => ye.slice(1));
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
      z(ye => ye > 0 ? ye - 1 : 0);
    }, 1e3);
    return () => clearInterval(F);
  }, [L]);
  const [R, Q] = O.useState("all"),
    [G, q] = O.useState("7d"),
    [W, I] = O.useState(!1),
    [B, ie] = O.useState(!1),
    [U, re] = O.useState(!1),
    [Z, fe] = O.useState(() => {
      if (typeof window < "u") try {
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
      discord: "available"
    }),
    [Mo, lo] = O.useState(null),
    [ms, yf] = O.useState({}),
    [Dl, bc] = O.useState(!1),
    [Qc, hs] = O.useState(null),
    [El, kl] = O.useState([{
      id: "key_1",
      name: "DEMO",
      token: "re_G6UoaCdn...",
      permission: "Full access",
      lastUsed: "No activity",
      createdAt: "just now"
    }]),
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
    Wr = F => {
      kl(El.filter(ye => ye.id !== F)), Yt(null);
    },
    er = El.filter(F => {
      const ye = F.name.toLowerCase().includes(Le.toLowerCase()) || F.token.toLowerCase().includes(Le.toLowerCase()),
        Be = Ke === "All permissions" || F.permission === Ke;
      return ye && Be;
    }),
    Xn = () => "re_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    mr = F => {
      F.preventDefault(), zo && (gc(!0), setTimeout(() => {
        const ye = Xn(),
          Be = {
            id: "key_" + Math.random().toString(36).substring(2, 9),
            name: zo,
            token: ye.substring(0, 11) + "...",
            permission: Io,
            lastUsed: "No activity",
            createdAt: "just now"
          };
        kl([Be, ...El]), co({
          name: zo,
          token: ye
        }), gc(!1), Bs(!1), Ro(""), Y(!1), Xe && Im();
      }, 1500));
    },
    [br, Mr] = O.useState([{
      id: "mem_1",
      email: "saqibmemon9884@gmail.com",
      role: "admin",
      joinedAt: "2026-06-15"
    }]),
    [Ia, vs] = O.useState(""),
    _l = (F, ye) => f.jsxDEV("span", {
      className: "inline-flex items-center gap-1.5",
      children: [F, ye === "Telemetry Starter" && f.jsxDEV(s5, {
        className: "w-4 h-4 text-white dark:text-[#050506] fill-zinc-400"
      }, void 0, !1, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 680,
        columnNumber: 7
      }, this), ye === "Growth Core Access" && f.jsxDEV(s5, {
        className: "w-4 h-4 text-white dark:text-[#050506] fill-emerald-500"
      }, void 0, !1, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 683,
        columnNumber: 7
      }, this), ye === "Quantum Sentinel" && f.jsxDEV(s5, {
        className: "w-4 h-4 text-white dark:text-[#050506] fill-amber-400"
      }, void 0, !1, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 686,
        columnNumber: 7
      }, this)]
    }, void 0, !0, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 677,
      columnNumber: 3
    }, this),
    ri = F => F === "Telemetry Starter" ? f.jsxDEV("div", {
      className: "relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200",
      children: [f.jsxDEV("div", {
        className: "absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#a1a1aa_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#71717a_50%,#18181b_100%)] opacity-80"
      }, void 0, !1, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 695,
        columnNumber: 9
      }, this), f.jsxDEV("span", {
        className: "relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
        children: [f.jsxDEV("span", {
          className: "absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(161,161,170,0.4),50%,transparent,75%,rgba(161,161,170,0.4),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(113,113,122,0.3),50%,transparent,75%,rgba(113,113,122,0.3),100%)] mix-blend-overlay pointer-events-none",
          style: {
            backgroundSize: "300% 100%"
          }
        }, void 0, !1, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 697,
          columnNumber: 11
        }, this), f.jsxDEV("span", {
          className: "relative z-10",
          children: F
        }, void 0, !1, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 698,
          columnNumber: 11
        }, this)]
      }, void 0, !0, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 696,
        columnNumber: 9
      }, this)]
    }, void 0, !0, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 694,
      columnNumber: 7
    }, this) : F === "Growth Core Access" ? f.jsxDEV("div", {
      className: "relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-200",
      children: [f.jsxDEV("div", {
        className: "absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#10b981_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#059669_50%,#18181b_100%)] opacity-80"
      }, void 0, !1, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 706,
        columnNumber: 9
      }, this), f.jsxDEV("span", {
        className: "relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
        children: [f.jsxDEV("span", {
          className: "absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(16,185,129,0.4),50%,transparent,75%,rgba(16,185,129,0.4),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(5,150,105,0.3),50%,transparent,75%,rgba(5,150,105,0.3),100%)] mix-blend-overlay pointer-events-none",
          style: {
            backgroundSize: "300% 100%"
          }
        }, void 0, !1, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 708,
          columnNumber: 11
        }, this), f.jsxDEV("span", {
          className: "relative z-10",
          children: F
        }, void 0, !1, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 709,
          columnNumber: 11
        }, this)]
      }, void 0, !0, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 707,
        columnNumber: 9
      }, this)]
    }, void 0, !0, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 705,
      columnNumber: 7
    }, this) : F === "Quantum Sentinel" ? f.jsxDEV("div", {
      className: "relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-200",
      children: [f.jsxDEV("div", {
        className: "absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#f59e0b_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#d97706_50%,#18181b_100%)] opacity-80"
      }, void 0, !1, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 717,
        columnNumber: 9
      }, this), f.jsxDEV("span", {
        className: "relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
        children: [f.jsxDEV("span", {
          className: "absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(245,158,11,0.4),50%,transparent,75%,rgba(245,158,11,0.4),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(217,119,6,0.3),50%,transparent,75%,rgba(217,119,6,0.3),100%)] mix-blend-overlay pointer-events-none",
          style: {
            backgroundSize: "300% 100%"
          }
        }, void 0, !1, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 719,
          columnNumber: 11
        }, this), f.jsxDEV("span", {
          className: "relative z-10",
          children: F
        }, void 0, !1, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 720,
          columnNumber: 11
        }, this)]
      }, void 0, !0, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 718,
        columnNumber: 9
      }, this)]
    }, void 0, !0, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 716,
      columnNumber: 7
    }, this) : f.jsxDEV("span", {
      className: "px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-neutral-200 text-neutral-900 shadow-sm",
      children: F
    }, void 0, !1, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 725,
      columnNumber: 10
    }, this),
    Us = [{
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
      logs: []
    }, {
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
      logs: [{
        id: "log_2_1",
        type: "open",
        ip: "39.42.12.88",
        userAgent: "Chrome / Windows",
        city: "Lahore",
        country: "PK",
        device: "Desktop",
        browser: "Chrome",
        isSimulated: !1,
        timestamp: new Date(Date.now() - 660 * 1e3).toISOString()
      }, {
        id: "log_2_2",
        type: "click",
        ip: "39.42.12.88",
        userAgent: "Chrome / Windows",
        city: "Lahore",
        country: "PK",
        device: "Desktop",
        browser: "Chrome",
        isSimulated: !1,
        timestamp: new Date(Date.now() - 600 * 1e3).toISOString()
      }]
    }, {
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
      logs: [{
        id: "log_3_1",
        type: "open",
        ip: "162.210.192.4",
        userAgent: "Safari / macOS",
        city: "Des Moines",
        country: "US",
        device: "Desktop",
        browser: "Safari",
        isSimulated: !1,
        timestamp: new Date(Date.now() - 960 * 1e3).toISOString()
      }, {
        id: "log_3_2",
        type: "click",
        ip: "162.210.192.4",
        userAgent: "Safari / macOS",
        city: "Des Moines",
        country: "US",
        device: "Desktop",
        browser: "Safari",
        isSimulated: !1,
        timestamp: new Date(Date.now() - 960 * 1e3).toISOString()
      }]
    }, {
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
      logs: [{
        id: "log_4_1",
        type: "open",
        ip: "101.12.88.22",
        userAgent: "Chrome / iOS",
        city: "The Rocks",
        country: "AU",
        device: "Mobile",
        browser: "Chrome",
        isSimulated: !1,
        timestamp: new Date(Date.now() - 1200 * 1e3).toISOString()
      }, {
        id: "log_4_2",
        type: "click",
        ip: "101.12.88.22",
        userAgent: "Chrome / iOS",
        city: "The Rocks",
        country: "AU",
        device: "Mobile",
        browser: "Chrome",
        isSimulated: !1,
        timestamp: new Date(Date.now() - 1200 * 1e3).toISOString()
      }]
    }, {
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
      logs: []
    }, {
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
      logs: [{
        id: "log_6_1",
        type: "open",
        ip: "98.12.23.4",
        userAgent: "Outlook / Windows",
        city: "Rancho Palos Verdes",
        country: "US",
        device: "Desktop",
        browser: "Outlook",
        isSimulated: !1,
        timestamp: new Date(Date.now() - 1380 * 1e3).toISOString()
      }]
    }, {
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
      logs: []
    }, {
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
      logs: []
    }, {
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
      logs: []
    }, {
      id: "seed_10",
      userId: "system",
      recipient: "crooney@lee-associates.com",
      subject: "Upgrading the fake chat widget on thedelrealgroup.com ($1.3B Pipeline Optimization) ��️",
      linkUrl: "https://example.com/chat-widget",
      createdAt: new Date(Date.now() - 2700 * 1e3).toISOString(),
      status: "opened",
      openCount: 2,
      clickCount: 4,
      lastOpened: new Date(Date.now() - 2580 * 1e3).toISOString(),
      testSent: !1,
      logs: [{
        id: "log_10_1",
        type: "open",
        ip: "128.21.43.2",
        userAgent: "Chrome / Windows",
        city: "San Francisco",
        country: "US",
        device: "Desktop",
        browser: "Chrome",
        isSimulated: !1,
        timestamp: new Date(Date.now() - 2640 * 1e3).toISOString()
      }, {
        id: "log_10_2",
        type: "click",
        ip: "128.21.43.2",
        userAgent: "Chrome / Windows",
        city: "San Francisco",
        country: "US",
        device: "Desktop",
        browser: "Chrome",
        isSimulated: !1,
        timestamp: new Date(Date.now() - 2580 * 1e3).toISOString()
      }]
    }, {
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
      logs: [{
        id: "log_11_1",
        type: "click",
        ip: "39.42.12.88",
        userAgent: "Safari / macOS",
        city: "Lahore",
        country: "PK",
        device: "Desktop",
        browser: "Safari",
        isSimulated: !1,
        timestamp: new Date(Date.now() - 2880 * 1e3).toISOString()
      }]
    }, {
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
      logs: []
    }, {
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
      logs: [{
        id: "log_13_1",
        type: "open",
        ip: "192.112.4.99",
        userAgent: "Outlook / Windows",
        city: "Quincy",
        country: "US",
        device: "Desktop",
        browser: "Outlook",
        isSimulated: !1,
        timestamp: new Date(Date.now() - 3360 * 1e3).toISOString()
      }]
    }, {
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
      logs: []
    }, {
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
      logs: []
    }, {
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
      logs: [{
        id: "log_16_1",
        type: "open",
        ip: "74.12.8.9",
        userAgent: "AppleMail / iOS",
        city: "Mountain View",
        country: "US",
        device: "Mobile",
        browser: "AppleMail",
        isSimulated: !1,
        timestamp: new Date(Date.now() - 1620 * 1e3).toISOString()
      }]
    }];
  O.useEffect(() => {
    if (g.length === 0 && !k.current) return;
    const F = new Set(),
      ye = [];
    if (g.forEach(Be => {
      Be.logs.forEach(pt => {
        F.add(pt.id), k.current && !k.current.has(pt.id) && pt.type === "open" && ye.push({
          ...pt,
          trackerSubject: Be.subject,
          trackerRecipient: Be.recipient
        });
      });
    }), ye.length > 0 && k.current && (S(Be => [...Be, ...ye]), Xe)) try {
      Im();
    } catch {}
    k.current = F;
  }, [g, Xe]);
  const gr = async () => {
    try {
      const F = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${e}`
        }
      });
      if (F.ok) {
        const Be = await F.json();
        Be.user && Be.user.credits !== void 0 && Bi(Be.user.credits);
      }
      const ye = await fetch("/api/trackers", {
        headers: {
          Authorization: `Bearer ${e}`
        }
      });
      if (ye.ok) {
        const Be = await ye.json();
        w(Be);
      }
    } catch (F) {
      console.error("Telemetry connection error:", F);
    } finally {
      P(!1);
    }
  };
  O.useEffect(() => {
    gr();
    const F = setInterval(() => {
      fetch("/api/trackers", {
        headers: {
          Authorization: `Bearer ${e}`
        }
      }).then(ye => ye.ok ? ye.json() : null).then(ye => {
        ye && w(ye);
      }).catch(() => {});
    }, 8e3);
    return () => clearInterval(F);
  }, [e]);
  const $s = async (F = !1) => {
    F || nt(!0);
    try {
      const ye = await fetch("/api/tickets", {
        headers: {
          Authorization: `Bearer ${e}`
        }
      });
      if (ye.ok) {
        const Be = await ye.json();
        if (X(Be), ee) {
          const pt = Be.find(mt => mt.id === ee.id);
          pt && de(pt);
        }
      }
    } catch (ye) {
      console.error("Failed to fetch tickets:", ye);
    } finally {
      F || nt(!1);
    }
  };
  O.useEffect(() => {
    c === "support" && $s();
  }, [c, e]), O.useEffect(() => {
    let F = null;
    return c === "support" && (F = setInterval(() => {
      $s(!0);
    }, 4e3)), () => {
      F && clearInterval(F);
    };
  }, [c, e, ee == null ? void 0 : ee.id]);
  const Fs = async () => {
      be(!0), await gr(), Xe && Im(), setTimeout(() => be(!1), 500);
    },
    uo = async F => {
      if (F.preventDefault(), !(!Te.trim() || !it.trim())) {
        wt(!0);
        try {
          const ye = await fetch("/api/tickets", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${e}`
            },
            body: JSON.stringify({
              subject: Te,
              category: Ae,
              message: it
            })
          });
          if (ye.ok) {
            const Be = await ye.json();
            X(pt => [Be.ticket, ...pt]), ge(!1), ve(""), oe(""), Ee("bug"), Be.newCredits !== void 0 && Bi(Be.newCredits), s("Your feedback has been received and you've earned 99 bonus credits!", "success"), Xe && Im();
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
            format: "a4"
          }),
          ye = [15, 23, 42],
          Be = [16, 185, 129],
          pt = [30, 41, 59],
          mt = [100, 116, 139];
        F.setFillColor(250, 250, 250), F.rect(0, 0, 210, 297, "F"), F.setDrawColor(226, 232, 240), F.setLineWidth(.3), F.roundedRect(8, 8, 194, 281, 4, 4, "D"), F.setFillColor(15, 23, 42), F.rect(8, 8, 194, 4, "F"), F.setFont("helvetica", "bold"), F.setFontSize(22), F.setTextColor(15, 23, 42), F.text("TICKK", 16, 26), F.setFont("helvetica", "normal"), F.setFontSize(9), F.setTextColor(100, 116, 139), F.text("CONTINUOUS OUTBOUND TELEMETRY METRIC REPORT", 16, 32), F.setFont("helvetica", "normal"), F.setFontSize(8.5), F.setTextColor(100, 116, 139), F.text(`Generated: ${new Date().toLocaleString()}`, 134, 24), F.text(`Operator Auth: ${n}`, 134, 29), F.text("Platform Version: TICKK Core v4.0", 134, 34), F.setDrawColor(226, 232, 240), F.setLineWidth(.5), F.line(16, 40, 194, 40), F.setFillColor(255, 255, 255), F.setDrawColor(226, 232, 240), F.roundedRect(16, 46, 178, 24, 2, 2, "FD");
        const Wt = sa.length,
          tr = sa.reduce((Nt, vr) => Nt + vr.openCount, 0),
          Bn = sa.filter(Nt => Nt.openCount > 0).length,
          bn = sa.reduce((Nt, vr) => Nt + vr.clickCount, 0);
        F.setFont("helvetica", "bold"), F.setFontSize(8.5), F.setTextColor(100, 116, 139), F.text("MONITORED CHANNELS", 22, 53), F.text("CONFIRMED INTERACTED", 65, 53), F.text("RECIPIENT CLICKS", 112, 53), F.text("ACCUMULATED OPENS", 154, 53), F.setFont("helvetica", "bold"), F.setFontSize(15), F.setTextColor(15, 23, 42), F.text(String(Wt), 22, 62), F.text(String(Bn), 65, 62), F.text(String(bn), 112, 62), F.text(String(tr), 154, 62), F.setFont("helvetica", "bold"), F.setFontSize(11), F.setTextColor(15, 23, 42), F.text("OUTBOUND RECIPIENT TELEMETRY LEDGER", 16, 82), F.setFont("helvetica", "normal"), F.setFontSize(8.5), F.setTextColor(100, 116, 139), F.text("Chronological overview of active invisible trackers and click pathways", 16, 86), F.setFillColor(15, 23, 42), F.rect(16, 91, 178, 8, "F"), F.setFont("helvetica", "bold"), F.setFontSize(8), F.setTextColor(255, 255, 255), F.text("RECIPIENT TARGET", 20, 96.5), F.text("SUBJECT CAMPAIGN", 68, 96.5), F.text("STATUS", 126, 96.5), F.text("DISPATCH DATE", 152, 96.5), F.text("OPENS / CLICKS", 176, 96.5);
        let Nn = 99;
        F.setFont("helvetica", "normal"), F.setFontSize(8), sa.forEach((Nt, vr) => {
          Nn > 265 && (F.addPage(), F.setFillColor(250, 250, 250), F.rect(0, 0, 210, 297, "F"), F.setDrawColor(226, 232, 240), F.setLineWidth(.3), F.roundedRect(8, 8, 194, 281, 4, 4, "D"), F.setFillColor(15, 23, 42), F.rect(8, 8, 194, 4, "F"), F.setFont("helvetica", "bold"), F.setFontSize(8), F.setTextColor(15, 23, 42), F.text("TICKK OUTBOUND MATRIX LEDGER - CONTINUED", 16, 18), F.line(16, 20, 194, 20), F.setFillColor(15, 23, 42), F.rect(16, 24, 178, 8, "F"), F.setTextColor(255, 255, 255), F.text("RECIPIENT TARGET", 20, 29.5), F.text("SUBJECT CAMPAIGN", 68, 29.5), F.text("STATUS", 126, 29.5), F.text("DISPATCH DATE", 152, 29.5), F.text("OPENS / CLICKS", 176, 29.5), Nn = 32), vr % 2 === 0 ? F.setFillColor(255, 255, 255) : F.setFillColor(243, 244, 246), F.rect(16, Nn, 178, 11, "F"), F.setDrawColor(229, 231, 235), F.setLineWidth(.2), F.line(16, Nn + 11, 194, Nn + 11), F.setTextColor(15, 23, 42);
          const Rr = Nt.recipient.length > 25 ? Nt.recipient.substring(0, 22) + "..." : Nt.recipient,
            Na = Nt.subject.length > 28 ? Nt.subject.substring(0, 25) + "..." : Nt.subject,
            Pn = Nt.openCount > 0 ? "Confirmed Open" : "Pending Open",
            Kn = new Date(Nt.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            }),
            or = `${Nt.openCount} opens / ${Nt.clickCount} clicks`;
          F.text(Rr, 20, Nn + 7), F.text(Na, 68, Nn + 7), Nt.openCount > 0 ? F.setTextColor(16, 185, 129) : F.setTextColor(245, 158, 11), F.text(Pn, 126, Nn + 7), F.setTextColor(100, 116, 139), F.text(Kn, 152, Nn + 7), F.text(or, 176, Nn + 7), Nn += 11;
        }), F.setFont("helvetica", "italic"), F.setFontSize(7.5), F.setTextColor(148, 163, 184), F.text("CONFIDENTIAL SECURITY PROTOCOLS ENFORCED - TICKK INTEL DEPLOYMENT", 16, 278), F.save(`TICKK_Telemetry_Report_${new Date().toISOString().split("T")[0]}.pdf`);
      } catch (F) {
        console.error("Failed to generate PDF Report", F);
      }
    },
    sa = [...g, ...Us].filter(F => G === "30d" ? new Date(F.createdAt).getTime() >= Date.now() - 720 * 60 * 60 * 1e3 : G === "7d" ? new Date(F.createdAt).getTime() >= Date.now() - 10080 * 60 * 1e3 : G === "24h" ? new Date(F.createdAt).getTime() >= Date.now() - 1440 * 60 * 1e3 : !0),
    eu = sa.filter(F => {
      if (R === "all") return !0;
      const ye = F.recipient.toLowerCase();
      let Be = "gmail";
      return ye.includes("outlook.com") || ye.includes("hotmail.com") ? Be = "outlook" : ye.includes("yahoo.com") || ye.includes("aol.com") ? Be = "yahoo" : (ye.includes("icloud.com") || ye.includes("mac.com") || ye.includes("me.com")) && (Be = "apple"), Be === R;
    }),
    Ni = sa.length,
    Xr = sa.filter(F => F.openCount > 0).length,
    fo = sa.filter(F => F.openCount === 0).length,
    xc = Ni > 0 ? Math.round(Xr / Ni * 100) : 0,
    tu = F => {
      st(ye => ({
        ...ye,
        [F]: !ye[F]
      }));
    },
    ai = F => {
      const Be = `<img src="${`${window.location.origin}/api/track/${F}/pixel.png`}" alt="" width="1" height="1" style="display:none" referrerPolicy="no-referrer" />`;
      navigator.clipboard.writeText(Be), pn(F), s("Tracking pixel code copied to clipboard"), setTimeout(() => pn(null), 1500);
    },
    Ui = F => {
      const ye = [];
      if (F.logs && F.logs.length > 0) {
        const Be = [...F.logs].sort((mt, Wt) => new Date(mt.timestamp).getTime() - new Date(Wt.timestamp).getTime());
        let pt = 0;
        Be.forEach((mt, Wt) => {
          const tr = Wt === Be.length - 1,
            Bn = new Date(mt.timestamp).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit"
            }),
            bn = mt.userAgent.includes("Chrome") ? "Chrome" : mt.userAgent.includes("Safari") ? "Safari" : mt.userAgent.includes("Outlook") ? "Outlook" : "Apple Mail",
            Nn = mt.userAgent.includes("Windows") ? "Windows" : mt.userAgent.includes("Mac") ? "macOS" : "iOS";
          mt.type === "open" ? (pt++, ye.push({
            label: `Open #${pt}${tr ? " (Latest)" : ""}`,
            details: `Accessed payload from ${bn} on ${Nn} (IP: ${mt.ip})`,
            time: Bn,
            type: "open"
          })) : ye.push({
            label: `Link Clicked!${tr ? " (Latest)" : ""}`,
            details: `Redirected to target URL from ${bn} on ${Nn} (IP: ${mt.ip})`,
            time: Bn,
            type: "click"
          });
        });
      } else ye.push({
        label: "Open #1",
        details: "Accessed draft at 01:15 AM from Chrome on Windows (IP: 39.42.12.88)",
        time: "01:15 AM",
        type: "open"
      }), ye.push({
        label: "Open #2: Link Clicked!",
        details: "Redirected to target URL at 01:40 AM (IP: 39.42.12.88)",
        time: "01:40 AM",
        type: "click"
      }), ye.push({
        label: "Open #3 (Latest)",
        details: "Re-opened via Apple Mail app on iOS at 03:40 AM",
        time: "03:40 AM",
        type: "open"
      });
      return ye;
    },
    yc = () => {
      const F = new Ut();
      F.setFillColor(5, 5, 6), F.rect(0, 0, 210, 40, "F"), F.setTextColor(255, 255, 255), F.setFont("helvetica", "bold"), F.setFontSize(22), F.text("TICKK", 20, 25), F.setFont("helvetica", "normal"), F.setFontSize(10), F.setTextColor(150, 150, 150), F.text("PREMIUM TELEMETRY SERVICES", 55, 24), F.setFontSize(12), F.setTextColor(255, 255, 255), F.text("STATEMENT OF ACCOUNT", 140, 25), F.setTextColor(80, 80, 80), F.setFontSize(10), F.setFont("helvetica", "normal"), F.text(`Account Holder: ${Jn}`, 20, 55), F.text(`Corporate Email: ${Wn}`, 20, 61), F.text(`Statement Date: ${new Date().toLocaleDateString()}`, 130, 55), F.text("Currency: USD", 130, 61), F.setDrawColor(230, 230, 230), F.line(20, 70, 190, 70), F.setFont("helvetica", "bold"), F.setTextColor(100, 100, 100), F.text("Date", 20, 82), F.text("Transaction Reference ID", 50, 82), F.text("Value", 130, 82), F.text("Status", 165, 82), F.setDrawColor(210, 210, 210), F.line(20, 86, 190, 86);
      const ye = [{
        date: "Jul 11, 2026",
        ref: "TXN-908234-ADF",
        val: "$149.00 USD",
        status: "Paid"
      }, {
        date: "Jun 11, 2026",
        ref: "TXN-874102-KSD",
        val: "$149.00 USD",
        status: "Paid"
      }, {
        date: "May 11, 2026",
        ref: "TXN-794012-PQA",
        val: "$149.00 USD",
        status: "Paid"
      }, {
        date: "Apr 11, 2026",
        ref: "TXN-712894-LMW",
        val: "$149.00 USD",
        status: "Processing"
      }, {
        date: "Mar 11, 2026",
        ref: "TXN-623910-YTR",
        val: "$149.00 USD",
        status: "Overdue"
      }];
      let Be = 96;
      F.setFont("helvetica", "normal"), F.setTextColor(50, 50, 50), ye.forEach(pt => {
        F.text(pt.date, 20, Be), F.text(pt.ref, 50, Be), F.text(pt.val, 130, Be), pt.status === "Paid" ? F.setTextColor(16, 185, 129) : pt.status === "Processing" ? F.setTextColor(245, 158, 11) : F.setTextColor(239, 68, 68), F.text(pt.status, 165, Be), F.setTextColor(50, 50, 50), F.setDrawColor(245, 245, 245), F.line(20, Be + 4, 190, Be + 4), Be += 12;
      }), Be += 10, F.setFillColor(250, 250, 250), F.rect(20, Be, 170, 30, "F"), F.setFont("helvetica", "bold"), F.setTextColor(80, 80, 80), F.text("Summary", 25, Be + 10), F.setFont("helvetica", "normal"), F.text("Total Paid Volume:", 25, Be + 18), F.text("Active Account Node Status:", 25, Be + 25), F.setFont("helvetica", "bold"), F.text("$447.00 USD", 150, Be + 18), F.setTextColor(16, 185, 129), F.text("Enterprise Level", 145, Be + 25), F.setFont("helvetica", "normal"), F.setFontSize(8), F.setTextColor(160, 160, 160), F.text("This is an electronically generated document. No signature is required.", 20, 280), F.text("TICKK Inc. — 100 Pine Street, San Francisco, CA 94111 — billing@tickk.io", 20, 285), F.save(`TICKK_Statement_${Jn.replace(/\s+/g, "_")}.pdf`);
    },
    Nc = F => {
      const ye = new Ut();
      ye.setFillColor(5, 5, 6), ye.rect(0, 0, 210, 45, "F"), ye.setTextColor(255, 255, 255), ye.setFont("helvetica", "bold"), ye.setFontSize(24), ye.text("TICKK", 25, 28), ye.setFont("helvetica", "normal"), ye.setFontSize(10), ye.setTextColor(150, 150, 150), ye.text("PREMIUM TELEMETRY SERVICES", 62, 27), ye.setFontSize(14), ye.setTextColor(255, 255, 255), ye.text("INVOICE RECEIPT", 145, 28), ye.setTextColor(60, 60, 60), ye.setFontSize(10), ye.setFont("helvetica", "bold"), ye.text("BILL TO:", 25, 65), ye.setFont("helvetica", "normal"), ye.text(Jn, 25, 72), ye.text(Wn, 25, 78), ye.setFont("helvetica", "bold"), ye.text("RECEIPT DETAILS:", 130, 65), ye.setFont("helvetica", "normal"), ye.text(`Receipt Date: ${F.date}`, 130, 72), ye.text(`Reference ID: ${F.ref}`, 130, 78), ye.text(`Payment Status: ${F.status}`, 130, 84), ye.setDrawColor(220, 220, 220), ye.line(25, 95, 185, 95), ye.setFont("helvetica", "bold"), ye.setTextColor(100, 100, 100), ye.text("Description", 25, 108), ye.text("Quantity", 120, 108), ye.text("Unit Price", 145, 108), ye.text("Amount", 170, 108), ye.line(25, 112, 185, 112), ye.setFont("helvetica", "normal"), ye.setTextColor(50, 50, 50), ye.text("TICKK Growth Core Access Token - Monthly Subscription", 25, 125), ye.text("1", 125, 125), ye.text(F.val, 145, 125), ye.text(F.val, 170, 125), ye.line(25, 131, 185, 131), ye.setFont("helvetica", "bold"), ye.text("Subtotal:", 145, 145), ye.text("Tax (0%):", 145, 151), ye.text("Total Paid:", 145, 158), ye.setFont("helvetica", "normal"), ye.text(F.val, 170, 145), ye.text("$0.00 USD", 170, 151), ye.setFont("helvetica", "bold"), ye.setTextColor(16, 185, 129), ye.text(F.val, 170, 158), ye.setFillColor(248, 250, 252), ye.rect(25, 180, 160, 45, "F"), ye.setFont("helvetica", "bold"), ye.setTextColor(80, 80, 80), ye.text("Important Information", 32, 192), ye.setFont("helvetica", "normal"), ye.setFontSize(9), ye.setTextColor(110, 110, 110), ye.text("Thank you for choosing TICKK! This receipt confirms that full payment was successfully", 32, 200), ye.text("debited from your corporate payment configuration on file. No further action is required.", 32, 205), ye.text("For custom SLA inquiries or limits, please drop us a note at enterprise@tickk.io", 32, 213), ye.setFontSize(8), ye.setTextColor(170, 170, 170), ye.text("TICKK Inc. — 100 Pine Street, San Francisco, CA 94111", 25, 275), ye.save(`TICKK_Receipt_${F.ref}.pdf`);
    },
    qs = F => {
      const ye = ["th", "st", "nd", "rd"],
        Be = F % 100;
      return F + (ye[(Be - 20) % 10] || ye[Be] || ye[0]);
    },
    xa = F => F ? f.jsxDEV("span", {
      className: "bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 px-2 py-0.5 rounded text-[9px] font-medium tracking-wider text-neutral-700 dark:text-zinc-300 inline-flex items-center gap-1 ml-2 font-mono",
      children: [f.jsxDEV(en, {
        className: "w-3 h-3 text-emerald-500"
      }, void 0, !1, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 1750,
        columnNumber: 11
      }, this), "LINK CLICKED"]
    }, void 0, !0, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 1749,
      columnNumber: 9
    }, this) : f.jsxDEV("span", {
      className: "bg-neutral-100 dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800 px-2 py-0.5 rounded text-[9px] font-medium tracking-wider text-neutral-500 dark:text-zinc-500 inline-flex items-center gap-1 ml-2 font-mono",
      children: [f.jsxDEV(Bd, {
        className: "w-3 h-3 text-neutral-400 dark:text-zinc-600"
      }, void 0, !1, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 1757,
        columnNumber: 11
      }, this), "NO CLICK YET"]
    }, void 0, !0, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 1756,
      columnNumber: 9
    }, this),
    ya = (() => {
      const F = [];
      g.forEach(pt => {
        if (pt.logs && pt.logs.length > 0) pt.logs.forEach(mt => {
          let Wt = 1;
          if (mt.type === "open") {
            const bn = [...pt.logs].filter(Nn => Nn.type === "open").sort((Nn, Nt) => new Date(Nn.timestamp).getTime() - new Date(Nt.timestamp).getTime()).findIndex(Nn => Nn.id === mt.id);
            bn !== -1 && (Wt = bn + 1);
          }
          const tr = pt.clickCount > 0 || pt.logs.some(Bn => Bn.type === "click");
          F.push({
            id: mt.id,
            recipient: pt.recipient,
            subject: pt.subject,
            type: mt.type,
            details: mt.type === "open" ? `opened your email ${qs(Wt)} time` : "clicked a link in your email",
            timeAgo: "Just now",
            timestamp: new Date(mt.timestamp),
            hasClick: tr,
            openIndex: Wt
          });
        });else if (pt.openCount > 0) {
          const mt = pt.clickCount > 0;
          F.push({
            id: `synth-open-${pt.id}`,
            recipient: pt.recipient,
            subject: pt.subject,
            type: "open",
            details: "opened your email 1st time",
            timeAgo: "1 hour ago",
            timestamp: new Date(pt.createdAt),
            hasClick: mt,
            openIndex: 1
          });
        }
      });
      const ye = [{
        id: "seed_act_1",
        recipient: "daniel@thedelrealgroup.com",
        subject: "Upgrading the fake chat widget on thedelrealgroup.com ($1.3B Pipeline Optimization) ��️",
        type: "open",
        details: "opened your email 5th time",
        timeAgo: "15 days ago",
        timestamp: new Date(Date.now() - 360 * 3600 * 1e3),
        hasClick: !0,
        openIndex: 5
      }, {
        id: "seed_act_2",
        recipient: "daniel@thedelrealgroup.com",
        subject: "Upgrading the fake chat widget on thedelrealgroup.com ($1.3B Pipeline Optimization) ��️",
        type: "open",
        details: "opened your email 4th time",
        timeAgo: "15 days ago",
        timestamp: new Date(Date.now() - 360 * 3600 * 1e3 - 3600 * 1e3),
        hasClick: !0,
        openIndex: 4
      }, {
        id: "seed_act_3",
        recipient: "one of the recipients",
        subject: "quick video for The Bowen Team (website leak?)",
        type: "open",
        details: "opened your email 15th time",
        timeAgo: "18 days ago",
        timestamp: new Date(Date.now() - 432 * 3600 * 1e3),
        hasClick: !1,
        openIndex: 15
      }, {
        id: "seed_act_4",
        recipient: "one of the recipients",
        subject: "quick video for The Bowen Team (website leak?)",
        type: "open",
        details: "opened your email 14th time",
        timeAgo: "18 days ago",
        timestamp: new Date(Date.now() - 432 * 3600 * 1e3 - 4500 * 1e3),
        hasClick: !0,
        openIndex: 14
      }, {
        id: "seed_act_5",
        recipient: "saqibmemon9884@gmail.com",
        subject: "sasa",
        type: "open",
        details: "opened your email 1st time",
        timeAgo: "21 days ago",
        timestamp: new Date(Date.now() - 504 * 3600 * 1e3),
        hasClick: !1,
        openIndex: 1
      }];
      return [...F, ...ye].sort((pt, mt) => mt.timestamp.getTime() - pt.timestamp.getTime());
    })().filter(F => {
      if (G === "30d" && F.timestamp.getTime() < Date.now() - 720 * 60 * 60 * 1e3 || G === "7d" && F.timestamp.getTime() < Date.now() - 10080 * 60 * 1e3 || G === "24h" && F.timestamp.getTime() < Date.now() - 1440 * 60 * 1e3) return !1;
      if (R === "all") return !0;
      const ye = F.recipient.toLowerCase();
      let Be = "gmail";
      return ye.includes("outlook.com") || ye.includes("hotmail.com") ? Be = "outlook" : ye.includes("yahoo.com") || ye.includes("aol.com") ? Be = "yahoo" : (ye.includes("icloud.com") || ye.includes("mac.com") || ye.includes("me.com")) && (Be = "apple"), Be === R;
    }),
    Al = () => {
      let F = 30,
        ye = mt => `Day ${mt + 1}`;
      if (m === "last_24_hours") F = 24, ye = mt => `${mt}:00`;else if (m === "last_7_days") {
        F = 7;
        const mt = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        ye = Wt => mt[(new Date().getDay() - 6 + Wt + 7) % 7];
      } else if (m === "last_30_days") F = 30, ye = mt => {
        const Wt = new Date();
        return Wt.setDate(Wt.getDate() - 29 + mt), `${Wt.toLocaleString("default", {
          month: "short"
        })} ${Wt.getDate()}`;
      };else if (m === "last_90_days") F = 12, ye = mt => `Week ${mt + 1}`;else if (m === "last_year") {
        F = 12;
        const mt = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        ye = Wt => mt[(new Date().getMonth() - 11 + Wt + 12) % 12];
      }
      const Be = [];
      let pt = 10;
      for (let mt = 0; mt < F; mt++) if (pt = Math.max(5, pt + (Math.random() * 8 - 3)), mt === F - 1) Be.push({
        name: ye(mt),
        dispatches: Ni || 15,
        opens: Xr || 8,
        clicks: 4
      });else {
        const tr = Math.round(pt * (m === "last_year" ? 40 : m === "last_90_days" ? 15 : m === "last_24_hours" ? .8 : 1.5)),
          Bn = Math.round(tr * (.5 + Math.random() * .4)),
          bn = Math.round(Bn * (.2 + Math.random() * .5));
        Be.push({
          name: ye(mt),
          dispatches: tr,
          opens: Bn,
          clicks: bn
        });
      }
      return Be;
    },
    xs = Tr.useMemo(() => Al(), [m, Ni, Xr]),
    Ba = "bg-white/80 dark:bg-zinc-900/30 backdrop-blur-xl border border-neutral-200/80 dark:border-zinc-800/60 rounded-xl p-6 shadow-md dark:shadow-xl transition-all duration-300 hover:scale-[1.01]",
    Bo = "bg-white/50 dark:bg-white/5 backdrop-blur-[60px] border border-white/80 dark:border-white/15 rounded-3xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
    wi = {
      hidden: {
        opacity: 0
      },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: .04,
          delayChildren: .02
        }
      },
      exit: {
        opacity: 0,
        transition: {
          duration: .1
        }
      }
    },
    Kt = {
      hidden: {
        opacity: 0,
        y: 15
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15
        }
      }
    },
    Nf = () => {
      fe(!1);
      try {
        localStorage.setItem("tickk_beta_welcome_seen", "true");
      } catch {}
      Xe && Im();
    };
  return f.jsxDEV("div", {
    className: "min-h-screen bg-neutral-50 dark:bg-[#0c0c0e] dark:bg-gradient-to-b dark:from-[#0c0c0e] dark:via-[#09090b] dark:to-[#050506] text-neutral-800 dark:text-zinc-100 font-sans flex flex-col md:flex-row relative transition-colors duration-500 overflow-hidden",
    children: [f.jsxDEV("div", {
      className: "fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none",
      children: f.jsxDEV(hi, {
        children: E.map(F => f.jsxDEV(lt.div, {
          initial: {
            opacity: 0,
            x: 50,
            scale: .95
          },
          animate: {
            opacity: 1,
            x: 0,
            scale: 1
          },
          exit: {
            opacity: 0,
            y: -20,
            scale: .95
          },
          className: "pointer-events-auto bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-zinc-800 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-full px-4 py-3 flex items-center gap-4",
          children: [f.jsxDEV("span", {
            className: "inline-flex items-center px-2.5 py-1 bg-emerald-500/5 border border-emerald-500/20 text-neutral-900 dark:text-white text-[10px] font-normal rounded-full shrink-0",
            children: [f.jsxDEV(en, {
              className: "w-3.5 h-3.5 text-emerald-500 mr-1 shrink-0",
              strokeWidth: 3
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2e3,
              columnNumber: 17
            }, this), f.jsxDEV("span", {
              children: "Confirmed"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2001,
              columnNumber: 17
            }, this)]
          }, void 0, !0, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 1999,
            columnNumber: 15
          }, this), f.jsxDEV("div", {
            className: "flex flex-col max-w-[150px] sm:max-w-[200px]",
            children: [f.jsxDEV("span", {
              className: "text-xs font-medium text-neutral-900 dark:text-white truncate",
              children: F.trackerSubject
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2005,
              columnNumber: 17
            }, this), f.jsxDEV("span", {
              className: "text-[10px] text-zinc-500 truncate",
              children: F.trackerRecipient
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2006,
              columnNumber: 17
            }, this)]
          }, void 0, !0, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 2004,
            columnNumber: 15
          }, this), f.jsxDEV("button", {
            onClick: () => S(ye => ye.filter(Be => Be.id !== F.id)),
            className: "p-1 shrink-0 text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors ml-2",
            children: f.jsxDEV(Bd, {
              className: "w-3.5 h-3.5"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2013,
              columnNumber: 17
            }, this)
          }, void 0, !1, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 2009,
            columnNumber: 15
          }, this)]
        }, F.id, !0, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 1992,
          columnNumber: 13
        }, this))
      }, void 0, !1, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 1990,
        columnNumber: 9
      }, this)
    }, void 0, !1, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 1989,
      columnNumber: 7
    }, this), f.jsxDEV("div", {
      className: "absolute top-[-10%] left-[10%] w-[550px] h-[550px] bg-neutral-200/20 dark:bg-white/[0.01] rounded-full blur-[140px] pointer-events-none z-0"
    }, void 0, !1, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 2021,
      columnNumber: 7
    }, this), f.jsxDEV("div", {
      className: "absolute bottom-[-10%] right-[5%] w-[700px] h-[700px] bg-neutral-200/20 dark:bg-white/[0.01] rounded-full blur-[160px] pointer-events-none z-0"
    }, void 0, !1, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 2022,
      columnNumber: 7
    }, this), f.jsxDEV("aside", {
      className: `border-b md:border-b-0 md:border-r border-neutral-200 dark:border-zinc-900 bg-white dark:bg-[#050506] flex flex-col shrink-0 justify-between transition-all duration-500 z-10 ${U ? "w-full md:w-20" : "w-full md:w-64"}`,
      children: [f.jsxDEV("div", {
        className: "flex flex-col",
        children: [f.jsxDEV("div", {
          className: `p-6 border-b border-neutral-200 dark:border-zinc-900 flex ${U ? "flex-col items-center gap-6" : "items-center justify-between"} transition-all duration-500`,
          children: [!U && f.jsxDEV("span", {
            className: "flex items-center gap-2 select-none overflow-hidden whitespace-nowrap",
            children: f.jsxDEV("img", {
              src: "/logo.svg",
              alt: "Tickk",
              className: "h-4 dark:invert"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2031,
              columnNumber: 17
            }, this)
          }, void 0, !1, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 2030,
            columnNumber: 15
          }, this), U && f.jsxDEV("span", {
            className: "flex items-center justify-center select-none",
            children: f.jsxDEV("img", {
              src: "/icon.svg",
              alt: "Tickk",
              className: "h-4 dark:invert opacity-90"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2036,
              columnNumber: 17
            }, this)
          }, void 0, !1, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 2035,
            columnNumber: 15
          }, this), f.jsxDEV("div", {
            className: `flex items-center gap-2 ${U ? "flex-col" : ""}`,
            children: [f.jsxDEV("button", {
              onClick: () => re(!U),
              className: "p-1.5 text-zinc-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded transition-all cursor-pointer",
              title: U ? "Expand Sidebar" : "Collapse Sidebar",
              children: U ? f.jsxDEV(jre, {
                className: "w-4 h-4"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2045,
                columnNumber: 39
              }, this) : f.jsxDEV(_re, {
                className: "w-4 h-4"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2045,
                columnNumber: 79
              }, this)
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2040,
              columnNumber: 15
            }, this), !U && f.jsxDEV("button", {
              onClick: Fs,
              className: `p-1.5 hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded transition-all cursor-pointer ${le ? "animate-spin text-neutral-900 dark:text-white" : "text-zinc-500 hover:text-neutral-900 dark:hover:text-white"}`,
              title: "Sync telemetry data",
              children: f.jsxDEV(TO, {
                className: "w-3.5 h-3.5"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2053,
                columnNumber: 19
              }, this)
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2048,
              columnNumber: 17
            }, this)]
          }, void 0, !0, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 2039,
            columnNumber: 13
          }, this)]
        }, void 0, !0, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 2028,
          columnNumber: 11
        }, this), f.jsxDEV("nav", {
          className: "p-4 space-y-1.5",
          children: [{
            id: "overview",
            label: "Home / Overview",
            icon: f.jsxDEV(Ud, {
              className: "w-4 h-4"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2062,
              columnNumber: 65
            }, this)
          }, {
            id: "activity",
            label: "Latest Activity",
            icon: f.jsxDEV(IB, {
              className: "w-4 h-4"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2063,
              columnNumber: 65
            }, this)
          }, {
            id: "tracking",
            label: "Email Tracking",
            icon: f.jsxDEV(kp, {
              className: "w-4 h-4"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2064,
              columnNumber: 64
            }, this)
          }, {
            id: "link_tracking",
            label: "Link Tracking",
            icon: f.jsxDEV(dre, {
              className: "w-4 h-4"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2065,
              columnNumber: 68
            }, this)
          }, {
            id: "performance",
            label: "Performance Metrics",
            icon: f.jsxDEV(Qre, {
              className: "w-4 h-4"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2066,
              columnNumber: 84
            }, this)
          }, {
            id: "integrations",
            label: "Integration Hub",
            icon: f.jsxDEV(RB, {
              className: "w-4 h-4"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2067,
              columnNumber: 67
            }, this)
          }, {
            id: "api_keys",
            label: "API Keys",
            icon: f.jsxDEV(ire, {
              className: "w-4 h-4"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2068,
              columnNumber: 58
            }, this)
          }, {
            id: "account",
            label: "Settings & account",
            icon: f.jsxDEV(YD, {
              className: "w-4 h-4"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2069,
              columnNumber: 67
            }, this)
          }, {
            id: "billing",
            label: "Corporate Billing",
            icon: f.jsxDEV(qD, {
              className: "w-4 h-4"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2070,
              columnNumber: 66
            }, this)
          }, {
            id: "pricing",
            label: "Pricing & Plans (Premium)",
            icon: f.jsxDEV(gp, {
              className: "w-4 h-4"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2071,
              columnNumber: 74
            }, this)
          }, {
            id: "support",
            label: "Beta Feedback & Support",
            icon: f.jsxDEV(cre, {
              className: "w-4 h-4"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2072,
              columnNumber: 72
            }, this)
          }].map(F => {
            const ye = c === F.id;
            return f.jsxDEV("button", {
              id: `sidebar-tab-${F.id}`,
              onClick: () => u(F.id),
              className: `group w-full ${U ? "px-0 justify-center py-3" : "px-4 py-2.5"} text-xs font-normal tracking-wide flex items-center gap-3 rounded-lg transition-all border cursor-pointer overflow-hidden relative ${ye ? "bg-neutral-100 dark:bg-zinc-900/40 text-neutral-900 dark:text-white border-neutral-200 dark:border-zinc-800/65 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]" : "text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:text-white dark:hover:bg-zinc-900/20 border-transparent"}`,
              title: U ? F.label : void 0,
              children: [f.jsxDEV("span", {
                style: {
                  transformStyle: "preserve-3d"
                },
                className: `relative flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1 group-hover:scale-110 group-hover:rotate-[-4deg] group-hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] dark:group-hover:drop-shadow-[0_8px_16px_rgba(255,255,255,0.15)] hover:text-neutral-700 dark:hover:text-zinc-200 ${ye ? "text-neutral-900 dark:text-white scale-110" : "text-zinc-500"}`,
                children: F.icon
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2087,
                columnNumber: 19
              }, this), !U && f.jsxDEV("span", {
                className: "truncate transition-opacity duration-300 relative z-10 group-hover:translate-x-0.5 transition-transform",
                children: F.label
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2091,
                columnNumber: 21
              }, this)]
            }, F.id, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2076,
              columnNumber: 17
            }, this);
          })
        }, void 0, !1, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 2060,
          columnNumber: 11
        }, this)]
      }, void 0, !0, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 2026,
        columnNumber: 9
      }, this), f.jsxDEV("div", {
        className: "p-4 border-t border-neutral-200 dark:border-zinc-900 bg-neutral-50/50 dark:bg-[#050506]/50",
        children: [f.jsxDEV("div", {
          className: "flex items-center gap-2.5 mb-4",
          children: [f.jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex items-center justify-center text-xs text-neutral-900 dark:text-white font-mono font-normal uppercase",
            children: Jn.charAt(0)
          }, void 0, !1, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 2102,
            columnNumber: 13
          }, this), f.jsxDEV("div", {
            className: "flex-1 min-w-0",
            children: [f.jsxDEV("p", {
              className: "text-xs text-neutral-800 dark:text-zinc-300 truncate font-normal",
              children: _l(Jn, xl)
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2106,
              columnNumber: 15
            }, this), f.jsxDEV("p", {
              className: "text-[10px] text-neutral-500 dark:text-zinc-500 truncate font-normal",
              children: Wn
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2107,
              columnNumber: 15
            }, this)]
          }, void 0, !0, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 2105,
            columnNumber: 13
          }, this)]
        }, void 0, !0, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 2101,
          columnNumber: 11
        }, this), f.jsxDEV("button", {
          id: "logout-btn",
          onClick: t,
          className: "w-full py-2 text-xs font-normal text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded-lg border border-neutral-200 dark:border-zinc-800 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200",
          children: [f.jsxDEV(mre, {
            className: "w-3.5 h-3.5 text-zinc-500"
          }, void 0, !1, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 2115,
            columnNumber: 13
          }, this), "Sign Out"]
        }, void 0, !0, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 2110,
          columnNumber: 11
        }, this)]
      }, void 0, !0, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 2100,
        columnNumber: 9
      }, this)]
    }, void 0, !0, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 2025,
      columnNumber: 7
    }, this), f.jsxDEV("main", {
      className: "flex-1 bg-transparent flex flex-col min-w-0 transition-colors duration-300 z-10",
      children: [f.jsxDEV("header", {
        className: "px-8 py-5 border-b border-neutral-200/40 dark:border-zinc-900/40 bg-white/70 dark:bg-[#050506]/70 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4",
        children: [f.jsxDEV("div", {
          children: [f.jsxDEV("div", {
            className: "flex items-center gap-2",
            children: f.jsxDEV("span", {
              className: "flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-zinc-500 font-normal",
              children: [f.jsxDEV("img", {
                src: "/icon.svg",
                alt: "Tickk",
                className: "h-3 dark:invert opacity-50"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2128,
                columnNumber: 139
              }, this), " CONSOLE v4.0"]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2128,
              columnNumber: 15
            }, this)
          }, void 0, !1, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 2127,
            columnNumber: 13
          }, this), f.jsxDEV("h2", {
            className: "text-sm font-normal text-neutral-900 dark:text-white tracking-tight mt-0.5",
            children: "Continuous Read Telemetry"
          }, void 0, !1, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 2130,
            columnNumber: 13
          }, this)]
        }, void 0, !0, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 2126,
          columnNumber: 11
        }, this), f.jsxDEV("div", {
          className: "flex items-center gap-4 text-xs",
          children: [(c === "tracking" || c === "link_tracking") && f.jsxDEV("div", {
            className: "relative z-50",
            children: [f.jsxDEV("button", {
              onClick: () => I(!W),
              className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/40 dark:bg-zinc-900/40 hover:bg-white/60 dark:hover:bg-zinc-800/60 backdrop-blur-xl border border-neutral-200/50 dark:border-zinc-700/50 text-neutral-700 dark:text-zinc-300 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]",
              children: [f.jsxDEV("span", {
                className: "font-medium tracking-wide",
                children: G === "24h" ? "Last 24h" : G === "7d" ? "Last 7 Days" : "Last 30 Days"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2141,
                columnNumber: 17
              }, this), f.jsxDEV("svg", {
                className: `w-3 h-3 transition-transform ${W ? "rotate-180" : ""}`,
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: f.jsxDEV("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M19 9l-7 7-7-7"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2145,
                  columnNumber: 19
                }, this)
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2144,
                columnNumber: 17
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2137,
              columnNumber: 15
            }, this), f.jsxDEV(hi, {
              children: W && f.jsxDEV(lt.div, {
                initial: {
                  opacity: 0,
                  y: -5,
                  scale: .95
                },
                animate: {
                  opacity: 1,
                  y: 0,
                  scale: 1
                },
                exit: {
                  opacity: 0,
                  y: -5,
                  scale: .95
                },
                transition: {
                  duration: .15
                },
                className: "absolute right-0 mt-2 w-36 rounded-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-neutral-200/60 dark:border-zinc-700/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden",
                children: f.jsxDEV("div", {
                  className: "p-1 flex flex-col gap-0.5",
                  children: ["24h", "7d", "30d"].map(F => f.jsxDEV("button", {
                    onClick: () => {
                      q(F), I(!1);
                    },
                    className: `text-left px-3 py-2 text-xs rounded-lg transition-colors ${G === F ? "bg-neutral-100 dark:bg-zinc-800 text-neutral-900 dark:text-white font-medium" : "text-neutral-600 dark:text-zinc-400 hover:bg-neutral-50 dark:hover:bg-zinc-800/50 hover:text-neutral-900 dark:hover:text-white"}`,
                    children: F === "24h" ? "Last 24h" : F === "7d" ? "Last 7 Days" : "Last 30 Days"
                  }, F, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2160,
                    columnNumber: 25
                  }, this))
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2158,
                  columnNumber: 21
                }, this)
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2151,
                columnNumber: 19
              }, this)
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2149,
              columnNumber: 15
            }, this)]
          }, void 0, !0, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 2136,
            columnNumber: 13
          }, this), f.jsxDEV("div", {
            className: "hidden lg:flex relative items-center justify-center p-[1px] overflow-hidden rounded-full font-medium text-[11px] uppercase tracking-wider text-neutral-800 dark:text-zinc-200",
            children: [f.jsxDEV("div", {
              className: "absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#ffffff_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#ffffff_50%,#18181b_100%)] opacity-80"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2181,
              columnNumber: 15
            }, this), f.jsxDEV("span", {
              className: "relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
              children: [f.jsxDEV("span", {
                className: "absolute inset-0 rounded-full animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.8),50%,transparent,75%,rgba(255,255,255,0.8),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.2),50%,transparent,75%,rgba(255,255,255,0.2),100%)] mix-blend-overlay pointer-events-none",
                style: {
                  backgroundSize: "300% 100%"
                }
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2186,
                columnNumber: 17
              }, this), f.jsxDEV("span", {
                className: "relative z-10",
                children: "Secure Session Active"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2188,
                columnNumber: 17
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2184,
              columnNumber: 15
            }, this)]
          }, void 0, !0, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 2179,
            columnNumber: 13
          }, this), f.jsxDEV(t8, {
            theme: r,
            toggleTheme: o
          }, void 0, !1, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 2194,
            columnNumber: 13
          }, this)]
        }, void 0, !0, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 2133,
          columnNumber: 11
        }, this)]
      }, void 0, !0, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 2125,
        columnNumber: 9
      }, this), f.jsxDEV("div", {
        className: "p-8 overflow-y-auto flex-1 max-w-7xl w-full mx-auto space-y-8",
        children: f.jsxDEV(hi, {
          mode: "wait",
          children: L ? f.jsxDEV(lt.div, {
            initial: {
              opacity: 0
            },
            animate: {
              opacity: 1
            },
            exit: {
              opacity: 0
            },
            className: "space-y-8",
            children: [f.jsxDEV("div", {
              className: "flex flex-col items-center justify-center py-6",
              children: f.jsxDEV("div", {
                className: "flex items-center gap-3",
                children: [f.jsxDEV("div", {
                  className: "w-5 h-5 border-2 border-neutral-300 dark:border-zinc-700 border-t-neutral-900 dark:border-t-white rounded-full animate-spin"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2211,
                  columnNumber: 21
                }, this), f.jsxDEV("span", {
                  className: "text-sm font-mono tracking-wider text-neutral-500 dark:text-zinc-400",
                  children: ["Provisioning workspace in ", C, "s..."]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2212,
                  columnNumber: 21
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2210,
                columnNumber: 19
              }, this)
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2209,
              columnNumber: 17
            }, this), f.jsxDEV("div", {
              className: "grid grid-cols-1 md:grid-cols-4 gap-6",
              children: [1, 2, 3, 4].map(F => f.jsxDEV("div", {
                className: "relative overflow-hidden bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-neutral-200/50 dark:border-zinc-800/50 p-6 rounded-2xl h-36 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
                children: [f.jsxDEV("div", {
                  className: "flex justify-between items-start",
                  children: [f.jsxDEV("div", {
                    className: "w-12 h-12 rounded-xl bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse relative overflow-hidden",
                    children: f.jsxDEV("div", {
                      className: "absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2222,
                      columnNumber: 27
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2221,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "w-20 h-6 rounded-full bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse relative overflow-hidden",
                    children: f.jsxDEV("div", {
                      className: "absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2225,
                      columnNumber: 27
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2224,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2220,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "space-y-2.5 mt-auto",
                  children: [f.jsxDEV("div", {
                    className: "w-3/4 h-8 rounded-lg bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse relative overflow-hidden",
                    children: f.jsxDEV("div", {
                      className: "absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2230,
                      columnNumber: 27
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2229,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "w-1/2 h-4 rounded-md bg-neutral-200/40 dark:bg-zinc-800/40 animate-pulse relative overflow-hidden",
                    children: f.jsxDEV("div", {
                      className: "absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2233,
                      columnNumber: 27
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2232,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2228,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "absolute top-0 -left-[100%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent animate-[shimmer_2.5s_infinite] -skew-x-12 pointer-events-none"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2236,
                  columnNumber: 23
                }, this)]
              }, F, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2219,
                columnNumber: 21
              }, this))
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2217,
              columnNumber: 17
            }, this), f.jsxDEV("div", {
              className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
              children: [f.jsxDEV("div", {
                className: "lg:col-span-2 relative overflow-hidden bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-neutral-200/50 dark:border-zinc-800/50 rounded-3xl h-[450px] flex flex-col p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
                children: [f.jsxDEV("div", {
                  className: "flex justify-between items-center mb-10",
                  children: [f.jsxDEV("div", {
                    className: "space-y-3",
                    children: [f.jsxDEV("div", {
                      className: "w-48 h-8 rounded-lg bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse relative overflow-hidden",
                      children: f.jsxDEV("div", {
                        className: "absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2245,
                        columnNumber: 27
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2244,
                      columnNumber: 25
                    }, this), f.jsxDEV("div", {
                      className: "w-64 h-4 rounded-md bg-neutral-200/40 dark:bg-zinc-800/40 animate-pulse relative overflow-hidden",
                      children: f.jsxDEV("div", {
                        className: "absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2248,
                        columnNumber: 27
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2247,
                      columnNumber: 25
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2243,
                    columnNumber: 23
                  }, this), f.jsxDEV("div", {
                    className: "flex gap-2",
                    children: [f.jsxDEV("div", {
                      className: "w-24 h-10 rounded-xl bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2252,
                      columnNumber: 25
                    }, this), f.jsxDEV("div", {
                      className: "w-10 h-10 rounded-xl bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2253,
                      columnNumber: 25
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2251,
                    columnNumber: 23
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2242,
                  columnNumber: 21
                }, this), f.jsxDEV("div", {
                  className: "flex-1 relative flex items-end gap-2 px-2 pb-6 border-b border-neutral-200/50 dark:border-zinc-800/50",
                  children: [f.jsxDEV("div", {
                    className: "absolute inset-0 flex flex-col justify-between pt-2 pb-6",
                    children: [1, 2, 3, 4, 5].map(F => f.jsxDEV("div", {
                      className: "w-full h-px bg-neutral-200/50 dark:bg-zinc-800/50"
                    }, `y-${F}`, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2262,
                      columnNumber: 27
                    }, this))
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2260,
                    columnNumber: 23
                  }, this), Array.from({
                    length: 24
                  }).map((F, ye) => f.jsxDEV("div", {
                    className: "flex-1 bg-neutral-200/40 dark:bg-zinc-800/40 rounded-t-md animate-pulse relative overflow-hidden z-10",
                    style: {
                      height: `${20 + Math.random() * 80}%`,
                      animationDelay: `${ye * .05}s`
                    },
                    children: f.jsxDEV("div", {
                      className: "absolute inset-0 -translate-y-full animate-[shimmer_2s_infinite] bg-gradient-to-b from-transparent via-white/40 dark:via-white/10 to-transparent"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2275,
                      columnNumber: 28
                    }, this)
                  }, `bar-${ye}`, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2267,
                    columnNumber: 25
                  }, this))]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2258,
                  columnNumber: 21
                }, this), f.jsxDEV("div", {
                  className: "absolute top-0 -left-[100%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/30 dark:via-white/5 to-transparent animate-[shimmer_3s_infinite] -skew-x-12 pointer-events-none"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2279,
                  columnNumber: 21
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2241,
                columnNumber: 19
              }, this), f.jsxDEV("div", {
                className: "relative overflow-hidden bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-neutral-200/50 dark:border-zinc-800/50 rounded-3xl h-[450px] flex flex-col p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
                children: [f.jsxDEV("div", {
                  className: "w-40 h-8 rounded-lg bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse mb-8 relative overflow-hidden",
                  children: f.jsxDEV("div", {
                    className: "absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2285,
                    columnNumber: 23
                  }, this)
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2284,
                  columnNumber: 21
                }, this), f.jsxDEV("div", {
                  className: "flex-1 space-y-5",
                  children: [1, 2, 3, 4, 5].map(F => f.jsxDEV("div", {
                    className: "flex items-center gap-4",
                    children: [f.jsxDEV("div", {
                      className: "w-12 h-12 rounded-full bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse shrink-0"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2291,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex-1 space-y-2",
                      children: [f.jsxDEV("div", {
                        className: "w-full h-4 rounded-md bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2293,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "w-2/3 h-3 rounded-md bg-neutral-200/40 dark:bg-zinc-800/40 animate-pulse"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2294,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2292,
                      columnNumber: 27
                    }, this)]
                  }, `list-${F}`, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2290,
                    columnNumber: 25
                  }, this))
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2288,
                  columnNumber: 21
                }, this), f.jsxDEV("div", {
                  className: "absolute top-0 -left-[100%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent animate-[shimmer_2.5s_infinite] -skew-x-12 pointer-events-none"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2299,
                  columnNumber: 21
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2283,
                columnNumber: 19
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2240,
              columnNumber: 17
            }, this)]
          }, "loading-skeleton", !0, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 2202,
            columnNumber: 15
          }, this) : f.jsxDEV(lt.div, {
            variants: wi,
            initial: "hidden",
            animate: "visible",
            exit: "exit",
            className: "space-y-8",
            children: [c === "overview" && f.jsxDEV("div", {
              className: "space-y-8 animate-fadeIn",
              children: [f.jsxDEV("div", {
                className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
                children: f.jsxDEV("div", {
                  children: [f.jsxDEV("h2", {
                    className: "text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight",
                    children: "System Summary"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2318,
                    columnNumber: 25
                  }, this), f.jsxDEV("p", {
                    className: "text-xs text-zinc-500 mt-1",
                    children: "Spacious, high-fidelity real-time delivery and interaction intelligence."
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2319,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2317,
                  columnNumber: 23
                }, this)
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2316,
                columnNumber: 21
              }, this), f.jsxDEV("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
                children: [f.jsxDEV(lt.div, {
                  id: "metric-dispatches",
                  variants: Kt,
                  className: "relative overflow-hidden group bg-gradient-to-br from-white/95 via-zinc-50/50 to-neutral-100/80 dark:from-[#0f0f12] dark:via-[#0a0a0c] dark:to-[#030304] border border-neutral-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-md dark:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-neutral-300 dark:hover:border-zinc-700/80",
                  children: [f.jsxDEV("div", {
                    className: "absolute inset-0 rounded-2xl animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.4),50%,transparent,75%,rgba(255,255,255,0.4),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.1),50%,transparent,75%,rgba(255,255,255,0.1),100%)] mix-blend-overlay pointer-events-none",
                    style: {
                      backgroundSize: "300% 100%"
                    }
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2332,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-zinc-300/20 dark:bg-zinc-800/10 blur-xl pointer-events-none transition-transform duration-500 group-hover:scale-150"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2335,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex items-center justify-between mb-4 relative z-10",
                    children: f.jsxDEV("span", {
                      className: "text-xs text-zinc-500 font-semibold uppercase tracking-wider font-display",
                      children: "Total Dispatches"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2338,
                      columnNumber: 27
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2337,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex items-baseline justify-between relative z-10 mt-1",
                    children: [f.jsxDEV("span", {
                      className: "text-4xl font-extralight font-display text-neutral-900 dark:text-zinc-100 tracking-tight",
                      children: f.jsxDEV(Y5, {
                        value: Ni
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2341,
                        columnNumber: 134
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2341,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "relative items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] uppercase tracking-wider text-neutral-800 dark:text-zinc-200",
                      children: [f.jsxDEV("div", {
                        className: "absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#ffffff_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#ffffff_50%,#18181b_100%)] opacity-80"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2343,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
                        children: [f.jsxDEV("span", {
                          className: "absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.8),50%,transparent,75%,rgba(255,255,255,0.8),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.2),50%,transparent,75%,rgba(255,255,255,0.2),100%)] mix-blend-overlay pointer-events-none",
                          style: {
                            backgroundSize: "300% 100%"
                          }
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2345,
                          columnNumber: 31
                        }, this), f.jsxDEV("span", {
                          className: "relative z-10",
                          children: "Emails"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2346,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2344,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2342,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2340,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2326,
                  columnNumber: 23
                }, this), f.jsxDEV(lt.div, {
                  id: "metric-opens",
                  variants: Kt,
                  className: "relative overflow-hidden group bg-gradient-to-br from-white/95 via-emerald-500/[0.01] to-neutral-100/80 dark:from-[#0f0f12] dark:via-[#0a0a0c] dark:to-[#030304] border border-neutral-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-md dark:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-neutral-300 dark:hover:border-zinc-700/80",
                  children: [f.jsxDEV("div", {
                    className: "absolute inset-0 rounded-2xl animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(52,211,153,0.15),50%,transparent,75%,rgba(52,211,153,0.15),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(52,211,153,0.1),50%,transparent,75%,rgba(52,211,153,0.1),100%)] mix-blend-overlay pointer-events-none",
                    style: {
                      backgroundSize: "300% 100%"
                    }
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2359,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-xl pointer-events-none transition-transform duration-500 group-hover:scale-150"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2362,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex items-center justify-between mb-4 relative z-10",
                    children: f.jsxDEV("span", {
                      className: "text-xs text-zinc-500 font-semibold uppercase tracking-wider font-display",
                      children: "Confirmed Opens"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2365,
                      columnNumber: 27
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2364,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex items-baseline justify-between relative z-10 mt-1",
                    children: [f.jsxDEV("span", {
                      className: "text-4xl font-extralight font-display text-emerald-600 dark:text-emerald-400 tracking-tight",
                      children: f.jsxDEV(Y5, {
                        value: Xr
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2368,
                        columnNumber: 137
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2368,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "relative items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-300",
                      children: [f.jsxDEV("div", {
                        className: "absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#34d399_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#10b981_50%,#18181b_100%)] opacity-80"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2370,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
                        children: [f.jsxDEV("span", {
                          className: "absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(52,211,153,0.4),50%,transparent,75%,rgba(52,211,153,0.4),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(16,185,129,0.3),50%,transparent,75%,rgba(16,185,129,0.3),100%)] mix-blend-overlay pointer-events-none",
                          style: {
                            backgroundSize: "300% 100%"
                          }
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2372,
                          columnNumber: 31
                        }, this), f.jsxDEV("span", {
                          className: "relative z-10",
                          children: "Verified"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2373,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2371,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2369,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2367,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2353,
                  columnNumber: 23
                }, this), f.jsxDEV(lt.div, {
                  id: "metric-pending",
                  variants: Kt,
                  className: "relative overflow-hidden group bg-gradient-to-br from-white/95 via-amber-500/[0.01] to-neutral-100/80 dark:from-[#0f0f12] dark:via-[#0a0a0c] dark:to-[#030304] border border-neutral-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-md dark:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-neutral-300 dark:hover:border-zinc-700/80",
                  children: [f.jsxDEV("div", {
                    className: "absolute inset-0 rounded-2xl animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(251,191,36,0.15),50%,transparent,75%,rgba(251,191,36,0.15),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(251,191,36,0.1),50%,transparent,75%,rgba(251,191,36,0.1),100%)] mix-blend-overlay pointer-events-none",
                    style: {
                      backgroundSize: "300% 100%"
                    }
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2386,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-amber-500/10 dark:bg-amber-500/5 blur-xl pointer-events-none transition-transform duration-500 group-hover:scale-150"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2389,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex items-center justify-between mb-4 relative z-10",
                    children: f.jsxDEV("span", {
                      className: "text-xs text-zinc-500 font-semibold uppercase tracking-wider font-display",
                      children: "Pending Delivery"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2392,
                      columnNumber: 27
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2391,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex items-baseline justify-between relative z-10 mt-1",
                    children: [f.jsxDEV("span", {
                      className: "text-4xl font-extralight font-display text-amber-600 dark:text-amber-500 tracking-tight",
                      children: f.jsxDEV(Y5, {
                        value: fo
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2395,
                        columnNumber: 133
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2395,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "relative items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-300",
                      children: [f.jsxDEV("div", {
                        className: "absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#fbbf24_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#f59e0b_50%,#18181b_100%)] opacity-80"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2397,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
                        children: [f.jsxDEV("span", {
                          className: "absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(251,191,36,0.4),50%,transparent,75%,rgba(251,191,36,0.4),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(245,158,11,0.3),50%,transparent,75%,rgba(245,158,11,0.3),100%)] mix-blend-overlay pointer-events-none",
                          style: {
                            backgroundSize: "300% 100%"
                          }
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2399,
                          columnNumber: 31
                        }, this), f.jsxDEV("span", {
                          className: "relative z-10",
                          children: "Queued"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2400,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2398,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2396,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2394,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2380,
                  columnNumber: 23
                }, this), f.jsxDEV(lt.div, {
                  id: "metric-rate",
                  variants: Kt,
                  className: "relative overflow-hidden group bg-gradient-to-br from-white/95 via-zinc-500/[0.01] to-neutral-100/80 dark:from-[#0f0f12] dark:via-[#0a0a0c] dark:to-[#030304] border border-neutral-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-md dark:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-neutral-300 dark:hover:border-zinc-700/80",
                  children: [f.jsxDEV("div", {
                    className: "absolute inset-0 rounded-2xl animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(161,161,170,0.15),50%,transparent,75%,rgba(161,161,170,0.15),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(161,161,170,0.1),50%,transparent,75%,rgba(161,161,170,0.1),100%)] mix-blend-overlay pointer-events-none",
                    style: {
                      backgroundSize: "300% 100%"
                    }
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2413,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-zinc-300/20 dark:bg-zinc-800/10 blur-xl pointer-events-none transition-transform duration-500 group-hover:scale-150"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2416,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex items-center justify-between mb-4 relative z-10",
                    children: f.jsxDEV("span", {
                      className: "text-xs text-zinc-500 font-semibold uppercase tracking-wider font-display",
                      children: "Delivery Rate"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2419,
                      columnNumber: 27
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2418,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex items-baseline justify-between relative z-10 mt-1",
                    children: [f.jsxDEV("span", {
                      className: "text-4xl font-extralight font-display text-neutral-900 dark:text-zinc-100 tracking-tight",
                      children: [f.jsxDEV(Y5, {
                        value: xc
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2422,
                        columnNumber: 134
                      }, this), "%"]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2422,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "relative items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] uppercase tracking-wider text-zinc-700 dark:text-zinc-300",
                      children: [f.jsxDEV("div", {
                        className: "absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#a1a1aa_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#71717a_50%,#18181b_100%)] opacity-80"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2424,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
                        children: [f.jsxDEV("span", {
                          className: "absolute inset-0 rounded-md animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(161,161,170,0.4),50%,transparent,75%,rgba(161,161,170,0.4),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(113,113,122,0.3),50%,transparent,75%,rgba(113,113,122,0.3),100%)] mix-blend-overlay pointer-events-none",
                          style: {
                            backgroundSize: "300% 100%"
                          }
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2426,
                          columnNumber: 31
                        }, this), f.jsxDEV("span", {
                          className: "relative z-10",
                          children: "Conversion"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2427,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2425,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2423,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2421,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2407,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2324,
                columnNumber: 21
              }, this), f.jsxDEV("div", {
                className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
                children: [f.jsxDEV(lt.div, {
                  variants: Kt,
                  className: `lg:col-span-7 ${Ba}`,
                  children: [f.jsxDEV("div", {
                    className: "flex justify-between items-center mb-6",
                    children: [f.jsxDEV("h3", {
                      className: "text-sm font-medium font-display text-neutral-900 dark:text-white",
                      children: "System Signal Feed"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2438,
                      columnNumber: 27
                    }, this), f.jsxDEV("button", {
                      onClick: () => u("activity"),
                      className: "text-xs text-zinc-500 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1",
                      children: ["Go to Stream ", f.jsxDEV(Tg, {
                        className: "w-3 h-3"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2440,
                        columnNumber: 42
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2439,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2437,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "space-y-4",
                    children: ya.slice(0, 3).map(F => f.jsxDEV("div", {
                      className: "py-3 border-b border-neutral-200 dark:border-zinc-900 last:border-0 flex items-center justify-between text-xs",
                      children: [f.jsxDEV("div", {
                        className: "flex items-center gap-3",
                        children: [f.jsxDEV("div", {
                          className: "p-2 rounded-full bg-neutral-100 dark:bg-zinc-900/80 border border-neutral-200 dark:border-zinc-800/40",
                          children: F.type === "open" ? f.jsxDEV(Fd, {
                            className: "w-3.5 h-3.5 text-emerald-500 dark:text-neutral-900 dark:text-white"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2449,
                            columnNumber: 58
                          }, this) : f.jsxDEV(Rk, {
                            className: "w-3.5 h-3.5 text-emerald-600 dark:text-neutral-900 dark:text-white"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2449,
                            columnNumber: 147
                          }, this)
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2448,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          children: [f.jsxDEV("div", {
                            className: "text-neutral-800 dark:text-zinc-300 font-normal flex flex-wrap items-center gap-1",
                            children: [f.jsxDEV("span", {
                              children: [F.recipient, " ", f.jsxDEV("span", {
                                className: "text-zinc-500",
                                children: F.details
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 2453,
                                columnNumber: 59
                              }, this)]
                            }, void 0, !0, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 2453,
                              columnNumber: 37
                            }, this), xa(!!F.hasClick)]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2452,
                            columnNumber: 35
                          }, this), f.jsxDEV("div", {
                            className: "text-[11px] text-zinc-500 mt-0.5 max-w-sm truncate",
                            children: F.subject
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2456,
                            columnNumber: 35
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2451,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2447,
                        columnNumber: 31
                      }, this), f.jsxDEV("span", {
                        className: "text-[11px] text-zinc-500",
                        children: F.timeAgo
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2459,
                        columnNumber: 31
                      }, this)]
                    }, F.id, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2446,
                      columnNumber: 29
                    }, this))
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2444,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2436,
                  columnNumber: 23
                }, this), f.jsxDEV(lt.div, {
                  variants: Kt,
                  className: `lg:col-span-5 ${Ba} flex flex-col justify-between h-full min-h-[295px]`,
                  children: [f.jsxDEV("div", {
                    children: [f.jsxDEV("h3", {
                      className: "text-sm font-medium font-display text-neutral-900 dark:text-white mb-2",
                      children: "Configure Secure Watch"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2467,
                      columnNumber: 27
                    }, this), f.jsxDEV("p", {
                      className: "text-xs text-zinc-500 leading-relaxed font-normal mb-6",
                      children: "Instantly register and inject silent tracking payloads into your active corporate correspondence."
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2468,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2466,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "space-y-3",
                    children: [f.jsxDEV("button", {
                      onClick: () => u("tracking"),
                      className: "w-full py-3 bg-white hover:bg-zinc-200 text-black text-xs font-normal rounded-lg transition-colors flex items-center justify-center gap-2",
                      children: [f.jsxDEV(d5, {
                        className: "w-4 h-4"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2477,
                        columnNumber: 29
                      }, this), " Deploy Tracker Matrix"]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2473,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "text-[10px] text-center text-zinc-600 font-mono",
                      children: "SECURE WORKSPACE PROTOCOLS COMPLIANT"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2479,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2472,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2465,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2435,
                columnNumber: 21
              }, this), f.jsxDEV(lt.div, {
                variants: Kt,
                className: `${Ba} overflow-hidden p-6 relative`,
                children: f.jsxDEV(Ice, {
                  logs: g.flatMap(F => (F.logs || []).map(ye => ({
                    ...ye,
                    trackerSubject: F.subject,
                    trackerRecipient: F.recipient
                  })))
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2491,
                  columnNumber: 23
                }, this)
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2487,
                columnNumber: 21
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2315,
              columnNumber: 19
            }, this), c === "activity" && f.jsxDEV("div", {
              className: "space-y-8 animate-fadeIn",
              children: [f.jsxDEV("div", {
                className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
                children: [f.jsxDEV("div", {
                  children: [f.jsxDEV("h2", {
                    className: "text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight",
                    children: "Latest Activity Stream"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2509,
                    columnNumber: 25
                  }, this), f.jsxDEV("p", {
                    className: "text-xs text-zinc-500 mt-1",
                    children: "Wide, ultra-minimalist chronological feed detailing absolute confirmed recipient opens and conversions."
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2510,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2508,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "relative",
                  children: [f.jsxDEV("div", {
                    onClick: () => ie(!B),
                    className: "appearance-none bg-neutral-50 dark:bg-zinc-950/50 backdrop-blur-md border border-neutral-200 dark:border-zinc-800 text-neutral-800 dark:text-zinc-300 text-xs px-4 py-2.5 pr-10 rounded-lg focus:outline-none transition-all cursor-pointer font-normal flex items-center gap-2 select-none",
                    children: [R === "all" ? "All Accounts" : R === "gmail" ? "work@gmail.com (Gmail)" : R === "outlook" ? "personal@outlook.com (Outlook)" : R === "yahoo" ? "contact@yahoo.com (Yahoo)" : "me@icloud.com (Apple)", f.jsxDEV("div", {
                      className: "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none",
                      children: f.jsxDEV(Vd, {
                        className: "w-4 h-4 text-zinc-400"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2519,
                        columnNumber: 29
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2518,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2513,
                    columnNumber: 25
                  }, this), f.jsxDEV(hi, {
                    children: B && f.jsxDEV(lt.div, {
                      initial: {
                        opacity: 0,
                        y: 5
                      },
                      animate: {
                        opacity: 1,
                        y: 0
                      },
                      exit: {
                        opacity: 0,
                        y: 5
                      },
                      transition: {
                        duration: .15
                      },
                      className: "absolute right-0 top-full mt-2 w-64 bg-white/30 dark:bg-[#111111]/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden ring-1 ring-black/5 dark:ring-white/5",
                      children: f.jsxDEV("div", {
                        className: "p-1",
                        children: [f.jsxDEV("button", {
                          onClick: () => {
                            Q("all"), ie(!1);
                          },
                          className: "w-full text-left px-3 py-2 text-xs text-neutral-800 dark:text-white hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center justify-between group",
                          children: [f.jsxDEV("span", {
                            className: "font-medium bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-500 dark:from-white dark:to-neutral-400",
                            children: "All Accounts (Premium View)"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2536,
                            columnNumber: 35
                          }, this), f.jsxDEV(gp, {
                            className: "w-3.5 h-3.5 text-amber-500 opacity-50 group-hover:opacity-100 transition-opacity"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2537,
                            columnNumber: 35
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2532,
                          columnNumber: 33
                        }, this), f.jsxDEV("button", {
                          onClick: () => {
                            Q("gmail"), ie(!1);
                          },
                          className: "w-full text-left px-3 py-2 text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2",
                          children: [f.jsxDEV(y6, {
                            className: "w-3.5 h-3.5"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2543,
                            columnNumber: 35
                          }, this), " work@gmail.com"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2539,
                          columnNumber: 33
                        }, this), f.jsxDEV("button", {
                          onClick: () => {
                            Q("outlook"), ie(!1);
                          },
                          className: "w-full text-left px-3 py-2 text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2",
                          children: [f.jsxDEV(N6, {
                            className: "w-3.5 h-3.5"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2549,
                            columnNumber: 35
                          }, this), " personal@outlook.com"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2545,
                          columnNumber: 33
                        }, this), f.jsxDEV("button", {
                          onClick: () => {
                            Q("yahoo"), ie(!1);
                          },
                          className: "w-full text-left px-3 py-2 text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2",
                          children: [f.jsxDEV(w6, {
                            className: "w-3.5 h-3.5 text-[#6001D2]"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2555,
                            columnNumber: 35
                          }, this), " contact@yahoo.com"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2551,
                          columnNumber: 33
                        }, this), f.jsxDEV("button", {
                          onClick: () => {
                            Q("apple"), ie(!1);
                          },
                          className: "w-full text-left px-3 py-2 text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2",
                          children: [f.jsxDEV(D6, {
                            className: "w-3.5 h-3.5 text-black dark:text-white"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2561,
                            columnNumber: 35
                          }, this), " me@icloud.com"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2557,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2531,
                        columnNumber: 31
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2524,
                      columnNumber: 29
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2522,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none",
                    children: f.jsxDEV(Vd, {
                      className: "w-4 h-4 text-zinc-400"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2568,
                      columnNumber: 27
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2567,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2512,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2507,
                columnNumber: 21
              }, this), f.jsxDEV(lt.div, {
                variants: Kt,
                className: `${Ba} divide-y divide-neutral-200/60 dark:divide-zinc-900/60 p-0 overflow-hidden`,
                children: [f.jsxDEV("div", {
                  className: "p-6 border-b border-neutral-200 dark:border-zinc-900 flex items-center justify-between bg-neutral-50/50 dark:bg-zinc-950/20",
                  children: [f.jsxDEV("span", {
                    className: "text-xs text-neutral-500 dark:text-zinc-400 font-medium",
                    children: "Continuous Timeline Activities"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2576,
                    columnNumber: 25
                  }, this), f.jsxDEV("span", {
                    className: "text-xs text-zinc-500 font-normal",
                    children: [ya.length, " events logged"]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2577,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2575,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "p-6 space-y-0 divide-y divide-neutral-200 dark:divide-zinc-900/40",
                  children: [ya.map(F => f.jsxDEV("div", {
                    className: "py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-neutral-100/40 dark:hover:bg-zinc-900/10",
                    children: [f.jsxDEV("div", {
                      className: "flex items-start gap-4",
                      children: [f.jsxDEV("div", {
                        className: "p-2.5 rounded-full bg-neutral-100 dark:bg-zinc-900/80 border border-neutral-200 dark:border-zinc-800/50 shrink-0 mt-0.5",
                        children: F.type === "open" ? f.jsxDEV(Fd, {
                          className: "w-4 h-4 text-neutral-900 dark:text-white"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2588,
                          columnNumber: 35
                        }, this) : f.jsxDEV(Rk, {
                          className: "w-4 h-4 text-neutral-900 dark:text-white"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2590,
                          columnNumber: 35
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2586,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "space-y-1",
                        children: [f.jsxDEV("div", {
                          className: "text-sm font-normal text-neutral-800 dark:text-zinc-200 flex flex-wrap items-center gap-1",
                          children: [F.id.charCodeAt(F.id.length - 1) % 2 === 0 ? f.jsxDEV("div", {
                            className: "p-1 bg-white dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800/50 w-6 h-6 inline-flex items-center justify-center rounded-md mr-3 shadow-sm",
                            children: f.jsxDEV(a6e, {}, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 2597,
                              columnNumber: 39
                            }, this)
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2596,
                            columnNumber: 37
                          }, this) : f.jsxDEV("div", {
                            className: "p-1 bg-white dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800/50 w-6 h-6 inline-flex items-center justify-center rounded-md mr-3 shadow-sm",
                            children: f.jsxDEV(r6e, {}, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 2601,
                              columnNumber: 39
                            }, this)
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2600,
                            columnNumber: 37
                          }, this), f.jsxDEV("span", {
                            children: [F.recipient, " ", f.jsxDEV("span", {
                              className: "text-zinc-500 font-normal",
                              children: F.details
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 2604,
                              columnNumber: 57
                            }, this)]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2604,
                            columnNumber: 35
                          }, this), xa(!!F.hasClick)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2594,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "text-xs text-zinc-500 font-normal max-w-2xl leading-relaxed",
                          children: F.subject
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2607,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2593,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2585,
                      columnNumber: 29
                    }, this), f.jsxDEV("div", {
                      className: "text-xs text-zinc-500 text-right shrink-0 sm:self-center font-mono",
                      children: F.timeAgo
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2614,
                      columnNumber: 29
                    }, this)]
                  }, F.id, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2582,
                    columnNumber: 27
                  }, this)), ya.length === 0 && f.jsxDEV("div", {
                    className: "py-12 text-center text-zinc-500 font-normal italic",
                    children: "No recent interaction activities detected."
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2621,
                    columnNumber: 27
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2580,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2574,
                columnNumber: 21
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2506,
              columnNumber: 19
            }, this), c === "tracking" && f.jsxDEV("div", {
              className: "space-y-8 animate-fadeIn",
              children: [f.jsxDEV("div", {
                className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
                children: [f.jsxDEV("div", {
                  children: [f.jsxDEV("h2", {
                    className: "text-2xl font-semibold font-display text-neutral-900 dark:text-white tracking-tight",
                    children: "Email Tracking"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2635,
                    columnNumber: 25
                  }, this), f.jsxDEV("p", {
                    className: "text-xs text-zinc-500 mt-1 font-normal",
                    children: "Set up a tracking pixel and link redirect to monitor when recipients open and click your emails."
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2636,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2634,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "relative",
                  children: [f.jsxDEV("div", {
                    onClick: () => ie(!B),
                    className: "appearance-none bg-neutral-50 dark:bg-zinc-950/50 backdrop-blur-md border border-neutral-200 dark:border-zinc-800 text-neutral-800 dark:text-zinc-300 text-xs px-4 py-2.5 pr-10 rounded-lg focus:outline-none transition-all cursor-pointer font-normal flex items-center gap-2 select-none",
                    children: [R === "all" ? "All Accounts" : R === "gmail" ? "work@gmail.com (Gmail)" : R === "outlook" ? "personal@outlook.com (Outlook)" : R === "yahoo" ? "contact@yahoo.com (Yahoo)" : "me@icloud.com (Apple)", f.jsxDEV("div", {
                      className: "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none",
                      children: f.jsxDEV(Vd, {
                        className: "w-4 h-4 text-zinc-400"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2647,
                        columnNumber: 29
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2646,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2641,
                    columnNumber: 25
                  }, this), f.jsxDEV(hi, {
                    children: B && f.jsxDEV(lt.div, {
                      initial: {
                        opacity: 0,
                        y: 5
                      },
                      animate: {
                        opacity: 1,
                        y: 0
                      },
                      exit: {
                        opacity: 0,
                        y: 5
                      },
                      transition: {
                        duration: .15
                      },
                      className: "absolute right-0 top-full mt-2 w-64 bg-white/30 dark:bg-[#111111]/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden ring-1 ring-black/5 dark:ring-white/5",
                      children: f.jsxDEV("div", {
                        className: "p-1",
                        children: [f.jsxDEV("button", {
                          onClick: () => {
                            Q("all"), ie(!1);
                          },
                          className: "w-full text-left px-3 py-2 text-xs text-neutral-800 dark:text-white hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center justify-between group",
                          children: [f.jsxDEV("span", {
                            className: "font-medium bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-500 dark:from-white dark:to-neutral-400",
                            children: "All Accounts (Premium View)"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2664,
                            columnNumber: 35
                          }, this), f.jsxDEV(gp, {
                            className: "w-3.5 h-3.5 text-amber-500 opacity-50 group-hover:opacity-100 transition-opacity"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2665,
                            columnNumber: 35
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2660,
                          columnNumber: 33
                        }, this), f.jsxDEV("button", {
                          onClick: () => {
                            Q("gmail"), ie(!1);
                          },
                          className: "w-full text-left px-3 py-2 text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2",
                          children: [f.jsxDEV(y6, {
                            className: "w-3.5 h-3.5"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2671,
                            columnNumber: 35
                          }, this), " work@gmail.com"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2667,
                          columnNumber: 33
                        }, this), f.jsxDEV("button", {
                          onClick: () => {
                            Q("outlook"), ie(!1);
                          },
                          className: "w-full text-left px-3 py-2 text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2",
                          children: [f.jsxDEV(N6, {
                            className: "w-3.5 h-3.5"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2677,
                            columnNumber: 35
                          }, this), " personal@outlook.com"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2673,
                          columnNumber: 33
                        }, this), f.jsxDEV("button", {
                          onClick: () => {
                            Q("yahoo"), ie(!1);
                          },
                          className: "w-full text-left px-3 py-2 text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2",
                          children: [f.jsxDEV(w6, {
                            className: "w-3.5 h-3.5 text-[#6001D2]"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2683,
                            columnNumber: 35
                          }, this), " contact@yahoo.com"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2679,
                          columnNumber: 33
                        }, this), f.jsxDEV("button", {
                          onClick: () => {
                            Q("apple"), ie(!1);
                          },
                          className: "w-full text-left px-3 py-2 text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2",
                          children: [f.jsxDEV(D6, {
                            className: "w-3.5 h-3.5 text-black dark:text-white"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2689,
                            columnNumber: 35
                          }, this), " me@icloud.com"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2685,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2659,
                        columnNumber: 31
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2652,
                      columnNumber: 29
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2650,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2640,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2633,
                columnNumber: 21
              }, this), f.jsxDEV(lt.div, {
                variants: Kt,
                className: "bg-white/40 dark:bg-zinc-900/40 border border-neutral-200/50 dark:border-zinc-800/50 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3",
                children: [f.jsxDEV(Om, {
                  className: "w-4 h-4 text-zinc-400 ml-2"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2700,
                  columnNumber: 23
                }, this), f.jsxDEV("input", {
                  type: "text",
                  placeholder: "Advanced search by recipient, subject, or domain...",
                  className: "bg-transparent border-none focus:outline-none text-xs text-neutral-900 dark:text-white w-full placeholder:text-zinc-500 font-normal"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2701,
                  columnNumber: 23
                }, this), f.jsxDEV("button", {
                  className: "px-3 py-1.5 bg-neutral-900 dark:bg-zinc-100 text-white dark:text-neutral-900 text-[10px] font-medium rounded-lg whitespace-nowrap hover:bg-neutral-800 dark:hover:bg-white transition-colors",
                  children: "Search"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2706,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2699,
                columnNumber: 21
              }, this), f.jsxDEV(lt.div, {
                variants: Kt,
                className: "bg-white/80 dark:bg-zinc-900/20 border border-neutral-200 dark:border-zinc-800/60 rounded-xl overflow-hidden shadow-md dark:shadow-2xl",
                children: [f.jsxDEV("div", {
                  className: "p-6 border-b border-neutral-200 dark:border-zinc-900 bg-neutral-50/50 dark:bg-zinc-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
                  children: [f.jsxDEV("div", {
                    children: [f.jsxDEV("h3", {
                      className: "text-sm font-medium font-display text-neutral-900 dark:text-white",
                      children: "Outbound Recipient Database"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2715,
                      columnNumber: 27
                    }, this), f.jsxDEV("p", {
                      className: "text-xs text-zinc-500 mt-1 font-normal",
                      children: "Spacious real-time record ledger of active tracking sessions with zero developer clutter."
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2716,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2714,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex items-center gap-3",
                    children: [f.jsxDEV("button", {
                      onClick: va,
                      className: "px-4 py-2 text-xs font-normal bg-neutral-900 hover:bg-black dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white rounded-lg border border-neutral-800 dark:border-zinc-700/80 shadow-sm flex items-center gap-2 cursor-pointer transition-all duration-200 active:scale-95 font-mono",
                      children: [f.jsxDEV(HD, {
                        className: "w-3.5 h-3.5 text-neutral-400 dark:text-zinc-300"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2725,
                        columnNumber: 29
                      }, this), "EXPORT PDF REPORT"]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2721,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "text-xs text-zinc-500 font-normal hidden sm:block",
                      children: ["Showing ", sa.length, " tracked session", sa.length !== 1 ? "s" : ""]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2728,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2720,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2713,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "overflow-x-auto",
                  children: f.jsxDEV("table", {
                    className: "w-full text-left border-collapse text-xs",
                    children: [f.jsxDEV("thead", {
                      children: f.jsxDEV("tr", {
                        className: "bg-neutral-100 dark:bg-zinc-950/40 text-zinc-500 text-[10px] uppercase border-b border-neutral-200 dark:border-zinc-900 font-normal tracking-wider",
                        children: [f.jsxDEV("th", {
                          className: "px-6 py-5 font-normal tracking-wider",
                          children: "Recipient Target"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2738,
                          columnNumber: 31
                        }, this), f.jsxDEV("th", {
                          className: "px-6 py-5 font-normal tracking-wider",
                          children: "Status"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2739,
                          columnNumber: 31
                        }, this), f.jsxDEV("th", {
                          className: "px-6 py-5 font-normal tracking-wider",
                          children: "Open Count"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2740,
                          columnNumber: 31
                        }, this), f.jsxDEV("th", {
                          className: "px-6 py-5 font-normal tracking-wider",
                          children: "Dispatch Timestamp"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2741,
                          columnNumber: 31
                        }, this), f.jsxDEV("th", {
                          className: "px-6 py-5 font-normal tracking-wider",
                          children: "Latest Open Confirmation"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2742,
                          columnNumber: 31
                        }, this), f.jsxDEV("th", {
                          className: "px-6 py-5 font-normal tracking-wider text-right",
                          children: "Actions"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 2743,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 2737,
                        columnNumber: 29
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2736,
                      columnNumber: 27
                    }, this), f.jsxDEV("tbody", {
                      className: "divide-y divide-neutral-200 dark:divide-zinc-900/40",
                      children: [(() => {
                        const F = [];
                        for (const ye of eu) {
                          const Be = ye.logs.filter(pt => pt.type === "open").sort((pt, mt) => new Date(pt.timestamp).getTime() - new Date(mt.timestamp).getTime());
                          Be.length === 0 ? F.push({
                            ...ye,
                            displayOpenCount: 0,
                            rowId: ye.id,
                            specificOpenTime: null
                          }) : Be.forEach((pt, mt) => {
                            F.push({
                              ...ye,
                              displayOpenCount: mt + 1,
                              rowId: `${ye.id}-open-${mt}`,
                              specificOpenTime: pt.timestamp
                            });
                          });
                        }
                        return F.sort((ye, Be) => {
                          const pt = ye.specificOpenTime ? new Date(ye.specificOpenTime).getTime() : new Date(ye.createdAt).getTime();
                          return (Be.specificOpenTime ? new Date(Be.specificOpenTime).getTime() : new Date(Be.createdAt).getTime()) - pt;
                        }), F.map(ye => {
                          const Be = {
                              label: ye.displayOpenCount > 0 || ye.status === "opened" ? "Confirmed" : "Pending",
                              badgeClass: ye.displayOpenCount > 0 || ye.status === "opened" ? "text-neutral-900 dark:text-white bg-emerald-500/5 border border-emerald-500/20" : "text-amber-400 bg-amber-500/5 border border-amber-500/20"
                            },
                            pt = !!rt[ye.rowId];
                          Ui(ye);
                          const mt = new Date(ye.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric"
                            }) + ", " + new Date(ye.createdAt).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit"
                            }),
                            Wt = ye.specificOpenTime ? XR(ye.specificOpenTime) : "Not Opened Yet";
                          return f.jsxDEV(Tr.Fragment, {
                            children: [f.jsxDEV("tr", {
                              className: `border-b border-neutral-200/50 dark:border-zinc-900/50 transition-colors ${pt ? "bg-neutral-100/30 dark:bg-zinc-900/10 border-b-0" : "hover:bg-neutral-100/40 dark:hover:bg-zinc-900/10"}`,
                              children: [f.jsxDEV("td", {
                                className: "px-6 py-6",
                                children: [f.jsxDEV("div", {
                                  className: "flex items-center gap-2",
                                  children: [f.jsxDEV("div", {
                                    className: "p-1 bg-white dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800/50 w-6 h-6 inline-flex items-center justify-center rounded-md shadow-sm",
                                    children: uk(ye.recipient, "w-3.5 h-3.5")
                                  }, void 0, !1, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 2789,
                                    columnNumber: 41
                                  }, this), f.jsxDEV("div", {
                                    className: "text-neutral-800 dark:text-zinc-200 font-medium text-sm",
                                    children: ye.recipient
                                  }, void 0, !1, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 2792,
                                    columnNumber: 41
                                  }, this)]
                                }, void 0, !0, {
                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                  lineNumber: 2788,
                                  columnNumber: 39
                                }, this), f.jsxDEV("div", {
                                  className: "text-[11px] text-zinc-500 mt-1 font-normal tracking-tight",
                                  children: ye.subject
                                }, void 0, !1, {
                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                  lineNumber: 2794,
                                  columnNumber: 39
                                }, this)]
                              }, void 0, !0, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 2787,
                                columnNumber: 37
                              }, this), f.jsxDEV("td", {
                                className: "px-6 py-6",
                                children: f.jsxDEV("span", {
                                  className: `inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-normal border ${Be.badgeClass}`,
                                  children: [Be.label === "Confirmed" ? f.jsxDEV(en, {
                                    className: "w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 mr-1",
                                    strokeWidth: 3
                                  }, void 0, !1, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 2801,
                                    columnNumber: 43
                                  }, this) : f.jsxDEV(c5, {
                                    className: "w-3 h-3 text-amber-500 mr-1"
                                  }, void 0, !1, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 2803,
                                    columnNumber: 43
                                  }, this), Be.label]
                                }, void 0, !0, {
                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                  lineNumber: 2799,
                                  columnNumber: 39
                                }, this)
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 2798,
                                columnNumber: 37
                              }, this), f.jsxDEV("td", {
                                className: "px-6 py-6 text-neutral-600 dark:text-zinc-400 font-normal",
                                children: f.jsxDEV("div", {
                                  className: "flex flex-col gap-1.5 justify-center",
                                  children: f.jsxDEV("div", {
                                    children: ye.displayOpenCount > 0 ? f.jsxDEV("span", {
                                      className: "inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-50 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-850 rounded-lg text-[10px] font-mono text-neutral-800 dark:text-zinc-200 shadow-sm select-none whitespace-nowrap",
                                      children: [f.jsxDEV("span", {
                                        className: "font-normal tracking-wide text-neutral-700 dark:text-zinc-300 whitespace-nowrap",
                                        children: [ye.displayOpenCount, ye.displayOpenCount === 1 ? "st" : ye.displayOpenCount === 2 ? "nd" : ye.displayOpenCount === 3 ? "rd" : "th", " time!"]
                                      }, void 0, !0, {
                                        fileName: "/app/applet/src/components/Dashboard.tsx",
                                        lineNumber: 2814,
                                        columnNumber: 47
                                      }, this), ye.linkUrl ? f.jsxDEV(f.Fragment, {
                                        children: [f.jsxDEV("span", {
                                          className: "h-3 w-[1px] bg-neutral-300 dark:bg-zinc-800"
                                        }, void 0, !1, {
                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                          lineNumber: 2819,
                                          columnNumber: 51
                                        }, this), ye.clickCount && ye.clickCount > 0 ? f.jsxDEV("span", {
                                          className: "inline-flex items-center gap-1 text-neutral-700 dark:text-zinc-300 font-normal whitespace-nowrap",
                                          children: [f.jsxDEV(en, {
                                            className: "w-3.5 h-3.5 text-emerald-500",
                                            strokeWidth: 3
                                          }, void 0, !1, {
                                            fileName: "/app/applet/src/components/Dashboard.tsx",
                                            lineNumber: 2822,
                                            columnNumber: 55
                                          }, this), "Link Clicked"]
                                        }, void 0, !0, {
                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                          lineNumber: 2821,
                                          columnNumber: 53
                                        }, this) : f.jsxDEV("span", {
                                          className: "inline-flex items-center gap-1 text-neutral-500 dark:text-zinc-400 font-normal whitespace-nowrap",
                                          children: [f.jsxDEV(jO, {
                                            className: "w-3 h-3 text-neutral-400 dark:text-zinc-500",
                                            strokeWidth: 2.5
                                          }, void 0, !1, {
                                            fileName: "/app/applet/src/components/Dashboard.tsx",
                                            lineNumber: 2827,
                                            columnNumber: 55
                                          }, this), "No Link Clicked"]
                                        }, void 0, !0, {
                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                          lineNumber: 2826,
                                          columnNumber: 53
                                        }, this)]
                                      }, void 0, !0, {
                                        fileName: "/app/applet/src/components/Dashboard.tsx",
                                        lineNumber: 2818,
                                        columnNumber: 49
                                      }, this) : f.jsxDEV(f.Fragment, {
                                        children: [f.jsxDEV("span", {
                                          className: "h-3 w-[1px] bg-neutral-300 dark:bg-zinc-800"
                                        }, void 0, !1, {
                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                          lineNumber: 2834,
                                          columnNumber: 51
                                        }, this), f.jsxDEV("span", {
                                          className: "inline-flex items-center gap-1 text-neutral-450 dark:text-zinc-500 font-normal whitespace-nowrap",
                                          children: [f.jsxDEV(jO, {
                                            className: "w-3 h-3 text-neutral-400 dark:text-zinc-600",
                                            strokeWidth: 2.5
                                          }, void 0, !1, {
                                            fileName: "/app/applet/src/components/Dashboard.tsx",
                                            lineNumber: 2836,
                                            columnNumber: 53
                                          }, this), "No Links Added"]
                                        }, void 0, !0, {
                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                          lineNumber: 2835,
                                          columnNumber: 51
                                        }, this)]
                                      }, void 0, !0, {
                                        fileName: "/app/applet/src/components/Dashboard.tsx",
                                        lineNumber: 2833,
                                        columnNumber: 49
                                      }, this)]
                                    }, void 0, !0, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 2813,
                                      columnNumber: 45
                                    }, this) : f.jsxDEV("span", {
                                      className: "inline-flex items-center px-2.5 py-1.5 bg-neutral-100 dark:bg-zinc-900/40 border border-neutral-200/50 dark:border-zinc-800/40 rounded-lg text-[10px] font-mono text-zinc-400 dark:text-zinc-500",
                                      children: "No Opens"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 2843,
                                      columnNumber: 45
                                    }, this)
                                  }, void 0, !1, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 2811,
                                    columnNumber: 41
                                  }, this)
                                }, void 0, !1, {
                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                  lineNumber: 2810,
                                  columnNumber: 39
                                }, this)
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 2809,
                                columnNumber: 37
                              }, this), f.jsxDEV("td", {
                                className: "px-6 py-6 text-neutral-600 dark:text-zinc-400 font-normal",
                                children: mt
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 2851,
                                columnNumber: 37
                              }, this), f.jsxDEV("td", {
                                className: "px-6 py-6 text-neutral-500 dark:text-zinc-500 font-normal",
                                children: Wt
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 2856,
                                columnNumber: 37
                              }, this), f.jsxDEV("td", {
                                className: "px-6 py-6 text-right whitespace-nowrap",
                                children: f.jsxDEV("div", {
                                  className: "inline-flex items-center gap-3",
                                  children: [f.jsxDEV("button", {
                                    onClick: () => ai(ye.id),
                                    className: "p-2 text-zinc-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded-lg border border-neutral-200 dark:border-zinc-800/40 transition-all cursor-pointer",
                                    title: "Copy Tracking Pixel Snippet",
                                    children: ct === ye.id ? f.jsxDEV(en, {
                                      className: "w-3.5 h-3.5 text-emerald-500"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 2870,
                                      columnNumber: 45
                                    }, this) : f.jsxDEV(Id, {
                                      className: "w-3.5 h-3.5"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 2872,
                                      columnNumber: 45
                                    }, this)
                                  }, void 0, !1, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 2864,
                                    columnNumber: 41
                                  }, this), f.jsxDEV("button", {
                                    onClick: () => {
                                      sn(ye), _t(!0), et("visual");
                                    },
                                    className: "p-2 text-zinc-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded-lg border border-neutral-200 dark:border-zinc-800/40 transition-all cursor-pointer",
                                    title: "Preview Email HTML Content",
                                    children: f.jsxDEV(Fd, {
                                      className: "w-3.5 h-3.5 text-emerald-600 dark:text-neutral-900 dark:text-white"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 2886,
                                      columnNumber: 43
                                    }, this)
                                  }, void 0, !1, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 2877,
                                    columnNumber: 41
                                  }, this), f.jsxDEV("button", {
                                    onClick: () => tu(ye.rowId),
                                    className: "px-3.5 py-1.5 text-xs font-normal border border-neutral-200 dark:border-zinc-800 hover:border-neutral-300 dark:hover:border-zinc-700 bg-neutral-100 dark:bg-zinc-900/40 hover:bg-neutral-200 dark:hover:bg-zinc-900/80 text-neutral-700 dark:text-zinc-300 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm",
                                    children: [f.jsxDEV("span", {
                                      children: "View Timeline"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 2894,
                                      columnNumber: 43
                                    }, this), pt ? f.jsxDEV(FD, {
                                      className: "w-3.5 h-3.5 text-zinc-400"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 2895,
                                      columnNumber: 57
                                    }, this) : f.jsxDEV(Vd, {
                                      className: "w-3.5 h-3.5 text-zinc-400"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 2895,
                                      columnNumber: 111
                                    }, this)]
                                  }, void 0, !0, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 2890,
                                    columnNumber: 41
                                  }, this)]
                                }, void 0, !0, {
                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                  lineNumber: 2862,
                                  columnNumber: 39
                                }, this)
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 2861,
                                columnNumber: 37
                              }, this)]
                            }, void 0, !0, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 2785,
                              columnNumber: 35
                            }, this), pt && f.jsxDEV("tr", {
                              className: "bg-neutral-100/30 dark:bg-zinc-900/10 border-b border-neutral-200/50 dark:border-zinc-900/50",
                              children: f.jsxDEV("td", {
                                colSpan: 6,
                                className: "px-6 pb-6 pt-1",
                                children: f.jsxDEV(lt.div, {
                                  initial: "hidden",
                                  animate: "visible",
                                  exit: "exit",
                                  variants: KR,
                                  className: "overflow-hidden",
                                  children: f.jsxDEV("div", {
                                    className: "max-w-4xl mx-auto bg-white/20 dark:bg-black/20 backdrop-blur-2xl rounded-2xl border border-neutral-200/30 dark:border-zinc-800/40 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden",
                                    children: f.jsxDEV("div", {
                                      className: "relative bg-neutral-50/60 dark:bg-[#0d0d0f]/60 backdrop-blur-3xl p-6 md:p-8 rounded-[14px] border border-white/10 dark:border-zinc-900/30 space-y-6",
                                      children: [f.jsxDEV("div", {
                                        className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/40 dark:border-zinc-800/30 pb-4",
                                        children: [f.jsxDEV("div", {
                                          className: "space-y-0.5",
                                          children: [f.jsxDEV("div", {
                                            className: "text-[10px] uppercase text-neutral-500 dark:text-zinc-400 tracking-[0.18em] font-bold font-mono flex items-center gap-2",
                                            children: [f.jsxDEV("span", {
                                              className: "w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-zinc-500 animate-pulse"
                                            }, void 0, !1, {
                                              fileName: "/app/applet/src/components/Dashboard.tsx",
                                              lineNumber: 2921,
                                              columnNumber: 53
                                            }, this), "TELEMETRY LIFECYCLE"]
                                          }, void 0, !0, {
                                            fileName: "/app/applet/src/components/Dashboard.tsx",
                                            lineNumber: 2920,
                                            columnNumber: 51
                                          }, this), f.jsxDEV("h4", {
                                            className: "text-sm font-bold text-neutral-900 dark:text-zinc-100 flex items-center gap-2 tracking-tight",
                                            children: [f.jsxDEV(Ud, {
                                              className: "w-4 h-4 text-neutral-500 dark:text-zinc-400"
                                            }, void 0, !1, {
                                              fileName: "/app/applet/src/components/Dashboard.tsx",
                                              lineNumber: 2925,
                                              columnNumber: 53
                                            }, this), "Interaction Timeline Map"]
                                          }, void 0, !0, {
                                            fileName: "/app/applet/src/components/Dashboard.tsx",
                                            lineNumber: 2924,
                                            columnNumber: 51
                                          }, this)]
                                        }, void 0, !0, {
                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                          lineNumber: 2919,
                                          columnNumber: 49
                                        }, this), f.jsxDEV("div", {
                                          className: "flex flex-wrap gap-1.5",
                                          children: [f.jsxDEV("span", {
                                            className: "px-2.5 py-0.5 bg-neutral-200/40 dark:bg-zinc-900/50 border border-neutral-300/20 dark:border-zinc-800/40 rounded text-[10px] font-mono text-neutral-600 dark:text-zinc-300",
                                            children: ["TO: ", f.jsxDEV("span", {
                                              className: "font-normal text-neutral-800 dark:text-zinc-100",
                                              children: ye.recipient
                                            }, void 0, !1, {
                                              fileName: "/app/applet/src/components/Dashboard.tsx",
                                              lineNumber: 2932,
                                              columnNumber: 57
                                            }, this)]
                                          }, void 0, !0, {
                                            fileName: "/app/applet/src/components/Dashboard.tsx",
                                            lineNumber: 2931,
                                            columnNumber: 51
                                          }, this), f.jsxDEV("span", {
                                            className: "px-2.5 py-0.5 bg-neutral-900/5 dark:bg-white/5 border border-neutral-200 dark:border-zinc-800/40 rounded text-[10px] font-mono text-neutral-800 dark:text-zinc-200 flex items-center gap-1",
                                            children: [f.jsxDEV(kp, {
                                              className: "w-3 h-3 text-neutral-500"
                                            }, void 0, !1, {
                                              fileName: "/app/applet/src/components/Dashboard.tsx",
                                              lineNumber: 2935,
                                              columnNumber: 53
                                            }, this), "OPENS: ", f.jsxDEV("span", {
                                              className: "font-normal",
                                              children: ye.displayOpenCount || 0
                                            }, void 0, !1, {
                                              fileName: "/app/applet/src/components/Dashboard.tsx",
                                              lineNumber: 2936,
                                              columnNumber: 60
                                            }, this)]
                                          }, void 0, !0, {
                                            fileName: "/app/applet/src/components/Dashboard.tsx",
                                            lineNumber: 2934,
                                            columnNumber: 51
                                          }, this), ye.linkUrl && f.jsxDEV("span", {
                                            className: "px-2.5 py-0.5 text-neutral-900 dark:text-white bg-emerald-500/5 border border-emerald-500/20 rounded-full text-[10px] font-mono flex items-center gap-1 shadow-sm",
                                            children: [f.jsxDEV(en, {
                                              className: "w-3.5 h-3.5 text-emerald-500",
                                              strokeWidth: 3
                                            }, void 0, !1, {
                                              fileName: "/app/applet/src/components/Dashboard.tsx",
                                              lineNumber: 2940,
                                              columnNumber: 55
                                            }, this), "CLICKS: ", f.jsxDEV("span", {
                                              className: "font-normal",
                                              children: ye.clickCount || 0
                                            }, void 0, !1, {
                                              fileName: "/app/applet/src/components/Dashboard.tsx",
                                              lineNumber: 2941,
                                              columnNumber: 63
                                            }, this)]
                                          }, void 0, !0, {
                                            fileName: "/app/applet/src/components/Dashboard.tsx",
                                            lineNumber: 2939,
                                            columnNumber: 53
                                          }, this)]
                                        }, void 0, !0, {
                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                          lineNumber: 2930,
                                          columnNumber: 49
                                        }, this)]
                                      }, void 0, !0, {
                                        fileName: "/app/applet/src/components/Dashboard.tsx",
                                        lineNumber: 2918,
                                        columnNumber: 47
                                      }, this), (() => {
                                        const tr = [...(ye.logs || [])].sort((Nt, vr) => new Date(Nt.timestamp).getTime() - new Date(vr.timestamp).getTime());
                                        let Bn = 0,
                                          bn = 0;
                                        const Nn = {};
                                        return tr.forEach(Nt => {
                                          Nt.type === "click" ? (bn++, Nn[Nt.id] = `Click # ${String(bn).padStart(2, "0")}`) : (Bn++, Nn[Nt.id] = `Open # ${String(Bn).padStart(2, "0")}`);
                                        }), ye.logs && ye.logs.length > 0 ? f.jsxDEV("div", {
                                          className: "overflow-x-auto rounded-xl border border-neutral-200/50 dark:border-zinc-900/60 bg-white/20 dark:bg-zinc-950/20 backdrop-blur-2xl",
                                          children: f.jsxDEV("table", {
                                            className: "w-full text-left text-xs",
                                            children: [f.jsxDEV("thead", {
                                              children: f.jsxDEV("tr", {
                                                className: "border-b border-neutral-200/50 dark:border-zinc-800/50 text-zinc-500 dark:text-zinc-400 bg-neutral-100/30 dark:bg-zinc-900/40 backdrop-blur-md",
                                                children: [f.jsxDEV("th", {
                                                  className: "px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider",
                                                  children: "Sequence / ID"
                                                }, void 0, !1, {
                                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                                  lineNumber: 2968,
                                                  columnNumber: 59
                                                }, this), f.jsxDEV("th", {
                                                  className: "px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider",
                                                  children: "Action / Event"
                                                }, void 0, !1, {
                                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                                  lineNumber: 2969,
                                                  columnNumber: 59
                                                }, this), f.jsxDEV("th", {
                                                  className: "px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider",
                                                  children: "Timestamp"
                                                }, void 0, !1, {
                                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                                  lineNumber: 2970,
                                                  columnNumber: 59
                                                }, this), f.jsxDEV("th", {
                                                  className: "px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider",
                                                  children: "IP Address"
                                                }, void 0, !1, {
                                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                                  lineNumber: 2971,
                                                  columnNumber: 59
                                                }, this), f.jsxDEV("th", {
                                                  className: "px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider",
                                                  children: "Geographic Hub"
                                                }, void 0, !1, {
                                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                                  lineNumber: 2972,
                                                  columnNumber: 59
                                                }, this), f.jsxDEV("th", {
                                                  className: "px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider",
                                                  children: "Device & Browser"
                                                }, void 0, !1, {
                                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                                  lineNumber: 2973,
                                                  columnNumber: 59
                                                }, this), f.jsxDEV("th", {
                                                  className: "px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider text-right",
                                                  children: "Actions"
                                                }, void 0, !1, {
                                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                                  lineNumber: 2974,
                                                  columnNumber: 59
                                                }, this)]
                                              }, void 0, !0, {
                                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                                lineNumber: 2967,
                                                columnNumber: 57
                                              }, this)
                                            }, void 0, !1, {
                                              fileName: "/app/applet/src/components/Dashboard.tsx",
                                              lineNumber: 2966,
                                              columnNumber: 55
                                            }, this), f.jsxDEV("tbody", {
                                              children: ye.logs.map(Nt => {
                                                const vr = Nt.type === "click",
                                                  Rr = Nn[Nt.id] || (vr ? "Click" : "Open");
                                                return f.jsxDEV("tr", {
                                                  className: "border-b border-neutral-200/45 dark:border-zinc-800/35 hover:bg-neutral-50/40 dark:hover:bg-zinc-900/15 transition-colors",
                                                  children: [f.jsxDEV("td", {
                                                    className: "px-4 py-3.5 whitespace-nowrap",
                                                    children: f.jsxDEV("span", {
                                                      className: "font-mono text-[10px] text-neutral-500 dark:text-zinc-400 bg-neutral-100/60 dark:bg-zinc-900/50 border border-neutral-200/40 dark:border-zinc-800/40 px-2.5 py-1 rounded-md select-none",
                                                      children: Rr
                                                    }, void 0, !1, {
                                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                                      lineNumber: 2984,
                                                      columnNumber: 65
                                                    }, this)
                                                  }, void 0, !1, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 2983,
                                                    columnNumber: 63
                                                  }, this), f.jsxDEV("td", {
                                                    className: "px-4 py-3.5 whitespace-nowrap",
                                                    children: vr ? f.jsxDEV("span", {
                                                      className: "inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-emerald-500/20 bg-emerald-500/5 text-neutral-900 dark:text-white shadow-sm",
                                                      children: [f.jsxDEV(en, {
                                                        className: "w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 mr-1",
                                                        strokeWidth: 3
                                                      }, void 0, !1, {
                                                        fileName: "/app/applet/src/components/Dashboard.tsx",
                                                        lineNumber: 2991,
                                                        columnNumber: 69
                                                      }, this), " Link Clicked"]
                                                    }, void 0, !0, {
                                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                                      lineNumber: 2990,
                                                      columnNumber: 67
                                                    }, this) : f.jsxDEV("span", {
                                                      className: "inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-neutral-200/80 dark:border-zinc-800 bg-neutral-100/50 dark:bg-white/5 text-neutral-900 dark:text-white shadow-sm",
                                                      children: [f.jsxDEV(kp, {
                                                        className: "w-3.5 h-3.5 text-neutral-400 dark:text-zinc-400 mr-1"
                                                      }, void 0, !1, {
                                                        fileName: "/app/applet/src/components/Dashboard.tsx",
                                                        lineNumber: 2995,
                                                        columnNumber: 69
                                                      }, this), " Email Open"]
                                                    }, void 0, !0, {
                                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                                      lineNumber: 2994,
                                                      columnNumber: 67
                                                    }, this)
                                                  }, void 0, !1, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 2988,
                                                    columnNumber: 63
                                                  }, this), f.jsxDEV("td", {
                                                    className: "px-4 py-3.5 font-mono text-[10.5px] text-neutral-800 dark:text-zinc-300 whitespace-nowrap",
                                                    children: [f.jsxDEV("span", {
                                                      children: new Date(Nt.timestamp).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        second: "2-digit"
                                                      })
                                                    }, void 0, !1, {
                                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                                      lineNumber: 3e3,
                                                      columnNumber: 65
                                                    }, this), f.jsxDEV("span", {
                                                      className: "text-neutral-400 dark:text-zinc-500 mx-1.5",
                                                      children: "•"
                                                    }, void 0, !1, {
                                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                                      lineNumber: 3001,
                                                      columnNumber: 65
                                                    }, this), f.jsxDEV("span", {
                                                      className: "text-neutral-500 dark:text-zinc-400",
                                                      children: new Date(Nt.timestamp).toLocaleDateString()
                                                    }, void 0, !1, {
                                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                                      lineNumber: 3002,
                                                      columnNumber: 65
                                                    }, this)]
                                                  }, void 0, !0, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 2999,
                                                    columnNumber: 63
                                                  }, this), f.jsxDEV("td", {
                                                    className: "px-4 py-3.5 font-mono text-[11px] text-neutral-700 dark:text-zinc-300 font-normal whitespace-nowrap",
                                                    children: Nt.ip
                                                  }, void 0, !1, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 3004,
                                                    columnNumber: 63
                                                  }, this), f.jsxDEV("td", {
                                                    className: "px-4 py-3.5 text-[11px] text-neutral-800 dark:text-zinc-300 font-normal whitespace-nowrap",
                                                    children: [f.jsxDEV("span", {
                                                      children: Nt.city || "Unknown"
                                                    }, void 0, !1, {
                                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                                      lineNumber: 3008,
                                                      columnNumber: 65
                                                    }, this), Nt.country && f.jsxDEV(f.Fragment, {
                                                      children: [f.jsxDEV("span", {
                                                        className: "text-neutral-400 dark:text-zinc-500 mx-1",
                                                        children: "•"
                                                      }, void 0, !1, {
                                                        fileName: "/app/applet/src/components/Dashboard.tsx",
                                                        lineNumber: 3011,
                                                        columnNumber: 69
                                                      }, this), f.jsxDEV("span", {
                                                        className: "text-neutral-500 dark:text-zinc-400",
                                                        children: Nt.country
                                                      }, void 0, !1, {
                                                        fileName: "/app/applet/src/components/Dashboard.tsx",
                                                        lineNumber: 3012,
                                                        columnNumber: 69
                                                      }, this)]
                                                    }, void 0, !0, {
                                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                                      lineNumber: 3010,
                                                      columnNumber: 67
                                                    }, this)]
                                                  }, void 0, !0, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 3007,
                                                    columnNumber: 63
                                                  }, this), f.jsxDEV("td", {
                                                    className: "px-4 py-3.5 text-[11px] text-neutral-800 dark:text-zinc-300 font-normal whitespace-nowrap",
                                                    children: [f.jsxDEV("span", {
                                                      children: Nt.device || "Desktop"
                                                    }, void 0, !1, {
                                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                                      lineNumber: 3017,
                                                      columnNumber: 65
                                                    }, this), f.jsxDEV("span", {
                                                      className: "text-neutral-400 dark:text-zinc-500 mx-1.5",
                                                      children: "•"
                                                    }, void 0, !1, {
                                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                                      lineNumber: 3018,
                                                      columnNumber: 65
                                                    }, this), f.jsxDEV("span", {
                                                      className: "text-neutral-500 dark:text-zinc-400",
                                                      children: Nt.browser || "Unknown"
                                                    }, void 0, !1, {
                                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                                      lineNumber: 3019,
                                                      columnNumber: 65
                                                    }, this)]
                                                  }, void 0, !0, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 3016,
                                                    columnNumber: 63
                                                  }, this), f.jsxDEV("td", {
                                                    className: "px-4 py-3 text-right",
                                                    children: f.jsxDEV("div", {
                                                      className: "inline-flex items-center gap-1.5 justify-end",
                                                      children: [f.jsxDEV("button", {
                                                        onClick: () => {
                                                          const Na = `[Telemetry Report] Target: ${ye.recipient} | Event: ${Rr} (${vr ? "Link Clicked" : "Email Opened"}) | Timestamp: ${new Date(Nt.timestamp).toLocaleString()} | IP: ${Nt.ip} | City: ${Nt.city || "Unknown"}, Country: ${Nt.country || "N/A"} | Environment: ${Nt.device || "Desktop"} (${Nt.browser || "Unknown"})`;
                                                          navigator.clipboard.writeText(Na), Qn(Nt.id), s("Formatted event telemetry copied to clipboard", "success"), setTimeout(() => Qn(null), 2e3);
                                                        },
                                                        className: "p-1 text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/50 rounded transition-all cursor-pointer",
                                                        title: "Copy event details",
                                                        children: Tt === Nt.id ? f.jsxDEV(en, {
                                                          className: "w-3.5 h-3.5 text-emerald-500",
                                                          strokeWidth: 2
                                                        }, void 0, !1, {
                                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                                          lineNumber: 3035,
                                                          columnNumber: 71
                                                        }, this) : f.jsxDEV(Id, {
                                                          className: "w-3.5 h-3.5"
                                                        }, void 0, !1, {
                                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                                          lineNumber: 3037,
                                                          columnNumber: 71
                                                        }, this)
                                                      }, void 0, !1, {
                                                        fileName: "/app/applet/src/components/Dashboard.tsx",
                                                        lineNumber: 3023,
                                                        columnNumber: 67
                                                      }, this), f.jsxDEV("button", {
                                                        onClick: () => {
                                                          const Na = `${window.location.origin}/share/tracker/${ye.id}`,
                                                            Pn = `[Telemetry Live Signal] ${ye.recipient} - ${Rr} at ${new Date(Nt.timestamp).toLocaleTimeString()}`;
                                                          navigator.share ? navigator.share({
                                                            title: "Tickk Telemetry Update",
                                                            text: Pn,
                                                            url: Na
                                                          }).catch(() => {
                                                            navigator.clipboard.writeText(`${Pn} - ${Na}`), Qn(Nt.id + "_share"), setTimeout(() => Qn(null), 2e3);
                                                          }) : (navigator.clipboard.writeText(`${Pn} - ${Na}`), Qn(Nt.id + "_share"), s("Telemetry share link copied to clipboard", "success"), setTimeout(() => Qn(null), 2e3));
                                                        },
                                                        className: "p-1 text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/50 rounded transition-all cursor-pointer",
                                                        title: "Share event link",
                                                        children: Tt === Nt.id + "_share" ? f.jsxDEV(en, {
                                                          className: "w-3.5 h-3.5 text-emerald-500",
                                                          strokeWidth: 2
                                                        }, void 0, !1, {
                                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                                          lineNumber: 3065,
                                                          columnNumber: 71
                                                        }, this) : f.jsxDEV(Bre, {
                                                          className: "w-3.5 h-3.5"
                                                        }, void 0, !1, {
                                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                                          lineNumber: 3067,
                                                          columnNumber: 71
                                                        }, this)
                                                      }, void 0, !1, {
                                                        fileName: "/app/applet/src/components/Dashboard.tsx",
                                                        lineNumber: 3040,
                                                        columnNumber: 67
                                                      }, this)]
                                                    }, void 0, !0, {
                                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                                      lineNumber: 3022,
                                                      columnNumber: 65
                                                    }, this)
                                                  }, void 0, !1, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 3021,
                                                    columnNumber: 63
                                                  }, this)]
                                                }, Nt.id, !0, {
                                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                                  lineNumber: 2982,
                                                  columnNumber: 62
                                                }, this);
                                              })
                                            }, void 0, !1, {
                                              fileName: "/app/applet/src/components/Dashboard.tsx",
                                              lineNumber: 2977,
                                              columnNumber: 55
                                            }, this)]
                                          }, void 0, !0, {
                                            fileName: "/app/applet/src/components/Dashboard.tsx",
                                            lineNumber: 2965,
                                            columnNumber: 53
                                          }, this)
                                        }, void 0, !1, {
                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                          lineNumber: 2964,
                                          columnNumber: 51
                                        }, this) : f.jsxDEV("div", {
                                          className: "py-8 text-center flex flex-col items-center justify-center bg-white/10 dark:bg-black/10 border border-neutral-200/20 dark:border-zinc-900/30 rounded-xl p-6",
                                          children: [f.jsxDEV("div", {
                                            className: "w-10 h-10 rounded-full bg-neutral-100 dark:bg-zinc-900 border border-neutral-200/40 dark:border-zinc-800/40 flex items-center justify-center mb-2",
                                            children: f.jsxDEV(Ud, {
                                              className: "w-4 h-4 text-neutral-400"
                                            }, void 0, !1, {
                                              fileName: "/app/applet/src/components/Dashboard.tsx",
                                              lineNumber: 3081,
                                              columnNumber: 55
                                            }, this)
                                          }, void 0, !1, {
                                            fileName: "/app/applet/src/components/Dashboard.tsx",
                                            lineNumber: 3080,
                                            columnNumber: 53
                                          }, this), f.jsxDEV("p", {
                                            className: "text-xs text-neutral-700 dark:text-zinc-300 font-normal",
                                            children: "No telemetric records detected"
                                          }, void 0, !1, {
                                            fileName: "/app/applet/src/components/Dashboard.tsx",
                                            lineNumber: 3083,
                                            columnNumber: 53
                                          }, this), f.jsxDEV("p", {
                                            className: "text-[11px] text-neutral-500 dark:text-zinc-500 max-w-sm mt-1 leading-relaxed",
                                            children: "We are actively listening for target pixel payload requests on port 3000. Send a test email to trigger events."
                                          }, void 0, !1, {
                                            fileName: "/app/applet/src/components/Dashboard.tsx",
                                            lineNumber: 3084,
                                            columnNumber: 53
                                          }, this)]
                                        }, void 0, !0, {
                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                          lineNumber: 3079,
                                          columnNumber: 51
                                        }, this);
                                      })()]
                                    }, void 0, !0, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 2915,
                                      columnNumber: 45
                                    }, this)
                                  }, void 0, !1, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 2913,
                                    columnNumber: 43
                                  }, this)
                                }, void 0, !1, {
                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                  lineNumber: 2905,
                                  columnNumber: 41
                                }, this)
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 2904,
                                columnNumber: 39
                              }, this)
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 2903,
                              columnNumber: 37
                            }, this)]
                          }, ye.rowId, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 2784,
                            columnNumber: 35
                          }, this);
                        });
                      })(), sa.length === 0 && f.jsxDEV("tr", {
                        children: f.jsxDEV("td", {
                          colSpan: 5,
                          className: "px-6 py-12 text-center text-zinc-500 font-normal italic",
                          children: "No email trackers registered in your workspace. Use the form above to deploy your first outbound watch."
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3102,
                          columnNumber: 33
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3101,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 2746,
                      columnNumber: 53
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 2735,
                    columnNumber: 25
                  }, this)
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 2734,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 2712,
                columnNumber: 21
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 2632,
              columnNumber: 19
            }, this), c === "link_tracking" && f.jsxDEV("div", {
              className: "space-y-8 animate-fadeIn",
              children: [f.jsxDEV("div", {
                className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
                children: [f.jsxDEV("div", {
                  children: [f.jsxDEV("h2", {
                    className: "text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight",
                    children: "Direct Link Telemetry"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3119,
                    columnNumber: 25
                  }, this), f.jsxDEV("p", {
                    className: "text-xs text-zinc-500 mt-1",
                    children: "Generate and monitor secure redirection links to see exactly when and where your links are clicked."
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3120,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3118,
                  columnNumber: 23
                }, this), f.jsxDEV("button", {
                  onClick: () => ps(!vl),
                  className: "self-start md:self-auto px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 text-neutral-800 dark:text-zinc-200 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5",
                  children: vl ? "Hide Beginner's Guide" : "Show Beginner's Guide"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3123,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 3117,
                columnNumber: 21
              }, this), vl && f.jsxDEV(lt.div, {
                initial: {
                  opacity: 0,
                  y: -10
                },
                animate: {
                  opacity: 1,
                  y: 0
                },
                className: "p-6 bg-blue-50/40 dark:bg-zinc-950/20 border border-blue-200/50 dark:border-zinc-900 rounded-2xl space-y-4",
                children: [f.jsxDEV("div", {
                  className: "flex items-center gap-2",
                  children: [f.jsxDEV("span", {
                    className: "p-1.5 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400",
                    children: f.jsxDEV(gp, {
                      className: "w-4 h-4 animate-pulse"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3140,
                      columnNumber: 29
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3139,
                    columnNumber: 27
                  }, this), f.jsxDEV("h3", {
                    className: "text-sm font-semibold text-neutral-900 dark:text-white",
                    children: "Beginner's Guide: How Direct Link Redirection Works"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3142,
                    columnNumber: 27
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3138,
                  columnNumber: 25
                }, this), f.jsxDEV("div", {
                  className: "grid grid-cols-1 md:grid-cols-4 gap-4 pt-2",
                  children: [f.jsxDEV("div", {
                    className: "space-y-1.5 p-3.5 bg-white/60 dark:bg-zinc-950/30 rounded-xl border border-neutral-200/50 dark:border-zinc-900/60",
                    children: [f.jsxDEV("div", {
                      className: "w-5 h-5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-full flex items-center justify-center font-mono text-[10px] font-bold",
                      children: "1"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3147,
                      columnNumber: 29
                    }, this), f.jsxDEV("h4", {
                      className: "text-xs font-semibold text-neutral-900 dark:text-white",
                      children: "Create a Link"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3148,
                      columnNumber: 29
                    }, this), f.jsxDEV("p", {
                      className: "text-[11px] text-zinc-500 leading-relaxed font-normal",
                      children: ["Go to ", f.jsxDEV("strong", {
                        children: '"Send New Email"'
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3149,
                        columnNumber: 104
                      }, this), " tab, write down your recipient, and input a ", f.jsxDEV("strong", {
                        children: "Redirect Destination URL"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3149,
                        columnNumber: 182
                      }, this), "."]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3149,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3146,
                    columnNumber: 27
                  }, this), f.jsxDEV("div", {
                    className: "space-y-1.5 p-3.5 bg-white/60 dark:bg-zinc-950/30 rounded-xl border border-neutral-200/50 dark:border-zinc-900/60",
                    children: [f.jsxDEV("div", {
                      className: "w-5 h-5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-full flex items-center justify-center font-mono text-[10px] font-bold",
                      children: "2"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3153,
                      columnNumber: 29
                    }, this), f.jsxDEV("h4", {
                      className: "text-xs font-semibold text-neutral-900 dark:text-white",
                      children: "Copy Redirection Link"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3154,
                      columnNumber: 29
                    }, this), f.jsxDEV("p", {
                      className: "text-[11px] text-zinc-500 leading-relaxed font-normal",
                      children: ["Look at your tracked link card below. Click ", f.jsxDEV("strong", {
                        children: "Copy Link"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3155,
                        columnNumber: 142
                      }, this), " to copy our generated secure redirection link."]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3155,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3152,
                    columnNumber: 27
                  }, this), f.jsxDEV("div", {
                    className: "space-y-1.5 p-3.5 bg-white/60 dark:bg-zinc-950/30 rounded-xl border border-neutral-200/50 dark:border-zinc-900/60",
                    children: [f.jsxDEV("div", {
                      className: "w-5 h-5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-full flex items-center justify-center font-mono text-[10px] font-bold",
                      children: "3"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3159,
                      columnNumber: 29
                    }, this), f.jsxDEV("h4", {
                      className: "text-xs font-semibold text-neutral-900 dark:text-white",
                      children: "Insert in Email"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3160,
                      columnNumber: 29
                    }, this), f.jsxDEV("p", {
                      className: "text-[11px] text-zinc-500 leading-relaxed font-normal",
                      children: 'Paste this link as the hyperlink in your email (e.g. Gmail/Outlook) behind text like "Click here to view proposal".'
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3161,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3158,
                    columnNumber: 27
                  }, this), f.jsxDEV("div", {
                    className: "space-y-1.5 p-3.5 bg-white/60 dark:bg-zinc-950/30 rounded-xl border border-neutral-200/50 dark:border-zinc-900/60",
                    children: [f.jsxDEV("div", {
                      className: "w-5 h-5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-full flex items-center justify-center font-mono text-[10px] font-bold",
                      children: "4"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3165,
                      columnNumber: 29
                    }, this), f.jsxDEV("h4", {
                      className: "text-xs font-semibold text-neutral-900 dark:text-white",
                      children: "Watch Live Clicks"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3166,
                      columnNumber: 29
                    }, this), f.jsxDEV("p", {
                      className: "text-[11px] text-zinc-500 leading-relaxed font-normal",
                      children: "When the recipient clicks your link, they are instantly redirected, and we log their browser details instantly!"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3167,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3164,
                    columnNumber: 27
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3145,
                  columnNumber: 25
                }, this), f.jsxDEV("div", {
                  className: "p-3 bg-neutral-100/60 dark:bg-zinc-900/40 rounded-xl border border-neutral-200/40 dark:border-zinc-800/40 text-[11px] text-zinc-600 dark:text-zinc-400",
                  children: ["�� ", f.jsxDEV("strong", {
                    children: "Pro Tip for Testing:"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3172,
                    columnNumber: 30
                  }, this), " You do not need to send a real email to test this! Just click the ", f.jsxDEV("strong", {
                    children: '"⚡ Test Redirection (Simulate Click)"'
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3172,
                    columnNumber: 134
                  }, this), " button on any link card below. This acts exactly as if a real client clicked your link!"]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3171,
                  columnNumber: 25
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 3133,
                columnNumber: 23
              }, this), f.jsxDEV("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
                children: [f.jsxDEV("div", {
                  className: "p-5 bg-white/70 dark:bg-zinc-950/45 backdrop-blur-md border border-neutral-200 dark:border-zinc-900 rounded-2xl flex flex-col justify-between",
                  children: [f.jsxDEV("span", {
                    className: "text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-wider font-mono",
                    children: "Total Tracked Links"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3180,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex items-baseline gap-2 mt-2",
                    children: [f.jsxDEV("span", {
                      className: "text-3xl font-bold font-display text-neutral-900 dark:text-white",
                      children: g.filter(F => F.linkUrl).length
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3182,
                      columnNumber: 27
                    }, this), f.jsxDEV("span", {
                      className: "text-[10px] text-zinc-400 font-mono font-medium",
                      children: "Outbound redirects"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3185,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3181,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3179,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "p-5 bg-white/70 dark:bg-zinc-950/45 backdrop-blur-md border border-neutral-200 dark:border-zinc-900 rounded-2xl flex flex-col justify-between",
                  children: [f.jsxDEV("span", {
                    className: "text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-wider font-mono",
                    children: "Total Link Clicks"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3190,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex items-baseline gap-2 mt-2",
                    children: [f.jsxDEV("span", {
                      className: "text-3xl font-bold font-display text-emerald-600 dark:text-neutral-900 dark:text-white",
                      children: g.filter(F => F.linkUrl).reduce((F, ye) => F + (ye.clickCount || 0), 0)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3192,
                      columnNumber: 27
                    }, this), f.jsxDEV("span", {
                      className: "text-[10px] text-emerald-500 font-mono font-medium animate-pulse",
                      children: "● Live Signal feed"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3195,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3191,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3189,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "p-5 bg-white/70 dark:bg-zinc-950/45 backdrop-blur-md border border-neutral-200 dark:border-zinc-900 rounded-2xl flex flex-col justify-between",
                  children: [f.jsxDEV("span", {
                    className: "text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-wider font-mono",
                    children: "Click-Through CTR"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3200,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex items-baseline gap-2 mt-2",
                    children: [f.jsxDEV("span", {
                      className: "text-3xl font-bold font-display text-neutral-900 dark:text-white",
                      children: (() => {
                        const F = g.filter(Be => Be.linkUrl);
                        return F.length === 0 ? "0.0%" : `${(F.filter(Be => Be.clickCount > 0).length / F.length * 100).toFixed(1)}%`;
                      })()
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3202,
                      columnNumber: 27
                    }, this), f.jsxDEV("span", {
                      className: "text-[10px] text-zinc-400 font-mono font-medium",
                      children: "Conversion index"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3210,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3201,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3199,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "p-5 bg-white/70 dark:bg-zinc-950/45 backdrop-blur-md border border-neutral-200 dark:border-zinc-900 rounded-2xl flex flex-col justify-between",
                  children: [f.jsxDEV("span", {
                    className: "text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-wider font-mono",
                    children: "Redirection Latency"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3215,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex items-baseline gap-2 mt-2",
                    children: [f.jsxDEV("span", {
                      className: "text-3xl font-bold font-display text-emerald-500 dark:text-neutral-900 dark:text-white",
                      children: "< 0.08s"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3217,
                      columnNumber: 27
                    }, this), f.jsxDEV("span", {
                      className: "text-[10px] text-zinc-400 font-mono font-medium",
                      children: "Instant handshakes"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3220,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3216,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3214,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 3178,
                columnNumber: 21
              }, this), f.jsxDEV(lt.div, {
                variants: Kt,
                className: "p-4 bg-white/70 dark:bg-zinc-950/45 backdrop-blur-md border border-neutral-200 dark:border-zinc-900 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4",
                children: [f.jsxDEV("div", {
                  className: "relative w-full sm:max-w-md",
                  children: f.jsxDEV("input", {
                    type: "text",
                    value: wr,
                    onChange: F => Kc(F.target.value),
                    placeholder: "Search links by campaign or recipient...",
                    className: "w-full px-3.5 py-2 text-xs bg-neutral-50 dark:bg-[#050506] text-neutral-900 dark:text-white border border-neutral-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-neutral-300 dark:focus:border-zinc-700 transition-colors font-normal"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3228,
                    columnNumber: 25
                  }, this)
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3227,
                  columnNumber: 23
                }, this), f.jsxDEV("button", {
                  onClick: () => {
                    u("tracking");
                  },
                  className: "w-full sm:w-auto px-4 py-2 bg-neutral-900 hover:bg-neutral-850 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-neutral-900 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer",
                  children: [f.jsxDEV(d5, {
                    className: "w-3.5 h-3.5"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3243,
                    columnNumber: 25
                  }, this), " Setup a New Tracked Link"]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3237,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 3226,
                columnNumber: 21
              }, this), f.jsxDEV("div", {
                className: "bg-white dark:bg-[#09090b] text-neutral-900 dark:text-zinc-100 border border-neutral-200 dark:border-zinc-800/90 rounded-xl overflow-hidden shadow-md dark:shadow-2xl relative",
                children: [f.jsxDEV("div", {
                  className: "p-6 border-b border-neutral-200 dark:border-zinc-800 bg-neutral-50/50 dark:bg-[#0d0d11]/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4",
                  children: [f.jsxDEV("div", {
                    children: [f.jsxDEV("h3", {
                      className: "text-sm font-semibold font-display text-neutral-900 dark:text-white",
                      children: "Active Redirection Database"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3251,
                      columnNumber: 27
                    }, this), f.jsxDEV("p", {
                      className: "text-xs text-neutral-500 dark:text-zinc-400 mt-1 font-normal",
                      children: "Spacious real-time record ledger of active link redirection redirects and captured telemetry clicks."
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3252,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3250,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "text-xs text-neutral-500 dark:text-zinc-400 font-normal bg-neutral-100 dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800 px-2.5 py-1 rounded-md",
                    children: ["Showing ", g.filter(F => F.linkUrl).length, " redirect link", g.filter(F => F.linkUrl).length !== 1 ? "s" : ""]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3256,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3249,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "w-full overflow-hidden",
                  children: f.jsxDEV("table", {
                    className: "w-full text-left border-collapse text-xs",
                    children: [f.jsxDEV("thead", {
                      children: f.jsxDEV("tr", {
                        className: "bg-neutral-50/50 dark:bg-[#121216] text-neutral-500 dark:text-zinc-400 text-[10px] uppercase border-b border-neutral-200 dark:border-zinc-800 font-normal tracking-wider",
                        children: [f.jsxDEV("th", {
                          className: "px-4 py-4 font-normal tracking-wider",
                          children: "Recipient Target"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3265,
                          columnNumber: 31
                        }, this), f.jsxDEV("th", {
                          className: "px-4 py-4 font-normal tracking-wider",
                          children: "Campaign/Subject"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3266,
                          columnNumber: 31
                        }, this), f.jsxDEV("th", {
                          className: "px-4 py-4 font-normal tracking-wider",
                          children: "Destination URL"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3267,
                          columnNumber: 31
                        }, this), f.jsxDEV("th", {
                          className: "px-4 py-4 font-normal tracking-wider",
                          children: "Clicks Captured"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3268,
                          columnNumber: 31
                        }, this), f.jsxDEV("th", {
                          className: "px-4 py-4 font-normal tracking-wider",
                          children: "Dispatch Date"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3269,
                          columnNumber: 31
                        }, this), f.jsxDEV("th", {
                          className: "px-4 py-4 font-normal tracking-wider",
                          children: "Latest Click Confirmation"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3270,
                          columnNumber: 31
                        }, this), f.jsxDEV("th", {
                          className: "px-4 py-4 font-normal tracking-wider text-right",
                          children: "Actions"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3271,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3264,
                        columnNumber: 29
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3263,
                      columnNumber: 27
                    }, this), f.jsxDEV("tbody", {
                      className: "divide-y divide-neutral-200/50 dark:divide-zinc-850/40",
                      children: (() => {
                        const F = g.filter(Be => Be.linkUrl && (Be.subject.toLowerCase().includes(wr.toLowerCase()) || Be.recipient.toLowerCase().includes(wr.toLowerCase()))),
                          ye = [];
                        for (const Be of F) {
                          const pt = Be.logs.filter(mt => mt.type === "click").sort((mt, Wt) => new Date(mt.timestamp).getTime() - new Date(Wt.timestamp).getTime());
                          pt.length === 0 ? ye.push({
                            ...Be,
                            displayClickCount: 0,
                            rowId: Be.id,
                            specificClickTime: null,
                            specificLog: null
                          }) : pt.forEach((mt, Wt) => {
                            ye.push({
                              ...Be,
                              displayClickCount: Wt + 1,
                              rowId: `${Be.id}-click-${Wt}`,
                              specificClickTime: mt.timestamp,
                              specificLog: mt
                            });
                          });
                        }
                        return ye.sort((Be, pt) => {
                          const mt = Be.specificClickTime ? new Date(Be.specificClickTime).getTime() : new Date(Be.createdAt).getTime();
                          return (pt.specificClickTime ? new Date(pt.specificClickTime).getTime() : new Date(pt.createdAt).getTime()) - mt;
                        }), ye.map(Be => {
                          const pt = `${window.location.origin || "https://tickk.io"}/api/track/${Be.id}/click?url=${encodeURIComponent(Be.linkUrl || "")}`,
                            mt = ao === Be.rowId,
                            Wt = new Date(Be.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric"
                            }) + ", " + new Date(Be.createdAt).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit"
                            }),
                            tr = Be.specificClickTime ? XR(Be.specificClickTime) : "Not Clicked Yet";
                          return f.jsxDEV(Tr.Fragment, {
                            children: [f.jsxDEV("tr", {
                              className: `border-b border-neutral-200/50 dark:border-zinc-800/40 transition-colors ${mt ? "bg-neutral-50 dark:bg-zinc-950/40 border-b-0" : "hover:bg-neutral-50/50 dark:hover:bg-zinc-850/30"}`,
                              children: [f.jsxDEV("td", {
                                className: "px-4 py-4 whitespace-nowrap",
                                children: f.jsxDEV("div", {
                                  className: "flex items-center gap-2",
                                  children: [f.jsxDEV("div", {
                                    className: "p-1 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 w-6 h-6 inline-flex items-center justify-center rounded-md shadow-sm shrink-0",
                                    children: uk(Be.recipient, "w-3.5 h-3.5")
                                  }, void 0, !1, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 3326,
                                    columnNumber: 43
                                  }, this), f.jsxDEV("div", {
                                    className: "text-neutral-900 dark:text-zinc-100 font-medium text-xs max-w-[150px] truncate",
                                    title: Be.recipient,
                                    children: Be.recipient
                                  }, void 0, !1, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 3329,
                                    columnNumber: 43
                                  }, this)]
                                }, void 0, !0, {
                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                  lineNumber: 3325,
                                  columnNumber: 41
                                }, this)
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 3324,
                                columnNumber: 39
                              }, this), f.jsxDEV("td", {
                                className: "px-4 py-4 whitespace-nowrap",
                                children: f.jsxDEV("span", {
                                  className: "text-neutral-700 dark:text-zinc-200 font-medium text-xs max-w-[150px] block truncate",
                                  title: Be.subject,
                                  children: Be.subject
                                }, void 0, !1, {
                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                  lineNumber: 3335,
                                  columnNumber: 41
                                }, this)
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 3334,
                                columnNumber: 39
                              }, this), f.jsxDEV("td", {
                                className: "px-4 py-4 max-w-[180px] truncate",
                                children: f.jsxDEV("a", {
                                  href: Be.linkUrl,
                                  target: "_blank",
                                  rel: "referrer",
                                  className: "text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:underline inline-flex items-center gap-1 font-normal truncate max-w-full",
                                  title: Be.linkUrl,
                                  children: [Be.linkUrl, " ", f.jsxDEV(SO, {
                                    className: "w-3 h-3 shrink-0"
                                  }, void 0, !1, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 3341,
                                    columnNumber: 61
                                  }, this)]
                                }, void 0, !0, {
                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                  lineNumber: 3340,
                                  columnNumber: 41
                                }, this)
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 3339,
                                columnNumber: 39
                              }, this), f.jsxDEV("td", {
                                className: "px-4 py-4 whitespace-nowrap",
                                children: Be.displayClickCount > 0 ? f.jsxDEV("span", {
                                  className: "inline-flex items-center px-2.5 py-1 bg-emerald-500/5 border border-emerald-500/20 text-neutral-900 dark:text-white text-[10px] font-normal rounded-lg shadow-sm",
                                  children: [f.jsxDEV(en, {
                                    className: "w-3.5 h-3.5 text-emerald-500 mr-1 shrink-0",
                                    strokeWidth: 3
                                  }, void 0, !1, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 3349,
                                    columnNumber: 45
                                  }, this), f.jsxDEV("span", {
                                    children: ["Confirmed ", Be.displayClickCount, Be.displayClickCount === 1 ? "st" : Be.displayClickCount === 2 ? "nd" : Be.displayClickCount === 3 ? "rd" : "th", " Click!"]
                                  }, void 0, !0, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 3350,
                                    columnNumber: 45
                                  }, this)]
                                }, void 0, !0, {
                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                  lineNumber: 3348,
                                  columnNumber: 43
                                }, this) : f.jsxDEV("span", {
                                  className: "inline-flex items-center px-2.5 py-1 bg-amber-500/5 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-normal rounded-lg",
                                  children: [f.jsxDEV(c5, {
                                    className: "w-3 h-3 text-amber-500 mr-1 shrink-0"
                                  }, void 0, !1, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 3354,
                                    columnNumber: 45
                                  }, this), f.jsxDEV("span", {
                                    children: "Pending Click"
                                  }, void 0, !1, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 3355,
                                    columnNumber: 45
                                  }, this)]
                                }, void 0, !0, {
                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                  lineNumber: 3353,
                                  columnNumber: 43
                                }, this)
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 3346,
                                columnNumber: 39
                              }, this), f.jsxDEV("td", {
                                className: "px-4 py-4 text-neutral-500 dark:text-zinc-400 font-normal text-xs whitespace-nowrap",
                                children: Wt
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 3361,
                                columnNumber: 39
                              }, this), f.jsxDEV("td", {
                                className: "px-4 py-4 text-neutral-500 dark:text-zinc-400 font-normal text-xs whitespace-nowrap",
                                children: tr
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 3366,
                                columnNumber: 39
                              }, this), f.jsxDEV("td", {
                                className: "px-4 py-4 text-right whitespace-nowrap",
                                children: f.jsxDEV("div", {
                                  className: "inline-flex items-center gap-3",
                                  children: [f.jsxDEV("button", {
                                    onClick: () => {
                                      navigator.clipboard.writeText(pt), Oa(Be.rowId), setTimeout(() => Oa(null), 1500);
                                    },
                                    className: "p-1.5 text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded-lg border border-neutral-200 dark:border-zinc-800 transition-all cursor-pointer",
                                    title: "Copy Redirection Link",
                                    children: pc === Be.rowId ? f.jsxDEV(en, {
                                      className: "w-3 h-3.5 text-emerald-600 dark:text-emerald-400"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 3384,
                                      columnNumber: 47
                                    }, this) : f.jsxDEV(Id, {
                                      className: "w-3 h-3.5"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 3386,
                                      columnNumber: 47
                                    }, this)
                                  }, void 0, !1, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 3374,
                                    columnNumber: 43
                                  }, this), f.jsxDEV("button", {
                                    onClick: () => fc(mt ? null : Be.rowId),
                                    className: "px-2.5 py-1.5 text-xs font-normal border border-neutral-200 dark:border-zinc-850 hover:border-neutral-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-neutral-50 dark:hover:bg-zinc-800 text-neutral-700 dark:text-zinc-300 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1 shadow-sm",
                                    children: [f.jsxDEV("span", {
                                      children: "View Timeline"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 3395,
                                      columnNumber: 45
                                    }, this), mt ? f.jsxDEV(FD, {
                                      className: "w-3 h-3 text-neutral-400 dark:text-zinc-400"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 3396,
                                      columnNumber: 59
                                    }, this) : f.jsxDEV(Vd, {
                                      className: "w-3 h-3 text-neutral-400 dark:text-zinc-400"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 3396,
                                      columnNumber: 131
                                    }, this)]
                                  }, void 0, !0, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 3391,
                                    columnNumber: 43
                                  }, this)]
                                }, void 0, !0, {
                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                  lineNumber: 3372,
                                  columnNumber: 41
                                }, this)
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 3371,
                                columnNumber: 39
                              }, this)]
                            }, void 0, !0, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 3322,
                              columnNumber: 37
                            }, this), mt && f.jsxDEV("tr", {
                              className: "bg-neutral-50/50 dark:bg-zinc-950/40 border-b border-neutral-200/50 dark:border-zinc-800/40",
                              children: f.jsxDEV("td", {
                                colSpan: 7,
                                className: "px-6 pb-6 pt-1",
                                children: f.jsxDEV(lt.div, {
                                  initial: "hidden",
                                  animate: "visible",
                                  exit: "exit",
                                  variants: KR,
                                  className: "overflow-hidden",
                                  children: f.jsxDEV("div", {
                                    className: "bg-white/40 dark:bg-black/20 backdrop-blur-xl rounded-2xl border border-neutral-200/50 dark:border-zinc-800/20 p-6 space-y-4 relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]",
                                    children: [f.jsxDEV("div", {
                                      className: "absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 3414,
                                      columnNumber: 47
                                    }, this), f.jsxDEV("div", {
                                      className: "absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 blur-[80px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 3415,
                                      columnNumber: 47
                                    }, this), f.jsxDEV("div", {
                                      className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/50 dark:border-zinc-800/40",
                                      children: [f.jsxDEV("h4", {
                                        className: "text-[10px] uppercase tracking-wider text-neutral-500 dark:text-zinc-400 font-mono flex items-center gap-2",
                                        children: [f.jsxDEV(Ud, {
                                          className: "w-3.5 h-3.5 text-neutral-400 dark:text-zinc-400"
                                        }, void 0, !1, {
                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                          lineNumber: 3419,
                                          columnNumber: 51
                                        }, this), " Live Redirection Timelines"]
                                      }, void 0, !0, {
                                        fileName: "/app/applet/src/components/Dashboard.tsx",
                                        lineNumber: 3418,
                                        columnNumber: 49
                                      }, this), f.jsxDEV("div", {
                                        className: "flex items-center gap-3",
                                        children: [f.jsxDEV("span", {
                                          className: "text-[10px] text-neutral-500 dark:text-zinc-400 font-mono",
                                          children: "Redirection Link:"
                                        }, void 0, !1, {
                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                          lineNumber: 3422,
                                          columnNumber: 51
                                        }, this), f.jsxDEV("div", {
                                          className: "flex items-center gap-1.5 bg-neutral-100 dark:bg-[#030303]/60 px-2.5 py-1 rounded border border-neutral-200 dark:border-zinc-850 max-w-xs sm:max-w-md",
                                          children: [f.jsxDEV("span", {
                                            className: "font-mono text-[9px] text-emerald-600 dark:text-emerald-400 truncate select-all",
                                            children: pt
                                          }, void 0, !1, {
                                            fileName: "/app/applet/src/components/Dashboard.tsx",
                                            lineNumber: 3426,
                                            columnNumber: 53
                                          }, this), f.jsxDEV("button", {
                                            onClick: () => {
                                              navigator.clipboard.writeText(pt), Oa(Be.rowId), setTimeout(() => Oa(null), 1500);
                                            },
                                            className: "text-neutral-400 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white p-0.5 rounded cursor-pointer transition-colors",
                                            title: "Copy link",
                                            children: pc === Be.rowId ? f.jsxDEV(en, {
                                              className: "w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400"
                                            }, void 0, !1, {
                                              fileName: "/app/applet/src/components/Dashboard.tsx",
                                              lineNumber: 3436,
                                              columnNumber: 89
                                            }, this) : f.jsxDEV(Id, {
                                              className: "w-3.5 h-3.5"
                                            }, void 0, !1, {
                                              fileName: "/app/applet/src/components/Dashboard.tsx",
                                              lineNumber: 3436,
                                              columnNumber: 164
                                            }, this)
                                          }, void 0, !1, {
                                            fileName: "/app/applet/src/components/Dashboard.tsx",
                                            lineNumber: 3427,
                                            columnNumber: 53
                                          }, this)]
                                        }, void 0, !0, {
                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                          lineNumber: 3425,
                                          columnNumber: 51
                                        }, this)]
                                      }, void 0, !0, {
                                        fileName: "/app/applet/src/components/Dashboard.tsx",
                                        lineNumber: 3421,
                                        columnNumber: 49
                                      }, this)]
                                    }, void 0, !0, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 3417,
                                      columnNumber: 47
                                    }, this), (() => {
                                      const Bn = Be.logs.filter(bn => bn.type === "click").sort((bn, Nn) => new Date(bn.timestamp).getTime() - new Date(Nn.timestamp).getTime());
                                      return Bn.length > 0 ? f.jsxDEV("div", {
                                        className: "overflow-x-auto rounded-xl border border-neutral-200/50 dark:border-zinc-800/45 bg-white/40 dark:bg-zinc-950/20 shadow-sm",
                                        children: f.jsxDEV("table", {
                                          className: "w-full min-w-[800px] text-left text-xs border-collapse",
                                          children: [f.jsxDEV("thead", {
                                            children: f.jsxDEV("tr", {
                                              className: "border-b border-neutral-200/50 dark:border-zinc-800 text-neutral-500 dark:text-zinc-400 bg-neutral-100/30 dark:bg-zinc-900/30 backdrop-blur-md",
                                              children: [f.jsxDEV("th", {
                                                className: "px-4 py-3 font-mono text-[9px] uppercase font-normal tracking-wider",
                                                children: "Sequence / ID"
                                              }, void 0, !1, {
                                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                                lineNumber: 3450,
                                                columnNumber: 59
                                              }, this), f.jsxDEV("th", {
                                                className: "px-4 py-3 font-mono text-[9px] uppercase font-normal tracking-wider",
                                                children: "Action / Event"
                                              }, void 0, !1, {
                                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                                lineNumber: 3451,
                                                columnNumber: 59
                                              }, this), f.jsxDEV("th", {
                                                className: "px-4 py-3 font-mono text-[9px] uppercase font-normal tracking-wider",
                                                children: "Timestamp"
                                              }, void 0, !1, {
                                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                                lineNumber: 3452,
                                                columnNumber: 59
                                              }, this), f.jsxDEV("th", {
                                                className: "px-4 py-3 font-mono text-[9px] uppercase font-normal tracking-wider",
                                                children: "IP Address"
                                              }, void 0, !1, {
                                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                                lineNumber: 3453,
                                                columnNumber: 59
                                              }, this), f.jsxDEV("th", {
                                                className: "px-4 py-3 font-mono text-[9px] uppercase font-normal tracking-wider",
                                                children: "Geographic Hub"
                                              }, void 0, !1, {
                                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                                lineNumber: 3454,
                                                columnNumber: 59
                                              }, this), f.jsxDEV("th", {
                                                className: "px-4 py-3 font-mono text-[9px] uppercase font-normal tracking-wider",
                                                children: "Device & Browser"
                                              }, void 0, !1, {
                                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                                lineNumber: 3455,
                                                columnNumber: 59
                                              }, this)]
                                            }, void 0, !0, {
                                              fileName: "/app/applet/src/components/Dashboard.tsx",
                                              lineNumber: 3449,
                                              columnNumber: 57
                                            }, this)
                                          }, void 0, !1, {
                                            fileName: "/app/applet/src/components/Dashboard.tsx",
                                            lineNumber: 3448,
                                            columnNumber: 55
                                          }, this), f.jsxDEV("tbody", {
                                            children: Bn.map((bn, Nn) => {
                                              const Nt = `Click # ${String(Nn + 1).padStart(2, "0")}`;
                                              return f.jsxDEV("tr", {
                                                className: "border-b border-neutral-100 dark:border-zinc-900 hover:bg-neutral-50/50 dark:hover:bg-zinc-900/40 transition-colors",
                                                children: [f.jsxDEV("td", {
                                                  className: "px-4 py-3.5 whitespace-nowrap",
                                                  children: f.jsxDEV("span", {
                                                    className: "font-mono text-[10px] text-neutral-500 dark:text-zinc-400 bg-neutral-100 dark:bg-zinc-900/40 border border-neutral-200 dark:border-zinc-800/60 px-2.5 py-1 rounded-md select-none",
                                                    children: Nt
                                                  }, void 0, !1, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 3464,
                                                    columnNumber: 65
                                                  }, this)
                                                }, void 0, !1, {
                                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                                  lineNumber: 3463,
                                                  columnNumber: 63
                                                }, this), f.jsxDEV("td", {
                                                  className: "px-4 py-3.5 whitespace-nowrap",
                                                  children: f.jsxDEV("span", {
                                                    className: "inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-emerald-500/20 dark:border-emerald-500/10 bg-emerald-500/10 dark:bg-emerald-500/5 text-neutral-900 dark:text-white shadow-sm",
                                                    children: [f.jsxDEV(en, {
                                                      className: "w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 mr-1",
                                                      strokeWidth: 3
                                                    }, void 0, !1, {
                                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                                      lineNumber: 3470,
                                                      columnNumber: 67
                                                    }, this), " Link Clicked"]
                                                  }, void 0, !0, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 3469,
                                                    columnNumber: 65
                                                  }, this)
                                                }, void 0, !1, {
                                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                                  lineNumber: 3468,
                                                  columnNumber: 63
                                                }, this), f.jsxDEV("td", {
                                                  className: "px-4 py-3.5 font-mono text-[10.5px] text-neutral-700 dark:text-zinc-300 whitespace-nowrap",
                                                  children: [f.jsxDEV("span", {
                                                    children: new Date(bn.timestamp).toLocaleTimeString([], {
                                                      hour: "2-digit",
                                                      minute: "2-digit",
                                                      second: "2-digit"
                                                    })
                                                  }, void 0, !1, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 3474,
                                                    columnNumber: 65
                                                  }, this), f.jsxDEV("span", {
                                                    className: "text-neutral-400 dark:text-zinc-650 mx-1.5",
                                                    children: "•"
                                                  }, void 0, !1, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 3475,
                                                    columnNumber: 65
                                                  }, this), f.jsxDEV("span", {
                                                    className: "text-neutral-500 dark:text-zinc-400",
                                                    children: new Date(bn.timestamp).toLocaleDateString()
                                                  }, void 0, !1, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 3476,
                                                    columnNumber: 65
                                                  }, this)]
                                                }, void 0, !0, {
                                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                                  lineNumber: 3473,
                                                  columnNumber: 63
                                                }, this), f.jsxDEV("td", {
                                                  className: "px-4 py-3.5 font-mono text-[11px] text-neutral-700 dark:text-zinc-300 font-normal whitespace-nowrap",
                                                  children: bn.ip
                                                }, void 0, !1, {
                                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                                  lineNumber: 3478,
                                                  columnNumber: 63
                                                }, this), f.jsxDEV("td", {
                                                  className: "px-4 py-3.5 text-[11px] text-neutral-700 dark:text-zinc-300 font-normal whitespace-nowrap",
                                                  children: [f.jsxDEV("span", {
                                                    children: bn.city || "Unknown"
                                                  }, void 0, !1, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 3482,
                                                    columnNumber: 65
                                                  }, this), bn.country && f.jsxDEV(f.Fragment, {
                                                    children: [f.jsxDEV("span", {
                                                      className: "text-neutral-400 dark:text-zinc-500 mx-1",
                                                      children: "•"
                                                    }, void 0, !1, {
                                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                                      lineNumber: 3485,
                                                      columnNumber: 69
                                                    }, this), f.jsxDEV("span", {
                                                      className: "text-neutral-500 dark:text-zinc-400",
                                                      children: bn.country
                                                    }, void 0, !1, {
                                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                                      lineNumber: 3486,
                                                      columnNumber: 69
                                                    }, this)]
                                                  }, void 0, !0, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 3484,
                                                    columnNumber: 67
                                                  }, this)]
                                                }, void 0, !0, {
                                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                                  lineNumber: 3481,
                                                  columnNumber: 63
                                                }, this), f.jsxDEV("td", {
                                                  className: "px-4 py-3.5 text-[11px] text-neutral-500 dark:text-zinc-400 font-normal whitespace-nowrap",
                                                  children: [f.jsxDEV("span", {
                                                    children: bn.device || "Desktop"
                                                  }, void 0, !1, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 3491,
                                                    columnNumber: 65
                                                  }, this), f.jsxDEV("span", {
                                                    className: "text-neutral-400 dark:text-zinc-500 mx-1.5",
                                                    children: "•"
                                                  }, void 0, !1, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 3492,
                                                    columnNumber: 65
                                                  }, this), f.jsxDEV("span", {
                                                    className: "text-neutral-500 dark:text-zinc-400",
                                                    children: bn.browser || "Unknown"
                                                  }, void 0, !1, {
                                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                                    lineNumber: 3493,
                                                    columnNumber: 65
                                                  }, this)]
                                                }, void 0, !0, {
                                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                                  lineNumber: 3490,
                                                  columnNumber: 63
                                                }, this)]
                                              }, bn.id, !0, {
                                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                                lineNumber: 3462,
                                                columnNumber: 61
                                              }, this);
                                            })
                                          }, void 0, !1, {
                                            fileName: "/app/applet/src/components/Dashboard.tsx",
                                            lineNumber: 3458,
                                            columnNumber: 55
                                          }, this)]
                                        }, void 0, !0, {
                                          fileName: "/app/applet/src/components/Dashboard.tsx",
                                          lineNumber: 3447,
                                          columnNumber: 53
                                        }, this)
                                      }, void 0, !1, {
                                        fileName: "/app/applet/src/components/Dashboard.tsx",
                                        lineNumber: 3446,
                                        columnNumber: 51
                                      }, this) : f.jsxDEV("div", {
                                        className: "p-6 text-center text-zinc-500 italic font-normal text-xs font-sans",
                                        children: "No click signals captured yet. Send the email and wait for clicks to register."
                                      }, void 0, !1, {
                                        fileName: "/app/applet/src/components/Dashboard.tsx",
                                        lineNumber: 3502,
                                        columnNumber: 51
                                      }, this);
                                    })()]
                                  }, void 0, !0, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 3413,
                                    columnNumber: 45
                                  }, this)
                                }, void 0, !1, {
                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                  lineNumber: 3406,
                                  columnNumber: 43
                                }, this)
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 3405,
                                columnNumber: 41
                              }, this)
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 3404,
                              columnNumber: 39
                            }, this)]
                          }, Be.rowId, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3321,
                            columnNumber: 35
                          }, this);
                        });
                      })()
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3274,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3262,
                    columnNumber: 25
                  }, this)
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3261,
                  columnNumber: 23
                }, this), g.filter(F => F.linkUrl).length === 0 && f.jsxDEV("div", {
                  className: "py-12 bg-white/40 dark:bg-zinc-900/20 rounded-b-2xl border-t border-neutral-200 dark:border-zinc-800/80 text-center text-zinc-500 italic font-normal text-xs font-sans",
                  children: "No redirect links configured. Email Trackers with redirect links will automatically register telemetry trackers inside this workspace."
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3521,
                  columnNumber: 25
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 3248,
                columnNumber: 21
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 3116,
              columnNumber: 19
            }, this), c === "performance" && f.jsxDEV("div", {
              className: "space-y-8 animate-fadeIn",
              children: [f.jsxDEV("div", {
                className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4",
                children: [f.jsxDEV("div", {
                  children: [f.jsxDEV("h2", {
                    className: "text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight",
                    children: "Performance Intelligence"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3534,
                    columnNumber: 25
                  }, this), f.jsxDEV("p", {
                    className: "text-xs text-zinc-500 mt-1",
                    children: "Detailed usage analytics mapping outbound correspondence against verification success rates."
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3535,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3533,
                  columnNumber: 23
                }, this), f.jsxDEV("button", {
                  onClick: v,
                  className: "flex items-center justify-center gap-2 px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-[13px] rounded-xl hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_24px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5 active:translate-y-0 group",
                  children: [f.jsxDEV(HD, {
                    className: "w-4 h-4 group-hover:scale-110 transition-transform"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3541,
                    columnNumber: 25
                  }, this), "Download Report"]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3537,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 3532,
                columnNumber: 21
              }, this), f.jsxDEV(lt.div, {
                variants: Kt,
                className: Bo + " mb-8",
                children: [f.jsxDEV("div", {
                  className: "absolute top-0 right-0 p-5 flex gap-3",
                  children: [f.jsxDEV("span", {
                    className: "flex items-center gap-1.5 text-[10px] uppercase tracking-wider bg-black/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-200 font-bold px-3 py-1.5 rounded-full font-mono backdrop-blur-md border border-black/5 dark:border-white/10",
                    children: [f.jsxDEV(l5, {
                      className: "w-3 h-3"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3553,
                      columnNumber: 27
                    }, this), " System Active"]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3552,
                    columnNumber: 25
                  }, this), f.jsxDEV("span", {
                    className: "flex items-center gap-1.5 text-[10px] uppercase tracking-wider bg-black/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-200 font-bold px-3 py-1.5 rounded-full font-mono backdrop-blur-md border border-black/5 dark:border-white/10",
                    children: [f.jsxDEV(s5, {
                      className: "w-3 h-3"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3556,
                      columnNumber: 27
                    }, this), " Excellent Score"]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3555,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3551,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "flex flex-col gap-6 pt-2",
                  children: [f.jsxDEV("div", {
                    className: "flex items-center gap-4",
                    children: [f.jsxDEV("div", {
                      className: "p-3 bg-black/5 dark:bg-white/10 rounded-2xl backdrop-blur-md border border-black/5 dark:border-white/10",
                      children: f.jsxDEV(Ud, {
                        className: "w-6 h-6 text-neutral-800 dark:text-neutral-200"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3563,
                        columnNumber: 29
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3562,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      children: [f.jsxDEV("span", {
                        className: "text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-mono",
                        children: "Performance Overview"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3566,
                        columnNumber: 29
                      }, this), f.jsxDEV("h3", {
                        className: "text-2xl font-semibold font-display text-neutral-900 dark:text-white mt-1 tracking-tight",
                        children: "Your Detailed Performance Report"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3567,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3565,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3561,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "p-6 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-2xl rounded-2xl border border-black/[0.05] dark:border-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]",
                    children: f.jsxDEV("p", {
                      className: "text-[15px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal",
                      children: ["Your account is currently performing at an ", f.jsxDEV("strong", {
                        className: "text-neutral-900 dark:text-white font-semibold",
                        children: "Excellent level (Score: 98/100)"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3573,
                        columnNumber: 72
                      }, this), ". Your emails are successfully reaching the inbox with a ", f.jsxDEV("span", {
                        className: "text-neutral-900 dark:text-white font-medium border-b border-neutral-300 dark:border-neutral-600",
                        children: "99.9% delivery rate"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3573,
                        columnNumber: 236
                      }, this), ", meaning they are bypassing spam filters effectively. People are engaging with your content—your ", f.jsxDEV("strong", {
                        className: "text-neutral-900 dark:text-white font-semibold",
                        children: "open rate is 78.4%"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3573,
                        columnNumber: 475
                      }, this), " and ", f.jsxDEV("strong", {
                        className: "text-neutral-900 dark:text-white font-semibold",
                        children: "link click rate is 42.1%"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3573,
                        columnNumber: 574
                      }, this), ". Overall, your sending reputation is flawless with zero blacklists or spam reports."]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3572,
                      columnNumber: 27
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3571,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "grid grid-cols-2 lg:grid-cols-4 gap-5",
                    children: [f.jsxDEV("div", {
                      className: "p-5 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.05] rounded-2xl space-y-3 transition-all hover:scale-105",
                      children: [f.jsxDEV("span", {
                        className: "text-[10px] uppercase text-neutral-500 dark:text-neutral-400 font-mono block tracking-wider",
                        children: "Delivery Rate"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3580,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "text-3xl font-bold font-display text-neutral-900 dark:text-white tracking-tight",
                        children: "99.9%"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3581,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden",
                        children: f.jsxDEV("div", {
                          className: "bg-neutral-800 dark:bg-neutral-200 h-full rounded-full",
                          style: {
                            width: "99.9%"
                          }
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3583,
                          columnNumber: 31
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3582,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3579,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "p-5 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.05] rounded-2xl space-y-3 transition-all hover:scale-105",
                      children: [f.jsxDEV("span", {
                        className: "text-[10px] uppercase text-neutral-500 dark:text-neutral-400 font-mono block tracking-wider",
                        children: "Emails Opened"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3588,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "text-3xl font-bold font-display text-neutral-900 dark:text-white tracking-tight",
                        children: "78.4%"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3589,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden",
                        children: f.jsxDEV("div", {
                          className: "bg-neutral-600 dark:bg-neutral-400 h-full rounded-full",
                          style: {
                            width: "78.4%"
                          }
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3591,
                          columnNumber: 31
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3590,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3587,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "p-5 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.05] rounded-2xl space-y-3 transition-all hover:scale-105",
                      children: [f.jsxDEV("span", {
                        className: "text-[10px] uppercase text-neutral-500 dark:text-neutral-400 font-mono block tracking-wider",
                        children: "Links Clicked"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3596,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "text-3xl font-bold font-display text-neutral-900 dark:text-white tracking-tight",
                        children: "42.1%"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3597,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden",
                        children: f.jsxDEV("div", {
                          className: "bg-neutral-700 dark:bg-neutral-300 h-full rounded-full",
                          style: {
                            width: "42.1%"
                          }
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3599,
                          columnNumber: 31
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3598,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3595,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "p-5 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.05] rounded-2xl space-y-3 transition-all hover:scale-105",
                      children: [f.jsxDEV("span", {
                        className: "text-[10px] uppercase text-neutral-500 dark:text-neutral-400 font-mono block tracking-wider",
                        children: "Reputation Score"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3604,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "text-3xl font-bold font-display text-neutral-900 dark:text-white tracking-tight",
                        children: "98/100"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3605,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden",
                        children: f.jsxDEV("div", {
                          className: "bg-neutral-900 dark:bg-white h-full rounded-full",
                          style: {
                            width: "98%"
                          }
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3607,
                          columnNumber: 31
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3606,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3603,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3578,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3560,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 3547,
                columnNumber: 21
              }, this), f.jsxDEV(lt.div, {
                variants: Kt,
                className: Bo,
                children: [f.jsxDEV("div", {
                  className: "flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4",
                  children: [f.jsxDEV("div", {
                    children: [f.jsxDEV("h3", {
                      className: "text-xl font-semibold font-display text-neutral-900 dark:text-white tracking-tight",
                      children: "Interaction Analytics Over Time"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3618,
                      columnNumber: 27
                    }, this), f.jsxDEV("span", {
                      className: "text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-mono mt-1 block",
                      children: "Trend Analysis"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3619,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3617,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "relative group min-w-[140px]",
                    children: [f.jsxDEV("select", {
                      value: m,
                      onChange: F => b(F.target.value),
                      className: "appearance-none w-full bg-black/5 dark:bg-white/5 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 rounded-xl px-4 py-2 pr-10 text-xs font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer transition-all hover:bg-black/10 dark:hover:bg-white/10",
                      children: [f.jsxDEV("option", {
                        value: "last_24_hours",
                        children: "Last 24 hours"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3627,
                        columnNumber: 29
                      }, this), f.jsxDEV("option", {
                        value: "last_7_days",
                        children: "Last 7 days"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3628,
                        columnNumber: 29
                      }, this), f.jsxDEV("option", {
                        value: "last_30_days",
                        children: "Last 30 days"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3629,
                        columnNumber: 29
                      }, this), f.jsxDEV("option", {
                        value: "last_90_days",
                        children: "Last 90 days"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3630,
                        columnNumber: 29
                      }, this), f.jsxDEV("option", {
                        value: "last_year",
                        children: "Last year"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3631,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3622,
                      columnNumber: 27
                    }, this), f.jsxDEV(Vd, {
                      className: "w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3633,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3621,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3616,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "w-full h-80",
                  children: f.jsxDEV(nbe, {
                    width: "100%",
                    height: "100%",
                    children: f.jsxDEV(e6e, {
                      data: xs,
                      margin: {
                        top: 10,
                        right: 10,
                        left: -20,
                        bottom: 0
                      },
                      children: [f.jsxDEV("defs", {
                        children: [f.jsxDEV("linearGradient", {
                          id: "colorDispatches",
                          x1: "0",
                          y1: "0",
                          x2: "0",
                          y2: "1",
                          children: [f.jsxDEV("stop", {
                            offset: "5%",
                            stopColor: r === "dark" ? "#ffffff" : "#000000",
                            stopOpacity: r === "dark" ? .08 : .05
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3641,
                            columnNumber: 33
                          }, this), f.jsxDEV("stop", {
                            offset: "95%",
                            stopColor: r === "dark" ? "#ffffff" : "#000000",
                            stopOpacity: 0
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3642,
                            columnNumber: 33
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3640,
                          columnNumber: 31
                        }, this), f.jsxDEV("linearGradient", {
                          id: "colorOpens",
                          x1: "0",
                          y1: "0",
                          x2: "0",
                          y2: "1",
                          children: [f.jsxDEV("stop", {
                            offset: "5%",
                            stopColor: r === "dark" ? "#d4d4d8" : "#52525b",
                            stopOpacity: .12
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3645,
                            columnNumber: 33
                          }, this), f.jsxDEV("stop", {
                            offset: "95%",
                            stopColor: r === "dark" ? "#d4d4d8" : "#52525b",
                            stopOpacity: 0
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3646,
                            columnNumber: 33
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3644,
                          columnNumber: 31
                        }, this), f.jsxDEV("linearGradient", {
                          id: "colorClicks",
                          x1: "0",
                          y1: "0",
                          x2: "0",
                          y2: "1",
                          children: [f.jsxDEV("stop", {
                            offset: "5%",
                            stopColor: r === "dark" ? "#a1a1aa" : "#71717a",
                            stopOpacity: .2
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3649,
                            columnNumber: 33
                          }, this), f.jsxDEV("stop", {
                            offset: "95%",
                            stopColor: r === "dark" ? "#a1a1aa" : "#71717a",
                            stopOpacity: 0
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3650,
                            columnNumber: 33
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3648,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3639,
                        columnNumber: 29
                      }, this), f.jsxDEV(PY, {
                        strokeDasharray: "3 3",
                        stroke: r === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3653,
                        columnNumber: 29
                      }, this), f.jsxDEV(HY, {
                        dataKey: "name",
                        stroke: "#6b7280",
                        fontSize: 10,
                        tickLine: !1
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3654,
                        columnNumber: 29
                      }, this), f.jsxDEV(GY, {
                        stroke: "#6b7280",
                        fontSize: 10,
                        tickLine: !1
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3655,
                        columnNumber: 29
                      }, this), f.jsxDEV(Q2e, {
                        contentStyle: {
                          backgroundColor: r === "dark" ? "rgba(20, 20, 22, 0.8)" : "rgba(255, 255, 255, 0.8)",
                          border: r === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                          borderRadius: "12px",
                          fontSize: "11px",
                          color: r === "dark" ? "#f4f4f5" : "#111827",
                          backdropFilter: "blur(20px)"
                        }
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3656,
                        columnNumber: 29
                      }, this), f.jsxDEV(EN, {
                        type: "monotone",
                        dataKey: "dispatches",
                        stroke: r === "dark" ? "#71717a" : "#9ca3af",
                        fillOpacity: 1,
                        fill: "url(#colorDispatches)",
                        name: "Dispatches",
                        strokeWidth: 1
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3666,
                        columnNumber: 29
                      }, this), f.jsxDEV(EN, {
                        type: "monotone",
                        dataKey: "opens",
                        stroke: r === "dark" ? "#d4d4d8" : "#52525b",
                        fillOpacity: 1,
                        fill: "url(#colorOpens)",
                        name: "Confirmed Opens",
                        strokeWidth: 1.5
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3667,
                        columnNumber: 29
                      }, this), f.jsxDEV(EN, {
                        type: "monotone",
                        dataKey: "clicks",
                        stroke: r === "dark" ? "#a1a1aa" : "#3f3f46",
                        fillOpacity: 1,
                        fill: "url(#colorClicks)",
                        name: "Link Clicks",
                        strokeWidth: 1.5
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3668,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3638,
                      columnNumber: 27
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3637,
                    columnNumber: 25
                  }, this)
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3636,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 3615,
                columnNumber: 21
              }, this), f.jsxDEV(lt.div, {
                variants: Kt,
                className: Bo + " mb-6",
                children: [f.jsxDEV("div", {
                  className: "flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4",
                  children: [f.jsxDEV("div", {
                    className: "flex items-center gap-3",
                    children: [f.jsxDEV("div", {
                      className: "p-2 bg-black/5 dark:bg-white/10 rounded-xl backdrop-blur-md border border-black/5 dark:border-white/10",
                      children: f.jsxDEV(Vne, {
                        className: "w-5 h-5 text-neutral-800 dark:text-neutral-200"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3679,
                        columnNumber: 29
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3678,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      children: [f.jsxDEV("span", {
                        className: "text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-mono",
                        children: "Activity Distribution"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3682,
                        columnNumber: 29
                      }, this), f.jsxDEV("h3", {
                        className: "text-xl font-semibold font-display text-neutral-900 dark:text-white tracking-tight mt-0.5",
                        children: "When you sent your messages"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3683,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3681,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3677,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "relative group min-w-[140px]",
                    children: [f.jsxDEV("select", {
                      value: d,
                      onChange: F => p(F.target.value),
                      className: "appearance-none w-full bg-black/5 dark:bg-white/5 backdrop-blur-3xl border border-neutral-200/50 dark:border-white/10 rounded-xl px-4 py-2 pr-10 text-xs font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer transition-all hover:bg-black/10 dark:hover:bg-white/10",
                      children: [f.jsxDEV("option", {
                        value: "last_24_hours",
                        children: "Last 24 hours"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3693,
                        columnNumber: 29
                      }, this), f.jsxDEV("option", {
                        value: "last_7_days",
                        children: "Last 7 days"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3694,
                        columnNumber: 29
                      }, this), f.jsxDEV("option", {
                        value: "last_30_days",
                        children: "Last 30 days"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3695,
                        columnNumber: 29
                      }, this), f.jsxDEV("option", {
                        value: "last_90_days",
                        children: "Last 90 days"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3696,
                        columnNumber: 29
                      }, this), f.jsxDEV("option", {
                        value: "last_year",
                        children: "Last year"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3697,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3688,
                      columnNumber: 27
                    }, this), f.jsxDEV(Vd, {
                      className: "w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3699,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3687,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3676,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "relative flex flex-col gap-2.5 overflow-x-auto pb-6 pl-2 pt-16 -mt-16 -mb-4 scrollbar-hide",
                  children: [f.jsxDEV("div", {
                    className: "flex gap-1.5 min-w-max ml-12 mb-1",
                    children: Array.from({
                      length: 24
                    }, (F, ye) => `${ye.toString().padStart(2, "0")}:00`).map(F => f.jsxDEV("div", {
                      className: "w-8 text-center text-[10px] font-medium text-neutral-500 dark:text-zinc-400",
                      children: F.split(":")[0]
                    }, F, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3706,
                      columnNumber: 31
                    }, this))
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3704,
                    columnNumber: 25
                  }, this), [{
                    day: "Mon"
                  }, {
                    day: "Tue"
                  }, {
                    day: "Wed"
                  }, {
                    day: "Thu"
                  }, {
                    day: "Fri"
                  }, {
                    day: "Sat"
                  }, {
                    day: "Sun"
                  }].map((F, ye) => {
                    const Be = (Wt, tr) => {
                        let Bn = (Wt * 7 + tr * 13 + d.length * 3) % 100;
                        return d === "last_24_hours" && Wt !== 0 ? 0 : Bn > 85 ? 3 : Bn > 65 ? 2 : Bn > 40 ? 1 : 0;
                      },
                      pt = Array.from({
                        length: 24
                      }, (Wt, tr) => Be(ye, tr));
                    if (d === "last_24_hours" && ye !== 0) return null;
                    const mt = d === "last_24_hours" ? "Today" : F.day;
                    return f.jsxDEV("div", {
                      className: "flex gap-1.5 items-center min-w-max",
                      children: [f.jsxDEV("div", {
                        className: "w-10 text-[11px] font-medium text-neutral-500 dark:text-zinc-400 text-right pr-2 uppercase tracking-wider",
                        children: mt
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3727,
                        columnNumber: 31
                      }, this), pt.map((Wt, tr) => {
                        const Bn = `${tr.toString().padStart(2, "0")}:00`;
                        let bn = "bg-black/[0.03] dark:bg-white/[0.03] border-black/[0.04] dark:border-white/[0.04]";
                        return Wt === 1 && (bn = "bg-black/[0.12] dark:bg-white/[0.1] border-black/[0.08] dark:border-white/[0.08]"), Wt === 2 && (bn = "bg-black/[0.25] dark:bg-white/[0.25] border-black/[0.15] dark:border-white/[0.15] shadow-[0_2px_10px_rgba(0,0,0,0.05)]"), Wt === 3 && (bn = "bg-black/[0.45] dark:bg-white/[0.45] border-black/[0.25] dark:border-white/[0.25] shadow-[0_4px_15px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_15px_rgba(255,255,255,0.06)]"), f.jsxDEV("div", {
                          className: `group relative w-8 h-6 rounded border transition-all duration-200 hover:scale-[1.25] hover:z-30 cursor-crosshair hover:shadow-lg hover:border-black/30 dark:hover:border-white/40 ${bn}`,
                          children: f.jsxDEV("div", {
                            className: "absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-2 bg-white/80 dark:bg-zinc-900/80 text-neutral-900 dark:text-white text-[10px] font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-50 transform translate-y-1 group-hover:translate-y-0 backdrop-blur-xl border border-white/60 dark:border-zinc-700/60",
                            children: f.jsxDEV("div", {
                              className: "flex flex-col items-center gap-1",
                              children: [f.jsxDEV("span", {
                                className: "font-bold text-xs tracking-tight",
                                children: [Wt === 0 ? "No" : Wt * (d === "last_year" ? 142 : d === "last_30_days" ? 12 : 3), " messages"]
                              }, void 0, !0, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 3742,
                                columnNumber: 42
                              }, this), f.jsxDEV("span", {
                                className: "text-[9px] text-neutral-500 dark:text-neutral-400 font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded",
                                children: [mt, " at ", Bn]
                              }, void 0, !0, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 3743,
                                columnNumber: 42
                              }, this)]
                            }, void 0, !0, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 3741,
                              columnNumber: 40
                            }, this)
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3740,
                            columnNumber: 38
                          }, this)
                        }, tr, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3736,
                          columnNumber: 36
                        }, this);
                      })]
                    }, F.day, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3726,
                      columnNumber: 29
                    }, this);
                  })]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3703,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 3675,
                columnNumber: 21
              }, this), f.jsxDEV("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                children: [f.jsxDEV(lt.div, {
                  variants: Kt,
                  className: Bo,
                  children: [f.jsxDEV("h3", {
                    className: "text-sm font-medium font-display text-neutral-900 dark:text-white mb-4",
                    children: "Device Distribution"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3758,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "space-y-4 text-xs font-normal",
                    children: [f.jsxDEV("div", {
                      className: "flex justify-between items-center",
                      children: [f.jsxDEV("span", {
                        className: "text-zinc-500 dark:text-zinc-400",
                        children: "Desktop Outlook / Windows"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3761,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "font-mono text-neutral-800 dark:text-zinc-300 font-medium",
                        children: "56% (9)"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3762,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3760,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full overflow-hidden",
                      children: f.jsxDEV("div", {
                        className: "bg-neutral-800 dark:bg-neutral-300 h-full rounded-full",
                        style: {
                          width: "56%"
                        }
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3765,
                        columnNumber: 29
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3764,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex justify-between items-center",
                      children: [f.jsxDEV("span", {
                        className: "text-zinc-500 dark:text-zinc-400",
                        children: "Mobile AppleMail / iOS"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3769,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "font-mono text-neutral-800 dark:text-zinc-300 font-medium",
                        children: "31% (5)"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3770,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3768,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full overflow-hidden",
                      children: f.jsxDEV("div", {
                        className: "bg-neutral-600 dark:bg-neutral-400 h-full rounded-full",
                        style: {
                          width: "31%"
                        }
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3773,
                        columnNumber: 29
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3772,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex justify-between items-center",
                      children: [f.jsxDEV("span", {
                        className: "text-zinc-500 dark:text-zinc-400",
                        children: "Web Browser Chrome / Safari"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3777,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "font-mono text-neutral-800 dark:text-zinc-300 font-medium",
                        children: "13% (2)"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3778,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3776,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full overflow-hidden",
                      children: f.jsxDEV("div", {
                        className: "bg-neutral-500 dark:bg-neutral-500 h-full rounded-full",
                        style: {
                          width: "13%"
                        }
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3781,
                        columnNumber: 29
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3780,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3759,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3757,
                  columnNumber: 23
                }, this), f.jsxDEV(lt.div, {
                  variants: Kt,
                  className: Bo,
                  children: [f.jsxDEV("h3", {
                    className: "text-sm font-medium font-display text-neutral-900 dark:text-white mb-4",
                    children: "System Verification Health"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3787,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "space-y-4 text-xs",
                    children: [f.jsxDEV("div", {
                      className: "flex items-start gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md",
                      children: [f.jsxDEV("div", {
                        className: "shrink-0",
                        children: f.jsxDEV("span", {
                          className: "flex items-center gap-1.5 text-[10px] uppercase tracking-wider bg-black/5 dark:bg-white/10 text-neutral-900 dark:text-white font-bold px-2.5 py-1 rounded border border-black/10 dark:border-white/20",
                          children: [f.jsxDEV(en, {
                            className: "w-3 h-3 stroke-[3]"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3792,
                            columnNumber: 33
                          }, this), " Confirmed"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3791,
                          columnNumber: 31
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3790,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        children: [f.jsxDEV("p", {
                          className: "text-neutral-900 dark:text-white font-semibold text-[13px] tracking-tight",
                          children: "Tracking Resolution 100%"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3796,
                          columnNumber: 31
                        }, this), f.jsxDEV("p", {
                          className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed",
                          children: "Every silent 1x1 pixel successfully rendered across remote exchange servers without filtering flags."
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3797,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3795,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3789,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex items-start gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md",
                      children: [f.jsxDEV("div", {
                        className: "shrink-0",
                        children: f.jsxDEV("span", {
                          className: "flex items-center gap-1.5 text-[10px] uppercase tracking-wider bg-black/5 dark:bg-white/10 text-neutral-900 dark:text-white font-bold px-2.5 py-1 rounded border border-black/10 dark:border-white/20",
                          children: [f.jsxDEV(en, {
                            className: "w-3 h-3 stroke-[3]"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3804,
                            columnNumber: 33
                          }, this), " Confirmed"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3803,
                          columnNumber: 31
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3802,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        children: [f.jsxDEV("p", {
                          className: "text-neutral-900 dark:text-white font-semibold text-[13px] tracking-tight",
                          children: "Instant SMTP Callback"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3808,
                          columnNumber: 31
                        }, this), f.jsxDEV("p", {
                          className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed",
                          children: "Average signal verification back-propagation completed within 180ms across global nodes."
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3809,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3807,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3801,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex items-start gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md",
                      children: [f.jsxDEV("div", {
                        className: "shrink-0",
                        children: f.jsxDEV("span", {
                          className: "flex items-center gap-1.5 text-[10px] uppercase tracking-wider bg-black/5 dark:bg-white/10 text-neutral-900 dark:text-white font-bold px-2.5 py-1 rounded border border-black/10 dark:border-white/20",
                          children: [f.jsxDEV(en, {
                            className: "w-3 h-3 stroke-[3]"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3816,
                            columnNumber: 33
                          }, this), " Confirmed"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3815,
                          columnNumber: 31
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3814,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        children: [f.jsxDEV("p", {
                          className: "text-neutral-900 dark:text-white font-semibold text-[13px] tracking-tight",
                          children: "IP Reputation Integrity"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3820,
                          columnNumber: 31
                        }, this), f.jsxDEV("p", {
                          className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed",
                          children: "Zero blacklist occurrences on all monitored RBLs, spam filters bypassed successfully."
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3821,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3819,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3813,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3788,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3786,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 3756,
                columnNumber: 21
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 3531,
              columnNumber: 19
            }, this), c === "integrations" && f.jsxDEV("div", {
              className: "animate-fadeIn max-w-7xl mx-auto space-y-8 relative z-10",
              children: [f.jsxDEV("div", {
                className: "absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 z-[-1]"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 3833,
                columnNumber: 21
              }, this), f.jsxDEV("div", {
                className: "absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2 z-[-1]"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 3834,
                columnNumber: 21
              }, this), f.jsxDEV("div", {
                className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6",
                children: f.jsxDEV("div", {
                  children: [f.jsxDEV("h2", {
                    className: "text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight mb-2",
                    children: "Integration Hub"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3838,
                    columnNumber: 25
                  }, this), f.jsxDEV("p", {
                    className: "text-sm text-neutral-500 dark:text-zinc-400",
                    children: "Connect CRM pipelines, webhook endpoints, and API bridges."
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3839,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3837,
                  columnNumber: 23
                }, this)
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 3836,
                columnNumber: 21
              }, this), f.jsxDEV("div", {
                className: "relative group z-10",
                children: [f.jsxDEV("div", {
                  className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none",
                  children: f.jsxDEV(Om, {
                    className: "h-5 w-5 text-neutral-400 group-focus-within:text-neutral-600 dark:group-focus-within:text-zinc-200 transition-colors"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3846,
                    columnNumber: 25
                  }, this)
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3845,
                  columnNumber: 23
                }, this), f.jsxDEV("input", {
                  type: "text",
                  placeholder: "Search integrations...",
                  className: "w-full pl-12 pr-4 py-4 bg-white dark:bg-black/20 backdrop-blur-3xl border border-neutral-200 dark:border-white/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400/20 dark:focus:ring-zinc-700/50 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-neutral-900 dark:text-white"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3848,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 3844,
                columnNumber: 21
              }, this), f.jsxDEV("div", {
                children: [f.jsxDEV("h3", {
                  className: "text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-zinc-400 mb-4",
                  children: "Recommended for you"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3857,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",
                  children: [f.jsxDEV("div", {
                    className: "relative p-6 border border-neutral-200 dark:border-white/10 rounded-3xl bg-white dark:bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full overflow-hidden",
                    children: [f.jsxDEV("div", {
                      className: "absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none z-0"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3862,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      children: [f.jsxDEV("div", {
                        className: "flex justify-between items-start mb-4",
                        children: [f.jsxDEV("div", {
                          className: "w-12 h-12 rounded-xl bg-white dark:bg-zinc-900/50 border border-neutral-100 dark:border-zinc-800 flex items-center justify-center p-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300",
                          children: f.jsxDEV($ce, {
                            className: "w-full h-full"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3866,
                            columnNumber: 33
                          }, this)
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3865,
                          columnNumber: 31
                        }, this), f.jsxDEV("span", {
                          className: `px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded border ${Dr.slack === "connected" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 border-emerald-200 dark:border-emerald-800/60" : "bg-neutral-50 dark:bg-zinc-900/50 text-neutral-500 border-neutral-200 dark:border-zinc-800"}`,
                          children: Dr.slack === "connected" ? "Connected" : "Available"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3868,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3864,
                        columnNumber: 29
                      }, this), f.jsxDEV("h4", {
                        className: "font-semibold text-neutral-900 dark:text-white font-display text-lg",
                        children: "Slack"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3872,
                        columnNumber: 29
                      }, this), f.jsxDEV("p", {
                        className: "text-xs text-neutral-500 dark:text-zinc-400 mt-2 leading-relaxed",
                        children: "Push real-time tracking notifications and alerts directly to your team's channels."
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3873,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3863,
                      columnNumber: 27
                    }, this), f.jsxDEV("button", {
                      disabled: Dr.slack === "connected",
                      onClick: () => {
                        lo({
                          id: "slack",
                          name: "Slack",
                          description: "Authenticate your Slack workspace to start receiving notifications for opened emails, clicked links, and pipeline changes.",
                          fields: [{
                            id: "workspace_url",
                            label: "Slack Workspace URL",
                            type: "text",
                            placeholder: "https://acme-corp.slack.com"
                          }]
                        });
                      },
                      className: `mt-6 relative z-10 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${Dr.slack === "connected" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 cursor-default" : "bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-700 text-neutral-700 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-800 shadow-sm cursor-pointer"} flex items-center justify-center gap-2`,
                      children: Dr.slack === "connected" ? f.jsxDEV(f.Fragment, {
                        children: [f.jsxDEV(en, {
                          className: "w-3.5 h-3.5"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3888,
                          columnNumber: 75
                        }, this), " Connected"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3888,
                        columnNumber: 73
                      }, this) : f.jsxDEV(f.Fragment, {
                        children: [f.jsxDEV(wp, {
                          className: "w-3.5 h-3.5"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3888,
                          columnNumber: 126
                        }, this), " Add to Slack"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3888,
                        columnNumber: 124
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3875,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3861,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "relative p-6 border border-neutral-200 dark:border-white/10 rounded-3xl bg-white dark:bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full overflow-hidden",
                    children: [f.jsxDEV("div", {
                      className: "absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none z-0"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3894,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      children: [f.jsxDEV("div", {
                        className: "flex justify-between items-start mb-4",
                        children: [f.jsxDEV("div", {
                          className: "w-12 h-12 rounded-xl bg-white dark:bg-zinc-900/50 border border-neutral-100 dark:border-zinc-800 flex items-center justify-center p-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300",
                          children: f.jsxDEV(Bce, {
                            className: "w-full h-full"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3898,
                            columnNumber: 33
                          }, this)
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3897,
                          columnNumber: 31
                        }, this), f.jsxDEV("span", {
                          className: `px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded border ${Dr.hubspot === "connected" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 border-emerald-200 dark:border-emerald-800/60" : "bg-neutral-50 dark:bg-zinc-900/50 text-neutral-500 border-neutral-200 dark:border-zinc-800"}`,
                          children: Dr.hubspot === "connected" ? "Connected" : "Available"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3900,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3896,
                        columnNumber: 29
                      }, this), f.jsxDEV("h4", {
                        className: "font-semibold text-neutral-900 dark:text-white font-display text-lg",
                        children: "HubSpot CRM"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3904,
                        columnNumber: 29
                      }, this), f.jsxDEV("p", {
                        className: "text-xs text-neutral-500 dark:text-zinc-400 mt-2 leading-relaxed",
                        children: "Automate marketing workflows and sync telemetry data directly to lead records."
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3905,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3895,
                      columnNumber: 27
                    }, this), f.jsxDEV("button", {
                      disabled: Dr.hubspot === "connected",
                      onClick: () => {
                        lo({
                          id: "hubspot",
                          name: "HubSpot CRM",
                          description: "Connect HubSpot to automatically create and update contact records based on email tracking engagement.",
                          fields: [{
                            id: "api_key",
                            label: "HubSpot API / Private App Token",
                            type: "password",
                            placeholder: "pat-na1-..."
                          }]
                        });
                      },
                      className: `mt-6 relative z-10 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${Dr.hubspot === "connected" ? "bg-[#ff7a59]/10 text-[#ff7a59] border border-[#ff7a59]/20 cursor-default" : "bg-[#ff7a59] text-white hover:bg-[#ff7a59]/90 shadow-sm cursor-pointer"} flex items-center justify-center gap-2`,
                      children: Dr.hubspot === "connected" ? f.jsxDEV(f.Fragment, {
                        children: [f.jsxDEV(en, {
                          className: "w-3.5 h-3.5"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3920,
                          columnNumber: 77
                        }, this), " Connected"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3920,
                        columnNumber: 75
                      }, this) : f.jsxDEV(f.Fragment, {
                        children: [f.jsxDEV(wp, {
                          className: "w-3.5 h-3.5"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3920,
                          columnNumber: 128
                        }, this), " Connect HubSpot"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3920,
                        columnNumber: 126
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3907,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3893,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "relative p-6 border border-neutral-200 dark:border-white/10 rounded-3xl bg-white dark:bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full overflow-hidden",
                    children: [f.jsxDEV("div", {
                      className: "absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none z-0"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3926,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      children: [f.jsxDEV("div", {
                        className: "flex justify-between items-start mb-4",
                        children: [f.jsxDEV("div", {
                          className: "w-12 h-12 rounded-xl bg-white dark:bg-zinc-900/50 border border-neutral-100 dark:border-zinc-800 flex items-center justify-center p-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300",
                          children: f.jsxDEV(Fce, {
                            className: "w-full h-full text-black dark:text-white"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3930,
                            columnNumber: 33
                          }, this)
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3929,
                          columnNumber: 31
                        }, this), f.jsxDEV("span", {
                          className: `px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded border ${Dr.notion === "connected" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 border-emerald-200 dark:border-emerald-800/60" : "bg-neutral-50 dark:bg-zinc-900/50 text-neutral-500 border-neutral-200 dark:border-zinc-800"}`,
                          children: Dr.notion === "connected" ? "Connected" : "Available"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3932,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3928,
                        columnNumber: 29
                      }, this), f.jsxDEV("h4", {
                        className: "font-semibold text-neutral-900 dark:text-white font-display text-lg",
                        children: "Notion"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3936,
                        columnNumber: 29
                      }, this), f.jsxDEV("p", {
                        className: "text-xs text-neutral-500 dark:text-zinc-400 mt-2 leading-relaxed",
                        children: "Automatically generate detailed tracking reports and databases within your workspace."
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3937,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3927,
                      columnNumber: 27
                    }, this), f.jsxDEV("button", {
                      disabled: Dr.notion === "connected",
                      onClick: () => {
                        lo({
                          id: "notion",
                          name: "Notion",
                          description: "Link your Notion workspace to seamlessly sync and log tracking data into your connected databases.",
                          fields: [{
                            id: "secret",
                            label: "Internal Integration Secret",
                            type: "password",
                            placeholder: "secret_..."
                          }]
                        });
                      },
                      className: `mt-6 relative z-10 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${Dr.notion === "connected" ? "bg-neutral-100 dark:bg-zinc-800 text-black dark:text-white border border-neutral-200 dark:border-zinc-700 cursor-default" : "bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm cursor-pointer"} flex items-center justify-center gap-2`,
                      children: Dr.notion === "connected" ? f.jsxDEV(f.Fragment, {
                        children: [f.jsxDEV(en, {
                          className: "w-3.5 h-3.5"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3952,
                          columnNumber: 76
                        }, this), " Connected"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3952,
                        columnNumber: 74
                      }, this) : f.jsxDEV(f.Fragment, {
                        children: [f.jsxDEV(wp, {
                          className: "w-3.5 h-3.5"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3952,
                          columnNumber: 127
                        }, this), " Authorize Workspace"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3952,
                        columnNumber: 125
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3939,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3925,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "relative p-6 border border-neutral-200 dark:border-white/10 rounded-3xl bg-white dark:bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full overflow-hidden",
                    children: [f.jsxDEV("div", {
                      className: "absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none z-0"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3958,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      children: [f.jsxDEV("div", {
                        className: "flex justify-between items-start mb-4",
                        children: [f.jsxDEV("div", {
                          className: "w-12 h-12 rounded-xl bg-white dark:bg-zinc-900/50 border border-neutral-100 dark:border-zinc-800 flex items-center justify-center p-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300",
                          children: f.jsxDEV(Uce, {
                            className: "w-full h-full"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3962,
                            columnNumber: 33
                          }, this)
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3961,
                          columnNumber: 31
                        }, this), f.jsxDEV("span", {
                          className: "px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded border bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-neutral-900 dark:border-zinc-100",
                          children: "Configured"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3964,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3960,
                        columnNumber: 29
                      }, this), f.jsxDEV("h4", {
                        className: "font-semibold text-neutral-900 dark:text-white font-display text-lg",
                        children: "Zapier / Make.com"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3968,
                        columnNumber: 29
                      }, this), f.jsxDEV("p", {
                        className: "text-xs text-neutral-500 dark:text-zinc-400 mt-2 leading-relaxed",
                        children: "Connect to 5000+ apps. Use the secret token below to authenticate your API requests."
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3969,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3959,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "mt-6 space-y-2",
                      children: [f.jsxDEV("label", {
                        className: "text-[10px] uppercase tracking-widest font-semibold text-neutral-500",
                        children: "Tickk API Secret Token"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3972,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "flex items-center gap-2",
                        children: [f.jsxDEV("input", {
                          type: "text",
                          readOnly: !0,
                          value: "tk_live_8f92j4f982j4f928",
                          className: "flex-1 bg-neutral-100 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs font-mono text-neutral-600 dark:text-zinc-400 focus:outline-none"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3974,
                          columnNumber: 31
                        }, this), f.jsxDEV("button", {
                          onClick: () => {},
                          className: "p-2 bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-zinc-700 transition-colors",
                          children: f.jsxDEV(Id, {
                            className: "w-3.5 h-3.5 text-neutral-500"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3976,
                            columnNumber: 33
                          }, this)
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3975,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3973,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3971,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3957,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "relative p-6 border border-neutral-200 dark:border-white/10 rounded-3xl bg-white dark:bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full overflow-hidden",
                    children: [f.jsxDEV("div", {
                      className: "absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none z-0"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3984,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      children: [f.jsxDEV("div", {
                        className: "flex justify-between items-start mb-4",
                        children: [f.jsxDEV("div", {
                          className: "w-12 h-12 rounded-xl bg-white dark:bg-zinc-900/50 border border-neutral-100 dark:border-zinc-800 flex items-center justify-center p-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300",
                          children: f.jsxDEV(Hce, {
                            className: "w-full h-full text-neutral-700 dark:text-zinc-300"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 3988,
                            columnNumber: 33
                          }, this)
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3987,
                          columnNumber: 31
                        }, this), f.jsxDEV("span", {
                          className: "px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded border bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-neutral-900 dark:border-zinc-100",
                          children: "Configured"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 3990,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3986,
                        columnNumber: 29
                      }, this), f.jsxDEV("h4", {
                        className: "font-semibold text-neutral-900 dark:text-white font-display text-lg",
                        children: "Custom Webhooks"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3994,
                        columnNumber: 29
                      }, this), f.jsxDEV("p", {
                        className: "text-xs text-neutral-500 dark:text-zinc-400 mt-2 leading-relaxed",
                        children: "Dispatch raw JSON payloads to any target endpoint upon email open or link click."
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3995,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3985,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "mt-6 space-y-2",
                      children: [f.jsxDEV("label", {
                        className: "text-[10px] uppercase tracking-widest font-semibold text-neutral-500",
                        children: "Target Endpoint URL"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3998,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "flex items-center gap-2",
                        children: [f.jsxDEV("input", {
                          type: "text",
                          placeholder: "https://api.yourserver.com/webhook",
                          className: "flex-1 bg-transparent border border-neutral-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs text-neutral-800 dark:text-zinc-200 focus:outline-none focus:border-neutral-400 dark:focus:border-zinc-500 transition-colors"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4e3,
                          columnNumber: 31
                        }, this), f.jsxDEV("button", {
                          className: "px-3 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors",
                          children: "Save"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4001,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 3999,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 3997,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 3983,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "relative p-6 border border-neutral-200 dark:border-white/10 rounded-3xl bg-white dark:bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full overflow-hidden",
                    children: [f.jsxDEV("div", {
                      className: "absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none z-0"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4010,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      children: [f.jsxDEV("div", {
                        className: "flex justify-between items-start mb-4",
                        children: [f.jsxDEV("div", {
                          className: "w-12 h-12 rounded-xl bg-white dark:bg-zinc-900/50 border border-neutral-100 dark:border-zinc-800 flex items-center justify-center p-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300",
                          children: f.jsxDEV(qce, {
                            className: "w-full h-full"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4014,
                            columnNumber: 33
                          }, this)
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4013,
                          columnNumber: 31
                        }, this), f.jsxDEV("span", {
                          className: `px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded border ${Dr.discord === "connected" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 border-emerald-200 dark:border-emerald-800/60" : "bg-neutral-50 dark:bg-zinc-900/50 text-neutral-500 border-neutral-200 dark:border-zinc-800"}`,
                          children: Dr.discord === "connected" ? "Connected" : "Available"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4016,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4012,
                        columnNumber: 29
                      }, this), f.jsxDEV("h4", {
                        className: "font-semibold text-neutral-900 dark:text-white font-display text-lg",
                        children: "Discord"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4020,
                        columnNumber: 29
                      }, this), f.jsxDEV("p", {
                        className: "text-xs text-neutral-500 dark:text-zinc-400 mt-2 leading-relaxed",
                        children: "Broadcast rich embed notifications to your server when high-value links are clicked."
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4021,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4011,
                      columnNumber: 27
                    }, this), f.jsxDEV("button", {
                      disabled: Dr.discord === "connected",
                      onClick: () => {
                        lo({
                          id: "discord",
                          name: "Discord",
                          description: "Connect Discord to broadcast rich embed notifications to your server when high-value links are clicked.",
                          fields: [{
                            id: "webhook_url",
                            label: "Discord Webhook URL",
                            type: "text",
                            placeholder: "https://discord.com/api/webhooks/..."
                          }]
                        });
                      },
                      className: `mt-6 relative z-10 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${Dr.discord === "connected" ? "bg-[#5865F2]/10 text-[#5865F2] border border-[#5865F2]/20 cursor-default" : "bg-[#5865F2] text-white hover:bg-[#5865F2]/90 shadow-sm cursor-pointer"} flex items-center justify-center gap-2`,
                      children: Dr.discord === "connected" ? f.jsxDEV(f.Fragment, {
                        children: [f.jsxDEV(en, {
                          className: "w-3.5 h-3.5"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4036,
                          columnNumber: 77
                        }, this), " Connected"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4036,
                        columnNumber: 75
                      }, this) : f.jsxDEV(f.Fragment, {
                        children: [f.jsxDEV(wp, {
                          className: "w-3.5 h-3.5"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4036,
                          columnNumber: 128
                        }, this), " Connect Discord"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4036,
                        columnNumber: 126
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4023,
                      columnNumber: 1
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4009,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 3858,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 3856,
                columnNumber: 21
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 3832,
              columnNumber: 19
            }, this), c === "account" && f.jsxDEV("div", {
              className: "animate-fadeIn h-[calc(100vh-100px)] overflow-hidden flex flex-col lg:flex-row gap-8 bg-white dark:bg-[#111111] p-6 lg:p-8 rounded-2xl border border-neutral-200/60 dark:border-zinc-800/60 shadow-xl",
              children: [f.jsxDEV("div", {
                className: "w-full lg:w-56 shrink-0 flex flex-col space-y-1 border-r border-neutral-100 dark:border-zinc-800/50 pr-4",
                children: [f.jsxDEV("div", {
                  className: "mb-6 px-3",
                  children: f.jsxDEV("h2", {
                    className: "text-2xl font-light font-display text-neutral-900 dark:text-white tracking-tight",
                    children: "Settings"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4053,
                    columnNumber: 25
                  }, this)
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4052,
                  columnNumber: 23
                }, this), [{
                  id: "tracking",
                  label: "Tracking",
                  icon: f.jsxDEV(Ud, {
                    className: "w-4 h-4"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4057,
                    columnNumber: 68
                  }, this)
                }, {
                  id: "gmail",
                  label: "Gmail / Mail",
                  icon: f.jsxDEV(kp, {
                    className: "w-4 h-4"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4058,
                    columnNumber: 69
                  }, this)
                }, {
                  id: "notifications",
                  label: "Notifications",
                  icon: f.jsxDEV(Cne, {
                    className: "w-4 h-4"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4059,
                    columnNumber: 78
                  }, this)
                }, {
                  id: "account",
                  label: "Account",
                  icon: f.jsxDEV(eae, {
                    className: "w-4 h-4"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4060,
                    columnNumber: 66
                  }, this)
                }, {
                  id: "subscription",
                  label: "Subscription",
                  icon: f.jsxDEV(qD, {
                    className: "w-4 h-4"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4061,
                    columnNumber: 76
                  }, this)
                }, {
                  id: "privacy",
                  label: "Privacy & Security",
                  icon: f.jsxDEV(Fre, {
                    className: "w-4 h-4"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4062,
                    columnNumber: 77
                  }, this)
                }, {
                  id: "team",
                  label: "Team Members",
                  icon: f.jsxDEV(nae, {
                    className: "w-4 h-4"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4064,
                    columnNumber: 68
                  }, this)
                }, {
                  id: "mobile",
                  label: "Mobile App",
                  icon: f.jsxDEV(Hre, {
                    className: "w-4 h-4"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4065,
                    columnNumber: 68
                  }, this)
                }].map(F => f.jsxDEV("button", {
                  onClick: () => vi(F.id),
                  className: `flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-[13px] transition-all font-display tracking-wide ${ti === F.id ? "bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md font-medium" : "text-neutral-500 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-900 hover:text-neutral-900 dark:hover:text-white font-normal"}`,
                  children: [F.icon, F.label]
                }, F.id, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4067,
                  columnNumber: 25
                }, this))]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 4051,
                columnNumber: 21
              }, this), f.jsxDEV("div", {
                className: "flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10",
                children: [ti === "tracking" && f.jsxDEV("div", {
                  className: "space-y-12 animate-fadeIn max-w-3xl",
                  children: [f.jsxDEV("div", {
                    children: [f.jsxDEV("h3", {
                      className: "text-2xl font-light font-display text-neutral-900 dark:text-white tracking-tight mb-2",
                      children: "Tracking Parameters"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4089,
                      columnNumber: 29
                    }, this), f.jsxDEV("p", {
                      className: "text-xs text-neutral-500 dark:text-zinc-400",
                      children: "Configure core tracking behaviors, injection modes, and link redirection domains."
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4090,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4088,
                    columnNumber: 27
                  }, this), f.jsxDEV("div", {
                    className: "space-y-6",
                    children: [f.jsxDEV("h4", {
                      className: "text-[11px] font-bold font-mono text-neutral-900 dark:text-zinc-300 border-b border-neutral-100 dark:border-zinc-800/60 pb-2 uppercase tracking-widest",
                      children: "Global Tracking Toggles"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4094,
                      columnNumber: 29
                    }, this), f.jsxDEV("div", {
                      className: "flex items-start justify-between p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/30 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-zinc-800",
                      children: [f.jsxDEV("div", {
                        className: "space-y-1",
                        children: [f.jsxDEV("div", {
                          className: "text-sm font-medium font-display text-neutral-900 dark:text-white",
                          children: "Track outbound emails by default"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4098,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "text-xs text-neutral-500 dark:text-zinc-500 font-sans",
                          children: "Automatically inject invisible telemetry pixels in all outgoing compositions"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4099,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4097,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "relative inline-block w-10 align-middle select-none transition duration-200 ease-in mt-1",
                        children: [f.jsxDEV("input", {
                          type: "checkbox",
                          defaultChecked: !0,
                          className: "toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-[3px] border-neutral-900 dark:border-white appearance-none cursor-pointer transform translate-x-5 transition-transform"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4102,
                          columnNumber: 33
                        }, this), f.jsxDEV("label", {
                          className: "toggle-label block overflow-hidden h-5 rounded-full bg-neutral-900 dark:bg-white cursor-pointer"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4103,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4101,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4096,
                      columnNumber: 29
                    }, this), f.jsxDEV("div", {
                      className: "flex items-start justify-between p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/30 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-zinc-800",
                      children: [f.jsxDEV("div", {
                        className: "space-y-1",
                        children: [f.jsxDEV("div", {
                          className: "flex items-center gap-3",
                          children: f.jsxDEV("div", {
                            className: "text-sm font-medium font-display text-neutral-900 dark:text-white",
                            children: "Link Click Wrapping"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4110,
                            columnNumber: 35
                          }, this)
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4109,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "text-xs text-neutral-500 dark:text-zinc-500 font-sans",
                          children: "Wrap external links to monitor click-through rates and recipient interaction time"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4113,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4108,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "relative inline-block w-10 align-middle select-none transition duration-200 ease-in mt-1",
                        children: [f.jsxDEV("input", {
                          type: "checkbox",
                          className: "toggle-checkbox absolute block w-5 h-5 rounded-full bg-white dark:bg-zinc-800 border-[3px] border-neutral-300 dark:border-zinc-600 appearance-none cursor-pointer transition-transform"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4116,
                          columnNumber: 33
                        }, this), f.jsxDEV("label", {
                          className: "toggle-label block overflow-hidden h-5 rounded-full bg-neutral-300 dark:bg-zinc-600 cursor-pointer"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4117,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4115,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4107,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4093,
                    columnNumber: 27
                  }, this), f.jsxDEV("div", {
                    className: "space-y-6 pt-4",
                    children: [f.jsxDEV("h4", {
                      className: "text-[11px] font-bold font-mono text-neutral-900 dark:text-zinc-300 border-b border-neutral-100 dark:border-zinc-800/60 pb-2 uppercase tracking-widest",
                      children: "Compliance & Signature"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4123,
                      columnNumber: 29
                    }, this), f.jsxDEV("div", {
                      className: "flex items-start justify-between p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/30 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-zinc-800",
                      children: [f.jsxDEV("div", {
                        className: "space-y-1",
                        children: [f.jsxDEV("div", {
                          className: "flex items-center gap-3",
                          children: f.jsxDEV("div", {
                            className: "text-sm font-medium font-display text-neutral-900 dark:text-white",
                            children: "Auto-Append Unsubscribe Footer"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4128,
                            columnNumber: 35
                          }, this)
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4127,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "text-xs text-neutral-500 dark:text-zinc-500 font-sans",
                          children: "Appends a minimal, unstyled opt-out text block to ensure CAN-SPAM compliance"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4130,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4126,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "relative inline-block w-10 align-middle select-none transition duration-200 ease-in mt-1",
                        children: [f.jsxDEV("input", {
                          type: "checkbox",
                          defaultChecked: !0,
                          className: "toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-[3px] border-neutral-900 dark:border-white appearance-none cursor-pointer transform translate-x-5 transition-transform"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4133,
                          columnNumber: 33
                        }, this), f.jsxDEV("label", {
                          className: "toggle-label block overflow-hidden h-5 rounded-full bg-neutral-900 dark:bg-white cursor-pointer"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4134,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4132,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4125,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4122,
                    columnNumber: 27
                  }, this), f.jsxDEV("div", {
                    className: "space-y-6 pt-4",
                    children: f.jsxDEV("div", {
                      children: [f.jsxDEV("h4", {
                        className: "text-[11px] font-bold font-mono text-neutral-900 dark:text-zinc-300 border-b border-neutral-100 dark:border-zinc-800/60 pb-2 mb-4 uppercase tracking-widest",
                        children: "Custom Tracking Domain (CTD)"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4141,
                        columnNumber: 31
                      }, this), f.jsxDEV("p", {
                        className: "text-xs text-neutral-500 dark:text-zinc-400 leading-relaxed mb-6 font-sans",
                        children: "Provision a custom subdomain for your tracking pixels and wrapped links. This masks the telemetry engine under your corporate identity, dramatically improving inbox placement and bypassing aggressive ESP filtering."
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4142,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "space-y-2 mb-6",
                        children: [f.jsxDEV("label", {
                          className: "text-[11px] font-semibold text-neutral-700 dark:text-zinc-300 font-sans",
                          children: "Active CTD Hostname"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4147,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "flex items-center gap-4",
                          children: [f.jsxDEV("input", {
                            type: "text",
                            placeholder: "e.g. secure.yourdomain.com",
                            className: "flex-1 bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-zinc-800 text-sm rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-900 dark:focus:border-zinc-400 transition-colors font-mono"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4149,
                            columnNumber: 35
                          }, this), f.jsxDEV("button", {
                            onClick: () => s("Subdomain deployed successfully", "success"),
                            className: "bg-neutral-900 dark:bg-zinc-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-white text-sm font-medium px-6 py-3 rounded-xl transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] font-display tracking-wide whitespace-nowrap cursor-pointer",
                            children: "Deploy Subdomain"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4150,
                            columnNumber: 35
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4148,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4146,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "bg-neutral-50 dark:bg-[#08080a] border border-neutral-200/80 dark:border-zinc-800/80 rounded-xl p-6 space-y-5 shadow-sm",
                        children: [f.jsxDEV("div", {
                          className: "flex items-center justify-between",
                          children: [f.jsxDEV("span", {
                            className: "text-sm font-semibold text-neutral-800 dark:text-zinc-200 font-display",
                            children: "DNS Configuration Manifesto"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4156,
                            columnNumber: 35
                          }, this), f.jsxDEV(FD, {
                            className: "w-4 h-4 text-zinc-500"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4157,
                            columnNumber: 35
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4155,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "space-y-6 pt-2",
                          children: f.jsxDEV("div", {
                            className: "space-y-3",
                            children: [f.jsxDEV("h5", {
                              className: "text-[13px] font-semibold text-neutral-900 dark:text-white font-sans flex items-center gap-2",
                              children: [f.jsxDEV("span", {
                                className: "w-5 h-5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black flex items-center justify-center text-[10px] font-bold",
                                children: "1"
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 4162,
                                columnNumber: 39
                              }, this), "Establish CNAME Record"]
                            }, void 0, !0, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4161,
                              columnNumber: 37
                            }, this), f.jsxDEV("p", {
                              className: "text-xs text-zinc-500 font-sans pl-7",
                              children: "Inject the following cryptographic linkage into your registrar's zone file (Cloudflare, AWS Route53, Namecheap):"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4165,
                              columnNumber: 37
                            }, this), f.jsxDEV("div", {
                              className: "ml-7 overflow-hidden rounded-xl border border-neutral-200 dark:border-zinc-800 shadow-sm",
                              children: f.jsxDEV("table", {
                                className: "w-full text-left text-xs font-mono",
                                children: [f.jsxDEV("thead", {
                                  className: "bg-neutral-100 dark:bg-zinc-900 text-neutral-700 dark:text-zinc-300",
                                  children: f.jsxDEV("tr", {
                                    children: [f.jsxDEV("th", {
                                      className: "px-5 py-3 border-b border-neutral-200 dark:border-zinc-800 font-semibold tracking-wider",
                                      children: "Type"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 4170,
                                      columnNumber: 45
                                    }, this), f.jsxDEV("th", {
                                      className: "px-5 py-3 border-b border-neutral-200 dark:border-zinc-800 font-semibold tracking-wider",
                                      children: "Host/Name"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 4171,
                                      columnNumber: 45
                                    }, this), f.jsxDEV("th", {
                                      className: "px-5 py-3 border-b border-neutral-200 dark:border-zinc-800 font-semibold tracking-wider",
                                      children: "Target Value"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 4172,
                                      columnNumber: 45
                                    }, this)]
                                  }, void 0, !0, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 4169,
                                    columnNumber: 43
                                  }, this)
                                }, void 0, !1, {
                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                  lineNumber: 4168,
                                  columnNumber: 41
                                }, this), f.jsxDEV("tbody", {
                                  className: "bg-white dark:bg-[#111111] text-zinc-500",
                                  children: f.jsxDEV("tr", {
                                    children: [f.jsxDEV("td", {
                                      className: "px-5 py-4 border-b border-neutral-100 dark:border-zinc-800/50",
                                      children: "CNAME"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 4177,
                                      columnNumber: 45
                                    }, this), f.jsxDEV("td", {
                                      className: "px-5 py-4 border-b border-neutral-100 dark:border-zinc-800/50",
                                      children: "secure"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 4178,
                                      columnNumber: 45
                                    }, this), f.jsxDEV("td", {
                                      className: "px-5 py-4 border-b border-neutral-100 dark:border-zinc-800/50 text-neutral-900 dark:text-zinc-300",
                                      children: "ingress.tickk.io"
                                    }, void 0, !1, {
                                      fileName: "/app/applet/src/components/Dashboard.tsx",
                                      lineNumber: 4179,
                                      columnNumber: 45
                                    }, this)]
                                  }, void 0, !0, {
                                    fileName: "/app/applet/src/components/Dashboard.tsx",
                                    lineNumber: 4176,
                                    columnNumber: 43
                                  }, this)
                                }, void 0, !1, {
                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                  lineNumber: 4175,
                                  columnNumber: 41
                                }, this)]
                              }, void 0, !0, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 4167,
                                columnNumber: 39
                              }, this)
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4166,
                              columnNumber: 37
                            }, this)]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4160,
                            columnNumber: 35
                          }, this)
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4159,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4154,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4140,
                      columnNumber: 29
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4139,
                    columnNumber: 27
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4087,
                  columnNumber: 25
                }, this), ["privacy", "mobile"].includes(ti) && f.jsxDEV("div", {
                  className: "h-full flex flex-col items-center justify-center text-center space-y-5 opacity-70 pt-24 max-w-md mx-auto",
                  children: [f.jsxDEV("div", {
                    className: "w-16 h-16 bg-neutral-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-neutral-400 dark:text-zinc-500 shadow-inner",
                    children: f.jsxDEV(YD, {
                      className: "w-8 h-8"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4196,
                      columnNumber: 29
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4195,
                    columnNumber: 27
                  }, this), f.jsxDEV("div", {
                    children: [f.jsxDEV("h3", {
                      className: "text-xl font-light font-display text-neutral-900 dark:text-white capitalize tracking-tight mb-2",
                      children: [ti, " Parameters"]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4199,
                      columnNumber: 29
                    }, this), f.jsxDEV("p", {
                      className: "text-[13px] text-zinc-500 leading-relaxed font-sans",
                      children: "This module is currently being provisioned for your enterprise workspace. Telemetry configuration will be unlocked shortly."
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4200,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4198,
                    columnNumber: 27
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4194,
                  columnNumber: 25
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 4083,
                columnNumber: 21
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 4048,
              columnNumber: 19
            }, this), c === "api_keys" && f.jsxDEV("div", {
              className: "animate-fadeIn max-w-7xl mx-auto space-y-8",
              children: [f.jsxDEV("div", {
                className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6",
                children: [f.jsxDEV("h2", {
                  className: "text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight",
                  children: "API Keys"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4212,
                  columnNumber: 23
                }, this), f.jsxDEV("button", {
                  onClick: () => Bs(!0),
                  className: "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm",
                  children: [f.jsxDEV(d5, {
                    className: "w-4 h-4"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4219,
                    columnNumber: 25
                  }, this), " Create API key"]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4215,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 4211,
                columnNumber: 21
              }, this), f.jsxDEV("div", {
                className: "flex flex-col md:flex-row gap-4 mb-6",
                children: [f.jsxDEV("div", {
                  className: "relative flex-1",
                  children: [f.jsxDEV(Om, {
                    className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4225,
                    columnNumber: 25
                  }, this), f.jsxDEV("input", {
                    type: "text",
                    placeholder: "Search...",
                    value: Le,
                    onChange: F => He(F.target.value),
                    className: "w-full pl-9 pr-4 py-2 bg-white dark:bg-[#111111] border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4226,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4224,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "relative",
                  children: [f.jsxDEV("button", {
                    onClick: () => on(!nn),
                    onBlur: () => setTimeout(() => on(!1), 150),
                    className: "px-4 py-2 bg-white dark:bg-[#111111] border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white flex items-center justify-between min-w-[150px]",
                    children: Ke
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4235,
                    columnNumber: 25
                  }, this), nn && f.jsxDEV("div", {
                    className: "absolute right-0 top-full mt-2 w-48 rounded-xl bg-white/30 dark:bg-[#111111]/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden p-1 animate-in fade-in slide-in-from-top-2",
                    children: ["All permissions", "Full access", "Sending access"].map(F => f.jsxDEV("button", {
                      onClick: () => {
                        bt(F), on(!1);
                      },
                      className: "w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2",
                      children: F
                    }, F, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4245,
                      columnNumber: 31
                    }, this))
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4243,
                    columnNumber: 27
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4234,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 4223,
                columnNumber: 21
              }, this), f.jsxDEV("div", {
                className: "bg-white dark:bg-[#111111] border border-neutral-200 dark:border-zinc-800 rounded-xl overflow-visible shadow-sm",
                children: f.jsxDEV("table", {
                  className: "w-full text-sm text-left",
                  children: [f.jsxDEV("thead", {
                    className: "bg-neutral-50 dark:bg-zinc-900/40 text-neutral-500 dark:text-neutral-400 text-xs font-semibold",
                    children: f.jsxDEV("tr", {
                      children: [f.jsxDEV("th", {
                        className: "px-6 py-3 font-mono uppercase tracking-widest rounded-tl-xl",
                        children: "Name"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4262,
                        columnNumber: 29
                      }, this), f.jsxDEV("th", {
                        className: "px-6 py-3 font-mono uppercase tracking-widest",
                        children: "Token"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4263,
                        columnNumber: 29
                      }, this), f.jsxDEV("th", {
                        className: "px-6 py-3 font-mono uppercase tracking-widest",
                        children: "Permission"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4264,
                        columnNumber: 29
                      }, this), f.jsxDEV("th", {
                        className: "px-6 py-3 font-mono uppercase tracking-widest",
                        children: "Last used"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4265,
                        columnNumber: 29
                      }, this), f.jsxDEV("th", {
                        className: "px-6 py-3 font-mono uppercase tracking-widest",
                        children: "Created"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4266,
                        columnNumber: 29
                      }, this), f.jsxDEV("th", {
                        className: "px-6 py-3 text-right font-mono uppercase tracking-widest rounded-tr-xl"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4267,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4261,
                      columnNumber: 27
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4260,
                    columnNumber: 25
                  }, this), f.jsxDEV("tbody", {
                    className: "divide-y divide-neutral-100 dark:divide-zinc-800",
                    children: er.map(F => f.jsxDEV("tr", {
                      className: "hover:bg-neutral-50/50 dark:hover:bg-zinc-900/20 transition-colors group relative z-0 hover:z-50",
                      children: [f.jsxDEV("td", {
                        className: "px-6 py-4 flex items-center gap-3",
                        children: [f.jsxDEV("div", {
                          className: "w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20",
                          children: f.jsxDEV(wp, {
                            className: "w-4 h-4 text-emerald-500"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4275,
                            columnNumber: 35
                          }, this)
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4274,
                          columnNumber: 33
                        }, this), f.jsxDEV("span", {
                          className: "font-semibold text-neutral-900 dark:text-white",
                          children: F.name
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4277,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4273,
                        columnNumber: 31
                      }, this), f.jsxDEV("td", {
                        className: "px-6 py-4",
                        children: f.jsxDEV("span", {
                          className: "px-2.5 py-1 bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 rounded-md font-mono text-xs text-neutral-600 dark:text-neutral-300",
                          children: F.token
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4280,
                          columnNumber: 33
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4279,
                        columnNumber: 31
                      }, this), f.jsxDEV("td", {
                        className: "px-6 py-4 font-semibold text-neutral-900 dark:text-white",
                        children: F.permission
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4284,
                        columnNumber: 31
                      }, this), f.jsxDEV("td", {
                        className: "px-6 py-4 text-neutral-500 dark:text-neutral-400",
                        children: F.lastUsed
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4285,
                        columnNumber: 31
                      }, this), f.jsxDEV("td", {
                        className: "px-6 py-4 text-neutral-500 dark:text-neutral-400",
                        children: F.createdAt
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4286,
                        columnNumber: 31
                      }, this), f.jsxDEV("td", {
                        className: "px-6 py-4 text-right relative",
                        children: [f.jsxDEV("button", {
                          onClick: () => Yt(yt === F.id ? null : F.id),
                          onBlur: () => setTimeout(() => Yt(null), 150),
                          className: "text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors relative z-10",
                          children: f.jsxDEV(Wne, {
                            className: "w-5 h-5"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4293,
                            columnNumber: 35
                          }, this)
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4288,
                          columnNumber: 33
                        }, this), yt === F.id && f.jsxDEV("div", {
                          className: "absolute right-10 top-1/2 -translate-y-1/2 w-48 rounded-xl bg-white/80 dark:bg-[#1a1a1c]/90 backdrop-blur-3xl border border-neutral-200/80 dark:border-zinc-700/80 shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.7)] z-[999] overflow-hidden p-1 animate-in fade-in zoom-in-95",
                          children: [f.jsxDEV("button", {
                            onClick: () => {
                              navigator.clipboard.writeText(F.token);
                            },
                            className: "w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2",
                            children: [f.jsxDEV(Id, {
                              className: "w-4 h-4"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4303,
                              columnNumber: 39
                            }, this), " Copy Token"]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4297,
                            columnNumber: 37
                          }, this), f.jsxDEV("button", {
                            onClick: () => Wr(F.id),
                            className: "w-full text-left px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2 mt-1",
                            children: [f.jsxDEV(f5, {
                              className: "w-4 h-4"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4309,
                              columnNumber: 39
                            }, this), " Revoke Key"]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4305,
                            columnNumber: 37
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4296,
                          columnNumber: 35
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4287,
                        columnNumber: 31
                      }, this)]
                    }, F.id, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4272,
                      columnNumber: 29
                    }, this))
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4270,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4259,
                  columnNumber: 23
                }, this)
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 4258,
                columnNumber: 21
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 4210,
              columnNumber: 19
            }, this), c === "billing" && f.jsxDEV("div", {
              className: "space-y-12 animate-fadeIn",
              children: [f.jsxDEV("div", {
                children: [f.jsxDEV("h2", {
                  className: "text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight",
                  children: "Corporate Billing & Allocations"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4325,
                  columnNumber: 23
                }, this), f.jsxDEV("p", {
                  className: "text-xs text-zinc-500 mt-1",
                  children: "Monitor real-time subscription ledgers, request custom dispatch bumps, and secure commercial payment credentials."
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4326,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 4324,
                columnNumber: 21
              }, this), f.jsxDEV("div", {
                className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
                children: [f.jsxDEV(lt.div, {
                  variants: Kt,
                  className: "lg:col-span-5 bg-white dark:bg-zinc-900/30 backdrop-blur-xl border border-neutral-200 dark:border-zinc-800/60 rounded-2xl p-6 shadow-sm dark:shadow-xl relative overflow-hidden h-72 flex flex-col justify-between",
                  children: [f.jsxDEV("div", {
                    className: "absolute inset-0 border border-emerald-500/10 rounded-2xl pointer-events-none"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4332,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "space-y-2",
                    children: [f.jsxDEV("span", {
                      className: "text-[9px] uppercase text-emerald-600 dark:text-neutral-900 dark:text-white bg-emerald-500/5 px-2.5 py-0.5 rounded border border-emerald-500/20 font-semibold inline-block tracking-wider",
                      children: "Active Corporate License"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4335,
                      columnNumber: 27
                    }, this), f.jsxDEV("h4", {
                      className: "text-xl font-light font-display text-neutral-900 dark:text-white tracking-tight mt-1",
                      children: "Enterprise Audit Node"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4338,
                      columnNumber: 27
                    }, this), f.jsxDEV("p", {
                      className: "text-[11px] text-zinc-500 leading-relaxed font-normal",
                      children: "Automated high-capacity MTA routes armed with complete dedicated IP configurations and unlimited verification hooks."
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4339,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4334,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-zinc-900/80",
                    children: [f.jsxDEV("div", {
                      className: "text-xs",
                      children: [f.jsxDEV("span", {
                        className: "text-zinc-500 font-normal",
                        children: "Next Renewal"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4346,
                        columnNumber: 29
                      }, this), f.jsxDEV("p", {
                        className: "text-neutral-800 dark:text-zinc-300 font-semibold mt-0.5",
                        children: "August 11, 2026"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4347,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4345,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "text-right text-xs",
                      children: [f.jsxDEV("span", {
                        className: "text-zinc-500 font-normal",
                        children: "Subscription Cost"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4350,
                        columnNumber: 29
                      }, this), f.jsxDEV("p", {
                        className: "text-emerald-600 dark:text-neutral-900 dark:text-white font-semibold mt-0.5",
                        children: "$149.00 / mo"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4351,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4349,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4344,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4331,
                  columnNumber: 23
                }, this), f.jsxDEV(lt.div, {
                  variants: Kt,
                  className: "lg:col-span-7 space-y-6",
                  children: [f.jsxDEV("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch",
                    children: [f.jsxDEV("div", {
                      className: "relative overflow-hidden rounded-2xl bg-gradient-to-tr from-[#111113] via-[#1f1f23] to-[#0c0c0e] border border-neutral-200/20 dark:border-zinc-800/80 p-6 text-white shadow-2xl flex flex-col justify-between min-h-[200px] group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]",
                      children: [f.jsxDEV("div", {
                        className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.03),transparent)] opacity-80 pointer-events-none"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4362,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:4px_4px] opacity-[0.15] pointer-events-none"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4363,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "flex justify-between items-start relative z-10",
                        children: [f.jsxDEV("div", {
                          className: "w-10 h-7 rounded bg-gradient-to-tr from-yellow-500/80 via-amber-200 to-yellow-600/90 border border-yellow-400/40 flex items-center justify-center overflow-hidden shadow-[0_2px_8px_rgba(234,179,8,0.2)]",
                          children: f.jsxDEV("div", {
                            className: "grid grid-cols-3 gap-0.5 w-full h-full p-1 opacity-60",
                            children: [f.jsxDEV("div", {
                              className: "border-r border-b border-yellow-800/40"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4369,
                              columnNumber: 35
                            }, this), f.jsxDEV("div", {
                              className: "border-r border-b border-yellow-800/40"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4370,
                              columnNumber: 35
                            }, this), f.jsxDEV("div", {
                              className: "border-b border-yellow-800/40"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4371,
                              columnNumber: 35
                            }, this), f.jsxDEV("div", {
                              className: "border-r border-yellow-800/40"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4372,
                              columnNumber: 35
                            }, this), f.jsxDEV("div", {
                              className: "border-r border-yellow-800/40"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4373,
                              columnNumber: 35
                            }, this), f.jsxDEV("div", {
                              className: "border-yellow-800/40"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4374,
                              columnNumber: 35
                            }, this)]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4368,
                            columnNumber: 33
                          }, this)
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4367,
                          columnNumber: 31
                        }, this), (() => {
                          const F = Rs.replace(/\D/g, ""),
                            ye = F.startsWith("4"),
                            Be = F.startsWith("5");
                          return ye ? f.jsxDEV("div", {
                            className: "flex flex-col items-end",
                            children: [f.jsxDEV("span", {
                              className: "text-xl font-black italic tracking-wide text-zinc-100 font-display select-none",
                              children: "VISA"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4386,
                              columnNumber: 39
                            }, this), f.jsxDEV("span", {
                              className: "text-[7px] text-zinc-400 uppercase tracking-widest font-mono font-bold leading-none mt-0.5",
                              children: "Gold Elite"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4387,
                              columnNumber: 39
                            }, this)]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4385,
                            columnNumber: 37
                          }, this) : Be ? f.jsxDEV("div", {
                            className: "flex flex-col items-end",
                            children: [f.jsxDEV("div", {
                              className: "flex -space-x-1.5 items-center",
                              children: [f.jsxDEV("div", {
                                className: "w-5 h-5 rounded-full bg-rose-500 opacity-90 shadow-sm"
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 4394,
                                columnNumber: 41
                              }, this), f.jsxDEV("div", {
                                className: "w-5 h-5 rounded-full bg-amber-500 opacity-90 mix-blend-screen shadow-sm"
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 4395,
                                columnNumber: 41
                              }, this)]
                            }, void 0, !0, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4393,
                              columnNumber: 39
                            }, this), f.jsxDEV("span", {
                              className: "text-[7px] text-zinc-400 uppercase tracking-widest font-mono font-bold leading-none mt-1",
                              children: "World Elite"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4397,
                              columnNumber: 39
                            }, this)]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4392,
                            columnNumber: 37
                          }, this) : f.jsxDEV("div", {
                            className: "flex flex-col items-end",
                            children: [f.jsxDEV("span", {
                              className: "text-xs font-bold tracking-widest font-mono text-zinc-300 uppercase",
                              children: "TIK PRIVATE"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4403,
                              columnNumber: 39
                            }, this), f.jsxDEV("span", {
                              className: "text-[7px] text-zinc-500 uppercase tracking-widest font-mono leading-none mt-0.5",
                              children: "Corporate Master"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4404,
                              columnNumber: 39
                            }, this)]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4402,
                            columnNumber: 37
                          }, this);
                        })()]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4366,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "space-y-1 my-4 relative z-10",
                        children: f.jsxDEV("div", {
                          className: "text-lg font-mono tracking-[0.22em] text-zinc-100 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
                          children: (() => {
                            const F = Rs.replace(/\D/g, ""),
                              ye = F.substring(0, 4) || "••••",
                              Be = F.substring(F.length - 4) || "••••";
                            return `${ye} **** **** ${Be}`;
                          })()
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4413,
                          columnNumber: 31
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4412,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "flex justify-between items-end relative z-10",
                        children: [f.jsxDEV("div", {
                          children: [f.jsxDEV("span", {
                            className: "text-[8px] uppercase tracking-widest text-zinc-500 font-bold",
                            children: "CARDHOLDER"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4426,
                            columnNumber: 33
                          }, this), f.jsxDEV("p", {
                            className: "text-xs font-semibold font-sans text-zinc-200 uppercase tracking-wider",
                            children: gf
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4427,
                            columnNumber: 33
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4425,
                          columnNumber: 31
                        }, this), f.jsxDEV("div", {
                          className: "text-right",
                          children: [f.jsxDEV("span", {
                            className: "text-[8px] uppercase tracking-widest text-zinc-500 font-bold",
                            children: "EXPIRES"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4430,
                            columnNumber: 33
                          }, this), f.jsxDEV("p", {
                            className: "text-xs font-mono text-zinc-200 font-semibold",
                            children: mc
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4431,
                            columnNumber: 33
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4429,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4424,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "absolute -top-10 -left-10 w-36 h-36 bg-zinc-700/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-zinc-700/20 transition-all duration-700"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4436,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "absolute -bottom-10 -right-10 w-36 h-36 bg-neutral-800/30 rounded-full blur-[40px] pointer-events-none"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4437,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4360,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: `flex flex-col justify-between p-6 ${Ba} rounded-2xl`,
                      children: [f.jsxDEV("div", {
                        className: "space-y-2",
                        children: [f.jsxDEV("h5", {
                          className: "text-xs font-semibold font-display uppercase text-neutral-800 dark:text-zinc-300 tracking-wider flex items-center gap-2",
                          children: [f.jsxDEV(qD, {
                            className: "w-3.5 h-3.5 text-neutral-900 dark:text-white"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4444,
                            columnNumber: 33
                          }, this), "Payment Gateway"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4443,
                          columnNumber: 31
                        }, this), f.jsxDEV("p", {
                          className: "text-[11px] text-zinc-500 leading-normal",
                          children: "Secure transactions are routed through an encrypted hardware ledger. Customize payment card details anytime."
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4447,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4442,
                        columnNumber: 29
                      }, this), f.jsxDEV("button", {
                        onClick: () => {
                          Zc(!Nl), wl(!1);
                        },
                        className: "w-full mt-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-neutral-800 dark:border-zinc-800 text-xs font-medium text-white rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2",
                        children: [f.jsxDEV(YD, {
                          className: "w-3.5 h-3.5"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4459,
                          columnNumber: 31
                        }, this), Nl ? "Hide Secure Editor" : "Modify Vault Card"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4452,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4441,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4358,
                    columnNumber: 25
                  }, this), Nl && f.jsxDEV(lt.div, {
                    initial: {
                      opacity: 0,
                      y: -10
                    },
                    animate: {
                      opacity: 1,
                      y: 0
                    },
                    className: `${Ba} p-6 space-y-4`,
                    children: [f.jsxDEV("h4", {
                      className: "text-xs font-semibold uppercase tracking-wider text-neutral-800 dark:text-zinc-300",
                      children: "Update Secure Vault Card"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4472,
                      columnNumber: 29
                    }, this), Qt && f.jsxDEV("div", {
                      className: "p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-600 dark:text-neutral-900 dark:text-white flex items-center gap-2",
                      children: [f.jsxDEV(en, {
                        className: "w-4 h-4 text-emerald-500 shrink-0"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4476,
                        columnNumber: 33
                      }, this), "Secure database records synchronized successfully. Card updated."]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4475,
                      columnNumber: 31
                    }, this), f.jsxDEV("div", {
                      className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs",
                      children: [f.jsxDEV("div", {
                        className: "space-y-1.5",
                        children: [f.jsxDEV("label", {
                          className: "text-zinc-500",
                          children: "Cardholder Name"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4483,
                          columnNumber: 33
                        }, this), f.jsxDEV("input", {
                          type: "text",
                          value: gf,
                          onChange: F => Ip(F.target.value),
                          className: "w-full px-3 py-2 bg-neutral-100 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-lg text-neutral-950 dark:text-white"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4484,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4482,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "space-y-1.5",
                        children: [f.jsxDEV("label", {
                          className: "text-zinc-500",
                          children: "Card Number"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4492,
                          columnNumber: 33
                        }, this), f.jsxDEV("input", {
                          type: "text",
                          value: Rs,
                          onChange: F => Ra(F.target.value),
                          placeholder: "4000 1234 5678 9012",
                          className: "w-full px-3 py-2 bg-neutral-100 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-lg text-neutral-950 dark:text-white font-mono"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4493,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4491,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "space-y-1.5",
                        children: [f.jsxDEV("label", {
                          className: "text-zinc-500",
                          children: "Expiry Date"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4502,
                          columnNumber: 33
                        }, this), f.jsxDEV("input", {
                          type: "text",
                          value: mc,
                          onChange: F => Is(F.target.value),
                          placeholder: "MM/YY",
                          className: "w-full px-3 py-2 bg-neutral-100 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-lg text-neutral-950 dark:text-white font-mono"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4503,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4501,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "space-y-1.5",
                        children: [f.jsxDEV("label", {
                          className: "text-zinc-500",
                          children: "CVV Security Code"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4512,
                          columnNumber: 33
                        }, this), f.jsxDEV("input", {
                          type: "password",
                          value: vf,
                          onChange: F => Vo(F.target.value),
                          placeholder: "•••",
                          maxLength: 4,
                          className: "w-full px-3 py-2 bg-neutral-100 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-lg text-neutral-950 dark:text-white font-mono"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4513,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4511,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4481,
                      columnNumber: 29
                    }, this), f.jsxDEV("button", {
                      onClick: () => {
                        wl(!0), s("Settings Updated Successfully"), setTimeout(() => {
                          wl(!1), Zc(!1);
                        }, 2500);
                      },
                      className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-all cursor-pointer",
                      children: "Save Secure Vault Credentials"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4524,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4467,
                    columnNumber: 27
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4357,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 4329,
                columnNumber: 21
              }, this), f.jsxDEV("div", {
                className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
                children: [f.jsxDEV(lt.div, {
                  variants: Kt,
                  className: "lg:col-span-5 bg-gradient-to-br from-white via-[#fbfbfb] to-[#f4f4f6] dark:from-[#0f0f12] dark:via-[#0a0a0c] dark:to-[#030304] border border-neutral-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-md dark:shadow-2xl h-80 flex flex-col justify-between relative overflow-hidden group",
                  children: [f.jsxDEV("div", {
                    className: "absolute -top-12 -left-12 w-28 h-28 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4547,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "space-y-1 relative z-10",
                    children: [f.jsxDEV("h4", {
                      className: "text-xs font-semibold font-display uppercase text-neutral-800 dark:text-zinc-300 tracking-wider flex items-center gap-2",
                      children: [f.jsxDEV(Ud, {
                        className: "w-3.5 h-3.5 text-emerald-500 dark:text-neutral-900 dark:text-white"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4551,
                        columnNumber: 29
                      }, this), "Dynamic Live Quota Gauge"]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4550,
                      columnNumber: 27
                    }, this), f.jsxDEV("p", {
                      className: "text-[10px] text-zinc-500 dark:text-zinc-500 font-normal leading-normal",
                      children: "Real-time sliding visual monitoring index of dispatches registered against active server limits."
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4554,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4549,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "grid grid-cols-12 gap-4 items-center my-2 relative z-10",
                    children: [f.jsxDEV("div", {
                      className: "col-span-5 flex justify-center relative",
                      children: [f.jsxDEV("svg", {
                        className: "w-24 h-24 transform -rotate-90",
                        viewBox: "0 0 100 100",
                        children: [f.jsxDEV("circle", {
                          cx: "50",
                          cy: "50",
                          r: "40",
                          className: "stroke-neutral-200/50 dark:stroke-zinc-800/80",
                          strokeWidth: "8",
                          fill: "transparent"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4565,
                          columnNumber: 31
                        }, this), f.jsxDEV(lt.circle, {
                          cx: "50",
                          cy: "50",
                          r: "40",
                          stroke: "url(#quotaGradient)",
                          strokeWidth: "8",
                          fill: "transparent",
                          strokeDasharray: "251.2",
                          strokeDashoffset: 251.2 - 251.2 * (Oo ? 14240 / fs : 14240 / 5e4),
                          strokeLinecap: "round",
                          className: "transition-all duration-1000 ease-out"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4574,
                          columnNumber: 31
                        }, this), f.jsxDEV("defs", {
                          children: f.jsxDEV("linearGradient", {
                            id: "quotaGradient",
                            x1: "0%",
                            y1: "0%",
                            x2: "100%",
                            y2: "100%",
                            children: [f.jsxDEV("stop", {
                              offset: "0%",
                              stopColor: "#10b981"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4589,
                              columnNumber: 35
                            }, this), f.jsxDEV("stop", {
                              offset: "100%",
                              stopColor: "#06b6d4"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4590,
                              columnNumber: 35
                            }, this)]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4588,
                            columnNumber: 33
                          }, this)
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4587,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4563,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "absolute inset-0 flex flex-col items-center justify-center",
                        children: [f.jsxDEV("span", {
                          className: "text-lg font-light font-display text-neutral-900 dark:text-white leading-none",
                          children: [((Oo ? 14240 / fs : 14240 / 5e4) * 100).toFixed(1), "%"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4596,
                          columnNumber: 31
                        }, this), f.jsxDEV("span", {
                          className: "text-[8px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-mono mt-1",
                          children: "USED"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4599,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4595,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4562,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "col-span-7 space-y-3 font-mono text-xs",
                      children: [f.jsxDEV("div", {
                        children: [f.jsxDEV("span", {
                          className: "text-[10px] text-zinc-400 uppercase tracking-wider block",
                          children: "DISPATCHED VOLUME"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4606,
                          columnNumber: 31
                        }, this), f.jsxDEV("span", {
                          className: "text-sm font-semibold text-neutral-800 dark:text-zinc-200",
                          children: "14,240 emails"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4607,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4605,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        children: [f.jsxDEV("span", {
                          className: "text-[10px] text-zinc-400 uppercase tracking-wider block",
                          children: "TOTAL QUOTA LIMIT"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4610,
                          columnNumber: 31
                        }, this), f.jsxDEV("span", {
                          className: "text-sm font-semibold text-emerald-600 dark:text-neutral-900 dark:text-white",
                          children: [ba, " limit"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4611,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4609,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4604,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4560,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "text-[10px] text-zinc-500 bg-neutral-100/60 dark:bg-zinc-950/40 p-3 rounded-xl border border-neutral-200/50 dark:border-zinc-900 relative z-10 text-center",
                    children: ["Quota refreshes automatically in 30 days. Need higher bandwidth?", " ", f.jsxDEV("button", {
                      onClick: () => {
                        ds(!dc), yi(!1);
                      },
                      className: "text-emerald-600 dark:text-neutral-900 dark:text-white cursor-pointer font-semibold hover:underline",
                      children: "Request Token Limit Bump"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4620,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4618,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4545,
                  columnNumber: 23
                }, this), f.jsxDEV(lt.div, {
                  variants: Kt,
                  className: "lg:col-span-7 h-72 flex flex-col justify-between",
                  children: dc ? f.jsxDEV("div", {
                    className: `p-6 ${Ba} h-full flex flex-col justify-between`,
                    children: [f.jsxDEV("div", {
                      className: "space-y-1",
                      children: [f.jsxDEV("h4", {
                        className: "text-xs font-semibold uppercase tracking-wider text-neutral-800 dark:text-zinc-300",
                        children: "Token Limit Configurator"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4655,
                        columnNumber: 31
                      }, this), f.jsxDEV("p", {
                        className: "text-[11px] text-zinc-500",
                        children: "Drag to adjust the required high-capacity monthly limit."
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4656,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4654,
                      columnNumber: 29
                    }, this), Oo ? f.jsxDEV("div", {
                      className: "p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2 text-center my-auto",
                      children: [f.jsxDEV(l5, {
                        className: "w-6 h-6 text-emerald-500 mx-auto animate-bounce"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4661,
                        columnNumber: 33
                      }, this), f.jsxDEV("h5", {
                        className: "text-xs font-semibold text-neutral-900 dark:text-white",
                        children: "Limit Bump Transmitted"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4662,
                        columnNumber: 33
                      }, this), f.jsxDEV("p", {
                        className: "text-[11px] text-zinc-500",
                        children: ["Your request to increase quota to ", f.jsxDEV("span", {
                          className: "font-bold text-emerald-500",
                          children: fs.toLocaleString()
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4664,
                          columnNumber: 69
                        }, this), " has been authorized. Limit updated!"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4663,
                        columnNumber: 33
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4660,
                      columnNumber: 31
                    }, this) : f.jsxDEV("div", {
                      className: "space-y-6",
                      children: [f.jsxDEV("div", {
                        className: "space-y-2",
                        children: [f.jsxDEV("div", {
                          className: "flex justify-between text-xs",
                          children: [f.jsxDEV("span", {
                            className: "text-zinc-500",
                            children: "Desired Quota Limit"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4671,
                            columnNumber: 37
                          }, this), f.jsxDEV("span", {
                            className: "font-mono font-bold text-emerald-500",
                            children: [fs.toLocaleString(), " dispatches"]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4672,
                            columnNumber: 37
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4670,
                          columnNumber: 35
                        }, this), f.jsxDEV("input", {
                          type: "range",
                          min: "50000",
                          max: "500000",
                          step: "25000",
                          value: fs,
                          onChange: F => hf(Number(F.target.value)),
                          className: "w-full accent-emerald-500 cursor-pointer"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4674,
                          columnNumber: 35
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4669,
                        columnNumber: 33
                      }, this), f.jsxDEV("div", {
                        className: "flex gap-3",
                        children: [f.jsxDEV("button", {
                          onClick: () => {
                            yi(!0);
                          },
                          className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-all",
                          children: "Deploy Limit Bump"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4686,
                          columnNumber: 35
                        }, this), f.jsxDEV("button", {
                          onClick: () => ds(!1),
                          className: "px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-neutral-800 dark:text-zinc-200 text-xs font-medium rounded-lg transition-all",
                          children: "Cancel"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4694,
                          columnNumber: 35
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4685,
                        columnNumber: 33
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4668,
                      columnNumber: 31
                    }, this), f.jsxDEV("div", {
                      className: "text-[9px] text-zinc-500 font-mono tracking-wider",
                      children: "SECURE TRANSMISSION ENCRYPTED via SSH-SHA256"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4704,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4653,
                    columnNumber: 27
                  }, this) : f.jsxDEV("div", {
                    className: `p-6 ${Ba} h-full flex flex-col justify-center items-center text-center space-y-4`,
                    children: [f.jsxDEV("div", {
                      className: "w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center",
                      children: f.jsxDEV(gp, {
                        className: "w-6 h-6 text-emerald-500"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4637,
                        columnNumber: 31
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4636,
                      columnNumber: 29
                    }, this), f.jsxDEV("div", {
                      className: "space-y-1",
                      children: [f.jsxDEV("h4", {
                        className: "text-sm font-semibold font-display text-neutral-900 dark:text-white",
                        children: "Expand Server Capacities Instantly"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4640,
                        columnNumber: 31
                      }, this), f.jsxDEV("p", {
                        className: "text-xs text-zinc-500 max-w-sm leading-relaxed",
                        children: "Seamlessly deploy extra bandwidth resources to your SMTP cluster by bumping the dispatch limits on-the-fly."
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4641,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4639,
                      columnNumber: 29
                    }, this), f.jsxDEV("button", {
                      onClick: () => ds(!0),
                      className: "px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-neutral-800 dark:border-zinc-800 text-xs font-medium text-white rounded-lg transition-colors cursor-pointer",
                      children: "Launch Limit Bumper"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4645,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4635,
                    columnNumber: 27
                  }, this)
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4633,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 4543,
                columnNumber: 21
              }, this), f.jsxDEV(lt.div, {
                variants: Kt,
                className: "bg-white dark:bg-zinc-900/20 border border-neutral-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm dark:shadow-xl",
                children: [f.jsxDEV("div", {
                  className: "p-6 border-b border-neutral-200 dark:border-zinc-900 bg-neutral-50 dark:bg-zinc-950/20 flex flex-col md:flex-row md:items-center justify-between gap-4",
                  children: [f.jsxDEV("div", {
                    children: [f.jsxDEV("h4", {
                      className: "text-xs font-semibold font-display uppercase text-neutral-800 dark:text-zinc-400 tracking-wider",
                      children: "Historic Transaction Ledger"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4716,
                      columnNumber: 27
                    }, this), f.jsxDEV("p", {
                      className: "text-[11px] text-zinc-500 mt-1",
                      children: "Audit and export cryptographically signed corporate statement invoices."
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4717,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4715,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex flex-wrap items-center gap-3",
                    children: [f.jsxDEV("input", {
                      type: "text",
                      placeholder: "Search Txn ID...",
                      value: hc,
                      onChange: F => xf(F.target.value),
                      className: "px-3 py-1.5 text-xs bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-lg text-neutral-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 font-normal"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4722,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "relative",
                      children: [f.jsxDEV("button", {
                        onClick: () => so(!oo),
                        onBlur: () => setTimeout(() => so(!1), 150),
                        className: "px-3 py-1.5 text-xs bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-lg text-neutral-950 dark:text-white cursor-pointer font-normal min-w-[120px] text-left",
                        children: oa === "All" ? "All Invoices" : oa
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4732,
                        columnNumber: 29
                      }, this), oo && f.jsxDEV("div", {
                        className: "absolute right-0 top-full mt-2 w-48 rounded-xl bg-white/30 dark:bg-[#111111]/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden p-1 animate-in fade-in slide-in-from-top-2",
                        children: [{
                          label: "All Invoices",
                          value: "All"
                        }, {
                          label: "Paid",
                          value: "Paid"
                        }, {
                          label: "Processing",
                          value: "Processing"
                        }, {
                          label: "Overdue",
                          value: "Overdue"
                        }].map(F => f.jsxDEV("button", {
                          onClick: () => {
                            Bp(F.value), so(!1);
                          },
                          className: "w-full text-left px-3 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center gap-2",
                          children: F.label
                        }, F.value, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4747,
                          columnNumber: 35
                        }, this))
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4740,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4731,
                      columnNumber: 27
                    }, this), f.jsxDEV("button", {
                      onClick: yc,
                      className: "px-3.5 py-1.5 bg-neutral-950 hover:bg-neutral-900 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-semibold text-white border border-neutral-950 dark:border-zinc-800 rounded-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]",
                      children: [f.jsxDEV(zB, {
                        className: "w-3.5 h-3.5 text-neutral-900 dark:text-white"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4763,
                        columnNumber: 29
                      }, this), "Statement PDF"]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4759,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4720,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4714,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "overflow-x-auto",
                  children: f.jsxDEV("table", {
                    className: "w-full text-left border-collapse text-xs font-normal",
                    children: [f.jsxDEV("thead", {
                      children: f.jsxDEV("tr", {
                        className: "bg-neutral-100 dark:bg-zinc-950/40 text-zinc-500 text-[10px] uppercase border-b border-neutral-200 dark:border-zinc-900 tracking-wider",
                        children: [f.jsxDEV("th", {
                          className: "px-6 py-4 font-normal",
                          children: "Date"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4773,
                          columnNumber: 31
                        }, this), f.jsxDEV("th", {
                          className: "px-6 py-4 font-normal",
                          children: "Transaction Reference ID"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4774,
                          columnNumber: 31
                        }, this), f.jsxDEV("th", {
                          className: "px-6 py-4 font-normal",
                          children: "Value"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4775,
                          columnNumber: 31
                        }, this), f.jsxDEV("th", {
                          className: "px-6 py-4 font-normal",
                          children: "Status"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4776,
                          columnNumber: 31
                        }, this), f.jsxDEV("th", {
                          className: "px-6 py-4 font-normal text-right",
                          children: "Action"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4777,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4772,
                        columnNumber: 29
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4771,
                      columnNumber: 27
                    }, this), f.jsxDEV("tbody", {
                      className: "divide-y divide-neutral-200 dark:divide-zinc-900/40",
                      children: [{
                        date: "Jul 11, 2026",
                        ref: "TXN-908234-ADF",
                        val: "$149.00 USD",
                        status: "Paid"
                      }, {
                        date: "Jun 11, 2026",
                        ref: "TXN-874102-KSD",
                        val: "$149.00 USD",
                        status: "Paid"
                      }, {
                        date: "May 11, 2026",
                        ref: "TXN-794012-PQA",
                        val: "$149.00 USD",
                        status: "Paid"
                      }, {
                        date: "Apr 11, 2026",
                        ref: "TXN-712894-LMW",
                        val: "$149.00 USD",
                        status: "Processing"
                      }, {
                        date: "Mar 11, 2026",
                        ref: "TXN-623910-YTR",
                        val: "$149.00 USD",
                        status: "Overdue"
                      }].filter(F => {
                        const ye = F.ref.toLowerCase().includes(hc.toLowerCase()),
                          Be = oa === "All" || F.status === oa;
                        return ye && Be;
                      }).map((F, ye) => {
                        let Be = "";
                        return F.status === "Paid" ? Be = "text-emerald-600 dark:text-neutral-900 dark:text-white bg-emerald-500/5 border border-emerald-500/20" : F.status === "Processing" ? Be = "text-amber-600 dark:text-amber-400 bg-amber-500/5 border border-amber-500/20" : Be = "text-rose-600 dark:text-rose-400 bg-rose-500/5 border border-rose-500/20", f.jsxDEV("tr", {
                          className: "hover:bg-neutral-100/40 dark:hover:bg-zinc-900/10 transition-colors",
                          children: [f.jsxDEV("td", {
                            className: "px-6 py-4.5 text-neutral-800 dark:text-zinc-300 font-medium",
                            children: F.date
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4805,
                            columnNumber: 35
                          }, this), f.jsxDEV("td", {
                            className: "px-6 py-4.5 font-mono text-neutral-600 dark:text-zinc-400",
                            children: F.ref
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4806,
                            columnNumber: 35
                          }, this), f.jsxDEV("td", {
                            className: "px-6 py-4.5 text-neutral-900 dark:text-zinc-300 font-semibold",
                            children: F.val
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4807,
                            columnNumber: 35
                          }, this), f.jsxDEV("td", {
                            className: "px-6 py-4.5",
                            children: f.jsxDEV("span", {
                              className: `inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-normal border ${Be}`,
                              children: [f.jsxDEV("span", {
                                className: `w-1.5 h-1.5 rounded-full mr-1.5 self-center ${F.status === "Paid" ? "bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" : F.status === "Processing" ? "bg-amber-500" : "bg-rose-500"}`
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 4810,
                                columnNumber: 39
                              }, this), F.status]
                            }, void 0, !0, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4809,
                              columnNumber: 37
                            }, this)
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4808,
                            columnNumber: 35
                          }, this), f.jsxDEV("td", {
                            className: "px-6 py-4.5 text-right",
                            children: f.jsxDEV("button", {
                              onClick: () => Nc(F),
                              className: "p-1.5 text-zinc-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded border border-neutral-200 dark:border-zinc-800 transition-all cursor-pointer",
                              title: "Download invoice receipt PDF",
                              children: f.jsxDEV(HD, {
                                className: "w-3.5 h-3.5"
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 4822,
                                columnNumber: 39
                              }, this)
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 4817,
                              columnNumber: 37
                            }, this)
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4816,
                            columnNumber: 35
                          }, this)]
                        }, ye, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4804,
                          columnNumber: 33
                        }, this);
                      })
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4780,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4770,
                    columnNumber: 25
                  }, this)
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4769,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 4713,
                columnNumber: 21
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 4323,
              columnNumber: 19
            }, this), c === "pricing" && f.jsxDEV("div", {
              className: "space-y-12 animate-fadeIn",
              children: [f.jsxDEV("div", {
                className: "flex flex-col md:flex-row md:items-end justify-between gap-6",
                children: [f.jsxDEV("div", {
                  children: [f.jsxDEV("h2", {
                    className: "text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight",
                    children: ["Tickk Beta Pricing ", f.jsxDEV("span", {
                      className: "px-2 py-0.5 ml-2 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 shadow-sm align-middle inline-block transform -translate-y-1",
                      children: "PREMIUM"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4840,
                      columnNumber: 141
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4840,
                    columnNumber: 25
                  }, this), f.jsxDEV("p", {
                    className: "text-xs text-zinc-500 mt-1",
                    children: "Select the operational bandwidth that best matches your corporate sending frequency."
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4841,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4839,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "relative p-1 bg-neutral-200/50 dark:bg-zinc-950/80 border border-neutral-300/40 dark:border-zinc-800/80 rounded-xl flex items-center select-none overflow-hidden self-start",
                  children: [f.jsxDEV("button", {
                    onClick: () => Ms("monthly"),
                    className: `px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${xi === "monthly" ? "bg-white text-neutral-950 shadow-sm dark:bg-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"}`,
                    children: "MONTHLY"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4846,
                    columnNumber: 25
                  }, this), f.jsxDEV("button", {
                    onClick: () => Ms("annual"),
                    className: `px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${xi === "annual" ? "bg-white text-neutral-950 shadow-sm dark:bg-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"}`,
                    children: ["ANNUAL", f.jsxDEV("span", {
                      className: "text-[8px] bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold px-1 py-0.5 rounded font-mono uppercase",
                      children: "SAVE 20%"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4865,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4856,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4845,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 4838,
                columnNumber: 21
              }, this), ue ? f.jsxDEV(lt.div, {
                initial: {
                  opacity: 0,
                  y: 15
                },
                animate: {
                  opacity: 1,
                  y: 0
                },
                className: "p-8 bg-gradient-to-b from-zinc-100 to-zinc-200/50 dark:from-[#111111] dark:to-[#0a0a0a] border-2 border-zinc-300 dark:border-zinc-800 rounded-2xl relative overflow-hidden group shadow-[0_8px_32px_rgba(255,255,255,0.02)]",
                children: [f.jsxDEV("div", {
                  className: "absolute top-0 right-0 w-80 h-80 bg-zinc-400/5 rounded-full blur-[80px] pointer-events-none"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4877,
                  columnNumber: 25
                }, this), f.jsxDEV("div", {
                  className: "max-w-3xl space-y-6",
                  children: [f.jsxDEV("div", {
                    className: "flex items-center gap-3",
                    children: [f.jsxDEV("div", {
                      className: "p-3 bg-zinc-200 dark:bg-zinc-800 rounded-2xl",
                      children: f.jsxDEV(gp, {
                        className: "w-6 h-6 text-zinc-600 dark:text-zinc-300 animate-pulse"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4882,
                        columnNumber: 31
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4881,
                      columnNumber: 29
                    }, this), f.jsxDEV("div", {
                      children: [f.jsxDEV("span", {
                        className: "text-[10px] uppercase tracking-widest text-zinc-800 dark:text-zinc-200 font-bold font-mono",
                        children: "BETA SUPPORTER TIER"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4885,
                        columnNumber: 31
                      }, this), f.jsxDEV("h3", {
                        className: "text-xl font-bold font-display text-neutral-900 dark:text-white mt-0.5 font-sans",
                        children: "Beta Pro Access"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4886,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4884,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4880,
                    columnNumber: 27
                  }, this), f.jsxDEV("div", {
                    className: "space-y-4",
                    children: [f.jsxDEV("h4", {
                      className: "text-lg font-light font-display text-zinc-800 dark:text-zinc-200 tracking-tight leading-relaxed",
                      children: '"You are operating with ultimate email intelligence. Your dedicated high-capacity proxy cluster is fully active, bypassing standard spam filters with near-zero latency."'
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4891,
                      columnNumber: 29
                    }, this), f.jsxDEV("p", {
                      className: "text-xs text-neutral-600 dark:text-zinc-400 leading-relaxed font-normal",
                      children: ["Your smart decision to configure the ", ri(xl), " grants you unthrottled access to premium features: instant webhook callbacks, custom white-label DNS routing, and ", ba, " tracked dispatches monthly. Your outbound communication is cryptographically protected and optimized for flawless corporate engagement."]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4895,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4890,
                    columnNumber: 27
                  }, this), f.jsxDEV("div", {
                    className: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800",
                    children: [f.jsxDEV("div", {
                      children: [f.jsxDEV("span", {
                        className: "text-[9px] uppercase text-zinc-500 font-mono block",
                        children: "Allocated Handshakes"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4903,
                        columnNumber: 31
                      }, this), f.jsxDEV("span", {
                        className: "text-base font-bold font-display text-neutral-900 dark:text-white",
                        children: [ba, " / mo"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4904,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4902,
                      columnNumber: 29
                    }, this), f.jsxDEV("div", {
                      children: [f.jsxDEV("span", {
                        className: "text-[9px] uppercase text-zinc-500 font-mono block",
                        children: "Active Routing Server"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4907,
                        columnNumber: 31
                      }, this), f.jsxDEV("span", {
                        className: "text-base font-bold font-display text-neutral-900 dark:text-white",
                        children: "Secure SMTP-Node"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4908,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4906,
                      columnNumber: 29
                    }, this), f.jsxDEV("div", {
                      children: [f.jsxDEV("span", {
                        className: "text-[9px] uppercase text-zinc-500 font-mono block",
                        children: "Custom Domain Verification"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4911,
                        columnNumber: 31
                      }, this), f.jsxDEV("span", {
                        className: "text-base font-bold font-display text-zinc-800 dark:text-zinc-300",
                        children: "Verified & Secure"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4912,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4910,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4901,
                    columnNumber: 27
                  }, this), f.jsxDEV("div", {
                    className: "pt-6 flex flex-wrap items-center gap-4",
                    children: [f.jsxDEV("button", {
                      onClick: () => {
                        $(!1), Xe && Im();
                      },
                      className: "px-4 py-2 bg-neutral-900 hover:bg-neutral-850 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5",
                      children: "Manage License / View Packages"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4918,
                      columnNumber: 29
                    }, this), f.jsxDEV("span", {
                      className: "text-[10px] text-zinc-500 font-mono",
                      children: "* Click above to simulate cancel/inactive state to view packages."
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4927,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4917,
                    columnNumber: 27
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4879,
                  columnNumber: 25
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 4871,
                columnNumber: 23
              }, this) : f.jsxDEV(f.Fragment, {
                children: [f.jsxDEV("div", {
                  className: "grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch",
                  children: [f.jsxDEV(lt.div, {
                    variants: Kt,
                    className: "flex flex-col justify-between p-6 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-xl border border-neutral-200 dark:border-zinc-800/80 rounded-2xl relative overflow-hidden group",
                    children: [xl === "Telemetry Starter" && f.jsxDEV("div", {
                      className: "absolute top-0 right-0 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold text-[8px] uppercase tracking-widest px-3.5 py-1.5 rounded-bl font-mono z-20",
                      children: "Currently Active"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4940,
                      columnNumber: 31
                    }, this), f.jsxDEV("div", {
                      className: "space-y-4",
                      children: [f.jsxDEV("div", {
                        children: [f.jsxDEV("span", {
                          className: "text-[9px] uppercase tracking-wider text-zinc-500 font-semibold font-mono",
                          children: "Standard Pipeline"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4946,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "mt-1",
                          children: ri("Telemetry Starter")
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4947,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4945,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "flex items-baseline gap-1",
                        children: [f.jsxDEV("span", {
                          className: "text-3xl font-light font-display text-neutral-900 dark:text-white",
                          children: "$0"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4951,
                          columnNumber: 33
                        }, this), f.jsxDEV("span", {
                          className: "text-zinc-500 text-xs font-mono",
                          children: "/ month"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4952,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4950,
                        columnNumber: 31
                      }, this), f.jsxDEV("p", {
                        className: "text-xs text-zinc-500 leading-relaxed font-normal",
                        children: "Perfect for developer sandboxes, telemetry logging diagnostics, and low-frequency system testing."
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4955,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "pt-4 border-t border-neutral-200/60 dark:border-zinc-900/60 space-y-2.5",
                        children: [f.jsxDEV("div", {
                          className: "flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-300 font-normal",
                          children: [f.jsxDEV(en, {
                            className: "w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4961,
                            columnNumber: 35
                          }, this), "1,000 tracked dispatches / mo"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4960,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-300 font-normal",
                          children: [f.jsxDEV(en, {
                            className: "w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4965,
                            columnNumber: 35
                          }, this), "Standard 1x1 invisible pixel"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4964,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-300 font-normal",
                          children: [f.jsxDEV(en, {
                            className: "w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 4969,
                            columnNumber: 35
                          }, this), "7-day data retention window"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4968,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "flex items-center gap-2.5 text-xs text-zinc-400 line-through font-normal",
                          children: "Custom tracking domains"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 4972,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 4959,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4944,
                      columnNumber: 29
                    }, this), f.jsxDEV("button", {
                      onClick: () => {
                        bf("Telemetry Starter"), Po(!0), zs(!1);
                      },
                      className: "w-full mt-8 py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-neutral-800 dark:text-zinc-300 text-xs font-semibold rounded-lg border border-neutral-200/50 dark:border-zinc-800 transition-colors cursor-pointer",
                      children: "Select Free Tier"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4978,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4938,
                    columnNumber: 27
                  }, this), f.jsxDEV(lt.div, {
                    variants: Kt,
                    className: "flex flex-col justify-between p-6 bg-gradient-to-b from-neutral-100/90 to-neutral-200/40 dark:from-[#111113] dark:to-[#08080a] border-2 border-neutral-800 dark:border-zinc-700 shadow-xl rounded-2xl relative overflow-hidden group scale-[1.02] z-10",
                    children: [xl === "Growth Core Access" && f.jsxDEV("div", {
                      className: "absolute top-0 right-0 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold text-[8px] uppercase tracking-widest px-3.5 py-1.5 rounded-bl font-mono z-20",
                      children: "Currently Active"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4995,
                      columnNumber: 31
                    }, this), f.jsxDEV("div", {
                      className: "space-y-4",
                      children: [f.jsxDEV("div", {
                        children: [f.jsxDEV("span", {
                          className: "text-[9px] uppercase tracking-wider text-neutral-800 dark:text-zinc-400 font-bold font-mono",
                          children: "Standard Corporate Route"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5001,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "mt-1",
                          children: ri("Growth Core Access")
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5002,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5e3,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "flex items-baseline gap-1",
                        children: [f.jsxDEV("span", {
                          className: "text-3xl font-bold font-display text-neutral-900 dark:text-white",
                          children: xi === "monthly" ? "$149" : "$119"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5006,
                          columnNumber: 33
                        }, this), f.jsxDEV("span", {
                          className: "text-zinc-500 text-xs font-mono",
                          children: ["/ month ", xi === "annual" && "(billed annually)"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5009,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5005,
                        columnNumber: 31
                      }, this), f.jsxDEV("p", {
                        className: "text-xs text-zinc-500 leading-relaxed font-normal",
                        children: "High-capacity pipelines geared toward executive correspondence logs and complete SMTP delivery proxies."
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5012,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "pt-4 border-t border-neutral-200/60 dark:border-zinc-900/60 space-y-2.5",
                        children: [f.jsxDEV("div", {
                          className: "flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-200 font-semibold",
                          children: [f.jsxDEV(en, {
                            className: "w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5018,
                            columnNumber: 35
                          }, this), ba, " tracked dispatches / mo"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5017,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-200 font-semibold",
                          children: [f.jsxDEV(en, {
                            className: "w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5022,
                            columnNumber: 35
                          }, this), "Active Recipient Link Proxy Wrapping"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5021,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-200 font-semibold",
                          children: [f.jsxDEV(en, {
                            className: "w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5026,
                            columnNumber: 35
                          }, this), "Instant Webhook callback feeds"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5025,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-200 font-semibold",
                          children: [f.jsxDEV(en, {
                            className: "w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5030,
                            columnNumber: 35
                          }, this), "Custom white-label tracking DNS"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5029,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5016,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 4999,
                      columnNumber: 29
                    }, this), f.jsxDEV("button", {
                      disabled: !0,
                      className: "w-full mt-8 py-2.5 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-xs font-semibold rounded-lg border border-neutral-900 dark:border-zinc-200 shadow-md transition-colors cursor-not-allowed flex items-center justify-center gap-1.5 font-mono uppercase tracking-wider",
                      children: [f.jsxDEV(l5, {
                        className: "w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5040,
                        columnNumber: 31
                      }, this), " Core Route Fully Active"]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5036,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 4991,
                    columnNumber: 27
                  }, this), f.jsxDEV(lt.div, {
                    variants: Kt,
                    className: "flex flex-col justify-between p-6 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-xl border border-neutral-200 dark:border-zinc-800/80 rounded-2xl relative overflow-hidden group",
                    children: [xl === "Quantum Sentinel" && f.jsxDEV("div", {
                      className: "absolute top-0 right-0 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold text-[8px] uppercase tracking-widest px-3.5 py-1.5 rounded-bl font-mono z-20",
                      children: "Currently Active"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5047,
                      columnNumber: 31
                    }, this), f.jsxDEV("div", {
                      className: "space-y-4",
                      children: [f.jsxDEV("div", {
                        children: [f.jsxDEV("span", {
                          className: "text-[9px] uppercase tracking-wider text-zinc-500 font-semibold font-mono",
                          children: "Unlimited Enterprise"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5053,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "mt-1",
                          children: ri("Quantum Sentinel")
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5054,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5052,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "flex items-baseline gap-1",
                        children: [f.jsxDEV("span", {
                          className: "text-3xl font-light font-display text-neutral-900 dark:text-white",
                          children: xi === "monthly" ? "$399" : "$319"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5058,
                          columnNumber: 33
                        }, this), f.jsxDEV("span", {
                          className: "text-zinc-500 text-xs font-mono",
                          children: ["/ month ", xi === "annual" && "(billed annually)"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5061,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5057,
                        columnNumber: 31
                      }, this), f.jsxDEV("p", {
                        className: "text-xs text-zinc-500 leading-relaxed font-normal",
                        children: "Ultra-secure isolated hardware configurations for massive bulk mailing infrastructures and custom IP rotation."
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5064,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "pt-4 border-t border-neutral-200/60 dark:border-zinc-900/60 space-y-2.5",
                        children: [f.jsxDEV("div", {
                          className: "flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-300 font-normal",
                          children: [f.jsxDEV(en, {
                            className: "w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5070,
                            columnNumber: 35
                          }, this), "Infinite tracked dispatches"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5069,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-300 font-normal",
                          children: [f.jsxDEV(en, {
                            className: "w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5074,
                            columnNumber: 35
                          }, this), "Dedicated isolated IP clusters"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5073,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-300 font-normal",
                          children: [f.jsxDEV(en, {
                            className: "w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5078,
                            columnNumber: 35
                          }, this), "Custom hardware SMTP server integration"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5077,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "flex items-center gap-2.5 text-xs text-neutral-800 dark:text-zinc-300 font-normal",
                          children: [f.jsxDEV(en, {
                            className: "w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3px]"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5082,
                            columnNumber: 35
                          }, this), "SLA backup & 24/7 dedicated lead engineer"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5081,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5068,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5051,
                      columnNumber: 29
                    }, this), f.jsxDEV("button", {
                      onClick: () => {
                        bf("Quantum Sentinel"), Po(!0), zs(!1);
                      },
                      className: "w-full mt-8 py-2.5 bg-neutral-950 hover:bg-neutral-900 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg border border-neutral-800 dark:border-zinc-800 transition-colors cursor-pointer",
                      children: "Upgrade Enterprise Route"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5088,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5045,
                    columnNumber: 27
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 4936,
                  columnNumber: 25
                }, this), f.jsxDEV("div", {
                  className: "p-4 bg-neutral-50 dark:bg-zinc-950/40 rounded-xl border border-neutral-200 dark:border-zinc-900 text-center text-[11px] text-zinc-500 max-w-2xl mx-auto",
                  children: ["All pipeline allocations are backed by a cryptographically secured 99.99% service-level agreement. Custom high-scale deployments can also be configured.", " ", f.jsxDEV("span", {
                    className: "text-neutral-800 dark:text-zinc-200 font-semibold cursor-pointer hover:underline",
                    children: "Contact Executive Operations"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5104,
                    columnNumber: 27
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5102,
                  columnNumber: 25
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 4934,
                columnNumber: 23
              }, this), f.jsxDEV(hi, {
                children: ia && f.jsxDEV("div", {
                  className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",
                  children: f.jsxDEV(lt.div, {
                    initial: {
                      opacity: 0,
                      scale: .95
                    },
                    animate: {
                      opacity: 1,
                      scale: 1
                    },
                    exit: {
                      opacity: 0,
                      scale: .95
                    },
                    className: "bg-white dark:bg-[#090a0c] border border-neutral-200 dark:border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative",
                    children: [f.jsxDEV("div", {
                      className: "p-6 border-b border-neutral-200 dark:border-zinc-900 flex justify-between items-center bg-neutral-50 dark:bg-zinc-950/20",
                      children: [f.jsxDEV("h4", {
                        className: "text-sm font-semibold font-display text-neutral-900 dark:text-white",
                        children: "Authorize Allocation Upgrade"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5120,
                        columnNumber: 31
                      }, this), f.jsxDEV("button", {
                        onClick: () => Po(!1),
                        className: "p-1 rounded-lg hover:bg-neutral-200 dark:hover:bg-zinc-900 text-zinc-500 transition-colors cursor-pointer",
                        children: f.jsxDEV(Bd, {
                          className: "w-4 h-4"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5125,
                          columnNumber: 33
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5121,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5119,
                      columnNumber: 29
                    }, this), f.jsxDEV("div", {
                      className: "p-6 space-y-6",
                      children: yl ? f.jsxDEV("div", {
                        className: "space-y-4 text-center py-4",
                        children: [f.jsxDEV("div", {
                          className: "w-12 h-12 rounded-full bg-zinc-700/10 flex items-center justify-center mx-auto",
                          children: f.jsxDEV(l5, {
                            className: "w-6 h-6 text-zinc-600 dark:text-zinc-300 animate-bounce"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5133,
                            columnNumber: 37
                          }, this)
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5132,
                          columnNumber: 35
                        }, this), f.jsxDEV("div", {
                          className: "space-y-1",
                          children: [f.jsxDEV("h5", {
                            className: "text-sm font-semibold text-neutral-900 dark:text-white",
                            children: "Upgrade Authorized Successfully"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5136,
                            columnNumber: 37
                          }, this), f.jsxDEV("p", {
                            className: "text-xs text-zinc-500 max-w-xs mx-auto leading-relaxed font-normal",
                            children: ["Your account license has been successfully updated to ", f.jsxDEV("span", {
                              className: "font-bold text-neutral-950 dark:text-white",
                              children: ri(io)
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5138,
                              columnNumber: 93
                            }, this), ". MTA cluster configuration updated."]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5137,
                            columnNumber: 37
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5135,
                          columnNumber: 35
                        }, this), f.jsxDEV("button", {
                          onClick: () => Po(!1),
                          className: "px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg cursor-pointer animate-pulse",
                          children: "Return to Console"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5141,
                          columnNumber: 35
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5131,
                        columnNumber: 33
                      }, this) : f.jsxDEV("div", {
                        className: "space-y-4",
                        children: [f.jsxDEV("div", {
                          className: "p-4 bg-neutral-50 dark:bg-zinc-950/45 border border-neutral-200 dark:border-zinc-900 rounded-xl space-y-1",
                          children: [f.jsxDEV("span", {
                            className: "text-[10px] text-zinc-500 font-mono",
                            children: "SELECTED ROUTE"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5151,
                            columnNumber: 37
                          }, this), f.jsxDEV("h5", {
                            className: "text-sm font-semibold text-neutral-900 dark:text-white",
                            children: ri(io)
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5152,
                            columnNumber: 37
                          }, this), f.jsxDEV("p", {
                            className: "text-xs text-zinc-600 dark:text-zinc-300 font-semibold mt-1",
                            children: io === "Telemetry Starter" ? "$0" : io === "Quantum Sentinel" ? xi === "monthly" ? "$399/mo" : "$319/mo" : ""
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5153,
                            columnNumber: 37
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5150,
                          columnNumber: 35
                        }, this), f.jsxDEV("p", {
                          className: "text-xs text-zinc-500 leading-relaxed font-normal",
                          children: ["By authorizing, you agree to immediately scale your active SMTP capabilities and charge the secure commercial card ending in ", f.jsxDEV("span", {
                            className: "font-mono text-neutral-900 dark:text-white",
                            children: "9012"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5159,
                            columnNumber: 162
                          }, this), "."]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5158,
                          columnNumber: 35
                        }, this), f.jsxDEV("div", {
                          className: "pt-4 border-t border-neutral-200/60 dark:border-zinc-900/60 flex gap-3",
                          children: [f.jsxDEV("button", {
                            onClick: () => {
                              zs(!0), $(!0), Lo(io), io === "Quantum Sentinel" && (hf(1e6), yi(!0));
                            },
                            className: "flex-1 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-white dark:text-neutral-900 text-white text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer",
                            children: "Confirm & Pay Securely"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5163,
                            columnNumber: 37
                          }, this), f.jsxDEV("button", {
                            onClick: () => Po(!1),
                            className: "flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-neutral-800 dark:text-zinc-200 text-xs font-medium rounded-lg cursor-pointer",
                            children: "Cancel"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5178,
                            columnNumber: 37
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5162,
                          columnNumber: 35
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5149,
                        columnNumber: 33
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5129,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5113,
                    columnNumber: 27
                  }, this)
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5112,
                  columnNumber: 25
                }, this)
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5110,
                columnNumber: 21
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 4837,
              columnNumber: 19
            }, this), c === "support" && f.jsxDEV("div", {
              className: "space-y-6 animate-fadeIn h-full flex flex-col min-h-[600px] lg:min-h-[700px]",
              children: [f.jsxDEV("div", {
                className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/55 dark:border-zinc-900/65",
                children: [f.jsxDEV("div", {
                  children: [f.jsxDEV("h2", {
                    className: "text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5",
                    children: ["Tickk ", f.jsxDEV("span", {
                      className: "font-medium text-zinc-400",
                      children: "Beta Feedback"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5203,
                      columnNumber: 33
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5202,
                    columnNumber: 25
                  }, this), f.jsxDEV("p", {
                    className: "text-xs text-zinc-500 mt-1",
                    children: "Report bugs and suggest features directly to our core developers."
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5205,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5201,
                  columnNumber: 23
                }, this), f.jsxDEV("button", {
                  onClick: () => ge(!0),
                  className: "px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-white dark:text-neutral-900 text-white text-xs font-semibold rounded-xl shadow-md shadow-neutral-900/10 hover:shadow-neutral-900/20 dark:shadow-white/10 dark:hover:shadow-white/20 transition-all cursor-pointer flex items-center gap-2 self-start sm:self-center",
                  children: [f.jsxDEV(d5, {
                    className: "w-4 h-4"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5212,
                    columnNumber: 25
                  }, this), "Submit Feedback"]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5208,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5200,
                columnNumber: 21
              }, this), f.jsxDEV("div", {
                className: "p-4 rounded-2xl bg-neutral-100/50 dark:bg-zinc-900/40 border border-neutral-200/60 dark:border-zinc-800 flex items-center justify-between",
                children: [f.jsxDEV("div", {
                  className: "flex items-center gap-4",
                  children: [f.jsxDEV("div", {
                    className: "p-3 bg-zinc-200 dark:bg-zinc-800 rounded-xl",
                    children: f.jsxDEV(GD, {
                      className: "w-5 h-5 text-zinc-700 dark:text-zinc-300"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5221,
                      columnNumber: 27
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5220,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    children: [f.jsxDEV("h4", {
                      className: "text-sm font-semibold text-neutral-900 dark:text-zinc-100",
                      children: "Earn Free Tracking Credits"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5224,
                      columnNumber: 27
                    }, this), f.jsxDEV("p", {
                      className: "text-xs text-zinc-500 mt-0.5",
                      children: "Beta users start with 501 free emails. Submit a useful bug report or feature request and we'll grant you an extra 99 credits instantly."
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5225,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5223,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5219,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "text-right",
                  children: [f.jsxDEV("span", {
                    className: "text-[10px] text-zinc-500 uppercase tracking-widest font-mono block mb-1",
                    children: "YOUR CREDITS"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5229,
                    columnNumber: 25
                  }, this), f.jsxDEV("span", {
                    className: "text-xl font-bold font-display text-neutral-900 dark:text-white",
                    children: ba
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5230,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5228,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5218,
                columnNumber: 21
              }, this), f.jsxDEV("div", {
                className: "flex flex-col bg-white dark:bg-zinc-950/20 border border-neutral-200 dark:border-zinc-900 rounded-2xl overflow-hidden flex-1",
                children: [f.jsxDEV("div", {
                  className: "p-4 border-b border-neutral-200/50 dark:border-zinc-900/50 bg-neutral-50/50 dark:bg-zinc-950/40 flex items-center justify-between",
                  children: [f.jsxDEV("span", {
                    className: "text-xs font-semibold tracking-wide text-neutral-500 dark:text-zinc-400 uppercase",
                    children: "Your Submissions"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5237,
                    columnNumber: 25
                  }, this), f.jsxDEV("span", {
                    className: "px-2 py-0.5 rounded-full text-[10px] font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700",
                    children: [V.length, " Total"]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5238,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5236,
                  columnNumber: 23
                }, this), Vt && V.length === 0 ? f.jsxDEV("div", {
                  className: "flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3",
                  children: [f.jsxDEV(TO, {
                    className: "w-6 h-6 text-zinc-500 animate-spin"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5245,
                    columnNumber: 27
                  }, this), f.jsxDEV("p", {
                    className: "text-xs text-zinc-400",
                    children: "Loading submissions..."
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5246,
                    columnNumber: 27
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5244,
                  columnNumber: 25
                }, this) : V.length === 0 ? f.jsxDEV("div", {
                  className: "flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4",
                  children: [f.jsxDEV("div", {
                    className: "w-12 h-12 rounded-full bg-neutral-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 dark:text-zinc-600",
                    children: f.jsxDEV(AO, {
                      className: "w-6 h-6"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5251,
                      columnNumber: 29
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5250,
                    columnNumber: 27
                  }, this), f.jsxDEV("div", {
                    className: "space-y-1",
                    children: [f.jsxDEV("h5", {
                      className: "text-sm font-semibold text-neutral-700 dark:text-zinc-300",
                      children: "No Feedback Yet"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5254,
                      columnNumber: 29
                    }, this), f.jsxDEV("p", {
                      className: "text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed",
                      children: "Found a bug or have a feature idea? Let us know and help us shape the future of Tickk."
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5255,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5253,
                    columnNumber: 27
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5249,
                  columnNumber: 25
                }, this) : f.jsxDEV("div", {
                  className: "flex-1 overflow-y-auto divide-y divide-neutral-100 dark:divide-zinc-900/60 scrollbar-thin p-2",
                  children: V.map(F => f.jsxDEV("div", {
                    className: "p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/40 transition-colors flex flex-col sm:flex-row gap-4 justify-between items-start",
                    children: [f.jsxDEV("div", {
                      className: "space-y-2 max-w-2xl",
                      children: [f.jsxDEV("div", {
                        className: "flex items-center gap-2 flex-wrap",
                        children: [f.jsxDEV("span", {
                          className: "text-[10px] text-zinc-400 font-mono",
                          children: ["#", F.id.substring(4, 10).toUpperCase()]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5264,
                          columnNumber: 35
                        }, this), f.jsxDEV("span", {
                          className: `px-1.5 py-0.5 rounded text-[9px] font-medium uppercase tracking-wider ${F.category === "bug" ? "bg-red-500/10 text-red-500 border border-red-500/20" : F.category === "feature" ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" : "bg-zinc-500/10 text-zinc-500 border border-zinc-500/20"}`,
                          children: F.category
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5265,
                          columnNumber: 35
                        }, this), f.jsxDEV("span", {
                          className: "text-[10px] text-zinc-400 font-mono",
                          children: ["• ", new Date(F.createdAt).toLocaleDateString()]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5272,
                          columnNumber: 35
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5263,
                        columnNumber: 33
                      }, this), f.jsxDEV("div", {
                        children: [f.jsxDEV("h4", {
                          className: "text-sm font-semibold text-neutral-800 dark:text-zinc-200 leading-snug",
                          children: F.subject
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5276,
                          columnNumber: 35
                        }, this), f.jsxDEV("p", {
                          className: "text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed",
                          children: F.message
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5277,
                          columnNumber: 35
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5275,
                        columnNumber: 33
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5262,
                      columnNumber: 31
                    }, this), f.jsxDEV("div", {
                      className: "shrink-0",
                      children: f.jsxDEV("span", {
                        className: `px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5 ${F.status === "submitted" ? "bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-500/20" : F.status === "reviewed" ? "bg-blue-500/10 text-blue-600 dark:text-blue-500 border border-blue-500/20" : "bg-green-500/10 text-green-600 dark:text-green-500 border border-green-500/20"}`,
                        children: [F.status === "submitted" && f.jsxDEV(c5, {
                          className: "w-3 h-3"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5287,
                          columnNumber: 64
                        }, this), F.status === "reviewed" && f.jsxDEV(Fd, {
                          className: "w-3 h-3"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5288,
                          columnNumber: 63
                        }, this), F.status === "rewarded" && f.jsxDEV(GD, {
                          className: "w-3 h-3"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5289,
                          columnNumber: 63
                        }, this), F.status]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5282,
                        columnNumber: 33
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5281,
                      columnNumber: 31
                    }, this)]
                  }, F.id, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5261,
                    columnNumber: 29
                  }, this))
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5259,
                  columnNumber: 25
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5235,
                columnNumber: 21
              }, this), f.jsxDEV(hi, {
                children: Z && !L && f.jsxDEV("div", {
                  className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",
                  children: f.jsxDEV(lt.div, {
                    initial: {
                      opacity: 0,
                      scale: .95,
                      y: 20
                    },
                    animate: {
                      opacity: 1,
                      scale: 1,
                      y: 0
                    },
                    exit: {
                      opacity: 0,
                      scale: .95,
                      y: 20
                    },
                    className: "bg-white dark:bg-[#090a0c] border border-neutral-200 dark:border-zinc-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative",
                    children: [f.jsxDEV("div", {
                      className: "h-1.5 w-full bg-gradient-to-r from-zinc-400 via-neutral-800 to-zinc-400 dark:from-zinc-600 dark:via-zinc-200 dark:to-zinc-600"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5311,
                      columnNumber: 15
                    }, this), f.jsxDEV("div", {
                      className: "p-8 text-center space-y-6",
                      children: [f.jsxDEV("div", {
                        className: "w-16 h-16 bg-neutral-100 dark:bg-zinc-900 rounded-2xl mx-auto flex items-center justify-center mb-2 shadow-inner border border-neutral-200/50 dark:border-zinc-800",
                        children: f.jsxDEV(GD, {
                          className: "w-8 h-8 text-neutral-900 dark:text-white animate-pulse"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5315,
                          columnNumber: 19
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5314,
                        columnNumber: 17
                      }, this), f.jsxDEV("div", {
                        className: "space-y-3",
                        children: [f.jsxDEV("h3", {
                          className: "text-2xl font-light font-display text-neutral-900 dark:text-white tracking-tight",
                          children: "Welcome to the Beta!"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5319,
                          columnNumber: 19
                        }, this), f.jsxDEV("p", {
                          className: "text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto",
                          children: ["As an early adopter, your account has been pre-loaded with ", f.jsxDEV("span", {
                            className: "font-semibold text-neutral-900 dark:text-zinc-300",
                            children: "501 free email tracking credits"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5321,
                            columnNumber: 80
                          }, this), "."]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5320,
                          columnNumber: 19
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5318,
                        columnNumber: 17
                      }, this), f.jsxDEV("div", {
                        className: "relative overflow-hidden rounded-2xl p-[1px]",
                        children: [f.jsxDEV("div", {
                          className: "absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#ffffff_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#ffffff_50%,#18181b_100%)] opacity-80"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5326,
                          columnNumber: 19
                        }, this), f.jsxDEV("div", {
                          className: "relative z-10 p-4 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-2xl text-left flex items-start gap-3",
                          children: [f.jsxDEV("span", {
                            className: "absolute inset-0 rounded-2xl animate-[shimmer-bg_2.5s_ease-in-out_infinite] bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.8),50%,transparent,75%,rgba(255,255,255,0.8),100%)] dark:bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,0.2),50%,transparent,75%,rgba(255,255,255,0.2),100%)] mix-blend-overlay pointer-events-none",
                            style: {
                              backgroundSize: "300% 100%"
                            }
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5328,
                            columnNumber: 21
                          }, this), f.jsxDEV("div", {
                            className: "relative z-10 p-2 bg-white dark:bg-zinc-800 rounded-lg shrink-0 shadow-sm border border-neutral-200/50 dark:border-zinc-700",
                            children: f.jsxDEV(AO, {
                              className: "w-4 h-4 text-neutral-700 dark:text-zinc-300"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5330,
                              columnNumber: 23
                            }, this)
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5329,
                            columnNumber: 21
                          }, this), f.jsxDEV("div", {
                            className: "relative z-10",
                            children: [f.jsxDEV("h4", {
                              className: "text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-1",
                              children: "Earn Bonus Credits"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5333,
                              columnNumber: 23
                            }, this), f.jsxDEV("p", {
                              className: "text-[11px] text-zinc-500 leading-relaxed",
                              children: ["Help us improve! Submit a quality bug report or feature request via the ", f.jsxDEV("strong", {
                                children: "Beta Feedback"
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 5335,
                                columnNumber: 97
                              }, this), " tab, and we'll instantly reward your account with an extra ", f.jsxDEV("strong", {
                                className: "text-neutral-900 dark:text-zinc-300",
                                children: "99 credits"
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 5335,
                                columnNumber: 187
                              }, this), "."]
                            }, void 0, !0, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5334,
                              columnNumber: 23
                            }, this)]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5332,
                            columnNumber: 21
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5327,
                          columnNumber: 19
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5325,
                        columnNumber: 17
                      }, this), f.jsxDEV("button", {
                        onClick: Nf,
                        className: "w-full py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-neutral-900 text-sm font-semibold rounded-xl transition-all shadow-md cursor-pointer",
                        children: "Got it, let's go!"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5341,
                        columnNumber: 17
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5313,
                      columnNumber: 15
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5304,
                    columnNumber: 13
                  }, this)
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5303,
                  columnNumber: 11
                }, this)
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5301,
                columnNumber: 7
              }, this), f.jsxDEV(hi, {
                children: xe && f.jsxDEV("div", {
                  className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md",
                  children: f.jsxDEV(lt.div, {
                    initial: {
                      opacity: 0,
                      scale: .96,
                      y: 10
                    },
                    animate: {
                      opacity: 1,
                      scale: 1,
                      y: 0
                    },
                    exit: {
                      opacity: 0,
                      scale: .96,
                      y: 10
                    },
                    className: "bg-white dark:bg-[#090a0c] border border-neutral-200 dark:border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative",
                    children: [f.jsxDEV("div", {
                      className: "px-6 py-5 border-b border-neutral-200 dark:border-zinc-900 bg-neutral-50 dark:bg-zinc-950/20 flex justify-between items-center",
                      children: [f.jsxDEV("div", {
                        className: "space-y-0.5",
                        children: [f.jsxDEV("h4", {
                          className: "text-sm font-semibold font-display text-neutral-900 dark:text-white uppercase tracking-wide",
                          children: "Submit Feedback"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5365,
                          columnNumber: 33
                        }, this), f.jsxDEV("p", {
                          className: "text-[10px] text-zinc-500 font-normal",
                          children: "Help us shape the future of Tickk during our beta."
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5366,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5364,
                        columnNumber: 31
                      }, this), f.jsxDEV("button", {
                        onClick: () => ge(!1),
                        className: "p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-zinc-900 text-zinc-500 transition-colors cursor-pointer",
                        children: f.jsxDEV(Bd, {
                          className: "w-4 h-4"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5372,
                          columnNumber: 33
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5368,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5363,
                      columnNumber: 29
                    }, this), f.jsxDEV("form", {
                      onSubmit: uo,
                      className: "p-6 space-y-4",
                      children: [f.jsxDEV("div", {
                        className: "space-y-1.5",
                        children: [f.jsxDEV("label", {
                          className: "text-[10px] font-semibold text-zinc-500 tracking-wider uppercase",
                          children: "SUBJECT"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5378,
                          columnNumber: 33
                        }, this), f.jsxDEV("input", {
                          type: "text",
                          value: Te,
                          onChange: F => ve(F.target.value),
                          placeholder: "e.g., Tooltip is hard to read in dark mode",
                          required: !0,
                          className: "w-full bg-neutral-50 dark:bg-zinc-950/50 border border-neutral-200 dark:border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-zinc-800 dark:border-zinc-200 transition-all font-normal"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5379,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5377,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "space-y-1.5 relative z-40",
                        children: [f.jsxDEV("label", {
                          className: "text-[10px] font-semibold text-zinc-500 tracking-wider uppercase",
                          children: "CATEGORY"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5390,
                          columnNumber: 33
                        }, this), f.jsxDEV("div", {
                          className: "relative",
                          children: [f.jsxDEV("button", {
                            type: "button",
                            onClick: () => Je(!Ne),
                            className: "w-full flex items-center justify-between bg-white/40 dark:bg-zinc-900/40 hover:bg-white/60 dark:hover:bg-zinc-800/60 backdrop-blur-xl border border-neutral-200/50 dark:border-zinc-700/50 rounded-xl px-4 py-2.5 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all font-normal shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] cursor-pointer",
                            children: [f.jsxDEV("span", {
                              children: Ae === "bug" ? "Bug Report" : Ae === "feature" ? "Feature Request" : "General Feedback"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5397,
                              columnNumber: 37
                            }, this), f.jsxDEV("svg", {
                              className: `w-3.5 h-3.5 transition-transform ${Ne ? "rotate-180" : ""}`,
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              children: f.jsxDEV("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M19 9l-7 7-7-7"
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 5401,
                                columnNumber: 39
                              }, this)
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5400,
                              columnNumber: 37
                            }, this)]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5392,
                            columnNumber: 35
                          }, this), f.jsxDEV(hi, {
                            children: Ne && f.jsxDEV(lt.div, {
                              initial: {
                                opacity: 0,
                                y: -5,
                                scale: .95
                              },
                              animate: {
                                opacity: 1,
                                y: 0,
                                scale: 1
                              },
                              exit: {
                                opacity: 0,
                                y: -5,
                                scale: .95
                              },
                              transition: {
                                duration: .15
                              },
                              className: "absolute left-0 right-0 mt-2 z-50 rounded-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-neutral-200/60 dark:border-zinc-700/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden",
                              children: f.jsxDEV("div", {
                                className: "p-1 flex flex-col gap-0.5",
                                children: ["bug", "feature", "general"].map(F => f.jsxDEV("button", {
                                  type: "button",
                                  onClick: () => {
                                    Ee(F), Je(!1);
                                  },
                                  className: `text-left px-3 py-2.5 text-xs rounded-lg transition-colors ${Ae === F ? "bg-neutral-100 dark:bg-zinc-800 text-neutral-900 dark:text-white font-medium" : "text-neutral-600 dark:text-zinc-400 hover:bg-neutral-50 dark:hover:bg-zinc-800/50 hover:text-neutral-900 dark:hover:text-white"}`,
                                  children: F === "bug" ? "Bug Report" : F === "feature" ? "Feature Request" : "General Feedback"
                                }, F, !1, {
                                  fileName: "/app/applet/src/components/Dashboard.tsx",
                                  lineNumber: 5416,
                                  columnNumber: 45
                                }, this))
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 5414,
                                columnNumber: 41
                              }, this)
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5407,
                              columnNumber: 39
                            }, this)
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5405,
                            columnNumber: 35
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5391,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5389,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "space-y-1.5",
                        children: [f.jsxDEV("label", {
                          className: "text-[10px] font-semibold text-zinc-500 tracking-wider uppercase",
                          children: "MESSAGE BODY"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5436,
                          columnNumber: 33
                        }, this), f.jsxDEV("textarea", {
                          value: it,
                          onChange: F => oe(F.target.value),
                          placeholder: "Describe the bug or feature idea in detail...",
                          rows: 4,
                          required: !0,
                          className: "w-full bg-neutral-50 dark:bg-zinc-950/50 border border-neutral-200 dark:border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-zinc-800 dark:border-zinc-200 transition-all font-normal resize-none"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5437,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5435,
                        columnNumber: 31
                      }, this), f.jsxDEV("div", {
                        className: "pt-4 border-t border-neutral-200/60 dark:border-zinc-900 flex gap-3 justify-end",
                        children: [f.jsxDEV("button", {
                          type: "button",
                          onClick: () => ge(!1),
                          className: "px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-neutral-700 dark:text-zinc-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer",
                          children: "Cancel"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5448,
                          columnNumber: 33
                        }, this), f.jsxDEV("button", {
                          type: "submit",
                          disabled: Qe,
                          className: "px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-white dark:text-neutral-900 text-white disabled:opacity-50 text-xs font-semibold rounded-lg shadow-sm cursor-pointer transition-colors",
                          children: Qe ? "Submitting..." : "Submit Feedback"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5455,
                          columnNumber: 33
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5447,
                        columnNumber: 31
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5376,
                      columnNumber: 29
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5357,
                    columnNumber: 27
                  }, this)
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5356,
                  columnNumber: 25
                }, this)
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5354,
                columnNumber: 21
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 5198,
              columnNumber: 19
            }, this)]
          }, c, !0, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 2304,
            columnNumber: 15
          }, this)
        }, void 0, !1, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 2200,
          columnNumber: 11
        }, this)
      }, void 0, !1, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 2199,
        columnNumber: 9
      }, this)]
    }, void 0, !0, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 2122,
      columnNumber: 7
    }, this), f.jsxDEV(hi, {
      children: Yn && xt && f.jsxDEV("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",
        children: f.jsxDEV(lt.div, {
          initial: {
            opacity: 0,
            scale: .95
          },
          animate: {
            opacity: 1,
            scale: 1
          },
          exit: {
            opacity: 0,
            scale: .95
          },
          className: "bg-white dark:bg-[#090a0c] border border-neutral-200 dark:border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative",
          children: [f.jsxDEV("div", {
            className: "p-4 border-b border-neutral-200 dark:border-zinc-900 flex justify-between items-center bg-neutral-50 dark:bg-zinc-950/20",
            children: [f.jsxDEV("div", {
              className: "flex items-center gap-3",
              children: [f.jsxDEV("div", {
                className: "w-8 h-8 rounded-lg bg-neutral-100 dark:bg-zinc-900 flex items-center justify-center border border-neutral-200 dark:border-zinc-800",
                children: uk(xt.recipient, "w-4 h-4")
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5488,
                columnNumber: 19
              }, this), f.jsxDEV("div", {
                children: [f.jsxDEV("h4", {
                  className: "text-sm font-semibold font-display text-neutral-900 dark:text-white",
                  children: "Email Client Preview"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5492,
                  columnNumber: 21
                }, this), f.jsxDEV("p", {
                  className: "text-[10px] text-zinc-500 font-normal",
                  children: "Viewing exactly as the recipient sees it"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5493,
                  columnNumber: 21
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5491,
                columnNumber: 19
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 5487,
              columnNumber: 17
            }, this), f.jsxDEV("div", {
              className: "flex items-center gap-2",
              children: [f.jsxDEV("div", {
                className: "flex bg-neutral-100 dark:bg-zinc-900 rounded-lg p-0.5 border border-neutral-200 dark:border-zinc-800/50",
                children: [f.jsxDEV("button", {
                  onClick: () => et("visual"),
                  className: `px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${$e === "visual" ? "bg-white dark:bg-zinc-800 text-neutral-900 dark:text-white shadow-sm border border-neutral-200/50 dark:border-zinc-700/50" : "text-zinc-500 hover:text-neutral-700 dark:hover:text-zinc-300"}`,
                  children: "Visual"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5498,
                  columnNumber: 21
                }, this), f.jsxDEV("button", {
                  onClick: () => et("raw"),
                  className: `px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${$e === "raw" ? "bg-white dark:bg-zinc-800 text-neutral-900 dark:text-white shadow-sm border border-neutral-200/50 dark:border-zinc-700/50" : "text-zinc-500 hover:text-neutral-700 dark:hover:text-zinc-300"}`,
                  children: "Raw HTML"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5504,
                  columnNumber: 21
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5497,
                columnNumber: 19
              }, this), f.jsxDEV("button", {
                onClick: () => _t(!1),
                className: "p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-zinc-900 text-zinc-500 transition-colors cursor-pointer ml-2",
                children: f.jsxDEV(Bd, {
                  className: "w-4 h-4"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5515,
                  columnNumber: 21
                }, this)
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5511,
                columnNumber: 19
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 5496,
              columnNumber: 17
            }, this)]
          }, void 0, !0, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 5486,
            columnNumber: 15
          }, this), f.jsxDEV("div", {
            className: "flex-1 overflow-auto bg-neutral-50 dark:bg-[#0a0a0c]",
            children: $e === "visual" ? f.jsxDEV("div", {
              className: "p-4 md:p-8 flex justify-center",
              children: (() => {
                const F = t6e(xt.recipient);
                return F === "outlook" ? f.jsxDEV("div", {
                  className: "w-full max-w-4xl bg-white dark:bg-[#111111] rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-zinc-800 font-sans",
                  children: [f.jsxDEV("div", {
                    className: "h-12 bg-[#0078d4] flex items-center px-4",
                    children: [f.jsxDEV("div", {
                      className: "flex items-center gap-2",
                      children: f.jsxDEV("div", {
                        className: "text-white font-semibold text-[15px]",
                        children: "Outlook"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5532,
                        columnNumber: 29
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5531,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "mx-auto max-w-xl w-full",
                      children: f.jsxDEV("div", {
                        className: "bg-white/20 hover:bg-white/30 transition-colors rounded h-8 flex items-center px-3 mx-4",
                        children: [f.jsxDEV(Om, {
                          className: "w-4 h-4 text-white/90 mr-2"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5536,
                          columnNumber: 31
                        }, this), f.jsxDEV("span", {
                          className: "text-white/80 text-sm",
                          children: "Search"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5537,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5535,
                        columnNumber: 29
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5534,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5530,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "h-14 border-b border-neutral-200 dark:border-zinc-800 flex items-center px-4 gap-6 bg-white dark:bg-[#111111]",
                    children: [f.jsxDEV("div", {
                      className: "flex items-center gap-2 cursor-pointer",
                      children: [f.jsxDEV(z0, {
                        className: "w-4 h-4 text-neutral-700 dark:text-zinc-300"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5544,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "text-sm text-neutral-700 dark:text-zinc-300 font-medium",
                        children: "Reply"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5545,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5543,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex items-center gap-2 cursor-pointer",
                      children: [f.jsxDEV(z0, {
                        className: "w-4 h-4 text-neutral-700 dark:text-zinc-300 transform -scale-x-100"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5548,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "text-sm text-neutral-700 dark:text-zinc-300 font-medium",
                        children: "Reply all"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5549,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5547,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex items-center gap-2 cursor-pointer",
                      children: [f.jsxDEV(u5, {
                        className: "w-4 h-4 text-neutral-700 dark:text-zinc-300"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5552,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "text-sm text-neutral-700 dark:text-zinc-300 font-medium",
                        children: "Forward"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5553,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5551,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "h-6 w-px bg-neutral-300 dark:bg-zinc-700 mx-2"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5555,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex items-center gap-2 cursor-pointer",
                      children: [f.jsxDEV(f5, {
                        className: "w-4 h-4 text-neutral-700 dark:text-zinc-300"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5557,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "text-sm text-neutral-700 dark:text-zinc-300 font-medium",
                        children: "Delete"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5558,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5556,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5542,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex h-[500px]",
                    children: [f.jsxDEV("div", {
                      className: "w-56 p-2 hidden md:block border-r border-neutral-200 dark:border-zinc-800 bg-neutral-50 dark:bg-[#111111]",
                      children: [f.jsxDEV("div", {
                        className: "bg-neutral-200/50 dark:bg-zinc-800/50 rounded-md px-3 py-2 flex items-center text-sm text-neutral-900 dark:text-zinc-100 font-medium cursor-pointer",
                        children: [f.jsxDEV(Tg, {
                          className: "w-4 h-4 mr-1"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5566,
                          columnNumber: 31
                        }, this), " Inbox"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5565,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "rounded-md px-3 py-2 flex items-center text-sm text-neutral-700 dark:text-zinc-300 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/30",
                        children: [f.jsxDEV(Tg, {
                          className: "w-4 h-4 mr-1 opacity-0"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5569,
                          columnNumber: 31
                        }, this), " Sent Items"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5568,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "rounded-md px-3 py-2 flex items-center text-sm text-neutral-700 dark:text-zinc-300 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/30",
                        children: [f.jsxDEV(Tg, {
                          className: "w-4 h-4 mr-1 opacity-0"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5572,
                          columnNumber: 31
                        }, this), " Drafts"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5571,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "rounded-md px-3 py-2 flex items-center text-sm text-neutral-700 dark:text-zinc-300 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/30",
                        children: [f.jsxDEV(Tg, {
                          className: "w-4 h-4 mr-1 opacity-0"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5575,
                          columnNumber: 31
                        }, this), " Deleted Items"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5574,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5564,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex-1 bg-white dark:bg-[#111111] p-6 overflow-y-auto",
                      children: [f.jsxDEV("h2", {
                        className: "text-xl font-semibold text-neutral-900 dark:text-white mb-6",
                        children: xt.subject
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5580,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "flex items-center gap-3 mb-6",
                        children: [f.jsxDEV("div", {
                          className: "w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-700 dark:text-blue-400 text-lg font-medium",
                          children: Wn.charAt(0).toUpperCase()
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5582,
                          columnNumber: 31
                        }, this), f.jsxDEV("div", {
                          className: "flex-1",
                          children: [f.jsxDEV("div", {
                            className: "flex items-center justify-between",
                            children: [f.jsxDEV("div", {
                              children: [f.jsxDEV("span", {
                                className: "font-bold text-[13px] text-neutral-900 dark:text-white",
                                children: Jn
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 5588,
                                columnNumber: 37
                              }, this), f.jsxDEV("span", {
                                className: "text-[13px] text-neutral-500 dark:text-zinc-400 ml-1",
                                children: ["<", Wn, ">"]
                              }, void 0, !0, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 5589,
                                columnNumber: 37
                              }, this)]
                            }, void 0, !0, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5587,
                              columnNumber: 35
                            }, this), f.jsxDEV("div", {
                              className: "text-[12px] text-neutral-500 dark:text-zinc-400",
                              children: new Date(xt.createdAt).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "numeric",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit"
                              })
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5591,
                              columnNumber: 35
                            }, this)]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5586,
                            columnNumber: 33
                          }, this), f.jsxDEV("div", {
                            className: "text-[12px] text-neutral-500 dark:text-zinc-400 mt-0.5",
                            children: ["To: ", xt.recipient]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5595,
                            columnNumber: 33
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5585,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5581,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "text-[13px] text-[#333] dark:text-[#ccc] space-y-4 max-w-3xl leading-relaxed bg-white dark:bg-[#111111]",
                        children: f.jsxDEV("div", {
                          dangerouslySetInnerHTML: {
                            __html: W5(xt)
                          }
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5603,
                          columnNumber: 31
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5602,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "mt-12 p-5 bg-white dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-zinc-800/80 rounded-xl relative overflow-hidden max-w-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]",
                        children: [f.jsxDEV("div", {
                          className: "absolute top-0 left-0 w-1 h-full bg-neutral-800 dark:bg-zinc-500"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5608,
                          columnNumber: 31
                        }, this), f.jsxDEV("div", {
                          className: "pl-3 space-y-3",
                          children: [f.jsxDEV("div", {
                            className: "flex items-center gap-2",
                            children: f.jsxDEV("div", {
                              className: "text-[10px] font-bold text-neutral-800 dark:text-zinc-300 uppercase tracking-widest font-mono",
                              children: "System Note: Tickk Telemetry"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5611,
                              columnNumber: 35
                            }, this)
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5610,
                            columnNumber: 33
                          }, this), f.jsxDEV("p", {
                            className: "text-[13px] text-neutral-600 dark:text-zinc-400 leading-relaxed font-sans",
                            children: ["The recipient ", f.jsxDEV("strong", {
                              children: "will not see this box"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5614,
                              columnNumber: 49
                            }, this), ". It represents the invisible 1x1 tracking pixel injected into your email. This transparent image secretly monitors opens and engagement, instantly firing a telemetry signal back to your Tickk dashboard without alerting the reader."]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5613,
                            columnNumber: 33
                          }, this), f.jsxDEV("div", {
                            className: "pt-2",
                            children: f.jsxDEV("code", {
                              className: "text-[11px] text-neutral-500 dark:text-zinc-500 font-mono bg-neutral-50 dark:bg-[#151518] border border-neutral-200/50 dark:border-zinc-800/50 px-3 py-2 rounded block truncate",
                              children: '<img src="********" width="1" height="1" alt="" />'
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5617,
                              columnNumber: 35
                            }, this)
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5616,
                            columnNumber: 33
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5609,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5607,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5579,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5562,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5528,
                  columnNumber: 1
                }, this) : F === "apple" ? f.jsxDEV("div", {
                  className: "w-full max-w-4xl bg-[#ECECEC] dark:bg-[#1E1E1E] rounded-xl overflow-hidden shadow-2xl border border-neutral-300 dark:border-zinc-700 font-sans",
                  children: [f.jsxDEV("div", {
                    className: "h-12 bg-gradient-to-b from-[#F5F5F5] to-[#E8E8E8] dark:from-[#323232] dark:to-[#2A2A2A] border-b border-neutral-300 dark:border-zinc-900 flex items-center justify-between px-4",
                    children: [f.jsxDEV("div", {
                      className: "flex gap-2",
                      children: [f.jsxDEV("div", {
                        className: "w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5634,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5635,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5636,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5633,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex items-center gap-4 text-neutral-600 dark:text-zinc-400",
                      children: [f.jsxDEV("div", {
                        className: "p-1 rounded hover:bg-black/5 dark:hover:bg-white/10",
                        children: f.jsxDEV(f5, {
                          className: "w-4 h-4"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5639,
                          columnNumber: 98
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5639,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "p-1 rounded hover:bg-black/5 dark:hover:bg-white/10",
                        children: f.jsxDEV(z0, {
                          className: "w-4 h-4"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5640,
                          columnNumber: 98
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5640,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "p-1 rounded hover:bg-black/5 dark:hover:bg-white/10",
                        children: f.jsxDEV(u5, {
                          className: "w-4 h-4"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5641,
                          columnNumber: 98
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5641,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5638,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "w-48 bg-white/50 dark:bg-black/20 border border-neutral-300 dark:border-zinc-700 rounded-md h-7 flex items-center px-2",
                      children: [f.jsxDEV(Om, {
                        className: "w-3 h-3 text-neutral-500 mr-2"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5644,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "text-xs text-neutral-500",
                        children: "Search"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5645,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5643,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5632,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex h-[500px]",
                    children: [f.jsxDEV("div", {
                      className: "w-48 bg-[#F2F2F7] dark:bg-[#282828] border-r border-neutral-200 dark:border-zinc-800 p-2 hidden md:block",
                      children: [f.jsxDEV("div", {
                        className: "px-2 py-1 bg-blue-500 text-white rounded text-sm font-medium flex items-center gap-2",
                        children: [f.jsxDEV(_O, {
                          className: "w-4 h-4"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5653,
                          columnNumber: 31
                        }, this), " Inbox"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5652,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "px-2 py-1 text-neutral-700 dark:text-zinc-300 rounded text-sm font-medium flex items-center gap-2 mt-1",
                        children: [f.jsxDEV(Ik, {
                          className: "w-4 h-4"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5656,
                          columnNumber: 31
                        }, this), " Sent"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5655,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5651,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex-1 bg-white dark:bg-[#1E1E1E] p-8 overflow-y-auto",
                      children: [f.jsxDEV("div", {
                        className: "flex justify-between items-start mb-6",
                        children: [f.jsxDEV("div", {
                          children: [f.jsxDEV("h2", {
                            className: "text-xl font-bold text-neutral-900 dark:text-white mb-2",
                            children: xt.subject
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5663,
                            columnNumber: 33
                          }, this), f.jsxDEV("div", {
                            className: "text-[13px]",
                            children: [f.jsxDEV("span", {
                              className: "font-semibold text-neutral-900 dark:text-white",
                              children: Jn
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5665,
                              columnNumber: 35
                            }, this), f.jsxDEV("span", {
                              className: "text-neutral-500 dark:text-zinc-400",
                              children: [" <", Wn, ">"]
                            }, void 0, !0, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5666,
                              columnNumber: 35
                            }, this)]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5664,
                            columnNumber: 33
                          }, this), f.jsxDEV("div", {
                            className: "text-[12px] text-neutral-500 dark:text-zinc-400 mt-1",
                            children: ["To: ", xt.recipient]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5668,
                            columnNumber: 33
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5662,
                          columnNumber: 31
                        }, this), f.jsxDEV("div", {
                          className: "text-[12px] text-neutral-500 dark:text-zinc-400",
                          children: [new Date(xt.createdAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                          }), " at ", new Date(xt.createdAt).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit"
                          })]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5670,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5661,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "w-full h-px bg-neutral-200 dark:bg-zinc-700/50 mb-6"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5674,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "text-[14px] text-neutral-800 dark:text-zinc-200 space-y-4 max-w-3xl leading-relaxed font-sans",
                        children: f.jsxDEV("div", {
                          dangerouslySetInnerHTML: {
                            __html: W5(xt)
                          }
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5677,
                          columnNumber: 31
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5676,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5660,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5649,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5630,
                  columnNumber: 23
                }, this) : F === "yahoo" ? f.jsxDEV("div", {
                  className: "w-full max-w-4xl bg-[#f4f4f5] dark:bg-[#111111] rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-zinc-800 font-sans",
                  children: [f.jsxDEV("div", {
                    className: "h-14 bg-[#7e1fff] flex items-center justify-between px-6",
                    children: [f.jsxDEV("div", {
                      className: "text-white font-bold text-xl tracking-tight",
                      children: ["yahoo", f.jsxDEV("span", {
                        className: "font-light",
                        children: "!"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5689,
                        columnNumber: 93
                      }, this), "mail"]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5689,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex-1 max-w-xl mx-8",
                      children: f.jsxDEV("div", {
                        className: "bg-white/20 rounded-sm h-9 flex items-center px-3 border border-white/10",
                        children: [f.jsxDEV("span", {
                          className: "text-white/80 text-sm",
                          children: "Find messages, documents, photos or people"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5692,
                          columnNumber: 31
                        }, this), f.jsxDEV(Om, {
                          className: "w-4 h-4 text-white/90 ml-auto"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5693,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5691,
                        columnNumber: 29
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5690,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex gap-4",
                      children: f.jsxDEV("div", {
                        className: "w-8 h-8 rounded-full bg-white/20"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5697,
                        columnNumber: 29
                      }, this)
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5696,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5688,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "h-12 border-b border-neutral-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] flex items-center px-4 gap-4",
                    children: [f.jsxDEV("div", {
                      className: "flex items-center gap-1 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800 p-1.5 rounded",
                      children: [f.jsxDEV(z0, {
                        className: "w-4 h-4 text-neutral-600 dark:text-zinc-300"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5703,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "text-[13px] text-neutral-600 dark:text-zinc-300 font-semibold",
                        children: "Reply"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5704,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5702,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex items-center gap-1 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800 p-1.5 rounded",
                      children: [f.jsxDEV(z0, {
                        className: "w-4 h-4 text-neutral-600 dark:text-zinc-300 transform -scale-x-100"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5707,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "text-[13px] text-neutral-600 dark:text-zinc-300 font-semibold",
                        children: "Reply all"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5708,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5706,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex items-center gap-1 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800 p-1.5 rounded",
                      children: [f.jsxDEV(u5, {
                        className: "w-4 h-4 text-neutral-600 dark:text-zinc-300"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5711,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "text-[13px] text-neutral-600 dark:text-zinc-300 font-semibold",
                        children: "Forward"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5712,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5710,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex items-center gap-1 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800 p-1.5 rounded",
                      children: [f.jsxDEV(f5, {
                        className: "w-4 h-4 text-neutral-600 dark:text-zinc-300"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5715,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "text-[13px] text-neutral-600 dark:text-zinc-300 font-semibold",
                        children: "Delete"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5716,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5714,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5701,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex h-[500px]",
                    children: [f.jsxDEV("div", {
                      className: "w-52 bg-white dark:bg-[#1a1a1a] border-r border-neutral-200 dark:border-zinc-800 p-3 hidden md:block",
                      children: [f.jsxDEV("button", {
                        className: "w-full bg-[#7e1fff] hover:bg-[#6001D2] text-white font-bold text-sm py-2 rounded-full mb-4",
                        children: "Compose"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5723,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "px-3 py-1.5 bg-[#7e1fff]/10 text-[#7e1fff] dark:text-[#a85aff] rounded font-semibold text-sm",
                        children: "Inbox"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5724,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "px-3 py-1.5 text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded font-medium text-sm mt-1",
                        children: "Unread"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5725,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "px-3 py-1.5 text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded font-medium text-sm mt-1",
                        children: "Starred"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5726,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "px-3 py-1.5 text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded font-medium text-sm mt-1",
                        children: "Sent"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5727,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5722,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex-1 bg-white dark:bg-[#111111] p-6 overflow-y-auto",
                      children: [f.jsxDEV("h2", {
                        className: "text-[22px] font-bold text-neutral-900 dark:text-white mb-6",
                        children: xt.subject
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5731,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [f.jsxDEV("div", {
                          className: "flex items-center gap-3",
                          children: [f.jsxDEV("div", {
                            className: "w-10 h-10 rounded-full bg-neutral-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-neutral-600 dark:text-zinc-300 text-lg",
                            children: Wn.charAt(0).toUpperCase()
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5734,
                            columnNumber: 33
                          }, this), f.jsxDEV("div", {
                            children: [f.jsxDEV("div", {
                              className: "font-bold text-[15px] text-neutral-900 dark:text-white",
                              children: [Jn, " ", f.jsxDEV("span", {
                                className: "font-normal text-neutral-500 dark:text-zinc-400 text-sm ml-1",
                                children: ["<", Wn, ">"]
                              }, void 0, !0, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 5738,
                                columnNumber: 118
                              }, this)]
                            }, void 0, !0, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5738,
                              columnNumber: 35
                            }, this), f.jsxDEV("div", {
                              className: "text-[13px] text-neutral-500 dark:text-zinc-400",
                              children: ["To: ", xt.recipient]
                            }, void 0, !0, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5739,
                              columnNumber: 35
                            }, this)]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5737,
                            columnNumber: 33
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5733,
                          columnNumber: 31
                        }, this), f.jsxDEV("div", {
                          className: "text-[13px] text-neutral-500 dark:text-zinc-400 font-medium",
                          children: [new Date(xt.createdAt).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric"
                          }), " at ", new Date(xt.createdAt).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit"
                          })]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5742,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5732,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "text-[15px] text-[#1d2226] dark:text-[#d9d9d9] space-y-4 max-w-3xl leading-relaxed",
                        children: f.jsxDEV("div", {
                          dangerouslySetInnerHTML: {
                            __html: W5(xt)
                          }
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5748,
                          columnNumber: 31
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5747,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5730,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5720,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5686,
                  columnNumber: 23
                }, this) : f.jsxDEV("div", {
                  className: "w-full max-w-4xl bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-zinc-800 font-sans",
                  children: [f.jsxDEV("div", {
                    className: "h-16 flex items-center px-4 border-b border-neutral-100 dark:border-zinc-800/80 bg-white dark:bg-[#1a1a1a]",
                    children: [f.jsxDEV("div", {
                      className: "flex items-center gap-4 text-neutral-600 dark:text-zinc-400",
                      children: [f.jsxDEV(xre, {
                        className: "w-5 h-5"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5760,
                        columnNumber: 29
                      }, this), f.jsxDEV("img", {
                        src: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
                        alt: "Gmail",
                        className: "w-7 h-7 object-contain",
                        referrerPolicy: "no-referrer"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5761,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "text-xl font-medium text-neutral-600 dark:text-zinc-300 -ml-2",
                        children: "Gmail"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5762,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5759,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "ml-8 flex-1 max-w-2xl bg-neutral-100 dark:bg-zinc-800/60 rounded-full h-12 flex items-center px-4",
                      children: [f.jsxDEV(Om, {
                        className: "w-5 h-5 text-neutral-500 dark:text-zinc-400 mr-3"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5765,
                        columnNumber: 29
                      }, this), f.jsxDEV("span", {
                        className: "text-neutral-500 dark:text-zinc-400 text-base",
                        children: "Search mail"
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5766,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5764,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5758,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "flex h-[500px]",
                    children: [f.jsxDEV("div", {
                      className: "w-64 p-4 hidden md:block space-y-2",
                      children: [f.jsxDEV("div", {
                        className: "bg-[#c2e7ff] dark:bg-[#004a77] text-[#001d35] dark:text-[#c2e7ff] rounded-full px-4 py-3 flex items-center font-medium text-sm gap-4 cursor-pointer",
                        children: [f.jsxDEV(_O, {
                          className: "w-4 h-4"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5774,
                          columnNumber: 31
                        }, this), " Inbox"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5773,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "text-neutral-700 dark:text-zinc-300 rounded-full px-4 py-2 flex items-center font-medium text-sm gap-4 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/50",
                        children: [f.jsxDEV(Wre, {
                          className: "w-4 h-4"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5777,
                          columnNumber: 31
                        }, this), " Starred"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5776,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "text-neutral-700 dark:text-zinc-300 rounded-full px-4 py-2 flex items-center font-medium text-sm gap-4 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/50",
                        children: [f.jsxDEV(c5, {
                          className: "w-4 h-4"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5780,
                          columnNumber: 31
                        }, this), " Snoozed"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5779,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "text-neutral-700 dark:text-zinc-300 rounded-full px-4 py-2 flex items-center font-medium text-sm gap-4 cursor-pointer hover:bg-neutral-100 dark:hover:bg-zinc-800/50",
                        children: [f.jsxDEV(Ik, {
                          className: "w-4 h-4"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5783,
                          columnNumber: 31
                        }, this), " Sent"]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5782,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5772,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "flex-1 bg-white dark:bg-[#1a1a1a] p-6 overflow-y-auto",
                      children: [f.jsxDEV("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [f.jsxDEV("h2", {
                          className: "text-[22px] font-normal text-neutral-900 dark:text-neutral-100",
                          children: xt.subject
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5789,
                          columnNumber: 31
                        }, this), f.jsxDEV("div", {
                          className: "flex gap-4",
                          children: [f.jsxDEV(Ore, {
                            className: "w-5 h-5 text-neutral-600 dark:text-zinc-400 cursor-pointer"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5791,
                            columnNumber: 33
                          }, this), f.jsxDEV(SO, {
                            className: "w-5 h-5 text-neutral-600 dark:text-zinc-400 cursor-pointer"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5792,
                            columnNumber: 33
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5790,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5788,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "flex items-start gap-3 mb-6",
                        children: [f.jsxDEV("div", {
                          className: "w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-medium",
                          children: Wn.charAt(0).toUpperCase()
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5796,
                          columnNumber: 31
                        }, this), f.jsxDEV("div", {
                          className: "flex-1",
                          children: [f.jsxDEV("div", {
                            className: "flex items-center justify-between",
                            children: [f.jsxDEV("div", {
                              children: [f.jsxDEV("span", {
                                className: "font-bold text-sm text-neutral-900 dark:text-neutral-100",
                                children: Jn
                              }, void 0, !1, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 5802,
                                columnNumber: 37
                              }, this), f.jsxDEV("span", {
                                className: "text-xs text-neutral-500 dark:text-zinc-400 ml-2",
                                children: ["<", Wn, ">"]
                              }, void 0, !0, {
                                fileName: "/app/applet/src/components/Dashboard.tsx",
                                lineNumber: 5803,
                                columnNumber: 37
                              }, this)]
                            }, void 0, !0, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5801,
                              columnNumber: 35
                            }, this), f.jsxDEV("div", {
                              className: "text-xs text-neutral-500 dark:text-zinc-400",
                              children: new Date(xt.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit"
                              })
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5805,
                              columnNumber: 35
                            }, this)]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5800,
                            columnNumber: 33
                          }, this), f.jsxDEV("div", {
                            className: "text-xs text-neutral-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1",
                            children: ["to me ", f.jsxDEV(Vd, {
                              className: "w-3 h-3"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5810,
                              columnNumber: 41
                            }, this)]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5809,
                            columnNumber: 33
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5799,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5795,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "text-sm text-[#202124] dark:text-[#e8eaed] space-y-4 max-w-3xl leading-relaxed ml-12",
                        children: f.jsxDEV("div", {
                          dangerouslySetInnerHTML: {
                            __html: W5(xt)
                          }
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5817,
                          columnNumber: 31
                        }, this)
                      }, void 0, !1, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5816,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "mt-12 ml-12 p-5 bg-white dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-zinc-800/80 rounded-xl relative overflow-hidden max-w-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]",
                        children: [f.jsxDEV("div", {
                          className: "absolute top-0 left-0 w-1 h-full bg-neutral-800 dark:bg-zinc-500"
                        }, void 0, !1, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5822,
                          columnNumber: 31
                        }, this), f.jsxDEV("div", {
                          className: "pl-3 space-y-3",
                          children: [f.jsxDEV("div", {
                            className: "flex items-center gap-2",
                            children: f.jsxDEV("div", {
                              className: "text-[10px] font-bold text-neutral-800 dark:text-zinc-300 uppercase tracking-widest font-mono",
                              children: "System Note: Tickk Telemetry"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5825,
                              columnNumber: 35
                            }, this)
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5824,
                            columnNumber: 33
                          }, this), f.jsxDEV("p", {
                            className: "text-[13px] text-neutral-600 dark:text-zinc-400 leading-relaxed font-sans",
                            children: ["The recipient ", f.jsxDEV("strong", {
                              children: "will not see this box"
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5828,
                              columnNumber: 49
                            }, this), ". It represents the invisible 1x1 tracking pixel injected into your email. This transparent image secretly monitors opens and engagement, instantly firing a telemetry signal back to your Tickk dashboard without alerting the reader."]
                          }, void 0, !0, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5827,
                            columnNumber: 33
                          }, this), f.jsxDEV("div", {
                            className: "pt-2",
                            children: f.jsxDEV("code", {
                              className: "text-[11px] text-neutral-500 dark:text-zinc-500 font-mono bg-neutral-50 dark:bg-[#151518] border border-neutral-200/50 dark:border-zinc-800/50 px-3 py-2 rounded block truncate",
                              children: '<img src="********" width="1" height="1" alt="" />'
                            }, void 0, !1, {
                              fileName: "/app/applet/src/components/Dashboard.tsx",
                              lineNumber: 5831,
                              columnNumber: 35
                            }, this)
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5830,
                            columnNumber: 33
                          }, this)]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5823,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5821,
                        columnNumber: 29
                      }, this), f.jsxDEV("div", {
                        className: "mt-8 ml-12 flex gap-2",
                        children: [f.jsxDEV("button", {
                          className: "px-6 py-2 border border-neutral-300 dark:border-zinc-700 rounded-full text-sm font-medium text-neutral-700 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2",
                          children: [f.jsxDEV(z0, {
                            className: "w-4 h-4"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5840,
                            columnNumber: 33
                          }, this), " Reply"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5839,
                          columnNumber: 31
                        }, this), f.jsxDEV("button", {
                          className: "px-6 py-2 border border-neutral-300 dark:border-zinc-700 rounded-full text-sm font-medium text-neutral-700 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2",
                          children: [f.jsxDEV(u5, {
                            className: "w-4 h-4"
                          }, void 0, !1, {
                            fileName: "/app/applet/src/components/Dashboard.tsx",
                            lineNumber: 5843,
                            columnNumber: 33
                          }, this), " Forward"]
                        }, void 0, !0, {
                          fileName: "/app/applet/src/components/Dashboard.tsx",
                          lineNumber: 5842,
                          columnNumber: 31
                        }, this)]
                      }, void 0, !0, {
                        fileName: "/app/applet/src/components/Dashboard.tsx",
                        lineNumber: 5838,
                        columnNumber: 29
                      }, this)]
                    }, void 0, !0, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5787,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5770,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5756,
                  columnNumber: 1
                }, this);
              })()
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 5522,
              columnNumber: 19
            }, this) : f.jsxDEV("div", {
              className: "p-4 md:p-6 h-full",
              children: f.jsxDEV("div", {
                className: "h-full bg-[#1e1e1e] rounded-xl overflow-hidden flex flex-col border border-zinc-800 relative",
                children: [f.jsxDEV("div", {
                  className: "px-4 py-2 bg-[#2d2d2d] border-b border-zinc-800 flex justify-between items-center",
                  children: [f.jsxDEV("div", {
                    className: "flex items-center gap-2",
                    children: [f.jsxDEV("div", {
                      className: "w-2.5 h-2.5 rounded-full bg-red-500"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5858,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "w-2.5 h-2.5 rounded-full bg-yellow-500"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5859,
                      columnNumber: 27
                    }, this), f.jsxDEV("div", {
                      className: "w-2.5 h-2.5 rounded-full bg-green-500"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5860,
                      columnNumber: 27
                    }, this)]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5857,
                    columnNumber: 25
                  }, this), f.jsxDEV("div", {
                    className: "text-[10px] text-zinc-400 font-mono",
                    children: "email-template.html"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5862,
                    columnNumber: 25
                  }, this), f.jsxDEV("button", {
                    onClick: () => {
                      navigator.clipboard.writeText(`<img src="https://tracker.tickk.com/track/${xt.id}" width="1" height="1" />`), ke(!0), setTimeout(() => ke(!1), 2e3);
                    },
                    className: "text-[10px] bg-zinc-700 hover:bg-zinc-600 text-zinc-200 px-2 py-1 rounded transition-colors cursor-pointer flex items-center gap-1",
                    children: [J ? f.jsxDEV(en, {
                      className: "w-3 h-3 text-emerald-500"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5871,
                      columnNumber: 45
                    }, this) : f.jsxDEV(Id, {
                      className: "w-3 h-3"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5871,
                      columnNumber: 94
                    }, this), J ? "Copied" : "Copy"]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5863,
                    columnNumber: 25
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5856,
                  columnNumber: 23
                }, this), f.jsxDEV("div", {
                  className: "flex-1 p-4 overflow-auto",
                  children: f.jsxDEV("pre", {
                    className: "text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre-wrap",
                    children: f.jsxDEV("code", {
                      children: `<!DOCTYPE html>
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
</html>`
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 5877,
                      columnNumber: 27
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5876,
                    columnNumber: 25
                  }, this)
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5875,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5855,
                columnNumber: 21
              }, this)
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 5854,
              columnNumber: 19
            }, this)
          }, void 0, !1, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 5520,
            columnNumber: 15
          }, this)]
        }, void 0, !0, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 5480,
          columnNumber: 13
        }, this)
      }, void 0, !1, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 5479,
        columnNumber: 11
      }, this)
    }, void 0, !1, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 5477,
      columnNumber: 7
    }, this), f.jsxDEV(hi, {
      children: sd && f.jsxDEV("div", {
        className: "fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",
        children: f.jsxDEV(lt.div, {
          initial: {
            opacity: 0,
            scale: .95,
            y: 20
          },
          animate: {
            opacity: 1,
            scale: 1,
            y: 0
          },
          exit: {
            opacity: 0,
            scale: .95,
            y: 20
          },
          className: "bg-white dark:bg-[#090a0c] border border-neutral-200 dark:border-zinc-800 rounded-3xl w-full max-w-md overflow-visible shadow-2xl relative",
          children: [f.jsxDEV("div", {
            className: "flex justify-between items-center p-6 border-b border-neutral-200 dark:border-zinc-900",
            children: [f.jsxDEV("h3", {
              className: "text-xl font-medium font-display text-neutral-900 dark:text-white",
              children: "Create API Key"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 5915,
              columnNumber: 17
            }, this), f.jsxDEV("button", {
              disabled: bs,
              onClick: () => Bs(!1),
              className: "text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer",
              children: f.jsxDEV(Bd, {
                className: "w-5 h-5"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5917,
                columnNumber: 19
              }, this)
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 5916,
              columnNumber: 17
            }, this)]
          }, void 0, !0, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 5914,
            columnNumber: 15
          }, this), f.jsxDEV("form", {
            onSubmit: mr,
            className: "p-6 space-y-6",
            children: [f.jsxDEV("div", {
              className: "space-y-2",
              children: [f.jsxDEV("label", {
                className: "text-sm font-medium text-neutral-900 dark:text-white block",
                children: "Name"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5922,
                columnNumber: 19
              }, this), f.jsxDEV("input", {
                type: "text",
                required: !0,
                disabled: bs,
                placeholder: "e.g. Production Environment",
                value: zo,
                onChange: F => Ro(F.target.value),
                className: "w-full px-4 py-2 bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white disabled:opacity-50"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5923,
                columnNumber: 19
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 5921,
              columnNumber: 17
            }, this), f.jsxDEV("div", {
              className: "space-y-2 relative",
              children: [f.jsxDEV("label", {
                className: "text-sm font-medium text-neutral-900 dark:text-white block",
                children: "Permission"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5934,
                columnNumber: 19
              }, this), f.jsxDEV("div", {
                className: "relative",
                children: [f.jsxDEV("button", {
                  type: "button",
                  disabled: bs,
                  onClick: () => Sl(!Jc),
                  onBlur: () => setTimeout(() => Sl(!1), 150),
                  className: "w-full px-4 py-2 bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-neutral-900 dark:text-white text-left flex justify-between items-center disabled:opacity-50 cursor-pointer",
                  children: [Io, f.jsxDEV(Vd, {
                    className: "w-4 h-4 text-neutral-500"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5944,
                    columnNumber: 23
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5936,
                  columnNumber: 21
                }, this), Jc && f.jsxDEV("div", {
                  className: "absolute left-0 top-full mt-2 w-full rounded-xl bg-white/30 dark:bg-[#111111]/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden p-1 animate-in fade-in slide-in-from-top-2",
                  children: ["Full access", "Sending access"].map(F => f.jsxDEV("button", {
                    type: "button",
                    onClick: () => {
                      ld(F), Sl(!1);
                    },
                    className: "w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors cursor-pointer",
                    children: F
                  }, F, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5949,
                    columnNumber: 27
                  }, this))
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5947,
                  columnNumber: 23
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5935,
                columnNumber: 19
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 5933,
              columnNumber: 17
            }, this), f.jsxDEV("div", {
              className: "pt-2 flex justify-end gap-3",
              children: [f.jsxDEV("button", {
                type: "button",
                disabled: bs,
                onClick: () => Bs(!1),
                className: "px-4 py-2 text-sm font-medium text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-50 cursor-pointer",
                children: "Cancel"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5963,
                columnNumber: 19
              }, this), f.jsxDEV("button", {
                type: "submit",
                disabled: bs,
                className: "relative px-6 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm font-semibold rounded-lg transition-all shadow-sm disabled:opacity-80 flex items-center justify-center min-w-[130px] overflow-hidden cursor-pointer",
                children: bs ? f.jsxDEV("span", {
                  className: "flex items-center gap-2",
                  children: [f.jsxDEV("span", {
                    className: "w-4 h-4 border-2 border-neutral-900 border-t-transparent dark:border-white dark:border-t-transparent rounded-full animate-spin"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 5969,
                    columnNumber: 25
                  }, this), "Generating"]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 5968,
                  columnNumber: 23
                }, this) : "Create API Key"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5966,
                columnNumber: 19
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 5962,
              columnNumber: 17
            }, this)]
          }, void 0, !0, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 5920,
            columnNumber: 15
          }, this)]
        }, void 0, !0, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 5908,
          columnNumber: 13
        }, this)
      }, void 0, !1, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 5907,
        columnNumber: 11
      }, this)
    }, void 0, !1, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 5905,
      columnNumber: 7
    }, this), f.jsxDEV(hi, {
      children: gs && f.jsxDEV("div", {
        className: "fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",
        children: f.jsxDEV(lt.div, {
          initial: {
            opacity: 0,
            scale: .95,
            y: 20
          },
          animate: {
            opacity: 1,
            scale: 1,
            y: 0
          },
          exit: {
            opacity: 0,
            scale: .95,
            y: 20
          },
          className: "bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-zinc-800 rounded-[24px] w-full max-w-[500px] overflow-hidden shadow-2xl relative",
          children: [f.jsxDEV("div", {
            className: "absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 dark:from-emerald-600 dark:via-teal-500 dark:to-emerald-600"
          }, void 0, !1, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 5994,
            columnNumber: 15
          }, this), f.jsxDEV("div", {
            className: "flex justify-between items-center p-6 pb-4",
            children: [f.jsxDEV("h3", {
              className: "text-[17px] font-semibold font-sans text-neutral-900 dark:text-white tracking-tight",
              children: "View API Key"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 5997,
              columnNumber: 17
            }, this), f.jsxDEV("button", {
              onClick: () => co(null),
              className: "p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors bg-transparent rounded-md hover:bg-neutral-100 dark:hover:bg-zinc-800/50 cursor-pointer",
              children: f.jsxDEV(Bd, {
                className: "w-5 h-5"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 5999,
                columnNumber: 19
              }, this)
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 5998,
              columnNumber: 17
            }, this)]
          }, void 0, !0, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 5996,
            columnNumber: 15
          }, this), f.jsxDEV("div", {
            className: "px-6 pb-6 space-y-6",
            children: [f.jsxDEV("div", {
              className: "flex items-center gap-3 p-4 bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/20 rounded-xl text-emerald-800 dark:text-emerald-400",
              children: [f.jsxDEV("div", {
                className: "w-5 h-5 shrink-0 rounded-full border border-current flex items-center justify-center font-bold text-xs italic",
                children: "i"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 6006,
                columnNumber: 19
              }, this), f.jsxDEV("p", {
                className: "text-[13px] tracking-wide",
                children: ["You can only see this key once. ", f.jsxDEV("strong", {
                  children: "Store it safely."
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 6007,
                  columnNumber: 92
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 6007,
                columnNumber: 19
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 6005,
              columnNumber: 17
            }, this), f.jsxDEV("div", {
              className: "space-y-2",
              children: [f.jsxDEV("label", {
                className: "text-[13px] font-medium text-neutral-700 dark:text-zinc-400 block",
                children: "API Key"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 6011,
                columnNumber: 19
              }, this), f.jsxDEV("div", {
                className: "relative group",
                children: [f.jsxDEV("input", {
                  type: A ? "text" : "password",
                  readOnly: !0,
                  value: gs.token,
                  className: "w-full pl-4 pr-[70px] py-3.5 bg-neutral-50 dark:bg-[#151518] border border-neutral-200 dark:border-zinc-800 rounded-xl text-[14px] font-mono text-neutral-900 dark:text-white outline-none focus:border-neutral-400 dark:focus:border-zinc-600 transition-colors shadow-sm"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 6013,
                  columnNumber: 21
                }, this), f.jsxDEV("div", {
                  className: "absolute right-2 top-1/2 -translate-y-1/2 flex items-center",
                  children: [f.jsxDEV("button", {
                    onClick: () => Y(!A),
                    className: "p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer",
                    title: A ? "Hide key" : "Show key",
                    children: A ? f.jsxDEV(MB, {
                      className: "w-4 h-4"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 6025,
                      columnNumber: 43
                    }, this) : f.jsxDEV(Fd, {
                      className: "w-4 h-4"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 6025,
                      columnNumber: 76
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 6020,
                    columnNumber: 23
                  }, this), f.jsxDEV("button", {
                    onClick: () => {
                      navigator.clipboard.writeText(gs.token), _e(!0), setTimeout(() => _e(!1), 2e3);
                    },
                    className: "p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer",
                    title: "Copy key",
                    children: pe ? f.jsxDEV(en, {
                      className: "w-4 h-4 text-emerald-500"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 6036,
                      columnNumber: 38
                    }, this) : f.jsxDEV(Id, {
                      className: "w-4 h-4"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 6036,
                      columnNumber: 87
                    }, this)
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 6027,
                    columnNumber: 23
                  }, this)]
                }, void 0, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 6019,
                  columnNumber: 21
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 6012,
                columnNumber: 19
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 6010,
              columnNumber: 17
            }, this), f.jsxDEV("div", {
              className: "pt-2",
              children: f.jsxDEV("button", {
                onClick: () => co(null),
                className: "w-auto px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-neutral-900 text-[14px] font-semibold rounded-lg transition-all shadow-sm cursor-pointer",
                children: "Done"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 6043,
                columnNumber: 19
              }, this)
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 6042,
              columnNumber: 17
            }, this)]
          }, void 0, !0, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 6003,
            columnNumber: 15
          }, this)]
        }, void 0, !0, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 5987,
          columnNumber: 13
        }, this)
      }, void 0, !1, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 5986,
        columnNumber: 11
      }, this)
    }, void 0, !1, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 5984,
      columnNumber: 7
    }, this), f.jsxDEV(hi, {
      children: Mo && f.jsxDEV("div", {
        className: "fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md",
        children: f.jsxDEV(lt.div, {
          initial: {
            opacity: 0,
            scale: .95,
            y: 20
          },
          animate: {
            opacity: 1,
            scale: 1,
            y: 0
          },
          exit: {
            opacity: 0,
            scale: .95,
            y: 20
          },
          className: "bg-white dark:bg-[#0c0c0e] backdrop-blur-3xl border border-neutral-200 dark:border-zinc-800 rounded-[24px] w-full max-w-[500px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative",
          children: [f.jsxDEV("div", {
            className: "absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none"
          }, void 0, !1, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 6064,
            columnNumber: 15
          }, this), f.jsxDEV("div", {
            className: "relative z-10",
            children: [f.jsxDEV("div", {
              className: "flex justify-between items-center p-6 pb-4",
              children: [f.jsxDEV("h3", {
                className: "text-xl font-semibold font-display text-neutral-900 dark:text-white tracking-tight",
                children: ["Connect ", Mo.name]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 6067,
                columnNumber: 19
              }, this), f.jsxDEV("button", {
                type: "button",
                onClick: () => lo(null),
                className: "p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors bg-neutral-100 dark:bg-black/20 rounded-full hover:bg-neutral-200 dark:hover:bg-white/10 cursor-pointer",
                children: f.jsxDEV(Bd, {
                  className: "w-5 h-5"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 6069,
                  columnNumber: 21
                }, this)
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 6068,
                columnNumber: 19
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 6066,
              columnNumber: 17
            }, this), f.jsxDEV("form", {
              onSubmit: F => {
                F.preventDefault(), bc(!0), setTimeout(() => {
                  bc(!1), lo(null), hs(Mo.id), Up(ye => ({
                    ...ye,
                    [Mo.id]: "connected"
                  }));
                  try {
                    Xe && Im();
                  } catch {}
                }, 2e3);
              },
              className: "px-6 pb-6 space-y-6",
              children: [f.jsxDEV("div", {
                className: "space-y-2",
                children: f.jsxDEV("p", {
                  className: "text-sm text-neutral-600 dark:text-zinc-400",
                  children: Mo.description
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 6086,
                  columnNumber: 21
                }, this)
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 6085,
                columnNumber: 19
              }, this), f.jsxDEV("div", {
                className: "space-y-4",
                children: Mo.fields.map(F => f.jsxDEV("div", {
                  className: "space-y-2",
                  children: [f.jsxDEV("label", {
                    className: "text-[13px] font-medium text-neutral-700 dark:text-zinc-300 block",
                    children: F.label
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 6094,
                    columnNumber: 25
                  }, this), f.jsxDEV("input", {
                    type: F.type,
                    placeholder: F.placeholder,
                    required: !0,
                    value: ms[F.id] || "",
                    onChange: ye => yf(Be => ({
                      ...Be,
                      [F.id]: ye.target.value
                    })),
                    className: "w-full px-4 py-3 bg-white dark:bg-black/40 border border-neutral-200 dark:border-zinc-800/50 rounded-xl text-sm font-sans text-neutral-900 dark:text-white outline-none focus:border-neutral-400 dark:focus:border-zinc-600 transition-colors shadow-inner"
                  }, void 0, !1, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 6095,
                    columnNumber: 25
                  }, this)]
                }, F.id, !0, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 6093,
                  columnNumber: 23
                }, this))
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 6091,
                columnNumber: 19
              }, this), f.jsxDEV("div", {
                className: "pt-4 flex justify-end gap-3",
                children: [f.jsxDEV("button", {
                  type: "button",
                  disabled: Dl,
                  onClick: () => lo(null),
                  className: "px-4 py-2 text-sm font-medium text-neutral-700 dark:text-zinc-300 hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-50 cursor-pointer",
                  children: "Cancel"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 6108,
                  columnNumber: 21
                }, this), f.jsxDEV("button", {
                  type: "submit",
                  disabled: Dl,
                  className: "relative px-6 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm font-semibold rounded-xl transition-all shadow-lg disabled:opacity-80 flex items-center justify-center min-w-[140px] overflow-hidden cursor-pointer",
                  children: Dl ? f.jsxDEV("span", {
                    className: "flex items-center gap-2",
                    children: [f.jsxDEV("span", {
                      className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                    }, void 0, !1, {
                      fileName: "/app/applet/src/components/Dashboard.tsx",
                      lineNumber: 6114,
                      columnNumber: 27
                    }, this), "Verifying"]
                  }, void 0, !0, {
                    fileName: "/app/applet/src/components/Dashboard.tsx",
                    lineNumber: 6113,
                    columnNumber: 25
                  }, this) : "Connect & Verify"
                }, void 0, !1, {
                  fileName: "/app/applet/src/components/Dashboard.tsx",
                  lineNumber: 6111,
                  columnNumber: 21
                }, this)]
              }, void 0, !0, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 6107,
                columnNumber: 19
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 6073,
              columnNumber: 17
            }, this)]
          }, void 0, !0, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 6065,
            columnNumber: 15
          }, this)]
        }, void 0, !0, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 6058,
          columnNumber: 13
        }, this)
      }, void 0, !1, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 6057,
        columnNumber: 11
      }, this)
    }, void 0, !1, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 6055,
      columnNumber: 7
    }, this), f.jsxDEV(hi, {
      children: Qc && f.jsxDEV("div", {
        className: "fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md",
        children: f.jsxDEV(lt.div, {
          initial: {
            opacity: 0,
            scale: .95,
            y: 20
          },
          animate: {
            opacity: 1,
            scale: 1,
            y: 0
          },
          exit: {
            opacity: 0,
            scale: .95,
            y: 20
          },
          className: "bg-white/40 dark:bg-black/30 backdrop-blur-3xl border border-white/50 dark:border-white/10 rounded-[24px] w-full max-w-[400px] overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.2)] dark:shadow-[0_16px_64px_rgba(0,0,0,0.6)] relative",
          children: [f.jsxDEV("div", {
            className: "absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent dark:from-emerald-500/5 dark:to-transparent pointer-events-none"
          }, void 0, !1, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 6139,
            columnNumber: 15
          }, this), f.jsxDEV("div", {
            className: "relative z-10 flex flex-col items-center justify-center p-10 text-center space-y-6",
            children: [f.jsxDEV("div", {
              className: "w-20 h-20 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-2 shadow-[0_0_40px_rgba(16,185,129,0.3)]",
              children: f.jsxDEV(en, {
                className: "w-10 h-10 text-emerald-500"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 6142,
                columnNumber: 19
              }, this)
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 6141,
              columnNumber: 17
            }, this), f.jsxDEV("div", {
              children: [f.jsxDEV("h3", {
                className: "text-2xl font-bold font-display text-neutral-900 dark:text-white tracking-tight mb-2",
                children: "Connected Successfully"
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 6145,
                columnNumber: 19
              }, this), f.jsxDEV("p", {
                className: "text-sm text-neutral-600 dark:text-zinc-400",
                children: "Your integration is now active and ready to sync telemetry data."
              }, void 0, !1, {
                fileName: "/app/applet/src/components/Dashboard.tsx",
                lineNumber: 6146,
                columnNumber: 19
              }, this)]
            }, void 0, !0, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 6144,
              columnNumber: 17
            }, this), f.jsxDEV("button", {
              onClick: () => hs(null),
              className: "w-full py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm font-semibold rounded-xl transition-all shadow-lg mt-4 cursor-pointer",
              children: "Continue"
            }, void 0, !1, {
              fileName: "/app/applet/src/components/Dashboard.tsx",
              lineNumber: 6148,
              columnNumber: 17
            }, this)]
          }, void 0, !0, {
            fileName: "/app/applet/src/components/Dashboard.tsx",
            lineNumber: 6140,
            columnNumber: 15
          }, this)]
        }, void 0, !0, {
          fileName: "/app/applet/src/components/Dashboard.tsx",
          lineNumber: 6133,
          columnNumber: 13
        }, this)
      }, void 0, !1, {
        fileName: "/app/applet/src/components/Dashboard.tsx",
        lineNumber: 6132,
        columnNumber: 11
      }, this)
    }, void 0, !1, {
      fileName: "/app/applet/src/components/Dashboard.tsx",
      lineNumber: 6130,
      columnNumber: 7
    }, this)]
  }, void 0, !0, {
    fileName: "/app/applet/src/components/Dashboard.tsx",
    lineNumber: 1985,
    columnNumber: 5
  }, this);
}