import type { GameState, GameAction, ScreenNode } from "../types";
import { screenMap, getNextScreenName } from "../content/gameFlow";
import { QUIZ_QUESTIONS } from "../content/quizConfig";

export const initialState: GameState = {
  currentScreenName: "start-menu",
  dialogueLineIndex: 0,
  choices: {},
  photos: [],
  quizAnswers: [],
  quizPassed: null,
  gameStarted: false,
  gameFinished: false,
};

const STORAGE_KEY = "mini-carlo-state";

function advanceScreen(state: GameState, current: ScreenNode): GameState {
  const nextName = getNextScreenName(current, state);
  if (!nextName) return { ...state, gameFinished: true };
  return { ...state, currentScreenName: nextName, dialogueLineIndex: 0 };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  const currentScreen = screenMap.get(state.currentScreenName);
  if (!currentScreen) return state;

  switch (action.type) {
    case "GAME_START": {
      const nextName = getNextScreenName(currentScreen, state);
      return nextName
        ? {
            ...state,
            gameStarted: true,
            currentScreenName: nextName,
            dialogueLineIndex: 0,
          }
        : { ...state, gameStarted: true };
    }

    case "NEXT_LINE": {
      const lines = currentScreen.lines ?? [];
      if (state.dialogueLineIndex < lines.length - 1) {
        return { ...state, dialogueLineIndex: state.dialogueLineIndex + 1 };
      }
      return advanceScreen(state, currentScreen);
    }

    case "NEXT_SCREEN":
      return advanceScreen(state, currentScreen);

    case "MAKE_CHOICE": {
      const updatedState = {
        ...state,
        choices: { ...state.choices, [action.choiceId]: action.option },
      };
      return advanceScreen(updatedState, currentScreen);
    }

    case "SUBMIT_QUIZ": {
      if (state.quizPassed !== null) return state;

      const correctCount = action.answers.reduce((count, answer, i) => {
        return count + (answer === QUIZ_QUESTIONS[i].correctAnswer ? 1 : 0);
      }, 0);
      const updatedState = {
        ...state,
        quizAnswers: action.answers,
        quizPassed: correctCount === QUIZ_QUESTIONS.length,
      };
      return advanceScreen(updatedState, currentScreen);
    }

    case "PHOTO_SAVED": {
      const updatedState = {
        ...state,
        photos: [
          ...state.photos,
          { activityId: action.activityId, timestamp: action.timestamp },
        ],
      };
      return advanceScreen(updatedState, currentScreen);
    }

    case "RESET_GAME":
      localStorage.removeItem(STORAGE_KEY);
      return initialState;

    default:
      return state;
  }
}
