import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find_text = """  const simulateLinkClick = (trackerId: string) => {
    if (soundEnabled) {
      playSuccessChime();
    }
    
    setDbTrackers(prev => prev.map(tracker => {
      if (tracker.id === trackerId) {
        const newLog: OpenLog = {
          id: Math.random().toString(36).substring(2, 11),
          timestamp: new Date().toISOString(),
          ip: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
          userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          country: "United States",
          city: "San Francisco",
          device: "Desktop",
          browser: "Chrome",
          isSimulated: true,
          type: "click",
          urlClicked: tracker.linkUrl
        };
        return {
          ...tracker,
          clickCount: tracker.clickCount + 1,
          logs: [newLog, ...tracker.logs]
        };
      }
      return tracker;
    }));

    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 400);
  };"""

content = content.replace(find_text, "")

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
