import { Link } from "react-router-dom";
import Header from "../components/Header";

function Summary() {
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
      <h1 className="uppercase" style={{ fontSize: "48px", fontWeight: 300 }}>
        Demographics
      </h1>
      <p className="uppercase text-gray-400" style={{ fontSize: "12px" }}>
        Predicted Race & Age
      </p>
      <div className="flex mt-10 border-t border-gray-200">
        {/* Left sidebar - category tabs */}
        <div style={{ width: "220px" }} className="border-r border-gray-200">
          <div className="bg-black text-white px-6 py-6">
            <p style={{ fontSize: "18px" }}>East asian</p>
            <p
              className="uppercase text-gray-400 mt-1"
              style={{ fontSize: "10px" }}
            >
              Race
            </p>
          </div>
          <div className="px-6 py-6 border-b border-gray-200">
            <p style={{ fontSize: "18px" }}>10-19</p>
            <p
              className="uppercase text-gray-400 mt-1"
              style={{ fontSize: "10px" }}
            >
              Age
            </p>
          </div>
          <div className="px-6 py-6">
            <p style={{ fontSize: "18px" }}>Male</p>
            <p
              className="uppercase text-gray-400 mt-1"
              style={{ fontSize: "10px" }}
            >
              Sex
            </p>
          </div>
        </div>

        {/* Center - selected category display */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center">
          <p style={{ fontSize: "32px" }}>East asian</p>
        </div>

        {/* Right - full list with confidence % */}
        <div style={{ width: "300px" }} className="border-l border-gray-200">
          <div className="flex justify-between px-6 py-4 border-b border-gray-200">
            <span className="uppercase" style={{ fontSize: "12px" }}>
              Race
            </span>
            <span
              className="uppercase text-gray-400"
              style={{ fontSize: "12px" }}
            >
              A.I. Confidence
            </span>
          </div>
          <div className="flex justify-between px-6 py-4 bg-black text-white">
            <span>East asian</span>
            <span>87%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
