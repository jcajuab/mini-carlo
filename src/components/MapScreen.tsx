import type { GameAction, ScreenNode } from "../types";
import { AdventureMap } from "./AdventureMap";
import { DialogueBox } from "./ui/DialogueBox";
import { PixelButton } from "./ui/PixelButton";

interface MapScreenProps {
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

export function MapScreen({ screen, lineIndex, dispatch }: MapScreenProps) {
  const lines = screen.lines ?? [];
  const currentLine = lines[lineIndex] ?? "";
  const isLastLine = lineIndex >= lines.length - 1;
  const label = screen.continueLabel ?? "...";
  const hasLines = lines.length > 0;

  return (
    <div style={screenStyle}>
      <AdventureMap />

      {hasLines && (
        <DialogueBox speaker="Mini Carlo">{currentLine}</DialogueBox>
      )}

      <PixelButton
        onClick={() =>
          dispatch({
            type: !hasLines || isLastLine ? "NEXT_SCREEN" : "NEXT_LINE",
          })
        }
      >
        {!hasLines || isLastLine ? label : "..."}
      </PixelButton>
    </div>
  );
}
