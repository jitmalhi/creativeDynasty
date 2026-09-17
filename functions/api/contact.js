/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Receives the booking inquiry form from src/components/Contact.astro and
 * forwards it by email. Cloudflare Pages Functions run independently of the
 * Astro build (Astro's static output goes to /dist, this file is deployed
 * automatically from /functions), so no Astro server adapter is needed.
 *
 * TODO before going live:
 *   1. Choose an email provider (Resend, Postmark, SendGrid, etc.) and add
 *      its API key as a Cloudflare Pages secret, e.g.:
 *        wrangler pages secret put RESEND_API_KEY
 *   2. Uncomment and adapt the fetch() call below for your provider.
 *   3. Set TO_EMAIL / FROM_EMAIL as plain env vars in the Pages project
 *      settings (or hardcode them here).
 *
 * Until step 2 is done, this function validates the payload and returns
 * success without actually sending an email, so the form works end-to-end
 * in the UI while the email integration is wired up.
 */

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

  // --- Example wiring for Resend (https://resend.com) ---
  // if (env.RESEND_API_KEY) {
  //   const res = await fetch("https://api.resend.com/emails", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${env.RESEND_API_KEY}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       from: "Creative Dynasty Website <bookings@creativedynastyevents.com>",
  //       to: ["hello@creativedynastyevents.com"],
  //       reply_to: email,
  //       subject: `New booking inquiry — ${eventType ?? "General"}`,
  //       text: `Name: ${name}\nEmail: ${email}\nEvent type: ${eventType}\nPreferred date: ${date}\n\n${message}`,
  //     }),
  //   });
  //   if (!res.ok) return json({ error: "Email send failed" }, 502);
  // }

  return json({ ok: true });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
