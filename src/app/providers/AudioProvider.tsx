"use client"

import { AudioProviderState, Track } from "../types/types";
import { createContext, useEffect, useState } from "react";

export const AudioContext = createContext<AudioProviderState>({} as AudioProviderState);

export default function AudioProvider({ children, }: Readonly<{ children: React.ReactNode; }>){

    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [currentTrackAudio, setCurrentTrackAudio] = useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {

        if (!currentTrack) return;
        if (isPlaying) {
            pause();
            setCurrentTrackAudio(null);
        }

        const newAudio = new Audio(currentTrack.preview_url as string);
        newAudio.preload="none";

        setCurrentTrackAudio(newAudio);

        return () => {
            pause();
            setCurrentTrackAudio(null);
        }

    }, [currentTrack])

    useEffect(() => {

        const handlePlay = async () => {
            if (currentTrackAudio) {
                await play();
            }
        };
        handlePlay();

    }, [currentTrackAudio])

    const play = async () => {
        setIsPlaying(true);
        if (currentTrackAudio?.volume) {
            currentTrackAudio.volume = 0.5
        }
        await currentTrackAudio?.play();
    };

    const pause = () => {
        setIsPlaying(false);
        currentTrackAudio?.pause();
    };

    const togglePlay = async () => {
        if (isPlaying) pause();
        else await play();
    };

    return (
        <AudioContext.Provider value={{      
            currentTrack,
            currentTrackAudio,
            isPlaying,
            setCurrentTrack,
            play,
            pause,
            togglePlay
        }}>
            {children}
        </AudioContext.Provider>
    )
}