'use client';

import React, { useState } from 'react';
import { AppHeader } from '@/components/layout/AppHeader';
import { ExploreSidebar } from '@/components/layout/ExploreSidebar';
import { GlobeLoader } from '@/components/globe/GlobeLoader';
import { ArtifactPanel } from '@/components/artifacts/ArtifactPanel';
import { DataProvenanceModal } from '@/components/ui/DataProvenanceModal';

export default function ExploreMoonPage() {
  const [provenanceOpen, setProvenanceOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#05070c] text-neutral-100 select-none">
      {/* Top Navigation & Telemetry Header */}
      <AppHeader onOpenProvenance={() => setProvenanceOpen(true)} />

      {/* Main Exploration Viewport */}
      <div className="relative flex-1 w-full h-[calc(100vh-3.5rem)] overflow-hidden">
        {/* 3D WebGL Moon Globe (Dominates the screen) */}
        <main className="absolute inset-0 w-full h-full">
          <GlobeLoader onOpenProvenance={() => setProvenanceOpen(true)} />
        </main>

        {/* Collapsible Left Artifact Catalog Sidebar */}
        <ExploreSidebar onOpenProvenance={() => setProvenanceOpen(true)} />

        {/* Slide-out Right Artifact Details Drawer */}
        <ArtifactPanel onOpenProvenance={() => setProvenanceOpen(true)} />
      </div>

      {/* NASA Data Integrity & Provenance Modal */}
      <DataProvenanceModal
        isOpen={provenanceOpen}
        onClose={() => setProvenanceOpen(false)}
      />
    </div>
  );
}
