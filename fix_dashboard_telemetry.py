with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# Add import
import_target = 'import { NotificationSettingsPanel } from "./NotificationSettingsPanel";'
import_replacement = 'import { NotificationSettingsPanel } from "./NotificationSettingsPanel";\nimport { TelemetryLiveAlerts, triggerTelemetryAlert } from "./TelemetryLiveAlerts";'
content = content.replace(import_target, import_replacement, 1)

# Modify the QuickStartGuide onFireTest
fire_target = """                                    timestamp: new Date().toISOString(),
                                  }]
                                };
                                w((prev) => [newTracker, ...prev]);
                              }}
                            />"""
fire_replacement = """                                    timestamp: new Date().toISOString(),
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
                            />"""
content = content.replace(fire_target, fire_replacement, 1)

# Add TelemetryLiveAlerts right at the end of the return statement before the final closing div
render_target = """      {/* Global CSS for animations */}
      <style>{`
        @keyframes custom-pulse {"""
render_replacement = """      <TelemetryLiveAlerts />
      {/* Global CSS for animations */}
      <style>{`
        @keyframes custom-pulse {"""
content = content.replace(render_target, render_replacement, 1)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
