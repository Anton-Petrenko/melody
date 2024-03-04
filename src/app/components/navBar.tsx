import Image from "next/image";
import Link from "next/link";
import { getAuthSession } from "../utils/server";
import { getProfile } from "../api/apiCalls";
import { User } from "../types/types";
import NavBarProfile from "./navBarProfile";

export async function NavBar() {

    const session = await getAuthSession();
    const getUser = (await getProfile(session)) as User;
    let image_url;
    try{
        image_url = (getUser.images.at(0)?.url) as string;
    } catch {
        image_url = "";
    }

    return (        
    <div className="min-w-[100vh] h-20 bg-[#070707] flex items-center justify-between px-4">
        <div className="w-1/4">
            <a href="/">
                <Image
                    src="/melody.png"
                    alt="Melody logo"
                    width={131}
                    height={131}
                    className="w-10 h-10"
                />
            </a>
        </div>
        <div className="w-1/4 flex justify-between items-center">
            <Link 
                key="Feed"
                href="/home/feed">
                <Image
                    src="/home.png"
                    alt="Home feed icon"
                    width={96}
                    height={96}
                    className="w-8 h-8"
                />
            </Link>
            <Image
                src="/search.png"
                alt="Search icon"
                width={92}
                height={92}
                className="w-8 h-8"
            />
            <Link
                key="Home"
                href="/home">
                <Image
                    src="/thumbs.png"
                    alt="For you page icon"
                    width={135}
                    height={135}
                    className="w-10 h-10"
                />
            </Link>
            <Link
                key="Notifications"
                href="/home/notifications">
                <Image
                    src="/bell.png"
                    alt="Notifications icon"
                    width={71}
                    height={71}
                    className="w-8 h-8"
                />
            </Link>
            <Link
                key="Messages"
                href="/home/messages">
                <Image
                    src="/chat.png"
                    alt="Messages icon"
                    width={80}
                    height={80}
                    className="w-8 h-8"
                />
            </Link>
        </div>
        <div className="w-1/4 flex justify-end">
            <NavBarProfile image_url={image_url}/>
        </div>
    </div>
    )
}