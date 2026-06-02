import React from 'react';
import { FeatherLogo } from './Icons';

export default function Header({ onFocusWorkspace }) {
  return (
    <header role="banner" className="w-full border-b border-white/5 bg-obsidian-bg/85 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between">
        
        {/* Brand Identity */}
        <button
          onClick={onFocusWorkspace}
          className="flex items-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian-accent/70 rounded-lg p-1 select-none"
          aria-label="Beyond280 Logo, focus Creator Studio"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/15 flex items-center justify-center shadow-lg shadow-obsidian-accentMuted/10 select-none bg-obsidian-card" aria-hidden="true">
            <img 
              src="/beyond280.webp" 
              alt="Beyond280 Logo" 
              className="w-full h-full object-cover pointer-events-none scale-105" 
            />
          </div>
          <span className="font-heading font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-[#E2C29B] bg-clip-text text-transparent">
            Beyond280
          </span>
        </button>

        {/* Minimal Understated Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 font-sans text-xs text-obsidian-muted font-bold tracking-wider uppercase select-none">
          <a 
            href="#story" 
            className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian-accent/70 rounded px-1 py-0.5 cursor-pointer"
            aria-label="View Beyond280 Story"
          >
            Story
          </a>
          <a 
            href="#how-it-works" 
            className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian-accent/70 rounded px-1 py-0.5 cursor-pointer"
            aria-label="Learn how it works"
          >
            How it Works
          </a>
          <a 
            href="#themes" 
            className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian-accent/70 rounded px-1 py-0.5 cursor-pointer"
            aria-label="Explore Visual Themes"
          >
            Themes
          </a>
        </nav>

        {/* Widescreen Dynamic Follow CTA */}
        <a
          href="https://x.com/alwayspriyesh"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow @alwayspriyesh on X"
          className="interactive-scale flex items-center gap-2 h-9 px-4.5 bg-gradient-to-r from-[#E2C29B] to-[#C49B74] hover:brightness-110 text-obsidian-bg font-sans font-extrabold text-[10.5px] uppercase tracking-wider rounded-lg shadow-md shadow-obsidian-accentMuted transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian-accent/70"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="hidden sm:inline">Follow</span>
          <span className="sm:hidden">Follow</span>
        </a>

      </div>
    </header>
  );
}
