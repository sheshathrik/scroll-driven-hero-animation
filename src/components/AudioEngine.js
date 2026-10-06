// Web Audio API Synthesizer for Supercar Engine & Scroll Acoustics

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.engineOsc = null;
    this.subOsc = null;
    this.filter = null;
    this.masterGain = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Lowpass Filter for engine growl
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(280, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(3, this.ctx.currentTime);
      this.filter.connect(this.masterGain);

      // Primary Engine Oscillator (Sawtooth)
      this.engineOsc = this.ctx.createOscillator();
      this.engineOsc.type = 'sawtooth';
      this.engineOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A

      // Sub Bass Oscillator (Sine)
      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'triangle';
      this.subOsc.frequency.setValueAtTime(27.5, this.ctx.currentTime);

      this.engineOsc.connect(this.filter);
      this.subOsc.connect(this.filter);

      this.engineOsc.start();
      this.subOsc.start();
      this.isInitialized = true;
    } catch (e) {
      console.warn('AudioContext initialization deferred:', e);
    }
  }

  toggleMute() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;

    if (!this.masterGain || !this.ctx) return this.isMuted;

    if (this.isMuted) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
    } else {
      this.masterGain.gain.setTargetAtTime(0.08, this.ctx.currentTime, 0.1);
    }
    return this.isMuted;
  }

  updateVelocity(velocity) {
    if (this.isMuted || !this.isInitialized || !this.ctx) return;

    const absVelocity = Math.min(Math.abs(velocity) / 800, 1.5);
    const targetFreq = 55 + absVelocity * 140; // 55Hz to 265Hz
    const targetFilter = 280 + absVelocity * 900;
    const targetVolume = Math.min(0.06 + absVelocity * 0.12, 0.18);

    const time = this.ctx.currentTime;
    this.engineOsc.frequency.setTargetAtTime(targetFreq, time, 0.08);
    this.subOsc.frequency.setTargetAtTime(targetFreq / 2, time, 0.08);
    this.filter.frequency.setTargetAtTime(targetFilter, time, 0.08);
    this.masterGain.gain.setTargetAtTime(targetVolume, time, 0.08);
  }
}

export const soundEngine = new AudioEngine();

