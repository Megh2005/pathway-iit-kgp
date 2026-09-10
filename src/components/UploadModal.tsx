import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileUp,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { PaperAnalysisResult } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyzeSuccess: (result: PaperAnalysisResult) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onAnalyzeSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'text'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [paperTitle, setPaperTitle] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

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

  const handleAnalyze = async () => {
    if (!selectedFile && !textContent.trim() && !paperTitle.trim()) {
      setErrorMessage('Please upload a PDF file, paste text, or provide a research paper title.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const steps = [
      'Ingesting PDF and extracting multimodal document tokens...',
      'Synthesizing primary mathematical breakthrough & novel mechanisms...',
      'Mapping Before vs. After status quo paradigm shifts...',
      'Formulating comparative everyday analogies & concept cast...',
      'Retrieving & verifying real existing citation network with arXiv URLs...',
      'Analyzing academic community sentiment & deployment trajectory...',
      'Compiling 7-stage interactive Doomscroll feed cards...',
    ];

    let stepIndex = 0;
    setAnalysisStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setAnalysisStep(steps[stepIndex]);
      }
    }, 2800);

    try {
      let fileData: string | undefined = undefined;
      let fileType: string | undefined = undefined;

      if (selectedFile) {
        fileData = await readFileAsBase64(selectedFile);
        fileType = selectedFile.type || 'application/pdf';
      }

      const response = await fetch('/api/analyze-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileData,
          fileType,
          textContent: textContent.trim() || undefined,
          paperTitle: paperTitle.trim() || undefined,
        }),
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Server returned an error while analyzing paper.');
      }

      const result = await response.json();
      if (result.success && result.data) {
        onAnalyzeSuccess(result.data);
        onClose();
      } else {
        throw new Error('Analysis completed but output structure was missing.');
      }
    } catch (err: any) {
      console.error(err);
      clearInterval(stepInterval);
      setErrorMessage(
        err.message || 'Failed to analyze paper. Please check your network or try another paper.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Upload Research Paper</h3>
              <p className="text-xs text-slate-500">Gemini 3.8 Flash Multimodal Deconstruction</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-lg transition-all ${
                activeTab === 'upload' ? 'bg-white text-indigo-700 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload PDF</span>
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-lg transition-all ${
                activeTab === 'text' ? 'bg-white text-indigo-700 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Paste Text / arXiv</span>
            </button>
          </div>

          {isLoading ? (
            /* Loading State */
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 animate-pulse">
                  <RefreshCw className="w-8 h-8 animate-spin" />
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Analyzing Research Paper</h4>
                <p className="text-xs text-indigo-600 font-medium">{analysisStep}</p>
                <p className="text-[11px] text-slate-400">
                  Processing multimodal tokens, proofs, and references with Gemini 3.8 Flash...
                </p>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'upload' && (
                <div className="space-y-4">
                  {/* Drop Area */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                      isDragOver
                        ? 'border-indigo-500 bg-indigo-50/50'
                        : selectedFile
                        ? 'border-emerald-400 bg-emerald-50/30'
                        : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50/50'
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
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-bold text-slate-800 truncate max-w-xs">
                          {selectedFile.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB &bull; PDF File Ready
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center mb-2">
                          <FileUp className="w-6 h-6 text-slate-400" />
                        </div>
                        <p className="text-xs font-bold text-slate-800">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          PDF research papers up to 60MB
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Title Override */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Paper Title or Context (Optional)
                    </label>
                    <input
                      type="text"
                      value={paperTitle}
                      onChange={(e) => setPaperTitle(e.target.value)}
                      placeholder="e.g. Llama 3: Herd of Models or arXiv:2407.21783"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'text' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Paper Title or arXiv Identifier
                    </label>
                    <input
                      type="text"
                      value={paperTitle}
                      onChange={(e) => setPaperTitle(e.target.value)}
                      placeholder="e.g. arXiv:2310.06825 or 'Mistral 7B'"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Paper Abstract, Excerpts, or Full Text
                    </label>
                    <textarea
                      rows={6}
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      placeholder="Paste abstract or methodology excerpts here..."
                      className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 font-mono"
                    />
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero dummy data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={activeTab === 'upload' && !selectedFile && !paperTitle}
                    className={`flex items-center space-x-2 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-all ${
                      activeTab === 'upload' && !selectedFile && !paperTitle
                        ? 'bg-slate-300 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-indigo-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run AI Analysis</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
