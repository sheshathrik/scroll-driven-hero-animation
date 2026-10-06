import React from 'react';
import { Gauge, Compass, Activity, Flag } from 'lucide-react';

export default function TelemetryHUD({ velocity = 0, scrollProgress = 0 }) {
  // Map scroll velocity to simulated McLaren 720S speedometer
  const absVelocity = Math.abs(velocity);
  // Velocity can be from 0 to ~2500 pixels/sec; map to 0 - 212 mph
  const targetSpeed = Math.min(Math.round((absVelocity / 18) + (scrollProgress > 0 ? 15 : 0)), 212);
  const gear = targetSpeed === 0 ? 'P' : targetSpeed < 30 ? '1' : targetSpeed < 65 ? '2' : targetSpeed < 105 ? '3' : targetSpeed < 145 ? '4' : targetSpeed < 180 ? '5' : '6';
  const distance = Math.round(scrollProgress * 1000); // 0m to 1000m

  return (
    <div className="hidden md:flex items-center gap-6 px-5 py-2.5 rounded-2xl bg-[#10121a]/80 backdrop-blur-md border border-white/10 shadow-2xl text-xs font-mono text-zinc-300">
      {/* Speedometer */}
      <div className="flex items-center gap-2.5">
        <Gauge className="w-4 h-4 text-[#45db7d]" />
        <div>
          <div className="text-[10px] text-zinc-500 uppercase font-bold">VELOCITY</div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-white font-sans">{targetSpeed}</span>
            <span className="text-[10px] text-[#45db7d] font-bold">MPH</span>
          </div>
        </div>
      </div>

      <div className="w-px h-7 bg-white/10" />

      {/* Gear indicator */}
      <div>
        <div className="text-[10px] text-zinc-500 uppercase font-bold">GEAR</div>
        <div className="text-xl font-black text-[#def54f]">{gear}</div>
      </div>

      <div className="w-px h-7 bg-white/10" />

      {/* Distance meter */}
      <div className="flex items-center gap-2">
        <Flag className="w-4 h-4 text-[#6ac9ff]" />
        <div>
          <div className="text-[10px] text-zinc-500 uppercase font-bold">DISTANCE</div>
          <div className="text-sm font-bold text-white">
            {distance} <span className="text-[10px] text-zinc-400">/ 1000 M</span>
          </div>
        </div>
      </div>

      <div className="w-px h-7 bg-white/10" />

      {/* Throttle / Boost Bar */}
      <div>
        <div className="text-[10px] text-zinc-500 uppercase font-bold">THROTTLE</div>
        <div className="w-16 h-2 bg-zinc-800 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-gradient-to-r from-[#45db7d] via-[#def54f] to-[#fa7328] transition-all duration-100"
            style={{ width: `${Math.min((targetSpeed / 200) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
