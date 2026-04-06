import type { ReactNode } from "react";

interface DialogueBoxProps {
  speaker?: string;
  children: ReactNode;
}

const AVATAR_SVG = (
  <svg
    viewBox="0 0 60 60"
    width="52"
    height="52"
    style={{ display: "block", imageRendering: "pixelated" }}
  >
    <rect x="12" y="0" width="36" height="6" fill="#2a2a2a" />
    <rect x="6" y="6" width="48" height="6" fill="#2a2a2a" />
    <rect x="6" y="12" width="6" height="6" fill="#2a2a2a" />
    <rect x="48" y="12" width="6" height="6" fill="#2a2a2a" />

    <rect x="12" y="12" width="36" height="6" fill="#c68642" />

    <rect x="6" y="18" width="48" height="6" fill="#c68642" />
    <rect
      x="12"
      y="17"
      width="16"
      height="8"
      fill="none"
      stroke="#cdb4db"
      strokeWidth="2"
    />
    <rect
      x="32"
      y="17"
      width="16"
      height="8"
      fill="none"
      stroke="#cdb4db"
      strokeWidth="2"
    />
    <rect x="28" y="19" width="4" height="2" fill="#cdb4db" />
    <rect x="18" y="19" width="6" height="4" fill="#2a1d3e" />
    <rect x="20" y="20" width="2" height="2" fill="#fff" />
    <rect x="36" y="19" width="6" height="4" fill="#2a1d3e" />
    <rect x="38" y="20" width="2" height="2" fill="#fff" />

    <rect x="6" y="24" width="48" height="6" fill="#c68642" />
    <rect x="28" y="25" width="4" height="4" fill="#b07535" />

    <rect x="6" y="30" width="48" height="6" fill="#c68642" />
    <rect x="24" y="32" width="12" height="3" fill="#2a1d3e" />
    <rect x="26" y="32" width="8" height="2" fill="#ffafcc" opacity="0.5" />

    <rect x="12" y="36" width="36" height="6" fill="#c68642" />

    <rect x="18" y="42" width="24" height="6" fill="#c68642" />
    <rect x="6" y="48" width="48" height="6" fill="#3d2d5c" />
    <rect x="0" y="54" width="60" height="6" fill="#3d2d5c" />
  </svg>
);

export function DialogueBox({ speaker, children }: DialogueBoxProps) {
  if (!speaker) {
    return (
      <div
        style={{
          border: "3px solid var(--border-color)",
          backgroundColor: "var(--bg-secondary)",
          padding: "20px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "var(--font-size-base)",
            lineHeight: "2",
            color: "var(--text-primary)",
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          border: "3px solid var(--border-color)",
          backgroundColor: "var(--bg-secondary)",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          padding: "12px",
          width: "100%",
        }}
      >
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
          }}
        >
          <div
            style={{
              border: "2px solid var(--border-color)",
              backgroundColor: "var(--bg-card)",
              padding: "3px",
              lineHeight: 0,
            }}
          >
            {AVATAR_SVG}
          </div>
          <div
            style={{
              fontSize: "5px",
              color: "var(--text-accent)",
              fontFamily: "var(--font-pixel)",
              textAlign: "center",
              lineHeight: "1.2",
            }}
          >
            {speaker}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "58px",
          }}
        >
          <div
            style={{
              fontSize: "var(--font-size-base)",
              lineHeight: "2",
              color: "var(--text-primary)",
              wordBreak: "break-word",
            }}
          >
            {children}
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "10px",
                backgroundColor: "var(--text-accent)",
                marginLeft: "4px",
                verticalAlign: "middle",
                animation: "cursor-blink 1s step-end infinite",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
