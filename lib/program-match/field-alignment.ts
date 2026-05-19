import { programTaxonomy } from "./program-taxonomy";
export const inferCategory=(field:string)=>programTaxonomy.find((c)=>c.toLowerCase().includes(String(field).toLowerCase().split(" ")[0]))??"Social Sciences";
