import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowRight,
  ExternalLink,
  Flame,
  Lightbulb,
  AlertCircle,
  Cpu,
  TrendingUp,
  Rocket,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { DoomscrollCard, PaperAnalysisResult } from '../types';

interface DoomscrollFeedProps {
  paperData: PaperAnalysisResult;
  onNavigateTab: (tab: 'breakthroughs' | 'analogy' | 'related' | 'buzz' | 'future') => void;
}

export const DoomscrollFeed: React.FC<DoomscrollFeedProps> = ({ paperData, onNavigateTab }) => {
  const cards = paperData.doomscrollCards || [];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const currentCard: DoomscrollCard = cards[currentIndex] || cards[0];

  // Auto-play timer
  useEffect(() => {
    let timer: any;
    if (isAutoplay && !hasCompleted) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < cards.length - 1) {
            return prev + 1;
          } else {
            setIsAutoplay(false);
            return prev;
          }
        });
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isAutoplay, cards.length, hasCompleted]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'j') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, cards.length]);

  // Speech synthesis
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
    )}. Takeaway: ${currentCard.takeaway}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Cancel speech on card change
  useEffect(() => {
    if (isSpeaking && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentIndex]);

  const triggerCompletionConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const goNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setHasCompleted(true);
      triggerCompletionConfetti();
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setHasCompleted(false);
    }
  };

  const restartFeed = () => {
    setCurrentIndex(0);
    setHasCompleted(false);
  };

  // Card theme helper
  const getCardTheme = (type: string) => {
    switch (type) {
      case 'hook':
        return {
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          icon: <Lightbulb className="w-4 h-4 text-indigo-600" />,
          accentBg: 'from-indigo-500/10 via-blue-500/5 to-transparent',
          borderHighlight: 'border-indigo-100',
        };
      case 'problem':
        return {
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: <AlertCircle className="w-4 h-4 text-rose-600" />,
          accentBg: 'from-rose-500/10 via-orange-500/5 to-transparent',
          borderHighlight: 'border-rose-100',
        };
      case 'analogy':
        return {
          badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: <Sparkles className="w-4 h-4 text-amber-600" />,
          accentBg: 'from-amber-500/15 via-yellow-500/5 to-transparent',
          borderHighlight: 'border-amber-200',
        };
      case 'mechanism':
        return {
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          icon: <Cpu className="w-4 h-4 text-sky-600" />,
          accentBg: 'from-sky-500/10 via-cyan-500/5 to-transparent',
          borderHighlight: 'border-sky-100',
        };
      case 'metrics':
        return {
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
          accentBg: 'from-emerald-500/10 via-teal-500/5 to-transparent',
          borderHighlight: 'border-emerald-100',
        };
      case 'buzz':
        return {
          badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
          icon: <Flame className="w-4 h-4 text-violet-600" />,
          accentBg: 'from-violet-500/10 via-purple-500/5 to-transparent',
          borderHighlight: 'border-violet-100',
        };
      case 'future':
        return {
          badgeBg: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
          icon: <Rocket className="w-4 h-4 text-fuchsia-600" />,
          accentBg: 'from-fuchsia-500/10 via-pink-500/5 to-transparent',
          borderHighlight: 'border-fuchsia-100',
        };
      default:
        return {
          badgeBg: 'bg-slate-50 text-slate-700 border-slate-200',
          icon: <Sparkles className="w-4 h-4 text-slate-600" />,
          accentBg: 'from-slate-500/5 to-transparent',
          borderHighlight: 'border-slate-200',
        };
    }
  };

  const theme = getCardTheme(currentCard?.type || 'hook');

  return (
    <div className="w-full max-w-4xl mx-auto py-4 sm:py-8 px-4">
      {/* Header Banner */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              Doomscroll Mode
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Bite-Sized Research Feed • Swipe or Arrow Keys
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-1 truncate">
            {paperData.paperMeta.title} ({paperData.paperMeta.year})
          </h2>
        </div>

        {/* Controls: Audio, Autoplay, Stage Indicator */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={toggleSpeech}
            className={`p-2 rounded-lg text-xs font-medium border transition-colors flex items-center space-x-1.5 ${
              isSpeaking
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
            title="Read card aloud"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden md:inline">{isSpeaking ? 'Mute' : 'Listen'}</span>
          </button>

          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={`p-2 rounded-lg text-xs font-medium border transition-colors flex items-center space-x-1.5 ${
              isAutoplay
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
            title="Auto-scroll every 7 seconds"
          >
            {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="hidden md:inline">{isAutoplay ? 'Pause' : 'Autoplay'}</span>
          </button>

          <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
            {currentIndex + 1} / {cards.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-6">
        <div
          className="bg-indigo-600 h-full transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* Main Doomscroll Card Viewport */}
      <div className="relative min-h-[520px] sm:min-h-[560px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!hasCompleted ? (
            <motion.div
              key={currentCard?.id || currentIndex}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={`w-full bg-white rounded-3xl border ${theme.borderHighlight} shadow-xl shadow-slate-200/50 overflow-hidden relative p-6 sm:p-10 flex flex-col justify-between`}
            >
              {/* Subtle background glow */}
              <div
                className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${theme.accentBg} rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none`}
              />

              {/* Card Top: Stage Badge & Analogy Indicator */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div
                    className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${theme.badgeBg}`}
                  >
                    {theme.icon}
                    <span>{currentCard?.badge || 'Stage Insight'}</span>
                  </div>

                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Chapter {currentIndex + 1} of {cards.length}
                  </span>
                </div>

                {/* Headline & Subtitle */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
                  {currentCard?.headline}
                </h3>
                {currentCard?.subheadline && (
                  <p className="text-slate-600 font-medium text-base sm:text-lg mb-6 leading-relaxed">
                    {currentCard.subheadline}
                  </p>
                )}

                {/* Analogy Box (If card is an analogy or has analogyHighlight) */}
                {(currentCard?.analogyHighlight || currentCard?.type === 'analogy') && (
                  <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-950 shadow-xs relative">
                    <div className="flex items-center space-x-2 text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Comparative Analogy</span>
                    </div>
                    <p className="text-sm sm:text-base font-medium italic leading-relaxed text-amber-900">
                      "{currentCard.analogyHighlight || paperData.comparativeAnalogies.visualMetaphor}"
                    </p>
                  </div>
                )}

                {/* Key Bullet Points */}
                <div className="space-y-3 mb-6">
                  {currentCard?.bulletPoints?.map((bullet, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-slate-100 text-indigo-600 flex items-center justify-center shrink-0 text-xs font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Stat or Callout Quote */}
                {currentCard?.statOrQuote && (
                  <div className="inline-flex items-center space-x-3 bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-xl mb-4">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      {currentCard.statOrQuote.label}:
                    </span>
                    <span className="text-sm sm:text-base font-bold text-indigo-700 font-mono">
                      {currentCard.statOrQuote.value}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Footer: Takeaway & Actions */}
              <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                <div className="flex items-start space-x-2 max-w-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    <span className="font-bold text-slate-800">Core Takeaway: </span>
                    {currentCard?.takeaway}
                  </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
                    title="Previous card (Arrow Up)"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>

                  <button
                    onClick={goNext}
                    className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-indigo-200 transition-all active:scale-95 text-sm"
                    title="Next card (Arrow Down or Spacebar)"
                  >
                    <span>{currentIndex === cards.length - 1 ? 'Finish Feed' : 'Next Bite'}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Feed Completed Screen */
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Doomscroll Complete! 🎓
              </h3>
              <p className="text-slate-600 max-w-md mx-auto mb-8 text-sm sm:text-base">
                You've mastered the core story, comparative analogies, breakthroughs, and buzz of{' '}
                <span className="font-semibold text-slate-800">"{paperData.paperMeta.title}"</span>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-8">
                <button
                  onClick={() => onNavigateTab('related')}
                  className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-left transition-all group"
                >
                  <span className="text-xs font-bold text-indigo-700 block mb-1">
                    Explore Literature →
                  </span>
                  <span className="text-xs text-slate-600">
                    See {paperData.relatedPapers.length} real verified related papers with links
                  </span>
                </button>

                <button
                  onClick={() => onNavigateTab('buzz')}
                  className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50 text-left transition-all group"
                >
                  <span className="text-xs font-bold text-amber-800 block mb-1">
                    Industry Buzz & Debates →
                  </span>
                  <span className="text-xs text-slate-600">
                    What researchers and engineers are discussing today
                  </span>
                </button>

                <button
                  onClick={() => onNavigateTab('future')}
                  className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-50 text-left transition-all group"
                >
                  <span className="text-xs font-bold text-purple-700 block mb-1">
                    Thesis & Future Work →
                  </span>
                  <span className="text-xs text-slate-600">
                    High-potential ideas ready to be researched
                  </span>
                </button>
              </div>

              <button
                onClick={restartFeed}
                className="inline-flex items-center space-x-2 text-sm text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay Doomscroll Feed</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Mini Navigation Bar below card */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-2">
        <span className="hidden sm:inline">Tip: Press Spacebar or ↓ to advance cards</span>
        <div className="flex items-center space-x-2 mx-auto sm:mx-0">
          {cards.map((c, i) => (
            <button
              key={c.id || i}
              onClick={() => {
                setCurrentIndex(i);
                setHasCompleted(false);
              }}
              className={`h-2 rounded-full transition-all ${
                currentIndex === i
                  ? 'w-6 bg-indigo-600'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              title={`Jump to slide ${i + 1}: ${c.headline}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
