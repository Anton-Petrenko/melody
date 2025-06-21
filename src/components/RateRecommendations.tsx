"use server"

import Song from "./Song";
import { spotifyAPI } from "@/lib/SpotifyAPI";
import { RecentlyPlayedTracks } from "@/lib/SpotifyAPITypes";

export default async function RateRecommendations() {
    
    const res = await spotifyAPI("https://api.spotify.com/v1/me/player/recently-played");
    if (!res) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-20 opacity-50">
                <p>Spotify authentication not found.</p>
                <p>Please try signing in or reloading the page.</p>
            </div>
        )
    }

    if (res.status != 200) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-20 opacity-50">
                <p>There was an error fetching your catalog.</p>
                <p>Please try signing in or reloading the page.</p>
            </div>
        )
    }

    const recentlyPlayed = await res.json() as RecentlyPlayedTracks;
    return (
        <div className="flex flex-col gap-2">
            {
                recentlyPlayed.items.map((song, i) => (
                    <Song key={`${song.track.id}${i}`} song={song.track} />
                ))
            }
        </div>
    )
}