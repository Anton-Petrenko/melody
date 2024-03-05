import { Metadata } from "next";
import { NavBar } from "../components/navBar";
import { getAuthSession } from "../utils/server";
import { getProfile } from "../api/apiCalls";
import { User } from "../types/types";

export const metadata: Metadata = {
    title: "Melody",
    description: "Unleash your inner music critic.",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode}>) {
    
    const session = await getAuthSession();
    const getUser = (await getProfile(session)) as User;
    let image_url;
    try{
        image_url = (getUser.images.at(0)?.url) as string;
    } catch {
        image_url = "";
    }

    return (
        <div>
            <div className="min-h-screen sticky top-0 overflow-hidden">
                <NavBar image_url={image_url}/>
                {children}
            </div>
        </div>
    )
}