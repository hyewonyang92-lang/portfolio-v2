"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { pillClass, pillStaticClass } from "@/lib/pill";

const LINKS = [
  { href: "/", label: "HOME" },
  { href: "/work", label: "WORK" },
  { href: "/information", label: "INFORMATION" },
];

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Top bar — hidden on mobile; the bottom bar takes over nav duties there */}
      <header className="fixed top-0 left-0 z-50 hidden w-full md:block">
        <motion.div
          initial={isHome ? { opacity: 0, y: -8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="container-editorial flex h-[88px] items-center justify-between gap-2"
        >
          <Link href="/" className={pillStaticClass()}>
            YANG HYEWON
          </Link>

          <nav className="flex items-center gap-2">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pillClass(isActive(link.href))}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      </header>

      {/* Bottom bar — mobile only */}
      <nav
        className="fixed right-[var(--gutter)] bottom-[var(--gutter)] left-[var(--gutter)] z-50 flex items-center justify-between gap-[var(--gutter)] md:hidden"
        aria-label="Primary"
      >
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex-1 ${pillClass(isActive(link.href))}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
