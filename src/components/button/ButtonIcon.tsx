import { memo } from "react";

import { VectorIcon, VectorIconIcon } from "@assets/icons";

interface Props {
  icon: VectorIconIcon;
  onPress?: () => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "ghost";
  tooltip?: string;
  type?: "button" | "submit" | "reset";
}

export const ButtonIcon = memo(
  ({
    icon,
    onPress,
    disabled = false,
    size = "md",
    variant = "default",
    tooltip,
    type = "button",
  }: Props) => {
    const sizeDimension = { sm: "28px", md: "36px", lg: "44px" };
    const iconSize = { sm: 14, md: 18, lg: 22 };

    const variantClasses = {
      default:
        "bg-surface-variant border border-border text-on-surface-variant hover:bg-border hover:text-on-surface",
      primary:
        "bg-primary text-white hover:bg-primary-hover shadow-sm shadow-primary/20",
      ghost:
        "bg-transparent text-on-surface-variant hover:bg-surface-variant hover:text-on-surface",
    };

    const iconColorMap = {
      default: "var(--color-on-surface-variant)",
      primary: "white",
      ghost: "var(--color-on-surface-variant)",
    };

    return (
      <button
        type={type}
        onClick={onPress}
        disabled={disabled}
        title={tooltip}
        aria-label={tooltip}
        className={[
          "inline-flex items-center justify-center rounded-xl",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "active:scale-[0.92] transition-all duration-200 ease-in-out cursor-pointer",
          "shrink-0",
          variantClasses[variant],
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          width: sizeDimension[size],
          height: sizeDimension[size],
        }}
      >
        <VectorIcon
          icon={icon}
          size={iconSize[size]}
          color={iconColorMap[variant]}
        />
      </button>
    );
  },
);
