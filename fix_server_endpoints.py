import re

with open('server.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Strip out all duplicate feedback/tickets endpoints
patterns_to_remove = [
    r'app\.get\("/api/tickets", async \(req, res\) => \{.*?\n\}\);',
    r'app\.post\("/api/tickets", async \(req, res\) => \{.*?\n\}\);',
    r'app\.get\("/api/feedback", async \(req, res\) => \{.*?\n\}\);',
    r'app\.post\("/api/feedback", async \(req, res\) => \{.*?\n\}\);',
    r'app\.patch\("/api/feedback/:id/notify", async \(req, res\) => \{.*?\n\}\);'
]

for pattern in patterns_to_remove:
    content = re.sub(pattern, '', content, flags=re.DOTALL)

# Also remove any leftover "// --- FEEDBACK & REWARDS API ---"
content = content.replace('// --- FEEDBACK & REWARDS API ---\n\n', '')
content = content.replace('// --- FEEDBACK & REWARDS API ---', '')

new_endpoints = """
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
      status: "submitted",
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
"""

# Insert before // --- CORE SYSTEM ENFORCEMENT: THE TRACKING PIXEL ---
content = content.replace('// --- CORE SYSTEM ENFORCEMENT: THE TRACKING PIXEL ---', new_endpoints + '\n// --- CORE SYSTEM ENFORCEMENT: THE TRACKING PIXEL ---')

with open('server.ts', 'w', encoding='utf-8') as f:
    f.write(content)
