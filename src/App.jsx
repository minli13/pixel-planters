import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { GardenContext } from "./helpers/GardenContext.js";
import { useSaveSystem } from "./helpers/saveSystem.js";
import Home from "./pages/Home.jsx";
import Garden from "./pages/Garden.jsx";
import Level from "./pages/Level.jsx";
import Levels from "./pages/Levels.jsx";
import GameSlots from "./pages/GameSlots.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const [gameState, setGameState] = useState(null);
  const saveSystem = useSaveSystem();

  return (
    <GardenContext.Provider value={{ gameState, setGameState, ...saveSystem }}>
      <Routes>
        {/* protected route ensure path is not accessible without being logged in */}
        <Route path="/" element={<Home />} />
        <Route path="/gameSlots" element={<GameSlots />} />
        <Route path="/garden" element={<ProtectedRoute><Garden /></ProtectedRoute>} />
        <Route path="/levels/:section" element={<ProtectedRoute><Levels /></ProtectedRoute>} />
        <Route path="/level/:section/:level" element={<ProtectedRoute><Level /></ProtectedRoute>} />
      </Routes>
    </GardenContext.Provider>
  );
}

export default App;