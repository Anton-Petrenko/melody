"use client"

import Image from "next/image";
import { FaHeart } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import type { Post } from "../types/types";
import { Button } from "@nextui-org/react";
import TrackCardFeed from "./TrackCardFeed";
import { FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { MelodyContext } from "../providers/AppProvider";
import { useContext, useRef, useTransition } from "react";
import { hatePostDB, likePostDB, unhatePostDB, unlikePostDB } from "../utils/DatabaseCalls";

export default function DisplayPost(
    {
        post
    }:
    {
        post: Post
    }
) {

    const app = useContext(MelodyContext);

    const router = useRouter();
    const nowUTC = new Date().getTime();
    const postUTC = post.date.getTime();
    const minutesSince = Math.floor((nowUTC-postUTC)/60000);
    const hoursSince = Math.floor((nowUTC-postUTC)/3600000);
    const daysSince = Math.floor((nowUTC-postUTC)/86400000);
    const timeSince = minutesSince < 1 ? "just now" : (minutesSince < 60 ? `${minutesSince}m ago` : (hoursSince < 24 ? `${hoursSince}h ago` : `${daysSince}d ago`));

    const [isPending, startTransition] = useTransition();
    var isLiked = app?.dbCache.user?.liked.indexOf(post.post_id.toString()) != -1;
    const liked = useRef(isLiked);
    var isHated = app?.dbCache.user?.hated.indexOf(post.post_id.toString()) != -1;
    const hated = useRef(isHated);

    const likePost = async () => {
        startTransition(async () => {
            post.likes = post.likes + 1;
            liked.current = true;
            app?.dbCache.user?.liked.push(post.post_id.toString());
            await likePostDB(post.post_id, app?.dbCache.user?.db_id as number);
        })
    }

    const unlikePost = async () => {
        startTransition(async () => {
            post.likes = post.likes - 1;
            liked.current = false;
            const index = app?.dbCache.user?.liked.indexOf(post.post_id.toString()) as number;
            app?.dbCache.user?.liked.splice(index, 1);
            await unlikePostDB(post.post_id, app?.dbCache.user?.db_id as number);
        })
    }

    const hatePost = async () => {
        startTransition(async () => {
            post.hates = post.hates + 1;
            hated.current = true;
            app?.dbCache.user?.hated.push(post.post_id.toString());
            await hatePostDB(post.post_id, app?.dbCache.user?.db_id as number);
        })
    }

    const unhatePost = async () => {
        startTransition(async () => {
            post.hates = post.hates - 1;
            hated.current = false;
            const index = app?.dbCache.user?.hated.indexOf(post.post_id.toString()) as number;
            app?.dbCache.user?.hated.splice(index, 1);
            await unhatePostDB(post.post_id, app?.dbCache.user?.db_id as number);
        })
    }

    return (

        <div className="w-[90%] sm:w-full h-fit flex flex-col p-4 gap-2 hover:cursor-pointer duration-75 bg-[#292929]/30 rounded-xl my-1 hover:bg-[#292929]/50 relative">
            <div className="absolute w-full h-full" 
            onClick={() => {
                app?.audio.pause();
                router.push(`/post/${post.post_id}`)
            }}/>
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
            <div>
                <small className="opacity-50">Rated this song at #{post.rating_pos}</small>
                <p>{post.content}</p>
            </div>
            <TrackCardFeed 
                post={post}
            />
            <div className="flex flex-row items-center gap-4">
                {
                    isPending ?
                    <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        disableRipple
                        isDisabled
                    >
                        <FaHeart
                            size={20}
                            color="#808080"
                        />
                    </Button>
                    :
                    <>
                        {
                            liked.current ?
                            <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                disableRipple
                                onPress={unlikePost}
                            >
                                <FaHeart
                                    size={20}
                                    color="#A83F39"
                                />
                            </Button>
                            :
                            <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                disableRipple
                                onPress={likePost}
                            >
                                <FaRegHeart
                                    size={20}
                                />
                            </Button>
                        }    
                    </>
                }
                <p className="opacity-50">{post.likes}</p>
                {
                    isPending ?
                    <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        disableRipple
                        isDisabled
                    >
                        <RxCross2
                            size={20}
                            color="#808080"
                        />
                    </Button>
                    :
                    <>
                        {
                            hated.current ?
                            <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            disableRipple
                            onPress={unhatePost}
                            >
                                <RxCross2
                                    size={20}
                                    color="#A83F39"
                                />
                            </Button>
                            :
                            <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            disableRipple
                            onPress={hatePost}
                            >
                                <RxCross2
                                    size={20}
                                />
                            </Button>
                        }
                    </>
                }
                <p className="opacity-50">{post.hates}</p>
                {/* <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    disableRipple
                    isDisabled
                >
                    <FaRegComment
                        size={20}
                    />
                </Button>
                <p className="opacity-50">0</p> */}
            </div>
        </div>
    )
}