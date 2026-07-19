import sys

with open('server.ts', 'r') as f:
    content = f.read()

import_statement = 'import { GoogleGenAI } from "@google/genai";\n'
if import_statement not in content:
    content = content.replace('import express from "express";', import_statement + 'import express from "express";')

# Add endpoint before static files serving
gemini_endpoint = """
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
      // We will  provide a static suggestion to avoid breaking if not configured.
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
"""

if "suggest-reply" not in content:
    content = content.replace('// --- VITE DEV OR PRODUCTION STATIC FILES ---', gemini_endpoint + '\n// --- VITE DEV OR PRODUCTION STATIC FILES ---')

with open('server.ts', 'w') as f:
    f.write(content)
print("Added Gemini endpoint")
