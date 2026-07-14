import { Tracker, OpenLog, Ticket, TrackerStats } from '../types';

// Standard geolocation data for realistic telemetry logs
const GEOLOCATIONS = [
  { country: 'United States', city: 'New York', ip: '104.244.42.1' },
  { country: 'United Kingdom', city: 'London', ip: '82.165.197.1' },
  { country: 'Japan', city: 'Tokyo', ip: '210.140.10.1' },
  { country: 'Germany', city: 'Berlin', ip: '46.165.2.1' },
  { country: 'Australia', city: 'Sydney', ip: '1.120.0.1' },
  { country: 'Canada', city: 'Toronto', ip: '198.235.24.1' },
  { country: 'France', city: 'Paris', ip: '195.154.122.1' },
  { country: 'India', city: 'Mumbai', ip: '115.112.0.1' },
  { country: 'Singapore', city: 'Singapore', ip: '116.89.0.1' },
  { country: 'Brazil', city: 'São Paulo', ip: '177.85.0.1' }
];

// User agents mapping for browser & device variation
const USER_AGENTS = [
  {
    browser: 'Chrome',
    device: 'Desktop',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  },
  {
    browser: 'Safari',
    device: 'Mobile',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1'
  },
  {
    browser: 'Firefox',
    device: 'Desktop',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0'
  },
  {
    browser: 'Chrome',
    device: 'Mobile',
    ua: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
  },
  {
    browser: 'Safari',
    device: 'Desktop',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15'
  },
  {
    browser: 'Edge',
    device: 'Desktop',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
  }
];

// Email subjects for realistic simulation
const EMAIL_SUBJECTS = [
  { subject: 'Q3 Product Strategy Proposal v2', recipient: 'executive@linear.app', hasLink: false },
  { subject: 'Onboarding Deck & Executive Board Agenda', recipient: 'partner@apple.com', hasLink: true, linkUrl: 'https://tickk.io/docs/setup' },
  { subject: 'Signed Contract - Enterprise Partnership Agreement', recipient: 'board@vercel.com', hasLink: true, linkUrl: 'https://example.com/contract' },
  { subject: 'Tickk Integration API Keys & Documentation Link', recipient: 'developer@github.com', hasLink: false },
  { subject: 'Your Invoice for July 2026', recipient: 'billing@stripe.com', hasLink: true, linkUrl: 'https://tickk.io/invoice/123' },
  { subject: 'Product Launch Early Access Link', recipient: 'beta@testers.com', hasLink: true, linkUrl: 'https://tickk.io/beta/signup' },
  { subject: 'Welcome to the Premium Club', recipient: 'vip@customer.com', hasLink: true, linkUrl: 'https://tickk.io/premium/welcome' },
  { subject: 'Urgent: Core Server Telemetry Discrepancy', recipient: 'ops@host.com', hasLink: false },
  { subject: 'Follow up regarding design system changes', recipient: 'designer@figma.com', hasLink: true, linkUrl: 'https://figma.com/file/123' }
];

/**
 * Generates realistic trackers for a given userId
 */
export function generateMockTrackers(userId: string): Tracker[] {
  const trackers: Tracker[] = [];
  const now = Date.now();

  EMAIL_SUBJECTS.forEach((email, index) => {
    // Stagger dates in the past
    const daysAgo = 12 - index * 1.3;
    const createdAt = new Date(now - daysAgo * 24 * 60 * 60 * 1000).toISOString();
    const trackerId = `tr_mock_${100000 + index}`;
    
    const logs: OpenLog[] = [];
    const isUnopened = index === 3 || index === 7; // keep some unopened
    const openCount = isUnopened ? 0 : Math.floor(Math.random() * 4) + 1;
    const clickCount = email.hasLink && openCount > 0 ? Math.floor(Math.random() * openCount) + (index % 2) : 0;

    // Generate Open logs
    for (let o = 0; o < openCount; o++) {
      const geo = GEOLOCATIONS[(index + o) % GEOLOCATIONS.length];
      const uaProfile = USER_AGENTS[(index * 2 + o) % USER_AGENTS.length];
      
      // Open happens after creation
      const openDelayHours = (o + 1) * 6 + Math.random() * 12;
      const logTime = new Date(new Date(createdAt).getTime() + openDelayHours * 60 * 60 * 1000).toISOString();

      logs.push({
        id: `log_mock_op_${index}_${o}`,
        timestamp: logTime,
        ip: geo.ip,
        userAgent: uaProfile.ua,
        country: geo.country,
        city: geo.city,
        device: uaProfile.device,
        browser: uaProfile.browser,
        isSimulated: true,
        type: 'open'
      });
    }

    // Generate Click logs
    for (let c = 0; c < clickCount; c++) {
      const geo = GEOLOCATIONS[(index + c + 1) % GEOLOCATIONS.length];
      const uaProfile = USER_AGENTS[(index * 3 + c) % USER_AGENTS.length];
      
      // Click happens after corresponding open
      const openLog = logs[Math.min(c, logs.length - 1)];
      const clickDelayMinutes = 5 + Math.random() * 45;
      const logTime = openLog 
        ? new Date(new Date(openLog.timestamp).getTime() + clickDelayMinutes * 60 * 1000).toISOString()
        : new Date(new Date(createdAt).getTime() + (c + 1.2) * 12 * 60 * 60 * 1000).toISOString();

      logs.push({
        id: `log_mock_cl_${index}_${c}`,
        timestamp: logTime,
        ip: geo.ip,
        userAgent: uaProfile.ua,
        country: geo.country,
        city: geo.city,
        device: 'Mobile', // Click is often on mobile
        browser: uaProfile.browser,
        isSimulated: true,
        type: 'click',
        urlClicked: email.linkUrl
      });
    }

    // Sort logs by time
    logs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    trackers.push({
      id: trackerId,
      userId,
      subject: email.subject,
      recipient: email.recipient,
      createdAt,
      openCount,
      clickCount,
      status: openCount > 0 ? 'opened' : 'unopened',
      lastOpened: openCount > 0 ? logs[logs.length - 1].timestamp : null,
      linkUrl: email.linkUrl,
      testSent: true,
      logs
    });
  });

  // Sort trackers by createdAt descending
  return trackers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Calculates real-time aggregate statistics from trackers list
 */
export function generateMockStats(trackers: Tracker[]): TrackerStats {
  const totalSent = trackers.length;
  const openedCount = trackers.filter(t => t.status === 'opened').length;
  const unopenedCount = totalSent - openedCount;
  const openRate = totalSent > 0 ? (openedCount / totalSent) * 100 : 0;

  let totalClicks = 0;
  trackers.forEach(t => {
    totalClicks += t.clickCount || 0;
  });

  const trackersWithLinks = trackers.filter(t => t.linkUrl).length;
  const clickRate = trackersWithLinks > 0 ? (totalClicks / trackersWithLinks) * 100 : 0;

  // Flatten and filter recent logs
  const recentActivity: TrackerStats['recentActivity'] = [];
  trackers.forEach(t => {
    t.logs.forEach(log => {
      recentActivity.push({
        ...log,
        trackerSubject: t.subject,
        trackerRecipient: t.recipient,
        trackerId: t.id
      });
    });
  });

  // Sort activity descending by timestamp
  recentActivity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return {
    totalSent,
    openedCount,
    unopenedCount,
    openRate,
    clickCount: totalClicks,
    clickRate,
    recentActivity: recentActivity.slice(0, 50) // limit to top 50 logs
  };
}

/**
 * Generates mock tickets for help / review page
 */
export function generateMockTickets(userId: string): Ticket[] {
  return [
    {
      id: 'tkt_mock_1',
      userId,
      subject: 'Dark mode contrast issue on tracking graphs',
      category: 'bug',
      status: 'reviewed',
      message: 'Hey team, just testing out the beta. The app looks super sleek, but the tooltips on the activity line chart are a bit hard to read in dark mode (black text on dark grey backgrounds).',
      createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString()
    },
    {
      id: 'tkt_mock_2',
      userId,
      subject: 'Add support for UTM parameter tracking?',
      category: 'feature',
      status: 'rewarded',
      message: 'Awesome product so far. Are you guys planning to support automatic UTM tagging parsing when generating the pixel URLs? Would save a lot of time for campaign management.',
      createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString()
    },
    {
      id: 'tkt_mock_3',
      userId,
      subject: 'Slack webhook triggers delayed',
      category: 'bug',
      status: 'submitted',
      message: 'Hello, the Slack integration webhook notifications are sometimes delayed by 2-3 minutes. When I send email pixel loads, is the webhook dispatched immediately or in a batched cron job?',
      createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
    }
  ];
}
