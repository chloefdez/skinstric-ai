import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import cameraIcon from "../assets/camera-icon.png";
import galleryIcon from "../assets/gallery.png";

function PhotoCapture() {
  const [imagePreview, setImagePreview] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setBase64Image(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-10 py-8">
      <Header />

      <div className="flex justify-between items-start mt-6">
        <p className="uppercase" style={{ fontSize: "14px", fontWeight: 500 }}>
          To Start Analysis
        </p>
        {imagePreview && (
          <div>
            <p className="text-gray-400 mb-1" style={{ fontSize: "12px" }}>
              Preview
            </p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 border border-gray-300 object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center gap-64 relative">
        {/* Scan face option */}
        <div
          className="relative cursor-pointer flex items-center justify-center"
          style={{ width: "300px", height: "300px" }}
          onClick={() => cameraInputRef.current.click()}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              width: "300px",
              height: "300px",
              border: "3px dotted #8A8E96",
              animation: "spin-slow 50s linear infinite",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              width: "300px",
              height: "300px",
              border: "3px dotted #B8BBC1",
              transform: "rotate(20deg)",
              animation: "spin-slow 65s linear infinite",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              width: "300px",
              height: "300px",
              border: "3px dotted #D6D8DC",
              animation: "spin-slow 50s linear infinite reverse",
            }}
          />

          <img
            src={cameraIcon}
            alt="Scan face"
            className="w-32 h-32 absolute z-10"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          <span
            className="uppercase absolute z-10 text-center"
            style={{
              fontSize: "12px",
              bottom: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            Allow A.I.
            <br />
            to scan your face
          </span>
        </div>

        {/* Gallery option */}
        <div
          className="relative cursor-pointer flex items-center justify-center"
          style={{ width: "300px", height: "300px" }}
          onClick={() => galleryInputRef.current.click()}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              width: "300px",
              height: "300px",
              border: "3px dotted #8A8E96",
              animation: "spin-slow 50s linear infinite",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              width: "300px",
              height: "300px",
              border: "3px dotted #B8BBC1",
              transform: "rotate(20deg)",
              animation: "spin-slow 65s linear infinite",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              width: "300px",
              height: "300px",
              border: "3px dotted #D6D8DC",
              animation: "spin-slow 50s linear infinite reverse",
            }}
          />

          <img
            src={galleryIcon}
            alt="Access gallery"
            className="w-32 h-32 absolute z-10"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          <span
            className="uppercase absolute z-10 text-center"
            style={{
              fontSize: "12px",
              bottom: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            Allow A.I.
            <br />
            access gallery
          </span>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={galleryInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <Link to="/proceed" className="flex items-center gap-3 w-fit">
        <div className="w-10 h-10 border border-black rotate-45 flex items-center justify-center">
          <span className="-rotate-45 text-xs">◀</span>
        </div>
        <span className="uppercase" style={{ fontSize: "14px" }}>
          Back
        </span>
      </Link>
    </div>
  );
}

export default PhotoCapture;