import { useReducer } from "react";
import { gameReducer, initialState } from "./state/gameReducer";
import { Game } from "./components/Game";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return <Game state={state} dispatch={dispatch} />;
}

export default App;
