import React from 'react'
import { useGarden } from '../helpers/GardenContext'
import { useNavigate, useParams, Link } from 'react-router-dom'
import HomeButton from '../assets/HomeButton.png'
import StringIntro from '../assets/DialogStringIntro.png'
import '../styles/styles.css'
import '../styles/levels.css'

const Levels = () => {
    const { section } = useParams();
    const { gameState } = useGarden();
    const navigate = useNavigate();

    function isLocked(level) {
        if (level === 1) {
            return false;
        }
        return !gameState.sections[section].levels[level - 1].completed;
    }

    return (
        <div>    
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

            <div className = "background-image-container"> {/*title and description*/}
                <h1>Section {section}</h1>
                {[1, 2, 3].map(level => (
                    <button
                        key={level}
                        onClick={() => !isLocked(level) && navigate(`/level/${section}/${level}`)}
                        disabled={isLocked(level)}
                        className='level-btn'
                    >
                        Level {level}
                        {gameState.sections[section].levels[level].completed && ' (Completed)'}
                    </button>
                ))}
                <img
                    src= {StringIntro}
                    style={{
                        display: 'flex',
                        alignItems: 'start'
                    }}
                    alt = "Home"
                />
            </div>
        </div>
    )
}

export default Levels