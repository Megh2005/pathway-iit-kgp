import React, { createContext, useContext, useState, useEffect } from 'react';
import { PaperAnalysisResult } from '../types';

interface PaperContextType {
  currentPaper: PaperAnalysisResult | null;
  setCurrentPaper: (paper: PaperAnalysisResult | null) => void;
  clearCurrentPaper: () => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  analysisStep: string;
  setAnalysisStep: (step: string) => void;
}

const STORAGE_KEY = 'paperpulse_current_analysis';

const PaperContext = createContext<PaperContextType | undefined>(undefined);

export const PaperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPaper, setCurrentPaperState] = useState<PaperAnalysisResult | null>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved paper analysis', e);
    }
    return null;
  });

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');

  const setCurrentPaper = (paper: PaperAnalysisResult | null) => {
    setCurrentPaperState(paper);
    if (paper) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(paper));
      } catch (e) {
        console.warn('SessionStorage quota exceeded, keeping in memory only', e);
      }
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  };

  const clearCurrentPaper = () => {
    setCurrentPaperState(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <PaperContext.Provider
      value={{
        currentPaper,
        setCurrentPaper,
        clearCurrentPaper,
        isAnalyzing,
        setIsAnalyzing,
        analysisStep,
        setAnalysisStep,
      }}
    >
      {children}
    </PaperContext.Provider>
  );
};

export function usePaper() {
  const context = useContext(PaperContext);
  if (!context) {
    throw new Error('usePaper must be used within a PaperProvider');
  }
  return context;
}
