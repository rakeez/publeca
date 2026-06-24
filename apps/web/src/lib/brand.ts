// Central brand + contact constants.

export const WHATSAPP_NUMBER = "94753650002";

export function whatsappUrl(message = "Hi Publeca, I'd like to know more about your event services.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const CONTACT = {
  whatsappDisplay: "+94 75 365 0002",
  email: "hello@publeca.com",
};
