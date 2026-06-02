import React, { Suspense, lazy } from 'react';
import Header from './components/Header';
import Workspace from './components/Workspace';

const ProductSections = lazy(() => import('./components/ProductSections'));
const GrainNoise = lazy(() => import('./components/GrainNoise'));

export default function App() {
  // Smooth scroll and focus helper to transition to studio mode directly
  const handleFocusWorkspace = () => {
    const element = document.getElementById('creator-studio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const textarea = element.querySelector('textarea');
      if (textarea) {
        setTimeout(() => textarea.focus(), 600);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-obsidian-bg w-full overflow-x-hidden">
      {/* Subtle, physical paper grain SVG overlay */}
      <Suspense fallback={null}>
        <GrainNoise />
      </Suspense>

      {/* Top navigation header */}
      <Header onFocusWorkspace={handleFocusWorkspace} />

      {/* Main Layout Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-6 md:py-10 flex flex-col justify-start relative z-10">
        
        {/* Centerpiece Creator Workspace as the Hero Section */}
        <div
          id="creator-studio"
          className="w-full mb-12 scroll-mt-20 relative z-10"
        >
          <Workspace />
        </div>

        {/* Story, Content Sections & Follow CTA */}
        <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center text-xs text-obsidian-muted font-mono">✦ LOADING CREATOR SUITE...</div>}>
          <ProductSections onFocusWorkspace={handleFocusWorkspace} />
        </Suspense>

        {/* Personal, Understated Footer */}
        <footer className="border-t border-white/5 pt-8 mt-8 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 font-sans text-xs text-obsidian-muted">
          <div className="flex flex-col gap-1">
            <span className="text-white/60 font-semibold">Beyond280</span>
            <span className="text-[10px]">Made with late nights, too much coffee, and a genuine frustration with character limits.</span>
          </div>
          <div className="flex items-center gap-5 text-[10px]">
            <button onClick={handleFocusWorkspace} className="hover:text-white transition-colors duration-200">Open Studio</button>
            <span className="text-white/10">·</span>
            <a href="https://x.com/priyeshAI" target="_blank" rel="noopener noreferrer" className="hover:text-obsidian-accent transition-colors duration-200">@priyeshAI</a>
          </div>
        </footer>

      </main>
    </div>
  );
}
