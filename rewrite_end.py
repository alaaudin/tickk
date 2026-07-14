with open('src/components/Dashboard.tsx', 'r') as f:
    code = f.read()

import re

# We will completely replace the end of the file from '<div className="text-[10px] text-zinc-400 font-mono">email-template.html</div>' downwards
pattern = r'<div className=\"text-\[10px\] text-zinc-400 font-mono\">email-template\.html<\/div>[\s\S]*'

repl = '''<div className="text-[10px] text-zinc-400 font-mono">email-template.html</div>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(`<img src="https://tracker.tickk.com/track/${previewTracker.id}" width="1" height="1" />`);
                            setCopiedHtmlCode(true);
                            setTimeout(() => setCopiedHtmlCode(false), 2000);
                          }}
                          className="text-[10px] bg-zinc-700 hover:bg-zinc-600 text-zinc-200 px-2 py-1 rounded transition-colors cursor-pointer flex items-center gap-1"
                        >
                          {copiedHtmlCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copiedHtmlCode ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <div className="flex-1 p-4 overflow-auto">
                        <pre className="text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre-wrap">
                          <code>{`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <p>Hi there,</p>
    <p>This is the simulated email content for ${previewTracker.title}.</p>
    <p>The tracking pixel is embedded below.</p>
    <br />
    <p>Best regards,<br />${fullName}</p>
    
    <!-- Tickk Tracking Pixel -->
    <img src="https://tracker.tickk.com/track/${previewTracker.id}" width="1" height="1" alt="" style="display:none;" />
  </body>
</html>`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}'''

new_code = re.sub(pattern, repl, code)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(new_code)
