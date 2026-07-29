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
                  <svg className="w-10 h-10 group-hover:scale-105 transition-transform duration-200" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M63.75 37.5C63.75 35.06 63.53 32.72 63.14 30.47H37.5V43.82H52.2C51.48 47.84 49.28 51.25 45.94 53.55V61.22H55.23C60.68 56.17 63.75 48.97 63.75 37.5Z" fill="#4285F4"/>
                    <path d="M37.5 68.75C46.78 68.75 54.56 65.69 60.03 60.47L50.74 52.8C47.68 54.86 43.78 56.11 37.5 56.11C28.55 56.11 20.89 50.98 18.2 43.84H8.59V51.72C14.03 62.47 24.78 68.75 37.5 68.75Z" fill="#34A853"/>
                    <path d="M18.2 43.78C17.52 41.72 17.11 39.53 17.11 37.25C17.11 34.97 17.52 32.78 18.2 30.72V22.84H8.59C6.23 27.5 4.92 32.72 4.92 37.25C4.92 41.78 6.23 47 8.59 51.66L18.2 43.78Z" fill="#FBBC05"/>
                    <path d="M37.5 18.44C43.59 18.44 49.05 20.47 53.34 24.38L60.2 17.52C54.53 12.27 46.72 9.25 37.5 9.25C24.78 9.25 14.03 15.53 8.59 26.28L18.2 34.16C20.89 27 28.55 21.88 37.5 21.88V18.44Z" fill="#EA4335"/>
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
                  <svg className="w-10 h-10 group-hover:scale-105 transition-transform duration-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.8L9.68 3.62V11.52H1V4.8Z" fill="#0078D4"/>
                    <path d="M10.72 3.47L22 1.5V11.52H10.72V3.47Z" fill="#0078D4"/>
                    <path d="M1 12.48H9.68V20.38L1 19.2V12.48Z" fill="#0078D4"/>
                    <path d="M10.72 12.48H22V22.5L10.72 20.53V12.48Z" fill="#0078D4"/>
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
