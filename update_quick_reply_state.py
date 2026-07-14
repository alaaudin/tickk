with open('src/components/ManualEmailDispatch.tsx', 'r') as f:
    content = f.read()

state_vars = """
  const [generatingReply, setGeneratingReply] = useState<number | null>(null);
  const [aiReplies, setAiReplies] = useState<{ [key: number]: string }>({});

  const generateQuickReply = async (item: any) => {
    try {
      setGeneratingReply(item.id);
      const response = await fetch('/api/suggest-reply', {
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
"""

if 'const generateQuickReply' not in content:
    content = content.replace('  const getProviderIcon = () => {', state_vars + '\n  const getProviderIcon = () => {')

with open('src/components/ManualEmailDispatch.tsx', 'w') as f:
    f.write(content)
