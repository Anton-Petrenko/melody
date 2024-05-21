import { Suspense } from "react";
import TrackCard from "./TrackCard";
import { TrackSearchResult } from "../types/types";
import { searchSpotify } from "../utils/SpotifyAPICalls";

export default async function SearchResults(
    {
        search
    }:
    {
        search: string
    }
) {

    const searchResults = await searchSpotify(search) as TrackSearchResult;

    return (
        <>
            <div className="flex flex-col justify-start w-[90%] sm:w-full">
                <h3>Search</h3>
                <p className="opacity-50 text-xs">Some previews may be unavailable when searching.</p>
            </div>
            <Suspense>
                {
                    searchResults.tracks.items.length > 0 ?
                    searchResults.tracks.items.map((track) => (
                        <TrackCard
                            key={track.id}
                            track={track}
                        />
                    ))
                    :
                    <div className="h-full flex items-center text-center">
                        <p className="opacity-70">No results found...</p>
                    </div>
                }       
            </Suspense>
        </>
    )

}