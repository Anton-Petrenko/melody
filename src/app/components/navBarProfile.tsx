'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function NavBarProfile( { image_url }: {image_url: string} ) {
    
    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Avatar isBordered color="primary" src={image_url}></Avatar>
                </DropdownTrigger>
                <DropdownMenu 
                    aria-label="Profile options"
                >
                    <DropdownItem key="signOut" onClick={() => signOut({ callbackUrl: "/" })}>Sign out</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}