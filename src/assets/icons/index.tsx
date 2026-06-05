import { memo, useMemo } from "react";
import isEqual from "react-fast-compare";
import IcoMoon, { IconProps as IcoMoonProps } from "react-icomoon";

import { Colors, useTheme } from "@themes";

import { VectorIconNames } from "./icon-name";
import json from "./selection.json";

export type VectorIconIcon = (typeof VectorIconNames)[number];

export type IconProps = Omit<IcoMoonProps, "iconSet" | "icon"> & {
  icon?: VectorIconIcon;
  colorTheme?: keyof Colors;
  isResize?: boolean;
};

export const VectorIcon = memo(
  ({
    icon,
    color,
    colorTheme,
    isResize = true,
    size,
    ...restProps
  }: IconProps) => {
    const { colors } = useTheme();

    const iconColor = useMemo(
      () => (colorTheme && (colors as any)[colorTheme]) || color,
      [color, colorTheme, colors],
    );

    return icon ? (
      <IcoMoon
        iconSet={json}
        icon={icon}
        color={iconColor}
        size={size || 24}
        {...restProps}
      />
    ) : null;
  },
  isEqual,
);
