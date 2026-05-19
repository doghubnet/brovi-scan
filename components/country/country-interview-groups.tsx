import type { CountryData } from "@/lib/country-data";
export function CountryInterviewGroups({ pack }: { pack: CountryData }) { return <div className="card"><h3 className="font-bold">Country interview groups</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{pack.interviewQuestionGroups.map((g)=><li key={g.key}><strong>{g.title}:</strong> {g.purpose}</li>)}</ul></div>; }
