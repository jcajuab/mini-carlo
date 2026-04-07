import { useReducer, useEffect } from "react";
import type { GameState } from "./types";
import { gameReducer, initialState } from "./state/gameReducer";
import { Game } from "./components/Game";

const STORAGE_KEY = "mini-carlo-state";

function isValidGameState(v: unknown): v is GameState {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.currentScreenName === "string" &&
    typeof o.dialogueLineIndex === "number" &&
    typeof o.gameStarted === "boolean" &&
    typeof o.gameFinished === "boolean" &&
    Array.isArray(o.photos) &&
    Array.isArray(o.quizAnswers) &&
    (o.quizPassed === null || typeof o.quizPassed === "boolean") &&
    typeof o.choices === "object" &&
    o.choices !== null
  );
}

function loadState(): GameState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (isValidGameState(parsed)) return parsed;
    }
  } catch {
    // corrupted or missing state
  }
  return initialState;
}

function App() {
  const [state, dispatch] = useReducer(gameReducer, undefined, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return <Game state={state} dispatch={dispatch} />;
}

export default App;
