import React, { useState } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles, AlertCircle, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { PaperAnalysisResult, ChatMessage } from '../types';

interface PaperChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  paperData: PaperAnalysisResult;
}

export const PaperChatDrawer: React.FC<PaperChatDrawerProps> = ({
  isOpen,
  onClose,
  paperData,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      content: `I am your scholarly AI assistant for **"${paperData.paperMeta.title}"** powered by Gemini 3.1 Flash-Lite. You may ask me technical questions regarding the mathematical formulations, empirical baselines, conceptual translations, or subsequent literature.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (customPrompt?: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const promptToSend = customPrompt || input.trim();
    if (!promptToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!customPrompt) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/paper-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMsg.content,
          paperSummary: {
            title: paperData.paperMeta.title,
            breakthrough: paperData.newOutputs.primaryBreakthrough,
            mechanisms: paperData.newOutputs.novelMechanisms,
            benchmarks: paperData.newOutputs.benchmarkResults,
            analogy: paperData.comparativeAnalogies.everydayAnalogy,
          },
          chatHistory: newMessages.slice(-6),
        }),
      });

      if (!response.ok) {
        throw new Error('Chat service encountered an issue.');
      }

      const data = await response.json();
      if (data.success && data.answer) {
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error('Empty response from model.');
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but an error occurred while generating the scholarly response. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'Explain the mathematical formulation in detail',
    'What are the primary methodological failure modes?',
    'How does this compare with subsequent architectures?',
    'Summarize the key benchmark performance deltas',
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white border-l border-slate-200 shadow-2xl flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Scholarly Paper Assistant</h3>
            <p className="text-[11px] text-slate-500 font-mono">Gemini 3.1 Flash-Lite Engine</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          title="Close chat drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 ${
              msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-md flex items-center justify-center text-xs shrink-0 ${
                msg.role === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[85%] rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-800 border border-slate-200'
              }`}
            >
              <div className="prose prose-xs max-w-none text-slate-800">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
              <span
                className={`block text-[10px] mt-1.5 font-mono ${
                  msg.role === 'user' ? 'text-slate-400' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-slate-500 text-xs p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
            <span>Consulting manuscript with Gemini 3.1 Flash-Lite...</span>
          </div>
        )}
      </div>

      {/* Suggested Questions */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 overflow-x-auto">
        <div className="flex gap-1.5 whitespace-nowrap">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              disabled={isLoading}
              className="text-[11px] px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium transition-colors disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={(e) => handleSend(undefined, e)} className="p-3 border-t border-slate-200 bg-white">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a technical or conceptual question..."
            disabled={isLoading}
            className="w-full pl-3.5 pr-10 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white disabled:bg-slate-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 top-1.5 p-1.5 rounded-md bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
