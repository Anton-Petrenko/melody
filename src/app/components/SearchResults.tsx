import TrackCard from "./TrackCard";
import { CgSmileSad } from "react-icons/cg";
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
            {
                searchResults.tracks.items.length > 0 ?
                searchResults.tracks.items.map((track) => (
                    <TrackCard
                        track={track}
                    />
                ))
                :
                <div className="h-full flex items-center text-center">
                    <p className="opacity-70">No results found...</p>
                </div>
            }
        </>
    )

}