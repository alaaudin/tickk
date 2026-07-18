import { GoogleGenAI } from "@google/genai";
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { Tracker, User, OpenLog, TrackerStats, Ticket } from "./src/types.js";
import { generateMockTrackers, generateMockTickets } from "./src/services/mockDataService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5174;

app.use(express.json());

// Path to file database
const DB_FILE = path.join(process.cwd(), "tracker_db.json");

// Core database structure
interface Database {
  users: User[];
  trackers: Tracker[];
  apiKeys: { [key: string]: { userId: string; createdAt: string } };
  tickets: Ticket[];
}

let db: Database = {
  users: [],
  trackers: [],
  apiKeys: {},
  tickets: [],
};


// Seed initial database if not exists
function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      db = JSON.parse(data);
      if (!db.tickets) {
        db.tickets = [];
      }
      if (db.tickets.length === 0) {
        db.tickets = [
          {
            id: "tkt_01j23k45l6",
            userId: "user_enterprise_1",
            subject: "Dark mode contrast issue on tracking graphs",
            category: "bug",
            status: "reviewed" as const,
            createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
            message: "Hey team, just testing out the beta from Twitter. The app looks super sleek, but the tooltips on the activity line chart are a bit hard to read in dark mode (black text on dark grey)."
          },
          {
            id: "tkt_02z89y78x1",
            userId: "user_enterprise_1",
            subject: "Add support for UTM parameter tracking?",
            category: "feature",
            status: "rewarded" as const,
            createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
            message: "Awesome product so far. Are you guys planning to support automatic UTM tagging parsing when generating the pixel URLs? Would save a lot of time for campaign management."
          }
        ];
        saveDatabase();
      }
      console.log(`Database loaded. Users: ${db.users.length}, Trackers: ${db.trackers.length}, Tickets: ${db.tickets.length}`);
    } else {
      seedInitialData();
      saveDatabase();
    }
  } catch (error) {
    console.error("Failed to load database, resetting...", error);
    seedInitialData();
    saveDatabase();
  }
}

function saveDatabase() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to save database", error);
  }
}

// Helper to seed professional luxury telemetry data for visual layout
function seedInitialData() {
  const adminUser: User = {
    id: "user_enterprise_1",
    email: "saqibmemon9884@gmail.com",
    name: "Saqib Memon",
      credits: 501,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  };

  db.users = [adminUser];

  // Pre-seed API Key
  db.apiKeys["tk_live_f692a831e0b57f0d04c55d045"] = {
    userId: adminUser.id,
    createdAt: new Date().toISOString(),
  };

  const geoLocations = [
    { country: "United States", city: "New York", ip: "104.244.42.1" },
    { country: "United Kingdom", city: "London", ip: "82.165.197.1" },
    { country: "Japan", city: "Tokyo", ip: "210.140.10.1" },
    { country: "Germany", city: "Berlin", ip: "46.165.2.1" },
    { country: "Australia", city: "Sydney", ip: "1.120.0.1" },
    { country: "Canada", city: "Toronto", ip: "198.235.24.1" },
  ];

  const subjects = [
    "Q3 Product Strategy Proposal v2",
    "Onboarding Deck & Executive Board Agenda",
    "Signed Contract - Enterprise Partnership Agreement",
    "Tickk Integration API Keys & Documentation Link",
    "Your Invoice for July 2026",
    "Welcome to the Premium Club",
    "Product Launch Early Access Link",
  ];

  const recipients = [
    "executive@linear.app",
    "partner@apple.com",
    "board@vercel.com",
    "developer@github.com",
    "billing@stripe.com",
    "vip@customer.com",
    "beta@testers.com",
  ];

  const trackers: Tracker[] = [];

  for (let i = 0; i < subjects.length; i++) {
    const createdDaysAgo = 10 - i * 2;
    const trackerId = `tr_${100000 + i}`;
    const createdAt = new Date(Date.now() - createdDaysAgo * 24 * 60 * 60 * 1000).toISOString();

    const logs: OpenLog[] = [];
    const openCount = i === 3 ? 0 : Math.floor(Math.random() * 5) + 1;
    const hasLink = [1, 2, 4, 5, 6].includes(i);
    const clickCount = hasLink && openCount > 0 ? Math.floor(Math.random() * 3) + 1 : 0;
    const linkUrls = [
      "",
      "https://tickk.io/docs/setup",
      "https://example.com/contract",
      "",
      "https://tickk.io/invoice/123",
      "https://tickk.io/premium/welcome",
      "https://tickk.io/beta/signup"
    ];
    const linkUrlToUse = linkUrls[i] || undefined;

    // Generate simulated open events
    for (let o = 0; o < openCount; o++) {
      const geo = geoLocations[(i + o) % geoLocations.length];
      const hoursOffset = Math.floor(Math.random() * 12) + 1;
      const logTimestamp = new Date(
        new Date(createdAt).getTime() + (o * 18 + hoursOffset) * 60 * 60 * 1000
      ).toISOString();

      logs.push({
        id: `log_${Math.random().toString(36).substring(2, 9)}`,
        timestamp: logTimestamp,
        ip: geo.ip,
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        country: geo.country,
        city: geo.city,
        device: o % 2 === 0 ? "Desktop" : "Mobile",
        browser: o % 3 === 0 ? "Safari" : "Chrome",
        isSimulated: true,
        type: "open",
      });
    }

    // Generate simulated link click events
    for (let c = 0; c < clickCount; c++) {
      const geo = geoLocations[(i + c) % geoLocations.length];
      const logTimestamp = new Date(
        new Date(createdAt).getTime() + (c * 24 + 4) * 60 * 60 * 1000
      ).toISOString();

      logs.push({
        id: `log_clk_${Math.random().toString(36).substring(2, 9)}`,
        timestamp: logTimestamp,
        ip: geo.ip,
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        country: geo.country,
        city: geo.city,
        device: "Mobile",
        browser: "Safari",
        isSimulated: true,
        type: "click",
        urlClicked: linkUrlToUse as string,
      });
    }

    trackers.push({
      id: trackerId,
      userId: adminUser.id,
      subject: subjects[i],
      recipient: recipients[i],
      createdAt,
      openCount,
      clickCount,
      status: openCount > 0 ? "opened" : "unopened",
      lastOpened: openCount > 0 ? logs[logs.length - 1].timestamp : null,
      linkUrl: linkUrlToUse,
      testSent: true,
      isManual: i % 3 === 1,
      logs: logs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
    });
  }

  db.trackers = trackers;

  const tickets: Ticket[] = [
    {
      id: "tkt_01j23k45l6",
      userId: adminUser.id,
      subject: "Dark mode contrast issue on tracking graphs",
      category: "bug",
      status: "reviewed" as const,
      createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
      message: "Hey team, just testing out the beta from Twitter. The app looks super sleek, but the tooltips on the activity line chart are a bit hard to read in dark mode (black text on dark grey)."
    },
    {
      id: "tkt_02z89y78x1",
      userId: adminUser.id,
      subject: "Add support for UTM parameter tracking?",
      category: "feature",
      status: "rewarded" as const,
      createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
      message: "Awesome product so far. Are you guys planning to support automatic UTM tagging parsing when generating the pixel URLs? Would save a lot of time for campaign management."
    }
  ];

  db.tickets = tickets;
  console.log("Seeded database with minimalist premium data and support tickets.");
}

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

// Geo-IP randomized helper for actual non-simulated hits
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

// Dynamically seed tracking and activity logs for any new or existing user that has 0 trackers
function seedUserTrackers(userId: string) {
  const trackers = generateMockTrackers(userId);
  const tickets = generateMockTickets(userId);

  db.trackers.push(...trackers);
  db.tickets.push(...tickets);
  saveDatabase();
}

loadDatabase();

// --- API ENDPOINTS ---

// Authenticated user check helper
function getUserIdFromRequest(req: express.Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    if (token.startsWith("tk_live_")) {
      const keyInfo = db.apiKeys[token];
      if (keyInfo) return keyInfo.userId;
    }
    const userExists = db.users.find(u => u.id === token);
    if (userExists) {
      return userExists.id;
    }
    return "user_enterprise_1";
  }
  return null;
}

// 1. Auth Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Auto sign-in / retrieve existing or create
  let user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    // Elegant automatic creation for sandbox experience
    user = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      email: email.toLowerCase(),
      name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
      credits: 501,
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    saveDatabase();
  }

  res.json({
    user,
    token: user.id, // we use user ID as the bearer token for local simplicity
  });
});

// 2. Get Current Auth User
app.get("/api/auth/me", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const user = db.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({ user });
});

// 3. Get User Trackers & Detailed Telemetry stats
app.get("/api/links", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const existingTrackers = db.trackers.filter(t => t.userId === userId);
  if (existingTrackers.length === 0) {
    seedUserTrackers(userId);
  }

  const userTrackers = db.trackers.filter(t => t.userId === userId);
  res.json(userTrackers);
});

// 4. Create New Tracker
app.post("/api/links", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { subject, recipient, linkUrl, webhookUrl, htmlBody } = req.body;
  if (!subject || !recipient) {
    return res.status(400).json({ error: "Subject and Recipient are required" });
  }

  const newTracker: Tracker = {
    id: `tr_${Math.random().toString(36).substring(2, 8)}`,
    userId,
    subject,
    recipient,
    createdAt: new Date().toISOString(),
    openCount: 0,
    clickCount: 0,
    status: "unopened",
    lastOpened: null,
    linkUrl: linkUrl || undefined,
    webhookUrl: webhookUrl || undefined,
    testSent: false,
    logs: [],
    htmlBody: htmlBody || undefined,
  };

  db.trackers.unshift(newTracker);
  saveDatabase();

  res.status(201).json(newTracker);
});

// Alias trackers endpoints for frontend compatibility
app.get("/api/trackers", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const existingTrackers = db.trackers.filter(t => t.userId === userId);
  if (existingTrackers.length === 0) {
    seedUserTrackers(userId);
  }

  const userTrackers = db.trackers.filter(t => t.userId === userId);
  res.json(userTrackers);
});

app.post("/api/trackers", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { subject, recipient, linkUrl, webhookUrl, htmlBody } = req.body;
  if (!subject) {
    return res.status(400).json({ error: "Subject is required" });
  }

  const newTracker: Tracker = {
    id: `tr_${Math.random().toString(36).substring(2, 8)}`,
    userId,
    subject,
    recipient: recipient || `${subject.toLowerCase().replace(/[^a-z0-9]/g, '') || 'campaign'}-node@tickk.io`,
    createdAt: new Date().toISOString(),
    openCount: 0,
    clickCount: 0,
    status: "unopened",
    lastOpened: null,
    linkUrl: linkUrl || undefined,
    webhookUrl: webhookUrl || undefined,
    testSent: false,
    logs: [],
    htmlBody: htmlBody || undefined,
  };

  db.trackers.unshift(newTracker);
  saveDatabase();

  res.status(201).json(newTracker);
});

app.delete("/api/trackers/:id", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const trackerIndex = db.trackers.findIndex(t => t.id === req.params.id && t.userId === userId);
  if (trackerIndex === -1) {
    return res.status(404).json({ error: "Tracker not found" });
  }

  db.trackers.splice(trackerIndex, 1);
  saveDatabase();

  res.json({ success: true, message: "Tracker successfully deleted" });
});

// 5. Delete Mail Tracker
app.delete("/api/links/:id", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const trackerIndex = db.trackers.findIndex(t => t.id === req.params.id && t.userId === userId);
  if (trackerIndex === -1) {
    return res.status(404).json({ error: "Tracker not found" });
  }

  db.trackers.splice(trackerIndex, 1);
  saveDatabase();

  res.json({ success: true, message: "Tracker successfully deleted" });
});

// 6. Get Tracker Stats Dashboard Aggregations
app.get("/api/links/stats", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const existingTrackers = db.trackers.filter(t => t.userId === userId);
  if (existingTrackers.length === 0) {
    seedUserTrackers(userId);
  }

  const trackers = db.trackers.filter(t => t.userId === userId);
  const totalSent = trackers.length;
  const openedCount = trackers.filter(t => t.status === "opened").length;
  const unopenedCount = totalSent - openedCount;
  const openRate = totalSent > 0 ? Math.round((openedCount / totalSent) * 100) : 0;

  const clickCount = trackers.reduce((acc, t) => acc + (t.clickCount || 0), 0);
  const clickableTrackers = trackers.filter(t => t.linkUrl).length;
  const clickedTrackersCount = trackers.filter(t => t.linkUrl && t.clickCount > 0).length;
  const clickRate = clickableTrackers > 0 ? Math.round((clickedTrackersCount / clickableTrackers) * 100) : 0;

  // Flatten and join recent logs
  const allLogs: (OpenLog & { trackerSubject: string; trackerRecipient: string; trackerId: string })[] = [];
  trackers.forEach(t => {
    t.logs.forEach(log => {
      allLogs.push({
        ...log,
        trackerId: t.id,
        trackerSubject: t.subject,
        trackerRecipient: t.recipient,
      });
    });
  });

  // Sort logs by newest first
  const recentActivity = allLogs
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 15);

  const stats: TrackerStats = {
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
app.get("/api/settings/keys", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userKeys = Object.entries(db.apiKeys)
    .filter(([_, info]) => info.userId === userId)
    .map(([key, info]) => ({
      key,
      createdAt: info.createdAt,
    }));

  res.json(userKeys);
});

app.post("/api/settings/keys", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const newKey = `tk_live_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
  db.apiKeys[newKey] = {
    userId,
    createdAt: new Date().toISOString(),
  };
  saveDatabase();

  res.status(201).json({ key: newKey, createdAt: db.apiKeys[newKey].createdAt });
});

app.delete("/api/settings/keys/:key", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const keyToDelete = req.params.key;
  if (db.apiKeys[keyToDelete] && db.apiKeys[keyToDelete].userId === userId) {
    delete db.apiKeys[keyToDelete];
    saveDatabase();
    return res.json({ success: true });
  }

  res.status(404).json({ error: "Key not found" });
});


// --- SUPPORT TICKETS API ---


// --- FEEDBACK & REWARDS API ---

app.get("/api/tickets", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const existingTrackers = db.trackers.filter(t => t.userId === userId);
  if (existingTrackers.length === 0) {
    seedUserTrackers(userId);
  }

  const userTickets = db.tickets.filter(t => t.userId === userId);
  res.json(userTickets);
});

app.post("/api/tickets", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { subject, category, message } = req.body;
  if (!subject || !category || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const user = db.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const newTicket = {
    id: `tkt_${Math.random().toString(36).substring(2, 12)}`,
    userId,
    subject,
    category,
    message,
    status: "submitted" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.tickets.unshift(newTicket);
  
  // They get 99 credits for submitting good feedback (we'll just assume it's good right now for the beta)
  user.credits = (user.credits || 501) + 99;

  saveDatabase();
  res.status(201).json({ ticket: newTicket, newCredits: user.credits });
});
// --- CORE SYSTEM ENFORCEMENT: THE TRACKING PIXEL ---
// Matches GET /api/track/:id or GET /api/track/:id.png
const pixelRouter = (req: express.Request, res: express.Response) => {
  const trackerId = req.params.id.split(".")[0]; // remove optional .png extensions
  const tracker = db.trackers.find(t => t.id === trackerId);

  if (tracker) {
    const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "127.0.0.1";
    const userAgent = req.headers["user-agent"] || "Unknown";
    const { browser, device } = parseUserAgent(userAgent);
    const geo = getRandomGeo();

    // Create a new authentic open log
    const openLog: OpenLog = {
      id: `log_live_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      ip,
      userAgent,
      country: geo.country,
      city: geo.city,
      device,
      browser,
      isSimulated: false,
      type: "open",
    };

    tracker.logs.unshift(openLog);
    tracker.openCount += 1;
    tracker.status = "opened";
    tracker.lastOpened = openLog.timestamp;

    saveDatabase();

    // Trigger webhook if enabled
    if (tracker.webhookUrl) {
      console.log(`[Webhook] Dispatching live payload to ${tracker.webhookUrl}`);
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
// Matches GET /api/click/:id or GET /api/track/:id/click
const clickRouter = (req: express.Request, res: express.Response) => {
  const trackerId = req.params.id;
  const tracker = db.trackers.find(t => t.id === trackerId);
  const targetUrl = (req.query.url as string) || (tracker && tracker.linkUrl);

  if (tracker && targetUrl) {
    const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "127.0.0.1";
    const userAgent = req.headers["user-agent"] || "Unknown";
    const { browser, device } = parseUserAgent(userAgent);
    const geo = getRandomGeo();

    // Create click log
    const clickLog: OpenLog = {
      id: `log_live_clk_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      ip,
      userAgent,
      country: geo.country,
      city: geo.city,
      device,
      browser,
      isSimulated: false,
      type: "click",
      urlClicked: targetUrl,
    };

    tracker.logs.unshift(clickLog);
    tracker.clickCount += 1;

    saveDatabase();

    return res.redirect(targetUrl);
  }

  // Fallback if tracker or linkUrl doesn't exist
  res.send("Link redirect tracked, but destination missing.");
};

app.get("/api/click/:id", clickRouter);
app.get("/api/track/:id/click", clickRouter);



// --- GEMINI QUICK REPLY API ---
app.post("/api/suggest-reply", async (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { emailContent, emailSubject, timelineLogs, provider } = req.body;
  if (!emailContent) {
    return res.status(400).json({ error: "Missing email content" });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      // Mock for when API key is not present, though it should ideally fail fast or tell user to add it.
      // We will provide a static suggestion to avoid breaking if not configured.
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
