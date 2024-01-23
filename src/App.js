import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PrintPage from "./components/PrintPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id/print" element={<PrintPage />} />
      </Routes>
    </>
  );
}

export default App;
