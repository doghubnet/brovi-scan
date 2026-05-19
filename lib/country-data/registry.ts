import type { CountryData } from "./types";
import { australiaPack } from "./countries/australia";
import { austriaPack } from "./countries/austria";
import { canadaPack } from "./countries/canada";
import { chinaPack } from "./countries/china";
import { francePack } from "./countries/france";
import { germanyPack } from "./countries/germany";
import { italyPack } from "./countries/italy";
import { japanPack } from "./countries/japan";
import { netherlandsPack } from "./countries/netherlands";
import { newzealandPack } from "./countries/new-zealand";
import { plannedCountryPacks } from "./countries/planned";
import { unitedkingdomPack } from "./countries/united-kingdom";
import { unitedstatesPack } from "./countries/united-states";

export const activeCountryPacks: CountryData[] = [australiaPack, austriaPack, canadaPack, chinaPack, francePack, germanyPack, italyPack, japanPack, netherlandsPack, newzealandPack, unitedkingdomPack, unitedstatesPack].sort((a,b)=>a.countryName.localeCompare(b.countryName));
export { plannedCountryPacks };
export const allCountryPacks = [...activeCountryPacks, ...plannedCountryPacks];
export const getCountryPack = (countrySlugOrCode?: string | null) => {
  if (!countrySlugOrCode) return null;
  const key = countrySlugOrCode.trim().toLowerCase();
  return allCountryPacks.find((p) => p.countrySlug === key || p.countryCode.toLowerCase() === key) ?? null;
};
export const getActiveCountryOptions = () => activeCountryPacks.map((p) => ({ value: p.countrySlug, label: p.countryName, code: p.countryCode }));
export const getPlannedCountryOptions = () => plannedCountryPacks.map((p) => ({ value: p.countrySlug, label: p.countryName, code: p.countryCode }));
export const isCountryPackActive = (countrySlugOrCode?: string | null) => getCountryPack(countrySlugOrCode)?.status === "active";
