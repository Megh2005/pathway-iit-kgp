import React from 'react';
import { TrendingUp, Building2, Scale, AlertCircle, History } from 'lucide-react';
import { PaperAnalysisResult } from '../types';

interface BuzzAndTrendsSectionProps {
  paperData: PaperAnalysisResult;
}

export const BuzzAndTrendsSection: React.FC<BuzzAndTrendsSectionProps> = ({ paperData }) => {
  const { recentBuzzAndTrends } = paperData;

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'Revolutionary':
      case 'Broadly Adopted':
        return 'bg-slate-900 text-white border-slate-900';
      case 'Hotly Debated':
        return 'bg-slate-100 text-slate-900 border-slate-300';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-slate-600" />
            <span>Community Reception & Scholarly Impact</span>
          </div>

          <div
            className={`px-3 py-1 rounded text-xs font-semibold border ${getSentimentBadge(
              recentBuzzAndTrends.communitySentiment
            )}`}
          >
            Field Consensus: {recentBuzzAndTrends.communitySentiment}
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Field Assessment & Real-World Trajectory
        </h1>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
          {recentBuzzAndTrends.buzzSummary}
        </p>
      </div>

      {/* Production & Practical Deployment */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-slate-700" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Industrial Deployment & Practical Systems
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {recentBuzzAndTrends.industryAdoptionStatus}
        </p>
      </div>

      {/* Critical Controversies & Open Debates */}
      {recentBuzzAndTrends.controversiesOrDebates && recentBuzzAndTrends.controversiesOrDebates.length > 0 && (
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-slate-700" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Scholarly Debates & Critical Skepticism
            </h2>
          </div>
          <ul className="space-y-3">
            {recentBuzzAndTrends.controversiesOrDebates.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chronological Timeline */}
      {recentBuzzAndTrends.trendTimeline && recentBuzzAndTrends.trendTimeline.length > 0 && (
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-slate-700" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Chronological Trajectory & Milestones
            </h2>
          </div>

          <div className="space-y-4">
            {recentBuzzAndTrends.trendTimeline.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className="w-24 shrink-0 text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded text-center border border-slate-200">
                  {item.period}
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                    {item.milestone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
