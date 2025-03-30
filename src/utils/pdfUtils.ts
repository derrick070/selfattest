import { PDFDocument } from 'pdf-lib';

/**
 * Result of the attestation process
 */
export interface AttestationResult {
  /** URL to the attested document */
  url: string;
  /** MIME type of the attested document */
  mimeType: string;
  /** File extension for the attested document */
  extension: string;
}

/**
 * Adds a signature to a document (PDF or image)
 * @param file The file to add the signature to
 * @param signatureDataUrl The signature as a data URL
 * @returns An AttestationResult object with URL and file type information
 */
export const attestPdf = async (file: File, signatureDataUrl: string): Promise<AttestationResult> => {
  try {
    // Check if the file is a PDF or an image
    if (file.type === 'application/pdf') {
      // Handle PDF file
      return await attestPdfFile(file, signatureDataUrl);
    } else if (file.type.startsWith('image/')) {
      // Handle image file
      return await attestImageFile(file, signatureDataUrl);
    } else {
      throw new Error('Unsupported file type');
    }
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

/**
 * Gets the file extension from a MIME type
 * @param mimeType The MIME type
 * @returns The corresponding file extension (with dot)
 */
const getExtensionFromMimeType = (mimeType: string): string => {
  const mimeToExt: Record<string, string> = {
    'application/pdf': '.pdf',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
    'image/bmp': '.bmp',
    'image/tiff': '.tiff'
  };
  
  return mimeToExt[mimeType] || '.pdf';
};

/**
 * Adds a signature to a PDF file
 * @param pdfFile The PDF file to add the signature to
 * @param signatureDataUrl The signature as a data URL
 * @returns An AttestationResult object with URL and file type information
 */
const attestPdfFile = async (pdfFile: File, signatureDataUrl: string): Promise<AttestationResult> => {
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
  
  return {
    url,
    mimeType: 'application/pdf',
    extension: '.pdf'
  };
};

/**
 * Adds a signature to an image file
 * @param imageFile The image file to add the signature to
 * @param signatureDataUrl The signature as a data URL
 * @returns An AttestationResult object with URL and file type information
 */
const attestImageFile = async (imageFile: File, signatureDataUrl: string): Promise<AttestationResult> => {
  // Create a new canvas to combine the image and signature
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not create canvas context');
  }
  
  // Load the original image
  const imageUrl = await readFileAsDataURL(imageFile);
  const image = await loadImage(imageUrl);
  
  // Set canvas dimensions to match the image
  canvas.width = image.width;
  canvas.height = image.height;
  
  // Draw the original image
  ctx.drawImage(image, 0, 0);
  
  // Load the signature image
  const signatureImg = await loadImage(signatureDataUrl);
  
  // Calculate signature position (bottom right corner)
  const signatureWidth = Math.min(150, image.width / 4);
  const signatureHeight = signatureWidth / 2;
  const signatureX = image.width - signatureWidth - 20;
  const signatureY = image.height - signatureHeight - 20;
  
  // Draw the signature
  ctx.drawImage(signatureImg, signatureX, signatureY, signatureWidth, signatureHeight);
  
  // Determine the correct MIME type
  let mimeType = imageFile.type;
  // Default to image/png if the type is not recognized
  if (!mimeType || mimeType === 'image/jpg') {
    mimeType = 'image/jpeg';
  }
  
  // Convert canvas to data URL with proper MIME type and quality
  let attestedImageDataUrl;
  if (mimeType === 'image/jpeg' || mimeType === 'image/webp') {
    // Use quality parameter for lossy formats
    attestedImageDataUrl = canvas.toDataURL(mimeType, 0.92);
  } else {
    // For PNG and other formats
    attestedImageDataUrl = canvas.toDataURL(mimeType);
  }
  
  // Convert data URL to Blob
  const blob = dataURLToBlob(attestedImageDataUrl);
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  return {
    url,
    mimeType: imageFile.type,
    extension: getExtensionFromMimeType(imageFile.type)
  };
};

/**
 * Loads an image from a URL
 * @param url The URL of the image to load
 * @returns A promise that resolves to the loaded image
 */
const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};

/**
 * Converts a data URL to a Blob
 * @param dataURL The data URL to convert
 * @returns The resulting Blob
 */
const dataURLToBlob = (dataURL: string): Blob => {
  try {
    const parts = dataURL.split(';base64,');
    if (parts.length !== 2) {
      throw new Error('Invalid data URL format');
    }
    
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    
    return new Blob([uInt8Array], { type: contentType });
  } catch (error) {
    console.error('Error converting data URL to blob:', error);
    // Create a fallback empty blob with the same type
    return new Blob([], { type: 'image/png' });
  }
};
