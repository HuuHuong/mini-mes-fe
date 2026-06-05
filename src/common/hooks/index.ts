import { useCallback, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@redux/stores/all-reducer";
import type { AppDispatch } from "@redux/stores/store";
import { AppThemes } from "@themes";

// ---------------------------------------------------------------------------
// useEventCallback
// ---------------------------------------------------------------------------
const useEventCallback = <Fn extends (...args: any[]) => ReturnType<Fn>>(
  func: Fn,
) => {
  const callbackRef = useRef<
    ((...args: Parameters<Fn>) => ReturnType<Fn>) | undefined
  >(undefined);

  const callbackMemoized = useCallback((...args: Parameters<Fn>) => {
    return callbackRef.current?.(...args);
  }, []);

  useLayoutEffect(() => {
    callbackRef.current = func;
  });

  return callbackMemoized;
};

// ---------------------------------------------------------------------------
// Typed Redux hooks
// ---------------------------------------------------------------------------
const useAppSelector = <T>(selector: (state: RootState) => T): T => {
  return useSelector(selector);
};

const useAppDispatch = (): AppDispatch => {
  return useDispatch<AppDispatch>();
};

// ---------------------------------------------------------------------------
// useTheme — reads themeMode from Redux and returns the matching color palette
// ---------------------------------------------------------------------------
const useTheme = () => {
  const themeMode = useAppSelector((state) => state.app.themeMode);
  const colors = AppThemes[themeMode];

  return { colors, themeMode };
};

export { useEventCallback, useAppSelector, useAppDispatch, useTheme };
