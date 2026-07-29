import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Check, Loader2, ArrowLeft, Mail, Shield } from 'lucide-react';

export default function Onboarding() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCheckingSession(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        // If user just authenticated, broadcast to extension and show success
        const EXTENSION_ID = import.meta.env.VITE_EXTENSION_ID || "";
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage && EXTENSION_ID) {
          chrome.runtime.sendMessage(EXTENSION_ID, {
            type: "TICKK_AUTH_SUCCESS",
            apiKey: session.access_token,
            provider: session.user?.app_metadata?.provider || 'email',
            email: session.user?.email || '',
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleProviderLogin = async (provider: 'google' | 'azure') => {
    setIsLoading(provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/onboarding`,
        },
      });
      if (error) {
        console.error('OAuth error:', error.message);
        setIsLoading(null);
      }
    } catch (err) {
      console.error('OAuth error:', err);
      setIsLoading(null);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0c0c0e]">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  // Success state after OAuth redirect
  if (session) {
    const provider = session.user?.app_metadata?.provider;
    const email = session.user?.email || '';
    const providerLabel = provider === 'google' ? 'Gmail' : provider === 'azure' ? 'Outlook' : 'Email';

    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-[#0c0c0e] text-neutral-900 dark:text-white">
        {/* Background Blobs */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.035] dark:opacity-[0.07] animate-blob-slow bg-neutral-950 dark:bg-white top-[-8%] left-[-8%]" />
          <div className="absolute w-[550px] h-[550px] rounded-full blur-[150px] opacity-[0.03] dark:opacity-[0.06] animate-blob-slow-reverse bg-zinc-900 dark:bg-neutral-100 bottom-[-12%] right-[-8%]" />
        </div>

        <div className="relative w-full max-w-[420px] mx-auto z-10 px-4">
          <div className="bg-white/40 dark:bg-[#121215]/60 backdrop-blur-2xl border border-neutral-200/50 dark:border-zinc-800/60 rounded-[32px] p-8 sm:p-10 shadow-[0_32px_64px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(255,255,255,0.2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-white/40 dark:from-white/5 to-transparent blur-2xl pointer-events-none" />

            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-green-200 dark:border-green-500/20">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-light font-display tracking-tight mb-2">
                Connected Successfully!
              </h2>
              <p className="text-sm text-neutral-500 dark:text-zinc-400 mb-2 leading-relaxed">
                Your {providerLabel} account is now linked.
              </p>
              <p className="text-xs text-neutral-400 dark:text-zinc-500 mb-8 font-mono">
                {email}
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => { window.location.href = '/'; }}
                  className="w-full bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black py-3 rounded-xl text-[13px] font-medium transition-all shadow-sm"
                >
                  Go to Dashboard
                </button>
                <p className="text-[11px] text-neutral-400 dark:text-zinc-500">
                  You can close this tab and return to your inbox.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Provider selection
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-[#0c0c0e] text-neutral-900 dark:text-white">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.035] dark:opacity-[0.07] animate-blob-slow bg-neutral-950 dark:bg-white top-[-8%] left-[-8%]" />
        <div className="absolute w-[550px] h-[550px] rounded-full blur-[150px] opacity-[0.03] dark:opacity-[0.06] animate-blob-slow-reverse bg-zinc-900 dark:bg-neutral-100 bottom-[-12%] right-[-8%]" />
      </div>

      <div className="relative w-full max-w-[520px] mx-auto z-10 px-4">
        <div className="bg-white/40 dark:bg-[#121215]/60 backdrop-blur-2xl border border-neutral-200/50 dark:border-zinc-800/60 rounded-[32px] p-8 sm:p-10 shadow-[0_32px_64px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(255,255,255,0.2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-white/40 dark:from-white/5 to-transparent blur-2xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-neutral-100 dark:bg-[#27272a] rounded-xl flex items-center justify-center mx-auto mb-4 border border-neutral-200 dark:border-[#3f3f46]">
                <div className="w-6 h-6 rounded-md bg-neutral-900 dark:bg-white flex items-center justify-center">
                  <Check className="w-4 h-4 text-white dark:text-neutral-900" strokeWidth={3} />
                </div>
              </div>
              <h1 className="text-2xl font-display font-bold tracking-tight mb-2">
                Connect Your Email
              </h1>
              <p className="text-sm text-neutral-500 dark:text-zinc-400 leading-relaxed max-w-[340px] mx-auto">
                Select your email provider to enable invisible tracking with Tickk.
              </p>
            </div>

            {/* Provider Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Gmail Card */}
              <button
                onClick={() => handleProviderLogin('google')}
                disabled={isLoading !== null}
                className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-neutral-200/60 dark:border-zinc-700/50 bg-white/60 dark:bg-[#18181b]/60 hover:border-red-400/60 dark:hover:border-red-500/40 hover:bg-red-50/30 dark:hover:bg-red-500/5 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading === 'google' ? (
                  <Loader2 className="w-10 h-10 animate-spin text-red-500" />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-500/10 dark:to-red-500/5 flex items-center justify-center border border-red-200/60 dark:border-red-500/20 group-hover:scale-110 transition-transform duration-300">
                    {/* Google Icon */}
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                )}
                <div className="text-center">
                  <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 block mb-1">
                    Gmail
                  </span>
                  <span className="text-[11px] text-neutral-400 dark:text-zinc-500">
                    Connect Gmail Account
                  </span>
                </div>
              </button>

              {/* Outlook Card */}
              <button
                onClick={() => handleProviderLogin('azure')}
                disabled={isLoading !== null}
                className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-neutral-200/60 dark:border-zinc-700/50 bg-white/60 dark:bg-[#18181b]/60 hover:border-blue-400/60 dark:hover:border-blue-500/40 hover:bg-blue-50/30 dark:hover:bg-blue-500/5 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading === 'azure' ? (
                  <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-500/5 flex items-center justify-center border border-blue-200/60 dark:border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                    {/* Microsoft Icon */}
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                      <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
                      <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
                      <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
                      <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
                    </svg>
                  </div>
                )}
                <div className="text-center">
                  <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 block mb-1">
                    Outlook
                  </span>
                  <span className="text-[11px] text-neutral-400 dark:text-zinc-500">
                    Connect Outlook Account
                  </span>
                </div>
              </button>
            </div>

            {/* Security Note */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-50/80 dark:bg-white/[0.03] border border-neutral-200/50 dark:border-zinc-800/40">
              <Shield className="w-4 h-4 text-neutral-400 dark:text-zinc-500 flex-shrink-0" />
              <p className="text-[11px] text-neutral-400 dark:text-zinc-500 leading-relaxed">
                We use standard OAuth 2.0 authentication. Tickk never stores your email password.
              </p>
            </div>

            {/* Back Link */}
            <div className="mt-6 text-center">
              <button
                onClick={() => { window.location.href = '/'; }}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 dark:text-zinc-500 hover:text-neutral-600 dark:hover:text-zinc-300 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Tickk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
