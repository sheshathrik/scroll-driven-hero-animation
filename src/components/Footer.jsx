import React from 'react';
import { ExternalLink, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#08090d] py-12 px-4 sm:px-8 border-t border-white/10 text-white font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-sm">ITZFIZZ SCROLL-DRIVEN MOTION</span>
            <span className="px-2 py-0.5 rounded bg-[#45db7d]/20 text-[#45db7d] text-[10px] font-bold">
              v1.0.0
            </span>
          </div>
          <p className="text-zinc-500 text-[11px]">
            Frontend Engineering Assignment • Recreating & Elevating McLaren Hero Scroll
          </p>
        </div>

        {/* Center: Tech Stack Badges */}
        <div className="flex flex-wrap justify-center gap-2 text-[11px]">
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300">
            React 18
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#def54f]/10 border border-[#def54f]/30 text-[#def54f]">
            GSAP ScrollTrigger
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#6ac9ff]/10 border border-[#6ac9ff]/30 text-[#6ac9ff]">
            Tailwind CSS
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#45db7d]/10 border border-[#45db7d]/30 text-[#45db7d]">
            Web Audio API
          </span>
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/sheshathrik/scroll-driven-hero-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub Repository</span>
          </a>
          <a
            href="https://paraschaturvedi.github.io/car-scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-[#def54f] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Original Reference</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-zinc-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          Crafted by <strong className="text-zinc-300">Sheshathri K</strong> (sheshathrik)
        </div>
        <div>
          Hosted with GitHub Pages • Smooth 60 FPS Compositor Pipeline
        </div>
      </div>
    </footer>
  );
}
