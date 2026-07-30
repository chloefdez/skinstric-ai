import { Link } from "react-router-dom";
import Header from "../components/Header";

function Results() {
  const storedData = localStorage.getItem("skinstricAnalysis");
  const analysis = storedData ? JSON.parse(storedData) : null;

  console.log(analysis);

  return (
    <div className="min-h-screen bg-white flex flex-col px-10 py-8">
      <Header />
      <p
        className="uppercase mt-6"
        style={{ fontSize: "14px", fontWeight: 500 }}
      >
        A.I. Analysis
      </p>
      <p className="uppercase mt-2" style={{fontSize:"12px"}}>
      A.I.has estimated the following.
      <br />
      Fix estimated information if needed. 
      </p>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative" style={{ width: "418px", height: "418px" }}>
          {/* Demographics - top */}
          <div
            className="absolute bg-gray-300 flex items-center justify-center"
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
            className="absolute bg-gray-100 flex items-center justify-center cursor-not-allowed"
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
            className="absolute bg-gray-100 flex items-center justify-center cursor-not-allowed"
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
            className="absolute bg-gray-100 flex items-center justify-center cursor-not-allowed"
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

      <div className="flex justify-between items-center">
        <Link to="/photo" className="flex items-center gap-3">
          <div className="w-10 h-10 border border-black rotate-45 flex items-center justify-center">
            <span className="-rotate-45 text-xs">◀</span>
          </div>
          <span className="uppercase" style={{ fontSize: "14px" }}>
            Back
          </span>
        </Link>

        <div className="flex items-center gap-3 cursor-pointer">
          <span className="uppercase" style={{ fontSize: "14px" }}>
            Get Summary
          </span>
          <div className="w-10 h-10 border border-black rotate-45 flex items-center justify-center">
            <span className="-rotate-45 text-xs">▶</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;