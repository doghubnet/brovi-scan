import { MAX_DOCUMENT_FILE_SIZE_MB, MAX_IMAGE_FILE_SIZE_MB, bytesFromMb } from "@/lib/files/limits";
import type { AttachmentType } from "./attachment-types";
export const sanitizeFileName = (n:string)=>n.replace(/[^a-zA-Z0-9._-]/g,"-").replace(/-+/g,"-");
export function validateAttachmentFile(file: File, type: AttachmentType) {
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  if (!type.accepted.includes(ext)) return "This file type is not accepted for the selected attachment.";
  const max = ["jpg","jpeg","png"].includes(ext) ? bytesFromMb(MAX_IMAGE_FILE_SIZE_MB) : bytesFromMb(MAX_DOCUMENT_FILE_SIZE_MB);
  if (file.size > max) return `File is too large. Maximum allowed size is ${["jpg","jpeg","png"].includes(ext) ? MAX_IMAGE_FILE_SIZE_MB : MAX_DOCUMENT_FILE_SIZE_MB}MB.`;
  return null;
}
