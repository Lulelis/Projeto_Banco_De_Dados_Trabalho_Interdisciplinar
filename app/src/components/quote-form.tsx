import { useState, type FormEvent } from "react";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { quoteMessage, quoteSchema } from "@/lib/quote";
import { whatsappUrl } from "@/lib/site-config";

type Errors = Record<string,string>;
export function QuoteForm() {
  const [errors,setErrors] = useState<Errors>({});
  const [sent,setSent] = useState(false);
  function submit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const result = quoteSchema.safeParse(values);
    if (!result.success) {
      const next:Errors = {};
      result.error.issues.forEach(issue => { const key=String(issue.path[0]); if (!next[key]) next[key]=issue.message; });
      setErrors(next);
      e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      setSent(false); return;
    }
    setErrors({});
    const url=whatsappUrl(quoteMessage(result.data));
    if (!url) { toast.info("WhatsApp em configuração. O número oficial será disponibilizado em breve."); return; }
    window.open(url,"_blank","noopener,noreferrer");
    setSent(true);
  }
  const fields = [
    {name:"name",label:"Nome completo",required:true,placeholder:"Seu nome",type:"text"},
    {name:"phone",label:"WhatsApp",required:true,placeholder:"(31) 99999-9999",type:"tel"},
    {name:"email",label:"E-mail",placeholder:"voce@exemplo.com",type:"email"},
    {name:"company",label:"Empresa ou segmento",placeholder:"Sua empresa ou área de atuação",type:"text"},
    {name:"product",label:"Produto desejado",required:true,placeholder:"O que você gostaria de criar?",type:"text"},
    {name:"quantity",label:"Quantidade",required:true,type:"number"},
    {name:"deadline",label:"Prazo desejado",type:"date"},
  ];
  return <form className="quote-form" onSubmit={submit} noValidate>{fields.map(f => <div key={f.name} className="form-field"><label htmlFor={`quote-${f.name}`}>{f.label}{f.required ? " *" : " (opcional)"}</label><input id={`quote-${f.name}`} name={f.name} type={f.type} placeholder={f.placeholder} required={f.required} min={f.type === "number" ? 1 : undefined} step={f.type === "number" ? 1 : undefined} defaultValue={f.type === "number" ? 1 : undefined} aria-invalid={Boolean(errors[f.name])} aria-describedby={errors[f.name] ? `${f.name}-error` : undefined} />{errors[f.name] && <p className="field-error" id={`${f.name}-error`}>{errors[f.name]}</p>}</div>)}<div className="form-field col-span-2"><label htmlFor="quote-description">Descrição da personalização *</label><textarea id="quote-description" name="description" placeholder="Conte sua ideia: cores, medidas, nome, marca ou outros detalhes importantes." required aria-invalid={Boolean(errors["description"])} aria-describedby={errors["description"] ? "description-error" : undefined} />{errors["description"] && <p className="field-error" id="description-error">{errors["description"]}</p>}</div><div className="col-span-2"><Button type="submit" variant="cta" className="h-12 w-full"><MessageCircle /> Solicitar orçamento pelo WhatsApp</Button><p className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-muted-foreground"><ShieldCheck className="mt-0.5 size-4 shrink-0" />Seus dados não são armazenados neste site. O pedido só é enviado quando você confirmar no WhatsApp.</p>{sent && <p role="status" className="mt-4 text-sm text-primary">Seu pedido está pronto. Confirme o envio na conversa do WhatsApp.</p>}</div></form>;
}