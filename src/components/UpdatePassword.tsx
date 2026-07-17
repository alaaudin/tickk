import React, { useState } from "react";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useToast } from "./Toast";
import { supabase } from "../supabaseClient";

interface UpdatePasswordProps {
  onSuccess: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function UpdatePassword({ onSuccess, theme, toggleTheme }: UpdatePasswordProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Password Requirements
  const reqLength = password.length >= 8;
  const reqUpper = /[A-Z]/.test(password);
  const reqNumber = /[0-9]/.test(password);
  const reqSpecial = /[^A-Za-z0-9]/.test(password);
  const reqMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reqLength || !reqUpper || !reqNumber || !reqSpecial) {
      toast("Please meet all password requirements", "error");
      return;
    }

    if (password !== confirmPassword) {
      toast("Passwords do not match", "error");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    setIsLoading(false);

    if (error) {
      toast(error.message, "error");
      return;
    }

    toast("Password updated successfully!", "success");
    setTimeout(() => {
      onSuccess();
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent w-full">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 sm:p-8 flex items-center justify-end z-50">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      <div className="relative w-full max-w-[420px] mx-auto z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <div className="bg-white/40 dark:bg-[#121215]/40 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[32px] p-8 sm:p-10 shadow-[0_32px_64px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(255,255,255,0.2)] dark:shadow-[0_32px_64px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.05)] relative overflow-hidden">
            {/* Inner glass reflection */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-white/40 dark:from-white/5 to-transparent blur-2xl pointer-events-none" />

            <div className="relative z-10">
              {/* Header */}
              <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] border border-white/40 dark:border-white/10">
                  <ShieldCheck className="w-8 h-8 text-neutral-900 dark:text-white" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-light font-display tracking-tight text-neutral-900 dark:text-white mb-2">
                  Set new password
                </h2>
                <p className="text-sm text-neutral-500 dark:text-zinc-400 font-sans leading-relaxed">
                  Choose a strong password for your account.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* New Password */}
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-neutral-700 dark:text-zinc-300 ml-1">New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-neutral-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-zinc-800 text-neutral-900 dark:text-white rounded-xl pl-11 pr-12 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900/20 dark:focus:ring-white/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-neutral-700 dark:text-zinc-300 ml-1">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-neutral-400" />
                    </div>
                    <input
                      type={showConfirm ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-zinc-800 text-neutral-900 dark:text-white rounded-xl pl-11 pr-12 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900/20 dark:focus:ring-white/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-pointer"
                      >
                        {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="pt-2 space-y-2">
                  <Requirement label="At least 8 characters" met={reqLength} />
                  <Requirement label="One uppercase letter" met={reqUpper} />
                  <Requirement label="One number" met={reqNumber} />
                  <Requirement label="One special character" met={reqSpecial} />
                  <Requirement label="Passwords match" met={reqMatch} />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full h-12 mt-6 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold rounded-xl flex items-center justify-center overflow-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer shadow-md"
                >
                  <span className={`flex items-center gap-2 transition-all duration-300 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                    Update Password
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/20 dark:border-black/20 border-t-white dark:border-t-black rounded-full animate-spin" />
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Requirement({ label, met }: { label: string; met: boolean }) {
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
