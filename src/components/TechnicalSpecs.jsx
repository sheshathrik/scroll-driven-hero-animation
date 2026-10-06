import React from 'react';
import { Cpu, Zap, Smartphone, Sliders, CheckCircle2, Shield, Layers } from 'lucide-react';

export default function TechnicalSpecs() {
  return (
    <section id="specs-section" className="relative w-full bg-[#0d0e15] py-20 px-4 sm:px-8 border-t border-white/10 text-white z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#45db7d] mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>FRONTEND ARCHITECTURE & OPTIMIZATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Motion Engineering & Interaction Design
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Recreated and elevated from the reference demo using modern web standards, hardware-accelerated transforms, and fluid responsiveness across all viewport tiers.
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#def54f]/50 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#def54f]/10 border border-[#def54f]/30 flex items-center justify-center text-[#def54f] mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold mb-2">Compositor-Only Motion</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Car translation runs on the GPU compositor using <code className="text-[#def54f]">transform: translate3d</code> and <code className="text-[#def54f]">scaleX</code> for the trail, eliminating costly layout thrashing and reflows.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#45db7d]/50 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#45db7d]/10 border border-[#45db7d]/30 flex items-center justify-center text-[#45db7d] mb-4 group-hover:scale-110 transition-transform">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold mb-2">GSAP ScrollTrigger Scrub</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Coupled with GSAP ScrollTrigger's <code className="text-[#45db7d]">scrub: 0.85</code>, motion features realistic kinetic inertia and instant backward-forward bi-directional scrubbing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#6ac9ff]/50 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#6ac9ff]/10 border border-[#6ac9ff]/30 flex items-center justify-center text-[#6ac9ff] mb-4 group-hover:scale-110 transition-transform">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold mb-2">Responsive Recalculation</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Unlike static references with fixed pixel offsets, letter trigger coordinates and car travel distances dynamically re-compute on window resize and mobile orientation changes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#fa7328]/50 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#fa7328]/10 border border-[#fa7328]/30 flex items-center justify-center text-[#fa7328] mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold mb-2">Web Audio Synthesizer</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Interactive dual-oscillator synthesizer dynamically shifts engine frequency (55Hz–265Hz) and lowpass cutoff in real-time response to scroll acceleration.
            </p>
          </div>
        </div>

        {/* Feature Comparison Table vs Reference */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 sm:p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#def54f]" />
            Enhancements Over Reference Implementation
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-mono">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400">
                  <th className="pb-3 font-semibold">CAPABILITY</th>
                  <th className="pb-3 font-semibold">ORIGINAL REFERENCE</th>
                  <th className="pb-3 font-semibold text-[#45db7d]">OUR IMPLEMENTATION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-3.5 font-bold text-white">Mobile Responsiveness</td>
                  <td className="py-3.5 text-zinc-500">Fixed 8rem font & hardcoded offsets</td>
                  <td className="py-3.5 text-[#def54f] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#45db7d]" /> Fluid clamp typography & dynamic cards
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-white">Initial Load Animation</td>
                  <td className="py-3.5 text-zinc-500">Static / Immediate pop-in</td>
                  <td className="py-3.5 text-[#def54f] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#45db7d]" /> Staggered letter reveal & card entrance
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-white">Real-time Telemetry</td>
                  <td className="py-3.5 text-zinc-500">None</td>
                  <td className="py-3.5 text-[#def54f] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#45db7d]" /> Speedometer HUD synced to scroll velocity
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-white">Interactive Audio</td>
                  <td className="py-3.5 text-zinc-500">None</td>
                  <td className="py-3.5 text-[#def54f] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#45db7d]" /> Web Audio API procedural V8 engine
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-white">Card Visual Hierarchy</td>
                  <td className="py-3.5 text-zinc-500">Raw fixed div blocks</td>
                  <td className="py-3.5 text-[#def54f] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#45db7d]" /> Glassmorphism cards with scroll stage spotlights
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

