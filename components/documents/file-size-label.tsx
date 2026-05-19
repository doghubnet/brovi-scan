import { MAX_DOCUMENT_FILE_SIZE_MB, MAX_IMAGE_FILE_SIZE_MB } from "@/lib/files/limits";
export function FileSizeLabel(){return <p className="text-xs muted">Max file size: PDFs up to {MAX_DOCUMENT_FILE_SIZE_MB}MB, images up to {MAX_IMAGE_FILE_SIZE_MB}MB.</p>;}
