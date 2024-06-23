"use client"

import { useContext } from "react";
import { signOut } from "next-auth/react";
import { MelodyContext } from "../providers/AppProvider";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

export default function AvatarButton() {

    const melody = useContext(MelodyContext);

    return (
        <Dropdown closeOnSelect={true}>
            <DropdownTrigger>
                <Avatar
                    src={melody?.session?.data.user?.picture}
                    className="cursor-pointer"
                    radius="lg"
                />
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Profile Menu"
                disabledKeys={["Profile"]}
                onAction={(key) => {
                    if (key == "Log Out") {
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