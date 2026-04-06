import type { ButtonHTMLAttributes } from "react";

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function PixelButton({
  variant = "primary",
  children,
  style,
  ...props
}: PixelButtonProps) {
  return (
    <button
      style={{
        fontFamily: "var(--font-pixel)",
        fontSize: "var(--font-size-base)",
        padding: "14px 24px",
        border: "3px solid",
        borderColor:
          variant === "primary" ? "var(--btn-bg)" : "var(--text-secondary)",
        backgroundColor:
          variant === "primary" ? "var(--btn-bg)" : "transparent",
        color:
          variant === "primary" ? "var(--btn-text)" : "var(--text-primary)",
        cursor: "pointer",
        textTransform: "uppercase",
        letterSpacing: "1px",
        lineHeight: "1.6",
        minHeight: "44px",
        minWidth: "44px",
        transition: "all 0.15s ease",
        ...style,
      }}
      className="pixel-button"
      {...props}
    >
      {children}
    </button>
  );
}
