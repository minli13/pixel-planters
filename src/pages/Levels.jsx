import React from 'react'
import { useGarden } from '../helpers/GardenContext'
import { useNavigate, useParams, Link } from 'react-router-dom'
import HomeButton from '../assets/HomeButton.png'
import StringIntro from '../assets/DialogStringIntro.png'
import '../styles/styles.css'
import '../styles/levels.css'
import Navbar from '../components/NavBar'

const Levels = () => {
    const { section } = useParams();
    const { slots, activeSlot } = useGarden();
    const navigate = useNavigate();

    const currentSave = slots[activeSlot];
    if (!currentSave?.sections?.[section]?.levels) return <p>Loading...</p>;

    function isLocked(level) {
        if (level === 1) {
            return false;
        }
        return !currentSave.sections[section].levels[level - 1].completed;
    }

    return (
        <div className='levels-page'>              
            <Navbar />
            <div className = "levels-container">
                <h1>Section {section}</h1>
                <img
                    className = "levels-dialogue"
                    src= {StringIntro}
                    alt = "Home"
                />
                {[1, 2, 3].map(level => (
                    <button
                        key={level}
                        onClick={() => !isLocked(level) && navigate(`/level/${section}/${level}`)}
                        disabled={isLocked(level)}
                        className='levels-btn'
                    >
                        Level {level}
                        {currentSave.sections[section].levels[level].completed && ' (Completed)'}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Levels