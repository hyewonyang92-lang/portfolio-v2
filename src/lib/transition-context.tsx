"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

interface PageTransitionContextValue {
  active: boolean;
  navigate: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null,
);

const TRANSITION_MS = 550;

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      const t = setTimeout(() => setActive(false), 60);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("home-scroll-y", String(window.scrollY));
      }
      setActive(true);
      window.setTimeout(() => {
        router.push(href);
      }, TRANSITION_MS);
    },
    [router],
  );

  return (
    <PageTransitionContext.Provider value={{ active, navigate }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      "usePageTransition must be used within PageTransitionProvider",
    );
  }
  return ctx;
}
