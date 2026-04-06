import type { GameAction } from "../types";
import { PixelButton } from "./ui/PixelButton";

interface StartMenuProps {
  dispatch: React.Dispatch<GameAction>;
}

const screenStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "80dvh",
};

const startButtonStyle: React.CSSProperties = {
  fontSize: "var(--font-size-lg)",
  padding: "18px 48px",
};

export function StartMenu({ dispatch }: StartMenuProps) {
  return (
    <div style={screenStyle}>
      <PixelButton
        onClick={() => dispatch({ type: "GAME_START" })}
        style={startButtonStyle}
      >
        START
      </PixelButton>
    </div>
  );
}
