import React from "react";
import { Terminal, Shield, Key, Code, Lock, Server } from "lucide-react";
import { motion } from "motion/react";

export default function DeveloperDocumentation() {
  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold font-display text-neutral-900 dark:text-white tracking-tight">
            Developer Documentation
          </h2>
          <p className="text-xs text-zinc-500 mt-1 font-normal">
            Programmatic tracking engine endpoint architecture for bulk automated scripts.
          </p>
        </div>
      </div>

      {/* Code Snippet Section */}
      <div className="bg-white/10 dark:bg-[#111111]/60 backdrop-blur-3xl border border-neutral-200/50 dark:border-white/10 rounded-[22px] p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-100/50 via-transparent to-transparent dark:from-white/5 dark:via-transparent dark:to-transparent pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3 border-b border-neutral-200/50 dark:border-zinc-800/50 pb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Programmatic Integration via cold_blast.py</h3>
              <p className="text-[11px] font-mono text-neutral-500 dark:text-zinc-400 mt-0.5">HTTP POST • python-requests • smtplib</p>
            </div>
          </div>

          <p className="text-sm text-neutral-600 dark:text-zinc-400 leading-relaxed font-sans">
            Demonstrates how a developer performs a rapid HTTP POST request to the <code className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-1 py-0.5 rounded">/v1/trackers</code> endpoint. The backend returns a secure tokenized tracking ID string, which the script then appends as a hidden tracking pixel directly into the outgoing email's raw HTML body sequence before triggering the local SMTP relay.
          </p>

          <div className="bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#161618] border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 ml-2">cold_blast.py</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-600">PYTHON 3.10+</span>
            </div>
            <div className="p-5 overflow-x-auto">
              <pre className="text-[12px] font-mono leading-relaxed text-zinc-300">
                <code className="block text-emerald-400">import requests</code>
                <code className="block text-emerald-400">import smtplib</code>
                <code className="block text-emerald-400">from email.mime.multipart import MIMEMultipart</code>
                <code className="block text-emerald-400 mb-4">from email.mime.text import MIMEText</code>
                
                <code className="block text-zinc-500 italic"># 1. Initialize authentication and endpoint parameters</code>
                <code className="block">API_ENDPOINT = <span className="text-amber-300">"https://api.tickk.io/v1/trackers"</span></code>
                <code className="block">SECRET_KEY = <span className="text-amber-300">"tk_live_your_secret_key"</span></code>
                <code className="block mb-4">TARGET_EMAIL = <span className="text-amber-300">"target@domain.com"</span></code>
                
                <code className="block text-zinc-500 italic"># 2. Perform rapid HTTP POST request to provision a tracking ID</code>
                <code className="block">headers = {"{"}<span className="text-amber-300">"Authorization"</span>: f<span className="text-amber-300">"Bearer {'{'}SECRET_KEY{'}'}"</span>{"}"}</code>
                <code className="block">payload = {"{"}<span className="text-amber-300">"recipient"</span>: TARGET_EMAIL, <span className="text-amber-300">"subject"</span>: <span className="text-amber-300">"Executive Campaign"</span>{"}"}</code>
                <code className="block">response = requests.post(API_ENDPOINT, json=payload, headers=headers)</code>
                <code className="block mb-4">tracking_id = response.json().get(<span className="text-amber-300">"tracking_id"</span>)</code>
                
                <code className="block text-zinc-500 italic"># 3. Append hidden tracking pixel into outgoing HTML body sequence</code>
                <code className="block">pixel_url = f<span className="text-amber-300">"https://tickk.io/api/track/{'{'}tracking_id{'}'}/pixel.png"</span></code>
                <code className="block">html_content = f<span className="text-amber-300">"""</span></code>
                <code className="block text-amber-300">&lt;html&gt;</code>
                <code className="block text-amber-300">  &lt;body&gt;</code>
                <code className="block text-amber-300">    &lt;p&gt;Secure communication payload attached.&lt;/p&gt;</code>
                <code className="block text-amber-300">    &lt;img src="<span className="text-blue-300">{'{'}pixel_url{'}'}</span>" style="display:none;" /&gt;</code>
                <code className="block text-amber-300">  &lt;/body&gt;</code>
                <code className="block text-amber-300">&lt;/html&gt;</code>
                <code className="block mb-4"><span className="text-amber-300">"""</span></code>
                
                <code className="block text-zinc-500 italic"># 4. Trigger local SMTP relay</code>
                <code className="block">msg = MIMEMultipart(<span className="text-amber-300">'alternative'</span>)</code>
                <code className="block">msg[<span className="text-amber-300">'Subject'</span>] = <span className="text-amber-300">"Executive Campaign"</span></code>
                <code className="block">msg[<span className="text-amber-300">'From'</span>] = <span className="text-amber-300">"dispatcher@tickk.io"</span></code>
                <code className="block mb-2">msg.attach(MIMEText(html_content, <span className="text-amber-300">'html'</span>))</code>
                <code className="block">with smtplib.SMTP(<span className="text-amber-300">'127.0.0.1'</span>, <span className="text-blue-300">1025</span>) as server:</code>
                <code className="block">    server.sendmail(msg[<span className="text-amber-300">'From'</span>], TARGET_EMAIL, msg.as_string())</code>
                <code className="block text-zinc-500 italic mt-2">    print(f"[✓] Dispatch complete. Node tracking active for: {'{'}tracking_id{'}'}")</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Security Protocol Manifesto Section */}
      <div className="bg-white/10 dark:bg-[#111111]/60 backdrop-blur-3xl border border-neutral-200/50 dark:border-white/10 rounded-[22px] p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-100/50 via-transparent to-transparent dark:from-white/5 dark:via-transparent dark:to-transparent pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3 border-b border-neutral-200/50 dark:border-zinc-800/50 pb-4">
            <div className="w-10 h-10 rounded-full bg-zinc-900 dark:bg-white/10 border border-zinc-800 dark:border-white/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white dark:text-zinc-300" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">Security Protocol Manifesto</h3>
              <p className="text-[11px] font-mono text-neutral-500 dark:text-zinc-400 mt-0.5">VAULT ARCHITECTURE • API ENCLAVES</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Key className="w-4 h-4 text-neutral-500 dark:text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-zinc-200 uppercase tracking-widest font-mono mb-2">Cryptographic Salting</h4>
                  <p className="text-sm text-neutral-600 dark:text-zinc-400 leading-relaxed font-sans">
                    Secret API tokens are mathematically salted and hashed utilizing rigorous cryptographic standards (Argon2id) prior to database persistence. Raw tokens exist strictly in transient memory states during high-scale cold dispatch campaigns, meaning even absolute database compromise yields zero actionable credentials.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Lock className="w-4 h-4 text-neutral-500 dark:text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-zinc-200 uppercase tracking-widest font-mono mb-2">Hardware Vault Layers</h4>
                  <p className="text-sm text-neutral-600 dark:text-zinc-400 leading-relaxed font-sans">
                    All cryptographic verification sequences are isolated inside hardware-backed vault layers on the backend. This strict separation of concerns guarantees absolute security management, ensuring unauthorized entities cannot forge telemetry ingestion vectors or tamper with the programmatic tracking engine architecture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
