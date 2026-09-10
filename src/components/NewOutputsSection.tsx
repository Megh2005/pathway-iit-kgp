import React from 'react';
import { Sparkles, Cpu, Award, ArrowRight, CheckCircle, BarChart3, Clock, Layers } from 'lucide-react';
import { PaperAnalysisResult } from '../types';

interface NewOutputsSectionProps {
  paperData: PaperAnalysisResult;
}

export const NewOutputsSection: React.FC<NewOutputsSectionProps> = ({ paperData }) => {
  const { newOutputs, paperMeta } = paperData;

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Novel Contributions
          </span>
          <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">
            {paperMeta.domain}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Published {paperMeta.year} • {paperMeta.journalOrConference || 'Preprint'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          {paperMeta.title}
        </h1>

        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100/90 text-indigo-950">
          <div className="flex items-center space-x-2 text-xs font-bold text-indigo-800 uppercase tracking-wider mb-1">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Primary Breakthrough & Central Novelty</span>
          </div>
          <p className="text-base sm:text-lg font-semibold leading-relaxed text-indigo-950">
            {newOutputs.primaryBreakthrough}
          </p>
        </div>
      </div>

      {/* Novel Mechanisms Introduced */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Novel Mathematical & Algorithmic Mechanisms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newOutputs.novelMechanisms.map((mech, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm mb-3">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{mech.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
                  {mech.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-indigo-600 block mb-1">Why It Matters:</span>
                <p className="text-xs text-slate-600 italic leading-relaxed">{mech.whyItMatters}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Quo Before vs After (Side by Side) */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Status Quo Paradigm Shift: Before vs. After
          </h2>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 divide-y divide-slate-100">
            {newOutputs.statusQuoBeforeVsAfter.map((sq, idx) => (
              <div key={idx} className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Dimension
                  </span>
                  <span className="text-base font-bold text-slate-900">{sq.aspect}</span>
                </div>

                <div className="lg:col-span-4 p-4 rounded-xl bg-rose-50/70 border border-rose-100 text-rose-950">
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block mb-1">
                    Before This Paper
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{sq.before}</p>
                </div>

                <div className="hidden lg:flex lg:col-span-1 justify-center text-slate-400">
                  <ArrowRight className="w-5 h-5 text-indigo-500" />
                </div>

                <div className="lg:col-span-4 p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-emerald-950">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                    After This Paper
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                    {sq.after}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benchmark Results & Empirical Proof */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Empirical Benchmark Beats & Performance Gains
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {newOutputs.benchmarkResults.map((res, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Target Metric
                </span>
                <h4 className="font-bold text-slate-900 text-base mb-4">{res.metric}</h4>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Prior Baseline:</span>
                    <span className="font-mono font-medium text-slate-700">{res.priorState}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs p-2 rounded-lg bg-emerald-50 text-emerald-900 font-semibold border border-emerald-100">
                    <span>This Paper:</span>
                    <span className="font-mono text-emerald-700 font-bold text-sm">
                      {res.thisPaper}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-indigo-700 font-semibold bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100/60">
                {res.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Findings Bullet List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Summary of Key Verified Findings</h3>
        <div className="space-y-3">
          {newOutputs.keyFindings.map((finding, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {finding}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
