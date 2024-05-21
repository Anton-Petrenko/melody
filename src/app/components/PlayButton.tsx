'use client'

import { useContext } from "react";
import { Track } from "../types/types";
import { FaPause, FaPlay } from "react-icons/fa";
import { AudioContext } from "../providers/AudioProvider";

export default function PlayButton(
    {
        track
    }:
    {
        track: Track
    }
) {

    const audioContext = useContext(AudioContext);

    return (
        <div 
            className={"cursor-pointer opacity-" + (track.preview_url ? 100 : 0)}
            onClick={(e) => {
                e.preventDefault();
                if (track.preview_url) {
                    if (audioContext.currentTrack?.id === track.id && audioContext.isPlaying){
                        audioContext.pause();
                    } else if (audioContext.currentTrack?.id === track.id && !audioContext.isPlaying){
                        audioContext.play();
                    }
                    audioContext.setCurrentTrack(track);
                }
            }}
        >
            {
                audioContext.currentTrack?.id === track.id && audioContext.isPlaying
                ?
                <FaPause/>
                :
                <FaPlay/>
            }
        </div>
    )
}