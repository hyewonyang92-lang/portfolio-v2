"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";

const LINKS = [
  { href: "/", label: "HOME" },
  { href: "/work", label: "WORK" },
  { href: "/information", label: "INFORMATION" },
];

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full ${
          isHome
            ? ""
            : "border-b border-[var(--color-border)] bg-[var(--color-bg)]"
        }`}
      >
        <motion.div
          initial={isHome ? { opacity: 0, y: -8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="container-editorial flex h-[72px] items-center justify-between md:h-[88px]"
        >
          <Link
            href="/"
            className="text-meta group inline-flex items-center gap-2"
          >
            <span className="transition-opacity duration-200 group-hover:opacity-60">
              YANG HYEWON
            </span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-meta group relative py-1"
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute left-0 -bottom-0.5 h-px w-full origin-left bg-[var(--color-text)] transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="text-meta md:hidden"
            aria-label="Open menu"
          >
            MENU
          </button>
        </motion.div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={LINKS}
        pathname={pathname}
      />
    </>
  );
}
