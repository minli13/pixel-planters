import React from 'react'
import { useGarden } from '../GardenContext'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import HomeButton from '../assets/HomeButton.png'
import StringIntro from '../assets/DialogStringIntro.png'
import './styles.css'

const Levels = () => {
    const { gameState } = useGarden();
    const navigate = useNavigate();

    if (!gameState) {
        return <p>Loading...</p>;
    }

    function isLocked(section, level) {
        if (section === 1 && level === 1) {
            return false;
        }

        // check previous level in same sections
        if (level > 1) {
            return !gameState.sections[section].levels[level - 1].completed;
        }

        // check previous level in previous section
        if (level === 1) {
            return !gameState.sections[section - 1].levels[3].completed;
        }
    }

    function handleSelectLevel(section, level) {
        if (!isLocked(section, level)) {
            navigate(`/level/${section}/${level}`);
        }
    }

    return (
        <div>
            <div>
                {[1, 2].map(section => (
                    <div key={section}>
                        <h2>Section {section}</h2>
                        {[1, 2, 3].map(level => (
                            <button
                                key={level}
                                onClick={() => handleSelectLevel(section, level)}
                                disabled={isLocked(section, level)}
                            >
                                Level {level}
                                {gameState.sections[section].levels[level].completed && ' (Completed)'}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
    
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
                alt = "Home"/>
                </Link>
                <div className = "background-image-container"> {/*title and description*/}
                <h1>Levels</h1>
                <img
                src= {StringIntro}
                style={{
                    display: 'flex',
                    alignItems: 'start'
                }}
                alt = "Home"/>
                </div>
            </div>
        </div>
    )
}

export default Levels