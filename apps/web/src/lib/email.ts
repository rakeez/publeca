import { Resend } from "resend";
import { qrPngBuffer } from "@publeca/tickets";

type OrderLike = { buyerName: string; buyerEmail: string; currency: string };
type TicketLike = { id: string; qrToken: string; attendeeName: string };
type EventLike = { title: string; venue: string | null; startsAt: Date; slug: string };

const resendKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM ?? "Publeca <tickets@publeca.com>";
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

/**
 * Sends the ticket email with one QR per ticket attached. If RESEND_API_KEY is not
 * set (e.g. local dev before email is configured), it logs and no-ops — issuance
 * still succeeds and tickets remain viewable at /t/[token].
 */
export async function sendTicketEmail(
  order: OrderLike,
  tickets: TicketLike[],
  event: EventLike
) {
  if (!resendKey) {
    console.warn(
      `[email] RESEND_API_KEY not set — skipping email to ${order.buyerEmail}. ` +
        `Tickets: ${tickets.map((t) => `${appUrl}/t/${t.qrToken}`).join(", ")}`
    );
    return;
  }

  const resend = new Resend(resendKey);

  const attachments = await Promise.all(
    tickets.map(async (t, i) => ({
      filename: `ticket-${i + 1}.png`,
      content: await qrPngBuffer(t.qrToken),
    }))
  );

  const when = new Date(event.startsAt).toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const ticketLinks = tickets
    .map(
      (t, i) =>
        `<li><a href="${appUrl}/t/${t.qrToken}">View ticket ${i + 1}</a> — ${t.attendeeName}</li>`
    )
    .join("");

  await resend.emails.send({
    from,
    to: order.buyerEmail,
    subject: `Your ticket(s) for ${event.title}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto">
        <h1 style="color:#635bff">You're going to ${event.title}! 🎟️</h1>
        <p>Hi ${order.buyerName},</p>
        <p><strong>When:</strong> ${when}<br/>
           ${event.venue ? `<strong>Where:</strong> ${event.venue}` : ""}</p>
        <p>Your QR ticket${tickets.length > 1 ? "s are" : " is"} attached. Show ${
          tickets.length > 1 ? "them" : "it"
        } at the door to be scanned in.</p>
        <ul>${ticketLinks}</ul>
        <p style="color:#64748b;font-size:13px">Powered by Publeca</p>
      </div>
    `,
    attachments,
  });
}

type ReminderTicket = { attendeeName: string; attendeeEmail: string; qrToken: string };

/** Pre-event reminder to a single ticket holder. No-op if Resend isn't configured. */
export async function sendReminderEmail(ticket: ReminderTicket, event: EventLike) {
  if (!resendKey) {
    console.warn(`[email] reminder skipped (no RESEND_API_KEY) for ${ticket.attendeeEmail}`);
    return;
  }
  const resend = new Resend(resendKey);
  const when = new Date(event.startsAt).toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
  });

  await resend.emails.send({
    from,
    to: ticket.attendeeEmail,
    subject: `Reminder: ${event.title} is coming up`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto">
        <h1 style="color:#635bff">See you soon at ${event.title} 🎉</h1>
        <p>Hi ${ticket.attendeeName},</p>
        <p>This is a friendly reminder for your upcoming event.</p>
        <p><strong>When:</strong> ${when}<br/>
           ${event.venue ? `<strong>Where:</strong> ${event.venue}` : ""}</p>
        <p><a href="${appUrl}/t/${ticket.qrToken}" style="color:#635bff">Open your ticket →</a></p>
        <p style="color:#64748b;font-size:13px">Powered by Publeca</p>
      </div>
    `,
  });
}
