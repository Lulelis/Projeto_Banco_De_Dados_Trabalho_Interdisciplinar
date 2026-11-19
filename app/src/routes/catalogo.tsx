import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, SearchX } from "lucide-react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { PageIntro } from "@/components/page-intro";
import { categories, filterProducts } from "@/data/products";
import { pageHead } from "@/lib/site-config";
export const Route = createFileRoute("/catalogo")({ validateSearch:zodValidator(z.object({categoria:z.string().optional()})), head:() => pageHead("Catálogo de produtos", "Explore ideias de brindes, acessórios e peças impressas em 3D. Catálogo demonstrativo da Nós 3D, com personalização sob consulta."), component:Catalog });
function Catalog() {
  const [query,setQuery]=useState("");
  const {categoria}=Route.useSearch();
  const category=categories.some(c => c === categoria) ? categoria || "Todos" : "Todos";
  const navigate=useNavigate({from:"/catalogo"});
  const items=filterProducts(query,category);
  return <><PageIntro kicker="Criatividade que se torna produto" title="Catálogo de possibilidades." description="Explore nossas ideias e imagine cada peça com a sua identidade. Os produtos abaixo são demonstrativos, sem preços ou disponibilidade definidos." /><section className="section"><div className="site-container"><div className="relative max-w-lg"><Search className="absolute left-4 top-3.5 size-4 text-muted-foreground" /><input type="search" aria-label="Buscar produtos" value={query} onChange={e => setQuery(e.target.value)} placeholder="Encontre uma ideia pelo nome..." className="h-12 w-full rounded-md border border-input bg-background pl-11 pr-4 text-sm focus:outline-2 focus:outline-ring" /></div><div className="filters" aria-label="Filtrar por categoria">{["Todos",...categories].map(c => <Button key={c} variant={c===category ? "default":"outline"} size="sm" aria-pressed={c===category} onClick={() => navigate({search:{categoria:c==="Todos" ? undefined:c}})}>{c}</Button>)}</div><p className="mb-6 text-xs text-muted-foreground" aria-live="polite">{items.length} {items.length===1 ? "produto demonstrativo":"produtos demonstrativos"}</p>{items.length ? <div className="product-grid">{items.map(p => <ProductCard key={p.slug} product={p} />)}</div> : <div className="py-16 text-center"><SearchX className="mx-auto mb-5 size-10 text-muted-foreground" /><h2 className="text-xl font-bold text-primary">Nenhum produto encontrado.</h2><p className="my-4 text-sm text-muted-foreground">Tente outro nome ou explore todas as categorias.</p><Button variant="outline" onClick={() => {setQuery(""); navigate({search:{categoria:undefined}});}}>Limpar filtros</Button></div>}</div></section></>;
}