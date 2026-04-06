import type { GameAction, ScreenNode } from "../types";
import { DialogueBox } from "./ui/DialogueBox";
import { PixelButton } from "./ui/PixelButton";

interface DialogueScreenProps {
  screen: ScreenNode;
  lineIndex: number;
  dispatch: React.Dispatch<GameAction>;
}

export function DialogueScreen({
  screen,
  lineIndex,
  dispatch,
}: DialogueScreenProps) {
  const lines = screen.lines ?? [];
  const currentLine = lines[lineIndex] ?? "";
  const isLastLine = lineIndex >= lines.length - 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "100%",
        alignItems: "center",
      }}
    >
      <DialogueBox speaker="Mini Carlo">{currentLine}</DialogueBox>
      <PixelButton
        onClick={() =>
          dispatch({ type: isLastLine ? "NEXT_SCREEN" : "NEXT_LINE" })
        }
      >
        {isLastLine ? "Continue" : "..."}
      </PixelButton>
    </div>
  );
}
