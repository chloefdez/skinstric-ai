import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import Header from "../components/Header";

function Results() {
  const storedData = localStorage.getItem("skinstricAnalysis");
  const analysis = storedData ? JSON.parse(storedData) : null;

  const navigate = useNavigate();
  const [hoveredDiamond, setHoveredDiamond] = useState(null);
  const hoverTimeout = useRef(null);

  const handleDiamondEnter = (id) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    if (hoveredDiamond === null) {
        setHoveredDiamond(id);
    } else {
        setHoveredDiamond(null);
        hoverTimeout.current = setTimeout(() => setHoveredDiamond(id), 300);
    }
    };

  const handleDiamondLeave = () => {
    hoverTimeout.current = setTimeout(() => setHoveredDiamond(null), 0);
    };

  return (
    <div className="min-h-screen bg-white flex flex-col px-10 py-8">
      <Header />
      <p
        className="uppercase mt-6"
        style={{ fontSize: "14px", fontWeight: 500 }}
      >
        A.I. Analysis
      </p>
      <p className="uppercase mt-2" style={{ fontSize: "12px" }}>
        A.I.has estimated the following.
        <br />
        Fix estimated information if needed.
      </p>

      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div className="relative w-[398px] h-[398px] scale-[0.65] sm:scale-[0.85] md:scale-100 origin-center">
          {/* Outer dotted diamond - fades in/out based on hover state */}
          <div
            className="absolute pointer-events-none transition-all duration-300 ease-out w-[398px] h-[398px]"
            style={{
              top: "0px",
              left: "0px",
              border: "2px dotted #A0A4AB",
              transform: hoveredDiamond
                ? "rotate(45deg) scale(1)"
                : "rotate(45deg) scale(0.85)",
              opacity: hoveredDiamond ? 1 : 0,
            }}
          />
          {/* Demographics - top */}
          <div
            onClick={() => navigate("/summary")}
            onMouseEnter={() => handleDiamondEnter("demographics")}
            onMouseLeave={handleDiamondLeave}
            className="absolute bg-gray-300 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{
              width: "160px",
              height: "160px",
              transform: "rotate(45deg)",
              top: "0px",
              left: "119px",
            }}
          >
            <span
              style={{
                transform: "rotate(-45deg)",
                fontSize: "18px",
              }}
              className="whitespace-nowrap uppercase"
            >
              Demographics
            </span>
          </div>
          {/* Cosmetic Concerns - left */}
          <div
            onMouseEnter={() => handleDiamondEnter("cosmetic concerns")}
            onMouseLeave={handleDiamondLeave}
            className="absolute bg-gray-100 flex items-center justify-center cursor-not-allowed transition-transform duration-300 hover:scale-105"
            style={{
              width: "160px",
              height: "160px",
              transform: "rotate(45deg)",
              top: "119px",
              left: "0px",
            }}
          >
            <span
              style={{
                transform: "rotate(-45deg)",
                fontSize: "18px",
              }}
              className="text-center uppercase"
            >
              Cosmetic
              <br />
              Concerns
            </span>
          </div>
          {/* Skin Type Details - right */}
          <div
            onMouseEnter={() => handleDiamondEnter("skin type details")}
            onMouseLeave={handleDiamondLeave}
            className="absolute bg-gray-100 flex items-center justify-center cursor-not-allowed transition-transform duration-300 hover:scale-105"
            style={{
              width: "160px",
              height: "160px",
              transform: "rotate(45deg)",
              top: "119px",
              left: "238px",
            }}
          >
            <span
              style={{
                transform: "rotate(-45deg)",
                fontSize: "18px",
              }}
              className="text-center uppercase"
            >
              Skin Type
              <br />
              Details
            </span>
          </div>
          {/* Weather - bottom */}
          <div
            onMouseEnter={() => handleDiamondEnter("weather")}
            onMouseLeave={handleDiamondLeave}
            className="absolute bg-gray-100 flex items-center justify-center cursor-not-allowed transition-transform duration-300 hover:scale-105"
            style={{
              width: "160px",
              height: "160px",
              transform: "rotate(45deg)",
              top: "238px",
              left: "119px",
            }}
          >
            <span
              style={{
                transform: "rotate(-45deg)",
                fontSize: "18px",
              }}
              className="whitespace-nowrap uppercase"
            >
              Weather
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-2">
        <Link to="/photo" className="flex items-center gap-3">
          <div className="w-10 h-10 border border-black rotate-45 flex items-center justify-center">
            <span className="-rotate-45 text-xs">◀</span>
          </div>
          <span className="uppercase" style={{ fontSize: "14px" }}>
            Back
          </span>
        </Link>

        <Link to="/summary" className="flex items-center gap-3">
          <span className="uppercase" style={{ fontSize: "14px" }}>
            Get Summary
          </span>
          <div className="w-10 h-10 border border-black rotate-45 flex items-center justify-center">
            <span className="-rotate-45 text-xs">▶</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Results;