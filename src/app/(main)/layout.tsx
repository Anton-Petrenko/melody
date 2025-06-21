import { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import NavigationBar from "@/components/NavigationBar";
import { AudioPlayerProvider } from "@/providers/AudioPlayerProvider";

const defaultFont = Manrope({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Melody",
  description: "Home",
};

export default function HomeLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body
                className={`${defaultFont.className} antialiased dark`}
            >
                <NavigationBar>
                    <SessionProvider>
                        <AudioPlayerProvider>
                            <div className="sm:w-xl w-fit mx-auto my-2 px-2 sm:px-0">
                                {children}
                            </div>
                        </AudioPlayerProvider>
                    </SessionProvider>
                </NavigationBar>
            </body>
        </html>
    )
}