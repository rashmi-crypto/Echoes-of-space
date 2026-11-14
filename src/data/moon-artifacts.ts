import { Artifact } from '@/types/artifact';

/**
 * Verified NASA Historic Equipment on the Moon.
 *
 * Data Integrity & Provenance Standards:
 * - Coordinates are strictly sourced from NASA Lunar Reconnaissance Orbiter Camera (LROC)
 *   Narrow Angle Camera (NAC) photogrammetric analysis and NASA Space Science Data
 *   Coordinated Archive (NSSDC / GSFC).
 * - Landing site coordinates reflect the landing zone or touchdown point.
 * - Equipment coordinates pinpoint the exact resting position of the hardware.
 * - Approximate locations (e.g. impact sites) are explicitly flagged as 'approximate'
 *   with scientific explanations.
 */
export const MOON_ARTIFACTS: Artifact[] = [
  {
    id: 'apollo-11-lm',
    name: 'Apollo 11 Lunar Module Descent Stage (Eagle)',
    designation: 'LM-5 Descent Stage',
    body: 'moon',
    category: 'crewed_lander',
    mission: {
      id: 'apollo-11',
      name: 'Apollo 11',
      program: 'Apollo',
      agency: 'NASA',
      launchDate: '1969-07-16',
      landingDate: '1969-07-20',
      missionEndDate: '1969-07-24',
      lastCommunicationDate: '1969-07-21',
      crew: ['Neil Armstrong', 'Buzz Aldrin', 'Michael Collins'],
    },
    landingSiteName: 'Mare Tranquillitatis (Tranquility Base)',
    coordinates: {
      latitude: 0.67408,
      longitude: 23.47297,
      elevationKm: -2.57,
    },
    siteCoordinates: {
      latitude: 0.6741,
      longitude: 23.473,
    },
    accuracy: 'verified',
    coordinateDerivation: 'LROC NAC stereo photogrammetry tied to LOLA global geodetic frame',
    accuracyNote: 'Sub-meter position confirmed by NASA LROC Narrow Angle Camera frame M175124905LR.',
    status: 'inactive',
    physicalCondition:
      'Structurally intact octagonal descent stage with landing gear deployed on basaltic regolith. Thermal Kapton/Mylar foil weathered by prolonged solar ultraviolet flux and micro-meteorite bombardment.',
    summary:
      'The lower stage of the Lunar Module Eagle, serving as the launch platform for humanity’s first surface walk on an extraterrestrial world.',
    purpose:
      'Provided throttleable descent propulsion, radar guidance, and landing gear for powered descent; served as launch pad for the ascent stage.',
    scientificSignificance:
      'Preserves the premier historic archaeological site on the Moon, including the Apollo 11 descent stage, equipment jettison areas, and undisturbed regolith footprints.',
    hardware: {
      massKg: 2034,
      dimensions: '4.22 m high x 9.4 m diagonal span across footpads',
      manufacturer: 'Grumman Aerospace Corporation (Bethpage, NY)',
      powerSource: 'Four silver-zinc internal batteries (1600 Ah total)',
    },
    sources: [
      {
        title: 'LROC Featured Sites: Apollo 11 Landing Site',
        organization: 'NASA Lunar Reconnaissance Orbiter Camera (ASU / GSFC)',
        url: 'https://www.lroc.asu.edu/featured_sites/view_site/1',
        sourceType: 'lroc',
        datasetId: 'LROC_NAC_M175124905LR',
        resolution: '0.45 m/pixel',
        accessDate: '2026-11-14',
      },
      {
        title: 'Apollo 11 Lunar Module / EASEP',
        organization: 'NASA Space Science Data Coordinated Archive (NSSDC)',
        url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C',
        sourceType: 'nssdc',
        datasetId: 'NSSDC ID: 1969-059C',
        accessDate: '2026-11-14',
      },
    ],
  },
  {
    id: 'apollo-11-lrrr',
    name: 'Apollo 11 Laser Ranging Retroreflector (LRRR)',
    designation: 'EASEP LRRR-11',
    body: 'moon',
    category: 'science_package',
    mission: {
      id: 'apollo-11',
      name: 'Apollo 11',
      program: 'Apollo',
      agency: 'NASA',
      launchDate: '1969-07-16',
      landingDate: '1969-07-20',
      missionEndDate: '1969-07-24',
      crew: ['Neil Armstrong', 'Buzz Aldrin', 'Michael Collins'],
    },
    landingSiteName: 'Mare Tranquillitatis',
    coordinates: {
      latitude: 0.67345,
      longitude: 23.47307,
      elevationKm: -2.57,
    },
    siteCoordinates: {
      latitude: 0.67408,
      longitude: 23.47297,
    },
    accuracy: 'verified',
    coordinateDerivation: 'Centimeter-precision Earth-to-Moon laser time-of-flight ranging',
    accuracyNote: 'Continuously ranged from Earth observatories (e.g. Apache Point, McDonald) to sub-centimeter accuracy.',
    status: 'operational',
    physicalCondition:
      'Fully operational 100-prism fused silica corner-cube array. Completely passive optical system requiring zero electrical power.',
    summary:
      'The only Apollo 11 scientific experiment that remains continuously active and functional today, reflecting laser pulses back to Earth.',
    purpose:
      'Allow high-precision pulse timing from terrestrial laser stations to measure Earth-Moon orbital distance, lunar librations, and general relativity parameters.',
    scientificSignificance:
      'Proved the Moon is drifting away from Earth at 3.82 cm/year. Provided tight observational limits on Einstein’s equivalence principle and lunar liquid core dynamics.',
    hardware: {
      massKg: 46.8,
      dimensions: '0.46 m x 0.46 m x 0.15 m panel',
      manufacturer: 'Bendix Corporation & Arthur D. Little Inc.',
      powerSource: 'Passive optical retroreflection (no electrical power needed)',
    },
    sources: [
      {
        title: 'Lunar Laser Ranging Experiment',
        organization: 'NASA Jet Propulsion Laboratory (JPL)',
        url: 'https://science.nasa.gov/moon/apollo-installations/laser-ranging-retroreflector/',
        sourceType: 'jpl',
        datasetId: 'JPL-LLRE-A11',
        accessDate: '2026-11-14',
      },
      {
        title: 'LROC Coordinates for Apollo 11 EASEP and LRRR',
        organization: 'NASA Lunar Reconnaissance Orbiter Camera (ASU / GSFC)',
        url: 'https://www.lroc.asu.edu/featured_sites/view_site/1',
        sourceType: 'lroc',
        datasetId: 'LROC_NAC_M175124905LR',
        resolution: '0.45 m/pixel',
        accessDate: '2026-11-14',
      },
    ],
  },
  {
    id: 'surveyor-3',
    name: 'Surveyor 3 Robotic Lunar Lander',
    designation: 'Surveyor-C (1967-035A)',
    body: 'moon',
    category: 'robotic_lander',
    mission: {
      id: 'surveyor-3',
      name: 'Surveyor 3',
      program: 'Surveyor',
      agency: 'NASA',
      launchDate: '1967-04-17',
      landingDate: '1967-04-20',
      missionEndDate: '1967-05-04',
      lastCommunicationDate: '1967-05-03',
    },
    landingSiteName: 'Oceanus Procellarum (Ocean of Storms)',
    coordinates: {
      latitude: -3.0163,
      longitude: -23.418,
      elevationKm: -1.37,
    },
    siteCoordinates: {
      latitude: -3.016,
      longitude: -23.418,
    },
    accuracy: 'verified',
    coordinateDerivation: 'In situ human inspection by Apollo 12 and LROC NAC sub-meter imaging',
    accuracyNote: 'Position verified by direct physical rendezvous of Apollo 12 astronauts Pete Conrad and Alan Bean.',
    status: 'retrieved_partial',
    physicalCondition:
      'Three-legged tubular aluminum spaceframe rested on the slope of a 200m crater. TV camera, scoop arm, and sections of cabling were unbolted and returned to Earth by Apollo 12.',
    summary:
      'The third soft-landing probe of the NASA Surveyor program, famously visited 31 months after landing by Apollo 12.',
    purpose:
      'Demonstrated precision soft-landing, examined soil mechanics with a robotic scoop, and relayed 6,315 television images of the lunar surface.',
    scientificSignificance:
      'Enabled humanity’s first long-duration extraterrestrial materials study: returned optical and metal components revealed micro-meteoroid erosion and solar wind irradiation rates.',
    hardware: {
      massKg: 286,
      dimensions: '3.0 m high x 4.2 m triangular base footprint',
      manufacturer: 'Hughes Aircraft Company',
      powerSource: 'Solar array (792 solar cells) and rechargeable silver-zinc battery',
    },
    sources: [
      {
        title: 'Surveyor 3 Spacecraft and Instruments',
        organization: 'NASA Space Science Data Coordinated Archive (NSSDC)',
        url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A',
        sourceType: 'nssdc',
        datasetId: 'NSSDC ID: 1967-035A',
        accessDate: '2026-11-14',
      },
      {
        title: 'LROC View of Apollo 12 and Surveyor 3',
        organization: 'NASA Lunar Reconnaissance Orbiter Camera (ASU / GSFC)',
        url: 'https://www.lroc.asu.edu/featured_sites/view_site/2',
        sourceType: 'lroc',
        datasetId: 'LROC_NAC_M104662862R',
        resolution: '0.4 m/pixel',
        accessDate: '2026-11-14',
      },
    ],
  },
  {
    id: 'apollo-12-lm',
    name: 'Apollo 12 Lunar Module Descent Stage (Intrepid)',
    designation: 'LM-6 Descent Stage',
    body: 'moon',
    category: 'crewed_lander',
    mission: {
      id: 'apollo-12',
      name: 'Apollo 12',
      program: 'Apollo',
      agency: 'NASA',
      launchDate: '1969-11-14',
      landingDate: '1969-11-19',
      missionEndDate: '1969-11-24',
      lastCommunicationDate: '1969-11-20',
      crew: ['Pete Conrad', 'Alan Bean', 'Richard Gordon'],
    },
    landingSiteName: 'Oceanus Procellarum',
    coordinates: {
      latitude: -3.01239,
      longitude: -23.42157,
      elevationKm: -1.37,
    },
    siteCoordinates: {
      latitude: -3.0124,
      longitude: -23.4216,
    },
    accuracy: 'verified',
    coordinateDerivation: 'LROC NAC stereo photogrammetric triangulation',
    accuracyNote: 'Touchdown ~160 meters from Surveyor 3; imaged clearly in LROC NAC frame M104662862R.',
    status: 'inactive',
    physicalCondition:
      'Intact descent stage resting on mare regolith. ALSEP central station located ~130 meters west-northwest.',
    summary:
      'Humanity’s first precision pinpoint extraterrestrial landing, touching down within walking distance of Surveyor 3.',
    purpose:
      'Demonstrated accurate landing navigation, conducted two surface EVAs totaling 7 hours 45 minutes, and deployed the first full ALSEP geophysical station.',
    scientificSignificance:
      'Proved pinpoint landings were achievable in rough terrain. Deployed the Apollo 12 passive seismometer which recorded moonquakes and the deliberate lunar impact of the LM ascent stage.',
    hardware: {
      massKg: 2211,
      dimensions: '4.22 m high x 9.4 m diagonal span',
      manufacturer: 'Grumman Aerospace Corporation',
      powerSource: 'Five silver-zinc internal batteries',
    },
    sources: [
      {
        title: 'Apollo 12 Landing Site and LROC Imagery',
        organization: 'NASA Lunar Reconnaissance Orbiter Camera (ASU / GSFC)',
        url: 'https://www.lroc.asu.edu/featured_sites/view_site/2',
        sourceType: 'lroc',
        datasetId: 'LROC_NAC_M104662862R',
        resolution: '0.4 m/pixel',
        accessDate: '2026-11-14',
      },
      {
        title: 'Apollo 12 Lunar Module / ALSEP',
        organization: 'NASA Space Science Data Coordinated Archive (NSSDC)',
        url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C',
        sourceType: 'nssdc',
        datasetId: 'NSSDC ID: 1969-099C',
        accessDate: '2026-11-14',
      },
    ],
  },
  {
    id: 'apollo-14-lm',
    name: 'Apollo 14 Lunar Module Descent Stage (Antares)',
    designation: 'LM-8 Descent Stage',
    body: 'moon',
    category: 'crewed_lander',
    mission: {
      id: 'apollo-14',
      name: 'Apollo 14',
      program: 'Apollo',
      agency: 'NASA',
      launchDate: '1971-01-31',
      landingDate: '1971-02-05',
      missionEndDate: '1971-02-09',
      lastCommunicationDate: '1971-02-06',
      crew: ['Alan Shepard', 'Edgar Mitchell', 'Stuart Roosa'],
    },
    landingSiteName: 'Fra Mauro Highlands',
    coordinates: {
      latitude: -3.6453,
      longitude: -17.47136,
      elevationKm: -1.45,
    },
    siteCoordinates: {
      latitude: -3.6453,
      longitude: -17.4714,
    },
    accuracy: 'verified',
    coordinateDerivation: 'LROC NAC stereo photogrammetry (ASU)',
    accuracyNote: 'Confirmed by LROC images showing descent stage, ALSEP cables, and MET tracks.',
    status: 'inactive',
    physicalCondition:
      'Intact descent stage resting on undulating Fra Mauro ejecta blanket. Two-wheeled Modular Equipment Transporter (MET) parked nearby.',
    summary:
      'Landed Alan Shepard and Edgar Mitchell in the ancient highland ejecta blanket of the Imbrium Basin.',
    purpose:
      'Collect ancient ejecta breccias from Cone Crater rim, test manual surface transport (MET cart), and deploy active seismic grenade experiments.',
    scientificSignificance:
      'Returned 42.8 kg of rocks that established the absolute radiometric age of the Imbrium Basin impact event (~3.92 billion years), a benchmark for solar system crater chronology.',
    hardware: {
      massKg: 2144,
      dimensions: '4.22 m high x 9.4 m span',
      manufacturer: 'Grumman Aerospace Corporation',
      powerSource: 'Silver-zinc batteries',
    },
    sources: [
      {
        title: 'Apollo 14 Landing Site Coordinates',
        organization: 'NASA Lunar Reconnaissance Orbiter Camera (ASU / GSFC)',
        url: 'https://www.lroc.asu.edu/featured_sites/view_site/3',
        sourceType: 'lroc',
        datasetId: 'LROC_NAC_M114075227E',
        resolution: '0.45 m/pixel',
        accessDate: '2026-11-14',
      },
      {
        title: 'Apollo 14 Lunar Module / ALSEP',
        organization: 'NASA Space Science Data Coordinated Archive (NSSDC)',
        url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-008C',
        sourceType: 'nssdc',
        datasetId: 'NSSDC ID: 1971-008C',
        accessDate: '2026-11-14',
      },
    ],
  },
  {
    id: 'apollo-15-lm',
    name: 'Apollo 15 Lunar Module Descent Stage (Falcon)',
    designation: 'LM-10 Descent Stage (J-Mission Extended)',
    body: 'moon',
    category: 'crewed_lander',
    mission: {
      id: 'apollo-15',
      name: 'Apollo 15',
      program: 'Apollo',
      agency: 'NASA',
      launchDate: '1971-07-26',
      landingDate: '1971-07-30',
      missionEndDate: '1971-08-07',
      lastCommunicationDate: '1971-08-02',
      crew: ['David Scott', 'James Irwin', 'Alfred Worden'],
    },
    landingSiteName: 'Hadley-Apennine (Palus Putredinis)',
    coordinates: {
      latitude: 26.13222,
      longitude: 3.63386,
      elevationKm: -2.08,
    },
    siteCoordinates: {
      latitude: 26.1322,
      longitude: 3.6339,
    },
    accuracy: 'verified',
    coordinateDerivation: 'LROC NAC stereo photogrammetric triangulation',
    accuracyNote: 'Imaged at 0.38 m/pixel by LROC NAC frame M111578606LE.',
    status: 'inactive',
    physicalCondition:
      'Intact descent stage resting in a scenic plain bounded by Mount Hadley and the 300-meter-deep sinuous Hadley Rille.',
    summary:
      'First extended scientific J-mission lander, supporting three surface EVA excursions totaling 18.5 hours and carrying the first Lunar Roving Vehicle.',
    purpose:
      'Conduct wide-ranging field geology along the Apennine mountain front and investigate the volcanic origin of Hadley Rille.',
    scientificSignificance:
      'Returned sample 15415 ("Genesis Rock"), an anorthosite formed ~4.1 billion years ago that verified the primordial lunar magma ocean hypothesis.',
    hardware: {
      massKg: 2809,
      dimensions: '4.22 m high x 9.4 m span',
      manufacturer: 'Grumman Aerospace Corporation',
      powerSource: 'Five silver-zinc descent batteries (2075 Ah)',
    },
    sources: [
      {
        title: 'LROC Apollo 15 Landing Site',
        organization: 'NASA Lunar Reconnaissance Orbiter Camera (ASU / GSFC)',
        url: 'https://www.lroc.asu.edu/featured_sites/view_site/4',
        sourceType: 'lroc',
        datasetId: 'LROC_NAC_M111578606LE',
        resolution: '0.38 m/pixel',
        accessDate: '2026-11-14',
      },
      {
        title: 'Apollo 15 Falcon Descent Stage',
        organization: 'NASA Space Science Data Coordinated Archive (NSSDC)',
        url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C',
        sourceType: 'nssdc',
        datasetId: 'NSSDC ID: 1971-063C',
        accessDate: '2026-11-14',
      },
    ],
  },
  {
    id: 'apollo-15-lrv',
    name: 'Apollo 15 Lunar Roving Vehicle (LRV-1)',
    designation: 'LRV-001',
    body: 'moon',
    category: 'rover',
    mission: {
      id: 'apollo-15',
      name: 'Apollo 15',
      program: 'Apollo',
      agency: 'NASA',
      launchDate: '1971-07-26',
      landingDate: '1971-07-30',
      missionEndDate: '1971-08-07',
      lastCommunicationDate: '1971-08-02',
      crew: ['David Scott', 'James Irwin', 'Alfred Worden'],
    },
    landingSiteName: 'Hadley-Apennine ("VIP Site")',
    coordinates: {
      latitude: 26.1345,
      longitude: 3.6398,
      elevationKm: -2.08,
    },
    siteCoordinates: {
      latitude: 26.1322,
      longitude: 3.6339,
    },
    accuracy: 'verified',
    coordinateDerivation: 'LROC NAC optical identification of vehicle chassis and tracks',
    accuracyNote: 'Parked approximately 160 meters east of Falcon at the designated television VIP point.',
    status: 'inactive',
    physicalCondition:
      'Four-wheeled rover parked with wheels turned. Aluminum mesh tires and open chassis preserved in high vacuum.',
    summary:
      'Humanity’s first automobile driven on another planetary body, enabling a total surface traverse of 27.9 kilometers.',
    purpose:
      'Expanded astronaut exploration radius from walking distance (~1 km) to over 10 km, transporting heavy drill cores and sample collections.',
    scientificSignificance:
      'Transformed planetary science by allowing field geologists to sample diverse stratigraphy across kilometers of mountain slopes and rille rims.',
    hardware: {
      massKg: 210,
      dimensions: '3.1 m long x 2.3 m wide x 1.1 m high',
      manufacturer: 'Boeing Aerospace / Delco Electronics',
      powerSource: 'Two 36-volt non-rechargeable silver-zinc batteries (121 Ah each)',
    },
    sources: [
      {
        title: 'Lunar Roving Vehicle (LRV-1) Specifications and Location',
        organization: 'NASA Space Science Data Coordinated Archive (NSSDC)',
        url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063D',
        sourceType: 'nssdc',
        datasetId: 'NSSDC ID: 1971-063D',
        accessDate: '2026-11-14',
      },
      {
        title: 'Apollo 15 VIP Site and Rover Coordinates',
        organization: 'NASA Lunar Reconnaissance Orbiter Camera (ASU / GSFC)',
        url: 'https://www.lroc.asu.edu/featured_sites/view_site/4',
        sourceType: 'lroc',
        datasetId: 'LROC_NAC_M111578606LE',
        resolution: '0.38 m/pixel',
        accessDate: '2026-11-14',
      },
    ],
  },
  {
    id: 'apollo-16-lm',
    name: 'Apollo 16 Lunar Module Descent Stage (Orion)',
    designation: 'LM-11 Descent Stage',
    body: 'moon',
    category: 'crewed_lander',
    mission: {
      id: 'apollo-16',
      name: 'Apollo 16',
      program: 'Apollo',
      agency: 'NASA',
      launchDate: '1972-04-16',
      landingDate: '1972-04-21',
      missionEndDate: '1972-04-27',
      lastCommunicationDate: '1972-04-24',
      crew: ['John Young', 'Charles Duke', 'Ken Mattingly'],
    },
    landingSiteName: 'Descartes Highlands',
    coordinates: {
      latitude: -8.97301,
      longitude: 15.50019,
      elevationKm: 1.12,
    },
    siteCoordinates: {
      latitude: -8.973,
      longitude: 15.5002,
    },
    accuracy: 'verified',
    coordinateDerivation: 'LROC NAC stereo photogrammetric triangulation',
    accuracyNote: 'Confirmed by LROC NAC frame M175179080R.',
    status: 'inactive',
    physicalCondition:
      'Intact descent stage located in an undulating high-albedo highland plateau near Plum and North Ray craters.',
    summary:
      'The lander for Apollo 16, the sole Apollo mission dispatched to explore the central lunar highland plateau.',
    purpose:
      'Investigate highland formation theories, deploy the Far Ultraviolet Camera / Spectrograph, and sample Descartes and Cayley geologic formations.',
    scientificSignificance:
      'Disproved the prevailing volcanic hypothesis for highland plains by returning anorthositic impact breccias, demonstrating that impact shock metamorphism dominated the lunar crust.',
    hardware: {
      massKg: 2795,
      dimensions: '4.22 m high x 9.4 m span',
      manufacturer: 'Grumman Aerospace Corporation',
      powerSource: 'Silver-zinc batteries',
    },
    sources: [
      {
        title: 'Apollo 16 Landing Site Overview',
        organization: 'NASA Lunar Reconnaissance Orbiter Camera (ASU / GSFC)',
        url: 'https://www.lroc.asu.edu/featured_sites/view_site/5',
        sourceType: 'lroc',
        datasetId: 'LROC_NAC_M175179080R',
        resolution: '0.4 m/pixel',
        accessDate: '2026-11-14',
      },
      {
        title: 'Apollo 16 Orion Descent Stage',
        organization: 'NASA Space Science Data Coordinated Archive (NSSDC)',
        url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-031C',
        sourceType: 'nssdc',
        datasetId: 'NSSDC ID: 1972-031C',
        accessDate: '2026-11-14',
      },
    ],
  },
  {
    id: 'apollo-17-lm',
    name: 'Apollo 17 Lunar Module Descent Stage (Challenger)',
    designation: 'LM-12 Descent Stage',
    body: 'moon',
    category: 'crewed_lander',
    mission: {
      id: 'apollo-17',
      name: 'Apollo 17',
      program: 'Apollo',
      agency: 'NASA',
      launchDate: '1972-12-07',
      landingDate: '1972-12-11',
      missionEndDate: '1972-12-19',
      lastCommunicationDate: '1972-12-14',
      crew: ['Eugene Cernan', 'Harrison Schmitt', 'Ronald Evans'],
    },
    landingSiteName: 'Taurus-Littrow Valley',
    coordinates: {
      latitude: 20.1908,
      longitude: 30.77168,
      elevationKm: -2.48,
    },
    siteCoordinates: {
      latitude: 20.1908,
      longitude: 30.7717,
    },
    accuracy: 'verified',
    coordinateDerivation: 'LROC NAC stereo photogrammetric triangulation tied to LOLA',
    accuracyNote: 'LROC NAC sub-meter imagery shows clear dual descent engine scour, rover tracks, and ALSEP package.',
    status: 'inactive',
    physicalCondition:
      'Descent stage standing on valley floor flanked by 2,000-meter-tall South Massif and North Massif mountain walls.',
    summary:
      'The final Apollo crewed landing site, where Eugene Cernan and professional geologist Harrison Schmitt spent over 75 hours on the surface.',
    purpose:
      'Sample both ancient highland massif crustal rocks and young dark mantle pyroclastic volcanic deposits in a deep graben valley.',
    scientificSignificance:
      'Discovered the iconic orange volcanic glass beads at Shorty Crater from 3.64-billion-year-old volcanic fire fountains; returned 110.5 kg of geological samples.',
    hardware: {
      massKg: 2798,
      dimensions: '4.22 m high x 9.4 m span',
      manufacturer: 'Grumman Aerospace Corporation',
      powerSource: 'Silver-zinc batteries',
    },
    sources: [
      {
        title: 'Apollo 17 Taurus-Littrow Landing Site',
        organization: 'NASA Lunar Reconnaissance Orbiter Camera (ASU / GSFC)',
        url: 'https://www.lroc.asu.edu/featured_sites/view_site/6',
        sourceType: 'lroc',
        datasetId: 'LROC_NAC_M168000580LR',
        resolution: '0.4 m/pixel',
        accessDate: '2026-11-14',
      },
      {
        title: 'Apollo 17 Challenger Descent Stage',
        organization: 'NASA Space Science Data Coordinated Archive (NSSDC)',
        url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-096C',
        sourceType: 'nssdc',
        datasetId: 'NSSDC ID: 1972-096C',
        accessDate: '2026-11-14',
      },
    ],
  },
  {
    id: 'apollo-17-lrv',
    name: 'Apollo 17 Lunar Roving Vehicle (LRV-3)',
    designation: 'LRV-003',
    body: 'moon',
    category: 'rover',
    mission: {
      id: 'apollo-17',
      name: 'Apollo 17',
      program: 'Apollo',
      agency: 'NASA',
      launchDate: '1972-12-07',
      landingDate: '1972-12-11',
      missionEndDate: '1972-12-19',
      lastCommunicationDate: '1972-12-14',
      crew: ['Eugene Cernan', 'Harrison Schmitt', 'Ronald Evans'],
    },
    landingSiteName: 'Taurus-Littrow ("VIP Site")',
    coordinates: {
      latitude: 20.1938,
      longitude: 30.7744,
      elevationKm: -2.48,
    },
    siteCoordinates: {
      latitude: 20.1908,
      longitude: 30.7717,
    },
    accuracy: 'verified',
    coordinateDerivation: 'LROC NAC optical identification of parked vehicle',
    accuracyNote: 'Parked ~150 meters east of Challenger, with high-gain antenna oriented at Earth to broadcast liftoff.',
    status: 'inactive',
    physicalCondition:
      'Preserved rover with improvised duct-taped photo-map fender replacement on right rear wheel, parked facing the lander.',
    summary:
      'The third and final Lunar Roving Vehicle, holding the record for the farthest single surface traverse in the Apollo program (35.7 km).',
    purpose:
      'Carried the crew across the Taurus-Littrow floor, including visits to Shorty Crater, Camelot Crater, and the base of the massifs.',
    scientificSignificance:
      'Its ground-commanded color television camera successfully captured and tracked the liftoff of the Apollo 17 ascent stage as humanity departed the surface.',
    hardware: {
      massKg: 210,
      dimensions: '3.1 m long x 2.3 m wide x 1.1 m high',
      manufacturer: 'Boeing Aerospace / Delco Electronics',
      powerSource: 'Two 36-volt silver-zinc batteries',
    },
    sources: [
      {
        title: 'Apollo 17 Lunar Roving Vehicle (LRV-3)',
        organization: 'NASA Space Science Data Coordinated Archive (NSSDC)',
        url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-096D',
        sourceType: 'nssdc',
        datasetId: 'NSSDC ID: 1972-096D',
        accessDate: '2026-11-14',
      },
      {
        title: 'LROC Apollo 17 Traverse and Rover Location',
        organization: 'NASA Lunar Reconnaissance Orbiter Camera (ASU / GSFC)',
        url: 'https://www.lroc.asu.edu/featured_sites/view_site/6',
        sourceType: 'lroc',
        datasetId: 'LROC_NAC_M168000580LR',
        resolution: '0.4 m/pixel',
        accessDate: '2026-11-14',
      },
    ],
  },
  {
    id: 'surveyor-1',
    name: 'Surveyor 1 Robotic Lunar Lander',
    designation: 'Surveyor-A (1966-045A)',
    body: 'moon',
    category: 'robotic_lander',
    mission: {
      id: 'surveyor-1',
      name: 'Surveyor 1',
      program: 'Surveyor',
      agency: 'NASA',
      launchDate: '1966-05-30',
      landingDate: '1966-06-02',
      missionEndDate: '1967-01-07',
      lastCommunicationDate: '1967-01-07',
    },
    landingSiteName: 'Flamsteed P Crater (Oceanus Procellarum)',
    coordinates: {
      latitude: -2.4745,
      longitude: -43.3398,
      elevationKm: -1.78,
    },
    siteCoordinates: {
      latitude: -2.474,
      longitude: -43.34,
    },
    accuracy: 'verified',
    coordinateDerivation: 'LROC NAC geometric identification inside ghost crater Flamsteed P',
    accuracyNote: 'Located and imaged at 0.5 m/px by NASA LROC Narrow Angle Camera frame M102443994L.',
    status: 'inactive',
    physicalCondition:
      'Intact three-legged lander standing in an ancient degraded crater ring. Footpads resting on firm basalt regolith.',
    summary:
      'The first American spacecraft to achieve a gentle soft landing on another celestial body, pioneering the path for Apollo.',
    purpose:
      'Prove the feasibility of radar-guided closed-loop soft landings and test whether the lunar surface could bear the weight of a manned lander.',
    scientificSignificance:
      'Demolished pre-spaceflight fears that the lunar surface was covered in deep oceans of quicksand-like dust, proving the regolith had sufficient bearing strength for astronauts.',
    hardware: {
      massKg: 294,
      dimensions: '3.0 m high x 4.2 m triangular base footprint',
      manufacturer: 'Hughes Aircraft Company',
      powerSource: 'Solar array and rechargeable silver-zinc battery',
    },
    sources: [
      {
        title: 'Surveyor 1 Lander and Instruments',
        organization: 'NASA Space Science Data Coordinated Archive (NSSDC)',
        url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1966-045A',
        sourceType: 'nssdc',
        datasetId: 'NSSDC ID: 1966-045A',
        accessDate: '2026-11-14',
      },
      {
        title: 'LROC Locates Surveyor 1',
        organization: 'NASA Lunar Reconnaissance Orbiter Camera (ASU / GSFC)',
        url: 'https://www.lroc.asu.edu/posts/101',
        sourceType: 'lroc',
        datasetId: 'LROC_NAC_M102443994L',
        resolution: '0.5 m/pixel',
        accessDate: '2026-11-14',
      },
    ],
  },
  {
    id: 'ranger-7',
    name: 'Ranger 7 Lunar Impactor Site',
    designation: 'Ranger-7 (1964-041A)',
    body: 'moon',
    category: 'impactor',
    mission: {
      id: 'ranger-7',
      name: 'Ranger 7',
      program: 'Ranger',
      agency: 'NASA',
      launchDate: '1964-07-28',
      landingDate: '1964-07-31',
      missionEndDate: '1964-07-31',
      lastCommunicationDate: '1964-07-31',
    },
    landingSiteName: 'Mare Cognitum (The Known Sea)',
    coordinates: {
      latitude: -10.63,
      longitude: -20.61,
      elevationKm: -1.4,
    },
    siteCoordinates: {
      latitude: -10.63,
      longitude: -20.61,
    },
    accuracy: 'approximate',
    coordinateDerivation: 'Radio tracking telemetry & terminal video analysis',
    accuracyNote:
      'Approximate coordinates derived from impact velocity telemetry. NASA LROC surveys have identified candidate impact craters within ~1.5 km of target.',
    status: 'impacted',
    physicalCondition:
      'High-velocity kinetic impact site (~2.62 km/s). Spacecraft vaporized/fragmented, forming a ~10-meter impact crater with an associated ejecta ray pattern.',
    summary:
      'The first successful American probe to transmit close-up television images of the lunar surface back to Earth prior to terminal impact.',
    purpose:
      'Transmit high-resolution television photographs of the lunar surface during final approach to evaluate topography for future landers.',
    scientificSignificance:
      'Transmitted 4,308 high-resolution images in the final 17 minutes of flight, resolving craters down to 0.5 meters across and proving smooth mare regions existed suitable for landings.',
    hardware: {
      massKg: 365.7,
      dimensions: '3.12 m high x 1.5 m diameter base with solar panels',
      manufacturer: 'NASA Jet Propulsion Laboratory (JPL)',
      powerSource: 'Two solar panel arrays and Ag-Zn batteries during flight',
    },
    sources: [
      {
        title: 'Ranger 7 Spacecraft and Impact Telemetry',
        organization: 'NASA Space Science Data Coordinated Archive (NSSDC)',
        url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1964-041A',
        sourceType: 'nssdc',
        datasetId: 'NSSDC ID: 1964-041A',
        accessDate: '2026-11-14',
      },
      {
        title: 'LROC Impact Crater Search: Ranger 7',
        organization: 'NASA Lunar Reconnaissance Orbiter Camera (ASU / GSFC)',
        url: 'https://www.lroc.asu.edu/posts/374',
        sourceType: 'lroc',
        datasetId: 'LROC_NAC_M119438902RE',
        resolution: '0.5 m/pixel',
        accessDate: '2026-11-14',
      },
    ],
  },
];
