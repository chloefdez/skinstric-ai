import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import FormPage from "./pages/FormPage";
import ProceedPage from "./pages/ProceedPage";
import PhotoCapture from "./pages/PhotoCapture";
import Results from "./pages/Results";
import Summary from "./pages/Summary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/proceed" element={<ProceedPage />} />
        <Route path="/photo" element={<PhotoCapture />} />
        <Route path="/results" element={<Results />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;