"use client"

import DisplayPost from "./Post";
import { Post } from "../types/types";

export default function HomeFeed(
    {
        posts
    }:
    {
        posts: Post[]
    }
) {

    return (
        <>
            <div className="flex flex-col justify-start w-[90%] sm:w-full">
                <h3>Feed</h3>
            </div>
            {
                posts.length > 0 ?
                posts.map((post) => (
                    <DisplayPost
                        key={post.post_id}
                        post={post}
                    />
                ))
                :
                <div className="h-full flex items-center text-center">
                    <p className="opacity-70">No posts available</p>
                </div>
            }
        </>
    )
}