import "./globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import HeroUIProviderWrapper from "@/providers/HeroUIProvider";

const defaultFont = Manrope({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Melody",
  description: "Unleash your innter music critic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${defaultFont.className} antialiased dark`}
      >
        <HeroUIProviderWrapper>
          {children}
        </HeroUIProviderWrapper>
      </body>
    </html>
  );
}
