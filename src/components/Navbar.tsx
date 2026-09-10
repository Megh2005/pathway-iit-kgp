import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Share2,
  FileText,
  PlusCircle,
  Sparkles,
} from 'lucide-react';
import { usePaper } from '../context/PaperContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentPaper, setCurrentPaper } = usePaper();
  const [copied, setCopied] = useState(false);

  const isWorkspace = location.pathname === '/' || location.pathname.startsWith('/analysis');
  const isSearch = location.pathname === '/search';

  const handleShare = () => {
    if (!currentPaper) return;
    const text = `Scholarly Dossier: ${currentPaper.paperMeta.title} (${currentPaper.paperMeta.year})\n\nPrimary Breakthrough: ${currentPaper.newOutputs.primaryBreakthrough}\n\nExecutive TL;DR: ${currentPaper.paperMeta.tldr}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNewAnalysis = () => {
    navigate('/analysis');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Formal Academic Logo & Title */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-9 w-9 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xs">
              <BookOpen className="w-5 h-5 text-slate-100" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
                  PaperPulse
                </span>
                <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-mono font-medium border border-slate-200">
                  Gemini 3.1 Flash-Lite
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Scholarly Research Synthesis & Intelligence
              </p>
            </div>
          </Link>

          {/* Primary Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs font-semibold text-slate-600">
            <Link
              to="/analysis"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                isWorkspace
                  ? 'bg-slate-100 text-slate-900 font-bold border border-slate-200'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Research Workspace</span>
              {currentPaper && (
                <span className="w-2 h-2 rounded-full bg-slate-900" title="Active paper loaded" />
              )}
            </Link>

            <Link
              to="/search"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                isSearch
                  ? 'bg-slate-100 text-slate-900 font-bold border border-slate-200'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Literature Search</span>
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {currentPaper && (
              <button
                onClick={handleShare}
                className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg transition-colors font-medium shadow-xs"
                title="Copy formal summary to clipboard"
              >
                {copied ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />
                ) : (
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                )}
                <span>{copied ? 'Copied' : 'Export Briefing'}</span>
              </button>
            )}

            <button
              onClick={handleNewAnalysis}
              id="navbar-analyze-btn"
              className="flex items-center space-x-1.5 text-xs text-white bg-slate-900 hover:bg-slate-800 px-3.5 py-2 rounded-lg font-semibold shadow-xs transition-all active:scale-98"
            >
              <PlusCircle className="w-3.5 h-3.5 text-slate-300" />
              <span>Analyze Paper</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
