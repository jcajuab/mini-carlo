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
        backgroundColor: "var(--bg-primary)",
        padding: "8px",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "#1e1533",
          border: "2px solid #4a2d5c",
          padding: "4px",
        }}
      >
        <svg
          viewBox="0 0 380 280"
          width="100%"
          height="auto"
          style={{ display: "block" }}
        >
          {/* Background grid */}
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect width="20" height="20" fill="none" />
              <rect width="1" height="1" x="0" y="0" fill="#2a1d3e" />
            </pattern>
          </defs>
          <rect width="380" height="280" fill="url(#grid)" />

          {/* Winding path */}
          <path
            d="M 60 60 C 100 60, 120 100, 140 120 C 160 140, 200 150, 220 140 C 240 130, 260 120, 280 140 C 300 160, 310 190, 310 220"
            fill="none"
            stroke="#4a2d5c"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 60 60 C 100 60, 120 100, 140 120 C 160 140, 200 150, 220 140 C 240 130, 260 120, 280 140 C 300 160, 310 190, 310 220"
            fill="none"
            stroke="#ffafcc"
            strokeWidth="3"
            strokeDasharray="8 6"
            strokeLinecap="round"
          />

          {/* Decorative flowers/stars */}
          <g transform="translate(100, 80)">
            <rect x="3" y="8" width="4" height="6" fill="#8a6baa" />
            <rect x="0" y="0" width="10" height="4" fill="#cdb4db" />
            <rect x="2" y="-4" width="6" height="4" fill="#dcc4e8" />
            <rect x="3" y="-6" width="4" height="2" fill="#e8d5f0" />
          </g>
          <g transform="translate(170, 100)">
            <rect x="3" y="8" width="4" height="6" fill="#8a6baa" />
            <rect x="0" y="0" width="10" height="4" fill="#a2d2ff" />
            <rect x="2" y="-4" width="6" height="4" fill="#bde0fe" />
          </g>
          <g transform="translate(250, 180)">
            <rect x="3" y="8" width="4" height="6" fill="#8a6baa" />
            <rect x="0" y="0" width="10" height="4" fill="#cdb4db" />
            <rect x="2" y="-4" width="6" height="4" fill="#dcc4e8" />
            <rect x="3" y="-6" width="4" height="2" fill="#e8d5f0" />
          </g>

          {/* Sparkles */}
          <rect
            x="150"
            y="40"
            width="3"
            height="3"
            fill="#ffc8dd"
            opacity="0.6"
          />
          <rect
            x="300"
            y="70"
            width="2"
            height="2"
            fill="#ffafcc"
            opacity="0.4"
          />
          <rect
            x="80"
            y="200"
            width="3"
            height="3"
            fill="#ffc8dd"
            opacity="0.5"
          />
          <rect
            x="340"
            y="140"
            width="2"
            height="2"
            fill="#a2d2ff"
            opacity="0.3"
          />
          <rect
            x="50"
            y="150"
            width="2"
            height="2"
            fill="#bde0fe"
            opacity="0.4"
          />

          {/* === LOCATION 1: COFFEE === */}
          <g transform="translate(38, 30)">
            <rect x="0" y="24" width="40" height="8" fill="#4a2d5c" rx="2" />
            <rect x="10" y="6" width="20" height="16" fill="#ffafcc" />
            <rect x="12" y="8" width="16" height="12" fill="#342650" />
            <rect
              x="14"
              y="10"
              width="4"
              height="2"
              fill="#cdb4db"
              opacity="0.5"
            />
            <rect x="30" y="10" width="4" height="2" fill="#ffafcc" />
            <rect x="32" y="10" width="2" height="8" fill="#ffafcc" />
            <rect x="30" y="16" width="4" height="2" fill="#ffafcc" />
            <rect
              x="16"
              y="2"
              width="2"
              height="3"
              fill="#cdb4db"
              opacity="0.4"
            />
            <rect
              x="22"
              y="0"
              width="2"
              height="4"
              fill="#cdb4db"
              opacity="0.3"
            />
            <text
              x="20"
              y="44"
              textAnchor="middle"
              fill="#ffc8dd"
              fontSize="8"
              fontFamily="'Press Start 2P', monospace"
            >
              Coffee
            </text>
          </g>

          {/* === LOCATION 2: INTERMISSION === */}
          <g transform="translate(195, 110)">
            <rect x="0" y="24" width="50" height="8" fill="#4a2d5c" rx="2" />
            <rect x="15" y="4" width="20" height="18" fill="#bde0fe" />
            <rect x="17" y="6" width="16" height="14" fill="#342650" />
            <rect x="23" y="8" width="4" height="2" fill="#bde0fe" />
            <rect x="21" y="10" width="8" height="2" fill="#bde0fe" />
            <rect x="19" y="12" width="12" height="2" fill="#bde0fe" />
            <rect x="21" y="14" width="3" height="2" fill="#bde0fe" />
            <rect x="26" y="14" width="3" height="2" fill="#bde0fe" />
            <text
              x="25"
              y="44"
              textAnchor="middle"
              fill="#ffc8dd"
              fontSize="7"
              fontFamily="'Press Start 2P', monospace"
            >
              Intermission
            </text>
          </g>

          {/* === LOCATION 3: DINNER === */}
          <g transform="translate(285, 195)">
            <rect x="0" y="24" width="44" height="8" fill="#4a2d5c" rx="2" />
            <rect x="6" y="10" width="30" height="14" fill="#cdb4db" rx="2" />
            <rect x="8" y="12" width="26" height="10" fill="#342650" rx="1" />
            <rect x="2" y="4" width="2" height="18" fill="#cdb4db" />
            <rect x="0" y="4" width="2" height="6" fill="#cdb4db" />
            <rect x="4" y="4" width="2" height="6" fill="#cdb4db" />
            <rect x="38" y="4" width="3" height="18" fill="#cdb4db" />
            <rect x="14" y="15" width="3" height="3" fill="#ffafcc" />
            <rect x="22" y="14" width="4" height="4" fill="#bde0fe" />
            <rect
              x="18"
              y="17"
              width="2"
              height="2"
              fill="#ffc8dd"
              opacity="0.7"
            />
            <text
              x="22"
              y="44"
              textAnchor="middle"
              fill="#ffc8dd"
              fontSize="8"
              fontFamily="'Press Start 2P', monospace"
            >
              Dinner
            </text>
          </g>

          {/* Step indicators */}
          <circle cx="60" cy="60" r="6" fill="#ffafcc" />
          <text
            x="60"
            y="63"
            textAnchor="middle"
            fill="#2a1d3e"
            fontSize="8"
            fontFamily="'Press Start 2P', monospace"
          >
            1
          </text>

          <circle cx="220" cy="140" r="6" fill="#bde0fe" />
          <text
            x="220"
            y="143"
            textAnchor="middle"
            fill="#2a1d3e"
            fontSize="8"
            fontFamily="'Press Start 2P', monospace"
          >
            2
          </text>

          <circle cx="310" cy="220" r="6" fill="#ffafcc" />
          <text
            x="310"
            y="223"
            textAnchor="middle"
            fill="#2a1d3e"
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
            fill="#ffafcc"
            fontSize="7"
            fontFamily="'Press Start 2P', monospace"
            opacity="0.7"
          >
            ~ &quot;Date&quot; Itinerary ~
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
