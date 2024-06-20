"use client"

import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import MelodyLogo from "../images/Melody";
import { usePathname } from "next/navigation";
import { MelodyContext } from "../providers/AppProvider";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

export default function NavigationBar({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const pathname = usePathname();
    const app = useContext(MelodyContext);

    return (
        <div className="h-[100dvh]">
            <Navbar
                className="bg-[#181818]"
                height="8dvh"
            >
                <NavbarBrand>
                    <MelodyLogo
                        width={30}
                        height={30}
                    />
                </NavbarBrand>
                <NavbarContent justify='center' className="hidden sm:flex gap-14">
                    <NavbarItem>
                        <Link
                            className="cursor-pointer"
                            href='/home'
                            onClick={() => app?.audio.pause()}
                        >
                            <Image
                                src="/home.png"
                                alt="Home Feed Icon"
                                width={33}
                                height={33}
                                className={(pathname == "/home" ? "opacity-100" : "opacity-50 scale-[0.9]")}
                            />
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link
                            className="cursor-pointer"
                            href='/rate'
                            onClick={() => app?.audio.pause()}
                        >
                            <Image
                                src="/thumbs.png"
                                alt="Rate Songs Icon"
                                width={30}
                                height={30}
                                className={(pathname == "/rate" ? "opacity-100" : "opacity-50 scale-[0.9]")}
                            />
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link
                            className="cursor-pointer"
                            href='/notifications'
                            onClick={() => app?.audio.pause()}
                        >
                            <Image
                                src="/bell.png"
                                alt="Notifications Icon"
                                width={25}
                                height={25}
                                className={(pathname == "/notifications" ? "opacity-100" : "opacity-50 scale-[0.9]")}
                            />
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        {/* SEARCH BAR */}
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify='end'>
                    <NavbarItem>
                        {/* PROFILE BUTTON */}
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <div className="h-[84dvh] sm:min-h-[92dvh] sm:max-h-[92dvh] py-2 overflow-y-scroll flex justify-center">
                {children}
            </div>
            <Navbar 
                height="8dvh"
                className="sm:hidden bg-[#181818]"
            >
                <NavbarContent justify="center" className="flex gap-[20dvw] w-full">
                    <NavbarItem>
                        <Link
                            className="cursor-pointer"
                            href='/home'
                            onClick={() => app?.audio.pause()}
                        >
                            <Image
                                src="/home.png"
                                alt="Home Feed Icon"
                                width={33}
                                height={33}
                                className={(pathname == "/home" ? "opacity-100" : "opacity-50")}
                            />
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link
                            className="cursor-pointer"
                            href='/rate'
                            onClick={() => app?.audio.pause()}
                        >
                            <Image
                                src="/thumbs.png"
                                alt="Rate Songs Icon"
                                width={30}
                                height={30}
                                className={(pathname == "/rate" ? "opacity-100" : "opacity-50")}
                            />
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link
                            className="cursor-pointer"
                            href='/notifications'
                            onClick={() => app?.audio.pause()}
                        >
                            <Image
                                src="/bell.png"
                                alt="Notifications Icon"
                                width={25}
                                height={25}
                                className={(pathname == "/notifications" ? "opacity-100" : "opacity-50")}
                            />
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </div>
    )
}