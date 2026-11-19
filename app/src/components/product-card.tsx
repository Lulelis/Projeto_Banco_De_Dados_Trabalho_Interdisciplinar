import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { productMessage } from "@/lib/site-config";
import { type Product } from "@/data/products";
export function ProductCard({ product }: { product:Product }) {
  return <article className="product-card"><Link to="/produto/$slug" params={{slug:product.slug}} className="product-photo" aria-label={`Ver ${product.name}`}><img src={product.image} alt={`${product.name} — exemplo demonstrativo de impressão 3D`} loading="lazy" width="418" height="627" /><span className="demo-badge">Produto demonstrativo</span></Link><div className="product-body"><p className="product-category">{product.category}</p><h3 className="product-name"><Link to="/produto/$slug" params={{slug:product.slug}}>{product.name}</Link></h3><p className="product-description">{product.description}</p><div className="product-links"><Button asChild variant="link" className="p-0 text-xs"><Link to="/produto/$slug" params={{slug:product.slug}}>Ver detalhes <ArrowUpRight /></Link></Button><WhatsAppButton variant="outline" size="sm" message={productMessage(product.name,1)}>Solicitar orçamento</WhatsAppButton></div></div></article>;
}