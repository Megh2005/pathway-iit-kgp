import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileUp,
  ArrowRight,
  RefreshCw,
  Cpu,
  Layers,
  HelpCircle,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { usePaper } from '../context/PaperContext';

export const PaperUploadFeedPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentPaper, isAnalyzing, setIsAnalyzing, analysisStep, setAnalysisStep } = usePaper();

  const [inputMode, setInputMode] = useState<'pdf' | 'text'>('pdf');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [paperTitle, setPaperTitle] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        setErrorMessage('Please select a valid PDF file.');
        return;
      }
      setSelectedFile(file);
      setErrorMessage(null);
      if (!paperTitle) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setPaperTitle(cleanName);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        setErrorMessage('Please drop a valid PDF file.');
        return;
      }
      setSelectedFile(file);
      setErrorMessage(null);
      if (!paperTitle) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setPaperTitle(cleanName);
      }
    }
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleStartAnalysis = async () => {
    if (inputMode === 'pdf' && !selectedFile) {
      setErrorMessage('Please select or drop a PDF research paper first.');
      return;
    }
    if (inputMode === 'text' && !textContent.trim() && !paperTitle.trim()) {
      setErrorMessage('Please provide the paper text, abstract, or title.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    const steps = [
      'Ingesting PDF and extracting multimodal document tokens...',
      'Synthesizing primary mathematical breakthrough & novel mechanisms...',
      'Mapping Before vs. After status quo paradigm shifts...',
      'Formulating comparative everyday analogies & concept cast...',
      'Retrieving & verifying real existing citation network with arXiv URLs...',
      'Analyzing academic community sentiment & deployment trajectory...',
      'Generating 7-stage interactive Doomscroll feed cards...',
    ];

    let stepIdx = 0;
    setAnalysisStep(steps[0]);
    const timer = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setAnalysisStep(steps[stepIdx]);
      }
    }, 2800);

    try {
      let fileData: string | undefined = undefined;
      let fileType: string | undefined = undefined;

      if (selectedFile && inputMode === 'pdf') {
        fileData = await readFileAsBase64(selectedFile);
        fileType = selectedFile.type || 'application/pdf';
      }

      const response = await fetch('/api/analyze-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileData,
          fileType,
          textContent: inputMode === 'text' ? textContent.trim() : undefined,
          paperTitle: paperTitle.trim() || undefined,
        }),
      });

      clearInterval(timer);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Server error occurred during paper analysis.');
      }

      const result = await response.json();
      if (result.success && result.data) {
        setCurrentPaper(result.data);
        setIsAnalyzing(false);
        // Navigate to the analysis workspace
        navigate('/analysis');
      } else {
        throw new Error('Analysis completed but the output structure was incomplete.');
      }
    } catch (err: any) {
      console.error(err);
      clearInterval(timer);
      setIsAnalyzing(false);
      setErrorMessage(
        err.message || 'Failed to analyze paper. Please verify your connection or try another PDF.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Top Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Upload Research Paper</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Research Paper Ingestion Feed
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Upload your academic PDF to run real-time production Gemini 3.8 Flash deconstruction.
            No sample data, no dummy fallbacks.
          </p>
        </div>

        {/* Ingestion Feed Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden mb-8">
          {/* Feed Mode Switcher */}
          <div className="flex border-b border-slate-200 bg-slate-50/70 p-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => {
                setInputMode('pdf');
                setErrorMessage(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                inputMode === 'pdf'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload PDF Document (Recommended)</span>
            </button>
            <button
              onClick={() => {
                setInputMode('text');
                setErrorMessage(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                inputMode === 'text'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Paste Abstract / Text / arXiv ID</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {inputMode === 'pdf' ? (
              <div className="space-y-6">
                {/* Drag and Drop Box */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
                    isDragOver
                      ? 'border-indigo-500 bg-indigo-50/50 scale-[0.99]'
                      : selectedFile
                      ? 'border-emerald-400 bg-emerald-50/30'
                      : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50/70'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-1 max-w-md truncate">
                        {selectedFile.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB &bull; PDF Document Ready
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                        }}
                        className="mt-4 text-xs font-semibold text-rose-600 hover:text-rose-700 underline"
                      >
                        Choose a different PDF
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100/80">
                        <FileUp className="w-8 h-8" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">
                        Drop your research paper PDF here
                      </h4>
                      <p className="text-xs text-slate-500 mb-4 max-w-sm">
                        Supports conference papers, preprints, dissertations, and journal articles up to 60MB.
                      </p>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-xs hover:bg-indigo-700 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Browse Files on Computer</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Optional Paper Title / Context Input */}
                <div>
                  <label
                    htmlFor="paper-title-input"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Paper Title or Context (Optional)
                  </label>
                  <input
                    id="paper-title-input"
                    type="text"
                    value={paperTitle}
                    onChange={(e) => setPaperTitle(e.target.value)}
                    placeholder="e.g. FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Auto-extracted from your file if left blank, but helps prime the AI model.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="paper-text-title"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Paper Title or arXiv Identifier
                  </label>
                  <input
                    id="paper-text-title"
                    type="text"
                    value={paperTitle}
                    onChange={(e) => setPaperTitle(e.target.value)}
                    placeholder="e.g. arXiv:2205.14135 or 'Attention Is All You Need'"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="paper-text-content"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Paste Paper Abstract, Introduction, or Full Text
                  </label>
                  <textarea
                    id="paper-text-content"
                    rows={8}
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Paste the abstract, methodology, or excerpts here..."
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50 font-mono"
                  />
                </div>
              </div>
            )}

            {/* Error Banner */}
            {errorMessage && (
              <div className="mt-5 p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <strong className="font-semibold block mb-0.5">Analysis Issue</strong>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            {/* Progress / Status Live Feed */}
            {isAnalyzing && (
              <div className="mt-6 p-5 bg-indigo-50/80 border border-indigo-200/80 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center animate-spin">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider block">
                      Production Gemini 3.8 Flash Ingestion in Progress
                    </span>
                    <p className="text-xs text-indigo-700 font-medium animate-pulse mt-0.5">
                      {analysisStep || 'Analyzing multimodal document...'}
                    </p>
                  </div>
                </div>
                {/* Visual Progress Bar */}
                <div className="mt-3.5 w-full bg-indigo-200/60 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-600 h-1.5 rounded-full animate-pulse w-3/4 transition-all duration-500" />
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="mt-8 pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Strict real-data extraction. Zero dummy fallbacks.</span>
              </div>

              <button
                type="button"
                id="submit-analyze-btn"
                onClick={handleStartAnalysis}
                disabled={isAnalyzing || (inputMode === 'pdf' && !selectedFile)}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white shadow-sm transition-all ${
                  isAnalyzing || (inputMode === 'pdf' && !selectedFile)
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-indigo-200'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Paper with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Deconstruct Paper Now</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Guidance / FAQ Feed Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" /> Multimodal Token Handling
            </h5>
            <p className="text-slate-500 leading-relaxed">
              PDFs are encoded as Base64 and processed natively by Gemini 3.8 Flash, interpreting formulas, tables, and architectures directly.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" /> Verified Citations
            </h5>
            <p className="text-slate-500 leading-relaxed">
              Related papers are grounded in verified academic literature with real arXiv and conference URLs.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-indigo-600" /> Production Architecture
            </h5>
            <p className="text-slate-500 leading-relaxed">
              No pre-seeded dummy papers. Every result reflects your uploaded document and stays stored during your session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
