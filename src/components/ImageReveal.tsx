import type { GameAction, ScreenNode } from "../types";
import { saveFromUrl } from "../utils/saveFile";
import { DialogueBox } from "./ui/DialogueBox";
import { PixelButton } from "./ui/PixelButton";

interface ImageRevealProps {
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

const imageFrameStyle: React.CSSProperties = {
  border: "3px solid var(--border-color)",
  overflow: "hidden",
  width: "100%",
  backgroundColor: "var(--bg-card)",
  padding: "8px",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
  imageRendering: "auto",
};

const buttonRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
};

export function ImageReveal({ screen, lineIndex, dispatch }: ImageRevealProps) {
  const lines = screen.lines ?? [];
  const currentLine = lines[lineIndex] ?? "";
  const isLastLine = lineIndex >= lines.length - 1;
  const advance = () =>
    dispatch({ type: isLastLine ? "NEXT_SCREEN" : "NEXT_LINE" });

  return (
    <div style={screenStyle}>
      {screen.asset && (
        <div style={imageFrameStyle}>
          <img src={screen.asset} alt="Evidence" style={imageStyle} />
        </div>
      )}

      <DialogueBox speaker="Mini Carlo">{currentLine}</DialogueBox>

      {isLastLine && screen.saveable ? (
        <div style={buttonRowStyle}>
          <PixelButton
            onClick={async () => {
              try {
                if (screen.asset) {
                  await saveFromUrl(
                    screen.asset,
                    screen.downloadName ?? "mini-carlo-image.png",
                  );
                }
              } catch {
                // download failed — still advance
              }
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
