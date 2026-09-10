import React from 'react';
import { PaperAnalysisResult } from '../types';
import { ExecutiveBriefingView } from './ExecutiveBriefingView';

interface DoomscrollFeedProps {
  paperData: PaperAnalysisResult;
  onNavigateTab?: (tab: string) => void;
}

export const DoomscrollFeed: React.FC<DoomscrollFeedProps> = ({ paperData, onNavigateTab }) => {
  return <ExecutiveBriefingView paperData={paperData} onNavigateTab={onNavigateTab} />;
};
