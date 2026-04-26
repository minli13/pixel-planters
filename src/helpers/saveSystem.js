import { useState, useCallback } from "react";
import { DEFAULT_SAVE } from "../data/defaultSave";

const SLOTS_KEY = "garden_saves";
const ACTIVE_KEY = "garden_active";

function loadFromStorage() {
    try {
        return JSON.parse(localStorage.getItem(SLOTS_KEY) ?? "{}");
    } catch {
        return {};
    }
}

export function useSaveSystem() {
    const [slots, setSlots] = useState(loadFromStorage);
    const [activeSlot, setActiveSlot] = useState(() => {
        parseInt(localStorage.getItem(ACTIVE_KEY) ?? -1);
    });

    const saveToSlot = useCallback((slotIndex, gameState) => {
        const updated = {
            ...slots,
            [slotIndex]: {...gameState, savedAt: new Date().toISOString()}
        };
        setSlots(updated);
        setActiveSlot(slotIndex);
        localStorage.setItem(SLOTS_KEY, JSON.stringify(updated));
        localStorage.setItem(ACTIVE_KEY, slotIndex);
    }, [slots]);

    const loadFromSlot = useCallback((slotIndex) => {
        setActiveSlot(slotIndex);
        localStorage.setItem(ACTIVE_KEY, String(slotIndex));
        return slots[slotIndex] ?? null;
    }, [slots]);

    const deleteSlot = useCallback((slotIndex) => {
        const updated = {...slots};
        delete updated[slotIndex];
        setSlots(updated);
        if (activeSlot === slotIndex) {
            setActiveSlot(-1);
            localStorage.removeItem(ACTIVE_KEY);
        }
        localStorage.setItem(SLOTS_KEY, JSON.stringify(updated));
    }, [slots, activeSlot]);

    function newSlot(slotIndex, gardenName) {
        const newSlot = {
            ...DEFAULT_SAVE,
            name: gardenName,
            createdAt: new Date().toISOString(),
            savedAt: new Date().toISOString(),
        };
        saveToSlot(slotIndex, newSlot);
        return newSlot;
    }

    function completeLevel(section, level) {
        const saved = slots[activeSlot];
        if (!saved) return;

        let nextLevel = level;
        if (level < 3) {
            nextLevel = level + 1;
        }

        let nextSection = section;
        if (level === 3 && section < 2) {
            nextSection = section + 1;
            nextLevel = 1;
        }
        
        const updated = {
            ...saved,
            currentSection: nextSection,
            currentLevel: nextLevel,
            sections: {
                ...saved.sections,
                [section]: {
                    ...saved.sections[section],
                    levels: {
                        ...saved.sections[section].levels,
                        [level]: { completed: true }
                    }
                }
            }
        };

        setSlots(prev => ({
            ...prev,
            [activeSlot]: updated
        }));
        saveToSlot(activeSlot, updated);
    }

    return {
        slots,
        activeSlot,
        saveToSlot,
        loadFromSlot,
        deleteSlot,
        newSlot,
        completeLevel
    };
}