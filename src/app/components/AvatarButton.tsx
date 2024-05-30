"use client"

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { getProfilePhoto } from "../utils/SpotifyAPICalls";
import { UserDBContext } from "../providers/UserDBInfoProvider";
import { Avatar, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/react";
import { AudioContext } from "../providers/AudioProvider";

export default function AvatarButton() {

    const router = useRouter();
    const userContext = useContext(UserDBContext);
    const audioContext = useContext(AudioContext);

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
                        audioContext.pause();
                        router.push(`/profile/${userContext.dbID}`);
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