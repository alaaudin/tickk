import re

with open("src/components/Dashboard.tsx", "r") as f:
    content = f.read()

# 1. Add import for GlobalReachMap
import_find = r'''import \{
  Activity,'''
import_repl = r'''import GlobalReachMap from "./GlobalReachMap";
import {
  Activity,'''
content = content.replace(import_find, import_repl)

# 2. Add the map in the overview tab
map_find = r'''                    <\/div>
                  <\/div>
                \)\}'''

map_repl = r'''                    </div>
                    
                    {/* GLOBAL REACH MAP WIDGET */}
                    <div className="pt-4">
                      <GlobalReachMap activityCount={activitiesList.length} />
                    </div>
                  </div>
                )}'''
content = re.sub(map_find, map_repl, content)

with open("src/components/Dashboard.tsx", "w") as f:
    f.write(content)
