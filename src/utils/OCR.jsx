import Tesseract from 'tesseract.js';

/**
 * This function uses Tesseract.js to perform OCR on a given image.
 * @param {string} imageUrl - The URL of the image to perform OCR on.
 * @returns {Promise<string>} - A promise that resolves to the recognized text.
 */
export default function performOCR(imageUrl) {
  return Tesseract.recognize(
    imageUrl,
    'eng',
    { logger: (m) => (console.log(m)) },
  ).then(({ data: { text } }) => text);
}
