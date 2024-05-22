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

    return (
        <>
            <div className="bg-[#252525] w-full h-[4rem] rounded-lg flex flex-row gap-2 p-2 relative">
                <div className="w-[3rem]">
                    <Image 
                        src={post.song_id_info?.album.images.at(0)?.url as string}
                        alt={post.song_id_info.name + " image"}
                        width={post.song_id_info?.album.images.at(0)?.width as number}
                        height={post.song_id_info?.album.images.at(0)?.height as number}
                        className="w-[3rem] h-[3rem] rounded-md"
                    />
                </div>
                <div className="h-full flex flex-col w-[50%] sm:w-[70%]">
                    <small className="opacity-50 text-ellipsis line-clamp-1 text-xs">{post.song_id_info.artists.map(artist => artist.name).join(", ")}</small>
                    <p className="text-ellipsis line-clamp-2 text-xs sm:text-sm sm:line-clamp-1">{post.song_id_info.name}</p>
                </div>
                <div className="flex items-center justify-center w-[30%] sm:w-[20%] gap-4">
                    <b>{post.rating_score}</b>
                    <PlayButton 
                        track={post.song_id_info}
                    /> 
                </div>
            </div>
            <small className="w-full opacity-50">#{post.rating_pos} in their list</small>
        </>
    )
}