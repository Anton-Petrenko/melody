'use client'

import { Suspense, useContext } from "react"
import { Spinner } from "@nextui-org/react"
import SearchResults from "./SearchResults"
import Profile from "./Profile"
import { MelodyUser, Post, Track } from "../types/types"
import { UserDBContext } from "../providers/UserDBInfoProvider"

export default function ProfilePage(
    {
        profile,
        top10,
        postsFilled,
        searchParams
    }:
    {
        profile: MelodyUser | null,
        top10: Track[] | null,
        postsFilled: Post[]
        searchParams?: {
            search?: string
        }
    }
) {  

    const dbContext = useContext(UserDBContext);

    return (
        <div className="w-full sm:w-[30rem] flex flex-col items-center gap-2">
            {
                searchParams?.search ? 
                <Suspense fallback={<Spinner color="default" className="h-full"/>}>
                    <SearchResults
                        search={searchParams?.search}
                    />
                </Suspense>
                :
                <>
                    {
                        !dbContext.isPendingDBInit &&
                        <Profile
                            profile={profile}
                            top10={top10}
                            postsFilled={postsFilled}
                        />
                    }
                </>
            }
        </div>
    )
}