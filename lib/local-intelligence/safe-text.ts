const forbidden = [/card\s*number/i,/cvv/i,/\bpin\b/i,/\botp\b/i,/password/i,/bank\s*login/i,/private\s*key/i,/account\s*credential/i];
export const sanitizeText = (text: unknown) => String(text ?? "").replace(/\s+/g, " ").trim();
export const containsForbiddenSensitiveSecret = (text: unknown) => forbidden.some((r) => r.test(String(text ?? "")));
export const detectSensitiveKeywords = (text: unknown) => forbidden.filter((r) => r.test(String(text ?? ""))).map((r) => r.source);
