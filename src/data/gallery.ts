export type GalleryItem = {
  src: string;
  alt: string;
};

// Real Creative Dynasty Events photography, provided by the owner with
// permission to use (confirmed 2026-10-05). Web-sized copies are in
// public/images/photos/ (1600px long edge, JPEG q82).
//
// Alt text describes only what is visible in each photo, plus the owner's
// date grouping where she supplied one. No names, no invented captions.
//
// The first item is the feature image (landscape, shown full width). The
// rest form the supporting grid. The hero photo (A-1000444433) is not
// repeated here.
export const gallery: GalleryItem[] = [
  {
    src: "/images/photos/E-1000624201.jpg",
    alt: "Two guests seated at painting easels, one smiling, during a Creative Dynasty paint night",
  },
  {
    src: "/images/photos/A-1000444435.jpg",
    alt: "Close-up of a tulip painting in progress at a paint night, November 2025",
  },
  {
    src: "/images/photos/B-1000512326.jpg",
    alt: "Two guests holding up their wine-glass paintings at a paint night, February 2026",
  },
  {
    src: "/images/photos/A-1000444501.jpg",
    alt: "Two guests posing with their tulip-and-rose paintings in front of a gold and black balloon wall, November 2025",
  },
  {
    src: "/images/photos/B-1000512322.jpg",
    alt: "Guest with a wine-glass and rose painting beside the event's large painted backdrop, February 2026",
  },
  {
    src: "/images/photos/E-1000624213.jpg",
    alt: "Guest holding up a painting of an embracing couple at a self-care paint night",
  },
];
