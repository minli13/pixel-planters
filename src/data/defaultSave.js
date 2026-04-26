export const DEFAULT_SAVE = {
    name: "My Garden",
    createdAt: null,
    savedAt: null,
    currentSection: 1,
    currentLevel: 1,
    sections: {
        1: {
            completed: false,
            levels: {
                1: { completed: false },
                2: { completed: false },
                3: { completed: false },
            }
        },
        2: {
            completed: false,
            levels: {
                1: { completed: false },
                2: { completed: false },
                3: { completed: false },
            }
        },
    },
};