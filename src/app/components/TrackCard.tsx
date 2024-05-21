'use client'

import Image from "next/image";
import { useContext } from "react";
import PlayButton from "./PlayButton";
import { Track } from "../types/types";
import { MdOutlineStar } from "react-icons/md";
import { RatingContext } from "../providers/RatingProvider";

export default function TrackCard(
    {
        track
    }:
    {
        track: Track
    }
) {

    const ratingContext = useContext(RatingContext);

    return (
        <div className="w-[90%] sm:w-full h-[7rem] sm:h-[9.4rem] bg-[#181818]/50 rounded-xl flex flex-row p-4 gap-4 justify-between">
            <Image
                src={track.album.images.at(0)?.url as string}
                alt={`${track.name} cover`}
                width={track.album.images.at(0)?.width as number}
                height={track.album.images.at(0)?.height as number}
                className="h-[5rem] w-[5rem] sm:h-[7rem] sm:w-[7rem] rounded-lg"
            />
            <div className="flex flex-col text-left w-full relative">
                <p className="opacity-50 line-clamp-1 text-ellipsis sm:text-medium text-xs">{track.artists.map(artist => artist.name).join(", ")}</p>
                <b className="line-clamp-1 text-ellipsis sm:line-clamp-2 text-sm sm:text-medium">{track.name}</b>
                {
                    ratingContext.ratedSongs.indexOf(track.id) == -1 ?
                    <MdOutlineStar
                        className="absolute bottom-0 opacity-50 hover:opacity-100 hover:fill-[#FFD700] hover:scale-125 duration-75 cursor-pointer"
                        size={30}
                        onClick={(e) => {
                            e.preventDefault()
                            ratingContext.setSongToRate(track);
                        }}
                    />
                    :
                    <div className="absolute bottom-0">
                        <p>{(((ratingContext.ratedSongs.indexOf(track.id) + 1) / ratingContext.ratedSongs.length)*10).toFixed(1)}</p>
                    </div>
                }
            </div>
            <div className="w-[3rem] flex h-full justify-center items-center">
                <PlayButton
                    track={track}
                />
            </div>
        </div>
    )
}