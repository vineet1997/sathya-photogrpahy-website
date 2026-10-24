/**
 * Single source of truth for studio details, nav and anything still
 * awaiting confirmation from the client.
 *
 * Every value marked `TODO(client)` is a placeholder — see README
 * "Placeholders to swap before going live".
 */
export const site = {
  name: 'Sathya Photography',
  shortName: 'Sathya',
  tagline: 'Telugu weddings, told with heart — since 2002',
  // Homepage <title> after the name — the words couples actually search for.
  seoTitle: 'Wedding Photographers in Hyderabad',
  // Kept under ~155 characters so Google and WhatsApp show it in full.
  description:
    'Candid & traditional Telugu wedding photography and cinematic films since 2002. Hyderabad & Visakhapatnam, travelling anywhere. Check your date.',
  founded: 2002,
  email: 'sathyaphotography636@gmail.com',
  phone: { label: '+91 93460 10636', href: 'tel:+919346010636' },
  whatsapp: {
    number: '919346010636',
    message: "Hi Sathya Photography! We're getting married and would love to check your availability.",
  },
  instagram: { handle: '@sathyaphotography', url: 'https://www.instagram.com/sathyaphotography/' },
  youtube: 'https://www.youtube.com/channel/UCzmg-UvHIsZrceMvXmxGOXw',
  facebook: 'https://www.facebook.com/AUNITOFSTUDIOSAFASHIONOFPHOTOGRAPHY',
  address: {
    line1: 'Plot No. 506, Prashanth Nagar',
    line2: 'Vanasthalipuram, Hyderabad',
    region: 'Telangana',
    postcode: '500070',
    country: 'IN',
    geo: { lat: 17.3355064, lng: 78.5668905 },
    mapsUrl: 'https://www.google.com/maps/place/SATHYA+PHOTOGRAPHY/@17.3355064,78.5668905,17z',
    embedUrl: 'https://maps.google.com/maps?q=SATHYA%20PHOTOGRAPHY%2C%20Vanasthalipuram%2C%20Hyderabad&z=16&output=embed',
  },
  // TODO(client): confirm hours — Google lists "closes 9 pm"; opening time unknown.
  hours: 'Studio visits by appointment · until 9 pm',
  cities: ['Hyderabad', 'Visakhapatnam'],
  founder: {
    // TODO(client): confirm full name (X handle suggests "Sathya Gangadhar") + role.
    name: 'Sathya',
    role: 'Founder & Lead Photographer',
  },
  // TODO(client): numbers we can stand behind. Leave null to hide the stat.
  stats: {
    weddings: null as number | null,
    teamSize: null as number | null,
  },
  // Web3Forms access key — paste a key from web3forms.com to make the
  // contact form deliver to the studio inbox. Left blank → graceful demo mode.
  web3formsKey: '',
  url: 'https://sathya-photogrpahy.shutterselect.com',
} as const;

export const whatsappHref = (text: string = site.whatsapp.message) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(text)}`;

export const nav = [
  { label: 'Portfolio', href: '/#work' },
  { label: 'The Studio', href: '/the-studio/' },
  { label: 'Experience', href: '/experience/' },
  { label: 'Contact', href: '/contact/' },
] as const;

/**
 * Wedding films from the studio's YouTube channel. The first is featured.
 * `poster` is a file in src/assets/films/ (cropped from the YouTube thumbnail).
 */
export const films = [
  { couple: 'Preethi + Vishal', kind: 'Wedding film', youtubeId: 'C2Hsu-IwE-w', poster: 'preethi-vishal' },
  { couple: 'Sreeja & Goutham', kind: 'Wedding story', youtubeId: '20Vzwkghnc4', poster: 'sreeja-goutham' },
  { couple: 'Dr Sravanthi & Dr Abhi', kind: 'Wedding film', youtubeId: 'o7qwb1TOn9I', poster: 'sravanthi-abhi' },
] as const;

/** Real client words only — never invent these. */
export const testimonials = [
  {
    quote:
      'Thank you so, so, so, so much! The photos are absolutely beautiful — we love every single one of them. Thank you for capturing the day so perfectly. It is incredible.',
    by: 'Lokesh & Sravani',
  },
  // TODO(client): 2–3 more testimonials, with the couple's permission.
] as const;
