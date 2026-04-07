import type { ReactNode } from "react";
import { useTypewriter } from "../../hooks/useTypewriter";

interface DialogueBoxProps {
  speaker?: string;
  children: ReactNode;
}

const boxStyle: React.CSSProperties = {
  border: "3px solid var(--border-color)",
  backgroundColor: "var(--bg-secondary)",
  padding: "20px",
  width: "100%",
};

const textStyle: React.CSSProperties = {
  fontSize: "var(--font-size-base)",
  lineHeight: "2",
  color: "var(--text-primary)",
};

const speakerBoxStyle: React.CSSProperties = {
  border: "3px solid var(--border-color)",
  backgroundColor: "var(--bg-secondary)",
  display: "flex",
  alignItems: "stretch",
  gap: "12px",
  padding: "12px",
  width: "100%",
};

const avatarColumnStyle: React.CSSProperties = {
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3px",
  justifyContent: "space-between",
};

const avatarFrameStyle: React.CSSProperties = {
  border: "2px solid var(--border-color)",
  backgroundColor: "var(--bg-card)",
  padding: "3px",
  lineHeight: 0,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const speakerLabelStyle: React.CSSProperties = {
  fontSize: "5px",
  color: "var(--text-accent)",
  fontFamily: "var(--font-pixel)",
  textAlign: "center",
  lineHeight: "1.2",
};

const messageColumnStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  minHeight: "100px",
};

const speakerTextStyle: React.CSSProperties = {
  ...textStyle,
  wordBreak: "break-word",
};

const baseCursorStyle: React.CSSProperties = {
  display: "inline-block",
  width: "6px",
  height: "10px",
  backgroundColor: "var(--text-accent)",
  marginLeft: "4px",
  verticalAlign: "middle",
};

const blinkingCursorStyle: React.CSSProperties = {
  ...baseCursorStyle,
  animation: "cursor-blink 1s step-end infinite",
};

const typingCursorStyle: React.CSSProperties = {
  ...baseCursorStyle,
  opacity: 1,
};

const AVATAR_SVG = (
  <svg
    viewBox="0 0 60 90"
    width="52"
    height="auto"
    style={{ display: "block", imageRendering: "pixelated", width: "100%" }}
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

    <rect x="6" y="48" width="48" height="6" fill="#2d1f45" />
    <rect x="24" y="48" width="6" height="2" fill="#c68642" />
    <rect x="22" y="50" width="4" height="3" fill="#241838" />
    <rect x="34" y="50" width="4" height="3" fill="#241838" />

    <rect x="0" y="54" width="60" height="6" fill="#2d1f45" />
    <rect x="0" y="60" width="60" height="6" fill="#2d1f45" />
    <rect x="0" y="66" width="60" height="6" fill="#2d1f45" />
    <rect x="0" y="72" width="60" height="6" fill="#2d1f45" />
    <rect x="0" y="78" width="60" height="6" fill="#2d1f45" />
    <rect x="0" y="84" width="60" height="6" fill="#2d1f45" />

    <rect x="28" y="56" width="4" height="4" fill="#ffafcc" opacity="0.4" />
    <rect x="28" y="68" width="4" height="4" fill="#ffafcc" opacity="0.4" />
    <rect x="28" y="80" width="4" height="4" fill="#ffafcc" opacity="0.4" />
  </svg>
);

function TypewriterText({ text }: { text: string }) {
  const { displayedText, isTyping } = useTypewriter(text);

  return (
    <>
      {displayedText}
      <span style={isTyping ? typingCursorStyle : blinkingCursorStyle} />
    </>
  );
}

export function DialogueBox({ speaker, children }: DialogueBoxProps) {
  const isString = typeof children === "string";

  if (!speaker) {
    return (
      <div style={boxStyle}>
        <div style={textStyle}>
          {isString ? <TypewriterText text={children} /> : children}
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <div style={speakerBoxStyle}>
        <div style={avatarColumnStyle}>
          <div style={avatarFrameStyle}>{AVATAR_SVG}</div>
          <div style={speakerLabelStyle}>{speaker}</div>
        </div>

        <div style={messageColumnStyle}>
          <div style={speakerTextStyle}>
            {isString ? <TypewriterText text={children} /> : children}
          </div>
        </div>
      </div>
    </div>
  );
}
