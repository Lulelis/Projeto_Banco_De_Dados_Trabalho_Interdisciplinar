import { describe, expect, it } from "vitest";
import { WHATSAPP_NUMBER, productMessage, whatsappUrl } from "@/lib/site-config";
import { quoteMessage, quoteSchema } from "@/lib/quote";
import { filterProducts } from "@/data/products";

describe("WhatsApp and quotation rules", () => {
  it("uses the official WhatsApp provided by the company", () => {
    expect(WHATSAPP_NUMBER).toBe("5531999188040");
    expect(whatsappUrl("Olá!")).toBe("https://wa.me/5531999188040?text=Ol%C3%A1!");
  });
  it("does not create a link when the number is not configured", () => {
    expect(whatsappUrl("Pedido", "")).toBeNull();
  });
  it("includes the selected product name and quantity", () => {
    const message = productMessage("Chaveiro personalizado", 25);
    expect(message).toContain("Produto: Chaveiro personalizado");
    expect(message).toContain("Quantidade: 25");
  });
  const valid = {name:"Pessoa Teste",phone:"31999999999",email:"",company:"",product:"Chaveiro",quantity:1,deadline:"",description:"Chaveiros com a marca da empresa"};
  it("requires name, WhatsApp, product and customization description", () => {
    for (const field of ["name","phone","product","description"]) {
      expect(quoteSchema.safeParse({...valid,[field]:""}).success).toBe(false);
    }
  });
  it("requires a positive integer quantity", () => {
    expect(quoteSchema.safeParse({...valid,quantity:0}).success).toBe(false);
    expect(quoteSchema.safeParse({...valid,quantity:1.5}).success).toBe(false);
    expect(quoteSchema.safeParse({...valid,quantity:1}).success).toBe(true);
  });
  it("validates optional email when provided", () => {
    expect(quoteSchema.safeParse({...valid,email:"invalido"}).success).toBe(false);
    expect(quoteSchema.safeParse(valid).success).toBe(true);
  });
  it("formats the complete quotation for WhatsApp", () => {
    const message=quoteMessage({...valid,deadline:"2026-12-01",quantity:25});
    expect(message).toContain("Quantidade: 25");
    expect(message).toContain("Prazo desejado: 01/12/2026");
    expect(message).toContain(valid.description);
  });
});
describe("Catalog filtering", () => {
  it("combines name search and selected category", () => {
    expect(filterProducts("cilios", "Estética e beleza").map(p => p.slug)).toEqual(["porta-escovinha"]);
    expect(filterProducts("cilios", "Brindes corporativos")).toEqual([]);
    expect(filterProducts("", "Todos")).toHaveLength(6);
  });
});