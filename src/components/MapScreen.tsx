import type { GameAction, ScreenNode } from "../types";
import { AdventureMap } from "./AdventureMap";
import { DialogueBox } from "./ui/DialogueBox";
import { PixelButton } from "./ui/PixelButton";

interface MapScreenProps {
  screen: ScreenNode;
  lineIndex: number;
  dispatch: React.Dispatch<GameAction>;
}

export function MapScreen({ screen, lineIndex, dispatch }: MapScreenProps) {
  const lines = screen.lines ?? [];
  const hasLines = lines.length > 0;
  const currentLine = lines[lineIndex] ?? "";
  const isLastLine = lineIndex >= lines.length - 1;
  const label = screen.continueLabel ?? "...";

  if (!hasLines) {
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
        <AdventureMap />
        <PixelButton onClick={() => dispatch({ type: "NEXT_SCREEN" })}>
          {label}
        </PixelButton>
      </div>
    );
  }

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
      <AdventureMap />
      <DialogueBox speaker="Mini Carlo">{currentLine}</DialogueBox>
      <PixelButton
        onClick={() =>
          dispatch({ type: isLastLine ? "NEXT_SCREEN" : "NEXT_LINE" })
        }
      >
        {isLastLine ? label : "..."}
      </PixelButton>
    </div>
  );
}
