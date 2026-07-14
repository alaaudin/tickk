import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

find = r'''  const handleCopySnippet = \(id: string\) => \{
    const trackingPixelUrl = `\$\{window\.location\.origin\}/api/track/\$\{id\}/pixel\.png`;
    const htmlSnippet = `<img src="\$\{trackingPixelUrl\}" alt="" width="1" height="1" style="display:none" referrerPolicy="no-referrer" />`;
    navigator\.clipboard\.writeText\(htmlSnippet\);
    setCopiedTrackerId\(id\);
    toast\("Tracking pixel code copied to clipboard"\);
    setTimeout\(\(\) => setCopiedTrackerId\(null\), 1500\);
  \};'''

repl = r'''  const handleCopySnippet = (tr: any) => {
    const rowData = `Recipient: ${tr.recipient}\nSubject: ${tr.subject}\nStatus: ${tr.displayOpenCount > 0 ? "Confirmed" : "Pending"}\nOpens: ${tr.displayOpenCount}\nClicks: ${tr.clickCount}\nDispatch Date: ${new Date(tr.createdAt).toLocaleString()}`;
    navigator.clipboard.writeText(rowData);
    setCopiedTrackerId(tr.id);
    toast("Row data copied to clipboard");
    setTimeout(() => setCopiedTrackerId(null), 1500);
  };'''

content = re.sub(find, repl, content)

# Also update the onClick calls from `handleCopySnippet(tr.id)` to `handleCopySnippet(tr)`
content = content.replace("handleCopySnippet(tr.id)", "handleCopySnippet(tr)")

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
