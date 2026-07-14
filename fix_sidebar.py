import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# Add PanelLeftClose and PanelLeftOpen to lucide-react imports
content = content.replace('Menu,', 'Menu, PanelLeftClose, PanelLeftOpen,')

# 1. Add state for isSidebarCollapsed
state_old = "  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);"
state_new = "  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);\n  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);"
content = content.replace(state_old, state_new)

# 2. Update Aside classes
old_aside = '<aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-zinc-900 bg-white dark:bg-[#050506] flex flex-col shrink-0 justify-between transition-colors duration-300 z-10">'
new_aside = '<aside className={`border-b md:border-b-0 md:border-r border-neutral-200 dark:border-zinc-900 bg-white dark:bg-[#050506] flex flex-col shrink-0 justify-between transition-all duration-500 z-10 ${isSidebarCollapsed ? "w-full md:w-20" : "w-full md:w-64"}`}>'
content = content.replace(old_aside, new_aside)

# 3. Add toggle button next to TICKK logo
old_header = """          <div className="p-6 border-b border-neutral-200 dark:border-zinc-900 flex items-center justify-between">
            <span className="font-light text-sm tracking-[0.25em] text-neutral-900 dark:text-white flex items-center gap-2 select-none">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" />
              TICKK
            </span>
            <button 
              onClick={handleManualRefresh}
              className={`p-1.5 hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded transition-all cursor-pointer ${isRefreshing ? "animate-spin text-neutral-900 dark:text-white" : "text-zinc-500 hover:text-neutral-900 dark:hover:text-white"}`}
              title="Sync telemetry data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>"""

new_header = """          <div className={`p-6 border-b border-neutral-200 dark:border-zinc-900 flex items-center ${isSidebarCollapsed ? "justify-center" : "justify-between"} transition-all duration-500`}>
            {!isSidebarCollapsed && (
              <span className="font-light text-sm tracking-[0.25em] text-neutral-900 dark:text-white flex items-center gap-2 select-none overflow-hidden whitespace-nowrap">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse shrink-0" />
                TICKK
              </span>
            )}
            <div className={`flex items-center gap-2 ${isSidebarCollapsed ? "flex-col" : ""}`}>
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-1.5 text-zinc-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded transition-all cursor-pointer"
                title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {isSidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
              </button>
              {!isSidebarCollapsed && (
                <button 
                  onClick={handleManualRefresh}
                  className={`p-1.5 hover:bg-neutral-100 dark:hover:bg-zinc-900/60 rounded transition-all cursor-pointer ${isRefreshing ? "animate-spin text-neutral-900 dark:text-white" : "text-zinc-500 hover:text-neutral-900 dark:hover:text-white"}`}
                  title="Sync telemetry data"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>"""
content = content.replace(old_header, new_header)

# 4. Update the tab mapping logic
old_map = """            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  id={`sidebar-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full px-4 py-2.5 text-xs font-normal tracking-wide flex items-center gap-3 rounded-lg transition-all border cursor-pointer ${
                    isActive 
                      ? "bg-neutral-100 dark:bg-zinc-900/40 text-neutral-900 dark:text-white border-neutral-200 dark:border-zinc-800/65 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]" 
                      : "text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:text-white dark:hover:bg-zinc-900/20 border-transparent"
                  }`}
                >
                  <span className={isActive ? "text-neutral-900 dark:text-white" : "text-zinc-500"}>{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })"""

new_map = """            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  id={`sidebar-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`group w-full ${isSidebarCollapsed ? "px-0 justify-center py-3" : "px-4 py-2.5"} text-xs font-normal tracking-wide flex items-center gap-3 rounded-lg transition-all border cursor-pointer overflow-hidden relative ${
                    isActive 
                      ? "bg-neutral-100 dark:bg-zinc-900/40 text-neutral-900 dark:text-white border-neutral-200 dark:border-zinc-800/65 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]" 
                      : "text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:text-white dark:hover:bg-zinc-900/20 border-transparent"
                  }`}
                  title={isSidebarCollapsed ? tab.label : undefined}
                >
                  <span className={`relative flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-[1.2] group-hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] ${isActive ? "text-neutral-900 dark:text-white scale-110" : "text-zinc-500"}`}>
                    {tab.icon}
                  </span>
                  {!isSidebarCollapsed && (
                    <span className="truncate transition-opacity duration-300 relative z-10 group-hover:translate-x-0.5 transition-transform">{tab.label}</span>
                  )}
                </button>
              );
            })"""
content = content.replace(old_map, new_map)

# 5. User profile at bottom when collapsed
old_user = """        {/* User Card & Logout */}
        <div className="p-4 border-t border-neutral-200 dark:border-zinc-900 bg-neutral-50/50 dark:bg-[#050506]/50">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex items-center justify-center text-xs text-neutral-900 dark:text-white font-mono font-normal uppercase">
              {fullName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-neutral-800 dark:text-zinc-300 truncate font-normal">{renderNameWithBadge(fullName, activePlan)}</p>
              <p className="text-[10px] text-neutral-500 dark:text-zinc-500 truncate font-normal">{corporateEmail}</p>
            </div>
          </div>
          <button 
            id="logout-btn"
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-lg text-xs font-semibold text-neutral-700 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5 text-zinc-500" />
            Log out of dashboard
          </button>
        </div>"""

new_user = """        {/* User Card & Logout */}
        <div className={`p-4 border-t border-neutral-200 dark:border-zinc-900 bg-neutral-50/50 dark:bg-[#050506]/50 ${isSidebarCollapsed ? "flex flex-col items-center gap-4" : ""}`}>
          <div className={`flex items-center gap-2.5 ${isSidebarCollapsed ? "justify-center" : "mb-4"}`}>
            <div className="w-8 h-8 shrink-0 rounded-full bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex items-center justify-center text-xs text-neutral-900 dark:text-white font-mono font-normal uppercase group relative cursor-pointer" title={isSidebarCollapsed ? fullName : undefined}>
              <span className="transition-transform duration-500 group-hover:scale-110">{fullName.charAt(0)}</span>
            </div>
            {!isSidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs text-neutral-800 dark:text-zinc-300 truncate font-normal">{renderNameWithBadge(fullName, activePlan)}</p>
                <p className="text-[10px] text-neutral-500 dark:text-zinc-500 truncate font-normal">{corporateEmail}</p>
              </div>
            )}
          </div>
          <button 
            id="logout-btn"
            onClick={onLogout}
            title={isSidebarCollapsed ? "Log out" : undefined}
            className={`flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900/50 border border-neutral-200 dark:border-zinc-800 rounded-lg text-xs font-semibold text-neutral-700 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm group ${isSidebarCollapsed ? "w-10 h-10 px-0 rounded-xl" : "w-full"}`}
          >
            <LogOut className={`w-3.5 h-3.5 text-zinc-500 group-hover:text-red-500 transition-colors duration-300 ${isSidebarCollapsed ? "scale-110" : ""}`} />
            {!isSidebarCollapsed && <span>Log out of dashboard</span>}
          </button>
        </div>"""
content = content.replace(old_user, new_user)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)

