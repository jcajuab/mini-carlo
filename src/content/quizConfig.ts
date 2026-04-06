import type { QuizQuestion } from "../types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What did Carlo order?",
    options: ["Iced Latte", "Americano", "Caramel Macchiato", "Matcha Latte"],
    correctAnswer: "Iced Latte",
  },
  {
    question: "What is Carlo's favorite color?",
    options: ["Blue", "Green", "Black", "Purple"],
    correctAnswer: "Blue",
  },
  {
    question: "How old is Carlo?",
    options: ["21", "22", "23", "24"],
    correctAnswer: "22",
  },
];

export const QUIZ_TIME_LIMIT_SECONDS = 300;
