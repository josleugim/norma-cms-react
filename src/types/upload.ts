export const MAX_OCR_PDF_BYTES = 700 * 1024 * 1024;
export const MAX_LANDING_AI_JSON_BYTES = 700 * 1024 * 1024;

export type OcrResolutionsUploadResponse = Record<string, unknown>;
export type LandingAIUploadResponse = { bucket: string; key: string };
