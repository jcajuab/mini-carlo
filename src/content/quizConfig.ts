import type { QuizQuestion } from "../types";

// QUIZ ANSWERS — Edit these before the date!
// Each question needs: the question text, 4 options, and the correct answer.
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What did Carlo order?",
    options: ["Iced Latte", "Americano", "Caramel Macchiato", "Matcha Latte"],
    correctAnswer: "Iced Latte", // ← Change this to the real answer
  },
  {
    question: "What is Carlo's favorite color?",
    options: ["Blue", "Green", "Black", "Purple"],
    correctAnswer: "Blue", // ← Change this to the real answer
  },
  {
    question: "How old is Carlo?",
    options: ["21", "22", "23", "24"],
    correctAnswer: "22", // ← Change this to the real answer
  },
];

export const QUIZ_TIME_LIMIT_SECONDS = 300; // 5 minutes
