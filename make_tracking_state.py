import sys

with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

old_tracking = """  const trackingData = [
    { id: 1, email: "sarah.jenkins@gmail.com", subject: "Q3 Board Deck - Final", sent: "2h ago", opens: 3, clicks: 1, provider: "gmail", device: "desktop", isManual: true },
    { id: 2, email: "michael.chen@outlook.com", subject: "Vendor Agreement Revised", sent: "5h ago", opens: 1, clicks: 0, provider: "outlook", device: "mobile", isManual: true },
    { id: 3, email: "alex.williams@yahoo.com", subject: "Following up on yesterday", sent: "1d ago", opens: 0, clicks: 0, provider: "yahoo", device: "unknown", isManual: true },
    { id: 4, email: "j.doe@icloud.com", subject: "Your private invitation", sent: "2d ago", opens: 5, clicks: 2, provider: "apple", device: "mobile", isManual: true }
  ];"""

new_tracking = """  const [trackingData, setTrackingData] = useState([
    { id: 1, email: "sarah.jenkins@gmail.com", subject: "Q3 Board Deck - Final", sent: "2h ago", opens: 3, clicks: 1, provider: "gmail", device: "desktop", isManual: true, status: "sent" },
    { id: 2, email: "michael.chen@outlook.com", subject: "Vendor Agreement Revised", sent: "5h ago", opens: 1, clicks: 0, provider: "outlook", device: "mobile", isManual: true, status: "sent" },
    { id: 3, email: "alex.williams@yahoo.com", subject: "Following up on yesterday", sent: "1d ago", opens: 0, clicks: 0, provider: "yahoo", device: "unknown", isManual: true, status: "sent" },
    { id: 4, email: "j.doe@icloud.com", subject: "Your private invitation", sent: "2d ago", opens: 5, clicks: 2, provider: "apple", device: "mobile", isManual: true, status: "sent" }
  ]);"""

content = content.replace(old_tracking, new_tracking)

old_handle = """  const handleDispatch = () => {
    if (!isPayloadReady) return;
    setStatus("dispatching");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };"""

new_handle = """  const handleDispatch = () => {
    if (!isPayloadReady) return;
    setStatus("dispatching");
    setTimeout(() => {
      setStatus("success");
      const providerStr = recipient.includes("@gmail") ? "gmail" : recipient.includes("@outlook") ? "outlook" : recipient.includes("@yahoo") ? "yahoo" : recipient.includes("@icloud") ? "apple" : "unknown";
      
      const newDispatch = {
        id: Date.now(),
        email: recipient,
        subject: subject || "No Subject",
        sent: isScheduling && scheduleDate ? `Scheduled for ${new Date(scheduleDate).toLocaleString()}` : "Just now",
        opens: 0,
        clicks: 0,
        provider: providerStr,
        device: "unknown",
        isManual: true,
        status: isScheduling && scheduleDate ? "scheduled" : "sent"
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
  };"""

content = content.replace(old_handle, new_handle)

with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(content)
print("Success")
