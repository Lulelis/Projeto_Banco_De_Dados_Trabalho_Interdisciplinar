import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Box, Gift, Fingerprint, HeartHandshake, Layers3, MapPin, Settings2, Sparkles, WandSparkles } from "lucide-react";
import hero from "@/assets/hero.asset.json";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { ProductCard } from "@/components/product-card";
import { CtaBand } from "@/components/cta-band";
import { categories } from "@/data/products";
import { catalogService } from "@/services/catalog";
import { pageHead } from "@/lib/site-config";

export const Route = createFileRoute("/")({ head: () => pageHead("Suas ideias ganham forma", "Impressão 3D FDM, brindes e produtos personalizados em Belo Horizonte. Conheça a Nós 3D e transforme sua ideia em uma peça única."), component: Index });
const categoryIcons = [Gift,Sparkles,Fingerprint,Settings2,Box];
function Index() {
  return <>
    <section className="hero"><img className="hero-image" src={hero.url} alt="Composição demonstrativa de peças impressas em 3D: vaso azul, escultura vermelha e organizador branco" width="1672" height="940" fetchPriority="high" /><div className="site-container hero-content"><div className="hero-copy"><p className="eyebrow">Nós 3D · Impressão e personalização</p><h1>Suas ideias<br />ganham <span>forma.</span></h1><p className="hero-description">Transformamos criatividade em produtos reais. Impressão 3D personalizada para marcas, negócios e pessoas.</p><div className="hero-actions"><Button asChild variant="cta"><Link to="/catalogo">Explorar produtos <ArrowRight /></Link></Button><WhatsAppButton variant="outline">Solicitar orçamento <ArrowUpRight /></WhatsAppButton></div><p className="hero-note"><MapPin className="size-3.5" />Feito em Belo Horizonte. Criado para você.</p></div></div></section>
    <section className="feature-strip" aria-label="Nossos diferenciais"><div className="site-container feature-strip-inner">{[{icon:Fingerprint,text:"Personalização sob demanda"},{icon:Gift,text:"Soluções para sua empresa"},{icon:Layers3,text:"Produção com impressão 3D"},{icon:HeartHandshake,text:"Atendimento personalizado"}].map(f => <div className="feature-item" key={f.text}><f.icon strokeWidth={1.6} /><span>{f.text}</span></div>)}</div></section>
    <section className="section"><div className="site-container"><div className="section-heading"><div><p className="section-kicker">Possibilidades em cada camada</p><h2>Pequenas peças. Grandes ideias.</h2><p className="section-description">Inspire-se em produtos que podem ganhar a sua identidade.</p></div><Button asChild variant="link" className="p-0 text-xs"><Link to="/catalogo">Conhecer o catálogo <ArrowRight /></Link></Button></div><div className="product-grid">{catalogService.list().slice(0,3).map(p => <ProductCard key={p.slug} product={p} />)}</div><p className="mt-5 text-[10px] text-muted-foreground">Imagens e produtos demonstrativos. Cada projeto é avaliado e personalizado sob consulta.</p></div></section>
    <section className="section bg-secondary"><div className="site-container"><div className="section-heading"><div><p className="section-kicker">Um universo de possibilidades</p><h2>O que vamos criar juntos?</h2></div></div><div className="category-list">{categories.map((c,i) => { const Icon=categoryIcons[i] ?? Box; return <Link key={c} to="/catalogo" search={{categoria:c}} className="category-item"><Icon size={25} strokeWidth={1.5} /><span>{c}</span><ArrowUpRight className="size-4 self-end" /></Link>; })}</div></div></section>
    <section className="section"><div className="site-container"><div className="section-heading"><div><p className="section-kicker">Da ideia ao objeto</p><h2>Seu projeto, camada por camada.</h2><p className="section-description">Um processo próximo e cuidadoso, do primeiro contato à entrega.</p></div><WandSparkles className="size-8 text-action" strokeWidth={1.5} /></div><div className="process-grid">{[{title:"Conte sua ideia.",text:"Compartilhe o que você imagina e o que precisa."},{title:"Definimos a personalização.",text:"Alinhamos formato, cores e os detalhes do seu projeto."},{title:"Produzimos sua peça.",text:"Sua ideia ganha forma com a tecnologia de impressão 3D."},{title:"Combinamos a entrega.",text:"Definimos juntos a melhor forma de receber seu pedido."}].map((s,i) => <div key={s.title}><div className="process-number">0{i+1}</div><h3>{s.title}</h3><p>{s.text}</p></div>)}</div></div></section>
    <CtaBand />
  </>;
}
