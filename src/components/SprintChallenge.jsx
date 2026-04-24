import React, { useMemo } from 'react';
import { 
  Trophy, 
  Target, 
  Calendar, 
  Clock, 
  ChevronRight, 
  TrendingUp,
  Zap,
  Flame,
  Star,
  Quote
} from 'lucide-react';

const SprintChallenge = ({ data }) => {
  const SPRINT_START = new Date('2026-04-25T00:00:00');
  const SPRINT_END = new Date('2026-05-01T23:59:59');
  const totalDays = 7;
  const accountsPerDay = 55;

  const stats = useMemo(() => {
    const totalPossible = data.platforms.length * data.people.length;
    const operational = data.account_statuses.filter(s => s.status_id >= 8).length;
    const remaining = totalPossible - operational;
    
    // Find all incomplete accounts alphabetically
    const incomplete = [];
    const sortedPlatforms = [...data.platforms].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedPlatforms.forEach(platform => {
      data.people.forEach(person => {
        const status = data.account_statuses.find(
          s => s.person_id === person.id && s.platform_id === platform.id
        );
        if (!status || status.status_id < 8) {
          incomplete.push({
            platform: platform.name,
            person: person.name,
            status: status?.status_id || 1
          });
        }
      });
    });

    // Today's targets (next 55 alphabetically)
    const todayTargets = incomplete.slice(0, accountsPerDay);

    // Time calculations
    const now = new Date();
    const timeLeft = SPRINT_END.getTime() - now.getTime();
    const daysLeft = Math.max(0, Math.ceil(timeLeft / (1000 * 60 * 60 * 24)));
    const hoursLeft = Math.max(0, Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

    return {
      totalPossible,
      operational,
      remaining,
      incomplete,
      todayTargets,
      daysLeft,
      hoursLeft,
      completionRate: ((operational / totalPossible) * 100).toFixed(1)
    };
  }, [data]);

  const motivationalQuotes = [
    "Champions keep playing until they get it right.",
    "The road to May 1st is paved with action, not excuses.",
    "385 accounts is just a number. Your discipline is the power.",
    "Every operational account is a brick in your empire.",
    "Competition with yourself is the highest form of growth."
  ];

  const currentQuote = motivationalQuotes[Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % motivationalQuotes.length];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
          <Trophy size={200} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider">
              <Zap size={14} className="fill-yellow-400 text-yellow-400" />
              May 1st Victory Sprint
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Road to <span className="text-yellow-300">385</span> Operational Accounts
            </h1>
            <p className="text-indigo-100 text-lg max-w-xl font-medium">
              "This is where you separate yourself from the average. Every platform, every person, every status update—you are building your legacy."
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 text-center min-w-[120px]">
              <div className="text-3xl font-black text-white">{stats.daysLeft}</div>
              <div className="text-[10px] text-indigo-200 uppercase font-bold tracking-widest mt-1">Days Left</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 text-center min-w-[120px]">
              <div className="text-3xl font-black text-white">{stats.hoursLeft}</div>
              <div className="text-[10px] text-indigo-200 uppercase font-bold tracking-widest mt-1">Hours Left</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Progress & Daily Target */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Progress Tracker */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Target className="text-pink-500" />
                Live Mission Status
              </h3>
              <div className="text-sm font-medium text-slate-400">
                {stats.operational} / {stats.totalPossible} Accounts Operational
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-1 border border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${stats.completionRate}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                <span>Phase 1: Starting</span>
                <span className="text-white">{stats.completionRate}% Efficiency</span>
                <span>Phase 7: May 1st Mastery</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">Created</div>
                <div className="text-2xl font-black text-emerald-400">{stats.operational}</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">Remaining</div>
                <div className="text-2xl font-black text-pink-500">{stats.remaining}</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">Daily Goal</div>
                <div className="text-2xl font-black text-blue-400">{accountsPerDay}</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">Streak</div>
                <div className="text-2xl font-black text-orange-400 flex items-center gap-2">
                  <Flame size={20} className="fill-orange-400" />
                  0
                </div>
              </div>
            </div>
          </div>

          {/* Today's Target List (Alphabetical) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-6 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Today's Tactical Mission</h3>
                <p className="text-sm text-slate-400">Alphabetical priority list for next 55 accounts</p>
              </div>
              <Calendar className="text-indigo-400" />
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {stats.todayTargets.map((target, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl group hover:border-indigo-500 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{target.platform}</div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">{target.person}</div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-700 group-hover:text-indigo-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Motivation & Diary */}
        <div className="space-y-8">
          {/* Motivation Wall */}
          <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
            <Quote className="absolute top-4 right-4 text-white/5" size={60} />
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <TrendingUp className="text-indigo-400" />
              Warrior Mindset
            </h3>
            <div className="space-y-6">
              <div className="italic text-lg text-slate-200 leading-relaxed">
                "{currentQuote}"
              </div>
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
                <p className="text-xs text-indigo-300 font-bold uppercase tracking-widest mb-2">Self-Competition Goal:</p>
                <p className="text-sm text-slate-300">
                  Beat your previous best. If you created 30 yesterday, aim for 40 today. Speed is your ally, but accuracy is your king.
                </p>
              </div>
            </div>
          </div>

          {/* Daily Schedule Tracker */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6 text-emerald-400">
              <Star className="fill-emerald-400 text-emerald-400" />
              Sprint Roadmap
            </h3>
            <div className="space-y-4">
              {[
                { date: 'Apr 25', label: 'Inception', target: '55 A/cs' },
                { date: 'Apr 26', label: 'Momentum', target: '110 A/cs' },
                { date: 'Apr 27', label: 'Power Play', target: '165 A/cs' },
                { date: 'Apr 28', label: 'Cruising', target: '220 A/cs' },
                { date: 'Apr 29', label: 'The Grinding', target: '275 A/cs' },
                { date: 'Apr 30', label: 'Final Push', target: '330 A/cs' },
                { date: 'May 01', label: 'Victory Day', target: '385 A/cs' },
              ].map((day, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/50">
                  <div>
                    <div className="text-xs font-black text-white">{day.date}</div>
                    <div className="text-[10px] text-slate-500 uppercase">{day.label}</div>
                  </div>
                  <div className="text-xs font-bold text-slate-400">{day.target}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Psychological Trigger */}
          <div className="bg-orange-600/10 border border-orange-600/20 rounded-3xl p-6 text-center">
            <Clock className="text-orange-500 mx-auto mb-3" size={32} />
            <h4 className="text-orange-400 font-bold uppercase text-xs tracking-widest mb-2">Psychological Trigger</h4>
            <p className="text-sm text-slate-300 italic">
              "The pain of discipline is far less than the pain of regret. May 1st is coming whether you are ready or not. BE READY."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintChallenge;
