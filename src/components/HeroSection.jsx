import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CarTrack from './CarTrack';
import MetricCards from './MetricCards';
import TelemetryHUD from './TelemetryHUD';
import { soundEngine } from './AudioEngine';
import { ChevronDown, MousePointerClick } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onProgressUpdate, demoTriggerCount, resetCount }) {
  const sectionRef = useRef(null);
  const trackWrapperRef = useRef(null);
  const trackRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const textContainerRef = useRef(null);
  const lettersRef = useRef([]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Resize handler & dimensions recalculation
  const calculateDimensions = useCallback(() => {
    if (!trackRef.current || !carRef.current) return { roadWidth: 0, carWidth: 0, endX: 0 };
    const roadWidth = trackRef.current.clientWidth || window.innerWidth;
    const isSmall = window.innerWidth < 640;
    const isMedium = window.innerWidth >= 640 && window.innerWidth < 1024;
    const carWidth = isSmall ? 95 : isMedium ? 130 : 160;

    carRef.current.style.width = `${carWidth}px`;
    const endX = Math.max(roadWidth - carWidth - (isSmall ? 10 : 25), 50);

    return { roadWidth, carWidth, endX };
  }, []);

  // Handle auto-scroll demo run
  useEffect(() => {
    if (demoTriggerCount === 0 || !sectionRef.current) return;
    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;

    // Smoothly scroll down through the section
    const startScroll = window.scrollY;
    const targetScroll = sectionTop + sectionHeight;
    const duration = 4000;
    const startTime = performance.now();

    const animateScroll = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease in-out cubic
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startScroll + (targetScroll - startScroll) * ease);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    requestAnimationFrame(animateScroll);
  }, [demoTriggerCount]);

  // Handle Reset scroll
  useEffect(() => {
    if (resetCount === 0) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [resetCount]);

  // Main GSAP Animation Setup
  useEffect(() => {
    const handleCheckMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleCheckMobile();
    window.addEventListener('resize', handleCheckMobile);

    const ctx = gsap.context(() => {
      const car = carRef.current;
      const trail = trailRef.current;
      const section = sectionRef.current;
      const textContainer = textContainerRef.current;
      const letters = lettersRef.current.filter(Boolean);

      if (!car || !trail || !section || !textContainer) return;

      const { carWidth, endX } = calculateDimensions();

      // 1. Initial Load Animations
      const initialTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Staggered letter reveal on load
      initialTimeline.fromTo(
        letters,
        { opacity: 0, y: 25 },
        {
          opacity: 0.2,
          y: 0,
          stagger: 0.03,
          duration: 0.8,
        }
      );

      // Entrance animation for metric cards with subtle stagger
      initialTimeline.fromTo(
        '.metric-card',
        { opacity: 0, y: 35, scale: 0.94 },
        {
          opacity: 0.85,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.7,
        },
        '-=0.4'
      );

      // Car starting entrance
      initialTimeline.fromTo(
        car,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6 },
        '-=0.6'
      );

      // 2. Scroll-Driven Core Animation
      const updateLetterIllumination = (carXPos) => {
        if (!textContainer) return;
        const containerRect = textContainer.getBoundingClientRect();

        letters.forEach((letter) => {
          if (!letter) return;
          const letterRect = letter.getBoundingClientRect();
          // Relative position of letter within track
          const letterRelativeLeft = letterRect.left - containerRect.left;

          // Light up letter if car front/mid passes it
          if (carXPos >= letterRelativeLeft + (letterRect.width * 0.2)) {
            letter.style.opacity = '1';
            letter.style.color = '#ffffff';
            letter.style.textShadow = '0 0 16px rgba(69,219,125,0.85), 0 0 30px rgba(222,245,79,0.5)';
            letter.style.transform = 'translateY(-2px) scale(1.04)';
          } else {
            letter.style.opacity = '0.2';
            letter.style.color = '#71717a';
            letter.style.textShadow = 'none';
            letter.style.transform = 'translateY(0) scale(1)';
          }
        });
      };

      // GSAP ScrollTrigger for pinned highway and car progress
      const scrollAnim = gsap.to(car, {
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          pin: trackWrapperRef.current,
          scrub: 0.85, // Silky smooth inertia interpolation
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const currentProgress = self.progress;
            setScrollProgress(currentProgress);
            onProgressUpdate?.(currentProgress);

            // Velocity calculation for HUD and Audio Engine
            const currentVelocity = self.getVelocity();
            setVelocity(currentVelocity);
            soundEngine.updateVelocity(currentVelocity);

            // Car position
            const currentCarX = gsap.getProperty(car, 'x');
            const carCenter = currentCarX + carWidth * 0.45;

            // Update neon trail length
            if (trail) {
              trail.style.width = `${Math.max(currentCarX + 15, 0)}px`;
            }

            // Update letter illumination
            updateLetterIllumination(carCenter);
          },
        },
        x: () => {
          const dims = calculateDimensions();
          return dims.endX;
        },
        ease: 'none',
      });

      // Window resize refresh
      const handleResize = () => {
        calculateDimensions();
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        scrollAnim.kill();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleCheckMobile);
    };
  }, [calculateDimensions, onProgressUpdate]);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative w-full bg-[#090a0f] text-white overflow-hidden"
      style={{ height: '260vh' }} // High scroll travel for smooth scrubbing
    >
      {/* Pinned Viewport Container */}
      <div
        ref={trackWrapperRef}
        className="w-full h-screen sticky top-0 flex flex-col justify-between pt-16 sm:pt-20 pb-6 px-3 sm:px-8 max-w-[1600px] mx-auto overflow-hidden"
      >
        {/* Top Header / Context Info */}
        <div className="w-full flex flex-col items-center text-center mt-2 sm:mt-4 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-[#def54f] mb-2 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#45db7d] animate-ping" />
            <span>INTERACTIVE SCROLL-DRIVEN HIGHWAY</span>
          </div>
          <h1 className="text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase">
            McLaren 720S • Precision Kinetic Showcase
          </h1>
        </div>

        {/* Center: Highway Car Track with Animated Lettering */}
        <div className="w-full my-auto z-10">
          <CarTrack
            carRef={carRef}
            trailRef={trailRef}
            lettersRef={lettersRef}
            textContainerRef={textContainerRef}
            trackRef={trackRef}
          />
        </div>

        {/* Bottom Section: Impact Metric Cards & Telemetry HUD */}
        <div className="w-full flex flex-col items-center gap-4 z-10">
          {/* 4 Impact Statistics Cards */}
          <MetricCards scrollProgress={scrollProgress} isMobile={isMobile} />

          {/* Bottom Bar: Telemetry HUD + Scroll Indicator */}
          <div className="w-full flex items-center justify-between px-2 sm:px-6 pt-2">
            {/* Scroll Direction Prompt */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 animate-bounce">
              <ChevronDown className="w-4 h-4 text-[#def54f]" />
              <span className="hidden sm:inline">
                {scrollProgress < 0.95 ? 'SCROLL DOWN TO ACCELERATE' : 'DESTINATION REACHED • SCROLL FOR INSIGHTS'}
              </span>
              <span className="sm:hidden">
                {scrollProgress < 0.95 ? 'SCROLL DOWN' : 'COMPLETE'}
              </span>
            </div>

            {/* Live Automotive Telemetry HUD */}
            <TelemetryHUD velocity={velocity} scrollProgress={scrollProgress} />
          </div>
        </div>

        {/* Ambient Highway Background Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#45db7d]/5 rounded-full blur-[120px] pointer-events-none z-0" />
      </div>
    </section>
  );
}
