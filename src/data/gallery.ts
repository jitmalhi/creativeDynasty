export type GalleryItem = {
  src: string;
  alt: string;
  category: "Sip & Paint" | "Private Socials" | "Galas";
};

// TODO: Swap placeholder images for real event photography.
// Drop files into /public/images/gallery/ and update src to "/images/gallery/<file>".
export const galleryCategories = ["All", "Sip & Paint", "Private Socials", "Galas"] as const;

export const gallery: GalleryItem[] = [
  { src: "/images/gallery/placeholder-1.svg", alt: "Guests painting together at an After Dark event", category: "Sip & Paint" },
  { src: "/images/gallery/placeholder-2.svg", alt: "Candlelit table setting at a private social", category: "Private Socials" },
  { src: "/images/gallery/placeholder-3.svg", alt: "Live music at a Creative Dynasty gala", category: "Galas" },
  { src: "/images/gallery/placeholder-4.svg", alt: "Close-up of a finished canvas from a paint night", category: "Sip & Paint" },
  { src: "/images/gallery/placeholder-5.svg", alt: "Guests connecting over cocktails", category: "Private Socials" },
  { src: "/images/gallery/placeholder-6.svg", alt: "Gala lighting and stage setup", category: "Galas" },
];
