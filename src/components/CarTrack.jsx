import React, { memo } from 'react';
import carImage from '../assets/car.png';

const HEADLINE_TEXT = "WELCOME ITZFIZZ";

const CarTrack = memo(function CarTrack({
  carRef,
  trailRef,
  lettersRef,
  textContainerRef,
  trackRef,
}) {
  const letters = HEADLINE_TEXT.split('');

  return (
    <div
      ref={trackRef}
      className="relative w-full overflow-hidden select-none my-1 sm:my-3 lg:my-5"
    >
      {/* Background Asphalt Highway */}
      <div className="relative w-full h-[90px] sm:h-[130px] md:h-[160px] lg:h-[200px] bg-[#121319] border-y-2 border-white/10 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] overflow-hidden flex items-center">
        {/* Subtle road surface lines / asphalt texture */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#383b4c_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* Highway dashed center lane */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] sm:h-[3px] border-b-2 border-dashed border-white/20 z-0 pointer-events-none" />

        {/* Start Gate */}
        <div className="absolute left-0 top-0 bottom-0 w-2.5 sm:w-3 bg-gradient-to-r from-[#45db7d]/40 to-transparent z-10 flex flex-col justify-between py-1 pointer-events-none">
          <div className="w-1.5 h-full border-r-2 border-dashed border-[#45db7d]/60" />
        </div>

        {/* Finish Gate */}
        <div className="absolute right-0 top-0 bottom-0 w-3 sm:w-4 bg-gradient-l from-[#def54f]/40 to-transparent z-10 flex items-center justify-end pr-1 pointer-events-none">
          <div className="w-1.5 h-full border-l-2 border-dashed border-[#def54f]/60" />
        </div>

        {/* The Neon Cyber Trail (positioned strictly behind the car) */}
        <div
          ref={trailRef}
          id="trail"
          className="absolute top-0 left-0 bottom-0 z-1 pointer-events-none"
          style={{
            width: '0px',
            background: 'linear-gradient(90deg, rgba(69,219,125,0.85) 0%, rgba(69,219,125,0.95) 85%, rgba(222,245,79,1) 100%)',
            boxShadow: '0 0 25px rgba(69,219,125,0.6), inset 0 0 15px rgba(255,255,255,0.3)',
          }}
        />

        {/* Letter-Spaced Headline Overlay */}
        <div
          ref={textContainerRef}
          className="absolute inset-0 flex items-center justify-start px-3 sm:px-8 md:px-12 z-5 pointer-events-none"
        >
          <div className="flex items-center tracking-[0.16em] sm:tracking-[0.35em] md:tracking-[0.55em] font-black text-xl sm:text-3xl md:text-5xl lg:text-6xl font-sans uppercase">
            {letters.map((char, index) => {
              if (char === ' ') {
                return (
                  <span
                    key={index}
                    className="inline-block w-2 sm:w-4 md:w-6"
                  >
                    &nbsp;
                  </span>
                );
              }
              return (
                <span
                  key={index}
                  ref={(el) => (lettersRef.current[index] = el)}
                  className="value-letter inline-block text-zinc-600 opacity-20 will-change-[transform,opacity,color]"
                  style={{
                    textShadow: 'none',
                    transform: 'none',
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>

        {/* The McLaren 720S Supercar */}
        {/* Safari-compatible full-height flex container for perfect vertical centering */}
        <div
          ref={carRef}
          id="car"
          className="absolute top-0 bottom-0 left-0 z-20 flex items-center pointer-events-none will-change-transform"
          style={{
            width: '130px',
          }}
        >
          <div className="relative w-full flex items-center justify-center">
            {/* Dual Headlight Beams */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-16 sm:w-24 h-10 sm:h-14 pointer-events-none z-0"
              style={{ right: '-50px' }}
            >
              <div
                className="w-full h-full"
                style={{
                  background: 'radial-gradient(ellipse at left, rgba(222, 245, 79, 0.45) 0%, rgba(69, 219, 125, 0.15) 50%, transparent 80%)',
                  transform: 'scaleX(1.4)',
                }}
              />
            </div>

            {/* Rear Exhaust Glow */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 sm:w-6 h-6 sm:h-8 pointer-events-none z-0"
              style={{ left: '-10px' }}
            >
              <div
                className="w-full h-full rounded-full blur-xs"
                style={{
                  background: 'radial-gradient(circle, rgba(69, 219, 125, 0.9) 0%, rgba(222, 245, 79, 0.4) 70%, transparent 100%)',
                }}
              />
            </div>

            {/* Car Top-View Image */}
            <img
              src={carImage}
              alt="McLaren 720S Top View"
              className="w-full h-auto max-h-[82%] object-contain filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.95)] relative z-10"
              draggable="false"
              onError={(e) => {
                if (!e.target.src.includes('car.png')) {
                  e.target.src = 'car.png';
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Road Markers / Distance Indicators under the road */}
      <div className="flex justify-between items-center px-3 sm:px-8 md:px-12 text-[9px] sm:text-[10px] font-mono text-zinc-500 pt-1">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#45db7d]" /> START 000M
        </span>
        <span className="hidden sm:inline">250M</span>
        <span>SECTOR 500M</span>
        <span className="hidden sm:inline">750M</span>
        <span className="flex items-center gap-1 text-[#def54f]">
          FINISH 1000M <span className="w-1.5 h-1.5 rounded-full bg-[#def54f]" />
        </span>
      </div>
    </div>
  );
});

export default CarTrack;
