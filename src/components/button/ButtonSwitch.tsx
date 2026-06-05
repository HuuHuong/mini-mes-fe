import { memo } from "react";

interface Props {
  value: boolean;
  onToggle?: (value: boolean) => void;
  disabled?: boolean;
  label?: string;
  labelPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
}

export const ButtonSwitch = memo(
  ({
    value,
    onToggle,
    disabled = false,
    label,
    labelPosition = "right",
    size = "md",
  }: Props) => {
    const trackSize = {
      sm: { width: "32px", height: "18px" },
      md: { width: "42px", height: "24px" },
      lg: { width: "52px", height: "30px" },
    };

    const thumbSize = {
      sm: {
        size: "12px",
        translateOn: "translateX(14px)",
        translateOff: "translateX(3px)",
      },
      md: {
        size: "16px",
        translateOn: "translateX(19px)",
        translateOff: "translateX(4px)",
      },
      lg: {
        size: "22px",
        translateOn: "translateX(22px)",
        translateOff: "translateX(4px)",
      },
    };

    const labelSize = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };

    const handleToggle = () => {
      if (!disabled) {
        onToggle?.(!value);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
    };

    const track = (
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={[
          "relative inline-flex items-center shrink-0  rounded-full",
          "transition-colors duration-300 ease-in-out",
          "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1 focus:ring-offset-transparent",
          "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          value ? "bg-primary" : "bg-border",
        ]
          .filter(Boolean)
          .join(" ")}
        style={trackSize[size]}
      >
        <span
          aria-hidden="true"
          className="inline-block rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out shrink-0"
          style={{
            width: thumbSize[size].size,
            height: thumbSize[size].size,
            transform: value
              ? thumbSize[size].translateOn
              : thumbSize[size].translateOff,
          }}
        />
      </button>
    );

    if (!label) return track;

    return (
      <div
        className={[
          "inline-flex items-center gap-2",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          labelSize[size],
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={!disabled ? handleToggle : undefined}
      >
        {labelPosition === "left" && (
          <span className="font-medium text-on-surface select-none">
            {label}
          </span>
        )}
        {track}
        {labelPosition === "right" && (
          <span className="font-medium text-on-surface select-none">
            {label}
          </span>
        )}
      </div>
    );
  },
);
