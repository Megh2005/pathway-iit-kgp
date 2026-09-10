import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PaperProvider } from './context/PaperContext';
import { Navbar } from './components/Navbar';
import { PaperUploadPage } from './pages/PaperUploadPage';
import { AnalysisWorkspacePage } from './pages/AnalysisWorkspacePage';
import { GroundedSearchPage } from './pages/GroundedSearchPage';

export default function App() {
  return (
    <PaperProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<PaperUploadPage />} />
              <Route path="/upload" element={<PaperUploadPage />} />
              <Route path="/analysis" element={<AnalysisWorkspacePage />} />
              <Route path="/analysis/:tab" element={<AnalysisWorkspacePage />} />
              <Route path="/search" element={<GroundedSearchPage />} />
              <Route path="*" element={<Navigate to="/upload" replace />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </PaperProvider>
  );
}
