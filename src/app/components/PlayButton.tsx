"use client"

import { useContext } from "react";
import { MelodyContext } from "../providers/AppProvider";
import { SpotifyTrack } from "../types/SpotifyTypes";
import { FaPause, FaPlay } from "react-icons/fa6";

export default function PlayButton(
    { song }: { song: SpotifyTrack }
) {

    const melody = useContext(MelodyContext);

    return (
        <div 
            className={"flex-shrink-0 cursor-pointer opacity-" + (song.preview_url ? 100 : 0)}
            onClick={(e) => {
                e.preventDefault();
                if (song.preview_url) {
                    if (melody?.audio.currentTrack?.id === song.id && melody?.audio.isPlaying){
                        melody?.audio.pause();
                    } else if (melody?.audio.currentTrack?.id === song.id && !melody?.audio.isPlaying){
                        melody?.audio.play();
                    }
                    melody?.audio.setCurrentTrack(song);
                }
            }}
        >
            {
                melody?.audio.currentTrack?.id === song.id && melody?.audio.isPlaying
                ?
                <FaPause size={22} />
                :
                <FaPlay size={22} />
            }
        </div>
    )
}