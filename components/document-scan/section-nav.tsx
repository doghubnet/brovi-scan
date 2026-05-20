"use client";
import { useEffect, useState } from "react";
const items = [["Identity","identity"],["Academic","academic"],["Admission","admission"],["Financial/Sponsor","financial-sponsor"],["Translation/Legalization","translation-legalization"],["Country-specific","country-specific"],["Attachments","attachments"],["Review","review"]] as const;

export function DocumentScanSectionNav(){
  const [active,setActive]=useState("identity");
  useEffect(()=>{const ids=items.map(([,id])=>document.getElementById(id)).filter(Boolean) as HTMLElement[]; if(!("IntersectionObserver" in window)) return; const ob=new IntersectionObserver((ents)=>{ents.forEach(e=>{if(e.isIntersecting) setActive(e.target.id);});},{rootMargin:"-35% 0px -55% 0px",threshold:0.1}); ids.forEach(el=>ob.observe(el)); return ()=>ob.disconnect();},[]);
  return <aside className="sticky top-24 hidden h-fit rounded-2xl border border-slate-200 bg-white p-3 lg:block dark:border-white/10 dark:bg-navy"><ul className="space-y-1">{items.map(([label,id])=><li key={id}><a href={`#${id}`} onClick={()=>setActive(id)} className={`block rounded-md px-3 py-2 text-sm hover:bg-blue-50 dark:hover:bg-white/10 ${active===id?"border-l-2 border-royal bg-blue-50 text-royal dark:bg-white/10":"text-slate-600 dark:text-slate-300"}`}>{label}</a></li>)}</ul></aside>;
}
