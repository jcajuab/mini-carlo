import type { GameState, GameAction } from "../types";
import { screenMap, getChapterTitle } from "../content/gameFlow";
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

function ChapterHeader({ title }: { title: string }) {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        padding: "12px 0",
        marginBottom: "8px",
        borderBottom: "2px solid var(--border-color)",
        fontSize: "var(--font-size-sm)",
        color: "var(--text-accent)",
        fontFamily: "var(--font-pixel)",
        letterSpacing: "2px",
        textTransform: "uppercase",
        opacity: 0.8,
      }}
    >
      {title}
    </div>
  );
}

export function Game({ state, dispatch }: GameProps) {
  const screen = screenMap.get(state.currentScreenName);

  const chapterTitle = getChapterTitle(state.currentScreenName);

  if (!screen) {
    return (
      <div style={{ color: "var(--fail)", textAlign: "center" }}>
        Screen not found: {state.currentScreenName}
      </div>
    );
  }

  let content: React.ReactNode;

  switch (screen.type) {
    case "start":
      return <StartMenu dispatch={dispatch} />;

    case "dialogue":
      content = (
        <DialogueScreen
          screen={screen}
          lineIndex={state.dialogueLineIndex}
          dispatch={dispatch}
        />
      );
      break;

    case "choice":
      content = (
        <ChoiceScreen
          screen={screen}
          lineIndex={state.dialogueLineIndex}
          dispatch={dispatch}
        />
      );
      break;

    case "map":
      content = (
        <MapScreen
          screen={screen}
          lineIndex={state.dialogueLineIndex}
          dispatch={dispatch}
        />
      );
      break;

    case "image-reveal":
      content = (
        <ImageReveal
          screen={screen}
          lineIndex={state.dialogueLineIndex}
          dispatch={dispatch}
        />
      );
      break;

    case "upload":
      content = (
        <PhotoUpload
          screen={screen}
          lineIndex={state.dialogueLineIndex}
          dispatch={dispatch}
        />
      );
      break;

    case "quiz":
      content = <QuizScreen dispatch={dispatch} />;
      break;

    case "ending":
      content = <EndingScreen dispatch={dispatch} />;
      break;

    default:
      return null;
  }

  const handleReset = () => {
    if (window.confirm("Reset all progress and start over?")) {
      localStorage.removeItem("mini-carlo-state");
      dispatch({ type: "RESET_GAME" });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        flex: 1,
        minHeight: 0,
      }}
    >
      {chapterTitle && <ChapterHeader title={chapterTitle} />}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {content}
      </div>

      {state.gameStarted && (
        <button
          onClick={handleReset}
          style={{
            padding: "8px 16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-pixel)",
            fontSize: "6px",
            color: "var(--text-secondary)",
            opacity: 0.3,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
        >
          restart
        </button>
      )}
    </div>
  );
}
