'use client';

import React from 'react';
import {
  X,
  Database,
  ExternalLink,
  ShieldCheck,
  Layers,
  MapPin,
  Cpu,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface DataProvenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DataProvenanceModal({ isOpen, onClose }: DataProvenanceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-150">
      {/* Dark backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="provenance-title"
        className="relative w-full max-w-3xl max-h-[85vh] bg-[#090b10] border border-white/[0.08] rounded-2xl shadow-2xl flex flex-col text-neutral-200 overflow-hidden font-sans z-10"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/[0.06] flex items-start justify-between bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h2
                id="provenance-title"
                className="text-lg font-semibold text-white tracking-tight"
              >
                NASA Planetary Data Provenance
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Scientific Datasets, Altimetric Units & Coordinate Frame Derivation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-sm">
          {/* Scientific Notice Banner */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-neutral-300 leading-relaxed">
              <span className="font-semibold text-white font-mono uppercase tracking-wider block text-[10px]">
                Scientific Integrity Commitment
              </span>
              <p>
                Echoes of Space maintains absolute fidelity to published planetary records.
                All lunar surface imagery, elevation topography, artifact coordinates, and mission
                timelines are derived directly from NASA mission archives. No artificial or procedural
                coordinates are fabricated.
              </p>
            </div>
          </div>

          {/* Dataset 1: Global Color Map */}
          <div className="border border-white/[0.06] rounded-xl p-4 bg-white/[0.01] space-y-2.5">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <h3 className="font-semibold text-white text-sm">
                  1. Global Lunar Color Mosaic (LROC WAC)
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-neutral-400 border border-white/[0.04]">
                NASA SVS 4720
              </span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Global color mosaic assembled from hundreds of thousands of wide-angle camera
              observations by the Lunar Reconnaissance Orbiter (LRO). Hapke-normalized to remove
              solar illumination variations, presenting uniform albedo across maria and highlands.
            </p>

            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono pt-1 border-t border-white/[0.04]">
              <div>
                <dt className="text-[10px] text-neutral-500">Instrument</dt>
                <dd className="text-neutral-300">LROC WAC</dd>
              </div>
              <div>
                <dt className="text-[10px] text-neutral-500">Projection</dt>
                <dd className="text-neutral-300">Equirectangular (0° Center)</dd>
              </div>
              <div>
                <dt className="text-[10px] text-neutral-500">Dataset File</dt>
                <dd className="text-neutral-300">lroc_color_2k.jpg</dd>
              </div>
            </dl>

            <div className="pt-1">
              <a
                href="https://svs.gsfc.nasa.gov/4720/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-mono"
              >
                <span>NASA Scientific Visualization Studio (SVS 4720)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Dataset 2: Global LOLA Elevation Map */}
          <div className="border border-white/[0.06] rounded-xl p-4 bg-white/[0.01] space-y-2.5">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="font-semibold text-white text-sm">
                  2. Lunar Elevation & Topography (NASA LOLA)
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-neutral-400 border border-white/[0.04]">
                PDS Geosciences
              </span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Derived from laser altimeter pulses acquired by the Lunar Orbiter Laser
              Altimeter (LOLA) on LRO. LOLA elevation is referenced to a mean lunar sphere
              radius of 1,737.4 km. Total lunar surface relief spans -9.0 km to +10.7 km (a total variation
              of ~19.7 km, representing ~1.13% of the planetary radius).
            </p>

            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono pt-1 border-t border-white/[0.04]">
              <div>
                <dt className="text-[10px] text-neutral-500">Instrument</dt>
                <dd className="text-neutral-300">LRO LOLA</dd>
              </div>
              <div>
                <dt className="text-[10px] text-neutral-500">Datum Radius</dt>
                <dd className="text-neutral-300">1,737.4 km</dd>
              </div>
              <div>
                <dt className="text-[10px] text-neutral-500">Heightmap</dt>
                <dd className="text-neutral-300">ldem_3_8bit.jpg</dd>
              </div>
            </dl>

            <div className="pt-1">
              <a
                href="https://pds-geosciences.wustl.edu/missions/lro/lola.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-mono"
              >
                <span>NASA PDS Geosciences Node (LOLA Archives)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Dataset 3: Landing Site Coordinates & Geodesy */}
          <div className="border border-white/[0.06] rounded-xl p-4 bg-white/[0.01] space-y-2.5">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <h3 className="font-semibold text-white text-sm">
                  3. Sub-Meter Landing Site Geodesy (LROC NAC)
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-neutral-400 border border-white/[0.04]">
                LROC / ASU
              </span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Artifact and landing site coordinates are sourced from the Arizona State
              University / NASA Goddard LROC featured site catalog. Positions were
              determined via multi-orbit Narrow Angle Camera (NAC) stereo photogrammetry
              (resolutions 0.35–0.50 m/pixel) tied to the LOLA global geodetic frame.
            </p>

            <div className="space-y-1 pt-1 border-t border-white/[0.04] text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Apollo 11 Eagle Descent Stage: 0.67408° N, 23.47297° E (Frame M175124905LR)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Surveyor 3 / Apollo 12 Intrepid: 3.0163° S, 23.4180° W (Frame M104662862R)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Apollo 17 Challenger Descent Stage: 20.1908° N, 30.77168° E (Frame M168000580LR)</span>
              </div>
            </div>

            <div className="pt-1">
              <a
                href="https://www.lroc.asu.edu/featured_sites"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-mono"
              >
                <span>NASA LROC Featured Landing Sites Archive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Dataset 4: Spacecraft Master Records */}
          <div className="border border-white/[0.06] rounded-xl p-4 bg-white/[0.01] space-y-2.5">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <h3 className="font-semibold text-white text-sm">
                  4. Spacecraft Master Catalog (NSSDC / NSSDCA)
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-neutral-400 border border-white/[0.04]">
                NASA GSFC
              </span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Spacecraft engineering metrics, masses, manufacturers, launch/touchdown timestamps,
              and official mission IDs are cross-referenced with the NASA Space Science Data
              Coordinated Archive (NSSDCA) at Goddard Space Flight Center.
            </p>

            <div className="pt-1">
              <a
                href="https://nssdc.gsfc.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-mono"
              >
                <span>NASA Space Science Data Coordinated Archive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* NASA Attribution & Disclaimer */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1 text-xs text-neutral-400">
            <span className="font-semibold text-neutral-300 block font-mono text-[10px] uppercase tracking-wider">
              Legal Attribution & Disclaimer
            </span>
            <p className="leading-relaxed">
              Echoes of Space is an independent educational platform developed with open planetary data
              provided by NASA, the Lunar Reconnaissance Orbiter Camera team at Arizona State University,
              and the LOLA science team at NASA Goddard Space Flight Center. This platform is not officially
              affiliated with or endorsed by NASA or the United States Government.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.06] flex items-center justify-between bg-white/[0.01] text-xs font-mono text-neutral-500">
          <span>Echoes of Space &bull; Open Scientific Heritage</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-neutral-200 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
