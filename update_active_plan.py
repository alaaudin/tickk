import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

old_desc = 'Your smart decision to configure the **Growth Core Pipeline** grants you unthrottled access to premium features: instant webhook callbacks, custom white-label DNS routing, and {userCredits} tracked dispatches monthly. Your outbound communication is cryptographically protected and optimized for flawless corporate engagement.'
new_desc = 'Your smart decision to configure the {renderPlanBadge(activePlan)} grants you unthrottled access to premium features: instant webhook callbacks, custom white-label DNS routing, and {userCredits} tracked dispatches monthly. Your outbound communication is cryptographically protected and optimized for flawless corporate engagement.'
content = content.replace(old_desc, new_desc)

# We need to find the plan cards and add conditionally Currently Active if activePlan matches.
# But right now, the `Currently Active` badge is hardcoded to Growth Core Access.
old_badge = """                            {/* Featured Badge */}
                            <div className="absolute top-0 right-0 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold text-[8px] uppercase tracking-widest px-3.5 py-1.5 rounded-bl font-mono">
                              Currently Active
                            </div>"""

# Remove old badge
content = content.replace(old_badge, "")

# Add conditionally
def inject_badge(plan_name, content_str):
    search_str = f'<h4 className="text-lg font-medium font-display text-neutral-900 dark:text-white mt-1 flex items-center gap-2">{plan_name}'
    if plan_name == "Growth Core Access":
        search_str = f'<h4 className="text-lg font-semibold font-display text-neutral-900 dark:text-white mt-1 flex items-center gap-2">{plan_name}'
    
    badge_logic = f"""                            {{activePlan === "{plan_name}" && (
                              <div className="absolute top-0 right-0 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold text-[8px] uppercase tracking-widest px-3.5 py-1.5 rounded-bl font-mono z-20">
                                Currently Active
                              </div>
                            )}}
                            """
                            
    idx = content_str.find(search_str)
    if idx != -1:
        # Go up to the opening div of this card content
        target_str = '<div className="space-y-4">'
        space_y_idx = content_str.rfind(target_str, 0, idx)
        if space_y_idx != -1:
            content_str = content_str[:space_y_idx] + badge_logic + content_str[space_y_idx:]
    return content_str

content = inject_badge("Telemetry Starter", content)
content = inject_badge("Growth Core Access", content)
content = inject_badge("Quantum Sentinel", content)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)

