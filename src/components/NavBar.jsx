import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/levels">Levels</Link>
      <Link to="/garden">Garden</Link>
    </nav>
  );
}

export default Navbar;