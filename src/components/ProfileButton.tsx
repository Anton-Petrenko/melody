'use client'

import { authClient } from "@/lib/auth-client"
import { signOut } from "@/lib/auth-client"
// import { useSession, SessionProvider, SessionContextValue } from "next-auth/react"
import {
    Avatar,
    Button, 
    Dropdown, 
    DropdownItem, 
    DropdownMenu, 
    DropdownTrigger, 
    Link
} from "@heroui/react"
import { useRouter } from "next/navigation"

export default function ProfileButton() {

    const router = useRouter()

    const session = authClient.useSession();
    const DROPDOWN_OPTIONS = [
        { key: "profile", text: "Profile", className: undefined },
        { key: "logout", text: "Log Out", className: "text-danger" }
    ]

    return (
        <div>
            {
                session.data ?
                <Dropdown>
                    <DropdownTrigger
                        className="cursor-pointer"
                    >
                        <Avatar
                            src={(session.data?.user.image ? session.data?.user.image : undefined)}
                        />
                    </DropdownTrigger>
                    <DropdownMenu
                        onAction={async (key) => {
                            if (key === "logout") await signOut({ fetchOptions: {onSuccess: () => router.push("/")} })
                            // if (key === "profile") router.push(`/profile/${session.}`)
                        }}
                    >
                        {DROPDOWN_OPTIONS.map((option) => (
                            <DropdownItem 
                                key={option.key}
                                className={option.className}
                                isReadOnly={option.key === "profile" ? true : false}
                            >
                                {option.text}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                :
                <Button>
                    <Link
                        color="foreground"
                        href="/"
                    >
                        Sign In
                    </Link>
                </Button>
            }
        </div>
    )
}