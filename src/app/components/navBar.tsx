'use client'

import Image from "next/image";
import Link from "next/link";
import NavBarProfile from "./navBarProfile";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: 'Feed', href: '/home/feed', src: '/home.png', alt: "Home Feed Icon", width: 96, height: 96, className: 'w-8 h-8'},
    { name: 'Search', href: '/home/search', src: '/search.png', alt: 'Search Icon', width: 92, height: 92, className: 'w-8 h-8'},
    { name: 'Home', href: '/home', src: '/thumbs.png', alt: 'For You Page Icon', width: 135, height: 135, className: 'w-10 h-10'},
    { name: 'Invoices', href: '/home/notifications', src: '/bell.png', alt: 'Notifications Icon', width: 71, height: 71, className: 'w-8 h-8'},
    { name: 'Messages', href: '/home/messages', src: '/chat.png', alt: 'Messages Icon', width: 80, height: 80, className: 'w-8 h-8'},
];

export function NavBar( { image_url }: {image_url: string} ) {

    const pathname = usePathname();

    return (        
    <div className="h-[10dvh] bg-[#070707] flex items-center justify-between px-4">
        <div className="lg:w-1/3 md:w-1/3 w-1/4">
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
        <div className="lg:w-1/3 md:w-1/3 w-1/2 flex justify-between items-center">
            {
                links.map((link) => {

                    const opacity = (link.href == pathname) ? `opacity-100 ${link.className}` : `opacity-20 ${link.className}`

                    return (
                        <Link
                            key={link.name}
                            href={link.href}>
                            <Image
                                src={link.src}
                                alt={link.alt}
                                width={link.width}
                                height={link.height}
                                className={opacity}
                                />
                        </Link>
                    )
                })
            }
        </div>
        <div className="lg:w-1/3 md:w-1/3 w-1/4 flex justify-end">
            <NavBarProfile image_url={image_url}/>
        </div>
    </div>
    )
}