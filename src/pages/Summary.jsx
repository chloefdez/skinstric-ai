import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";

function Summary() {
  const storedData = localStorage.getItem("skinstricAnalysis");
  const analysis = storedData ? JSON.parse(storedData) : null;

  function getSortedEntries(obj) {
    if (!obj) return [];
    return Object.entries(obj).sort((a, b) => b[1] - a[1]);
  }

  // race data
  const sortedRace = analysis ? getSortedEntries(analysis.data.race) : [];
  const topRace = sortedRace[0];
  const topRaceLabel = topRace ? topRace[0] : "";
  const topRacePercent = topRace ? Math.round(topRace[1] * 100) : 0;
  const [selectedRace, setSelectedRace] = useState(null);
  const [activeCategory, setActiveCategory] = useState("race");
  const activeRace = selectedRace || topRace;
  const activeRaceLabel = activeRace ? activeRace[0] : "";
  const activeRacePercent = activeRace ? Math.round(activeRace[1] * 100) : 0;

  // age data
  const sortedAge = analysis ? getSortedEntries(analysis.data.age) : [];
  const topAge = sortedAge[0];
  const [selectedAge, setSelectedAge] = useState(null);
  const activeAge = selectedAge || topAge;
  const activeAgeLabel = activeAge ? activeAge[0] : "";
  const activeAgePercent = activeAge ? Math.round(activeAge[1] * 100) : 0;

  // sex data
  const sortedSex = analysis ? getSortedEntries(analysis.data.gender) : [];
  const topSex = sortedSex[0];
  const [selectedSex, setSelectedSex] = useState(null);
  const activeSex = selectedSex || topSex;
  const activeSexLabel = activeSex ? activeSex[0] : "";
  const activeSexPercent = activeSex ? Math.round(activeSex[1] * 100) : 0;

  const categoryData = {
    race: {
      sorted: sortedRace,
      label: activeRaceLabel,
      percent: activeRacePercent,
      setSelected: setSelectedRace,
      key: "Race",
    },
    age: {
      sorted: sortedAge,
      label: activeAgeLabel,
      percent: activeAgePercent,
      setSelected: setSelectedAge,
      key: "Age",
    },
    sex: {
      sorted: sortedSex,
      label: activeSexLabel,
      percent: activeSexPercent,
      setSelected: setSelectedSex,
      key: "Sex",
    },
  };

  const current = categoryData[activeCategory];

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

      <div className="flex flex-col md:flex-row mt-10 border-t border-gray-200">
        {/* Left sidebar - category tabs */}
        <div className="w-full md:w-[220px] flex md:block border-b md:border-b-0 md:border-r border-gray-200">
          <div
            onClick={() => setActiveCategory("race")}
            className={`flex-1 px-4 md:px-6 py-4 md:py-6 cursor-pointer transition-colors ${
              activeCategory === "race"
                ? "bg-black text-white"
                : "border-r md:border-r-0 md:border-b border-gray-200 hover:bg-gray-200"
            }`}
          >
            <p style={{ fontSize: "16px" }} className="capitalize truncate">
              {activeRaceLabel}
            </p>
            <p
              className="uppercase text-gray-400 mt-1"
              style={{ fontSize: "10px" }}
            >
              Race
            </p>
          </div>

          <div
            onClick={() => setActiveCategory("age")}
            className={`flex-1 px-4 md:px-6 py-4 md:py-6 cursor-pointer transition-colors ${
              activeCategory === "age"
                ? "bg-black text-white"
                : "border-r md:border-r-0 md:border-b border-gray-200 hover:bg-gray-200"
            }`}
          >
            <p style={{ fontSize: "16px" }} className="capitalize truncate">
              {activeAgeLabel}
            </p>
            <p
              className="uppercase text-gray-400 mt-1"
              style={{ fontSize: "10px" }}
            >
              Age
            </p>
          </div>

          <div
            onClick={() => setActiveCategory("sex")}
            className={`flex-1 px-4 md:px-6 py-4 md:py-6 cursor-pointer transition-colors ${
              activeCategory === "sex"
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <p style={{ fontSize: "16px" }} className="capitalize truncate">
              {activeSexLabel}
            </p>
            <p
              className="uppercase text-gray-400 mt-1"
              style={{ fontSize: "10px" }}
            >
              Sex
            </p>
          </div>
        </div>

        {/* Center - selected category display */}
        <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center gap-6 py-10 md:py-0">
          <p
            style={{ fontSize: "28px" }}
            className="capitalize text-center px-4"
          >
            {current.label}
            {activeCategory === "age" && (
              <span className="normal-case"> y.o.</span>
            )}
          </p>

          <div className="relative w-[240px] h-[240px] md:w-[500px] md:h-[500px]">
            <svg width="100%" height="100%" viewBox="0 0 500 500">
              <circle
                cx="250"
                cy="250"
                r="210"
                fill="none"
                stroke="#e5e5e5"
                strokeWidth="6"
              />
              <circle
                cx="250"
                cy="250"
                r="210"
                fill="none"
                stroke="black"
                strokeWidth="6"
                strokeDasharray="1319.5"
                strokeDashoffset={1319.5 * (1 - current.percent / 100)}
                transform="rotate(-90 250 250)"
                style={{ transition: "stroke-dashoffset 0.6s ease-in-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <p style={{ fontSize: "36px" }} className="md:text-[48px]">
                {current.percent}%
              </p>
            </div>
          </div>
        </div>

        {/* Right - full list with confidence % */}
        <div className="w-full md:w-[300px] border-t md:border-t-0 md:border-l border-gray-200">
          <div className="flex justify-between px-4 md:px-6 py-4 border-b border-gray-200">
            <span className="uppercase" style={{ fontSize: "12px" }}>
              {current.key}
            </span>
            <span
              className="uppercase text-gray-400"
              style={{ fontSize: "12px" }}
            >
              A.I. Confidence
            </span>
          </div>

          {current.sorted.map(([label, value]) => (
            <div
              key={label}
              onClick={() => current.setSelected([label, value])}
              className={`flex justify-between px-4 md:px-6 py-4 capitalize cursor-pointer transition-colors ${
                current.label === label
                  ? "bg-black text-white"
                  : "border-b border-gray-100 hover:bg-gray-200"
              }`}
            >
              <span>{label}</span>
              <span>{Math.round(value * 100)}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-10 fixed md:static bottom-0 left-0 right-0 bg-white px-4 md:px-0 py-4 md:py-0 border-t md:border-t-0 border-gray-200 z-20">
        <Link to="/results" className="flex items-center gap-3">
          <div className="w-10 h-10 border border-black rotate-45 flex items-center justify-center">
            <span className="-rotate-45 text-xs">◀</span>
          </div>
          <span className="uppercase" style={{ fontSize: "14px" }}>
            Back
          </span>
        </Link>

        <Link to="/" className="flex items-center gap-3">
          <span className="uppercase" style={{ fontSize: "14px" }}>
            Home
          </span>
          <div className="w-10 h-10 border border-black rotate-45 flex items-center justify-center">
            <span className="-rotate-45 text-xs">▶</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Summary;