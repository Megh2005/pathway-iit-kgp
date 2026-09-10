import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  Upload,
  Search,
  CheckCircle2,
  Share2,
  Flame,
  FileText,
  Compass,
} from 'lucide-react';
import { usePaper } from '../context/PaperContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentPaper } = usePaper();
  const [copied, setCopied] = React.useState(false);

  const isAnalysisRoute = location.pathname.startsWith('/analysis');
  const isUploadRoute = location.pathname === '/upload';
  const isSearchRoute = location.pathname === '/search';
  const isHomeRoute = location.pathname === '/';

  const handleShare = () => {
    if (!currentPaper) return;
    const text = `Research Analysis: ${currentPaper.paperMeta.title} (${currentPaper.paperMeta.year})\nBreakthrough: ${currentPaper.newOutputs.primaryBreakthrough}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-blue-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                  PaperPulse
                </span>
                <span className="bg-indigo-50 text-indigo-700 text-[11px] px-2 py-0.5 rounded-full font-bold border border-indigo-100 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-600" /> AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Multimodal Research Analyzer
              </p>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-600">
            <Link
              to="/"
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                isHomeRoute
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              Overview
            </Link>

            <Link
              to="/upload"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                isUploadRoute
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Feed</span>
            </Link>

            <Link
              to="/analysis"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                isAnalysisRoute
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Analysis Hub</span>
              {currentPaper && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </Link>

            <Link
              to="/search"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                isSearchRoute
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Grounded Literature</span>
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {currentPaper && isAnalysisRoute && (
              <button
                onClick={handleShare}
                className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl transition-colors font-medium shadow-xs"
                title="Copy paper summary"
              >
                {copied ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Share2 className="w-3.5 h-3.5" />
                )}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>
            )}

            <Link
              to="/upload"
              id="navbar-upload-btn"
              className="flex items-center space-x-1.5 text-xs text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-2 rounded-xl font-bold shadow-xs shadow-indigo-200 transition-all active:scale-95"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload PDF</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center overflow-x-auto py-2 border-t border-slate-100 no-scrollbar space-x-1 text-xs">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
              isHomeRoute ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Home
          </Link>
          <Link
            to="/upload"
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
              isUploadRoute ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Upload Paper
          </Link>
          <Link
            to="/analysis"
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
              isAnalysisRoute ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Analysis Hub {currentPaper ? '●' : ''}
          </Link>
          <Link
            to="/search"
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
              isSearchRoute ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Literature Search
          </Link>
        </div>
      </div>
    </header>
  );
};
