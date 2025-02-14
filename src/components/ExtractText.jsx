import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';

export const ExtractText = ({ image }) => {
  const [extractedText, setExtractedText] = useState(''); // State for extracted text
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  // Function to extract text from the image using Tesseract.js
  const extractText = () => {
    if (!image) return;

    setIsLoading(true); // Show loading indicator
    setExtractedText(''); // Clear previous extracted text

    Tesseract.recognize(
      image, // Image source (data URL or file)
      'eng', // Language (English)
      {
        logger: (info) => console.log(info), // Optional: Log progress
      }
    ).then(({ data: { text } }) => {
      setExtractedText(text); // Set extracted text
      setIsLoading(false); // Hide loading indicator
    });
  };

  // Automatically extract text when the image prop changes
  useEffect(() => {
    if (image) {
      extractText();
    }
  }, [image]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Extract Text from Image</h1>
      {image && (
        <div style={{ marginTop: '20px' }}>
          <h2>Image Preview:</h2>
          <img
            src={image}
            alt="Uploaded preview"
            style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc' }}
          />
        </div>
      )}
      {isLoading && <p>Extracting text...</p>}
      {extractedText && (
        <div style={{ marginTop: '20px' }}>
          <h2>Extracted Text:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '10px', border: '1px solid #ccc' }}>
            {extractedText}
          </pre>
        </div>
      )}
    </div>
  );
};