/**
 * Geodetic & 3D Planetary Coordinate Utilities
 * Translates planetary latitude and longitude to 3D Three.js Vector3 coordinates.
 * Designed to be reusable across Moon and future planetary bodies (e.g. Mars).
 *
 * Mathematical Mapping:
 * - Compatible with NASA CGI Moon Kit equirectangular cylindrical projection centered on 0° Longitude.
 * - Matches Three.js SphereGeometry vertex & UV indexing precisely.
 */

export const CELESTIAL_RADII_KM = {
  moon: 1737.4,
  mars: 3389.5,
  earth: 6371.0,
} as const;

/**
 * Standard base rotation offset for planetary globe so that the Prime Meridian
 * (0° Longitude, 0° Latitude) faces directly toward the default camera view (+Z).
 */
export const PRIME_MERIDIAN_BASE_ROTATION_Y = -Math.PI / 2;

/**
 * Converts planetary spherical latitude & longitude to local Cartesian [x, y, z]
 * on a standard Three.js SphereGeometry.
 *
 * Equirectangular mapping convention:
 * - u = 0.0 corresponds to -180° W
 * - u = 0.5 corresponds to 0° (Prime Meridian)
 * - u = 1.0 corresponds to +180° E
 * - v = 1.0 corresponds to +90° N (North Pole)
 * - v = 0.0 corresponds to -90° S (South Pole)
 *
 * @param lat Latitude in degrees [-90 to +90], North positive, South negative.
 * @param lon Longitude in degrees [-180 to +180], East positive, West negative.
 * @param radius Sphere radius in Three.js units.
 * @param altitude Optional altitude offset above the surface in Three.js units.
 * @returns [x, y, z] local coordinate tuple.
 */
export function latLongToVector3(
  lat: number,
  lon: number,
  radius: number,
  altitude: number = 0
): [number, number, number] {
  const r = radius + altitude;
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.cos(phi);
  const z = r * Math.sin(phi) * Math.sin(theta);

  return [x, y, z];
}

/**
 * Converts planetary spherical coordinates into Three.js World space,
 * taking into account the globe group's Y-axis orientation rotation.
 */
export function latLongToWorldVector3(
  lat: number,
  lon: number,
  radius: number,
  altitude: number = 0,
  rotationY: number = PRIME_MERIDIAN_BASE_ROTATION_Y
): [number, number, number] {
  const [localX, localY, localZ] = latLongToVector3(lat, lon, radius, altitude);
  const cosY = Math.cos(rotationY);
  const sinY = Math.sin(rotationY);

  const worldX = localX * cosY + localZ * sinY;
  const worldY = localY;
  const worldZ = -localX * sinY + localZ * cosY;

  return [worldX, worldY, worldZ];
}

/**
 * Formats decimal latitude and longitude into human-readable geodetic notation.
 * e.g., "0.6741° N, 23.4730° E"
 */
export function formatCoordinates(lat: number, lon: number, digits: number = 4): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  const formattedLat = Math.abs(lat).toFixed(digits);
  const formattedLon = Math.abs(lon).toFixed(digits);
  return `${formattedLat}° ${latDir}, ${formattedLon}° ${lonDir}`;
}

/**
 * Calculates the great-circle surface distance between two points using the Haversine formula.
 *
 * @param lat1 Latitude 1 in degrees
 * @param lon1 Longitude 1 in degrees
 * @param lat2 Latitude 2 in degrees
 * @param lon2 Longitude 2 in degrees
 * @param bodyRadiusKm Mean planetary radius in km (defaults to Moon: 1737.4 km)
 * @returns Distance in kilometers
 */
export function calculateSurfaceDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  bodyRadiusKm: number = CELESTIAL_RADII_KM.moon
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const rLat1 = toRad(lat1);
  const rLat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return bodyRadiusKm * c;
}
