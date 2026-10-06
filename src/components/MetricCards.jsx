import React from 'react';
import { TrendingUp, PhoneCall, ArrowUpRight, Zap, ShieldCheck } from 'lucide-react';

export const METRICS = [
  {
    id: 'box1',
    value: '58%',
    label: 'Increase in pick up point use',
    detail: 'Automated locker throughput',
    bg: '#def54f',
    textColor: '#111111',
    badge: 'LOGISTICS',
    icon: TrendingUp,
    activeThreshold: [0.15, 0.40],
  },
  {
    id: 'box2',
    value: '23%',
    label: 'Decreased in customer phone calls',
    detail: 'Self-service tracking flow',
    bg: '#6ac9ff',
    textColor: '#111111',
    badge: 'SUPPORT',
    icon: PhoneCall,
    activeThreshold: [0.35, 0.60],
  },
  {
    id: 'box3',
    value: '27%',
    label: 'Increase in pick up point use',
    detail: 'Repeat order collection rate',
    bg: '#232634',
    textColor: '#ffffff',
    border: 'border-white/20',
    badge: 'VELOCITY',
    icon: ArrowUpRight,
    activeThreshold: [0.55, 0.80],
  },
  {
    id: 'box4',
    value: '40%',
    label: 'Decreased in customer phone calls',
    detail: 'First-contact inquiry reduction',
    bg: '#fa7328',
    textColor: '#111111',
    badge: 'RESOLUTION',
    icon: ShieldCheck,
    activeThreshold: [0.75, 0.98],
  },
];

export default function MetricCards({ scrollProgress, isMobile }) {
  return (
    <div className="w-full pointer-events-none select-none">
      {/* Responsive Layout: On desktop, cards float in quadrants around the road; on mobile, a neat 2x2 grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto px-4 sm:px-6">
        {METRICS.map((metric, idx) => {
          const [start, end] = metric.activeThreshold;
          const isActive = scrollProgress >= start && scrollProgress <= end;
          const isPassed = scrollProgress > end;
          const Icon = metric.icon;

          return (
            <div
              key={metric.id}
              id={metric.id}
              className={`metric-card pointer-events-auto rounded-2xl p-4 sm:p-5 transition-all duration-300 transform shadow-xl ${
                metric.border ? metric.border : ''
              } ${
                isActive
                  ? 'scale-105 ring-2 ring-white/40 shadow-2xl z-20 opacity-100'
                  : isPassed
                  ? 'opacity-85 scale-100'
                  : 'opacity-70 scale-98'
              }`}
              style={{
                backgroundColor: metric.bg,
                color: metric.textColor,
                boxShadow: isActive
                  ? `0 20px 40px -15px ${metric.bg}66, 0 0 25px ${metric.bg}44`
                  : '0 10px 25px -10px rgba(0,0,0,0.5)',
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: metric.textColor === '#ffffff' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
                    color: metric.textColor,
                  }}
                >
                  {metric.badge}
                </span>
                <Icon className="w-4 h-4 opacity-75" />
              </div>

              {/* Percentage Stat */}
              <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none mb-1 font-sans">
                {metric.value}
              </div>

              {/* Description */}
              <div
                className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2"
                style={{
                  color: metric.textColor === '#ffffff' ? '#e2e8f0' : '#18181b',
                }}
              >
                {metric.label}
              </div>

              {/* Micro Subtext */}
              <div
                className="text-[11px] font-medium mt-2 pt-2 border-t flex items-center justify-between"
                style={{
                  borderColor: metric.textColor === '#ffffff' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                  opacity: 0.8,
                }}
              >
                <span>{metric.detail}</span>
                <span className="text-[10px] font-mono">
                  {isActive ? '● ACTIVE' : '○ STAGE ' + (idx + 1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
