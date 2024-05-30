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

    const nowUTC = new Date().getTime();
    const postUTC = post.date.getTime();
    const minutesSince = Math.floor((nowUTC-postUTC)/60000);
    const hoursSince = Math.floor((nowUTC-postUTC)/3600000);
    const daysSince = Math.floor((nowUTC-postUTC)/86400000);
    const timeSince = minutesSince < 1 ? "just now" : (minutesSince < 60 ? `${minutesSince}m ago` : (hoursSince < 24 ? `${hoursSince}h ago` : `${daysSince}d ago`))

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
                <div className="w-full text-right">
                    <small className="opacity-50">{timeSince}</small>
                </div>
            </div>
            <TrackCardFeed 
                post={post}
            />
            <p className="text-sm">{post.content}</p>
        </div>
    )
}