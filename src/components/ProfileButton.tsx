'use client'

import { signOut } from "next-auth/react"
import { useSession, SessionProvider, SessionContextValue } from "next-auth/react"
import {
    Avatar,
    Button, 
    Dropdown, 
    DropdownItem, 
    DropdownMenu, 
    DropdownTrigger, 
    Link
} from "@heroui/react"

export default function ProfileButton() {

    return (
        <SessionProvider>
            <ProfileButton_LOADER/>
        </SessionProvider>
    )
}

function ProfileButton_LOADER() {

    const session = useSession();

    return (
        <div>
            {
                session.status != "unauthenticated" ?
                <ProfileButton_AUTH session={session} />
                :
                <ProfileButton_UNAUTH />
            }
        </div>
    )
}

function ProfileButton_AUTH({ session }: { session: SessionContextValue }) {

    const DROPDOWN_OPTIONS = [
        { key: "profile", text: "Profile", className: undefined },
        { key: "logout", text: "Log Out", className: "text-danger" }
    ]

    return (
        <Dropdown>
            <DropdownTrigger>
                <Avatar
                    src={(session.data?.user?.image ? session.data?.user?.image : undefined)}
                />
            </DropdownTrigger>
            <DropdownMenu
                onAction={(key) => {
                    if (key === "logout") signOut({ redirect: true, redirectTo: "/" })
                }}
            >
                {
                    DROPDOWN_OPTIONS.map((option) => (
                        <DropdownItem 
                            key={option.key}
                            className={option.className}
                        >
                            {option.text}
                        </DropdownItem>
                    ))
                }
            </DropdownMenu>
        </Dropdown>
    )
}

function ProfileButton_UNAUTH() {
    return (
        <Button>
            <Link
                color="foreground"
                href="/"
            >
                Sign In
            </Link>
        </Button>
    )
}