import NavigationBar from "@/components/NavigationBar";
import { Metadata } from "next";
import { Manrope } from "next/font/google";

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
                    <div className="w-xl mx-auto my-2">
                        {children}
                    </div>
                </NavigationBar>
            </body>
        </html>
    )
}