import React, { useState } from 'react';
import { Sparkles, Users, Eye, BookOpen, GraduationCap, Briefcase, Microscope, CheckCircle2 } from 'lucide-react';
import { PaperAnalysisResult } from '../types';

interface ComparativeAnalogyLabProps {
  paperData: PaperAnalysisResult;
}

export const ComparativeAnalogyLab: React.FC<ComparativeAnalogyLabProps> = ({ paperData }) => {
  const { comparativeAnalogies, simpleTermsExplanation } = paperData;
  const [activeAudience, setActiveAudience] = useState<'student' | 'engineer' | 'researcher'>('student');

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 space-y-8">
      {/* Narrative Physical Metaphor */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-slate-600" />
          <span>Everyday Mechanical Analogy</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {comparativeAnalogies.everydayAnalogy.title}
        </h1>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
          {comparativeAnalogies.everydayAnalogy.narrative}
        </p>

        {/* Intuition Takeaway Callout */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Intuition in One Sentence
          </span>
          <p className="text-sm sm:text-base font-semibold text-slate-900 italic">
            "{comparativeAnalogies.intuitionTakeaway}"
          </p>
        </div>
      </div>

      {/* Mental Visual Metaphor */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-2 mb-2">
          <Eye className="w-4 h-4 text-slate-700" />
          <h2 className="text-base font-bold text-slate-900">Mental Visual Metaphor</h2>
        </div>
        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed border-l-2 border-slate-900 pl-3.5 py-1 italic">
          {comparativeAnalogies.visualMetaphor}
        </p>
      </div>

      {/* The Concept Cast: Technical Term -> Real-World Equivalent */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-slate-700" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Concept Translation Matrix
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {comparativeAnalogies.everydayAnalogy.cast.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono font-medium text-slate-400 block mb-1">
                  Technical Concept
                </span>
                <h4 className="font-bold text-slate-900 text-sm mb-3">{item.technicalTerm}</h4>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Everyday Equivalent
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.everydayEquivalent}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Tier Audience Explanations */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Audience-Tailored Explanations
            </h2>
            <p className="text-xs text-slate-500">
              Select an expertise level to view the synthesized explanation formatted for that background.
            </p>
          </div>

          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveAudience('student')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeAudience === 'student'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Undergraduate</span>
            </button>

            <button
              onClick={() => setActiveAudience('engineer')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeAudience === 'engineer'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Practitioner / Lead</span>
            </button>

            <button
              onClick={() => setActiveAudience('researcher')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeAudience === 'researcher'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Microscope className="w-3.5 h-3.5" />
              <span>Senior Researcher</span>
            </button>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed text-xs sm:text-sm">
          {activeAudience === 'student' && (
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Undergraduate / Introductory Perspective (Core Concepts & Intuition)
              </div>
              <p className="text-slate-700 leading-relaxed">
                {simpleTermsExplanation.forHighSchooler}
              </p>
            </div>
          )}

          {activeAudience === 'engineer' && (
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Practitioner Perspective (Throughput, Architecture & Implementation)
              </div>
              <p className="text-slate-700 leading-relaxed">
                {simpleTermsExplanation.forTechFounder}
              </p>
            </div>
          )}

          {activeAudience === 'researcher' && (
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Senior Researcher Perspective (Inductive Biases, Optimization Landscapes & Asymptotics)
              </div>
              <p className="text-slate-700 leading-relaxed">
                {simpleTermsExplanation.forSeniorResearcher}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
