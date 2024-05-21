"use client"

import { useEffect, useState } from "react";
import { getProfilePhoto } from "../utils/SpotifyAPICalls";
import { Avatar, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/react"
import { signOut } from "next-auth/react";

export default function AvatarButton() {

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
            <DropdownMenu>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem 
                    className="text-danger" 
                    color="danger"
                    onClick={() => (
                        signOut({ callbackUrl: "/" })
                    )}
                    >
                        Log Out
                    </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}