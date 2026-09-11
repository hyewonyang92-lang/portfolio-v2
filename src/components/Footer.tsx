import { pillClass } from "@/lib/pill";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-gray)]">
      <div className="container-editorial flex flex-col gap-4 py-8 pb-20 md:flex-row md:items-center md:justify-between md:pb-8">
        <span className="text-ui">© {YEAR} YANG HYEWON</span>
        <div className="flex gap-2">
          <a href="mailto:hyewonyang92@gmail.com" className={pillClass(false)}>
            EMAIL
          </a>
          <a href="#" className={pillClass(false)}>
            INSTAGRAM
          </a>
          <a href="#" className={pillClass(false)}>
            LINKEDIN
          </a>
        </div>
      </div>
    </footer>
  );
}
