interface TimerProps {
  secondsLeft: number;
}

const baseStyle: React.CSSProperties = {
  fontFamily: "var(--font-pixel)",
  fontSize: "var(--font-size-xl)",
  textAlign: "center",
  padding: "8px 16px",
  border: "3px solid",
  backgroundColor: "var(--bg-secondary)",
};

const normalStyle: React.CSSProperties = {
  ...baseStyle,
  color: "var(--text-accent)",
  borderColor: "var(--border-color)",
};

const urgentStyle: React.CSSProperties = {
  ...baseStyle,
  color: "var(--fail)",
  borderColor: "var(--fail)",
  animation: "blink 0.5s step-end infinite",
};

export function Timer({ secondsLeft }: TimerProps) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div style={secondsLeft <= 30 ? urgentStyle : normalStyle}>
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}
