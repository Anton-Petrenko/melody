'use client'

import { Spinner } from "@nextui-org/react";
import HomeFeed from "@/app/components/HomeFeed";
import SearchResults from "./SearchResults";
import { searchSpotify } from "@/app/utils/SpotifyAPICalls";
import { Post, TrackSearchResult } from "@/app/types/types";
import { SearchContext } from "@/app/providers/SearchProvider";
import { Suspense, useContext, useEffect, useState } from "react";

export default function HomePage (
    {
        posts
    }:
    {
        posts: Post[]
    }
) {

    const searchContext = useContext(SearchContext);
    const [searchResults, setSearchResults] = useState<TrackSearchResult | null>(null);

    useEffect(() => {

        if (searchContext.term == "") {
            setSearchResults(null);
            return
        }

        const getData = async () => {
            const results = await searchSpotify(searchContext.term);
            setSearchResults(results);
        }

        let timer = setTimeout(() => {
            getData();
        }, 1500)

        return () => {clearTimeout(timer); setSearchResults(null)};

    }, [searchContext.term])

    return (
        <div className="w-full sm:w-[30rem] flex flex-col items-center gap-2">
            {
                searchContext.term != "" ?
                <Suspense fallback={<Spinner color="default" className="h-full"/>}>
                    <SearchResults
                        searchResults={searchResults}
                    />
                </Suspense>
                :
                <>
                    <HomeFeed
                        posts={posts}
                    />
                </>
            }
        </div>
    )
}