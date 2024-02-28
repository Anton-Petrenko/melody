import { Metadata } from "next";
import { NavBar } from "../components/navBar";

export const metadata: Metadata = {
    title: "Feed",
    description: "Unleash your inner music critic.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode}>) {
    return (
    <div className="min-h-screen">
        <NavBar/>
        {children}
    </div>
    )
}