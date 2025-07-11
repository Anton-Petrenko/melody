"use server"

import Song from "../song/Song";
import { spotifyAPI } from "@/lib/SpotifyAPI";
import { RecentlyPlayedTracks } from "@/lib/SpotifyAPITypes";

export default async function RatePageServer() {
    
    const res = await spotifyAPI("https://api.spotify.com/v1/me/player/recently-played?limit=30");
    if (!res) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-20 opacity-50">
                <p>Spotify authentication not found.</p>
                <p>Please try signing in or reloading the page.</p>
            </div>
        )
    }

    if (res.status != 200) {
        const data = await res.json()
        console.warn(data)
        return (
            <div className="flex flex-col justify-center items-center w-full h-20 opacity-50">
                <p>There was an error fetching your catalog.</p>
                <p>Please try signing in or reloading the page.</p>
            </div>
        )
    }

    const data = (await res.json() as RecentlyPlayedTracks);
    const seen = new Set<string>()
    const recentlyPlayed = data.items.filter(obj => {
        if (seen.has(obj.track.id)) return false
        else {
            seen.add(obj.track.id)
            return true
        }
    })

    return (
        <div className="flex flex-col gap-2">
            {
                recentlyPlayed.map((song, i) => (
                    <Song key={`${song.track.id}${i}`} song={song.track} />
                ))
            }
        </div>
    )
}