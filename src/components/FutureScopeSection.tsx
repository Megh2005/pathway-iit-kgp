import React from 'react';
import { Target, HelpCircle, Briefcase, AlertOctagon, CheckCircle2, Compass } from 'lucide-react';
import { PaperAnalysisResult, ThesisTopic } from '../types';

interface FutureScopeSectionProps {
  paperData: PaperAnalysisResult;
}

export const FutureScopeSection: React.FC<FutureScopeSectionProps> = ({ paperData }) => {
  const { futureScope, paperMeta } = paperData;

  const getDifficultyBadge = (difficulty: ThesisTopic['difficulty']) => {
    switch (difficulty) {
      case 'Medium':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'High':
        return 'bg-slate-200 text-slate-900 border-slate-300 font-bold';
      case 'Moonshot':
        return 'bg-slate-900 text-white border-slate-900 font-bold';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Compass className="w-4 h-4 text-slate-600" />
          <span>Research Agenda</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Methodological Limitations & Future Research Scope
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Open failure modes, concrete thesis proposals, and translational opportunities branching off "{paperMeta.title}".
        </p>
      </div>

      {/* Unsolved Limitations & Bottlenecks */}
      {futureScope.unsolvedLimitations && futureScope.unsolvedLimitations.length > 0 && (
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <AlertOctagon className="w-4 h-4 text-slate-700" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Methodological Limitations & Failure Modes
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Identified structural constraints where the paper's assumptions or empirical methods encounter boundaries:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {futureScope.unsolvedLimitations.map((lim, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-mono text-slate-500">Constraint 0{idx + 1}</span>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">{lim}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Promising Thesis Proposals */}
      {futureScope.promisingThesisTopics && futureScope.promisingThesisTopics.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-slate-700" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Curated Thesis & Graduate Research Proposals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {futureScope.promisingThesisTopics.map((topic, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      Proposal 0{idx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded border ${getDifficultyBadge(
                        topic.difficulty
                      )}`}
                    >
                      {topic.difficulty} Complexity
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mb-2">{topic.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Open Questions for the Field */}
      {futureScope.openQuestionsForField && futureScope.openQuestionsForField.length > 0 && (
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-slate-700" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Fundamental Open Research Questions
            </h2>
          </div>
          <ul className="space-y-3">
            {futureScope.openQuestionsForField.map((q, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                <span className="font-mono text-xs font-bold text-slate-500 shrink-0 mt-0.5">
                  Q{idx + 1}.
                </span>
                <span className="leading-relaxed font-normal">{q}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Applied Industry & Practical Opportunities */}
      {futureScope.industryApplicationOpportunities && futureScope.industryApplicationOpportunities.length > 0 && (
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-slate-700" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Translational & Systems Opportunities
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {futureScope.industryApplicationOpportunities.map((opp, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">{opp}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
