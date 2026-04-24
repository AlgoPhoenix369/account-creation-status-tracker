import React, { useState } from 'react';
import { Plus, Trash2, Globe, FileUp, Users, X } from 'lucide-react';

const AdminPanel = ({ 
  platforms, 
  addPlatform, 
  deletePlatform,
  taskers,
  addTasker,
  deleteTasker
}) => {
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newTaskerName, setNewTaskerName] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [bulkTaskerText, setBulkTaskerText] = useState('');
  const [showBulk, setShowBulk] = useState(false);
  const [showBulkTasker, setShowBulkTasker] = useState(false);

  const handleAddPlatform = async (e) => {
    e.preventDefault();
    if (newName && newUrl) {
      await addPlatform(newName, newUrl);
      setNewName('');
      setNewUrl('');
    }
  };

  const handleAddTasker = async (e) => {
    e.preventDefault();
    if (newTaskerName) {
      await addTasker(newTaskerName);
      setNewTaskerName('');
    }
  };

  const handleBulkImport = async () => {
    const names = bulkText.split('\n').map(n => n.trim()).filter(n => n !== '');
    const existingNames = platforms.map(p => p.name.toLowerCase());
    
    for (const name of names) {
      if (!existingNames.includes(name.toLowerCase())) {
        await addPlatform(name, `https://${name.toLowerCase().replace(/\s/g, '')}.com`);
      }
    }
    setBulkText('');
    setShowBulk(false);
  };

  const handleBulkTaskerImport = async () => {
    const names = bulkTaskerText.split('\n').map(n => n.trim()).filter(n => n !== '');
    const existingNames = taskers.map(t => t.name.toLowerCase());
    
    for (const name of names) {
      if (!existingNames.includes(name.toLowerCase())) {
        await addTasker(name);
      }
    }
    setBulkTaskerText('');
    setShowBulkTasker(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Add Platform Form */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Plus className="text-blue-500" />
            Add New Platform
          </h2>
          <form onSubmit={handleAddPlatform} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Platform Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Freelancer"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Website URL</label>
              <input
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg active:scale-[0.98]"
            >
              Register Platform
            </button>
          </form>
        </div>

        {/* Manage Taskers Section */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="text-emerald-500" />
              Manage Taskers
            </h2>
            <button 
              onClick={() => setShowBulkTasker(!showBulkTasker)}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium bg-blue-500/10 px-2 py-1 rounded"
            >
              {showBulkTasker ? 'Single Entry' : 'Bulk Import'}
            </button>
          </div>
          
          {showBulkTasker ? (
            <div className="flex-1 flex flex-col space-y-4">
              <p className="text-sm text-slate-400 italic">Paste names (one per line).</p>
              <textarea
                value={bulkTaskerText}
                onChange={(e) => setBulkTaskerText(e.target.value)}
                placeholder="John Doe&#10;Jane Smith&#10;Mike Wilson"
                className="flex-1 min-h-[120px] w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-mono text-sm"
              />
              <button
                onClick={handleBulkTaskerImport}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg active:scale-[0.98]"
              >
                Bulk Import Taskers
              </button>
            </div>
          ) : (
            <div className="flex flex-col flex-1">
              <form onSubmit={handleAddTasker} className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Add Single Tasker</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTaskerName}
                      onChange={(e) => setNewTaskerName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    />
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 rounded-lg transition-all shadow-lg active:scale-[0.98]"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </form>

              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                {taskers.map(tasker => (
                  <div key={tasker.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 group">
                    <span className="text-slate-200 font-medium">{tasker.name}</span>
                    <button
                      onClick={() => deleteTasker(tasker.id)}
                      className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bulk Import */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileUp className="text-purple-500" />
              Bulk Import
            </h2>
            <button 
              onClick={() => setShowBulk(!showBulk)}
              className="text-sm text-blue-400 hover:text-blue-300 font-medium"
            >
              {showBulk ? 'Hide' : 'Show Tool'}
            </button>
          </div>
          
          {showBulk ? (
            <div className="flex-1 flex flex-col space-y-4">
              <p className="text-sm text-slate-400 italic">Paste platform names (one per line). Default URLs will be generated.</p>
              <textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder="Guru&#10;Toptal&#10;PeoplePerHour"
                className="flex-1 min-h-[120px] w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all font-mono text-sm"
              />
              <button
                onClick={handleBulkImport}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg active:scale-[0.98]"
              >
                Import Platforms
              </button>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-lg">
               <p className="text-slate-500">Bulk import tool inactive</p>
            </div>
          )}
        </div>
      </div>

      {/* Platforms List */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Active Platforms ({platforms.length})</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 p-1">
          {platforms.map(platform => (
            <div key={platform.id} className="group flex items-center justify-between p-4 bg-slate-900 hover:bg-slate-800 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700">
                  <Globe className="text-slate-400 group-hover:text-blue-400" size={20} />
                </div>
                <div>
                  <h3 className="text-slate-200 font-semibold">{platform.name}</h3>
                  <p className="text-xs text-slate-500 truncate max-w-[150px]">{platform.url}</p>
                </div>
              </div>
              <button
                onClick={() => deletePlatform(platform.id)}
                className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
