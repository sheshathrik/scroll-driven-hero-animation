import React, { memo } from 'react';
import { TrendingUp, PhoneCall, ArrowUpRight, ShieldCheck } from 'lucide-react';

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

const MetricCards = memo(function MetricCards({ scrollProgress, isMobile }) {
  return (
    <div className="w-full pointer-events-none select-none">
      {/* Responsive Grid: compact on mobile, spacious on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5 max-w-7xl mx-auto px-2 sm:px-6">
        {METRICS.map((metric, idx) => {
          const [start, end] = metric.activeThreshold;
          const isActive = scrollProgress >= start && scrollProgress <= end;
          const isPassed = scrollProgress > end;
          const Icon = metric.icon;

          return (
            <div
              key={metric.id}
              id={metric.id}
              className={`metric-card pointer-events-auto rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 lg:p-4 transition-all duration-300 transform shadow-md ${
                metric.border ? metric.border : ''
              } ${
                isActive
                  ? 'scale-[1.02] sm:scale-105 ring-2 ring-white/40 shadow-xl z-20 opacity-100'
                  : isPassed
                  ? 'opacity-85 scale-100'
                  : 'opacity-70 scale-[0.99]'
              }`}
              style={{
                backgroundColor: metric.bg,
                color: metric.textColor,
                boxShadow: isActive
                  ? `0 12px 28px -10px ${metric.bg}66, 0 0 18px ${metric.bg}44`
                  : '0 4px 12px -4px rgba(0,0,0,0.4)',
              }}
            >
              {/* Card Header: Badge & Icon */}
              <div className="flex items-center justify-between gap-1 mb-1 sm:mb-1.5">
                <span
                  className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase px-1.5 sm:px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: metric.textColor === '#ffffff' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
                    color: metric.textColor,
                  }}
                >
                  {metric.badge}
                </span>
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-75" />
              </div>

              {/* Percentage Stat */}
              <div className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none mb-0.5 sm:mb-1 font-sans">
                {metric.value}
              </div>

              {/* Description */}
              <div
                className="text-[10px] sm:text-xs font-semibold leading-tight line-clamp-2"
                style={{
                  color: metric.textColor === '#ffffff' ? '#e2e8f0' : '#18181b',
                }}
              >
                {metric.label}
              </div>

              {/* Micro Subtext - hidden on small mobile to prevent vertical overflow */}
              <div
                className="hidden sm:flex text-[10px] font-medium mt-1.5 pt-1.5 border-t items-center justify-between"
                style={{
                  borderColor: metric.textColor === '#ffffff' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                  opacity: 0.8,
                }}
              >
                <span className="truncate pr-1">{metric.detail}</span>
                <span className="text-[9px] font-mono shrink-0">
                  {isActive ? '● ACTIVE' : '○ S' + (idx + 1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default MetricCards;
