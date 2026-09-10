import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  Flame,
  FileText,
  MessageSquare,
  Upload,
  Search,
  Share2,
  CheckCircle2,
  ExternalLink,
  Clock,
  Layers,
  ArrowRight,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { usePaper } from '../context/PaperContext';
import { DoomscrollFeed } from '../components/DoomscrollFeed';
import { NewOutputsSection } from '../components/NewOutputsSection';
import { ComparativeAnalogyLab } from '../components/ComparativeAnalogyLab';
import { RelatedPapersRadar } from '../components/RelatedPapersRadar';
import { BuzzAndTrendsSection } from '../components/BuzzAndTrendsSection';
import { FutureScopeSection } from '../components/FutureScopeSection';
import { PaperChatDrawer } from '../components/PaperChatDrawer';

type ActiveTab = 'feed' | 'breakthroughs' | 'analogy' | 'related' | 'buzz' | 'future';

export const AnalysisWorkspacePage: React.FC = () => {
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const { currentPaper } = usePaper();

  const [activeTab, setActiveTab] = useState<ActiveTab>('feed');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync tab from URL params if present
  useEffect(() => {
    if (tab && ['feed', 'breakthroughs', 'analogy', 'related', 'buzz', 'future'].includes(tab)) {
      setActiveTab(tab as ActiveTab);
    }
  }, [tab]);

  const handleTabChange = (newTab: ActiveTab) => {
    setActiveTab(newTab);
    navigate(`/analysis/${newTab}`);
  };

  const handleCopySummary = () => {
    if (!currentPaper) return;
    const text = `Research Analysis: ${currentPaper.paperMeta.title} (${currentPaper.paperMeta.year})\n\nTL;DR: ${currentPaper.paperMeta.tldr}\n\nPrimary Breakthrough: ${currentPaper.newOutputs.primaryBreakthrough}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If no paper is currently loaded, display the empty state prompt
  if (!currentPaper) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-5 border border-indigo-100">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
            No Research Paper Loaded
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed mb-6">
            In order to view the interactive Doomscroll feed, novel breakthrough outputs, comparative analogies,
            and citation radar, please upload an academic PDF research paper.
          </p>
          <div className="space-y-3">
            <Link
              to="/upload"
              id="empty-state-upload-btn"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95 shadow-indigo-200"
            >
              <Upload className="w-4 h-4" />
              <span>Go to PDF Upload Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/search"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Or Explore Grounded Literature</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { paperMeta } = currentPaper;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Paper Header / Metadata Hero */}
      <div className="bg-white border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2 max-w-4xl">
              {/* Meta Tags */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-indigo-50 text-indigo-700 font-bold px-3 py-0.5 rounded-full border border-indigo-100 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-600" /> {paperMeta.domain}
                </span>
                <span className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-0.5 rounded-full">
                  {paperMeta.year} &bull; {paperMeta.journalOrConference || 'Preprint'}
                </span>
                {paperMeta.doiOrArxiv && (
                  <span className="text-slate-500 font-mono text-[11px]">
                    {paperMeta.doiOrArxiv}
                  </span>
                )}
                <span className="bg-amber-50 text-amber-800 font-medium px-2 py-0.5 rounded-full text-[11px] border border-amber-200">
                  {paperMeta.complexityRating}
                </span>
                <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3" /> {paperMeta.readingTimeMinutes} min digest
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                {paperMeta.title}
              </h1>

              {/* Authors */}
              <p className="text-xs text-slate-500">
                Authors:{' '}
                <span className="text-slate-800 font-medium">
                  {Array.isArray(paperMeta.authors) ? paperMeta.authors.join(', ') : paperMeta.authors}
                </span>
              </p>

              {/* TL;DR Card */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-700 mt-2">
                <strong className="text-indigo-900 font-semibold">Executive TL;DR: </strong>
                <span>{paperMeta.tldr}</span>
              </div>
            </div>

            {/* Quick Right-Hand Actions */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 lg:self-start shrink-0">
              <Link
                to="/upload"
                className="inline-flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl font-medium border border-slate-200 transition-colors"
                title="Upload another research paper"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New Paper</span>
              </Link>

              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 text-xs text-slate-700 bg-white hover:bg-slate-50 px-3 py-2 rounded-xl font-medium border border-slate-200 transition-colors shadow-xs"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>

              <button
                onClick={() => setIsChatOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-2 rounded-xl font-bold shadow-xs shadow-indigo-200 transition-all active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ask AI Assistant</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs Bar */}
        <div className="border-t border-slate-200/80 bg-slate-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 sm:space-x-2 py-2 overflow-x-auto no-scrollbar text-xs font-semibold">
              <button
                onClick={() => handleTabChange('feed')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'feed'
                    ? 'bg-white text-indigo-700 shadow-xs border border-slate-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Flame className={`w-3.5 h-3.5 ${activeTab === 'feed' ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>Doomscroll Feed</span>
              </button>

              <button
                onClick={() => handleTabChange('breakthroughs')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'breakthroughs'
                    ? 'bg-white text-indigo-700 shadow-xs border border-slate-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <FileText className={`w-3.5 h-3.5 ${activeTab === 'breakthroughs' ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>Novel Outputs</span>
              </button>

              <button
                onClick={() => handleTabChange('analogy')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'analogy'
                    ? 'bg-white text-indigo-700 shadow-xs border border-slate-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${activeTab === 'analogy' ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>Analogy Lab</span>
              </button>

              <button
                onClick={() => handleTabChange('related')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'related'
                    ? 'bg-white text-indigo-700 shadow-xs border border-slate-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <BookOpen className={`w-3.5 h-3.5 ${activeTab === 'related' ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>Related Papers ({currentPaper.relatedPapers?.length || 0})</span>
              </button>

              <button
                onClick={() => handleTabChange('buzz')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'buzz'
                    ? 'bg-white text-indigo-700 shadow-xs border border-slate-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Flame className={`w-3.5 h-3.5 ${activeTab === 'buzz' ? 'text-amber-500' : 'text-slate-400'}`} />
                <span>Buzz & Trends</span>
              </button>

              <button
                onClick={() => handleTabChange('future')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'future'
                    ? 'bg-white text-indigo-700 shadow-xs border border-slate-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${activeTab === 'future' ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>Future Scope</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Tab Content View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'feed' && (
          <DoomscrollFeed
            paperData={currentPaper}
            onNavigateTab={(targetTab) => handleTabChange(targetTab as ActiveTab)}
          />
        )}

        {activeTab === 'breakthroughs' && (
          <NewOutputsSection paperData={currentPaper} />
        )}

        {activeTab === 'analogy' && (
          <ComparativeAnalogyLab paperData={currentPaper} />
        )}

        {activeTab === 'related' && (
          <RelatedPapersRadar
            paperData={currentPaper}
            onOpenLiveSearch={() => navigate('/search')}
          />
        )}

        {activeTab === 'buzz' && (
          <BuzzAndTrendsSection paperData={currentPaper} />
        )}

        {activeTab === 'future' && (
          <FutureScopeSection paperData={currentPaper} />
        )}
      </main>

      {/* Floating Chat Drawer for Context-Aware Paper Q&A */}
      <PaperChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        paperData={currentPaper}
      />
    </div>
  );
};
