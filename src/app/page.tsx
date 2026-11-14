import Link from 'next/link';
import { HeroMoon } from '@/components/home/HeroMoon';
import { FeatureSection } from '@/components/home/FeatureSection';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Radio,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const metadata = {
  title: 'Echoes of Space — Discover the Machines That Made Space History',
  description:
    'A scientifically grounded interactive 3D educational atlas tracking historic NASA equipment, lunar landers, and scientific experiments on the Moon.',
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#06080e] text-neutral-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      {/* Deep Space Starfield & Ambient Glow Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle radial space nebular glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(245,158,11,0.08),rgba(6,8,14,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_110%,rgba(30,58,138,0.1),rgba(6,8,14,0))]" />

        {/* Ambient CSS Stars */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 25px 35px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 75px 120px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 160px 45px, rgba(245,158,11,0.9), rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 220px 180px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.2px 1.2px at 310px 90px, rgba(255,255,255,0.7), rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 390px 240px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 470px 130px, rgba(245,158,11,0.8), rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 560px 310px, rgba(255,255,255,0.6), rgba(0,0,0,0))`,
            backgroundSize: '600px 400px',
          }}
        />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-20 max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-neutral-900 border border-amber-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:scale-105 transition-transform">
            <Globe2 className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-white text-base group-hover:text-amber-300 transition-colors">
              Echoes of Space
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono text-neutral-400 ml-2 uppercase tracking-wider">
              3D Lunar Atlas
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/explore/moon"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-xs font-mono text-neutral-200 hover:text-white border border-neutral-800 hover:border-amber-500/40 shadow-sm transition-all"
          >
            <span>Enter Atlas</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto w-full px-6 pt-10 pb-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NASA HISTORIC EXPLORATION ARCHIVE</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight uppercase font-sans">
              ECHOES OF SPACE
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-2xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
              Discover the machines that made space history
            </p>

            {/* Concise Educational Introduction */}
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Across the silent regolith of the Moon rest the descent stages,
              roving vehicles, and scientific stations of humanity’s historic lunar missions.
              Though inactive for over fifty years, this equipment is far from abandoned debris — each
              resting machine still tells the living story of humanity’s boldest journey into the unknown.
            </p>

            {/* Prominent CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/explore/moon"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-base transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.45)] hover:-translate-y-0.5 group"
              >
                <span>Explore the Moon</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Telemetry Stats Strip */}
            <div className="pt-4 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  <span>Sites</span>
                </div>
                <p className="text-base sm:text-lg font-bold font-mono text-white mt-0.5">
                  12 Catalogued
                </p>
                <p className="text-[10px] text-neutral-500 font-mono">
                  LROC Geodesy
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase">
                  <Radio className="w-3 h-3 text-emerald-400" />
                  <span>Active</span>
                </div>
                <p className="text-base sm:text-lg font-bold font-mono text-emerald-400 mt-0.5">
                  LRRR Units
                </p>
                <p className="text-[10px] text-neutral-500 font-mono">
                  Laser Ranging
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase">
                  <Layers className="w-3 h-3 text-cyan-400" />
                  <span>Datum</span>
                </div>
                <p className="text-base sm:text-lg font-bold font-mono text-white mt-0.5">
                  1,737.4 km
                </p>
                <p className="text-[10px] text-neutral-500 font-mono">
                  LOLA Reference
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Large Realistic Moon Visual */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroMoon />
          </div>
        </div>
      </main>

      {/* Feature Sections */}
      <FeatureSection />

      {/* Educational Legacy Callout Banner */}
      <section className="relative z-10 max-w-6xl mx-auto w-full px-6 py-12">
        <div className="rounded-2xl bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-neutral-900/90 border border-neutral-800/80 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 inline-block mb-1">
              Scientific Heritage & Ethics
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Preserving Extraterrestrial Heritage
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              International space heritage guidelines recognize Tranquility Base and Apollo landing sites
              as irreplaceable archaeological resources. Echoes of Space documents each site with verified
              geodetic coordinates to promote public education and scientific stewardship.
            </p>
          </div>

          <Link
            href="/explore/moon"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white border border-neutral-700 hover:border-amber-500/50 transition-all shadow-md group"
          >
            <span>Launch Exploration</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl mx-auto w-full px-6 py-10 border-t border-neutral-900 space-y-4 text-xs font-mono text-neutral-400">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-500/80" />
            <span className="font-semibold text-neutral-200">Echoes of Space &bull; NASA Planetary Data Atlas</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-neutral-400 flex-wrap">
            <a
              href="https://svs.gsfc.nasa.gov/4720/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors inline-flex items-center gap-1"
            >
              <span>NASA SVS 4720</span>
              <ExternalLink className="w-3 h-3 text-neutral-500" />
            </a>
            <span>&bull;</span>
            <a
              href="https://pds-geosciences.wustl.edu/missions/lro/lola.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors inline-flex items-center gap-1"
            >
              <span>LOLA Altimetry</span>
              <ExternalLink className="w-3 h-3 text-neutral-500" />
            </a>
            <span>&bull;</span>
            <a
              href="https://www.lroc.asu.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors inline-flex items-center gap-1"
            >
              <span>LROC ASU</span>
              <ExternalLink className="w-3 h-3 text-neutral-500" />
            </a>
          </div>
        </div>

        <p className="text-[11px] text-neutral-400 leading-relaxed border-t border-neutral-900/80 pt-3">
          Disclaimer: Echoes of Space is an independent educational and cultural exploration platform developed with open scientific data from NASA, the Lunar Reconnaissance Orbiter Camera team at Arizona State University, and the LOLA science team at NASA Goddard Space Flight Center. This platform is not officially affiliated with or endorsed by NASA.
        </p>
      </footer>
    </div>
  );
}
