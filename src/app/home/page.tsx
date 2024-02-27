'use client';

import { signOut, useSession } from "next-auth/react";
import getProfile from "../api/getTopSongs";
import { getToken } from "next-auth/jwt";

export default function Feed(){

    const session = useSession();
    const test = getProfile(session?.data?.accessToken);
    // session?.data?.accessToken will get the access token

    return (
        <>
            <button onClick={() => signOut({callbackUrl: "/"})}>Sign out</button>
            <p>Testing {session?.data?.user?.name}</p>
            <p>User is {session.status}</p>
            <p>{session?.data?.accessToken}</p>
        </>
    )
}