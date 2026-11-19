import { z } from "zod";
export const quoteSchema = z.object({
  name: z.string().trim().min(3, "Informe seu nome completo."),
  phone: z.string().refine(v => v.replace(/\D/g, "").length >= 10, "Informe um WhatsApp válido com DDD."),
  email: z.union([z.literal(""), z.string().email("Informe um e-mail válido.")]),
  company: z.string(),
  product: z.string().trim().min(2, "Informe o produto desejado."),
  quantity: z.coerce.number().int("Use uma quantidade inteira.").min(1, "A quantidade deve ser pelo menos 1."),
  deadline: z.string(),
  description: z.string().trim().min(10, "Descreva sua ideia com pelo menos 10 caracteres."),
});
export type QuoteData = z.infer<typeof quoteSchema>;
export function quoteMessage(data: QuoteData) {
  return `Olá, Nós 3D! Gostaria de solicitar um orçamento.\n\nNome: ${data.name}\nWhatsApp: ${data.phone}\nE-mail: ${data.email || "Não informado"}\nEmpresa ou segmento: ${data.company || "Não informado"}\nProduto: ${data.product}\nQuantidade: ${data.quantity}\nPrazo desejado: ${data.deadline ? data.deadline.split("-").reverse().join("/") : "A combinar"}\n\nPersonalização:\n${data.description}`;
}