import type { CountryData } from "@/lib/country-data";
export function CountryRiskFlags({ pack }: { pack: CountryData }) { return <div className="card"><h3 className="font-bold">Common risk flags</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{pack.commonRiskFlags.map((f)=><li key={f.key}>{f.title} — {f.description}</li>)}</ul></div>; }
