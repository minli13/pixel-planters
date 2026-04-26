import React from 'react'

const SlotCard = ({slotNumber, save, isNaming, inputName, onNameChange, onContinue, onNewGame, onConfirmNew, onCancelNaming, onDelete}) => {
    // new slot
    if (isNaming) {
        return (
            <div>
                <p>Slot {slotNumber + 1}</p>
                <input
                    value={inputName}
                    onChange={e => onNameChange(e.target.value)} 
                    placeholder='Name your garden...'
                />
                <button onClick={onConfirmNew}>Start</button>
                <button onClick={onCancelNaming}>Cancel</button>
            </div>
        )
    }

    // existing save
    if (save) {
        return (
            <div>
                <p>Slot {slotNumber + 1}</p>
                <p>{save.name}</p>
                <p>Level {save.currentLevel} - Section {save.currentSection}</p>
                <button onClick={onContinue}>Continue</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        )
    }

    // empty
    return (
        <div>
            <p>Slot {slotNumber + 1}</p>
            <p>Empty</p>
            <button onClick={onNewGame}>New Game</button>
        </div>
    )
}

export default SlotCard