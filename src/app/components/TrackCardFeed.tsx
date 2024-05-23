'use client'

import Image from "next/image";
import { Post, Track } from "../types/types";
import PlayButton from "./PlayButton";

export default function TrackCardFeed(
    {
        post
    }:
    {
        post: Post
    }
) {

    function getColor(rating: number) {
        if (rating < 4) {
            return 'red'
        }
        if (rating > 6.9) {
            return 'green'
        }
        return 'yellow'
    }

    var color = Number(post.rating_score) < 4 ? "red" : (Number(post.rating_score) > 6.9 ? "green" : "yellow");

    return (
        <>
            <small className="w-full opacity-50">Rated this song at #{post.rating_pos}</small>
            <div className="bg-[#252525] w-full h-[5rem] sm:h-[4.5rem] rounded-lg flex flex-row gap-2 p-2 relative">
                <div className="w-[3rem] h-full items-center justify-center flex">
                    <Image 
                        src={post.song_id_info?.album.images.at(0)?.url as string}
                        alt={post.song_id_info.name + " image"}
                        width={post.song_id_info?.album.images.at(0)?.width as number}
                        height={post.song_id_info?.album.images.at(0)?.height as number}
                        className="w-[3rem] h-[3rem] rounded-md"
                    />
                </div>
                <div className="h-full flex flex-col w-[50%] sm:w-[70%] justify-center">
                    <small className="opacity-50 text-ellipsis line-clamp-1 text-xs">{post.song_id_info.artists.at(0)?.name}</small>
                    <p className="text-ellipsis line-clamp-2 text-sm sm:text-medium sm:line-clamp-1">{post.song_id_info.name}</p>
                </div>
                <div className="flex items-center justify-end sm:justify-center w-[30%] sm:w-[20%] gap-4">
                    <h5 className={`font-bold ${color}`}>{post.rating_score}</h5>
                    <PlayButton 
                        track={post.song_id_info}
                    /> 
                </div>
            </div>
        </>
    )
}