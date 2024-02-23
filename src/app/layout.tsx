import type { Metadata } from "next";
import { Red_Hat_Text } from "next/font/google";
import { getServerSession } from "next-auth";
import "./globals.css";
import { SessionProvider } from "@/app/components/sessionProvider";



const lexend_deca = Red_Hat_Text({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export const metadata: Metadata = {
  title: "Melody",
  description: "Unleash your inner music critic.",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode}>) {

  const session = await getServerSession();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={lexend_deca.className}>
              {children}
        </body>
      </html>
    </SessionProvider>
  );
}
