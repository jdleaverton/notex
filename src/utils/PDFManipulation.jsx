import { PDFDocument } from 'pdf-lib';

/**
 * This function loads a PDF document from a given file.
 * @param {File} file - The PDF file to load.
 * @returns {Promise<PDFDocument>} - A promise that resolves to the loaded PDF document.
 */
export async function loadPDF(file) {
  const fileBuffer = await file.arrayBuffer();
  return PDFDocument.load(fileBuffer);
}

/**
 * This function adds a comment to a specific page of a PDF document.
 * @param {PDFDocument} pdfDoc - The PDF document to add the comment to.
 * @param {number} pageNumber - The page number to add the comment to.
 * @param {string} comment - The comment to add.
 * @param {Object} position - The position to add the comment at.
 * @param {number} position.x - The x-coordinate of the position.
 * @param {number} position.y - The y-coordinate of the position.
 * @returns {void}
 */
export function addCommentToPDF(pdfDoc, pageNumber, comment, position) {
  const page = pdfDoc.getPages()[pageNumber - 1];
  page.drawText(comment, { x: position.x, y: position.y });
}

/**
 * This function saves a PDF document to a Blob.
 * @param {PDFDocument} pdfDoc - The PDF document to save.
 * @returns {Promise<Blob>} - A promise that resolves to the saved PDF document as a Blob.
 */
export async function savePDFToBlob(pdfDoc) {
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

/**
 * This function downloads a Blob as a file.
 * @param {Blob} blob - The Blob to download.
 * @param {string} filename - The name of the file to download the Blob as.
 * @returns {void}
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
}
