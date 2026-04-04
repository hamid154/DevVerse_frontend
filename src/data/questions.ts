export type Category = 'JavaScript' | 'HTML/CSS' | 'Math';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id?: string;
  category?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export const questions: Question[] = [
  // JavaScript - Easy
  { id: 'js-1', category: 'JavaScript', difficulty: 'easy', question: 'How do you write "Hello World" in an alert box?', options: ['msgBox("Hello World");', 'alert("Hello World");', 'msg("Hello World");', 'alertBox("Hello World");'], correctAnswer: 'alert("Hello World");' },
  { id: 'js-2', category: 'JavaScript', difficulty: 'easy', question: 'Which operator is used to assign a value?', options: ['*', '-', '=', 'x'], correctAnswer: '=' },
  { id: 'js-3', category: 'JavaScript', difficulty: 'easy', question: 'What does `typeof null` evaluate to?', options: ['undefined', 'null', 'object', 'number'], correctAnswer: 'object' },
  { id: 'js-4', category: 'JavaScript', difficulty: 'easy', question: 'How do you declare a variable that cannot be reassigned?', options: ['var', 'let', 'const', 'static'], correctAnswer: 'const' },
  // JavaScript - Medium
  { id: 'js-5', category: 'JavaScript', difficulty: 'medium', question: 'Which method adds one or more elements to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], correctAnswer: 'push()' },
  { id: 'js-6', category: 'JavaScript', difficulty: 'medium', question: 'What will `Boolean("false")` evaluate to?', options: ['true', 'false', 'undefined', 'TypeError'], correctAnswer: 'true' },
  { id: 'js-7', category: 'JavaScript', difficulty: 'medium', question: 'Which keyword is used to handle exceptions?', options: ['error', 'catch', 'throw', 'exception'], correctAnswer: 'catch' },
  { id: 'js-8', category: 'JavaScript', difficulty: 'medium', question: 'How do you create a Promise that delays execution?', options: ['new Promise(resolve => setTimeout(resolve, ms))', 'Promise.timeout(ms)', 'new Delay(ms)', 'setTimeout(Promise)'], correctAnswer: 'new Promise(resolve => setTimeout(resolve, ms))' },
  // JavaScript - Hard
  { id: 'js-9', category: 'JavaScript', difficulty: 'hard', question: 'What is a closure in JavaScript?', options: ['A function bundled with its lexical environment', 'A way to close browser tabs', 'A memory leak', 'A loop that never ends'], correctAnswer: 'A function bundled with its lexical environment' },
  { id: 'js-10', category: 'JavaScript', difficulty: 'hard', question: 'What will `console.log(0.1 + 0.2 === 0.3)` output?', options: ['true', 'false', 'undefined', 'SyntaxError'], correctAnswer: 'false' },

  // HTML/CSS - Easy
  { id: 'html-1', category: 'HTML/CSS', difficulty: 'easy', question: 'What does HTML stand for?', options: ['Home Tool Markup Language', 'Hyper Text Markup Language', 'Hyper Text Makeup Language', 'Links and Text Markup Language'], correctAnswer: 'Hyper Text Markup Language' },
  { id: 'html-2', category: 'HTML/CSS', difficulty: 'easy', question: 'Which HTML attribute defines inline styles?', options: ['style', 'class', 'styles', 'font'], correctAnswer: 'style' },
  { id: 'css-1', category: 'HTML/CSS', difficulty: 'easy', question: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets', 'Computer Style Sheets'], correctAnswer: 'Cascading Style Sheets' },
  { id: 'css-2', category: 'HTML/CSS', difficulty: 'easy', question: 'How do you make text bold in CSS?', options: ['font: bold;', 'font-weight: bold;', 'text-transform: bold;', 'style: bold;'], correctAnswer: 'font-weight: bold;' },
  // HTML/CSS - Medium
  { id: 'css-3', category: 'HTML/CSS', difficulty: 'medium', question: 'How do you center a flex item horizontally and vertically?', options: ['align-items: center; justify-content: center;', 'text-align: center; vertical-align: middle;', 'margin: auto;', 'position: absolute; left: 50%; top: 50%;'], correctAnswer: 'align-items: center; justify-content: center;' },
  { id: 'css-4', category: 'HTML/CSS', difficulty: 'medium', question: 'Which semantic HTML tag should wrap navigation links?', options: ['<menu>', '<nav>', '<section>', '<header>'], correctAnswer: '<nav>' },
  { id: 'css-5', category: 'HTML/CSS', difficulty: 'medium', question: 'What is the default `position` property value in CSS?', options: ['relative', 'absolute', 'fixed', 'static'], correctAnswer: 'static' },
  // HTML/CSS - Hard
  { id: 'css-6', category: 'HTML/CSS', difficulty: 'hard', question: 'Which CSS property creates a "glassmorphism" blur effect?', options: ['filter: blur()', 'backdrop-filter: blur()', 'opacity', 'background-blend-mode'], correctAnswer: 'backdrop-filter: blur()' },
  { id: 'html-3', category: 'HTML/CSS', difficulty: 'hard', question: 'Which meta tag is crucial for responsive web design?', options: ['<meta name="viewport">', '<meta charset="UTF-8">', '<meta name="description">', '<meta http-equiv="X-UA-Compatible">'], correctAnswer: '<meta name="viewport">' },

  // Math - Easy
  { id: 'math-1', category: 'Math', difficulty: 'easy', question: 'What is the square root of 144?', options: ['10', '11', '12', '14'], correctAnswer: '12' },
  { id: 'math-2', category: 'Math', difficulty: 'easy', question: 'If x + 5 = 12, what is x?', options: ['5', '7', '12', '17'], correctAnswer: '7' },
  { id: 'math-3', category: 'Math', difficulty: 'easy', question: 'What is 15% of 200?', options: ['15', '20', '30', '45'], correctAnswer: '30' },
  { id: 'math-4', category: 'Math', difficulty: 'easy', question: 'What is the value of Pi to two decimal places?', options: ['3.12', '3.14', '3.16', '3.18'], correctAnswer: '3.14' },
  // Math - Medium
  { id: 'math-5', category: 'Math', difficulty: 'medium', question: 'Which sequence starts 0, 1, 1, 2, 3, 5...?', options: ['Prime numbers', 'Fibonacci sequence', 'Arithmetic progression', 'Geometric series'], correctAnswer: 'Fibonacci sequence' },
  { id: 'math-6', category: 'Math', difficulty: 'medium', question: 'What is 2 to the power of 8 (2^8)?', options: ['128', '256', '512', '1024'], correctAnswer: '256' },
  { id: 'math-7', category: 'Math', difficulty: 'medium', question: 'How many degrees are in a triangle?', options: ['90', '180', '270', '360'], correctAnswer: '180' },
  // Math - Hard
  { id: 'math-8', category: 'Math', difficulty: 'hard', question: 'What is the sum of the first 100 positive integers?', options: ['4950', '5000', '5050', '5100'], correctAnswer: '5050' },
  { id: 'math-9', category: 'Math', difficulty: 'hard', question: 'Which algorithm finds the shortest path in a graph?', options: ['Bubble Sort', "Dijkstra's Algorithm", 'Binary Search', 'Euclidean Algorithm'], correctAnswer: "Dijkstra's Algorithm" }
];
