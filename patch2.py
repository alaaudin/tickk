import sys
with open('src/components/Dashboard.tsx', 'r') as f:
    code = f.read()

import_target = 'import MobileSettingsPanel from "./MobileSettingsPanel";'
import_replacement = 'import MobileSettingsPanel from "./MobileSettingsPanel";\nimport DomainConfiguration from "./DomainConfiguration";'

submenu_target = """                                {
                                  id: "mobile",
                                  label: "Mobile App",
                                  icon: <Hre className="w-4 h-4" />,
                                },"""
submenu_replacement = """                                {
                                  id: "mobile",
                                  label: "Mobile App",
                                  icon: <Hre className="w-4 h-4" />,
                                },
                                {
                                  id: "domains",
                                  label: "Custom Domains",
                                  icon: <Globe className="w-4 h-4" />,
                                },"""

render_target = """                              {ti === "mobile" && (
                                <MobileSettingsPanel toast={s} />
                              )}"""
render_replacement = """                              {ti === "mobile" && (
                                <MobileSettingsPanel toast={s} />
                              )}
                              {ti === "domains" && (
                                <DomainConfiguration />
                              )}"""

if import_target in code and submenu_target in code and render_target in code:
    code = code.replace(import_target, import_replacement)
    code = code.replace(submenu_target, submenu_replacement)
    code = code.replace(render_target, render_replacement)
    with open('src/components/Dashboard.tsx', 'w') as f:
        f.write(code)
    print("Success")
else:
    if import_target not in code: print("import_target not found")
    if submenu_target not in code: print("submenu_target not found")
    if render_target not in code: print("render_target not found")
