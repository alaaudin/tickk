import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Save, AlertTriangle, ShieldAlert, SlidersHorizontal, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export function NotificationSettingsPanel({ toast }: { toast: (message: string, type: 'success' | 'error') => void }) {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [thresholds, setThresholds] = useState([
    { id: '1', name: 'High Volume Opens', type: 'opens', value: 500, active: true },
    { id: '2', name: 'Rapid Clicks Detection', type: 'clicks', value: 100, active: false }
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast("Notification preferences & thresholds updated securely.", "success");
    }, 1200);
  };

  const removeThreshold = (id: string) => {
    setThresholds(thresholds.filter(t => t.id !== id));
  };

  const addThreshold = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setThresholds([...thresholds, { id: newId, name: 'New Alert Rule', type: 'opens', value: 1000, active: true }]);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl pb-20">
      <div>
        <h2 className="text-2xl font-light font-display text-neutral-900 dark:text-white tracking-tight">Notification & Alert Thresholds</h2>
        <p className="text-xs text-zinc-500 mt-1">Configure automated dispatch warnings and tracking thresholds across your organization.</p>
      </div>

      <div className="bg-white/10 dark:bg-[#111111]/60 backdrop-blur-3xl border border-neutral-200/50 dark:border-white/10 rounded-[22px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6 relative z-10 border-b border-neutral-100 dark:border-zinc-800/50 pb-4">
          <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center border border-neutral-200 dark:border-white/10">
            <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">Global Delivery Channels</h3>
            <p className="text-[11px] font-mono text-neutral-500 dark:text-zinc-400 mt-0.5">WHERE TO ROUTE CRITICAL SYSTEM EVENTS</p>
          </div>
        </div>

        <div className="space-y-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-neutral-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">Email Notifications</p>
                <p className="text-xs text-neutral-500 mt-0.5">Receive immediate email alerts for high-priority events.</p>
              </div>
            </div>
            <button 
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${emailAlerts ? 'bg-indigo-500' : 'bg-neutral-200 dark:bg-zinc-800'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${emailAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Smartphone className="w-4 h-4 text-neutral-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">In-App System Alerts</p>
                <p className="text-xs text-neutral-500 mt-0.5">Display push notifications inside the application dashboard.</p>
              </div>
            </div>
            <button 
              onClick={() => setSystemAlerts(!systemAlerts)}
              className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${systemAlerts ? 'bg-indigo-500' : 'bg-neutral-200 dark:bg-zinc-800'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${systemAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white/10 dark:bg-[#111111]/60 backdrop-blur-3xl border border-neutral-200/50 dark:border-white/10 rounded-[22px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="flex items-center justify-between mb-6 relative z-10 border-b border-neutral-100 dark:border-zinc-800/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center border border-neutral-200 dark:border-white/10">
              <SlidersHorizontal className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">Custom Thresholds</h3>
              <p className="text-[11px] font-mono text-neutral-500 dark:text-zinc-400 mt-0.5">TRIGGER ALERTS ON VOLUME SPIKES</p>
            </div>
          </div>
          <button 
            onClick={addThreshold}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-900 dark:text-white flex items-center justify-center transition-colors border border-neutral-200 dark:border-white/10"
            title="Add Threshold"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 relative z-10">
          {thresholds.map((threshold) => (
            <div key={threshold.id} className="p-4 rounded-xl border border-neutral-200 dark:border-white/5 bg-neutral-50 dark:bg-black/20 flex flex-col sm:flex-row sm:items-center gap-4 transition-all hover:border-neutral-300 dark:hover:border-white/10">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className={`w-4 h-4 ${threshold.active ? 'text-amber-500' : 'text-neutral-400'}`} />
                  <input 
                    type="text" 
                    value={threshold.name} 
                    onChange={(e) => setThresholds(thresholds.map(t => t.id === threshold.id ? {...t, name: e.target.value} : t))}
                    className="bg-transparent border-none focus:outline-none text-sm font-medium text-neutral-900 dark:text-white w-full max-w-[200px]"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-zinc-400 font-mono">
                  <span>Trigger when</span>
                  <select 
                    value={threshold.type}
                    onChange={(e) => setThresholds(thresholds.map(t => t.id === threshold.id ? {...t, type: e.target.value} : t))}
                    className="bg-neutral-200 dark:bg-white/5 border border-neutral-300 dark:border-white/10 rounded px-2 py-1 focus:outline-none"
                  >
                    <option value="opens">Opens</option>
                    <option value="clicks">Clicks</option>
                  </select>
                  <span>reach</span>
                  <input 
                    type="number" 
                    value={threshold.value}
                    onChange={(e) => setThresholds(thresholds.map(t => t.id === threshold.id ? {...t, value: parseInt(e.target.value) || 0} : t))}
                    className="bg-neutral-200 dark:bg-white/5 border border-neutral-300 dark:border-white/10 rounded px-2 py-1 w-20 text-center focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 sm:border-l border-neutral-200 dark:border-zinc-800/50 sm:pl-4 pt-4 sm:pt-0 border-t sm:border-t-0">
                <button 
                  onClick={() => setThresholds(thresholds.map(t => t.id === threshold.id ? {...t, active: !t.active} : t))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${threshold.active ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-neutral-200 dark:bg-white/5 text-neutral-500'}`}
                >
                  {threshold.active ? 'Active' : 'Paused'}
                </button>
                <button 
                  onClick={() => removeThreshold(threshold.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {thresholds.length === 0 && (
            <div className="py-8 text-center border border-dashed border-neutral-300 dark:border-zinc-800 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm text-neutral-500 dark:text-zinc-400">No active thresholds configured.</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-white text-black hover:bg-neutral-200 text-sm font-semibold px-6 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center gap-2 disabled:opacity-70"
        >
          {isSaving ? (
            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? "Synchronizing..." : "Save Preferences"}
        </button>
      </div>
    </div>
  );
}
