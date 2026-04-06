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

export function Timer({ secondsLeft }: TimerProps) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isUrgent = secondsLeft <= 30;

  return (
    <div
      style={{
        ...baseStyle,
        color: isUrgent ? "var(--fail)" : "var(--text-accent)",
        borderColor: isUrgent ? "var(--fail)" : "var(--border-color)",
        animation: isUrgent ? "blink 0.5s step-end infinite" : undefined,
      }}
    >
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}
