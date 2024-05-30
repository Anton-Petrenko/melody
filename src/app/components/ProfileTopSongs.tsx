'use client'

import Image from "next/image";
import { Track } from "../types/types";
import PlayButton from "./PlayButton";

export default function ProfileTopSongs(
    {
        track,
        index
    }:
    {
        track: Track,
        index: number
    }
) {
    return (
        <div className="w-[95%] h-fit rounded-xl flex flex-row items-center relative">
            <h5 className="w-[1.4rem]">{index}</h5>
            <Image
                src={track.album.images.at(0)?.url as string}
                alt={`${track.name} cover art`}
                width={track.album.images.at(0)?.width as number}
                height={track.album.images.at(0)?.height as number}
                className="h-[3rem] w-[3rem] rounded-md"
            />
            <div className="h-full flex flex-col px-3">
                <small className="opacity-50">{track.artists.at(0)?.name}</small>
                <p>{track.name}</p>
            </div>
            <div className="absolute right-0">
                <PlayButton
                    track={track}
                />
            </div>
        </div>
    )
}