import { useReducer, useEffect } from "react";
import type { GameState } from "./types";
import { gameReducer, initialState } from "./state/gameReducer";
import { Game } from "./components/Game";

const STORAGE_KEY = "mini-carlo-state";

function loadState(): GameState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as GameState;
      // Validate it has required fields
      if (parsed.currentScreenName && typeof parsed.gameStarted === "boolean") {
        return parsed;
      }
    }
  } catch {
    // Corrupted state, start fresh
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
