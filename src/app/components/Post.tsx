"use client"

import Image from "next/image";
import type { Post } from "../types/types";
import TrackCardFeed from "./TrackCardFeed";

export default function DisplayPost(
    {
        post
    }:
    {
        post: Post
    }
) {

    return (
        <div className="w-[90%] sm:w-full h-fit bg-[#181818]/50 rounded-xl flex flex-col p-4 gap-2">
            <div className="w-full flex flex-row gap-2">
                <Image
                    src={post.photo ? post.photo : "/default.jpg"}
                    alt={post.api_id}
                    width={100}
                    height={100}
                    className="h-[3rem] w-[3rem] rounded-full"
                />
                <div className="flex flex-col gap-[-5px]">
                    <b>{post.api_id}</b>
                    <small className="opacity-50">{`@rater${post.user_id}`}</small>
                </div>
            </div>
            <TrackCardFeed 
                post={post}
            />
            <p>{post.content}</p>
        </div>
    )
}