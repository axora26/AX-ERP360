import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly loading?: boolean;
  readonly loadingLabel?: string;
  readonly leadingIcon?: ReactNode;
  readonly trailingIcon?: ReactNode;
  readonly fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      className,
      disabled,
      fullWidth = false,
      leadingIcon,
      loading = false,
      loadingLabel = "Chargement en cours",
      size = "md",
      trailingIcon,
      type = "button",
      variant = "primary",
      ...props
    },
    ref,
  ) {
    const classes = [
      "ax-button",
      `ax-button--${variant}`,
      `ax-button--${size}`,
      fullWidth ? "ax-button--full-width" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        {...props}
        aria-busy={loading || undefined}
        className={classes}
        disabled={disabled || loading}
        ref={ref}
        type={type}
      >
        {loading ? (
          <span aria-hidden="true" className="ax-button__spinner" />
        ) : (
          leadingIcon
        )}
        <span className="ax-button__label">
          {loading ? loadingLabel : children}
        </span>
        {!loading && trailingIcon}
      </button>
    );
  },
);
