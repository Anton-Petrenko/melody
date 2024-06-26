'use server'

import RatingFeed from "@/app/components/RatingFeed";
import { RecentlyPlayedTracks, Track } from "@/app/OLDtypes/types";
import { getRecentSongs, getTopTracks6Month, getTopTracksMonth, getTopTracksYear } from "@/app/OLDutils/SpotifyAPICalls";

export default async function Rate({
    searchParams,
  }: {
    searchParams?: {
      search?: string;
    };
  }) {

    const recentSongs = await getRecentSongs() as RecentlyPlayedTracks;
    const topYearSongs = await getTopTracksYear().then((res) => res.items) as Track[];
    const topMonthSongs = await getTopTracksMonth().then((res) => res.items) as Track[];
    const top6MonthSongs = await getTopTracks6Month().then((res) => res.items) as Track[];

    return (
        <RatingFeed
            searchParams={searchParams}
            recentSongs={recentSongs}
            topMonth={topMonthSongs}
            top6Month={top6MonthSongs}
            topYear={topYearSongs}
        />
    )
}