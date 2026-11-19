import keychain from "@/assets/product-0.asset.json";
import beauty from "@/assets/product-1.asset.json";
import organizer from "@/assets/product-2.asset.json";
import corporate from "@/assets/product-3.asset.json";
import sensory from "@/assets/product-4.asset.json";
import custom from "@/assets/product-5.asset.json";

export const categories = ["Brindes corporativos", "Estética e beleza", "Acessórios personalizados", "Peças sob demanda", "Produtos criativos e sensoriais"] as const;
export type Product = { slug: string; name: string; category: string; description: string; image: string; customization: string[] };
export const products: Product[] = [
  { slug:"chaveiro-personalizado", name:"Chaveiro personalizado", category:categories[2], description:"Sua identidade em um detalhe que acompanha todos os dias.", image:keychain.url, customization:["Nome, marca ou símbolo em relevo", "Cores e formatos personalizados", "Dimensões definidas para seu projeto"] },
  { slug:"porta-escovinha", name:"Porta-escovinha para cílios", category:categories[1], description:"Organização e personalidade para o seu espaço de beleza.", image:beauty.url, customization:["Cores para combinar com seu espaço", "Nome ou logotipo", "Quantidade de divisórias sob consulta"] },
  { slug:"organizador", name:"Organizador de acessórios", category:categories[2], description:"Um lugar para cada coisa, com um design feito para você.", image:organizer.url, customization:["Divisórias e dimensões sob medida", "Cores personalizadas", "Identificação em relevo"] },
  { slug:"brinde-corporativo", name:"Brinde corporativo personalizado", category:categories[0], description:"Peças úteis e originais que levam sua marca mais longe.", image:corporate.url, customization:["Aplicação da identidade da marca", "Cores institucionais", "Formato adaptado à sua campanha"] },
  { slug:"cubo-sensorial", name:"Cubo sensorial", category:categories[4], description:"Texturas, formas e criatividade para explorar com as mãos.", image:sensory.url, customization:["Combinação de cores", "Texturas e formas", "Dimensões sob consulta"] },
  { slug:"peca-sob-demanda", name:"Peça personalizada sob demanda", category:categories[3], description:"Do conceito à peça: soluções para necessidades específicas.", image:custom.url, customization:["Geometria e medidas do projeto", "Avaliação de viabilidade técnica", "Material e acabamento sob consulta"] },
];
export function filterProducts(query: string, category: string) {
  const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return products.filter(p => normalize(p.name).includes(normalize(query.trim())) && (category === "Todos" || p.category === category));
}