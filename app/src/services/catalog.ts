import { products } from "@/data/products";

// Replace this browser-safe adapter when the company's existing data source is connected.
export const catalogService = {
  list: () => products,
  get: (slug: string) => products.find(product => product.slug === slug),
};