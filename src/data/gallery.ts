export type GalleryItem = {
  src: string;
  alt: string;
  category: "Signature" | "Social" | "Family" | "Private";
};

// VERIFIED (AUDIT.md §4): these categories match the live site's real
// Events page filters exactly (ALL / SIGNATURE / SOCIAL / FAMILY / PRIVATE).
// The pre-audit build used invented categories ("Sip & Paint", "Private
// Socials", "Galas") that don't correspond to anything on the real site —
// those have been replaced, not renamed. Currently documentation-only —
// Checkpoint 5 removed the gallery's interactive category filter (see
// Gallery.astro) in favor of a curated editorial layout, so nothing
// imports this array today, but it's kept as the reference taxonomy.
export const galleryCategories = ["All", "Signature", "Social", "Family", "Private"] as const;

// UNSUPPORTED/FABRICATED CONTENT REMOVED: the previous alt text described
// specific fictional scenes ("Guests connecting over cocktails", "Live
// music at a Creative Dynasty gala") that don't correspond to any approved,
// real Creative Dynasty Events photo. Every item below is a neutral SVG
// placeholder — see HANDOFF.md "Creative Asset Plan" and Owner requirements
// #10. AUDIT.md identified 9 real photos on the live Wix site, but none are
// yet approved for reuse here. Do not substitute AI-generated event imagery
// for these slots — only approved real Creative Dynasty Events photography
// belongs in this section, per the project's image-strategy rules.
export const gallery: GalleryItem[] = [
  { src: "/images/gallery/placeholder-1.svg", alt: "Placeholder — awaiting approved Creative Dynasty Events photography (Signature)", category: "Signature" },
  { src: "/images/gallery/placeholder-2.svg", alt: "Placeholder — awaiting approved Creative Dynasty Events photography (Social)", category: "Social" },
  { src: "/images/gallery/placeholder-3.svg", alt: "Placeholder — awaiting approved Creative Dynasty Events photography (Family)", category: "Family" },
  { src: "/images/gallery/placeholder-4.svg", alt: "Placeholder — awaiting approved Creative Dynasty Events photography (Private)", category: "Private" },
  { src: "/images/gallery/placeholder-5.svg", alt: "Placeholder — awaiting approved Creative Dynasty Events photography (Signature)", category: "Signature" },
  { src: "/images/gallery/placeholder-6.svg", alt: "Placeholder — awaiting approved Creative Dynasty Events photography (Social)", category: "Social" },
];
