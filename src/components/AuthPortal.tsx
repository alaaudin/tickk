import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Building2, Check, ShieldCheck, Copy } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useToast } from "./Toast";

interface AuthPortalProps {
  initialMode: 'login' | 'signup';
  onAuthSuccess: (user: any, token: string) => void;
  onNavigateHome: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function AuthPortal({ initialMode, onAuthSuccess, onNavigateHome, theme, toggleTheme }: AuthPortalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'verify'>(initialMode);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (mode === 'signup') {
      if (!reqLength || !reqUpper || !reqNumber || !reqSpecial) {
        setIsLoading(false);
        toast("Please meet all password requirements", "error");
        return;
      }
      setTimeout(() => {
        setIsLoading(false);
        setMode('verify');
        setOtpStatus('idle');
        setCode(["", "", "", "", "", ""]);
        toast("Verification code sent to your email", "success");
      }, 800);
    } else if (mode === 'login') {
      setTimeout(() => {
        setIsLoading(false);
        const mockUser = { id: '1', email, name: email.split('@')[0], role: 'admin' };
        onAuthSuccess(mockUser, 'mock_jwt_token_456');
      }, 800);
    }
  };
  
  const handleCodeChange = (index: number, value: string) => {
    if (otpStatus !== 'idle') return;
    
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    if (value !== "" && index < 5) {
      codeInputs.current[index + 1]?.focus();
    }
  };
  
  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (otpStatus !== 'idle') return;
    if (e.key === 'Backspace' && code[index] === "" && index > 0) {
      codeInputs.current[index - 1]?.focus();
    }
  };

  // Auto-verify effect
  useEffect(() => {
    if (mode === 'verify' && otpStatus === 'idle') {
      const isComplete = code.every(c => c !== "");
      if (isComplete) {
        setOtpStatus('verifying');
        // Simulate network request
        setTimeout(() => {
          const enteredCode = code.join("");
          if (enteredCode === "123456") {
            setOtpStatus('success');
            // Wait for success animation (boxes turning green, merging, and tick appearing)
            setTimeout(() => {
              setOtpStatus('redirecting');
              let count = 3;
              setCountdown(count);
              const interval = setInterval(() => {
                count -= 1;
                if (count <= 0) {
                  clearInterval(interval);
                  const mockUser = { id: '1', email, name, role: 'admin' };
                  onAuthSuccess(mockUser, 'mock_jwt_token_789');
                } else {
                  setCountdown(count);
                }
              }, 1000);
            }, 1100);
          } else {
            toast("Invalid verification code. Use 123456.", "error");
            setOtpStatus('idle');
            setCode(["", "", "", "", "", ""]);
            codeInputs.current[0]?.focus();
          }
        }, 800);
      }
    }
  }, [code, mode, otpStatus, email, name, onAuthSuccess, toast]);

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
                  {otpStatus === 'redirecting' ? (
                    <motion.div
                      key="redirecting"
                      initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      className="flex flex-col items-center justify-center min-h-[300px] relative z-10"
                    >
                      <div className="px-8 py-6 bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center gap-3">
                        <div className="flex items-end justify-center gap-1.5">
                          <span className="text-xl font-light tracking-wide text-neutral-800 dark:text-zinc-200">
                            Authenticating session
                          </span>
                          <div className="flex gap-[2px] mb-[3px] ml-1">
                             <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="text-emerald-500 text-3xl leading-[0.5] drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]">.</motion.span>
                             <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} className="text-emerald-500 text-3xl leading-[0.5] drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]">.</motion.span>
                             <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} className="text-emerald-500 text-3xl leading-[0.5] drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]">.</motion.span>
                          </div>
                        </div>
                        <motion.span 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="text-xs text-neutral-500 dark:text-neutral-400 font-mono tracking-wider"
                        >
                          Redirecting in {countdown}s...
                        </motion.span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="verifying" exit={{ opacity: 0, filter: "blur(10px)" }}>
                      <div className="text-center mb-10 relative z-10">
                        <div className="w-16 h-16 bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] border border-white/40 dark:border-white/10">
                          <ShieldCheck className="w-8 h-8 text-neutral-900 dark:text-white" strokeWidth={1.5} />
                        </div>
                        <h2 className="text-2xl font-light font-display tracking-tight text-neutral-900 dark:text-white mb-2">
                          Security Verification
                        </h2>
                        <p className="text-sm text-neutral-500 dark:text-zinc-400 font-sans">
                          We sent a 6-digit access code to <strong className="text-neutral-900 dark:text-white font-medium">{email}</strong>
                        </p>
                      </div>

                      <div className="relative flex justify-center items-center z-10 mb-8">
                        <div className="flex justify-between gap-2 sm:gap-3 w-full relative max-w-[360px] mx-auto">
                          {code.map((digit, idx) => (
                            <motion.input
                              key={idx}
                              initial={{ opacity: 0, y: 20 }}
                              animate={otpStatus === 'success' ? {
                                x: (2.5 - idx) * 45,
                                scale: 0.2,
                                opacity: 0
                              } : { opacity: 1, y: 0, x: 0 }}
                              transition={otpStatus === 'success' ? {
                                duration: 0.4, delay: 0.1, ease: "easeInOut"
                              } : { delay: idx * 0.05 + 0.1, type: "spring", stiffness: 500, damping: 30 }}
                              ref={(el) => { codeInputs.current[idx] = el; }}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleCodeChange(idx, e.target.value)}
                              onKeyDown={(e) => handleCodeKeyDown(idx, e)}
                              disabled={otpStatus !== 'idle'}
                              className={`w-full aspect-square text-center text-xl sm:text-2xl font-display font-light text-neutral-800 dark:text-neutral-200 tracking-widest backdrop-blur-3xl border rounded-2xl focus:outline-none transition-all duration-300 ${
                                otpStatus === 'success'
                                  ? 'bg-white/40 dark:bg-white/[0.03] border-white/60 dark:border-white/10 text-transparent shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.05)]' 
                                  : 'bg-white/40 dark:bg-white/[0.03] border-white/60 dark:border-white/10 text-neutral-900 dark:text-white focus:border-neutral-400 dark:focus:border-white/30 focus:bg-white/60 dark:focus:bg-white/10 focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.05)]'
                              }`}
                            />
                          ))}
                          {otpStatus === 'success' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.3 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4, duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
                              className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                              <Check className="w-8 h-8 text-emerald-500" strokeWidth={2.5} />
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <div className="text-center relative z-10 h-10 flex items-center justify-center">
                        {otpStatus === 'idle' || otpStatus === 'verifying' ? (
                          <div className="flex flex-col gap-4 w-full">
                            {otpStatus === 'verifying' ? (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Verifying securely...
                              </motion.div>
                            ) : (
                              <button type="button" onClick={() => {setCode(["","","","","",""]); setMode('signup')}} className="text-xs text-neutral-500 dark:text-zinc-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                Use a different email
                              </button>
                            )}
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Login / Signup View
              <div className="bg-white/40 dark:bg-[#121215]/60 backdrop-blur-2xl border border-neutral-200/50 dark:border-zinc-800/60 rounded-3xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                
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
