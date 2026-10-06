import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TechnicalSpecs from './components/TechnicalSpecs';
import Footer from './components/Footer';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [demoTriggerCount, setDemoTriggerCount] = useState(0);
  const [resetCount, setResetCount] = useState(0);

  const handleTriggerDemo = () => {
    setDemoTriggerCount((prev) => prev + 1);
  };

  const handleResetScroll = () => {
    setResetCount((prev) => prev + 1);
    setScrollProgress(0);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-white flex flex-col selection:bg-[#45db7d] selection:text-black">
      {/* Floating Modern Navbar */}
      <Navbar
        scrollProgress={scrollProgress}
        onTriggerDemo={handleTriggerDemo}
        onResetScroll={handleResetScroll}
      />

      {/* Main Hero Section with Pinned Car Track & Metric Cards */}
      <main className="flex-1 w-full">
        <HeroSection
          onProgressUpdate={setScrollProgress}
          demoTriggerCount={demoTriggerCount}
          resetCount={resetCount}
        />

        {/* Technical Architecture & Specs Section */}
        <TechnicalSpecs />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
