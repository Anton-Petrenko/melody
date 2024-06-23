"use client"

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { MelodyContext } from "../OLDproviders/AppProvider";
import { getProfilePhoto } from "../OLDutils/SpotifyAPICalls";
import { Avatar, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/react";

export default function AvatarButton() {

    const router = useRouter();
    const app = useContext(MelodyContext);

    const [avatarSrc, setAvatarSrc] = useState("");

    useEffect(() => {
        getProfilePhoto().then((url) => setAvatarSrc(url))
    }, [])

    return (
        <Dropdown closeOnSelect={true}>
            <DropdownTrigger>
                <Avatar
                    src={avatarSrc}
                    className="cursor-pointer"
                />
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Profile Menu"
                onAction={(key) => {
                    if (key == "Profile") {
                        app?.audio.pause();
                        router.push(`/profile/${app?.dbCache.user?.db_id}`);
                    } else if (key == "Log Out") {
                        signOut({ callbackUrl: "/" });
                    }
                }}
            >
                <DropdownItem
                    key="Profile"
                >
                    Profile
                </DropdownItem>
                <DropdownItem
                    key="Log Out"
                    className="text-danger" 
                    color="danger"
                >
                        Log Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}