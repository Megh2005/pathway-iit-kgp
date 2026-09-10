import React from 'react';
import { Flame, MessageSquare, TrendingUp, AlertTriangle, CheckCircle2, History, Building2 } from 'lucide-react';
import { PaperAnalysisResult } from '../types';

interface BuzzAndTrendsSectionProps {
  paperData: PaperAnalysisResult;
}

export const BuzzAndTrendsSection: React.FC<BuzzAndTrendsSectionProps> = ({ paperData }) => {
  const { recentBuzzAndTrends, paperMeta } = paperData;

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Revolutionary':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Broadly Adopted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Hotly Debated':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Niche / Specialized':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <Flame className="w-4 h-4 text-amber-600" />
            <span>Community Pulse & Research Buzz</span>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-bold border ${getSentimentColor(
              recentBuzzAndTrends.communitySentiment
            )}`}
          >
            Sentiment: {recentBuzzAndTrends.communitySentiment}
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
          What is Actually Going On with this Idea?
        </h1>

        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
          {recentBuzzAndTrends.buzzSummary}
        </p>
      </div>

      {/* Production & Industry Adoption */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Industry & Production Deployment
          </h2>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-sm sm:text-base leading-relaxed">
          {recentBuzzAndTrends.industryAdoptionStatus}
        </div>
      </div>

      {/* Ongoing Controversies & Academic Debates */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Active Debates, Trade-offs & Peer Criticisms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentBuzzAndTrends.controversiesOrDebates.map((debate, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-start space-x-3"
            >
              <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                !
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {debate}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Research Evolution Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Evolutionary Trend Timeline
          </h2>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-100 space-y-6">
          {recentBuzzAndTrends.trendTimeline.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-xs" />
              <div>
                <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider block mb-1">
                  {item.period}
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                  {item.milestone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
