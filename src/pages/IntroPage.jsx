import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";

function IntroPage() {
  const [hoveredSide, setHoveredSide] = useState(null);

  return (
    <div className="min-h-screen bg-white flex flex-col px-10 py-8">
      {/* Header */}
      <Header />

      <div className="flex-1 relative">
        {/* Centered headline + subtext */}
        <main
          className={`absolute inset-0 flex flex-col gap-6 text-center px-6 md:px-16 transition-all duration-500 ${
            hoveredSide === "left"
              ? "items-end justify-center text-right"
              : hoveredSide === "right"
              ? "items-start justify-center text-left"
              : "items-center justify-center text-center"
          }`}
        >
          {" "}
          <h1
            className="font-light text-[#1A1B1C]"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6.25rem)",
              lineHeight: "1.15",
              letterSpacing: "-7%",
              animation: "fade-in 1.2s ease-in",
            }}
          >
            Sophisticated
            <br />
            skincare
          </h1>
        </main>
        <p
          className="absolute left-0 bottom-8 uppercase max-w-[316px]"
          style={{
            fontSize: "14px",
            lineHeight: "24px",
            letterSpacing: "0%",
            color: "#1A1B1C",
          }}
        >
          Skinstric developed an A.I. that creates a highly-personalized routine
          tailored to what your skin needs.
        </p>

        {/* Left diamond + label */}
        <div
          className="absolute pointer-events-none transition-opacity duration-300 hidden md:block"
          style={{
            left: -60,
            top: "50%",
            width: "426px",
            height: "426px",
            border: "2px dotted #A0A4AB",
            transform: "translate(-50%, -50%) rotate(45deg)",
            opacity: hoveredSide === "right" ? 0 : 1,
          }}
        />
        <div
          className="absolute left-4 bottom-32 md:left-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 flex items-center gap-3 transition-all duration-300 hover:scale-110"
          style={{
            opacity: hoveredSide === "right" ? 0 : 1,
            pointerEvents: hoveredSide === "right" ? "none" : "auto",
          }}
          onMouseEnter={() => setHoveredSide("left")}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <div className="w-10 h-10 border border-black rotate-45 flex items-center justify-center">
            <span className="-rotate-45 text-xs">◀</span>
          </div>
          <span className="uppercase" style={{ fontSize: "14px" }}>
            Discover A.I.
          </span>
        </div>

        {/* Right diamond + label */}
        <div
          className="absolute pointer-events-none transition-opacity duration-300 hidden md:block"
          style={{
            right: -60,
            top: "50%",
            width: "426px",
            height: "426px",
            border: "2px dotted #A0A4AB",
            transform: "translate(50%, -50%) rotate(45deg)",
            opacity: hoveredSide === "left" ? 0 : 1,
          }}
        />

        <Link
          to="/form"
          className="absolute right-4 bottom-32 md:right-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 flex items-center gap-3 transition-all duration-300 hover:scale-110"
          style={{
            opacity: hoveredSide === "left" ? 0 : 1,
            pointerEvents: hoveredSide === "left" ? "none" : "auto",
          }}
          onMouseEnter={() => setHoveredSide("right")}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <span className="uppercase" style={{ fontSize: "14px" }}>
            Take Test
          </span>
          <div className="w-10 h-10 border border-black rotate-45 flex items-center justify-center">
            <span className="-rotate-45 text-xs">▶</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default IntroPage;