import { attachmentTypes } from "@/lib/documents/attachment-types";
export function AttachmentTypeSelect({value,onChange}:{value:string;onChange:(v:string)=>void}){return <select className="input" value={value} onChange={(e)=>onChange(e.target.value)}><option value="">Select attachment type</option>{attachmentTypes.map(t=><option key={t.key} value={t.key}>{t.label}</option>)}</select>;}
