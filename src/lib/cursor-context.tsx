"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type CursorVariant = "default" | "view-project" | "prev" | "next" | "external";

interface CursorState {
  variant: CursorVariant;
  label: string;
}

interface CursorContextValue {
  cursor: CursorState;
  setCursor: (variant: CursorVariant, label?: string) => void;
  resetCursor: () => void;
}

const LABELS: Record<CursorVariant, string> = {
  default: "",
  "view-project": "VIEW PROJECT →",
  prev: "← PREV",
  next: "NEXT →",
  external: "OPEN ↗",
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursor, setCursorState] = useState<CursorState>({
    variant: "default",
    label: "",
  });

  const setCursor = useCallback((variant: CursorVariant, label?: string) => {
    setCursorState({ variant, label: label ?? LABELS[variant] });
  }, []);

  const resetCursor = useCallback(() => {
    setCursorState({ variant: "default", label: "" });
  }, []);

  const value = useMemo(
    () => ({ cursor, setCursor, resetCursor }),
    [cursor, setCursor, resetCursor],
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}
