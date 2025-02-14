import React, { useState } from 'react';
import { ExtractText } from './ExtractText';

export const UploadFile = () => {
  const [upload, setUpload] = useState(false);
  const[next,setNext] = useState(false);
  const [filePreview, setFilePreview] = useState(null); // State to store the file preview URL

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader(); // Create a FileReader instance

      // Set up the FileReader onload event
      reader.onload = (e) => {
        setFilePreview(e.target.result); // Set the file preview URL
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div>
      <button onClick={() => setUpload(true)}>Upload file</button>
      {upload && (
        <div>
          <input type="file" onChange={handleFileUpload} />
          {filePreview && (
            <div>
              <h3>Preview:</h3>
              {filePreview.startsWith('data:image') ? (
                <img src={filePreview} alt="Uploaded file preview" style={{ maxWidth: '100%', height: 'auto' }} />
              ) : filePreview.startsWith('data:video') ? (
                <video controls style={{ maxWidth: '100%', height: 'auto' }}>
                  <source src={filePreview} type={filePreview.split(';')[0].split(':')[1]} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <p>File type not supported for preview.</p>
              )}
            </div>
          )}
          <button onClick={()=>setNext(true)}>Next</button>
        </div>
      )}
        {
            next && (
              <ExtractText image={filePreview} />
            )
        }

    </div>
  );
};