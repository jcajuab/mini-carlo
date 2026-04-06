interface TimerProps {
  secondsLeft: number;
}

export function Timer({ secondsLeft }: TimerProps) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isUrgent = secondsLeft <= 30;

  return (
    <div
      style={{
        fontFamily: "var(--font-pixel)",
        fontSize: "var(--font-size-xl)",
        color: isUrgent ? "var(--fail)" : "var(--text-accent)",
        textAlign: "center",
        padding: "8px 16px",
        border: `3px solid ${isUrgent ? "var(--fail)" : "var(--border-color)"}`,
        backgroundColor: "var(--bg-secondary)",
        animation: isUrgent ? "blink 0.5s step-end infinite" : undefined,
      }}
    >
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}
