'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem
} from "@heroui/navbar";

import HomeLogo from "./images/HomeLogo";
import RateLogo from "./images/RateLogo";
import MelodyLogo from "./images/MelodyLogo";
import ProfileButton from "./ProfileButton";

const NAVBAR_LINKS = [
    { name: "home", href: "/home", anchor: <HomeLogo/> },
    { name: "rate", href: "/rate", anchor: <RateLogo/> }
]


export default function NavigationBar({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const pathname = usePathname()

    return (
        <div className="h-[100dvh]">
            <Navbar
                className="bg-[#121212]"
            >
                <NavbarBrand>
                    <MelodyLogo/>
                </NavbarBrand>
                <NavbarContent justify="center">
                    {
                        NAVBAR_LINKS.map((link) => (
                            <NavbarItem key={`${link.name}`}>
                                <Link
                                    href={link.href}
                                    className={`cursor-pointer ${pathname.substring(1, 5) == link.name ? 'opacity-100' : 'opacity-50'}`}
                                >
                                    {link.anchor}
                                </Link>
                            </NavbarItem>
                        ))
                    }
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <ProfileButton/>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <div className="overflow-y-scroll">
                {children}
            </div>
        </div>
    )
}