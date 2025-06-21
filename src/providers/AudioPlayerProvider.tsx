'use client'

import { SpotifyTrack } from "@/lib/SpotifyAPITypes";
import { createContext, Dispatch, SetStateAction } from "react";

export const AudioPlayerContext = createContext<AudioPlayer>({} as AudioPlayer);

export function AudioPlayerProvider ({ children }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <AudioPlayerContext value={{} as AudioPlayer}>
            {children}
        </AudioPlayerContext>
    )
}

interface AudioPlayer {
    /** Play a song given the direct Spotify link to the track */
    playSong: Dispatch<SetStateAction<SpotifyTrack | null>>
}