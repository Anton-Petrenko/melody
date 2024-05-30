import "../globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import AudioProvider from "../providers/AudioProvider";
import SearchProvider from "../providers/SearchProvider";
import RatingProvider from "../providers/RatingProvider";
import SessionProvider from "@/app/providers/SessionProvider";
import NextUIProviderWrapper from "../providers/NextUIProvider";
import UserDBInfoProvider from "../providers/UserDBInfoProvider";
import NavBar from "../components/NavBar";
import { syncLoginWithDB } from "../utils/DatabaseCalls";

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
          <AudioProvider>
            <NextUIProviderWrapper>
              <UserDBInfoProvider>
                <SearchProvider>
                  <RatingProvider>
                    <NavBar>
                      {children}
                    </NavBar>
                  </RatingProvider>
                </SearchProvider>
              </UserDBInfoProvider>
            </NextUIProviderWrapper>
          </AudioProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
