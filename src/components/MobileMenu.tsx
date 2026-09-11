"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  pathname: string;
}

export default function MobileMenu({
  open,
  onClose,
  links,
  pathname,
}: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed inset-0 z-[60] flex flex-col bg-[var(--color-bg)] md:hidden"
        >
          <div className="container-editorial flex h-[72px] w-full items-center justify-between border-b border-[var(--color-border)]">
            <span className="text-meta">YANG HYEWON</span>
            <button
              type="button"
              onClick={onClose}
              className="text-meta"
              aria-label="Close menu"
            >
              CLOSE
            </button>
          </div>

          <nav className="container-editorial flex w-full flex-1 flex-col justify-center gap-6">
            {links.map((link, i) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="text-h1 relative inline-block uppercase"
                  >
                    {link.label}
                    {active && (
                      <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-[var(--color-text)]" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
