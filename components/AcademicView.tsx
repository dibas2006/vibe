
import React from 'react';

const AcademicView: React.FC = () => {
  const courses = [
    { name: 'Engineering Maths', code: 'MAT101', progress: 45, color: 'bg-red-500' },
    { name: 'Applied Physics', code: 'PHY102', progress: 30, color: 'bg-blue-500' },
    { name: 'C Programming', code: 'CSC103', progress: 85, color: 'bg-green-500' },
    { name: 'Introduction to IT (IIT)', code: 'CSC104', progress: 60, color: 'bg-amber-500' },
    { name: 'Digital Logic', code: 'CSC105', progress: 50, color: 'bg-purple-500' },
  ];

  const skills = [
    { name: 'Data Structures (C)', level: 'Advanced' },
    { name: 'Circuit Design', level: 'Intermediate' },
    { name: 'Command Line Ops', level: 'Intermediate' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
      <div className="space-y-6">
        <h3 className="text-xl font-bold uppercase tracking-tighter">CSIT Curriculum Matrix</h3>
        <div className="space-y-4">
          {courses.map((course, i) => (
            <div key={i} className="glass p-5 rounded-xl border border-slate-800">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold text-sm uppercase">{course.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{course.code}</div>
                </div>
                <div className="text-xs font-bold text-indigo-400 font-mono">{course.progress}%</div>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                <div className={`h-full ${course.color} transition-all duration-1000`} style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold uppercase tracking-tighter">Skill Laboratory</h3>
        <div className="space-y-3">
          {skills.map((skill, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-indigo-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="text-sm font-semibold">{skill.name}</div>
              </div>
              <div className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded">
                {skill.level}
              </div>
            </div>
          ))}
          <button className="w-full py-4 border border-dashed border-slate-700 rounded-xl text-[10px] text-slate-500 hover:text-indigo-400 hover:border-indigo-500 transition-all uppercase font-black tracking-[0.2em]">
            + Link External Module
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademicView;
