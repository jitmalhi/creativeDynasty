// Booking-page FAQ. Intentionally EMPTY.
//
// Add question/answer pairs here only once the owner has supplied them, or
// once an answer is genuinely not already shown on the page. Restating the
// lists already on the page (what's included, who it's for, how it works)
// was the redundancy Checkpoint 4 flagged, so those are not used here.
//
// While this array is empty, the FAQ section on /private-bookings does not
// render at all — nothing placeholder-like appears on the live page.
export type FaqItem = { question: string; answer: string };

export const bookingFaq: FaqItem[] = [];
