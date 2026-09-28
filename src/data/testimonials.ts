export type Testimonial = {
  quote: string;
  /** First-name-only attribution, or null if the live site didn't attribute it. */
  name: string | null;
};

// VERIFIED (AUDIT.md §4) — all 6 quotes copied verbatim from the live site.
// 3 are attributed by first name only (Home page); 3 are unattributed
// (Events page). Do not invent names, companies, or titles for any of
// these — use only the attribution level actually found.
export const testimonials: Testimonial[] = [
  {
    name: "Erica",
    quote:
      "My sons did not want to leave! They had so much fun! We will be back to more of these events for sure",
  },
  {
    name: "Leah",
    quote:
      "We had so much fun! My daughter loved the cotton candy and the popcorn! We have never been to an event like this before. Let me know when you have another one, we will be back.",
  },
  {
    name: "Christine",
    quote: "This was so much fun and the food was amazing!",
  },
  {
    name: null,
    quote: "Such an amazing vibe and experience. I'll definitely be back.",
  },
  {
    name: null,
    quote: "I came alone and left with connections. This was everything.",
  },
  {
    name: null,
    quote: "Creative Dynasty events are always a good time. Highly recommend.",
  },
];
