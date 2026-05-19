export const MAX_DOCUMENT_FILE_SIZE_MB = Number(process.env.MAX_DOCUMENT_FILE_SIZE_MB ?? "20");
export const MAX_IMAGE_FILE_SIZE_MB = Number(process.env.MAX_IMAGE_FILE_SIZE_MB ?? "10");
export const MAX_AUDIO_FILE_SIZE_MB = Number(process.env.MAX_AUDIO_FILE_SIZE_MB ?? "50");
export const bytesFromMb = (mb: number) => mb * 1024 * 1024;
