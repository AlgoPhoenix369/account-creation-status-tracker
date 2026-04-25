import React, { useState } from 'react';
import { Lock, Zap } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admintasker123') {
      onLogin('admin');
    } else if (password === 'tasker123') {
      onLogin('tasker');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-indigo-500/20 w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-blue-900/50">
            <Lock className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Gateway Tracker
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Enter your password to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            {error && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-400 rounded-full inline-block" />
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2"
          >
            <Zap size={18} />
            Access Dashboard
          </button>
        </form>

        <p className="text-center text-slate-600 text-xs mt-6">Gateway Platform Tracker v2.0</p>
      </div>
    </div>
  );
};

export default Login;
