import type { GameAction, ScreenNode } from "../types";
import { DialogueBox } from "./ui/DialogueBox";
import { PixelButton } from "./ui/PixelButton";

interface MapScreenProps {
  screen: ScreenNode;
  lineIndex: number;
  dispatch: React.Dispatch<GameAction>;
}

function AdventureMap() {
  return (
    <div
      style={{
        border: "3px solid var(--border-color)",
        backgroundColor: "#1a1a2e",
        padding: "8px",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Parchment-style inner background */}
      <div
        style={{
          backgroundColor: "#121a30",
          border: "2px solid #2a2a4e",
          padding: "4px",
        }}
      >
        <svg
          viewBox="0 0 380 280"
          width="100%"
          height="auto"
          style={{ display: "block" }}
        >
          {/* Background grid pattern for map feel */}
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect width="20" height="20" fill="none" />
              <rect width="1" height="1" x="0" y="0" fill="#1e2a45" />
            </pattern>
          </defs>
          <rect width="380" height="280" fill="url(#grid)" />

          {/* Winding path */}
          <path
            d="M 60 60 C 100 60, 120 100, 140 120 C 160 140, 200 150, 220 140 C 240 130, 260 120, 280 140 C 300 160, 310 190, 310 220"
            fill="none"
            stroke="#3a3a5e"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 60 60 C 100 60, 120 100, 140 120 C 160 140, 200 150, 220 140 C 240 130, 260 120, 280 140 C 300 160, 310 190, 310 220"
            fill="none"
            stroke="#e94560"
            strokeWidth="3"
            strokeDasharray="8 6"
            strokeLinecap="round"
          />

          {/* Decorative trees */}
          {/* Tree 1 */}
          <g transform="translate(100, 80)">
            <rect x="3" y="8" width="4" height="6" fill="#5c3d2e" />
            <rect x="0" y="0" width="10" height="4" fill="#2d5a3f" />
            <rect x="2" y="-4" width="6" height="4" fill="#3a7a52" />
            <rect x="3" y="-6" width="4" height="2" fill="#4a9a65" />
          </g>
          {/* Tree 2 */}
          <g transform="translate(170, 100)">
            <rect x="3" y="8" width="4" height="6" fill="#5c3d2e" />
            <rect x="0" y="0" width="10" height="4" fill="#2d5a3f" />
            <rect x="2" y="-4" width="6" height="4" fill="#3a7a52" />
          </g>
          {/* Tree 3 */}
          <g transform="translate(250, 180)">
            <rect x="3" y="8" width="4" height="6" fill="#5c3d2e" />
            <rect x="0" y="0" width="10" height="4" fill="#2d5a3f" />
            <rect x="2" y="-4" width="6" height="4" fill="#3a7a52" />
            <rect x="3" y="-6" width="4" height="2" fill="#4a9a65" />
          </g>

          {/* Decorative stars */}
          <rect
            x="150"
            y="40"
            width="3"
            height="3"
            fill="#e94560"
            opacity="0.6"
          />
          <rect
            x="300"
            y="70"
            width="2"
            height="2"
            fill="#e94560"
            opacity="0.4"
          />
          <rect
            x="80"
            y="200"
            width="3"
            height="3"
            fill="#e94560"
            opacity="0.5"
          />
          <rect
            x="340"
            y="140"
            width="2"
            height="2"
            fill="#e94560"
            opacity="0.3"
          />
          <rect
            x="50"
            y="150"
            width="2"
            height="2"
            fill="#4ecca3"
            opacity="0.4"
          />

          {/* === LOCATION 1: COFFEE === */}
          <g transform="translate(38, 30)">
            {/* Platform */}
            <rect x="0" y="24" width="40" height="8" fill="#2a2a4e" rx="2" />
            {/* Coffee cup */}
            <rect x="10" y="6" width="20" height="16" fill="#e94560" />
            <rect x="12" y="8" width="16" height="12" fill="#16213e" />
            <rect
              x="14"
              y="10"
              width="4"
              height="2"
              fill="#a8a8a8"
              opacity="0.5"
            />
            {/* Handle */}
            <rect x="30" y="10" width="4" height="2" fill="#e94560" />
            <rect x="32" y="10" width="2" height="8" fill="#e94560" />
            <rect x="30" y="16" width="4" height="2" fill="#e94560" />
            {/* Steam */}
            <rect
              x="16"
              y="2"
              width="2"
              height="3"
              fill="#a8a8a8"
              opacity="0.4"
            />
            <rect
              x="22"
              y="0"
              width="2"
              height="4"
              fill="#a8a8a8"
              opacity="0.3"
            />
            {/* Label */}
            <text
              x="20"
              y="44"
              textAnchor="middle"
              fill="#e8e8e8"
              fontSize="8"
              fontFamily="'Press Start 2P', monospace"
            >
              Coffee
            </text>
          </g>

          {/* === LOCATION 2: ACTIVITY === */}
          <g transform="translate(195, 110)">
            {/* Platform */}
            <rect x="0" y="24" width="50" height="8" fill="#2a2a4e" rx="2" />
            {/* Arcade/Star icon */}
            <rect x="15" y="4" width="20" height="18" fill="#4ecca3" />
            <rect x="17" y="6" width="16" height="14" fill="#16213e" />
            {/* Star inside */}
            <rect x="23" y="8" width="4" height="2" fill="#4ecca3" />
            <rect x="21" y="10" width="8" height="2" fill="#4ecca3" />
            <rect x="19" y="12" width="12" height="2" fill="#4ecca3" />
            <rect x="21" y="14" width="3" height="2" fill="#4ecca3" />
            <rect x="26" y="14" width="3" height="2" fill="#4ecca3" />
            {/* Label */}
            <text
              x="25"
              y="44"
              textAnchor="middle"
              fill="#e8e8e8"
              fontSize="7"
              fontFamily="'Press Start 2P', monospace"
            >
              Intermission
            </text>
          </g>

          {/* === LOCATION 3: DINNER === */}
          <g transform="translate(285, 195)">
            {/* Platform */}
            <rect x="0" y="24" width="44" height="8" fill="#2a2a4e" rx="2" />
            {/* Plate */}
            <rect x="6" y="10" width="30" height="14" fill="#a8a8a8" rx="2" />
            <rect x="8" y="12" width="26" height="10" fill="#16213e" rx="1" />
            {/* Fork */}
            <rect x="2" y="4" width="2" height="18" fill="#a8a8a8" />
            <rect x="0" y="4" width="2" height="6" fill="#a8a8a8" />
            <rect x="4" y="4" width="2" height="6" fill="#a8a8a8" />
            {/* Knife */}
            <rect x="38" y="4" width="3" height="18" fill="#a8a8a8" />
            {/* Food dots */}
            <rect x="14" y="15" width="3" height="3" fill="#e94560" />
            <rect x="22" y="14" width="4" height="4" fill="#4ecca3" />
            <rect
              x="18"
              y="17"
              width="2"
              height="2"
              fill="#e94560"
              opacity="0.7"
            />
            {/* Label */}
            <text
              x="22"
              y="44"
              textAnchor="middle"
              fill="#e8e8e8"
              fontSize="8"
              fontFamily="'Press Start 2P', monospace"
            >
              Dinner
            </text>
          </g>

          {/* Step indicators along path */}
          <circle cx="60" cy="60" r="6" fill="#e94560" />
          <text
            x="60"
            y="63"
            textAnchor="middle"
            fill="#fff"
            fontSize="8"
            fontFamily="'Press Start 2P', monospace"
          >
            1
          </text>

          <circle cx="220" cy="140" r="6" fill="#4ecca3" />
          <text
            x="220"
            y="143"
            textAnchor="middle"
            fill="#fff"
            fontSize="8"
            fontFamily="'Press Start 2P', monospace"
          >
            2
          </text>

          <circle cx="310" cy="220" r="6" fill="#e94560" />
          <text
            x="310"
            y="223"
            textAnchor="middle"
            fill="#fff"
            fontSize="8"
            fontFamily="'Press Start 2P', monospace"
          >
            3
          </text>

          {/* Map title */}
          <text
            x="190"
            y="270"
            textAnchor="middle"
            fill="#e94560"
            fontSize="7"
            fontFamily="'Press Start 2P', monospace"
            opacity="0.7"
          >
            ~ Date Itinerary ~
          </text>
        </svg>
      </div>
    </div>
  );
}

export function MapScreen({ screen, lineIndex, dispatch }: MapScreenProps) {
  const lines = screen.lines ?? [];
  const hasLines = lines.length > 0;
  const currentLine = lines[lineIndex] ?? "";
  const isLastLine = lineIndex >= lines.length - 1;
  const label = screen.continueLabel ?? "...";

  // Map-only mode: no dialogue, just the map dramatically
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

  // Map + dialogue mode
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
