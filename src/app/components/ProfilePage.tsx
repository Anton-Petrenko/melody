'use client'

import { Suspense } from "react"
import { Spinner } from "@nextui-org/react"
import SearchResults from "./SearchResults"
import Profile from "./Profile"
import { MelodyUser, Track } from "../types/types"

export default function ProfilePage(
    {
        profile,
        top10,
        searchParams
    }:
    {
        profile: MelodyUser | null,
        top10: Track[] | null
        searchParams?: {
            search?: string
        }
    }
) {  

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
                <Profile
                    profile={profile}
                    top10={top10}
                />
            }
        </div>
    )
}