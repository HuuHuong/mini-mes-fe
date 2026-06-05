import { memo, useEffect, type ReactNode } from "react";

import { useAppSelector } from "@common/hooks";

interface Props {
  children: ReactNode;
}

export const ThemeProvider = memo(({ children }: Props) => {
  const themeMode = useAppSelector((state) => state.app.themeMode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  return <>{children}</>;
});
