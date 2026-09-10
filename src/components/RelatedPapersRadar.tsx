import React, { useState } from 'react';
import { BookOpen, ExternalLink, Filter, Search, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { PaperAnalysisResult, RelatedPaper, PaperRelationshipType } from '../types';

interface RelatedPapersRadarProps {
  paperData: PaperAnalysisResult;
  onOpenLiveSearch: () => void;
}

export const RelatedPapersRadar: React.FC<RelatedPapersRadarProps> = ({
  paperData,
  onOpenLiveSearch,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const papers = paperData.relatedPapers || [];

  const filterOptions = [
    'All',
    'Foundation / Precursor',
    'Direct Competitor',
    'Evolution / Follow-up',
    'Real-world Application',
  ];

  const filteredPapers =
    selectedFilter === 'All'
      ? papers
      : papers.filter((p) => p.relationshipType === selectedFilter);

  const getRelationshipBadgeStyle = (type: PaperRelationshipType) => {
    switch (type) {
      case 'Foundation / Precursor':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Direct Competitor':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Evolution / Follow-up':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Real-world Application':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Verified Citation Network & Related Literature</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Related Research Papers & Companions
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Real, existing academic literature connecting directly to "{paperData.paperMeta.title}".
          </p>
        </div>

        <button
          onClick={onOpenLiveSearch}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs shadow-indigo-200 transition-all active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <Search className="w-4 h-4" />
          <span>Search Live Grounded Papers</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center overflow-x-auto space-x-2 pb-2 no-scrollbar">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedFilter === filter
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Papers List */}
      <div className="space-y-4">
        {filteredPapers.map((paper, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all space-y-4"
          >
            {/* Top Bar: Relationship Badge + Venue / Year + Link */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${getRelationshipBadgeStyle(
                    paper.relationshipType
                  )}`}
                >
                  {paper.relationshipType}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {paper.venueOrSource || 'arXiv'} • {paper.year}
                </span>
              </div>

              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl border border-indigo-100 transition-colors"
              >
                <span>Read Full Paper</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Paper Title & Authors */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                {paper.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {paper.authors}
              </p>
            </div>

            {/* Two Column Grid: Why It Matters vs Technical Contrast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Why It Matters
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {paper.whyItMatters}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/70">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                  Contrast with Analyzed Paper
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {paper.comparisonWithAnalyzedPaper}
                </p>
              </div>
            </div>

            {/* URL Display */}
            <div className="text-xs text-slate-600 font-mono truncate pt-1">
              Source URL:{' '}
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                {paper.url}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
