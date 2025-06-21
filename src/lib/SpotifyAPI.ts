'use server'

import GetAuth from "./GetAuth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export async function spotifyAPI (url: string): Promise<Response | null> {
    let access_token = "";
    
    const session = await GetAuth();
    if (!session) {
        return null
    }

    access_token = session.token.access_token;

    const res = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    return res
}

export type MelodySession = Partial<Session> & { token: { access_token: string } & JWT };