'use client'

import { Suspense } from "react";
import RatePage from "./RatePage";
import { Spinner } from "@nextui-org/react";
import SearchResults from "./SearchResults";
import { RecentlyPlayedTracks, Track } from "../types/types";

export default function RatingFeed(
    {
        searchParams,
        recentSongs,
        topMonth,
        top6Month,
        topYear
    }:
    {
        searchParams?: {
            search?: string;
        },
        recentSongs: RecentlyPlayedTracks,
        topMonth: Track[],
        top6Month: Track[],
        topYear: Track[]
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
                <RatePage
                    recentSongs={recentSongs}
                    topMonth={topMonth}
                    top6Month={top6Month}
                    topYear={topYear}
                />
            }
        </div>
    )
}