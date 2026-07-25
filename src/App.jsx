import rectangle2778 from "./assets/Rectangle 2778.png";
import rectangle2779 from "./assets/Rectangle 2779.png";

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between px-10 py-8">
      {/* Top bar */}
      <header className="flex justify-between items-center">
        <p className="font-medium tracking-wide">SKINSTRIC</p>
        <nav className="flex gap-6 text-sm">
          <span>INTRO</span>
          <span>ENTER CODE</span>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex flex-col gap-6 max-w-lg">
        <h1
          className="font-light text-[#1A1B1C]"
          style={{
            fontSize: "128px",
            lineHeight: "120px",
            letterSpacing: "-7%",
          }}
        >
          Sophisticated skincare
        </h1>
        <p
          className="uppercase max-w-[316px]"
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
        <button className="w-fit border px-6 py-3 text-sm tracking-wide">
          ENTER EXPERIENCE
        </button>
      </main>

      {/* Decorative graphic */}
      <div className="absolute right-10 top-1/4 w-80 h-80">
        <img
          src={rectangle2778}
          alt=""
          className="absolute inset-0 w-full h-full"
        />
        <img
          src={rectangle2779}
          alt=""
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}

export default App;
