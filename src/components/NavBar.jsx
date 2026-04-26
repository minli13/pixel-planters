import { Link } from "react-router-dom";
import HomeButton from '../assets/HomeButton.png'
import { useGarden } from '../helpers/GardenContext'
import '../styles/navbar.css'

function Navbar() {
    const { gameState } = useGarden();

    return (
        <nav>
            {/*home button*/}
            <Link to="/"> 
                <img
                    src= {HomeButton}
                    style={{
                        height:68,
                        width:68,
                        display: 'flex',
                        alignItems: 'start'
                    }}
                    alt = "Home"
                />
            </Link>

            <Link to={`/levels/${gameState?.currentSection ?? 1}`}>Levels</Link>
            <Link to="/garden">Garden</Link>
            <Link to="/gameSlots">Game Slots</Link>
        </nav>
    );
}

export default Navbar;