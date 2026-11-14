import { create } from 'zustand';
import { ArtifactCategory, OperationalStatus } from '@/types/artifact';

export interface VisibleLayers {
  markers: boolean;
  labels: boolean;
  grid: boolean;
  sunlight: boolean;
  atmosphereGlow: boolean;
}

interface ExplorerState {
  // Selection
  selectedArtifactId: string | null;
  hoveredArtifactId: string | null;

  // Filters & Search
  searchQuery: string;
  selectedCategory: ArtifactCategory | 'all';
  selectedMission: string | 'all';
  selectedStatus: OperationalStatus | 'all';

  // Visible Map Layers
  visibleLayers: VisibleLayers;

  // UI Panels
  sidebarOpen: boolean;
  panelOpen: boolean;

  // 3D Camera Controls
  cameraTarget: [number, number, number] | null;
  cameraDistance: number;

  // 3D Terrain & Geodesy Controls
  displacementScale: number;
  elevationExaggeration: number;
  textureLongitudeOffset: number; // Degrees offset [-180 to 180] for prime meridian alignment

  // Actions
  selectArtifact: (id: string | null) => void;
  setHoveredArtifact: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: ArtifactCategory | 'all') => void;
  setSelectedMission: (mission: string | 'all') => void;
  setSelectedStatus: (status: OperationalStatus | 'all') => void;
  toggleLayer: (layer: keyof VisibleLayers) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setPanelOpen: (open: boolean) => void;
  setCameraTarget: (target: [number, number, number] | null, distance?: number) => void;
  setDisplacementScale: (scale: number) => void;
  setElevationExaggeration: (exaggeration: number) => void;
  setTextureLongitudeOffset: (offset: number) => void;
  resetCamera: () => void;
  resetFilters: () => void;
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  selectedArtifactId: null,
  hoveredArtifactId: null,

  searchQuery: '',
  selectedCategory: 'all',
  selectedMission: 'all',
  selectedStatus: 'all',

  visibleLayers: {
    markers: true,
    labels: false, // Default to false: markers remain clean and uncluttered; hover/select show labels
    grid: false,
    sunlight: true,
    atmosphereGlow: true,
  },

  sidebarOpen: true,
  panelOpen: false,

  cameraTarget: null,
  cameraDistance: 3.2,

  displacementScale: 0.015,
  elevationExaggeration: 1.0,
  textureLongitudeOffset: 0,

  selectArtifact: (id) =>
    set((state) => ({
      selectedArtifactId: id,
      // If closing/deselecting, close panel; if opening, preserve existing panel state or keep user in control
      panelOpen: id === null ? false : state.panelOpen,
    })),

  setHoveredArtifact: (id) => set({ hoveredArtifactId: id }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setSelectedMission: (mission) => set({ selectedMission: mission }),

  setSelectedStatus: (status) => set({ selectedStatus: status }),

  toggleLayer: (layer) =>
    set((state) => ({
      visibleLayers: {
        ...state.visibleLayers,
        [layer]: !state.visibleLayers[layer],
      },
    })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setPanelOpen: (open) =>
    set((state) => ({
      panelOpen: open,
      // If closing panel, do not necessarily deselect, but keep selection clean
      selectedArtifactId: open ? state.selectedArtifactId : null,
    })),

  setCameraTarget: (target, distance = 2.4) =>
    set({
      cameraTarget: target,
      cameraDistance: distance,
    }),

  setDisplacementScale: (scale) => set({ displacementScale: scale }),

  setElevationExaggeration: (exaggeration) =>
    set({ elevationExaggeration: exaggeration }),

  setTextureLongitudeOffset: (offset) =>
    set({ textureLongitudeOffset: offset }),

  resetCamera: () =>
    set({
      cameraTarget: null,
      cameraDistance: 3.2,
      selectedArtifactId: null,
      panelOpen: false,
    }),

  resetFilters: () =>
    set({
      searchQuery: '',
      selectedCategory: 'all',
      selectedMission: 'all',
      selectedStatus: 'all',
    }),
}));
