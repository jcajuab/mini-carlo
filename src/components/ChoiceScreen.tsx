import type { GameAction, ScreenNode } from "../types";
import { DialogueBox } from "./ui/DialogueBox";
import { PixelButton } from "./ui/PixelButton";

interface ChoiceScreenProps {
  screen: ScreenNode;
  lineIndex: number;
  dispatch: React.Dispatch<GameAction>;
}

export function ChoiceScreen({
  screen,
  lineIndex,
  dispatch,
}: ChoiceScreenProps) {
  const lines = screen.lines ?? [];
  const currentLine = lines[lineIndex] ?? "";
  const isLastLine = lineIndex >= lines.length - 1;
  const showChoices = isLastLine;

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

      {showChoices ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            width: "100%",
          }}
        >
          {(screen.options ?? []).map((option) => (
            <PixelButton
              key={option}
              variant="secondary"
              style={{ width: "100%" }}
              onClick={() =>
                dispatch({
                  type: "MAKE_CHOICE",
                  choiceId: screen.choiceId!,
                  option,
                })
              }
            >
              {option}
            </PixelButton>
          ))}
        </div>
      ) : (
        <PixelButton onClick={() => dispatch({ type: "NEXT_LINE" })}>
          {screen.continueLabel ?? "..."}
        </PixelButton>
      )}
    </div>
  );
}
