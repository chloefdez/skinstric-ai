import { Link } from "react-router-dom";
import Header from "../components/Header";

function ProceedPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col px-4 md:px-10 py-8">
      <Header />
      <p
        className="uppercase mt-6"
        style={{ fontSize: "14px", fontWeight: 500 }}
      >
        To Start Analysis
      </p>
      <div className="flex-1 flex items-center justify-center relative">
        <div
          className="absolute pointer-events-none w-[280px] h-[280px] md:w-[500px] md:h-[500px]"
          style={{
            border: "3px dotted #8A8E96",
            animation: "spin-slow 50s linear infinite",
          }}
        />
        <div
          className="absolute pointer-events-none w-[280px] h-[280px] md:w-[500px] md:h-[500px]"
          style={{
            border: "3px dotted #B8BBC1",
            transform: "rotate(20deg)",
            animation: "spin-slow 65s linear infinite",
          }}
        />
        <div
          className="absolute pointer-events-none w-[280px] h-[280px] md:w-[500px] md:h-[500px]"
          style={{
            border: "3px dotted #D6D8DC",
            animation: "spin-slow 50s linear infinite reverse",
          }}
        />

        <div className="text-center relative z-10">
          <h1 className="font-light" style={{ fontSize: "32px" }}>
            Thank you!
          </h1>
          <p className="text-gray-500 mt-2">Proceed for the next step</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Link to="/form" className="flex items-center gap-3">
          <div className="w-10 h-10 border border-black rotate-45 flex items-center justify-center">
            <span className="-rotate-45 text-xs">◀</span>
          </div>
          <span className="uppercase" style={{ fontSize: "14px" }}>
            Back
          </span>
        </Link>

        <Link to="/photo" className="flex items-center gap-3">
          <span className="uppercase" style={{ fontSize: "14px" }}>
            Proceed
          </span>
          <div className="w-10 h-10 border border-black rotate-45 flex items-center justify-center">
            <span className="-rotate-45 text-xs">▶</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProceedPage;
