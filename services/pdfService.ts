
import * as pdfjsLib from 'pdfjs-dist';
import { PDF_WORKER_SRC } from '../constants';

// Setting the worker source for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC;

export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    // Type assertion for 'data' property as pdfjsLib.getDocument expects an object with 'data'
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer as unknown as Uint8Array });
    const pdf = await loadingTask.promise;
    
    let textContent = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContentPage = await page.getTextContent();
      // Ensure item.str exists and is a string before joining
      textContent += textContentPage.items.map(item => ('str' in item && typeof item.str === 'string' ? item.str : '')).join(' ');
      textContent += '\n'; // Add newline between pages for better readability in prompt
    }
    return textContent.trim();
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to read PDF content. The file might be corrupted or password-protected.");
  }
};
