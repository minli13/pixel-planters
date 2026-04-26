import React from 'react'
import { useState } from 'react'
import { useGarden } from '../helpers/GardenContext'
import { useNavigate } from 'react-router-dom'
import '../styles/slots.css'
import SlotCard from '../components/SlotCard'

const GameSlots = () => {
    const { 
        slots,
        activeSlot,
        saveToSlot,
        loadFromSlot,
        deleteSlot,
        newSlot,
        setGameState
     } = useGarden();
    const navigate = useNavigate();
    const [namingSlot, setNamingSlot] = useState(null);
    const [inputName, setInputName] = useState('');

    function handleContinue(slotIndex) {
        const saved = loadFromSlot(slotIndex);
        if (saved) {
            setGameState(saved);
            navigate('/garden');
        }
    }

    function handleNewGame(slotIndex) {
        setNamingSlot(slotIndex);
        setInputName('');
    }

    function handleConfirmNew() {
        const fresh = newSlot(namingSlot, inputName || 'My Garden');
        setGameState(fresh);
        setNamingSlot(null);
        navigate('/garden');
    }
    
    function handleLoad(slotIndex) {
        const saved = loadFromSlot(slotIndex);
        if (saved) {
            setGameState(saved);
            navigate('/garden');
        }
    }

    return (
        <div className='slot-saves'>
            <p>YOUR GARDEN SAVES</p>
            <div className='slot-container'>
                {[0, 1, 2].map(i => (
                    <SlotCard
                        key={i}
                        slotNumber={i}
                        save={slots[i]}
                        isNaming={namingSlot === i}
                        inputName={inputName}
                        onNameChange={setInputName}
                        onContinue={() => handleContinue(i)}
                        onNewGame={() => handleNewGame(i)}
                        onConfirmNew={handleConfirmNew}
                        onCancelNaming={() => setNamingSlot(null)}
                        onDelete={() => deleteSlot(i)}
                    />
                ))}
             </div>
        </div>
    )
}

export default GameSlots