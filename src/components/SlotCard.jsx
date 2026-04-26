import React from 'react'

const SlotCard = ({slotNumber, save, isNaming, inputName, onNameChange, onContinue, onNewGame, onConfirmNew, onCancelNaming, onDelete}) => {
    // new slot
    if (isNaming) {
        return (
            <div className='slot'>
                <p className='plot-number'>PLOT {slotNumber + 1}</p>
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
            <div className='slot'>
                <p className='plot-number'>PLOT {slotNumber + 1}</p>
                <p className='plot-name'>{save.name}</p>
                <p className='plot-level'>Section {save.currentSection} - Level {save.currentLevel}</p>
                <button onClick={onContinue}>Continue</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        )
    }

    // empty
    return (
        <div className='slot'>
            <p className='plot-number'>PLOT {slotNumber + 1}</p>
            <p className='plot-name'>Empty</p>
            <button onClick={onNewGame}>New Game</button>
        </div>
    )
}

export default SlotCard