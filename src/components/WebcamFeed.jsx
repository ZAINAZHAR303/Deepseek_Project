import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const WebcamFeed = ({ setGesture }) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null); // State to store the captured image
  const [isPreview, setIsPreview] = useState(false); // State to toggle preview mode
  const [isCameraActive, setIsCameraActive] = useState(false); // State to control camera activation

  // Function to capture the image from webcam
  const captureFrame = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc); // Store the captured image in state
    setIsPreview(true); // Show the preview after capture
  };

  // Function to confirm the captured image and send to the backend
  const confirmAndSend = async () => {
    const formData = new FormData();
    formData.append("file", dataURItoBlob(imageSrc));

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setGesture(response.data.prediction); // Handle the backend response
      setIsPreview(false); // Hide the preview after sending
      setIsCameraActive(false); // Turn off the camera after sending
    } catch (error) {
      console.error("Error fetching gesture:", error);
    }
  };

  // Function to convert base64 image to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: "image/jpeg" });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-lg">
      {!isCameraActive ? (
        <button
          onClick={() => setIsCameraActive(true)}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
        >
          Start Camera
        </button>
      ) : !isPreview ? (
        <div className="flex flex-col items-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={400}
            height={300}
            className="rounded-lg border-2 border-gray-300 mb-4"
          />
          <button
            onClick={captureFrame}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            Capture Gesture
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Preview</h3>
          <img
            src={imageSrc}
            alt="Preview"
            className="rounded-lg mb-4"
            width="400"
            height="300"
          />
          <div className="flex space-x-4">
            <button
              onClick={confirmAndSend}
              className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
            >
              Confirm
            </button>
            <button
              onClick={() => setIsPreview(false)}
              className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
            >
              Retake
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebcamFeed;