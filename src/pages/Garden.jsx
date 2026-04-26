import React from 'react'
import { useGarden } from '../helpers/GardenContext'
import NavBar from '../components/NavBar'
import Home from './Home'
import { Link } from "react-router-dom";
import HomeButton from '../assets/HomeButton.png'
import DialogIntroNew from '../assets/DialogueIntroNewUser.png'
import DirtPatch from '../assets/DirtPatch.png'
import './styles.css'



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
        <div className = "background-garden"
        style={{
            display: 'block'
        }}>
            <div > {/*home button*/}
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
            </div>
            <button onClick={handleSave}>Save</button> {/* we need a save button */}
            <div>
                <div>
                    <div> {/*dirt patches*/}
                        <Link to= "/levels/1">
                        <img
                            src= {DirtPatch}
                            style={{
                            height:176,
                            width: 176,
                            display: 'flex',
                            alignItems: 'center'
                            }}
                            alt = "section 1"/>
                        </Link>
                        <Link to= "/levels/2">
                            <img
                            src= {DirtPatch}
                            style={{
                            height:176,
                            width: 176,
                            display: 'flex',
                            alignItems: 'center'
                            }}
                            alt = "section 2"/>
                        </Link>
                    </div>
                    <div> {/*dialog*/}
                        <img 
                        src= {DialogIntroNew}
                        style={{
                            height:256,
                            width: 1216,
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                        alt = "Welcome to Pixel Planters! Click a dirt patch to start growing!"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Garden