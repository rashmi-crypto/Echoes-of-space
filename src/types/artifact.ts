/**
 * Echoes of Space - Core Domain Types
 * Strict TypeScript models for celestial bodies, missions, and artifacts.
 */

export type CelestialBody = 'moon' | 'mars';

export type LocationAccuracy = 'verified' | 'estimated' | 'approximate';

export type SourceType =
  | 'pds' // NASA Planetary Data System
  | 'nssdc' // NASA Space Science Data Coordinated Archive
  | 'lroc' // Lunar Reconnaissance Orbiter Camera (ASU / NASA GSFC)
  | 'mission_report' // NASA Apollo / Surveyor Official Preliminary Science Reports
  | 'svs' // NASA Scientific Visualization Studio
  | 'usgs' // USGS Astrogeology Science Center
  | 'jpl'; // NASA Jet Propulsion Laboratory

export type OperationalStatus =
  | 'inactive' // Mission concluded; equipment remains inert on the planetary surface
  | 'operational' // Active instrument (e.g., Laser Ranging Retroreflectors still bouncing laser pulses)
  | 'impacted' // Deliberately or accidentally impacted (e.g. S-IVB stages, Ranger spacecraft)
  | 'retrieved_partial' // Hardware visited and partially retrieved by later missions (e.g., Surveyor 3)
  | 'lost_contact'; // Unresponsive or lost communication before surface confirmation

export type ArtifactCategory =
  | 'crewed_lander' // Apollo Lunar Module Descent Stages
  | 'rover' // Lunar Roving Vehicles (LRV)
  | 'science_package' // ALSEP, EASEP, LRRR
  | 'robotic_lander' // Surveyor robotic probes
  | 'impactor' // Rocket stages or spacecraft impact sites
  | 'satellite_orbiter'; // Orbital probes

export interface LatLngCoordinates {
  /** Decimal degrees: [-90, +90]. Positive is North, negative is South. */
  latitude: number;
  /** Decimal degrees: [-180, +180]. Positive is East, negative is West. */
  longitude: number;
  /** Elevation offset relative to 1,737.4 km lunar reference sphere in kilometers (optional). */
  elevationKm?: number;
}

export interface ArtifactSource {
  title: string;
  organization: string; // e.g. "NASA LROC", "NASA NSSDC", "NASA PDS Geosciences"
  url: string;
  sourceType: SourceType;
  datasetId?: string; // e.g. "LROC_NAC_M175124905LR", "NSSDC: 1969-059C", "SVS-4720"
  resolution?: string; // e.g. "0.5 m/px", "100 m/px DEM", "N/A"
  accessDate?: string;
  citationDate?: string;
}

export interface MissionInfo {
  id: string;
  name: string;
  program: 'Apollo' | 'Surveyor' | 'Lunar Orbiter' | 'Ranger' | 'Artemis';
  agency: string;
  launchDate: string; // ISO 8601 YYYY-MM-DD
  landingDate?: string;
  missionEndDate?: string;
  lastCommunicationDate?: string;
  crew?: string[];
}

export interface HardwareDetails {
  massKg?: number;
  dimensions?: string;
  manufacturer?: string;
  powerSource?: string;
}

export interface ArtifactImage {
  url: string;
  caption: string;
  credit: string;
}

export interface Artifact {
  id: string;
  name: string;
  designation: string; // Official NASA code (e.g., LM-5 Descent Stage, LRV-001)
  body: CelestialBody;
  category: ArtifactCategory;
  mission: MissionInfo;
  landingSiteName: string; // e.g. "Mare Tranquillitatis", "Taurus-Littrow"
  /** Surface coordinates of the physical equipment on the lunar regolith */
  coordinates: LatLngCoordinates;
  /** General target / landing site centroid coordinates */
  siteCoordinates?: LatLngCoordinates;
  accuracy: LocationAccuracy;
  accuracyNote?: string;
  coordinateDerivation?: string; // e.g. "LROC NAC Photogrammetric Triangulation", "Radio tracking"
  status: OperationalStatus;
  physicalCondition: string; // Detailed physical state on the regolith
  summary: string;
  purpose: string;
  scientificSignificance: string;
  hardware: HardwareDetails;
  sources: ArtifactSource[];
  images?: ArtifactImage[];
}
