export const WHATSAPP_NUMBER = "5531999188040";
export const INSTAGRAM_URL = "";
export const CONTACT_EMAIL = "";

export function whatsappUrl(message: string, number = WHATSAPP_NUMBER): string | null {
  if (!/^\d{10,15}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function productMessage(name: string, quantity: number) {
  return `Olá, Nós 3D! Gostaria de solicitar um orçamento.\nProduto: ${name}\nQuantidade: ${quantity}\nPodemos conversar sobre a personalização?`;
}

export function pageHead(title: string, description: string) {
  return { meta: [
    { title: `${title} | Nós 3D` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | Nós 3D` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] };
}