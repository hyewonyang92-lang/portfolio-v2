import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import TransitionShell from "@/components/TransitionShell";
import { CursorProvider } from "@/lib/cursor-context";
import { PageTransitionProvider } from "@/lib/transition-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yang Hyewon — UI/UX Designer",
  description:
    "Yang Hyewon is a UI/UX designer based in Seoul, building better experiences, process by process.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <PageTransitionProvider>
          <CursorProvider>
            <Navigation />
            <CustomCursor />
            <TransitionShell>{children}</TransitionShell>
            <Footer />
          </CursorProvider>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
