export type PhoneCountry = { name: string; code: string; iso: string };

export const phoneCountries: PhoneCountry[] = [
  { name: "Ethiopia", code: "+251", iso: "ET" },
  { name: "Italy", code: "+39", iso: "IT" },
  { name: "United States", code: "+1", iso: "US" },
  { name: "United Kingdom", code: "+44", iso: "GB" },
  { name: "Canada", code: "+1", iso: "CA" },
  { name: "Germany", code: "+49", iso: "DE" },
  { name: "France", code: "+33", iso: "FR" },
  { name: "Netherlands", code: "+31", iso: "NL" },
  { name: "Australia", code: "+61", iso: "AU" },
  { name: "Turkey", code: "+90", iso: "TR" },
  { name: "United Arab Emirates", code: "+971", iso: "AE" },
  { name: "Saudi Arabia", code: "+966", iso: "SA" },
  { name: "Kenya", code: "+254", iso: "KE" },
];

export const defaultPhoneCountry = phoneCountries[0];

export function normalizePhoneNumber(countryCode: string, phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^0+/, "");
  return `${countryCode}${digits}`;
}

export function isValidPhoneNumber(phone: string) {
  return /^\+[1-9]\d{7,14}$/.test(phone);
}
