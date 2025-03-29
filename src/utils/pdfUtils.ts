import { PDFDocument } from 'pdf-lib';

/**
 * Adds a signature to a PDF document
 * @param pdfFile The PDF file to add the signature to
 * @param signatureDataUrl The signature as a data URL
 * @returns A URL to the attested PDF document
 */
export const attestPdf = async (pdfFile: File, signatureDataUrl: string): Promise<string> => {
  try {
    // Load the PDF document
    const pdfBytes = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Get the first page
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    
    // Convert the signature data URL to a PNG image
    const signatureImage = await pdfDoc.embedPng(signatureDataUrl);
    
    // Get page dimensions
    const { width } = firstPage.getSize();
    
    // Calculate signature position (bottom right corner)
    const signatureWidth = 150;
    const signatureHeight = 75;
    const signatureX = width - signatureWidth - 50;
    const signatureY = 50;
    
    // Draw the signature on the page
    firstPage.drawImage(signatureImage, {
      x: signatureX,
      y: signatureY,
      width: signatureWidth,
      height: signatureHeight,
    });
    
    // Save the PDF
    const attestedPdfBytes = await pdfDoc.save();
    
    // Create a blob URL for the attested PDF
    const blob = new Blob([attestedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    return url;
  } catch (error) {
    console.error("Error attesting document:", error);
    throw error;
  }
};

/**
 * Reads a file as a data URL
 * @param file The file to read
 * @returns A promise that resolves to the file's data URL
 */
export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
