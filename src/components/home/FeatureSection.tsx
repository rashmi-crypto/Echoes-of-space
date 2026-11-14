import React from 'react';
import Link from 'next/link';
import {
  Globe2,
  Cpu,
  Atom,
  ArrowRight,
  Compass,
  CheckCircle2,
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  highlights: string[];
  actionLabel?: string;
  actionHref?: string;
}

function FeatureCard({
  icon,
  tag,
  title,
  description,
  highlights,
  actionLabel,
  actionHref,
}: FeatureCardProps) {
  return (
    <div className="relative rounded-2xl bg-neutral-900/50 border border-neutral-800/80 p-6 sm:p-8 flex flex-col justify-between hover:border-amber-500/40 hover:bg-neutral-900/70 transition-all duration-300 group shadow-lg">
      <div className="space-y-4">
        {/* Header Icon & Tag */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-amber-400 group-hover:text-amber-300 group-hover:border-amber-500/40 group-hover:scale-105 transition-all">
            {icon}
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/90 font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            {tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-100 transition-colors">
          {title}
        </h3>

        {/* Narrative Description */}
        <p className="text-sm text-neutral-400 leading-relaxed">
          {description}
        </p>

        {/* Key Educational Highlights */}
        <div className="pt-2 space-y-2 border-t border-neutral-800/60">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400/80 mt-0.5 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      {actionLabel && actionHref && (
        <div className="pt-6 mt-6 border-t border-neutral-800/60">
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-amber-400 hover:text-amber-300 group/link transition-colors"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
}

export function FeatureSection() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto w-full px-6 py-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-400">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>The Echoes of Space Framework</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          Three Pillars of Lunar Discovery
        </h2>
        <p className="text-sm text-neutral-400">
          A scientifically grounded architecture designed to preserve the heritage
          of extraterrestrial exploration through 3D geodesy, authentic engineering data, and physics.
        </p>
      </div>

      {/* 3 Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* 1. Explore the Moon */}
        <FeatureCard
          icon={<Globe2 className="w-6 h-6" />}
          tag="Geodetic 3D Atlas"
          title="Explore the Moon"
          description="Orbit a true-scale 3D lunar sphere projected with verified topological maria, impact basins, and day-night solar terminator shadowing. Navigate with real orbital controls and toggle geodetic coordinate grids."
          highlights={[
            '1,737.4 km mean lunar radius projection',
            'Sub-meter LROC Narrow Angle Camera coordinates',
            'Nearside maria & highland impact basins',
          ]}
          actionLabel="Launch 3D Explorer"
          actionHref="/explore/moon"
        />

        {/* 2. Meet the Machines */}
        <FeatureCard
          icon={<Cpu className="w-6 h-6" />}
          tag="NASA Hardware Archive"
          title="Meet the Machines"
          description="Inspect the Apollo Lunar Module descent stages that carried twelve astronauts to the surface, the Lunar Roving Vehicles that expanded surface field mobility, and early robotic scouts like Surveyor 3."
          highlights={[
            'Apollo 11, 12, 14, 15, 16, and 17 LM descent stages',
            'LRV-1 and LRV-3 electric rovers',
            'Surveyor 3 robotic lander visited by Apollo 12',
          ]}
          actionLabel="View Equipment Catalog"
          actionHref="/explore/moon"
        />

        {/* 3. Discover Their Science */}
        <FeatureCard
          icon={<Atom className="w-6 h-6" />}
          tag="Living Scientific Legacies"
          title="Discover Their Science"
          description="Understand why these resting artifacts remain scientifically active. Learn how corner-cube laser retroreflectors still reflect laser pulses from Earth today to measure the Moon's 3.8 cm/year orbital drift."
          highlights={[
            'Laser Ranging Retroreflector (LRRR) experiments',
            'ALSEP passive seismometers & core heat probes',
            'Long-duration space weathering on materials',
          ]}
          actionLabel="Read Science Records"
          actionHref="/explore/moon"
        />
      </div>
    </section>
  );
}
