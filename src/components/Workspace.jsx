import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FeatherLogo, SparklesIcon, DownloadIcon, AspectIcon, PaletteIcon, 
  AlignLeftIcon, AlignCenterIcon, TextSizeIcon, WandIcon, 
  RotateCcwIcon, ToggleIcon, CheckCircleIcon, ChevronDownIcon 
} from './Icons';
import { humanizeText, parseStreamText } from '../services/ai';
import { toPng } from 'html-to-image';

// Stylized theme configurations (Obsidian Vault Archetype)
// Stylized theme configurations (Obsidian Vault Archetype)
const PRESETS = {
  ethereal: {
    name: 'Ethereal Clinical',
    cardBg: 'bg-[#F1F5F9]', // Clean, cool gray-slate clinical background
    border: 'border border-[#CBD5E1]', // Clean slate border
    titleColor: 'text-[#0F172A]', // Deep slate-black title
    bodyColor: 'text-[#475569]', // Crisp steel-slate body
    badgeBg: 'bg-[#0F172A]/5',
    badgeText: 'text-[#0F172A]',
    metaColor: 'text-[#64748B]',
    avatarBg: 'bg-[#0F172A]',
    avatarText: 'text-white',
    usernameColor: 'text-[#0F172A]'
  },
  obsidian: {
    name: 'Obsidian Black',
    cardBg: 'bg-[#0D0D11]',
    border: 'border border-[#E2C29B]/20',
    titleColor: 'text-[#E2C29B] text-glow',
    bodyColor: 'text-white/95',
    badgeBg: 'bg-[#E2C29B]/10',
    badgeText: 'text-[#E2C29B]',
    metaColor: 'text-[#8E8E9F]',
    avatarBg: 'bg-[#E2C29B]',
    avatarText: 'text-[#0D0D11]',
    usernameColor: 'text-white'
  },
  parchment: {
    name: 'Parchment Sepia',
    cardBg: 'bg-[#F3EAD3]', // Rich warm vintage sepia literary paper background
    border: 'border border-[#D1C2A5] shadow-[0_4px_22px_rgba(180,165,135,0.25)]', // Warm sand frame with soft sepia shadow
    titleColor: 'text-[#3E2511] font-bold', // High-contrast deep literary mahogany title
    bodyColor: 'text-[#4F3620]', // Highly readable rich warm walnut espresso body copy
    badgeBg: 'bg-[#3E2511]/10',
    badgeText: 'text-[#3E2511]',
    metaColor: 'text-[#85705B]', // Readable vintage sand-brown meta text
    avatarBg: 'bg-[#3E2511]',
    avatarText: 'text-[#F3EAD3]',
    usernameColor: 'text-[#3E2511]'
  },
  clay: {
    name: 'Organic Clay',
    cardBg: 'bg-[#E2725B]',
    border: 'border border-[#FFFDD0]/25',
    titleColor: 'text-[#FFFDD0]',
    bodyColor: 'text-[#FFFDD0]/95',
    badgeBg: 'bg-[#FFFDD0]/10',
    badgeText: 'text-[#FFFDD0]',
    metaColor: 'text-[#FFFDD0]/70',
    avatarBg: 'bg-[#FFFDD0]',
    avatarText: 'text-[#E2725B]',
    usernameColor: 'text-[#FFFDD0]'
  }
};

// Premium typography collections supported on the image canvas
const FONTS = {
  sans: { name: 'Inter (Sans)', family: 'font-sans' },
  outfit: { name: 'Outfit (Modern)', family: 'font-outfit' },
  jakarta: { name: 'Jakarta (Sleek)', family: 'font-jakarta' },
  sora: { name: 'Sora (Slab)', family: 'font-sora' },
  serif: { name: 'Fraunces (Editorial)', family: 'font-serif' },
  newsreader: { name: 'Newsreader (Italic)', family: 'font-newsreader italic' },
  playfair: { name: 'Playfair (Classic)', family: 'font-playfair italic font-semibold' },
  mono: { name: 'JetBrains (Mono)', family: 'font-mono' }
};


const DEFAULT_TEXT = "Great ideas shouldn't be limited by a 280-character count. Condensing deep thoughts often strips away their value.\n\nBeyond280 solves this by instantly formatting your writing into premium typographic cards that stand out on any feed. Write without limits.";

export default function Workspace() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [headline, setHeadline] = useState("Scale Your Thoughts");
  const [username, setUsername] = useState("@alwayspriyesh");
  
  const [theme, setTheme] = useState('ethereal');
  const [aspect, setAspect] = useState('Auto'); // Auto, 16:9, 4:3, 1:1
  const [cardFont, setCardFont] = useState('sans');
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  
  const [align, setAlign] = useState('left');
  const [fontSize, setFontSize] = useState('medium');
  const [originalDraftText, setOriginalDraftText] = useState("");
  const [isReviewingHumanize, setIsReviewingHumanize] = useState(false);

  
  // AI state controls
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [aiHeadline, setAiHeadline] = useState("Scale Your Thoughts");
  const [aiBody, setAiBody] = useState(DEFAULT_TEXT);
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  
  // Premium AI Engine Controls
  const [aiMode, setAiMode] = useState(null); // 'grammar' or 'humanize'
  const [errorMsg, setErrorMsg] = useState(null);
  const [isAiApplied, setIsAiApplied] = useState(false);
  
  // Toast and Export triggers
  const [isExporting, setIsExporting] = useState(false);
  const [toastConfig, setToastConfig] = useState({ show: false, title: "", subtitle: "" });

  // Dynamic notification toast helper
  const triggerToast = (title, subtitle) => {
    setToastConfig({ show: true, title, subtitle });
    setTimeout(() => setToastConfig({ show: false, title: "", subtitle: "" }), 3500);
  };
  
  const canvasRef = useRef(null);
  const fontDropdownRef = useRef(null);

  // Close custom dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (fontDropdownRef.current && !fontDropdownRef.current.contains(event.target)) {
        setFontDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // Dedicated Humanize text flow calling `/api/ai/humanize` or local mock fallback
  const handleHumanizeText = async () => {
    if (!text.trim()) return;
    
    // Save current draft text to restore later if needed
    setOriginalDraftText(text);
    
    setIsOptimizing(true);
    setErrorMsg(null);
    setStreamingText("");
    setIsStreaming(true);
    setAiMode('humanize');
    setIsReviewingHumanize(true);

    try {
      const result = await humanizeText(text, "Natural", (chunk) => {
        setStreamingText(chunk);
      });
      
      // Update preview card only; left inputs are untouched
      setAiBody(result);
      setAiHeadline(headline);
      setIsAiApplied(true); // decouple card preview from input editor
      triggerToast("Humanize Stream Complete", "REVIEW ACTIVE DRAFT OPTIONS BELOW");

    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to connect to the humanizer AI engine.");
      setIsReviewingHumanize(false);
      setAiMode(null);
    } finally {
      setIsOptimizing(false);
      setIsStreaming(false);
    }
  };

  const handleKeepHumanized = () => {
    setText(aiBody); // Commit humanized draft to Writing Studio
    setIsAiApplied(false); // recross-link preview and editor
    setIsReviewingHumanize(false); // Hide the review actions
    setOriginalDraftText("");
    setAiMode(null);
    triggerToast("Humanized Text Kept!", "WRITING STUDIO INPUT UPDATED SUCCESSFULLY");
  };

  const handleRegenerateHumanized = async () => {
    const textToHumanize = originalDraftText || text;
    if (!textToHumanize.trim()) return;
    
    setIsOptimizing(true);
    setErrorMsg(null);
    setStreamingText("");
    setIsStreaming(true);
    setAiMode('humanize');
    
    try {
      const result = await humanizeText(textToHumanize, "Natural", (chunk) => {
        setStreamingText(chunk);
      });
      
      setAiBody(result);
      setIsAiApplied(true);
      triggerToast("Fresh Draft Rendered", "NEW AI HUMANIZE DRAFT GENERATED");
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to regenerate humanized text.");
    } finally {
      setIsOptimizing(false);
      setIsStreaming(false);
    }
  };

  const handleKeepOriginal = () => {
    if (originalDraftText) {
      setText(originalDraftText);
      setAiBody(originalDraftText);
    }
    setIsAiApplied(false);
    setIsReviewingHumanize(false);
    setOriginalDraftText("");
    setAiMode(null);
    triggerToast("Restored Original Draft", "PREVIEW SYNCED TO INITIAL WRITING");
  };

  const handleReset = () => {
    setText(DEFAULT_TEXT);
    setHeadline("Scale Your Thoughts");
    setAiHeadline("Scale Your Thoughts");
    setAiBody(DEFAULT_TEXT);
    setUsername("@alwayspriyesh");
    setStreamingText("");
    setIsStreaming(false);
    setTheme('ethereal');
    setAspect('Auto');
    setCardFont('sans');
    setAlign('left');
    setFontSize('medium');
    setOriginalDraftText("");
    setIsReviewingHumanize(false);
    setAiMode(null);
    setErrorMsg(null);
    setIsAiApplied(false);
  };

  // Compile Retina Attachment PNG
  const handleExportPNG = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);

    try {
      // Force blur any active input element to collapse the mobile virtual keyboard and avoid layout-shift/keyboard transitions during capture
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }

      // Allow sufficient delay (350ms) for virtual keyboard animation & layout resizing to fully finish
      await new Promise((resolve) => setTimeout(resolve, 350));
      await document.fonts.ready;

      // Double-call workaround for mobile browsers (specifically iOS Safari/Chrome) to pre-render/cache fonts & layout in canvas successfully
      try {
        await toPng(canvasRef.current, { cacheBust: true, pixelRatio: 3 });
      } catch (e) {
        console.warn("First paint warning (ignoring):", e);
      }

      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 3, // Premium 3x retina scale
        style: {
          transform: 'scale(1)',
          boxShadow: 'none',
        }
      });

      const link = document.createElement('a');
      link.download = `${username.replace('@', '') || 'Beyond280'}-card-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
      triggerToast("Post Design Exported!", "HIGH-RES PNG DOWNLOAD COMPLETE");
    } catch (error) {
      console.error("Export failed:", error);
      triggerToast("Export Failed", "PLEASE TRY AGAIN OR UPDATE TEXT");
    } finally {
      setIsExporting(false);
    }
  };

  // Dynamic layout dimension bindings (Fully fluid and responsive for mobile)
  // Card width and height are forced to match the selected aspect ratio exactly (including on mobile)
  const getAspectClass = () => {
    if (aspect === 'Auto') return 'w-full max-w-[450px] h-auto';
    if (aspect === '1:1') return 'aspect-square w-full max-w-[390px]';
    if (aspect === '16:9') return 'aspect-[16/9] w-full max-w-full lg:max-w-[580px]';
    return 'aspect-[4/3] w-full max-w-[450px]'; // 4:3 standard
  };

  // Dynamically calculate grid columns based on active aspect ratio for auto-adjusting flexible relation
  const getGridCols = () => {
    if (aspect === '1:1') {
      return { left: 'lg:col-span-6', right: 'lg:col-span-6' };
    }
    if (aspect === '16:9') {
      return { left: 'lg:col-span-4', right: 'lg:col-span-8' };
    }
    return { left: 'lg:col-span-5', right: 'lg:col-span-7' }; // 4:3 default
  };

  // Dynamically calculate max-width of the right column container to align exactly with the card canvas
  const getAspectWidthClass = () => {
    if (aspect === '1:1') return 'max-w-[390px]';
    if (aspect === '16:9') return 'max-w-full lg:max-w-[580px]';
    return 'max-w-[450px]'; // 4:3 standard
  };

  // Dynamic card padding that scales with text length — tight for short posts, roomier for essays
  const getCardPadding = () => {
    const len = (activeContent?.body || text).length;
    if (len < 100) return 'p-4 sm:p-5 md:p-6';
    if (len < 250) return 'p-4.5 sm:p-6 md:p-7';
    return 'p-5 sm:p-7 md:p-8';
  };

  // Dynamic body gap that scales with content
  const getBodyMargin = () => {
    const len = (activeContent?.body || text).length;
    if (aspect === 'Auto') {
      if (len < 100) return 'mt-1 sm:mt-1.5 mb-0';
      if (len < 250) return 'mt-1.5 sm:mt-2 mb-0';
      return 'mt-2 sm:mt-2.5 mb-0';
    }
    if (len < 100) return 'my-2 sm:my-3.5';
    if (len < 250) return 'my-2.5 sm:my-4';
    return 'my-3 sm:my-5';
  };

  const getFontSizeClass = () => {
    if (fontSize === 'small') return 'text-[12px] sm:text-[13.5px] leading-relaxed';
    if (fontSize === 'large') return 'text-[15.5px] sm:text-[17.5px] leading-relaxed';
    return 'text-[13.5px] sm:text-[15.5px] leading-relaxed';
  };

  // Extract initials from custom username handles
  const getUserInitials = () => {
    const raw = username.replace('@', '').trim();
    if (!raw) return 'C';
    return raw.substring(0, 1).toUpperCase();
  };

  const currentCharCount = text.length;
  const isOverflowing = currentCharCount > 280;
  const currentTheme = PRESETS[theme];
  const activeFontFamily = FONTS[cardFont].family;
  const gridCols = getGridCols();

  // Handle streaming text updates dynamically depending on the active AI mode
  const getStreamingState = () => {
    if (!isStreaming) {
      if (isAiApplied) return { headline: aiHeadline, body: aiBody };
      return { headline, body: text };
    }
    
    if (aiMode === 'humanize') {
      return { headline: headline, body: streamingText };
    }
    
    const parsed = parseStreamText(streamingText);
    return {
      headline: parsed.headline || headline,
      body: parsed.body || (streamingText.includes('[BODY]') ? '' : streamingText)
    };
  };

  const activeContent = getStreamingState();

  // Dynamic, optimized inline selectors (completely synchronous, eliminating state dependencies and extra renders)
  const readingTime = React.useMemo(() => {
    const bodyContent = activeContent.body || "";
    const words = bodyContent.trim().split(/\s+/).filter(Boolean).length;
    const calcSec = Math.ceil(words / 3.3);
    return `${calcSec}s read`;
  }, [activeContent.body]);

  const readability = React.useMemo(() => {
    const bodyContent = activeContent.body || "";
    const words = bodyContent.trim().split(/\s+/).filter(Boolean).length;
    if (words < 15) return 'Simple';
    if (words < 35) return 'Standard';
    return 'Clear & Engaging';
  }, [activeContent.body]);

  const engagement = React.useMemo(() => {
    const bodyContent = activeContent.body || "";
    const words = bodyContent.trim().split(/\s+/).filter(Boolean).length;
    if (words === 0) return '+0%';
    const boost = 42 + Math.min(words, 40); // dynamic, engaging attention boost factor
    return `+${boost}%`;
  }, [activeContent.body]);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Immersive Glass Workspace Panel */}
      <div className="w-full bg-[#08080B]/90 border border-white/10 rounded-2xl flex flex-col overflow-hidden backdrop-blur-xl shadow-2xl">
               {/* Unified Premium Toolbar (Highly Visible Customizers) */}
        <div 
          role="toolbar" 
          aria-label="Card Design Customization Toolbar" 
          className="w-full border-b border-white/10 bg-[#0B0B0E]/60 p-3 sm:p-4 lg:p-0 flex flex-col lg:flex-row lg:items-center lg:justify-between select-none gap-3 lg:gap-0 lg:h-16 relative"
        >
          
          {/* Left Styling Actions Group - Compact grid layout on mobile, flex row on tablet/desktop */}
          <div className="grid grid-cols-[1.15fr_0.85fr] sm:flex sm:flex-row items-stretch sm:items-center gap-2 lg:gap-2 xl:gap-3.5 w-full lg:w-auto lg:h-full lg:pl-3.5 xl:pl-4">
            
            {/* Highly Visible Aspect Ratio Selector (Unified in Toolbar) */}
            <div 
              role="group" 
              aria-label="Canvas Aspect Ratio" 
              className="flex items-center gap-0.5 sm:gap-1 bg-[#0C0C10] border border-white/15 rounded-lg p-0.5 sm:p-1 h-11 sm:h-10 w-full sm:w-auto flex-shrink-0 justify-center col-span-1"
            >
              {['Auto', '16:9', '4:3', '1:1'].map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspect(ratio)}
                  aria-label={`Set aspect ratio to ${ratio}`}
                  aria-pressed={aspect === ratio}
                  className={`interactive-scale h-8.5 sm:h-8 flex-grow sm:flex-grow-0 flex items-center justify-center px-1 sm:px-3 rounded-md font-mono text-[10px] sm:text-[10px] font-extrabold transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian-accent/70 ${
                    aspect === ratio 
                      ? 'bg-white text-obsidian-bg font-extrabold shadow-lg' 
                      : 'text-obsidian-muted hover:text-white'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>

            {/* Custom Dropdown for Widescreen Desktops & Mobile Viewports (Unified Premium Selector) */}
            <div className="relative w-full sm:w-[130px] xl:w-[150px] flex-shrink-0 col-span-1" ref={fontDropdownRef}>
              <button
                onClick={() => setFontDropdownOpen(!fontDropdownOpen)}
                aria-label={`Select Typography Font, currently ${FONTS[cardFont].name}`}
                aria-haspopup="listbox"
                aria-expanded={fontDropdownOpen}
                className="w-full h-11 sm:h-10 flex items-center justify-between px-2 sm:px-3 bg-[#0C0C10] border border-white/15 rounded-lg text-white hover:border-[#E2C29B]/30 hover:bg-[#13131A] transition-all text-[10px] sm:text-[10px] font-extrabold shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian-accent/70"
              >
                <span className="truncate text-obsidian-accent">{FONTS[cardFont].name}</span>
                <ChevronDownIcon className="w-3.5 h-3.5 text-obsidian-muted transition-transform duration-200" style={{ transform: fontDropdownOpen ? 'rotate(180deg)' : 'none' }} />
              </button>

              <AnimatePresence>
                {fontDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    role="listbox"
                    aria-label="Typography Font Choices"
                    className="absolute top-full mt-1.5 left-0 w-[170px] xl:w-[190px] bg-[#0C0C10] border border-white/15 rounded-xl shadow-2xl p-1 z-50 flex flex-col gap-0.5"
                  >
                    {Object.keys(FONTS).map((fontKey) => (
                      <button
                        key={fontKey}
                        onClick={() => {
                          setCardFont(fontKey);
                          setFontDropdownOpen(false);
                        }}
                        role="option"
                        aria-selected={cardFont === fontKey}
                        className={`w-full flex items-center justify-between px-2.5 py-2 sm:py-1.5 rounded-lg text-left text-xs sm:text-[10px] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian-accent/70 ${
                          cardFont === fontKey 
                            ? 'bg-obsidian-accentMuted text-[#E2C29B] font-extrabold' 
                            : 'text-obsidian-muted hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{FONTS[fontKey].name}</span>
                        {cardFont === fontKey && <CheckCircleIcon className="w-3.5 h-3.5 text-obsidian-accent" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <span className="w-[1px] h-4 bg-white/10 hidden lg:inline-block mx-1 flex-shrink-0" aria-hidden="true"></span>

            {/* Alignment / Sizes */}
            <div 
              role="group" 
              aria-label="Text Formatting and Layout Alignment" 
              className="flex items-center justify-between sm:justify-start lg:justify-center gap-1.5 bg-[#0C0C10] border border-white/15 rounded-lg p-1 h-11 sm:h-10 w-full sm:w-auto flex-shrink-0 col-span-2"
            >
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setAlign('left')}
                  aria-label="Align text left"
                  aria-pressed={align === 'left'}
                  className={`interactive-scale h-8.5 sm:h-8 w-8.5 sm:w-8 flex items-center justify-center rounded-md transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian-accent/70 ${align === 'left' ? 'bg-white/15 text-white shadow-sm' : 'text-obsidian-muted hover:text-white'}`}
                >
                  <AlignLeftIcon className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                </button>
                <button 
                  onClick={() => setAlign('center')}
                  aria-label="Align text center"
                  aria-pressed={align === 'center'}
                  className={`interactive-scale h-8.5 sm:h-8 w-8.5 sm:w-8 flex items-center justify-center rounded-md transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian-accent/70 ${align === 'center' ? 'bg-white/15 text-white shadow-sm' : 'text-obsidian-muted hover:text-white'}`}
                >
                  <AlignCenterIcon className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
              
              <span className="w-[1px] h-3 bg-white/10 mx-1" aria-hidden="true"></span>
              
              <div 
                role="group" 
                aria-label="Card Font Size Selector" 
                className="flex items-center gap-0.5 flex-grow sm:flex-grow-0 justify-end sm:justify-start"
              >
                {['small', 'medium', 'large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    aria-label={`Set font size to ${size}`}
                    aria-pressed={fontSize === size}
                    className={`interactive-scale h-8.5 sm:h-8 flex-grow sm:flex-grow-0 px-3 sm:px-2.5 lg:px-2.5 xl:px-3.5 flex items-center justify-center rounded text-xs sm:text-[10px] uppercase font-extrabold tracking-wider transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian-accent/70 ${
                      fontSize === size ? 'bg-white/15 text-white shadow-sm' : 'text-obsidian-muted hover:text-white'
                    }`}
                  >
                    {size[0]}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Actions Group (AI Controls & Export Card) */}
          <div className="flex flex-col sm:flex-row lg:flex-row items-stretch sm:items-center lg:items-center gap-2.5 lg:gap-2 xl:gap-3 w-full lg:w-auto lg:h-full lg:ml-auto lg:pr-3.5 xl:pr-4">
            
            {!isReviewingHumanize ? (
              /* Standard Flow: Humanize and Export Card side-by-side on mobile, horizontal row on desktop */
              <div className="grid grid-cols-2 gap-2.5 w-full sm:flex sm:flex-row sm:items-center sm:w-auto">
                <button
                  onClick={handleHumanizeText}
                  disabled={isOptimizing}
                  aria-label="Humanize raw text using LLM"
                  className="interactive-scale h-11 sm:h-10 px-4 lg:px-3.5 xl:px-4 rounded-lg border bg-[#0C0C10] border-white/15 text-obsidian-muted hover:text-white hover:border-[#E2C29B]/30 flex items-center justify-center gap-2 font-extrabold text-xs sm:text-[10px] uppercase tracking-wider transition-all w-full sm:w-auto flex-shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian-accent/70 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isOptimizing ? 'Humanizing...' : 'Humanize'}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isOptimizing ? 'bg-[#E2C29B] animate-ping' : 'bg-white/20'}`} aria-hidden="true"></span>
                </button>

                <button
                  onClick={handleExportPNG}
                  disabled={isExporting}
                  aria-label="Export Custom Social Card Image as PNG"
                  className="interactive-scale h-11 sm:h-10 px-4.5 lg:px-3.5 xl:px-4.5 bg-gradient-to-r from-[#E2C29B] to-[#C49B74] hover:brightness-110 text-[#0D0D11] font-sans font-extrabold text-xs sm:text-[10px] uppercase tracking-wider rounded-lg shadow-lg shadow-[#E2C29B]/5 flex items-center justify-center gap-2 w-full sm:w-auto flex-shrink-0 cursor-pointer transition-all duration-200 focus-visible:ring-2 focus-visible:ring-obsidian-accent/70"
                >
                  <DownloadIcon className="w-3.5 h-3.5" />
                  <span>{isExporting ? 'Exporting...' : 'Export Card'}</span>
                </button>
              </div>
            ) : (
              /* Review Active Flow: Review actions and Export Card stacked on mobile, row on desktop */
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 lg:gap-2.5 w-full sm:w-auto">
                {/* Tactile Review Action Buttons */}
                <div 
                  role="group" 
                  aria-label="Review AI Draft Actions" 
                  className="flex items-center gap-1 bg-[#0C0C10] border border-[#E2C29B]/35 rounded-lg p-1 h-11 sm:h-10 w-full sm:w-auto justify-between sm:justify-center flex-shrink-0 shadow-md shadow-[#E2C29B]/5 transition-all duration-300"
                >
                  <button
                    onClick={handleKeepOriginal}
                    disabled={isStreaming || isOptimizing}
                    title="Discard humanized draft and revert to original text"
                    aria-label="Discard draft and keep original"
                    className="interactive-scale h-8.5 sm:h-8 flex-grow sm:flex-grow-0 px-3 sm:px-2 lg:px-2 xl:px-3 flex items-center justify-center rounded-md font-sans font-bold text-xs sm:text-[10px] uppercase tracking-wider transition-all gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian-accent/70 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <RotateCcwIcon className="w-2.5 h-2.5" />
                    <span>Original</span>
                  </button>

                  <button
                    onClick={handleRegenerateHumanized}
                    disabled={isStreaming || isOptimizing}
                    title="Generate another humanized draft variation"
                    aria-label="Regenerate another humanized draft"
                    className="interactive-scale h-8.5 sm:h-8 flex-grow sm:flex-grow-0 px-3 sm:px-2 lg:px-2 xl:px-3 flex items-center justify-center rounded-md font-sans font-bold text-xs sm:text-[10px] uppercase tracking-wider transition-all gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian-accent/70 text-[#E2C29B] border border-[#E2C29B]/25 hover:border-[#E2C29B]/50 hover:bg-[#E2C29B]/5 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <WandIcon className={`w-2.5 h-2.5 ${isStreaming ? 'animate-spin' : ''}`} />
                    <span>Regen</span>
                  </button>

                  <button
                    onClick={handleKeepHumanized}
                    disabled={isStreaming || isOptimizing}
                    title="Apply humanized draft back to Writing Studio input editor"
                    aria-label="Keep humanized text and update editor input"
                    className="interactive-scale h-8.5 sm:h-8 flex-grow sm:flex-grow-0 px-3.5 sm:px-2.5 lg:px-2.5 xl:px-3.5 flex items-center justify-center rounded-md font-sans font-extrabold text-xs sm:text-[10px] uppercase tracking-wider transition-all gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-obsidian-accent/70 bg-gradient-to-r from-[#E2C29B] to-[#C49B74] hover:brightness-110 text-[#0D0D11] active:scale-95 shadow-md shadow-black/10 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <CheckCircleIcon className="w-2.5 h-2.5" />
                    <span>Keep</span>
                  </button>
                </div>

                {/* Export Card button */}
                <button
                  onClick={handleExportPNG}
                  disabled={isExporting}
                  aria-label="Export Custom Social Card Image as PNG"
                  className="interactive-scale h-11 sm:h-10 px-4.5 bg-gradient-to-r from-[#E2C29B] to-[#C49B74] hover:brightness-110 text-[#0D0D11] font-sans font-extrabold text-xs sm:text-[10px] uppercase tracking-wider rounded-lg shadow-lg shadow-[#E2C29B]/5 flex items-center justify-center gap-2 w-full sm:w-auto flex-shrink-0 cursor-pointer transition-all duration-200 focus-visible:ring-2 focus-visible:ring-obsidian-accent/70"
                >
                  <DownloadIcon className="w-3.5 h-3.5" />
                  <span>{isExporting ? 'Exporting...' : 'Export Card'}</span>
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Centerpiece Content Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                   {/* Left Panel: Markdown Writer (Inputs area) */}
          <div className={`${gridCols.left} border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col p-3.5 sm:p-6 bg-[#060608]/50 gap-3.5 sm:gap-5 order-first lg:order-none transition-all duration-500 ease-in-out`}>
            
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span className="font-mono text-[10px] text-obsidian-muted uppercase tracking-widest font-bold">
                WRITING STUDIO
              </span>
              <button 
                onClick={handleReset}
                aria-label="Reset Writing Studio fields to default"
                className="interactive-scale flex items-center gap-1.5 text-obsidian-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian-accent/70 rounded px-1.5 py-0.5 cursor-pointer"
              >
                <RotateCcwIcon className="w-3 h-3" />
                <span className="font-mono text-[9px] uppercase tracking-wider">Reset</span>
              </button>
            </div>

            {/* Custom Handle and Headline side-by-side on mobile */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              {/* Handle */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="writer-handle" className="font-mono text-[10px] text-[#C4C4D6] uppercase tracking-widest font-extrabold">
                  Handle
                </label>
                <input
                  id="writer-handle"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@creator"
                  aria-label="Creator Handle"
                  className="w-full bg-[#09090C]/60 border border-white/15 focus-visible:border-[#E2C29B]/70 focus-visible:ring-2 focus-visible:ring-[#E2C29B]/20 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 font-mono text-[13px] sm:text-sm lg:text-[14px] text-white focus:outline-none placeholder:text-white/20 transition-all duration-300"
                />
              </div>

              {/* Headline */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="writer-headline" className="font-mono text-[10px] text-[#C4C4D6] uppercase tracking-widest font-extrabold">
                  Headline <span className="text-[9px] text-white/40 lowercase">(optional)</span>
                </label>
                <input
                  id="writer-headline"
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Enter card title..."
                  aria-label="Card Headline Input (Optional)"
                  className="w-full bg-[#09090C]/60 border border-white/15 focus-visible:border-[#E2C29B]/70 focus-visible:ring-2 focus-visible:ring-[#E2C29B]/20 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 font-mono text-[13px] sm:text-sm lg:text-[14px] text-white focus:outline-none placeholder:text-white/20 transition-all duration-300"
                />
              </div>
            </div>
 


            {/* Main Textarea */}
            <div className="flex flex-col flex-grow gap-2">
              <label htmlFor="writer-body" className="font-mono text-[10px] text-[#C4C4D6] uppercase tracking-widest font-extrabold">
                Body
              </label>
              <div className="relative flex-grow flex flex-col">
                <textarea
                  id="writer-body"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  disabled={isOptimizing}
                  placeholder="Write your long thoughts here..."
                  aria-label="Social Card Body Content Input"
                  className="w-full flex-grow bg-[#09090C]/40 border border-white/15 focus-visible:border-[#E2C29B]/60 focus-visible:ring-2 focus-visible:ring-[#E2C29B]/20 rounded-xl p-3.5 sm:p-4 font-mono text-[13px] sm:text-sm lg:text-[14px] leading-relaxed text-white/90 focus:outline-none resize-none min-h-[210px] sm:min-h-[240px] lg:min-h-[280px] transition-all duration-300"
                />
                
                {/* Character counting bar */}
                <div className="flex justify-between items-center pt-2.5 mt-1 text-[10px] font-mono text-obsidian-muted border-t border-white/10">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isOverflowing ? 'bg-obsidian-accent' : 'bg-white/20'}`} aria-hidden="true"></span>
                    {isOverflowing ? 'OVER 280 CHARACTER LIMIT' : 'STANDARD SINGLE POST'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={isOverflowing ? 'text-obsidian-accent font-bold' : 'text-white/60'}>
                      {currentCharCount}
                    </span>
                    <span className="opacity-30">/</span>
                    <span>280</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Elegant Error Alert */}
            {errorMsg && (
              <div className="bg-[#EF4444]/15 border border-[#EF4444]/25 text-[#F87171] rounded-xl p-3 text-xs font-sans flex items-start gap-2.5">
                <span className="text-sm mt-0.5">⚠️</span>
                <div className="flex-grow">
                  <div className="font-bold text-[10px] tracking-wide uppercase font-mono">AI Engine Alert</div>
                  <div className="opacity-90 mt-0.5 text-[10px] font-mono">{errorMsg}</div>
                </div>
                <button onClick={() => setErrorMsg(null)} className="text-white/40 hover:text-white text-xs font-bold font-mono">×</button>
              </div>
            )}

          </div>

          {/* Right Panel: Immersive Live Preview Card Canvas */}
          <div className={`${gridCols.right} p-3.5 sm:p-5 flex flex-col items-center justify-center bg-[#040406]/35 relative gap-3.5 sm:gap-4 order-last lg:order-none transition-all duration-500 ease-in-out`}>
            
            {/* Soft backdrop glow to give three-dimensional float depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-obsidian-aiGlow to-obsidian-accentMuted/5 blur-3xl rounded-full opacity-40 pointer-events-none" />

            {/* A dynamic width-locked container that keeps the theme selector, canvas card, and stats panel perfectly aligned to the exact same width */}
            <div className={`w-full flex flex-col gap-4 mx-auto transition-all duration-500 ease-in-out ${getAspectWidthClass()}`}>

              

              {/* Theme Preset Selector Button Row (Symmetric to Left Inputs Row) */}
              <div className="w-full flex flex-col gap-1.5 shrink-0">
                <span className="text-obsidian-muted font-mono text-[10px] uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                  <PaletteIcon className="w-3.5 h-3.5" /> Preset Theme
                </span>
                <div className="grid grid-cols-4 gap-1.5 w-full">
                  {Object.keys(PRESETS).map((key) => {
                    // Aesthetic color dots for previewing the theme at a single glance
                    const dots = {
                      ethereal: ['#F1F5F9', '#CBD5E1', '#0F172A'],
                      obsidian: ['#0D0D11', '#E2C29B', '#FFFFFF'],
                      parchment: ['#F3EAD3', '#D1C2A5', '#3E2511'],
                      clay: ['#E2725B', '#FFFDD0', '#FFFDD0']
                    }[key] || ['#FFFFFF'];

                    return (
                      <button
                        key={key}
                        onClick={() => setTheme(key)}
                        className={`interactive-scale flex-grow px-2 py-2 rounded-lg border text-center font-extrabold transition-all duration-200 text-[10px] sm:text-xs flex flex-col items-center justify-center gap-1 cursor-pointer ${
                          theme === key 
                            ? 'bg-obsidian-accentMuted border-[#E2C29B] text-white shadow-md' 
                            : 'bg-[#0C0C10] border-white/10 text-[#C4C4D6] hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <span className="truncate w-full text-[10px] sm:text-xs">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <div className="flex gap-1 items-center justify-center" aria-hidden="true">
                          {dots.map((color, idx) => (
                            <span 
                              key={idx} 
                              className="w-1.5 h-1.5 rounded-full border border-white/10" 
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Aspect-controlled Card Canvas */}
              <div className="w-full flex items-center justify-center relative z-10">
                <div 
                  ref={canvasRef}
                  className={`w-full transition-all duration-500 ease-in-out flex flex-col ${
                    aspect === 'Auto' ? 'justify-start gap-4' : 'justify-between'
                  } ${getCardPadding()} rounded-2xl border ${currentTheme.cardBg} ${activeFontFamily} ${currentTheme.border} ${getAspectClass()} ${
                    isStreaming
                      ? aiMode === 'humanize'
                        ? 'border-[#E2C29B]/60 shadow-[0_0_40px_rgba(226,194,155,0.25)]'
                        : 'border-[#6366F1]/50 shadow-[0_0_30px_rgba(99,102,241,0.2)] animate-pulse-slow'
                      : isReviewingHumanize
                        ? 'border-[#E2C29B]/40 shadow-[0_0_25px_rgba(226,194,155,0.15)]'
                        : 'shadow-2xl'
                  } ${isStreaming && aiMode === 'humanize' ? 'animate-[pulse_1.8s_infinite]' : ''}`}
                >
                  {/* Card Header (Pure Simple Profile Brand) */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs uppercase border border-black/5 ${currentTheme.avatarBg} ${currentTheme.avatarText} font-extrabold`}>
                        {getUserInitials()}
                      </div>
                      <div>
                        <div className={`font-semibold text-xs tracking-tight ${currentTheme.usernameColor}`}>
                          {username.replace('@', '').trim() || 'alwayspriyesh'}
                        </div>
                        <div className={`text-[9px] font-mono tracking-wider ${currentTheme.metaColor}`}>
                          {username ? (username.startsWith('@') ? username : `@${username}`) : '@alwayspriyesh'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className={`${
                    aspect === 'Auto' ? 'flex flex-col justify-start' : 'flex-grow flex flex-col justify-center'
                  } ${getBodyMargin()} ${align === 'center' ? 'text-center' : 'text-left'}`}>
                    <div className="flex flex-col gap-3">
                      {activeContent.headline && (
                        <h3 className={`font-bold text-[15px] sm:text-[18.5px] leading-snug tracking-tight ${currentTheme.titleColor} ${isStreaming && aiMode !== 'humanize' ? 'animate-pulse' : ''}`}>
                          {activeContent.headline}
                        </h3>
                      )}
                      <p className={`whitespace-pre-wrap ${getFontSizeClass()} ${currentTheme.bodyColor} ${isStreaming ? 'text-glow-ai font-semibold' : ''}`}>
                        {activeContent.body || (isStreaming ? "✦ drafting..." : "")}
                      </p>
                    </div>
                  </div>

                  {/* Optional Bottom Spacer dot only for fixed aspect ratios to balance content */}
                  {aspect !== 'Auto' && (
                    <div className="flex justify-center items-center font-mono text-[10px] text-obsidian-muted/40 tracking-widest pt-2">
                      <span>✦</span>
                    </div>
                  )}
                </div>
              </div>



              {/* Understated Analytics stats panel inside right layout */}
              <div className="w-full flex justify-between items-center px-3 sm:px-4 font-mono text-[10px] text-[#C4C4D6] bg-[#08080A]/60 border border-white/10 rounded-xl py-2 shadow-sm gap-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-obsidian-accent shrink-0"></span>
                  <span className="hidden sm:inline">Reading time:</span> 
                  <strong className="text-white font-bold">{readingTime}</strong>
                </span>
                <span className="text-white/15 font-light">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="hidden sm:inline">Readability:</span> 
                  <strong className="text-white font-bold">{readability}</strong>
                </span>
                <span className="text-white/15 font-light">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="hidden sm:inline">Attention:</span> 
                  <strong className="text-obsidian-accent text-glow font-bold">{engagement}</strong>
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Dynamic Notification Toast */}
      <AnimatePresence>
        {toastConfig.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-4.5 bg-[#0D0D11]/90 border-l-4 border-l-[#E2C29B] border border-white/10 rounded-r-xl rounded-l-md px-5 py-4 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_15px_rgba(226,194,155,0.05)] backdrop-blur-2xl max-w-sm"
          >
            <div className="w-9 h-9 rounded-full bg-[#E2C29B]/10 border border-[#E2C29B]/25 flex items-center justify-center text-[#E2C29B] shadow-[inset_0_0_8px_rgba(226,194,155,0.1)] shrink-0" aria-hidden="true">
              <CheckCircleIcon className="w-4.5 h-4.5 animate-[pulse_2s_infinite]" />
            </div>
            <div className="flex flex-col gap-0.5 select-none">
              <div className="text-white font-sans text-xs md:text-sm font-extrabold tracking-tight">{toastConfig.title}</div>
              <div className="text-[#E2C29B]/90 font-mono text-[9px] font-extrabold tracking-widest uppercase mt-0.5">{toastConfig.subtitle}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
