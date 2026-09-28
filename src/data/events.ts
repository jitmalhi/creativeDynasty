// Event status states, per the project's Event Logic rules. Never show a
// registration action unless `status` is genuinely "registration-open" AND
// registrationHref is a real, confirmed link.
export type EventStatus =
  | "coming-soon" // date/details known but registration isn't open yet
  | "registration-open" // confirmed date + a real place to register
  | "registration-closed" // was open, no longer accepting registrations
  | "event-complete"; // already happened

export type EventItem = {
  title: string;
  category: "After Dark" | "Little Creators" | "The Collective";
  /** Confirmed display date/time only — never an estimate or placeholder. */
  date: string;
  location?: string;
  /** Display price string, e.g. "$45" — omit entirely if not confirmed. */
  price?: string;
  status: EventStatus;
  /** Only set when status is "registration-open" and this is a real, working link. */
  registrationHref?: string;
  description: string;
};

// UNSUPPORTED/FABRICATED CONTENT REMOVED (reconciliation pass, 2026-09-28):
// this file previously contained three invented events ("After Dark: Bold
// Strokes", "Little Creators: Autumn Palette", "The Collective: Open Studio
// Social") with made-up dates and fake "#" registration links. None of that
// was supported by AUDIT.md and has been deleted, not hidden or renamed.
//
// VERIFIED (AUDIT.md §2.10 / §4): as of the audit, the live site's Events
// page shows zero scheduled public events — the literal text on the page is
// "No events at the moment". This array is intentionally empty for the same
// reason. Owner requirements #5–#6 (HANDOFF.md) ask the owner to confirm
// this is still accurate before launch, and to supply real event data
// (title, confirmed date, location, price, registration link) once any
// event is actually scheduled.
//
// Do not populate this array with placeholder, estimated, or invented
// events. Add an entry only when every field you fill in is confirmed.
export const events: EventItem[] = [];
