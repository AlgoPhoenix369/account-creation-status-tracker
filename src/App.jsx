import React, { useState, useMemo } from 'react';
import { useTrackerData } from './hooks/useTrackerData';
import Login from './components/Login';
import TrackerTable from './components/TrackerTable';
import AdminPanel from './components/AdminPanel';
import { 
  Users, 
  Layers, 
  CheckCircle, 
  AlertCircle, 
  Settings, 
  Search,
  LogOut,
  LayoutDashboard,
  BarChart3,
  Shield
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toast, setToast] = useState(null);

  const handleLogin = (role) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const { 
    data, 
    loading, 
    error, 
    updateStatus: originalUpdateStatus, 
    updateNote: originalUpdateNote, 
    updateTasker: originalUpdateTasker,
    addPlatform: originalAddPlatform, 
    deletePlatform: originalDeletePlatform,
    addTasker: originalAddTasker,
    deleteTasker: originalDeleteTasker
  } = useTrackerData();

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Wrapped functions with toasts
  const updateStatus = async (personId, platformId, statusId) => {
    const success = await originalUpdateStatus(personId, platformId, statusId);
    if (success) showToast('Status updated successfully');
    else showToast('Failed to update status', 'error');
  };

  const updateTasker = async (personId, platformId, taskerId, index) => {
    const result = await originalUpdateTasker(personId, platformId, taskerId, index);
    if (result.success) showToast(`Tasker ${index} assigned successfully`);
    else showToast(result.error || 'Failed to assign tasker', 'error');
  };

  const addTasker = async (name) => {
    const success = await originalAddTasker(name);
    if (success) showToast(`Tasker "${name}" added`);
    else showToast('Failed to add tasker', 'error');
  };

  const deleteTasker = async (id) => {
    const success = await originalDeleteTasker(id);
    if (success) showToast('Tasker removed');
    else showToast('Failed to remove tasker', 'error');
  };

  const updateNote = async (personId, platformId, note) => {
    const success = await originalUpdateNote(personId, platformId, note);
    if (success) showToast('Note saved successfully');
    else showToast('Failed to save note', 'error');
  };

  const addPlatform = async (name, url) => {
    const success = await originalAddPlatform(name, url);
    if (success) showToast(`Platform "${name}" added`);
    else showToast('Failed to add platform', 'error');
  };

  const deletePlatform = async (id) => {
    const success = await originalDeletePlatform(id);
    if (success) showToast('Platform deleted');
    else showToast('Failed to delete platform', 'error');
  };

  // Statistics Calculation
  const stats = useMemo(() => {
    const totalPlatforms = data.platforms.length;
    const totalPeople = data.people.length;
    const totalPossible = totalPlatforms * totalPeople;
    const existingAccounts = data.account_statuses.length;
    
    const actionRequired = data.account_statuses.filter(s => s.status_id >= 1 && s.status_id <= 7).length;
    // Add "Not Created" for missing records
    const missingRecords = totalPossible - existingAccounts;
    const totalActionRequired = actionRequired + missingRecords;
    
    const readyOperating = data.account_statuses.filter(s => s.status_id >= 8).length;
    
    const completionPercentage = totalPossible > 0 
      ? Math.round((readyOperating / totalPossible) * 100) 
      : 0;

    // Detailed Breakdown per status
    const statusCounts = {};
    data.status_definitions.forEach(def => {
      let count = data.account_statuses.filter(s => s.status_id === def.id).length;
      if (def.id === 1) {
        // "Not created" includes records not in database
        count += missingRecords;
      }
      statusCounts[def.id] = count;
    });

    // Detailed Breakdown per person (Active accounts only)
    const personActiveCounts = data.people.map(person => {
      const count = data.account_statuses.filter(s => 
        s.person_id === person.id && s.status_id >= 8
      ).length;
      return { name: person.name, count };
    });

    return {
      totalPlatforms,
      totalPeople,
      totalAccounts: existingAccounts,
      totalActionRequired,
      readyOperating,
      completionPercentage,
      statusCounts,
      personActiveCounts
    };
  }, [data]);

  // Filtering
  const filteredData = useMemo(() => {
    let platforms = data.platforms;
    
    if (searchQuery) {
      platforms = platforms.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Status filter is complex in matrix view. 
    // We'll show platforms that have at least one person with that status if filter is active.
    if (statusFilter !== 'all') {
      const statusId = parseInt(statusFilter);
      platforms = platforms.filter(plat => 
        data.account_statuses.some(s => s.platform_id === plat.id && s.status_id === statusId)
      );
    }

    // Sort alphabetically
    platforms = [...platforms].sort((a, b) => a.name.localeCompare(b.name));

    return { ...data, platforms };
  }, [data, searchQuery, statusFilter]);


  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 animate-pulse">Initializing Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300 ${toast.type === 'error' ? 'bg-red-900 border border-red-700 text-white' : 'bg-slate-800 border border-slate-700 text-white'}`}>
          {toast.type === 'error' ? <AlertCircle size={20} className="text-red-400" /> : <CheckCircle size={20} className="text-emerald-400" />}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <LayoutDashboard className="text-white" size={20} />
          </div>
          <h1 className="font-bold text-lg tracking-tight">StatusTracker</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <BarChart3 size={20} />
            <span>Overview</span>
          </button>
          {userRole === 'admin' && (
            <button 
              onClick={() => setActiveTab('admin')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'admin' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <Shield size={20} />
              <span>Admin Panel</span>
            </button>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'dashboard' ? (
            <div className="space-y-8 max-w-7xl mx-auto">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <Layers className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Platforms</p>
                    <p className="text-xl font-bold">{stats.totalPlatforms}</p>
                  </div>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-4">
                  <div className="p-3 bg-indigo-500/10 rounded-xl">
                    <Users className="text-indigo-500" size={20} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">People</p>
                    <p className="text-xl font-bold">{stats.totalPeople}</p>
                  </div>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-xl">
                    <CheckCircle className="text-cyan-500" size={20} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Accounts</p>
                    <p className="text-xl font-bold">{stats.totalAccounts}</p>
                  </div>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-4">
                  <div className="p-3 bg-orange-500/10 rounded-xl">
                    <AlertCircle className="text-orange-500" size={20} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Action Req.</p>
                    <p className="text-xl font-bold">{stats.totalActionRequired}</p>
                  </div>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-xl">
                    <CheckCircle className="text-emerald-500" size={20} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Ready</p>
                    <p className="text-xl font-bold">{stats.readyOperating}</p>
                  </div>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-xl">
                    <div className="text-purple-500 font-bold text-lg">{stats.completionPercentage}%</div>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Completion</p>
                    <div className="w-16 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 transition-all duration-1000" 
                        style={{ width: `${stats.completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Stats Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Status breakdown */}
                <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <BarChart3 size={16} className="text-blue-500" />
                    Count Per Status Stage
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {data.status_definitions.map(def => (
                      <div key={def.id} className="flex flex-col items-center p-3 rounded-xl bg-slate-950 border border-slate-800/50">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold mb-2 ${def.class}`}>
                          {def.id}
                        </div>
                        <span className="text-xl font-bold text-white">{stats.statusCounts[def.id]}</span>
                        <span className="text-[10px] text-slate-500 text-center leading-tight mt-1 truncate w-full" title={def.label}>
                          {def.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Per-person active counts */}
                <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Users size={16} className="text-emerald-500" />
                    Active Accounts Per Person
                  </h3>
                  <div className="space-y-3">
                    {stats.personActiveCounts.map(person => (
                      <div key={person.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/50">
                        <span className="text-slate-300 font-medium">{person.name}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                            <div 
                              className="h-full bg-emerald-500 transition-all duration-1000" 
                              style={{ width: `${(person.count / data.platforms.length) * 100}%` }}
                            ></div>
                          </div>
                          <span className="bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full text-sm font-bold">
                            {person.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                 <div className="flex items-center gap-4">
                   <span className="text-sm font-medium text-slate-400">Filter by Status:</span>
                   <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="all">All Statuses</option>
                    {data.status_definitions.map(def => (
                      <option key={def.id} value={def.id}>{def.label}</option>
                    ))}
                  </select>
                 </div>
                 <div className="text-xs text-slate-500">
                   Showing {filteredData.platforms.length} of {data.platforms.length} platforms
                 </div>
              </div>

              {/* Matrix Table */}
              <section>
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-lg font-semibold text-slate-300">Account Matrix</h3>
                   <span className="text-xs text-slate-500 italic">Sticky headers enabled</span>
                </div>
                <TrackerTable 
                  data={filteredData} 
                  updateStatus={updateStatus} 
                  updateTasker={updateTasker}
                  updateNote={updateNote} 
                />
              </section>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
               <AdminPanel 
                platforms={data.platforms} 
                addPlatform={addPlatform} 
                deletePlatform={deletePlatform} 
                taskers={data.taskers}
                addTasker={addTasker}
                deleteTasker={deleteTasker}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
