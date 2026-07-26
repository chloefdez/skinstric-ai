import { Link } from "react-router-dom";
import { useState } from "react";

function IntroPage() {

    const [hoveredSide, setHoveredSide] = useState(null);

  return (
    <div className="min-h-screen bg-white flex flex-col px-10 py-8">
      {/* Top bar */}
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

      {/* Everything below the header */}
      <div className="flex-1 relative">
        {/* Centered headline + subtext */}
        <main className="absolute inset-0 flex flex-col items-center justify-center gap-6 max-w-2xl mx-auto text-center">
          <h1
            className="font-light text-[#1A1B1C]"
            style={{
              fontSize: "100px",
              lineHeight: "120px",
              letterSpacing: "-7%",
              animation: "fade-in 1.2s ease-in",
              transform:
                hoveredSide === "left"
                  ? "translateX(35vw)"
                  : hoveredSide === "right"
                  ? "translateX(-35vw)"
                  : "translateX(0)",
              transition: "transform 0.4s ease",
            }}
          >
            Sophisticated skincare
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
          className="absolute pointer-events-none transition-opacity duration-300"
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
          className="absolute left-0 flex items-center gap-3 transition-all duration-300 hover:scale-110"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
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
          className="absolute pointer-events-none transition-opacity duration-300"
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
          className="absolute right-0 flex items-center gap-3 transition-all duration-300 hover:scale-110"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
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
