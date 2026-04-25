import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Garden from "./pages/Garden.jsx";
import Levels from "./pages/Levels.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/garden" element={<Garden />} />
      <Route path="/levels" element={<Levels />} />
    </Routes>
  );
}

export default App;