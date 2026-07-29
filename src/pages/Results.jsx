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
    </div>
  );
}

export default Results;