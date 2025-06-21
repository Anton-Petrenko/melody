'use server'

import { auth } from "@/auth";
import { MelodySession } from "./SpotifyAPI";

export default async function GetAuth(): Promise<MelodySession | null> {
    const session = await auth()
    if (!session) {
        console.log("Server side fetch of authentication resulted in a null object")
        return null
    }
    return session as MelodySession
}