import React from 'react'
import { useGarden } from '../helpers/GardenContext'
import { useNavigate, useParams, Link } from 'react-router-dom'
import HomeButton from '../assets/HomeButton.png'
import GarButton from '../assets/GardenButton.png'
import StringIntro from '../assets/DialogStringIntro.png'
import VariableIntro from '../assets/DialogVariableIntro.png'
import './styles.css'
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
        <div className = 'background-plain'>{/*title and description*/}
        <div>
            {/*home button*/}
            <Link to="/"> 
                <img
                    src= {HomeButton}
                    style={{
                        height:68,
                        width:68,
                        display: 'flex-start',

                    }}
                    alt = "Home"
                />
            </Link>
            {/*garden button*/}
            <Link to="/garden"> 
                <img
                    src= {GarButton}
                    style={{
                        height:68,
                        width:68,
                        display: 'flex-start',

                    }}
                    alt = "Garden"
                />
            </Link>
            <h1>Section {section}</h1>
        </div>
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
                src= {VariableIntro}
                style={{
                    display: 'flex',
                    alignItems: 'start'
                }}
                alt = "Home"
            />
        </div>
    )
}

export default Levels