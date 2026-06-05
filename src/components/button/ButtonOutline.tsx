import { memo } from "react";

import { VectorIcon, VectorIconIcon } from "@assets/icons";

interface Props {
  label: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: VectorIconIcon;
  rightIcon?: VectorIconIcon;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  color?: "primary" | "error" | "success" | "warning";
}

export const ButtonOutline = memo(
  ({
    label,
    onPress,
    loading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    size = "md",
    fullWidth = false,
    type = "button",
    color = "primary",
  }: Props) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2.5 text-sm gap-2",
      lg: "px-5 py-3 text-base gap-2.5",
    };

    const iconSize = { sm: 14, md: 16, lg: 18 };

    const colorClasses = {
      primary: "border-primary text-primary hover:bg-primary/10",
      error: "border-error text-error hover:bg-error/10",
      success: "border-success text-success hover:bg-success/10",
      warning: "border-warning text-warning hover:bg-warning/10",
    };

    const iconColorMap = {
      primary: "var(--color-primary)",
      error: "var(--color-error)",
      success: "var(--color-success)",
      warning: "var(--color-warning)",
    };

    return (
      <button
        type={type}
        onClick={onPress}
        disabled={disabled || loading}
        className={[
          "inline-flex items-center justify-center font-semibold rounded-xl border",
          "bg-transparent active:scale-[0.97]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-all duration-200 ease-in-out cursor-pointer",
          colorClasses[color],
          sizeClasses[size],
          fullWidth ? "w-full" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {loading ? (
          <svg
            className="animate-spin"
            style={{ width: iconSize[size], height: iconSize[size] }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon && (
            <VectorIcon
              icon={leftIcon}
              size={iconSize[size]}
              color={iconColorMap[color]}
            />
          )
        )}
        <span>{label}</span>
        {!loading && rightIcon && (
          <VectorIcon
            icon={rightIcon}
            size={iconSize[size]}
            color={iconColorMap[color]}
          />
        )}
      </button>
    );
  },
);
