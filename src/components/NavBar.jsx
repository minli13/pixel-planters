import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/levels">Levels</Link>
      <Link to="/garden">Garden</Link>
      <Link to="/gameSlots">Game Slots</Link>
    </nav>
  );
}

export default Navbar;