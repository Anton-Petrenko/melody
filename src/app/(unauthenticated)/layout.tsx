import "../globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import NextUIProviderWrapper from "../providers/NextUIProvider";
import SessionProvider from "@/app/providers/SessionProvider";

const manrope = Manrope({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Melody",
  description: "Unleash your inner music critic.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <SessionProvider>
      <html lang="en" className="dark">
        <body className={manrope.className}>
          <NextUIProviderWrapper>
            {children}
          </NextUIProviderWrapper>
        </body>
      </html>
    </SessionProvider>
  );
}
