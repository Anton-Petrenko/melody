'use client'

import { Suspense } from "react";
import { Post } from "@/app/types/types";
import { Spinner } from "@nextui-org/react";
import SearchResults from "./SearchResults";
import HomeFeed from "@/app/components/HomeFeed";

export default function HomePage (
    {
        searchParams,
        posts
    }:
    {
        searchParams?: {
            search?: string;
        },
        posts: Post[]
    }
) {

    // const searchContext = useContext(SearchContext);
    // const [searchResults, setSearchResults] = useState<TrackSearchResult | null>(null);

    // useEffect(() => {

    //     if (searchContext.term == "") {
    //         setSearchResults(null);
    //         return
    //     }

    //     const getData = async () => {
    //         const results = await searchSpotify(searchContext.term);
    //         setSearchResults(results);
    //     }

    //     let timer = setTimeout(() => {
    //         getData();
    //     }, 1500)

    //     return () => {clearTimeout(timer); setSearchResults(null)};

    // }, [searchContext.term])

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
                    <HomeFeed
                        posts={posts}
                    />
                </>
            }
        </div>
    )
}