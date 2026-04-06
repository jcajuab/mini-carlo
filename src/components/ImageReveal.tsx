import type { GameAction, ScreenNode } from "../types";
import { DialogueBox } from "./ui/DialogueBox";
import { PixelButton } from "./ui/PixelButton";

interface ImageRevealProps {
  screen: ScreenNode;
  lineIndex: number;
  dispatch: React.Dispatch<GameAction>;
}

function downloadImage(src: string, filename: string) {
  const a = document.createElement("a");
  a.href = src;
  a.download = filename;
  a.click();
}

export function ImageReveal({ screen, lineIndex, dispatch }: ImageRevealProps) {
  const lines = screen.lines ?? [];
  const currentLine = lines[lineIndex] ?? "";
  const isLastLine = lineIndex >= lines.length - 1;
  const advance = () =>
    dispatch({ type: isLastLine ? "NEXT_SCREEN" : "NEXT_LINE" });

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

      {isLastLine && screen.saveable ? (
        <div style={{ display: "flex", gap: "12px" }}>
          <PixelButton
            onClick={() => {
              downloadImage(
                screen.asset!,
                screen.downloadName ?? "mini-carlo-image.png",
              );
              advance();
            }}
          >
            Save
          </PixelButton>
          <PixelButton variant="secondary" onClick={advance}>
            Skip
          </PixelButton>
        </div>
      ) : (
        <PixelButton onClick={advance}>
          {isLastLine ? (screen.continueLabel ?? "...") : "..."}
        </PixelButton>
      )}
    </div>
  );
}
