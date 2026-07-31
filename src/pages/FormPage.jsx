import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function FormPage() {
  const [step, setStep] = useState("name");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidText = (value) => /^[a-zA-Z\s]+$/.test(value.trim());

  const handleNameKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!isValidText(name)) {
        setNameError("Please enter letters only, no numbers or symbols.");
        return;
      }
      setNameError("");
      setStep("location");
    }
  };

  const handleLocationKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (!isValidText(location)) {
        setLocationError("Please enter letters only, no numbers or symbols.");
        return;
      }
      setLocationError("")
      setIsSubmitting(true);
      try {
        const response = await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, location }),
          }
        );
        const data = await response.json();
        console.log("API response:", data);
        localStorage.setItem("skinstric_name", name);
        localStorage.setItem("skinstric_location", location)
        await new Promise((resolve) => setTimeout(resolve, 1200));
        navigate("/proceed");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 md:px-10 py-8">
      {" "}
      <Header />
      <p
        className="uppercase mt-6"
        style={{ fontSize: "14px", fontWeight: 500 }}
      >
        To Start Analysis
      </p>
      {/* Rotating Square 1 */}
      <div className="flex-1 flex items-center justify-center relative">
        <div
          className="absolute pointer-events-none w-[280px] h-[280px] md:w-[500px] md:h-[500px]"
          style={{
            border: "3px dotted #8A8E96",
            animation: "spin-slow 50s linear infinite",
          }}
        />
        {/* Rotating Square 2 */}
        <div
          className="absolute pointer-events-none w-[280px] h-[280px] md:w-[500px] md:h-[500px]"
          style={{
            border: "3px dotted #B8BBC1",
            transform: "rotate(20deg)",
            animation: "spin-slow 65s linear infinite",
          }}
        />
        {/* Rotating Square 3 */}
        <div
          className="absolute pointer-events-none w-[280px] h-[280px] md:w-[500px] md:h-[500px]"
          style={{
            border: "3px dotted #D6D8DC",
            animation: "spin-slow 50s linear infinite reverse",
          }}
        />

        <div className="text-center relative z-10">
          {isSubmitting ? (
            <>
              <p className="text-gray-500" style={{ fontSize: "18px" }}>
                Processing submission
              </p>
              <div className="flex gap-2 justify-center mt-4">
                <span
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </>
          ) : (
            <>
              <p
                className="uppercase text-gray-400 mb-2"
                style={{ fontSize: "14px" }}
              >
                Click to Type
              </p>

              {step === "name" && (
                <>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleNameKeyDown}
                    autoFocus
                    placeholder="Introduce Yourself"
                    className="font-light border-b border-black text-center bg-transparent focus:outline-none w-full max-w-xs md:max-w-md"
                    style={{ fontSize: "clamp(1.25rem, 6vw, 3rem)" }}
                  />
                  {nameError && (
                    <p
                      className="text-red-500 mt-2"
                      style={{ fontSize: "12px" }}
                    >
                      {nameError}
                    </p>
                  )}
                </>
              )}

              {step === "location" && (
                <>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={handleLocationKeyDown}
                    autoFocus
                    placeholder="Your Location"
                    className="font-light border-b border-black text-center bg-transparent focus:outline-none w-full max-w-xs md:max-w-md"
                    style={{ fontSize: "clamp(1.25rem, 6vw, 3rem)" }}
                  />
                  {locationError && (
                    <p
                      className="text-red-500 mt-2"
                      style={{ fontSize: "12px" }}
                    >
                      {locationError}
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Link to="/" className="flex items-center gap-3 w-fit">
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

export default FormPage;