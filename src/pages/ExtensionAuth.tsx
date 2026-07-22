import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Check, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useToast } from '../components/Toast';

export default function ExtensionAuth() {
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session && !isSuccess) {
      exchangeTokenAndConnect(session.access_token);
    }
  }, [session]);

  const exchangeTokenAndConnect = async (token: string) => {
    try {
      const backendUrl = import.meta.env.VITE_API_URL || "https://tickk-backend.onrender.com";
      const response = await fetch(`${backendUrl}/api/extension/auth-token-exchange`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to exchange token');
      }
      
      const data = await response.json();
      
      if (data.apiKey) {
        // Broadcast to extension
        const EXTENSION_ID = import.meta.env.VITE_EXTENSION_ID || "your_extension_id_here";
        
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
          chrome.runtime.sendMessage(EXTENSION_ID, { type: "TICKK_AUTH_SUCCESS", apiKey: data.apiKey });
        }
        
        // Also fallback to postMessage just in case
        window.postMessage({ type: "TICKK_AUTH_SUCCESS", apiKey: data.apiKey }, "*");
        
        setIsSuccess(true);
      }
    } catch (err) {
      console.error('Extension auth error:', err);
      toast("Failed to connect extension. Please try again.", "error");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPassword
    });
    
    setIsAuthenticating(false);
    
    if (error) {
      toast(error.message, "error");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0c0c0e] text-neutral-900 dark:text-white">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-[#0c0c0e] w-full text-neutral-900 dark:text-white">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.035] dark:opacity-[0.07] animate-blob-slow bg-neutral-950 dark:bg-white top-[-8%] left-[-8%]" />
      </div>

      <div className="relative w-full max-w-[420px] mx-auto z-10 px-4">
        <div className="bg-white/40 dark:bg-[#121215]/60 backdrop-blur-2xl border border-neutral-200/50 dark:border-zinc-800/60 rounded-[32px] p-8 sm:p-10 shadow-[0_32px_64px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(255,255,255,0.2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] relative overflow-hidden">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-white/40 dark:from-white/5 to-transparent blur-2xl pointer-events-none" />

          {isSuccess ? (
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-green-200 dark:border-green-500/20">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-light font-display tracking-tight mb-4">
                Extension Connected Successfully!
              </h2>
              <p className="text-sm text-neutral-500 dark:text-zinc-400 mb-8 leading-relaxed">
                You can now close this tab and return to Gmail. Tickk is actively tracking your emails.
              </p>
              <button 
                onClick={() => window.close()}
                className="w-full bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black py-3 rounded-xl text-[13px] font-medium transition-all shadow-sm"
              >
                Close Tab
              </button>
            </div>
          ) : !session ? (
            <div className="relative z-10">
              <div className="mb-8 text-center">
                <div className="w-12 h-12 bg-neutral-100 dark:bg-[#27272a] rounded-xl flex items-center justify-center mx-auto mb-4 border border-neutral-200 dark:border-[#3f3f46]">
                  <div className="w-6 h-6 rounded-md bg-neutral-900 dark:bg-white flex items-center justify-center">
                    <Check className="w-4 h-4 text-white dark:text-neutral-900" strokeWidth={3} />
                  </div>
                </div>
                <h2 className="text-2xl font-light font-display tracking-tight mb-2">
                  Connect Tickk Extension
                </h2>
                <p className="text-sm text-neutral-500 dark:text-zinc-400">
                  Sign in to connect Tickk Extension
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-neutral-700 dark:text-zinc-300 ml-1">Email</label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-zinc-800 text-neutral-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 transition-all"
                    placeholder="name@company.com"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-neutral-700 dark:text-zinc-300 ml-1">Password</label>
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-zinc-800 text-neutral-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 transition-all"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full h-12 mt-6 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
                >
                  {isAuthenticating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      Sign In & Connect
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center relative z-10 py-10">
              <Loader2 className="w-8 h-8 animate-spin text-neutral-400 mx-auto mb-4" />
              <p className="text-sm text-neutral-500">Connecting extension...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
