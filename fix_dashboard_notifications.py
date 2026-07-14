with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# Add import
import_target = 'import { QuickStartGuide } from "./QuickStartGuide";'
import_replacement = 'import { QuickStartGuide } from "./QuickStartGuide";\nimport { NotificationSettingsPanel } from "./NotificationSettingsPanel";'
content = content.replace(import_target, import_replacement, 1)

# Add panel logic
panel_target = """                              {ti === "privacy" && (
                                <PrivacySettingsPanel toast={s} />
                              )}"""
panel_replacement = """                              {ti === "notifications" && (
                                <NotificationSettingsPanel toast={s} />
                              )}
                              {ti === "privacy" && (
                                <PrivacySettingsPanel toast={s} />
                              )}"""
content = content.replace(panel_target, panel_replacement, 1)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
