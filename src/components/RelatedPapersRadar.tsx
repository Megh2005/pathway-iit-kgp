import React, { useState } from 'react';
import { BookOpen, Search, ArrowUpRight, Filter } from 'lucide-react';
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

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4 text-slate-600" />
            <span>Verified Citation Network & Related Literature</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Related Research Papers & Canonical Literature
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real, verified academic literature connecting directly to "{paperData.paperMeta.title}".
          </p>
        </div>

        <button
          onClick={onOpenLiveSearch}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors shrink-0 self-start sm:self-auto"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search More Papers with Google Grounding</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </span>
        {filterOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelectedFilter(opt)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium border ${
              selectedFilter === opt
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-semibold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Related Papers List */}
      <div className="space-y-4">
        {filteredPapers.map((paper, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded">
                    {paper.relationshipType}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {paper.venueOrSource || 'Academic Venue'} &bull; {paper.year}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {paper.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors}
                </p>
              </div>

              {paper.url && (
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors shrink-0 self-start sm:self-auto"
                >
                  <span>Read Paper</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}
            </div>

            {/* Why Connected & Key Difference */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  How This Connects
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {paper.whyItMatters}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Contrast with Uploaded Manuscript
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {paper.comparisonWithAnalyzedPaper}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
