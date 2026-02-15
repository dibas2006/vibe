
import React, { useState } from 'react';

const TrainingView: React.FC = () => {
  const [logs, setLogs] = useState([
    { date: '2023-10-24', run: '09:45', pushups: 45, situps: 60, status: 'pass' },
    { date: '2023-10-22', run: '10:15', pushups: 42, situps: 58, status: 'pass' },
  ]);

  return (
    <div className="space-y-8">
      <div className="glass p-8 rounded-2xl border border-indigo-500/20">
        <h3 className="text-xl font-bold mb-4">Army Fitness Assessment (RFT-E)</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-500">2km Run Time</label>
            <input type="text" placeholder="00:00" className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm focus:ring-1 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-500">Pushups (2m)</label>
            <input type="number" placeholder="0" className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm focus:ring-1 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-500">Situps (2m)</label>
            <input type="number" placeholder="0" className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm focus:ring-1 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="flex items-end">
            <button className="w-full py-3 bg-indigo-600 rounded-lg text-xs font-bold uppercase hover:bg-indigo-500 transition-all">Log Assessment</button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Previous Drills</h4>
        <div className="overflow-hidden rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 text-[10px] uppercase font-bold text-slate-500">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Run (2km)</th>
                <th className="px-6 py-4">Pushups</th>
                <th className="px-6 py-4">Situps</th>
                <th className="px-6 py-4">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {logs.map((log, i) => (
                <tr key={i} className="hover:bg-slate-800/30">
                  <td className="px-6 py-4 font-mono text-xs">{log.date}</td>
                  <td className="px-6 py-4 font-semibold">{log.run}</td>
                  <td className="px-6 py-4">{log.pushups}</td>
                  <td className="px-6 py-4">{log.situps}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-[10px] font-bold uppercase">Combat Ready</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrainingView;
