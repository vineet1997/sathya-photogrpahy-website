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
  // ---- Second batch from the client's Drive (Oct 2026): wedding-day work ----
  'bride-garland-detail': 'Bride in a jasmine garland and red silk, eyes lowered during the muhurtham',
  'groom-talambralu': 'Groom smiling as talambralu rice falls over him',
  'bride-talambralu': 'Bride laughing under a shower of talambralu rice',
  'bw-family-embrace': 'Black-and-white frame of the couple embraced by family',
  'mandap-ritual-blessing': 'Bride placing a blessing on the groom’s head in the mandap',
  'mandap-crowd-blessings': 'Family showering the couple with rice and petals in a crowded mandap',
  'sangeet-confetti': 'Couple dancing through confetti cannons at their sangeet',
  'sangeet-fireworks': 'Fireworks erupting over the sangeet stage at night',
  'girl-banana-leaf': 'Young girl in a silk langa peeking from behind a banana leaf',
  'bride-gold-portrait': 'Bride in a gold kanjivaram saree and temple jewellery, smiling',
  'groom-turban-portrait': 'Groom in an ivory turban and emerald necklace',
  'couple-temple-lotus-night': 'Couple between golden lotus sculptures before a lit temple at night',
  'couple-petal-glow': 'Couple glowing in soft light as petals fall around them',
  'saree-water-swirl': 'Couple twirling a red saree through falling water at night',
  'bw-couple-spotlight': 'Black-and-white portrait of a couple in a pool of light',
  'couple-overhead-rangoli': 'Overhead frame of the couple lying among marigold rangoli',
  'charminar-jump': 'Couple leaping in front of the Charminar, Hyderabad',
  'silhouette-kiss': 'Silhouette of a couple kissing against a bright window',
  'silhouette-pillars-sunset': 'Couple silhouetted between stone pillars at sunset',
  'bw-arch-silhouette': 'Black-and-white silhouette of a couple under a carved arch',
  'bride-temple-jewellery': 'Bride in red silk and temple jewellery against a golden backdrop',
  'maternity-silk-saree': 'Maternity portrait of a mother-to-be in a silk saree with her husband',
  'talambralu-laughter': 'Groom pouring talambralu over his laughing bride',
  'jeelakarra-bellam-hands': 'Close-up of hands holding jeelakarra-bellam on betel leaves',
  'bw-rice-shower': 'Black-and-white frame of rice falling over the bride',
  'charminar-couple': 'Couple holding hands in front of the Charminar, Hyderabad',
  'pellikuthuru-flower-shower': 'Bride laughing under a flower shower at her Pellikuthuru ceremony',
  'palace-lights-dusk': 'Couple before a glowing palace pavilion at dusk',
  'bride-shy-smile': 'Close portrait of a bride smiling shyly in gold jewellery',
  'ritual-laughter': 'Couple laughing together during a wedding ritual',
  'hands-mandap': 'The couple’s hands joined in the mandap',
  'mehendi-detail': 'Detail of mehendi-covered hands holding rice and flowers',
  'bride-laughing-garland': 'Bride covering her laughter, garlanded in jasmine',
  'groom-rice-shower': 'Groom with eyes closed as blessings of rice fall over him',
  'jewellery-flatlay': 'Bridal necklace and silk saree arranged among palm leaves',
  'kalyanam-detail': 'Telugu kalyanam details on a painted cloth during the ceremony',
  'couple-pointing-night': 'Groom pointing to the sky as the bride looks up at night',
  'couple-ritual-close': 'Bride and groom close together during a ritual, garlanded',
  'venkateswara-backdrop': 'Couple seated in prayer before a Venkateswara backdrop',
  'haldi-pots': 'Family pouring haldi from brass pots over the couple',
  'petal-throw-mandap': 'Rose petals flying over the couple as family showers blessings',
  'tender-forehead': 'Tender moment as the couple touch foreheads in wedding attire',
};

const shot = (name: string): Shot => ({
  name,
  alt: ALT[name] ?? ALT_FALLBACK,
  image: pic(name),
});

/* Hero — a strong vertical frame + an intimate wedding-day frame */
export const heroMain = shot('temple-doorway-sunset');
export const heroSecondary = shot('bride-talambralu');

/* Intro — "where our work takes us" (opens at home, in Hyderabad) */
export const places: Shot[] = [
  shot('charminar-couple'), // tall
  shot('petronas-hands'),   // small landscape
];

/* Intro — the "tradition" cascade: 4 overlapping wedding-day frames
   (P1 tall, P2 landscape, P3 tall, P4 portrait). */
export const tradition: Shot[] = [
  shot('bride-laughing-garland'), // P1 — tall portrait
  shot('petal-throw-mandap'),     // P2 — landscape
  shot('bw-rice-shower'),         // P3 — tall portrait
  shot('couple-ritual-close'),    // P4 — portrait
];

/* Trust band — the frame beside the "since 2002" story */
export const trustFrame = shot('wedding-mandap-gold');

/* Closing statement — two frames */
export const closing: Shot[] = [shot('moonrise-couple'), shot('temple-steps-lotus')];

/* The portfolio grid — the centrepiece. CSS columns fill top-to-bottom,
   so each third of this list becomes one column on desktop: every column
   mixes wedding-day rituals, portraits, sangeet nights and pre-weddings. */
export const grid: Shot[] = [
  // column 1
  'bride-garland-detail', 'mandap-ritual-blessing', 'bride-gold-portrait', 'sangeet-fireworks',
  'groom-talambralu', 'jeelakarra-bellam-hands', 'temple-tank-wide', 'bride-temple-jewellery',
  'couple-temple-lotus-night', 'tender-forehead', 'sangeet-floral-arch', 'bw-family-embrace',
  'charminar-jump', 'kalyanam-detail',
  // column 2
  'bride-shy-smile', 'mandap-crowd-blessings', 'red-saree-wind', 'sangeet-confetti',
  'bw-couple-spotlight', 'bride-palace-night', 'mehendi-detail', 'pellikuthuru-flower-shower',
  'groom-turban-portrait', 'yacht-embrace', 'haldi-pots', 'talambralu-laughter',
  'silhouette-pillars-sunset', 'jewellery-flatlay',
  // column 3
  'groom-rice-shower', 'couple-petal-glow', 'bonfire-shawl', 'bw-arch-silhouette',
  'venkateswara-backdrop', 'bridge-kiss-sky', 'saree-water-swirl', 'couple-pointing-night',
  'bw-garland-moment', 'hands-mandap', 'silhouette-kiss', 'rainbow-hills',
  'palace-lights-dusk', 'ritual-laughter',
].map(shot);

/* A few frames reused on secondary pages */
export const studioHero = shot('bride-bw-doorway');
export const studioWide = shot('temple-tank-wide');
export const experienceShots: Shot[] = [
  shot('mandap-ritual-blessing'), // Weddings
  shot('tea-garden-hug'),         // Pre-weddings
  shot('couple-palace-night'),    // Films
  shot('petronas-towers'),        // Destination
  shot('girl-banana-leaf'),       // Family, baby & maternity
];
export const contactHero = shot('lavender-hills');
