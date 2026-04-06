import type { GameState, GameAction } from "../types";
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
      const nextName = getNextScreenName(currentScreen, state);
      if (!nextName) return { ...state, gameFinished: true };
      return { ...state, currentScreenName: nextName, dialogueLineIndex: 0 };
    }

    case "NEXT_SCREEN": {
      const nextName = getNextScreenName(currentScreen, state);
      if (!nextName) return { ...state, gameFinished: true };
      return { ...state, currentScreenName: nextName, dialogueLineIndex: 0 };
    }

    case "MAKE_CHOICE": {
      const newChoices = { ...state.choices, [action.choiceId]: action.option };
      const updatedState = { ...state, choices: newChoices };
      const nextName = getNextScreenName(currentScreen, updatedState);
      if (!nextName) return { ...updatedState, gameFinished: true };
      return {
        ...updatedState,
        currentScreenName: nextName,
        dialogueLineIndex: 0,
      };
    }

    case "SUBMIT_QUIZ": {
      if (state.quizPassed !== null) return state;

      const correctCount = action.answers.reduce((count, answer, i) => {
        return count + (answer === QUIZ_QUESTIONS[i].correctAnswer ? 1 : 0);
      }, 0);
      const passed = correctCount === QUIZ_QUESTIONS.length;
      const updatedState = {
        ...state,
        quizAnswers: action.answers,
        quizPassed: passed,
      };
      const nextName = getNextScreenName(currentScreen, updatedState);
      if (!nextName) return { ...updatedState, gameFinished: true };
      return {
        ...updatedState,
        currentScreenName: nextName,
        dialogueLineIndex: 0,
      };
    }

    case "PHOTO_SAVED": {
      const newPhotos = [
        ...state.photos,
        { activityId: action.activityId, timestamp: Date.now() },
      ];
      const updatedState = { ...state, photos: newPhotos };
      const nextName = getNextScreenName(currentScreen, updatedState);
      if (!nextName) return { ...updatedState, gameFinished: true };
      return {
        ...updatedState,
        currentScreenName: nextName,
        dialogueLineIndex: 0,
      };
    }

    case "RESET_GAME":
      return initialState;

    default:
      return state;
  }
}
