'use client'

import { Spinner } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";
import { getUserDBID } from "@/app/utils/DatabaseCalls";
import SearchResults from "../../components/SearchResults";
import { SearchContext } from "@/app/providers/SearchProvider";
import { TrackSearchResult } from "@/app/types/types";
import { searchSpotify } from "@/app/utils/SpotifyAPICalls";

export default function Home (
    {
        searchParams
    }:
    {
        searchParams?: {
            query?: string
        }
    }
) {

    // const query = useSearchParams();
    // const search = query.get("search");
    const searchContext = useContext(SearchContext);
    // var search = searchContext.term;

    const [dbID, setdbID] = useState<number | null>(null);
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

    useEffect(() => {
        const dbID = async () => {
            const id = (await getUserDBID());
            setdbID(id as number);
        }
        dbID();
    }, [])

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
                <p className="h-full flex items-center">Search something!</p>
            }
        </div>
    )
}