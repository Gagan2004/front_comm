// // Frontend: React + Tailwind CSS
// import React, { useState } from "react";
// import axios from "axios";
// import { QRCodeCanvas } from "qrcode.react";


// export default function FileShare() {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [downloadLink, setDownloadLink] = useState("");
//   const [pin, setPin] = useState("55555");
//   const [pinInput, setPinInput] = useState("");


//   const backendUrl = "https://backend-sp3c.onrender.com"; // Replace with your actual backend URL

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     setUploading(true);

//     try {
//       const res = await axios.post(`${backendUrl}/upload`, formData);
//           setDownloadLink(res.data.link);
//            setPin(res.data.pin);

// //        console.log("res:", res.data); // inside try
// // console.log("downloadLink:", downloadLink);
// // console.log("pin:", pin);

           

//     } catch (err) {
//       console.error("Upload failed", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
//       <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center">
//         <h1 className="text-2xl font-bold mb-4">File Sharing Platform</h1>

//         <input type="file" onChange={handleFileChange} className="mb-4" />

//         <button
//           onClick={handleUpload}
//           disabled={uploading || !file}
//           className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
//         >
//           {uploading ? "Uploading..." : "Upload"}
          
//         </button>
//         {uploading && <p className="text-gray-500 mt-2">Please wait, uploading...</p>}

// {/* 
//         {downloadLink && (
//           <div className="mt-4">
//             <p className="text-green-600">Upload successful!</p>
//             <a
//               href={downloadLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 underline"
//             >
//               Download File
//             </a>
//           </div>
//         )} */}

// {downloadLink && (
 
//  <>
  
//     <div className="mt-4">
//       <p className="text-green-600">Upload successful!</p>
//       <a
//         href={downloadLink}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-500 underline"
//       >
//         Download File
//       </a>
//     </div>

//     <div className="mt-4">
//       <p className="mb-2 text-sm text-gray-600">Scan on another device:</p>
//       <QRCodeCanvas value={downloadLink} size={128} />
//     </div>

//     <a
//       href={`https://wa.me/?text=${encodeURIComponent(downloadLink)}`}
//       target="_blank"
//       className="text-green-600 underline mt-2 inline-block"
//     >
//       Share via WhatsApp
//     </a>

//          {/* SHOW THE PIN */}
//        <p className="mt-2 text-gray-700">
//          Share this PIN to download: {pin}
//       </p>
//   </>
// )}

//   {/* DOWNLOAD BY PIN FORM */}
//    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner w-full max-w-md">
//      <h2 className="font-semibold mb-2">Download by PIN</h2>
//      <div className="flex gap-2">
//        <input
//          type="text"
//          maxLength={5}
//          placeholder="Enter 5-digit PIN"
//          className="flex-1 border px-2 py-1 rounded"
//          onChange={e => setPinInput(e.target.value)}
//        />
//        <button
//          onClick={() => {
//            // simply navigate to download URL
//            window.location.href = `${backendUrl}/download/${pinInput}`;
//          }}
//          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
//        >
//          Download
//        </button>
//      </div>
//    </div>







//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Upload, Download, Share2, FileText, Check, Copy, Smartphone } from "lucide-react";

export default function FileShare() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [pin, setPin] = useState("55555");
  const [pinInput, setPinInput] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);

  const backendUrl = "https://backend-sp3c.onrender.com";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      // Simulating API call - replace with actual axios call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDownloadLink("https://example.com/download/abc123");
      setPin("55555");
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <Share2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ShareDrop
          </h1>
          <p className="text-gray-600">Secure file sharing made simple</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-6">
            {/* File Drop Zone */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : file
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              
              {file ? (
                <div className="space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Choose different file
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      Drop your file here or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports any file type up to 100MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={uploading || !file}
              className={`w-full py-4 px-6 rounded-2xl font-medium transition-all duration-200 ${
                uploading || !file
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              }`}
            >
              {uploading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Uploading...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Upload File</span>
                </div>
              )}
            </button>

            {/* Upload Progress */}
            {uploading && (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse" style={{width: "70%"}}></div>
                </div>
                <p className="text-sm text-gray-600 text-center">Please wait, uploading your file...</p>
              </div>
            )}
          </div>
        </div>

        {/* Success Section */}
        {downloadLink && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Upload Successful!</h2>
                <p className="text-gray-600">Your file is ready to share</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* QR Code */}
                <div className="text-center space-y-3">
                  <h3 className="font-semibold text-gray-900">Scan to Download</h3>
                  <div className="inline-block p-4 bg-white rounded-2xl shadow-sm border-2 border-gray-100">
                    <QRCodeCanvas value={downloadLink} size={140} />
                  </div>
                  <p className="text-sm text-gray-500 flex items-center justify-center space-x-1">
                    <Smartphone className="w-4 h-4" />
                    <span>Perfect for mobile devices</span>
                  </p>
                </div>

                {/* Share Options */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Share Options</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Download PIN</p>
                          <p className="text-lg font-mono font-bold text-blue-600">{pin}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(pin)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(`Download file using PIN: ${pin} at ${window.location.href}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 w-full p-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share via WhatsApp</span>
                      </a>

                      <button
                        onClick={() => copyToClipboard(downloadLink)}
                        className="flex items-center justify-center space-x-2 w-full p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy Download Link</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Download Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Download File</h2>
                <p className="text-gray-600">Enter a 5-digit PIN to download</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <input
                type="text"
                maxLength={5}
                placeholder="Enter PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center font-mono text-lg"
              />
              <button
                onClick={() => {
                  if (pinInput.length === 5) {
                    window.location.href = `${backendUrl}/download/${pinInput}`;
                  }
                }}
                disabled={pinInput.length !== 5}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  pinInput.length !== 5
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Files are automatically deleted after 24 hours</p>
        </div>
      </div>
    </div>
  );
}