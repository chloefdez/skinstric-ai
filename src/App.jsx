import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import FormPage from "./pages/FormPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;