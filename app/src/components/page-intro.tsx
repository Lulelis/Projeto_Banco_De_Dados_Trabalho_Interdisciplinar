export function PageIntro({ kicker, title, description }: { kicker:string; title:string; description:string }) {
  return <section className="page-intro"><div className="site-container"><p className="eyebrow">{kicker}</p><h1 className="page-title">{title}</h1><p>{description}</p></div></section>;
}