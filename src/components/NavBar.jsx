import { Link } from "react-router-dom";
import HomeButton from '../assets/HomeButton.png'
import { useGarden } from '../helpers/GardenContext'
import '../styles/navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'


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

            <Link to={`/levels/${gameState?.currentSection ?? 1}`}><FontAwesomeIcon icon={faArrowLeftLong} /> Levels</Link>
            <Link to="/garden"><FontAwesomeIcon icon={faArrowLeftLong}  /> Garden</Link>
            <Link to="/gameSlots"><FontAwesomeIcon icon={faArrowLeftLong} /> Game Slots</Link>
        </nav>
    );
}

export default Navbar;