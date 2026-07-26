import { useState } from "react";
import { Link } from "react-router-dom";

function FormPage() {
  const [step, setStep] = useState("name");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");

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
      setLocationError("");
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
        localStorage.setItem("skinstric_location", location);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-10 py-8">
      <header className="flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <p
            className="uppercase"
            style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "-2%" }}
          >
            SKINSTRIC
          </p>
          <span
            className="uppercase text-gray-400"
            style={{ fontSize: "14px" }}
          >
            [ INTRO ]
          </span>
        </div>
        <button
          className="bg-black text-white uppercase px-5 py-2"
          style={{ fontSize: "14px" }}
        >
          Enter Code
        </button>
      </header>

      <p
        className="uppercase mt-6"
        style={{ fontSize: "14px", fontWeight: 500 }}
      >
        To Start Analysis
      </p>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
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
                className="font-light border-b border-black text-center bg-transparent focus:outline-none"
                style={{ fontSize: "48px" }}
              />
              {nameError && (
                <p className="text-red-500 mt-2" style={{ fontSize: "12px" }}>
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
                className="font-light border-b border-black text-center bg-transparent focus:outline-none"
                style={{ fontSize: "48px" }}
              />
              {locationError && (
                <p className="text-red-500 mt-2" style={{ fontSize: "12px" }}>
                  {locationError}
                </p>
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