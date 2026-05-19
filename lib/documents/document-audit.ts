import { createClient } from "@/lib/supabase/client";
export async function logDocumentAudit(action:string,meta:Record<string,unknown>){
 const supabase=createClient(); if(!supabase) return;
 const {data}=await supabase.auth.getUser();
 await supabase.from("audit_logs").insert({actor_user_id:data.user?.id??null,target_user_id:data.user?.id??null,entity_type:"document_attachment",action,metadata:meta});
}
