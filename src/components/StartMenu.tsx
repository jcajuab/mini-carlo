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
        gap: "32px",
        minHeight: "80dvh",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "var(--font-size-title)",
          color: "var(--text-accent)",
          lineHeight: "2",
        }}
      >
        MINI CARLO
      </div>
      <div
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--text-secondary)",
          lineHeight: "2",
        }}
      >
        Date Itinerary System&trade;
      </div>
      <PixelButton
        onClick={() => dispatch({ type: "GAME_START" })}
        style={{ fontSize: "var(--font-size-lg)", padding: "18px 48px" }}
      >
        START
      </PixelButton>
    </div>
  );
}
