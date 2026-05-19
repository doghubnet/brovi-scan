import { createClient } from "@/lib/supabase/client";
import { sanitizeFileName } from "./file-validation";
export const PRIVATE_BUCKET = "brovi-private-documents";
export const buildStoragePath = (uid:string,key:string,fileName:string)=>`${uid}/document-scan/${key}/${Date.now()}-${sanitizeFileName(fileName)}`;
export async function uploadPrivateDocument(uid:string,key:string,file:File){
 const supabase=createClient(); if(!supabase) throw new Error("Database connection is not configured.");
 const path=buildStoragePath(uid,key,file.name);
 const {error}=await supabase.storage.from(PRIVATE_BUCKET).upload(path,file,{upsert:false});
 if(error) throw error; return path;
}
export async function getSignedDocumentUrl(path:string,expires=300){ const supabase=createClient(); if(!supabase) throw new Error("Database connection is not configured."); const {data,error}=await supabase.storage.from(PRIVATE_BUCKET).createSignedUrl(path,expires); if(error) throw error; return data.signedUrl; }
