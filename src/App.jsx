import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import FormPage from "./pages/FormPage";
import ProceedPage from "./pages/ProceedPage";
import PhotoCapture from "./pages/PhotoCapture";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/proceed" element={<ProceedPage />} />
        <Route path="/phase-two" element={<PhotoCapture />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;