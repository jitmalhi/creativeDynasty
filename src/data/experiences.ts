// VERIFIED (AUDIT.md §4) — all copy below is taken verbatim or near-verbatim
// from the live site's three experience detail pages and the Private
// Bookings page. Do not invent pricing, capacity, turnaround times, or any
// detail not present in AUDIT.md. Slugs are new (clean URLs for the
// rebuild) — the original live-site slugs are documented in AUDIT.md §6 for
// the eventual redirect map.
export type Experience = {
  slug: string;
  emoji: string;
  name: string;
  tagline: string;
  /** Placeholder — awaiting approved Creative Dynasty Events photography (HANDOFF.md Creative Asset Plan). */
  image: string;
  overview: string;
  whatToExpect: string[];
  whoItsFor: string[];
  whatsIncluded: string[];
  cta: string;
  /**
   * Presentation-only visual-identity fields (Checkpoint 5) — no new
   * colors, only the existing gold/wine accent tokens already used
   * sitewide. Gives the shared experience-page template subtle,
   * per-experience variation without three separate page architectures.
   * See HANDOFF.md "Checkpoint 5" for the reasoning behind each value.
   */
  accent: "terracotta" | "teal";
  imageSide: "left" | "right";
  /** Which two-column block reads first: audience-first ("who") or atmosphere-first ("expect"). */
  leadWith: "who" | "expect";
};

export const experiences: Experience[] = [
  {
    slug: "after-dark",
    image: "/images/experiences/after-dark.svg",
    emoji: "❤️‍🔥",
    name: "After Dark Experience",
    tagline: "Bold. Expressive. Unforgettable.",
    overview:
      "This is not your typical paint night. After Dark is an elevated experience where creativity meets atmosphere. With music, energy, and a curated meal included, it's designed for those looking to unwind, connect, and enjoy something different.",
    whatToExpect: [
      "Guided paint experience",
      "Music + high-energy atmosphere",
      "Curated meal included",
      "Social, engaging environment",
      "A night designed for connection and fun",
    ],
    whoItsFor: [
      "Adults 21+",
      "Date nights",
      "Girls' night / group outings",
      "Anyone looking for a unique night out",
    ],
    whatsIncluded: [
      "All painting materials",
      "Step-by-step guidance",
      "Meal included",
      "Full experience setup",
    ],
    cta: "Book This Experience",
    // Moody/adults-only tone ("Bold. Expressive. Unforgettable.") — wine
    // accent, atmosphere-first framing, image on the right (the default
    // reading order for the first card in the set).
    accent: "terracotta",
    imageSide: "right",
    leadWith: "expect",
  },
  {
    slug: "little-creators",
    image: "/images/experiences/little-creators.svg",
    emoji: "🎨",
    name: "Little Creators Experience",
    tagline: "Creative moments for families to connect and grow.",
    overview:
      "Designed with families in mind, Little Creators creates space for children and parents to explore creativity together. This experience is fun, interactive, and welcoming for all skill levels.",
    whatToExpect: [
      "Guided painting session",
      "Fun, kid-friendly environment",
      "Interactive and engaging activities",
      "Meal included for both children and parents",
      "A relaxed and supportive space",
    ],
    whoItsFor: ["Parents & children", "Families", "Community groups", "Youth programs"],
    whatsIncluded: ["All materials", "Guided instruction", "Meal included", "Creative, safe environment"],
    cta: "Book This Experience",
    // Warm/family tone — gold accent, audience-first framing ("this is for
    // families like yours" before logistics), image leads on the left for
    // a welcoming, visual-first first impression.
    accent: "teal",
    imageSide: "left",
    leadWith: "who",
  },
  {
    slug: "the-collective",
    image: "/images/experiences/the-collective.svg",
    emoji: "✨",
    name: "The Collective Experience",
    tagline: "Where creativity meets connection and collaboration.",
    overview:
      "The Collective Experience is designed to bring people together, whether for networking, team building, or community engagement. It blends creativity with conversation to create meaningful interaction in a relaxed environment.",
    whatToExpect: [
      "Guided paint experience",
      "Structured or open networking",
      "Curated meal included",
      "Engaging group atmosphere",
      "Space for collaboration and connection",
    ],
    whoItsFor: ["Entrepreneurs & creatives", "Corporate teams", "Community groups", "Organizations"],
    whatsIncluded: ["All materials", "Guided experience", "Meal included", "Customizable format"],
    cta: "Submit a Booking Request",
    // Networking/collaboration tone — gold accent (distinct from After
    // Dark's wine), audience-first framing (who you'll meet/network with
    // is the draw), image on the right to differ from Little Creators.
    accent: "teal",
    imageSide: "right",
    leadWith: "who",
  },
];

export function getExperience(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}
