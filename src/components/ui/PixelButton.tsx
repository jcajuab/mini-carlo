import type { ButtonHTMLAttributes } from "react";

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const baseStyle: React.CSSProperties = {
  fontFamily: "var(--font-pixel)",
  fontSize: "var(--font-size-base)",
  padding: "14px 24px",
  border: "3px solid",
  cursor: "pointer",
  textTransform: "uppercase",
  letterSpacing: "1px",
  lineHeight: "1.6",
  minHeight: "44px",
  minWidth: "44px",
  transition: "all 0.15s ease",
};

const variantStyles: Record<
  NonNullable<PixelButtonProps["variant"]>,
  React.CSSProperties
> = {
  primary: {
    borderColor: "var(--btn-bg)",
    backgroundColor: "var(--btn-bg)",
    color: "var(--btn-text)",
  },
  secondary: {
    borderColor: "var(--text-secondary)",
    backgroundColor: "transparent",
    color: "var(--text-primary)",
  },
};

export function PixelButton({
  variant = "primary",
  children,
  style,
  ...props
}: PixelButtonProps) {
  return (
    <button
      style={{ ...baseStyle, ...variantStyles[variant], ...style }}
      className="pixel-button"
      {...props}
    >
      {children}
    </button>
  );
}
