'use client'

import { FaLongArrowAltLeft } from "react-icons/fa"
import { Post as PostType } from "../OLDtypes/types"
import Post from "./Post"
import { useRouter } from "next/navigation"
import { AudioContext } from "../OLDproviders/AudioProvider"
import { useContext } from "react"

export default function PostPage(
    {
        post
    }:
    {
        post: PostType
    }
) {

    const router = useRouter();
    const audioContext = useContext(AudioContext);

    return (
        <div className="w-full sm:w-[30rem] flex flex-col items-center">
            <div className="flex justify-start w-[90%] sm:w-full items-center gap-2 cursor-pointer" onClick={() => {
                audioContext.pause(); 
                router.push(`/home`);
                }}>
                <FaLongArrowAltLeft size={25}/>
                <h3>Post</h3>
            </div>
            <Post
                post={post}
            />
        </div>
    )
}