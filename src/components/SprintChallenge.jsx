import React, { useMemo, useState } from 'react';
import { 
  Trophy, 
  Target, 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronRight, 
  TrendingUp,
  Zap,
  Flame,
  Star,
  Quote,
  BarChart,
  PieChart as PieChartIcon,
  AlertTriangle,
  CheckCircle2,
  CalendarDays,
  Rocket
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';

const SprintChallenge = ({ data }) => {
  const [skippedDays, setSkippedDays] = useState([]);
  
  const sprintDays = [
    { date: '2026-04-25', label: 'Day 1' },
    { date: '2026-04-26', label: 'Day 2' },
    { date: '2026-04-27', label: 'Day 3' },
    { date: '2026-04-28', label: 'Day 4' },
    { date: '2026-04-29', label: 'Day 5' },
    { date: '2026-04-30', label: 'Day 6' },
    { date: '2026-05-01', label: 'Day 7' }
  ];

  const SPRINT_END = new Date('2026-05-01T23:59:59');

  const stats = useMemo(() => {
    const totalPossible = data.platforms.length * data.people.length;
    const operational = data.account_statuses.filter(s => s.status_id >= 8).length;
    const remaining = totalPossible - operational;
    
    // Calculate dynamic goal based on skipped days
    const activeDaysCount = sprintDays.length - skippedDays.length;
    const accountsPerActiveDay = activeDaysCount > 0 ? Math.ceil(remaining / activeDaysCount) : remaining;

    // Status Distribution Data for Pie Chart
    const statusPieData = data.status_definitions.map(def => ({
      name: def.label,
      value: data.account_statuses.filter(s => s.status_id === def.id).length + (def.id === 1 ? (totalPossible - data.account_statuses.length) : 0)
    }));

    // Incomplete accounts
    const incomplete = [];
    const sortedPlatforms = [...data.platforms].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedPlatforms.forEach(platform => {
      data.people.forEach(person => {
        const status = data.account_statuses.find(
          s => s.person_id === person.id && s.platform_id === platform.id
        );
        if (!status || status.status_id < 8) {
          incomplete.push({ platform: platform.name, person: person.name, status: status?.status_id || 1 });
        }
      });
    });

    const todayTargets = incomplete.slice(0, accountsPerActiveDay);

    const now = new Date();
    const timeLeft = SPRINT_END.getTime() - now.getTime();
    const daysLeft = Math.max(0, Math.ceil(timeLeft / (1000 * 60 * 60 * 24)));

    return {
      totalPossible,
      operational,
      remaining,
      todayTargets,
      daysLeft,
      accountsPerActiveDay,
      completionRate: ((operational / totalPossible) * 100).toFixed(1),
      statusPieData,
      stageBreakdown: data.status_definitions.map(def => ({
        ...def,
        count: data.account_statuses.filter(s => s.status_id === def.id).length + (def.id === 1 ? (totalPossible - data.account_statuses.length) : 0)
      }))
    };
  }, [data, skippedDays]);

  const toggleSkipDay = (date) => {
    setSkippedDays(prev => 
      prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
    );
  };

  const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#facc15', '#a3e635', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6'];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Victory Card & Live Sync Indicator */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Live Matrix Sync Active</span>
        </div>
        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          Last Updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Main Victory Card */}
      <div className={`relative overflow-hidden border rounded-3xl p-8 transition-all duration-1000 ${stats.remaining === 0 ? 'bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 border-yellow-400 shadow-yellow-500/20' : 'bg-slate-900 border-slate-800 shadow-2xl'}`}>
        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
          {stats.remaining === 0 ? <Star size={160} className="fill-white" /> : <Trophy size={160} />}
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
                {stats.remaining === 0 ? "MISSION ACCOMPLISHED! 👑" : "THE BATTLE FOR MAY 1ST"}
              </h1>
              <p className="text-slate-400 font-medium max-w-lg">
                {stats.remaining === 0 
                  ? "You have achieved total operational mastery. Every single account is live and operating. You are the MVP." 
                  : `You have successfully conquered ${stats.operational} accounts. Only ${stats.remaining} more to reach total operational victory.`}
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-950/40 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="text-center px-4 border-r border-white/10">
                <div className="text-3xl font-black text-emerald-400">{stats.operational}</div>
                <div className="text-[9px] text-slate-500 font-bold uppercase">Accomplished</div>
              </div>
              <div className="text-center px-4">
                <div className="text-3xl font-black text-pink-500">{stats.remaining}</div>
                <div className="text-[9px] text-slate-500 font-bold uppercase">Remaining</div>
              </div>
            </div>
          </div>

          {/* Progress Visualizer */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-xs font-black text-white uppercase tracking-widest">Operational Velocity</span>
              <span className="text-2xl font-black text-white">{stats.completionRate}%</span>
            </div>
            <div className="h-6 bg-slate-950 rounded-full p-1 border border-slate-800 overflow-hidden shadow-inner">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out relative ${stats.remaining === 0 ? 'bg-gradient-to-r from-yellow-300 via-white to-yellow-300' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}`}
                style={{ width: `${stats.completionRate}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Analytics & Plots Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Calendar Day Management */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <CalendarDays className="text-blue-500" />
                Sprint Calendar (Patch & Skip)
              </h3>
              <span className="text-[10px] text-slate-500 uppercase font-bold">Goal redistributes automatically</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {sprintDays.map((day) => {
                const isSkipped = skippedDays.includes(day.date);
                return (
                  <button
                    key={day.date}
                    onClick={() => toggleSkipDay(day.date)}
                    className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1 group ${
                      isSkipped 
                        ? 'bg-red-950/20 border-red-900/50 text-red-500' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-indigo-500 hover:bg-indigo-500/5'
                    }`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-tighter">{day.label}</span>
                    <span className="text-sm font-bold">{day.date.split('-')[2]}</span>
                    <span className="text-[8px] mt-1 font-bold">
                      {isSkipped ? 'SKIPPED' : 'ACTIVE'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Plots & Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Status Distribution Pie */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-6 uppercase tracking-widest text-slate-400">
                <PieChartIcon size={16} className="text-pink-500" />
                Status Distribution
              </h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.statusPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stats.statusPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stage Progress Bar Chart */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-6 uppercase tracking-widest text-slate-400">
                <BarChart size={16} className="text-emerald-500" />
                Accounts By Stage
              </h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart data={stats.stageBreakdown}>
                    <XAxis dataKey="id" hide />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {stats.stageBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Stage Detail Analytics */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-6 bg-slate-800/50 border-b border-slate-800">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <TrendingUp className="text-indigo-400" />
                Stage-by-Stage Breakdown
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.stageBreakdown.map((stage) => (
                <div key={stage.id} className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-2xl group hover:border-indigo-500 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-inner ${stage.class}`}>
                      {stage.id}
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tight line-clamp-1">{stage.label}</div>
                      <div className="text-xl font-black text-white">{stage.count}</div>
                    </div>
                  </div>
                  <div className="text-[10px] bg-slate-900 px-2 py-1 rounded-lg text-slate-500 font-bold">
                    {Math.round((stage.count / stats.totalPossible) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Motivation & Targets Column */}
        <div className="space-y-8">
          {/* Today's Target List */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold flex items-center gap-2">
                  <Zap size={18} className="fill-yellow-300 text-yellow-300" />
                  Today's Mission
                </h3>
                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold">ALPHA PRIORITY</span>
              </div>
              <p className="text-xs text-indigo-100">Next {stats.accountsPerActiveDay} accounts to operational</p>
            </div>
            <div className="p-4 max-h-[500px] overflow-y-auto custom-scrollbar">
              <div className="space-y-2">
                {stats.todayTargets.map((target, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl group">
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-black text-slate-700 group-hover:text-indigo-500 transition-colors">{String(idx + 1).padStart(2, '0')}</div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">{target.platform}</div>
                        <div className="text-[9px] text-slate-500 uppercase font-black">{target.person}</div>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-800 group-hover:text-indigo-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Motivational Diary */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-1000"></div>
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <Star className="text-yellow-400 fill-yellow-400" size={18} />
              Sprint Diary
            </h3>
            <div className="space-y-6">
              <div className="p-5 bg-slate-950 border-l-4 border-indigo-600 rounded-r-2xl">
                <p className="text-xs text-slate-400 italic leading-relaxed">
                  "Your future self is watching you right now. Will they be proud of the work you put in today? May 1st is your finish line. Don't just cross it—DOMINATE it."
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-500 mt-1" size={16} />
                  <div>
                    <div className="text-xs font-bold text-white">Daily Creation Habit</div>
                    <p className="text-[10px] text-slate-500 mt-0.5">Creating 55 accounts daily builds an unstoppable momentum. Don't break the chain.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-500 mt-1" size={16} />
                  <div>
                    <div className="text-xs font-bold text-white">The Patch Rule</div>
                    <p className="text-[10px] text-slate-500 mt-0.5">If you skip a day, you MUST acknowledge the increased pressure. Use it as fuel.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintChallenge;
