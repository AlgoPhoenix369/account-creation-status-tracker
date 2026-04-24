import React, { useState } from 'react';
import { ExternalLink, MessageSquare, X } from 'lucide-react';

const TrackerTable = ({ data, updateStatus, updateNote, updateTasker }) => {
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState('');
  const tableContainerRef = React.useRef(null);
  const topScrollRef = React.useRef(null);

  // Sync top scrollbar with table scrollbar
  const handleTopScroll = () => {
    if (tableContainerRef.current && topScrollRef.current) {
      tableContainerRef.current.scrollLeft = topScrollRef.current.scrollLeft;
    }
  };

  const handleTableScroll = () => {
    if (tableContainerRef.current && topScrollRef.current) {
      topScrollRef.current.scrollLeft = tableContainerRef.current.scrollLeft;
    }
  };

  const getStatus = (personId, platformId) => {
    return data.account_statuses.find(
      s => s.person_id === personId && s.platform_id === platformId
    );
  };

  const handleOpenNote = (personId, platformId) => {
    const status = getStatus(personId, platformId);
    setEditingNote({ personId, platformId });
    setNoteText(status?.notes || '');
  };

  const handleSaveNote = async () => {
    if (editingNote) {
      await updateNote(editingNote.personId, editingNote.platformId, noteText);
      setEditingNote(null);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Top Scrollbar Mirror */}
      <div 
        ref={topScrollRef}
        onScroll={handleTopScroll}
        className="overflow-x-auto h-4 mb-1 custom-scrollbar"
      >
        <div style={{ width: `${200 + (data.people.length * 200)}px` }} className="h-px"></div>
      </div>

      <div 
        ref={tableContainerRef}
        onScroll={handleTableScroll}
        className="overflow-auto max-h-[75vh] rounded-xl border border-slate-800 shadow-2xl relative custom-scrollbar"
      >
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 shadow-lg">
          <tr className="bg-slate-900">
            <th className="p-4 sticky left-0 z-40 bg-slate-900 min-w-[200px] text-slate-400 font-semibold uppercase text-xs border-r border-slate-800">
              Platform
            </th>
            {data.people.map(person => (
              <th key={person.id} className="p-4 text-slate-400 font-semibold uppercase text-xs min-w-[150px] text-center">
                {person.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.platforms.map(platform => (
            <tr key={platform.id} className="border-b border-slate-800 hover:bg-slate-900/50 transition-colors">
              <td className="p-4 sticky left-0 z-10 bg-slate-900 border-r border-slate-800">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between group">
                    <span className="font-medium text-slate-200">{platform.name}</span>
                    <a 
                      href={platform.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-1.5 hover:bg-slate-700 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ExternalLink size={14} className="text-blue-400" />
                    </a>
                  </div>
                  
                  {/* Assigned Taskers list */}
                  <div className="flex flex-wrap gap-1">
                    {Array.from(new Set(
                      data.account_statuses
                        .filter(s => s.platform_id === platform.id)
                        .flatMap(s => [s.tasker_id_1, s.tasker_id_2])
                        .map(id => data.taskers.find(t => t.id === id)?.name)
                        .filter(Boolean)
                    )).map(taskerName => (
                      <span key={taskerName} className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                        {taskerName}
                      </span>
                    ))}
                  </div>
                </div>
              </td>
              {data.people.map(person => {
                const status = getStatus(person.id, platform.id);
                const statusDef = data.status_definitions.find(d => d.id === (status?.status_id || 1));
                
                return (
                  <td key={person.id} className="p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <select
                          value={status?.status_id || 1}
                          onChange={(e) => updateStatus(person.id, platform.id, parseInt(e.target.value))}
                          className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all ${statusDef?.class || 'bg-slate-800'}`}
                        >
                          {data.status_definitions.map(def => (
                            <option key={def.id} value={def.id} className="bg-slate-800 text-white">
                              {def.label}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleOpenNote(person.id, platform.id)}
                          className={`p-1.5 rounded-md hover:bg-slate-700 transition-colors ${status?.notes ? 'text-blue-400' : 'text-slate-500'}`}
                          title={status?.notes || 'Add note'}
                        >
                          <MessageSquare size={16} />
                        </button>
                      </div>
                      
                      {/* Tasker Selection - Stacked with Labels */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <span className="text-[8px] font-bold text-slate-500 w-4">T1</span>
                          <select
                            value={status?.tasker_id_1 || ''}
                            onChange={(e) => updateTasker(person.id, platform.id, e.target.value === '' ? null : parseInt(e.target.value), 1)}
                            className="flex-1 px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[9px] text-slate-300 focus:ring-1 focus:ring-blue-500 outline-none"
                          >
                            <option value="">(None)</option>
                            {data.taskers.map(t => (
                              <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[8px] font-bold text-slate-500 w-4">T2</span>
                          <select
                            value={status?.tasker_id_2 || ''}
                            onChange={(e) => updateTasker(person.id, platform.id, e.target.value === '' ? null : parseInt(e.target.value), 2)}
                            className="flex-1 px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[9px] text-slate-300 focus:ring-1 focus:ring-blue-500 outline-none"
                          >
                            <option value="">(None)</option>
                            {data.taskers.map(t => (
                              <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Note Modal */}
      {editingNote && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <MessageSquare className="text-blue-400" size={20} />
                Edit Notes
              </h3>
              <button onClick={() => setEditingNote(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-400 mb-3 uppercase tracking-wider font-semibold">
                {data.platforms.find(p => p.id === editingNote.platformId)?.name} / {data.people.find(p => p.id === editingNote.personId)?.name}
              </p>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Enter status details, login info, or issues..."
                className="w-full h-40 bg-slate-800 border border-slate-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
              />
            </div>
            <div className="p-4 bg-slate-800/50 flex justify-end gap-3">
              <button
                onClick={() => setEditingNote(null)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default TrackerTable;
