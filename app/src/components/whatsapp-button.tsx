import { type ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button, type ButtonProps } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site-config";

export function WhatsAppButton({ message = "Olá, Nós 3D! Gostaria de solicitar um orçamento.", children = "Solicitar orçamento", ...props }: ButtonProps & { message?: string; children?: ReactNode }) {
  const url = whatsappUrl(message);
  if (!url) return <Button {...props} onClick={() => toast.info("WhatsApp em configuração. O número oficial será disponibilizado em breve.")}>{children}</Button>;
  return <Button asChild {...props}><a href={url} target="_blank" rel="noopener noreferrer">{children}</a></Button>;
}
export function FloatingWhatsApp() {
  return <WhatsAppButton variant="whatsapp" className="floating-whatsapp" aria-label="Conversar pelo WhatsApp" title="Conversar pelo WhatsApp"><MessageCircle className="size-6" /></WhatsAppButton>;
}