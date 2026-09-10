import React, { useState } from 'react';
import { Sparkles, Users, Compass, Eye, BookOpen, Lightbulb, GraduationCap, Briefcase, Microscope } from 'lucide-react';
import { PaperAnalysisResult } from '../types';

interface ComparativeAnalogyLabProps {
  paperData: PaperAnalysisResult;
}

export const ComparativeAnalogyLab: React.FC<ComparativeAnalogyLabProps> = ({ paperData }) => {
  const { comparativeAnalogies, simpleTermsExplanation } = paperData;
  const [activePersona, setActivePersona] = useState<'student' | 'founder' | 'researcher'>('student');

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Intro Hero */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-100/20 to-transparent rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-xs relative overflow-hidden">
        <div className="flex items-center space-x-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-3">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>The Comparative Analogy Lab</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          {comparativeAnalogies.everydayAnalogy.title}
        </h1>

        <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 font-normal">
          {comparativeAnalogies.everydayAnalogy.narrative}
        </p>

        {/* Intuition Takeaway */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-amber-200 shadow-xs">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
            Intuition in One Breath
          </span>
          <p className="text-base sm:text-lg font-bold text-slate-900 italic">
            "{comparativeAnalogies.intuitionTakeaway}"
          </p>
        </div>
      </div>

      {/* Visual Mental Metaphor */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center space-x-2 mb-3">
          <Eye className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Mental Visual Metaphor</h2>
        </div>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed italic border-l-4 border-indigo-600 pl-4 py-1">
          {comparativeAnalogies.visualMetaphor}
        </p>
      </div>

      {/* The Concept Cast: Technical Term -> Everyday Equivalent */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            The Concept Cast: Translation Matrix
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {comparativeAnalogies.everydayAnalogy.cast.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                  Technical Term
                </span>
                <h4 className="font-bold text-slate-900 text-base mb-3">{item.technicalTerm}</h4>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
                  Real-World Role
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {item.everydayEquivalent}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Terms Explanation Tabs (3 Personas) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Explain in Simple Terms
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Adapted explanations tuned for different perspectives.
            </p>
          </div>

          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActivePersona('student')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activePersona === 'student'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student (ELI15)</span>
            </button>

            <button
              onClick={() => setActivePersona('founder')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activePersona === 'founder'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Tech Founder</span>
            </button>

            <button
              onClick={() => setActivePersona('researcher')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activePersona === 'researcher'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Microscope className="w-3.5 h-3.5" />
              <span>Senior Researcher</span>
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed text-base">
          {activePersona === 'student' && (
            <div>
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
                For High Schoolers & Beginners
              </div>
              <p className="text-slate-700 font-normal leading-relaxed">
                {simpleTermsExplanation.forHighSchooler}
              </p>
            </div>
          )}

          {activePersona === 'founder' && (
            <div>
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
                For Tech Founders & Product Leaders (ROI & Architecture)
              </div>
              <p className="text-slate-700 font-normal leading-relaxed">
                {simpleTermsExplanation.forTechFounder}
              </p>
            </div>
          )}

          {activePersona === 'researcher' && (
            <div>
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
                For Senior ML Researchers (Asymptotics & Inductive Bias)
              </div>
              <p className="text-slate-700 font-normal leading-relaxed">
                {simpleTermsExplanation.forSeniorResearcher}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
