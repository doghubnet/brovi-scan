import { CheckCircle2 } from "lucide-react";
export function RecommendationList({items}:{items:string[]}){return <ul className="space-y-3">{items.map((item,i)=><li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-success"/><span className="text-sm muted">{i+1}. {item}</span></li>)}</ul>}
