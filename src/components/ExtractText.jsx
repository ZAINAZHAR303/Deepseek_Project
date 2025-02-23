import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import ReactMarkdown from "react-markdown";
// import Loader from './Loader';

export const ExtractText = ({ image }) => {
  const[loading,setloading] = useState(false)
  const [extractedText, setExtractedText] = useState(''); // State for extracted text
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [apiResponse, setApiResponse] = useState(null); // State for API response
  const [error, setError] = useState(null); // State for error handling

  // Function to extract text from the image using Tesseract.js
  const extractText = () => {
    if (!image) return;

    setIsLoading(true); // Show loading indicator
    setExtractedText(''); // Clear previous extracted text
    setApiResponse(null); // Clear previous API response
    setError(null); // Clear previous errors

    Tesseract.recognize(
      image, // Image source (data URL or file)
      'eng', // Language (English)
      {
        logger: (info) => {
          // Optional: Log progress (but avoid updating state here)
          console.log(info); // Log to console without causing re-renders
        },
      }
    ).then(({ data: { text } }) => {
      setExtractedText(text); // Set extracted text
      sendTextToFastAPI(text); // Send extracted text to FastAPI
      setIsLoading(false); // Hide loading indicator
    }).catch((err) => {
      console.error('Error extracting text:', err);
      setError('Failed to extract text from the image.');
      setIsLoading(false);
    });
  };

  // Function to send extracted text to FastAPI
  const sendTextToFastAPI = async (text) => {
    try {
      console.log("Send text to FastAPI")
      setloading(true);
      const response = await fetch('https://deepseekbackend-production-0e65.up.railway.app/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           "Connection": "keep-alive",
        },
        body: JSON.stringify({ extracted_text: text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // Log the API response for debugging
      setApiResponse(data);
      setloading(false) // Set API response
    } catch (err) {
      console.error('Error sending text to FastAPI:', err);
      setError('Failed to communicate with the server.');
    }
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {extractedText && (
        <div style={{ marginTop: '20px' }}>
          <h2>Extracted Text:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '10px', border: '1px solid #ccc' }}>
            {extractedText}
          </pre>
        </div>
      )}
      {loading && <p>getting response...</p>}
      {apiResponse && (
  <div style={{ marginTop: '20px' }}>
    <h2>Analysis Results:</h2>
    <div style={{ background: '#f5f5f5', padding: '10px', border: '1px solid #ccc' }}>
      {/* Render only the `content` property from the API response */}
      {apiResponse.summary && (
        <>
          <h3>Summary:</h3>
          
          <ReactMarkdown className="prose">{apiResponse.summary}</ReactMarkdown>

        </>
      )}
      {apiResponse.risks && (
        <>
          <h3>Risks:</h3>
          
          <ReactMarkdown className="prose">{apiResponse.risks}</ReactMarkdown>

        </>
      )}
      {apiResponse.recommendations && (
        <>
          <h3>Recommendations:</h3>
          
          <ReactMarkdown className="prose">{apiResponse.recommendations}</ReactMarkdown>
        </>
      )}
      
    </div>
  </div>
)}
    </div>
  );
};