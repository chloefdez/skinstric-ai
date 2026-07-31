import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between items-center z-10">
      <div className="flex items-center gap-4">
        <Link to="/">
        <p
          className="uppercase"
          style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "-2%" }}
        >
          SKINSTRIC
        </p>
        </Link>
        <span className="uppercase text-gray-400" style={{ fontSize: "14px" }}>
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
  );
}

export default Header;
