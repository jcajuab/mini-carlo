import type { GameAction, ScreenNode } from "../types";
import { DialogueBox } from "./ui/DialogueBox";
import { PixelButton } from "./ui/PixelButton";

interface MapScreenProps {
  screen: ScreenNode;
  lineIndex: number;
  dispatch: React.Dispatch<GameAction>;
}

export function MapScreen({ screen, lineIndex, dispatch }: MapScreenProps) {
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
      {/* Pixel Art Map */}
      <div
        style={{
          border: "3px solid var(--border-color)",
          backgroundColor: "var(--bg-card)",
          padding: "16px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "16px 0",
            gap: "8px",
          }}
        >
          {["Coffee", "Activity", "Dinner"].map((stage, i) => (
            <div
              key={stage}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "3px solid var(--text-accent)",
                    backgroundColor: "var(--bg-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--font-size-lg)",
                    color: "var(--text-accent)",
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    fontSize: "var(--font-size-sm)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {stage}
                </div>
              </div>
              {i < 2 && (
                <div
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "var(--font-size-sm)",
                  }}
                >
                  ···
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

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
