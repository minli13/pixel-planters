import React from 'react'
import { DndContext, DragOverlay, useDroppable, pointerWithin, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useState, useEffect } from 'react';
import '../styles/problem.css'


function SnippetZone ({ slotted }) {
    return (
        <div className='snippet-zone'>
            {slotted.map((slot, index) => (
                <Slot key={slot.id} slot={slot} index={index} />
            ))}
        </div>
    )
}

function Slot ({ slot }) {
    const {setNodeRef, isOver } = useDroppable({
        id: slot.id
    })
    return (
        <div
            ref={setNodeRef}
            className='problem-slot'
            style={{
                border: isOver ? '2px solid green' : '1px dashed gray',
                background: isOver ? 'lightgreen' : 'transparent',
            }}
        >
            {slot.label ?? '______'}
        </div>
    )
}
function Block({ block, disabled }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ 
        id: block.id,
        data: { label: block.label }, 
        disabled
    });
    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        transition,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'grab',
    }
    return (
        <div ref={setNodeRef} className='block' style={style} {...attributes} {...listeners}>
            {block.label}
        </div>
    );
}

function CodeProblem({ blocks, snippetSlots, onChange, disabled }) {
    // update available and slotted blocks between levels
    useEffect(() => {
        setAvailable(blocks.map((block, index) => ({
            id: `avail-${index}`,
            label: block
        })))
        setSlotted(Array.from({ length: snippetSlots }, (_, index) => ({
            id: `slot-${index}`,
            label: null
        })));
    }, [blocks, snippetSlots]);

    // snippetSlots = # of blanks in the snippet
    // blocks = available draggable blocks
    const [available, setAvailable] = useState(
        blocks.map((block, index) => ({ id: `avail-${index}`, label: block }))
    )

    const [slotted, setSlotted] = useState(
        Array.from({ length: snippetSlots}, (_, index) => ({
            id: `slot-${index}`,
            label: null, // empty placeholder
        }))
    )

    const [activeBlock, setActiveBlock] = useState(null);

    function handleDragStart(event) {
        setActiveBlock(event.active.data.current);
    }

   function handleDragEnd(event) {
    // active = block being dragged
    // over = slot being dropped on
    const { active, over } = event;
    setActiveBlock(null);

    if (!over) return; // dropped outside the zones

    // if dropped onto snippet zone, fill first slot open
    let overId = over.id;
    if (over.id === 'snippet-zone') {
        const emptySlot = slotted.find(s => !s.label);
        overId = emptySlot ? emptySlot.id : null;
    }
    if (!overId) return;

    // check if dropped onto slot
    const targetSlot = slotted.find(s => s.id === overId);
    if (!targetSlot) return; 

    const draggedLabel = active.data.current.label;
    if (!draggedLabel) return;

    const displaced = targetSlot.label;

    // put the block in the slot
    setSlotted(prev => prev.map(s =>
        s.id === overId ? {...s, label: draggedLabel} : s
    ))

    // remove the block from available
    setAvailable(prev => {
        const filtered = prev.filter(b => b.id !== active.id);
        if (displaced) {
            return [...filtered, { id: `avail-${Date.now()}`, label: displaced }];
        }
        return filtered;
    });

    // report the change to Level
    const updated = slotted.map(s => 
        s.id === overId ? draggedLabel : s.label
    );

    onChange(updated);

   }
    
    return (
        <DndContext collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            {/* code snippet with placeholders */}
            <SnippetZone slotted={slotted} />

            {/* available blocks */}
            <div className='available-blocks'>
                {available.map((block) => (
                    <Block key={block.id} block={block} disabled={disabled}/>
                ))}
            </div>

            {/* follows the cursor while dragging */}
            <DragOverlay>
                {activeBlock ? (
                <div className='active-block'>
                    {activeBlock.label}
                </div>
                ) : null}
            </DragOverlay>

        </DndContext>
    )
}

export default CodeProblem