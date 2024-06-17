'use client'

import Image from "next/image"
import { useContext, useState, useTransition } from "react"
import { MelodyUser, Post, Track } from "../types/types"
import { RatingContext } from "../providers/RatingProvider"
import { UserDBContext } from "../providers/UserDBInfoProvider"
import { Button } from "@nextui-org/react"
import { SlUserFollow, SlUserFollowing } from "react-icons/sl"
import { CiSettings } from "react-icons/ci"
import TrackCard from "./TrackCard"
import ProfileTopSongs from "./ProfileTopSongs"
import DisplayPost from "./Post"
import { followDB, unfollowDB } from "../utils/DatabaseCalls"

export default function Profile(
    {
        profile,
        top10,
        postsFilled
    }:
    {
        profile: MelodyUser | null,
        top10: Track[] | null,
        postsFilled: Post[]
    }
) {

    
    const userDBContext = useContext(UserDBContext);
    const isFollowing = profile?.followers.indexOf(userDBContext.dbID as number) != -1;
    const [following, setFollowing] = useState(isFollowing);
    const [isPending, startTransition] = useTransition();

    const follow = async () => {
        startTransition(async () => {
            setFollowing(true);
            profile?.followers.push(userDBContext.dbID as number);
            await followDB(userDBContext.dbID as number, profile?.db_id as number);
        })
    }

    const unfollow = async () => {
        startTransition(async () => {
            setFollowing(false);
            const index = profile?.followers.indexOf(userDBContext.dbID as number) as number;
            profile?.followers.splice(index, 1);
            await unfollowDB(userDBContext.dbID as number, profile?.db_id as number);
        })
    }

    return (
        <>
            {
                profile ?
                <div className="w-[95%] sm:w-full h-fit rounded-xl flex flex-col gap-2 items-center">
                    <div className="flex flex-col w-full">
                        <h3>{profile.display_name}</h3>
                        <small className="opacity-50 w-full">@{profile.handle_name}</small>
                    </div>
                    <div className="w-full flex flex-row gap-2 items-start justify-evenly">
                        <Image
                            src={profile.photo}
                            alt="User profile photo"
                            height={125}
                            width={125}
                            className="rounded-full sm:h-[7rem] sm:w-[7rem] h-[5.5rem] w-[5.5rem]"
                        />
                        <div className="flex flex-col w-full h-full justify-center">
                            <div className="flex gap-2 justify-evenly items-start">
                                <div className="flex flex-col w-fit justify-center items-center h-fit">
                                    <h5>{profile.rankings?.length}</h5>
                                    <small className="opacity-50">Ratings</small>
                                </div>
                                <div className="flex flex-col w-fit justify-center items-center h-fit">
                                    <h5>{profile.followers.length - 1}</h5>
                                    <small className="opacity-50">Followers</small>
                                </div>
                                <div className="flex flex-col w-fit justify-center items-center h-fit">
                                    <h5>{profile.following.length - 1}</h5>
                                    <small className="opacity-50">Following</small>
                                </div>
                            </div>
                            {
                                userDBContext.dbID != profile.db_id ?
                                (
                                    isPending ?
                                    <Button
                                        className="h-[2rem] w-[90%] m-auto my-2"
                                        variant="solid"
                                        color="default"
                                        startContent={<SlUserFollowing/>}
                                        disableRipple
                                        isDisabled
                                    >
                                        Unfollow
                                    </Button>
                                    :
                                    <>
                                    {
                                        following ?
                                        <Button
                                            className="h-[2rem] w-[90%] m-auto my-2"
                                            variant="solid"
                                            color="default"
                                            startContent={<SlUserFollowing/>}
                                            onPress={unfollow}
                                            disableRipple
                                        >
                                            Unfollow
                                        </Button>
                                        :
                                        <Button
                                            className="h-[2rem] w-[90%] m-auto my-2"
                                            variant="bordered"
                                            color="primary"
                                            startContent={<SlUserFollow/>}
                                            onPress={follow}
                                            disableRipple
                                        >
                                            Follow
                                        </Button>
                                    }
                                    </>
                                )
                                :
                                <Button
                                    className="h-[2rem] w-[90%] m-auto my-2"
                                    variant="solid"
                                    color="default"
                                    startContent={<CiSettings/>}
                                    isDisabled
                                >
                                    Edit Profile
                                </Button>
                            }
                        </div>
                    </div>
                    {
                        top10 &&
                        <>
                            <h3 className="w-full">Top Songs</h3>
                            {
                                top10.map((track, index) => (
                                    <ProfileTopSongs
                                        key={track.id}
                                        track={track}
                                        index={index}
                                    />
                                ))

                            }          
                        </>            
                    }
                    {
                        postsFilled.length > 0 &&
                        <>
                            <h3 className="w-full">Latest Posts</h3>
                            {
                                postsFilled.map((post) => (
                                    <DisplayPost
                                        post={post}
                                    />
                                ))
                            }
                        </>
                    }
                </div>
                :
                <div className="h-full flex items-center text-center">
                    <p className="opacity-50">This profile does not exist.</p>
                </div>
            }
        </>
    )
}