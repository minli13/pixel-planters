import React from 'react'
import { useGarden } from '../helpers/GardenContext'
import NavBar from '../components/NavBar'
import Home from './Home'
import { Link } from "react-router-dom";
import HomeButton from '../assets/HomeButton.png'
import DialogIntroNew from '../assets/DialogueIntroNewUser.png'
import DirtPatch from '../assets/DirtPatch.png'
import '../styles/styles.css'
import '../styles/garden.css'


const Garden = () => {
    const { gameState, setGameState, saveToSlot, activeSlot } = useGarden();
    
    function completeLevel(section, level) {
        const updatedSections = {
            ...gameState.sections,
            [section]: {
                ...gameState.sections[section],
                levels: {
                    ...gameState.sections[section].levels,
                    [level]: { completed: true }
                }
            }
        };

        // check if all three levels are done
        const sectionComplete = Object.values(updatedSections[section].values).every(level => level.completed);

        if (sectionComplete) {
            updatedSections[section].completed = true;
        }

        const nextLevel = null;
        if (level < 3) {
            nextLevel = level + 1;
        } else {
            nextLevel = level;
        }

        const nextSection = null;
        if (section < 2 && level === 3) {
            nextSection = section + 1;
        } else {
            nextSection = section;
        }

        const updated = {
            ...gameState,
            sections: updatedSections,
            currentSection: nextSection,
            currentLevel: nextLevel
        };
        
        setGameState(updated);
        saveToSlot(activeSlot, updated);
    }

    function handleSave() {
        saveToSlot(activeSlot, gameState);
    }
    return (
        <div className='garden-container'>
            <div>
                <NavBar />
                <button onClick={handleSave}>Save</button> {/* we need a save button */}
            </div>
            <div className='garden'>
                 {/*title*/}
                <h1>Your Garden</h1>

                {/*dialog*/}
                <div className='garden-dialogue'> 
                    <img 
                        src= {DialogIntroNew}
                        alt = "Welcome to Pixel Planters! Click a dirt patch to start growing!"/>
                </div>

                <div className='dirt-patches-container'>
                    {/*dirt patches*/}
                    <Link to="/levels/1" className='dirt-container'>
                        <img
                            src= {DirtPatch}
                            alt = "section 1"/>
                        <div className='section-number'>1</div>
                    </Link>
                    <Link to="/levels/2" className='dirt-container'>
                        <img
                        src= {DirtPatch}
                        alt = "section 2"/>
                        <div className='section-number'>2</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Garden