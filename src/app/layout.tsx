import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EntryEventPopup from "./components/EntryEventPopup";

export const metadata: Metadata = {
  title: "GURAPA LAB",
  description: "GURAPA LAB 쇼핑몰",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-neutral-950">
        <Header />
        <main className="w-full">
          <EntryEventPopup />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
