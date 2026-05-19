import type { CountryData } from "@/lib/country-data";
export function CountryFinancialNotes({ pack }: { pack: CountryData }) { return <div className="card"><h3 className="font-bold">Country financial review notes</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{pack.financialReviewNotes.map((n)=><li key={n.key}><strong>{n.title}:</strong> {n.description}</li>)}</ul></div>; }
