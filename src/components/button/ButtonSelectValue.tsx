import { memo } from "react";

import { VectorIcon } from "@assets/icons";

interface Props {
  label: string;
  placeholder?: string;
  onPress?: () => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  hasValue?: boolean;
  onClear?: () => void;
}

export const ButtonSelectValue = memo(
  ({
    label,
    placeholder = "Select...",
    onPress,
    disabled = false,
    size = "md",
    fullWidth = false,
    hasValue = false,
    onClear,
  }: Props) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2.5 text-sm",
      lg: "px-5 py-3 text-base",
    };

    const iconSize = { sm: 12, md: 14, lg: 16 };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClear?.();
    };

    return (
      <button
        type="button"
        onClick={onPress}
        disabled={disabled}
        className={[
          "inline-flex items-center justify-between gap-2 font-medium rounded-xl border",
          "bg-surface border-border",
          "hover:border-primary/50 hover:bg-surface-variant",
          "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-all duration-200 ease-in-out cursor-pointer",
          sizeClasses[size],
          fullWidth ? "w-full" : "min-w-[140px]",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span
          className={
            hasValue
              ? "text-on-surface flex-1 text-left truncate"
              : "text-placeholder flex-1 text-left truncate"
          }
        >
          {hasValue ? label : placeholder}
        </span>

        <span className="inline-flex items-center gap-1 flex-shrink-0">
          {hasValue && onClear && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(e) => e.key === "Enter" && handleClear(e as any)}
              className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-border transition-colors duration-150"
              aria-label="Clear selection"
            >
              <VectorIcon
                icon="xmark_outline"
                size={iconSize[size]}
                color="var(--color-on-surface-variant)"
              />
            </span>
          )}
          <VectorIcon
            icon="chevron_down_outline"
            size={iconSize[size]}
            color="var(--color-on-surface-variant)"
          />
        </span>
      </button>
    );
  },
);
