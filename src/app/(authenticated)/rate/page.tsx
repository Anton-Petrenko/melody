'use server'

import RatingFeed from "@/app/components/RatingFeed";
import { RecentlyPlayedTracks, Track } from "@/app/types/types";
import { getRecentSongs, getTopTracks6Month, getTopTracksMonth, getTopTracksYear } from "@/app/utils/SpotifyAPICalls";

export default async function Rate() {

    const recentSongs = await getRecentSongs() as RecentlyPlayedTracks;
    const topYearSongs = await getTopTracksYear().then((res) => res.items) as Track[];
    const topMonthSongs = await getTopTracksMonth().then((res) => res.items) as Track[];
    const top6MonthSongs = await getTopTracks6Month().then((res) => res.items) as Track[];

    return (
        <>
            <RatingFeed 
                recentSongs={recentSongs}
                topMonth={topMonthSongs}
                top6Month={top6MonthSongs}
                topYear={topYearSongs}
            />
        </>
    )
}