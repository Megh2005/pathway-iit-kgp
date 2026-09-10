import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Sparkles,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  FileText,
  Upload,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const GroundedSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [domain, setDomain] = useState('Computer Science & AI');
  const [isLoading, setIsLoading] = useState(false);
  const [reportMarkdown, setReportMarkdown] = useState<string | null>(null);
  const [sources, setSources] = useState<{ title: string; url: string }[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sampleQueries = [
    'State space models vs Transformers (Mamba, RWKV)',
    'Direct Preference Optimization vs RLHF recent results',
    'Post-training quantizations for LLMs (AWQ, GPTQ, BitNet)',
    'Test-time compute and reasoning models (o1, DeepSeek-R1)',
    'Diffusion Transformers (DiT) in video generation',
  ];

  const handleSearch = async (queryToUse?: string) => {
    const q = queryToUse || searchQuery;
    if (!q.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/search-grounded-papers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicOrTitle: q.trim(),
          domain,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to search grounded papers.');
      }

      const data = await response.json();
      if (data.success) {
        setReportMarkdown(data.reportMarkdown);
        setSources(data.groundedSources || []);
      } else {
        throw new Error('Search did not return valid report data.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error occurred while querying Google Search Grounding.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Grounded Literature Search</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Live Grounded Academic Literature Search
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Discover real existing research papers, citations, and recent 2024-2026 buzz verified through Google Search Grounding.
              </p>
            </div>
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs shrink-0 self-start sm:self-center"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload PDF Instead</span>
            </Link>
          </div>
        </div>

        {/* Search Bar Box */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="search-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Research Topic, Paper Title, or Question
              </label>
              <div className="relative">
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. FlashAttention-3 or 'Reasoning through search in LLMs'..."
                  className="w-full text-xs pl-10 pr-24 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <button
                  type="submit"
                  disabled={isLoading || !searchQuery.trim()}
                  className={`absolute right-1.5 top-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all ${
                    isLoading || !searchQuery.trim()
                      ? 'bg-slate-300 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            {/* Quick suggested queries */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Suggested Academic Frontiers:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {sampleQueries.map((query, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchQuery(query);
                      handleSearch(query);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 transition-colors border border-slate-200/60"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </form>

          {errorMessage && (
            <div className="mt-5 p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isLoading && (
            <div className="mt-6 p-6 bg-indigo-50/60 border border-indigo-100 rounded-xl text-center">
              <RefreshCw className="w-6 h-6 text-indigo-600 animate-spin mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800">
                Grounded Google Search in Progress...
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Gemini 3.8 Flash is verifying publications, retrieving citations, and compiling recent trends.
              </p>
            </div>
          )}
        </div>

        {/* Results Area */}
        {reportMarkdown && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Grounded Synthesis & Verified Literature
                </h3>
              </div>
              <span className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold">
                Google Grounded
              </span>
            </div>

            {/* Markdown Content */}
            <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed text-xs space-y-3">
              <ReactMarkdown>{reportMarkdown}</ReactMarkdown>
            </div>

            {/* Grounded Web Sources */}
            {sources.length > 0 && (
              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-600" /> Verified Grounded Web Citations ({sources.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {sources.map((src, i) => (
                    <a
                      key={i}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-50 hover:bg-indigo-50/50 rounded-xl border border-slate-200 transition-colors flex items-start justify-between gap-2 group"
                    >
                      <span className="text-xs font-medium text-slate-800 group-hover:text-indigo-600 line-clamp-2">
                        {src.title}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0 mt-0.5" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
