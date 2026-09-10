import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  MessageSquare,
  Upload,
  Search,
  Share2,
  CheckCircle2,
  Clock,
  Printer,
  Cpu,
  Layers,
  Scale,
  Compass,
  PlusCircle,
  ArrowRight,
} from 'lucide-react';
import { usePaper } from '../context/PaperContext';
import { ExecutiveBriefingView } from '../components/ExecutiveBriefingView';
import { NewOutputsSection } from '../components/NewOutputsSection';
import { ComparativeAnalogyLab } from '../components/ComparativeAnalogyLab';
import { RelatedPapersRadar } from '../components/RelatedPapersRadar';
import { BuzzAndTrendsSection } from '../components/BuzzAndTrendsSection';
import { FutureScopeSection } from '../components/FutureScopeSection';
import { PaperChatDrawer } from '../components/PaperChatDrawer';

type ActiveTab = 'briefing' | 'methodology' | 'analogies' | 'literature' | 'reception' | 'future';

export const AnalysisWorkspacePage: React.FC = () => {
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const { currentPaper } = usePaper();

  const [activeTab, setActiveTab] = useState<ActiveTab>('briefing');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync tab from URL params if present
  useEffect(() => {
    if (tab) {
      if (tab === 'feed' || tab === 'briefing') setActiveTab('briefing');
      else if (tab === 'breakthroughs' || tab === 'methodology') setActiveTab('methodology');
      else if (tab === 'analogy' || tab === 'analogies') setActiveTab('analogies');
      else if (tab === 'related' || tab === 'literature') setActiveTab('literature');
      else if (tab === 'buzz' || tab === 'reception') setActiveTab('reception');
      else if (tab === 'future') setActiveTab('future');
    }
  }, [tab]);

  const handleTabChange = (newTab: ActiveTab) => {
    setActiveTab(newTab);
    navigate(`/analysis/${newTab}`);
  };

  const handleCopySummary = () => {
    if (!currentPaper) return;
    const text = `Scholarly Dossier: ${currentPaper.paperMeta.title} (${currentPaper.paperMeta.year})\nAuthors: ${
      Array.isArray(currentPaper.paperMeta.authors)
        ? currentPaper.paperMeta.authors.join(', ')
        : currentPaper.paperMeta.authors
    }\n\nExecutive TL;DR:\n${currentPaper.paperMeta.tldr}\n\nPrimary Breakthrough:\n${
      currentPaper.newOutputs.primaryBreakthrough
    }\n\nEveryday Intuition Analogy:\n${currentPaper.comparativeAnalogies.intuitionTakeaway}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // If no paper is currently loaded, display a clean, dedicated prompt to go to the Upload Screen
  if (!currentPaper) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="max-w-md w-full text-center bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center mx-auto border border-slate-200">
            <BookOpen className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              No Research Manuscript Loaded
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Upload an academic PDF or select a landmark publication to view its comprehensive technical dossier, novel outputs, and comparative analogies.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => navigate('/upload')}
              id="empty-state-upload-btn"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all active:scale-98"
            >
              <Upload className="w-4 h-4" />
              <span>Go to Paper Upload Screen</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/search')}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Or Explore Grounded Literature</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { paperMeta } = currentPaper;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Paper Header / Metadata Dossier */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 max-w-4xl">
              {/* Meta Tags */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-slate-100 text-slate-800 font-bold px-2.5 py-0.5 rounded border border-slate-200">
                  {paperMeta.domain}
                </span>
                <span className="bg-slate-50 text-slate-700 font-medium px-2.5 py-0.5 rounded border border-slate-200">
                  {paperMeta.year} &bull; {paperMeta.journalOrConference || 'Preprint Publication'}
                </span>
                {paperMeta.doiOrArxiv && (
                  <span className="text-slate-500 font-mono text-xs">
                    {paperMeta.doiOrArxiv}
                  </span>
                )}
                <span className="bg-slate-50 text-slate-700 font-medium px-2 py-0.5 rounded text-xs border border-slate-200">
                  Rating: {paperMeta.complexityRating}
                </span>
                <span className="text-slate-500 flex items-center gap-1 text-xs">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{paperMeta.readingTimeMinutes} min formal digest</span>
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                {paperMeta.title}
              </h1>

              {/* Authors */}
              <p className="text-xs sm:text-sm text-slate-600">
                <span className="font-semibold text-slate-700">Authors:</span>{' '}
                <span className="text-slate-800">
                  {Array.isArray(paperMeta.authors) ? paperMeta.authors.join(', ') : paperMeta.authors}
                </span>
              </p>

              {/* Executive Summary Card */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800">
                <strong className="font-bold text-slate-900 block mb-1">Executive Summary:</strong>
                <p className="leading-relaxed font-normal">{paperMeta.tldr}</p>
              </div>
            </div>

            {/* Action Buttons: Navigate to separate upload screen - NO POPUPS */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
              <button
                onClick={() => navigate('/upload')}
                id="workspace-analyze-new-paper-btn"
                className="inline-flex items-center gap-1.5 text-xs text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg font-bold border border-slate-300 transition-colors shadow-xs"
                title="Go to the upload screen to analyze another paper"
              >
                <PlusCircle className="w-3.5 h-3.5 text-slate-700" />
                <span>Analyse New Paper</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 text-xs text-slate-700 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-lg font-semibold border border-slate-200 transition-colors shadow-xs"
                title="Copy formal summary to clipboard"
              >
                {copied ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />
                ) : (
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                )}
                <span>{copied ? 'Copied' : 'Export'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-700 bg-white hover:bg-slate-50 px-3 py-2 rounded-lg font-semibold border border-slate-200 transition-colors shadow-xs"
                title="Print or export to PDF"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print</span>
              </button>

              <button
                onClick={() => setIsChatOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-white bg-slate-900 hover:bg-slate-800 px-3.5 py-2 rounded-lg font-semibold shadow-xs transition-all active:scale-98"
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-300" />
                <span>Ask AI Assistant</span>
              </button>
            </div>
          </div>
        </div>

        {/* Formal Tab Navigation Bar */}
        <div className="border-t border-slate-200 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 sm:space-x-2 py-2 overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => handleTabChange('briefing')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === 'briefing'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-300 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>Executive Briefing</span>
              </button>

              <button
                onClick={() => handleTabChange('methodology')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === 'methodology'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-300 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-slate-500" />
                <span>Methodology & Novelty</span>
              </button>

              <button
                onClick={() => handleTabChange('analogies')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === 'analogies'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-300 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                <span>Conceptual Analogies</span>
              </button>

              <button
                onClick={() => handleTabChange('literature')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === 'literature'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-300 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Related Literature</span>
                <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded ml-0.5">
                  {currentPaper.relatedPapers?.length || 0}
                </span>
              </button>

              <button
                onClick={() => handleTabChange('reception')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === 'reception'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-300 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Scale className="w-3.5 h-3.5 text-slate-500" />
                <span>Field Reception</span>
              </button>

              <button
                onClick={() => handleTabChange('future')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === 'future'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-300 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-slate-500" />
                <span>Limitations & Agenda</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'briefing' && (
          <ExecutiveBriefingView
            paperData={currentPaper}
            onNavigateTab={(targetTab) => handleTabChange(targetTab as ActiveTab)}
          />
        )}

        {activeTab === 'methodology' && <NewOutputsSection paperData={currentPaper} />}

        {activeTab === 'analogies' && <ComparativeAnalogyLab paperData={currentPaper} />}

        {activeTab === 'literature' && (
          <RelatedPapersRadar
            paperData={currentPaper}
            onOpenLiveSearch={() => navigate('/search')}
          />
        )}

        {activeTab === 'reception' && <BuzzAndTrendsSection paperData={currentPaper} />}

        {activeTab === 'future' && <FutureScopeSection paperData={currentPaper} />}
      </main>

      {/* Interactive Paper AI Assistant Drawer */}
      <PaperChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        paperData={currentPaper}
      />
    </div>
  );
};
