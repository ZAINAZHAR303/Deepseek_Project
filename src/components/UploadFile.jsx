import React, { useState } from 'react';
import { ExtractText } from './ExtractText';

const UploadFile = () => {
  const [upload, setUpload] = useState(false);
  const [next, setNext] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full transform transition-all duration-500 hover:scale-105">
        {/* Upload Section */}
        {!upload && (
          <div className="text-center animate-fadeIn">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Upload Your File</h1>
            <p className="text-gray-600 mb-8">Please upload a file to get started.</p>
            <button
              onClick={() => setUpload(true)}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 transform hover:scale-110"
            >
              Upload File
            </button>
          </div>
        )}

        {/* File Input and Preview Section */}
        {upload && !next && (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload a File</h2>
            <input
              type="file"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition duration-300"
            />
            {filePreview && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Preview:</h3>
                {filePreview.startsWith('data:image') ? (
                  <img
                    src={filePreview}
                    alt="Uploaded file preview"
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                ) : filePreview.startsWith('data:video') ? (
                  <video
                    controls
                    className="rounded-lg shadow-md w-full h-auto"
                  >
                    <source
                      src={filePreview}
                      type={filePreview.split(';')[0].split(':')[1]}
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <p className="text-gray-600">File type not supported for preview.</p>
                )}
              </div>
            )}
            <button
              onClick={() => setNext(true)}
              className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 transform hover:scale-110"
            >
              Next
            </button>
          </div>
        )}

        {/* ExtractText Component */}
        {next && (
          <div className="animate-fadeIn">
            <ExtractText image={filePreview} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;