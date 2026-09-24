
import React, { useState } from 'react';
import { UserProfile, Profession } from '../types';
import { PROFESSIONS } from '../constants.tsx';

interface SettingsProps {
  user: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

export const Settings: React.FC<SettingsProps> = ({ user, onUpdate }) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editData, setEditData] = useState<UserProfile>(user);

  const handleSave = () => {
    onUpdate(editData);
    setEditingSection(null);
  };

  const inputClasses = "w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 outline-none transition-all dark:text-white dark:placeholder:text-neutral-600";

  const Section = ({ title, id, children }: { title: string, id: string, children?: React.ReactNode }) => (
    <div className="bg-white dark:bg-[#121212] rounded-[2rem] border border-neutral-100 dark:border-neutral-800 p-8 space-y-6 relative overflow-hidden transition-colors duration-200 shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 tracking-widest uppercase">{title}</h3>
        <button 
          onClick={() => {
            setEditData(user);
            setEditingSection(editingSection === id ? null : id);
          }}
          className="text-[10px] font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 tracking-widest uppercase transition-all"
        >
          {editingSection === id ? 'Cancel' : 'Edit'}
        </button>
      </div>
      <div className="space-y-4">
        {children}
      </div>
      {editingSection === id && (
        <div className="pt-6 border-t border-neutral-50 dark:border-neutral-800 flex justify-end gap-3 animate-in">
          <button 
            onClick={() => setEditingSection(null)}
            className="px-5 py-2 text-[10px] font-bold tracking-widest uppercase text-neutral-400 hover:text-neutral-600 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl text-[10px] font-bold tracking-widest uppercase hover:opacity-90 transition-all shadow-lg"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full bg-neutral-50 dark:bg-[#0a0a0a] overflow-y-auto p-12 transition-colors duration-200">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="space-y-2">
          <h1 className="text-4xl font-light text-neutral-900 dark:text-white tracking-tighter">Account Settings</h1>
          <p className="text-sm text-neutral-500 font-light">Manage your identity and preference within the collective.</p>
        </header>

        <div className="space-y-8 pb-12">
          {/* Identity Section */}
          <Section title="Identity & Craft" id="identity">
            {editingSection === 'identity' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    value={editData.name} 
                    onChange={e => setEditData({...editData, name: e.target.value})}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest ml-1">Alias</label>
                  <input 
                    type="text" 
                    value={editData.alias} 
                    onChange={e => setEditData({...editData, alias: e.target.value})}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest ml-1">Profession</label>
                  <select 
                    value={editData.profession}
                    onChange={e => setEditData({...editData, profession: e.target.value as Profession})}
                    className={`${inputClasses} appearance-none cursor-pointer`}
                  >
                    {PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest ml-1">Location</label>
                  <input 
                    type="text" 
                    value={editData.country} 
                    onChange={e => setEditData({...editData, country: e.target.value})}
                    className={inputClasses}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-8">
                 <div>
                    <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1">Full Name</p>
                    <p className="text-sm font-medium dark:text-white">{user.name}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1">Alias</p>
                    <p className="text-sm font-medium dark:text-white">@{user.alias}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1">Profession</p>
                    <p className="text-sm font-medium dark:text-white">{user.profession}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1">Location</p>
                    <p className="text-sm font-medium dark:text-white">{user.country}</p>
                 </div>
              </div>
            )}
          </Section>

          {/* Bio Section */}
          <Section title="Manifesto & Bio" id="bio">
            {editingSection === 'bio' ? (
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest ml-1">Your Story</label>
                 <textarea 
                    value={editData.bio}
                    onChange={e => setEditData({...editData, bio: e.target.value})}
                    className={`${inputClasses} h-32 resize-none`}
                    placeholder="Tell the network about your goals..."
                 />
              </div>
            ) : (
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed italic">
                "{user.bio || "No manifesto written yet."}"
              </p>
            )}
          </Section>

          {/* Visibility Section */}
          <div className="bg-white dark:bg-[#121212] rounded-[2rem] border border-neutral-100 dark:border-neutral-800 p-8 flex items-center justify-between transition-colors duration-200 shadow-sm">
            <div className="space-y-1">
              <h3 className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 tracking-widest uppercase">Visibility</h3>
              <p className="text-sm text-neutral-800 dark:text-white font-medium">Allow others to match with me</p>
            </div>
            <button 
              onClick={() => onUpdate({...user, is_matchable: !user.is_matchable})}
              className={`w-12 h-6 rounded-full transition-all relative ${user.is_matchable ? 'bg-teal-500' : 'bg-neutral-200 dark:bg-neutral-800'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${user.is_matchable ? 'left-7' : 'left-1 shadow-sm'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
