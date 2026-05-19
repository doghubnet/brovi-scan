"use client";
import { getActiveCountryOptions, getPlannedCountryOptions } from "@/lib/country-data";

export function CountrySelector({ value, onChange, includePlanned = false }: { value: string; onChange: (value: string) => void; includePlanned?: boolean }) {
  const active = getActiveCountryOptions();
  const planned = includePlanned ? getPlannedCountryOptions() : [];
  return <label className="label">Destination country<select className="input mt-2" value={value} onChange={(e)=>onChange(e.target.value)}><option value="">Select destination country</option>{active.map((o)=><option key={o.value} value={o.value}>{o.label}</option>)}{planned.length ? <optgroup label="Planned destinations">{planned.map((o)=><option key={o.value} value={o.value}>{o.label} (planned)</option>)}</optgroup> : null}</select><span className="mt-1 block text-xs muted">More destinations are being prepared.</span></label>;
}
