import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { CursorProvider } from "@/lib/cursor-context";

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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <CursorProvider>
          <Navigation />
          <CustomCursor />
          <main className="flex-1">{children}</main>
          <Footer />
        </CursorProvider>
      </body>
    </html>
  );
}
