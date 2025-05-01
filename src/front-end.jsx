// Frontend: React + Tailwind CSS
import React, { useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";


export default function FileShare() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [pin, setPin] = useState("55555");
  const [pinInput, setPinInput] = useState("");


  const backendUrl = "https://backend-sp3c.onrender.com"; // Replace with your actual backend URL

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      const res = await axios.post(`${backendUrl}/upload`, formData);
          setDownloadLink(res.data.link);
           setPin(res.data.pin);

//        console.log("res:", res.data); // inside try
// console.log("downloadLink:", downloadLink);
// console.log("pin:", pin);

           

    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">File Sharing Platform</h1>

        <input type="file" onChange={handleFileChange} className="mb-4" />

        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload"}
          
        </button>
        {uploading && <p className="text-gray-500 mt-2">Please wait, uploading...</p>}

{/* 
        {downloadLink && (
          <div className="mt-4">
            <p className="text-green-600">Upload successful!</p>
            <a
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Download File
            </a>
          </div>
        )} */}

{downloadLink && (
 
 <>
  
    <div className="mt-4">
      <p className="text-green-600">Upload successful!</p>
      <a
        href={downloadLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Download File
      </a>
    </div>

    <div className="mt-4">
      <p className="mb-2 text-sm text-gray-600">Scan on another device:</p>
      <QRCodeCanvas value={downloadLink} size={128} />
    </div>

    <a
      href={`https://wa.me/?text=${encodeURIComponent(downloadLink)}`}
      target="_blank"
      className="text-green-600 underline mt-2 inline-block"
    >
      Share via WhatsApp
    </a>

         {/* SHOW THE PIN */}
       <p className="mt-2 text-gray-700">
         Share this PIN to download: {pin}
      </p>
  </>
)}

  {/* DOWNLOAD BY PIN FORM */}
   <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner w-full max-w-md">
     <h2 className="font-semibold mb-2">Download by PIN</h2>
     <div className="flex gap-2">
       <input
         type="text"
         maxLength={5}
         placeholder="Enter 5-digit PIN"
         className="flex-1 border px-2 py-1 rounded"
         onChange={e => setPinInput(e.target.value)}
       />
       <button
         onClick={() => {
           // simply navigate to download URL
           window.location.href = `${backendUrl}/download/${pinInput}`;
         }}
         className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
       >
         Download
       </button>
     </div>
   </div>







      </div>
    </div>
  );
}
