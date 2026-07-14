export interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  createdAt: string;
}

export interface OpenLog {
  id: string;
  timestamp: string;
  ip: string;
  userAgent: string;
  country: string;
  city: string;
  device: string;
  browser: string;
  isSimulated: boolean;
  type: 'open' | 'click';
  urlClicked?: string;
}

export interface Tracker {
  id: string;
  userId: string;
  subject: string;
  recipient: string;
  createdAt: string;
  openCount: number;
  clickCount: number;
  status: 'unopened' | 'opened';
  lastOpened: string | null;
  linkUrl?: string; // Optional destination link to track clicks
  webhookUrl?: string; // Webhook payload destination
  testSent: boolean;
  logs: OpenLog[];
  isManual?: boolean;
  htmlBody?: string; // Optional HTML body content of the email
}

export interface TrackerStats {
  totalSent: number;
  openedCount: number;
  unopenedCount: number;
  openRate: number; // percentage
  clickCount: number;
  clickRate: number; // percentage
  recentActivity: (OpenLog & { trackerSubject: string; trackerRecipient: string; trackerId: string })[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Ticket {
  id: string;
  userId: string;
  subject: string;
  category: 'bug' | 'feature' | 'general';
  message: string;
  status: 'submitted' | 'reviewed' | 'rewarded';
  createdAt: string;
  updatedAt: string;
}

