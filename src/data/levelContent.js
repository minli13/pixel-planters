export const LEVEL_CONTENT = {
  1: {
    1: {
      prompt: "Concatenate 'Hello' and 'World' and print the result",
      snippetSlots: 6,
      blocks: ["print", "(", "'Hello'", "+", "'World'", ")", "'Python'"],
      solution: ["print", "(", "'Hello'", "+", "'World'", ")"],
      codeToRun: `print('Hello' + 'World')`,
    },
    2: {
      prompt: "Slice the first 5 characters from the string 'Hello World'",
      snippetSlots: 8,
      blocks: ["print", "(", "'Hello World'", "[", ":", "5", "]", ")", "3"],
      solution: ["print", "(", "'Hello World'", "[", ":", "5", "]", ")"],
      codeToRun: `text = 'Hello World'\nprint(text[:5])`,
    },
    3: {
      prompt: "Convert the string 'hello world' to uppercase and print it",
      snippetSlots: 10,
      blocks: ["print", "(", "'hello world'", ".", "upper", "(", ")", "(", ")", ")", "lower"],
      solution: ["print", "(", "(", "'hello world'", ")",".", "upper", "(", ")", ")"],
      codeToRun: `print(('hello world').upper())`,
    },
  },
  2: {
    1: {
      prompt: "Assign the value 42 to a variable called 'answer' and print it",
      snippetSlots: 5,
      blocks: ["answer", "=", "42", "print", "(", ")", "99", "answer"],
      solution: ["answer", "=", "42", "\n", "print", "(", "answer", ")"],
      snippetSlots: 7,
      lines: [3, 4],
      lineBreak: 3,
      codeToRun: `answer = 42\nprint(answer)`,
    },
    2: {
      prompt: "Assign multiple values: x = 1, y = 2, z = 3 and print their sum",
      snippetSlots: 9,
      blocks: ["x", ",", "y", ",", "z", "=", "1", "2", "3", "print", "(", "x", "+", "y", "+", "z", ")", "0"],
      solution: ["x", ",", "y", ",", "z", "=", "1", ",", "2", ",", "3"],
      codeToRun: `x, y, z = 1, 2, 3\nprint(x + y + z)`,
    },
    3: {
      prompt: "Create a variable 'name' and print a greeting using it",
      snippetSlots: 7,
      blocks: ["name", "=", "'Alice'", "print", "(", "'Hello, '", "+", "name", ")", "'Bye'"],
      solution: ["name", "=", "'Alice'", "print", "(", "'Hello, '", "+", "name", ")"],
      snippetSlots: 9,
      codeToRun: `name = 'Alice'\nprint('Hello, ' + name)`,
    },
  },
}