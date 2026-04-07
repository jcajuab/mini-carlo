export interface PhotoMeta {
  activityId: string;
  timestamp: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface GameState {
  currentScreenName: string;
  dialogueLineIndex: number;
  choices: Record<string, string>;
  photos: PhotoMeta[];
  quizAnswers: string[];
  quizPassed: boolean | null;
  gameStarted: boolean;
  gameFinished: boolean;
}

export interface ScreenNode {
  name: string;
  type:
    | "start"
    | "dialogue"
    | "choice"
    | "upload"
    | "quiz"
    | "map"
    | "image-reveal"
    | "ending";
  lines?: string[];
  choiceId?: string;
  options?: string[];
  asset?: string;
  activityId?: string;
  saveable?: boolean;
  downloadName?: string;
  chapter?: string;
  continueLabel?: string;
  resetsGame?: boolean;
  next?: string | ((state: GameState) => string);
}

export type GameAction =
  | { type: "GAME_START" }
  | { type: "NEXT_LINE" }
  | { type: "NEXT_SCREEN" }
  | { type: "MAKE_CHOICE"; choiceId: string; option: string }
  | { type: "SUBMIT_QUIZ"; answers: string[] }
  | { type: "PHOTO_SAVED"; activityId: string; timestamp: number }
  | { type: "RESET_GAME" };
