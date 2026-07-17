import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Building2, Check, ShieldCheck, Copy, CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useToast } from "./Toast";
import { supabase } from "../supabaseClient";

interface AuthPortalProps {
  initialMode: 'login' | 'signup';
  onAuthSuccess: (user: any, token: string) => void;
  onNavigateHome: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function AuthPortal({ initialMode, onAuthSuccess, onNavigateHome, theme, toggleTheme }: AuthPortalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'verify' | 'reset-sent'>(initialMode);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  
  useEffect(() => {
    if (mode === 'verify') {
      setLinkSent(true);
      const timer = setTimeout(() => setLinkSent(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [mode]);

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  
  // OTP Verification States
  const [otpStatus, setOtpStatus] = useState<'idle' | 'verifying' | 'success' | 'redirecting'>('idle');
  const [countdown, setCountdown] = useState(3);
  
  
  const { toast } = useToast();
  
  const codeInputs = useRef<(HTMLInputElement | null)[]>([]);

  // Password Requirements
  const reqLength = password.length >= 8;
  const reqUpper = /[A-Z]/.test(password);
  const reqNumber = /[0-9]/.test(password);
  const reqSpecial = /[^A-Za-z0-9]/.test(password);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (mode === 'signup') {
      if (!reqLength || !reqUpper || !reqNumber || !reqSpecial) {
        setIsLoading(false);
        toast("Please meet all password requirements", "error");
        return;
      }
      
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://tickk-backend.onrender.com";
      try {
        const response = await fetch(`${backendUrl}/api/auth/send-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password, name })
        });
        
        setIsLoading(false);
        
        if (!response.ok) {
          const result = await response.json();
          toast(result.error || result.message || "Failed to send OTP", "error");
          return;
        }
      } catch (err: any) {
        setIsLoading(false);
        toast("Network error. Could not connect to backend.", "error");
        return;
      }

      setMode('verify');
      setOtpStatus('idle');
      setCode(["", "", "", "", "", ""]);
      toast("Verification code sent to your email", "success");
      
    } else if (mode === 'login') {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      setIsLoading(false);
      
      if (error) {
        toast(error.message, "error");
        return;
      }
      
      if (data.user && data.session) {
        onAuthSuccess(data.user as any, data.session.access_token);
      }
    } else if (mode === 'forgot') {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://tickk-backend.onrender.com";
      try {
        const response = await fetch(`${backendUrl}/api/auth/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        
        setIsLoading(false);
        
        if (!response.ok) {
          const result = await response.json();
          toast(result.error || "Failed to send reset link", "error");
          return;
        }
        
        setMode('reset-sent');
      } catch (err: any) {
        setIsLoading(false);
        toast("Network error. Could not connect to backend.", "error");
      }
    }
  };
  const handleResendLink = async () => {
    setIsLoading(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://tickk-backend.onrender.com";
    try {
      const response = await fetch(`${backendUrl}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      setIsLoading(false);
      if (!response.ok) {
        const result = await response.json();
        toast(result.error || result.message || "Failed to resend link", "error");
      } else {
        setLinkSent(true);
        setTimeout(() => setLinkSent(false), 4000);
      }
    } catch (err: any) {
      setIsLoading(false);
      toast("Network error. Could not connect to backend.", "error");
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 30 : -30,
      opacity: 0,
      filter: "blur(4px)",
    })
  };

  const getDirection = () => {
    if (mode === 'login') return -1;
    if (mode === 'verify') return 1;
    if (mode === 'reset-sent') return 1;
    return 1;
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent w-full">

      {/* Absolute Header */}
      <div className="absolute top-0 left-0 w-full p-6 sm:p-8 flex items-center justify-between z-50">
        <button 
          onClick={onNavigateHome}
          className="group flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to marketing
        </button>

        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      <div className="relative w-full max-w-[420px] mx-auto z-10 px-4">
        <AnimatePresence initial={false} custom={getDirection()} mode="wait">
          <motion.div
            key={mode}
            custom={getDirection()}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 400, damping: 35 },
              opacity: { duration: 0.2 },
              filter: { duration: 0.2 }
            }}
            className="w-full"
          >
            {mode === 'verify' ? (
              // ULTRA PREMIUM GLASSMORPHISM Verification View
              <div className="bg-white/40 dark:bg-[#121215]/40 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[32px] p-8 sm:p-10 shadow-[0_32px_64px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(255,255,255,0.2)] dark:shadow-[0_32px_64px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.05)] relative overflow-hidden">
                {/* Inner glass reflection */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-white/40 dark:from-white/5 to-transparent blur-2xl pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  <motion.div key="verifying" exit={{ opacity: 0, filter: "blur(10px)" }}>
                    <div className="text-center mb-10 relative z-10">
                      <div className="w-16 h-16 bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] border border-white/40 dark:border-white/10">
                        <Mail className="w-8 h-8 text-neutral-900 dark:text-white" strokeWidth={1.5} />
                      </div>
                      <h2 className="text-2xl font-light font-display tracking-tight text-neutral-900 dark:text-white mb-4">
                        Check your email
                      </h2>
                      <p className="text-sm text-neutral-500 dark:text-zinc-400 font-sans mb-8 leading-relaxed">
                        We’ve sent a login link to <strong className="text-neutral-900 dark:text-white font-medium">{email}</strong>.<br/>
                        Click the button in the email to access your dashboard.
                      </p>
                      
                      <div className="flex flex-col gap-4 w-full">
                        <button 
                          type="button" 
                          onClick={handleResendLink}
                          disabled={isLoading}
                          className="w-full bg-neutral-900 hover:bg-black disabled:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:disabled:bg-neutral-400 text-white dark:text-black py-3 rounded-xl text-[13px] font-medium transition-all shadow-[0_1px_2px_rgba(0,0,0,0.1)] active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none"
                        >
                          {isLoading ? "Sending..." : "Resend link"}
                        </button>
                        <button type="button" onClick={() => setMode('signup')} className="text-xs text-neutral-500 dark:text-zinc-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                          Use a different email
                        </button>

                        <AnimatePresence>
                          {linkSent && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, y: -10 }}
                              animate={{ opacity: 1, height: 'auto', y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -10 }}
                              className="flex items-center justify-center gap-1.5 mt-2 overflow-hidden"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                Email sent successfully!
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : mode === 'reset-sent' ? (
              // PASSWORD RESET CONFIRMATION — mirrors verify screen
              <div className="bg-white/40 dark:bg-[#121215]/40 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[32px] p-8 sm:p-10 shadow-[0_32px_64px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(255,255,255,0.2)] dark:shadow-[0_32px_64px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.05)] relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-white/40 dark:from-white/5 to-transparent blur-2xl pointer-events-none" />
                
                <div className="text-center mb-10 relative z-10">
                  <div className="w-16 h-16 bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] border border-white/40 dark:border-white/10">
                    <Mail className="w-8 h-8 text-neutral-900 dark:text-white" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-light font-display tracking-tight text-neutral-900 dark:text-white mb-4">
                    Check your email
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-zinc-400 font-sans mb-8 leading-relaxed">
                    We have sent a password reset link to <strong className="text-neutral-900 dark:text-white font-medium">{email}</strong>.<br/>
                    Click it to reset your password.
                  </p>
                  
                  <div className="flex flex-col gap-4 w-full">
                    <button 
                      type="button" 
                      onClick={() => setMode('login')}
                      className="w-full bg-neutral-900 hover:bg-black disabled:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:disabled:bg-neutral-400 text-white dark:text-black py-3 rounded-xl text-[13px] font-medium transition-all shadow-[0_1px_2px_rgba(0,0,0,0.1)] active:scale-[0.99]"
                    >
                      Back to login
                    </button>
                    <button type="button" onClick={() => setMode('forgot')} className="text-xs text-neutral-500 dark:text-zinc-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                      Use a different email
                    </button>
                  </div>
                </div>
              </div>
            ) : mode === 'forgot' ? (
              <div className="bg-white/40 dark:bg-[#121215]/60 backdrop-blur-2xl border border-neutral-200/50 dark:border-zinc-800/60 rounded-3xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] w-full">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-light font-display tracking-tight text-neutral-900 dark:text-white mb-2">
                    Reset password
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-zinc-400 font-sans">
                    Enter your email to receive a reset link.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-neutral-700 dark:text-zinc-300 ml-1">Work Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-neutral-400" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-zinc-800 text-neutral-900 dark:text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900/20 dark:focus:ring-white/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 py-3 rounded-xl text-[13px] font-medium transition-all flex items-center justify-center gap-2 group shadow-[0_1px_2px_rgba(0,0,0,0.1)] active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 rounded-full border-2 border-white/20 dark:border-neutral-900/20 border-t-white dark:border-t-neutral-900 animate-spin" />
                    ) : (
                      <>
                        <span>Send reset link</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                  <div className="text-center pt-2">
                    <button type="button" onClick={() => setMode('login')} className="text-[13px] text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                      Back to login
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // Login / Signup View
              <div className="bg-white/40 dark:bg-[#121215]/60 backdrop-blur-2xl border border-neutral-200/50 dark:border-zinc-800/60 rounded-3xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] w-full">
                
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-light font-display tracking-tight text-neutral-900 dark:text-white mb-2">
                    {mode === 'login' ? 'Welcome back' : 'Request access'}
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-zinc-400 font-sans">
                    {mode === 'login' 
                      ? 'Enter your credentials to access the console.' 
                      : 'Create a secure corporate profile.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {mode === 'signup' && (
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-medium text-neutral-700 dark:text-zinc-300 ml-1">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Building2 className="h-4 w-4 text-neutral-400" />
                        </div>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-zinc-800 text-neutral-900 dark:text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900/20 dark:focus:ring-white/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                          placeholder="e.g. John Doe"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-neutral-700 dark:text-zinc-300 ml-1">Work Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-neutral-400" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-zinc-800 text-neutral-900 dark:text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900/20 dark:focus:ring-white/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between ml-1">
                      <label className="text-[13px] font-medium text-neutral-700 dark:text-zinc-300">Password</label>
                      {mode === 'login' && (
                        <button type="button" onClick={() => setMode('forgot')} className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-neutral-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-zinc-800 text-neutral-900 dark:text-white rounded-xl pl-11 pr-20 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900/20 dark:focus:ring-white/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                        placeholder="••••••••"
                      />
                      <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1 text-neutral-400">
                        {password.length > 0 && (
                          <button
                            type="button"
                            onClick={handleCopyPassword}
                            className="p-1.5 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-pointer"
                            title="Copy Password"
                          >
                            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="p-1.5 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Password Requirements for Sign Up */}
                  {mode === 'signup' && (
                    <div className="pt-2 space-y-2">
                      <Requirement label="At least 8 characters" met={reqLength} />
                      <Requirement label="One uppercase letter" met={reqUpper} />
                      <Requirement label="One number" met={reqNumber} />
                      <Requirement label="One special character" met={reqSpecial} />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full h-12 mt-6 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold rounded-xl flex items-center justify-center overflow-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer shadow-md"
                  >
                    <span className={`flex items-center gap-2 transition-all duration-300 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                      {mode === 'login' ? 'Authenticate' : 'Continue'}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/20 dark:border-black/20 border-t-white dark:border-t-black rounded-full animate-spin" />
                      </div>
                    )}
                  </button>

                </form>

                <div className="mt-8 text-center border-t border-neutral-100 dark:border-zinc-800/60 pt-6">
                  <p className="text-[13px] text-neutral-500 dark:text-zinc-400">
                    {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button 
                      onClick={() => {
                        setMode(mode === 'login' ? 'signup' : 'login');
                        setPassword(""); // clear password when switching
                      }}
                      className="text-neutral-900 dark:text-white font-semibold hover:underline decoration-neutral-300 dark:decoration-zinc-700 underline-offset-4 transition-all cursor-pointer"
                    >
                      {mode === 'login' ? 'Request access' : 'Sign in'}
                    </button>
                  </p>
                </div>
                
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Requirement({ label, met }: { label: string, met: boolean }) {
  return (
    <motion.div 
      initial={false}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2.5"
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{ 
            scale: met ? 1 : 0.9,
            opacity: met ? 1 : 0.4
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Check className={`w-4 h-4 ${met ? 'text-emerald-500' : 'text-neutral-400 dark:text-neutral-500'}`} strokeWidth={2.5} />
        </motion.div>
      </div>
      <span className={`text-[13px] tracking-wide transition-all duration-500 ${met ? 'text-neutral-900 dark:text-white font-medium' : 'text-neutral-400 dark:text-neutral-500 font-normal'}`}>
        {label}
      </span>
    </motion.div>
  );
}
