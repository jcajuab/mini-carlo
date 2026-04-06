import type { ReactNode } from "react";

interface DialogueBoxProps {
  speaker?: string;
  children: ReactNode;
}

export function DialogueBox({ speaker, children }: DialogueBoxProps) {
  return (
    <div
      style={{
        border: "3px solid var(--border-color)",
        backgroundColor: "var(--bg-secondary)",
        padding: "20px",
        width: "100%",
        position: "relative",
      }}
    >
      {speaker && (
        <div
          style={{
            position: "absolute",
            top: "-12px",
            left: "12px",
            backgroundColor: "var(--bg-primary)",
            padding: "2px 8px",
            fontSize: "var(--font-size-sm)",
            color: "var(--text-accent)",
            border: "2px solid var(--border-color)",
          }}
        >
          {speaker}
        </div>
      )}
      <div
        style={{
          fontSize: "var(--font-size-base)",
          lineHeight: "2",
          color: "var(--text-primary)",
          marginTop: speaker ? "4px" : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
