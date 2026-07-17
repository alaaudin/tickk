import React, { useState } from "react";
import { CustomSelect } from "./CustomSelect";
import { CustomDateTimePicker } from "./CustomDateTimePicker";
import { 
  Check, Send, AlertTriangle, CheckCircle2, 
  Bold, Italic, Underline, Link, Paperclip, 
  AlignLeft, AlignCenter, List, Image, ListOrdered,
  Eye, PenLine, Copy, ChevronRight, Clock, MousePointerClick, Calendar, Smartphone, Share2, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  GmailLogo,
  OutlookLogo,
  YahooLogo,
  AppleLogo
} from "./OfficialLogos";

export default function ManualEmailDispatch({ profile }: { profile?: any }) {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "dispatching" | "success">("idle");
  const [viewMode, setViewMode] = useState<"compose" | "tracking">("compose");
  const [fontFamily, setFontFamily] = useState("font-sans");
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");


  const [generatingReply, setGeneratingReply] = useState<number | null>(null);
  const [aiReplies, setAiReplies] = useState<{ [key: number]: string }>({});

  const generateQuickReply = async (item: any) => {
    try {
      setGeneratingReply(item.id);
      const backendUrl = import.meta.env.VITE_API_URL || "https://tickk-backend.onrender.com";
      const response = await fetch(`${backendUrl}/api/suggest-reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailContent: item.body || "Follow up on previous conversation",
          emailSubject: item.subject,
          timelineLogs: item.logs,
          provider: item.provider
        })
      });
      const data = await response.json();
      if (data.suggestion) {
        setAiReplies(prev => ({ ...prev, [item.id]: data.suggestion }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingReply(null);
    }
  };

  const getProviderIcon = () => {
    const domain = recipient.toLowerCase();
    if (domain.includes("@gmail.com")) return <GmailLogo className="w-5 h-5" />;
    if (domain.includes("@outlook.com") || domain.includes("@hotmail.com")) return <OutlookLogo className="w-5 h-5" />;
    if (domain.includes("@yahoo.com")) return <YahooLogo className="w-5 h-5" />;
    if (domain.includes("@me.com") || domain.includes("@icloud.com") || domain.includes("@mac.com")) return <AppleLogo className="w-5 h-5" />;
    return null;
  };

  const isPayloadReady = recipient.includes("@") && recipient.includes(".");

  const handleDispatch = () => {
    if (!isPayloadReady) return;
    setStatus("dispatching");
    setTimeout(() => {
      setStatus("success");
      const providerStr = recipient.includes("@gmail") ? "gmail" : recipient.includes("@outlook") ? "outlook" : recipient.includes("@yahoo") ? "yahoo" : recipient.includes("@icloud") ? "apple" : "unknown";
      
      const newDispatch = {
        id: Date.now(),
        email: recipient,
        subject: subject || "No Subject",
        body: body, // Ensure body is saved for quick reply context
        sent: isScheduling && scheduleDate ? `Scheduled for ${new Date(scheduleDate).toLocaleString()}` : "Just now",
        opens: 0,
        clicks: 0,
        provider: providerStr,
        device: "unknown",
        isManual: true,
        status: isScheduling && scheduleDate ? "scheduled" : "sent",
        logs: []
      };
      
      setTrackingData(prev => [newDispatch, ...prev]);
      
      setTimeout(() => {
        setStatus("idle");
        setRecipient("");
        setSubject("");
        setBody("");
        setIsScheduling(false);
        setScheduleDate("");
        setViewMode("tracking");
      }, 1000);
    }, 1500);
  };

  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [trackingData, setTrackingData] = useState([
    { id: 1, email: "sarah.jenkins@gmail.com", subject: "Q3 Board Deck - Final", sent: "2h ago", opens: 3, clicks: 1, provider: "gmail", device: "desktop", isManual: true, status: "sent", logs: [{ id: "l1", type: "open", timestamp: "2026-07-14T11:00:00Z", ip: "192.168.1.1", geo: "New York, US", device: "Chrome / macOS" }, { id: "l2", type: "click", timestamp: "2026-07-14T11:05:00Z", ip: "192.168.1.1", geo: "New York, US", device: "Chrome / macOS" }, { id: "l3", type: "open", timestamp: "2026-07-14T11:30:00Z", ip: "10.0.0.1", geo: "London, UK", device: "Safari / iOS" }] },
    { id: 2, email: "michael.chen@outlook.com", subject: "Vendor Agreement Revised", sent: "5h ago", opens: 1, clicks: 0, provider: "outlook", device: "mobile", isManual: true, status: "sent", logs: [{ id: "l4", type: "open", timestamp: "2026-07-14T09:00:00Z", ip: "172.16.0.5", geo: "Tokyo, JP", device: "Edge / Windows" }] },
    { id: 3, email: "alex.williams@yahoo.com", subject: "Following up on yesterday", sent: "1d ago", opens: 0, clicks: 0, provider: "yahoo", device: "unknown", isManual: true, status: "sent", logs: [] },
    { id: 4, email: "j.doe@icloud.com", subject: "Your private invitation", sent: "2d ago", opens: 5, clicks: 2, provider: "apple", device: "mobile", isManual: true, status: "sent", logs: [{ id: "l5", type: "open", timestamp: "2026-07-13T10:00:00Z", ip: "8.8.8.8", geo: "San Francisco, US", device: "Mail / iOS" }] }
  ]);

  const renderProviderIcon = (provider: string) => {
    switch(provider) {
      case 'gmail': return <GmailLogo className="w-4 h-4" />;
      case 'outlook': return <OutlookLogo className="w-4 h-4" />;
      case 'yahoo': return <YahooLogo className="w-4 h-4" />;
      case 'apple': return <AppleLogo className="w-4 h-4 text-black dark:text-white" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold font-display text-neutral-900 dark:text-white tracking-tight">
            Manual Email Dispatch
          </h2>
          <p className="text-xs text-zinc-500 mt-1 font-normal">
            Execute outbound transmissions directly from the executive interface with integrated telemetry.
          </p>
        </div>
        
        {/* Toggle Button */}
        <div className="flex items-center bg-neutral-100 dark:bg-zinc-900/50 p-1 rounded-xl border border-neutral-200/50 dark:border-zinc-800/50">
          <button 
            onClick={() => setViewMode("compose")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${viewMode === "compose" ? "bg-white dark:bg-zinc-800 text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500 dark:text-zinc-400 hover:text-neutral-700 dark:hover:text-zinc-300"}`}
          >
            <PenLine className="w-3.5 h-3.5" /> Compose
          </button>
          <button 
            onClick={() => setViewMode("tracking")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${viewMode === "tracking" ? "bg-white dark:bg-zinc-800 text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500 dark:text-zinc-400 hover:text-neutral-700 dark:hover:text-zinc-300"}`}
          >
            <Eye className="w-3.5 h-3.5" /> View Tracking
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "compose" ? (
          <motion.div 
            key="compose"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white/40 dark:bg-[#121215]/45 backdrop-blur-2xl border border-neutral-200/50 dark:border-zinc-800/60 rounded-3xl p-8 relative shadow-[0_20px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_40px_rgba(255,255,255,0.015)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-100/50 via-transparent to-transparent dark:from-white/5 dark:via-transparent dark:to-transparent pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-mono tracking-widest text-neutral-500 dark:text-zinc-400 uppercase">
                  Recipient Address
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="target@domain.com"
                    className="w-full bg-white/60 dark:bg-black/30 border border-neutral-200/50 dark:border-zinc-800/60 text-neutral-900 dark:text-zinc-100 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-neutral-400 dark:focus:border-zinc-600 transition-colors backdrop-blur-sm pr-12"
                  />
                  <div className="absolute right-4 pointer-events-none transition-all duration-300">
                    {getProviderIcon()}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-mono tracking-widest text-neutral-500 dark:text-zinc-400 uppercase">
                  Subject Campaign
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter dispatch subject..."
                  className="w-full bg-white/60 dark:bg-black/30 border border-neutral-200/50 dark:border-zinc-800/60 text-neutral-900 dark:text-zinc-100 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-neutral-400 dark:focus:border-zinc-600 transition-colors backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-mono tracking-widest text-neutral-500 dark:text-zinc-400 uppercase">
                  Message Body
                </label>
                <div className="w-full bg-white/60 dark:bg-black/30 border border-neutral-200/50 dark:border-zinc-800/60 rounded-xl overflow-hidden backdrop-blur-sm transition-colors focus-within:border-neutral-400 dark:focus-within:border-zinc-600">
                  {/* Rich Text Toolbar */}
                  <div className="flex flex-wrap items-center gap-1 p-2 border-b border-neutral-200/50 dark:border-zinc-800/60 bg-white/40 dark:bg-black/20">
                    <div className="w-px h-4 bg-neutral-300 dark:bg-zinc-700 mx-1" />
                    <CustomSelect
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      options={[
                        { value: "font-sans", label: "Inter (Sans)", className: "font-sans" },
                        { value: "font-display", label: "Space Grotesk (Display)", className: "font-display" },
                        { value: "font-serif", label: "Playfair Display (Serif)", className: "font-serif" },
                        { value: "font-mono", label: "JetBrains Mono (Mono)", className: "font-mono" },
                        { value: "font-outfit", label: "Outfit (Sans)", className: "font-outfit" }
                      ]}
                      className="bg-transparent text-xs text-neutral-600 dark:text-zinc-300 focus:outline-none cursor-pointer py-1 px-2 hover:bg-neutral-200/50 dark:hover:bg-zinc-800/50 rounded transition-colors border-none"
                    />

                    <button className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-white rounded hover:bg-neutral-200/50 dark:hover:bg-zinc-800/50 transition-colors" title="Bold"><Bold className="w-4 h-4" /></button>
                    <button className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-white rounded hover:bg-neutral-200/50 dark:hover:bg-zinc-800/50 transition-colors" title="Italic"><Italic className="w-4 h-4" /></button>
                    <button className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-white rounded hover:bg-neutral-200/50 dark:hover:bg-zinc-800/50 transition-colors" title="Underline"><Underline className="w-4 h-4" /></button>
                    <div className="w-px h-4 bg-neutral-300 dark:bg-zinc-700 mx-1" />
                    <button className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-white rounded hover:bg-neutral-200/50 dark:hover:bg-zinc-800/50 transition-colors" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
                    <button className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-white rounded hover:bg-neutral-200/50 dark:hover:bg-zinc-800/50 transition-colors" title="Align Center"><AlignCenter className="w-4 h-4" /></button>
                    <div className="w-px h-4 bg-neutral-300 dark:bg-zinc-700 mx-1" />
                    <button className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-white rounded hover:bg-neutral-200/50 dark:hover:bg-zinc-800/50 transition-colors" title="Bullet List"><List className="w-4 h-4" /></button>
                    <button className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-white rounded hover:bg-neutral-200/50 dark:hover:bg-zinc-800/50 transition-colors" title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
                    <div className="w-px h-4 bg-neutral-300 dark:bg-zinc-700 mx-1" />
                    <button className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-white rounded hover:bg-neutral-200/50 dark:hover:bg-zinc-800/50 transition-colors" title="Insert Link"><Link className="w-4 h-4" /></button>
                    <button className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-white rounded hover:bg-neutral-200/50 dark:hover:bg-zinc-800/50 transition-colors" title="Insert Image"><Image className="w-4 h-4" /></button>
                    <button className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-white rounded hover:bg-neutral-200/50 dark:hover:bg-zinc-800/50 transition-colors" title="Attach Document"><Paperclip className="w-4 h-4" /></button>
                  </div>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Draft your executive communication here..."
                    className={`w-full bg-transparent text-neutral-900 dark:text-zinc-100 text-sm px-4 py-4 focus:outline-none min-h-[180px] resize-y ${fontFamily}`}
                  />
                </div>
              </div>

              {/* Telemetry Validator Bar */}
              <div className="pt-4 border-t border-neutral-200/50 dark:border-zinc-800/50">
                <div className="flex items-center justify-between">
                  <div className="relative group cursor-default">
                    {isPayloadReady ? (
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] sm:text-xs tracking-wider">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>✓ TELEMETRY PAYLOAD INTEGRATED</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-mono text-[10px] sm:text-xs tracking-wider">
                        <AlertTriangle className="w-4 h-4" />
                        <span>✗ DISPATCH INHIBITED</span>
                      </div>
                    )}
                    
                    {/* Error Tooltip */}
                    {!isPayloadReady && (
                      <div className="absolute top-full left-0 mt-2 w-72 bg-red-950/80 backdrop-blur-xl border border-red-900/50 rounded-xl p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-2xl shadow-red-900/20 translate-y-2 group-hover:translate-y-0 duration-300">
                        <h4 className="text-red-200 text-xs font-semibold mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> DIAGNOSTIC CHECKLIST</h4>
                        <ul className="text-[11px] text-red-300/80 space-y-1.5 list-disc pl-4 font-sans">
                          <li>Missing valid recipient domain string</li>
                          <li>Unverified outgoing proxy relay</li>
                          <li>Pixel injection sequence aborted</li>
                        </ul>
                        <div className="mt-3 text-[10px] font-mono text-red-400/80 border-t border-red-900/40 pt-2">
                          ACTION REQUIRED: Provide target destination.
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <AnimatePresence>
                      {isScheduling && (
                        <motion.div
                          initial={{ opacity: 0, width: 0, scale: 0.95 }}
                          animate={{ opacity: 1, width: "auto", scale: 1 }}
                          exit={{ opacity: 0, width: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="relative"
                        >
                          <CustomDateTimePicker
                            value={scheduleDate}
                            onChange={(val) => setScheduleDate(val)}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <button
                      onClick={() => {
                        if (isScheduling && !scheduleDate) {
                          // Allow toggling off if they haven't picked a date, but we can just toggle unconditionally
                          setIsScheduling(!isScheduling);
                          setScheduleDate("");
                        } else {
                          setIsScheduling(!isScheduling);
                        }
                      }}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                        isScheduling || scheduleDate 
                          ? 'border-neutral-400 dark:border-white text-neutral-900 dark:text-white bg-neutral-200/50 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 shadow-sm' 
                          : 'border-neutral-200 dark:border-zinc-800 text-neutral-500 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-900'
                      }`}
                      title="Schedule Dispatch"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleDispatch}
                      disabled={!isPayloadReady || status === 'dispatching' || profile?.plan === 'free'}
                      className="flex items-center gap-2 bg-neutral-900 hover:bg-black disabled:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:disabled:bg-neutral-400 text-white dark:text-black px-6 py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg"
                      title={profile?.plan === 'free' ? "Upgrade to Pro to dispatch emails" : ""}
                    >
                      <span>
                        {profile?.plan === 'free' ? 'Upgrade to Pro' : status === 'dispatching' 
                          ? 'Encrypting Payload...' 
                          : (isScheduling && scheduleDate ? 'Schedule Dispatch' : 'Send Dispatch')}
                      </span>
                      <Send className={`w-4 h-4 ${status === 'dispatching' ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="tracking"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >

            <div className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
              <div>
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-neutral-100 dark:bg-zinc-950/40 text-zinc-500 text-[10px] uppercase border-b border-neutral-200 dark:border-zinc-900 font-normal tracking-wider">
                    <tr>
                      <th className="px-6 py-5 font-normal tracking-wider">Recipient Target</th>
                      <th className="px-6 py-5 font-normal tracking-wider">Status</th>
                      <th className="px-6 py-5 font-normal tracking-wider">Open Count</th>
                      <th className="px-6 py-5 font-normal tracking-wider">Dispatch Timestamp</th>
                      <th className="px-6 py-5 font-normal tracking-wider">Latest Open Confirmation</th>
                      <th className="px-6 py-5 font-normal tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-zinc-900/40">
                    {trackingData.map((item) => (
                      <React.Fragment key={item.id}>
                        <tr className="hover:bg-neutral-50/50 dark:hover:bg-zinc-850/30 transition-colors border-b border-neutral-200/50 dark:border-zinc-800/40 group">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="p-1 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 w-6 h-6 inline-flex items-center justify-center rounded-md shadow-sm shrink-0">
                                {renderProviderIcon(item.provider)}
                              </div>
                              <div className="flex items-center gap-1.5 max-w-[150px]">
                                <span className="text-neutral-900 dark:text-zinc-100 font-medium text-xs truncate" title={item.email}>{item.email}</span>
                                {item.isManual && (
                                  <div className="group/icon relative inline-flex items-center justify-center shrink-0 cursor-default">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                      Sent manually using TICKK
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-[11px] text-zinc-500 mt-1 font-normal tracking-tight">
                              {item.subject}
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-normal border ${
                              item.status === 'scheduled' 
                                ? 'text-blue-600 dark:text-blue-400 bg-blue-500/5 border-blue-500/20' 
                                : item.opens > 0 
                                  ? 'text-neutral-900 dark:text-white bg-emerald-500/5 border-emerald-500/20' 
                                  : 'text-amber-500 dark:text-amber-400 bg-amber-500/5 border-amber-500/20'
                            }`}>
                              {item.status === 'scheduled' ? (
                                <React.Fragment>
                                  <Clock className="w-3 h-3" />
                                  Scheduled
                                </React.Fragment>
                              ) : item.opens > 0 ? (
                                <span className="inline-flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M20 6 9 17l-5-5"/></svg> Confirmed</span>
                              ) : (
                                'Pending'
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-6 text-neutral-600 dark:text-zinc-400 font-normal">
                            <div className="flex flex-col gap-1.5 justify-center">
                              <div>
                                {item.opens > 0 ? (
                                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-50 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-850 rounded-lg text-[10px] font-mono text-neutral-800 dark:text-zinc-200 shadow-sm select-none whitespace-nowrap">
                                    <span className="font-normal tracking-wide text-neutral-700 dark:text-zinc-300 whitespace-nowrap">
                                      {item.opens}{item.opens === 1 ? 'st' : item.opens === 2 ? 'nd' : item.opens === 3 ? 'rd' : 'th'} time!
                                    </span>
                                    <span className="h-3 w-[1px] bg-neutral-300 dark:bg-zinc-800" />
                                    {item.clicks && item.clicks > 0 ? (
                                      <span className="inline-flex items-center gap-1 text-neutral-700 dark:text-zinc-300 font-normal whitespace-nowrap">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                        Link Clicked
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 text-neutral-500 dark:text-zinc-400 font-normal whitespace-nowrap">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 dark:text-zinc-500"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                        No Link Clicked
                                      </span>
                                    )}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-1.5 bg-neutral-100 dark:bg-zinc-900/40 border border-neutral-200/50 dark:border-zinc-800/40 rounded-lg text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                                    {item.status === 'scheduled' ? 'Not Dispatched' : 'No Opens'}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-6 text-neutral-600 dark:text-zinc-400 font-normal">
                            {item.sent}
                          </td>
                          <td className="px-6 py-6 text-neutral-500 dark:text-zinc-500 font-normal">
                            {item.opens > 0 ? "Just now" : "Not Clicked Yet"}
                          </td>
                          <td className="px-6 py-6 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-3">
                              <button className="p-2 text-zinc-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded-lg border border-neutral-200 dark:border-zinc-800/40 transition-all cursor-pointer" title="Copy Tracking Pixel Snippet">
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button className="p-2 text-zinc-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded-lg border border-neutral-200 dark:border-zinc-800/40 transition-all cursor-pointer" title="Preview Email HTML Content">
                                <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-neutral-900 dark:text-white" />
                              </button>
                              <button 
                                onClick={() => setExpandedRow(expandedRow === item.id ? null : item.id as number)}
                                className="px-3.5 py-1.5 text-xs font-normal border border-neutral-200 dark:border-zinc-800 hover:border-neutral-300 dark:hover:border-zinc-700 bg-neutral-100 dark:bg-zinc-900/40 hover:bg-neutral-200 dark:hover:bg-zinc-900/80 text-neutral-700 dark:text-zinc-300 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                              >
                                <span>{expandedRow === item.id ? "Hide Timeline" : "View Timeline"}</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expandedRow === item.id && (
                          <tr className="bg-neutral-100/30 dark:bg-zinc-900/10 border-b border-neutral-200/50 dark:border-zinc-900/50">
                            <td colSpan={6} className="px-6 pb-6 pt-1">
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="w-full mx-auto bg-white/20 dark:bg-black/20 backdrop-blur-2xl rounded-2xl border border-neutral-200/30 dark:border-zinc-800/40 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
                                  <div className="relative bg-neutral-50/60 dark:bg-[#0d0d0f]/60 backdrop-blur-3xl p-6 md:p-8 rounded-[14px] border border-white/10 dark:border-zinc-900/30 space-y-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/40 dark:border-zinc-800/30 pb-4">
                                      <div className="space-y-0.5">
                                        <div className="text-[10px] uppercase text-neutral-500 dark:text-zinc-400 tracking-[0.18em] font-bold font-mono flex items-center gap-2">
                                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-zinc-500 animate-pulse" />
                                          TELEMETRY LIFECYCLE
                                        </div>
                                        <h4 className="text-sm font-bold text-neutral-900 dark:text-zinc-100 flex items-center gap-2 tracking-tight">
                                          Interaction Timeline Map
                                        </h4>
                                      </div>
                                      <div className="flex flex-wrap gap-1.5 items-center">
                                        <button 
                                          title="Copy Timeline Data"
                                          onClick={() => {
                                            navigator.clipboard.writeText(JSON.stringify(item.logs, null, 2));
                                            // You might want to use a toast here instead of alert in real code, but for now this works or we can just swallow it.
                                          }}
                                          className="p-1.5 bg-white dark:bg-zinc-900/50 hover:bg-neutral-100 dark:hover:bg-zinc-800 border border-neutral-200 dark:border-zinc-800/50 rounded-md text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                                        >
                                          <Copy className="w-3.5 h-3.5" />
                                        </button>
                                        <button 
                                          title="Share Timeline"
                                          onClick={() => {
                                            if (navigator.share) {
                                                navigator.share({
                                                    title: 'Interaction Timeline',
                                                    text: 'Check out this interaction timeline.',
                                                    url: window.location.href,
                                                }).catch(console.error);
                                            }
                                          }}
                                          className="p-1.5 bg-white dark:bg-zinc-900/50 hover:bg-neutral-100 dark:hover:bg-zinc-800 border border-neutral-200 dark:border-zinc-800/50 rounded-md text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors mr-1"
                                        >
                                          <Share2 className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="px-2.5 py-0.5 bg-neutral-200/40 dark:bg-zinc-900/50 border border-neutral-300/20 dark:border-zinc-800/40 rounded text-[10px] font-mono text-neutral-600 dark:text-zinc-300">
                                          TO: <span className="font-normal text-neutral-800 dark:text-zinc-100">{item.email}</span>
                                        </span>
                                      </div>
                                    </div>

                                    {item.logs && item.logs.length > 0 ? (
                                      <div className="w-full rounded-xl border border-neutral-200/50 dark:border-zinc-900/60 bg-white/20 dark:bg-zinc-950/20 backdrop-blur-2xl">
                                        <table className="w-full text-left text-xs">
                                          <thead>
                                            <tr className="border-b border-neutral-200/50 dark:border-zinc-800/50 text-zinc-500 dark:text-zinc-400 bg-neutral-100/30 dark:bg-zinc-900/40 backdrop-blur-md">
                                              <th className="px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider">Sequence / ID</th>
                                              <th className="px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider">Action / Event</th>
                                              <th className="px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider">Timestamp</th>
                                              <th className="px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider">IP Address</th>
                                              <th className="px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider">Geographic Hub</th>
                                              <th className="px-4 py-3 font-mono text-[9px] uppercase font-semibold tracking-wider">Device & Browser</th>
                                            </tr>
                                          </thead>
                                          <tbody className="divide-y divide-neutral-200/50 dark:divide-zinc-800/50">
                                            {item.logs.map((log, index) => {
                                              const isClick = log.type === 'click';
                                              const seqName = isClick ? `${item.logs.filter((l, i) => i <= index && l.type === 'click').length} Click` : `${item.logs.filter((l, i) => i <= index && l.type === 'open').length} Open`;
                                              
                                              return (
                                              <tr key={log.id} className="border-b border-neutral-200/45 dark:border-zinc-800/35 hover:bg-neutral-50/40 dark:hover:bg-zinc-900/15 transition-colors">
                                                <td className="px-4 py-3.5">
                                                  <span className="font-mono text-[10px] text-neutral-500 dark:text-zinc-400 bg-neutral-100/60 dark:bg-zinc-900/50 border border-neutral-200/40 dark:border-zinc-800/40 px-2.5 py-1 rounded-md select-none">
                                                    {seqName}
                                                  </span>
                                                </td>
                                                <td className="px-4 py-3.5">
                                                  {isClick ? (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-emerald-500/20 bg-emerald-500/5 text-neutral-900 dark:text-white shadow-sm">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 mr-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                                      Link Clicked
                                                    </span>
                                                  ) : (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-normal border border-neutral-200/80 dark:border-zinc-800 bg-neutral-100/50 dark:bg-white/5 text-neutral-900 dark:text-white shadow-sm">
                                                      <Eye className="w-3.5 h-3.5 text-neutral-400 dark:text-zinc-400 mr-1" />
                                                      Email Open
                                                    </span>
                                                  )}
                                                </td>
                                                <td className="px-4 py-3.5 font-mono text-[10.5px] text-neutral-700 dark:text-zinc-300">
                                                  <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                                                  <span className="text-neutral-400 dark:text-zinc-650 mx-1.5">•</span>
                                                  <span className="text-neutral-500 dark:text-zinc-400">{new Date(log.timestamp).toLocaleDateString()}</span>
                                                </td>
                                                <td className="px-4 py-3.5 font-mono text-[10px] text-neutral-500 dark:text-zinc-400">
                                                  {log.ip || "Unknown"}
                                                </td>
                                                <td className="px-4 py-3.5 text-[11px] text-neutral-700 dark:text-zinc-300 font-normal">
                                                  {log.geo ? (
                                                    <React.Fragment>
                                                      <span>{log.geo.split(',')[0]}</span>
                                                      {log.geo.split(',')[1] && (
                                                        <React.Fragment>
                                                          <span className="text-neutral-400 dark:text-zinc-500 mx-1">•</span>
                                                          <span className="text-neutral-500 dark:text-zinc-400">{log.geo.split(',')[1].trim()}</span>
                                                        </React.Fragment>
                                                      )}
                                                    </React.Fragment>
                                                  ) : "Unknown"}
                                                </td>
                                                <td className="px-4 py-3.5 text-[11px] text-neutral-500 dark:text-zinc-400 font-normal">
                                                  {log.device ? (
                                                    <React.Fragment>
                                                      <span>{log.device.split('/')[1]?.trim() || "Desktop"}</span>
                                                      <span className="text-neutral-400 dark:text-zinc-500 mx-1.5">•</span>
                                                      <span className="text-neutral-500 dark:text-zinc-400">{log.device.split('/')[0]?.trim() || "Unknown"}</span>
                                                    </React.Fragment>
                                                  ) : (
                                                    <React.Fragment>
                                                      <span>Desktop</span>
                                                      <span className="text-neutral-400 dark:text-zinc-500 mx-1.5">•</span>
                                                      <span className="text-neutral-500 dark:text-zinc-400">Unknown</span>
                                                    </React.Fragment>
                                                  )}
                                                </td>
                                              </tr>
                                              );
                                            })}
                                          </tbody>
                                        </table>
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex items-center justify-center mb-3">
                                          <Clock className="w-5 h-5 text-neutral-400 dark:text-zinc-500" />
                                        </div>
                                        <p className="text-sm font-medium text-neutral-900 dark:text-zinc-200">Awaiting Telemetry</p>
                                        <p className="text-xs text-neutral-500 dark:text-zinc-500 mt-1">No engagement events have been recorded yet.</p>
                                      </div>
                                    )}
                                    {/* AI Quick Reply Section */}
                                    <div className="mt-4 p-5 bg-[#0c0c0e]/70 backdrop-blur-2xl border border-white/10 rounded-xl relative overflow-hidden shadow-sm">
                                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                      <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-3">
                                          <h4 className="text-xs font-semibold font-mono text-neutral-300 flex items-center gap-2 tracking-widest uppercase">
                                            <Sparkles className="w-4 h-4 text-white" />
                                            AI Assistant Context-Aware Reply
                                          </h4>
                                        </div>
                                        
                                        {!aiReplies[item.id as number] ? (
                                          <div className="flex items-center gap-3">
                                            <p className="text-xs text-neutral-400 font-sans flex-1">
                                              Generate a personalized follow-up response based on this recipient's engagement timeline.
                                            </p>
                                            <button 
                                              onClick={() => generateQuickReply(item)}
                                              disabled={generatingReply === item.id}
                                              className="px-4 py-2 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-2 font-mono uppercase tracking-wider whitespace-nowrap shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                            >
                                              {generatingReply === item.id ? (
                                                <span className="flex items-center gap-2">
                                                  <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                                  Synthesizing...
                                                </span>
                                              ) : (
                                                <>
                                                  <Sparkles className="w-3.5 h-3.5" />
                                                  Generate Draft
                                                </>
                                              )}
                                            </button>
                                          </div>
                                        ) : (
                                          <div className="space-y-3">
                                            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-sm text-neutral-200 font-sans leading-relaxed">
                                              {aiReplies[item.id as number]}
                                            </div>
                                            <div className="flex items-center gap-2 justify-end">
                                              <button 
                                                onClick={() => {
                                                  navigator.clipboard.writeText(aiReplies[item.id as number]);
                                                }}
                                                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold rounded-md transition-colors flex items-center gap-2 font-mono uppercase tracking-wider"
                                              >
                                                <Copy className="w-3 h-3" />
                                                Copy Draft
                                              </button>
                                              <button 
                                                onClick={() => {
                                                  window.location.href = `mailto:${item.email}?subject=Re: ${item.subject}&body=${encodeURIComponent(aiReplies[item.id as number])}`;
                                                }}
                                                className="px-3 py-1.5 bg-white text-black hover:bg-neutral-200 text-[11px] font-semibold rounded-md transition-colors flex items-center gap-2 font-mono uppercase tracking-wider"
                                              >
                                                <Send className="w-3 h-3" />
                                                Open in Mail
                                              </button>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            
            {trackingData.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-neutral-500 dark:text-zinc-500 font-mono">No manual dispatches tracked yet.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setStatus('idle')} />
            
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 max-w-md w-full shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
              <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Check className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-light tracking-tight text-white">
                  Transmission Authorized
                </h3>
                <p className="text-sm text-zinc-400 font-mono leading-relaxed">
                  Outbound transmission dispatched. Telemetry monitoring node is now live.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setRecipient('');
                    setSubject('');
                    setBody('');
                    setViewMode('tracking');
                  }}
                  className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Acknowledge
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
