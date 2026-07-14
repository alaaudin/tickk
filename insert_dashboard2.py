with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

target = """                      {c === "overview" && (
                        <div className="space-y-8 animate-fadeIn">
                          {"""

replacement = """                      {c === "overview" && (
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
                                    city: "Localhost",
                                    country: "US",
                                    device: "Desktop",
                                    browser: "Chrome",
                                    isSimulated: true,
                                    timestamp: new Date().toISOString(),
                                  }]
                                };
                                w((prev) => [newTracker, ...prev]);
                              }}
                            />
                          )}
                          {"""

content = content.replace(target, replacement, 1)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
