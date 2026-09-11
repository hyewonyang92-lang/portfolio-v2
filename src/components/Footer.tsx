const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="container-editorial flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <span className="text-meta text-[var(--color-text-secondary)]">
          © {YEAR} YANG HYEWON
        </span>
        <div className="flex gap-6">
          <a
            href="mailto:hyewonyang92@gmail.com"
            className="text-meta transition-opacity duration-200 hover:opacity-60"
          >
            EMAIL
          </a>
          <a
            href="#"
            className="text-meta transition-opacity duration-200 hover:opacity-60"
          >
            INSTAGRAM
          </a>
          <a
            href="#"
            className="text-meta transition-opacity duration-200 hover:opacity-60"
          >
            LINKEDIN
          </a>
        </div>
      </div>
    </footer>
  );
}
