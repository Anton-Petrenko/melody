'use server'

import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export async function spotifyAPI (url: string, session: Partial<Session> & { token: { access_token: string } } ) {
    const res = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${session.token.access_token}`
        }
    })
    const data = await res.json();
    return data
}

export type MelodySession = Partial<Session> & { token: { access_token: string } & JWT };