'use client';

import { signOut, useSession } from "next-auth/react";

export default function Feed(){

    const session = useSession();

    return (
        <>
            <button onClick={() => signOut({callbackUrl: "/"})}>Sign out</button>
            <p>Testing {session?.data?.user?.name}</p>
            <p>User is {session.status}</p>
        </>
    )
}