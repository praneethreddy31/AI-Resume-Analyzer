
export const GEMINI_MODEL_NAME = "gemini-2.5-flash-preview-04-17";
// Using a worker from esm.sh to match the version of pdfjs-dist imported via importmap.
// The main library is imported as pdfjs-dist@^5.2.133, which resolved to 5.2.133.
export const PDF_WORKER_SRC = `https://esm.sh/pdfjs-dist@5.2.133/build/pdf.worker.min.mjs`;
