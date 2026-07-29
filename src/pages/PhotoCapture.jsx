import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import cameraIcon from "../assets/camera-icon.png";
import galleryIcon from "../assets/gallery.png";
import takePictureIcon from "../assets/Group 40037.png";

function PhotoCapture() {
  const [imagePreview, setImagePreview] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const galleryInputRef = useRef(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

 const handleFileChange = (e) => {
   const file = e.target.files[0];
   if (!file) return;

   const reader = new FileReader();
   reader.onload = () => {
     setImagePreview(reader.result);
     setBase64Image(reader.result.split(",")[1]);
     setIsCameraOpen(true);
     setIsReviewing(true);
   };
   reader.readAsDataURL(file);
 };

  const handleScanFace = async () => {
    try {
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(cameraStream);
      setIsCameraOpen(true);
    } catch (error) {
      console.error("Camera access denied or unavailable:", error);
    }
  };

  const handleSubmitImage = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Image }),
        }
      );

      const data = await response.json();
      localStorage.setItem("skinstricAnalysis", JSON.stringify(data));
      navigate("/results");

    } catch (error) {
      console.error("Error submitting image:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCloseCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setIsCameraOpen(false);
    setIsCameraReady(false);
    setMinTimeElapsed(false);

  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL("image/png");
    setImagePreview(dataUrl);
    setBase64Image(dataUrl.split(",")[1]);

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setIsReviewing(true);
  };

    const handleRetake = () => {
        setImagePreview(null);
        setBase64Image(null);
        setIsReviewing(false);
        handleScanFace();
    };

  const showCamera = isCameraReady && minTimeElapsed;

   useEffect(() => {
     if (videoRef.current && stream) {
       videoRef.current.srcObject = stream;
     }
   }, [stream]);

   useEffect(() => {
     if (isCameraOpen) {
       const timer = setTimeout(() => {
         setMinTimeElapsed(true);
       }, 1500);

       return () => clearTimeout(timer);
     }
   }, [isCameraOpen]);

  return (
    <div className="h-screen bg-white flex flex-col px-10 py-8 overflow-hidden">
      <Header />
      <div className="flex justify-between items-start mt-6">
        {!isCameraOpen && (
          <p
            className="uppercase"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            To Start Analysis
          </p>
        )}
      </div>

      {isCameraOpen ? (
        /* ---------- CAMERA VIEW ---------- */
        <div className="flex-1 relative -mx-10 min-h-0">
          {isCameraOpen && (
            <Link
              to="/proceed"
              className="absolute bottom-8 left-8 flex items-center gap-3 z-10"
            >
              <div className="w-10 h-10 border border-white rotate-45 flex items-center justify-center">
                <span className="-rotate-45 text-xs text-white">◀</span>
              </div>
              <span
                className="uppercase text-white"
                style={{ fontSize: "14px" }}
              >
                Back
              </span>
            </Link>
          )}

          {!showCamera && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: "260px",
                  height: "260px",
                  transform: "rotate(45deg)",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    border: "2px dotted #A0A4AB",
                    animation: "spin-slow 8s linear infinite",
                  }}
                />
                <img
                  src={cameraIcon}
                  alt=""
                  className="w-24 h-24"
                  style={{
                    transform: "rotate(-45deg)",
                    animation: "heartbeat 1.5s ease-in-out infinite",
                  }}
                />
              </div>
              <p
                className="uppercase text-gray-400 mt-2"
                style={{ fontSize: "12px" }}
              >
                Setting up camera ...
              </p>
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            onLoadedData={() => setIsCameraReady(true)}
            className="w-full h-full object-cover"
            style={{ display: showCamera ? "block" : "none" }}
          />

          {isReviewing && (
            <div className="absolute inset-0 bg-black flex flex-col items-center justify-center">
              <img
                src={imagePreview}
                alt="Captured"
                className="w-full h-full object-cover absolute inset-0"
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-20">
                  <p
                    className="uppercase text-white mb-3"
                    style={{ fontSize: "14px" }}
                  >
                    Analyzing image
                  </p>
                  <div className="flex gap-2">
                    <span
                      className="w-2 h-2 bg-white rounded-full"
                      style={{
                        animation: "bounce-dot 1.4s ease-in-out infinite",
                        animationDelay: "0s",
                      }}
                    />
                    <span
                      className="w-2 h-2 bg-white rounded-full"
                      style={{
                        animation: "bounce-dot 1.4s ease-in-out infinite",
                        animationDelay: "0.2s",
                      }}
                    />
                    <span
                      className="w-2 h-2 bg-white rounded-full"
                      style={{
                        animation: "bounce-dot 1.4s ease-in-out infinite",
                        animationDelay: "0.4s",
                      }}
                    />
                  </div>
                </div>
              )}
              <p
                className="uppercase text-white relative z-10"
                style={{ fontSize: "14px" }}
              >
                Great shot!
              </p>

              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-10">
                <button
                  onClick={handleRetake}
                  className="uppercase px-6 py-3 bg-white text-black"
                  style={{ fontSize: "12px" }}
                >
                  Retake
                </button>
                <button
                  onClick={handleSubmitImage}
                  className="uppercase px-6 py-3 bg-black text-white border border-white"
                  style={{ fontSize: "12px" }}
                >
                  Use This Photo
                </button>
              </div>
            </div>
          )}

          {/* Helper text, bottom of video */}
          {!isReviewing && (
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p
                className={`uppercase ${
                  showCamera ? "text-white" : "text-gray-400"
                }`}
                style={{ fontSize: "12px" }}
              >
                To get better results make sure to have
              </p>
              <div className="flex justify-center gap-6 mt-2">
                <span
                  className={`uppercase ${
                    showCamera ? "text-white" : "text-gray-400"
                  }`}
                  style={{ fontSize: "12px" }}
                >
                  ◇ Neutral Expression
                </span>
                <span
                  className={`uppercase ${
                    showCamera ? "text-white" : "text-gray-400"
                  }`}
                  style={{ fontSize: "12px" }}
                >
                  ◇ Frontal Pose
                </span>
                <span
                  className={`uppercase ${
                    showCamera ? "text-white" : "text-gray-400"
                  }`}
                  style={{ fontSize: "12px" }}
                >
                  ◇ Adequate Lighting
                </span>
              </div>
            </div>
          )}

          {showCamera && !isReviewing && (
            <div
              className="absolute flex items-center gap-3 cursor-pointer"
              style={{
                right: "40px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={handleCapture}
            >
              <span
                className="uppercase text-white"
                style={{ fontSize: "12px" }}
              >
                Take Picture
              </span>
              <div className="w-16 h-16 border-white flex items-center justify-center">
                <img
                  src={takePictureIcon}
                  alt="Capture"
                  className="w-16 h-16"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ---------- ICON SELECTION VIEW ---------- */
        <div className="flex-1 flex items-center justify-center gap-64 relative">
          {/* Scan face option */}
          <div
            className="relative cursor-pointer flex items-center justify-center"
            style={{ width: "300px", height: "300px" }}
            onClick={() => setShowPermissionModal(true)}
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
      )}

      {!isCameraOpen && (
        <Link to="/proceed" className="flex items-center gap-3 w-fit mt-6">
          <div className="w-10 h-10 border border-black rotate-45 flex items-center justify-center">
            <span className="-rotate-45 text-xs">◀</span>
          </div>
          <span className="uppercase" style={{ fontSize: "14px" }}>
            Back
          </span>
        </Link>
      )}

      {showPermissionModal && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setShowPermissionModal(false)}
        >
          <div
            className="absolute bg-black text-white"
            style={{
              width: "360px",
              top: "50%",
              left: "calc(50% - 460px)",
              transform: "translateY(-50%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p
              className="uppercase px-6 py-5"
              style={{ fontSize: "14px", fontWeight: 500 }}
            >
              Allow A.I. to access your camera
            </p>
            <div className="flex border-t border-gray-700">
              <button
                onClick={() => setShowPermissionModal(false)}
                className="flex-1 uppercase py-4 text-gray-400"
                style={{ fontSize: "12px" }}
              >
                Deny
              </button>
              <button
                onClick={() => {
                  setShowPermissionModal(false);
                  handleScanFace();
                }}
                className="flex-1 uppercase py-4 font-bold border-l border-gray-700"
                style={{ fontSize: "12px" }}
              >
                Allow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoCapture;