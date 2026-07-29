import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Check, Loader2, ArrowLeft, Shield } from 'lucide-react';

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
              <img
                src="/logo.svg"
                alt="Tickk"
                className="h-8 mx-auto mb-5 dark:invert"
              />
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
                className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl border border-neutral-200/60 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/40 hover:border-neutral-400 dark:hover:border-zinc-600 hover:bg-neutral-50 dark:hover:bg-zinc-900/80 transition-all duration-200 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading === 'google' ? (
                  <Loader2 className="w-10 h-10 animate-spin text-neutral-500" />
                ) : (
                  <svg className="w-10 h-10 group-hover:scale-105 transition-transform duration-200" viewBox="52 42 88 66" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/>
                    <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/>
                    <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/>
                    <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/>
                    <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.46-14.4-.22-14.4 7.2"/>
                  </svg>
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
                className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl border border-neutral-200/60 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/40 hover:border-neutral-400 dark:hover:border-zinc-600 hover:bg-neutral-50 dark:hover:bg-zinc-900/80 transition-all duration-200 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading === 'azure' ? (
                  <Loader2 className="w-10 h-10 animate-spin text-neutral-500" />
                ) : (
                  <svg className="w-10 h-10 group-hover:scale-105 transition-transform duration-200" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.596 2H11.404A1.404 1.404 0 0 0 10 3.404V5.5l9.69 3.463L30 5.5V3.404A1.404 1.404 0 0 0 28.596 2z" fill="#0364b8"/>
                    <path d="M31.652 17.405a1.869 1.869 0 0 0-.736-.825L30 16.054V5.5l-9.31 5.508L10 5.5v10.554l-.916.526a1.869 1.869 0 0 0-.736.825L2 19.498V28.5a1.5 1.5 0 0 0 1.5 1.5h25a1.5 1.5 0 0 0 1.5-1.5v-8.876z" fill="#0a2767"/>
                    <path d="M10 5.5v12.032L2 22V7.5a2 2 0 0 1 2-2z" fill="#28a8ea"/>
                    <path d="M20 5.5H10v12.032l10 5.968V5.5z" fill="#0078d4"/>
                    <path d="M30 5.5H20v18l10-5.968V5.5z" fill="#0364b8"/>
                    <path d="M30 17.532V5.5l-10 6.032 10 6.032z" opacity=".5" fill="#0a2767"/>
                    <path d="M20.006 17.405L10 11.532V23.5l10.006-6.095z" opacity=".5" fill="#0a2767"/>
                    <path d="M30 17.532l-10 6.032L10 17.532 2 22l8 5.5h12l8-5.5z" fill="#0078d4"/>
                    <path d="M10 23.468L2 19.498v9.002a1.5 1.5 0 0 0 1.5 1.5h25a1.5 1.5 0 0 0 1.5-1.5v-9.002L20.006 23.5z" fill="#0364b8"/>
                  </svg>
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
