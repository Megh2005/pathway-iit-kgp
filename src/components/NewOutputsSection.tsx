import React from 'react';
import { Cpu, Award, ArrowRight, CheckCircle2, BarChart3, Layers, FileText } from 'lucide-react';
import { PaperAnalysisResult } from '../types';

interface NewOutputsSectionProps {
  paperData: PaperAnalysisResult;
}

export const NewOutputsSection: React.FC<NewOutputsSectionProps> = ({ paperData }) => {
  const { newOutputs, paperMeta } = paperData;

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 space-y-8">
      {/* Primary Breakthrough Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded border border-slate-200 uppercase tracking-wider">
            Primary Scholarly Contribution
          </span>
          <span className="bg-slate-50 text-slate-600 text-xs font-medium px-2.5 py-1 rounded border border-slate-200">
            {paperMeta.domain}
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
          Methodological Innovations & Algorithmic Novelty
        </h1>

        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            <Award className="w-4 h-4 text-slate-700" />
            <span>Core Breakthrough Statement</span>
          </div>
          <p className="text-base sm:text-lg font-semibold leading-relaxed text-slate-900">
            {newOutputs.primaryBreakthrough}
          </p>
        </div>
      </div>

      {/* Novel Mechanisms Introduced */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-slate-700" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Detailed Algorithmic & Mathematical Mechanisms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newOutputs.novelMechanisms.map((mech, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Mechanism 0{idx + 1}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{mech.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {mech.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Theoretical Significance:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">{mech.whyItMatters}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Quo Comparative Matrix: Before vs After */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-slate-700" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Comparative Matrix: Status Quo vs. This Paper
          </h2>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="hidden lg:grid grid-cols-12 bg-slate-50 p-3.5 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
            <div className="col-span-3">Evaluated Dimension</div>
            <div className="col-span-4">Conventional Baseline Paradigm</div>
            <div className="col-span-1 text-center">Shift</div>
            <div className="col-span-4">This Paper's Solution</div>
          </div>

          <div className="divide-y divide-slate-100">
            {newOutputs.statusQuoBeforeVsAfter.map((sq, idx) => (
              <div key={idx} className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block lg:hidden mb-1">
                    Dimension
                  </span>
                  <span className="text-sm font-bold text-slate-900">{sq.aspect}</span>
                </div>

                <div className="lg:col-span-4 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1 lg:hidden">
                    Prior State
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{sq.before}</p>
                </div>

                <div className="hidden lg:flex lg:col-span-1 justify-center text-slate-400">
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </div>

                <div className="lg:col-span-4 p-3.5 rounded-lg bg-slate-100 border border-slate-300 text-slate-900">
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block mb-1 lg:hidden">
                    Advance Achieved
                  </span>
                  <p className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed">
                    {sq.after}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benchmark Results */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-slate-700" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Empirical Evaluation & Performance Gains
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {newOutputs.benchmarkResults.map((res, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-slate-500 block mb-1">
                  Metric {idx + 1}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mb-3">{res.metric}</h4>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>Baseline Score:</span>
                    <span className="font-mono text-slate-700">{res.priorState}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs p-2 rounded bg-slate-50 border border-slate-200 font-semibold text-slate-900">
                    <span>Achieved Score:</span>
                    <span className="font-mono font-bold">{res.thisPaper}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs font-semibold text-slate-800 bg-slate-100 p-2.5 rounded border border-slate-200">
                {res.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Verified Findings */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-base font-bold text-slate-900">Summary of Key Verified Findings</h3>
        <ul className="space-y-2.5">
          {newOutputs.keyFindings.map((finding, idx) => (
            <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{finding}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
