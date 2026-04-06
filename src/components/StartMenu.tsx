import type { GameAction } from "../types";
import { PixelButton } from "./ui/PixelButton";

interface StartMenuProps {
  dispatch: React.Dispatch<GameAction>;
}

export function StartMenu({ dispatch }: StartMenuProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80dvh",
      }}
    >
      <PixelButton
        onClick={() => dispatch({ type: "GAME_START" })}
        style={{ fontSize: "var(--font-size-lg)", padding: "18px 48px" }}
      >
        START
      </PixelButton>
    </div>
  );
}
