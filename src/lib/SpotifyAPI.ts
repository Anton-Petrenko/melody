'use server'

import { auth } from "@/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export async function spotifyAPI (url: string): Promise<Response | null> {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    const token = await auth.api.getAccessToken({
        body: {
            providerId: "spotify",
            userId: session?.user.id,
        }
    }).then((token) => token.accessToken)

    // const session = await GetAuth();
    if (!session) {
        return null
    }

    const res = await fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return res
}

export type MelodySession = Partial<Session> & { token: { access_token: string, spotify_id: string } & JWT };