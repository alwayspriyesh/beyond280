import React from 'react';
import { motion } from 'framer-motion';
import { FeatherLogo } from './Icons';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function ProductSections({ onFocusWorkspace }) {
  return (
    <div className="w-full flex flex-col mt-10 md:mt-16 gap-0">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: THE ORIGIN STORY — "Why I built this"
          Personal, emotional, authentic. NOT marketing copy.
      ═══════════════════════════════════════════════════════════════ */}
      <section id="story" className="py-16 md:py-20 border-t border-white/5 scroll-mt-20">
        <div className="max-w-5xl mx-auto flex flex-col gap-8 md:gap-10">

          {/* Inspirational Headline at the Top */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="flex flex-col gap-2 text-center max-w-3xl mx-auto"
          >
            <span className="font-mono text-[10px] tracking-[0.25em] text-obsidian-accent uppercase font-extrabold">
              The Backstory
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12]">
              I’m an engineer.<br />
              <span className="bg-gradient-to-r from-[#E2C29B] to-[#C49B74] bg-clip-text text-transparent">And engineers are built to solve problems.</span>
            </h2>
          </motion.div>

          {/* Inspirational Paragraphs below in global width */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col gap-6 text-sm md:text-base text-[#A0A0B8] font-sans leading-[1.85] max-w-4xl mx-auto text-left md:text-center"
          >
            <motion.p variants={fadeUp} custom={0}>
              While trying to share deeper thoughts on X, I kept running into the same limitation over and over again: <span className="text-obsidian-accent font-bold">280 characters.</span>
            </motion.p>

            <motion.p variants={fadeUp} custom={1} className="text-white/90 font-medium text-[15px] md:text-lg italic tracking-wide">
              Some ideas are <span className="text-obsidian-accent font-bold">too meaningful</span> to be compressed into a few lines. Some stories need space. Some thoughts deserve better presentation.
            </motion.p>

            <motion.p variants={fadeUp} custom={2}>
              I tried screenshots. I tried notes apps. I tried manually designing posts. But everything felt <span className="text-obsidian-accent font-bold">slow, messy, and disconnected</span> from the way modern creators actually think and write.
            </motion.p>

            <motion.p variants={fadeUp} custom={3} className="text-white font-extrabold text-xl md:text-2xl py-2 tracking-tight">
              So I built <span className="bg-gradient-to-r from-[#E2C29B] to-[#C49B74] bg-clip-text text-transparent">Beyond280</span>.
            </motion.p>

            <motion.p variants={fadeUp} custom={4}>
              A creator-focused tool designed to <span className="text-obsidian-accent font-bold">turn long-form thoughts into beautiful, shareable visual posts</span> — powered by AI, optimized for clarity, and built for modern internet creators.
            </motion.p>

            <motion.p variants={fadeUp} custom={5}>
              Beyond280 isn’t just about bypassing a character limit. It’s about giving creators the <span className="text-[#E2C29B] font-bold">freedom to express ideas</span> without compromising depth, design, or creativity.
            </motion.p>

            {/* Creator Signature Block Immediately After Story */}
            <motion.div 
              variants={fadeUp} 
              custom={6}
              className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-left w-full"
            >
              <div className="flex flex-col gap-1.5 max-w-md">
                <p className="text-[13px] sm:text-sm text-obsidian-muted leading-relaxed font-sans italic">
                  "Built by a creator who simply wanted to share more. If Beyond280 helped you share something meaningful, that's all I wanted."
                </p>
              </div>
              <a
                href="https://x.com/alwayspriyesh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow the creator @alwayspriyesh on X"
                className="interactive-scale flex items-center gap-2.5 h-10 px-5 bg-[#0C0C10] border border-[#E2C29B]/20 hover:border-[#E2C29B] bg-gradient-to-r from-obsidian-accentMuted to-white/[0.02] hover:brightness-110 text-obsidian-accent hover:text-white font-sans font-extrabold text-[10.5px] uppercase tracking-wider rounded-lg shadow-md shadow-[#E2C29B]/5 transition-all duration-300 shrink-0"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Follow @alwayspriyesh</span>
              </a>
            </motion.div>
          </motion.div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: WHY VISUAL STORYTELLING MATTERS
          Emotional reasoning, not feature listing
      ═══════════════════════════════════════════════════════════════ */}
      <section id="why-visual" className="py-12 md:py-16 border-t border-white/5 scroll-mt-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-5"
          >
            <motion.span variants={fadeUp} className="font-mono text-[10px] tracking-[0.2em] text-obsidian-accent uppercase font-bold">
              Why visual posts win
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading font-extrabold text-2xl md:text-3xl text-white tracking-tight leading-tight">
              Text gets scrolled past.<br />
              <span className="text-obsidian-accent">Images get read.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-sm text-[#A0A0B8] font-sans leading-relaxed">
              Think about the posts that actually stop you mid-scroll. They're almost never plain text. They're typographic cards, clean quotes, or designed statements that stand out because they look intentional. When your thoughts look premium, people give them premium attention.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-5"
          >
            <motion.div variants={fadeUp} custom={0} className="bg-[#0C0C10] border border-white/5 rounded-xl p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[10px] font-mono text-obsidian-muted uppercase tracking-wider font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
                Plain text post
              </div>
              <p className="text-xs text-white/40 font-sans leading-relaxed">
                "I think the best career advice I ever got was to stop optimizing for the next job and start optimizing for the work that makes you lose track of time. Most people chase titles. The ones who win chase craft."
              </p>
              <span className="text-[9px] text-white/20 font-mono">12 likes · lost in the timeline</span>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="bg-[#0D0D11] border border-[#E2C29B]/20 rounded-xl p-6 flex flex-col gap-3 shadow-lg shadow-[#E2C29B]/5">
              <div className="flex items-center gap-2 text-[10px] font-mono text-obsidian-accent uppercase tracking-wider font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-obsidian-accent"></span>
                Beyond280 visual card
              </div>
              <div className="bg-[#0D0D11] border border-[#E2C29B]/15 rounded-lg p-4">
                <p className="text-xs text-white font-sans leading-relaxed font-medium">
                  "Stop optimizing for the next job title. Start optimizing for the work that makes you lose track of time."
                </p>
                <p className="text-[10px] text-white/50 mt-2 font-sans">The ones who win chase craft, not credentials.</p>
              </div>
              <span className="text-[9px] text-obsidian-accent font-mono font-bold">847 likes · 12 reposts · bookmarked 200+ times</span>
            </motion.div>
          </motion.div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: HOW IT ACTUALLY WORKS — The workflow, not specs
          Human language explaining the process
      ═══════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-12 md:py-16 border-t border-white/5 scroll-mt-20">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            className="text-center flex flex-col gap-3 max-w-xl mx-auto"
          >
            <motion.span variants={fadeUp} className="font-mono text-[10px] tracking-[0.2em] text-obsidian-accent uppercase font-bold">
              How it works
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading font-extrabold text-2xl md:text-3xl text-white tracking-tight leading-tight">
              Write it. Style it. Post it.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-sm text-[#A0A0B8] font-sans leading-relaxed">
              No accounts. No onboarding. No "upgrade to pro" walls. Just open the studio and start.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                step: '01',
                title: 'Dump your thoughts',
                body: "Write whatever's on your mind. Don't worry about length, structure, or robotic phrasing. Just get it out. The editor is your thinking space."
              },
              {
                step: '02',
                title: 'Pick a look',
                body: "Choose a theme that fits the mood. Dark and authoritative? Light and clean? Warm and personal? Adjust fonts, layout, aspect ratio — all in real-time."
              },
              {
                step: '03',
                title: 'Export and post',
                body: "One click. High-resolution PNG. Drag it into your tweet, LinkedIn post, or Instagram story. Your thought now looks like it was designed by a professional."
              }
            ].map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                custom={i}
                className="flex flex-col gap-3 p-5 rounded-xl border border-white/5 bg-[#0A0A0E]/60 hover:border-[#E2C29B]/35 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(226,194,155,0.03)] transition-all duration-500 ease-out transform cursor-default"
              >
                <span className="font-mono text-[10px] text-obsidian-accent font-bold tracking-wider">{item.step}</span>
                <h3 className="text-white font-bold text-sm">{item.title}</h3>
                <p className="text-[12px] text-[#A0A0B8] font-sans leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: WHY SIMPLICITY MATTERS — Philosophy, not features
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <motion.span variants={fadeUp} className="font-mono text-[10px] tracking-[0.2em] text-obsidian-accent uppercase font-bold">
              Design philosophy
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading font-extrabold text-2xl md:text-3xl text-white tracking-tight leading-tight">
              I didn't build another Canva.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-sm text-[#A0A0B8] font-sans leading-relaxed">
              Most design tools try to do everything. Beyond280 does one thing and does it well. You write text, you get a beautiful card. No layers. No drag-and-drop. No 47 toolbar icons. Just typographic precision and speed.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              {
                label: 'Speed over complexity',
                detail: "From thought to exportable image in under 60 seconds. That's the benchmark."
              },
              {
                label: 'Typography over decoration',
                detail: "Great type doesn't need gradients, icons, or stock photos. Clean text on a well-chosen background is timeless."
              },
              {
                label: 'Creator intent preserved',
                detail: "AI humanizer tools remove artificial robotic tones without changing your core message. Your words, your style — just more natural."
              },
              {
                label: 'No accounts, no data',
                detail: "Open the site. Make your card. Download it. That's it. No sign-ups, no tracking, no upsells."
              }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                custom={i}
                className="p-5 rounded-xl border border-white/5 bg-[#0A0A0E]/60 hover:border-[#E2C29B]/35 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(226,194,155,0.03)] transition-all duration-500 ease-out transform flex flex-col gap-2 cursor-default"
              >
                <h4 className="text-white text-xs font-bold">{item.label}</h4>
                <p className="text-[11px] text-[#A0A0B8] font-sans leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: VISUAL THEMES PREVIEW
          Kept elegant, but with human copy
      ═══════════════════════════════════════════════════════════════ */}
      <section id="themes" className="py-12 md:py-16 border-t border-white/5 scroll-mt-20">
        <div className="max-w-5xl mx-auto flex flex-col gap-7">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            className="text-center flex flex-col gap-3 max-w-xl mx-auto"
          >
            <motion.span variants={fadeUp} className="font-mono text-[10px] tracking-[0.2em] text-obsidian-accent uppercase font-bold">
              Four moods, one click
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading font-extrabold text-2xl md:text-3xl text-white tracking-tight leading-tight">
              Your words. Your aesthetic.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-sm text-[#A0A0B8] font-sans leading-relaxed">
              Every theme was designed to feel intentional — not templated. Pick the one that matches the energy of what you're saying.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Obsidian */}
            <motion.div 
              variants={fadeUp} 
              custom={0} 
              className="p-5 sm:p-6 rounded-xl border border-white/5 bg-[#0D0D11] hover:border-[#E2C29B]/50 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(226,194,155,0.06)] transition-all duration-500 ease-out transform flex flex-col justify-between h-auto sm:aspect-[4/3] group cursor-default"
            >
              <span className="font-mono text-[9px] text-[#E2C29B] tracking-wider uppercase font-bold">Obsidian</span>
              <div className="my-2">
                <h4 className="font-heading font-extrabold text-white text-sm mb-1">Bold & authoritative</h4>
                <p className="text-[11px] text-obsidian-muted font-sans leading-relaxed">
                  For posts that need to feel like a mic drop. Dark, premium, undeniable.
                </p>
              </div>
              <div className="w-8 h-0.5 bg-[#E2C29B] rounded"></div>
            </motion.div>

            {/* Ethereal */}
            <motion.div 
              variants={fadeUp} 
              custom={1} 
              className="p-5 sm:p-6 rounded-xl border border-[#CBD5E1]/40 bg-[#F1F5F9] hover:border-[#0F172A]/40 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(15,23,42,0.06)] transition-all duration-500 ease-out transform flex flex-col justify-between h-auto sm:aspect-[4/3] group cursor-default"
            >
              <span className="font-mono text-[9px] text-[#64748B] tracking-wider uppercase font-bold">Ethereal</span>
              <div className="my-2">
                <h4 className="font-serif italic font-semibold text-[#0F172A] text-sm mb-1">Clean & thoughtful</h4>
                <p className="text-[11px] text-[#475569] font-sans leading-relaxed">
                  When you want your words to breathe. Light, crisp, editorial.
                </p>
              </div>
              <div className="w-8 h-0.5 bg-[#0F172A] rounded"></div>
            </motion.div>

            {/* Parchment */}
            <motion.div 
              variants={fadeUp} 
              custom={2} 
              className="p-5 sm:p-6 rounded-xl border border-[#D1C2A5]/40 bg-[#F3EAD3] hover:border-[#3E2511]/40 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(62,37,17,0.08)] transition-all duration-500 ease-out transform flex flex-col justify-between h-auto sm:aspect-[4/3] group cursor-default"
            >
              <span className="font-mono text-[9px] text-[#85705B] tracking-wider uppercase font-bold">Parchment</span>
              <div className="my-2">
                <h4 className="font-serif italic font-bold text-[#3E2511] text-sm mb-1">Warm & literary sepia</h4>
                <p className="text-[11px] text-[#4F3620] font-sans leading-relaxed">
                  Feels like a classic printed sheet of paper. Cozy, intimate, human.
                </p>
              </div>
              <div className="w-8 h-0.5 bg-[#3E2511] rounded"></div>
            </motion.div>

            {/* Clay */}
            <motion.div 
              variants={fadeUp} 
              custom={3} 
              className="p-5 sm:p-6 rounded-xl border border-[#FFFDD0]/15 bg-[#E2725B] hover:border-[#FFFDD0]/55 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(255,253,208,0.06)] transition-all duration-500 ease-out transform flex flex-col justify-between h-auto sm:aspect-[4/3] group cursor-default"
            >
              <span className="font-mono text-[9px] text-[#FFFDD0] tracking-wider uppercase font-bold">Clay</span>
              <div className="my-2">
                <h4 className="font-serif italic font-semibold text-[#FFFDD0] text-sm mb-1">Earthy & grounded</h4>
                <p className="text-[11px] text-[#FFFDD0]/90 font-sans leading-relaxed">
                  For when you want to feel organic and real. Earthy, alive, warm.
                </p>
              </div>
              <div className="w-8 h-0.5 bg-[#FFFDD0] rounded"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6: FINAL CTA — Emotional, not salesy
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="font-heading font-extrabold text-3xl md:text-4xl text-white tracking-tight leading-tight"
          >
            Your next thought deserves<br />
            <span className="bg-gradient-to-r from-[#E2C29B] to-[#C49B74] bg-clip-text text-transparent">more than 280 characters.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs md:text-sm text-[#A0A0B8] leading-relaxed font-sans max-w-md mx-auto"
          >
            No sign-up. No paywall. Just open the studio and turn your raw thinking into something people actually stop scrolling for.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            onClick={onFocusWorkspace}
            aria-label="Navigate to writing studio"
            className="interactive-scale px-7 py-3.5 bg-gradient-to-r from-[#E2C29B] to-[#C49B74] hover:brightness-110 text-obsidian-bg font-sans font-extrabold text-sm rounded-full shadow-lg shadow-obsidian-accentMuted transition-all duration-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian-accent/70 cursor-pointer"
          >
            Open the Studio
          </motion.button>
        </div>
      </section>

    </div>
  );
}
