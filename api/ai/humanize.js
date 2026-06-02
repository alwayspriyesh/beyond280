import { validateRequest, streamGroq } from "./_groq.js";
import { HUMANIZE_SYSTEM_PROMPT, HUMANIZE_PRESETS } from "./_prompts.js";

// Utility to check for gibberish/meaningless spam
function isGibberish(text) {
  if (!text || !text.trim()) return false;
  const trimmed = text.trim();

  // 1. Common keyboard row patterns (e.g. "qwerty", "asdfgh")
  const keyboardMashes = ["qwerty", "asdfgh", "zxcvbn", "qwert", "asdfg", "zxcvb"];
  for (const mash of keyboardMashes) {
    if (trimmed.toLowerCase().includes(mash)) {
      return true;
    }
  }
  
  // 2. Repeated word patterns (e.g. "abc abc abc abc")
  const words = trimmed.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length >= 3) {
    const uniqueWords = new Set(words);
    if (uniqueWords.size === 1) return true;
    if (uniqueWords.size / words.length < 0.25 && words.length >= 4) return true;
  }

  // 2. Keystroke mashing or long word without any vowels
  for (const word of words) {
    if (word.length > 6) {
      const hasVowels = /[aeiouy]/i.test(word);
      if (!hasVowels) return true;
      
      const consecutiveConsonants = word.match(/[^aeiouy\s\d\W]{6,}/i);
      if (consecutiveConsonants) return true;
    }
  }

  // 3. Repeated single character strings (e.g. "aaaaa")
  if (/(.)\1{5,}/.test(trimmed.replace(/\s+/g, ''))) {
    return true;
  }

  return false;
}

export default async function handler(req, res) {
  const validation = await validateRequest(req, res);
  if (!validation) return;

  const { body, apiKey } = validation;
  const { text, preset } = body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Missing required 'text' parameter." });
  }

  const cleanedText = text.trim().replace(/\s+/g, ' ');

  // Intelligently handle gibberish
  if (isGibberish(text)) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Content-Encoding", "none");
    res.setHeader("X-Accel-Buffering", "no");

    const feedbackText = `[Editor's Note: This text looks a bit like keyboard testing or random spam. I've lightly cleaned the spacing, but there isn't enough context to humanize it. Feel free to try a natural sentence!]\n\n${cleanedText}`;
    
    res.write(`data: ${JSON.stringify({ text: feedbackText })}\n\n`);
    res.write("data: [DONE]\n\n");
    res.end();
    return;
  }

  const selectedPreset = preset || "Natural";
  const presetDescription = HUMANIZE_PRESETS[selectedPreset] || HUMANIZE_PRESETS.Natural;

  const systemPrompt = HUMANIZE_SYSTEM_PROMPT.replace(
    "{humanizePresetDescription}",
    `Preset: ${selectedPreset}\nGuideline: ${presetDescription}`
  );

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: text }
  ];

  // Set temperature to 0.45 for stable, controlled, and predictable humanized outcomes
  await streamGroq(apiKey, messages, 0.45, res);
}
