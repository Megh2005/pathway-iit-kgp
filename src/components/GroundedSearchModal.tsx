import React, { useState } from 'react';
import { Search, Sparkles, ExternalLink, X, BookOpen, AlertCircle, ArrowUpRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GroundedSource } from '../types';

interface GroundedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultQuery: string;
}

export const GroundedSearchModal: React.FC<GroundedSearchModalProps> = ({
  isOpen,
  onClose,
  defaultQuery,
}) => {
  const [query, setQuery] = useState<string>(defaultQuery);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reportMarkdown, setReportMarkdown] = useState<string | null>(null);
  const [sources, setSources] = useState<GroundedSource[]>([]);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setReportMarkdown(null);
    setSources([]);

    try {
      const response = await fetch('/api/search-grounded-papers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicOrTitle: query.trim() }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to search grounded papers.');
      }

      const data = await response.json();
      setReportMarkdown(data.reportMarkdown);
      setSources(data.groundedSources || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error executing live search.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Google Search Grounding</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Live Literature & Citation Finder
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Queries live Google Search with Gemini 3.8 Flash to discover real, verified 2024-2026 citations, companion papers, and official URLs.
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Transformers quadratic attention vs Mamba SSMs in 2025"
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs shadow-indigo-200 transition-all active:scale-95 shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isLoading ? 'Searching...' : 'Search'}</span>
          </button>
        </form>

        {/* Loading */}
        {isLoading && (
          <div className="py-12 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs sm:text-sm font-medium text-slate-600">
              Querying academic web indices and verifying real URLs...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Results */}
        {reportMarkdown && (
          <div className="space-y-6">
            {/* Grounded Web Sources */}
            {sources.length > 0 && (
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block mb-2">
                  Verified Real Sources ({sources.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {sources.map((src, idx) => (
                    <a
                      key={idx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs bg-white hover:bg-slate-50 text-indigo-700 px-3 py-1 rounded-lg border border-indigo-200 font-medium transition-colors shadow-2xs truncate max-w-xs"
                    >
                      <span className="truncate">{src.title || src.url}</span>
                      <ArrowUpRight className="w-3 h-3 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Markdown Report */}
            <div className="markdown-body p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm leading-relaxed text-slate-800 space-y-4">
              <ReactMarkdown>{reportMarkdown}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
