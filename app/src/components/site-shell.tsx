import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingWhatsApp, WhatsAppButton } from "@/components/whatsapp-button";

const nav = [{ to:"/", label:"Início" }, { to:"/catalogo", label:"Catálogo" }, { to:"/personalize", label:"Personalize" }, { to:"/sobre", label:"Sobre Nós" }, { to:"/contato", label:"Contato" }] as const;
export function Wordmark() { return <span className="wordmark">nós<span>3D</span><small>IDEIAS QUE GANHAM FORMA</small></span>; }
export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select:s => s.location.pathname });
  return <>
    <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4">Ir para o conteúdo</a>
    <header className="site-header"><div className="site-container header-inner">
      <Link to="/" aria-label="Nós 3D — Início" onClick={() => setOpen(false)}><Wordmark /></Link>
      <nav className="desktop-nav flex gap-8" aria-label="Navegação principal">{nav.map(n => <Link key={n.to} to={n.to} className={`nav-link ${pathname === n.to ? "active" : ""}`} aria-current={pathname === n.to ? "page" : undefined}>{n.label}</Link>)}</nav>
      <WhatsAppButton variant="cta" className="header-quote h-10 text-xs">Solicitar orçamento <ArrowUpRight /></WhatsAppButton>
      <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </div>{open && <nav className="mobile-nav" aria-label="Navegação mobile">{nav.map(n => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className={`nav-link ${pathname === n.to ? "active" : ""}`}>{n.label}</Link>)}<WhatsAppButton variant="cta">Solicitar orçamento <ArrowUpRight /></WhatsAppButton></nav>}</header>
    <main id="conteudo">{children}</main>
    <footer className="site-footer"><div className="site-container"><div className="footer-inner"><div><Link to="/" aria-label="Nós 3D — Início"><Wordmark /></Link><p className="mt-4 max-w-xs text-xs leading-6 text-muted-foreground">Criatividade, tecnologia e cuidado em cada camada.</p></div><nav className="flex flex-wrap gap-6" aria-label="Rodapé">{nav.slice(1).map(n => <Link key={n.to} to={n.to} className="nav-link">{n.label}</Link>)}</nav><p className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="size-4" /> Belo Horizonte · MG</p></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Nós 3D. Todos os direitos reservados.</p><p>Feito para dar forma às suas ideias.</p></div></div></footer>
    <FloatingWhatsApp />
  </>;
}