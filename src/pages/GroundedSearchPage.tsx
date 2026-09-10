import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  BookOpen,
  ExternalLink,
  AlertCircle,
  FileText,
  ArrowRight,
  Sparkles,
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
    'State Space Models vs Transformers (Mamba, RWKV-6)',
    'Direct Preference Optimization vs RLHF empirical results',
    'Post-training quantization for LLMs (AWQ, GPTQ, BitNet)',
    'Test-time compute and reasoning models (DeepSeek-R1, OpenAI o1)',
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
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              <BookOpen className="w-4 h-4 text-slate-600" />
              <span>Grounded Academic Search</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Scholarly Literature & Citation Discovery
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Query real peer-reviewed publications, arXiv preprints, and recent developments verified through Google Search Grounding.
            </p>
          </div>

          <Link
            to="/analysis"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs shrink-0 self-start sm:self-center"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Open Paper Workspace</span>
          </Link>
        </div>

        {/* Search Bar Box */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
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
                  className="w-full text-xs pl-10 pr-28 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <button
                  type="submit"
                  disabled={isLoading || !searchQuery.trim()}
                  className={`absolute right-1.5 top-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all ${
                    isLoading || !searchQuery.trim()
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-900 hover:bg-slate-800 active:scale-98'
                  }`}
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            {/* Quick suggested queries */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Sample Research Queries:
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
                    className="text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors font-medium text-left"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-slate-900">
              Retrieving grounded scholarly publications and citations...
            </p>
            <p className="text-[11px] text-slate-500">
              Powered by Google Search Grounding with Gemini 3.1 Flash-Lite
            </p>
          </div>
        )}

        {/* Results Report */}
        {reportMarkdown && !isLoading && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Grounded Synthesis Report
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {sources.length} Grounded References
                </span>
              </div>

              <div className="prose prose-sm max-w-none text-slate-800 leading-relaxed">
                <ReactMarkdown>{reportMarkdown}</ReactMarkdown>
              </div>

              {/* Verified Sources List */}
              {sources.length > 0 && (
                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Verified Google Grounding Citations
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sources.map((src, sIdx) => (
                      <a
                        key={sIdx}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white text-xs font-medium text-slate-800 transition-colors"
                      >
                        <span className="truncate mr-2">{src.title || src.url}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
