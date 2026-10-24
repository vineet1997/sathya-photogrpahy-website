import type { ImageMetadata } from 'astro';

/**
 * All photographs, imported at build time so Astro can generate
 * responsive AVIF/WebP. Source files live in `src/assets/photos/`
 * (2400px working copies of the client's Drive originals).
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/photos/*.jpg',
  { eager: true },
);

const photos: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(modules)) {
  const name = path.split('/').pop()!.replace('.jpg', '');
  photos[name] = mod.default;
}

/** Resolve a photo by its clean file name (throws early if a name is wrong). */
export function pic(name: string): ImageMetadata {
  const img = photos[name];
  if (!img) {
    throw new Error(
      `Photo "${name}" not found. Available: ${Object.keys(photos).join(', ')}`,
    );
  }
  return img;
}

/* ------------------------------------------------------------------ *
 *  Curation — which frame goes where.
 *  Captions are intentionally absent on the homepage grid;
 *  `alt` text below exists purely for accessibility / SEO.
 * ------------------------------------------------------------------ */

export type Shot = { name: string; alt: string; image: ImageMetadata };

const ALT_FALLBACK = 'Wedding photograph by Sathya Photography, Hyderabad';

const ALT: Record<string, string> = {
  'sangeet-floral-arch': 'Couple beneath a marigold and floral arch at their sangeet night',
  'sangeet-swan-lights': 'Bride and groom forehead to forehead among fairy lights at a sangeet',
  'baraat-sparklers': 'Couple arriving in an open jeep between cold-pyro sparklers',
  'groom-bw-portrait': 'Black-and-white portrait of a smiling groom in a sherwani',
  'bride-bw-doorway': 'Black-and-white frame of a bride in a silk saree standing in a doorway',
  'bw-garland-moment': 'Black-and-white moment of a couple exchanging garlands under lights',
  'petal-shower': 'Couple forehead to forehead as rose petals rain down at night',
  'bride-groom-closeup': 'Close portrait of a laughing bride in temple jewellery with her groom',
  'tender-kerala-saree': 'Tender close-up of a couple in a cream and gold kasavu saree',
  'turquoise-wall': 'Couple laughing against a turquoise wall with red flower pots',
  'vintage-car-day': 'Couple in sunglasses posing in a red vintage convertible',
  'pattu-saree-detail': 'Detail of a pattu saree, bangles and the groom’s hand',
  'vintage-car-night': 'Couple embracing beside a vintage car before a lit palace at night',
  'temple-gopuram-wide': 'Wide frame of a couple walking before a temple gopuram',
  'bride-palace-night': 'Bride in a red lehenga seated before an illuminated palace',
  'couple-palace-night': 'Bride and groom before a palace facade glowing at night',
  'terracotta-courtyard': 'Couple laughing in a terracotta courtyard in warm light',
  'moonrise-couple': 'Couple looking toward a rising moon at dusk',
  'temple-tank-wide': 'Couple dwarfed by a temple tank and gopuram under a blue sky',
  'temple-steps-lotus': 'Couple dancing on golden temple steps beside a stone lotus',
  'temple-doorway-sunset': 'Bride and groom in a carved temple doorway with the sun behind them',
  'mandap-red-curtain': 'Bride and groom seated on a gilded throne before red drapes',
  'bridge-kiss-sky': 'Couple kissing where two skybridges meet against the clouds',
  'jump-skyline': 'Groom leaping mid-air as the bride twirls on a waterfront promenade',
  'bougainvillea-street': 'Couple beneath a bougainvillea tree on a European-style street',
  'wedding-mandap-gold': 'Bride and groom resting together on the mandap after the rituals',
  'clocktower-laugh': 'Couple laughing in front of a clocktower on a bright day',
  'ring-closeup': 'Close-up of an engagement ring as the couple embraces',
  'colourful-palace-facade': 'Couple before a colourful palace facade',
  'yacht-embrace': 'Couple embracing on the bow of a yacht at sea',
  'yacht-aerial': 'Aerial view of a yacht on deep blue water',
  'petronas-towers': 'Couple below the Petronas Towers, Kuala Lumpur',
  'petronas-hands': 'Couple holding hands beneath the Petronas Towers',
  'rim-light-blue': 'Rim-lit couple forehead to forehead against a deep blue night',
  'colonial-house-flowers': 'Couple holding hands before a white colonial bungalow',
  'tea-estate-trees': 'Couple small among tea bushes and tall trees',
  'tea-garden-hug': 'Couple hugging on a wooden walkway through a tea garden',
  'tea-garden-laugh': 'Bride laughing in her partner’s arms in a tea garden',
  'hills-arms-wide': 'Couple running with arms wide across golden hills',
  'misty-hills-portrait': 'Couple portrait in drifting mist over green hills',
  'bonfire-shawl': 'Couple wrapped in a shawl beside a bonfire at night',
  'window-light': 'Couple laughing by a tall window in soft hill-station light',
  'lavender-hills': 'Couple among lavender bushes on a misty hillside',
  'rainbow-hills': 'Couple dancing on a hilltop beneath a rainbow',
  'red-saree-wind': 'Bride’s red saree pallu flying in the wind on a green hillside',
  'pine-forest-blue': 'Couple in blue seated on a log in a pine forest',
  'bride-with-camera': 'Bride in a teal lehenga playfully holding a camera',
  'groom-kanduva-portrait': 'Groom in a cream kurta and gold kanduva among palms',
  'playful-cheek-pinch': 'Bride playfully pinching the groom’s cheek',
  'wedding-stage-garlands': 'Bride and groom in garlands on the reception stage',
};

const shot = (name: string): Shot => ({
  name,
  alt: ALT[name] ?? ALT_FALLBACK,
  image: pic(name),
});

/* Hero — a strong vertical frame + an intimate second frame */
export const heroMain = shot('temple-doorway-sunset');
export const heroSecondary = shot('bride-groom-closeup');

/* Intro — "where our work takes us" */
export const places: Shot[] = [
  shot('rim-light-blue'),   // tall
  shot('petronas-hands'),   // small landscape
];

/* Intro — the "tradition" cascade: 4 overlapping frames
   (P1 tall, P2 landscape, P3 tall, P4 portrait). */
export const tradition: Shot[] = [
  shot('groom-kanduva-portrait'), // P1 — tall portrait
  shot('petal-shower'),           // P2 — landscape
  shot('bride-bw-doorway'),       // P3 — tall portrait
  shot('mandap-red-curtain'),     // P4 — portrait
];

/* Trust band — the frame beside the "since 2002" story */
export const trustFrame = shot('wedding-mandap-gold');

/* Closing statement — two frames */
export const closing: Shot[] = [shot('moonrise-couple'), shot('temple-steps-lotus')];

/* The portfolio grid — the centrepiece. Hand-ordered for rhythm:
   alternating orientation, night/day and colour/B&W spread through. */
export const grid: Shot[] = [
  'sangeet-floral-arch', 'temple-tank-wide', 'tender-kerala-saree', 'bride-palace-night',
  'groom-bw-portrait', 'baraat-sparklers', 'red-saree-wind', 'pine-forest-blue',
  'yacht-embrace', 'bw-garland-moment', 'pattu-saree-detail', 'bonfire-shawl',
  'tea-garden-laugh', 'bridge-kiss-sky', 'sangeet-swan-lights', 'bride-with-camera',
  'terracotta-courtyard', 'couple-palace-night', 'playful-cheek-pinch', 'rainbow-hills',
  'window-light', 'vintage-car-night', 'petronas-towers', 'ring-closeup',
  'temple-gopuram-wide', 'jump-skyline', 'wedding-stage-garlands', 'misty-hills-portrait',
  'clocktower-laugh', 'yacht-aerial', 'hills-arms-wide', 'turquoise-wall',
].map(shot);

/* A few frames reused on secondary pages */
export const studioHero = shot('bride-bw-doorway');
export const studioWide = shot('temple-tank-wide');
export const experienceShots: Shot[] = [
  shot('wedding-mandap-gold'),   // Weddings
  shot('tea-garden-hug'),        // Pre-weddings
  shot('couple-palace-night'),   // Films
  shot('petronas-towers'),       // Destination
];
export const contactHero = shot('lavender-hills');
