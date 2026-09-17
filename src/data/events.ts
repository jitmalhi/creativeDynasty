export type EventItem = {
  title: string;
  date: string;
  category: "After Dark" | "Little Creators" | "The Collective";
  description: string;
  href: string;
};

// TODO: Replace with real upcoming dates and ticket/Eventbrite links.
export const events: EventItem[] = [
  {
    title: "After Dark: Bold Strokes",
    date: "Sat, Oct 18 · 7:00 PM",
    category: "After Dark",
    description:
      "Sip, paint, and dine under low light — a full sensory night with live music and a guided canvas.",
    href: "#",
  },
  {
    title: "Little Creators: Autumn Palette",
    date: "Sun, Oct 26 · 11:00 AM",
    category: "Little Creators",
    description:
      "A family-friendly creative session built for young artists and the grown-ups who bring them.",
    href: "#",
  },
  {
    title: "The Collective: Open Studio Social",
    date: "Fri, Nov 7 · 6:30 PM",
    category: "The Collective",
    description:
      "Community, collaboration, and connection — a shared creative evening with local makers.",
    href: "#",
  },
];
