"use client"

import { useEffect, useState } from "react";
import { getProfilePhoto } from "../utils/SpotifyAPICalls";
import { Avatar, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/react"
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AvatarButton() {

    const router = useRouter();

    const [avatarSrc, setAvatarSrc] = useState("");

    // On component load, get spotify logo of user
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
                onAction={(key) => {
                    if (key == "Profile") {
                        router.push("/profile");
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