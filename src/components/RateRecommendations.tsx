"use server"

import { auth } from "@/auth";
import { spotifyAPI, MelodySession } from "@/lib/SpotifyAPI";

export default async function RateRecommendations() {

    const session = await auth();
    if (!session) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-20 opacity-50">
                <p>Spotify authentication not found.</p>
                <p>Please try signing in or reloading the page.</p>
            </div>
        )
    }

    const recentlyPlayed = await spotifyAPI("https://api.spotify.com/v1/me/player/recently-played", session as MelodySession)

    return (
        <p>{JSON.stringify(recentlyPlayed)}</p>
    )
}