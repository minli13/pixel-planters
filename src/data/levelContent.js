export const LEVEL_CONTENT = {
    1: {
        1: {
            prompt: "Print 'Hello World'",
            snippetSlots: 4,
            blocks: ["print", "'hello world'", "(", ")"],
            solution: ["print", "(", "'hello world'", ")"],
            codeToRun: `print('hello world')`,
        },
        2: {
            prompt: "Add two numbers",
            snippetSlots: 7,
            blocks: ["=", "sum", "1", "(", "2", ")", "+"],
            solution: ["sum", "=", "(", "1", "+", "2", ")"],
            codeToRun: `sum = 1 + 2\nprint(sum)`,
        },
        3: {
            prompt: "",
            snippetSlots: 0,
            blocks: [],
            solution: [],
        },
    },
    2: {
        1: {
            prompt: "",
            snippetSlots: 0,
            blocks: [],
            solution: [],
        },
        2: {
            prompt: "",
            snippetSlots: 0,
            blocks: [],
            solution: [],
        },
        3: {
            prompt: "",
            snippetSlots: 0,
            blocks: [],
            solution: [],
        },
    },
}