import React from 'react';
import { Rocket, Target, HelpCircle, Briefcase, AlertOctagon, Sparkles, CheckCircle2 } from 'lucide-react';
import { PaperAnalysisResult, ThesisTopic } from '../types';

interface FutureScopeSectionProps {
  paperData: PaperAnalysisResult;
}

export const FutureScopeSection: React.FC<FutureScopeSectionProps> = ({ paperData }) => {
  const { futureScope, paperMeta } = paperData;

  const getDifficultyBadge = (difficulty: ThesisTopic['difficulty']) => {
    switch (difficulty) {
      case 'Medium':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'High':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Moonshot':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center space-x-2 text-xs font-bold text-fuchsia-700 uppercase tracking-wider mb-2">
          <Rocket className="w-4 h-4 text-fuchsia-600" />
          <span>Research Frontiers</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Scope of Research & Future Work
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Open failure modes, high-impact thesis topics, and commercial application opportunities branching off "{paperMeta.title}".
        </p>
      </div>

      {/* Promising Thesis & Project Topics */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Curated Thesis & High-Impact Project Topics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {futureScope.promisingThesisTopics.map((topic, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-fuchsia-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 font-mono">Topic 0{idx + 1}</span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getDifficultyBadge(
                      topic.difficulty
                    )}`}
                  >
                    {topic.difficulty}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug">
                  {topic.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {topic.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600">
                <span>Ready for exploration →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unsolved Bottlenecks & Failure Modes */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <AlertOctagon className="w-5 h-5 text-rose-600" />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Unsolved Limitations & Known Failure Modes
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          {futureScope.unsolvedLimitations.map((lim, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                ✕
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {lim}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Questions for the Field */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Profound Open Questions for the Field
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {futureScope.openQuestionsForField.map((q, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-start space-x-3"
            >
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-1" />
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{q}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Commercial & Industry Application Opportunities */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Commercial & Startup Application Frontiers
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          {futureScope.industryApplicationOpportunities.map((opp, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {opp}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
