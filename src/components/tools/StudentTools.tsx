import React, { useState } from 'react';
import { GraduationCap, Copy, Check, Calendar, Plus, Trash } from 'lucide-react';

interface StudentToolProps {
  slug: string;
}

interface Course {
  id: number;
  name: string;
  gradeValue: number;
  credits: number;
}

export function StudentTools({ slug }: StudentToolProps) {
  const [copied, setCopied] = useState(false);
  const [outputText, setOutputText] = useState('');

  // 1. GPA calculation fields
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Mathematics I', gradeValue: 4, credits: 3 },
    { id: 2, name: 'Computer Science', gradeValue: 3.7, credits: 4 },
    { id: 3, name: 'Physics Lab', gradeValue: 3.3, credits: 2 },
  ]);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseGrade, setNewCourseGrade] = useState('4.0');
  const [newCourseCredits, setNewCourseCredits] = useState('3');
  const [gpaResult, setGpaResult] = useState<string | null>(null);

  // 2. Attendance tracking fields
  const [attendedClasses, setAttendedClasses] = useState(22);
  const [totalClasses, setTotalClasses] = useState(30);
  const [targetPercent, setTargetPercent] = useState(75);
  const [attendanceResult, setAttendanceResult] = useState<string | null>(null);

  // 3. Study planner states
  const [studySubject, setStudySubject] = useState('Software Engineering');
  const [studyHours, setStudyHours] = useState(3);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addCourse = () => {
    const val = parseFloat(newCourseGrade) || 4.0;
    const cred = parseInt(newCourseCredits) || 3;
    const item: Course = {
      id: Date.now(),
      name: newCourseName.trim() || `Course #${courses.length + 1}`,
      gradeValue: val,
      credits: cred,
    };
    setCourses([...courses, item]);
    setNewCourseName('');
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const calculateWeightedGpa = () => {
    let totalScore = 0;
    let totalCredits = 0;
    courses.forEach(c => {
      totalScore += c.gradeValue * c.credits;
      totalCredits += c.credits;
    });

    if (totalCredits === 0) {
      setGpaResult('0.00');
    } else {
      setGpaResult((totalScore / totalCredits).toFixed(2));
    }
  };

  const calculateAttendanceSpecs = () => {
    const currentPercent = (attendedClasses / totalClasses) * 100;
    const targetFraction = targetPercent / 100;

    let advice = '';
    if (currentPercent >= targetPercent) {
      // User can miss some classes: solve for dynamic limits
      // (attended) / (total + miss) = target
      // attended / target = total + miss => miss = (attended / target) - total
      const maxMiss = Math.floor(attendedClasses / targetFraction) - totalClasses;
      advice = `You currently have ${currentPercent.toFixed(1)}% attendance. You can miss up to ${Math.max(0, maxMiss)} upcoming classes while maintaining at least ${targetPercent}%!`;
    } else {
      // User has to attend consecutive classes: solve for necessary attendance
      // (attended + consecutive) / (total + consecutive) = target
      // attended + consecutive = target * total + target * consecutive
      // consecutive - target * consecutive = target * total - attended
      // consecutive (1 - target) = target * total - attended => consecutive = (target * total - attended) / (1 - target)
      const needed = Math.ceil((targetFraction * totalClasses - attendedClasses) / (1 - targetFraction));
      advice = `You currently have ${currentPercent.toFixed(1)}% attendance. You must attend the next ${Math.max(0, needed)} consecutive classes without fail to reach your ${targetPercent}% target!`;
    }

    setAttendanceResult(advice);
  };

  const compileStudySchedule = () => {
    const schedule = `== MY WEEKLY REVISION TIMETABLE ==
Subject focus: ${studySubject}
Planned study block: ${studyHours} hours/day

[Interval Schedule Planner]
- Session 1 (45 mins): Focus & active note-taking on key formulas.
- Break (10 mins): Step away, rehydrate.
- Session 2 (45 mins): Solve practical mock questions.
- Break (10 mins): Eye exercises.
- Session 3 (45 mins): Active recall flashcard review.
- Reflection (15 mins): Wrap up summaries.

Stay consistent every day! Created on LiveTools.me`;
    setOutputText(schedule);
  };

  return (
    <div className="w-full bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-6">
      {/* GPA ADAPTER */}
      {slug === 'gpa-calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" /> Academic GPA weighted scale
              </h3>

              <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Add Course Grade Details</span>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    id="new_course_name"
                    type="text"
                    placeholder="Math, CS..."
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    className="col-span-1 px-3 py-1.5 border border-slate-300 rounded-md text-xs placeholder-slate-400 focus:outline-none"
                  />
                  <select
                    id="new_course_grade"
                    value={newCourseGrade}
                    onChange={(e) => setNewCourseGrade(e.target.value)}
                    className="px-2 py-1.5 bg-stone-50 border border-slate-300 rounded-md text-xs"
                  >
                    <option value="4.0">A / 4.0</option>
                    <option value="3.7">A- / 3.7</option>
                    <option value="3.3">B+ / 3.3</option>
                    <option value="3.0">B / 3.0</option>
                    <option value="2.7">B- / 2.7</option>
                    <option value="2.0">C / 2.0</option>
                  </select>
                  <input
                    id="new_course_credits"
                    type="number"
                    min="1"
                    max="5"
                    value={newCourseCredits}
                    onChange={(e) => setNewCourseCredits(e.target.value)}
                    className="px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:outline-none"
                  />
                </div>
                <button
                  id="add_course_details_btn"
                  onClick={addCourse}
                  className="w-full py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold rounded-md flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Course
                </button>
              </div>

              {courses.length > 0 && (
                <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100 max-h-44 overflow-y-auto">
                  {courses.map((c) => (
                    <div key={c.id} className="p-2 px-3 flex justify-between items-center text-xs text-slate-600 font-mono">
                      <span className="font-semibold text-slate-800 truncate max-w-[120px]">{c.name}</span>
                      <span>{c.gradeValue} pts ({c.credits} cr)</span>
                      <button
                        id={`delete_course_${c.id}`}
                        onClick={() => removeCourse(c.id)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                id="calculate_weighted_gpa_btn"
                onClick={calculateWeightedGpa}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg"
              >
                Determine My Cumulative GPA
              </button>
            </div>

            <div className="flex flex-col justify-center">
              {gpaResult ? (
                <div className="bg-white p-6 border border-slate-200 rounded-xl text-center space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Your Calculated Cumulative GPA</span>
                  <div className="text-5xl font-extrabold text-blue-600 font-mono">{gpaResult}</div>
                  <p className="text-xs text-slate-400">Weighted according to course credits limits.</p>
                </div>
              ) : (
                <div className="text-center text-slate-400 font-mono text-xs py-8">
                  Add course metrics to calculate GPA index
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ATTENDANCE ADAPTER */}
      {slug === 'attendance-calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800">Class Attendance targets tracker</h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Attended Classes</label>
                  <input
                    id="attn_attended_input"
                    type="number"
                    value={attendedClasses}
                    onChange={(e) => setAttendedClasses(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Total Classes</label>
                  <input
                    id="attn_total_input"
                    type="number"
                    value={totalClasses}
                    onChange={(e) => setTotalClasses(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Target Percent (%)</label>
                  <input
                    id="attn_target_pct"
                    type="number"
                    value={targetPercent}
                    onChange={(e) => setTargetPercent(parseInt(e.target.value) || 75)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <button
                id="calculate_attendance_btn"
                onClick={calculateAttendanceSpecs}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg"
              >
                Determine Future Class Targets
              </button>
            </div>

            <div className="flex flex-col justify-center">
              {attendanceResult ? (
                <div className="bg-white p-5 border border-slate-200 rounded-xl text-center text-xs text-slate-600 leading-relaxed font-mono font-semibold">
                  {attendanceResult}
                </div>
              ) : (
                <div className="text-center text-slate-400 font-mono text-xs py-8">
                  Inputs elements to compute classes margins
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STUDY PLANNER ADAPTER */}
      {slug === 'study-planner-generator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" /> Study schedule helper
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Target Subject / Topic</label>
                <input
                  id="study_subject_input"
                  type="text"
                  value={studySubject}
                  onChange={(e) => setStudySubject(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Target hours per day</label>
                <input
                  id="study_hours_input"
                  type="number"
                  value={studyHours}
                  onChange={(e) => setStudyHours(parseInt(e.target.value) || 2)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <button
                id="generate_study_planner_btn"
                onClick={compileStudySchedule}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg"
              >
                Compile Revision Timetable
              </button>
            </div>

            <div className="relative">
              <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase mb-1">
                <span>Planned outputs</span>
                {outputText && (
                  <button
                    id="copy_study_btn"
                    onClick={() => handleCopy(outputText)}
                    className="text-xs text-blue-600 font-bold"
                  >
                    Copy Program
                  </button>
                )}
              </div>
              <textarea
                id="study_schedule_output"
                readOnly
                value={outputText}
                className="w-full h-56 p-3 bg-slate-900 text-slate-200 border border-slate-800 rounded-xl font-mono text-[11px] leading-relaxed focus:outline-none"
                placeholder="Study scheduler prints out here. Setup goals."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
