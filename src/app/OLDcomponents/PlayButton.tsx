'use client'

import { useContext } from "react";
import { Track } from "../OLDtypes/types";
import { FaPause, FaPlay } from "react-icons/fa";
import { MelodyContext } from "../OLDproviders/AppProvider";

export default function PlayButton(
    {
        track
    }:
    {
        track: Track
    }
) {

    const app = useContext(MelodyContext);

    return (
        <div 
            className={"cursor-pointer opacity-" + (track.preview_url ? 100 : 0)}
            onClick={(e) => {
                e.preventDefault();
                if (track.preview_url) {
                    if (app?.audio.currentTrack?.id === track.id && app?.audio.isPlaying){
                        app?.audio.pause();
                    } else if (app?.audio.currentTrack?.id === track.id && !app?.audio.isPlaying){
                        app?.audio.play();
                    }
                    app?.audio.setCurrentTrack(track);
                }
            }}
        >
            {
                app?.audio.currentTrack?.id === track.id && app?.audio.isPlaying
                ?
                <FaPause/>
                :
                <FaPlay/>
            }
        </div>
    )
}