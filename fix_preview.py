with open('src/components/Dashboard.tsx', 'r') as f:
    code = f.read()

target = "previewTracker.recipient.includes('outlook') || previewTracker.recipient.includes('hotmail') || previewTracker.recipient.includes('live')"
replacement = "previewTracker.id.charCodeAt(previewTracker.id.length - 1) % 2 === 0"

code = code.replace(target, replacement)

# Now we replace the tracking pixel injected note for both Outlook and Gmail UI
# Let's find the blocks by looking for:
# <div className="text-xs font-semibold text-neutral-900 dark:text-zinc-100 uppercase tracking-wider font-mono">Tracking Pixel Injected</div>

pixel_target = """{/* Secret pixel */}
                            <div className="mt-12 p-5 bg-white dark:bg-[#121215] border border-neutral-200 dark:border-zinc-800/80 rounded-xl flex items-start gap-4 relative overflow-hidden max-w-2xl shadow-sm">
                              <div className="mt-1">
                                <div className="w-2 h-2 rounded-full bg-neutral-800 dark:bg-zinc-400 animate-pulse" />
                              </div>
                              <div className="space-y-3 flex-1">
                                <div className="text-xs font-semibold text-neutral-900 dark:text-zinc-100 uppercase tracking-wider font-mono">Tracking Pixel Injected</div>
                                <p className="text-[12px] text-neutral-500 dark:text-zinc-400 leading-relaxed">
                                  This invisible 1x1 image is the mechanism behind our silent telemetry. It is embedded directly within the email body to instantly notify you the moment the recipient opens this message.
                                </p>
                                <div className="pt-2">
                                  <code className="text-[11px] text-neutral-400 dark:text-zinc-500 font-mono bg-neutral-50 dark:bg-[#1a1a1e] px-3 py-2 rounded border border-neutral-100 dark:border-zinc-800/60 block truncate">
                                    &lt;img src="https://tracker.tickk.com/track/{previewTracker.id}" width="1" height="1" /&gt;
                                  </code>
                                </div>
                              </div>
                            </div>"""

pixel_target_gmail = """{/* Secret pixel */}
                            <div className="mt-12 ml-12 p-5 bg-white dark:bg-[#121215] border border-neutral-200 dark:border-zinc-800/80 rounded-xl flex items-start gap-4 relative overflow-hidden max-w-2xl shadow-sm">
                              <div className="mt-1">
                                <div className="w-2 h-2 rounded-full bg-neutral-800 dark:bg-zinc-400 animate-pulse" />
                              </div>
                              <div className="space-y-3 flex-1">
                                <div className="text-xs font-semibold text-neutral-900 dark:text-zinc-100 uppercase tracking-wider font-mono">Tracking Pixel Injected</div>
                                <p className="text-[12px] text-neutral-500 dark:text-zinc-400 leading-relaxed">
                                  This invisible 1x1 image is the mechanism behind our silent telemetry. It is embedded directly within the email body to instantly notify you the moment the recipient opens this message.
                                </p>
                                <div className="pt-2">
                                  <code className="text-[11px] text-neutral-400 dark:text-zinc-500 font-mono bg-neutral-50 dark:bg-[#1a1a1e] px-3 py-2 rounded border border-neutral-100 dark:border-zinc-800/60 block truncate">
                                    &lt;img src="https://tracker.tickk.com/track/{previewTracker.id}" width="1" height="1" /&gt;
                                  </code>
                                </div>
                              </div>
                            </div>"""

new_pixel_outlook = """{/* Secret pixel */}
                            <div className="mt-12 p-5 bg-neutral-50 dark:bg-[#161618] border border-neutral-200 dark:border-neutral-800/60 rounded-xl flex items-start gap-4 relative overflow-hidden max-w-2xl shadow-sm">
                              <div className="space-y-3 flex-1">
                                <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider font-sans border-b border-neutral-200 dark:border-neutral-800/60 pb-2 mb-3">TICKK TELEMETRY INJECTED</div>
                                <p className="text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                                  This is the invisible mechanism behind your email tracking. A transparent 1x1 pixel is seamlessly embedded within the email body, allowing Tickk to instantly monitor opens and engagement without alerting the recipient.
                                </p>
                                <div className="pt-2">
                                  <code className="text-[12px] text-neutral-500 dark:text-neutral-500 font-mono bg-neutral-100 dark:bg-[#1f1f22] px-3 py-2 rounded block truncate">
                                    &lt;img src="********" width="1" height="1" alt="" /&gt;
                                  </code>
                                </div>
                              </div>
                            </div>"""

new_pixel_gmail = """{/* Secret pixel */}
                            <div className="mt-12 ml-12 p-5 bg-neutral-50 dark:bg-[#161618] border border-neutral-200 dark:border-neutral-800/60 rounded-xl flex items-start gap-4 relative overflow-hidden max-w-2xl shadow-sm">
                              <div className="space-y-3 flex-1">
                                <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider font-sans border-b border-neutral-200 dark:border-neutral-800/60 pb-2 mb-3">TICKK TELEMETRY INJECTED</div>
                                <p className="text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                                  This is the invisible mechanism behind your email tracking. A transparent 1x1 pixel is seamlessly embedded within the email body, allowing Tickk to instantly monitor opens and engagement without alerting the recipient.
                                </p>
                                <div className="pt-2">
                                  <code className="text-[12px] text-neutral-500 dark:text-neutral-500 font-mono bg-neutral-100 dark:bg-[#1f1f22] px-3 py-2 rounded block truncate">
                                    &lt;img src="********" width="1" height="1" alt="" /&gt;
                                  </code>
                                </div>
                              </div>
                            </div>"""

code = code.replace(pixel_target, new_pixel_outlook)
code = code.replace(pixel_target_gmail, new_pixel_gmail)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(code)
