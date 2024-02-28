import { SessionProvider } from "@/app/components/sessionProvider";
import { Red_Hat_Text } from "next/font/google";
import { getServerSession } from "next-auth";
import { Providers } from "./providers";
import type { Metadata } from "next";
import "./globals.css";



const lexend_deca = Red_Hat_Text({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export const metadata: Metadata = {
  title: "Melody",
  description: "Unleash your inner music critic.",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode}>) {

  const session = await getServerSession();

  return (
    <SessionProvider session={session}>
      <html lang="en" className="dark">
        <body className={lexend_deca.className}>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
