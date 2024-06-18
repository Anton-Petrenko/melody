import "../globals.css";
import type { Metadata } from "next";
import NavBar from "../components/NavBar";
import { Manrope } from "next/font/google";
import MelodyProvider from "../OLDproviders/AppProvider";
import SessionProvider from "@/app/OLDproviders/SessionProvider";
import NextUIProviderWrapper from "../OLDproviders/NextUIProvider";

const manrope = Manrope({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Melody",
  description: "Unleash your inner music critic",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  

  return (
    <SessionProvider>
      <html lang="en" className="dark">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"></meta>
        </head>
        <body className={manrope.className}>
          <MelodyProvider>
            <NextUIProviderWrapper>
              <NavBar>
                {children}
              </NavBar>
            </NextUIProviderWrapper>
          </MelodyProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
