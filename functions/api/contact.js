/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Shared endpoint for both the general contact form (src/pages/contact.astro)
 * and the private-booking form (src/pages/private-bookings.astro) — the two
 * forms send slightly different field sets, so this handler builds the
 * email body generically from whatever fields are present rather than
 * assuming one shape. Forwards by email via Resend (https://resend.com).
 * Cloudflare Pages Functions run independently of the Astro build (Astro's
 * static output goes to /dist, this file deploys automatically from
 * /functions), so no Astro server adapter is needed.
 *
 * Required config (see README.md "Wiring the contact form" for exact commands):
 *   - Secret:  RESEND_API_KEY        (wrangler pages secret put)
 *   - Vars:    TO_EMAIL, FROM_EMAIL  (wrangler.toml [vars], or Pages dashboard)
 *
 * If RESEND_API_KEY isn't set yet, the function still validates input and
 * returns success (with a `delivered: false` flag) so the form keeps working
 * in the UI while the email integration is being wired up.
 *
 * TO_EMAIL default below is the real, verified `mailto:` address found on
 * the live site's Contact page (AUDIT.md §4) — OWNER CONFIRMATION REQUIRED
 * on spelling (see HANDOFF.md, Owner requirements #1), but it is a real
 * working address, not an invented one.
 *
 * FROM_EMAIL default deliberately uses Resend's own onboarding@resend.dev
 * sender rather than a @creativedynastyevents.com address: sending from the
 * real domain would require adding DNS records to it, which is explicitly
 * off-limits until the owner approves domain migration (see governing
 * rules in HANDOFF.md). Switch this once a verified sending domain exists.
 *
 * Spam: both forms include a hidden "company" honeypot field (real users
 * never see or fill it, most simple bots do). A non-empty honeypot returns
 * a fake success without sending anything, so bots get no signal about
 * what tripped it.
 */

const DEFAULT_TO_EMAIL = "creativedynastevents3@gmail.com";
const DEFAULT_FROM_EMAIL = "Creative Dynasty Website <onboarding@resend.dev>";

// Fields to leave out of the forwarded email body (internal/meta, not
// something a human reading the inquiry needs to see).
const OMIT_FROM_BODY = new Set(["name", "email", "company"]);

const FIELD_LABELS = {
  inquiryType: "Inquiry type",
  eventType: "Event type",
  guests: "Number of guests",
  date: "Preferred date",
  message: "Message",
};

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  const { name, email, company } = data ?? {};

  // Honeypot: real visitors never fill this hidden field. Pretend success
  // without doing anything, so automated submissions get no useful signal.
  if (company) {
    return json({ ok: true, delivered: false });
  }

  if (!name || !email) {
    return json({ error: "Name and email are required" }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Invalid email address" }, 400);
  }

  if (!env.RESEND_API_KEY) {
    // Not configured yet — don't break the form, just skip delivery.
    return json({ ok: true, delivered: false });
  }

  const toEmail = env.TO_EMAIL || DEFAULT_TO_EMAIL;
  const fromEmail = env.FROM_EMAIL || DEFAULT_FROM_EMAIL;

  const bodyLines = [`Name: ${name}`, `Email: ${email}`];
  for (const [key, value] of Object.entries(data)) {
    if (OMIT_FROM_BODY.has(key) || !value) continue;
    bodyLines.push(`${FIELD_LABELS[key] ?? key}: ${value}`);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `New inquiry from ${name}`,
      text: bodyLines.join("\n"),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend delivery failed", res.status, detail);
    return json({ error: "Email send failed" }, 502);
  }

  return json({ ok: true, delivered: true });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
