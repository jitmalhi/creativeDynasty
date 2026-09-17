/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Receives the booking inquiry form from src/components/Contact.astro and
 * forwards it by email via Resend (https://resend.com). Cloudflare Pages
 * Functions run independently of the Astro build (Astro's static output
 * goes to /dist, this file deploys automatically from /functions), so no
 * Astro server adapter is needed.
 *
 * Required config (see README.md "Wiring the contact form" for exact commands):
 *   - Secret:  RESEND_API_KEY        (wrangler pages secret put)
 *   - Vars:    TO_EMAIL, FROM_EMAIL  (wrangler.toml [vars], or Pages dashboard)
 *
 * If RESEND_API_KEY isn't set yet, the function still validates input and
 * returns success (with a `delivered: false` flag) so the form keeps working
 * in the UI while the email integration is being wired up.
 */

const DEFAULT_TO_EMAIL = "hello@creativedynastyevents.com";
const DEFAULT_FROM_EMAIL = "Creative Dynasty Website <bookings@creativedynastyevents.com>";

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  const { name, email, eventType, date, message } = data ?? {};

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
      subject: `New booking inquiry — ${eventType ?? "General"}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Event type: ${eventType ?? "—"}`,
        `Preferred date: ${date ?? "—"}`,
        "",
        message ?? "",
      ].join("\n"),
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
