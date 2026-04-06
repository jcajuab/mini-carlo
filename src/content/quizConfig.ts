import type { QuizQuestion } from "../types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What did Carlo order?",
    options: [
      "Iced Americano",
      "Matcha Latte",
      "Caramel Macchiato",
      "Chai Latte",
    ],
    correctAnswer: "Matcha Latte",
  },
  {
    question: "What is Carlo's favorite color?",
    options: ["Blue", "Red", "Green", "Purple"],
    correctAnswer: "Red",
  },
  {
    question: "How old is Carlo?",
    options: ["21", "22", "23", "24"],
    correctAnswer: "23",
  },
];

export const QUIZ_TIME_LIMIT_SECONDS = 300;
