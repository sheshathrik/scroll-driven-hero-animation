# 🏎️ Scroll-Driven Hero Section Animation

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-45db7d?style=for-the-badge&logo=github)](https://sheshathrik.github.io/scroll-driven-hero-animation/)
[![GitHub Repo](https://img.shields.io/badge/Source_Code-GitHub-white?style=for-the-badge&logo=github)](https://github.com/sheshathrik/scroll-driven-hero-animation)
[![Tech Stack](https://img.shields.io/badge/React_18-GSAP_ScrollTrigger-def54f?style=for-the-badge&logo=react)](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

An elevated, fully-responsive recreation of the **McLaren 720S scroll-driven hero section animation**, inspired by the reference project at [paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation).

---

## 🌟 Live Links

- **🌐 Live Webpage**: [https://sheshathrik.github.io/scroll-driven-hero-animation/](https://sheshathrik.github.io/scroll-driven-hero-animation/)
- **📦 GitHub Repository**: [https://github.com/sheshathrik/scroll-driven-hero-animation](https://github.com/sheshathrik/scroll-driven-hero-animation)
- **🔗 Reference Project**: [https://paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)

---

## 🎯 Assignment Functional Requirements & Implementation

| Requirement | Description | Status |
| :--- | :--- | :---: |
| **1. Hero Section Layout** | Occupies first screen (`100vh` sticky track above the fold). Displays letter-spaced headline `W E L C O M E   I T Z   F I Z Z`. Impact metric cards positioned with clear visual hierarchy. | ✅ Complete |
| **2. Initial Load Animation** | Headline reveals with smooth staggered upward drift (`gsap.from`). Statistics cards animate in sequentially with subtle bounce delay. Supercar fades in smoothly at the starting gate. | ✅ Complete |
| **3. Scroll-Based Animation** | Pinned viewport responding strictly to page scroll progress (not autoplay). McLaren supercar glides across the highway track with realistic kinetic inertia (`scrub: 0.85`). Neon green cyber-trail tracks car position. Letters illuminate dynamically as the car drives past them. | ✅ Complete |
| **4. Motion & Performance** | Compositor-driven GPU transforms (`translate3d`, `scaleX`, `opacity`). Zero layout thrashing or scroll reflows. 60+ FPS performance. | ✅ Complete |
| **5. Full Responsiveness** | Fluid `clamp()` typography, proportional road & car scaling, and dynamic geometry recalculation on resize/orientation switch. Tested across Mobile, Tablet, and Desktop. | ✅ Complete |
| **6. Tech Stack** | HTML5, CSS3, JavaScript ES6+, GSAP ScrollTrigger, React 18, Tailwind CSS v4, Vite, and Web Audio API. | ✅ Complete |

---

## 🚀 Key Improvements Over the Original Reference

| Feature | Original Reference | Our Implementation |
| :--- | :--- | :--- |
| **Mobile Responsiveness** | Fixed `8rem` font, hardcoded pixel offsets, broken layout on mobile/tablet | Fully responsive fluid clamp typography, dynamic card grid, automatic resize observer |
| **Initial Load Motion** | Instant element pop-in without transition | Staggered letter reveal (`stagger: 0.03s`) & delayed spring card entrance |
| **Letter Illumination** | Binary abrupt opacity toggle | Smooth illuminated glow aura (`text-shadow`), upward lift, and neon gradient beam |
| **Telemetry & HUD** | None | Real-time automotive speedometer (0–212 MPH), gear selector, throttle bar, and distance meter |
| **Acoustics** | None | Procedural Web Audio API synthesizer syncing V8 engine harmonics with scroll velocity |
| **Controls** | Manual scroll only | Automated Demo Tour mode, instant reset button, and sound toggle |

---

## 🛠️ Technology Stack

- **Core Framework**: React 18
- **Animation Engine**: GSAP (GreenSock Animation Platform) + ScrollTrigger Plugin
- **Styling**: Tailwind CSS v4 & Modern CSS Hardware Transforms
- **Icons**: Lucide Icons
- **Audio**: Web Audio API (Dual-Oscillator Synthesizer)
- **Bundler & Tooling**: Vite 8 & PostCSS
- **Deployment**: GitHub Pages & GitHub Actions CI/CD

---

## 📁 Project Structure

```bash
scroll-driven-hero-animation/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Actions deployment to Pages
├── public/
│   ├── car.png                 # McLaren 720S high-res top view asset
│   └── McLaren 720S 2022 top view.png
├── src/
│   ├── assets/
│   │   └── car.png
│   ├── components/
│   │   ├── Navbar.jsx          # Glassmorphism navbar with live progress & sound toggle
│   │   ├── HeroSection.jsx     # Pinned scroll track, GSAP context & resize observer
│   │   ├── CarTrack.jsx        # Highway road, car element, neon trail & text illumination
│   │   ├── MetricCards.jsx     # 4 impact statistics cards with scroll-stage highlights
│   │   ├── TelemetryHUD.jsx    # Real-time speedometer, gear & throttle gauges
│   │   ├── AudioEngine.js      # Procedural Web Audio API engine synthesizer
│   │   ├── TechnicalSpecs.jsx  # Architecture breakdown & comparative analysis
│   │   └── Footer.jsx          # Credits, metadata & repo links
│   ├── App.jsx                 # App root coordinator
│   ├── main.jsx                # React 18 entrypoint
│   └── index.css               # Tailwind CSS v4 & custom theme utilities
├── index.html                  # HTML5 entrypoint with preload hints
├── vite.config.js              # Vite configuration with relative base
├── package.json
└── README.md
```

---

## 💻 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sheshathrik/scroll-driven-hero-animation.git
   cd scroll-driven-hero-animation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 🏎️ Interaction Guide

- **Scroll Down / Drag Trackpad**: Accelerates the McLaren 720S along the highway, extends the neon cyber trail, illuminates each headline letter, activates impact metric cards, and increases speedometer velocity.
- **V8 Engine Sound Button**: Toggle sound on/off in the top navbar to hear procedural engine acceleration matched to scroll speed.
- **Demo Run**: Click `DEMO RUN` in the navbar for an automated cinematic scroll demonstration.
- **Reset**: Click the reset icon to return to the starting gate.

---

## 👤 Author

- **Developer**: Sheshathri K ([@sheshathrik](https://github.com/sheshathrik))
- **Email**: sheshathrik01@gmail.com
- **Assignment**: Scroll-Driven Hero Section Animation

