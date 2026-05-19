export type RequiredLevel = "critical"|"important"|"case_specific"|"optional";
export type DocumentRule = { key:string; label:string; category:string; requiredLevel:RequiredLevel; acceptedFormats:string[]; maxSizeMb:number; sensitivity:"low"|"medium"|"high"; missingPenalty:number; unclearPenalty:number; expiredPenalty:number; needsTranslationPenalty:number; needsLegalizationPenalty:number };
