import React, { useState } from 'react';
import { Users, UserPlus, MoreHorizontal } from 'lucide-react';

export function TeamMembersSettingsPanel({ toast }: { toast: (message: string, type: 'success' | 'error') => void }) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const handleInvite = () => {
    if (!inviteEmail) return;
    setIsInviting(true);
    setTimeout(() => {
      setIsInviting(false);
      toast(`Invitation sent to ${inviteEmail}`, "success");
      setInviteEmail('');
    }, 1000);
  };

  const members = [
    { id: 1, name: 'John Doe', email: 'admin@company.com', role: 'Owner', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'Admin', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'Member', status: 'Pending' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl pb-20">
      <div>
        <h2 className="text-2xl font-light font-display text-neutral-900 dark:text-white tracking-tight">Team Management</h2>
        <p className="text-xs text-zinc-500 mt-1 font-sans">Manage your team members and their access permissions.</p>
      </div>

      <div className="bg-white/10 dark:bg-[#111111]/60 backdrop-blur-3xl border border-neutral-200/50 dark:border-white/10 rounded-[22px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10 border-b border-neutral-100 dark:border-zinc-800/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-indigo-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white font-display">Active Members</h3>
              <p className="text-[11px] text-zinc-500 font-sans mt-0.5">3 of 10 seats used</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input 
              type="email" 
              placeholder="colleague@company.com" 
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              className="flex-1 md:w-48 bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-zinc-800 text-xs rounded-lg px-3 py-2 text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-900 dark:focus:border-zinc-400 transition-colors font-mono" 
            />
            <button 
              onClick={handleInvite}
              disabled={isInviting || !inviteEmail}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all font-sans disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              {isInviting ? (
                <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <UserPlus className="w-3.5 h-3.5" />
              )}
              Invite
            </button>
          </div>
        </div>

        <div className="relative z-10 overflow-hidden rounded-xl border border-neutral-200 dark:border-zinc-800 shadow-sm">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-neutral-100 dark:bg-zinc-900/50 text-neutral-700 dark:text-zinc-400">
              <tr>
                <th className="px-5 py-3 font-semibold">User</th>
                <th className="px-5 py-3 font-semibold">Role</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/50 dark:bg-[#111111]/50 divide-y divide-neutral-100 dark:divide-zinc-800/50">
              {members.map(member => (
                <tr key={member.id} className="hover:bg-neutral-50 dark:hover:bg-zinc-900/30 transition-colors">
                  <td className="px-5 py-3">
                    <div className="font-semibold text-neutral-900 dark:text-white">{member.name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{member.email}</div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-1 bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300 rounded text-[10px] font-semibold tracking-wide">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`flex items-center gap-1.5 text-[11px] font-medium ${member.status === 'Active' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                      {member.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="p-1.5 text-zinc-400 hover:text-neutral-900 dark:hover:text-white rounded-md hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
