import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  BookOpen,
  CheckCircle2,
  List,
  Columns,
  Scale,
  Cpu,
  BarChart2,
  Lightbulb,
  Compass,
  Award,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { DoomscrollCard, PaperAnalysisResult } from '../types';

interface ExecutiveBriefingViewProps {
  paperData: PaperAnalysisResult;
  onNavigateTab?: (tab: string) => void;
}

export const ExecutiveBriefingView: React.FC<ExecutiveBriefingViewProps> = ({
  paperData,
  onNavigateTab,
}) => {
  const cards = paperData.doomscrollCards || [];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'card' | 'document'>('card');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);

  const currentCard: DoomscrollCard = cards[currentIndex] || cards[0];

  // Auto-advance timer when autoplay is enabled
  useEffect(() => {
    let timer: any;
    if (isAutoplay && viewMode === 'card') {
      timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < cards.length - 1) {
            return prev + 1;
          } else {
            setIsAutoplay(false);
            return prev;
          }
        });
      }, 8000);
    }
    return () => clearInterval(timer);
  }, [isAutoplay, cards.length, viewMode]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'card') return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'j') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'k') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, cards.length, viewMode]);

  // Speech synthesis for audio narration
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${currentCard.headline}. ${currentCard.subheadline || ''}. ${currentCard.bulletPoints.join(
      '. '
    )}. Key Takeaway: ${currentCard.takeaway}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Stop speech when changing cards
  useEffect(() => {
    if (isSpeaking && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentIndex, viewMode]);

  const goNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'hook':
      case 'problem':
        return <AlertCircle className="w-4 h-4 text-slate-700" />;
      case 'breakthrough':
        return <Award className="w-4 h-4 text-slate-700" />;
      case 'mechanism':
        return <Cpu className="w-4 h-4 text-slate-700" />;
      case 'analogy':
        return <Lightbulb className="w-4 h-4 text-slate-700" />;
      case 'metrics':
        return <BarChart2 className="w-4 h-4 text-slate-700" />;
      case 'future':
        return <Compass className="w-4 h-4 text-slate-700" />;
      default:
        return <BookOpen className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 space-y-6">
      {/* Control Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
              Executive Briefing
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Section {currentIndex + 1} of {cards.length}
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-1">
            {paperData.paperMeta.title}
          </h2>
        </div>

        {/* View Mode & Audio Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'card'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Interactive</span>
            </button>
            <button
              onClick={() => setViewMode('document')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'document'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Full Dossier</span>
            </button>
          </div>

          {viewMode === 'card' && (
            <>
              <button
                onClick={toggleSpeech}
                className={`p-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                  isSpeaking
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
                title={isSpeaking ? 'Stop narration' : 'Listen to audio briefing'}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden md:inline">{isSpeaking ? 'Mute' : 'Narrate'}</span>
              </button>

              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className={`p-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                  isAutoplay
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
                title={isAutoplay ? 'Pause playback' : 'Autoplay cards'}
              >
                {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="hidden md:inline">{isAutoplay ? 'Pause' : 'Autoplay'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mode 1: Interactive Step-by-Step Card Mode */}
      {viewMode === 'card' && currentCard && (
        <div className="space-y-4">
          {/* Progress Indicators */}
          <div className="grid grid-cols-6 sm:grid-cols-7 lg:grid-cols-8 gap-1.5">
            {cards.map((c, idx) => (
              <button
                key={c.id || idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-slate-900 ring-2 ring-slate-400'
                    : idx < currentIndex
                    ? 'bg-slate-400'
                    : 'bg-slate-200 hover:bg-slate-300'
                }`}
                title={`Jump to Section ${idx + 1}: ${c.badge}`}
              />
            ))}
          </div>

          {/* Main Card View */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id || currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6"
            >
              {/* Card Meta & Stage Badge */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2">
                  <span className="p-1.5 rounded-lg bg-slate-100 border border-slate-200">
                    {getCardIcon(currentCard.type)}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {currentCard.badge}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  Section {currentIndex + 1} of {cards.length}
                </span>
              </div>

              {/* Headline & Subheadline */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  {currentCard.headline}
                </h3>
                {currentCard.subheadline && (
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {currentCard.subheadline}
                  </p>
                )}
              </div>

              {/* Analogy / Callout Highlight if Present */}
              {currentCard.analogyHighlight && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm italic">
                  <strong className="not-italic font-semibold text-slate-900 block mb-1">
                    Conceptual Intuition:
                  </strong>
                  "{currentCard.analogyHighlight}"
                </div>
              )}

              {/* Structured Key Points */}
              {currentCard.bulletPoints && currentCard.bulletPoints.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Critical Points & Evidence
                  </h4>
                  <ul className="space-y-2">
                    {currentCard.bulletPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start space-x-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantitative Stat or Quote Highlight */}
              {currentCard.statOrQuote && (
                <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs uppercase font-medium tracking-wider text-slate-400 block">
                      {currentCard.statOrQuote.label}
                    </span>
                    <span className="text-lg sm:text-xl font-bold font-mono">
                      {currentCard.statOrQuote.value}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 max-w-xs text-right">
                    Verified empirical metric reported in paper
                  </span>
                </div>
              )}

              {/* Key Takeaway */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-600 block mb-1">
                  Bottom-Line Takeaway
                </span>
                <p className="text-sm font-semibold leading-relaxed">
                  {currentCard.takeaway}
                </p>
              </div>

              {/* Card Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    currentIndex === 0
                      ? 'text-slate-300 border-slate-200 cursor-not-allowed'
                      : 'text-slate-700 bg-white border-slate-300 hover:bg-slate-50 active:scale-98'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Section</span>
                </button>

                <span className="text-xs text-slate-400 hidden sm:inline">
                  Tip: Use left & right arrow keys to navigate
                </span>

                <button
                  onClick={goNext}
                  disabled={currentIndex === cards.length - 1}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    currentIndex === cards.length - 1
                      ? 'text-slate-300 border-slate-200 cursor-not-allowed'
                      : 'text-white bg-slate-900 border-slate-900 hover:bg-slate-800 active:scale-98'
                  }`}
                >
                  <span>Next Section</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Mode 2: Continuous Scholarly Document View */}
      {viewMode === 'document' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Continuous Executive Dossier
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Complete sequential walkthrough of all {cards.length} analytical sections for unified reading and export.
            </p>

            <div className="divide-y divide-slate-100">
              {cards.map((c, idx) => (
                <div key={c.id || idx} className="py-6 first:pt-0 last:pb-0 space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {c.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">
                    {c.headline}
                  </h4>

                  {c.subheadline && (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {c.subheadline}
                    </p>
                  )}

                  {c.bulletPoints && c.bulletPoints.length > 0 && (
                    <ul className="space-y-1.5 pt-1">
                      {c.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {c.takeaway && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-900 font-medium">
                      <strong>Takeaway: </strong> {c.takeaway}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
