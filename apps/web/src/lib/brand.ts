// Central brand + contact constants.

export const WHATSAPP_NUMBER = "94753650002";

export function whatsappUrl(message = "Hi Publeca, I'd like to talk about growing my business.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const CONTACT = {
  whatsappDisplay: "+94 75 365 0002",
  email: "hello@publeca.com",
};

export function mailtoUrl(subject: string, body = "") {
  const q = new URLSearchParams({ subject, body }).toString().replace(/\+/g, "%20");
  return `mailto:${CONTACT.email}?${q}`;
}

/** Resolve a content CTA to a link: explicit href, email, or (default) WhatsApp. */
export function ctaHref(cta: { label: string; message: string; channel?: "whatsapp" | "email"; href?: string }) {
  if (cta.href) return cta.href;
  if (cta.channel === "email") return mailtoUrl(cta.label, cta.message);
  return whatsappUrl(cta.message);
}

export function isExternalCta(cta: { href?: string; channel?: "whatsapp" | "email" }) {
  return !cta.href && cta.channel !== "email";
}
