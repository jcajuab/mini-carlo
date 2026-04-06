import type { GameState, GameAction } from "../types";
import { screenMap } from "../content/gameFlow";
import { StartMenu } from "./StartMenu";
import { DialogueScreen } from "./DialogueScreen";
import { ChoiceScreen } from "./ChoiceScreen";
import { MapScreen } from "./MapScreen";
import { ImageReveal } from "./ImageReveal";
import { PhotoUpload } from "./PhotoUpload";
import { QuizScreen } from "./QuizScreen";
import { EndingScreen } from "./EndingScreen";

interface GameProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export function Game({ state, dispatch }: GameProps) {
  const screen = screenMap.get(state.currentScreenName);

  if (!screen) {
    return (
      <div style={{ color: "var(--fail)", textAlign: "center" }}>
        Screen not found: {state.currentScreenName}
      </div>
    );
  }

  switch (screen.type) {
    case "start":
      return <StartMenu dispatch={dispatch} />;

    case "dialogue":
      return (
        <DialogueScreen
          screen={screen}
          lineIndex={state.dialogueLineIndex}
          dispatch={dispatch}
        />
      );

    case "choice":
      return (
        <ChoiceScreen
          screen={screen}
          lineIndex={state.dialogueLineIndex}
          dispatch={dispatch}
        />
      );

    case "map":
      return (
        <MapScreen
          screen={screen}
          lineIndex={state.dialogueLineIndex}
          dispatch={dispatch}
        />
      );

    case "image-reveal":
      return (
        <ImageReveal
          screen={screen}
          lineIndex={state.dialogueLineIndex}
          dispatch={dispatch}
        />
      );

    case "upload":
      return (
        <PhotoUpload
          screen={screen}
          lineIndex={state.dialogueLineIndex}
          dispatch={dispatch}
        />
      );

    case "quiz":
      return <QuizScreen dispatch={dispatch} />;

    case "ending":
      return <EndingScreen state={state} />;

    default:
      return null;
  }
}
