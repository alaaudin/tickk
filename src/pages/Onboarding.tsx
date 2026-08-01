import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Check, Loader2, ArrowLeft, Shield } from 'lucide-react';

export default function Onboarding() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // Extract provider from URL if it exists
  const queryParams = new URLSearchParams(window.location.search);
  const redirectProvider = queryParams.get('provider');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const provider = params.get('provider');
    const connectedEmail = session?.user?.email || '';
    
    if (!provider || !connectedEmail) return;

    const targetUrl = provider === 'gmail' 
      ? `https://mail.google.com/#inbox?tickk_email=${encodeURIComponent(connectedEmail)}`
      : provider === 'outlook'
        ? `https://outlook.live.com?tickk_email=${encodeURIComponent(connectedEmail)}`
        : null;

    if (!targetUrl) return;

    // Send email to tickk-sync.js content script via postMessage
    // Content script will write to chrome.storage.local and confirm back
    window.postMessage({ 
      type: 'TICKK_AUTH_SYNC', 
      email: connectedEmail,
      accessToken: session.access_token
    }, '*');
    console.log('[Tickk Onboarding] postMessage sent to content script:', connectedEmail);

    // Wait for content script confirmation, THEN redirect
    let redirected = false;
    const onConfirm = (event: MessageEvent) => {
      if (event.data?.type === 'TICKK_SYNC_CONFIRMED' && !redirected) {
        redirected = true;
        console.log('[Tickk Onboarding] ✅ Sync confirmed! Redirecting...');
        window.removeEventListener('message', onConfirm);
        window.location.href = targetUrl;
      }
    };
    window.addEventListener('message', onConfirm);

    // Safety timeout: redirect after 3s even if no confirmation (URL param fallback)
    setTimeout(() => {
      if (!redirected) {
        redirected = true;
        console.log('[Tickk Onboarding] ⏱️ Timeout — redirecting with URL fallback');
        window.removeEventListener('message', onConfirm);
        window.location.href = targetUrl;
      }
    }, 3000);

    return () => window.removeEventListener('message', onConfirm);
  }, [session]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCheckingSession(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        // ─── Channel 1: postMessage to tickk-sync.js content script (INSTANT) ───
        window.postMessage({ 
          type: 'TICKK_AUTH_SYNC', 
          email: session.user?.email || '',
          accessToken: session.access_token 
        }, '*');
        console.log('[Tickk Onboarding] postMessage sent on auth change:', session.user?.email);

        // ─── Channel 2: chrome.runtime.sendMessage to background.js ───
        const EXTENSION_ID = import.meta.env.VITE_EXTENSION_ID || "";
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage && EXTENSION_ID) {
          try {
            chrome.runtime.sendMessage(EXTENSION_ID, {
              type: "AUTH_TOKEN",
              accessToken: session.access_token,
            });
          } catch (e) {
            console.warn('[Tickk] Could not send message to extension:', e);
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleProviderLogin = async (provider: 'google' | 'azure') => {
    setIsLoading(provider);
    try {
      const targetUrl = provider === 'google' 
        ? 'https://tickk.online/onboarding?provider=gmail'
        : 'https://tickk.online/onboarding?provider=outlook';

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: targetUrl,
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
  if (session && redirectProvider) {
    const providerLabel = redirectProvider === 'gmail' ? 'Gmail' : 'Outlook';
    const email = session.user?.email || '';

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
                Account Connected Successfully!
              </h2>
              <p className="text-sm text-neutral-500 dark:text-zinc-400 mb-2 leading-relaxed">
                Your {providerLabel} account is now linked.
              </p>
              <p className="text-xs text-neutral-400 dark:text-zinc-500 mb-8 font-mono">
                {email}
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 dark:text-zinc-400">
                  <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                  <span>Opening your inbox in 2 seconds...</span>
                </div>
                <p className="text-[11px] text-neutral-400 dark:text-zinc-500 mt-4">
                  If you are not redirected,{' '}
                  <a 
                    href={redirectProvider === 'gmail' ? 'https://mail.google.com' : 'https://outlook.live.com'}
                    className="text-neutral-600 dark:text-zinc-300 underline underline-offset-2"
                  >
                    click here
                  </a>.
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
                  <svg className="w-10 h-10 group-hover:scale-105 transition-transform duration-200" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.932 9.343 7.976 23.894 6.002 20.78v-2.684c0-.977.494-1.888 1.314-2.42l13.345-8.659a6.14 6.14 0 0 1 6.685 0z" fill="url(#a)"/><path d="M27.14 6.89q.105.06.206.127l10.414 6.755L11.938 30.14l-3.963-6.25 18.951-12.037c1.795-1.14 1.874-3.704.214-4.964" fill="url(#b)"/><path d="M27.14 6.89q.105.06.206.127l10.414 6.755L11.938 30.14l-3.963-6.25 18.951-12.037c1.795-1.14 1.874-3.704.214-4.964" fill="url(#c)" fillOpacity=".2"/><path d="M22.24 33.266 11.938 30.14l21.904-13.885c1.845-1.17 1.84-3.863-.009-5.026l-.099-.062.285.177 6.666 4.324A2.89 2.89 0 0 1 42 18.09v2.598z" fill="url(#d)"/><path d="M22.24 33.266 11.938 30.14l21.904-13.885c1.845-1.17 1.84-3.863-.009-5.026l-.099-.062.285.177 6.666 4.324A2.89 2.89 0 0 1 42 18.09v2.598z" fill="url(#e)" fillOpacity=".2"/><path d="M27.346 7.017a6.14 6.14 0 0 0-6.686 0l-13.344 8.66a2.89 2.89 0 0 0-1.314 2.419v.131a2.96 2.96 0 0 0 1.382 2.41L23.976 31.1l16.635-10.445a2.97 2.97 0 0 0 1.388-2.511v2.544-2.597c0-.978-.495-1.889-1.314-2.42z" fill="url(#f)"/><path d="M21.051 42.004h14.697a6.25 6.25 0 0 0 6.25-6.25V18.143c0 1.02-.524 1.968-1.388 2.51L18.75 34.38a4.05 4.05 0 0 0-1.895 3.427 4.197 4.197 0 0 0 4.196 4.197" fill="url(#g)"/><path d="M21.051 42.004h14.697a6.25 6.25 0 0 0 6.25-6.25V18.143c0 1.02-.524 1.968-1.388 2.51L18.75 34.38a4.05 4.05 0 0 0-1.895 3.427 4.197 4.197 0 0 0 4.196 4.197" fill="url(#h)" fillOpacity=".4"/><path d="M21.051 42.004h14.697a6.25 6.25 0 0 0 6.25-6.25V18.143c0 1.02-.524 1.968-1.388 2.51L18.75 34.38a4.05 4.05 0 0 0-1.895 3.427 4.197 4.197 0 0 0 4.196 4.197" fill="url(#i)" fillOpacity=".5"/><path d="M27.027 42.002H12.249A6.25 6.25 0 0 1 6 35.752V18.13c0 1.018.523 1.965 1.384 2.508l21.839 13.768a4.115 4.115 0 0 1-2.195 7.596" fill="url(#j)"/><path d="M27.027 42.002H12.249A6.25 6.25 0 0 1 6 35.752V18.13c0 1.018.523 1.965 1.384 2.508l21.839 13.768a4.115 4.115 0 0 1-2.195 7.596" fill="url(#k)"/><rect x="4" y="23" width="16" height="16" rx="3.25" fill="url(#l)"/><rect x="4" y="23" width="16" height="16" rx="3.25" fill="url(#m)" fillOpacity=".5"/><path d="M11.959 35.6q-1.985 0-3.258-1.242-1.274-1.24-1.274-3.24 0-2.11 1.293-3.415 1.292-1.303 3.386-1.303 1.978 0 3.22 1.248 1.248 1.248 1.248 3.29 0 2.098-1.293 3.383-1.286 1.28-3.322 1.279m.038-1.757q1.083 0 1.742-.739.66-.738.659-2.054 0-1.372-.64-2.136t-1.71-.764q-1.1 0-1.773.789-.672.781-.672 2.073 0 1.31.672 2.074.672.757 1.722.757" fill="white"/><path d="M11.955 35.723q-1.977 0-3.245-1.275-1.27-1.275-1.27-3.329 0-2.168 1.289-3.507 1.287-1.34 3.373-1.34 1.97 0 3.208 1.283 1.243 1.28 1.243 3.38 0 2.154-1.288 3.475-1.281 1.314-3.31 1.313m.039-1.804q1.077 0 1.734-.76.657-.758.657-2.11 0-1.409-.638-2.194-.637-.784-1.702-.784-1.097 0-1.767.81-.67.803-.67 2.13 0 1.346.67 2.13.67.777 1.716.778" fill="white"/><defs><linearGradient id="a" x1="9.989" y1="22.365" x2="30.932" y2="9.375" gradientUnits="userSpaceOnUse"><stop stopColor="#20A7FA"/><stop offset=".4" stopColor="#3BD5FF"/><stop offset="1" stopColor="#C4B0FF"/></linearGradient><linearGradient id="b" x1="17.197" y1="26.794" x2="28.856" y2="8.126" gradientUnits="userSpaceOnUse"><stop stopColor="#165AD9"/><stop offset=".501" stopColor="#1880E5"/><stop offset="1" stopColor="#8587FF"/></linearGradient><linearGradient id="c" x1="25.701" y1="27.048" x2="12.756" y2="16.501" gradientUnits="userSpaceOnUse"><stop offset=".237" stopColor="#448AFF" stopOpacity="0"/><stop offset=".792" stopColor="#0032B1"/></linearGradient><linearGradient id="d" x1="24.053" y1="31.11" x2="44.51" y2="18.018" gradientUnits="userSpaceOnUse"><stop stopColor="#1A43A6"/><stop offset=".492" stopColor="#2052CB"/><stop offset="1" stopColor="#5F20CB"/></linearGradient><linearGradient id="e" x1="29.828" y1="30.327" x2="17.398" y2="19.571" gradientUnits="userSpaceOnUse"><stop stopColor="#0045B9" stopOpacity="0"/><stop offset=".67" stopColor="#0D1F69"/></linearGradient><radialGradient id="f" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24.0018 6.81788) rotate(-90) scale(27.0027 29.2262)"><stop offset=".568" stopColor="#275FF0" stopOpacity="0"/><stop offset=".992" stopColor="#002177"/></radialGradient><linearGradient id="g" x1="41.998" y1="29.943" x2="23.852" y2="29.943" gradientUnits="userSpaceOnUse"><stop stopColor="#4DC4FF"/><stop offset=".196" stopColor="#0FAFFF"/></linearGradient><radialGradient id="h" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(28.0928 37.9117) rotate(-45) scale(11.572)"><stop offset=".259" stopColor="#0060D1"/><stop offset=".908" stopColor="#0383F1" stopOpacity="0"/></radialGradient><radialGradient id="i" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.6314 46.472) rotate(-52.6577) scale(39.2814 35.5204)"><stop offset=".732" stopColor="#F4A7F7" stopOpacity="0"/><stop offset="1" stopColor="#F4A7F7"/></radialGradient><radialGradient id="j" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(18.5708 27.5319) rotate(123.339) scale(20.7258 53.7859)"><stop stopColor="#49DEFF"/><stop offset=".724" stopColor="#29C3FF"/></radialGradient><linearGradient id="k" x1="3.458" y1="37.872" x2="20.929" y2="37.86" gradientUnits="userSpaceOnUse"><stop offset=".206" stopColor="#6CE0FF"/><stop offset=".535" stopColor="#50D5FF" stopOpacity="0"/></linearGradient><radialGradient id="l" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.94291 23.6154) rotate(46.9242) scale(21.0618)"><stop offset=".039" stopColor="#0091FF"/><stop offset=".919" stopColor="#183DAD"/></radialGradient><radialGradient id="m" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 32.7439) rotate(90) scale(11.2 12.9188)"><stop offset=".558" stopColor="#0FA5F7" stopOpacity="0"/><stop offset="1" stopColor="#74C6FF"/></radialGradient></defs></svg>
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
