import type { GameAction, ScreenNode } from "../types";
import { DialogueBox } from "./ui/DialogueBox";
import { PixelButton } from "./ui/PixelButton";

interface DialogueScreenProps {
  screen: ScreenNode;
  lineIndex: number;
  dispatch: React.Dispatch<GameAction>;
}

const screenStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  width: "100%",
  alignItems: "center",
};

export function DialogueScreen({
  screen,
  lineIndex,
  dispatch,
}: DialogueScreenProps) {
  const lines = screen.lines ?? [];
  const currentLine = lines[lineIndex] ?? "";
  const isLastLine = lineIndex >= lines.length - 1;
  const label = screen.continueLabel ?? "...";
  const isFinalScreen = screen.resetsGame === true;

  const handleContinue = () => {
    if (isLastLine && isFinalScreen) {
      localStorage.removeItem("mini-carlo-state");
      dispatch({ type: "RESET_GAME" });
    } else {
      dispatch({ type: isLastLine ? "NEXT_SCREEN" : "NEXT_LINE" });
    }
  };

  return (
    <div style={screenStyle}>
      <DialogueBox speaker="Mini Carlo">{currentLine}</DialogueBox>
      <PixelButton onClick={handleContinue}>
        {isLastLine ? label : "..."}
      </PixelButton>
    </div>
  );
}
