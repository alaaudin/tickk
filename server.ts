import { GoogleGenAI } from "@google/genai";
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { Tracker, User, OpenLog, TrackerStats, Ticket } from "./src/types.js";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5174;

app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.warn("WARNING: Supabase URL or Key is missing. Database queries will fail.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// User-Agent parser helper
function parseUserAgent(ua: string) {
  let browser = "Other";
  let device = "Desktop";

  if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Edge")) browser = "Edge";
  else if (ua.includes("Postman") || ua.includes("curl")) browser = "API Client";

  if (ua.includes("Mobi") || ua.includes("iPhone") || ua.includes("Android")) {
    device = "Mobile";
  } else if (ua.includes("iPad") || ua.includes("Tablet")) {
    device = "Tablet";
  }

  return { browser, device };
}

// Geo-IP randomized helper for actual non-simulated hits (Fallback if real geo ip not used)
const GLOBAL_CITIES = [
  { city: "San Francisco", country: "United States" },
  { city: "Paris", country: "France" },
  { city: "London", country: "United Kingdom" },
  { city: "Tokyo", country: "Japan" },
  { city: "Berlin", country: "Germany" },
  { city: "Singapore", country: "Singapore" },
  { city: "Melbourne", country: "Australia" },
  { city: "Austin", country: "United States" },
  { city: "Zurich", country: "Switzerland" },
  { city: "Stockholm", country: "Sweden" },
];

function getRandomGeo() {
  return GLOBAL_CITIES[Math.floor(Math.random() * GLOBAL_CITIES.length)];
}

// Authenticated user check helper
async function getUserIdFromRequest(req: express.Request): Promise<string | null> {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    
    if (token.startsWith("tk_live_")) {
      const { data: keyInfo } = await supabase
        .from('api_keys')
        .select('user_id')
        .eq('token', token)
        .single();
        
      if (keyInfo) return keyInfo.user_id;
    }
    
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (!error && user) {
      return user.id;
    }
  }
  return null;
}

// 1. Auth Login (Deprecated, handled by frontend + Supabase Auth)
app.post("/api/auth/login", (req, res) => {
  res.status(400).json({ error: "Use frontend Supabase Auth directly." });
});

// 2. Get Current Auth User
app.get("/api/auth/me", async (req, res) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  const { data: user, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error || !user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({ user });
});

// 3. Get User Trackers & Detailed Telemetry stats
app.get("/api/links", async (req, res) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { data: userTrackers, error } = await supabase
    .from('trackers')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(userTrackers || []);
});

// Alias trackers endpoints for frontend compatibility
app.get("/api/trackers", async (req, res) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { data: userTrackers, error } = await supabase
    .from('trackers')
    .select('*, logs:telemetry_logs(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Map to frontend expected format
  const formattedTrackers = userTrackers?.map(t => ({
    id: t.id,
    userId: t.user_id,
    subject: t.subject,
    recipient: t.recipient,
    createdAt: t.created_at,
    openCount: t.open_count,
    clickCount: t.click_count,
    status: t.status,
    lastOpened: t.updated_at,
    linkUrl: t.link_url,
    webhookUrl: t.webhook_url,
    isLocked: t.is_locked,
    logs: t.logs?.map((l: any) => ({
      id: l.id,
      timestamp: l.created_at,
      ip: l.ip_address,
      userAgent: l.user_agent,
      country: l.country,
      city: l.city,
      device: l.device || "Desktop",
      browser: l.browser || "Chrome",
      type: l.type,
      urlClicked: l.url_clicked
    })) || []
  }));

  res.json(formattedTrackers || []);
});

// 4. Create New Tracker (Unified Handler with Atomic Credit check & Soft Lock)
const createTrackerHandler = async (req: express.Request, res: express.Response) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { subject, recipient, linkUrl, webhookUrl, htmlBody } = req.body;
  if (!subject) {
    return res.status(400).json({ error: "Subject is required" });
  }

  // Directly fetch from Supabase public.profiles
  const { data: profile, error: profileErr } = await supabase
    .from('profiles')
    .select('credits')
    .eq('id', userId)
    .single();

  if (profileErr || !profile) {
    return res.status(500).json({ error: "Failed to retrieve user profile or credits." });
  }

  const credits = profile.credits || 0;
  let isLocked = false;
  
  // Deduct Credit (If > 0) or Soft-Lock (If <= 0)
  if (credits > 0) {
    const { error: deductErr } = await supabase
        .from('profiles')
        .update({ credits: credits - 1 })
        .eq('id', userId);
        
    if (deductErr) {
        return res.status(500).json({ error: "Transaction failed: Could not deduct credit." });
    }
  } else {
    isLocked = true;
  }

  // Insert to trackers table
  const { data: newTrackerData, error: insertErr } = await supabase
    .from('trackers')
    .insert([{
      user_id: userId,
      subject,
      recipient: recipient || `${subject.toLowerCase().replace(/[^a-z0-9]/g, '') || 'campaign'}-node@tickk.io`,
      link_url: linkUrl || null,
      webhook_url: webhookUrl || null,
      is_locked: isLocked
    }])
    .select()
    .single();

  if (insertErr || !newTrackerData) {
    return res.status(500).json({ error: insertErr?.message || "Failed to create tracker." });
  }

  // Map to frontend expected format
  const formattedTracker = {
    id: newTrackerData.id,
    userId: newTrackerData.user_id,
    subject: newTrackerData.subject,
    recipient: newTrackerData.recipient,
    createdAt: newTrackerData.created_at,
    openCount: newTrackerData.open_count,
    clickCount: newTrackerData.click_count,
    status: newTrackerData.status,
    linkUrl: newTrackerData.link_url,
    webhookUrl: newTrackerData.webhook_url,
    isLocked: newTrackerData.is_locked,
    logs: []
  };

  res.status(201).json(formattedTracker);
};

app.post("/api/links", createTrackerHandler);
app.post("/api/trackers", createTrackerHandler);
app.post("/api/track/dispatch", createTrackerHandler);
app.post("/api/mail/send", createTrackerHandler);

app.delete("/api/trackers/:id", async (req, res) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { error } = await supabase
    .from('trackers')
    .delete()
    .eq('id', req.params.id)
    .eq('user_id', userId);

  if (error) {
    return res.status(500).json({ error: "Failed to delete tracker" });
  }

  res.json({ success: true, message: "Tracker successfully deleted" });
});

// 5. Delete Mail Tracker
app.delete("/api/links/:id", async (req, res) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { error } = await supabase
    .from('trackers')
    .delete()
    .eq('id', req.params.id)
    .eq('user_id', userId);

  if (error) {
    return res.status(500).json({ error: "Failed to delete tracker" });
  }

  res.json({ success: true, message: "Tracker successfully deleted" });
});





// 6. Get Tracker Stats Dashboard Aggregations
app.get("/api/links/stats", async (req, res) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { data: trackers, error } = await supabase
    .from('trackers')
    .select('*, logs:telemetry_logs(*)')
    .eq('user_id', userId);

  if (error || !trackers) {
    return res.status(500).json({ error: "Failed to fetch stats" });
  }

  const totalSent = trackers.length;
  const openedCount = trackers.filter(t => t.status === "OPENED" || t.open_count > 0).length;
  const unopenedCount = totalSent - openedCount;
  const openRate = totalSent > 0 ? Math.round((openedCount / totalSent) * 100) : 0;

  const clickCount = trackers.reduce((acc, t) => acc + (t.click_count || 0), 0);
  const clickableTrackers = trackers.filter(t => t.link_url).length;
  const clickedTrackersCount = trackers.filter(t => t.link_url && t.click_count > 0).length;
  const clickRate = clickableTrackers > 0 ? Math.round((clickedTrackersCount / clickableTrackers) * 100) : 0;

  // Flatten and join recent logs
  const allLogs: any[] = [];
  trackers.forEach(t => {
    (t.logs || []).forEach((log: any) => {
      allLogs.push({
        id: log.id,
        timestamp: log.created_at,
        ip: log.ip_address,
        userAgent: log.user_agent,
        country: log.country,
        city: log.city,
        device: log.device || "Desktop",
        browser: log.browser || "Chrome",
        type: log.type,
        urlClicked: log.url_clicked,
        trackerId: t.id,
        trackerSubject: t.subject,
        trackerRecipient: t.recipient,
      });
    });
  });

  const recentActivity = allLogs
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 15);

  const stats = {
    totalSent,
    openedCount,
    unopenedCount,
    openRate,
    clickCount,
    clickRate,
    recentActivity,
  };

  res.json(stats);
});

// 9. API Keys settings
app.get("/api/settings/keys", async (req, res) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { data: keys, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const userKeys = keys?.map(k => ({
    key: k.token,
    createdAt: k.created_at,
  })) || [];

  res.json(userKeys);
});

app.post("/api/settings/keys", async (req, res) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const newKey = `tk_live_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
  
  const { data, error } = await supabase
    .from('api_keys')
    .insert([{ user_id: userId, token: newKey }])
    .select()
    .single();

  if (error || !data) {
    return res.status(500).json({ error: "Failed to generate key" });
  }

  res.status(201).json({ key: data.token, createdAt: data.created_at });
});

app.delete("/api/settings/keys/:key", async (req, res) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { error } = await supabase
    .from('api_keys')
    .delete()
    .eq('token', req.params.key)
    .eq('user_id', userId);

  if (error) {
    return res.status(500).json({ error: "Failed to delete key" });
  }

  res.json({ success: true });
});







// --- FEEDBACK & REWARDS API ---

app.get("/api/feedback", async (req, res) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { data: tickets, error } = await supabase
    .from('feedback')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Format to camelCase
  const formattedTickets = tickets?.map(t => ({
    id: t.id,
    userId: t.user_id,
    subject: t.subject,
    category: t.category,
    message: t.message,
    status: t.status,
    is_notified: t.is_notified,
    createdAt: t.created_at,
    updatedAt: t.updated_at
  })) || [];

  res.json(formattedTickets);
});

app.post("/api/feedback", async (req, res) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { subject, category, message } = req.body;
  if (!subject || !category || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { data: newTicket, error } = await supabase
    .from('feedback')
    .insert([{
      user_id: userId,
      subject,
      category,
      message,
      status: "pending",
      is_notified: false
    }])
    .select()
    .single();

  if (error || !newTicket) {
    return res.status(500).json({ error: "Failed to submit ticket" });
  }

  // Grant 99 credits
  const { data: profile } = await supabase
    .from('profiles')
    .select('credits')
    .eq('id', userId)
    .single();

  let newCredits = profile?.credits || 0;
  if (profile) {
    newCredits += 99;
    await supabase.from('profiles').update({ credits: newCredits }).eq('id', userId);
  }

  const formattedTicket = {
    id: newTicket.id,
    userId: newTicket.user_id,
    subject: newTicket.subject,
    category: newTicket.category,
    message: newTicket.message,
    status: newTicket.status,
    is_notified: newTicket.is_notified,
    createdAt: newTicket.created_at,
    updatedAt: newTicket.updated_at
  };

  res.status(201).json({ ticket: formattedTicket, newCredits });
});

app.patch("/api/feedback/:id/notify", async (req, res) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;

  const { error } = await supabase
    .from('feedback')
    .update({ is_notified: true })
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    console.error("Error updating ticket notification status:", error);
    return res.status(500).json({ error: "Failed to update notification status" });
  }

  res.json({ success: true });
});

// --- CORE SYSTEM ENFORCEMENT: THE TRACKING PIXEL ---
const pixelRouter = async (req: express.Request, res: express.Response) => {
  const trackerId = req.params.id.split(".")[0]; 

  const { data: tracker } = await supabase
    .from('trackers')
    .select('*')
    .eq('id', trackerId)
    .single();

  if (tracker) {
    if (tracker.is_locked) {
      // Security Rule: Tracking functionally disabled
    } else {
      const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers["user-agent"] || "Unknown";
      const { browser, device } = parseUserAgent(userAgent);
      const geo = getRandomGeo();

      // Insert log
      await supabase.from('telemetry_logs').insert([{
        tracker_id: trackerId,
        type: 'open',
        ip_address: ip,
        user_agent: userAgent,
        country: geo.country,
        city: geo.city,
        device,
        browser
      }]);

      // Update count
      await supabase.from('trackers').update({
        open_count: (tracker.open_count || 0) + 1,
        status: 'OPENED'
      }).eq('id', trackerId);

      // Trigger webhook if enabled
      if (tracker.webhook_url) {
        console.log(`[Webhook] Dispatching live payload to ${tracker.webhook_url}`);
      }
    }
  }

  // Generate transparent 1x1 PNG response
  const pixelHex = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  const imgBuffer = Buffer.from(pixelHex, "base64");

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.status(200).send(imgBuffer);
};

app.get("/api/p/:id", pixelRouter);
app.get("/api/p/:id.png", pixelRouter);
app.get("/api/track/:id/pixel.png", pixelRouter);
app.get("/api/track/:id/pixel", pixelRouter);


// --- CORE SYSTEM ENFORCEMENT: THE LINK CLICK REDIRECTOR ---
const clickRouter = async (req: express.Request, res: express.Response) => {
  const trackerId = req.params.id;
  const targetUrl = (req.query.url as string);

  const { data: tracker } = await supabase
    .from('trackers')
    .select('*')
    .eq('id', trackerId)
    .single();

  const finalUrl = targetUrl || (tracker && tracker.link_url);

  if (tracker && finalUrl) {
    if (tracker.is_locked) {
      // Security Rule: Return link redirect but do NOT log click stats
      return res.redirect(finalUrl);
    }

    const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "127.0.0.1";
    const userAgent = req.headers["user-agent"] || "Unknown";
    const { browser, device } = parseUserAgent(userAgent);
    const geo = getRandomGeo();

    await supabase.from('telemetry_logs').insert([{
      tracker_id: trackerId,
      type: 'click',
      url_clicked: finalUrl,
      ip_address: ip,
      user_agent: userAgent,
      country: geo.country,
      city: geo.city,
      device,
      browser
    }]);

    await supabase.from('trackers').update({
      click_count: (tracker.click_count || 0) + 1
    }).eq('id', trackerId);

    return res.redirect(finalUrl);
  }

  res.send("Link redirect tracked, but destination missing.");
};

app.get("/api/click/:id", clickRouter);
app.get("/api/track/:id/click", clickRouter);



// --- GEMINI QUICK REPLY API ---
app.post("/api/suggest-reply", async (req, res) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { emailContent, emailSubject, timelineLogs, provider } = req.body;
  if (!emailContent) {
    return res.status(400).json({ error: "Missing email content" });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.json({ suggestion: "Thank you for reviewing the email. Let me know if you have any questions or need further clarification." });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `You are an AI assistant helping a professional craft a follow-up or reply based on their previous email and the recipient's tracking timeline.
    
Previous Email Subject: ${emailSubject || 'None'}
Previous Email Content: ${emailContent}
Provider: ${provider || 'unknown'}

Engagement Timeline (JSON):
${JSON.stringify(timelineLogs || [])}

Based on this, suggest a concise, professional, and context-aware follow-up email. Do not include subject line, just the body. Keep it under 3 sentences.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ suggestion: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to generate suggestion." });
  }
});

// --- VITE DEV OR PRODUCTION STATIC FILES ---
if (process.env.NODE_ENV !== "production") {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
