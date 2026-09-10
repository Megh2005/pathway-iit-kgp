import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Search,
  BookOpen,
  ArrowRight,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  FileUp,
  Clock,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { usePaper } from '../context/PaperContext';

interface PaperIngestionConsoleProps {
  onAnalysisSuccess?: () => void;
  compact?: boolean;
}

const LANDMARK_PAPERS = [
  {
    title: 'Attention Is All You Need',
    authors: 'Vaswani, Shazeer, Parmar, et al. (Google Brain)',
    year: '2017',
    venue: 'NeurIPS',
    domain: 'Transformer Architecture / NLP',
    query: 'Attention Is All You Need (Vaswani et al., 2017) introducing the Transformer architecture with self-attention mechanism replacing RNNs and CNNs for sequence-to-sequence modeling.',
  },
  {
    title: 'FlashAttention: Fast & Memory-Efficient Exact Attention',
    authors: 'Tri Dao, Daniel Y. Fu, Stefano Ermon, et al. (Stanford)',
    year: '2022',
    venue: 'NeurIPS',
    domain: 'Systems & GPU Hardware Optimization',
    query: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness by Tri Dao et al. 2022. Tiling attention computation to reduce GPU HBM to SRAM memory access.',
  },
  {
    title: 'DeepSeek-R1: Incentivizing Reasoning in LLMs via RL',
    authors: 'DeepSeek-AI Research Team',
    year: '2025',
    venue: 'arXiv Preprint',
    domain: 'Reinforcement Learning & Reasoning',
    query: 'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning by DeepSeek-AI, 2025. Pure reinforcement learning without supervised warm-up.',
  },
  {
    title: 'LoRA: Low-Rank Adaptation of Large Language Models',
    authors: 'Edward J. Hu, Yelong Shen, Phillip Wallis, et al. (Microsoft)',
    year: '2021',
    venue: 'ICLR',
    domain: 'Parameter-Efficient Fine-Tuning',
    query: 'LoRA: Low-Rank Adaptation of Large Language Models by Edward J. Hu et al. 2021. Decomposing weight updates into low-rank matrices to freeze pre-trained weights.',
  },
];

export const PaperIngestionConsole: React.FC<PaperIngestionConsoleProps> = ({
  onAnalysisSuccess,
  compact = false,
}) => {
  const { setCurrentPaper, isAnalyzing, setIsAnalyzing, analysisStep, setAnalysisStep } = usePaper();

  const [inputMode, setInputMode] = useState<'pdf' | 'title' | 'text'>('pdf');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [paperTitle, setPaperTitle] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        setErrorMessage('Please select an authentic academic PDF manuscript.');
        return;
      }
      setSelectedFile(file);
      setErrorMessage(null);
      if (!paperTitle) {
        const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setPaperTitle(cleanTitle);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        setErrorMessage('Please drop an authentic academic PDF manuscript.');
        return;
      }
      setSelectedFile(file);
      setErrorMessage(null);
      if (!paperTitle) {
        const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setPaperTitle(cleanTitle);
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

  const runAnalysis = async (customPayload?: {
    fileData?: string;
    fileType?: string;
    textContent?: string;
    paperTitle?: string;
  }) => {
    setIsAnalyzing(true);
    setErrorMessage(null);

    const formalSteps = [
      'Parsing manuscript structure and mathematical formulations...',
      'Extracting core methodology, algorithmic innovations, and primary breakthroughs...',
      'Evaluating empirical benchmarks and baseline comparative deltas...',
      'Formulating everyday conceptual analogies and multi-tier audience translations...',
      'Cross-referencing verified citations and authentic academic publication URLs...',
      'Finalizing formal executive dossier with Gemini 3.1 Flash-Lite...',
    ];

    let stepIndex = 0;
    setAnalysisStep(formalSteps[0]);
    const stepInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < formalSteps.length) {
        setAnalysisStep(formalSteps[stepIndex]);
      }
    }, 2500);

    try {
      let payload: any = customPayload;

      if (!payload) {
        let fileData: string | undefined = undefined;
        let fileType: string | undefined = undefined;

        if (inputMode === 'pdf' && selectedFile) {
          fileData = await readFileAsBase64(selectedFile);
          fileType = selectedFile.type || 'application/pdf';
        }

        payload = {
          fileData,
          fileType,
          textContent: inputMode === 'text' ? textContent.trim() : undefined,
          paperTitle:
            inputMode === 'title' || inputMode === 'pdf'
              ? paperTitle.trim() || undefined
              : undefined,
        };
      }

      const response = await fetch('/api/analyze-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || 'The server encountered an error during manuscript analysis.');
      }

      const result = await response.json();
      if (result.success && result.data) {
        setCurrentPaper(result.data);
        setIsAnalyzing(false);
        if (onAnalysisSuccess) {
          onAnalysisSuccess();
        }
      } else {
        throw new Error('Analysis completed but the scholarly dossier structure was incomplete.');
      }
    } catch (err: any) {
      console.error(err);
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      setErrorMessage(err.message || 'An unexpected error occurred during analysis. Please try again.');
    }
  };

  const handleLandmarkSelect = (paper: typeof LANDMARK_PAPERS[0]) => {
    setPaperTitle(paper.title);
    runAnalysis({
      paperTitle: paper.title,
      textContent: paper.query,
    });
  };

  return (
    <div className={`w-full ${compact ? '' : 'max-w-4xl mx-auto py-6'}`}>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Console Header */}
        <div className="p-6 sm:p-8 border-b border-slate-200/80 bg-slate-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-white px-2.5 py-0.5 rounded border border-slate-200">
                  Manuscript Ingestion
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Gemini 3.1 Flash-Lite Engine
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
                Analyze Academic Research Paper
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Provide a PDF document, paper title, arXiv identifier, or raw text to generate an authoritative executive research dossier.
              </p>
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex items-center space-x-2 mt-6 p-1 bg-slate-200/70 rounded-xl max-w-md text-xs font-semibold text-slate-600">
            <button
              onClick={() => setInputMode('pdf')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all ${
                inputMode === 'pdf'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              <FileUp className="w-3.5 h-3.5" />
              <span>Upload PDF</span>
            </button>

            <button
              onClick={() => setInputMode('title')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all ${
                inputMode === 'title'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Title / arXiv ID</span>
            </button>

            <button
              onClick={() => setInputMode('text')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all ${
                inputMode === 'text'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Paste Text</span>
            </button>
          </div>
        </div>

        {/* Input Forms */}
        <div className="p-6 sm:p-8 space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Mode 1: PDF Upload */}
          {inputMode === 'pdf' && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all ${
                  isDragOver
                    ? 'border-slate-800 bg-slate-100'
                    : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="w-14 h-14 rounded-2xl bg-white text-slate-700 flex items-center justify-center mx-auto mb-4 border border-slate-200 shadow-xs">
                  <Upload className="w-6 h-6" />
                </div>

                {selectedFile ? (
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900">{selectedFile.name}</p>
                    <p className="text-xs text-slate-500 font-mono">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB &bull; Ready for analysis
                    </p>
                    <span className="inline-block mt-2 text-xs text-slate-600 underline">
                      Click to choose a different PDF
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-slate-900">
                      Drop research paper PDF here, or click to browse
                    </p>
                    <p className="text-xs text-slate-500">
                      Supports full academic manuscripts, preprint PDFs, and conference proceedings up to 60MB
                    </p>
                  </div>
                )}
              </div>

              {selectedFile && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Paper Title or Inferred Header (Optional)
                  </label>
                  <input
                    type="text"
                    value={paperTitle}
                    onChange={(e) => setPaperTitle(e.target.value)}
                    placeholder="e.g. FlashAttention: Fast and Memory-Efficient Exact Attention"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  />
                </div>
              )}
            </div>
          )}

          {/* Mode 2: Title or arXiv ID */}
          {inputMode === 'title' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Paper Title, DOI, or arXiv Identifier
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={paperTitle}
                    onChange={(e) => setPaperTitle(e.target.value)}
                    placeholder="e.g. arXiv:1706.03762 or Attention Is All You Need"
                    className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Gemini 3.1 Flash-Lite will analyze and synthesize the verified publication and its mathematical framework.
                </p>
              </div>
            </div>
          )}

          {/* Mode 3: Paste Text */}
          {inputMode === 'text' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Paper Abstract or Manuscript Excerpt
                </label>
                <textarea
                  rows={6}
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Paste the abstract, methodology section, or full text of the research paper here..."
                  className="w-full px-4 py-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Title (Optional)
                </label>
                <input
                  type="text"
                  value={paperTitle}
                  onChange={(e) => setPaperTitle(e.target.value)}
                  placeholder="e.g. DeepSeek-R1 Technical Report"
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                />
              </div>
            </div>
          )}

          {/* Execution Button */}
          <div>
            <button
              onClick={() => runAnalysis()}
              disabled={
                isAnalyzing ||
                (inputMode === 'pdf' && !selectedFile) ||
                (inputMode === 'title' && !paperTitle.trim()) ||
                (inputMode === 'text' && !textContent.trim())
              }
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                isAnalyzing ||
                (inputMode === 'pdf' && !selectedFile) ||
                (inputMode === 'title' && !paperTitle.trim()) ||
                (inputMode === 'text' && !textContent.trim())
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm active:scale-98'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>
                {isAnalyzing
                  ? 'Conducting Academic Analysis...'
                  : 'Analyze Manuscript with Gemini 3.1 Flash-Lite'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Featured Landmark Papers (1-Click Evaluation) */}
          <div className="pt-6 border-t border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Or Quickly Evaluate a Landmark Paper
              </span>
              <span className="text-[11px] text-slate-400">1-click full synthesis</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LANDMARK_PAPERS.map((paper, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLandmarkSelect(paper)}
                  disabled={isAnalyzing}
                  className="text-left p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all group disabled:opacity-50"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {paper.venue} &bull; {paper.year}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {paper.domain.split('/')[0]}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-slate-800 line-clamp-1">
                    {paper.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {paper.authors}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
