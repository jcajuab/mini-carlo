import type { GameAction, ScreenNode } from "../types";
import { DialogueBox } from "./ui/DialogueBox";
import { PixelButton } from "./ui/PixelButton";

interface ImageRevealProps {
  screen: ScreenNode;
  lineIndex: number;
  dispatch: React.Dispatch<GameAction>;
}

export function ImageReveal({ screen, lineIndex, dispatch }: ImageRevealProps) {
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
      {screen.asset && (
        <div
          style={{
            border: "3px solid var(--border-color)",
            overflow: "hidden",
            width: "100%",
            backgroundColor: "var(--bg-card)",
            padding: "8px",
          }}
        >
          <img
            src={screen.asset}
            alt="Evidence"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              imageRendering: "auto",
            }}
          />
        </div>
      )}

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
