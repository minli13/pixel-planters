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
import FullBloom from '../assets/RedPlantGrowth/RedPlant.png';
import MediumBloom from '../assets/RedPlantGrowth/SmallRedPlant.png';
import SmallBloom from '../assets/RedPlantGrowth/sproutRedPlant.png';

const FLOWER_STAGES = {
  0: null,        // no levels done, just dirt
  1: SmallBloom,        // level 1 done
  2: MediumBloom,      // level 2 done
  3: FullBloom,      // all 3 done
};

const Garden = () => {
    const { slots, gameState, setGameState, saveToSlot, activeSlot } = useGarden();
    const currentSave = slots[activeSlot];

    function getFlowerStage(section) {
        const completed = Object.values(currentSave.sections[section].levels).filter(l => l.completed).length; // count completed levels
        return FLOWER_STAGES[completed];
    }
    
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
            </div>
            <div className='garden'>
                 {/*title*/}
                {/* <h1>Your Garden</h1> */}

                {/*dialog*/}
                <div className='garden-dialogue'> 
                    <img 
                        src= {DialogIntroNew}
                        alt = "Welcome to Pixel Planters! Click a dirt patch to start growing!"/>
                </div>

                <div className='dirt-patches-container'>
                    {/*dirt patches*/}
                    {[1, 2].map(section => (
                        <Link key={section} to={`/levels/${section}`} className='dirt-container'>
                            <div style={{ position: 'relative', display: 'inline-block'}}>
                                <img
                                    src= {DirtPatch}
                                    alt = {`section ${section}`}
                                />
                                {getFlowerStage(section) && (
                                    <img
                                        src= {getFlowerStage(section)}
                                        alt = {`section ${section} flower`}
                                        style={{ position: 'absolute', top: '0', left: '0', width: '110px', height: 'auto'}}
                                    />
                                )}
                            </div>
                            <div className='section-number'>{section}</div> 

                        </Link>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Garden