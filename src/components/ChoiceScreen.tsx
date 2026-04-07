import type { GameAction, ScreenNode } from "../types";
import { DialogueBox } from "./ui/DialogueBox";
import { PixelButton } from "./ui/PixelButton";

interface ChoiceScreenProps {
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

const fullWidthStyle: React.CSSProperties = { width: "100%" };

const choicesColumnStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "100%",
};

export function ChoiceScreen({
  screen,
  lineIndex,
  dispatch,
}: ChoiceScreenProps) {
  const { choiceId, options } = screen;
  if (!choiceId || !options) return null;

  const lines = screen.lines ?? [];
  const currentLine = lines[lineIndex] ?? "";
  const isLastLine = lineIndex >= lines.length - 1;

  return (
    <div style={screenStyle}>
      <DialogueBox speaker="Mini Carlo">{currentLine}</DialogueBox>

      {isLastLine ? (
        <div style={choicesColumnStyle}>
          {options.map((option) => (
            <PixelButton
              key={option}
              variant="secondary"
              style={fullWidthStyle}
              onClick={() =>
                dispatch({
                  type: "MAKE_CHOICE",
                  choiceId,
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
