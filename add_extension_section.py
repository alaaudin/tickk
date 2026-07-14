import re

with open('src/components/LandingPage.tsx', 'r') as f:
    code = f.read()

# Make sure to import Puzzle if not imported
if 'Puzzle' not in code:
    code = code.replace('import { ', 'import { \n  Puzzle,', 1)

new_section = '''      {/* Extension Download Section */}
      <section className="py-24 bg-transparent border-t border-neutral-200/40 dark:border-neutral-800/60 px-6 lg:px-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto w-full">
          <div className="bg-white/40 dark:bg-[#121215]/45 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/60 rounded-2xl p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_40px_rgba(255,255,255,0.015)]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-900/5 dark:via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="flex-1 space-y-6 relative z-10">
              <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-800 dark:text-neutral-400 uppercase">BROWSER EXTENSION</span>
              <h2 className="font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased text-3xl sm:text-4xl">
                <span className="bg-gradient-to-r from-neutral-950 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent">
                  Track directly from your inbox
                </span>
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-lg leading-relaxed">
                Install our official Chrome Extension to inject tracking pixels seamlessly from Gmail, Outlook, or Yahoo Mail without ever leaving your composer.
              </p>
              
              <div className="pt-2">
                <a 
                  href="#"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-neutral-900 hover:bg-black dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-black text-sm font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg shadow-sm border border-neutral-950 dark:border-neutral-200 group"
                >
                  <Puzzle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Download for Chrome</span>
                </a>
              </div>
            </div>

            <div className="w-full md:w-[400px] aspect-video bg-neutral-100/50 dark:bg-[#1a1a1e]/50 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden relative shadow-inner flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 dark:opacity-40 flex items-center justify-center">
                 <div className="w-64 h-64 bg-neutral-400 dark:bg-neutral-500 rounded-full blur-[80px]" />
              </div>
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 bg-white dark:bg-[#202024] p-4 rounded-lg border border-neutral-200/60 dark:border-neutral-700/60 shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded bg-[#ea4335]/10 dark:bg-[#ea4335]/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#ea4335]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-neutral-900 dark:text-white mb-0.5">Tickk Extension</div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400">Ready to inject tracking</div>
                </div>
                <div className="ml-4 w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
                  <Check className="w-3 h-3 text-neutral-600 dark:text-neutral-300" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
'''

code = code.replace('{/* Pricing Tiers Section */}', new_section + '\n      {/* Pricing Tiers Section */}')

with open('src/components/LandingPage.tsx', 'w') as f:
    f.write(code)
