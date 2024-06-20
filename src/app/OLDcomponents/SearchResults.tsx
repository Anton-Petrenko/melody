import TrackCard from "./TrackCard";
import { Spinner } from "@nextui-org/react";
import { TrackSearchResult } from "../OLDtypes/types";
import { searchSpotify } from "../OLDutils/SpotifyAPICalls";

export default async function SearchResults(
    {
        search
    }:
    {
        search: string
    }
) {

    let searchResults = {} as TrackSearchResult;
    if (search) {
        searchResults = await searchSpotify(search) as TrackSearchResult;
    }

    return (
        <>
            {
                searchResults ?
                <>
                    <div className="flex flex-col justify-start w-[90%] sm:w-full">
                        <h3>Search</h3>
                        <p className="opacity-50 text-xs">Some previews may be unavailable when searching.</p>
                    </div>
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
                </>
                :
                <Spinner color="default" className="h-full"/>
            }
        </>
    )

}