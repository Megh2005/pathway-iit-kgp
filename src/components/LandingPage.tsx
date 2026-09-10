import React from 'react';
import { Link } from 'react-router-dom';
import {
  Upload,
  BookOpen,
  Sparkles,
  Flame,
  ArrowRight,
  Search,
  CheckCircle2,
  Share2,
  Cpu,
  Layers,
  Network,
  Zap,
  Compass,
  FileCheck2,
  GraduationCap,
  TrendingUp,
} from 'lucide-react';
import { usePaper } from '../context/PaperContext';

export const LandingPage: React.FC = () => {
  const { currentPaper } = usePaper();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Background radial decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-indigo-100/70 via-blue-50/40 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 shadow-xs text-xs font-semibold text-indigo-800 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Production Multimodal Research Engine</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 font-medium">Powered by Gemini 3.8 Flash</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.12]">
          Deconstruct Complex Research Papers Into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600">
            Intuitive Insights & Analogies
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Upload any academic PDF. In seconds, extract the genuine breakthrough outputs, plain-English
          comparative analogies, verified existing companion literature, and an interactive bite-sized feed.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto">
          <Link
            to="/upload"
            id="landing-hero-upload-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm shadow-md shadow-indigo-200 transition-all active:scale-95 group"
          >
            <Upload className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            <span>Upload Research Paper (PDF)</span>
            <ArrowRight className="w-4 h-4 ml-0.5 transition-transform group-hover:translate-x-1" />
          </Link>

          {currentPaper ? (
            <Link
              to="/analysis"
              id="landing-hero-resume-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 shadow-xs transition-colors"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>Resume Active Analysis</span>
            </Link>
          ) : (
            <Link
              to="/search"
              id="landing-hero-search-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 shadow-xs transition-colors"
            >
              <Search className="w-4 h-4 text-indigo-600" />
              <span>Grounded Literature Search</span>
            </Link>
          )}
        </div>

        {/* Active Paper Banner if already analyzed */}
        {currentPaper && (
          <div className="mt-8 max-w-xl mx-auto p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2 text-left truncate">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">
                Currently Analyzed: <strong className="font-semibold">{currentPaper.paperMeta.title}</strong>
              </span>
            </div>
            <Link
              to="/analysis"
              className="shrink-0 font-semibold text-emerald-700 hover:text-emerald-800 ml-3 underline"
            >
              View Dossier &rarr;
            </Link>
          </div>
        )}

        {/* Trust & Integrity Micro-Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>Zero Pre-baked Dummy Data</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>Multimodal Ingestion (up to 60MB PDF)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>Verified Real Citations with arXiv URLs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>Interactive Reel with Speech Synthesis</span>
          </div>
        </div>
      </section>

      {/* Feature Pillar Bento Grid */}
      <section className="py-16 bg-white border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
              Deep Scientific Deconstruction
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Everything You Need to Understand, Critique, and Advance the Paper
            </p>
            <p className="mt-3 text-sm text-slate-500">
              No generic summaries. We extract the actual mathematical shift, empirical leaps, and future horizons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1: Doomscroll Feed */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 transition-all shadow-xs hover:shadow-sm group">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Doomscroll Story Reel
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Transforms dense 30-page papers into a punchy 7-stage vertical feed with audio narration,
                key metric callouts, and takeaways designed for rapid comprehension.
              </p>
              <div className="text-[11px] font-semibold text-indigo-600 flex items-center gap-1">
                <span>Story stages: Hook &rarr; Mechanism &rarr; Future</span>
              </div>
            </div>

            {/* Feature 2: Novel Breakthroughs */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 transition-all shadow-xs hover:shadow-sm group">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Paradigm Shift & Mechanism Deconstruction
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Identifies the core algorithmic innovation, contrasts Before vs. After status quo,
                and tabulates empirical benchmark gains against previous state-of-the-art baselines.
              </p>
              <div className="text-[11px] font-semibold text-indigo-600 flex items-center gap-1">
                <span>Direct mathematical & procedural dissection</span>
              </div>
            </div>

            {/* Feature 3: Comparative Analogy Lab */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 transition-all shadow-xs hover:shadow-sm group">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Comparative Analogy Lab & Concept Cast
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Maps complex algorithmic equations to memorable everyday metaphors (e.g. airport luggage routing,
                orchestra conductors), plus tailored multi-persona explanations for high schoolers, founders, and researchers.
              </p>
              <div className="text-[11px] font-semibold text-indigo-600 flex items-center gap-1">
                <span>Multi-audience intuitive translations</span>
              </div>
            </div>

            {/* Feature 4: Verified Citation Radar */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 transition-all shadow-xs hover:shadow-sm group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Real Existing Citation Network
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Finds genuine, non-hallucinated related papers across foundational precursors, direct competitors,
                and follow-up works, complete with verified arXiv / venue links and technical contrasts.
              </p>
              <div className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <span>Verified academic URLs and citations</span>
              </div>
            </div>

            {/* Feature 5: Buzz, Debates & Timelines */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 transition-all shadow-xs hover:shadow-sm group">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Community Buzz & Academic Debates
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Synthesizes discussions from X, Reddit, Hugging Face, and conferences. Gauges community sentiment,
                production adoption status, and open technical controversies.
              </p>
              <div className="text-[11px] font-semibold text-purple-700 flex items-center gap-1">
                <span>Sentiment metrics & evolutionary timelines</span>
              </div>
            </div>

            {/* Feature 6: Future Frontiers & Thesis Generator */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 transition-all shadow-xs hover:shadow-sm group">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Future Scope & Thesis Topics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Identifies unaddressed failure modes, open problems for the domain, concrete thesis proposals
                with difficulty rankings, and commercial startup opportunities.
              </p>
              <div className="text-[11px] font-semibold text-amber-700 flex items-center gap-1">
                <span>Actionable dissertation & product avenues</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Workflow */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Simple 3-Step Process</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            From Raw PDF to Complete Research Dossier
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="relative bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-start">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-4 shadow-sm shadow-indigo-200">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Upload Research Paper</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Select or drag-and-drop any academic PDF research paper (even large 50+ page conference preprints).
              Or paste text / arXiv ID directly.
            </p>
            <div className="mt-auto w-full pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>PDF up to 60MB</span>
              <Upload className="w-4 h-4 text-indigo-600" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-start">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-4 shadow-sm shadow-indigo-200">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Deep AI Analysis</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Gemini 3.8 Flash ingests the multimodal PDF tokens, analyzes theorems, benchmarks,
              and citation trees, generating structured JSON with zero hallucinated data.
            </p>
            <div className="mt-auto w-full pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Real-time Gemini Model</span>
              <Cpu className="w-4 h-4 text-indigo-600" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-start">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-4 shadow-sm shadow-indigo-200">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Explore, Listen & Query</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Scroll through the interactive Doomscroll reel, inspect benchmark leaps, study everyday analogies,
              or chat with the built-in Research Assistant about any detail.
            </p>
            <div className="mt-auto w-full pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Full Interactive Hub</span>
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Big Bottom Action Callout */}
        <div className="mt-16 bg-gradient-to-tr from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Ready to Analyze Your Research Paper?
          </h2>
          <p className="text-indigo-200 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Upload your paper PDF directly. No dummy fallbacks, no sample defaults—real production AI analysis.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/upload"
              id="landing-cta-upload-btn"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <Upload className="w-4 h-4 text-indigo-700" />
              <span>Go to PDF Upload Studio</span>
            </Link>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-indigo-800/80 hover:bg-indigo-800 text-white font-semibold text-sm border border-indigo-700 transition-colors"
            >
              <Search className="w-4 h-4 text-indigo-300" />
              <span>Grounded Literature Search</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              P
            </div>
            <span className="font-bold text-slate-800">PaperPulse</span>
            <span className="text-slate-400">&mdash; Production Research Paper Analyzer</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <Link to="/upload" className="hover:text-indigo-600 transition-colors">Upload PDF</Link>
            <Link to="/analysis" className="hover:text-indigo-600 transition-colors">Analysis Hub</Link>
            <Link to="/search" className="hover:text-indigo-600 transition-colors">Literature Search</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
