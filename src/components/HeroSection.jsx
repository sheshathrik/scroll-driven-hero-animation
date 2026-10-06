import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CarTrack from './CarTrack';
import MetricCards from './MetricCards';
import TelemetryHUD from './TelemetryHUD';
import { soundEngine } from './AudioEngine';
import { ChevronDown } from 'lucide-react';

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

  // Cached letter offsets relative to text container (computed on mount and resize)
  const letterOffsetsRef = useRef([]);
  const dimensionsRef = useRef({ roadWidth: 0, carWidth: 140, endX: 1000 });

  // Measure and cache dimensions and letter positions
  const updateMetrics = useCallback(() => {
    if (!trackRef.current || !carRef.current) return;

    const roadWidth = trackRef.current.clientWidth || window.innerWidth;
    const isSmall = window.innerWidth < 640;
    const isMedium = window.innerWidth >= 640 && window.innerWidth < 1024;
    
    // Proportional car scaling to guarantee it fits the road on any screen width
    const carWidth = isSmall 
      ? Math.min(Math.max(window.innerWidth * 0.22, 75), 105) 
      : isMedium ? 125 : 155;

    carRef.current.style.width = `${carWidth}px`;
    const endX = Math.max(roadWidth - carWidth - (isSmall ? 8 : 16), 30);

    dimensionsRef.current = { roadWidth, carWidth, endX };

    // Cache relative letter X positions once to prevent getBoundingClientRect() layout thrashing on scroll
    if (textContainerRef.current) {
      const containerRect = textContainerRef.current.getBoundingClientRect();
      const letters = lettersRef.current.filter(Boolean);

      letterOffsetsRef.current = letters.map((letter) => {
        const letterRect = letter.getBoundingClientRect();
        return letterRect.left - containerRect.left + (letterRect.width * 0.2);
      });
    }
  }, []);

  // Handle auto-scroll demo run
  useEffect(() => {
    if (demoTriggerCount === 0 || !sectionRef.current) return;
    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;

    const startScroll = window.scrollY;
    const targetScroll = sectionTop + sectionHeight;
    const duration = 3800;
    const startTime = performance.now();

    const animateScroll = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
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
      const letters = lettersRef.current.filter(Boolean);

      if (!car || !trail || !section) return;

      // Ensure dimensions and letter hitboxes are measured
      updateMetrics();

      // 1. Initial Load Animations (staggered reveal)
      const initialTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      initialTimeline.fromTo(
        letters,
        { opacity: 0, y: 15 },
        {
          opacity: 0.2,
          y: 0,
          stagger: 0.025,
          duration: 0.7,
        }
      );

      initialTimeline.fromTo(
        '.metric-card',
        { opacity: 0, y: 25, scale: 0.95 },
        {
          opacity: 0.85,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.6,
        },
        '-=0.3'
      );

      // ONLY fade-in car opacity on initial load. Do NOT animate x to prevent conflicts with ScrollTrigger!
      initialTimeline.fromTo(
        car,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.4'
      );

      // Set initial car position explicitly to 0
      gsap.set(car, { x: 0 });
      if (trail) trail.style.width = '0px';

      // 2. Scroll-Driven Core Animation
      let lastProgressUpdate = 0;

      const scrollAnim = gsap.to(car, {
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          pin: trackWrapperRef.current,
          scrub: 0.55, // Fast, responsive inertia that tracks forward & backward accurately
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const currentProgress = self.progress;

            // Direct high-performance DOM updates (zero layout thrashing)
            const currentCarX = gsap.getProperty(car, 'x');
            const carWidth = dimensionsRef.current.carWidth;
            const carCenter = currentCarX + carWidth * 0.45;

            // Update trail width strictly behind the car
            if (trail) {
              if (currentProgress <= 0.001) {
                trail.style.width = '0px';
              } else {
                trail.style.width = `${Math.max(currentCarX + carWidth * 0.3, 0)}px`;
              }
            }

            // Update letter illumination using cached offsets (zero getBoundingClientRect calls!)
            const offsets = letterOffsetsRef.current;
            for (let i = 0; i < letters.length; i++) {
              const letter = letters[i];
              if (!letter) continue;
              const letterX = offsets[i] || 0;

              if (carCenter >= letterX) {
                letter.style.opacity = '1';
                letter.style.color = '#ffffff';
                letter.style.textShadow = '0 0 16px rgba(69,219,125,0.85), 0 0 30px rgba(222,245,79,0.5)';
              } else {
                letter.style.opacity = '0.2';
                letter.style.color = '#71717a';
                letter.style.textShadow = 'none';
              }
            }

            // Audio engine velocity update
            const currentVelocity = self.getVelocity();
            soundEngine.updateVelocity(currentVelocity);

            // Throttle React state updates so React doesn't re-render 60 times/sec while scrolling
            if (Math.abs(currentProgress - lastProgressUpdate) > 0.015 || currentProgress === 0 || currentProgress === 1) {
              lastProgressUpdate = currentProgress;
              setScrollProgress(currentProgress);
              setVelocity(currentVelocity);
              onProgressUpdate?.(currentProgress);
            }
          },
        },
        x: () => dimensionsRef.current.endX,
        ease: 'none',
      });

      // Window resize refresh listener
      const handleResize = () => {
        updateMetrics();
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
  }, [updateMetrics, onProgressUpdate]);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative w-full bg-[#090a0f] text-white overflow-hidden"
      style={{ height: '250vh' }}
    >
      {/* Pinned Viewport Container - 100dvh avoids clipping on mobile and small windows */}
      <div
        ref={trackWrapperRef}
        className="w-full h-[100dvh] max-h-[100dvh] sticky top-0 flex flex-col justify-between pt-14 sm:pt-16 pb-2 sm:pb-3 px-2 sm:px-6 max-w-[1600px] mx-auto overflow-hidden"
      >
        {/* Top Header / Context Info */}
        <div className="w-full flex flex-col items-center text-center mt-1 sm:mt-2 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-[#def54f] mb-1 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-[#45db7d] animate-ping" />
            <span>INTERACTIVE SCROLL-DRIVEN HIGHWAY</span>
          </div>
          <h1 className="text-[10px] sm:text-xs font-mono tracking-widest text-zinc-400 uppercase">
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
        <div className="w-full flex flex-col items-center gap-1.5 sm:gap-2.5 z-10">
          {/* 4 Impact Statistics Cards */}
          <MetricCards scrollProgress={scrollProgress} isMobile={isMobile} />

          {/* Bottom Bar: Telemetry HUD + Scroll Indicator */}
          <div className="w-full flex items-center justify-between px-2 sm:px-4 pt-1">
            {/* Scroll Direction Prompt */}
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-zinc-400">
              <ChevronDown className="w-3.5 h-3.5 text-[#def54f] animate-bounce" />
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#45db7d]/5 rounded-full blur-[100px] pointer-events-none z-0" />
      </div>
    </section>
  );
}
